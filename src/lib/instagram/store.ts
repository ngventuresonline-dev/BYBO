import { POST_PATH_PREFIX } from './config';
import { normalizePost, type IgPost } from './types';

export class PostStoreUnavailable extends Error {
  constructor() {
    super('post store is not configured');
    this.name = 'PostStoreUnavailable';
  }
}

export type StoredPost = { post: IgPost; etag: string };

export type PostBlobIo = {
  put(pathname: string, body: string, opts: { allowOverwrite: boolean; ifMatch?: string }): Promise<void>;
  get(pathname: string): Promise<{ body: string; etag: string } | null>;
  del(pathname: string): Promise<void>;
  list(prefix: string): Promise<string[]>;
};

const ID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

export function postPath(id: string): string {
  if (!ID.test(id)) throw new Error('invalid post id');
  return `${POST_PATH_PREFIX}${id}.json`;
}

export function isConflict(err: unknown): boolean {
  if (!err || typeof err !== 'object') return false;
  const name = 'name' in err ? String(err.name) : '';
  if (name === 'BlobPreconditionFailedError') return true;
  const message = 'message' in err ? String(err.message).toLowerCase() : '';
  return message.includes('precondition') || message.includes('does not match the provided ifmatch');
}

/**
 * Private JSON records. The compare-and-swap on etag is what stops two
 * cron attempts from publishing the same post.
 */
export class BlobPostStore {
  private io: PostBlobIo;

  constructor(io: PostBlobIo) {
    this.io = io;
  }

  async get(id: string): Promise<StoredPost | null> {
    const found = await this.io.get(postPath(id));
    if (!found) return null;
    const post = normalizePost(parseJson(found.body));
    return post ? { post, etag: found.etag } : null;
  }

  async list(): Promise<IgPost[]> {
    const paths = await this.io.list(POST_PATH_PREFIX);
    const posts: IgPost[] = [];
    for (const path of paths) {
      const found = await this.io.get(path);
      const post = found ? normalizePost(parseJson(found.body)) : null;
      if (post) posts.push(post);
    }
    return posts;
  }

  async create(post: IgPost): Promise<StoredPost> {
    const path = postPath(post.id);
    await this.io.put(path, JSON.stringify(post), { allowOverwrite: false });
    const saved = await this.io.get(path);
    const parsed = saved ? normalizePost(parseJson(saved.body)) : null;
    if (!saved || !parsed) throw new Error('post was not stored');
    return { post: parsed, etag: saved.etag };
  }

  async compareAndSwap(id: string, etag: string, next: IgPost): Promise<StoredPost | null> {
    const path = postPath(id);
    try {
      await this.io.put(path, JSON.stringify(next), { allowOverwrite: true, ifMatch: etag });
    } catch (err) {
      if (isConflict(err)) return null;
      throw err;
    }
    const saved = await this.io.get(path);
    const parsed = saved ? normalizePost(parseJson(saved.body)) : null;
    if (!saved || !parsed) return null;
    return { post: parsed, etag: saved.etag };
  }

  async delete(id: string): Promise<void> {
    await this.io.del(postPath(id));
  }
}

function parseJson(body: string): unknown {
  try {
    return JSON.parse(body);
  } catch {
    return null;
  }
}

export async function getPostStore(): Promise<BlobPostStore> {
  if (!process.env.BLOB_READ_WRITE_TOKEN && !process.env.BLOB_STORE_ID) throw new PostStoreUnavailable();
  return new BlobPostStore(vercelIo());
}

function vercelIo(): PostBlobIo {
  return {
    async put(pathname, body, opts) {
      const { put } = await import('@vercel/blob');
      await put(pathname, body, {
        access: 'private',
        addRandomSuffix: false,
        allowOverwrite: opts.allowOverwrite,
        ifMatch: opts.ifMatch,
        contentType: 'application/json',
      });
    },
    async get(pathname) {
      const { get } = await import('@vercel/blob');
      const res = await get(pathname, { access: 'private', useCache: false });
      if (!res || res.statusCode !== 200 || !res.stream) return null;
      const body = await new Response(res.stream).text();
      return { body, etag: res.blob.etag };
    },
    async del(pathname) {
      const { del } = await import('@vercel/blob');
      await del(pathname).catch(() => undefined);
    },
    async list(prefix) {
      const { list } = await import('@vercel/blob');
      const paths: string[] = [];
      let cursor: string | undefined;
      do {
        const page = await list({ prefix, cursor, limit: 1000 });
        for (const blob of page.blobs) paths.push(blob.pathname);
        cursor = page.hasMore ? page.cursor : undefined;
      } while (cursor);
      return paths;
    },
  };
}
