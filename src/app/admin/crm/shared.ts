import type { CrmLead, Source, Stage } from '@/lib/crm/db';

export const STAGES: { id: Stage; label: string }[] = [
  { id: 'new', label: 'New' },
  { id: 'contacted', label: 'Contacted' },
  { id: 'call_booked', label: 'Call booked' },
  { id: 'proposal', label: 'Proposal' },
  { id: 'won', label: 'Won' },
  { id: 'lost', label: 'Lost' },
];
export const STAGE_LABEL = Object.fromEntries(STAGES.map((s) => [s.id, s.label])) as Record<Stage, string>;
export const SOURCE_LABEL: Record<Source, string> = {
  enquiry: 'Website form', meta: 'Meta ads', b_chat: 'B chat', booking: 'Booked call',
  payment: 'Payment', voice: 'AI call', manual: 'Added by hand',
};
export const EVENT_ICON: Record<string, string> = {
  created: '✦', enquiry: '✉', meta: 'ⓜ', brief: '❏', summary: '✎', alert: '⚡', booking: '◷', call: '☏',
  payment: '₹', paid: '✓', stage: '→', note: '✐', edit: '✎', manual: '+', email: '✉',
};
export const EVENT_LABEL: Record<string, string> = {
  enquiry: 'Website form', meta: 'Meta form', brief: 'B brief', summary: 'B summary', alert: 'B alert', booking: 'Booking',
  call: 'AI call', payment: 'Payment link / checkout', paid: 'Paid', stage: 'Stage move', note: 'Note', email: 'Email sent', manual: 'Added', created: 'Created', edit: 'Edit',
};

export type FeedItem = {
  id: string; lead_id: string; created_at: string; kind: string; title: string; body: string | null; meta: Record<string, unknown>;
  lead_name: string | null; lead_email: string | null; lead_phone: string | null; lead_company: string | null; lead_source: Source; lead_stage: Stage; lead_value: number | null;
};
export type Health = { id: string; label: string; ok: boolean; detail: string };
export type Automation = { id: string; title: string; trigger: string; does: string; on: boolean; status: string; run?: 'sync' | 'digest' | 'meta_pull' | 'autopilot' };
export type QueueItem = { id: string; name: string; phone: string | null; email: string; business: string; source: string; status: string; attempts: number; next_call_at: string | null; last_call_at: string | null; summary: string | null; created_at: string };
export type IgSummary = { counts: Record<string, number>; next: { caption: string; scheduledAt: string | null; status: string }[]; recent: { caption: string; publishedAt: string | null; permalink: string | null }[] };
export type Slot = { id: string; label: string };
export type Product = { id: string; name: string; price: number; group: string };
export type DemoRow = { id: string; lead_id: string; created_at: string; slug: string; kind: 'auto' | 'custom'; status: 'drafting' | 'awaiting_approval' | 'approved' | 'sent' | 'rejected'; url: string | null; content: { brand?: string; hero?: { headline?: string }; quality?: { score: number; issues: string[] } }; approved_at: string | null; sent_at: string | null; note: string | null };
export type Overview = { health: Health[]; automations: Automation[]; feed: FeedItem[] | null; demos: DemoRow[]; queue: QueueItem[] | null; ig: IgSummary | null; slots: Slot[]; products: Product[] };
export const demoLink = (d: Pick<DemoRow, 'kind' | 'url' | 'slug'>) => (d.kind === 'custom' && d.url ? d.url : `/demo/${d.slug}`);

/** Approve, reject, redraft and other autopilot decisions. Resolves with the message to show. */
export async function demoAction(body: Record<string, string>): Promise<string> {
  try { return (await api<{ message: string }>('/api/admin/crm/demos', { method: 'POST', body: JSON.stringify(body) })).message; }
  catch (x) { return (x as Error & { data?: { message?: string } }).data?.message || 'That didn’t work. Try again.'; }
}

export const DAY = 86_400_000;
export const inr = (n: number) => `₹${Math.round(n).toLocaleString('en-IN')}`;
export function ago(iso: string, now: number) {
  const s = Math.max(0, Math.round((now - Date.parse(iso)) / 1000));
  if (s < 60) return 'just now';
  if (s < 3600) return `${Math.floor(s / 60)}m ago`;
  if (s < 86400) return `${Math.floor(s / 3600)}h ago`;
  if (s < 86400 * 30) return `${Math.floor(s / 86400)}d ago`;
  return new Date(iso).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' });
}
export function until(iso: string, now: number) {
  const m = Math.round((Date.parse(iso) - now) / 60_000);
  if (m < 0) return ago(iso, now);
  if (m < 60) return `in ${m}m`;
  if (m < 1440) return `in ${Math.round(m / 60)}h`;
  return `in ${Math.round(m / 1440)}d`;
}
export const when = (iso: string) => new Date(iso).toLocaleString('en-IN', { day: 'numeric', month: 'short', hour: 'numeric', minute: '2-digit' });
export const localInput = (iso: string) => new Date(Date.parse(iso) - new Date().getTimezoneOffset() * 60_000).toISOString().slice(0, 16);
export const display = (l: Pick<CrmLead, 'name' | 'company' | 'email' | 'phone'>) => l.name || l.company || l.email || l.phone || 'Unnamed lead';
export const initials = (l: Pick<CrmLead, 'name' | 'company' | 'email' | 'phone'>) => display(l).split(/[\s@.]+/).filter(Boolean).slice(0, 2).map((w) => w[0]!.toUpperCase()).join('');
export const waLink = (phone: string, text = '') => `https://wa.me/${phone.replace(/\D/g, '').replace(/^0+/, '').replace(/^(\d{10})$/, '91$1')}${text ? `?text=${encodeURIComponent(text)}` : ''}`;
export const feedLead = (f: FeedItem) => ({ name: f.lead_name, company: f.lead_company, email: f.lead_email, phone: f.lead_phone });

export async function api<T>(url: string, init?: RequestInit): Promise<T> {
  const res = await fetch(url, { ...init, headers: init?.body instanceof FormData ? init?.headers : { 'content-type': 'application/json', ...init?.headers } });
  const data = await res.json().catch(() => ({}));
  if (!res.ok || data.ok === false) throw Object.assign(new Error(data.reason || `HTTP ${res.status}`), { data });
  return data as T;
}
