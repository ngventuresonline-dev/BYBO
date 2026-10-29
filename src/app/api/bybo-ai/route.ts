import { NextResponse } from 'next/server';
import { systemPrompt } from '@/lib/bybo-ai/prompt';
import { findSlot, upcomingSlots } from '@/lib/bybo-ai/slots';
import { sendBooking } from '@/lib/bybo-ai/booking';
import { CONTACT } from '@/lib/site';

/**
 * BYBO AI: the agent behind the assistant on every page.
 *
 * The browser sends the conversation; this route asks Claude for the next
 * reply. Claude can call one tool, book_call, which this route checks (a real
 * slot, a valid email, a phone) and turns into emails for the team and the
 * visitor. Only ANTHROPIC_API_KEY and RESEND_API_KEY are needed; both stay on
 * the server.
 */

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const MODEL = process.env.BYBO_AI_MODEL ?? 'claude-sonnet-5-5';
const MAX_TURNS = 40, MAX_CHARS = 1500;

/** Bookings already emailed on this instance, so a retry never sends twice. */
const done = new Set<string>();

const seen = new Map<string, number[]>();
function rateLimited(ip: string) {
  const now = Date.now();
  const hits = (seen.get(ip) ?? []).filter((t) => now - t < 10 * 60_000);
  hits.push(now);
  seen.set(ip, hits);
  if (seen.size > 1000) for (const [k, v] of seen) if (!v.some((t) => now - t < 10 * 60_000)) seen.delete(k);
  return hits.length > 40;
}

const TOOLS = [{
  name: 'book_call',
  description: 'Book a 30-minute discovery call with the BYBO team. Only call this once you have the visitor\'s name, a valid email, a phone number and their chosen slot id from AVAILABLE SLOTS.',
  input_schema: {
    type: 'object',
    properties: {
      slot: { type: 'string', description: 'Exact slot id (UTC ISO) from AVAILABLE SLOTS' },
      name: { type: 'string' },
      email: { type: 'string' },
      phone: { type: 'string' },
      company: { type: 'string', description: 'Business name, if given' },
      need: { type: 'string', description: 'One line: what they want help with' },
      summary: { type: 'string', description: 'Two lines for the team: who they are, the problem, urgency' },
    },
    required: ['slot', 'name', 'email', 'phone', 'need', 'summary'],
  },
}];

type Turn = { role: 'user' | 'assistant'; text: string };
type Block = { type: string; text?: string; id?: string; name?: string; input?: Record<string, string> };

async function claude(key: string, system: string, messages: unknown[]) {
  const res = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: { 'x-api-key': key, 'anthropic-version': '2023-06-01', 'content-type': 'application/json' },
    body: JSON.stringify({ model: MODEL, max_tokens: 600, system, tools: TOOLS, messages }),
  }).catch(() => null);
  if (!res?.ok) {
    console.error('bybo-ai model call failed', res?.status ?? 0, (await res?.text().catch(() => ''))?.slice(0, 300));
    return null;
  }
  return (await res.json()) as { content: Block[]; stop_reason: string };
}

const textOf = (blocks: Block[]) => blocks.filter((b) => b.type === 'text').map((b) => b.text).join('\n').trim();
const s = (v: unknown, max: number) => String(v ?? '').trim().slice(0, max);

export async function POST(request: Request) {
  const key = process.env.ANTHROPIC_API_KEY;
  if (!key) return NextResponse.json({ ok: false, reason: 'not_configured' }, { status: 503 });

  const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown';
  if (rateLimited(ip)) return NextResponse.json({ ok: false, reason: 'rate_limited' }, { status: 429 });

  const body = await request.json().catch(() => null) as { messages?: Turn[]; page?: string } | null;
  const turns = (body?.messages ?? [])
    .filter((m) => (m.role === 'user' || m.role === 'assistant') && typeof m.text === 'string' && m.text.trim())
    .slice(-MAX_TURNS)
    .map((m) => ({ role: m.role, text: m.text.slice(0, MAX_CHARS) }));
  while (turns.length && turns[0].role !== 'user') turns.shift();
  if (!turns.length || turns.at(-1)!.role !== 'user') return NextResponse.json({ ok: false, reason: 'invalid' }, { status: 400 });

  const page = s(body?.page, 200);
  const system = systemPrompt(upcomingSlots(), page);
  const messages: unknown[] = turns.map((m) => ({ role: m.role, content: m.text }));

  let booked: string | null = null;
  // At most two tool rounds per request: book, then confirm in words.
  for (let round = 0; round < 3; round++) {
    const out = await claude(key, system, messages);
    if (!out) return NextResponse.json({ ok: false, reason: 'model_failed' }, { status: 502 });

    const call = out.content.find((b) => b.type === 'tool_use' && b.name === 'book_call');
    if (!call || round === 2) return NextResponse.json({ ok: true, reply: textOf(out.content) || 'Sorry, could you say that again?', booked });

    const i = call.input ?? {};
    const slot = findSlot(s(i.slot, 40));
    const email = s(i.email, 200), phone = s(i.phone, 30), name = s(i.name, 120);
    let result: string;
    if (!slot) result = 'That slot is no longer available. Offer other slots from AVAILABLE SLOTS.';
    else if (!name || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) result = 'Missing a name or a valid email. Ask for it, then book again.';
    else if (phone.replace(/\D/g, '').length < 8) result = 'Missing a valid phone number. Ask for it, then book again.';
    else if (done.has(`${email.toLowerCase()}|${slot.id}`)) { booked = slot.label; result = `Already booked for ${slot.label}; the confirmation email has been sent.`; }
    else {
      const ok = await sendBooking({
        slot: slot.id, name, email, phone, company: s(i.company, 160), need: s(i.need, 300), summary: s(i.summary, 600), page,
        transcript: turns,
      });
      if (ok) { done.add(`${email.toLowerCase()}|${slot.id}`); booked = slot.label; result = `Booked for ${slot.label}. A confirmation email with a calendar invite has been sent to ${email}.`; }
      else result = `Booking could not be saved right now. Apologise and ask them to email ${CONTACT.email} or WhatsApp ${CONTACT.phone}.`;
    }

    messages.push({ role: 'assistant', content: out.content });
    messages.push({ role: 'user', content: [{ type: 'tool_result', tool_use_id: call.id, content: result }] });
  }
  return NextResponse.json({ ok: true, reply: 'Sorry, could you say that again?', booked });
}
