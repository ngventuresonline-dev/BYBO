import { CONTACT } from '@/lib/site';
import { teamRecipients } from '@/lib/enquiry-ack';

/** Resend delivery shared by every email B sends. */

const FROM = process.env.ENQUIRY_FROM ?? `B at BYBO <${CONTACT.email}>`;

export const esc = (s: string) => s.replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c]!);

export type Turn = { role: 'user' | 'assistant'; text: string };

export async function sendMail(body: Record<string, unknown>) {
  const key = process.env.RESEND_API_KEY;
  if (!key) return false;
  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${key}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ from: FROM, ...body }),
  }).catch(() => null);
  if (!res?.ok) console.error('bybo-ai email failed', res?.status ?? 0, (await res?.text().catch(() => ''))?.slice(0, 300));
  return !!res?.ok;
}

export const toTeam = (body: Record<string, unknown>) => sendMail({ to: teamRecipients(), ...body });

/** The conversation, for the team's copy. */
export function transcriptHtml(turns: Turn[], name: string) {
  return turns.map((m) => `<p style="font-size:14px;margin:0 0 8px"><b style="color:${m.role === 'user' ? '#17141f' : '#6d3df5'}">${m.role === 'user' ? esc(name || 'Visitor') : 'B'}:</b> ${esc(m.text)}</p>`).join('');
}
export function transcriptText(turns: Turn[], name: string) {
  return turns.map((m) => `${m.role === 'user' ? name || 'Visitor' : 'B'}: ${m.text}`).join('\n\n');
}

export const shell = (inner: string) => `<div style="font-family:Arial,Helvetica,sans-serif;color:#17141f;max-width:620px;font-size:15px;line-height:1.55">${inner}<p style="margin-top:28px;color:#6b6578;font-size:13px">B, BYBO's AI · <a href="https://bybo.in" style="color:#6d3df5">bybo.in</a> · WhatsApp ${esc(CONTACT.phone)}</p></div>`;
