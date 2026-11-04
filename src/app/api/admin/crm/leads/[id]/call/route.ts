import { NextResponse } from 'next/server';
import { adminAuthorized } from '@/lib/instagram/auth';
import { crmConfigured, rpc, type CrmLead } from '@/lib/crm/db';
import { callNow } from '@/lib/instant-call/flow';
import { placeOutboundCall } from '@/lib/instant-call/dial';
import { sendCallSummary } from '@/lib/instant-call/mail';
import { getLeadStore, LeadStoreUnavailable, type LeadStore } from '@/lib/instant-call/store';
import type { Lead } from '@/lib/instant-call/types';

/** Call now: the AI agent dials this lead straight away. Admin only. */

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
export const maxDuration = 60;

type Ctx = { params: Promise<{ id: string }> };
const UUID = /^[0-9a-f-]{36}$/i;

const MESSAGE: Record<string, string> = {
  dialed: 'Calling now. The summary lands on this lead when the call ends.',
  outside_hours: 'Calls only go out between 10:00 and 19:30 IST. Try again then.',
  not_in_queue: 'This lead has no phone in the call queue, so it can’t be called from here.',
  not_found: 'This lead has no phone in the call queue, so it can’t be called from here.',
  not_claimed: 'This lead is already on a call.',
  blocked: 'AI calling is switched off right now.',
  failed: 'The call didn’t connect. Try again in a minute.',
};

/** The call-queue record behind a CRM lead: `lead:<id>` or `<source>:<source id>`. */
async function queueLead(store: LeadStore, crm: CrmLead): Promise<Lead | null> {
  const key = crm.external_id ?? '';
  const sep = key.indexOf(':');
  if (sep < 0) return null;
  const [kind, ref] = [key.slice(0, sep), key.slice(sep + 1)];
  if (kind === 'lead') return store.get(ref);
  return store.findExternal ? store.findExternal(kind as Lead['source'], ref) : null;
}

export async function POST(request: Request, ctx: Ctx) {
  if (!adminAuthorized(request)) return NextResponse.json({ ok: false }, { status: 401 });
  if (!crmConfigured()) return NextResponse.json({ ok: false, reason: 'not_configured' }, { status: 503 });
  const { id } = await ctx.params;
  if (!UUID.test(id)) return NextResponse.json({ ok: false, reason: 'invalid' }, { status: 400 });
  try {
    const crm = (await rpc<CrmLead[]>('bybo_crm_list', {})).find((l) => l.id === id);
    if (!crm) return NextResponse.json({ ok: false, reason: 'not_found', message: MESSAGE.not_found }, { status: 404 });
    const store = await getLeadStore();
    const queued = await queueLead(store, crm);
    if (!queued) return NextResponse.json({ ok: false, reason: 'not_in_queue', message: MESSAGE.not_in_queue }, { status: 409 });
    const { action } = await callNow(queued.id, { store, now: new Date(), dial: (lead) => placeOutboundCall(lead), sendSummary: sendCallSummary });
    const ok = action === 'dialed';
    if (ok) await rpc('bybo_crm_log', { p_lead: id, p_kind: 'call', p_title: 'AI call placed from the desk', p_body: null, p_meta: {} }).catch(() => null);
    return NextResponse.json({ ok, reason: action, message: MESSAGE[action] ?? 'That didn’t work. Try again.' }, { status: ok ? 200 : 409 });
  } catch (err) {
    if (err instanceof LeadStoreUnavailable) return NextResponse.json({ ok: false, reason: 'store_unconfigured', message: 'The call queue isn’t connected.' }, { status: 503 });
    console.error('call now failed', (err as Error).message);
    return NextResponse.json({ ok: false, reason: 'failed', message: MESSAGE.failed }, { status: 500 });
  }
}
