import { NextResponse } from 'next/server';
import { CONTACT } from '@/lib/site';
import { firstName, visitorAck } from '@/lib/enquiry-ack';

/**
 * Receives an enquiry from /apply and emails it to the team inbox.
 *
 * Delivery goes through Resend's REST API, so there is no dependency to keep
 * up to date — only RESEND_API_KEY in the environment. Without that key the
 * route says so plainly and the form falls back to the visitor's own email
 * client, so an enquiry is never silently lost.
 *
 * After the team email succeeds, a visitor acknowledgement is sent with the
 * published Resend template `bybo-enquiry-ack`. A failed ack is logged and
 * does not fail the request — the team copy is the hard requirement.
 */

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const TO = process.env.ENQUIRY_TO ?? CONTACT.email;
/** Must be a domain verified in Resend, or every send is rejected. */
const FROM = process.env.ENQUIRY_FROM ?? `BYBO <${CONTACT.email}>`;

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

type Mail = {
  to: string[];
  subject: string;
  text?: string;
  replyTo?: string;
  template?: { id: string; variables: Record<string, string> };
};

async function send(key: string, mail: Mail) {
  return fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${key}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      from: FROM,
      to: mail.to,
      subject: mail.subject,
      ...(mail.template
        ? { template: mail.template }
        : { text: mail.text }),
      ...(mail.replyTo ? { reply_to: mail.replyTo } : {}),
    }),
  }).catch(() => null);
}

async function logFailure(label: string, res: Response | null) {
  const detail = res ? await res.text().catch(() => '') : 'network_error';
  console.error(label, res?.status ?? 0, detail.slice(0, 300));
}

/** Best-effort visitor copy. Never throws; never fails the enquiry. */
async function acknowledgeVisitor(key: string, email: string, name: string, services: string[]) {
  const ack = visitorAck(name, services);
  const templated = await send(key, { to: [email], ...ack });
  if (templated?.ok) return;

  await logFailure('enquiry acknowledgement template failed', templated);

  const fallback = await send(key, {
    to: [email],
    subject: ack.subject,
    text: [
      `We have your note, ${firstName(name)}.`,
      '',
      `Thank you for writing to BYBO${ack.template.variables.TOPIC_LINE}. A person on the team will review what you sent.`,
      '',
      'We reply during Indian business hours. You do not need to repeat the details unless something material has changed.',
      '',
      `If it is urgent, WhatsApp is faster: ${CONTACT.phone}.`,
      '',
      '— BYBO',
      'bybo.in',
    ].join('\n'),
  });
  if (!fallback?.ok) await logFailure('enquiry acknowledgement fallback failed', fallback);
}

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
  const body = [
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
  ].join('\n');

  const key = process.env.RESEND_API_KEY;
  if (!key) return NextResponse.json({ ok: false, reason: 'not_configured' }, { status: 503 });

  const picked = services.length ? ` — ${services[0]}${services.length > 1 ? ` +${services.length - 1}` : ''}` : '';
  const notified = await send(key, {
    to: [TO],
    subject: `Enquiry from ${name}${picked}`,
    text: body,
    replyTo: email,          // replying in the inbox goes straight to the visitor
  });

  if (!notified?.ok) {
    await logFailure('enquiry send failed', notified);
    return NextResponse.json({ ok: false, reason: 'send_failed' }, { status: 502 });
  }

  try {
    await acknowledgeVisitor(key, email, name, services);
  } catch (err) {
    console.error('enquiry acknowledgement failed', err);
  }
  return NextResponse.json({ ok: true });
}
