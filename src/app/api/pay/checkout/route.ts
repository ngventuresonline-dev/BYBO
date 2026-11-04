import { NextResponse } from 'next/server';
import { linksConfigured, MAX_INR, MIN_INR } from '@/lib/payments/link';
import { phonepeConfigured } from '@/lib/payments/phonepe';
import { productById } from '@/lib/payments/products';
import { payerKilled } from '@/lib/crm/kill';
import { startCheckout } from '@/lib/payments/start';

/**
 * The Pay button: a client enters their details and amount on /pay and goes
 * straight to PhonePe. The details are signed into the return URL, so the
 * result page can match PhonePe's confirmed amount to what was asked for.
 */

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
  if (hits.length > 15) return NextResponse.json({ ok: false, reason: 'rate_limited' }, { status: 429 });

  if (!phonepeConfigured() || !linksConfigured()) return NextResponse.json({ ok: false, reason: 'not_configured' }, { status: 503 });

  const b = await request.json().catch(() => null) as Record<string, unknown> | null;
  // A listed product's price always comes from the catalogue, never the browser.
  const product = productById(s(b?.product, 40));
  if (product?.payer && await payerKilled(product.payer.email)) return NextResponse.json({ ok: false, reason: 'inactive' }, { status: 410 });
  const amount = product ? product.price : Math.round(Number(b?.amount) * 100) / 100;
  const ref = s(b?.reference, 40).replace(/[^a-zA-Z0-9_-]/g, '');
  const link = {
    id: ref || `BYBO-${new Date().toISOString().slice(0, 10).replace(/-/g, '')}-${Math.random().toString(36).slice(2, 6).toUpperCase()}`,
    name: s(b?.name, 120), email: s(b?.email, 200), phone: s(b?.phone, 30), company: s(b?.company, 160),
    purpose: product ? `${product.name} (BYBO)` : s(b?.purpose, 160) || 'Payment to BYBO', amount, exp: Math.floor(now / 1000) + 2 * 86400,
  };
  if (!link.name || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(link.email) || link.phone.replace(/\D/g, '').length < 8 || !(amount >= MIN_INR && amount <= MAX_INR)) {
    return NextResponse.json({ ok: false, reason: 'invalid' }, { status: 400 });
  }

  try {
    const redirectUrl = await startCheckout(link, new URL(request.url).origin, now);
    return NextResponse.json({ ok: true, redirectUrl });
  } catch (err) {
    console.error('pay checkout failed', (err as Error).message);
    return NextResponse.json({ ok: false, reason: 'gateway_error' }, { status: 502 });
  }
}
