'use client';

import { useEffect, useState, type FormEvent } from 'react';
import type { CrmEvent, CrmLead, Stage } from '@/lib/crm/db';
import { IntelPanel, LeadDemos } from './autopilot';
import { Icon } from './icons';
import { idleDays } from './intel';
import { ago, api, DAY, display, EVENT_ICON, initials, inr, localInput, SOURCE_LABEL, STAGE_LABEL, STAGES, waLink, when, type Brief, type DemoRow, type Product, type Slot } from './shared';

type Tool = 'email' | 'pay' | 'book' | 'whatsapp' | null;

const EMAIL_TEMPLATES = (first: string, need: string) => [
  { id: 'follow', label: 'Follow-up', subject: 'Following up from BYBO', body: `Hi ${first},\n\nThanks for reaching out to BYBO${need ? ` about ${need}` : ''}. I'd love to understand what you need and show you how we'd build it.\n\nWould a 30-minute call this week work? Reply with a time that suits you.` },
  { id: 'after', label: 'After the call', subject: 'Great speaking with you', body: `Hi ${first},\n\nThank you for your time today. As promised, here is a quick recap and the next step.\n\nWe'll share a written Blueprint with the scope, timeline and fixed price. Reply if anything should be added.` },
  { id: 'nudge', label: 'Gentle nudge', subject: 'Still keen to help', body: `Hi ${first},\n\nJust checking in. If now isn't the right time, no problem at all.\n\nIf it helps, I can send a one-page brief of what we'd build first. Shall I?` },
];
const WA_TEMPLATES = (first: string) => [
  `Hi ${first}, this is BYBO. Thanks for your enquiry. When is a good time for a quick call?`,
  `Hi ${first}, following up from BYBO. Shall I share a one-page brief of what we'd build for you?`,
  `Hi ${first}, here is the secure payment link we discussed: `,
];

export function Drawer({ lead, now, products, slots, demos, onChanged, onClose, onSaved, onMove, onDeleted, onToast }: {
  lead: CrmLead; now: number; products: Product[]; slots: Slot[]; demos: DemoRow[]; onChanged: () => void;
  onClose: () => void; onSaved: (l: CrmLead) => void; onMove: (id: string, s: Stage) => void; onDeleted: (id: string) => void; onToast: (t: string) => void;
}) {
  const [events, setEvents] = useState<CrmEvent[] | null>(null);
  const [bump, setBump] = useState(0);
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
  const [tool, setTool] = useState<Tool>(null);

  useEffect(() => {
    let live = true;
    api<{ events: CrmEvent[] }>(`/api/admin/crm/leads/${lead.id}`)
      .then((d) => { if (live) setEvents(d.events); })
      .catch(() => { if (live) setEvents((ev) => ev ?? []); });
    return () => { live = false; };
  }, [lead.id, lead.last_activity_at, bump]);

  const dirty = (Object.keys(initial) as (keyof typeof initial)[]).some((k) => form[k] !== initial[k]);
  const first = (lead.name ?? '').split(' ')[0] || 'there';
  const set = (k: keyof typeof form) => (e: { target: { value: string } }) => setForm((f) => ({ ...f, [k]: e.target.value }));
  const refresh = () => { setBump((n) => n + 1); onSaved({ ...lead, last_activity_at: new Date().toISOString() }); };

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

  const [calling, setCalling] = useState(false);
  async function callNow() {
    setCalling(true);
    try {
      const r = await api<{ message: string }>(`/api/admin/crm/leads/${lead.id}/call`, { method: 'POST' });
      onToast(r.message);
      refresh();
    } catch (x) {
      onToast((x as Error & { data?: { message?: string } }).data?.message || 'That didn’t work. Try again.');
    }
    setCalling(false);
  }

  const followIn = (days: number) => {
    const d = new Date(now + days * 86_400_000);
    d.setHours(11, 0, 0, 0);
    setForm((f) => ({ ...f, next_follow_up: localInput(d.toISOString()) }));
  };

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

        <div className="crm-dstrip" aria-label="Lead at a glance">
          <span className={`crm-dstrip-cell stage-${lead.stage}`}><small>Stage</small><b><i className="crm-dstrip-dot" />{STAGE_LABEL[lead.stage]}</b></span>
          <span className="crm-dstrip-cell"><small>In pipeline</small><b>{Math.max(0, Math.floor((now - Date.parse(lead.created_at)) / DAY))}d</b></span>
          <span className={`crm-dstrip-cell ${idleDays(lead, now) >= 5 ? 'is-late' : ''}`}><small>Idle</small><b>{Math.max(0, idleDays(lead, now))}d</b></span>
          <span className={`crm-dstrip-cell q-${lead.quality ?? 'none'}`}><small>Score</small><b>{lead.quality_score != null ? `${lead.quality_score}` : '—'}</b></span>
          <span className={`crm-dstrip-cell t-${lead.temperature ?? 'none'}`}><small>Temp</small><b>{lead.temperature ? lead.temperature[0]!.toUpperCase() + lead.temperature.slice(1) : '—'}</b></span>
        </div>

        <BriefPanel lead={lead} onToast={onToast} />

        <div className="crm-actions" role="toolbar" aria-label="Actions">
          <button className={`crm-act ${tool === 'email' ? 'is-on' : ''}`} onClick={() => setTool(tool === 'email' ? null : 'email')} disabled={!lead.email}><span>✉</span>Email</button>
          <button className={`crm-act ${tool === 'whatsapp' ? 'is-on' : ''}`} onClick={() => setTool(tool === 'whatsapp' ? null : 'whatsapp')} disabled={!lead.phone}><span>◍</span>WhatsApp</button>
          <a className={`crm-act ${lead.phone ? '' : 'is-off'}`} href={lead.phone ? `tel:${lead.phone}` : undefined} aria-disabled={!lead.phone}><span>☏</span>Call</a>
          <button className="crm-act" onClick={callNow} disabled={!lead.phone || calling} title="The AI agent calls this lead now"><span>⚡</span>{calling ? 'Dialling…' : 'AI call now'}</button>
          <button className={`crm-act ${tool === 'book' ? 'is-on' : ''}`} onClick={() => setTool(tool === 'book' ? null : 'book')}><span>◷</span>Book call</button>
          <button className={`crm-act ${tool === 'pay' ? 'is-on' : ''}`} onClick={() => setTool(tool === 'pay' ? null : 'pay')}><span>₹</span>Pay link</button>
        </div>

        {tool === 'email' ? <EmailTool lead={lead} first={first} onDone={(m) => { onToast(m); setTool(null); refresh(); }} /> : null}
        {tool === 'whatsapp' && lead.phone ? (
          <div className="crm-tool">
            <p className="crm-label">WhatsApp message</p>
            {WA_TEMPLATES(first).map((t) => <a key={t} className="crm-wa" href={waLink(lead.phone!, t)} target="_blank" rel="noreferrer">{t}</a>)}
            <p className="crm-muted">Opens WhatsApp with the message ready; you press send.</p>
          </div>
        ) : null}
        {tool === 'book' ? <BookTool lead={lead} slots={slots} onDone={(m) => { onToast(m); setTool(null); refresh(); }} /> : null}
        {tool === 'pay' ? <PayTool lead={lead} products={products} onDone={(m) => { onToast(m); setTool(null); refresh(); }} /> : null}

        <div className="crm-stages" role="radiogroup" aria-label="Stage">
          {STAGES.map((s) => (
            <button key={s.id} role="radio" aria-checked={lead.stage === s.id} className={`crm-stage-pill stage-${s.id} ${lead.stage === s.id ? 'is-on' : ''}`} onClick={() => onMove(lead.id, s.id)}>{s.label}</button>
          ))}
        </div>

        {lead.summary ? <div className="crm-summary"><p className="crm-label">Summary</p><p>{lead.summary}</p></div> : null}
        <IntelPanel lead={lead} />
        <LeadDemos lead={lead} demos={demos} onToast={onToast} onChanged={() => { setBump((n) => n + 1); onChanged(); }} />
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
          <label className="is-wide">Next follow-up
            <span className="crm-follow">
              <input type="datetime-local" value={form.next_follow_up} onChange={set('next_follow_up')} />
              <button type="button" className="crm-chipbtn" onClick={() => followIn(1)}>Tomorrow</button>
              <button type="button" className="crm-chipbtn" onClick={() => followIn(3)}>3 days</button>
              <button type="button" className="crm-chipbtn" onClick={() => followIn(7)}>1 week</button>
            </span>
          </label>
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

function EmailTool({ lead, first, onDone }: { lead: CrmLead; first: string; onDone: (m: string) => void }) {
  const templates = EMAIL_TEMPLATES(first, lead.need ?? '');
  const [subject, setSubject] = useState(templates[0]!.subject);
  const [body, setBody] = useState(templates[0]!.body);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState('');
  async function send(e: FormEvent) {
    e.preventDefault();
    setBusy(true);
    setErr('');
    try {
      const r = await api<{ message: string }>(`/api/admin/crm/leads/${lead.id}/action`, { method: 'POST', body: JSON.stringify({ type: 'email', subject, headline: subject, body }) });
      onDone(r.message);
    } catch (x) {
      setErr((x as Error).message === 'send_failed' ? 'Email could not be sent. Is RESEND_API_KEY set?' : 'Couldn’t send.');
      setBusy(false);
    }
  }
  return (
    <form className="crm-tool" onSubmit={send}>
      <p className="crm-label">Email {lead.email} · BYBO branded, copy to byboonline@gmail.com</p>
      <div className="crm-chips">{templates.map((t) => <button type="button" key={t.id} className="crm-chipbtn" onClick={() => { setSubject(t.subject); setBody(t.body); }}>{t.label}</button>)}</div>
      <input value={subject} onChange={(e) => setSubject(e.target.value)} placeholder="Subject" required />
      <textarea rows={6} value={body} onChange={(e) => setBody(e.target.value)} required />
      {err ? <p className="crm-err">{err}</p> : null}
      <div className="crm-form-foot"><button className="crm-btn" disabled={busy || !subject.trim() || !body.trim()}>{busy ? 'Sending…' : 'Send email'}</button></div>
    </form>
  );
}

function PayTool({ lead, products, onDone }: { lead: CrmLead; products: Product[]; onDone: (m: string) => void }) {
  const [product, setProduct] = useState(products[0]?.id ?? '');
  const [busy, setBusy] = useState<'copy' | 'send' | null>(null);
  const [err, setErr] = useState('');
  async function go(send: boolean) {
    setBusy(send ? 'send' : 'copy');
    setErr('');
    try {
      const r = await api<{ url: string; message: string }>(`/api/admin/crm/leads/${lead.id}/action`, { method: 'POST', body: JSON.stringify({ type: 'paylink', product, send }) });
      if (!send) navigator.clipboard?.writeText(r.url).catch(() => {});
      onDone(send ? r.message : `${r.message}: ${r.url}`);
    } catch (x) {
      setErr((x as Error).message === 'no_email' ? 'This lead has no email. Copy the link instead.' : 'Couldn’t create the link.');
      setBusy(null);
    }
  }
  const p = products.find((x) => x.id === product);
  return (
    <div className="crm-tool">
      <p className="crm-label">Payment link · PhonePe checkout on bybo.in/pay</p>
      <select value={product} onChange={(e) => setProduct(e.target.value)}>
        {products.map((x) => <option key={x.id} value={x.id}>{x.name} · {inr(x.price)}</option>)}
      </select>
      {err ? <p className="crm-err">{err}</p> : null}
      <div className="crm-form-foot">
        <button className="crm-btn is-ghost" onClick={() => go(false)} disabled={!!busy}>{busy === 'copy' ? 'Copying…' : 'Copy link'}</button>
        <button className="crm-btn" onClick={() => go(true)} disabled={!!busy || !lead.email}>{busy === 'send' ? 'Sending…' : `Email ${p ? inr(p.price) : ''} link`}</button>
      </div>
    </div>
  );
}

function BookTool({ lead, slots, onDone }: { lead: CrmLead; slots: Slot[]; onDone: (m: string) => void }) {
  const [slot, setSlot] = useState(slots[0]?.id ?? '');
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState('');
  const ready = lead.name && lead.email && lead.phone;
  async function book() {
    setBusy(true);
    setErr('');
    try {
      const r = await api<{ message: string }>(`/api/admin/crm/leads/${lead.id}/action`, { method: 'POST', body: JSON.stringify({ type: 'book', slot }) });
      onDone(r.message);
    } catch (x) {
      const m = (x as Error).message;
      setErr(m === 'slot_gone' ? 'That slot just passed. Pick another.' : m === 'needs_contact' ? 'Needs a name, email and phone first.' : 'Couldn’t book. Is email set up?');
      setBusy(false);
    }
  }
  return (
    <div className="crm-tool">
      <p className="crm-label">Book a 30-minute discovery call · invite goes to the lead and the team</p>
      {!ready ? <p className="crm-muted">Add a name, email and phone to book.</p> : null}
      <select value={slot} onChange={(e) => setSlot(e.target.value)}>{slots.map((s) => <option key={s.id} value={s.id}>{s.label}</option>)}</select>
      {err ? <p className="crm-err">{err}</p> : null}
      <div className="crm-form-foot"><button className="crm-btn" onClick={book} disabled={busy || !ready || !slot}>{busy ? 'Booking…' : 'Book and send invite'}</button></div>
    </div>
  );
}

function CopyBtn({ text, label, onToast }: { text: string; label: string; onToast: (t: string) => void }) {
  return (
    <button type="button" className="crm-chipbtn crm-copy" onClick={() => { navigator.clipboard?.writeText(text).then(() => onToast(`${label} copied`), () => onToast('Couldn’t copy')); }}>
      <Icon name="copy" size={13} />Copy
    </button>
  );
}

/** Asks Claude for a read of the lead from its data and history only, with drafts the founder sends by hand. */
function BriefPanel({ lead, onToast }: { lead: CrmLead; onToast: (t: string) => void }) {
  const [brief, setBrief] = useState<Brief | null>(null);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState('');
  async function run() {
    setBusy(true);
    setErr('');
    try { setBrief((await api<{ brief: Brief }>(`/api/admin/crm/leads/${lead.id}/brief`, { method: 'POST' })).brief); }
    catch (x) { setErr((x as Error).message === 'anthropic_not_configured' ? 'AI is not set up: add ANTHROPIC_API_KEY.' : 'Couldn’t write the brief. Try again.'); }
    setBusy(false);
  }
  const first = (lead.name ?? '').split(' ')[0] || 'there';
  if (!brief) {
    return (
      <div className="crm-brief is-idle">
        <span className="crm-brief-ico"><Icon name="sparkle" size={16} /></span>
        <span className="crm-due-text"><b>AI brief</b><small>{err || 'Summary, risks, next step and drafts from this lead’s data only.'}</small></span>
        <button className="crm-btn" onClick={run} disabled={busy}>{busy ? 'Thinking…' : 'Write brief'}</button>
      </div>
    );
  }
  return (
    <section className="crm-brief" aria-label="AI brief">
      <header><span className="crm-brief-ico"><Icon name="sparkle" size={16} /></span><b>AI brief</b><button className="crm-link" onClick={run} disabled={busy}>{busy ? 'Rewriting…' : 'Regenerate'}</button></header>
      {brief.summary ? <p>{brief.summary}</p> : null}
      {brief.stage_read ? <p className="crm-brief-read"><small>Stage read</small>{brief.stage_read}</p> : null}
      {brief.risks.length ? <div><small className="crm-brief-k">Risks</small><ul>{brief.risks.map((r) => <li key={r}>{r}</li>)}</ul></div> : null}
      {brief.next_step ? <p className="crm-brief-next"><Icon name="open" size={14} />{brief.next_step}</p> : null}
      {brief.whatsapp_draft ? (
        <div className="crm-brief-draft">
          <small className="crm-brief-k">WhatsApp draft</small>
          <p>{brief.whatsapp_draft}</p>
          <span className="crm-brief-acts"><CopyBtn text={brief.whatsapp_draft} label="WhatsApp draft" onToast={onToast} />{lead.phone ? <a className="crm-chipbtn" href={waLink(lead.phone, brief.whatsapp_draft)} target="_blank" rel="noreferrer">Open in WhatsApp</a> : null}</span>
        </div>
      ) : null}
      {brief.email_draft ? (
        <div className="crm-brief-draft">
          <small className="crm-brief-k">Email draft</small>
          <p>{brief.email_draft}</p>
          <span className="crm-brief-acts"><CopyBtn text={brief.email_draft} label="Email draft" onToast={onToast} />{lead.email ? <a className="crm-chipbtn" href={`mailto:${lead.email}?subject=${encodeURIComponent(`BYBO for ${lead.company || first}`)}&body=${encodeURIComponent(brief.email_draft)}`}>Open in mail</a> : null}</span>
        </div>
      ) : null}
      {err ? <p className="crm-err">{err}</p> : null}
    </section>
  );
}
