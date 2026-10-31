import { phoneHash } from './phone';
import { canClaim, needsFollowUp, type LeadStore } from './store';
import { istDate } from './hours';
import { isRecent, type Lead } from './types';

/**
 * Private Vercel Blob records, keyed by lead id and by a hash of the phone.
 * Edge Config / Global Config is for reads, not a call queue. ElevenLabs
 * conversation history cannot hold an out-of-hours lead that has not been
 * dialled yet. Blob is already on this Vercel project and needs no new vendor.
 *
 * A lock object written with allowOverwrite:false is the atomic "one claim
 * per lead per IST day" guard. If that write fails, nobody dials.
 */

export type BlobIo = {
  put(pathname: string, body: string, opts: { allowOverwrite: boolean; ifMatch?: string }): Promise<void>;
  get(pathname: string): Promise<{ body: string; etag: string } | null>;
  del(pathname: string): Promise<void>;
  list(prefix: string): Promise<string[]>;
};

const RECORD = 'bybo-leads/records/';
const OPEN = 'bybo-leads/open/';
const PHONE = 'bybo-leads/phone/';
const EXT = 'bybo-leads/ext/';
const CONV = 'bybo-leads/conv/';
const LOCK = 'bybo-leads/locks/';

export class BlobLeadStore implements LeadStore {
  private io: BlobIo;

  constructor(io: BlobIo) {
    this.io = io;
  }

  async get(id: string): Promise<Lead | null> {
    return this.readJson<Lead>(`${RECORD}${id}.json`);
  }

  async findByConversation(conversationId: string): Promise<Lead | null> {
    const pointer = await this.readJson<{ leadId: string }>(`${CONV}${safePath(conversationId)}.json`);
    if (!pointer?.leadId) return null;
    return this.get(pointer.leadId);
  }

  async insert(lead: Lead, now: Date): Promise<{ lead: Lead; created: boolean }> {
    if (lead.external_id) {
      const existing = await this.findExternal(lead.source, lead.external_id);
      if (existing) return { lead: existing, created: false };
    }
    if (lead.phone_e164) {
      const recent = await this.findRecentPhone(lead.phone_e164, now);
      if (recent) {
        if (lead.external_id) await this.pointExternal(lead.source, lead.external_id, recent.id);
        return { lead: recent, created: false };
      }
      const reserved = await this.reservePhone(lead.phone_e164, lead.id, lead.created_at, now);
      if (reserved !== 'owner') {
        if (reserved) return { lead: reserved, created: false };
        throw new Error('phone reserve failed');
      }
    }
    if (lead.external_id) {
      const reserved = await this.reserveExternal(lead.source, lead.external_id, lead.id);
      if (reserved !== 'owner') {
        if (reserved) return { lead: reserved, created: false };
        throw new Error('external id reserve failed');
      }
    }
    await this.save(lead);
    return { lead, created: true };
  }

  async save(lead: Lead): Promise<void> {
    const body = JSON.stringify(lead);
    await this.io.put(`${RECORD}${lead.id}.json`, body, { allowOverwrite: true });
    if (needsFollowUp(lead)) await this.io.put(`${OPEN}${lead.id}.json`, body, { allowOverwrite: true });
    else await this.io.del(`${OPEN}${lead.id}.json`);
    if (lead.conversation_id) {
      await this.io.put(
        `${CONV}${safePath(lead.conversation_id)}.json`,
        JSON.stringify({ leadId: lead.id }),
        { allowOverwrite: true },
      );
    }
    if (lead.external_id) await this.pointExternal(lead.source, lead.external_id, lead.id);
  }

  async claimForCall(id: string, now: Date, opts: { requireDue: boolean }): Promise<Lead | null> {
    const lead = await this.get(id);
    if (!lead || !canClaim(lead, now, opts.requireDue)) return null;
    try {
      await this.io.put(`${LOCK}${id}/${istDate(now)}.json`, JSON.stringify({ at: now.toISOString() }), { allowOverwrite: false });
    } catch {
      return null;
    }
    const next: Lead = {
      ...lead,
      raw: { ...lead.raw },
      call_status: 'calling',
      call_attempts: lead.call_attempts + 1,
      last_call_at: now.toISOString(),
    };
    await this.save(next);
    return next;
  }

  async listActionable(): Promise<Lead[]> {
    const paths = await this.io.list(OPEN);
    const leads: Lead[] = [];
    for (const path of paths) {
      const lead = await this.readJson<Lead>(path);
      if (lead && needsFollowUp(lead)) leads.push(lead);
    }
    return leads;
  }

  private async findExternal(source: Lead['source'], externalId: string): Promise<Lead | null> {
    const pointer = await this.readJson<{ leadId: string }>(externalPath(source, externalId));
    if (!pointer?.leadId) return null;
    return this.get(pointer.leadId);
  }

  private async findRecentPhone(phone: string, now: Date): Promise<Lead | null> {
    const pointer = await this.readJson<{ leadId: string; createdAt: string }>(phonePath(phone));
    if (!pointer?.leadId || !pointer.createdAt || !isRecent(pointer.createdAt, now)) return null;
    return this.get(pointer.leadId);
  }

  private async reservePhone(phone: string, leadId: string, createdAt: string, now: Date): Promise<Lead | 'owner' | null> {
    const path = phonePath(phone);
    const body = JSON.stringify({ leadId, createdAt });
    const current = await this.io.get(path);
    if (!current) {
      try {
        await this.io.put(path, body, { allowOverwrite: false });
        return 'owner';
      } catch {
        return this.findRecentPhone(phone, now);
      }
    }
    const parsed = parsePointer(current.body);
    if (parsed?.createdAt && isRecent(parsed.createdAt, now)) {
      return parsed.leadId ? this.get(parsed.leadId) : null;
    }
    try {
      await this.io.put(path, body, { allowOverwrite: true, ifMatch: current.etag });
      return 'owner';
    } catch {
      return this.findRecentPhone(phone, now);
    }
  }

  private async reserveExternal(source: Lead['source'], externalId: string, leadId: string): Promise<Lead | 'owner' | null> {
    const path = externalPath(source, externalId);
    try {
      await this.io.put(path, JSON.stringify({ leadId }), { allowOverwrite: false });
      return 'owner';
    } catch {
      return this.findExternal(source, externalId);
    }
  }

  private async pointExternal(source: Lead['source'], externalId: string, leadId: string): Promise<void> {
    await this.io.put(externalPath(source, externalId), JSON.stringify({ leadId }), { allowOverwrite: true });
  }

  private async readJson<T>(pathname: string): Promise<T | null> {
    const got = await this.io.get(pathname);
    if (!got) return null;
    try {
      return JSON.parse(got.body) as T;
    } catch {
      console.error('corrupt lead record');
      return null;
    }
  }
}

function phonePath(phone: string): string {
  return `${PHONE}${phoneHash(phone)}.json`;
}

function externalPath(source: string, externalId: string): string {
  return `${EXT}${source}/${safePath(externalId)}.json`;
}

function safePath(value: string): string {
  const cleaned = value.replace(/[^A-Za-z0-9_-]/g, '_').slice(0, 160);
  return cleaned || 'unknown';
}

function parsePointer(body: string): { leadId?: string; createdAt?: string } | null {
  try {
    const parsed = JSON.parse(body) as { leadId?: string; createdAt?: string };
    return parsed && typeof parsed === 'object' ? parsed : null;
  } catch {
    return null;
  }
}

export function createVercelBlobStore(): LeadStore {
  return new BlobLeadStore(vercelBlobIo());
}

function vercelBlobIo(): BlobIo {
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
