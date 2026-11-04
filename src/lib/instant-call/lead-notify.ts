import { teamRecipients, visitorAck } from '@/lib/enquiry-ack';
import { visitorAckFallback } from '@/lib/enquiry-mail';
import { brandedEmail, brandedEmailText, escapeHtml } from '@/lib/email-layout';
import { CONTACT } from '@/lib/site';
import { getLeadStore, type LeadStore } from './store';
import type { Lead } from './types';
import { asRecord } from './webhook';

export type AckState = 'sent' | 'failed' | 'no_email';

const ACK_LABEL: Record<AckState, string> = {
  sent: 'Sent',
  failed: 'Failed to send',
  no_email: 'Not sent, no valid email on the form',
};

const SUBJECT_MAX = 120;

type Mail = {
  to: string[];
  subject: string;
  text?: string;
  html?: string;
  replyTo?: string;
  template?: { id: string; variables: Record<string, string> };
};

export function hasValidEmail(email: string): boolean {
  return /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email.trim());
}

export function metaLeadReport(lead: Lead, ack: AckState) {
  const who = lead.name.trim() || 'Name not given';
  const meta = asRecord(lead.raw.meta);
  const text = (value: unknown) => (typeof value === 'string' && value.trim() ? value.trim() : 'Not given');
  const fields: Array<[string, string]> = [
    ['Name', who],
    ['Email', lead.email || 'Not given'],
    ['Phone', lead.phone_e164 || 'Not given'],
    ['Business', lead.business || 'Not given'],
    ['Source', text(lead.raw.lead_source)],
    ['Campaign', text(meta.campaign_name)],
    ['Ad', text(meta.ad_name)],
    ['Form', text(meta.form_name)],
    ['Received', text(meta.created_time) === 'Not given' ? lead.created_at : text(meta.created_time)],
    ['Confirmation email', ACK_LABEL[ack]],
    ['Call status', lead.call_status.replace(/_/g, ' ')],
    ['Lead', lead.id],
  ];
  const enquiry = lead.enquiry.trim() || 'The form had no further answers.';
  // Form answers can run over several lines, which Resend refuses in a subject.
  const subject = `Meta lead: ${who}${lead.business.trim() ? ` (${lead.business.trim()})` : ''}`.replace(/\s+/g, ' ').slice(0, SUBJECT_MAX);
  return {
    subject,
    text: brandedEmailText({ headline: subject, paragraphs: [enquiry], fields }),
    html: brandedEmail({
      title: subject,
      eyebrow: 'New Meta lead',
      headline: subject,
      intro: [enquiry],
      innerHtml: `<table style="border-collapse:collapse;font-size:14px">${fields.map(([key, value]) => `<tr><td style="padding:4px 16px 4px 0;color:#5b5862">${escapeHtml(key)}</td><td style="padding:4px 0"><b>${escapeHtml(value)}</b></td></tr>`).join('')}</table>`,
    }),
  };
}

/** One Resend send. The key stops a redelivered webhook sending the same mail twice within a day. */
async function send(key: string, idempotencyKey: string, mail: Mail): Promise<boolean> {
  const from = process.env.ENQUIRY_FROM ?? `BYBO <${CONTACT.email}>`;
  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${key}`,
      'Content-Type': 'application/json',
      'Idempotency-Key': idempotencyKey,
    },
    body: JSON.stringify({
      from,
      to: mail.to,
      subject: mail.subject,
      ...(mail.template ? { template: mail.template } : { text: mail.text, html: mail.html }),
      ...(mail.replyTo ? { reply_to: mail.replyTo } : {}),
    }),
  }).catch(() => null);
  if (!res?.ok) {
    const reason = await res?.text().catch(() => '');
    console.error('lead email failed', idempotencyKey, res?.status ?? 0, reason?.slice(0, 200));
  }
  return Boolean(res?.ok);
}

/** The same note a website visitor gets: the published template, then the themed fallback. */
async function acknowledgeLead(key: string, lead: Lead): Promise<AckState> {
  if (!hasValidEmail(lead.email)) return 'no_email';
  const name = lead.name.trim() || 'there';
  const to = [lead.email.trim()];
  const replyTo = CONTACT.email;
  const ref = leadRef(lead);
  const services = Array.isArray(lead.raw.services) ? (lead.raw.services as unknown[]).map(String) : [];
  if (await send(key, `meta-lead-ack/${ref}`, { to, replyTo, ...visitorAck(name, services) })) return 'sent';
  const fallback = await send(key, `meta-lead-ack-fallback/${ref}`, { to, replyTo, ...visitorAckFallback(name, services) });
  return fallback ? 'sent' : 'failed';
}

/** Meta's id is the same on every delivery, even if the lead was not stored. */
function leadRef(lead: Lead): string {
  return lead.external_id ?? lead.id;
}

/**
 * Confirms to the lead, then reports to the team inboxes, so the report can say
 * whether the confirmation went. Each step runs once per lead and survives a
 * redelivery. A failed confirmation is reported, not retried. A failed report
 * returns false so the webhook can ask Meta to try again.
 */
export async function notifyMetaLead(
  lead: Lead,
  deps: { store?: Pick<LeadStore, 'get' | 'save'> } = {},
): Promise<{ reported: boolean; ack: AckState }> {
  const stored = typeof lead.raw.lead_ack === 'string' ? lead.raw.lead_ack as AckState : null;
  const alreadyReported = Boolean(lead.raw.lead_reported_at);
  if (stored && alreadyReported) return { reported: true, ack: stored };

  const key = process.env.RESEND_API_KEY;
  if (!key) {
    console.error('lead email not configured', lead.id);
    return { reported: false, ack: stored ?? 'failed' };
  }

  const ack = stored ?? await acknowledgeLead(key, lead);
  const mail = metaLeadReport(lead, ack);
  const reported = alreadyReported || await send(key, `meta-lead-report/${leadRef(lead)}`, {
    to: teamRecipients(),
    ...mail,
    ...(hasValidEmail(lead.email) ? { replyTo: lead.email.trim() } : {}),
  });

  try {
    const store = deps.store ?? await getLeadStore();
    const fresh = await store.get(lead.id);
    if (fresh) {
      await store.save({
        ...fresh,
        raw: { ...fresh.raw, lead_ack: ack, ...(reported ? { lead_reported_at: new Date().toISOString() } : {}) },
      });
    }
  } catch {
    console.error('lead email state not saved', lead.id);
  }
  return { reported, ack };
}
