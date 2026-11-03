import { NextResponse } from 'next/server';
import { adminAuthorized } from '@/lib/instagram/auth';
import { crmConfigured } from '@/lib/crm/db';
import { sendDigest, syncCallQueue } from '@/lib/crm/desk';

/** Run an automation now from the desk. Admin only. */

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
export const maxDuration = 60;

export async function POST(request: Request) {
  if (!adminAuthorized(request)) return NextResponse.json({ ok: false }, { status: 401 });
  if (!crmConfigured()) return NextResponse.json({ ok: false, reason: 'not_configured' }, { status: 503 });
  const { job } = (await request.json().catch(() => ({}))) as { job?: string };

  if (job === 'sync') {
    const r = await syncCallQueue();
    return 'error' in r ? NextResponse.json({ ok: false, reason: r.error }, { status: 503 }) : NextResponse.json({ ok: true, message: `Synced ${r.synced} lead${r.synced === 1 ? '' : 's'} from the call queue.` });
  }

  if (job === 'digest') {
    try {
      const r = await sendDigest();
      return NextResponse.json({ ok: r.sent || r.reason === 'nothing_to_report', message: r.sent ? 'Digest sent to the team.' : r.reason === 'nothing_to_report' ? 'Nothing new to report, so no email was sent.' : 'The digest could not be sent.' });
    } catch {
      return NextResponse.json({ ok: false, reason: 'failed' }, { status: 502 });
    }
  }

  if (job === 'meta_pull') {
    const token = process.env.META_PAGE_ACCESS_TOKEN?.trim() || process.env.IG_ACCESS_TOKEN?.trim();
    const pageId = process.env.FB_PAGE_ID?.trim();
    if (!token || !pageId) return NextResponse.json({ ok: false, reason: 'not_configured', message: 'Meta page token or FB_PAGE_ID is missing.' }, { status: 503 });
    try {
      const { fetchRecentMetaLeads, processMetaLeads } = await import('@/lib/instant-call/meta-poll');
      const result = await processMetaLeads(await fetchRecentMetaLeads({ token, pageId, now: new Date() }));
      return NextResponse.json({ ok: result.failed === 0, message: `Meta pull done: ${JSON.stringify(result)}` });
    } catch (err) {
      console.error('desk meta pull failed', (err as Error).message);
      return NextResponse.json({ ok: false, reason: 'failed', message: 'Meta could not be reached.' }, { status: 502 });
    }
  }

  return NextResponse.json({ ok: false, reason: 'unknown_job' }, { status: 400 });
}
