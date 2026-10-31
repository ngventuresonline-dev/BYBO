export type CallStatus =
  | 'pending'
  | 'queued_hours'
  | 'calling'
  | 'answered'
  | 'no_answer'
  | 'busy'
  | 'failed'
  | 'done'
  | 'whatsapp_only'
  | 'skipped_allowlist';

export type LeadSource = 'website' | 'meta';

export type Lead = {
  id: string;
  created_at: string;
  source: LeadSource;
  external_id: string | null;
  name: string;
  email: string;
  phone_e164: string | null;
  business: string;
  enquiry: string;
  area: string;
  raw: Record<string, unknown>;
  call_status: CallStatus;
  call_attempts: number;
  last_call_at: string | null;
  next_call_at: string | null;
  conversation_id: string | null;
  call_summary: string | null;
  call_analysis: unknown | null;
};

export type CallOutcome = 'answered' | 'no_answer' | 'busy' | 'failed' | 'in_progress';

export type CallUpdate = {
  outcome: CallOutcome;
  summary?: string | null;
  analysis?: unknown;
  conversationId?: string;
};

const DAY_MS = 86_400_000;

export function cloneLead(lead: Lead): Lead {
  return {
    ...lead,
    raw: { ...lead.raw },
    call_analysis: lead.call_analysis == null ? null : JSON.parse(JSON.stringify(lead.call_analysis)) as unknown,
  };
}

export function isRecent(createdAt: string, now: Date): boolean {
  const then = Date.parse(createdAt);
  if (Number.isNaN(then)) return false;
  const age = now.getTime() - then;
  return age >= 0 && age < DAY_MS;
}

export function leadBrief(lead: Pick<Lead, 'name' | 'business' | 'enquiry'>): string {
  const who = lead.name.trim().split(/\s+/)[0] || 'Someone';
  const where = lead.business.trim() ? ` (${lead.business.trim()})` : '';
  const what = lead.enquiry.replace(/\s+/g, ' ').trim();
  const text = what ? `${who}${where} asked: ${what}` : `${who}${where} sent an enquiry.`;
  return text.slice(0, 400);
}

export function newLead(partial: {
  id?: string;
  created_at?: string;
  source: LeadSource;
  external_id: string | null;
  name: string;
  email: string;
  phone_e164: string | null;
  business: string;
  enquiry: string;
  area: string;
  raw: Record<string, unknown>;
  call_status?: CallStatus;
  next_call_at?: string | null;
}): Lead {
  return {
    id: partial.id ?? crypto.randomUUID(),
    created_at: partial.created_at ?? new Date().toISOString(),
    source: partial.source,
    external_id: partial.external_id,
    name: partial.name,
    email: partial.email,
    phone_e164: partial.phone_e164,
    business: partial.business,
    enquiry: partial.enquiry,
    area: partial.area,
    raw: { ...partial.raw },
    call_status: partial.call_status ?? 'pending',
    call_attempts: 0,
    last_call_at: null,
    next_call_at: partial.next_call_at ?? null,
    conversation_id: null,
    call_summary: null,
    call_analysis: null,
  };
}
