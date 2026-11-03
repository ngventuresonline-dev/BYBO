'use client';

import { useEffect, useRef, useState } from 'react';
import type { ProposalStatus } from '@/lib/crm/proposals';

/** Accept and ask buttons, and the one-time "viewed" ping. Team previews (?preview=1) never count as a view. */
export function ProposalActions({ token, status, expired, preview, ask }: { token: string; status: ProposalStatus; expired: boolean; preview: boolean; ask: string }) {
  const [state, setState] = useState<ProposalStatus>(status);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [confirming, setConfirming] = useState(false);
  const pinged = useRef(false);

  useEffect(() => {
    if (preview || status !== 'sent' || pinged.current) return;
    pinged.current = true;
    fetch(`/api/proposal/${token}`, { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ action: 'view' }), keepalive: true }).catch(() => null);
  }, [preview, status, token]);

  async function accept() {
    setBusy(true);
    setError('');
    try {
      const res = await fetch(`/api/proposal/${token}`, { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ action: 'accept' }) });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || data.ok === false) throw new Error(data.message || 'Something went wrong. Try again, or message us.');
      setState('accepted');
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setBusy(false);
      setConfirming(false);
    }
  }

  if (state === 'accepted') {
    return (
      <section className="prop-cta is-done" aria-live="polite">
        <span className="prop-tick" aria-hidden="true">✓</span>
        <div>
          <h2>Proposal accepted</h2>
          <p>Thank you. Our team has been told and will be in touch shortly with the first payment link and a start date.</p>
        </div>
        <a className="prop-btn is-ghost" href={ask} target="_blank" rel="noreferrer">Message us on WhatsApp</a>
      </section>
    );
  }

  const open = (state === 'sent' || state === 'viewed') && !expired;
  return (
    <section className="prop-cta" aria-live="polite">
      <div>
        <h2>{state === 'declined' ? 'This proposal was declined' : expired ? 'This proposal has expired' : 'Ready to begin?'}</h2>
        <p>{state === 'declined' || expired ? 'Message us and we will put together a fresh one.' : state === 'draft' ? 'This is a draft. Buttons go live once it is sent.' : 'Accept to confirm the scope above. We will follow up with the first payment link and a start date.'}</p>
      </div>
      <div className="prop-btns">
        {open && !confirming ? <button type="button" className="prop-btn" onClick={() => setConfirming(true)} disabled={preview}>Accept proposal</button> : null}
        {open && confirming ? (
          <>
            <button type="button" className="prop-btn" onClick={accept} disabled={busy}>{busy ? 'Confirming…' : 'Yes, accept'}</button>
            <button type="button" className="prop-btn is-ghost" onClick={() => setConfirming(false)} disabled={busy}>Not yet</button>
          </>
        ) : null}
        {!confirming ? <a className="prop-btn is-ghost" href={ask} target="_blank" rel="noreferrer">Ask a question</a> : null}
      </div>
      {preview && open ? <p className="prop-fine">Preview mode: accepting is turned off.</p> : null}
      {error ? <p className="prop-err" role="alert">{error}</p> : null}
    </section>
  );
}
