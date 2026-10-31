import { containsSecret, redactSecrets } from './redact';
import { BlobPostStore, type StoredPost } from './store';
import { istLocalToUtc } from './time';
import { newIgPost, type IgPost, type PublishOutcome } from './types';
import { parseDraft } from './validate';
import { InstagramError } from './graph';

export class ScheduleError extends Error {
  reason: string;

  constructor(reason: string) {
    super(reason);
    this.name = 'ScheduleError';
    this.reason = reason;
  }
}

export type ProgressPatch = Pick<IgPost, 'igChildIds' | 'igContainerId' | 'igMediaId'>;

export type Publisher = (post: IgPost, report: (patch: ProgressPatch) => Promise<void>) => Promise<PublishOutcome>;

export type ScheduleDeps = {
  publish: Publisher;
  staleAfterMs?: number;
  secrets?: Array<string | null | undefined>;
};

export type DueResult = {
  published: string[];
  failed: string[];
  pending: string[];
  skipped: number;
};

/** A publish still inside the function budget. The next cron must not start another one. */
export const STALE_AFTER_MS = 8 * 60 * 1000;

type DraftInput = { caption: string; media: IgPost['media'] };
type RawDraft = { caption?: unknown; media?: unknown };

function checkedDraft(input: RawDraft, secrets: Array<string | null | undefined> = []): DraftInput {
  const parsed = parseDraft(input);
  if (!parsed.ok || containsSecret(parsed.caption, secrets)) throw new ScheduleError('invalid');
  return parsed;
}

function contentChanged(post: IgPost, next: DraftInput): boolean {
  if (post.caption !== next.caption || post.media.length !== next.media.length) return true;
  return post.media.some((item, index) => item.url !== next.media[index].url || item.contentType !== next.media[index].contentType);
}

function clearedIds(post: IgPost, changed: boolean): Pick<IgPost, 'igChildIds' | 'igContainerId' | 'igMediaId'> {
  if (!changed) {
    return {
      igChildIds: post.igChildIds,
      igContainerId: post.igContainerId,
      igMediaId: post.igMediaId?.startsWith('dry-run:') ? null : post.igMediaId,
    };
  }
  return { igChildIds: [], igContainerId: null, igMediaId: null };
}

export async function saveDraft(store: BlobPostStore, input: RawDraft & { id?: string }, now: Date, secrets: Array<string | null | undefined> = []): Promise<IgPost> {
  const draft = checkedDraft(input, secrets);
  if (!input.id) {
    const created = await store.create(newIgPost({ caption: draft.caption, media: draft.media, status: 'draft', updatedAt: now.toISOString(), createdAt: now.toISOString() }));
    return created.post;
  }
  const current = await store.get(input.id);
  if (!current) throw new ScheduleError('not_found');
  if (current.post.status === 'published' || current.post.status === 'publishing') throw new ScheduleError('not_editable');
  const changed = contentChanged(current.post, draft);
  const saved = await store.compareAndSwap(current.post.id, current.etag, {
    ...current.post,
    caption: draft.caption,
    media: draft.media,
    status: 'draft',
    scheduledAt: null,
    approvedAt: null,
    error: null,
    dryRun: false,
    updatedAt: now.toISOString(),
    ...clearedIds(current.post, changed),
  });
  if (!saved) throw new ScheduleError('conflict');
  return saved.post;
}

export async function deleteDraft(store: BlobPostStore, id: string): Promise<void> {
  const current = await store.get(id);
  if (!current) throw new ScheduleError('not_found');
  if (current.post.status !== 'draft') throw new ScheduleError('not_editable');
  await store.delete(id);
}

/**
 * The Schedule button is the approval. The cron publishes it once `scheduledAt` has passed.
 */
export async function schedulePost(store: BlobPostStore, input: RawDraft & { id?: string; scheduledAt: string }, now: Date, secrets: Array<string | null | undefined> = []): Promise<IgPost> {
  const draft = checkedDraft(input, secrets);
  const when = istLocalToUtc(input.scheduledAt);
  if (!when) throw new ScheduleError('invalid');
  if (when.getTime() <= now.getTime()) throw new ScheduleError('schedule_in_past');
  if (!input.id) {
    const created = await store.create(newIgPost({
      caption: draft.caption,
      media: draft.media,
      status: 'scheduled',
      scheduledAt: when.toISOString(),
      approvedAt: now.toISOString(),
      createdAt: now.toISOString(),
      updatedAt: now.toISOString(),
    }));
    return created.post;
  }
  const current = await store.get(input.id);
  if (!current) throw new ScheduleError('not_found');
  if (current.post.status === 'published' || current.post.status === 'publishing') throw new ScheduleError('not_approvable');
  const changed = contentChanged(current.post, draft);
  const saved = await store.compareAndSwap(current.post.id, current.etag, {
    ...current.post,
    caption: draft.caption,
    media: draft.media,
    status: 'scheduled',
    scheduledAt: when.toISOString(),
    approvedAt: now.toISOString(),
    error: null,
    dryRun: false,
    updatedAt: now.toISOString(),
    ...clearedIds(current.post, changed),
  });
  if (!saved) throw new ScheduleError('conflict');
  return saved.post;
}

/**
 * "Post to Instagram now" is the approval. A draft never reaches the publisher.
 */
export async function approveNow(store: BlobPostStore, input: RawDraft & { id?: string }, now: Date, deps: ScheduleDeps): Promise<IgPost> {
  const draft = checkedDraft(input, deps.secrets);
  let current: StoredPost;
  if (!input.id) {
    current = await store.create(newIgPost({
      caption: draft.caption,
      media: draft.media,
      status: 'approved',
      approvedAt: now.toISOString(),
      createdAt: now.toISOString(),
      updatedAt: now.toISOString(),
    }));
  } else {
    const existing = await store.get(input.id);
    if (!existing) throw new ScheduleError('not_found');
    if (existing.post.status === 'published') return existing.post;
    if (existing.post.status === 'publishing') {
      current = existing;
    } else if (existing.post.status === 'draft' || existing.post.status === 'failed' || existing.post.status === 'scheduled' || existing.post.status === 'approved') {
      const changed = contentChanged(existing.post, draft);
      const saved = await store.compareAndSwap(existing.post.id, existing.etag, {
        ...existing.post,
        caption: draft.caption,
        media: draft.media,
        status: 'approved',
        approvedAt: existing.post.approvedAt ?? now.toISOString(),
        scheduledAt: null,
        error: null,
        updatedAt: now.toISOString(),
        ...clearedIds(existing.post, changed),
      });
      if (!saved) throw new ScheduleError('conflict');
      current = saved;
    } else {
      throw new ScheduleError('not_approvable');
    }
  }
  await runDuePosts(store, now, deps);
  const done = await store.get(current.post.id);
  if (!done) throw new ScheduleError('not_found');
  return done.post;
}

export async function runDuePosts(store: BlobPostStore, now: Date, deps: ScheduleDeps): Promise<DueResult> {
  const staleAfterMs = deps.staleAfterMs ?? STALE_AFTER_MS;
  const posts = (await store.list()).filter((post) => post.status === 'approved' || post.status === 'scheduled' || post.status === 'publishing');
  const result: DueResult = { published: [], failed: [], pending: [], skipped: 0 };
  for (const candidate of posts) {
    const claimed = await claim(store, candidate.id, now, staleAfterMs);
    if (!claimed) {
      result.skipped += 1;
      continue;
    }
    const outcome = await publishClaimed(store, claimed, now, deps);
    result[outcome].push(candidate.id);
  }
  return result;
}

async function claim(store: BlobPostStore, id: string, now: Date, staleAfterMs: number): Promise<StoredPost | null> {
  const current = await store.get(id);
  if (!current) return null;
  const post = current.post;
  const stamp = now.toISOString();
  if (post.status === 'approved' || post.status === 'scheduled') {
    if (post.status === 'scheduled') {
      const due = post.scheduledAt ? Date.parse(post.scheduledAt) : Number.POSITIVE_INFINITY;
      if (!Number.isFinite(due) || due > now.getTime()) return null;
    }
    return store.compareAndSwap(id, current.etag, {
      ...post,
      status: 'publishing',
      publishingStartedAt: stamp,
      error: null,
      updatedAt: stamp,
    });
  }
  if (post.status !== 'publishing') return null;
  const started = Date.parse(post.publishingStartedAt ?? '');
  const age = Number.isFinite(started) ? now.getTime() - started : staleAfterMs;
  if (age < staleAfterMs) return null;
  if (!post.igContainerId && !(post.igMediaId && !post.igMediaId.startsWith('dry-run:'))) {
    await store.compareAndSwap(id, current.etag, {
      ...post,
      status: 'failed',
      error: 'Publishing stopped before Instagram accepted the media. Nothing was posted. Approve it again if you still want it to go out.',
      updatedAt: stamp,
    });
    return null;
  }
  return store.compareAndSwap(id, current.etag, { ...post, publishingStartedAt: stamp, updatedAt: stamp });
}

async function publishClaimed(store: BlobPostStore, claimed: StoredPost, now: Date, deps: ScheduleDeps): Promise<'published' | 'failed' | 'pending'> {
  let etag = claimed.etag;
  let post = claimed.post;
  try {
    const outcome = await deps.publish(post, async (patch) => {
      const saved = await store.compareAndSwap(post.id, etag, { ...post, ...patch, updatedAt: now.toISOString() });
      if (!saved) throw new ScheduleError('conflict');
      post = saved.post;
      etag = saved.etag;
    });
    const saved = await store.compareAndSwap(post.id, etag, {
      ...post,
      status: 'published',
      publishedAt: now.toISOString(),
      permalink: outcome.permalink,
      igMediaId: outcome.igMediaId,
      igContainerId: outcome.igContainerId,
      igChildIds: outcome.igChildIds,
      dryRun: outcome.dryRun,
      error: null,
      updatedAt: now.toISOString(),
    });
    if (!saved) return 'pending';
    return 'published';
  } catch (err) {
    if (err instanceof ScheduleError && err.reason === 'conflict') return 'pending';
    const latest = await store.get(post.id);
    const retryable = err instanceof InstagramError && err.retryable;
    const discard = err instanceof InstagramError && err.discardContainer && !latest?.post.igMediaId;
    const message = redactSecrets(err instanceof Error ? err.message : 'publish failed', deps.secrets).slice(0, 500);
    if (latest) {
      await store.compareAndSwap(post.id, latest.etag, {
        ...latest.post,
        status: retryable ? 'publishing' : 'failed',
        error: message || 'publish failed',
        igContainerId: discard ? null : latest.post.igContainerId,
        igChildIds: discard ? [] : latest.post.igChildIds,
        updatedAt: now.toISOString(),
      });
    }
    return retryable ? 'pending' : 'failed';
  }
}
