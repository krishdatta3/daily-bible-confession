// Module-level narration player (OpenAI TTS via backend). One shared player.
import { createAudioPlayer, setAudioModeAsync, AudioPlayer } from "expo-audio";

const BACKEND = process.env.EXPO_PUBLIC_BACKEND_URL;

export interface NarrationState {
  loading: boolean;
  playing: boolean;
  id: string | null;
}

let player: AudioPlayer | null = null;
let state: NarrationState = { loading: false, playing: false, id: null };
const listeners = new Set<(s: NarrationState) => void>();

function setState(next: Partial<NarrationState>) {
  state = { ...state, ...next };
  listeners.forEach((l) => l(state));
}

export function subscribeNarration(l: (s: NarrationState) => void): () => void {
  listeners.add(l);
  l(state);
  return () => {
    listeners.delete(l);
  };
}

async function ensurePlayer(): Promise<AudioPlayer> {
  if (!player) {
    player = createAudioPlayer();
    await setAudioModeAsync({ playsInSilentMode: true });
    player.addListener("playbackStatusUpdate", (status: any) => {
      if (status?.didJustFinish) {
        setState({ playing: false, id: null });
      }
    });
  }
  return player;
}

export async function narrate(id: string, text: string): Promise<void> {
  const p = await ensurePlayer();
  // Toggle off if the same item is playing.
  if ((state.playing || state.loading) && state.id === id) {
    p.pause();
    setState({ loading: false, playing: false, id: null });
    return;
  }
  try {
    p.pause();
  } catch {
    // ignore
  }
  setState({ loading: true, playing: false, id });
  try {
    const res = await fetch(`${BACKEND}/api/tts`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text }),
    });
    if (!res.ok) throw new Error("tts_failed");
    const data = await res.json();
    // If user cancelled/switched while loading, abort.
    if (state.id !== id) return;
    const uri = `${BACKEND}${data.url}`;
    p.replace({ uri });
    p.play();
    setState({ loading: false, playing: true, id });
  } catch (e) {
    setState({ loading: false, playing: false, id: null });
    throw e;
  }
}

export function stopNarration(): void {
  if (player) {
    try {
      player.pause();
    } catch {
      // ignore
    }
  }
  setState({ loading: false, playing: false, id: null });
}
