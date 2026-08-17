"""Backend tests for Iteration 4 Gemini AI endpoints.

Covers:
 - POST /api/ai/confession (hi + en, empty -> 400)
 - POST /api/ai/reflection (hi, empty -> 400)
 - POST /api/ai/chat (multi-turn history, empty -> 400)
"""
import os
import re
import pytest
import requests

BASE_URL = os.environ.get("EXPO_PUBLIC_BACKEND_URL", "").rstrip("/")
# Fallback to frontend .env if not exported in this process
if not BASE_URL:
    with open("/app/frontend/.env") as f:
        for line in f:
            if line.startswith("EXPO_PUBLIC_BACKEND_URL="):
                BASE_URL = line.split("=", 1)[1].strip().rstrip("/")
                break

TIMEOUT = 60  # Gemini can take a few seconds


@pytest.fixture(scope="module")
def api():
    s = requests.Session()
    s.headers.update({"Content-Type": "application/json"})
    return s


# ----- /api/ai/confession -----
class TestAIConfession:
    def test_confession_hindi(self, api):
        r = api.post(
            f"{BASE_URL}/api/ai/confession",
            json={"situation": "मैं अपनी नौकरी को लेकर चिंतित हूँ", "lang": "hi"},
            timeout=TIMEOUT,
        )
        assert r.status_code == 200, r.text
        data = r.json()
        assert set(["confession", "prayer", "reference"]).issubset(data.keys())
        assert isinstance(data["confession"], str) and len(data["confession"].strip()) > 10
        assert isinstance(data["prayer"], str) and len(data["prayer"].strip()) > 5
        # Hindi should contain devanagari
        assert re.search(r"[\u0900-\u097F]", data["confession"]), "expected Hindi (devanagari) confession"

    def test_confession_english(self, api):
        r = api.post(
            f"{BASE_URL}/api/ai/confession",
            json={"situation": "I am struggling with fear about my future", "lang": "en"},
            timeout=TIMEOUT,
        )
        assert r.status_code == 200, r.text
        data = r.json()
        assert data["confession"].strip() and data["prayer"].strip()
        # English response should be predominantly ASCII letters
        letters = re.findall(r"[A-Za-z]", data["confession"])
        assert len(letters) > 20, "expected English confession"

    def test_confession_empty_situation_400(self, api):
        r = api.post(
            f"{BASE_URL}/api/ai/confession",
            json={"situation": "   ", "lang": "hi"},
            timeout=TIMEOUT,
        )
        assert r.status_code == 400


# ----- /api/ai/reflection -----
class TestAIReflection:
    def test_reflection_hindi(self, api):
        r = api.post(
            f"{BASE_URL}/api/ai/reflection",
            json={
                "verse": "मैं मसीह के द्वारा सब कुछ कर सकता हूँ जो मुझे सामर्थ देता है।",
                "reference": "फिलिप्पियों 4:13",
                "lang": "hi",
            },
            timeout=TIMEOUT,
        )
        assert r.status_code == 200, r.text
        data = r.json()
        assert "reflection" in data and len(data["reflection"].strip()) > 10
        assert re.search(r"[\u0900-\u097F]", data["reflection"])

    def test_reflection_empty_verse_400(self, api):
        r = api.post(
            f"{BASE_URL}/api/ai/reflection",
            json={"verse": "", "reference": "abc", "lang": "hi"},
            timeout=TIMEOUT,
        )
        assert r.status_code == 400


# ----- /api/ai/chat -----
class TestAIChat:
    def test_chat_simple(self, api):
        r = api.post(
            f"{BASE_URL}/api/ai/chat",
            json={"message": "मुझे प्रार्थना करने में मदद चाहिए", "history": [], "lang": "hi"},
            timeout=TIMEOUT,
        )
        assert r.status_code == 200, r.text
        data = r.json()
        assert "reply" in data and len(data["reply"].strip()) > 5
        assert re.search(r"[\u0900-\u097F]", data["reply"])

    def test_chat_multi_turn(self, api):
        history = [
            {"role": "user", "text": "मुझे शांति चाहिए"},
            {"role": "assistant", "text": "यीशु आपकी शांति हैं।"},
        ]
        r = api.post(
            f"{BASE_URL}/api/ai/chat",
            json={"message": "और कोई वचन बताइए", "history": history, "lang": "hi"},
            timeout=TIMEOUT,
        )
        assert r.status_code == 200, r.text
        assert r.json().get("reply", "").strip()

    def test_chat_empty_message_400(self, api):
        r = api.post(
            f"{BASE_URL}/api/ai/chat",
            json={"message": "", "history": [], "lang": "hi"},
            timeout=TIMEOUT,
        )
        assert r.status_code == 400
