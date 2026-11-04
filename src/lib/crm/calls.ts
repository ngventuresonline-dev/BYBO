/**
 * AI call recordings for the CRM. Calls run on ElevenLabs Conversational AI;
 * each one is a conversation with audio, a summary and its phone metadata.
 * The CRM lists a lead's calls by matching the number dialled, and streams the
 * audio through an admin route so the API key never reaches the browser.
 */

const API = 'https://api.elevenlabs.io/v1/convai/conversations';
const key = () => process.env.BYBO_ELEVENLABS_API_KEY ?? '';
export const callsConfigured = () => !!key() && !!process.env.BYBO_ELEVENLABS_AGENT_ID;

export type CallRecording = { id: string; at: string; seconds: number; status: string; summary: string | null; answered: boolean };

type ListItem = { conversation_id: string; start_time_unix_secs?: number; call_duration_secs?: number; status?: string; call_successful?: string };

async function get(url: string) {
  const res = await fetch(url, { headers: { 'xi-api-key': key() }, signal: AbortSignal.timeout(15_000), cache: 'no-store' });
  if (!res.ok) throw new Error(`elevenlabs ${res.status}`);
  return res.json() as Promise<Record<string, unknown>>;
}

// Conversation details rarely change once a call ends; keep them for the life of the server.
const details = new Map<string, Record<string, unknown>>();
async function detail(id: string) {
  const hit = details.get(id);
  if (hit) return hit;
  const d = await get(`${API}/${encodeURIComponent(id)}`);
  if (d.status === 'done' || d.status === 'failed') details.set(id, d);
  return d;
}

const digits = (s: string) => s.replace(/\D/g, '').slice(-10);

/** The calls our agent made to this number since the lead arrived, newest first. */
export async function callsForPhone(phone: string, since: Date): Promise<CallRecording[]> {
  if (!callsConfigured() || digits(phone).length < 10) return [];
  const want = digits(phone);
  const from = Math.floor(since.getTime() / 1000) - 3600;
  const list = await get(`${API}?agent_id=${encodeURIComponent(process.env.BYBO_ELEVENLABS_AGENT_ID!)}&page_size=100`);
  const items = ((list.conversations as ListItem[] | undefined) ?? []).filter((c) => (c.start_time_unix_secs ?? 0) >= from).slice(0, 40);
  const found = await Promise.all(items.map(async (c) => {
    const d = await detail(c.conversation_id).catch(() => null);
    if (!d || !JSON.stringify(d.metadata ?? {}).replace(/\D/g, '').includes(want)) return null;
    const analysis = (d.analysis ?? {}) as Record<string, unknown>;
    const meta = (d.metadata ?? {}) as Record<string, unknown>;
    const seconds = Number(meta.call_duration_secs ?? c.call_duration_secs ?? 0);
    return {
      id: c.conversation_id,
      at: new Date((c.start_time_unix_secs ?? 0) * 1000).toISOString(),
      seconds,
      status: String(d.status ?? c.status ?? ''),
      summary: typeof analysis.transcript_summary === 'string' ? analysis.transcript_summary : null,
      answered: seconds > 0 && (c.call_successful ?? analysis.call_successful) !== 'failure',
    } satisfies CallRecording;
  }));
  return found.filter((x): x is CallRecording => !!x).sort((a, b) => b.at.localeCompare(a.at));
}

/** The recording itself, streamed from ElevenLabs. */
export async function callAudio(id: string) {
  return fetch(`${API}/${encodeURIComponent(id)}/audio`, { headers: { 'xi-api-key': key() }, signal: AbortSignal.timeout(30_000), cache: 'no-store' });
}
