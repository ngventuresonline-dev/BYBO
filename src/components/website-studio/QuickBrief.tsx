'use client';

import { useState, type FormEvent } from 'react';
import { ArrowRight, Check, ShieldCheck } from 'lucide-react';
import { trackLead } from '@/lib/analytics';
import { CONTACT } from '@/lib/site';

const GOALS = ['Get more enquiries', 'Sell products online', 'Take bookings', 'Show my work', 'Explain a product or app', 'Not sure yet'];

/** The lead form. Posts to the same endpoint as /apply; falls back to the visitor's email client if the inbox is down. */
export function QuickBrief({ id }: { id: string }) {
  const [state, setState] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');
  const [fallback, setFallback] = useState('');

  async function send(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const goal = String(data.get('goal') || 'Not sure yet');
    const site = String(data.get('website') || '').trim();
    data.set('message', `Website enquiry from the website studio page.\nThe site needs to: ${goal}\nCurrent website: ${site || 'None yet'}`);
    data.append('services', 'Website Design & Development');
    setState('sending'); setFallback('');
    try {
      const res = await fetch('/api/enquiry', { method: 'POST', body: data });
      const out = await res.json().catch(() => ({ ok: false }));
      if (out.ok) { setState('sent'); trackLead({ content_name: 'website_studio_enquiry' }); form.reset(); return; }
      setFallback(`mailto:${CONTACT.email}?subject=${encodeURIComponent(`Website enquiry from ${data.get('name')}`)}&body=${encodeURIComponent(String(data.get('message')) + `\n\nName: ${data.get('name')}\nEmail: ${data.get('email')}`)}`);
      setState('error');
    } catch { setState('error'); }
  }

  if (state === 'sent') return (
    <div className="ws-form ws-form-sent" role="status">
      <span className="ws-sent-icon"><Check size={28} /></span>
      <h3>That is with us.</h3>
      <p>We read every enquiry ourselves and reply within one working day, usually sooner.</p>
    </div>
  );

  return (
    <form className="ws-form" onSubmit={send} aria-labelledby={`${id}-title`}>
      <p className="ws-form-title" id={`${id}-title`}>Tell us about the website</p>
      <div className="ws-fields">
        <label><span>Your name</span><input name="name" required autoComplete="name" placeholder="Priya Sharma" /></label>
        <label><span>Work email</span><input name="email" type="email" required autoComplete="email" inputMode="email" placeholder="priya@company.in" /></label>
        <label><span>The site needs to…</span><select name="goal" defaultValue="Get more enquiries">{GOALS.map(g => <option key={g}>{g}</option>)}</select></label>
        <label><span>Current website <em>(optional)</em></span><input name="website" inputMode="url" autoComplete="url" placeholder="yourbusiness.in" /></label>
        <label><span>Phone <em>(optional)</em></span><input name="phone" type="tel" autoComplete="tel" inputMode="tel" placeholder="+91 98765 43210" maxLength={30} /></label>
      </div>
      <label className="ws-consent"><input type="checkbox" name="call_consent" value="yes" /><span>BYBO may call or WhatsApp me about this enquiry</span></label>
      <input type="text" name="company_website" tabIndex={-1} autoComplete="off" aria-hidden className="ws-trap" />
      <button className="ws-btn ws-btn-full" disabled={state === 'sending'}>{state === 'sending' ? 'Sending…' : <>Start my website <ArrowRight size={19} /></>}</button>
      <p className="ws-form-note"><ShieldCheck size={14} /> Free to talk. We reply within one working day.</p>
      {state === 'error' && <p className="ws-form-error" role="alert">That did not send. {fallback ? <a href={fallback}>Email it to us instead</a> : <>Please email <a href={CONTACT.emailHref}>{CONTACT.email}</a>.</>}</p>}
    </form>
  );
}
