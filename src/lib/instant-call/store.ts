import { istDate } from './hours';
import { cloneLead, isRecent, type Lead } from './types';

/**
 * Persistence for the call queue. In-memory and local files do not survive
 * serverless. The production implementation is a private Vercel Blob store
 * (`blob-store.ts`). A database can replace this interface later.
 */
export interface LeadStore {
  get(id: string): Promise<Lead | null>;
  findByConversation(conversationId: string): Promise<Lead | null>;
  insert(lead: Lead, now: Date): Promise<{ lead: Lead; created: boolean }>;
  save(lead: Lead): Promise<void>;
  claimForCall(id: string, now: Date, opts: { requireDue: boolean }): Promise<Lead | null>;
  listActionable(): Promise<Lead[]>;
}

export class LeadStoreUnavailable extends Error {
  constructor() {
    super('lead store is not configured');
    this.name = 'LeadStoreUnavailable';
  }
}

const DIALABLE = new Set<Lead['call_status']>(['pending', 'queued_hours', 'no_answer', 'busy', 'failed']);

export function canClaim(lead: Lead, now: Date, requireDue: boolean): boolean {
  if (!DIALABLE.has(lead.call_status)) return false;
  if (lead.call_attempts >= 2) return false;
  if (lead.raw.dry_run_hold === true) return false;
  if (lead.last_call_at && istDate(new Date(lead.last_call_at)) === istDate(now)) return false;
  if (requireDue) {
    if (!lead.next_call_at) return false;
    if (Date.parse(lead.next_call_at) > now.getTime()) return false;
  }
  return true;
}

export function needsFollowUp(lead: Lead): boolean {
  if (lead.call_status === 'calling') return true;
  if (lead.call_status === 'answered' && !lead.call_summary) return true;
  if (!lead.next_call_at) return false;
  return lead.call_status === 'queued_hours'
    || lead.call_status === 'no_answer'
    || lead.call_status === 'busy'
    || lead.call_status === 'failed'
    || lead.call_status === 'pending';
}

export class UnavailableLeadStore implements LeadStore {
  private fail(): never {
    throw new LeadStoreUnavailable();
  }

  get(): Promise<Lead | null> { return this.fail(); }
  findByConversation(): Promise<Lead | null> { return this.fail(); }
  insert(): Promise<{ lead: Lead; created: boolean }> { return this.fail(); }
  save(): Promise<void> { return this.fail(); }
  claimForCall(): Promise<Lead | null> { return this.fail(); }
  listActionable(): Promise<Lead[]> { return this.fail(); }
}

export async function getLeadStore(): Promise<LeadStore> {
  if (!process.env.BLOB_READ_WRITE_TOKEN && !process.env.BLOB_STORE_ID) return new UnavailableLeadStore();
  const { createVercelBlobStore } = await import('./blob-store');
  return createVercelBlobStore();
}

/** Process-local store for tests. Not durable on Vercel. */
export class MemoryLeadStore implements LeadStore {
  private leads = new Map<string, Lead>();
  private byExternal = new Map<string, string>();
  private byConversation = new Map<string, string>();
  private locks = new Set<string>();

  async get(id: string): Promise<Lead | null> {
    const lead = this.leads.get(id);
    return lead ? cloneLead(lead) : null;
  }

  async findByConversation(conversationId: string): Promise<Lead | null> {
    const id = this.byConversation.get(conversationId);
    return id ? this.get(id) : null;
  }

  async insert(lead: Lead, now: Date): Promise<{ lead: Lead; created: boolean }> {
    if (lead.external_id) {
      const existing = await this.findExternal(lead.source, lead.external_id);
      if (existing) return { lead: existing, created: false };
    }
    if (lead.phone_e164) {
      const recent = this.recentByPhone(lead.phone_e164, now);
      if (recent) {
        if (lead.external_id) this.byExternal.set(externalKey(lead.source, lead.external_id), recent.id);
        return { lead: cloneLead(recent), created: false };
      }
    }
    const stored = cloneLead(lead);
    this.leads.set(stored.id, stored);
    if (stored.external_id) this.byExternal.set(externalKey(stored.source, stored.external_id), stored.id);
    if (stored.conversation_id) this.byConversation.set(stored.conversation_id, stored.id);
    return { lead: cloneLead(stored), created: true };
  }

  async save(lead: Lead): Promise<void> {
    const stored = cloneLead(lead);
    this.leads.set(stored.id, stored);
    if (stored.external_id) this.byExternal.set(externalKey(stored.source, stored.external_id), stored.id);
    if (stored.conversation_id) this.byConversation.set(stored.conversation_id, stored.id);
  }

  async claimForCall(id: string, now: Date, opts: { requireDue: boolean }): Promise<Lead | null> {
    const lead = this.leads.get(id);
    if (!lead || !canClaim(lead, now, opts.requireDue)) return null;
    const lock = `${id}:${istDate(now)}`;
    if (this.locks.has(lock)) return null;
    this.locks.add(lock);
    const next: Lead = {
      ...cloneLead(lead),
      call_status: 'calling',
      call_attempts: lead.call_attempts + 1,
      last_call_at: now.toISOString(),
    };
    this.leads.set(id, next);
    return cloneLead(next);
  }

  async listActionable(): Promise<Lead[]> {
    return [...this.leads.values()].filter(needsFollowUp).map(cloneLead);
  }

  private async findExternal(source: Lead['source'], externalId: string): Promise<Lead | null> {
    const id = this.byExternal.get(externalKey(source, externalId));
    return id ? this.get(id) : null;
  }

  private recentByPhone(phone: string, now: Date): Lead | undefined {
    return [...this.leads.values()].find((lead) => lead.phone_e164 === phone && isRecent(lead.created_at, now));
  }
}

function externalKey(source: string, externalId: string): string {
  return `${source}:${externalId}`;
}
