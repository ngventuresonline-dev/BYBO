import { CAPTION_LIMIT, MEDIA_PATH_PREFIX } from './config';
import type { MediaContentType, MediaItem } from './types';

export function normalizeContentType(value: string): MediaContentType | null {
  const type = value.toLowerCase().split(';')[0].trim();
  if (type === 'image/jpeg' || type === 'image/jpg' || type === 'image/pjpeg') return 'image/jpeg';
  if (type === 'image/png') return 'image/png';
  if (type === 'video/mp4') return 'video/mp4';
  return null;
}

export function isPublicMediaUrl(url: string, pathname: string): boolean {
  if (!pathname.startsWith(MEDIA_PATH_PREFIX) || pathname.includes('..') || pathname.includes('\\') || pathname.includes('?')) return false;
  let parsed: URL;
  try {
    parsed = new URL(url);
  } catch {
    return false;
  }
  if (parsed.protocol !== 'https:' || parsed.username || parsed.password) return false;
  if (!parsed.hostname.endsWith('.blob.vercel-storage.com')) return false;
  if (parsed.searchParams.has('access_token') || /access_token/i.test(parsed.search)) return false;
  let path = parsed.pathname;
  try {
    path = decodeURIComponent(parsed.pathname);
  } catch {
    return false;
  }
  return path.replace(/^\//, '') === pathname;
}

export function parseDraft(input: unknown): { ok: true; caption: string; media: MediaItem[] } | { ok: false } {
  if (!input || typeof input !== 'object') return { ok: false };
  const row = input as { caption?: unknown; media?: unknown };
  if (typeof row.caption !== 'string' || !Array.isArray(row.media)) return { ok: false };
  const caption = row.caption.replace(/\r\n/g, '\n').trim();
  if (caption.length > CAPTION_LIMIT) return { ok: false };
  if (row.media.length < 1 || row.media.length > 10) return { ok: false };
  const media: MediaItem[] = [];
  const seen = new Set<string>();
  for (const item of row.media) {
    if (!item || typeof item !== 'object') return { ok: false };
    const candidate = item as { url?: unknown; pathname?: unknown; contentType?: unknown };
    if (typeof candidate.url !== 'string' || typeof candidate.pathname !== 'string' || typeof candidate.contentType !== 'string') return { ok: false };
    const contentType = normalizeContentType(candidate.contentType);
    if (!contentType || !isPublicMediaUrl(candidate.url, candidate.pathname)) return { ok: false };
    if (seen.has(candidate.url)) return { ok: false };
    seen.add(candidate.url);
    media.push({
      url: candidate.url,
      pathname: candidate.pathname,
      contentType,
      kind: contentType === 'video/mp4' ? 'video' : 'image',
    });
  }
  return { ok: true, caption, media };
}
