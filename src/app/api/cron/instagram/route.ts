import { NextResponse } from 'next/server';
import { bearerAuthorized } from '@/lib/instant-call/secrets';
import { instagramConfig, liveConfigured } from '@/lib/instagram/config';
import { publisherFromEnv } from '@/lib/instagram/runtime';
import { runDuePosts, ScheduleError } from '@/lib/instagram/schedule';
import { getPostStore, PostStoreUnavailable } from '@/lib/instagram/store';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
export const maxDuration = 300;

/**
 * Publishes approved posts whose India time has arrived.
 * Every 10 minutes. See vercel.json. Authorization: Bearer CRON_SECRET.
 * A draft is never selected. A post already publishing or published is not
 * sent a second time.
 */
export async function GET(request: Request) {
  if (!bearerAuthorized(request.headers.get('authorization'), process.env.CRON_SECRET)) {
    return NextResponse.json({ ok: false }, { status: 401 });
  }
  const config = instagramConfig();
  if (!config.dryRun && !liveConfigured(config)) {
    return NextResponse.json({ ok: false, reason: 'not_configured', dryRun: config.dryRun }, { status: 503 });
  }
  try {
    const store = await getPostStore();
    const result = await runDuePosts(store, new Date(), publisherFromEnv());
    console.info('instagram cron', { published: result.published.length, failed: result.failed.length, pending: result.pending.length, dryRun: config.dryRun });
    return NextResponse.json({ ok: true, dryRun: config.dryRun, ...result });
  } catch (err) {
    if (err instanceof PostStoreUnavailable) return NextResponse.json({ ok: false, reason: 'store_unconfigured' }, { status: 503 });
    if (err instanceof ScheduleError) return NextResponse.json({ ok: false, reason: err.reason }, { status: 400 });
    console.error('instagram cron failed', err instanceof Error ? err.name : 'error');
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
