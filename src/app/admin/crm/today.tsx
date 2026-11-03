'use client';

import { useMemo, useState } from 'react';
import type { CrmLead, Source, Stage } from '@/lib/crm/db';
import { Icon } from './icons';
import { daily, forecast, funnel, idleDays, nextActions, sources, type Action } from './intel';
import { OverviewSection } from './sections';
import { DAY, display, initials, inr, SOURCE_LABEL, STAGE_LABEL, STAGES, waLink, type DemoRow, type FeedItem, type Health, type QueueItem } from './shared';

const open = (l: CrmLead) => l.stage !== 'won' && l.stage !== 'lost';
const startOfDay = (t: number) => { const d = new Date(t); d.setHours(0, 0, 0, 0); return d.getTime(); };

/** A tiny trend line; the last point is marked so "today" reads at a glance. */
export function Spark({ data, tone = 'violet' }: { data: number[]; tone?: 'violet' | 'green' | 'amber' | 'blue' | 'orange' }) {
  const w = 120, h = 34, max = Math.max(1, ...data), min = Math.min(0, ...data);
  const pts = data.map((v, i) => [(i / Math.max(1, data.length - 1)) * w, h - 3 - ((v - min) / (max - min || 1)) * (h - 6)] as const);
  const line = pts.map(([x, y]) => `${x.toFixed(1)},${y.toFixed(1)}`).join(' ');
  const last = pts[pts.length - 1];
  return (
    <svg className={`crm-sparkline tone-${tone}`} viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="none" aria-hidden="true">
      <polygon points={`0,${h} ${line} ${w},${h}`} />
      <polyline points={line} />
      {last ? <circle cx={last[0]} cy={last[1]} r="2.6" /> : null}
    </svg>
  );
}

function Tile({ label, value, sub, data, tone, onClick }: { label: string; value: string; sub: string; data: number[]; tone: 'violet' | 'green' | 'amber' | 'blue' | 'orange'; onClick?: () => void }) {
  return (
    <button className={`crm-tile tone-${tone}`} onClick={onClick} disabled={!onClick}>
      <span className="crm-tile-label">{label}</span>
      <strong>{value}</strong>
      <span className="crm-tile-foot"><small>{sub}</small><Spark data={data} tone={tone} /></span>
    </button>
  );
}

const KIND_LABEL: Record<Action['kind'], string> = { approve: 'Approve', call: 'Call', followup: 'Follow up', reply: 'Reply', nudge: 'Nudge', propose: 'Propose', qualify: 'Qualify' };

function ActionRow({ a, rank, onOpen }: { a: Action; rank: number; onOpen: (id: string) => void }) {
  const l = a.lead;
  const first = (l.name ?? '').split(' ')[0] || 'there';
  return (
    <li className={`crm-nba u-${a.urgency}`}>
      <span className="crm-nba-rank">{rank}</span>
      <span className={`crm-avatar t-${l.temperature ?? 'none'}`}>{initials(l)}</span>
      <button className="crm-nba-text" onClick={() => onOpen(l.id)}>
        <b>{display(l)}<span className="crm-nba-kind">{KIND_LABEL[a.kind]}</span></b>
        <small>{a.why} · <em>{a.do}</em></small>
      </button>
      <span className="crm-nba-acts">
        <button className="crm-iconbtn" onClick={() => onOpen(l.id)} title="Open lead" aria-label={`Open ${display(l)}`}><Icon name="open" size={16} /></button>
        {l.phone ? <a className="crm-iconbtn is-wa" href={waLink(l.phone, `Hi ${first}, this is BYBO. `)} target="_blank" rel="noreferrer" title="WhatsApp" aria-label={`WhatsApp ${display(l)}`}><Icon name="whatsapp" size={16} /></a> : null}
        {l.email ? <a className="crm-iconbtn" href={`mailto:${l.email}`} title="Email" aria-label={`Email ${display(l)}`}><Icon name="mail" size={16} /></a> : null}
      </span>
    </li>
  );
}

export function TodaySection({ leads, demos, feed, queue, health, now, onOpen, go, onToast, onChanged }: {
  leads: CrmLead[]; demos: DemoRow[]; feed: FeedItem[]; queue: QueueItem[] | null; health: Health[]; now: number;
  onOpen: (id: string) => void; go: (section: string, source?: Source) => void; onToast: (t: string) => void; onChanged: () => void;
}) {
  const [all, setAll] = useState(false);
  const s = useMemo(() => {
    const today = startOfDay(now);
    const days = Array.from({ length: 14 }, (_, i) => today - (13 - i) * DAY + DAY);
    const asOf = (end: number) => leads.filter((l) => Date.parse(l.created_at) < end);
    const bookings = feed.filter((f) => f.kind === 'booking');
    const slotOf = (f: FeedItem) => Date.parse(String(f.meta?.slot ?? ''));
    const awaiting = demos.filter((d) => d.status === 'awaiting_approval');
    const live = leads.filter(open);
    const order = STAGES.map((x) => x.id);
    return {
      newDaily: daily(leads, now, 14),
      newToday: leads.filter((l) => Date.parse(l.created_at) >= today).length,
      new14: leads.filter((l) => Date.parse(l.created_at) >= today - 13 * DAY).length,
      forecast: forecast(leads),
      forecastSeries: days.map((end) => forecast(asOf(end))),
      pipeline: live.reduce((t, l) => t + (l.value ?? 0), 0),
      pipelineSeries: days.map((end) => asOf(end).filter(open).reduce((t, l) => t + (l.value ?? 0), 0)),
      awaiting: awaiting.length,
      awaitingSeries: days.map((end) => demos.filter((d) => { const t = Date.parse(d.created_at); return t >= end - DAY && t < end; }).length),
      callsToday: bookings.filter((f) => slotOf(f) >= today && slotOf(f) < today + DAY).length,
      callsSeries: days.map((end) => bookings.filter((f) => slotOf(f) >= end - DAY && slotOf(f) < end).length),
      actions: nextActions(leads, demos, feed, now),
      funnel: funnel(leads, order),
      sources: sources(leads),
      cold: live.filter((l) => idleDays(l, now) >= 5).sort((a, b) => idleDays(b, now) - idleDays(a, now)),
    };
  }, [leads, demos, feed, now]);

  const hour = new Date(now).getHours();
  const greet = hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening';
  const urgent = s.actions.filter((a) => a.urgency === 3).length;
  const shown = all ? s.actions : s.actions.slice(0, 7);
  const maxSrc = Math.max(1, ...s.sources.map((x) => x.n));

  return (
    <div className="crm-stack">
      <header className="crm-hello">
        <div>
          <p className="crm-hello-date">{new Date(now).toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long' })}</p>
          <h2>{greet}, BYBO team.</h2>
          <p className="crm-hello-sub">
            {urgent ? <><b>{urgent} urgent</b> thing{urgent === 1 ? '' : 's'} to do, </> : 'Nothing urgent. '}
            {s.newToday} new lead{s.newToday === 1 ? '' : 's'} today and {inr(s.forecast)} weighted in the pipeline.
          </p>
        </div>
      </header>

      <section className="crm-tiles" aria-label="Key numbers">
        <Tile label="New leads" value={String(s.new14)} sub={`${s.newToday} today · 14 days`} data={s.newDaily} tone="violet" onClick={() => go('leads')} />
        <Tile label="Weighted forecast" value={inr(s.forecast)} sub="Value × stage odds" data={s.forecastSeries} tone="green" onClick={() => go('pipeline')} />
        <Tile label="Open pipeline" value={inr(s.pipeline)} sub={`${leads.filter(open).length} open leads`} data={s.pipelineSeries} tone="blue" onClick={() => go('pipeline')} />
        <Tile label="Demos to approve" value={String(s.awaiting)} sub={s.awaiting ? 'Waiting on you' : 'All clear'} data={s.awaitingSeries} tone="amber" onClick={() => go('autopilot')} />
        <Tile label="Calls today" value={String(s.callsToday)} sub={queue?.length ? `${queue.length} in AI queue` : 'Booked discovery calls'} data={s.callsSeries} tone="orange" onClick={() => go('calls')} />
      </section>

      <div className="crm-today-grid">
        <section className="crm-panel crm-nba-panel">
          <div className="crm-panel-head">
            <h2><Icon name="sparkle" size={15} /> Next best actions</h2>
            <span className="crm-muted">{s.actions.length} ranked</span>
          </div>
          {s.actions.length ? (
            <ol className="crm-nba-list">{shown.map((a, i) => <ActionRow key={a.lead.id} a={a} rank={i + 1} onOpen={onOpen} />)}</ol>
          ) : <div className="crm-empty-mini"><Icon name="check" size={18} />Inbox zero. Every open lead is on track.</div>}
          {s.actions.length > 7 ? <button className="crm-more" onClick={() => setAll(!all)}>{all ? 'Show fewer' : `Show all ${s.actions.length}`}</button> : null}
        </section>

        <div className="crm-stack">
          <section className="crm-panel">
            <div className="crm-panel-head"><h2>Funnel</h2><span className="crm-muted">Reached each stage</span></div>
            <div className="crm-fun">
              {s.funnel.map((f, i) => {
                const prev = s.funnel[i - 1];
                const conv = prev ? (prev.n ? Math.round((f.n / prev.n) * 100) : 0) : null;
                return (
                  <button key={f.stage} className={`crm-fun-row stage-${f.stage}`} onClick={() => go('pipeline')}>
                    <span className="crm-fun-label">{STAGE_LABEL[f.stage as Stage]}</span>
                    <span className="crm-fun-track"><i style={{ width: `${Math.max(2, f.pct)}%` }} /></span>
                    <span className="crm-fun-n">{f.n}</span>
                    <span className="crm-fun-conv">{conv == null ? '' : `${conv}%`}</span>
                  </button>
                );
              })}
            </div>
          </section>

          <section className="crm-panel">
            <div className="crm-panel-head"><h2>Going cold</h2><span className="crm-muted">Idle 5+ days</span></div>
            {s.cold.length ? s.cold.slice(0, 6).map((l) => (
              <button key={l.id} className="crm-due-item" onClick={() => onOpen(l.id)}>
                <span className={`crm-avatar t-${l.temperature ?? 'none'}`}>{initials(l)}</span>
                <span className="crm-due-text"><b>{display(l)}</b><small>{STAGE_LABEL[l.stage]}{l.value ? ` · ${inr(l.value)}` : ''}</small></span>
                <span className="crm-cold-days">{idleDays(l, now)}d</span>
              </button>
            )) : <div className="crm-empty-mini"><Icon name="flame" size={18} />Nothing cooling off. Keep it up.</div>}
            {s.cold.length > 6 ? <p className="crm-muted crm-gap">+{s.cold.length - 6} more quiet leads</p> : null}
          </section>
        </div>
      </div>

      <section className="crm-panel">
        <div className="crm-panel-head"><h2>Source performance</h2><span className="crm-muted">Moved = past New</span></div>
        {s.sources.length ? (
          <div className="crm-src-table" role="table">
            <div className="crm-src-row is-head" role="row"><span>Source</span><span>Leads</span><span>Moved</span><span>Won</span><span>Won value</span></div>
            {s.sources.map((x) => (
              <button key={x.source} className="crm-src-row" role="row" onClick={() => go('leads', x.source as Source)}>
                <span className={`crm-src-name src-${x.source}`}><i style={{ width: `${(x.n / maxSrc) * 100}%` }} />{SOURCE_LABEL[x.source as Source] ?? x.source}</span>
                <span>{x.n}</span>
                <span>{x.n ? Math.round((x.moved / x.n) * 100) : 0}%</span>
                <span>{x.won}</span>
                <span>{x.value ? inr(x.value) : '—'}</span>
              </button>
            ))}
          </div>
        ) : <div className="crm-empty-mini">No leads yet.</div>}
      </section>

      <h2 className="crm-divider">Desk</h2>
      <OverviewSection leads={leads} demos={demos} onToast={onToast} onChanged={onChanged} feed={feed} queue={queue} health={health} now={now} onOpen={onOpen} go={go} />
    </div>
  );
}
