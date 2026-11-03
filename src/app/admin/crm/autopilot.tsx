'use client';

import { useCallback, useEffect, useState, type FormEvent } from 'react';
import type { CrmLead } from '@/lib/crm/db';
import { ago, api, demoAction, demoLink, display, initials, SOURCE_LABEL, type DemoRow } from './shared';

type Demo = DemoRow;

/** The link to prefill for a lead: its live demo if it has one, else the usual hand-built demo address. */
function suggestedUrl(l: CrmLead, demos: DemoRow[]) {
  const d = demos.find((x) => x.lead_id === l.id && x.status !== 'rejected');
  if (d) return d.kind === 'custom' && d.url ? d.url : `https://bybo.in/demo/${d.slug}`;
  const intel = (l.intel ?? {}) as { business?: { name?: string | null } };
  const name = intel.business?.name || l.company || l.name || 'demo';
  const slug = name.split(/[\n,.(]/)[0]!.toLowerCase().normalize('NFKD').replace(/[^a-z0-9\s-]/g, '').trim().replace(/\s+/g, '-').slice(0, 40) || 'demo';
  return `https://bybo-demos.vercel.app/${slug}/`;
}
type Intel = { business?: { name?: string | null; industry?: string | null; location?: string | null; website?: string | null; what_they_do?: string | null }; reasons?: string[]; pitch?: string; package?: string; error?: string };


export function QualityChip({ lead }: { lead: Pick<CrmLead, 'quality' | 'quality_score'> }) {
  if (!lead.quality) return null;
  const label = lead.quality === 'good' ? 'Good' : lead.quality === 'fake' ? 'Likely fake' : 'Maybe';
  return <span className={`crm-q q-${lead.quality}`} title="Autopilot lead quality">{label}{lead.quality_score != null ? ` · ${lead.quality_score}` : ''}</span>;
}

export function IntelPanel({ lead }: { lead: CrmLead }) {
  const intel = (lead.intel ?? {}) as Intel;
  if (!lead.quality && !intel.error) return <div className="crm-intel"><p className="crm-label">Autopilot</p><p className="crm-muted">{lead.autopilot === 'queued' ? 'Queued for research. It runs every 10 minutes, or use Run autopilot now.' : `Status: ${lead.autopilot.replace('_', ' ')}`}</p></div>;
  return (
    <div className="crm-intel">
      <p className="crm-label">Autopilot research <QualityChip lead={lead} /></p>
      {intel.error ? <p className="crm-err">Last run failed: {intel.error}</p> : null}
      {intel.business ? (
        <p className="crm-intel-biz">
          <b>{intel.business.name ?? lead.company ?? 'Business not found'}</b>
          {[intel.business.industry, intel.business.location].filter(Boolean).length ? ` · ${[intel.business.industry, intel.business.location].filter(Boolean).join(' · ')}` : ''}
          {intel.business.website ? <> · <a className="crm-link" href={intel.business.website} target="_blank" rel="noreferrer">website</a></> : null}
        </p>
      ) : null}
      {intel.business?.what_they_do ? <p>{intel.business.what_they_do}</p> : null}
      {intel.reasons?.length ? <ul>{intel.reasons.map((r) => <li key={r}>{r}</li>)}</ul> : null}
      {intel.pitch ? <p><b>Pitch:</b> {intel.pitch}</p> : null}
    </div>
  );
}

export function AutopilotSection({ leads, now, onOpen, onToast, onChanged }: { leads: CrmLead[]; now: number; onOpen: (id: string) => void; onToast: (t: string) => void; onChanged: () => void }) {
  const [demos, setDemos] = useState<Demo[] | null>(null);
  const [busy, setBusy] = useState<string | null>(null);
  const [custom, setCustom] = useState({ lead_id: '', url: '' });

  const loadDemos = useCallback(async () => {
    try { setDemos((await api<{ demos: Demo[] }>('/api/admin/crm/demos')).demos); } catch { setDemos([]); }
  }, []);
  useEffect(() => { const t = setTimeout(loadDemos, 0); return () => clearTimeout(t); }, [loadDemos, leads]);

  async function act(key: string, body: Record<string, string>) {
    setBusy(key);
    try { onToast((await api<{ message: string }>('/api/admin/crm/demos', { method: 'POST', body: JSON.stringify(body) })).message); }
    catch (x) { onToast((x as Error & { data?: { message?: string } }).data?.message || 'That didn’t work. Try again.'); }
    setBusy(null);
    await loadDemos();
    onChanged();
  }
  async function runNow() {
    setBusy('run');
    try { onToast((await api<{ message: string }>('/api/admin/crm/run', { method: 'POST', body: JSON.stringify({ job: 'autopilot' }) })).message); }
    catch (x) { onToast((x as Error & { data?: { message?: string } }).data?.message || 'Autopilot could not run.'); }
    setBusy(null);
    await loadDemos();
    onChanged();
  }
  async function addCustom(e: FormEvent) {
    e.preventDefault();
    await act('custom', { action: 'custom', ...custom });
    setCustom({ lead_id: '', url: '' });
  }

  const byLead = new Map(leads.map((l) => [l.id, l]));
  const open = leads.filter((l) => l.stage !== 'won' && l.stage !== 'lost');
  const lane = (s: CrmLead['autopilot'][]) => open.filter((l) => s.includes(l.autopilot));
  const researching = lane(['queued', 'researching']);
  const review = lane(['needs_review']);
  const qualified = lane(['qualified']);
  const failed = lane(['failed', 'held']);
  const awaiting = (demos ?? []).filter((d) => d.status === 'awaiting_approval' || d.status === 'approved');
  const pendingFor = custom.lead_id ? awaiting.find((d) => d.lead_id === custom.lead_id) ?? null : null;
  const sent = (demos ?? []).filter((d) => d.status === 'sent');

  const steps = [
    { label: 'Scanned', n: leads.length, note: 'Forms, Meta, B, calls' },
    { label: 'Researching', n: researching.length, note: 'Web search' },
    { label: 'Needs review', n: review.length, note: 'Likely fake, held', warn: review.length > 0 },
    { label: 'Qualified', n: qualified.length, note: 'Demo next' },
    { label: 'Your approval', n: awaiting.length, note: 'Demo ready', warn: awaiting.length > 0 },
    { label: 'Sent to client', n: sent.length, note: 'Emailed' },
  ];

  return (
    <div className="crm-stack">
      <section className="crm-panel">
        <div className="crm-panel-head">
          <h2>Lead autopilot</h2>
          <button className="crm-btn" onClick={runNow} disabled={!!busy}>{busy === 'run' ? 'Running… (up to a minute)' : 'Run autopilot now'}</button>
        </div>
        <p className="crm-muted">Every new lead is researched on the web, scored, and checked for fakes. Good leads get a personalised demo page. You approve it here, and it is emailed to the client. Runs on its own every 10 minutes.</p>
        <ol className="crm-steps">
          {steps.map((s, i) => (
            <li key={s.label} className={s.warn ? 'is-warn' : ''}>
              <span className="crm-step-n">{s.n}</span>
              <b>{s.label}</b><small>{s.note}</small>
              {i < steps.length - 1 ? <span className="crm-step-arrow" aria-hidden="true">→</span> : null}
            </li>
          ))}
        </ol>
      </section>

      <div className="crm-grid-2">
        <section className="crm-panel">
          <div className="crm-panel-head"><h2>Waiting for your approval</h2><span className="crm-muted">{awaiting.length}</span></div>
          {demos === null ? <div className="crm-skel" /> : awaiting.length ? awaiting.map((d) => {
            const l = byLead.get(d.lead_id);
            return (
              <article key={d.id} className="crm-approve">
                <header>
                  <span className={`crm-avatar t-${l?.temperature ?? 'none'}`}>{l ? initials(l) : '?'}</span>
                  <span className="crm-due-text"><b>{l ? display(l) : 'Lead'}</b><small>{d.content.brand ?? d.note ?? 'Custom demo'} · {d.kind === 'custom' ? 'custom build' : 'auto demo'} · {ago(d.created_at, now)}</small></span>
                  {l ? <QualityChip lead={l} /> : null}
                </header>
                {d.content.hero?.headline ? <p className="crm-approve-head">“{d.content.hero.headline}”</p> : null}
                <footer>
                  <a className="crm-btn is-ghost" href={demoLink(d)} target="_blank" rel="noreferrer">Preview</a>
                  <button className="crm-btn" disabled={!!busy || !l?.email} onClick={() => act(`send-${d.id}`, { action: 'approve_send', demo_id: d.id })}>{busy === `send-${d.id}` ? 'Sending…' : l?.email ? 'Approve & email client' : 'No email on lead'}</button>
                  {d.kind === 'auto' ? <button className="crm-chipbtn" disabled={!!busy} onClick={() => act(`regen-${d.id}`, { action: 'regenerate', demo_id: d.id })}>{busy === `regen-${d.id}` ? 'Redrafting…' : 'Redraft'}</button> : null}
                  <button className="crm-chipbtn" disabled={!!busy} onClick={() => act(`rej-${d.id}`, { action: 'reject', demo_id: d.id })}>Reject</button>
                  {l ? <button className="crm-chipbtn" onClick={() => onOpen(l.id)}>Open lead</button> : null}
                </footer>
              </article>
            );
          }) : <p className="crm-muted">Nothing to approve. New demos appear here and you get an email when one is ready.</p>}
        </section>

        <section className="crm-panel">
          <div className="crm-panel-head"><h2>Needs your review</h2><span className="crm-muted">{review.length}</span></div>
          {review.length ? review.map((l) => {
            const intel = (l.intel ?? {}) as Intel;
            return (
              <article key={l.id} className="crm-approve is-warn">
                <header>
                  <span className="crm-avatar">{initials(l)}</span>
                  <span className="crm-due-text"><b>{display(l)}</b><small>{SOURCE_LABEL[l.source]} · {ago(l.created_at, now)}</small></span>
                  <QualityChip lead={l} />
                </header>
                {intel.reasons?.length ? <ul className="crm-reasons">{intel.reasons.slice(0, 3).map((r) => <li key={r}>{r}</li>)}</ul> : null}
                <footer>
                  <button className="crm-btn is-ghost" disabled={!!busy} onClick={() => act(`real-${l.id}`, { action: 'confirm_real', lead_id: l.id })}>It’s real: make a demo</button>
                  <button className="crm-btn is-danger" disabled={!!busy} onClick={() => act(`fake-${l.id}`, { action: 'confirm_fake', lead_id: l.id })}>Fake: move to Lost</button>
                  <button className="crm-chipbtn" onClick={() => onOpen(l.id)}>Open lead</button>
                </footer>
              </article>
            );
          }) : <p className="crm-muted">No suspicious leads. Anything that looks fake waits here; nothing is sent until you decide.</p>}
        </section>
      </div>

      <div className="crm-grid-3">
        <section className="crm-panel">
          <div className="crm-panel-head"><h2>In research</h2><span className="crm-muted">{researching.length + qualified.length}</span></div>
          {[...researching, ...qualified].map((l) => (
            <button key={l.id} className="crm-due-item" onClick={() => onOpen(l.id)}>
              <span className="crm-avatar">{initials(l)}</span>
              <span className="crm-due-text"><b>{display(l)}</b><small>{l.autopilot === 'qualified' ? 'Qualified, demo next' : l.autopilot === 'researching' ? 'Researching now' : 'Queued'}</small></span>
              <QualityChip lead={l} />
            </button>
          ))}
          {!researching.length && !qualified.length ? <p className="crm-muted">Queue is clear.</p> : null}
        </section>
        <section className="crm-panel">
          <div className="crm-panel-head"><h2>Sent to clients</h2><span className="crm-muted">{sent.length}</span></div>
          {sent.map((d) => {
            const l = byLead.get(d.lead_id);
            return (
              <div key={d.id} className="crm-due-item">
                <span className="crm-ev-icon">✓</span>
                <span className="crm-due-text"><b>{l ? display(l) : 'Lead'}</b><small>{d.kind === 'custom' ? 'Custom demo' : 'Auto demo'} · sent {d.sent_at ? ago(d.sent_at, now) : ''}</small></span>
                <a className="crm-link" href={demoLink(d)} target="_blank" rel="noreferrer">View</a>
              </div>
            );
          })}
          {!sent.length ? <p className="crm-muted">No demos sent yet.</p> : null}
        </section>
        <section className="crm-panel">
          <div className="crm-panel-head"><h2>On hold or failed</h2><span className="crm-muted">{failed.length}</span></div>
          {failed.map((l) => (
            <div key={l.id} className="crm-due-item">
              <span className="crm-avatar">{initials(l)}</span>
              <span className="crm-due-text"><b>{display(l)}</b><small>{l.autopilot === 'held' ? 'Demo rejected, on hold' : String((l.intel as Intel)?.error ?? 'Failed')}</small></span>
              <button className="crm-chipbtn" disabled={!!busy} onClick={() => act(`retry-${l.id}`, { action: 'requeue', lead_id: l.id })}>{busy === `retry-${l.id}` ? 'Running…' : 'Retry'}</button>
            </div>
          ))}
          {!failed.length ? <p className="crm-muted">Nothing stuck.</p> : null}
        </section>
      </div>

      <form className="crm-panel crm-custom" onSubmit={addCustom}>
        <div className="crm-panel-head"><h2>Add a custom demo for approval</h2></div>
        <p className="crm-muted">For hand-built demos like Bigshot: paste the link, approve it above, and it is emailed to the client.</p>
        <div className="crm-custom-row">
          <select value={custom.lead_id} onChange={(e) => { const l = byLead.get(e.target.value); setCustom({ lead_id: e.target.value, url: l ? suggestedUrl(l, demos ?? []) : '' }); }} required>
            <option value="">Choose a lead</option>
            {open.map((l) => <option key={l.id} value={l.id}>{display(l)}{l.company && l.name ? ` · ${l.company}` : ''}</option>)}
          </select>
          <input type="url" placeholder="https://…" value={custom.url} onChange={(e) => setCustom((c) => ({ ...c, url: e.target.value }))} required />
          <button className="crm-btn" disabled={!!busy || !!pendingFor}>{busy === 'custom' ? 'Adding…' : 'Add for approval'}</button>
        </div>
        {pendingFor ? (
          <div className="crm-approve">
            <p className="crm-muted">This lead already has a demo waiting for approval. Approve it here instead of adding another.</p>
            <footer>
              <a className="crm-btn is-ghost" href={demoLink(pendingFor)} target="_blank" rel="noreferrer">Preview</a>
              <button type="button" className="crm-btn" disabled={!!busy || !byLead.get(pendingFor.lead_id)?.email} onClick={() => act(`send-${pendingFor.id}`, { action: 'approve_send', demo_id: pendingFor.id })}>{busy === `send-${pendingFor.id}` ? 'Sending…' : 'Approve & email client'}</button>
            </footer>
          </div>
        ) : custom.lead_id ? <p className="crm-muted crm-gap">Link filled in from the lead{custom.url.includes('bybo-demos') ? ': the usual address for a hand-built demo. Change it if the build lives elsewhere.' : '.'}</p> : null}
      </form>
    </div>
  );
}

const DEMO_STATUS: Record<DemoRow['status'], string> = { drafting: 'Drafting', awaiting_approval: 'Waiting for your approval', approved: 'Approved, not sent (no email)', sent: 'Sent to client', rejected: 'Rejected' };

/** Demo numbers plus one-click approval, for the Overview. */
export function DemoPanel({ demos, leads, now, onOpen, onToast, onChanged, go }: {
  demos: DemoRow[]; leads: CrmLead[]; now: number; onOpen: (id: string) => void; onToast: (t: string) => void; onChanged: () => void; go: (s: string) => void;
}) {
  const [busy, setBusy] = useState<string | null>(null);
  const byLead = new Map(leads.map((l) => [l.id, l]));
  const awaiting = demos.filter((d) => d.status === 'awaiting_approval' || d.status === 'approved');
  const sent = demos.filter((d) => d.status === 'sent');
  const rejected = demos.filter((d) => d.status === 'rejected');
  const decided = sent.length + rejected.length;
  const review = leads.filter((l) => l.autopilot === 'needs_review').length;
  async function approve(d: DemoRow) {
    setBusy(d.id);
    onToast(await demoAction({ action: 'approve_send', demo_id: d.id }));
    setBusy(null);
    onChanged();
  }
  return (
    <section className="crm-panel">
      <div className="crm-panel-head"><h2>Demos</h2><button className="crm-link" onClick={() => go('autopilot')}>Open autopilot</button></div>
      <div className="crm-demo-stats">
        <div><strong>{demos.filter((d) => d.status !== 'rejected').length}</strong><small>Made</small></div>
        <div className={awaiting.length ? 'is-warn' : ''}><strong>{awaiting.length}</strong><small>Need approval</small></div>
        <div><strong>{sent.length}</strong><small>Sent to clients</small></div>
        <div><strong>{decided ? `${Math.round((sent.length / decided) * 100)}%` : '—'}</strong><small>Approval rate</small></div>
        <div className={review ? 'is-warn' : ''}><strong>{review}</strong><small>Leads to review</small></div>
      </div>
      {awaiting.slice(0, 4).map((d) => {
        const l = byLead.get(d.lead_id);
        return (
          <div key={d.id} className="crm-due-item">
            <span className={`crm-avatar t-${l?.temperature ?? 'none'}`}>{l ? initials(l) : '?'}</span>
            <span className="crm-due-text"><b>{l ? display(l) : 'Lead'}</b><small>{d.content.brand ?? (d.kind === 'custom' ? 'Custom demo' : 'Auto demo')} · {ago(d.created_at, now)}</small></span>
            <a className="crm-chipbtn" href={demoLink(d)} target="_blank" rel="noreferrer">Preview</a>
            <button className="crm-chipbtn is-on" disabled={!!busy || !l?.email} onClick={() => approve(d)}>{busy === d.id ? 'Sending…' : 'Approve & send'}</button>
            {l ? <button className="crm-chipbtn" onClick={() => onOpen(l.id)}>Lead</button> : null}
          </div>
        );
      })}
      {!awaiting.length ? <p className="crm-muted">No demos waiting. Sent: {sent.length}{sent[0]?.sent_at ? `, latest ${ago(sent[0].sent_at, now)}` : ''}.</p> : null}
    </section>
  );
}

/** The lead's demos inside its drawer, with approval. */
export function LeadDemos({ lead, demos, onToast, onChanged }: { lead: CrmLead; demos: DemoRow[]; onToast: (t: string) => void; onChanged: () => void }) {
  const [busy, setBusy] = useState<string | null>(null);
  const mine = demos.filter((d) => d.lead_id === lead.id);
  const [url, setUrl] = useState(() => (mine.some((d) => d.status !== 'rejected') ? '' : suggestedUrl(lead, demos)));
  async function act(key: string, body: Record<string, string>) {
    setBusy(key);
    onToast(await demoAction(body));
    setBusy(null);
    onChanged();
  }
  return (
    <div className="crm-intel crm-lead-demos">
      <p className="crm-label">Demo</p>
      {mine.length ? mine.map((d) => (
        <div key={d.id} className={`crm-demo-row s-${d.status}`}>
          <span className="crm-due-text"><b>{d.content.brand ?? (d.kind === 'custom' ? 'Custom demo' : 'Auto demo')}</b><small>{DEMO_STATUS[d.status]}{d.sent_at ? ` · ${new Date(d.sent_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}` : ''}</small></span>
          <a className="crm-chipbtn" href={demoLink(d)} target="_blank" rel="noreferrer">Preview</a>
          {d.status === 'awaiting_approval' ? <>
            <button className="crm-chipbtn is-on" disabled={!!busy || !lead.email} onClick={() => act(`s${d.id}`, { action: 'approve_send', demo_id: d.id })}>{busy === `s${d.id}` ? 'Sending…' : lead.email ? 'Approve & email' : 'No email'}</button>
            {d.kind === 'auto' ? <button className="crm-chipbtn" disabled={!!busy} onClick={() => act(`g${d.id}`, { action: 'regenerate', demo_id: d.id })}>{busy === `g${d.id}` ? 'Redrafting…' : 'Redraft'}</button> : null}
            <button className="crm-chipbtn" disabled={!!busy} onClick={() => act(`r${d.id}`, { action: 'reject', demo_id: d.id })}>Reject</button>
          </> : null}
        </div>
      )) : <p className="crm-muted">{lead.autopilot === 'needs_review' ? 'Held as a likely fake. Confirm it to get a demo.' : 'No demo yet. Autopilot drafts one once the lead qualifies.'}</p>}
      {lead.autopilot === 'needs_review' ? (
        <div className="crm-demo-actions">
          <button className="crm-chipbtn" disabled={!!busy} onClick={() => act('real', { action: 'confirm_real', lead_id: lead.id })}>It’s real: make a demo</button>
          <button className="crm-chipbtn" disabled={!!busy} onClick={() => act('fake', { action: 'confirm_fake', lead_id: lead.id })}>Fake: move to Lost</button>
        </div>
      ) : null}
      {lead.stage !== 'won' && lead.stage !== 'lost' ? (
        <div className="crm-demo-actions">
          <input type="url" placeholder="Paste a custom demo link for approval" value={url} onChange={(e) => setUrl(e.target.value)} />
          <button className="crm-chipbtn" disabled={!!busy || !/^https:\/\//.test(url)} onClick={() => { act('c', { action: 'custom', lead_id: lead.id, url }); setUrl(''); }}>Add</button>
          {!mine.some((d) => d.status !== 'rejected') && lead.autopilot !== 'researching' ? <button className="crm-chipbtn" disabled={!!busy} onClick={() => act('q', { action: 'requeue', lead_id: lead.id })}>{busy === 'q' ? 'Running…' : 'Run autopilot on this lead'}</button> : null}
        </div>
      ) : null}
    </div>
  );
}
