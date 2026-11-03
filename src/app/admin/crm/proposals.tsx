'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import type { CrmLead } from '@/lib/crm/db';
import { DEFAULT_MILESTONES, itemsTotal, LIMITS, milestoneAmounts, type Proposal, type ProposalStatus } from '@/lib/crm/proposals';
import { ago, api, display, inr, STAGE_LABEL } from './shared';
import './proposals.css';

type ItemRow = { name: string; description: string; qty: string; amount: string };
type MsRow = { label: string; pct: string };
type Draft = { id: string | null; lead_id: string; title: string; items: ItemRow[]; milestones: MsRow[]; notes: string; valid_until: string };

const STATUS_LABEL: Record<ProposalStatus, string> = { draft: 'Draft', sent: 'Sent', viewed: 'Viewed', accepted: 'Accepted', declined: 'Declined' };
const blankItem = (): ItemRow => ({ name: '', description: '', qty: '1', amount: '' });
const inDays = (n: number) => new Date(Date.now() + n * 86_400_000).toISOString().slice(0, 10);
const fresh = (lead_id = ''): Draft => ({
  id: null, lead_id, title: '', items: [blankItem()], milestones: DEFAULT_MILESTONES.map((m) => ({ label: m.label, pct: String(m.pct) })), notes: '', valid_until: inDays(14),
});
const fromProposal = (p: Proposal): Draft => ({
  id: p.id, lead_id: p.lead_id, title: p.title ?? '', notes: p.notes ?? '', valid_until: p.valid_until ?? '',
  items: p.items.length ? p.items.map((i) => ({ name: i.name, description: i.description ?? '', qty: String(i.qty), amount: String(i.amount) })) : [blankItem()],
  milestones: p.milestones.map((m) => ({ label: m.label, pct: String(m.pct) })),
});
const toBody = (d: Draft) => ({
  id: d.id ?? undefined, lead_id: d.lead_id, title: d.title, notes: d.notes, valid_until: d.valid_until,
  items: d.items.map((i) => ({ name: i.name, description: i.description, qty: i.qty, amount: i.amount })),
  milestones: d.milestones.map((m) => ({ label: m.label, pct: m.pct })),
});
const errMessage = (x: unknown) => (x as Error & { data?: { message?: string } }).data?.message || 'That didn’t work. Try again.';
const previewUrl = (token: string) => `/proposal/${token}?preview=1`;

export function ProposalsSection({ leads, onOpen, onToast }: { leads: CrmLead[]; onOpen: (id: string) => void; onToast: (t: string) => void }) {
  const [proposals, setProposals] = useState<Proposal[] | null>(null);
  const [error, setError] = useState('');
  const [draft, setDraft] = useState<Draft | null>(null);
  const [saved, setSaved] = useState('');
  const [busy, setBusy] = useState<'' | 'save' | 'send' | 'preview' | 'delete'>('');
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [filter, setFilter] = useState<ProposalStatus | 'all'>('all');
  const [now, setNow] = useState(() => Date.now());

  const load = useCallback(async () => {
    try {
      const { proposals } = await api<{ proposals: Proposal[] }>('/api/admin/crm/proposals', { cache: 'no-store' });
      setProposals(proposals);
      setError('');
    } catch {
      setError('Couldn’t load proposals. Retrying…');
    }
  }, []);

  useEffect(() => {
    const first = setTimeout(load, 0);
    const poll = setInterval(() => { if (document.visibilityState === 'visible') load(); }, 30_000);
    const tick = setInterval(() => setNow(Date.now()), 30_000);
    return () => { clearTimeout(first); clearInterval(poll); clearInterval(tick); };
  }, [load]);

  const byId = useMemo(() => new Map(leads.map((l) => [l.id, l])), [leads]);
  const leadOptions = useMemo(() => [...leads].filter((l) => l.stage !== 'lost').sort((a, b) => Date.parse(b.last_activity_at) - Date.parse(a.last_activity_at)), [leads]);

  const k = useMemo(() => {
    const list = proposals ?? [];
    const out = list.filter((p) => p.status !== 'draft');
    const accepted = list.filter((p) => p.status === 'accepted');
    return {
      openValue: list.filter((p) => p.status === 'sent' || p.status === 'viewed').reduce((t, p) => t + Number(p.total), 0),
      open: list.filter((p) => p.status === 'sent' || p.status === 'viewed').length,
      sent: out.length,
      viewed: out.filter((p) => p.viewed_at).length,
      accepted: accepted.length,
      acceptedValue: accepted.reduce((t, p) => t + Number(p.total), 0),
      winRate: out.length ? Math.round((accepted.length / out.length) * 100) : null,
      drafts: list.length - out.length,
    };
  }, [proposals]);

  const shown = (proposals ?? []).filter((p) => filter === 'all' || p.status === filter);
  const current = draft?.id ? proposals?.find((p) => p.id === draft.id) : undefined;
  const locked = current?.status === 'accepted' || current?.status === 'declined';
  const dirty = !!draft && JSON.stringify(toBody(draft)) !== saved;

  const edit = (d: Draft) => { setDraft(d); setSaved(d.id ? JSON.stringify(toBody(d)) : ''); setConfirmDelete(false); };
  const patch = (p: Partial<Draft>) => setDraft((d) => (d ? { ...d, ...p } : d));
  const setItem = (i: number, p: Partial<ItemRow>) => setDraft((d) => (d ? { ...d, items: d.items.map((x, n) => (n === i ? { ...x, ...p } : x)) } : d));
  const setMs = (i: number, p: Partial<MsRow>) => setDraft((d) => (d ? { ...d, milestones: d.milestones.map((x, n) => (n === i ? { ...x, ...p } : x)) } : d));

  /** Save the draft (when needed) and return the stored proposal. */
  async function persist(d: Draft): Promise<Proposal | null> {
    if (d.id && !dirty && current) return current;
    try {
      const { proposal } = await api<{ proposal: Proposal }>('/api/admin/crm/proposals', { method: 'POST', body: JSON.stringify({ action: 'save', ...toBody(d) }) });
      const next = fromProposal(proposal);
      setDraft(next);
      setSaved(JSON.stringify(toBody(next)));
      setProposals((ps) => [proposal, ...(ps ?? []).filter((p) => p.id !== proposal.id)]);
      return proposal;
    } catch (x) {
      onToast(errMessage(x));
      return null;
    }
  }

  async function save() {
    if (!draft) return;
    setBusy('save');
    if (await persist(draft)) onToast('Draft saved');
    setBusy('');
  }

  async function preview() {
    if (!draft) return;
    // Open the tab now, while the click still counts, then point it at the saved proposal.
    const tab = window.open('', '_blank');
    setBusy('preview');
    const p = await persist(draft);
    setBusy('');
    if (p && tab) tab.location.href = previewUrl(p.token);
    else if (p) window.open(previewUrl(p.token), '_blank');
    else tab?.close();
  }

  async function send() {
    if (!draft) return;
    setBusy('send');
    const p = await persist(draft);
    if (p) {
      try {
        const r = await api<{ proposal: Proposal; message: string }>('/api/admin/crm/proposals', { method: 'POST', body: JSON.stringify({ action: 'send', id: p.id }) });
        setProposals((ps) => (ps ?? []).map((x) => (x.id === r.proposal.id ? r.proposal : x)));
        onToast(r.message);
      } catch (x) { onToast(errMessage(x)); }
    }
    setBusy('');
  }

  async function remove() {
    if (!draft?.id) return;
    setBusy('delete');
    try {
      await api('/api/admin/crm/proposals', { method: 'POST', body: JSON.stringify({ action: 'delete', id: draft.id }) });
      setProposals((ps) => (ps ?? []).filter((p) => p.id !== draft.id));
      setDraft(null);
      onToast('Proposal deleted');
    } catch (x) { onToast(errMessage(x)); }
    setBusy('');
  }

  const total = draft ? itemsTotal(draft.items.map((i) => ({ qty: Number(i.qty) || 0, amount: Number(i.amount) || 0 }))) : 0;
  const ms = draft ? draft.milestones.map((m) => ({ label: m.label, pct: Number(m.pct) || 0 })) : [];
  const pctSum = ms.reduce((t, m) => t + m.pct, 0);
  const shares = milestoneAmounts(total, ms);
  const lead = draft ? byId.get(draft.lead_id) : undefined;

  return (
    <div className="prp">
      <section className="prp-kpis" aria-label="Proposal summary">
        <div className="prp-kpi is-accent"><p>Open value</p><strong>{inr(k.openValue)}</strong><small>{k.open} waiting on the client</small></div>
        <div className="prp-kpi"><p>Sent</p><strong>{k.sent}</strong><small>{k.drafts} draft{k.drafts === 1 ? '' : 's'}</small></div>
        <div className="prp-kpi"><p>Viewed</p><strong>{k.viewed}</strong><small>{k.sent ? `${Math.round((k.viewed / k.sent) * 100)}% of sent` : 'None sent yet'}</small></div>
        <div className="prp-kpi is-win"><p>Accepted</p><strong>{k.accepted}</strong><small>{inr(k.acceptedValue)}</small></div>
        <div className="prp-kpi"><p>Win rate</p><strong>{k.winRate == null ? '—' : `${k.winRate}%`}</strong><small>Of proposals sent</small></div>
      </section>

      {error ? <p className="crm-err crm-banner">{error}</p> : null}

      <div className={`prp-layout ${draft ? 'is-editing' : ''}`}>
        <section className="prp-panel" aria-label="Proposals">
          <header className="prp-panel-head">
            <h2>Proposals</h2>
            <button className="crm-btn" onClick={() => edit(fresh())}>+ New proposal</button>
          </header>
          <div className="prp-filters" role="tablist" aria-label="Filter by status">
            {(['all', 'draft', 'sent', 'viewed', 'accepted', 'declined'] as const).map((s) => (
              <button key={s} role="tab" aria-selected={filter === s} className={filter === s ? 'is-on' : ''} onClick={() => setFilter(s)}>
                {s === 'all' ? 'All' : STATUS_LABEL[s]}<span>{s === 'all' ? proposals?.length ?? 0 : (proposals ?? []).filter((p) => p.status === s).length}</span>
              </button>
            ))}
          </div>
          {proposals === null ? <div className="prp-skel" /> : !shown.length ? (
            <p className="prp-empty">{proposals.length ? 'Nothing with this status.' : 'No proposals yet. Start one for a lead you have spoken to.'}</p>
          ) : (
            <ul className="prp-list">
              {shown.map((p) => {
                const l = byId.get(p.lead_id);
                return (
                  <li key={p.id} className={draft?.id === p.id ? 'is-on' : ''}>
                    <button className="prp-row" onClick={() => edit(fromProposal(p))}>
                      <span className="prp-row-main">
                        <b>{p.title || 'Untitled proposal'}</b>
                        <small>{l ? display(l) : 'Lead removed'}{l?.company && l.name ? ` · ${l.company}` : ''}</small>
                      </span>
                      <span className="prp-row-side">
                        <strong>{inr(Number(p.total))}</strong>
                        <span className={`prp-chip s-${p.status}`}>{STATUS_LABEL[p.status]}</span>
                      </span>
                      <span className="prp-row-when">{p.status === 'accepted' && p.accepted_at ? `Accepted ${ago(p.accepted_at, now)}` : p.viewed_at ? `Viewed ${ago(p.viewed_at, now)}` : p.sent_at ? `Sent ${ago(p.sent_at, now)}` : `Edited ${ago(p.updated_at, now)}`}</span>
                    </button>
                  </li>
                );
              })}
            </ul>
          )}
        </section>

        {draft ? (
          <section className="prp-panel prp-builder" aria-label="Proposal builder">
            <header className="prp-panel-head">
              <h2>{draft.id ? 'Edit proposal' : 'New proposal'}</h2>
              {current ? <span className={`prp-chip s-${current.status}`}>{STATUS_LABEL[current.status]}</span> : null}
              <button className="crm-x" aria-label="Close builder" onClick={() => setDraft(null)}>×</button>
            </header>
            {locked ? <p className="prp-note">This proposal was {current!.status}. It is read-only.</p> : null}

            <fieldset disabled={locked} className="prp-fields">
              <div className="prp-grid">
                <label className="is-wide">Lead
                  <select value={draft.lead_id} onChange={(e) => patch({ lead_id: e.target.value })}>
                    <option value="">Pick a lead…</option>
                    {draft.lead_id && !leadOptions.some((l) => l.id === draft.lead_id) && lead ? <option value={lead.id}>{display(lead)}</option> : null}
                    {leadOptions.map((l) => <option key={l.id} value={l.id}>{display(l)}{l.company && l.name ? ` · ${l.company}` : ''} ({STAGE_LABEL[l.stage]})</option>)}
                  </select>
                </label>
                {lead ? (
                  <p className="prp-lead is-wide">
                    <button type="button" className="crm-link" onClick={() => onOpen(lead.id)}>Open {display(lead)}</button>
                    <span>{lead.email || 'No email: share the link on WhatsApp'}</span>
                  </p>
                ) : null}
                <label className="is-wide">Title
                  <input value={draft.title} maxLength={LIMITS.title} placeholder="e.g. Website and lead desk for Acme" onChange={(e) => patch({ title: e.target.value })} />
                </label>
              </div>

              <div className="prp-sub"><h3>Line items</h3><span className="crm-muted">Amounts in ₹ per unit, typed by you</span></div>
              <div className="prp-items">
                {draft.items.map((it, i) => (
                  <div key={i} className="prp-item">
                    <input aria-label={`Item ${i + 1} name`} placeholder="Item" value={it.name} maxLength={LIMITS.itemName} onChange={(e) => setItem(i, { name: e.target.value })} />
                    <input aria-label={`Item ${i + 1} quantity`} className="prp-num" inputMode="decimal" placeholder="Qty" value={it.qty} onChange={(e) => setItem(i, { qty: e.target.value })} />
                    <input aria-label={`Item ${i + 1} amount in rupees`} className="prp-num" inputMode="decimal" placeholder="₹ amount" value={it.amount} onChange={(e) => setItem(i, { amount: e.target.value })} />
                    <span className="prp-line">{inr((Number(it.qty) || 0) * (Number(it.amount) || 0))}</span>
                    <button type="button" className="prp-del" aria-label={`Remove item ${i + 1}`} disabled={draft.items.length === 1} onClick={() => patch({ items: draft.items.filter((_, n) => n !== i) })}>×</button>
                    <textarea aria-label={`Item ${i + 1} description`} rows={2} placeholder="What’s included (optional)" value={it.description} maxLength={LIMITS.itemDesc} onChange={(e) => setItem(i, { description: e.target.value })} />
                  </div>
                ))}
              </div>
              <div className="prp-row-tools">
                <button type="button" className="crm-btn is-ghost" disabled={draft.items.length >= LIMITS.items} onClick={() => patch({ items: [...draft.items, blankItem()] })}>+ Add item</button>
                <p className="prp-total">Total <strong>{inr(total)}</strong></p>
              </div>

              <div className="prp-sub"><h3>Payment milestones</h3><span className={Math.abs(pctSum - 100) > 0.01 && ms.length ? 'prp-warn' : 'crm-muted'}>{ms.length ? `${pctSum}% of 100%` : 'None: paid in one go'}</span></div>
              <div className="prp-ms">
                {draft.milestones.map((m, i) => (
                  <div key={i} className="prp-ms-row">
                    <input aria-label={`Milestone ${i + 1} label`} placeholder="Milestone" value={m.label} maxLength={LIMITS.milestoneLabel} onChange={(e) => setMs(i, { label: e.target.value })} />
                    <span className="prp-pct"><input aria-label={`Milestone ${i + 1} percent`} className="prp-num" inputMode="decimal" value={m.pct} onChange={(e) => setMs(i, { pct: e.target.value })} />%</span>
                    <span className="prp-line">{inr(shares[i] ?? 0)}</span>
                    <button type="button" className="prp-del" aria-label={`Remove milestone ${i + 1}`} onClick={() => patch({ milestones: draft.milestones.filter((_, n) => n !== i) })}>×</button>
                  </div>
                ))}
              </div>
              <div className="prp-row-tools">
                <button type="button" className="crm-btn is-ghost" disabled={draft.milestones.length >= LIMITS.milestones} onClick={() => patch({ milestones: [...draft.milestones, { label: '', pct: '' }] })}>+ Add milestone</button>
                {!draft.milestones.length ? <button type="button" className="crm-link" onClick={() => patch({ milestones: DEFAULT_MILESTONES.map((x) => ({ label: x.label, pct: String(x.pct) })) })}>Use 50 / 50</button> : null}
              </div>

              <div className="prp-grid">
                <label className="is-wide">Notes
                  <textarea rows={4} value={draft.notes} maxLength={LIMITS.notes} placeholder="Timeline, assumptions, what you need from the client…" onChange={(e) => patch({ notes: e.target.value })} />
                </label>
                <label>Valid until
                  <input type="date" value={draft.valid_until} onChange={(e) => patch({ valid_until: e.target.value })} />
                </label>
              </div>
            </fieldset>

            <footer className="prp-foot">
              {!locked ? (
                <>
                  <button className="crm-btn is-ghost" disabled={!!busy || !draft.lead_id} onClick={save}>{busy === 'save' ? 'Saving…' : dirty || !draft.id ? 'Save draft' : 'Saved'}</button>
                  <button className="crm-btn is-ghost" disabled={!!busy || !draft.lead_id} onClick={preview}>{busy === 'preview' ? 'Opening…' : 'Preview ↗'}</button>
                  <button className="crm-btn" disabled={!!busy || !draft.lead_id || !lead?.email} title={lead && !lead.email ? 'This lead has no email' : undefined} onClick={send}>
                    {busy === 'send' ? 'Sending…' : current && current.status !== 'draft' ? 'Send again' : 'Send to client'}
                  </button>
                </>
              ) : current ? <a className="crm-btn is-ghost" href={previewUrl(current.token)} target="_blank" rel="noreferrer">Open ↗</a> : null}
              {current ? (
                <button type="button" className="crm-link" onClick={() => navigator.clipboard?.writeText(`https://bybo.in/proposal/${current.token}`).then(() => onToast('Link copied'), () => onToast('Couldn’t copy the link'))}>Copy client link</button>
              ) : null}
              {draft.id ? (
                confirmDelete ? (
                  <span className="crm-confirm prp-right">Delete for good?
                    <button className="crm-btn is-danger" disabled={!!busy} onClick={remove}>{busy === 'delete' ? 'Deleting…' : 'Delete'}</button>
                    <button className="crm-link" onClick={() => setConfirmDelete(false)}>Keep</button>
                  </span>
                ) : <button className="crm-link is-danger prp-right" onClick={() => setConfirmDelete(true)}>Delete</button>
              ) : null}
            </footer>
          </section>
        ) : null}
      </div>
    </div>
  );
}
