import { NextResponse } from 'next/server';

/**
 * Receives an enquiry from /apply and emails it to the inbox.
 *
 * Delivery goes through Resend's REST API, so there is no dependency to keep
 * up to date — only RESEND_API_KEY in the environment. Without that key the
 * route says so plainly and the form falls back to opening the visitor's own
 * email client, so an enquiry is never silently lost.
 */

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const TO = process.env.ENQUIRY_TO ?? 'hello@bybo.in';
const FROM = process.env.ENQUIRY_FROM ?? 'BYBO site <onboarding@resend.dev>';

/** Simple in-memory throttle. Enough to stop a bored script, not a botnet. */
const seen = new Map<string, number[]>();
const LIMIT = 5, WINDOW = 10 * 60_000;

function rateLimited(ip: string) {
  const now = Date.now();
  const hits = (seen.get(ip) ?? []).filter(t => now - t < WINDOW);
  hits.push(now);
  seen.set(ip, hits);
  if (seen.size > 500) for (const [k, v] of seen) if (!v.some(t => now - t < WINDOW)) seen.delete(k);
  return hits.length > LIMIT;
}

const str = (v: FormDataEntryValue | null, max: number) => String(v ?? '').trim().slice(0, max);

export async function POST(request: Request) {
  const form = await request.formData();

  // A field no person can see; anything that fills it is a bot.
  if (str(form.get('company_website'), 80)) return NextResponse.json({ ok: true });

  const name = str(form.get('name'), 120);
  const email = str(form.get('email'), 200);
  const message = str(form.get('message'), 4000);
  if (!name || !email || !message || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
    return NextResponse.json({ ok: false, reason: 'invalid' }, { status: 400 });
  }

  const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown';
  if (rateLimited(ip)) return NextResponse.json({ ok: false, reason: 'rate_limited' }, { status: 429 });

  const services = form.getAll('services').map(v => str(v, 80)).filter(Boolean);
  const lines = [
    `Name: ${name}`,
    `Work email: ${email}`,
    `Company: ${str(form.get('company'), 160) || 'Not provided'}`,
    `Phone: ${str(form.get('phone'), 30) || 'Not provided'}`,
    `Interested in: ${services.length ? services.join(', ') : 'Not sure yet'}`,
    `Industry: ${str(form.get('industry'), 120) || 'Not provided'}`,
    `Role: ${str(form.get('role'), 100) || 'Not provided'}`,
    `Website: ${str(form.get('website'), 200) || 'Not provided'}`,
    '',
    message,
  ];

  const key = process.env.RESEND_API_KEY;
  if (!key) return NextResponse.json({ ok: false, reason: 'not_configured' }, { status: 503 });

  const sent = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${key}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      from: FROM,
      to: [TO],
      reply_to: email,
      subject: `Enquiry from ${name}${services.length ? ` — ${services[0]}${services.length > 1 ? ` +${services.length - 1}` : ''}` : ''}`,
      text: lines.join('\n'),
    }),
  }).catch(() => null);

  if (!sent?.ok) return NextResponse.json({ ok: false, reason: 'send_failed' }, { status: 502 });
  return NextResponse.json({ ok: true });
}
