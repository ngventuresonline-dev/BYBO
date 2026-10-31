import { NextResponse } from 'next/server';
import { adminAuthorized } from '@/lib/instagram/auth';
import { instagramConfig, liveConfigured } from '@/lib/instagram/config';
import { publisherFromEnv } from '@/lib/instagram/runtime';
import { approveNow, deleteDraft, saveDraft, schedulePost, ScheduleError } from '@/lib/instagram/schedule';
import { getPostStore, PostStoreUnavailable } from '@/lib/instagram/store';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
export const maxDuration = 300;

const MAX_BYTES = 100_000;

function json(body: unknown, status = 200) {
  return NextResponse.json(body, { status });
}

export async function GET(request: Request) {
  if (!adminAuthorized(request)) return json({ ok: false }, 401);
  try {
    const store = await getPostStore();
    const posts = (await store.list()).sort((a, b) => b.createdAt.localeCompare(a.createdAt));
    return json({ ok: true, posts, dryRun: instagramConfig().dryRun });
  } catch (err) {
    return fail(err);
  }
}

export async function POST(request: Request) {
  if (!adminAuthorized(request)) return json({ ok: false }, 401);
  const raw = await request.text();
  if (raw.length > MAX_BYTES) return json({ ok: false, reason: 'invalid' }, 413);
  let body: { action?: unknown; id?: unknown; caption?: unknown; media?: unknown; scheduledAt?: unknown };
  try {
    body = JSON.parse(raw) as typeof body;
  } catch {
    return json({ ok: false, reason: 'invalid' }, 400);
  }
  const id = typeof body.id === 'string' ? body.id : undefined;
  const scheduledAt = typeof body.scheduledAt === 'string' ? body.scheduledAt : '';
  const secrets = [process.env.IG_ACCESS_TOKEN, process.env.IG_BLOB_READ_WRITE_TOKEN, process.env.CRON_SECRET];
  try {
    const store = await getPostStore();
    const now = new Date();
    if (body.action === 'save') {
      return json({ ok: true, post: await saveDraft(store, { id, caption: body.caption, media: body.media }, now, secrets) });
    }
    if (body.action === 'delete') {
      if (!id) return json({ ok: false, reason: 'invalid' }, 400);
      await deleteDraft(store, id);
      return json({ ok: true });
    }
    if (body.action === 'schedule') {
      return json({ ok: true, post: await schedulePost(store, { id, caption: body.caption, media: body.media, scheduledAt }, now, secrets) });
    }
    if (body.action === 'publish') {
      const config = instagramConfig();
      if (!config.dryRun && !liveConfigured(config)) return json({ ok: false, reason: 'not_configured' }, 503);
      const post = await approveNow(store, { id, caption: body.caption, media: body.media }, now, publisherFromEnv());
      if (post.status === 'failed') return json({ ok: false, reason: 'publish_failed', error: post.error, post }, 502);
      return json({ ok: true, post, pending: post.status === 'publishing' });
    }
    return json({ ok: false, reason: 'invalid' }, 400);
  } catch (err) {
    return fail(err);
  }
}

function fail(err: unknown) {
  if (err instanceof PostStoreUnavailable) return json({ ok: false, reason: 'store_unconfigured' }, 503);
  if (err instanceof ScheduleError) return json({ ok: false, reason: err.reason }, err.reason === 'not_configured' ? 503 : 400);
  console.error('instagram admin failed', err instanceof Error ? err.name : 'error');
  return json({ ok: false, reason: 'error' }, 500);
}
