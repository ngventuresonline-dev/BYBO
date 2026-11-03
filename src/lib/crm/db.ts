/**
 * The BYBO CRM lives in a private `bybo` schema in Supabase. The browser never
 * talks to it: bybo.in reaches it only through the `public.bybo_crm_*`
 * functions, with the service role key, from the server.
 *
 * Needs BYBO_CRM_SUPABASE_URL and BYBO_CRM_SUPABASE_KEY. Without them capture
 * quietly does nothing, so a missing CRM never breaks a form, a call or a payment.
 */

export const STAGES = ['new', 'contacted', 'call_booked', 'proposal', 'won', 'lost'] as const;
export type Stage = (typeof STAGES)[number];
export const SOURCES = ['enquiry', 'meta', 'b_chat', 'booking', 'payment', 'voice', 'manual'] as const;
export type Source = (typeof SOURCES)[number];

export type CrmLead = {
  id: string;
  created_at: string;
  updated_at: string;
  last_activity_at: string;
  name: string | null;
  email: string | null;
  phone: string | null;
  company: string | null;
  source: Source;
  stage: Stage;
  temperature: 'hot' | 'warm' | 'cold' | null;
  need: string | null;
  summary: string | null;
  services: string[];
  value: number | null;
  page: string | null;
  next_follow_up: string | null;
  external_id: string | null;
  meta: Record<string, unknown>;
  autopilot: 'queued' | 'researching' | 'needs_review' | 'qualified' | 'demo_drafted' | 'awaiting_approval' | 'sent' | 'held' | 'done' | 'failed';
  quality: 'good' | 'maybe' | 'fake' | null;
  quality_score: number | null;
  intel: Record<string, unknown>;
  autopilot_at: string | null;
};

export type CrmEvent = {
  id: string;
  lead_id: string;
  created_at: string;
  kind: string;
  title: string;
  body: string | null;
  meta: Record<string, unknown>;
};

export type Capture = {
  source: Source;
  name?: string;
  email?: string;
  phone?: string | null;
  company?: string;
  need?: string;
  summary?: string;
  services?: string[];
  temperature?: 'hot' | 'warm' | 'cold';
  stage?: Stage;
  value?: number;
  page?: string;
  external_id?: string | null;
  meta?: Record<string, unknown>;
  /** When the lead really arrived, for leads recorded after the fact. Defaults to now. */
  created_at?: string;
  /** True when replaying a known event (a sync): an identical event moves to the earlier time instead of repeating. */
  backfill?: boolean;
  event: { kind: string; title: string; body?: string; meta?: Record<string, unknown> };
};

export class CrmUnavailable extends Error {
  constructor() { super('crm is not configured'); this.name = 'CrmUnavailable'; }
}

export function crmConfigured(env: NodeJS.ProcessEnv = process.env) {
  return Boolean(env.BYBO_CRM_SUPABASE_URL && env.BYBO_CRM_SUPABASE_KEY);
}

export async function rpc<T>(fn: string, args: Record<string, unknown>): Promise<T> {
  const url = process.env.BYBO_CRM_SUPABASE_URL;
  const key = process.env.BYBO_CRM_SUPABASE_KEY;
  if (!url || !key || process.env.NODE_TEST_CONTEXT) throw new CrmUnavailable();
  const res = await fetch(`${url.replace(/\/$/, '')}/rest/v1/rpc/${fn}`, {
    method: 'POST',
    headers: { apikey: key, Authorization: `Bearer ${key}`, 'Content-Type': 'application/json' },
    body: JSON.stringify(args),
    cache: 'no-store',
    signal: AbortSignal.timeout(10_000),
  });
  if (!res.ok) throw new Error(`crm ${fn} failed (${res.status}): ${(await res.text().catch(() => '')).slice(0, 200)}`);
  const text = await res.text();
  return (text ? JSON.parse(text) : null) as T;
}

const clean = (v: unknown, max: number) => String(v ?? '').trim().slice(0, max);

/** Record a lead and an activity. Never throws: the CRM must not break the thing that called it. */
export async function captureLead(c: Capture): Promise<string | null> {
  if (!crmConfigured() || process.env.NODE_TEST_CONTEXT) return null;
  try {
    return await rpc<string>('bybo_crm_capture', {
      p: {
        source: c.source,
        name: clean(c.name, 120),
        email: clean(c.email, 200),
        phone: clean(c.phone, 30),
        company: clean(c.company, 160),
        need: clean(c.need, 300),
        summary: clean(c.summary, 2000),
        services: (c.services ?? []).map((s) => clean(s, 80)).filter(Boolean),
        temperature: c.temperature ?? '',
        stage: c.stage ?? '',
        value: c.value != null && Number.isFinite(c.value) ? String(c.value) : '',
        page: clean(c.page, 200),
        external_id: clean(c.external_id, 120),
        meta: c.meta ?? {},
        created_at: c.created_at ?? '',
        event_backfill: c.backfill ? 'true' : '',
        event_kind: c.event.kind,
        event_title: clean(c.event.title, 200),
        event_body: clean(c.event.body, 4000),
        event_meta: c.event.meta ?? {},
      },
    });
  } catch (err) {
    console.error('crm capture failed', (err as Error).message);
    return null;
  }
}
