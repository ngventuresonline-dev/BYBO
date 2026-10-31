import assert from 'node:assert/strict';
import { afterEach, describe, it } from 'node:test';
import { isDryRun } from './config';
import { createGraphClient, instagramHealth, InstagramError } from './graph';
import { publishInstagram } from './publish';
import { redactSecrets } from './redact';
import { newIgPost, type IgPost, type MediaItem } from './types';

const originalFetch = globalThis.fetch;
const TOKEN = 'EAAG-test-token-value';
const USER = '17841460389884497';

afterEach(() => {
  globalThis.fetch = originalFetch;
  delete process.env.IG_POST_DRY_RUN;
  delete process.env.IG_ACCESS_TOKEN;
});

function media(kind: 'image' | 'video', name: string): MediaItem {
  const ext = kind === 'video' ? 'mp4' : 'jpg';
  const pathname = `bybo-instagram/media/${name}.${ext}`;
  return {
    url: `https://example.public.blob.vercel-storage.com/${pathname}`,
    pathname,
    contentType: kind === 'video' ? 'video/mp4' : 'image/jpeg',
    kind,
  };
}

function post(items: MediaItem[], extra: Partial<IgPost> = {}): IgPost {
  return newIgPost({
    id: '11111111-1111-4111-8111-111111111111',
    caption: 'Hello from BYBO',
    media: items,
    status: 'approved',
    ...extra,
  });
}

type Call = { method: string; path: string; body?: Record<string, string> };

function scripted(steps: Array<(call: Call) => unknown>) {
  const calls: Call[] = [];
  return {
    calls,
    userId: USER,
    async request(method: 'GET' | 'POST', path: string, body?: Record<string, string>) {
      const call = { method, path, body };
      calls.push(call);
      const step = steps[calls.length - 1];
      if (!step) throw new Error(`unexpected ${method} ${path}`);
      return step(call);
    },
  };
}

const quota = (usage = 1, total = 100) => () => ({
  data: [{ quota_usage: usage, config: { quota_total: total, quota_duration: 86400 } }],
});
const created = (id: string) => () => ({ id });
const finished = () => ({ status_code: 'FINISHED' });
const link = () => ({ permalink: 'https://www.instagram.com/p/abc123/' });

function deps(graph: ReturnType<typeof scripted>, extra: { dryRun?: boolean; budgetMs?: number } = {}) {
  return {
    dryRun: extra.dryRun ?? false,
    graph,
    sleep: async () => {},
    log: () => {},
    budgetMs: extra.budgetMs,
    pollIntervalMs: 1,
  };
}

describe('instagram config', () => {
  it('treats an unset dry-run flag as on, and only the word false as live', () => {
    delete process.env.IG_POST_DRY_RUN;
    assert.equal(isDryRun(), true);
    process.env.IG_POST_DRY_RUN = 'true';
    assert.equal(isDryRun(), true);
    process.env.IG_POST_DRY_RUN = 'FALSE';
    assert.equal(isDryRun(), false);
    process.env.IG_POST_DRY_RUN = 'false';
    assert.equal(isDryRun(), false);
  });
});

describe('instagram publish', () => {
  it('does not call Instagram during a dry run and logs the post without the token', async () => {
    const graph = scripted([]);
    const logs: string[] = [];
    const result = await publishInstagram(post([media('image', 'a')], { caption: `caption ${TOKEN}` }), {
      ...deps(graph, { dryRun: true }),
      log: (message, fields) => logs.push(redactSecrets(`${message} ${JSON.stringify(fields)}`, [TOKEN])),
    });
    assert.equal(graph.calls.length, 0);
    assert.equal(result.dryRun, true);
    assert.equal(result.permalink, null);
    assert.equal(logs.join('\n').includes(TOKEN), false);
    assert.match(logs.join('\n'), /caption \[redacted\]/);
  });

  it('publishes one image without polling a container', async () => {
    const graph = scripted([quota(), created('101'), created('202'), link]);
    const result = await publishInstagram(post([media('image', 'a')]), deps(graph));
    assert.equal(result.permalink, 'https://www.instagram.com/p/abc123/');
    assert.equal(result.igMediaId, '202');
    assert.deepEqual(graph.calls.map((call) => `${call.method} ${call.path}`), [
      `GET /${USER}/content_publishing_limit`,
      `POST /${USER}/media`,
      `POST /${USER}/media_publish`,
      'GET /202?fields=permalink',
    ]);
    assert.equal(graph.calls[1].body?.image_url, media('image', 'a').url);
    assert.equal(graph.calls[1].body?.caption, 'Hello from BYBO');
    assert.equal(graph.calls[2].body?.creation_id, '101');
    assert.equal(graph.calls.some((call) => call.path.includes('status_code')), false);
  });

  it('publishes a reel only after the container is FINISHED', async () => {
    const graph = scripted([
      quota(),
      created('301'),
      () => ({ status_code: 'IN_PROGRESS' }),
      finished,
      created('302'),
      link,
    ]);
    const result = await publishInstagram(post([media('video', 'reel')]), deps(graph));
    assert.equal(result.igMediaId, '302');
    assert.equal(graph.calls[1].body?.media_type, 'REELS');
    assert.equal(graph.calls[1].body?.share_to_feed, 'true');
    assert.equal(graph.calls[1].body?.video_url, media('video', 'reel').url);
    assert.equal(graph.calls[2].path, '/301?fields=status_code,status');
    assert.equal(graph.calls[3].path, '/301?fields=status_code,status');
    assert.equal(graph.calls[4].body?.creation_id, '301');
  });

  it('builds a carousel from image and video children and polls the video', async () => {
    const graph = scripted([
      quota(),
      created('11'),
      created('12'),
      finished,
      created('13'),
      finished,
      created('14'),
      link,
    ]);
    const result = await publishInstagram(post([media('image', 'one'), media('video', 'two')]), deps(graph));
    assert.equal(result.igChildIds.join(','), '11,12');
    assert.equal(graph.calls[1].body?.is_carousel_item, 'true');
    assert.equal(graph.calls[1].body?.image_url?.endsWith('/one.jpg'), true);
    assert.equal(graph.calls[2].body?.media_type, 'VIDEO');
    assert.equal(graph.calls[2].body?.is_carousel_item, 'true');
    assert.equal(graph.calls[3].path, '/12?fields=status_code,status');
    assert.equal(graph.calls[4].body?.media_type, 'CAROUSEL');
    assert.equal(graph.calls[4].body?.children, '11,12');
    assert.equal(graph.calls[5].path, '/13?fields=status_code,status');
    assert.equal(result.permalink, 'https://www.instagram.com/p/abc123/');
  });

  it('refuses to publish once the 24 hour quota is used', async () => {
    const graph = scripted([quota(100, 100), created('1')]);
    await assert.rejects(
      () => publishInstagram(post([media('image', 'a')]), deps(graph)),
      (err: unknown) => err instanceof InstagramError && /limit/i.test(err.message),
    );
    assert.equal(graph.calls.length, 1);
  });

  it('reuses a saved container instead of creating another one', async () => {
    const graph = scripted([quota(), created('808'), link]);
    const result = await publishInstagram(post([media('image', 'a')], { igContainerId: '707' }), deps(graph));
    assert.equal(result.igContainerId, '707');
    assert.equal(graph.calls.some((call) => call.path.endsWith('/media')), false);
    assert.equal(graph.calls[1].body?.creation_id, '707');
  });

  it('fetches only the permalink when the media id was already saved', async () => {
    const graph = scripted([link]);
    const result = await publishInstagram(post([media('video', 'reel')], { igMediaId: '909', igContainerId: '303' }), deps(graph));
    assert.deepEqual(graph.calls.map((call) => call.path), ['/909?fields=permalink']);
    assert.equal(result.permalink, 'https://www.instagram.com/p/abc123/');
  });

  it('keeps a container that is still processing retryable', async () => {
    const graph = scripted([quota(), created('301'), () => ({ status_code: 'IN_PROGRESS' })]);
    await assert.rejects(
      () => publishInstagram(post([media('video', 'reel')]), deps(graph, { budgetMs: 0 })),
      (err: unknown) => err instanceof InstagramError && err.retryable,
    );
  });

  it('surfaces a container error without the access token', async () => {
    const graph = scripted([
      quota(),
      created('301'),
      () => ({ status_code: 'ERROR', status: 'Media could not be processed' }),
    ]);
    await assert.rejects(
      () => publishInstagram(post([media('video', 'reel')]), deps(graph)),
      (err: unknown) => err instanceof InstagramError && err.retryable === false && /could not be processed/.test(err.message),
    );
  });
});

describe('instagram graph client', () => {
  it('sends the token as a bearer header and redacts it from errors and the health result', async () => {
    const urls: string[] = [];
    globalThis.fetch = async (input, init) => {
      const url = String(input);
      urls.push(url);
      const auth = new Headers(init?.headers).get('authorization') ?? '';
      assert.equal(url.includes(TOKEN), false);
      assert.equal(String(init?.body ?? '').includes(TOKEN), false);
      assert.equal(auth.startsWith('Bearer '), true);
      assert.equal(auth.slice('Bearer '.length) === TOKEN, true);
      if (url.includes('content_publishing_limit')) {
        return Response.json({ data: [{ quota_usage: 2, config: { quota_total: 100, quota_duration: 86400 } }] });
      }
      if (url.includes('fields=username')) return Response.json({ username: 'byboindia' });
      return Response.json({ error: { message: `bad ${TOKEN}` } }, { status: 400 });
    };
    const client = createGraphClient({ token: TOKEN, userId: USER });
    const health = await instagramHealth(client);
    assert.equal(health.username, 'byboindia');
    assert.equal(health.usage, 2);
    assert.equal(health.total, 100);
    assert.equal(JSON.stringify(health).includes(TOKEN), false);
    assert.equal(urls.some((url) => url.includes(`/${USER}?fields=username`)), true);
    assert.equal(urls.some((url) => url.includes(`/${USER}/content_publishing_limit`)), true);
    await assert.rejects(
      () => client.request('GET', `/${USER}?fields=id`),
      (err: unknown) => err instanceof InstagramError && !err.message.includes(TOKEN) && err.message.includes('[redacted]'),
    );
  });
});
