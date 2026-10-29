'use client';

import { useState } from 'react';
import { CONTACT } from '@/lib/site';

export function PayButton({ token, label }: { token: string; label: string }) {
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');

  async function pay() {
    setBusy(true);
    setError('');
    try {
      const res = await fetch('/api/pay/start', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ token }) });
      const data = await res.json().catch(() => ({}));
      if (data.ok && data.redirectUrl) { window.location.href = data.redirectUrl; return; }
      setError(data.reason === 'not_configured'
        ? `Online payment is being set up. Please contact ${CONTACT.email} to pay.`
        : data.reason === 'invalid_link'
          ? 'This link has expired. Ask us for a fresh one.'
          : "PhonePe didn't respond. Please try again in a moment.");
    } catch {
      setError('Connection dropped. Please try again.');
    }
    setBusy(false);
  }

  return (
    <>
      <button type="button" className="pay-btn" onClick={pay} disabled={busy}>{busy ? 'Opening PhonePe…' : label}</button>
      {error && <p className="pay-err" role="alert">{error}</p>}
    </>
  );
}
