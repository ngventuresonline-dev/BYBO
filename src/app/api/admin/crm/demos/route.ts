import { randomBytes } from 'node:crypto';
import { NextResponse } from 'next/server';
import { adminAuthorized } from '@/lib/instagram/auth';
import { crmConfigured, rpc, type CrmLead } from '@/lib/crm/db';
import { sendDemo, step, type Demo } from '@/lib/crm/autopilot';

/** Demo approvals and autopilot decisions from the desk. Admin only. */

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
export const maxDuration = 300;

const UUID = /^[0-9a-f-]{36}$/i;
const log = (lead: string, kind: string, title: string, body?: string) =>
  rpc('bybo_crm_log', { p_lead: lead, p_kind: kind, p_title: title, p_body: body ?? null, p_meta: {} }).catch(() => null);

export async function GET(request: Request) {
  if (!adminAuthorized(request)) return NextResponse.json({ ok: false }, { status: 401 });
  if (!crmConfigured()) return NextResponse.json({ ok: false, reason: 'not_configured' }, { status: 503 });
  try { return NextResponse.json({ ok: true, demos: await rpc<Demo[]>('bybo_demo_list', {}) }); }
  catch { return NextResponse.json({ ok: false, reason: 'read_failed' }, { status: 502 }); }
}

export async function POST(request: Request) {
  if (!adminAuthorized(request)) return NextResponse.json({ ok: false }, { status: 401 });
  if (!crmConfigured()) return NextResponse.json({ ok: false, reason: 'not_configured' }, { status: 503 });
  const b = (await request.json().catch(() => ({}))) as Record<string, string>;
  const leads = await rpc<CrmLead[]>('bybo_crm_list', {});
  const demos = await rpc<Demo[]>('bybo_demo_list', {});
  const lead = UUID.test(b.lead_id ?? '') ? leads.find((l) => l.id === b.lead_id) : undefined;
  const demo = UUID.test(b.demo_id ?? '') ? demos.find((d) => d.id === b.demo_id) : undefined;

  switch (b.action) {
    case 'approve_send': {
      if (!demo) return NextResponse.json({ ok: false, reason: 'not_found' }, { status: 404 });
      const l = leads.find((x) => x.id === demo.lead_id);
      if (!l) return NextResponse.json({ ok: false, reason: 'not_found' }, { status: 404 });
      const r = await sendDemo(demo, l, typeof b.message === 'string' ? b.message.slice(0, 3000) : undefined);
      if (!r.ok) {
        if (r.reason === 'no_email') await rpc('bybo_demo_upsert', { p: { id: demo.id, status: 'approved' } });
        return NextResponse.json({ ok: false, reason: r.reason, message: r.reason === 'no_email' ? 'Approved, but this lead has no email. Share the link on WhatsApp.' : 'The email could not be sent.' }, { status: 400 });
      }
      return NextResponse.json({ ok: true, message: `Demo emailed to ${l.email}` });
    }
    case 'reject': {
      if (!demo) return NextResponse.json({ ok: false, reason: 'not_found' }, { status: 404 });
      await rpc('bybo_demo_upsert', { p: { id: demo.id, status: 'rejected', note: b.note || 'Rejected in the desk' } });
      await rpc('bybo_ap_set', { p_lead: demo.lead_id, p: { autopilot: 'held' } });
      await log(demo.lead_id, 'demo', 'Demo rejected', b.note || undefined);
      return NextResponse.json({ ok: true, message: 'Demo rejected. The lead is on hold.' });
    }
    case 'regenerate': {
      if (!demo) return NextResponse.json({ ok: false, reason: 'not_found' }, { status: 404 });
      await rpc('bybo_demo_upsert', { p: { id: demo.id, status: 'rejected', note: 'Replaced by a new draft' } });
      await rpc('bybo_ap_set', { p_lead: demo.lead_id, p: { autopilot: 'qualified' } });
      const l = (await rpc<CrmLead[]>('bybo_crm_list', {})).find((x) => x.id === demo.lead_id);
      const msg = l ? await step(l) : 'lead missing';
      return NextResponse.json({ ok: true, message: `New draft: ${msg}` });
    }
    case 'custom': {
      if (!lead || !/^https:\/\//.test(b.url ?? '')) return NextResponse.json({ ok: false, reason: 'invalid' }, { status: 400 });
      const slug = `${(lead.company || lead.name || 'custom').toLowerCase().replace(/[^a-z0-9]+/g, '-').slice(0, 30)}-${randomBytes(2).toString('hex')}`;
      await rpc('bybo_demo_upsert', { p: { lead_id: lead.id, slug, kind: 'custom', status: 'awaiting_approval', url: b.url, note: 'Custom build' } });
      await rpc('bybo_ap_set', { p_lead: lead.id, p: { autopilot: 'awaiting_approval' } });
      await log(lead.id, 'demo', 'Custom demo added: waiting for approval', b.url);
      return NextResponse.json({ ok: true, message: 'Custom demo added for approval.' });
    }
    case 'confirm_real': {
      if (!lead) return NextResponse.json({ ok: false, reason: 'not_found' }, { status: 404 });
      await rpc('bybo_ap_set', { p_lead: lead.id, p: { autopilot: 'qualified', quality: 'maybe' } });
      await log(lead.id, 'research', 'Confirmed real by the team: demo will be drafted');
      return NextResponse.json({ ok: true, message: 'Marked real. A demo will be drafted next.' });
    }
    case 'confirm_fake': {
      if (!lead) return NextResponse.json({ ok: false, reason: 'not_found' }, { status: 404 });
      await rpc('bybo_ap_set', { p_lead: lead.id, p: { autopilot: 'done', quality: 'fake' } });
      await rpc('bybo_crm_update', { p_lead: lead.id, p: { stage: 'lost' } });
      await log(lead.id, 'research', 'Confirmed fake by the team: moved to Lost');
      return NextResponse.json({ ok: true, message: 'Marked fake and moved to Lost.' });
    }
    case 'requeue': {
      if (!lead) return NextResponse.json({ ok: false, reason: 'not_found' }, { status: 404 });
      await rpc('bybo_ap_set', { p_lead: lead.id, p: { autopilot: 'queued' } });
      const fresh = (await rpc<CrmLead[]>('bybo_crm_list', {})).find((x) => x.id === lead.id);
      const msg = fresh ? await step(fresh) : 'queued';
      return NextResponse.json({ ok: true, message: msg });
    }
  }
  return NextResponse.json({ ok: false, reason: 'unknown_action' }, { status: 400 });
}
