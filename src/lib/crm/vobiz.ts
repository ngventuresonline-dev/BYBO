import { createHmac, timingSafeEqual } from 'node:crypto';
import { normalizePhone } from '@/lib/instant-call/phone';

/**
 * Click-to-call from the lead desk through BYBO's Vobiz number. Vobiz rings
 * the founder's phone first; when they pick up, the answer URL tells Vobiz to
 * dial the lead with BYBO's number as caller ID. The lead never sees a personal
 * number. The answer URL carries only the lead id and a short-lived signature;
 * the lead's phone is looked up on the server.
 */

const API = 'https://api.vobiz.ai/api/v1/Account';
const env = () => ({
  id: process.env.BYBO_VOBIZ_AUTH_ID?.trim() ?? '',
  token: process.env.BYBO_VOBIZ_AUTH_TOKEN?.trim() ?? '',
  number: normalizePhone(process.env.BYBO_VOBIZ_NUMBER),
  agent: normalizePhone(process.env.BYBO_VOBIZ_AGENT_PHONE),
});
export const vobizConfigured = () => { const e = env(); return !!e.id && !!e.token && !!e.number && !!e.agent; };
export const vobizNumber = () => env().number;

const TTL = 10 * 60; // seconds the answer URL stays valid

const sign = (lead: string, exp: number) => createHmac('sha256', env().token).update(`${lead}.${exp}`).digest('hex');

export function verifyAnswer(lead: string, exp: string, sig: string): boolean {
  const e = Number(exp);
  if (!env().token || !Number.isFinite(e) || e < Date.now() / 1000 || !/^[0-9a-f]{64}$/.test(sig)) return false;
  return timingSafeEqual(Buffer.from(sign(lead, e), 'hex'), Buffer.from(sig, 'hex'));
}

/** The XML Vobiz runs once the founder answers: dial the lead from BYBO's number. */
export function bridgeXml(leadPhone: string): string {
  return `<?xml version="1.0" encoding="UTF-8"?>
<Response>
  <Speak>Connecting you to the lead.</Speak>
  <Dial callerId="${env().number}" timeout="40"><Number>${leadPhone}</Number></Dial>
  <Speak>The lead did not pick up.</Speak>
  <Hangup/>
</Response>`;
}

export const hangupXml = (say: string) => `<?xml version="1.0" encoding="UTF-8"?>
<Response><Speak>${say}</Speak><Hangup/></Response>`;

/** Ring the founder; the lead is dialled when they answer. */
export async function bridgeCall(leadId: string, origin = 'https://bybo.in') {
  const e = env();
  const exp = Math.floor(Date.now() / 1000) + TTL;
  const answer = `${origin}/api/crm/vobiz/answer?lead=${leadId}&exp=${exp}&sig=${sign(leadId, exp)}`;
  const res = await fetch(`${API}/${encodeURIComponent(e.id)}/Call/`, {
    method: 'POST',
    headers: { 'X-Auth-ID': e.id, 'X-Auth-Token': e.token, 'Content-Type': 'application/json' },
    body: JSON.stringify({ from: e.number!.slice(1), to: e.agent!.slice(1), answer_url: answer, answer_method: 'POST', caller_name: 'BYBO lead desk', time_limit: 3600 }),
    signal: AbortSignal.timeout(15_000),
  });
  if (!res.ok) throw new Error(`vobiz ${res.status} ${(await res.text().catch(() => '')).slice(0, 200)}`);
  return (await res.json()) as { request_uuid?: string };
}
