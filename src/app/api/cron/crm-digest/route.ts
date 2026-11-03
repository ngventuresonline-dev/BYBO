import { NextResponse } from 'next/server';
import { crmConfigured } from '@/lib/crm/db';
import { sendDigest } from '@/lib/crm/desk';
import { bearerAuthorized } from '@/lib/instant-call/secrets';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
export const maxDuration = 30;

/** Morning lead digest to the team, Mon–Sat 9:00 IST. See vercel.json. Bearer CRON_SECRET. */
export async function GET(request: Request) {
  if (!bearerAuthorized(request.headers.get('authorization'), process.env.CRON_SECRET)) {
    return NextResponse.json({ ok: false }, { status: 401 });
  }
  if (!crmConfigured()) return NextResponse.json({ ok: false, reason: 'not_configured' }, { status: 503 });
  try {
    const r = await sendDigest();
    return NextResponse.json({ ok: r.sent || r.reason === 'nothing_to_report', ...r });
  } catch (err) {
    console.error('crm digest failed', (err as Error).message);
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
