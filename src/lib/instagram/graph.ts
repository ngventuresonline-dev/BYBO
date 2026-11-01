import { GRAPH_ROOT } from './config';
import { redactSecrets } from './redact';

export class InstagramError extends Error {
  retryable: boolean;
  /** The container cannot be published. The next approval must create a new one. */
  discardContainer: boolean;

  constructor(message: string, retryable = false, discardContainer = false) {
    super(message);
    this.name = 'InstagramError';
    this.retryable = retryable;
    this.discardContainer = discardContainer;
  }
}

export type GraphClient = {
  userId: string;
  request(method: 'GET' | 'POST', path: string, body?: Record<string, string>): Promise<unknown>;
};

export type HealthReport = {
  username: string;
  usage: number;
  total: number;
  durationSeconds: number;
};

const ID = /^\d{5,32}$/;

export function createGraphClient(opts: { fetch?: typeof fetch; token: string; userId: string; root?: string }): GraphClient {
  if (!ID.test(opts.userId)) throw new InstagramError('invalid instagram user id');
  const token = opts.token;
  const root = opts.root ?? GRAPH_ROOT;
  const doFetch = opts.fetch ?? globalThis.fetch;
  return {
    userId: opts.userId,
    async request(method, path, body) {
      if (!path.startsWith('/') || path.includes('://') || path.includes('access_token') || path.includes(token)) {
        throw new InstagramError('refusing to build that instagram request');
      }
      const url = `${root}${path}`;
      const headers = new Headers({ Authorization: `Bearer ${token}`, Accept: 'application/json' });
      let payload: string | undefined;
      if (body) {
        headers.set('Content-Type', 'application/x-www-form-urlencoded');
        payload = new URLSearchParams(body).toString();
        if (payload.includes(token)) throw new InstagramError('refusing to send the access token in the body');
      }
      let response: Response;
      try {
        response = await doFetch(url, { method, headers, body: payload });
      } catch (err) {
        const message = err instanceof Error ? err.message : 'network error';
        throw new InstagramError(redactSecrets(message, [token]) || 'instagram could not be reached', true);
      }
      const text = await response.text();
      const safe = redactSecrets(text, [token]);
      let json: unknown = null;
      if (safe) {
        try {
          json = JSON.parse(safe);
        } catch {
          throw new InstagramError((safe || 'instagram returned an unreadable response').slice(0, 500), response.status >= 500);
        }
      }
      const graphMessage = errorMessage(json);
      if (!response.ok || graphMessage) {
        throw new InstagramError(redactSecrets(graphMessage || safe || 'instagram request failed', [token]).slice(0, 500), response.status >= 500);
      }
      return json;
    },
  };
}

function errorMessage(json: unknown): string | null {
  if (!json || typeof json !== 'object' || !('error' in json)) return null;
  const error = (json as { error?: { message?: unknown } }).error;
  if (!error) return null;
  return typeof error.message === 'string' ? error.message : 'instagram request failed';
}

export function readId(json: unknown): string {
  const id = json && typeof json === 'object' ? (json as { id?: unknown }).id : null;
  if (typeof id !== 'string' || !/^\d+$/.test(id)) throw new InstagramError('instagram returned an unexpected id');
  return id;
}

export function readStatus(json: unknown): { code: string; detail: string } {
  const row = json && typeof json === 'object' ? json as { status_code?: unknown; status?: unknown } : {};
  return {
    code: typeof row.status_code === 'string' ? row.status_code : '',
    detail: typeof row.status === 'string' ? row.status : '',
  };
}

export function readPermalink(json: unknown): string | null {
  const value = json && typeof json === 'object' ? (json as { permalink?: unknown }).permalink : null;
  if (typeof value !== 'string') return null;
  try {
    const url = new URL(value);
    if (url.protocol !== 'https:') return null;
    if (url.hostname !== 'www.instagram.com' && url.hostname !== 'instagram.com') return null;
    return url.toString();
  } catch {
    return null;
  }
}

export function readQuota(json: unknown): { usage: number; total: number; durationSeconds: number } {
  const record = json && typeof json === 'object' ? json as { data?: unknown; quota_usage?: unknown; config?: { quota_total?: unknown; quota_duration?: unknown } } : {};
  const row = Array.isArray(record.data) ? record.data[0] as typeof record : record;
  const usage = typeof row?.quota_usage === 'number' ? row.quota_usage : null;
  const total = typeof row?.config?.quota_total === 'number' ? row.config.quota_total : null;
  const duration = typeof row?.config?.quota_duration === 'number' ? row.config.quota_duration : 86400;
  if (usage == null || total == null) throw new InstagramError('instagram did not return a publishing limit');
  return { usage, total, durationSeconds: duration };
}

export async function instagramHealth(graph: GraphClient): Promise<HealthReport> {
  const user = await graph.request('GET', `/${graph.userId}?fields=username`);
  const username = user && typeof user === 'object' ? (user as { username?: unknown }).username : null;
  if (typeof username !== 'string' || !/^[A-Za-z0-9._]+$/.test(username)) throw new InstagramError('instagram did not return a username');
  const quota = readQuota(await graph.request('GET', `/${graph.userId}/content_publishing_limit`));
  return { username, ...quota };
}
