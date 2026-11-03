'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import type { CrmLead, Source, Stage } from '@/lib/crm/db';
import { Drawer } from './Drawer';
import { AutopilotSection } from './autopilot';
import {
  ActivitySection, AddLead, AutomationsSection, Board, CallsSection, ChatsSection, InstagramSection, List, OverviewSection, PaymentsSection, SystemSection,
} from './sections';
import { ago, api, display, SOURCE_LABEL, STAGE_LABEL, type Overview } from './shared';

const POLL_MS = 20_000;

const NAV = [
  { id: 'overview', label: 'Overview', icon: '◎' },
  { id: 'autopilot', label: 'Autopilot', icon: '⚡' },
  { id: 'pipeline', label: 'Pipeline', icon: '▥' },
  { id: 'leads', label: 'Leads', icon: '☰' },
  { id: 'activity', label: 'Activity', icon: '↯' },
  { id: 'calls', label: 'Calls', icon: '☏' },
  { id: 'payments', label: 'Payments', icon: '₹' },
  { id: 'chats', label: 'B chats', icon: '✦' },
  { id: 'instagram', label: 'Instagram', icon: '◈' },
  { id: 'automations', label: 'Automations', icon: '⟳' },
  { id: 'system', label: 'System', icon: '⚙' },
] as const;
type SectionId = (typeof NAV)[number]['id'];
const isSection = (v: string): v is SectionId => NAV.some((n) => n.id === v);

export function CrmApp() {
  const [leads, setLeads] = useState<CrmLead[] | null>(null);
  const [extra, setExtra] = useState<Overview | null>(null);
  const [error, setError] = useState('');
  const [syncedAt, setSyncedAt] = useState(0);
  const [now, setNow] = useState(() => Date.now());
  const [section, setSection] = useState<SectionId>('overview');
  const [query, setQuery] = useState('');
  const [source, setSource] = useState<Source | 'all'>('all');
  const [stageFilter, setStageFilter] = useState<Stage | 'all'>('all');
  const [openId, setOpenId] = useState<string | null>(null);
  const [adding, setAdding] = useState(false);
  const [toast, setToast] = useState('');
  const seen = useRef<Set<string> | null>(null);
  const [fresh, setFresh] = useState<Set<string>>(new Set());

  const load = useCallback(async () => {
    const [l, o] = await Promise.allSettled([
      api<{ leads: CrmLead[] }>('/api/admin/crm/leads', { cache: 'no-store' }),
      api<Overview>('/api/admin/crm/overview', { cache: 'no-store' }),
    ]);
    if (o.status === 'fulfilled') setExtra(o.value);
    if (l.status === 'fulfilled') {
      const data = l.value;
      if (seen.current) {
        const added = data.leads.filter((x) => !seen.current!.has(x.id)).map((x) => x.id);
        if (added.length) { setFresh(new Set(added)); setToast(added.length === 1 ? 'New lead just came in' : `${added.length} new leads just came in`); }
      }
      seen.current = new Set(data.leads.map((x) => x.id));
      setLeads(data.leads);
      setSyncedAt(Date.now());
      setError('');
    } else {
      setError((l.reason as Error).message === 'HTTP 401' ? 'Your session ended. Refresh to sign in again.' : 'Couldn’t reach the lead database. Retrying…');
    }
  }, []);

  useEffect(() => {
    const fromHash = () => { const h = window.location.hash.slice(1); if (isSection(h)) setSection(h); };
    window.addEventListener('hashchange', fromHash);
    const first = setTimeout(() => { fromHash(); load(); }, 0);
    const poll = setInterval(() => { if (document.visibilityState === 'visible') load(); }, POLL_MS);
    const tick = setInterval(() => setNow(Date.now()), 5000);
    const onFocus = () => load();
    window.addEventListener('focus', onFocus);
    return () => { clearTimeout(first); clearInterval(poll); clearInterval(tick); window.removeEventListener('focus', onFocus); window.removeEventListener('hashchange', fromHash); };
  }, [load]);

  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(''), 4500);
    return () => clearTimeout(t);
  }, [toast]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') { setOpenId(null); setAdding(false); }
      if (e.key === '/' && !(e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement || e.target instanceof HTMLSelectElement)) {
        e.preventDefault();
        document.getElementById('crm-search')?.focus();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const go = (id: string, src?: Source) => {
    if (!isSection(id)) return;
    setSection(id);
    if (src) setSource(src);
    history.replaceState(null, '', `#${id}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const patchLocal = (lead: CrmLead) => setLeads((ls) => ls?.map((l) => (l.id === lead.id ? { ...l, ...lead } : l)) ?? ls);

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
    return (leads ?? []).filter((l) => (source === 'all' || l.source === source) && (stageFilter === 'all' || l.stage === stageFilter)
      && (!q || [l.name, l.email, l.phone, l.company, l.need, l.summary, ...l.services].some((v) => v?.toLowerCase().includes(q))));
  }, [leads, query, source, stageFilter]);

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

  const feed = extra?.feed ?? [];
  const open = leads?.find((l) => l.id === openId) ?? null;
  const counts: Partial<Record<SectionId, number>> = {
    autopilot: leads?.filter((l) => l.autopilot === 'awaiting_approval' || l.autopilot === 'needs_review').length,
    pipeline: leads?.filter((l) => l.stage === 'new').length,
    calls: feed.filter((f) => f.kind === 'booking' && Date.parse(String(f.meta?.slot ?? '')) >= now).length,
    automations: extra?.automations.filter((a) => !a.on).length,
    system: extra?.health.filter((h) => !h.ok).length,
  };
  const title = NAV.find((n) => n.id === section)!.label;
  const filtersOn = section === 'pipeline' || section === 'leads';

  return (
    <div className="crm-app">
      <nav className="crm-nav" aria-label="Sections">
        <div className="crm-brand">
          <div className="crm-logo" aria-hidden="true">B</div>
          <div><p className="crm-kicker">BYBO</p><p className="crm-brand-name">Command</p></div>
        </div>
        <ul>
          {NAV.map((n) => (
            <li key={n.id}>
              <a href={`#${n.id}`} aria-current={section === n.id ? 'page' : undefined} onClick={(e) => { e.preventDefault(); go(n.id); }}>
                <span className="crm-nav-icon" aria-hidden="true">{n.icon}</span>{n.label}
                {counts[n.id] ? <span className={`crm-nav-n ${n.id === 'system' || n.id === 'automations' || n.id === 'autopilot' ? 'is-warn' : ''}`}>{counts[n.id]}</span> : null}
              </a>
            </li>
          ))}
        </ul>
        <div className="crm-nav-foot">
          <a href="/admin/instagram">Instagram desk ↗</a>
          <a href="/pay" target="_blank" rel="noreferrer">bybo.in/pay ↗</a>
          <a href="/" target="_blank" rel="noreferrer">bybo.in ↗</a>
        </div>
      </nav>

      <div className="crm-main">
        <header className="crm-top">
          <div>
            <h1>{title}</h1>
            <div className="crm-sync" title={syncedAt ? `Synced ${new Date(syncedAt).toLocaleTimeString('en-IN')}` : ''}>
              <span className={`crm-dot ${error ? 'is-bad' : syncedAt ? 'is-live' : ''}`} />
              {error ? 'Offline' : syncedAt ? `Live · synced ${ago(new Date(syncedAt).toISOString(), now)}` : 'Connecting…'}
            </div>
          </div>
          <div className="crm-tools">
            <div className="crm-search">
              <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="11" cy="11" r="7" /><path d="m20 20-3.5-3.5" /></svg>
              <input id="crm-search" type="search" placeholder="Search leads…  ( / )" value={query}
                onChange={(e) => { setQuery(e.target.value); if (e.target.value && !filtersOn) go('leads'); }} />
            </div>
            <button className="crm-btn is-ghost" onClick={exportCsv} disabled={!filtered.length}>Export CSV</button>
            <button className="crm-btn" onClick={() => setAdding(true)}>+ Add lead</button>
          </div>
        </header>

        {error ? <p className="crm-err crm-banner">{error}</p> : null}

        {filtersOn ? (
          <div className="crm-filters">
            <select value={source} onChange={(e) => setSource(e.target.value as Source | 'all')} aria-label="Source">
              <option value="all">All sources</option>
              {(Object.keys(SOURCE_LABEL) as Source[]).map((s) => <option key={s} value={s}>{SOURCE_LABEL[s]}</option>)}
            </select>
            {section === 'leads' ? (
              <select value={stageFilter} onChange={(e) => setStageFilter(e.target.value as Stage | 'all')} aria-label="Stage">
                <option value="all">All stages</option>
                {(Object.keys(STAGE_LABEL) as Stage[]).map((s) => <option key={s} value={s}>{STAGE_LABEL[s]}</option>)}
              </select>
            ) : null}
            <span className="crm-muted">{filtered.length} lead{filtered.length === 1 ? '' : 's'}</span>
            {source !== 'all' || stageFilter !== 'all' || query ? <button className="crm-link" onClick={() => { setSource('all'); setStageFilter('all'); setQuery(''); }}>Clear filters</button> : null}
          </div>
        ) : null}

        {leads === null && !error ? (
          <div className="crm-kpis">{Array.from({ length: 6 }, (_, i) => <div key={i} className="crm-skel" />)}</div>
        ) : (
          <>
            {section === 'overview' ? <OverviewSection leads={leads ?? []} demos={extra?.demos ?? []} onToast={setToast} onChanged={load} feed={feed} queue={extra?.queue ?? null} health={extra?.health ?? []} now={now} onOpen={setOpenId} go={go} /> : null}
            {section === 'autopilot' ? <AutopilotSection leads={leads ?? []} now={now} onOpen={setOpenId} onToast={setToast} onChanged={load} /> : null}
            {section === 'pipeline' ? <Board leads={filtered} now={now} fresh={fresh} onOpen={setOpenId} onMove={move} /> : null}
            {section === 'leads' ? <List leads={filtered} now={now} onOpen={setOpenId} /> : null}
            {section === 'activity' ? <ActivitySection feed={feed} now={now} onOpen={setOpenId} /> : null}
            {section === 'calls' ? <CallsSection feed={feed} queue={extra?.queue ?? null} now={now} onOpen={setOpenId} /> : null}
            {section === 'payments' ? <PaymentsSection feed={feed} products={extra?.products ?? []} now={now} onOpen={setOpenId} onToast={setToast} /> : null}
            {section === 'chats' ? <ChatsSection feed={feed} now={now} onOpen={setOpenId} /> : null}
            {section === 'instagram' ? <InstagramSection ig={extra?.ig ?? null} feed={feed} now={now} /> : null}
            {section === 'automations' ? <AutomationsSection automations={extra?.automations ?? []} onDone={(m) => { setToast(m); load(); }} /> : null}
            {section === 'system' ? <SystemSection health={extra?.health ?? []} /> : null}
          </>
        )}
      </div>

      {open ? <Drawer key={open.id} lead={open} now={now} products={extra?.products ?? []} slots={extra?.slots ?? []} demos={extra?.demos ?? []} onChanged={load} onClose={() => setOpenId(null)} onSaved={patchLocal} onMove={move} onToast={setToast}
        onDeleted={(id) => { setLeads((ls) => ls?.filter((l) => l.id !== id) ?? ls); setOpenId(null); setToast('Lead deleted'); }} /> : null}
      {adding ? <AddLead onClose={() => setAdding(false)} onAdded={async (id) => { setAdding(false); await load(); setOpenId(id); setToast('Lead added'); }} /> : null}
      {toast ? <div className="crm-toast" role="status">{toast}</div> : null}
    </div>
  );
}
