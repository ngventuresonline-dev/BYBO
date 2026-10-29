import { NextResponse } from 'next/server';
import { findSlot, upcomingSlots } from '@/lib/bybo-ai/slots';
import { sendBooking } from '@/lib/bybo-ai/booking';

/**
 * Direct booking for BYBO AI's guided mode: used when the model is
 * unreachable, so a visitor can still finish booking a call without leaving
 * the conversation. GET lists open slots; POST books one.
 */

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

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

export function GET() {
  return NextResponse.json({ ok: true, slots: upcomingSlots() });
}

export async function POST(request: Request) {
  const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown';
  if (rateLimited(ip)) return NextResponse.json({ ok: false, reason: 'rate_limited' }, { status: 429 });

  const b = await request.json().catch(() => null) as Record<string, unknown> | null;
  const name = s(b?.name, 120), email = s(b?.email, 200), phone = s(b?.phone, 30), need = s(b?.need, 300);
  const slot = findSlot(s(b?.slot, 40));
  if (!slot) return NextResponse.json({ ok: false, reason: 'slot_taken' }, { status: 409 });
  if (!name || !need || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email) || phone.replace(/\D/g, '').length < 8) {
    return NextResponse.json({ ok: false, reason: 'invalid' }, { status: 400 });
  }

  const id = `${email.toLowerCase()}|${slot.id}`;
  if (done.has(id)) return NextResponse.json({ ok: true, booked: slot.label });

  const transcript = (Array.isArray(b?.transcript) ? b.transcript : [])
    .filter((m: { role?: string; text?: string }) => (m?.role === 'user' || m?.role === 'assistant') && typeof m.text === 'string')
    .slice(-40)
    .map((m: { role: 'user' | 'assistant'; text: string }) => ({ role: m.role, text: m.text.slice(0, 1500) }));

  const company = s(b?.company, 160);
  const ok = await sendBooking({
    slot: slot.id, name, email, phone, company, need, page: s(b?.page, 200), transcript,
    summary: `${company ? `${company}. ` : ''}Booked through BYBO AI's guided mode. Needs: ${need}`,
  });
  if (!ok) return NextResponse.json({ ok: false, reason: 'send_failed' }, { status: 502 });
  done.add(id);
  return NextResponse.json({ ok: true, booked: slot.label });
}
