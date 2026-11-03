'use client';

import { useState, type FormEvent } from 'react';
import { useRouter } from 'next/navigation';

/** Signs in with the admin password. Shares the session with the Instagram desk. */
export function CrmLogin() {
  const router = useRouter();
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [pending, setPending] = useState(false);

  async function submit(event: FormEvent) {
    event.preventDefault();
    setPending(true);
    setError('');
    try {
      const res = await fetch('/api/admin/instagram/session', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ password }),
      });
      if (!res.ok) setError(res.status === 503 ? 'Admin access is not configured.' : 'That password did not match.');
      else router.refresh();
    } catch {
      setError('The desk could not be reached.');
    }
    setPending(false);
  }

  return (
    <form className="crm-login" onSubmit={submit}>
      <div className="crm-logo" aria-hidden="true">B</div>
      <p className="crm-kicker">BYBO · Leads</p>
      <h1>Every lead, one place.</h1>
      <p>Website enquiries, B chats, Meta lead forms, AI calls, bookings and payments.</p>
      <label>
        Admin password
        <input type="password" autoComplete="current-password" value={password} onChange={(e) => setPassword(e.target.value)} required />
      </label>
      {error ? <p className="crm-err" role="alert">{error}</p> : null}
      <button className="crm-btn" type="submit" disabled={pending}>{pending ? 'Checking…' : 'Open leads'}</button>
    </form>
  );
}
