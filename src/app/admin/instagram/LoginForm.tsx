'use client';

import { useState, type FormEvent } from 'react';
import { useRouter } from 'next/navigation';

export function LoginForm() {
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
      if (!res.ok) {
        setError(res.status === 503 ? 'Admin access is not configured.' : 'That password did not match.');
        setPending(false);
        return;
      }
      router.refresh();
      setPending(false);
    } catch {
      setError('The desk could not be reached.');
      setPending(false);
    }
  }

  return (
    <form className="ig-card" onSubmit={submit}>
      <p className="ig-kicker">BYBO · @byboindia</p>
      <h1>Instagram desk</h1>
      <p>This page is for the founder. Nothing here is public, and nothing is posted from the sign-in screen.</p>
      <label>
        Admin password
        <input
          type="password"
          name="password"
          autoComplete="current-password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          required
        />
      </label>
      {error ? <p className="ig-warn" role="alert">{error}</p> : null}
      <button className="ig-primary" type="submit" disabled={pending}>{pending ? 'Checking…' : 'Open the desk'}</button>
    </form>
  );
}
