import { NextResponse } from 'next/server';
import { linksConfigured } from '@/lib/payments/link';
import { phonepeConfigured } from '@/lib/payments/phonepe';
import { productById } from '@/lib/payments/products';
import { startCheckout } from '@/lib/payments/start';
import { CONTACT } from '@/lib/site';

/**
 * A proposal's Pay button: a plain form POST with a quote milestone's id goes
 * straight to PhonePe for that milestone's amount. The payer and the price
 * both come from the catalogue, so nothing in the request can change them.
 * A form POST (not a link) keeps link previews and prefetching from opening orders.
 */

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const tries = new Map<string, number[]>();

function notice(message: string, status: number) {
  const html = `<!doctype html><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Payment | BYBO</title>
<body style="margin:0;min-height:100vh;display:grid;place-items:center;background:#0d0708;color:#f6f0e8;font:16px/1.6 system-ui,sans-serif;padding:24px;text-align:center">
<div><p style="font-size:20px;font-weight:600;margin:0 0 10px">${message}</p>
<p style="margin:0 0 22px;opacity:.7">Message us and we will send you a payment link straight away.</p>
<a href="https://wa.me/${CONTACT.whatsapp}" style="display:inline-block;padding:13px 20px;border-radius:99px;background:#e3131c;color:#fff;text-decoration:none">WhatsApp BYBO</a></div></body>`;
  return new NextResponse(html, { status, headers: { 'content-type': 'text/html; charset=utf-8' } });
}

export async function POST(request: Request) {
  const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown';
  const now = Date.now();
  const hits = (tries.get(ip) ?? []).filter((t) => now - t < 15 * 60_000);
  hits.push(now);
  tries.set(ip, hits);
  if (hits.length > 15) return notice('Too many attempts. Please wait a few minutes.', 429);

  const form = await request.formData().catch(() => null);
  const product = productById(String(form?.get('product') ?? '').slice(0, 40));
  if (!product?.unlisted || !product.payer) return notice('This payment link is not valid.', 404);
  if (!phonepeConfigured() || !linksConfigured()) return notice('Online payment is being switched on.', 503);

  const link = {
    id: `${product.id}-${new Date(now).toISOString().slice(0, 10).replace(/-/g, '')}`,
    name: product.payer.name, email: product.payer.email, phone: product.payer.phone ?? '', company: product.payer.company,
    purpose: `${product.name} (BYBO)`, amount: product.price, exp: Math.floor(now / 1000) + 2 * 86400,
  };
  try {
    const redirectUrl = await startCheckout(link, new URL(request.url).origin, now);
    return NextResponse.redirect(redirectUrl, 303);
  } catch (err) {
    console.error('pay go failed', (err as Error).message);
    return notice("PhonePe didn't respond.", 502);
  }
}
