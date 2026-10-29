'use client';

import { useEffect, useRef, useState } from 'react';
import { CONTACT } from '@/lib/site';
import type { Product } from '@/lib/payments/products';

const inr = (n: number) => `₹${n.toLocaleString('en-IN', { maximumFractionDigits: 2 })}`;

export function PayNow({ products, initial }: { products: Product[]; initial?: string }) {
  const [choice, setChoice] = useState<string | null>(initial && products.some((p) => p.id === initial) ? initial : null); // product id, or 'custom'
  const formRef = useRef<HTMLFormElement>(null);

  // Arriving from a service page with a package chosen: bring its form into view.
  useEffect(() => {
    if (initial) formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }, [initial]);

  const groups = [...new Set(products.map((p) => p.group))];

  return (
    <>
      {groups.map((g) => (
        <section key={g} className="pay-group">
          <h2 className="pay-group-title">{g}</h2>
          <div className="pay-products">
            {products.filter((p) => p.group === g).map((p) => (
              <article key={p.id} id={p.id} className={choice === p.id ? 'pay-product is-on' : 'pay-product'}>
                <div className="pay-product-top">
                  <div><h3>{p.name}</h3><p className="pay-product-lead">{p.lead}</p></div>
                  <p className="pay-price">{inr(p.price)}</p>
                </div>
                <p className="pay-product-desc">{p.description}</p>
                <ul>{p.includes.map((i) => <li key={i}>{i}</li>)}</ul>
                {choice === p.id
                  ? <Checkout product={p} formRef={formRef} onBack={() => setChoice(null)} />
                  : <button type="button" className="pay-btn" onClick={() => setChoice(p.id)}>Buy {p.name}: {inr(p.price)}</button>}
              </article>
            ))}
          </div>
        </section>
      ))}

      <section className="pay-group">
        <h2 className="pay-group-title">Pay an invoice or quote</h2>
        {choice === 'custom'
          ? <div className="pay-product is-on"><Checkout product={null} formRef={formRef} onBack={() => setChoice(null)} /></div>
          : <button type="button" className="pay-btn is-ghost" onClick={() => setChoice('custom')}>Enter an amount</button>}
      </section>
      <p className="pay-note">Secure checkout by PhonePe: UPI, cards and netbanking. BYBO never sees your card or bank details. A receipt is emailed to you.</p>
    </>
  );
}

function Checkout({ product, formRef, onBack }: { product: Product | null; formRef: React.RefObject<HTMLFormElement | null>; onBack: () => void }) {
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [amount, setAmount] = useState('');

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
  return (
    <form ref={formRef} className="pay-form" onSubmit={submit}>
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
      <button className="pay-btn" type="submit" disabled={busy}>{busy ? 'Opening PhonePe…' : total >= 1 ? `Pay ${inr(total)} with PhonePe` : 'Pay with PhonePe'}</button>
      {error && <p className="pay-err" role="alert">{error}</p>}
      <button type="button" className="pay-link" onClick={onBack}>Cancel</button>
    </form>
  );
}
