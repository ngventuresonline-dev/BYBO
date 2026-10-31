import { NextResponse } from 'next/server';
import { placeOutboundCall } from '@/lib/instant-call/dial';
import { importMetaLeads } from '@/lib/instant-call/flow';
import { sendCallSummary } from '@/lib/instant-call/mail';
import { mapMetaExport } from '@/lib/instant-call/meta';
import { bearerAuthorized } from '@/lib/instant-call/secrets';
import { getLeadStore, LeadStoreUnavailable } from '@/lib/instant-call/store';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

/**
 * Import a Meta Leads Center CSV (UTF-16, tab-separated).
 * Authorization: Bearer CRON_SECRET.
 * Rows are stored as skipped_allowlist unless ?place_calls=1 (or a multipart
 * place_calls=yes). Even then the switch, allowlist, hours and dry-run gates apply.
 */

const MAX_BYTES = 2_000_000;

export async function POST(request: Request) {
  if (!bearerAuthorized(request.headers.get('authorization'), process.env.CRON_SECRET)) {
    return NextResponse.json({ ok: false }, { status: 401 });
  }
  const length = Number(request.headers.get('content-length') || 0);
  if (length > MAX_BYTES) return NextResponse.json({ ok: false, reason: 'too_large' }, { status: 413 });

  const url = new URL(request.url);
  let placeCalls = url.searchParams.get('place_calls') === '1';
  const type = request.headers.get('content-type') ?? '';
  let bytes: Uint8Array;
  if (type.includes('multipart/form-data')) {
    const form = await request.formData();
    const file = form.get('file');
    if (!(file instanceof File)) return NextResponse.json({ ok: false, reason: 'invalid' }, { status: 400 });
    if (file.size > MAX_BYTES) return NextResponse.json({ ok: false, reason: 'too_large' }, { status: 413 });
    bytes = new Uint8Array(await file.arrayBuffer());
    if (String(form.get('place_calls') ?? '') === 'yes') placeCalls = true;
  } else {
    bytes = new Uint8Array(await request.arrayBuffer());
    if (bytes.byteLength > MAX_BYTES) return NextResponse.json({ ok: false, reason: 'too_large' }, { status: 413 });
  }

  try {
    const store = await getLeadStore();
    const result = await importMetaLeads(mapMetaExport(bytes), placeCalls, {
      store,
      now: new Date(),
      dial: (lead) => placeOutboundCall(lead),
      sendSummary: sendCallSummary,
    });
    return NextResponse.json({ ok: true, ...result, place_calls: placeCalls });
  } catch (err) {
    if (err instanceof LeadStoreUnavailable) {
      return NextResponse.json({ ok: false, reason: 'store_unconfigured' }, { status: 503 });
    }
    console.error('meta import failed', err instanceof Error ? err.message : 'error');
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
