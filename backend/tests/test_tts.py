"""Backend tests for the TTS endpoints (iteration 2)."""
import os
import pytest
import requests

BASE_URL = os.environ.get("EXPO_PUBLIC_BACKEND_URL") or os.environ.get("EXPO_BACKEND_URL")
if not BASE_URL:
    # fall back to frontend .env style key used by app
    BASE_URL = "https://bible-confession-app.preview.emergentagent.com"
BASE_URL = BASE_URL.rstrip("/")


@pytest.fixture(scope="module")
def api():
    s = requests.Session()
    s.headers.update({"Content-Type": "application/json"})
    return s


class TestHealth:
    def test_root(self, api):
        r = api.get(f"{BASE_URL}/api/")
        assert r.status_code == 200
        assert r.json().get("message") == "Hello World"


class TestTTS:
    """POST /api/tts and GET /api/tts/{key}.mp3"""

    HINDI_TEXT = "यहोवा मेरा चरवाहा है"

    def test_post_tts_returns_url(self, api):
        r = api.post(f"{BASE_URL}/api/tts", json={"text": self.HINDI_TEXT})
        assert r.status_code == 200, r.text
        data = r.json()
        assert "url" in data
        assert data["url"].startswith("/api/tts/")
        assert data["url"].endswith(".mp3")
        # persist for next test
        TestTTS._url = data["url"]

    def test_get_audio_mpeg(self, api):
        assert getattr(TestTTS, "_url", None), "prior POST failed"
        r = api.get(f"{BASE_URL}{TestTTS._url}")
        assert r.status_code == 200
        ct = r.headers.get("content-type", "").lower()
        assert "audio/mpeg" in ct, ct
        assert len(r.content) > 1000, f"audio too small: {len(r.content)} bytes"

    def test_cache_hit_same_text(self, api):
        r1 = api.post(f"{BASE_URL}/api/tts", json={"text": self.HINDI_TEXT})
        assert r1.status_code == 200
        url1 = r1.json()["url"]
        r2 = api.post(f"{BASE_URL}/api/tts", json={"text": self.HINDI_TEXT})
        assert r2.status_code == 200
        url2 = r2.json()["url"]
        assert url1 == url2, "identical text must produce identical cache key"

    def test_empty_text_returns_400(self, api):
        r = api.post(f"{BASE_URL}/api/tts", json={"text": ""})
        assert r.status_code == 400

    def test_whitespace_only_returns_400(self, api):
        r = api.post(f"{BASE_URL}/api/tts", json={"text": "   \n\t"})
        assert r.status_code == 400

    def test_get_unknown_key_404(self, api):
        r = api.get(f"{BASE_URL}/api/tts/deadbeef.mp3")
        assert r.status_code == 404

    def test_english_text(self, api):
        r = api.post(f"{BASE_URL}/api/tts", json={"text": "The Lord is my shepherd"})
        assert r.status_code == 200
        assert r.json()["url"].endswith(".mp3")
