import { rpc } from './db';

/** Server-only helpers for proposals: Resend email and CRM events. Never throw. */

export async function log(lead: string, kind: string, title: string, body?: string, meta: Record<string, unknown> = {}) {
  await rpc('bybo_crm_log', { p_lead: lead, p_kind: kind, p_title: title, p_body: body ?? null, p_meta: meta }).catch(() => null);
}

export async function email(to: string[], subject: string, headline: string, paragraphs: string[], cta?: { href: string; label: string }, opts: { bcc?: string[]; replyTo?: string; key?: string } = {}) {
  const key = process.env.RESEND_API_KEY;
  if (!key) return false;
  const { brandedEmail, brandedEmailText } = await import('@/lib/email-layout');
  const { CONTACT } = await import('@/lib/site');
  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${key}`, 'Content-Type': 'application/json', ...(opts.key ? { 'Idempotency-Key': opts.key } : {}) },
    body: JSON.stringify({
      from: process.env.ENQUIRY_FROM ?? `BYBO <${CONTACT.email}>`, to, ...(opts.bcc ? { bcc: opts.bcc } : {}), reply_to: opts.replyTo ?? CONTACT.email, subject,
      html: brandedEmail({ title: subject, eyebrow: 'BYBO', headline, intro: paragraphs, cta }),
      text: brandedEmailText({ headline, paragraphs, cta }),
    }),
    signal: AbortSignal.timeout(15_000),
  }).catch(() => null);
  return !!res?.ok;
}
