import { NextResponse } from 'next/server';
import { adminAuthorized } from '@/lib/instagram/auth';
import { crmConfigured, rpc, type CrmEvent, type CrmLead } from '@/lib/crm/db';
import { brandedEmail, brandedEmailText } from '@/lib/email-layout';
import { sendBooking } from '@/lib/bybo-ai/booking';
import { findSlot } from '@/lib/bybo-ai/slots';
import { productById } from '@/lib/payments/products';
import { inr } from '@/lib/payments/link';
import { CONTACT } from '@/lib/site';

/**
 * One-click actions on a lead from the desk: send a branded email, send a
 * payment link, or book a discovery call. Each one is logged on the lead.
 * Admin only; every send is a deliberate click by the founder.
 */

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const EMAIL = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
const s = (v: unknown, max: number) => String(v ?? '').trim().slice(0, max);

async function findLead(id: string) {
  const all = await rpc<CrmLead[]>('bybo_crm_list', {});
  return all.find((l) => l.id === id) ?? null;
}

async function mail(to: string, subject: string, headline: string, paragraphs: string[], cta?: { href: string; label: string }) {
  const key = process.env.RESEND_API_KEY;
  if (!key) return false;
  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${key}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      from: process.env.ENQUIRY_FROM ?? `BYBO <${CONTACT.email}>`,
      to: [to],
      bcc: ['byboonline@gmail.com'],
      reply_to: CONTACT.email,
      subject,
      html: brandedEmail({ title: subject, eyebrow: 'BYBO', headline, intro: paragraphs, cta }),
      text: brandedEmailText({ headline, paragraphs, cta }),
    }),
  }).catch(() => null);
  if (!res?.ok) console.error('desk email failed', res?.status ?? 0, (await res?.text().catch(() => ''))?.slice(0, 200));
  return !!res?.ok;
}

const log = (lead: string, kind: string, title: string, body?: string, meta: Record<string, unknown> = {}) =>
  rpc<CrmEvent>('bybo_crm_log', { p_lead: lead, p_kind: kind, p_title: title, p_body: body ?? null, p_meta: meta });

export async function POST(request: Request, ctx: { params: Promise<{ id: string }> }) {
  if (!adminAuthorized(request)) return NextResponse.json({ ok: false }, { status: 401 });
  if (!crmConfigured()) return NextResponse.json({ ok: false, reason: 'not_configured' }, { status: 503 });
  const { id } = await ctx.params;
  if (!/^[0-9a-f-]{36}$/i.test(id)) return NextResponse.json({ ok: false, reason: 'invalid' }, { status: 400 });
  const b = (await request.json().catch(() => null)) as Record<string, unknown> | null;
  const lead = await findLead(id).catch(() => null);
  if (!lead) return NextResponse.json({ ok: false, reason: 'not_found' }, { status: 404 });
  const first = (lead.name ?? '').split(' ')[0] || 'there';

  if (b?.type === 'email') {
    if (!lead.email || !EMAIL.test(lead.email)) return NextResponse.json({ ok: false, reason: 'no_email' }, { status: 400 });
    const subject = s(b.subject, 160), headline = s(b.headline, 160) || subject;
    const paragraphs = s(b.body, 4000).split(/\n{2,}/).map((p) => p.replace(/\n/g, ' ').trim()).filter(Boolean);
    if (!subject || !paragraphs.length) return NextResponse.json({ ok: false, reason: 'invalid' }, { status: 400 });
    const ok = await mail(lead.email, subject, headline, paragraphs);
    if (!ok) return NextResponse.json({ ok: false, reason: 'send_failed' }, { status: 502 });
    const event = await log(id, 'email', `Emailed: ${subject}`, paragraphs.join('\n\n'));
    return NextResponse.json({ ok: true, event, message: `Email sent to ${lead.email}` });
  }

  if (b?.type === 'paylink') {
    const product = productById(s(b.product, 40));
    if (!product) return NextResponse.json({ ok: false, reason: 'invalid' }, { status: 400 });
    const url = `https://bybo.in/pay?product=${encodeURIComponent(product.id)}`;
    let sent = false;
    if (b.send === true) {
      if (!lead.email || !EMAIL.test(lead.email)) return NextResponse.json({ ok: false, reason: 'no_email' }, { status: 400 });
      sent = await mail(lead.email, `Your BYBO ${product.name}: secure payment link`, `${product.name} · ${inr(product.price)}`,
        [`Hi ${first},`, `As discussed, here is the secure PhonePe link for the ${product.name}. ${product.description}`, 'A receipt is emailed the moment it goes through. Reply to this email with any questions.'],
        { href: url, label: `Pay ${inr(product.price)}` });
      if (!sent) return NextResponse.json({ ok: false, reason: 'send_failed' }, { status: 502 });
    }
    const event = await log(id, 'payment', sent ? `Payment link emailed: ${product.name} (${inr(product.price)})` : `Payment link created: ${product.name} (${inr(product.price)})`, url, { product: product.id });
    await rpc('bybo_crm_update', { p_lead: id, p: { ...(lead.value ? {} : { value: String(product.price) }), ...(['new', 'contacted', 'call_booked'].includes(lead.stage) ? { stage: 'proposal' } : {}) } }).catch(() => null);
    return NextResponse.json({ ok: true, url, event, message: sent ? `Payment link sent to ${lead.email}` : 'Payment link copied' });
  }

  if (b?.type === 'book') {
    const slot = findSlot(s(b.slot, 40));
    if (!slot) return NextResponse.json({ ok: false, reason: 'slot_gone' }, { status: 400 });
    if (!lead.name || !lead.email || !EMAIL.test(lead.email) || !lead.phone) return NextResponse.json({ ok: false, reason: 'needs_contact' }, { status: 400 });
    const ok = await sendBooking({
      slot: slot.id, name: lead.name, email: lead.email, phone: lead.phone, company: lead.company ?? '',
      need: lead.need ?? 'Discovery call', summary: `Booked from the lead desk. ${lead.summary ?? ''}`.trim(), page: '/admin/crm', transcript: [],
    });
    if (!ok) return NextResponse.json({ ok: false, reason: 'send_failed' }, { status: 502 });
    return NextResponse.json({ ok: true, message: `Call booked for ${slot.label}; invite sent to ${lead.email}` });
  }

  return NextResponse.json({ ok: false, reason: 'unknown_action' }, { status: 400 });
}
