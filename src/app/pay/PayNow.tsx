'use client';

import { useState } from 'react';
import { CONTACT } from '@/lib/site';
import type { Product } from '@/lib/payments/products';

const inr = (n: number) => `₹${n.toLocaleString('en-IN', { maximumFractionDigits: 2 })}`;

export function PayNow({ products }: { products: Product[] }) {
  const [choice, setChoice] = useState<string | null>(null); // product id, or 'custom'
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [amount, setAmount] = useState('');
  const product = products.find((p) => p.id === choice) ?? null;

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setBusy(true);
    setError('');
    try {
      const res = await fetch('/api/pay/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...Object.fromEntries(new FormData(e.currentTarget).entries()), product: product?.id ?? '' }),
      });
      const data = await res.json().catch(() => ({}));
      if (data.ok && data.redirectUrl) { window.location.assign(data.redirectUrl); return; }
      setError({
        invalid: 'Check your name, email, phone and the amount.',
        not_configured: `Online payment is being switched on. Please email ${CONTACT.email} to pay.`,
        rate_limited: 'Too many attempts. Please wait a few minutes.',
      }[data.reason as string] ?? "PhonePe didn't respond. Please try again in a moment.");
    } catch {
      setError('Connection dropped. Please try again.');
    }
    setBusy(false);
  }

  const total = product ? product.price : Number(amount);
  const label = total >= 1 ? `Pay ${inr(total)} with PhonePe` : 'Pay with PhonePe';

  return (
    <>
      <div className="pay-products">
        {products.map((p) => (
          <article key={p.id} className={choice === p.id ? 'pay-product is-on' : 'pay-product'}>
            <div className="pay-product-top">
              <div><h2>{p.name}</h2><p className="pay-product-lead">{p.lead}</p></div>
              <p className="pay-price">{inr(p.price)}</p>
            </div>
            <p className="pay-product-desc">{p.description}</p>
            <ul>{p.includes.map((i) => <li key={i}>{i}</li>)}</ul>
            <button type="button" className="pay-btn" onClick={() => setChoice(p.id)}>{choice === p.id ? 'Selected' : `Buy ${p.name}: ${inr(p.price)}`}</button>
          </article>
        ))}
      </div>

      {choice !== 'custom' && !choice && (
        <button type="button" className="pay-link" onClick={() => setChoice('custom')}>Paying an invoice or quote instead? Enter the amount</button>
      )}

      {choice && (
        <form className="pay-form" onSubmit={submit}>
          <p className="pay-step">{product ? `${product.name} · ${inr(product.price)}` : 'Pay an invoice or quote'}</p>
          {!product && (
            <>
              <label>Amount (₹)<input name="amount" type="number" required min={1} max={5000000} step="0.01" inputMode="decimal" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="0" style={{ fontSize: 22, fontWeight: 700 }} /></label>
              <label>What it&apos;s for<input name="purpose" maxLength={160} placeholder="e.g. Website project, first milestone" /></label>
            </>
          )}
          <div className="pay-row">
            <label>Your name<input name="name" required maxLength={120} autoComplete="name" /></label>
            <label>Company<input name="company" maxLength={160} autoComplete="organization" /></label>
          </div>
          <div className="pay-row">
            <label>Email (for the receipt)<input name="email" type="email" required maxLength={200} autoComplete="email" /></label>
            <label>Phone<input name="phone" type="tel" required maxLength={30} autoComplete="tel" /></label>
          </div>
          {!product && <label>Invoice or quote number (optional)<input name="reference" maxLength={40} /></label>}
          <button className="pay-btn" type="submit" disabled={busy}>{busy ? 'Opening PhonePe…' : label}</button>
          {error && <p className="pay-err" role="alert">{error}</p>}
          <button type="button" className="pay-link" onClick={() => { setChoice(null); setError(''); }}>Back</button>
        </form>
      )}
      <p className="pay-note">Secure checkout by PhonePe: UPI, cards and netbanking. BYBO never sees your card or bank details. A receipt is emailed to you.</p>
    </>
  );
}
