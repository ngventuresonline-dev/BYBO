import { NextResponse } from 'next/server';
import { sendBooking } from '@/lib/bybo-ai/booking';
import { findSlot } from '@/lib/bybo-ai/slots';
import { voiceGuard } from '@/lib/instant-call/voice-auth';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

/**
 * Books a discovery call into the same weekday slots the website already uses.
 * Does not change that booking path. Protected by the instant-call switch and
 * the x-bybo-voice-secret header (VOICE_TOOL_SECRET).
 */

const seen = new Map<string, number[]>();
const done = new Set<string>();

function rateLimited(ip: string) {
  const now = Date.now();
  const hits = (seen.get(ip) ?? []).filter((t) => now - t < 10 * 60_000);
  hits.push(now);
  seen.set(ip, hits);
  return hits.length > 6;
}

const s = (v: unknown, max: number) => String(v ?? '').trim().slice(0, max);

export async function POST(request: Request) {
  const denied = voiceGuard(request);
  if (denied) return denied;

  const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown';
  if (rateLimited(ip)) return NextResponse.json({ ok: false, reason: 'rate_limited' }, { status: 429 });

  const body = await request.json().catch(() => null) as Record<string, unknown> | null;
  const name = s(body?.name, 120);
  const email = s(body?.email, 200);
  const phone = s(body?.phone, 30);
  const need = s(body?.need, 300);
  const slot = findSlot(s(body?.slot, 40));
  if (!slot) return NextResponse.json({ ok: false, reason: 'slot_taken' }, { status: 409 });
  if (!name || !need || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email) || phone.replace(/\D/g, '').length < 8) {
    return NextResponse.json({ ok: false, reason: 'invalid' }, { status: 400 });
  }

  const id = `${email.toLowerCase()}|${slot.id}`;
  if (done.has(id)) return NextResponse.json({ ok: true, booked: slot.label });

  const transcript = (Array.isArray(body?.transcript) ? body.transcript : [])
    .filter((turn: { role?: string; text?: string }) => (turn?.role === 'user' || turn?.role === 'assistant') && typeof turn.text === 'string')
    .slice(-40)
    .map((turn: { role: 'user' | 'assistant'; text: string }) => ({ role: turn.role, text: turn.text.slice(0, 1500) }));

  const company = s(body?.company, 160);
  const ok = await sendBooking({
    slot: slot.id,
    name,
    email,
    phone,
    company,
    need,
    page: s(body?.page, 200),
    transcript,
    summary: `${company ? `${company}. ` : ''}Booked by BYBO Voice. Needs: ${need}`,
  });
  if (!ok) return NextResponse.json({ ok: false, reason: 'send_failed' }, { status: 502 });
  done.add(id);
  return NextResponse.json({ ok: true, booked: slot.label });
}
