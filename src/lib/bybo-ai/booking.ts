import { CONTACT } from '@/lib/site';
import { teamRecipients } from '@/lib/enquiry-ack';
import { SLOT_MINUTES, slotLabel } from './slots';

/**
 * A call BYBO AI has booked: the team gets the lead with the conversation,
 * the visitor gets a confirmation, and both get a calendar invite (.ics).
 */

export type Booking = {
  slot: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  need: string;
  summary: string;
  page: string;
  transcript: { role: 'user' | 'assistant'; text: string }[];
};

const FROM = process.env.ENQUIRY_FROM ?? `BYBO <${CONTACT.email}>`;

const esc = (s: string) => s.replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c]!);
const icsText = (s: string) => s.replace(/\\/g, '\\\\').replace(/\n/g, '\\n').replace(/[,;]/g, (c) => `\\${c}`);
const stamp = (d: Date) => d.toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '');

function invite(b: Booking, start: Date) {
  const end = new Date(start.getTime() + SLOT_MINUTES * 60_000);
  const uid = `${stamp(start)}-${b.email.toLowerCase()}@bybo.in`;
  const ics = [
    'BEGIN:VCALENDAR', 'VERSION:2.0', 'PRODID:-//BYBO//BYBO AI//EN', 'METHOD:PUBLISH',
    'BEGIN:VEVENT',
    `UID:${uid}`, `DTSTAMP:${stamp(new Date())}`, `DTSTART:${stamp(start)}`, `DTEND:${stamp(end)}`,
    `SUMMARY:${icsText(`BYBO discovery call with ${b.name}`)}`,
    `DESCRIPTION:${icsText(`${b.need}\nPhone: ${b.phone}\nBooked by BYBO AI on bybo.in`)}`,
    `ORGANIZER;CN=BYBO:mailto:${CONTACT.email}`,
    'END:VEVENT', 'END:VCALENDAR',
  ].join('\r\n');
  return { filename: 'bybo-call.ics', content: Buffer.from(ics).toString('base64') };
}

function teamMail(b: Booking, when: string) {
  const rows: [string, string][] = [
    ['When', when], ['Name', b.name], ['Email', b.email], ['Phone', b.phone],
    ['Company', b.company || 'Not given'], ['Needs', b.need], ['Booked from', b.page || 'bybo.in'],
  ];
  const chat = b.transcript.map((m) => `${m.role === 'user' ? b.name : 'BYBO AI'}: ${m.text}`).join('\n\n');
  const text = `New call booked by BYBO AI\n\n${rows.map(([k, v]) => `${k}: ${v}`).join('\n')}\n\nSummary: ${b.summary}\n\nConversation\n\n${chat}`;
  const html = `<div style="font-family:Arial,sans-serif;color:#17141f;max-width:620px">
<p style="font-size:12px;letter-spacing:.12em;text-transform:uppercase;color:#6d3df5;margin:0">BYBO AI · call booked</p>
<h2 style="margin:6px 0 16px">${esc(b.name)}, ${esc(when)}</h2>
<table style="border-collapse:collapse;font-size:14px">${rows.map(([k, v]) => `<tr><td style="padding:4px 16px 4px 0;color:#6b6578">${k}</td><td style="padding:4px 0"><b>${esc(v)}</b></td></tr>`).join('')}</table>
<p style="font-size:14px;margin:16px 0"><b>Summary:</b> ${esc(b.summary)}</p>
<h3 style="font-size:15px;margin:24px 0 8px">Conversation</h3>
${b.transcript.map((m) => `<p style="font-size:14px;margin:0 0 8px"><b style="color:${m.role === 'user' ? '#17141f' : '#6d3df5'}">${m.role === 'user' ? esc(b.name) : 'BYBO AI'}:</b> ${esc(m.text)}</p>`).join('')}
</div>`;
  return { subject: `Call booked: ${b.name}, ${when}`, text, html };
}

function visitorMail(b: Booking, when: string) {
  const first = b.name.split(' ')[0];
  const text = `Hi ${first},\n\nYour call with BYBO is booked for ${when} (30 minutes).\n\nWe'll call you on ${b.phone}. The calendar invite is attached.\n\nWhat we'll cover: ${b.need}\n\nNeed to change the time? Reply to this email or WhatsApp us on ${CONTACT.phone}.\n\nBYBO\nbybo.in`;
  const html = `<div style="font-family:Arial,sans-serif;color:#17141f;max-width:560px;font-size:15px;line-height:1.55">
<p>Hi ${esc(first)},</p>
<p>Your call with BYBO is booked.</p>
<p style="padding:16px 18px;border-radius:12px;background:#f1ecff;font-size:17px;margin:16px 0"><b>${esc(when)}</b><br><span style="font-size:14px;color:#4f4a5c">30 minutes · we'll call you on ${esc(b.phone)}</span></p>
<p><b>What we'll cover:</b> ${esc(b.need)}</p>
<p>The calendar invite is attached. Need to change the time? Reply to this email or WhatsApp us on ${esc(CONTACT.phone)}.</p>
<p style="color:#6b6578">BYBO · <a href="https://bybo.in" style="color:#6d3df5">bybo.in</a></p>
</div>`;
  return { subject: `Your BYBO call is booked: ${when}`, text, html };
}

async function send(key: string, body: Record<string, unknown>) {
  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${key}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ from: FROM, ...body }),
  }).catch(() => null);
  if (!res?.ok) console.error('bybo-ai booking email failed', res?.status ?? 0, (await res?.text().catch(() => ''))?.slice(0, 300));
  return !!res?.ok;
}

/** True when the team email went out. The visitor copy is best effort. */
export async function sendBooking(b: Booking) {
  const key = process.env.RESEND_API_KEY;
  if (!key) return false;
  const start = new Date(b.slot);
  const when = slotLabel(start);
  const attachments = [invite(b, start)];
  const team = await send(key, { to: teamRecipients(), reply_to: b.email, attachments, ...teamMail(b, when) });
  if (!team) return false;
  await send(key, { to: [b.email], reply_to: CONTACT.email, attachments, ...visitorMail(b, when) });
  return true;
}
