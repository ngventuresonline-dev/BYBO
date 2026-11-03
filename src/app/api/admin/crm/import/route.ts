import { NextResponse } from 'next/server';
import { adminAuthorized } from '@/lib/instagram/auth';
import { importMetaLeads } from '@/lib/instant-call/flow';
import { placeOutboundCall } from '@/lib/instant-call/dial';
import { sendCallSummary } from '@/lib/instant-call/mail';
import { mapMetaExport } from '@/lib/instant-call/meta';
import { getLeadStore, LeadStoreUnavailable } from '@/lib/instant-call/store';

/**
 * Upload a Meta Leads Center export from the desk. Rows are stored without
 * calling anyone; each one also lands in the CRM.
 */

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
export const maxDuration = 60;

const MAX_BYTES = 2_000_000;

export async function POST(request: Request) {
  if (!adminAuthorized(request)) return NextResponse.json({ ok: false }, { status: 401 });
  const form = await request.formData().catch(() => null);
  const file = form?.get('file');
  if (!(file instanceof File)) return NextResponse.json({ ok: false, reason: 'invalid' }, { status: 400 });
  if (file.size > MAX_BYTES) return NextResponse.json({ ok: false, reason: 'too_large' }, { status: 413 });
  try {
    const store = await getLeadStore();
    const result = await importMetaLeads(mapMetaExport(new Uint8Array(await file.arrayBuffer())), false, {
      store, now: new Date(), dial: (lead) => placeOutboundCall(lead), sendSummary: sendCallSummary,
    });
    return NextResponse.json({ ok: true, ...result });
  } catch (err) {
    if (err instanceof LeadStoreUnavailable) return NextResponse.json({ ok: false, reason: 'store_unconfigured' }, { status: 503 });
    console.error('desk meta import failed', (err as Error).message);
    return NextResponse.json({ ok: false, reason: 'failed' }, { status: 500 });
  }
}
