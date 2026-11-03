import { NextResponse } from 'next/server';
import { adminAuthorized } from '@/lib/instagram/auth';
import { crmConfigured, rpc, type CrmLead, type Stage } from '@/lib/crm/db';
import { email, log } from '@/lib/crm/proposal-mail';
import { cleanDraft, proposalUrl, readyToSend, type Proposal } from '@/lib/crm/proposals';

/** Proposals from the desk: list, save a draft, send to the client, delete. Admin only. */

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const UUID = /^[0-9a-f-]{36}$/i;
const EMAIL = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
// Sending a proposal moves a lead up to Proposal, never backwards.
const BEFORE_PROPOSAL: Stage[] = ['new', 'contacted', 'demo_sent', 'call_booked'];
const fail = (reason: string, message: string, status = 400) => NextResponse.json({ ok: false, reason, message }, { status });
const inr = (n: number) => `₹${Math.round(n).toLocaleString('en-IN')}`;

export async function GET(request: Request) {
  if (!adminAuthorized(request)) return NextResponse.json({ ok: false }, { status: 401 });
  if (!crmConfigured()) return NextResponse.json({ ok: false, reason: 'not_configured' }, { status: 503 });
  try { return NextResponse.json({ ok: true, proposals: await rpc<Proposal[]>('bybo_proposal_list', {}) }); }
  catch { return NextResponse.json({ ok: false, reason: 'read_failed' }, { status: 502 }); }
}

export async function POST(request: Request) {
  if (!adminAuthorized(request)) return NextResponse.json({ ok: false }, { status: 401 });
  if (!crmConfigured()) return NextResponse.json({ ok: false, reason: 'not_configured' }, { status: 503 });
  const b = (await request.json().catch(() => ({}))) as Record<string, unknown>;
  const id = typeof b.id === 'string' && UUID.test(b.id) ? b.id : null;
  if (b.id != null && b.id !== '' && !id) return fail('invalid', 'That proposal id is not valid.');

  try {
    const existing = id ? (await rpc<Proposal[]>('bybo_proposal_list', {})).find((p) => p.id === id) : undefined;
    if (id && !existing) return fail('not_found', 'That proposal no longer exists.', 404);

    switch (b.action) {
      case 'save': {
        if (existing && (existing.status === 'accepted' || existing.status === 'declined')) return fail('locked', `This proposal was ${existing.status}; it can no longer be edited.`, 409);
        const leadId = typeof b.lead_id === 'string' && UUID.test(b.lead_id) ? b.lead_id : existing?.lead_id;
        if (!leadId) return fail('invalid', 'Pick a lead first.');
        const leads = await rpc<CrmLead[]>('bybo_crm_list', {});
        if (!leads.some((l) => l.id === leadId)) return fail('not_found', 'That lead no longer exists.', 404);
        const d = cleanDraft(b);
        if (!d.ok) return fail('invalid', d.message);
        const proposal = await rpc<Proposal>('bybo_proposal_upsert', { p: { ...(id ? { id } : {}), lead_id: leadId, ...d.value } });
        return NextResponse.json({ ok: true, proposal, message: 'Draft saved' });
      }

      case 'send': {
        if (!existing) return fail('invalid', 'Save the proposal before sending it.');
        if (existing.status === 'accepted' || existing.status === 'declined') return fail('locked', `This proposal was already ${existing.status}.`, 409);
        const problem = readyToSend(existing);
        if (problem) return fail('not_ready', problem);
        const lead = (await rpc<CrmLead[]>('bybo_crm_list', {})).find((l) => l.id === existing.lead_id);
        if (!lead) return fail('not_found', 'That lead no longer exists.', 404);
        if (!lead.email || !EMAIL.test(lead.email)) return fail('no_email', 'This lead has no email. Add one, or share the link on WhatsApp.');
        const link = proposalUrl(existing.token);
        const first = (lead.name ?? '').trim().split(/\s+/)[0] || 'there';
        const title = existing.title || `Proposal for ${lead.company || lead.name || 'you'}`;
        const ok = await email([lead.email], `Your BYBO proposal: ${title}`, `${first}, your proposal is ready`, [
          `Hi ${first},`,
          `Thank you for your time. Here is our proposal for ${title.replace(/^proposal for /i, '')}: the scope, the total of ${inr(existing.total)} and the payment milestones.`,
          `${existing.valid_until ? `It is valid until ${new Date(existing.valid_until).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}. ` : ''}You can accept it from the page, or reply to this email with any questions.`,
        ], { href: link, label: 'View your proposal' }, { bcc: ['byboonline@gmail.com'], key: `proposal-send/${existing.id}/${existing.updated_at}` });
        if (!ok) return fail('send_failed', 'The email could not be sent.', 502);
        const proposal = await rpc<Proposal>('bybo_proposal_upsert', { p: { id: existing.id, status: 'sent' } });
        if (BEFORE_PROPOSAL.includes(lead.stage)) await rpc('bybo_crm_update', { p_lead: lead.id, p: { stage: 'proposal' } }).catch(() => null);
        await log(lead.id, 'email', `Proposal emailed: ${title} (${inr(existing.total)})`, link, { proposal: existing.id });
        return NextResponse.json({ ok: true, proposal, message: `Proposal emailed to ${lead.email}` });
      }

      case 'delete': {
        if (!existing) return fail('invalid', 'Nothing to delete.');
        await rpc('bybo_proposal_delete', { p_id: existing.id });
        return NextResponse.json({ ok: true, message: 'Proposal deleted' });
      }
    }
    return fail('unknown_action', 'Unknown action.');
  } catch (err) {
    console.error('crm proposals failed', (err as Error).message);
    return fail('write_failed', 'That didn’t save. Try again.', 502);
  }
}
