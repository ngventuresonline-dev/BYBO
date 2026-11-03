import type { CrmLead, Stage } from '@/lib/crm/db';
import type { DemoRow, FeedItem } from './shared';

const DAY = 86_400_000;

/** How likely a lead at each stage is to close, for the weighted forecast. */
export const STAGE_WEIGHT: Record<Stage, number> = { new: 0.05, contacted: 0.12, demo_sent: 0.25, call_booked: 0.4, proposal: 0.6, won: 1, lost: 0 };

export type Action = { lead: CrmLead; why: string; do: string; urgency: 3 | 2 | 1; kind: 'approve' | 'call' | 'followup' | 'reply' | 'nudge' | 'propose' | 'qualify' };

const openStage = (l: CrmLead) => l.stage !== 'won' && l.stage !== 'lost';
export const idleDays = (l: CrmLead, now: number) => Math.floor((now - Date.parse(l.last_activity_at)) / DAY);

/**
 * The next best thing to do for each open lead, most urgent first. Rules a
 * good sales lead would follow: approve waiting demos, honour booked calls,
 * chase overdue follow-ups, answer hot leads fast, then revive the quiet ones.
 */
export function nextActions(leads: CrmLead[], demos: DemoRow[], feed: FeedItem[], now: number): Action[] {
  const out: Action[] = [];
  const awaiting = new Set(demos.filter((d) => d.status === 'awaiting_approval').map((d) => d.lead_id));
  const callToday = new Map<string, number>();
  for (const f of feed) {
    if (f.kind !== 'booking') continue;
    const at = Date.parse(String(f.meta?.slot ?? ''));
    if (at >= now - 2 * 3600_000 && at <= now + DAY) callToday.set(f.lead_id, at);
  }
  for (const l of leads.filter(openStage)) {
    const idle = idleDays(l, now);
    const due = l.next_follow_up ? Date.parse(l.next_follow_up) : null;
    if (awaiting.has(l.id)) out.push({ lead: l, kind: 'approve', urgency: 3, why: 'Demo drafted and waiting for you', do: 'Review and approve the demo' });
    else if (callToday.has(l.id)) out.push({ lead: l, kind: 'call', urgency: 3, why: `Call at ${new Date(callToday.get(l.id)!).toLocaleTimeString('en-IN', { hour: 'numeric', minute: '2-digit' })}`, do: 'Open the demo and prepare the call' });
    else if (due && due < now) out.push({ lead: l, kind: 'followup', urgency: 3, why: `Follow-up overdue by ${Math.max(1, Math.round((now - due) / DAY))} day${Math.round((now - due) / DAY) > 1 ? 's' : ''}`, do: 'Follow up now' });
    else if (l.stage === 'new' && (now - Date.parse(l.created_at)) < 2 * DAY) out.push({ lead: l, kind: 'reply', urgency: l.temperature === 'hot' ? 3 : 2, why: 'New lead: reply within the hour to win it', do: 'Send a first message' });
    else if (l.stage === 'demo_sent' && idle >= 2) out.push({ lead: l, kind: 'nudge', urgency: 2, why: `Demo sent ${idle} days ago, no reply`, do: 'Nudge on WhatsApp and offer a call' });
    else if (l.stage === 'call_booked' && idle >= 1 && !callToday.has(l.id)) out.push({ lead: l, kind: 'propose', urgency: 2, why: 'Call done or due: turn it into a proposal', do: 'Send a proposal' });
    else if (l.stage === 'proposal' && idle >= 3) out.push({ lead: l, kind: 'nudge', urgency: 2, why: `Proposal quiet for ${idle} days`, do: 'Ask what is holding them back' });
    else if (idle >= 5) out.push({ lead: l, kind: 'nudge', urgency: 1, why: `Quiet for ${idle} days`, do: 'Re-engage or close it out' });
    else if (!l.quality && l.autopilot === 'queued') out.push({ lead: l, kind: 'qualify', urgency: 1, why: 'Not researched yet', do: 'Let autopilot research it' });
  }
  const heat = (l: CrmLead) => (l.temperature === 'hot' ? 2 : l.temperature === 'warm' ? 1 : 0);
  return out.sort((a, b) => b.urgency - a.urgency || heat(b.lead) - heat(a.lead) || Number(b.lead.quality_score ?? 0) - Number(a.lead.quality_score ?? 0));
}

/** Pipeline value weighted by stage odds. */
export const forecast = (leads: CrmLead[]) => leads.filter(openStage).reduce((t, l) => t + (l.value ?? 0) * STAGE_WEIGHT[l.stage], 0);

/** Share of leads that reached each stage or beyond (lost excluded). */
export function funnel(leads: CrmLead[], order: Stage[]) {
  const live = order.filter((s) => s !== 'lost');
  const rank = (s: Stage) => live.indexOf(s);
  const reached = (s: Stage) => leads.filter((l) => l.stage !== 'lost' && rank(l.stage) >= rank(s)).length;
  const top = Math.max(1, reached(live[0]!));
  return live.map((s) => ({ stage: s, n: reached(s), pct: Math.round((reached(s) / top) * 100) }));
}

/** Leads by source with how many moved past "new" and how many were won. */
export function sources(leads: CrmLead[]) {
  const map = new Map<string, { n: number; moved: number; won: number; value: number }>();
  for (const l of leads) {
    const s = map.get(l.source) ?? { n: 0, moved: 0, won: 0, value: 0 };
    s.n++; if (l.stage !== 'new' && l.stage !== 'lost') s.moved++; if (l.stage === 'won') { s.won++; s.value += l.value ?? 0; }
    map.set(l.source, s);
  }
  return [...map.entries()].map(([source, s]) => ({ source, ...s })).sort((a, b) => b.n - a.n);
}

/** New leads per day for the last `days` days, oldest first. */
export function daily(leads: CrmLead[], now: number, days = 14) {
  const start = new Date(now); start.setHours(0, 0, 0, 0);
  return Array.from({ length: days }, (_, i) => {
    const from = start.getTime() - (days - 1 - i) * DAY;
    return leads.filter((l) => { const t = Date.parse(l.created_at); return t >= from && t < from + DAY; }).length;
  });
}
