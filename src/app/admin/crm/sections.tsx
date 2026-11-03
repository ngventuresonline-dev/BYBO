'use client';

import { useMemo, useState, type FormEvent } from 'react';
import type { CrmLead, Source, Stage } from '@/lib/crm/db';
import {
  ago, api, DAY, display, EVENT_ICON, EVENT_LABEL, feedLead, initials, inr, SOURCE_LABEL, STAGE_LABEL, STAGES, until, when,
  type Automation, type DemoRow, type FeedItem, type Health, type IgSummary, type Product, type QueueItem,
} from './shared';
import { DemoPanel, QualityChip } from './autopilot';

export function Kpi({ label, value, sub, accent, trend }: { label: string; value: string; sub?: string; accent?: boolean; trend?: number | null }) {
  return (
    <div className={`crm-kpi ${accent ? 'is-accent' : ''}`}>
      <p>{label}</p>
      <strong>{value}</strong>
      <small>{trend != null ? <span className={trend >= 0 ? 'crm-up' : 'crm-down'}>{trend >= 0 ? '▲' : '▼'} {Math.abs(trend)}% </span> : null}{sub}</small>
    </div>
  );
}

function Panel({ title, action, children, className = '' }: { title: string; action?: React.ReactNode; children: React.ReactNode; className?: string }) {
  return (
    <section className={`crm-panel ${className}`}>
      <div className="crm-panel-head"><h2>{title}</h2>{action}</div>
      {children}
    </section>
  );
}

function FeedRow({ f, now, onOpen }: { f: FeedItem; now: number; onOpen: (id: string) => void }) {
  return (
    <button className={`crm-feed-row ev-${f.kind}`} onClick={() => onOpen(f.lead_id)}>
      <span className="crm-ev-icon" aria-hidden="true">{EVENT_ICON[f.kind] ?? '•'}</span>
      <span className="crm-feed-text"><b>{f.title}</b><small>{display(feedLead(f))}{f.lead_company && f.lead_name ? ` · ${f.lead_company}` : ''}</small></span>
      <time title={when(f.created_at)}>{ago(f.created_at, now)}</time>
    </button>
  );
}

/* ───────────────────────── Overview ───────────────────────── */

export function OverviewSection({ leads, demos, onToast, onChanged, feed, queue, health, now, onOpen, go }: {
  leads: CrmLead[]; demos: DemoRow[]; onToast: (t: string) => void; onChanged: () => void; feed: FeedItem[]; queue: QueueItem[] | null; health: Health[]; now: number; onOpen: (id: string) => void; go: (section: string, source?: Source) => void;
}) {
  const s = useMemo(() => {
    const open = leads.filter((l) => l.stage !== 'won' && l.stage !== 'lost');
    const closed = leads.filter((l) => l.stage === 'won' || l.stage === 'lost');
    const won = leads.filter((l) => l.stage === 'won');
    const inRange = (l: CrmLead, from: number, to: number) => { const t = now - Date.parse(l.created_at); return t >= from && t < to; };
    const thisWeek = leads.filter((l) => inRange(l, 0, 7 * DAY)).length;
    const lastWeek = leads.filter((l) => inRange(l, 7 * DAY, 14 * DAY)).length;
    const days = Array.from({ length: 30 }, (_, i) => {
      const start = new Date(now - (29 - i) * DAY); start.setHours(0, 0, 0, 0);
      const end = start.getTime() + DAY;
      return { label: start.toLocaleDateString('en-IN', { day: 'numeric', month: 'short' }), n: leads.filter((l) => { const c = Date.parse(l.created_at); return c >= start.getTime() && c < end; }).length };
    });
    const bySource = new Map<Source, number>();
    for (const l of leads) bySource.set(l.source, (bySource.get(l.source) ?? 0) + 1);
    const paid = feed.filter((f) => f.kind === 'paid');
    return {
      open, won, thisWeek, days,
      trend: lastWeek ? Math.round(((thisWeek - lastWeek) / lastWeek) * 100) : null,
      pipeline: open.reduce((t, l) => t + (l.value ?? 0), 0),
      wonValue: won.reduce((t, l) => t + (l.value ?? 0), 0),
      winRate: closed.length ? Math.round((won.length / closed.length) * 100) : null,
      hot: open.filter((l) => l.temperature === 'hot'),
      due: open.filter((l) => l.next_follow_up && Date.parse(l.next_follow_up) <= now + DAY).sort((a, b) => Date.parse(a.next_follow_up!) - Date.parse(b.next_follow_up!)),
      calls: feed.filter((f) => f.kind === 'booking' && Date.parse(String(f.meta?.slot ?? '')) >= now - 30 * 60_000).sort((a, b) => String(a.meta.slot).localeCompare(String(b.meta.slot))),
      funnel: STAGES.filter((x) => x.id !== 'lost').map((x, i, arr) => {
        const reached = leads.filter((l) => arr.findIndex((a) => a.id === l.stage) >= i && l.stage !== 'lost').length;
        return { ...x, n: leads.filter((l) => l.stage === x.id).length, reached };
      }),
      bySource: [...bySource.entries()].sort((a, b) => b[1] - a[1]),
      revenue30: paid.filter((f) => now - Date.parse(f.created_at) < 30 * DAY).reduce((t, f) => t + (f.lead_value ?? 0), 0),
      untouched: leads.filter((l) => l.stage === 'new' && now - Date.parse(l.last_activity_at) > DAY).length,
    };
  }, [leads, feed, now]);

  const maxDay = Math.max(1, ...s.days.map((d) => d.n));
  const maxSource = Math.max(1, ...s.bySource.map(([, n]) => n));
  const top = Math.max(1, s.funnel[0]?.reached ?? 1);
  const down = health.filter((h) => !h.ok);
  const awaitingDemos = demos.filter((d) => d.status === 'awaiting_approval').length;

  return (
    <div className="crm-stack">
      <section className="crm-kpis" aria-label="Summary">
        <Kpi label="Open leads" value={String(s.open.length)} sub={`${s.hot.length} hot`} />
        <Kpi label="New this week" value={String(s.thisWeek)} trend={s.trend} sub="vs last week" />
        <Kpi label="Calls booked" value={String(s.calls.length)} sub="Upcoming" />
        <Kpi label="Pipeline value" value={inr(s.pipeline)} sub="Open leads with a value" />
        <Kpi label="Won" value={inr(s.wonValue)} sub={`${s.won.length} deal${s.won.length === 1 ? '' : 's'} · ${inr(s.revenue30)} in 30d`} accent />
        <Kpi label="Win rate" value={s.winRate == null ? '—' : `${s.winRate}%`} sub="Of closed leads" />
      </section>

      {awaitingDemos ? <div className="crm-alerts"><button className="crm-alert is-warn" onClick={() => go('autopilot')}>⚡ {awaitingDemos} demo{awaitingDemos === 1 ? ' is' : 's are'} waiting for your approval</button></div> : null}

      {s.untouched || down.length ? (
        <div className="crm-alerts">
          {s.untouched ? <button className="crm-alert is-warn" onClick={() => go('pipeline')}>⚠ {s.untouched} new lead{s.untouched === 1 ? '' : 's'} untouched for over a day</button> : null}
          {down.length ? <button className="crm-alert" onClick={() => go('system')}>● {down.length} system{down.length === 1 ? ' needs' : 's need'} attention: {down.slice(0, 2).map((h) => h.label).join(', ')}{down.length > 2 ? ` +${down.length - 2} more` : ''}</button> : null}
        </div>
      ) : null}

      <div className="crm-grid-2">
        <Panel title="Leads, last 30 days" action={<span className="crm-muted">{s.days.reduce((t, d) => t + d.n, 0)} total</span>}>
          <div className="crm-spark" role="img" aria-label="Leads per day for the last 30 days">
            {s.days.map((d, i) => <span key={i} className="crm-spark-bar" style={{ height: `${Math.max(4, (d.n / maxDay) * 100)}%` }} data-n={d.n} title={`${d.label}: ${d.n}`} />)}
          </div>
          <div className="crm-spark-axis"><span>{s.days[0]?.label}</span><span>Today</span></div>
        </Panel>
        <Panel title="Funnel">
          <div className="crm-funnel">
            {s.funnel.map((f) => (
              <button key={f.id} className={`crm-funnel-row stage-${f.id}`} onClick={() => go('pipeline')}>
                <span className="crm-funnel-label">{f.label}</span>
                <span className="crm-funnel-track"><span className="crm-funnel-fill" style={{ width: `${(f.reached / top) * 100}%` }} /></span>
                <span className="crm-funnel-n">{f.n}<small>{Math.round((f.reached / top) * 100)}%</small></span>
              </button>
            ))}
          </div>
        </Panel>
      </div>

      <div className="crm-grid-3">
        <Panel title="Today" action={<span className="crm-muted">{s.calls.length + s.due.length} things</span>}>
          {s.calls.slice(0, 4).map((f) => (
            <button key={f.id} className="crm-due-item" onClick={() => onOpen(f.lead_id)}>
              <span className="crm-ev-icon">◷</span>
              <span className="crm-due-text"><b>{display(feedLead(f))}</b><small>{f.title.replace('Discovery call booked · ', 'Call · ')}</small></span>
              <span className="crm-due-when">{until(String(f.meta.slot), now)}</span>
            </button>
          ))}
          {s.due.slice(0, 5).map((l) => (
            <button key={l.id} className="crm-due-item" onClick={() => onOpen(l.id)}>
              <span className={`crm-avatar t-${l.temperature ?? 'none'}`}>{initials(l)}</span>
              <span className="crm-due-text"><b>{display(l)}</b><small>Follow up · {l.need ?? STAGE_LABEL[l.stage]}</small></span>
              <span className={`crm-due-when ${Date.parse(l.next_follow_up!) < now ? 'is-late' : ''}`}>{Date.parse(l.next_follow_up!) < now ? 'Overdue' : until(l.next_follow_up!, now)}</span>
            </button>
          ))}
          {queue?.length ? <button className="crm-due-item" onClick={() => go('calls')}><span className="crm-ev-icon">☏</span><span className="crm-due-text"><b>{queue.length} in the AI call queue</b><small>Retries and out-of-hours leads</small></span></button> : null}
          {!s.calls.length && !s.due.length && !queue?.length ? <p className="crm-muted">Nothing scheduled. Set follow-up dates on leads to plan your day.</p> : null}
        </Panel>
        <Panel title="Where leads come from">
          {s.bySource.length ? s.bySource.map(([src, n]) => (
            <button key={src} className="crm-bar" onClick={() => go('leads', src)}>
              <span className="crm-bar-label">{SOURCE_LABEL[src]}</span>
              <span className="crm-bar-track"><span className={`crm-bar-fill src-${src}`} style={{ width: `${(n / maxSource) * 100}%` }} /></span>
              <span className="crm-bar-n">{n}</span>
            </button>
          )) : <p className="crm-muted">No leads yet.</p>}
        </Panel>
        <Panel title="Hot right now">
          {s.hot.length ? s.hot.slice(0, 6).map((l) => (
            <button key={l.id} className="crm-due-item" onClick={() => onOpen(l.id)}>
              <span className="crm-avatar t-hot">{initials(l)}</span>
              <span className="crm-due-text"><b>{display(l)}</b><small>{l.need ?? SOURCE_LABEL[l.source]}</small></span>
              <span className="crm-due-when">{ago(l.last_activity_at, now)}</span>
            </button>
          )) : <p className="crm-muted">No hot leads. B marks them when someone is ready to buy.</p>}
        </Panel>
      </div>

      <DemoPanel demos={demos} leads={leads} now={now} onOpen={onOpen} onToast={onToast} onChanged={onChanged} go={go} />

      <Panel title="Latest activity" action={<button className="crm-link" onClick={() => go('activity')}>See all</button>}>
        <div className="crm-feed">{feed.filter((f) => f.kind !== 'created' && f.kind !== 'edit').slice(0, 10).map((f) => <FeedRow key={f.id} f={f} now={now} onOpen={onOpen} />)}{!feed.length ? <p className="crm-muted">Activity appears as leads come in.</p> : null}</div>
      </Panel>
    </div>
  );
}

/* ───────────────────────── Pipeline / Leads ───────────────────────── */

const AP_BADGE: Partial<Record<CrmLead['autopilot'], string>> = {
  researching: 'Researching', qualified: 'Drafting demo', awaiting_approval: 'Demo to approve', sent: 'Demo sent', held: 'Held', needs_review: 'Check: maybe fake', failed: 'Autopilot failed',
};
/** "sell_products_online" reads as "Sell products online". */
const humanise = (s: string) => (/^[a-z]+(_[a-z]+)+$/.test(s) ? s.replace(/_/g, ' ').replace(/^./, (c) => c.toUpperCase()) : s);

/** The lead's research score as a small ring. */
function ScoreRing({ lead }: { lead: CrmLead }) {
  if (lead.quality_score == null && !lead.quality) return null;
  const score = Math.max(0, Math.min(100, Number(lead.quality_score ?? 0)));
  const c = 2 * Math.PI * 15;
  return (
    <span className={`crm-ring q-${lead.quality ?? 'maybe'}`} title={`Lead score ${score}/100 (${lead.quality ?? 'unrated'})`}>
      <svg viewBox="0 0 36 36" aria-hidden="true"><circle cx="18" cy="18" r="15" /><circle cx="18" cy="18" r="15" style={{ strokeDasharray: `${(score / 100) * c} ${c}` }} /></svg>
      <b>{score}</b>
    </span>
  );
}

export function Card({ lead, now, fresh, onOpen, draggable }: { lead: CrmLead; now: number; fresh?: boolean; onOpen: () => void; draggable?: boolean }) {
  const overdue = !!lead.next_follow_up && Date.parse(lead.next_follow_up) < now;
  const upcoming = !!lead.next_follow_up && !overdue;
  const badge = AP_BADGE[lead.autopilot];
  return (
    <button
      className={`crm-card t-${lead.temperature ?? 'none'} ${fresh ? 'is-fresh' : ''}`}
      onClick={onOpen}
      draggable={draggable}
      onDragStart={(e) => { e.dataTransfer.setData('text/plain', lead.id); e.dataTransfer.effectAllowed = 'move'; e.currentTarget.classList.add('is-dragging'); }}
      onDragEnd={(e) => e.currentTarget.classList.remove('is-dragging')}
    >
      <span className="crm-card-top">
        <span className={`crm-avatar t-${lead.temperature ?? 'none'}`}>{initials(lead)}</span>
        <span className="crm-card-name"><b>{display(lead)}</b>{lead.company && lead.name ? <small>{lead.company}</small> : null}</span>
        <ScoreRing lead={lead} />
      </span>
      {lead.need ? <span className="crm-card-need">{humanise(lead.need)}</span> : null}
      <span className="crm-card-tags">
        {lead.temperature ? <span className={`crm-temp t-${lead.temperature}`}>{lead.temperature === 'hot' ? '🔥 Hot' : lead.temperature === 'warm' ? 'Warm' : 'Cold'}</span> : null}
        {badge ? <span className={`crm-apb ap-${lead.autopilot}`}>{badge}</span> : null}
        {lead.value ? <span className="crm-card-value">{inr(lead.value)}</span> : null}
      </span>
      <span className="crm-card-foot">
        <span className={`crm-chip src-${lead.source}`}>{SOURCE_LABEL[lead.source]}</span>
        {overdue ? <span className="crm-late">Follow-up overdue</span> : upcoming ? <span className="crm-next">Next: {when(lead.next_follow_up!)}</span> : null}
        <span className="crm-card-ago">{ago(lead.last_activity_at, now)}</span>
      </span>
    </button>
  );
}

export function Board({ leads, now, fresh, onOpen, onMove }: { leads: CrmLead[]; now: number; fresh: Set<string>; onOpen: (id: string) => void; onMove: (id: string, s: Stage) => void }) {
  const [over, setOver] = useState<Stage | null>(null);
  const open = leads.filter((l) => l.stage !== 'won' && l.stage !== 'lost');
  const value = open.reduce((t, l) => t + (l.value ?? 0), 0);
  const hot = open.filter((l) => l.temperature === 'hot').length;
  const late = open.filter((l) => l.next_follow_up && Date.parse(l.next_follow_up) < now).length;
  const won = leads.filter((l) => l.stage === 'won');
  // Score-led order inside a column: hot first, then the best-scored, then the most recent.
  const rank = (l: CrmLead) => (l.temperature === 'hot' ? 1000 : l.temperature === 'warm' ? 500 : 0) + Number(l.quality_score ?? 0);
  return (
    <>
      <div className="crm-pipe-sum">
        <div className="crm-pipe-stats">
          <span><b>{open.length}</b>open leads</span>
          <span><b>{inr(value)}</b>in pipeline</span>
          <span className="is-hot"><b>{hot}</b>hot</span>
          <span className={late ? 'is-late' : ''}><b>{late}</b>follow-ups overdue</span>
          <span className="is-won"><b>{inr(won.reduce((t, l) => t + (l.value ?? 0), 0))}</b>won</span>
        </div>
        <div className="crm-pipe-bar" aria-label="Leads by stage">
          {STAGES.map((s) => {
            const n = leads.filter((l) => l.stage === s.id).length;
            return n ? <span key={s.id} className={`stage-${s.id}`} style={{ flexGrow: n }} title={`${s.label}: ${n}`}><i>{s.label}</i><b>{n}</b></span> : null;
          })}
        </div>
      </div>
      {/* Busy stages get the room; empty ones fold to a slim drop zone so the board fits without sideways scrolling. */}
      <div className="crm-board" style={{ gridTemplateColumns: STAGES.map((s) => (leads.some((l) => l.stage === s.id) ? 'minmax(158px, 1fr)' : 'minmax(108px, .42fr)')).join(' ') }}>
        {STAGES.map((s) => {
          const col = leads.filter((l) => l.stage === s.id).sort((x, y) => rank(y) - rank(x) || Date.parse(y.last_activity_at) - Date.parse(x.last_activity_at));
          const total = col.reduce((t, l) => t + (l.value ?? 0), 0);
          const share = leads.length ? Math.round((col.length / leads.length) * 100) : 0;
          return (
            <section key={s.id} className={`crm-col stage-${s.id} ${over === s.id ? 'is-over' : ''}`}
              onDragOver={(e) => { e.preventDefault(); setOver(s.id); }}
              onDragLeave={() => setOver((o) => (o === s.id ? null : o))}
              onDrop={(e) => { e.preventDefault(); setOver(null); const id = e.dataTransfer.getData('text/plain'); if (id) onMove(id, s.id); }}
              aria-label={`${s.label}, ${col.length} leads`}>
              <header className="crm-col-head">
                <span className="crm-col-dot" /><h2>{s.label}</h2><span className="crm-col-n">{col.length}</span>
                <span className="crm-col-v">{total ? inr(total) : `${share}%`}</span>
                <span className="crm-col-meter" aria-hidden="true"><i style={{ width: `${share}%` }} /></span>
              </header>
              <div className="crm-col-body">
                {col.map((l) => <Card key={l.id} lead={l} now={now} fresh={fresh.has(l.id)} onOpen={() => onOpen(l.id)} draggable />)}
                {!col.length ? <p className="crm-col-empty"><span>＋</span>Drag a lead here</p> : null}
              </div>
            </section>
          );
        })}
      </div>
    </>
  );
}

type SortKey = 'last_activity_at' | 'created_at' | 'name' | 'value' | 'stage';

export function List({ leads, now, onOpen }: { leads: CrmLead[]; now: number; onOpen: (id: string) => void }) {
  const [sort, setSort] = useState<{ key: SortKey; dir: 1 | -1 }>({ key: 'last_activity_at', dir: -1 });
  const order = STAGES.map((s) => s.id);
  const val = (l: CrmLead, k: SortKey) => (k === 'stage' ? order.indexOf(l.stage) : k === 'value' ? l.value ?? -1 : k === 'name' ? display(l).toLowerCase() : Date.parse(l[k]));
  const rows = [...leads].sort((a, b) => { const av = val(a, sort.key), bv = val(b, sort.key); return (av < bv ? -1 : av > bv ? 1 : 0) * sort.dir; });
  const th = (key: SortKey, label: string) => (
    <th aria-sort={sort.key === key ? (sort.dir === 1 ? 'ascending' : 'descending') : 'none'}>
      <button onClick={() => setSort((s) => ({ key, dir: s.key === key ? (s.dir === 1 ? -1 : 1) : key === 'name' ? 1 : -1 }))}>{label}{sort.key === key ? (sort.dir === 1 ? ' ↑' : ' ↓') : ''}</button>
    </th>
  );
  if (!rows.length) return <div className="crm-panel"><p className="crm-muted">No leads match.</p></div>;
  return (
    <div className="crm-panel crm-table-wrap">
      <table className="crm-table">
        <thead><tr>{th('name', 'Lead')}<th>Contact</th><th>Source</th>{th('stage', 'Stage')}{th('value', 'Value')}<th>Follow-up</th>{th('created_at', 'Created')}{th('last_activity_at', 'Last activity')}</tr></thead>
        <tbody>
          {rows.map((l) => (
            <tr key={l.id} onClick={() => onOpen(l.id)} tabIndex={0} onKeyDown={(e) => { if (e.key === 'Enter') onOpen(l.id); }}>
              <td><span className="crm-cell-lead"><span className={`crm-avatar t-${l.temperature ?? 'none'}`}>{initials(l)}</span><span><b>{display(l)}</b><small>{l.need ?? l.company ?? ''}</small></span></span></td>
              <td><small>{l.email}<br />{l.phone}</small></td>
              <td><span className={`crm-chip src-${l.source}`}>{SOURCE_LABEL[l.source]}</span></td>
              <td><span className={`crm-stage stage-${l.stage}`}>{STAGE_LABEL[l.stage]}</span></td>
              <td>{l.value ? inr(l.value) : '—'}</td>
              <td>{l.next_follow_up ? <span className={Date.parse(l.next_follow_up) < now ? 'crm-late' : ''}>{until(l.next_follow_up, now)}</span> : '—'}</td>
              <td>{ago(l.created_at, now)}</td>
              <td>{ago(l.last_activity_at, now)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/* ───────────────────────── Activity ───────────────────────── */

export function ActivitySection({ feed, now, onOpen }: { feed: FeedItem[]; now: number; onOpen: (id: string) => void }) {
  const kinds = useMemo(() => [...new Set(feed.map((f) => f.kind))].filter((k) => k !== 'created' && k !== 'edit'), [feed]);
  const [kind, setKind] = useState<string | null>(null);
  const rows = feed.filter((f) => (kind ? f.kind === kind : f.kind !== 'edit'));
  const byDay = new Map<string, FeedItem[]>();
  for (const f of rows) {
    const d = new Date(f.created_at).toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric', month: 'short' });
    byDay.set(d, [...(byDay.get(d) ?? []), f]);
  }
  return (
    <div className="crm-stack">
      <div className="crm-chips">
        <button className={`crm-chipbtn ${!kind ? 'is-on' : ''}`} onClick={() => setKind(null)}>Everything</button>
        {kinds.map((k) => <button key={k} className={`crm-chipbtn ${kind === k ? 'is-on' : ''}`} onClick={() => setKind(kind === k ? null : k)}>{EVENT_ICON[k]} {EVENT_LABEL[k] ?? k}</button>)}
      </div>
      {[...byDay.entries()].map(([d, items]) => (
        <Panel key={d} title={d} action={<span className="crm-muted">{items.length}</span>}>
          <div className="crm-feed">{items.map((f) => <FeedRow key={f.id} f={f} now={now} onOpen={onOpen} />)}</div>
        </Panel>
      ))}
      {!rows.length ? <div className="crm-panel"><p className="crm-muted">No activity yet.</p></div> : null}
    </div>
  );
}

/* ───────────────────────── Calls ───────────────────────── */

const QUEUE_LABEL: Record<string, string> = {
  pending: 'Waiting to dial', queued_hours: 'Queued for calling hours', calling: 'On a call now', answered: 'Answered, summary pending',
  no_answer: 'No answer, will retry', busy: 'Busy, will retry', failed: 'Failed, will retry', done: 'Done', whatsapp_only: 'Follow up on WhatsApp', skipped_allowlist: 'Not dialled',
};

export function CallsSection({ feed, queue, now, onOpen }: { feed: FeedItem[]; queue: QueueItem[] | null; now: number; onOpen: (id: string) => void }) {
  const upcoming = feed.filter((f) => f.kind === 'booking' && Date.parse(String(f.meta?.slot ?? '')) >= now - 30 * 60_000).sort((a, b) => String(a.meta.slot).localeCompare(String(b.meta.slot)));
  const past = feed.filter((f) => f.kind === 'booking' && Date.parse(String(f.meta?.slot ?? '')) < now - 30 * 60_000).slice(0, 10);
  const outcomes = feed.filter((f) => f.kind === 'call');
  const answered = outcomes.filter((f) => /answered/.test(f.title)).length;
  return (
    <div className="crm-stack">
      <section className="crm-kpis is-4">
        <Kpi label="Upcoming calls" value={String(upcoming.length)} sub="Booked by B, voice or you" />
        <Kpi label="AI call queue" value={queue ? String(queue.length) : '—'} sub={queue ? 'Waiting or retrying' : 'Queue not connected'} />
        <Kpi label="AI calls logged" value={String(outcomes.length)} sub={`${answered} answered`} />
        <Kpi label="Answer rate" value={outcomes.length ? `${Math.round((answered / outcomes.length) * 100)}%` : '—'} sub="Of AI calls" />
      </section>
      <div className="crm-grid-2">
        <Panel title="Upcoming discovery calls">
          {upcoming.length ? upcoming.map((f) => (
            <button key={f.id} className="crm-due-item" onClick={() => onOpen(f.lead_id)}>
              <span className="crm-date"><b>{new Date(String(f.meta.slot)).toLocaleDateString('en-IN', { day: 'numeric' })}</b><small>{new Date(String(f.meta.slot)).toLocaleDateString('en-IN', { month: 'short' })}</small></span>
              <span className="crm-due-text"><b>{display(feedLead(f))}</b><small>{f.title.replace('Discovery call booked · ', '')}{f.body ? ` · ${f.body.slice(0, 80)}` : ''}</small></span>
              <span className="crm-due-when">{until(String(f.meta.slot), now)}</span>
            </button>
          )) : <p className="crm-muted">No calls booked. Use “Book call” on a lead, or let B book them.</p>}
          {past.length ? <><p className="crm-label crm-gap">Recent</p>{past.map((f) => <FeedRow key={f.id} f={f} now={now} onOpen={onOpen} />)}</> : null}
        </Panel>
        <Panel title="AI call queue (BYBO Voice)">
          {queue === null ? <p className="crm-muted">The call queue store isn’t connected on this deployment.</p> : queue.length ? (
            <div className="crm-queue">
              {queue.map((q) => (
                <div key={q.id} className="crm-queue-row">
                  <span className="crm-avatar">{initials({ name: q.name, company: q.business, email: q.email, phone: q.phone })}</span>
                  <span className="crm-due-text"><b>{q.name || q.business || q.phone}</b><small>{QUEUE_LABEL[q.status] ?? q.status} · {q.attempts} attempt{q.attempts === 1 ? '' : 's'}{q.source === 'meta' ? ' · Meta' : ''}</small></span>
                  <span className="crm-due-when">{q.next_call_at ? until(q.next_call_at, now) : ago(q.created_at, now)}</span>
                </div>
              ))}
            </div>
          ) : <p className="crm-muted">Queue is clear. New leads with a phone number are called within minutes in calling hours.</p>}
        </Panel>
      </div>
      <Panel title="AI call outcomes">
        <div className="crm-feed">{outcomes.slice(0, 30).map((f) => <FeedRow key={f.id} f={f} now={now} onOpen={onOpen} />)}{!outcomes.length ? <p className="crm-muted">No AI calls yet.</p> : null}</div>
      </Panel>
    </div>
  );
}

/* ───────────────────────── Payments ───────────────────────── */

export function PaymentsSection({ feed, products, now, onOpen, onToast }: { feed: FeedItem[]; products: Product[]; now: number; onOpen: (id: string) => void; onToast: (t: string) => void }) {
  const paid = feed.filter((f) => f.kind === 'paid');
  const links = feed.filter((f) => f.kind === 'payment');
  const amount = (f: FeedItem) => Number(String(f.title.match(/₹([\d,]+)/)?.[1] ?? '0').replace(/,/g, '')) || f.lead_value || 0;
  const total = paid.reduce((t, f) => t + amount(f), 0);
  const month = paid.filter((f) => new Date(f.created_at).getMonth() === new Date(now).getMonth() && new Date(f.created_at).getFullYear() === new Date(now).getFullYear()).reduce((t, f) => t + amount(f), 0);
  const paidLeads = new Set(paid.map((f) => f.lead_id));
  const pending = links.filter((f) => !paidLeads.has(f.lead_id));
  const copy = (id: string) => { navigator.clipboard?.writeText(`https://bybo.in/pay?product=${id}`).catch(() => {}); onToast(`Payment link copied: bybo.in/pay?product=${id}`); };
  const groups = [...new Set(products.map((p) => p.group))];
  return (
    <div className="crm-stack">
      <section className="crm-kpis is-4">
        <Kpi label="Collected, all time" value={inr(total)} sub={`${paid.length} payment${paid.length === 1 ? '' : 's'}`} accent />
        <Kpi label="This month" value={inr(month)} sub={new Date(now).toLocaleDateString('en-IN', { month: 'long' })} />
        <Kpi label="Awaiting payment" value={String(pending.length)} sub="Links sent or checkout started" />
        <Kpi label="Average deal" value={paid.length ? inr(total / paid.length) : '—'} sub="Per payment" />
      </section>
      <div className="crm-grid-2">
        <Panel title="Payments received">
          <div className="crm-feed">{paid.map((f) => <FeedRow key={f.id} f={f} now={now} onOpen={onOpen} />)}{!paid.length ? <p className="crm-muted">No payments yet. They appear the moment PhonePe confirms one.</p> : null}</div>
        </Panel>
        <Panel title="Awaiting payment">
          <div className="crm-feed">{pending.map((f) => <FeedRow key={f.id} f={f} now={now} onOpen={onOpen} />)}{!pending.length ? <p className="crm-muted">Nothing outstanding.</p> : null}</div>
        </Panel>
      </div>
      <Panel title="Price list · copy a payment link" action={<a className="crm-link" href="/pay" target="_blank" rel="noreferrer">Open /pay</a>}>
        {groups.map((g) => (
          <div key={g} className="crm-products">
            <p className="crm-label">{g}</p>
            {products.filter((p) => p.group === g).map((p) => (
              <div key={p.id} className="crm-product-row"><span>{p.name}</span><b>{inr(p.price)}</b><button className="crm-chipbtn" onClick={() => copy(p.id)}>Copy link</button></div>
            ))}
          </div>
        ))}
      </Panel>
    </div>
  );
}

/* ───────────────────────── B chats ───────────────────────── */

export function ChatsSection({ feed, now, onOpen }: { feed: FeedItem[]; now: number; onOpen: (id: string) => void }) {
  const chats = feed.filter((f) => ['brief', 'summary', 'alert'].includes(f.kind));
  const [open, setOpen] = useState<string | null>(null);
  return (
    <div className="crm-stack">
      <section className="crm-kpis is-4">
        <Kpi label="B conversations logged" value={String(chats.length)} sub="Briefs, summaries and alerts" />
        <Kpi label="Briefs sent" value={String(chats.filter((c) => c.kind === 'brief').length)} sub="Mini proposals by email" />
        <Kpi label="Hot alerts" value={String(chats.filter((c) => c.kind === 'alert' && c.title.startsWith('HOT')).length)} sub="Ready-to-buy signals" />
        <Kpi label="Calls B booked" value={String(feed.filter((f) => f.kind === 'booking' && f.lead_source === 'b_chat').length)} sub="From the chat" />
      </section>
      <div className="crm-chat-grid">
        {chats.map((c) => {
          const transcript = typeof c.meta?.transcript === 'string' ? c.meta.transcript : '';
          return (
            <article key={c.id} className={`crm-chat ev-${c.kind}`}>
              <header><span className="crm-ev-icon">{EVENT_ICON[c.kind]}</span><span className="crm-due-text"><b>{display(feedLead(c))}</b><small>{c.title}</small></span><time>{ago(c.created_at, now)}</time></header>
              {c.body ? <p>{c.body.slice(0, 320)}{c.body.length > 320 ? '…' : ''}</p> : null}
              <footer>
                <button className="crm-chipbtn" onClick={() => onOpen(c.lead_id)}>Open lead</button>
                {transcript ? <button className="crm-chipbtn" onClick={() => setOpen(open === c.id ? null : c.id)}>{open === c.id ? 'Hide conversation' : 'Read conversation'}</button> : null}
              </footer>
              {open === c.id ? <pre className="crm-transcript">{transcript}</pre> : null}
            </article>
          );
        })}
      </div>
      {!chats.length ? <div className="crm-panel"><p className="crm-muted">When B writes a brief, sends a summary or flags a hot lead, the conversation shows up here.</p></div> : null}
    </div>
  );
}

/* ───────────────────────── Instagram ───────────────────────── */

const IG_LABEL: Record<string, string> = { draft: 'Drafts', approved: 'Approved', scheduled: 'Scheduled', publishing: 'Publishing', published: 'Published', failed: 'Failed' };

export function InstagramSection({ ig, feed, now }: { ig: IgSummary | null; feed: FeedItem[]; now: number }) {
  const meta = feed.filter((f) => f.kind === 'meta').length;
  return (
    <div className="crm-stack">
      <section className="crm-kpis">
        {['draft', 'approved', 'scheduled', 'published', 'failed'].map((s) => <Kpi key={s} label={IG_LABEL[s]!} value={ig ? String(ig.counts[s] ?? 0) : '—'} sub={s === 'published' ? '@byboindia' : undefined} accent={s === 'published'} />)}
        <Kpi label="Leads from Meta forms" value={String(meta)} sub="Instagram + Facebook" />
      </section>
      {ig === null ? <div className="crm-panel"><p className="crm-muted">The Instagram post store isn’t connected on this deployment.</p></div> : (
        <div className="crm-grid-2">
          <Panel title="Up next" action={<a className="crm-btn is-ghost" href="/admin/instagram">Open Instagram desk</a>}>
            {ig.next.length ? ig.next.map((p, i) => (
              <div key={i} className="crm-ig-row"><span className={`crm-ig-status s-${p.status}`}>{IG_LABEL[p.status] ?? p.status}</span><span className="crm-ig-cap">{p.caption || '(no caption)'}</span><span className="crm-due-when">{p.scheduledAt ? until(p.scheduledAt, now) : 'When approved'}</span></div>
            )) : <p className="crm-muted">Nothing queued. Compose and approve posts in the Instagram desk.</p>}
          </Panel>
          <Panel title="Recently published">
            {ig.recent.length ? ig.recent.map((p, i) => (
              <div key={i} className="crm-ig-row"><span className="crm-ig-cap">{p.caption}</span>{p.permalink ? <a className="crm-link" href={p.permalink} target="_blank" rel="noreferrer">View</a> : null}<span className="crm-due-when">{p.publishedAt ? ago(p.publishedAt, now) : ''}</span></div>
            )) : <p className="crm-muted">No posts published from the desk yet.</p>}
          </Panel>
        </div>
      )}
    </div>
  );
}

/* ───────────────────────── Automations ───────────────────────── */

export function AutomationsSection({ automations, onDone }: { automations: Automation[]; onDone: (msg: string) => void }) {
  const [busy, setBusy] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  async function run(job: string) {
    setBusy(job);
    try { onDone((await api<{ message: string }>('/api/admin/crm/run', { method: 'POST', body: JSON.stringify({ job }) })).message); }
    catch (x) { onDone(((x as Error & { data?: { message?: string } }).data?.message) || 'That didn’t run. Check System for what’s missing.'); }
    setBusy(null);
  }
  async function upload(e: FormEvent) {
    e.preventDefault();
    if (!file) return;
    setBusy('import');
    const fd = new FormData();
    fd.append('file', file);
    try {
      const r = await api<{ inserted: number; duplicates: number; skipped: number }>('/api/admin/crm/import', { method: 'POST', body: fd });
      onDone(`Imported ${r.inserted} new, ${r.duplicates} already known, ${r.skipped} skipped. Nobody was called.`);
      setFile(null);
    } catch { onDone('Import failed. Use the Leads Center export (CSV, UTF-16).'); }
    setBusy(null);
  }
  const RUN_LABEL = { sync: 'Sync now', digest: 'Send digest now', meta_pull: 'Pull Meta leads now', autopilot: 'Run autopilot now' } as const;
  return (
    <div className="crm-stack">
      <div className="crm-auto-grid">
        {automations.map((a) => (
          <article key={a.id} className={`crm-auto ${a.on ? 'is-on' : ''}`}>
            <header><span className={`crm-dot ${a.on ? 'is-live' : 'is-bad'}`} /><h3>{a.title}</h3><span className="crm-auto-state">{a.on ? 'On' : 'Off'}</span></header>
            <p><b>When:</b> {a.trigger}</p>
            <p><b>Does:</b> {a.does}</p>
            <p className="crm-muted">{a.status}</p>
            {a.run ? <button className="crm-btn is-ghost" onClick={() => run(a.run!)} disabled={!!busy}>{busy === a.run ? 'Running…' : RUN_LABEL[a.run]}</button> : null}
          </article>
        ))}
        <form className="crm-auto is-on" onSubmit={upload}>
          <header><span className="crm-dot is-live" /><h3>Import a Meta leads export</h3></header>
          <p><b>When:</b> You download leads from Meta Leads Center</p>
          <p><b>Does:</b> Adds every row to the call queue and this desk, without calling anyone</p>
          <input type="file" accept=".csv,.tsv,text/csv" onChange={(e) => setFile(e.target.files?.[0] ?? null)} />
          <button className="crm-btn is-ghost" disabled={!file || !!busy}>{busy === 'import' ? 'Importing…' : 'Import file'}</button>
        </form>
      </div>
    </div>
  );
}

/* ───────────────────────── System ───────────────────────── */

export function SystemSection({ health }: { health: Health[] }) {
  const ok = health.filter((h) => h.ok).length;
  return (
    <div className="crm-stack">
      <Panel title={`${ok} of ${health.length} systems connected`}>
        <div className="crm-health">
          {health.map((h) => (
            <div key={h.id} className={`crm-health-row ${h.ok ? 'is-ok' : 'is-off'}`}>
              <span className={`crm-dot ${h.ok ? 'is-live' : 'is-bad'}`} />
              <span className="crm-due-text"><b>{h.label}</b><small>{h.detail}</small></span>
              <span className="crm-auto-state">{h.ok ? 'Connected' : 'Needs setup'}</span>
            </div>
          ))}
        </div>
        <p className="crm-muted crm-gap">Only whether each key is present is checked here; no secret value ever reaches this page. Keys live in Vercel → bybo → Settings → Environment Variables.</p>
      </Panel>
    </div>
  );
}

/* ───────────────────────── Add lead ───────────────────────── */

export function AddLead({ onClose, onAdded }: { onClose: () => void; onAdded: (id: string) => void }) {
  const [f, setF] = useState({ name: '', company: '', email: '', phone: '', need: '', value: '', stage: 'new' as Stage, note: '' });
  const [err, setErr] = useState('');
  const [busy, setBusy] = useState(false);
  const set = (k: keyof typeof f) => (e: { target: { value: string } }) => setF((x) => ({ ...x, [k]: e.target.value }));
  async function submit(e: FormEvent) {
    e.preventDefault();
    if (!f.name.trim() && !f.email.trim() && !f.phone.trim()) { setErr('Add at least a name, email or phone.'); return; }
    setBusy(true);
    setErr('');
    try { onAdded((await api<{ id: string }>('/api/admin/crm/leads', { method: 'POST', body: JSON.stringify(f) })).id); }
    catch (x) { setErr((x as Error).message === 'invalid_email' ? 'That email doesn’t look right.' : 'Couldn’t add the lead.'); setBusy(false); }
  }
  return (
    <div className="crm-overlay is-center" onMouseDown={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <form className="crm-modal" onSubmit={submit} role="dialog" aria-modal="true" aria-label="Add a lead">
        <header className="crm-drawer-head"><div className="crm-drawer-title"><h2>Add a lead</h2><p>From a call, a referral or a DM. If the email or phone already exists, it merges.</p></div><button type="button" className="crm-x" onClick={onClose} aria-label="Close">×</button></header>
        <div className="crm-form">
          <label>Name<input value={f.name} onChange={set('name')} autoFocus /></label>
          <label>Company<input value={f.company} onChange={set('company')} /></label>
          <label>Email<input type="email" value={f.email} onChange={set('email')} /></label>
          <label>Phone<input value={f.phone} onChange={set('phone')} /></label>
          <label className="is-wide">Need<input value={f.need} onChange={set('need')} placeholder="What they want, in one line" /></label>
          <label>Deal value (₹)<input inputMode="numeric" value={f.value} onChange={(e) => setF((x) => ({ ...x, value: e.target.value.replace(/[^\d.]/g, '') }))} /></label>
          <label>Stage<select value={f.stage} onChange={set('stage')}>{STAGES.map((s) => <option key={s.id} value={s.id}>{s.label}</option>)}</select></label>
          <label className="is-wide">Note<textarea rows={3} value={f.note} onChange={set('note')} /></label>
          {err ? <p className="crm-err is-wide" role="alert">{err}</p> : null}
          <div className="crm-form-foot is-wide"><button type="button" className="crm-btn is-ghost" onClick={onClose}>Cancel</button><button className="crm-btn" type="submit" disabled={busy}>{busy ? 'Adding…' : 'Add lead'}</button></div>
        </div>
      </form>
    </div>
  );
}
