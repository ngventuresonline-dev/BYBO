import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import { InstagramError } from './graph';
import { approveNow, deleteDraft, runDuePosts, saveDraft, schedulePost, ScheduleError } from './schedule';
import { BlobPostStore, type PostBlobIo } from './store';
import { istLocalToUtc } from './time';
import { newIgPost, type IgPost, type MediaItem, type PublishOutcome } from './types';

function memoryIo(): PostBlobIo {
  const files = new Map<string, { body: string; etag: string }>();
  let n = 0;
  return {
    async put(pathname, body, opts) {
      const current = files.get(pathname);
      if (current && !opts.allowOverwrite) throw new Error('The blob already exists');
      if (current && opts.ifMatch && opts.ifMatch !== current.etag) throw new Error('precondition failed');
      n += 1;
      files.set(pathname, { body, etag: `e${n}` });
    },
    async get(pathname) {
      const found = files.get(pathname);
      return found ? { body: found.body, etag: found.etag } : null;
    },
    async del(pathname) { files.delete(pathname); },
    async list(prefix) { return [...files.keys()].filter((key) => key.startsWith(prefix)); },
  };
}

function image(name = 'a'): MediaItem {
  const pathname = `bybo-instagram/media/${name}.jpg`;
  return {
    url: `https://example.public.blob.vercel-storage.com/${pathname}`,
    pathname,
    contentType: 'image/jpeg',
    kind: 'image',
  };
}

const permalink = 'https://www.instagram.com/p/abc123/';

function outcome(id = 'media-1'): PublishOutcome {
  return { dryRun: false, igMediaId: id, igContainerId: 'container-1', igChildIds: [], permalink };
}

const NOW = new Date('2026-11-01T05:00:00.000Z');

describe('instagram time', () => {
  it('reads a datetime-local value as India time', () => {
    assert.equal(istLocalToUtc('2026-11-01T10:30')?.toISOString(), '2026-11-01T05:00:00.000Z');
    assert.equal(istLocalToUtc('2026-11-01T23:45')?.toISOString(), '2026-11-01T18:15:00.000Z');
    assert.equal(istLocalToUtc('2026-02-31T10:00'), null);
    assert.equal(istLocalToUtc('2026-11-01 10:30'), null);
  });
});

describe('instagram schedule', () => {
  it('does not publish a draft, a future schedule, or a failed post', async () => {
    const store = new BlobPostStore(memoryIo());
    await store.create(newIgPost({ caption: 'Draft', media: [image()], status: 'draft' }));
    await store.create(newIgPost({
      caption: 'Later',
      media: [image('b')],
      status: 'scheduled',
      scheduledAt: '2026-11-02T05:00:00.000Z',
      approvedAt: NOW.toISOString(),
    }));
    await store.create(newIgPost({ caption: 'Failed', media: [image('c')], status: 'failed', error: 'no' }));
    let calls = 0;
    const result = await runDuePosts(store, NOW, { publish: async () => { calls += 1; return outcome(); } });
    assert.equal(calls, 0);
    assert.deepEqual(result.published, []);
  });

  it('publishes a due approved post once when the cron runs twice', async () => {
    const store = new BlobPostStore(memoryIo());
    const created = await store.create(newIgPost({
      caption: 'Due',
      media: [image()],
      status: 'scheduled',
      scheduledAt: '2026-11-01T04:50:00.000Z',
      approvedAt: NOW.toISOString(),
    }));
    let calls = 0;
    const publish = async () => {
      calls += 1;
      return outcome('555');
    };
    const first = await runDuePosts(store, NOW, { publish });
    const second = await runDuePosts(store, NOW, { publish });
    assert.equal(calls, 1);
    assert.deepEqual(first.published, [created.post.id]);
    assert.deepEqual(second.published, []);
    const saved = await store.get(created.post.id);
    assert.equal(saved?.post.status, 'published');
    assert.equal(saved?.post.permalink, permalink);
    assert.equal(saved?.post.igMediaId, '555');
  });

  it('does not start a second publish while the first claim is in flight', async () => {
    const store = new BlobPostStore(memoryIo());
    const created = await store.create(newIgPost({ caption: 'Race', media: [image()], status: 'approved', approvedAt: NOW.toISOString() }));
    let started = 0;
    let release: () => void = () => {};
    const gate = new Promise<void>((resolve) => { release = resolve; });
    const publish = async () => {
      started += 1;
      await gate;
      return outcome();
    };
    const pending = Promise.all([
      runDuePosts(store, NOW, { publish }),
      runDuePosts(store, NOW, { publish }),
    ]);
    for (let i = 0; i < 10 && started < 1; i += 1) await new Promise((resolve) => setImmediate(resolve));
    assert.equal(started, 1);
    release();
    const [first, second] = await pending;
    assert.equal(started, 1);
    assert.equal(first.published.length + second.published.length, 1);
    assert.equal((await store.get(created.post.id))?.post.status, 'published');
  });

  it('approves from the post-now action and does not approve a bare draft', async () => {
    const store = new BlobPostStore(memoryIo());
    let calls = 0;
    const saved = await saveDraft(store, { caption: 'Hold', media: [image()] }, NOW);
    assert.equal(saved.status, 'draft');
    await runDuePosts(store, NOW, { publish: async () => { calls += 1; return outcome(); } });
    assert.equal(calls, 0);
    const published = await approveNow(store, { id: saved.id, caption: 'Hold', media: [image()] }, NOW, {
      publish: async () => { calls += 1; return outcome('777'); },
    });
    assert.equal(published.status, 'published');
    assert.equal(calls, 1);
    const again = await approveNow(store, { id: saved.id, caption: 'Hold', media: [image()] }, NOW, {
      publish: async () => { calls += 1; return outcome('888'); },
    });
    assert.equal(again.igMediaId, '777');
    assert.equal(calls, 1);
  });

  it('schedules in IST without posting, then the cron posts it once', async () => {
    const store = new BlobPostStore(memoryIo());
    let calls = 0;
    const scheduled = await schedulePost(store, {
      caption: 'Tonight',
      media: [image()],
      scheduledAt: '2026-11-01T12:00',
    }, new Date('2026-11-01T04:00:00.000Z'));
    assert.equal(scheduled.status, 'scheduled');
    assert.equal(scheduled.scheduledAt, '2026-11-01T06:30:00.000Z');
    assert.equal(calls, 0);
    await runDuePosts(store, new Date('2026-11-01T06:00:00.000Z'), {
      publish: async () => { calls += 1; return outcome(); },
    });
    assert.equal(calls, 0);
    const due = await runDuePosts(store, new Date('2026-11-01T06:30:00.000Z'), {
      publish: async () => { calls += 1; return outcome(); },
    });
    assert.deepEqual(due.published, [scheduled.id]);
    assert.equal(calls, 1);
    await assert.rejects(
      () => schedulePost(store, { caption: 'x', media: [image('z')], scheduledAt: '2020-01-01T10:00' }, NOW),
      (err: unknown) => err instanceof ScheduleError && err.reason === 'schedule_in_past',
    );
  });

  it('leaves a retryable publish in progress and resumes the same container', async () => {
    const store = new BlobPostStore(memoryIo());
    const created = await store.create(newIgPost({ caption: 'Reel', media: [image()], status: 'approved', approvedAt: NOW.toISOString() }));
    let calls = 0;
    const publish = async (post: IgPost, report: (patch: Pick<IgPost, 'igChildIds' | 'igContainerId' | 'igMediaId'>) => Promise<void>) => {
      calls += 1;
      if (calls === 1) {
        await report({ igChildIds: [], igContainerId: '42', igMediaId: null });
        throw new InstagramError('still processing', true);
      }
      assert.equal(post.igContainerId, '42');
      return outcome('43');
    };
    const first = await runDuePosts(store, NOW, { publish, staleAfterMs: 0 });
    assert.deepEqual(first.pending, [created.post.id]);
    assert.equal((await store.get(created.post.id))?.post.status, 'publishing');
    const second = await runDuePosts(store, new Date(NOW.getTime() + 1000), { publish, staleAfterMs: 0 });
    assert.deepEqual(second.published, [created.post.id]);
    assert.equal(calls, 2);
    assert.equal((await store.get(created.post.id))?.post.igMediaId, '43');
  });

  it('marks a publish that died before Instagram accepted media as failed, and does not retry it', async () => {
    const store = new BlobPostStore(memoryIo());
    const created = await store.create(newIgPost({
      caption: 'Stuck',
      media: [image()],
      status: 'publishing',
      publishingStartedAt: new Date(NOW.getTime() - 60_000).toISOString(),
    }));
    let calls = 0;
    await runDuePosts(store, NOW, {
      publish: async () => { calls += 1; return outcome(); },
      staleAfterMs: 1_000,
    });
    assert.equal(calls, 0);
    assert.equal((await store.get(created.post.id))?.post.status, 'failed');
    await runDuePosts(store, NOW, {
      publish: async () => { calls += 1; return outcome(); },
      staleAfterMs: 1_000,
    });
    assert.equal(calls, 0);
  });

  it('drops a rejected container so the next approval does not reuse it', async () => {
    const store = new BlobPostStore(memoryIo());
    const created = await store.create(newIgPost({ caption: 'Bad', media: [image()], status: 'approved', approvedAt: NOW.toISOString() }));
    await runDuePosts(store, NOW, {
      publish: async (_post, report) => {
        await report({ igChildIds: ['1'], igContainerId: '9', igMediaId: null });
        throw new InstagramError('Media could not be processed', false, true);
      },
    });
    const saved = await store.get(created.post.id);
    assert.equal(saved?.post.status, 'failed');
    assert.equal(saved?.post.igContainerId, null);
    assert.deepEqual(saved?.post.igChildIds, []);
    assert.match(saved?.post.error ?? '', /could not be processed/);
  });

  it('rejects a caption that contains a secret and only deletes drafts', async () => {
    const store = new BlobPostStore(memoryIo());
    const secret = 'super-secret-value';
    await assert.rejects(
      () => saveDraft(store, { caption: `leak ${secret}`, media: [image()] }, NOW, [secret]),
      (err: unknown) => err instanceof ScheduleError && err.reason === 'invalid',
    );
    const draft = await saveDraft(store, { caption: 'Keep', media: [image()] }, NOW);
    await deleteDraft(store, draft.id);
    assert.equal(await store.get(draft.id), null);
    const approved = await store.create(newIgPost({ caption: 'No', media: [image()], status: 'approved' }));
    await assert.rejects(
      () => deleteDraft(store, approved.post.id),
      (err: unknown) => err instanceof ScheduleError && err.reason === 'not_editable',
    );
  });
});
