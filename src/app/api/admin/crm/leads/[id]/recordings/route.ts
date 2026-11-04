import { NextResponse } from 'next/server';
import { adminAuthorized } from '@/lib/instagram/auth';
import { crmConfigured, rpc, type CrmLead } from '@/lib/crm/db';
import { callsConfigured, callsForPhone } from '@/lib/crm/calls';

/** The AI call recordings for one lead, matched by the number dialled. Admin only. */

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
export const maxDuration = 60;

const UUID = /^[0-9a-f-]{36}$/i;

export async function GET(request: Request, ctx: { params: Promise<{ id: string }> }) {
  if (!adminAuthorized(request)) return NextResponse.json({ ok: false }, { status: 401 });
  if (!crmConfigured() || !callsConfigured()) return NextResponse.json({ ok: true, calls: [], reason: 'not_configured' });
  const { id } = await ctx.params;
  if (!UUID.test(id)) return NextResponse.json({ ok: false, reason: 'invalid' }, { status: 400 });
  const lead = (await rpc<CrmLead[]>('bybo_crm_list', {})).find((l) => l.id === id);
  if (!lead?.phone) return NextResponse.json({ ok: true, calls: [] });
  try {
    return NextResponse.json({ ok: true, calls: await callsForPhone(lead.phone, new Date(lead.created_at)) });
  } catch (err) {
    console.error('crm recordings failed', (err as Error).message);
    return NextResponse.json({ ok: false, reason: 'read_failed' }, { status: 502 });
  }
}
