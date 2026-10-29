import { NextResponse } from 'next/server';
import { readLink } from '@/lib/payments/link';
import { createOrder, phonepeConfigured } from '@/lib/payments/phonepe';

/** Starts a PhonePe checkout for a signed payment link and returns PhonePe's URL. */

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  if (!phonepeConfigured()) return NextResponse.json({ ok: false, reason: 'not_configured' }, { status: 503 });
  const b = await request.json().catch(() => null) as { token?: string } | null;
  const token = String(b?.token ?? '').slice(0, 4000);
  const link = readLink(token);
  if (!link) return NextResponse.json({ ok: false, reason: 'invalid_link' }, { status: 400 });

  // The order id carries the reference; the result page re-reads the link from `t`.
  const merchantOrderId = `bybo_${link.id.replace(/[^a-zA-Z0-9_-]/g, '_').slice(0, 30)}_${Date.now().toString(36)}`;
  const origin = new URL(request.url).origin;
  try {
    const order = await createOrder({
      merchantOrderId,
      amountPaisa: Math.round(link.amount * 100),
      message: `BYBO: ${link.purpose}`,
      redirectUrl: `${origin}/pay/result?o=${encodeURIComponent(merchantOrderId)}&t=${encodeURIComponent(token)}`,
      meta: { ref: link.id, name: link.name, email: link.email, phone: link.phone, purpose: link.purpose },
    });
    return NextResponse.json({ ok: true, redirectUrl: order.redirectUrl });
  } catch (err) {
    console.error('payment start failed', (err as Error).message);
    return NextResponse.json({ ok: false, reason: 'gateway_error' }, { status: 502 });
  }
}
