from fastapi import FastAPI, APIRouter, HTTPException
from fastapi.responses import FileResponse
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import re
import asyncio
import hashlib
import logging
from pathlib import Path
from pydantic import BaseModel, Field
from typing import List
import uuid
from datetime import datetime

from emergentintegrations.llm.openai import OpenAITextToSpeech
from elevenlabs.client import ElevenLabs


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Create the main app without a prefix
app = FastAPI()

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")


# Define Models
class StatusCheck(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    client_name: str
    timestamp: datetime = Field(default_factory=datetime.utcnow)

class StatusCheckCreate(BaseModel):
    client_name: str

# Add your routes to the router instead of directly to app
@api_router.get("/")
async def root():
    return {"message": "Hello World"}

@api_router.post("/status", response_model=StatusCheck)
async def create_status_check(input: StatusCheckCreate):
    status_dict = input.dict()
    status_obj = StatusCheck(**status_dict)
    _ = await db.status_checks.insert_one(status_obj.dict())
    return status_obj

@api_router.get("/status", response_model=List[StatusCheck])
async def get_status_checks():
    status_checks = await db.status_checks.find().to_list(1000)
    return [StatusCheck(**status_check) for status_check in status_checks]


# ---------------------------------------------------------------------------
# Text-to-Speech (verse & prayer narration) via OpenAI TTS (Emergent key)
# ---------------------------------------------------------------------------
TTS_CACHE = ROOT_DIR / "tts_cache"
TTS_CACHE.mkdir(exist_ok=True)

TTS_VOICE = "onyx"
TTS_MODEL = "tts-1"
TTS_FORMAT = "mp3"

_tts = OpenAITextToSpeech(api_key=os.environ["EMERGENT_LLM_KEY"])

# ElevenLabs (natural multilingual Hindi voice) — activates only when a real
# ELEVENLABS_API_KEY is provided; otherwise we fall back to OpenAI TTS.
_eleven_client = None
_eleven_voice_cache = None


def eleven_enabled() -> bool:
    key = os.environ.get("ELEVENLABS_API_KEY", "").strip().strip('"')
    return bool(key)


def _get_eleven() -> ElevenLabs:
    global _eleven_client
    if _eleven_client is None:
        key = os.environ.get("ELEVENLABS_API_KEY", "").strip().strip('"')
        _eleven_client = ElevenLabs(api_key=key)
    return _eleven_client


def _eleven_voice_id() -> str:
    global _eleven_voice_cache
    vid = os.environ.get("ELEVENLABS_VOICE_ID", "").strip().strip('"')
    if vid:
        return vid
    if _eleven_voice_cache:
        return _eleven_voice_cache
    voices = _get_eleven().voices.get_all()
    _eleven_voice_cache = voices.voices[0].voice_id
    return _eleven_voice_cache


def _generate_eleven(text: str) -> bytes:
    audio = _get_eleven().text_to_speech.convert(
        text=text,
        voice_id=_eleven_voice_id(),
        model_id="eleven_multilingual_v2",
        output_format="mp3_44100_128",
    )
    data = b""
    for chunk in audio:
        data += chunk
    return data


def clean_for_tts(text: str) -> str:
    text = re.sub(r"https?://\S+", "", text)
    text = re.sub(r"`{1,3}[^`]*`{1,3}", "", text)
    text = re.sub(r"[*_#>~|]", "", text)
    text = text.replace("\u201c", "").replace("\u201d", "").replace("\u2014", " ")
    return re.sub(r"\s+", " ", text).strip()


def _cache_key(text: str, provider: str) -> str:
    voice = _eleven_voice_id() if provider == "el" else TTS_VOICE
    raw = f"{provider}|{text}|{voice}|{TTS_MODEL}|{TTS_FORMAT}"
    return hashlib.sha256(raw.encode("utf-8")).hexdigest()


class TTSRequest(BaseModel):
    text: str


@api_router.post("/tts")
async def create_tts(req: TTSRequest):
    cleaned = clean_for_tts(req.text)
    if not cleaned:
        raise HTTPException(status_code=400, detail="Empty text")
    if len(cleaned) > 4096:
        cleaned = cleaned[:4096]

    use_eleven = eleven_enabled()
    provider = "el" if use_eleven else "oa"
    try:
        key = _cache_key(cleaned, provider)
    except Exception as e:
        logger.error(f"TTS voice resolution failed, falling back to OpenAI: {e}")
        use_eleven = False
        provider = "oa"
        key = _cache_key(cleaned, provider)

    path = TTS_CACHE / f"{key}.{TTS_FORMAT}"
    if not path.exists():
        audio_bytes = None
        if use_eleven:
            try:
                audio_bytes = await asyncio.to_thread(_generate_eleven, cleaned)
            except Exception as e:
                logger.error(f"ElevenLabs TTS failed, falling back to OpenAI: {e}")
                audio_bytes = None
                provider = "oa"
                key = _cache_key(cleaned, provider)
                path = TTS_CACHE / f"{key}.{TTS_FORMAT}"
        if audio_bytes is None and not path.exists():
            try:
                audio_bytes = await _tts.generate_speech(
                    text=cleaned,
                    model=TTS_MODEL,
                    voice=TTS_VOICE,
                    response_format=TTS_FORMAT,
                )
            except Exception as e:
                logger.error(f"TTS generation failed: {e}")
                raise HTTPException(status_code=502, detail="TTS generation failed")
        if audio_bytes is not None:
            with open(path, "wb") as f:
                f.write(audio_bytes)
    return {"url": f"/api/tts/{key}.{TTS_FORMAT}"}


@api_router.get("/tts/{key}.{ext}")
async def get_tts(key: str, ext: str):
    path = TTS_CACHE / f"{key}.{ext}"
    if not path.exists():
        raise HTTPException(status_code=404, detail="Audio not found")
    return FileResponse(str(path), media_type="audio/mpeg")

# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
