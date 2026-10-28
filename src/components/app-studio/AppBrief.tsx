'use client';

import { useState, type FormEvent } from 'react';
import { ArrowRight, Check, ShieldCheck } from 'lucide-react';
import { trackLead } from '@/lib/analytics';
import { CONTACT } from '@/lib/site';

const KINDS = ['A customer app', 'A store or marketplace', 'Bookings or appointments', 'An internal tool for my team', 'A web app or SaaS product', 'Not sure yet'];
const STAGES = ['Just an idea', 'Designs are ready', 'An existing app to improve'];
const PLATFORMS = ['iPhone', 'Android', 'Web'];

/** The lead form. Posts to the same endpoint as /apply; falls back to the visitor's email client if the inbox is down. */
export function AppBrief({ id }: { id: string }) {
  const [state, setState] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');
  const [fallback, setFallback] = useState('');
  const [picked, setPicked] = useState<string[]>(['iPhone', 'Android']);

  async function send(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const kind = String(data.get('kind') || 'Not sure yet');
    const stage = String(data.get('stage') || 'Just an idea');
    data.set('message', `App enquiry from the app studio page.\nThe app: ${kind}\nPlatforms: ${picked.length ? picked.join(', ') : 'Not sure yet'}\nWhere it is: ${stage}`);
    data.append('services', 'App Design & Development');
    setState('sending'); setFallback('');
    try {
      const res = await fetch('/api/enquiry', { method: 'POST', body: data });
      const out = await res.json().catch(() => ({ ok: false }));
      if (out.ok) { setState('sent'); trackLead({ content_name: 'app_studio_enquiry' }); form.reset(); return; }
      setFallback(`mailto:${CONTACT.email}?subject=${encodeURIComponent(`App enquiry from ${data.get('name')}`)}&body=${encodeURIComponent(String(data.get('message')) + `\n\nName: ${data.get('name')}\nEmail: ${data.get('email')}`)}`);
      setState('error');
    } catch { setState('error'); }
  }

  if (state === 'sent') return (
    <div className="as-form as-form-sent" role="status">
      <span className="as-sent-icon"><Check size={28} /></span>
      <h3>That is with us.</h3>
      <p>We read every enquiry ourselves and reply within one working day, usually sooner.</p>
    </div>
  );

  return (
    <form className="as-form" onSubmit={send} aria-labelledby={`${id}-title`}>
      <p className="as-form-title" id={`${id}-title`}>Tell us about the app</p>
      <div className="as-fields">
        <label><span>Your name</span><input name="name" required autoComplete="name" placeholder="Priya Sharma" /></label>
        <label><span>Work email</span><input name="email" type="email" required autoComplete="email" inputMode="email" placeholder="priya@company.in" /></label>
        <label><span>What are you building?</span><select name="kind" defaultValue="A customer app">{KINDS.map(k => <option key={k}>{k}</option>)}</select></label>
        <fieldset className="as-platforms">
          <legend>Where should it run?</legend>
          <div>
            {PLATFORMS.map(p => (
              <label key={p} data-on={picked.includes(p) ? '' : undefined}>
                <input type="checkbox" checked={picked.includes(p)} onChange={() => setPicked(v => v.includes(p) ? v.filter(x => x !== p) : [...v, p])} />
                {picked.includes(p) && <Check size={15} />}{p}
              </label>
            ))}
          </div>
        </fieldset>
        <label><span>Where is it today?</span><select name="stage" defaultValue="Just an idea">{STAGES.map(s => <option key={s}>{s}</option>)}</select></label>
      </div>
      <input type="text" name="company_website" tabIndex={-1} autoComplete="off" aria-hidden className="as-trap" />
      <button className="as-btn as-btn-full" disabled={state === 'sending'}>{state === 'sending' ? 'Sending…' : <>Start my app <ArrowRight size={19} /></>}</button>
      <p className="as-form-note"><ShieldCheck size={14} /> Free to talk. We reply within one working day.</p>
      {state === 'error' && <p className="as-form-error" role="alert">That did not send. {fallback ? <a href={fallback}>Email it to us instead</a> : <>Please email <a href={CONTACT.emailHref}>{CONTACT.email}</a>.</>}</p>}
    </form>
  );
}
