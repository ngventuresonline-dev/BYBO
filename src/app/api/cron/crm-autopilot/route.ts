import { NextResponse } from 'next/server';
import { crmConfigured } from '@/lib/crm/db';
import { runAutopilot } from '@/lib/crm/autopilot';
import { bearerAuthorized } from '@/lib/instant-call/secrets';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
export const maxDuration = 300;

/** Lead autopilot: research, qualify and draft demos for new leads. Every 10 minutes. Bearer CRON_SECRET. */
export async function GET(request: Request) {
  if (!bearerAuthorized(request.headers.get('authorization'), process.env.CRON_SECRET)) {
    return NextResponse.json({ ok: false }, { status: 401 });
  }
  if (!crmConfigured() || !process.env.ANTHROPIC_API_KEY) return NextResponse.json({ ok: false, reason: 'not_configured' }, { status: 503 });
  try {
    const done = await runAutopilot(2);
    return NextResponse.json({ ok: true, done });
  } catch (err) {
    console.error('crm autopilot failed', (err as Error).message);
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
