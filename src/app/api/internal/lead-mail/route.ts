import { createHash, timingSafeEqual } from 'node:crypto';
import { NextResponse } from 'next/server';
import { brandedEmail, brandedEmailText } from '@/lib/email-layout';
import { CONTACT } from '@/lib/site';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

/** SHA-256 of the one-off token that may send a branded note to a lead. */
const TOKEN_SHA256 = '357ee1283fe1fcb415fbfe285a4b0d060946a21595c5220bda7c0debf783e39b';

type Body = {
  key: string;
  to: string;
  subject: string;
  eyebrow: string;
  headline: string;
  intro: string[];
  cta?: { href: string; label: string };
};

function authorized(header: string | null): boolean {
  const token = header?.match(/^Bearer (.+)$/)?.[1];
  if (!token) return false;
  const digest = createHash('sha256').update(token).digest();
  return timingSafeEqual(digest, Buffer.from(TOKEN_SHA256, 'hex'));
}

function valid(body: Partial<Body>): body is Body {
  const text = (value: unknown) => typeof value === 'string' && value.trim().length > 0;
  return text(body.key) && text(body.subject) && text(body.eyebrow) && text(body.headline)
    && /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(body.to ?? '')
    && Array.isArray(body.intro) && body.intro.length > 0 && body.intro.every(text)
    && (!body.cta || (text(body.cta.label) && /^https:\/\//.test(body.cta.href)));
}

/** Sends one note to a lead in the BYBO email layout. Resend's key stops a repeat within a day. */
export async function POST(request: Request) {
  if (!authorized(request.headers.get('authorization'))) {
    return NextResponse.json({ ok: false }, { status: 401 });
  }
  const body = await request.json().catch(() => ({})) as Partial<Body>;
  if (!valid(body)) return NextResponse.json({ ok: false, reason: 'invalid' }, { status: 400 });
  const key = process.env.RESEND_API_KEY;
  if (!key) return NextResponse.json({ ok: false, reason: 'not_configured' }, { status: 503 });

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${key}`, 'Content-Type': 'application/json', 'Idempotency-Key': `lead-mail/${body.key}` },
    body: JSON.stringify({
      from: process.env.ENQUIRY_FROM ?? `BYBO <${CONTACT.email}>`,
      to: [body.to],
      subject: body.subject,
      reply_to: CONTACT.email,
      html: brandedEmail({ title: body.subject, eyebrow: body.eyebrow, headline: body.headline, intro: body.intro, cta: body.cta }),
      text: brandedEmailText({ headline: body.headline, paragraphs: body.intro, cta: body.cta }),
    }),
  }).catch(() => null);
  if (!res?.ok) {
    const reason = await res?.text().catch(() => '');
    console.error('lead mail failed', body.key, res?.status ?? 0, reason?.slice(0, 200));
    return NextResponse.json({ ok: false, status: res?.status ?? 0 }, { status: 502 });
  }
  return NextResponse.json({ ok: true });
}
