import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import { BlobLeadStore, type BlobIo } from './blob-store';
import { newLead } from './types';

function memoryIo(): BlobIo & { files: Map<string, { body: string; etag: string }> } {
  const files = new Map<string, { body: string; etag: string }>();
  let n = 0;
  return {
    files,
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

const now = new Date('2026-10-31T04:30:00.000Z');

function lead(id: string, phone: string) {
  return newLead({
    id,
    created_at: now.toISOString(),
    source: 'website',
    external_id: null,
    name: 'Priya',
    email: 'priya@example.com',
    phone_e164: phone,
    business: 'Spice Co',
    enquiry: 'More enquiries',
    area: '',
    raw: {},
    call_status: 'pending',
  });
}

describe('blob lead store', () => {
  it('claims a lead once per IST day', async () => {
    const store = new BlobLeadStore(memoryIo());
    await store.insert(lead('a', '+919686613899'), now);
    const first = await store.claimForCall('a', now, { requireDue: false });
    const second = await store.claimForCall('a', now, { requireDue: false });
    assert.equal(first?.call_status, 'calling');
    assert.equal(first?.call_attempts, 1);
    assert.equal(second, null);
  });

  it('dedupes the same phone within 24 hours and the same Meta id', async () => {
    const store = new BlobLeadStore(memoryIo());
    const first = await store.insert(lead('a', '+919686613899'), now);
    const second = await store.insert(lead('b', '+919686613899'), new Date(now.getTime() + 1000));
    assert.equal(first.created, true);
    assert.equal(second.created, false);
    assert.equal(second.lead.id, 'a');

    const meta = { ...lead('m1', '+919111111111'), source: 'meta' as const, external_id: '55' };
    const other = { ...lead('m2', '+919222222222'), source: 'meta' as const, external_id: '55' };
    assert.equal((await store.insert(meta, now)).created, true);
    assert.equal((await store.insert(other, now)).created, false);
    assert.equal((await store.insert(other, now)).lead.id, 'm1');
  });
});
