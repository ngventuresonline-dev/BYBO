'use client';

/* eslint-disable @next/next/no-img-element -- the prospect's own product photos */
import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import { readRecords, useCart, type DemoEnquiry, type DemoOrder } from './store';

type P = { title: string; handle: string; image: string | null; price: number | null };
const inr = (n: number) => `₹${Math.round(n).toLocaleString('en-IN')}`;
const CITIES = ['Mumbai', 'Bengaluru', 'Delhi', 'Pune', 'Hyderabad', 'Chennai', 'Kolkata', 'Jaipur', 'Ahmedabad', 'Lucknow'];
const NAMES = ['Priya S.', 'Ananya R.', 'Neha K.', 'Sneha P.', 'Kavya M.', 'Ritu J.', 'Pooja D.', 'Aisha K.', 'Meera N.', 'Divya T.'];

/** A small seeded random so sample figures stay the same on every visit. */
function seeded(seed: string) {
  let h = 2166136261;
  for (const ch of seed) h = Math.imul(h ^ ch.charCodeAt(0), 16777619);
  return () => { h = Math.imul(h ^ (h >>> 15), 2246822507); h = Math.imul(h ^ (h >>> 13), 3266489909); return ((h ^= h >>> 16) >>> 0) / 4294967296; };
}

const SECTIONS = ['Overview', 'Orders', 'Customers', 'Campaigns', 'Automations', 'Products'] as const;

/**
 * The owner's side of the demo: what running the store on BYBO's system looks
 * like. Orders and enquiries made on this demo show up live; everything else
 * is clearly marked sample data.
 */
export function Dashboard({ brand, products }: { brand: string; products: P[] }) {
  const { base, lines } = useCart();
  const [tab, setTab] = useState<(typeof SECTIONS)[number]>('Overview');
  const [orders, setOrders] = useState<DemoOrder[]>([]);
  const [enquiries, setEnquiries] = useState<DemoEnquiry[]>([]);
  const [auto, setAuto] = useState<Record<string, boolean>>({ confirm: true, cart: true, ship: true, review: true, replace: true, reorder: false });
  useEffect(() => {
    const t = setTimeout(() => { setOrders(readRecords<DemoOrder>(base, 'orders')); setEnquiries(readRecords<DemoEnquiry>(base, 'enquiries')); }, 0);
    return () => clearTimeout(t);
  }, [base]);

  const sample = useMemo(() => {
    const r = seeded(brand);
    const priced = products.filter((p) => p.price);
    const days = Array.from({ length: 14 }, (_, i) => Math.round((18 + r() * 22) * (0.8 + i / 30)));
    const recent = Array.from({ length: 7 }, (_, i) => {
      const p = priced[Math.floor(r() * priced.length)];
      const qty = r() > 0.75 ? 2 : 1;
      return { id: `${brand.slice(0, 3).toUpperCase()}-${String(482113 - i * 37)}`, name: NAMES[i % NAMES.length]!, city: CITIES[Math.floor(r() * CITIES.length)]!, item: p?.title ?? 'Order', qty, total: (p?.price ?? 0) * qty, status: ['Packed', 'Shipped', 'Delivered', 'New', 'Shipped', 'Delivered', 'Delivered'][i]!, pay: ['UPI', 'COD', 'UPI', 'Card', 'UPI', 'COD', 'UPI'][i]! };
    });
    const top = priced.slice(0, 5).map((p) => ({ ...p, sold: Math.round(40 + r() * 160) })).sort((a, b) => b.sold - a.sold);
    return { days, recent, top, aov: Math.round(priced.reduce((n, p) => n + (p.price ?? 0), 0) / Math.max(1, priced.length) * 1.3) };
  }, [brand, products]);

  const live = orders.reduce((n, o) => n + o.total, 0);
  const today = sample.days.at(-1)! + orders.length;
  const revenue = today * sample.aov + live;
  const max = Math.max(...sample.days);
  const pts = sample.days.map((d, i) => `${(i / 13) * 100},${100 - (d / max) * 86}`).join(' ');

  return (
    <div className="db">
      <aside className="db-side">
        <Link href={base} className="db-brand">{brand}<small>Owner dashboard</small></Link>
        <nav>{SECTIONS.map((s) => <button key={s} type="button" className={s === tab ? 'is-on' : ''} onClick={() => setTab(s)}>{s}{s === 'Orders' && orders.length ? <i>{orders.length}</i> : s === 'Customers' && enquiries.length ? <i>{enquiries.length}</i> : null}</button>)}</nav>
        <p className="db-note">Powered by BYBO. Orders and messages you make on this demo appear here live; other figures are sample data.</p>
      </aside>

      <section className="db-main">
        <header className="db-top">
          <div><p className="demo-kicker">Owner view</p><h1>{tab === 'Overview' ? `${brand} today` : tab}</h1></div>
          <Link className="demo-btn is-small" href={`${base}/shop`}>View store →</Link>
        </header>

        {tab === 'Overview' ? (
          <>
            <div className="db-kpis">
              <article><span>Revenue today</span><b>{inr(revenue)}</b><em className="up">▲ 18% vs last week</em></article>
              <article><span>Orders today</span><b>{today}</b><em className="up">{orders.length ? `${orders.length} from this demo` : '▲ 12%'}</em></article>
              <article><span>Average order</span><b>{inr(sample.aov)}</b><em>Bundles lift it</em></article>
              <article><span>Carts recovered</span><b>{Math.round(today * 0.22)}</b><em className="up">via WhatsApp</em></article>
            </div>
            <div className="db-grid">
              <article className="db-card db-chart">
                <header><h3>Orders, last 14 days</h3><span className="db-tag">Sample</span></header>
                <svg viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
                  <defs><linearGradient id="dbg" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stopColor="var(--accent)" stopOpacity=".35" /><stop offset="1" stopColor="var(--accent)" stopOpacity="0" /></linearGradient></defs>
                  <polygon points={`0,100 ${pts} 100,100`} fill="url(#dbg)" />
                  <polyline points={pts} fill="none" stroke="var(--accent)" strokeWidth="1.2" vectorEffect="non-scaling-stroke" />
                </svg>
              </article>
              <article className="db-card">
                <header><h3>Bestsellers</h3><span className="db-tag">Sample</span></header>
                <ul className="db-top5">{sample.top.map((p) => <li key={p.handle}><span className="db-thumb">{p.image ? <img src={p.image} alt="" /> : null}</span><b>{p.title}</b><em>{p.sold} sold</em></li>)}</ul>
              </article>
            </div>
            <Orders live={orders} sample={sample.recent} compact />
            <div className="db-grid">
              <article className="db-card">
                <header><h3>Live in carts now</h3><span className="db-tag is-live">Live</span></header>
                {lines.length ? <ul className="db-top5">{lines.map((l) => <li key={l.handle}><span className="db-thumb">{l.image ? <img src={l.image} alt="" /> : null}</span><b>{l.title} × {l.qty}</b><em>{inr(l.price * l.qty)}</em></li>)}</ul> : <p className="db-empty">No open carts. Add something in the store and it shows up here; if it is left, WhatsApp follows up after an hour.</p>}
              </article>
              <article className="db-card">
                <header><h3>Latest messages</h3><span className="db-tag is-live">Live</span></header>
                {enquiries.length ? <ul className="db-msgs">{enquiries.slice(0, 4).map((e) => <li key={e.at}><b>{e.name}</b><span>{e.message}</span></li>)}</ul> : <p className="db-empty">Messages from the contact page land here, and the customer gets an instant WhatsApp reply.</p>}
              </article>
            </div>
          </>
        ) : null}

        {tab === 'Orders' ? <Orders live={orders} sample={sample.recent} /> : null}

        {tab === 'Customers' ? (
          <article className="db-card">
            <header><h3>Messages and enquiries</h3><span className="db-tag is-live">Live</span></header>
            {enquiries.length ? <ul className="db-msgs">{enquiries.map((e) => <li key={e.at}><b>{e.name} · {e.contact}</b><span>{e.message}</span><small>{new Date(e.at).toLocaleString('en-IN')}</small></li>)}</ul> : <p className="db-empty">No messages yet. Send one from the <Link href={`${base}/contact`}>contact page</Link> to see it arrive.</p>}
          </article>
        ) : null}

        {tab === 'Campaigns' ? (
          <article className="db-card">
            <header><h3>Campaigns</h3><span className="db-tag">Sample</span></header>
            <table className="db-table">
              <thead><tr><th>Campaign</th><th>Channel</th><th>Spend</th><th>Orders</th><th>Return</th><th>Status</th></tr></thead>
              <tbody>
                {[['Bestseller retargeting', 'Instagram', 4200, 61, 'Live'], ['Search: face trimmer', 'Google', 3100, 38, 'Live'], ['Festive gifting', 'Instagram', 2600, 27, 'Scheduled'], ['Abandoned cart', 'WhatsApp', 0, 44, 'Always on'], ['Win-back, 60 days', 'WhatsApp', 0, 19, 'Always on']].map(([n, c, s, o, st]) => (
                  <tr key={n as string}><td><b>{n}</b></td><td>{c}</td><td>{s ? inr(s as number) : 'Free'}</td><td>{o}</td><td>{s ? `${(((o as number) * sample.aov) / (s as number)).toFixed(1)}×` : '—'}</td><td><span className={`db-pill ${st === 'Scheduled' ? '' : 'is-on'}`}>{st}</span></td></tr>
                ))}
              </tbody>
            </table>
            <p className="db-empty">BYBO plans, runs and reports these every week, so you see exactly which campaign sells which product.</p>
          </article>
        ) : null}

        {tab === 'Automations' ? (
          <div className="db-autos">
            {[['confirm', 'Order confirmation on WhatsApp', 'Sent the moment an order is placed, with the order number.'], ['cart', 'Abandoned cart reminder', 'A friendly nudge one hour after a cart is left, with a link back.'], ['ship', 'Shipping and delivery updates', 'Packed, shipped, out for delivery: no "where is my order" calls.'], ['replace', 'Replacement requests', 'Customers start a 10-day replacement in chat; you approve in one tap.'], ['review', 'Review request', 'Asks for a review five days after delivery.'], ['reorder', 'Win-back offer', 'Reaches customers who have not ordered in 60 days.']].map(([k, t, d]) => (
              <article key={k} className="db-card db-auto">
                <div><h3>{t}</h3><p>{d}</p></div>
                <button type="button" role="switch" aria-checked={auto[k!]} className={`db-switch ${auto[k!] ? 'is-on' : ''}`} onClick={() => setAuto({ ...auto, [k!]: !auto[k!] })}><span /></button>
              </article>
            ))}
          </div>
        ) : null}

        {tab === 'Products' ? (
          <article className="db-card">
            <header><h3>Products</h3><span className="db-tag">{products.length} live</span></header>
            <table className="db-table">
              <thead><tr><th>Product</th><th>Price</th><th>Stock</th><th></th></tr></thead>
              <tbody>{products.map((p, i) => <tr key={p.handle}><td><span className="db-prod"><span className="db-thumb">{p.image ? <img src={p.image} alt="" /> : null}</span><b>{p.title}</b></span></td><td>{p.price != null ? inr(p.price) : '—'}</td><td>{[124, 86, 42, 18, 203, 67, 9, 155, 71][i % 9]}{[124, 86, 42, 18, 203, 67, 9, 155, 71][i % 9]! < 20 ? <span className="db-pill is-warn">Low</span> : null}</td><td><Link href={`${base}/p/${p.handle}`}>View</Link></td></tr>)}</tbody>
            </table>
          </article>
        ) : null}
      </section>
    </div>
  );
}

function Orders({ live, sample, compact }: { live: DemoOrder[]; sample: { id: string; name: string; city: string; item: string; qty: number; total: number; status: string; pay: string }[]; compact?: boolean }) {
  const rows = [
    ...live.map((o) => ({ id: o.id, name: o.name, city: o.city, item: o.items.map((i) => `${i.title} × ${i.qty}`).join(', '), total: o.total, status: 'New', pay: o.pay.toUpperCase(), live: true })),
    ...sample.map((s) => ({ ...s, item: `${s.item}${s.qty > 1 ? ` × ${s.qty}` : ''}`, live: false })),
  ].slice(0, compact ? 6 : 30);
  return (
    <article className="db-card">
      <header><h3>{compact ? 'Recent orders' : 'All orders'}</h3><span className="db-tag">{live.length ? `${live.length} live from this demo` : 'Sample'}</span></header>
      <table className="db-table">
        <thead><tr><th>Order</th><th>Customer</th><th>Items</th><th>Payment</th><th>Total</th><th>Status</th></tr></thead>
        <tbody>{rows.map((r) => <tr key={r.id} className={r.live ? 'is-live' : ''}><td><b>{r.id}</b>{r.live ? <span className="db-pill is-on">Just now</span> : null}</td><td>{r.name}<small>{r.city}</small></td><td>{r.item}</td><td>{r.pay}</td><td>{inr(r.total)}</td><td><span className={`db-pill ${r.status === 'New' ? 'is-new' : 'is-on'}`}>{r.status}</span></td></tr>)}</tbody>
      </table>
    </article>
  );
}
