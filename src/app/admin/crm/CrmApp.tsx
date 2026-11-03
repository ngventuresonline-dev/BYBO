'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import type { CrmLead, Source, Stage } from '@/lib/crm/db';
import { Drawer } from './Drawer';
import { AutopilotSection } from './autopilot';
import { Icon, type IconName } from './icons';
import { CommandPalette, type PaletteCommand } from './palette';
import { ProposalsSection } from './proposals';
import {
  ActivitySection, AddLead, AutomationsSection, Board, CallsSection, ChatsSection, InstagramSection, List, PaymentsSection, SystemSection,
} from './sections';
import { ago, api, DAY, display, SOURCE_LABEL, STAGE_LABEL, until, type Overview } from './shared';
import { TodaySection } from './today';
import './crm-v3.css';

const POLL_MS = 20_000;

// `overview` stays the id for Today so old #overview links still land here.
const NAV = [
  { id: 'overview', label: 'Today', icon: 'today', group: 'Workspace', blurb: 'What needs you now' },
  { id: 'pipeline', label: 'Pipeline', icon: 'pipeline', group: 'Workspace', blurb: 'Drag leads between stages' },
  { id: 'leads', label: 'Leads', icon: 'leads', group: 'Workspace', blurb: 'Every lead, sortable' },
  { id: 'proposals', label: 'Proposals', icon: 'proposals', group: 'Workspace', blurb: 'Blueprints and quotes' },
  { id: 'autopilot', label: 'Autopilot', icon: 'autopilot', group: 'Engage', blurb: 'Research, demos and approvals' },
  { id: 'calls', label: 'Calls', icon: 'calls', group: 'Engage', blurb: 'Discovery calls and the AI queue' },
  { id: 'chats', label: 'B chats', icon: 'chats', group: 'Engage', blurb: 'Briefs, summaries and alerts from B' },
  { id: 'instagram', label: 'Instagram', icon: 'instagram', group: 'Engage', blurb: 'Posts and Meta form leads' },
  { id: 'activity', label: 'Activity', icon: 'activity', group: 'Engage', blurb: 'Everything that happened, by day' },
  { id: 'payments', label: 'Payments', icon: 'payments', group: 'Money', blurb: 'Collected, pending and links' },
  { id: 'automations', label: 'Automations', icon: 'automations', group: 'Settings', blurb: 'What runs on its own' },
  { id: 'system', label: 'System', icon: 'system', group: 'Settings', blurb: 'Connected services' },
] as const satisfies readonly { id: string; label: string; icon: IconName; group: string; blurb: string }[];
type SectionId = (typeof NAV)[number]['id'];
const GROUPS = ['Workspace', 'Engage', 'Money', 'Settings'] as const;
const MOBILE: SectionId[] = ['overview', 'pipeline', 'leads', 'autopilot'];
const isSection = (v: string): v is SectionId => NAV.some((n) => n.id === v);
const typing = (t: EventTarget | null) => t instanceof HTMLInputElement || t instanceof HTMLTextAreaElement || t instanceof HTMLSelectElement || (t instanceof HTMLElement && t.isContentEditable);

type Notice = { id: string; lead: string; kind: 'demo' | 'late' | 'call' | 'new'; title: string; sub: string };

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
  const [palette, setPalette] = useState(false);
  const [menu, setMenu] = useState<'new' | 'bell' | null>(null);
  const [sheet, setSheet] = useState(false);
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
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') { e.preventDefault(); setPalette((p) => !p); setMenu(null); return; }
      if (e.key === 'Escape') { setOpenId(null); setAdding(false); setMenu(null); setSheet(false); }
      if (e.key === '/' && !typing(e.target)) { e.preventDefault(); setPalette(true); }
    };
    const onClick = (e: MouseEvent) => { if (!(e.target as HTMLElement).closest('.crm-pop-wrap')) setMenu(null); };
    window.addEventListener('keydown', onKey);
    window.addEventListener('mousedown', onClick);
    return () => { window.removeEventListener('keydown', onKey); window.removeEventListener('mousedown', onClick); };
  }, []);

  const go = useCallback((id: string, src?: Source) => {
    if (!isSection(id)) return;
    setSection(id);
    setSheet(false);
    if (src) setSource(src);
    history.replaceState(null, '', `#${id}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

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

  const exportCsv = useCallback(() => {
    const cols = ['name', 'email', 'phone', 'company', 'source', 'stage', 'temperature', 'value', 'need', 'services', 'created_at', 'last_activity_at', 'next_follow_up'] as const;
    const cell = (v: unknown) => `"${String(Array.isArray(v) ? v.join('; ') : v ?? '').replace(/"/g, '""')}"`;
    const csv = [cols.join(','), ...filtered.map((l) => cols.map((c) => cell(l[c])).join(','))].join('\n');
    const a = document.createElement('a');
    a.href = URL.createObjectURL(new Blob([csv], { type: 'text/csv' }));
    a.download = `bybo-leads-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(a.href);
  }, [filtered]);

  const signOut = useCallback(async () => {
    await fetch('/api/admin/instagram/session', { method: 'DELETE' }).catch(() => null);
    window.location.reload();
  }, []);

  const runAutopilot = useCallback(async () => {
    setToast('Running autopilot…');
    try { setToast((await api<{ message: string }>('/api/admin/crm/run', { method: 'POST', body: JSON.stringify({ job: 'autopilot' }) })).message); load(); }
    catch (x) { setToast((x as Error & { data?: { message?: string } }).data?.message || 'Autopilot didn’t run. Check System.'); }
  }, [load]);

  const feed = useMemo(() => extra?.feed ?? [], [extra]);
  const demos = useMemo(() => extra?.demos ?? [], [extra]);
  const open = leads?.find((l) => l.id === openId) ?? null;

  const notices = useMemo(() => {
    const out: Notice[] = [];
    const byId = new Map((leads ?? []).map((l) => [l.id, l]));
    for (const d of demos.filter((x) => x.status === 'awaiting_approval')) {
      const l = byId.get(d.lead_id);
      out.push({ id: `d-${d.id}`, lead: d.lead_id, kind: 'demo', title: `Approve demo for ${l ? display(l) : d.content.brand ?? 'a lead'}`, sub: `Drafted ${ago(d.created_at, now)}` });
    }
    for (const l of leads ?? []) {
      if (l.stage !== 'won' && l.stage !== 'lost' && l.next_follow_up && Date.parse(l.next_follow_up) < now) out.push({ id: `f-${l.id}`, lead: l.id, kind: 'late', title: `Follow up with ${display(l)}`, sub: `Overdue since ${ago(l.next_follow_up, now)}` });
    }
    for (const f of feed) {
      const at = Date.parse(String(f.meta?.slot ?? ''));
      if (f.kind === 'booking' && at >= now && at <= now + DAY) out.push({ id: `c-${f.id}`, lead: f.lead_id, kind: 'call', title: `Call with ${f.lead_name || f.lead_company || 'a lead'}`, sub: until(new Date(at).toISOString(), now) });
    }
    const today = new Date(now); today.setHours(0, 0, 0, 0);
    for (const l of leads ?? []) if (Date.parse(l.created_at) >= today.getTime()) out.push({ id: `n-${l.id}`, lead: l.id, kind: 'new', title: `New lead: ${display(l)}`, sub: `${SOURCE_LABEL[l.source]} · ${ago(l.created_at, now)}` });
    return out;
  }, [leads, demos, feed, now]);

  const counts: Partial<Record<SectionId, number>> = {
    overview: notices.filter((n) => n.kind === 'late' || n.kind === 'demo').length,
    autopilot: leads?.filter((l) => l.autopilot === 'awaiting_approval' || l.autopilot === 'needs_review').length,
    pipeline: leads?.filter((l) => l.stage === 'new').length,
    proposals: leads?.filter((l) => l.stage === 'proposal').length,
    calls: feed.filter((f) => f.kind === 'booking' && Date.parse(String(f.meta?.slot ?? '')) >= now).length,
    automations: extra?.automations.filter((a) => !a.on).length,
    system: extra?.health.filter((h) => !h.ok).length,
  };
  const warn = (id: SectionId) => id === 'system' || id === 'automations' || id === 'autopilot' || id === 'overview';
  const current = NAV.find((n) => n.id === section)!;
  const filtersOn = section === 'pipeline' || section === 'leads';

  const sectionCmds: PaletteCommand[] = useMemo(() => NAV.map((n) => ({ id: n.id, label: n.label, icon: n.icon, hint: n.blurb, run: () => go(n.id) })), [go]);
  const actionCmds: PaletteCommand[] = useMemo(() => [
    { id: 'add', label: 'Add lead', icon: 'plus', hint: 'From a call, referral or DM', run: () => setAdding(true) },
    { id: 'proposal', label: 'New proposal', icon: 'proposals', hint: 'Open Proposals', run: () => go('proposals') },
    { id: 'autopilot', label: 'Run autopilot', icon: 'autopilot', hint: 'Research and draft demos now', run: runAutopilot },
    { id: 'csv', label: 'Export CSV', icon: 'download', hint: 'Leads in the current filter', run: exportCsv },
    { id: 'signout', label: 'Sign out', icon: 'logout', hint: 'End this admin session', run: signOut },
  ], [go, runAutopilot, exportCsv, signOut]);

  const NOTICE_ICON: Record<Notice['kind'], IconName> = { demo: 'autopilot', late: 'clock', call: 'calls', new: 'sparkle' };

  return (
    <div className={`crm-app v3 ${sheet ? 'is-sheet' : ''}`}>
      <nav className="crm-side" aria-label="Sections">
        <div className="crm-side-brand">
          <div className="crm-logo" aria-hidden="true">B</div>
          <div className="crm-side-label"><p className="crm-brand-name">BYBO</p><p className="crm-brand-sub">Command desk</p></div>
          <button className="crm-iconbtn crm-side-close" onClick={() => setSheet(false)} aria-label="Close menu"><Icon name="close" size={16} /></button>
        </div>
        <button className="crm-side-search" onClick={() => setPalette(true)}>
          <Icon name="search" size={16} /><span className="crm-side-label">Search or jump…</span><kbd className="crm-side-label">Ctrl K</kbd>
        </button>
        <div className="crm-side-scroll">
          {GROUPS.map((g) => (
            <div key={g} className="crm-side-group">
              <p className="crm-side-head crm-side-label">{g}</p>
              <ul>
                {NAV.filter((n) => n.group === g).map((n) => (
                  <li key={n.id}>
                    <a href={`#${n.id}`} title={n.label} aria-current={section === n.id ? 'page' : undefined} onClick={(e) => { e.preventDefault(); go(n.id); }}>
                      <Icon name={n.icon} size={17} /><span className="crm-side-label">{n.label}</span>
                      {counts[n.id] ? <span className={`crm-badge ${warn(n.id) ? 'is-warn' : ''}`}>{counts[n.id]}</span> : null}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          <div className="crm-side-group crm-side-links">
            <p className="crm-side-head crm-side-label">Links</p>
            <a href="/admin/instagram" title="Instagram desk"><Icon name="external" size={15} /><span className="crm-side-label">Instagram desk</span></a>
            <a href="/pay" target="_blank" rel="noreferrer" title="bybo.in/pay"><Icon name="external" size={15} /><span className="crm-side-label">bybo.in/pay</span></a>
            <a href="/" target="_blank" rel="noreferrer" title="bybo.in"><Icon name="external" size={15} /><span className="crm-side-label">bybo.in</span></a>
          </div>
        </div>
        <div className="crm-side-foot">
          <span className="crm-avatar crm-me" aria-hidden="true">BT</span>
          <span className="crm-side-label crm-me-text"><b>BYBO team</b><small>Admin</small></span>
          <button className="crm-iconbtn" onClick={signOut} title="Sign out" aria-label="Sign out"><Icon name="logout" size={16} /></button>
        </div>
      </nav>
      {sheet ? <div className="crm-sheet-scrim" onClick={() => setSheet(false)} /> : null}

      <div className="crm-main">
        <header className="crm-bar-top">
          <div className="crm-title">
            <h1>{current.label}</h1>
            <span className="crm-sync" title={syncedAt ? `Synced ${new Date(syncedAt).toLocaleTimeString('en-IN')}` : ''}>
              <span className={`crm-dot ${error ? 'is-bad' : syncedAt ? 'is-live' : ''}`} />
              <span className="crm-sync-text">{error ? 'Offline' : syncedAt ? `Live · ${ago(new Date(syncedAt).toISOString(), now)}` : 'Connecting…'}</span>
            </span>
          </div>
          <button className="crm-topsearch" onClick={() => setPalette(true)} aria-label="Search (Ctrl K)">
            <Icon name="search" size={16} /><span>Search leads, pages, commands…</span><kbd>Ctrl K</kbd>
          </button>
          <div className="crm-top-acts">
            <div className="crm-pop-wrap">
              <button className={`crm-iconbtn is-lg ${menu === 'bell' ? 'is-on' : ''}`} onClick={() => setMenu(menu === 'bell' ? null : 'bell')} aria-label={`Notifications, ${notices.length}`} aria-expanded={menu === 'bell'}>
                <Icon name="bell" size={18} />{notices.length ? <span className="crm-bell-n">{notices.length > 9 ? '9+' : notices.length}</span> : null}
              </button>
              {menu === 'bell' ? (
                <div className="crm-pop is-bell" role="menu">
                  <p className="crm-pop-head">Notifications<span>{notices.length}</span></p>
                  <div className="crm-pop-list">
                    {notices.map((n) => (
                      <button key={n.id} role="menuitem" className={`crm-notice k-${n.kind}`} onClick={() => { setMenu(null); setOpenId(n.lead); }}>
                        <span className="crm-notice-ico"><Icon name={NOTICE_ICON[n.kind]} size={15} /></span>
                        <span className="crm-due-text"><b>{n.title}</b><small>{n.sub}</small></span>
                      </button>
                    ))}
                    {!notices.length ? <div className="crm-empty-mini"><Icon name="check" size={18} />You’re all caught up.</div> : null}
                  </div>
                </div>
              ) : null}
            </div>
            <div className="crm-pop-wrap">
              <button className="crm-btn crm-new" onClick={() => setMenu(menu === 'new' ? null : 'new')} aria-expanded={menu === 'new'}><Icon name="plus" size={16} /><span>New</span></button>
              {menu === 'new' ? (
                <div className="crm-pop is-new" role="menu">
                  <button role="menuitem" className="crm-pop-item" onClick={() => { setMenu(null); setAdding(true); }}><Icon name="leads" size={16} /><span className="crm-due-text"><b>Lead</b><small>Add someone by hand</small></span></button>
                  <button role="menuitem" className="crm-pop-item" onClick={() => { setMenu(null); go('proposals'); }}><Icon name="proposals" size={16} /><span className="crm-due-text"><b>Proposal</b><small>Draft a Blueprint</small></span></button>
                </div>
              ) : null}
            </div>
          </div>
        </header>

        <div className="crm-content">
          {section !== 'overview' ? <p className="crm-blurb">{current.blurb}</p> : null}
          {error ? <p className="crm-err crm-banner">{error}</p> : null}

          {filtersOn ? (
            <div className="crm-filters">
              <div className="crm-filter-search">
                <Icon name="search" size={15} />
                <input id="crm-search" type="search" placeholder="Filter leads…" value={query} onChange={(e) => setQuery(e.target.value)} />
              </div>
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
              <button className="crm-btn is-ghost crm-filter-csv" onClick={exportCsv} disabled={!filtered.length}><Icon name="download" size={15} />Export CSV</button>
            </div>
          ) : null}

          {leads === null && !error ? (
            <div className="crm-tiles">{Array.from({ length: 5 }, (_, i) => <div key={i} className="crm-skel" />)}</div>
          ) : (
            <>
              {section === 'overview' ? <TodaySection leads={leads ?? []} demos={demos} feed={feed} queue={extra?.queue ?? null} health={extra?.health ?? []} now={now} onOpen={setOpenId} go={go} onToast={setToast} onChanged={load} /> : null}
              {section === 'proposals' ? <ProposalsSection leads={leads ?? []} onOpen={setOpenId} onToast={setToast} /> : null}
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
      </div>

      <nav className="crm-tabbar" aria-label="Quick sections">
        {MOBILE.map((id) => {
          const n = NAV.find((x) => x.id === id)!;
          return (
            <a key={id} href={`#${id}`} aria-current={section === id ? 'page' : undefined} onClick={(e) => { e.preventDefault(); go(id); }}>
              <Icon name={n.icon} size={20} />{n.label}{counts[id] ? <span className="crm-tab-dot" /> : null}
            </a>
          );
        })}
        <button onClick={() => setSheet(true)} aria-label="All sections"><Icon name="menu" size={20} />More</button>
      </nav>

      {palette ? <CommandPalette leads={leads ?? []} sections={sectionCmds} commands={actionCmds} onOpenLead={setOpenId} onClose={() => setPalette(false)} /> : null}
      {open ? <Drawer key={open.id} lead={open} now={now} products={extra?.products ?? []} slots={extra?.slots ?? []} demos={demos} onChanged={load} onClose={() => setOpenId(null)} onSaved={patchLocal} onMove={move} onToast={setToast}
        onDeleted={(id) => { setLeads((ls) => ls?.filter((l) => l.id !== id) ?? ls); setOpenId(null); setToast('Lead deleted'); }} /> : null}
      {adding ? <AddLead onClose={() => setAdding(false)} onAdded={async (id) => { setAdding(false); await load(); setOpenId(id); setToast('Lead added'); }} /> : null}
      {toast ? <div className="crm-toast" role="status">{toast}</div> : null}
    </div>
  );
}
