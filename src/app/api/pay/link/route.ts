import { NextResponse } from 'next/server';
import { adminOk, LINK_DAYS, linksConfigured, MAX_INR, MIN_INR, signLink } from '@/lib/payments/link';
import { sendLinkEmail } from '@/lib/payments/mail';

/** Creates a signed payment link. Team only: needs PAYMENTS_ADMIN_KEY. */

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const tries = new Map<string, number[]>();
const s = (v: unknown, max: number) => String(v ?? '').trim().slice(0, max);

export async function POST(request: Request) {
  const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown';
  const now = Date.now();
  const hits = (tries.get(ip) ?? []).filter((t) => now - t < 15 * 60_000);
  hits.push(now);
  tries.set(ip, hits);
  if (hits.length > 20) return NextResponse.json({ ok: false, reason: 'rate_limited' }, { status: 429 });

  if (!linksConfigured()) return NextResponse.json({ ok: false, reason: 'not_configured' }, { status: 503 });
  const b = await request.json().catch(() => null) as Record<string, unknown> | null;
  if (!adminOk(s(b?.key, 200))) return NextResponse.json({ ok: false, reason: 'unauthorized' }, { status: 401 });

  const amount = Math.round(Number(b?.amount) * 100) / 100;
  const link = {
    id: s(b?.id, 40) || `BYBO-${new Date().toISOString().slice(0, 10).replace(/-/g, '')}-${Math.random().toString(36).slice(2, 6).toUpperCase()}`,
    name: s(b?.name, 120), email: s(b?.email, 200), phone: s(b?.phone, 30), company: s(b?.company, 160),
    purpose: s(b?.purpose, 160), amount, exp: Math.floor(now / 1000) + LINK_DAYS * 86400,
  };
  if (!link.name || !link.purpose || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(link.email) || !(amount >= MIN_INR && amount <= MAX_INR)) {
    return NextResponse.json({ ok: false, reason: 'invalid' }, { status: 400 });
  }

  const origin = new URL(request.url).origin;
  const url = `${origin}/pay/${signLink(link)}`;
  const emailed = b?.send ? await sendLinkEmail(link, url) : false;
  return NextResponse.json({ ok: true, url, id: link.id, emailed });
}
