import { deliveryKind, type IgPost, type MediaItem, type PublishOutcome } from './types';
import { InstagramError, readId, readPermalink, readQuota, readStatus, type GraphClient } from './graph';
import { parseDraft } from './validate';

export type PublishDeps = {
  dryRun: boolean;
  graph: GraphClient;
  sleep: (ms: number) => Promise<void>;
  log: (message: string, fields: Record<string, unknown>) => void;
  onProgress?: (patch: Pick<IgPost, 'igChildIds' | 'igContainerId' | 'igMediaId'>) => Promise<void>;
  /** Wall clock for container polling across every video in the post. */
  budgetMs?: number;
  pollIntervalMs?: number;
};

const DEFAULT_BUDGET_MS = 240_000;
const DEFAULT_POLL_MS = 3_000;

/**
 * Publish one already-approved post.
 * Image: create container, publish.
 * Reel: create REELS container, poll status_code until FINISHED, publish.
 * Carousel: child containers (VIDEO children are polled), then the parent, then publish.
 * A saved container id is reused, so a retry does not create a second post.
 */
export async function publishInstagram(post: IgPost, deps: PublishDeps): Promise<PublishOutcome> {
  const parsed = parseDraft({ caption: post.caption, media: post.media });
  if (!parsed.ok) throw new InstagramError('the post media is not valid');
  const kind = deliveryKind(parsed.media);
  if (!kind) throw new InstagramError('the post media is not valid');

  if (deps.dryRun) {
    deps.log('instagram dry-run', {
      id: post.id,
      kind,
      caption: parsed.caption,
      media: parsed.media.map((item) => item.url),
    });
    return {
      dryRun: true,
      igMediaId: `dry-run:${post.id}`,
      igContainerId: post.igContainerId,
      igChildIds: post.igChildIds,
      permalink: null,
    };
  }

  if (post.igMediaId && !post.igMediaId.startsWith('dry-run:')) {
    const permalink = await readPublishedPermalink(deps, post.igMediaId);
    return {
      dryRun: false,
      igMediaId: post.igMediaId,
      igContainerId: post.igContainerId,
      igChildIds: post.igChildIds,
      permalink,
    };
  }

  const quota = readQuota(await deps.graph.request('GET', `/${deps.graph.userId}/content_publishing_limit`));
  if (quota.usage >= quota.total) {
    throw new InstagramError(`Instagram publishing limit reached (${quota.usage} of ${quota.total} in the last 24 hours).`);
  }

  const deadline = Date.now() + (deps.budgetMs ?? DEFAULT_BUDGET_MS);
  let childIds = [...post.igChildIds];
  let containerId = post.igContainerId;

  if (!containerId) {
    if (kind === 'carousel') {
      for (const item of parsed.media.slice(childIds.length)) {
        const id = readId(await deps.graph.request('POST', `/${deps.graph.userId}/media`, childBody(item)));
        childIds = [...childIds, id];
        await deps.onProgress?.({ igChildIds: childIds, igContainerId: containerId, igMediaId: post.igMediaId });
      }
      if (childIds.length !== parsed.media.length) throw new InstagramError('carousel children were not created');
      for (let index = 0; index < parsed.media.length; index += 1) {
        if (parsed.media[index].kind === 'video') await waitUntilFinished(deps, childIds[index], deadline);
      }
      containerId = readId(await deps.graph.request('POST', `/${deps.graph.userId}/media`, {
        media_type: 'CAROUSEL',
        children: childIds.join(','),
        ...captionField(parsed.caption),
      }));
      await deps.onProgress?.({ igChildIds: childIds, igContainerId: containerId, igMediaId: post.igMediaId });
      if (parsed.media.some((item) => item.kind === 'video')) await waitUntilFinished(deps, containerId, deadline);
    } else if (kind === 'reel') {
      containerId = readId(await deps.graph.request('POST', `/${deps.graph.userId}/media`, {
        media_type: 'REELS',
        video_url: parsed.media[0].url,
        share_to_feed: 'true',
        ...captionField(parsed.caption),
      }));
      await deps.onProgress?.({ igChildIds: childIds, igContainerId: containerId, igMediaId: post.igMediaId });
      await waitUntilFinished(deps, containerId, deadline);
    } else {
      containerId = readId(await deps.graph.request('POST', `/${deps.graph.userId}/media`, {
        image_url: parsed.media[0].url,
        ...captionField(parsed.caption),
      }));
      await deps.onProgress?.({ igChildIds: childIds, igContainerId: containerId, igMediaId: post.igMediaId });
    }
  } else if (kind === 'reel' || parsed.media.some((item) => item.kind === 'video')) {
    await waitUntilFinished(deps, containerId, deadline);
  }

  if (!containerId || !/^\d+$/.test(containerId)) throw new InstagramError('missing container');
  const igMediaId = readId(await deps.graph.request('POST', `/${deps.graph.userId}/media_publish`, { creation_id: containerId }));
  await deps.onProgress?.({ igChildIds: childIds, igContainerId: containerId, igMediaId });
  const permalink = await readPublishedPermalink(deps, igMediaId);
  return { dryRun: false, igMediaId, igContainerId: containerId, igChildIds: childIds, permalink };
}

function childBody(item: MediaItem): Record<string, string> {
  if (item.kind === 'video') {
    return { media_type: 'VIDEO', video_url: item.url, is_carousel_item: 'true' };
  }
  return { image_url: item.url, is_carousel_item: 'true' };
}

function captionField(caption: string): Record<string, string> {
  return caption ? { caption } : {};
}

async function waitUntilFinished(deps: PublishDeps, containerId: string, deadline: number): Promise<void> {
  if (!/^\d+$/.test(containerId)) throw new InstagramError('missing container');
  const interval = deps.pollIntervalMs ?? DEFAULT_POLL_MS;
  for (;;) {
    const status = readStatus(await deps.graph.request('GET', `/${containerId}?fields=status_code,status`));
    if (status.code === 'FINISHED' || status.code === 'PUBLISHED') return;
    if (status.code === 'ERROR' || status.code === 'EXPIRED') {
      throw new InstagramError(status.detail || `Instagram container ${status.code.toLowerCase()}`, false, true);
    }
    if (Date.now() + interval >= deadline) {
      throw new InstagramError('Instagram is still processing the media. The scheduler will try again.', true);
    }
    await deps.sleep(interval);
  }
}

async function readPublishedPermalink(deps: PublishDeps, mediaId: string): Promise<string> {
  if (!/^\d+$/.test(mediaId)) throw new InstagramError('missing media id');
  for (let attempt = 0; attempt < 5; attempt += 1) {
    const permalink = readPermalink(await deps.graph.request('GET', `/${mediaId}?fields=permalink`));
    if (permalink) return permalink;
    if (attempt < 4) await deps.sleep(Math.min(deps.pollIntervalMs ?? 2_000, 2_000));
  }
  throw new InstagramError('Instagram published the post but the permalink is not ready yet.', true);
}
