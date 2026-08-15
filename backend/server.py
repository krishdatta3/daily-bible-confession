from fastapi import FastAPI, APIRouter, HTTPException
from fastapi.responses import FileResponse
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import re
import hashlib
import logging
from pathlib import Path
from pydantic import BaseModel, Field
from typing import List
import uuid
from datetime import datetime

from emergentintegrations.llm.openai import OpenAITextToSpeech


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


def clean_for_tts(text: str) -> str:
    text = re.sub(r"https?://\S+", "", text)
    text = re.sub(r"`{1,3}[^`]*`{1,3}", "", text)
    text = re.sub(r"[*_#>~|]", "", text)
    text = text.replace("“", "").replace("”", "").replace("—", " ")
    return re.sub(r"\s+", " ", text).strip()


def _cache_key(text: str) -> str:
    raw = f"{text}|{TTS_VOICE}|{TTS_MODEL}|{TTS_FORMAT}"
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
    key = _cache_key(cleaned)
    path = TTS_CACHE / f"{key}.{TTS_FORMAT}"
    if not path.exists():
        try:
            audio_bytes = await _tts.generate_speech(
                text=cleaned,
                model=TTS_MODEL,
                voice=TTS_VOICE,
                response_format=TTS_FORMAT,
            )
            with open(path, "wb") as f:
                f.write(audio_bytes)
        except Exception as e:
            logger.error(f"TTS generation failed: {e}")
            raise HTTPException(status_code=502, detail="TTS generation failed")
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
