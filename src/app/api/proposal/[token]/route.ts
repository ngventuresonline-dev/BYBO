import { NextResponse } from 'next/server';
import { crmConfigured, rpc } from '@/lib/crm/db';
import { email, log } from '@/lib/crm/proposal-mail';
import { proposalUrl, TOKEN, type Proposal, type PublicProposal } from '@/lib/crm/proposals';
import { teamRecipients } from '@/lib/enquiry-ack';

/** The client's side of a proposal link: mark it viewed once, or accept it. Public, keyed by the token. */

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

type Ctx = { params: Promise<{ token: string }> };
const inr = (n: number) => `₹${Math.round(n).toLocaleString('en-IN')}`;

export async function POST(request: Request, ctx: Ctx) {
  const { token } = await ctx.params;
  if (!TOKEN.test(token)) return NextResponse.json({ ok: false, reason: 'not_found' }, { status: 404 });
  if (!crmConfigured()) return NextResponse.json({ ok: false, reason: 'not_configured' }, { status: 503 });
  const b = (await request.json().catch(() => ({}))) as { action?: unknown };
  if (b.action !== 'view' && b.action !== 'accept') return NextResponse.json({ ok: false, reason: 'invalid' }, { status: 400 });

  try {
    const p = await rpc<PublicProposal | null>('bybo_proposal_by_token', { p_token: token });
    if (!p) return NextResponse.json({ ok: false, reason: 'not_found' }, { status: 404 });
    const title = p.title || 'BYBO proposal';
    const who = p.lead_name || p.lead_company || 'The client';

    if (b.action === 'view') {
      const r = await rpc<Proposal | null>('bybo_proposal_mark', { p_token: token, p_status: 'viewed' });
      // Only the first view moves it; later visits change nothing.
      if (r?.id) await log(p.lead_id, 'proposal', `Proposal opened: ${title}`, undefined, { proposal: p.id });
      return NextResponse.json({ ok: true });
    }

    if (p.status === 'accepted') return NextResponse.json({ ok: true, already: true });
    if (p.valid_until && Date.parse(`${p.valid_until}T23:59:59+05:30`) < Date.now()) {
      return NextResponse.json({ ok: false, reason: 'expired', message: 'This proposal has expired. Message us and we will refresh it.' }, { status: 409 });
    }
    const r = await rpc<Proposal | null>('bybo_proposal_mark', { p_token: token, p_status: 'accepted' });
    if (!r?.id) return NextResponse.json({ ok: false, reason: 'not_open', message: 'This proposal can’t be accepted right now. Message us and we will help.' }, { status: 409 });
    await log(p.lead_id, 'proposal', `Proposal accepted: ${title} (${inr(r.total)})`, proposalUrl(token), { proposal: p.id });
    await email(teamRecipients(), `Proposal accepted: ${title}`, `${who} accepted a proposal`, [
      `${who}${p.lead_company && p.lead_name ? ` (${p.lead_company})` : ''} accepted “${title}”.`,
      `Total: ${inr(r.total)}.${r.milestones.length ? ` Milestones: ${r.milestones.map((m) => `${m.label} ${m.pct}%`).join(', ')}.` : ''}`,
      'Send the first payment link and confirm the start date.',
    ], { href: 'https://bybo.in/admin/crm#proposals', label: 'Open the lead desk' }, { key: `proposal-accepted/${p.id}` });
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('proposal mark failed', (err as Error).message);
    return NextResponse.json({ ok: false, reason: 'failed', message: 'Something went wrong. Try again, or message us.' }, { status: 502 });
  }
}
