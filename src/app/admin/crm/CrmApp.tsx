'use client';

import { useCallback, useEffect, useMemo, useRef, useState, type FormEvent } from 'react';
import type { CrmEvent, CrmLead, Source, Stage } from '@/lib/crm/db';

const STAGES: { id: Stage; label: string }[] = [
  { id: 'new', label: 'New' },
  { id: 'contacted', label: 'Contacted' },
  { id: 'call_booked', label: 'Call booked' },
  { id: 'proposal', label: 'Proposal' },
  { id: 'won', label: 'Won' },
  { id: 'lost', label: 'Lost' },
];
const STAGE_LABEL = Object.fromEntries(STAGES.map((s) => [s.id, s.label])) as Record<Stage, string>;
const SOURCE_LABEL: Record<Source, string> = {
  enquiry: 'Website form', meta: 'Meta ads', b_chat: 'B chat', booking: 'Booked call',
  payment: 'Payment', voice: 'AI call', manual: 'Added by hand',
};
const POLL_MS = 20_000;

const inr = (n: number) => `₹${Math.round(n).toLocaleString('en-IN')}`;
const day = 86_400_000;

function ago(iso: string, now: number) {
  const s = Math.max(0, Math.round((now - Date.parse(iso)) / 1000));
  if (s < 60) return 'just now';
  if (s < 3600) return `${Math.floor(s / 60)}m ago`;
  if (s < 86400) return `${Math.floor(s / 3600)}h ago`;
  if (s < 86400 * 30) return `${Math.floor(s / 86400)}d ago`;
  return new Date(iso).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' });
}
/** ISO time as a datetime-local value in the viewer's timezone, to the minute. */
const localInput = (iso: string) => new Date(Date.parse(iso) - new Date().getTimezoneOffset() * 60_000).toISOString().slice(0, 16);
const when = (iso: string) => new Date(iso).toLocaleString('en-IN', { day: 'numeric', month: 'short', hour: 'numeric', minute: '2-digit' });
const display = (l: CrmLead) => l.name || l.company || l.email || l.phone || 'Unnamed lead';
const initials = (l: CrmLead) => display(l).split(/[\s@.]+/).filter(Boolean).slice(0, 2).map((w) => w[0]!.toUpperCase()).join('');
const waLink = (phone: string) => `https://wa.me/${phone.replace(/\D/g, '').replace(/^0+/, '').replace(/^(\d{10})$/, '91$1')}`;

async function api<T>(url: string, init?: RequestInit): Promise<T> {
  const res = await fetch(url, { ...init, headers: { 'content-type': 'application/json', ...init?.headers } });
  const data = await res.json().catch(() => ({}));
  if (!res.ok || data.ok === false) throw new Error(data.reason || `HTTP ${res.status}`);
  return data as T;
}

export function CrmApp() {
  const [leads, setLeads] = useState<CrmLead[] | null>(null);
  const [error, setError] = useState('');
  const [syncedAt, setSyncedAt] = useState(0);
  const [now, setNow] = useState(() => Date.now());
  const [view, setView] = useState<'board' | 'list'>('board');
  const [query, setQuery] = useState('');
  const [source, setSource] = useState<Source | 'all'>('all');
  const [openId, setOpenId] = useState<string | null>(null);
  const [adding, setAdding] = useState(false);
  const [toast, setToast] = useState('');
  const seen = useRef<Set<string> | null>(null);
  const [fresh, setFresh] = useState<Set<string>>(new Set());

  const load = useCallback(async () => {
    try {
      const data = await api<{ leads: CrmLead[] }>('/api/admin/crm/leads', { cache: 'no-store' });
      if (seen.current) {
        const added = data.leads.filter((l) => !seen.current!.has(l.id)).map((l) => l.id);
        if (added.length) {
          setFresh(new Set(added));
          setToast(added.length === 1 ? 'New lead just came in' : `${added.length} new leads just came in`);
        }
      }
      seen.current = new Set(data.leads.map((l) => l.id));
      setLeads(data.leads);
      setSyncedAt(Date.now());
      setError('');
    } catch (err) {
      setError((err as Error).message === 'HTTP 401' ? 'Your session ended. Refresh to sign in again.' : 'Couldn’t reach the lead database. Retrying…');
    }
  }, []);

  useEffect(() => {
    load();
    const poll = setInterval(() => { if (document.visibilityState === 'visible') load(); }, POLL_MS);
    const tick = setInterval(() => setNow(Date.now()), 5000);
    const onFocus = () => load();
    window.addEventListener('focus', onFocus);
    return () => { clearInterval(poll); clearInterval(tick); window.removeEventListener('focus', onFocus); };
  }, [load]);

  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(''), 4000);
    return () => clearTimeout(t);
  }, [toast]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') { setOpenId(null); setAdding(false); }
      if (e.key === '/' && !(e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement)) {
        e.preventDefault();
        document.getElementById('crm-search')?.focus();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const patchLocal = (lead: CrmLead) => setLeads((ls) => ls?.map((l) => (l.id === lead.id ? lead : l)) ?? ls);

  const move = async (id: string, stage: Stage) => {
    const prev = leads?.find((l) => l.id === id);
    if (!prev || prev.stage === stage) return;
    patchLocal({ ...prev, stage, last_activity_at: new Date().toISOString() });
    try {
      const { lead } = await api<{ lead: CrmLead }>(`/api/admin/crm/leads/${id}`, { method: 'PATCH', body: JSON.stringify({ stage }) });
      patchLocal(lead);
      setToast(`${display(lead)} moved to ${STAGE_LABEL[stage]}`);
    } catch {
      patchLocal(prev);
      setToast('That move didn’t save. Try again.');
    }
  };

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return (leads ?? []).filter((l) => (source === 'all' || l.source === source)
      && (!q || [l.name, l.email, l.phone, l.company, l.need, l.summary, ...l.services].some((v) => v?.toLowerCase().includes(q))));
  }, [leads, query, source]);

  const stats = useMemo(() => {
    const all = leads ?? [];
    const open = all.filter((l) => l.stage !== 'won' && l.stage !== 'lost');
    const closed = all.filter((l) => l.stage === 'won' || l.stage === 'lost');
    const won = all.filter((l) => l.stage === 'won');
    const bySource = new Map<Source, number>();
    for (const l of all) bySource.set(l.source, (bySource.get(l.source) ?? 0) + 1);
    return {
      total: all.length,
      week: all.filter((l) => now - Date.parse(l.created_at) < 7 * day).length,
      open: open.length,
      booked: all.filter((l) => l.stage === 'call_booked').length,
      pipeline: open.reduce((s, l) => s + (l.value ?? 0), 0),
      wonValue: won.reduce((s, l) => s + (l.value ?? 0), 0),
      won: won.length,
      winRate: closed.length ? Math.round((won.length / closed.length) * 100) : null,
      hot: open.filter((l) => l.temperature === 'hot').length,
      due: open.filter((l) => l.next_follow_up && Date.parse(l.next_follow_up) <= now + day)
        .sort((a, b) => Date.parse(a.next_follow_up!) - Date.parse(b.next_follow_up!)),
      bySource: [...bySource.entries()].sort((a, b) => b[1] - a[1]),
    };
  }, [leads, now]);

  const exportCsv = () => {
    const cols = ['name', 'email', 'phone', 'company', 'source', 'stage', 'temperature', 'value', 'need', 'services', 'created_at', 'last_activity_at', 'next_follow_up'] as const;
    const cell = (v: unknown) => `"${String(Array.isArray(v) ? v.join('; ') : v ?? '').replace(/"/g, '""')}"`;
    const csv = [cols.join(','), ...filtered.map((l) => cols.map((c) => cell(l[c])).join(','))].join('\n');
    const a = document.createElement('a');
    a.href = URL.createObjectURL(new Blob([csv], { type: 'text/csv' }));
    a.download = `bybo-leads-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(a.href);
  };

  const open = leads?.find((l) => l.id === openId) ?? null;
  const maxSource = Math.max(1, ...stats.bySource.map(([, n]) => n));

  return (
    <div className="crm-shell">
      <header className="crm-top">
        <div className="crm-brand">
          <div className="crm-logo" aria-hidden="true">B</div>
          <div>
            <p className="crm-kicker">BYBO</p>
            <h1>Leads</h1>
          </div>
        </div>
        <div className="crm-sync" title={syncedAt ? `Synced ${new Date(syncedAt).toLocaleTimeString('en-IN')}` : ''}>
          <span className={`crm-dot ${error ? 'is-bad' : syncedAt ? 'is-live' : ''}`} />
          {error ? 'Offline' : syncedAt ? `Live · synced ${ago(new Date(syncedAt).toISOString(), now)}` : 'Connecting…'}
        </div>
        <div className="crm-tools">
          <div className="crm-search">
            <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="11" cy="11" r="7" /><path d="m20 20-3.5-3.5" /></svg>
            <input id="crm-search" type="search" placeholder="Search name, company, need…  ( / )" value={query} onChange={(e) => setQuery(e.target.value)} />
          </div>
          <div className="crm-seg" role="tablist" aria-label="View">
            <button role="tab" aria-selected={view === 'board'} onClick={() => setView('board')}>Pipeline</button>
            <button role="tab" aria-selected={view === 'list'} onClick={() => setView('list')}>List</button>
          </div>
          <button className="crm-btn is-ghost" onClick={exportCsv} disabled={!filtered.length}>Export CSV</button>
          <button className="crm-btn" onClick={() => setAdding(true)}>+ Add lead</button>
        </div>
      </header>

      {error ? <p className="crm-err crm-banner">{error}</p> : null}

      <section className="crm-kpis" aria-label="Summary">
        <Kpi label="Open leads" value={leads ? String(stats.open) : '—'} sub={leads ? `${stats.hot} hot` : ''} />
        <Kpi label="New this week" value={leads ? String(stats.week) : '—'} sub={leads ? `${stats.total} all time` : ''} />
        <Kpi label="Calls booked" value={leads ? String(stats.booked) : '—'} sub="Waiting on a call" />
        <Kpi label="Pipeline value" value={leads ? inr(stats.pipeline) : '—'} sub="Open leads with a value" />
        <Kpi label="Won" value={leads ? inr(stats.wonValue) : '—'} sub={leads ? `${stats.won} deal${stats.won === 1 ? '' : 's'}` : ''} accent />
        <Kpi label="Win rate" value={leads ? (stats.winRate == null ? '—' : `${stats.winRate}%`) : '—'} sub="Of closed leads" />
      </section>

      <section className="crm-row">
        <div className="crm-panel crm-sources">
          <div className="crm-panel-head"><h2>Where leads come from</h2>{source !== 'all' ? <button className="crm-link" onClick={() => setSource('all')}>Show all</button> : null}</div>
          {stats.bySource.length ? stats.bySource.map(([s, n]) => (
            <button key={s} className={`crm-bar ${source === s ? 'is-on' : ''}`} onClick={() => setSource(source === s ? 'all' : s)}>
              <span className="crm-bar-label">{SOURCE_LABEL[s]}</span>
              <span className="crm-bar-track"><span className={`crm-bar-fill src-${s}`} style={{ width: `${(n / maxSource) * 100}%` }} /></span>
              <span className="crm-bar-n">{n}</span>
            </button>
          )) : <p className="crm-muted">No leads yet. They appear here the moment someone enquires.</p>}
        </div>
        <div className="crm-panel crm-due">
          <div className="crm-panel-head"><h2>Follow up next</h2><span className="crm-muted">{stats.due.length} due</span></div>
          {stats.due.length ? stats.due.slice(0, 5).map((l) => (
            <button key={l.id} className="crm-due-item" onClick={() => setOpenId(l.id)}>
              <span className={`crm-avatar t-${l.temperature ?? 'none'}`}>{initials(l)}</span>
              <span className="crm-due-text"><b>{display(l)}</b><small>{l.need ?? STAGE_LABEL[l.stage]}</small></span>
              <span className={`crm-due-when ${Date.parse(l.next_follow_up!) < now ? 'is-late' : ''}`}>{Date.parse(l.next_follow_up!) < now ? 'Overdue' : when(l.next_follow_up!)}</span>
            </button>
          )) : <p className="crm-muted">Nothing due. Set a follow-up date on a lead to see it here.</p>}
        </div>
      </section>

      {leads === null && !error ? (
        <div className="crm-board">{STAGES.map((s) => <div key={s.id} className="crm-col"><div className="crm-skel" /><div className="crm-skel" /></div>)}</div>
      ) : view === 'board' ? (
        <Board leads={filtered} now={now} fresh={fresh} onOpen={setOpenId} onMove={move} />
      ) : (
        <List leads={filtered} now={now} onOpen={setOpenId} />
      )}

      {open ? <Drawer key={open.id} lead={open} now={now} onClose={() => setOpenId(null)} onSaved={patchLocal} onMove={move}
        onDeleted={(id) => { setLeads((ls) => ls?.filter((l) => l.id !== id) ?? ls); setOpenId(null); setToast('Lead deleted'); }} /> : null}
      {adding ? <AddLead onClose={() => setAdding(false)} onAdded={async (id) => { setAdding(false); await load(); setOpenId(id); setToast('Lead added'); }} /> : null}
      {toast ? <div className="crm-toast" role="status">{toast}</div> : null}
    </div>
  );
}

function Kpi({ label, value, sub, accent }: { label: string; value: string; sub?: string; accent?: boolean }) {
  return (
    <div className={`crm-kpi ${accent ? 'is-accent' : ''}`}>
      <p>{label}</p>
      <strong>{value}</strong>
      {sub ? <small>{sub}</small> : null}
    </div>
  );
}

function Card({ lead, now, fresh, onOpen, draggable }: { lead: CrmLead; now: number; fresh?: boolean; onOpen: () => void; draggable?: boolean }) {
  return (
    <button
      className={`crm-card ${fresh ? 'is-fresh' : ''}`}
      onClick={onOpen}
      draggable={draggable}
      onDragStart={(e) => { e.dataTransfer.setData('text/plain', lead.id); e.dataTransfer.effectAllowed = 'move'; e.currentTarget.classList.add('is-dragging'); }}
      onDragEnd={(e) => e.currentTarget.classList.remove('is-dragging')}
    >
      <span className="crm-card-top">
        <span className={`crm-avatar t-${lead.temperature ?? 'none'}`}>{initials(lead)}</span>
        <span className="crm-card-name"><b>{display(lead)}</b>{lead.company && lead.name ? <small>{lead.company}</small> : null}</span>
        {lead.temperature === 'hot' ? <span className="crm-hot" title="Hot lead">●</span> : null}
      </span>
      {lead.need ? <span className="crm-card-need">{lead.need}</span> : null}
      <span className="crm-card-foot">
        <span className={`crm-chip src-${lead.source}`}>{SOURCE_LABEL[lead.source]}</span>
        {lead.value ? <span className="crm-card-value">{inr(lead.value)}</span> : null}
        <span className="crm-card-ago">{ago(lead.last_activity_at, now)}</span>
      </span>
    </button>
  );
}

function Board({ leads, now, fresh, onOpen, onMove }: { leads: CrmLead[]; now: number; fresh: Set<string>; onOpen: (id: string) => void; onMove: (id: string, s: Stage) => void }) {
  const [over, setOver] = useState<Stage | null>(null);
  return (
    <div className="crm-board">
      {STAGES.map((s) => {
        const col = leads.filter((l) => l.stage === s.id);
        const total = col.reduce((t, l) => t + (l.value ?? 0), 0);
        return (
          <section
            key={s.id}
            className={`crm-col stage-${s.id} ${over === s.id ? 'is-over' : ''}`}
            onDragOver={(e) => { e.preventDefault(); setOver(s.id); }}
            onDragLeave={() => setOver((o) => (o === s.id ? null : o))}
            onDrop={(e) => { e.preventDefault(); setOver(null); const id = e.dataTransfer.getData('text/plain'); if (id) onMove(id, s.id); }}
            aria-label={`${s.label}, ${col.length} leads`}
          >
            <header className="crm-col-head">
              <span className="crm-col-dot" />
              <h2>{s.label}</h2>
              <span className="crm-col-n">{col.length}</span>
              {total ? <span className="crm-col-v">{inr(total)}</span> : null}
            </header>
            <div className="crm-col-body">
              {col.map((l) => <Card key={l.id} lead={l} now={now} fresh={fresh.has(l.id)} onOpen={() => onOpen(l.id)} draggable />)}
              {!col.length ? <p className="crm-col-empty">Drop a lead here</p> : null}
            </div>
          </section>
        );
      })}
    </div>
  );
}

type SortKey = 'last_activity_at' | 'created_at' | 'name' | 'value' | 'stage';

function List({ leads, now, onOpen }: { leads: CrmLead[]; now: number; onOpen: (id: string) => void }) {
  const [sort, setSort] = useState<{ key: SortKey; dir: 1 | -1 }>({ key: 'last_activity_at', dir: -1 });
  const order = STAGES.map((s) => s.id);
  const rows = [...leads].sort((a, b) => {
    const k = sort.key;
    const av = k === 'stage' ? order.indexOf(a.stage) : k === 'value' ? a.value ?? -1 : k === 'name' ? display(a).toLowerCase() : Date.parse(a[k]);
    const bv = k === 'stage' ? order.indexOf(b.stage) : k === 'value' ? b.value ?? -1 : k === 'name' ? display(b).toLowerCase() : Date.parse(b[k]);
    return (av < bv ? -1 : av > bv ? 1 : 0) * sort.dir;
  });
  const th = (key: SortKey, label: string) => (
    <th aria-sort={sort.key === key ? (sort.dir === 1 ? 'ascending' : 'descending') : 'none'}>
      <button onClick={() => setSort((s) => ({ key, dir: s.key === key ? (s.dir === 1 ? -1 : 1) : key === 'name' ? 1 : -1 }))}>
        {label}{sort.key === key ? (sort.dir === 1 ? ' ↑' : ' ↓') : ''}
      </button>
    </th>
  );
  if (!rows.length) return <div className="crm-panel"><p className="crm-muted">No leads match.</p></div>;
  return (
    <div className="crm-panel crm-table-wrap">
      <table className="crm-table">
        <thead><tr>{th('name', 'Lead')}<th>Contact</th><th>Source</th>{th('stage', 'Stage')}{th('value', 'Value')}{th('created_at', 'Created')}{th('last_activity_at', 'Last activity')}</tr></thead>
        <tbody>
          {rows.map((l) => (
            <tr key={l.id} onClick={() => onOpen(l.id)} tabIndex={0} onKeyDown={(e) => { if (e.key === 'Enter') onOpen(l.id); }}>
              <td><span className="crm-cell-lead"><span className={`crm-avatar t-${l.temperature ?? 'none'}`}>{initials(l)}</span><span><b>{display(l)}</b><small>{l.need ?? l.company ?? ''}</small></span></span></td>
              <td><small>{l.email}<br />{l.phone}</small></td>
              <td><span className={`crm-chip src-${l.source}`}>{SOURCE_LABEL[l.source]}</span></td>
              <td><span className={`crm-stage stage-${l.stage}`}>{STAGE_LABEL[l.stage]}</span></td>
              <td>{l.value ? inr(l.value) : '—'}</td>
              <td>{ago(l.created_at, now)}</td>
              <td>{ago(l.last_activity_at, now)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const EVENT_ICON: Record<string, string> = {
  created: '✦', enquiry: '✉', meta: 'ⓜ', brief: '❏', summary: '✎', alert: '⚡', booking: '◷', call: '☏',
  payment: '₹', paid: '✓', stage: '→', note: '✐', edit: '✎', manual: '+',
};

function Drawer({ lead, now, onClose, onSaved, onMove, onDeleted }: {
  lead: CrmLead; now: number; onClose: () => void; onSaved: (l: CrmLead) => void; onMove: (id: string, s: Stage) => void; onDeleted: (id: string) => void;
}) {
  const [events, setEvents] = useState<CrmEvent[] | null>(null);
  const initial = {
    name: lead.name ?? '', email: lead.email ?? '', phone: lead.phone ?? '', company: lead.company ?? '', need: lead.need ?? '',
    value: lead.value != null ? String(lead.value) : '', temperature: lead.temperature ?? '',
    next_follow_up: lead.next_follow_up ? localInput(lead.next_follow_up) : '',
  };
  const [form, setForm] = useState(initial);
  const [note, setNote] = useState('');
  const [saving, setSaving] = useState(false);
  const [err, setErr] = useState('');
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [openTranscript, setOpenTranscript] = useState<string | null>(null);

  useEffect(() => {
    let live = true;
    api<{ events: CrmEvent[] }>(`/api/admin/crm/leads/${lead.id}`)
      .then((d) => { if (live) setEvents(d.events); })
      .catch(() => { if (live) setEvents((ev) => ev ?? []); });
    return () => { live = false; };
  }, [lead.id, lead.last_activity_at]);

  const dirty = (Object.keys(initial) as (keyof typeof initial)[]).some((k) => form[k] !== initial[k]);

  async function save(e?: FormEvent) {
    e?.preventDefault();
    setSaving(true);
    setErr('');
    try {
      const { lead: updated } = await api<{ lead: CrmLead }>(`/api/admin/crm/leads/${lead.id}`, {
        method: 'PATCH',
        body: JSON.stringify({ ...form, next_follow_up: form.next_follow_up ? new Date(form.next_follow_up).toISOString() : '' }),
      });
      onSaved(updated);
    } catch (x) {
      setErr((x as Error).message === 'invalid_email' ? 'That email doesn’t look right.' : 'Couldn’t save. Try again.');
    }
    setSaving(false);
  }

  async function addNote(e: FormEvent) {
    e.preventDefault();
    if (!note.trim()) return;
    const body = note.trim();
    setNote('');
    try {
      const { event } = await api<{ event: CrmEvent }>(`/api/admin/crm/leads/${lead.id}/notes`, { method: 'POST', body: JSON.stringify({ body }) });
      setEvents((ev) => [event, ...(ev ?? [])]);
      onSaved({ ...lead, last_activity_at: event.created_at });
    } catch {
      setNote(body);
      setErr('Couldn’t add the note.');
    }
  }

  async function remove() {
    try { await api(`/api/admin/crm/leads/${lead.id}`, { method: 'DELETE' }); onDeleted(lead.id); }
    catch { setErr('Couldn’t delete. Try again.'); }
  }

  const set = (k: keyof typeof form) => (e: { target: { value: string } }) => setForm((f) => ({ ...f, [k]: e.target.value }));
  const first = (lead.name ?? '').split(' ')[0];

  return (
    <div className="crm-overlay" onMouseDown={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <aside className="crm-drawer" role="dialog" aria-modal="true" aria-label={display(lead)}>
        <header className="crm-drawer-head">
          <span className={`crm-avatar is-lg t-${lead.temperature ?? 'none'}`}>{initials(lead)}</span>
          <div className="crm-drawer-title">
            <h2>{display(lead)}</h2>
            <p>{[lead.company && lead.name ? lead.company : '', SOURCE_LABEL[lead.source], `added ${ago(lead.created_at, now)}`].filter(Boolean).join(' · ')}</p>
          </div>
          <button className="crm-x" onClick={onClose} aria-label="Close">×</button>
        </header>

        <div className="crm-quick">
          {lead.email ? <a className="crm-btn is-ghost" href={`mailto:${lead.email}?subject=${encodeURIComponent('BYBO: following up')}&body=${encodeURIComponent(`Hi ${first || 'there'},\n\n`)}`}>Email</a> : null}
          {lead.phone ? <a className="crm-btn is-ghost" href={waLink(lead.phone)} target="_blank" rel="noreferrer">WhatsApp</a> : null}
          {lead.phone ? <a className="crm-btn is-ghost" href={`tel:${lead.phone}`}>Call</a> : null}
        </div>

        <div className="crm-stages" role="radiogroup" aria-label="Stage">
          {STAGES.map((s) => (
            <button key={s.id} role="radio" aria-checked={lead.stage === s.id} className={`crm-stage-pill stage-${s.id} ${lead.stage === s.id ? 'is-on' : ''}`} onClick={() => onMove(lead.id, s.id)}>{s.label}</button>
          ))}
        </div>

        {lead.summary ? <div className="crm-summary"><p className="crm-label">Summary</p><p>{lead.summary}</p></div> : null}
        {lead.services.length ? <div className="crm-tags">{lead.services.map((s) => <span key={s} className="crm-tag">{s}</span>)}</div> : null}

        <form className="crm-form" onSubmit={save}>
          <label>Name<input value={form.name} onChange={set('name')} /></label>
          <label>Company<input value={form.company} onChange={set('company')} /></label>
          <label>Email<input type="email" value={form.email} onChange={set('email')} /></label>
          <label>Phone<input value={form.phone} onChange={set('phone')} /></label>
          <label className="is-wide">Need<input value={form.need} onChange={set('need')} placeholder="What they want, in one line" /></label>
          <label>Deal value (₹)<input inputMode="numeric" value={form.value} onChange={(e) => setForm((f) => ({ ...f, value: e.target.value.replace(/[^\d.]/g, '') }))} placeholder="0" /></label>
          <label>Temperature
            <select value={form.temperature} onChange={set('temperature')}>
              <option value="">Not set</option><option value="hot">Hot</option><option value="warm">Warm</option><option value="cold">Cold</option>
            </select>
          </label>
          <label className="is-wide">Next follow-up<input type="datetime-local" value={form.next_follow_up} onChange={set('next_follow_up')} /></label>
          {err ? <p className="crm-err is-wide" role="alert">{err}</p> : null}
          <div className="crm-form-foot is-wide">
            <button className="crm-btn" type="submit" disabled={!dirty || saving}>{saving ? 'Saving…' : dirty ? 'Save changes' : 'Saved'}</button>
          </div>
        </form>

        <form className="crm-note" onSubmit={addNote}>
          <textarea value={note} onChange={(e) => setNote(e.target.value)} placeholder="Add a note: what was said, what's next…" rows={2}
            onKeyDown={(e) => { if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) addNote(e); }} />
          <button className="crm-btn" type="submit" disabled={!note.trim()}>Add note</button>
        </form>

        <section className="crm-timeline" aria-label="Activity">
          <p className="crm-label">Activity</p>
          {events === null ? <div className="crm-skel" /> : events.length ? (
            <ol>
              {events.map((ev) => {
                const transcript = typeof ev.meta?.transcript === 'string' ? ev.meta.transcript : '';
                return (
                  <li key={ev.id} className={`ev-${ev.kind}`}>
                    <span className="crm-ev-icon" aria-hidden="true">{EVENT_ICON[ev.kind] ?? '•'}</span>
                    <div>
                      <p className="crm-ev-title"><b>{ev.title}</b><time dateTime={ev.created_at} title={when(ev.created_at)}>{ago(ev.created_at, now)}</time></p>
                      {ev.body ? <p className="crm-ev-body">{ev.body}</p> : null}
                      {transcript ? (
                        <>
                          <button className="crm-link" onClick={() => setOpenTranscript(openTranscript === ev.id ? null : ev.id)}>{openTranscript === ev.id ? 'Hide conversation' : 'Show conversation'}</button>
                          {openTranscript === ev.id ? <pre className="crm-transcript">{transcript}</pre> : null}
                        </>
                      ) : null}
                    </div>
                  </li>
                );
              })}
            </ol>
          ) : <p className="crm-muted">No activity yet.</p>}
        </section>

        <footer className="crm-drawer-foot">
          {confirmDelete ? (
            <span className="crm-confirm">Delete this lead and its history? <button className="crm-btn is-danger" onClick={remove}>Delete</button><button className="crm-btn is-ghost" onClick={() => setConfirmDelete(false)}>Keep</button></span>
          ) : <button className="crm-link is-danger" onClick={() => setConfirmDelete(true)}>Delete lead</button>}
        </footer>
      </aside>
    </div>
  );
}

function AddLead({ onClose, onAdded }: { onClose: () => void; onAdded: (id: string) => void }) {
  const [f, setF] = useState({ name: '', company: '', email: '', phone: '', need: '', value: '', stage: 'new' as Stage, note: '' });
  const [err, setErr] = useState('');
  const [busy, setBusy] = useState(false);
  const set = (k: keyof typeof f) => (e: { target: { value: string } }) => setF((x) => ({ ...x, [k]: e.target.value }));

  async function submit(e: FormEvent) {
    e.preventDefault();
    if (!f.name.trim() && !f.email.trim() && !f.phone.trim()) { setErr('Add at least a name, email or phone.'); return; }
    setBusy(true);
    setErr('');
    try {
      const { id } = await api<{ id: string }>('/api/admin/crm/leads', { method: 'POST', body: JSON.stringify(f) });
      onAdded(id);
    } catch (x) {
      setErr((x as Error).message === 'invalid_email' ? 'That email doesn’t look right.' : 'Couldn’t add the lead.');
      setBusy(false);
    }
  }

  return (
    <div className="crm-overlay is-center" onMouseDown={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <form className="crm-modal" onSubmit={submit} role="dialog" aria-modal="true" aria-label="Add a lead">
        <header className="crm-drawer-head"><div className="crm-drawer-title"><h2>Add a lead</h2><p>From a call, a referral or a DM. If the email already exists, it merges.</p></div><button type="button" className="crm-x" onClick={onClose} aria-label="Close">×</button></header>
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
