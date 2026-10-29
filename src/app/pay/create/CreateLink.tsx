'use client';

import { useState } from 'react';

type Result = { url: string; id: string; emailed: boolean };

export function CreateLink() {
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [result, setResult] = useState<Result | null>(null);
  const [copied, setCopied] = useState(false);

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    setBusy(true);
    setError('');
    setResult(null);
    try {
      const res = await fetch('/api/pay/link', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...Object.fromEntries(f.entries()), send: f.get('send') === 'on' }),
      });
      const data = await res.json().catch(() => ({}));
      if (data.ok) setResult(data);
      else setError({
        unauthorized: 'That admin key is wrong.',
        invalid: 'Check the name, email, purpose and amount (₹1 to ₹50,00,000).',
        not_configured: 'Payment links are not set up yet: PAYMENTS_LINK_SECRET is missing in Vercel.',
        rate_limited: 'Too many attempts. Wait a few minutes.',
      }[data.reason as string] ?? 'Something went wrong. Try again.');
    } catch {
      setError('Connection dropped. Try again.');
    }
    setBusy(false);
  }

  async function copy() {
    if (!result) return;
    try { await navigator.clipboard.writeText(result.url); setCopied(true); setTimeout(() => setCopied(false), 2000); } catch {}
  }

  return (
    <form className="pay-form" onSubmit={submit}>
      <div className="pay-row">
        <label>Client name<input name="name" required maxLength={120} /></label>
        <label>Company<input name="company" maxLength={160} /></label>
      </div>
      <div className="pay-row">
        <label>Client email<input name="email" type="email" required maxLength={200} /></label>
        <label>Phone<input name="phone" type="tel" maxLength={30} /></label>
      </div>
      <label>What it&apos;s for<input name="purpose" required maxLength={160} placeholder="e.g. Blueprint: website and lead desk" /></label>
      <div className="pay-row">
        <label>Amount (₹)<input name="amount" type="number" required min={1} max={5000000} step="0.01" inputMode="decimal" /></label>
        <label>Reference (optional)<input name="id" maxLength={40} placeholder="Auto if blank" /></label>
      </div>
      <label>Admin key<input name="key" type="password" required autoComplete="current-password" /></label>
      <label className="pay-check"><input name="send" type="checkbox" defaultChecked /> Email the link to the client</label>
      <button className="pay-btn" type="submit" disabled={busy}>{busy ? 'Creating…' : 'Create payment link'}</button>
      {error && <p className="pay-err" role="alert">{error}</p>}
      {result && (
        <div className="pay-ok">
          <p style={{ margin: '0 0 8px' }}><b>Link ready</b> · {result.id}{result.emailed ? ' · emailed to the client' : ''}</p>
          <p style={{ margin: '0 0 10px' }}>{result.url}</p>
          <button type="button" className="pay-btn is-ghost" style={{ marginTop: 0 }} onClick={copy}>{copied ? 'Copied' : 'Copy link'}</button>
        </div>
      )}
    </form>
  );
}
