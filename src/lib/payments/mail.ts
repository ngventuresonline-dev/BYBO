import { CONTACT } from '@/lib/site';
import { teamRecipients } from '@/lib/enquiry-ack';
import { inr, type PayLink } from './link';

/** Payment emails: the link to the client, and receipts to client and team. */

const FROM = process.env.PAYMENTS_FROM ?? `BYBO Payments <${CONTACT.email}>`;
const esc = (s: string) => s.replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c]!);

async function send(body: Record<string, unknown>) {
  const key = process.env.RESEND_API_KEY;
  if (!key) return false;
  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${key}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ from: FROM, ...body }),
    signal: AbortSignal.timeout(8000),
  }).catch(() => null);
  if (!res?.ok) console.error('payments email failed', res?.status ?? 0);
  return !!res?.ok;
}

const frame = (inner: string) => `<div style="font-family:Arial,Helvetica,sans-serif;color:#17141f;max-width:560px;font-size:15px;line-height:1.55">${inner}<p style="margin-top:28px;color:#6b6578;font-size:13px">BYBO · ${esc(CONTACT.parent)} · <a href="https://bybo.in" style="color:#6d3df5">bybo.in</a> · ${esc(CONTACT.email)}</p></div>`;

const table = (rows: [string, string][]) => `<table style="border-collapse:collapse;font-size:14px;width:100%">${rows.filter(([, v]) => v).map(([k, v]) => `<tr><td style="padding:8px 12px;border:1px solid #ece8f5;color:#6b6578;width:38%">${k}</td><td style="padding:8px 12px;border:1px solid #ece8f5"><b>${esc(v)}</b></td></tr>`).join('')}</table>`;

export function sendLinkEmail(link: PayLink, url: string) {
  const first = link.name.split(' ')[0];
  return send({
    to: [link.email],
    reply_to: CONTACT.email,
    subject: `Payment link from BYBO: ${link.purpose} (${inr(link.amount)})`,
    html: frame(`<p>Hi ${esc(first)},</p><p>Here is your secure payment link for <b>${esc(link.purpose)}</b>.</p>
${table([['Amount', inr(link.amount)], ['Reference', link.id], ['For', link.company || link.name]])}
<p style="margin:22px 0"><a href="${url}" style="display:inline-block;padding:13px 22px;border-radius:99px;background:#6d3df5;color:#fff;text-decoration:none;font-weight:700">Pay ${inr(link.amount)} securely</a></p>
<p style="font-size:13px;color:#6b6578">Payments are processed by PhonePe (UPI, cards, netbanking). Questions? Reply to this email.</p>`),
    text: `Hi ${first},\n\nYour payment link for ${link.purpose} (${inr(link.amount)}, ref ${link.id}):\n${url}\n\nBYBO`,
  });
}

export async function sendReceipts(link: PayLink, r: { orderId: string; transactionId: string | null; mode: string | null; paidAt: Date }) {
  const when = r.paidAt.toLocaleString('en-IN', { timeZone: 'Asia/Kolkata', dateStyle: 'medium', timeStyle: 'short' });
  const rows: [string, string][] = [
    ['Amount paid', inr(link.amount)], ['For', link.purpose], ['Reference', link.id],
    ['Order ID', r.orderId], ['PhonePe transaction', r.transactionId ?? ''], ['Method', r.mode ?? ''], ['Paid on', `${when} IST`],
  ];
  const client = send({
    to: [link.email],
    reply_to: CONTACT.email,
    subject: `Payment received: ${inr(link.amount)} for ${link.purpose}`,
    html: frame(`<p>Hi ${esc(link.name.split(' ')[0])},</p><p>Thank you. We've received your payment.</p>${table(rows)}<p>Keep this email as your receipt. Your BYBO lead will be in touch about next steps.</p>`),
    text: rows.filter(([, v]) => v).map(([k, v]) => `${k}: ${v}`).join('\n'),
  });
  const team = send({
    to: teamRecipients(),
    reply_to: link.email,
    subject: `Payment received: ${inr(link.amount)} from ${link.company || link.name} (${link.id})`,
    html: frame(`<p style="font-size:12px;letter-spacing:.12em;text-transform:uppercase;color:#16a34a;margin:0">Payment received</p>${table([...rows, ['Client', link.name], ['Company', link.company], ['Email', link.email], ['Phone', link.phone]])}`),
  });
  await Promise.all([client, team]);
}
