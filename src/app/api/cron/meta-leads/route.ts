import { NextResponse } from 'next/server';
import { fetchRecentMetaLeads, processMetaLeads } from '@/lib/instant-call/meta-poll';
import { bearerAuthorized } from '@/lib/instant-call/secrets';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
export const maxDuration = 60;

/**
 * Pulls new Meta form leads every 5 minutes. See vercel.json.
 * Each new lead gets the same call gates, confirmation and team report as the
 * webhook. Authorization: Bearer CRON_SECRET.
 */

export async function GET(request: Request) {
  if (!bearerAuthorized(request.headers.get('authorization'), process.env.CRON_SECRET)) {
    return NextResponse.json({ ok: false }, { status: 401 });
  }
  const [token, ...fallbackTokens] = [process.env.META_PAGE_ACCESS_TOKEN?.trim(), process.env.IG_ACCESS_TOKEN?.trim()].filter((t): t is string => Boolean(t));
  const pageId = process.env.FB_PAGE_ID?.trim();
  if (!token || !pageId) return NextResponse.json({ ok: false, reason: 'not_configured' }, { status: 503 });

  try {
    const leads = await fetchRecentMetaLeads({ token, fallbackTokens, pageId, now: new Date() });
    const result = await processMetaLeads(leads);
    if (result.failed > 0) console.error('meta lead poll incomplete', result);
    else console.log('meta lead poll', result);
    return NextResponse.json({ ok: result.failed === 0, ...result }, { status: result.failed === 0 ? 200 : 500 });
  } catch (err) {
    const detail = err instanceof Error ? err.message : 'error';
    console.error('meta lead poll failed', detail);
    return NextResponse.json({ ok: false, reason: 'graph', detail }, { status: 502 });
  }
}
