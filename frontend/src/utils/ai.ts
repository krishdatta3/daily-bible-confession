// Gemini AI helpers (backend-powered). Requires internet.
const BACKEND = process.env.EXPO_PUBLIC_BACKEND_URL;

async function postJson<T>(path: string, body: unknown): Promise<T> {
  const res = await fetch(`${BACKEND}${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  if (!res.ok) throw new Error(`request_failed_${res.status}`);
  return (await res.json()) as T;
}

export interface GeneratedConfession {
  confession: string;
  prayer: string;
  reference: string;
}

export function generateConfession(situation: string, lang: string) {
  return postJson<GeneratedConfession>("/api/ai/confession", { situation, lang });
}

export function getReflection(verse: string, reference: string, lang: string) {
  return postJson<{ reflection: string }>("/api/ai/reflection", {
    verse,
    reference,
    lang,
  });
}

export interface ChatTurn {
  role: "user" | "assistant";
  text: string;
}

export function chatAssistant(message: string, history: ChatTurn[], lang: string) {
  return postJson<{ reply: string }>("/api/ai/chat", { message, history, lang });
}
