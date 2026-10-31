import { NextResponse } from 'next/server';
import { placeOutboundCall } from '@/lib/instant-call/dial';
import { pollElevenConversation, runCadence } from '@/lib/instant-call/flow';
import { sendCallSummary } from '@/lib/instant-call/mail';
import { maskPhone } from '@/lib/instant-call/mask';
import { bearerAuthorized } from '@/lib/instant-call/secrets';
import { getLeadStore, LeadStoreUnavailable } from '@/lib/instant-call/store';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
export const maxDuration = 60;

/**
 * Drains the call queue. Vercel Cron (Pro, minute-precise) hits this every
 * 15 minutes from 10:00 to 19:30 IST, Monday–Saturday. See vercel.json.
 * The handler itself refuses to dial outside that window, so a manual
 * invoke at night does not place calls. Authorization: Bearer CRON_SECRET.
 */

export async function GET(request: Request) {
  if (!bearerAuthorized(request.headers.get('authorization'), process.env.CRON_SECRET)) {
    return NextResponse.json({ ok: false }, { status: 401 });
  }
  try {
    const store = await getLeadStore();
    const result = await runCadence({
      store,
      now: new Date(),
      dial: (lead) => placeOutboundCall(lead),
      poll: (id) => pollElevenConversation(id),
      sendSummary: sendCallSummary,
      log: (message, fields) => console.info(message, { leadId: fields?.leadId ?? '', phone: maskPhone(fields?.phone) }),
    });
    return NextResponse.json({ ok: true, ...result });
  } catch (err) {
    if (err instanceof LeadStoreUnavailable) {
      return NextResponse.json({ ok: false, reason: 'store_unconfigured' }, { status: 503 });
    }
    console.error('instant-call cron failed', err instanceof Error ? err.message : 'error');
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
