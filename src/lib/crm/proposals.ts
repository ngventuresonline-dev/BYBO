import { CONTACT } from '@/lib/site';

/**
 * Proposals: a priced scope the team writes for a lead, shared as a private
 * link (bybo.in/proposal/<token>). Every amount is typed in by a person; nothing
 * here ever suggests a price.
 */

export const PROPOSAL_STATUSES = ['draft', 'sent', 'viewed', 'accepted', 'declined'] as const;
export type ProposalStatus = (typeof PROPOSAL_STATUSES)[number];
export type ProposalItem = { name: string; description: string; qty: number; amount: number };
export type Milestone = { label: string; pct: number };

export type Proposal = {
  id: string;
  lead_id: string;
  token: string;
  title: string | null;
  status: ProposalStatus;
  items: ProposalItem[];
  milestones: Milestone[];
  notes: string | null;
  valid_until: string | null;
  total: number;
  created_at: string;
  updated_at: string;
  sent_at: string | null;
  viewed_at: string | null;
  accepted_at: string | null;
};

/** What the public page reads: the proposal and who it is for. */
export type PublicProposal = Proposal & { lead_name: string | null; lead_company: string | null };

export const proposalUrl = (token: string) => `https://bybo.in/proposal/${token}`;
export const TOKEN = /^[A-Za-z0-9_-]{24,64}$/;
export const DEFAULT_MILESTONES: Milestone[] = [{ label: 'Advance', pct: 50 }, { label: 'On delivery', pct: 50 }];

export const LIMITS = { title: 160, notes: 3000, items: 30, itemName: 120, itemDesc: 500, milestones: 8, milestoneLabel: 80, qty: 1000, amount: 100_000_000 };

const text = (v: unknown, max: number) => String(v ?? '').trim().slice(0, max);
const num = (v: unknown) => (typeof v === 'number' ? v : typeof v === 'string' && v.trim() ? Number(v) : NaN);

export const lineTotal = (i: Pick<ProposalItem, 'qty' | 'amount'>) => (Number(i.qty) || 0) * (Number(i.amount) || 0);
export const itemsTotal = (items: Pick<ProposalItem, 'qty' | 'amount'>[]) => items.reduce((t, i) => t + lineTotal(i), 0);
/** A milestone's share of the total, to the rupee. The last one takes the rounding so they add up exactly. */
export function milestoneAmounts(total: number, ms: Milestone[]) {
  const out = ms.map((m) => Math.round((total * m.pct) / 100));
  if (out.length && ms.reduce((t, m) => t + m.pct, 0) === 100) out[out.length - 1] = Math.round(total) - out.slice(0, -1).reduce((t, n) => t + n, 0);
  return out;
}

/** Validate a draft from the desk. Returns the cleaned fields or the first problem found. */
export function cleanDraft(b: Record<string, unknown>): { ok: true; value: { title: string; items: ProposalItem[]; milestones: Milestone[]; notes: string; valid_until: string } } | { ok: false; message: string } {
  const rawItems = Array.isArray(b.items) ? b.items : [];
  if (rawItems.length > LIMITS.items) return { ok: false, message: `Up to ${LIMITS.items} line items.` };
  const items: ProposalItem[] = [];
  for (const r of rawItems as Record<string, unknown>[]) {
    const name = text(r?.name, LIMITS.itemName);
    const description = text(r?.description, LIMITS.itemDesc);
    const qty = num(r?.qty);
    const amount = num(r?.amount);
    if (!name && !description && !Number.isFinite(amount)) continue;
    if (!name) return { ok: false, message: 'Every line item needs a name.' };
    if (!Number.isFinite(qty) || qty <= 0 || qty > LIMITS.qty) return { ok: false, message: `Check the quantity for “${name}”.` };
    if (!Number.isFinite(amount) || amount < 0 || amount > LIMITS.amount) return { ok: false, message: `Check the amount for “${name}”.` };
    items.push({ name, description, qty: Math.round(qty * 100) / 100, amount: Math.round(amount * 100) / 100 });
  }
  const rawMs = Array.isArray(b.milestones) ? b.milestones : [];
  if (rawMs.length > LIMITS.milestones) return { ok: false, message: `Up to ${LIMITS.milestones} milestones.` };
  const milestones: Milestone[] = [];
  for (const r of rawMs as Record<string, unknown>[]) {
    const label = text(r?.label, LIMITS.milestoneLabel);
    const pct = num(r?.pct);
    if (!label && !Number.isFinite(pct)) continue;
    if (!label) return { ok: false, message: 'Every milestone needs a label.' };
    if (!Number.isFinite(pct) || pct <= 0 || pct > 100) return { ok: false, message: `Check the percentage for “${label}”.` };
    milestones.push({ label, pct: Math.round(pct * 100) / 100 });
  }
  const valid = text(b.valid_until, 10);
  if (valid && (!/^\d{4}-\d{2}-\d{2}$/.test(valid) || Number.isNaN(Date.parse(valid)))) return { ok: false, message: 'Pick a valid “valid until” date.' };
  return { ok: true, value: { title: text(b.title, LIMITS.title), items, milestones, notes: text(b.notes, LIMITS.notes), valid_until: valid } };
}

/** What must be true before a proposal goes to a client. */
export function readyToSend(p: Pick<Proposal, 'items' | 'milestones' | 'total'>): string | null {
  if (!p.items.length) return 'Add at least one line item.';
  if (!(Number(p.total) > 0)) return 'The total is zero. Add the amounts first.';
  const pct = p.milestones.reduce((t, m) => t + Number(m.pct), 0);
  if (p.milestones.length && Math.abs(pct - 100) > 0.01) return `Milestones add up to ${pct}%, not 100%.`;
  return null;
}

export const askLink = (title: string) => `https://wa.me/${CONTACT.whatsapp}?text=${encodeURIComponent(`Hi BYBO, I have a question about the proposal “${title}”.`)}`;
