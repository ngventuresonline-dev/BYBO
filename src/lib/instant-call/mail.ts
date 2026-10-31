import { CONTACT } from '@/lib/site';
import { brandedEmail, brandedEmailText, escapeHtml } from '@/lib/email-layout';
import type { Lead } from './types';

const SUMMARY_TO = 'byboonline@gmail.com';

export function callSummaryContent(lead: Lead): { subject: string; text: string; html: string } {
  const who = lead.name.trim() || 'A lead';
  const outcome = lead.call_status.replace(/_/g, ' ');
  const summary = lead.call_summary?.trim() || 'No transcript summary was returned.';
  const next = lead.call_status === 'whatsapp_only'
    ? 'Calling has stopped. A person may follow up on WhatsApp.'
    : lead.next_call_at
      ? `Next attempt after ${lead.next_call_at}.`
      : 'No further automatic call is scheduled.';
  const fields: Array<[string, string]> = [
    ['Name', who],
    ['Business', lead.business || 'Not given'],
    ['Phone', lead.phone_e164 || 'Not given'],
    ['Email', lead.email || 'Not given'],
    ['Outcome', outcome],
    ['Attempts', String(lead.call_attempts)],
    ['Next', next],
    ['Lead', lead.id],
  ];
  const subject = `Call ${outcome}: ${who}`;
  return {
    subject,
    text: brandedEmailText({
      headline: subject,
      paragraphs: [summary],
      fields,
    }),
    html: brandedEmail({
      title: subject,
      eyebrow: 'BYBO Voice',
      headline: subject,
      intro: [summary],
      innerHtml: `<table style="border-collapse:collapse;font-size:14px">${fields.map(([key, value]) => `<tr><td style="padding:4px 16px 4px 0;color:#5b5862">${escapeHtml(key)}</td><td style="padding:4px 0"><b>${escapeHtml(value)}</b></td></tr>`).join('')}</table>`,
    }),
  };
}

/** Finished-call note to the team inbox. Does nothing unless the switch is on. */
export async function sendCallSummary(lead: Lead): Promise<boolean> {
  if (process.env.INSTANT_CALL_ENABLED !== 'true') return false;
  const key = process.env.RESEND_API_KEY;
  if (!key) return false;
  const from = process.env.ENQUIRY_FROM ?? `BYBO <${CONTACT.email}>`;
  const mail = callSummaryContent(lead);
  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${key}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ from, to: [SUMMARY_TO], subject: mail.subject, text: mail.text, html: mail.html }),
  }).catch(() => null);
  if (!res?.ok) {
    console.error('call summary email failed', res?.status ?? 0);
    return false;
  }
  return true;
}
