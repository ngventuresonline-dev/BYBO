/**
 * A post the founder has composed for @byboindia.
 * Nothing in `draft` is sent to Instagram. `approved` and `scheduled`
 * are the only states the scheduler is allowed to publish.
 */

export const POST_STATUSES = ['draft', 'approved', 'scheduled', 'publishing', 'published', 'failed'] as const;

export type PostStatus = (typeof POST_STATUSES)[number];

export type MediaContentType = 'image/jpeg' | 'image/png' | 'video/mp4';

export type MediaItem = {
  url: string;
  pathname: string;
  contentType: MediaContentType;
  kind: 'image' | 'video';
};

export type IgPost = {
  id: string;
  createdAt: string;
  updatedAt: string;
  caption: string;
  media: MediaItem[];
  status: PostStatus;
  /** UTC instant. Null means "as soon as this is approved". */
  scheduledAt: string | null;
  approvedAt: string | null;
  publishingStartedAt: string | null;
  publishedAt: string | null;
  permalink: string | null;
  error: string | null;
  /** True when the recorded publish did not call Instagram. */
  dryRun: boolean;
  igContainerId: string | null;
  igChildIds: string[];
  igMediaId: string | null;
};

export type PublishOutcome = {
  dryRun: boolean;
  igMediaId: string;
  igContainerId: string | null;
  igChildIds: string[];
  permalink: string | null;
};

export type DeliveryKind = 'image' | 'reel' | 'carousel';

export function deliveryKind(media: Pick<MediaItem, 'kind'>[]): DeliveryKind | null {
  if (media.length < 1 || media.length > 10) return null;
  if (media.length > 1) return 'carousel';
  return media[0].kind === 'video' ? 'reel' : 'image';
}

export function newIgPost(partial: Pick<IgPost, 'caption' | 'media'> & Partial<IgPost>): IgPost {
  const now = new Date().toISOString();
  return {
    id: partial.id ?? crypto.randomUUID(),
    createdAt: partial.createdAt ?? now,
    updatedAt: partial.updatedAt ?? now,
    caption: partial.caption,
    media: partial.media,
    status: partial.status ?? 'draft',
    scheduledAt: partial.scheduledAt ?? null,
    approvedAt: partial.approvedAt ?? null,
    publishingStartedAt: partial.publishingStartedAt ?? null,
    publishedAt: partial.publishedAt ?? null,
    permalink: partial.permalink ?? null,
    error: partial.error ?? null,
    dryRun: partial.dryRun ?? false,
    igContainerId: partial.igContainerId ?? null,
    igChildIds: partial.igChildIds ?? [],
    igMediaId: partial.igMediaId ?? null,
  };
}

const STATUSES = new Set<string>(POST_STATUSES);

export function normalizePost(value: unknown): IgPost | null {
  if (!value || typeof value !== 'object') return null;
  const row = value as Partial<IgPost>;
  if (typeof row.id !== 'string' || typeof row.caption !== 'string' || !row.status || !STATUSES.has(row.status)) return null;
  if (!Array.isArray(row.media)) return null;
  return {
    id: row.id,
    createdAt: typeof row.createdAt === 'string' ? row.createdAt : new Date(0).toISOString(),
    updatedAt: typeof row.updatedAt === 'string' ? row.updatedAt : new Date(0).toISOString(),
    caption: row.caption,
    media: row.media as MediaItem[],
    status: row.status,
    scheduledAt: typeof row.scheduledAt === 'string' ? row.scheduledAt : null,
    approvedAt: typeof row.approvedAt === 'string' ? row.approvedAt : null,
    publishingStartedAt: typeof row.publishingStartedAt === 'string' ? row.publishingStartedAt : null,
    publishedAt: typeof row.publishedAt === 'string' ? row.publishedAt : null,
    permalink: typeof row.permalink === 'string' ? row.permalink : null,
    error: typeof row.error === 'string' ? row.error : null,
    dryRun: row.dryRun === true,
    igContainerId: typeof row.igContainerId === 'string' ? row.igContainerId : null,
    igChildIds: Array.isArray(row.igChildIds) ? row.igChildIds.filter((id): id is string => typeof id === 'string') : [],
    igMediaId: typeof row.igMediaId === 'string' ? row.igMediaId : null,
  };
}
