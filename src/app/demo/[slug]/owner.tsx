'use client';

/* eslint-disable @next/next/no-img-element -- the prospect's own product photos */
import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import { readRecords, useCart, type DemoEnquiry, type DemoOrder } from './store';

type P = { title: string; handle: string; image: string | null; price: number | null };
const CITIES = ['Mumbai', 'Bengaluru', 'Delhi', 'Pune', 'Hyderabad', 'Chennai', 'Kolkata', 'Jaipur', 'Ahmedabad', 'Lucknow'];
const NAMES = ['Priya S.', 'Rahul M.', 'Neha K.', 'Imran A.', 'Kavya R.', 'Vikram J.', 'Pooja D.', 'Sanjay N.', 'Meera T.', 'Arjun P.'];

/** A small seeded random so sample figures stay the same on every visit. */
function seeded(seed: string) {
  let h = 2166136261;
  for (const ch of seed) h = Math.imul(h ^ ch.charCodeAt(0), 16777619);
  return () => { h = Math.imul(h ^ (h >>> 15), 2246822507); h = Math.imul(h ^ (h >>> 13), 3266489909); return ((h ^= h >>> 16) >>> 0) / 4294967296; };
}

const SECTIONS = ['Overview', 'Orders', 'Production', 'Customers', 'Campaigns', 'Automations', 'Products'] as const;
const WORLD = ['Toronto', 'Brampton', 'London', 'Vancouver', 'New York', 'Melbourne', 'Dubai', 'Auckland', 'Birmingham', 'Surrey BC'];
const SURNAMES = ['DHILLON', 'BHULLAR', 'SIDHU', 'SANDHU', 'BRAR', 'MANGAT', 'PATEL', 'GREWAL', 'GILL', 'SHAH'];
const STAGES = ['Proof sent', 'Approved', 'Stitching', 'Quality check', 'Shipped'];

/**
 * The owner's side of the demo: what running the store on BYBO's system looks
 * like. Orders and enquiries made on this demo show up live; everything else
 * is clearly marked sample data.
 */
export function Dashboard({ brand, products, personalised = false }: { brand: string; products: P[]; personalised?: boolean }) {
  const { base, lines, money: inr, currency } = useCart();
  const places = currency === 'INR' ? CITIES : WORLD;
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
    const pool = priced.length ? priced : products;
    const days = Array.from({ length: 14 }, (_, i) => Math.round((18 + r() * 22) * (0.8 + i / 30)));
    const recent = Array.from({ length: 7 }, (_, i) => {
      const p = pool[Math.floor(r() * pool.length)];
      const qty = r() > 0.75 ? 2 : 1;
      return { id: `${brand.slice(0, 3).toUpperCase()}-${String(482113 - i * 37)}`, name: NAMES[i % NAMES.length]!, city: places[Math.floor(r() * places.length)]!, item: p?.title ?? 'Order', qty, total: (p?.price ?? 0) * qty, status: (priced.length ? ['Packed', 'Shipped', 'Delivered', 'New', 'Shipped', 'Delivered', 'Delivered'] : ['Call booked', 'Quoted', 'Confirmed', 'New', 'Quoted', 'Confirmed', 'Call booked'])[i]!, pay: (priced.length ? ['UPI', 'COD', 'UPI', 'Card', 'UPI', 'COD', 'UPI'] : ['WhatsApp', 'Website', 'Instagram', 'WhatsApp', 'Website', 'WhatsApp', 'Instagram'])[i]! };
    });
    const top = pool.slice(0, 5).map((p) => ({ ...p, sold: Math.round(priced.length ? 40 + r() * 160 : 12 + r() * 40) })).sort((a, b) => b.sold - a.sold);
    return { priced: priced.length > 0, days, recent, top, aov: Math.round(priced.reduce((n, p) => n + (p.price ?? 0), 0) / Math.max(1, priced.length) * 1.3) };
  }, [brand, products, places]);

  const live = orders.reduce((n, o) => n + o.total, 0);
  const today = sample.days.at(-1)! + orders.length;
  const revenue = today * sample.aov + live;
  const max = Math.max(...sample.days);
  const pts = sample.days.map((d, i) => `${(i / 13) * 100},${100 - (d / max) * 86}`).join(' ');

  return (
    <div className="db">
      <aside className="db-side">
        <Link href={base} className="db-brand">{brand}<small>Owner dashboard</small></Link>
        <nav>{SECTIONS.filter((s) => s !== 'Production' || personalised).map((s) => <button key={s} type="button" className={s === tab ? 'is-on' : ''} onClick={() => setTab(s)}>{s}{s === 'Orders' && orders.length ? <i>{orders.length}</i> : s === 'Customers' && enquiries.length ? <i>{enquiries.length}</i> : null}</button>)}</nav>
        <p className="db-note">Powered by BYBO. Orders and messages you make on this demo appear here live; other figures are sample data.</p>
      </aside>

      <section className="db-main">
        <header className="db-top">
          <div><p className="demo-kicker">Owner view</p><h1>{tab === 'Overview' ? `${brand} today` : tab}</h1></div>
          <Link className="demo-btn is-small" href={`${base}/shop`}>View store →</Link>
        </header>

        {tab === 'Overview' ? (
          <>
            {sample.priced ? <div className="db-kpis">
              <article><span>Revenue today</span><b>{inr(revenue)}</b><em className="up">▲ 18% vs last week</em></article>
              <article><span>Orders today</span><b>{today}</b><em className="up">{orders.length ? `${orders.length} from this demo` : '▲ 12%'}</em></article>
              <article><span>Average order</span><b>{inr(sample.aov)}</b><em>Bundles lift it</em></article>
              <article><span>Carts recovered</span><b>{Math.round(today * 0.22)}</b><em className="up">via WhatsApp</em></article>
            </div> : <div className="db-kpis">
              <article><span>Enquiries today</span><b>{Math.round(today * 0.6) + enquiries.length}</b><em className="up">{enquiries.length ? `${enquiries.length} from this demo` : '▲ 22% vs last week'}</em></article>
              <article><span>Video calls booked</span><b>{Math.round(today * 0.18)}</b><em className="up">Booked from the site</em></article>
              <article><span>Confirmed on WhatsApp</span><b>{Math.round(today * 0.12) + orders.length}</b><em className="up">▲ 14%</em></article>
              <article><span>Replied within 5 min</span><b>96%</b><em>Auto-reply, then the team</em></article>
            </div>}
            <div className="db-grid">
              <article className="db-card db-chart">
                <header><h3>{sample.priced ? 'Orders' : 'Enquiries'}, last 14 days</h3><span className="db-tag">Sample</span></header>
                <svg viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
                  <defs><linearGradient id="dbg" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stopColor="var(--accent)" stopOpacity=".35" /><stop offset="1" stopColor="var(--accent)" stopOpacity="0" /></linearGradient></defs>
                  <polygon points={`0,100 ${pts} 100,100`} fill="url(#dbg)" />
                  <polyline points={pts} fill="none" stroke="var(--accent)" strokeWidth="1.2" vectorEffect="non-scaling-stroke" />
                </svg>
              </article>
              <article className="db-card">
                <header><h3>{sample.priced ? 'Bestsellers' : 'Most asked about'}</h3><span className="db-tag">Sample</span></header>
                <ul className="db-top5">{sample.top.map((p) => <li key={p.handle}><span className="db-thumb">{p.image ? <img src={p.image} alt="" /> : null}</span><b>{p.title}</b><em>{p.sold} {sample.priced ? 'sold' : 'enquiries'}</em></li>)}</ul>
              </article>
            </div>
            <Orders live={orders} sample={sample.recent} priced={sample.priced} compact />
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

        {tab === 'Orders' ? <Orders live={orders} sample={sample.recent} priced={sample.priced} /> : null}

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
              <thead><tr><th>Campaign</th><th>Channel</th><th>Spend</th><th>Orders</th><th>{sample.priced ? 'Return' : 'Leads'}</th><th>Status</th></tr></thead>
              <tbody>
                {[['Bestseller retargeting', 'Instagram', 4200, 61, 'Live'], ['Search: face trimmer', 'Google', 3100, 38, 'Live'], ['Festive gifting', 'Instagram', 2600, 27, 'Scheduled'], ['Abandoned cart', 'WhatsApp', 0, 44, 'Always on'], ['Win-back, 60 days', 'WhatsApp', 0, 19, 'Always on']].map(([n, c, s, o, st]) => (
                  <tr key={n as string}><td><b>{n}</b></td><td>{c}</td><td>{s ? inr(s as number) : 'Free'}</td><td>{o}</td><td>{!sample.priced ? `${Math.round((o as number) * 2.4)} enquiries` : s ? `${(((o as number) * sample.aov) / (s as number)).toFixed(1)}×` : '—'}</td><td><span className={`db-pill ${st === 'Scheduled' ? '' : 'is-on'}`}>{st}</span></td></tr>
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

        {tab === 'Production' ? <Production live={orders} products={products} places={places} brand={brand} /> : null}

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

function Orders({ live, sample, compact, priced = true }: { live: DemoOrder[]; sample: { id: string; name: string; city: string; item: string; qty: number; total: number; status: string; pay: string }[]; compact?: boolean; priced?: boolean }) {
  const { money: inr } = useCart();
  const rows = [
    ...live.map((o) => ({ id: o.id, name: o.name, city: o.city, item: o.items.map((i) => `${i.title} × ${i.qty}`).join(', '), total: o.total, status: 'New', pay: o.pay.toUpperCase(), live: true })),
    ...sample.map((s) => ({ ...s, item: `${s.item}${s.qty > 1 ? ` × ${s.qty}` : ''}`, live: false })),
  ].slice(0, compact ? 6 : 30);
  return (
    <article className="db-card">
      <header><h3>{priced ? (compact ? 'Recent orders' : 'All orders') : (compact ? 'Recent enquiries' : 'All enquiries')}</h3><span className="db-tag">{live.length ? `${live.length} live from this demo` : 'Sample'}</span></header>
      <table className="db-table">
        <thead><tr><th>{priced ? 'Order' : 'Enquiry'}</th><th>Customer</th><th>{priced ? 'Items' : 'Product'}</th><th>{priced ? 'Payment' : 'Came from'}</th>{priced ? <th>Total</th> : null}<th>Status</th></tr></thead>
        <tbody>{rows.map((r) => <tr key={r.id} className={r.live ? 'is-live' : ''}><td><b>{r.id}</b>{r.live ? <span className="db-pill is-on">Just now</span> : null}</td><td>{r.name}<small>{r.city}</small></td><td>{r.item}</td><td>{r.pay}</td>{priced ? <td>{inr(r.total)}</td> : null}<td><span className={`db-pill ${r.status === 'New' ? 'is-new' : 'is-on'}`}>{r.status}</span></td></tr>)}</tbody>
      </table>
    </article>
  );
}

/**
 * The stitch queue for made-to-order pieces: every name to digitise, its
 * proof status and where it ships. Orders placed on the demo come first.
 */
function Production({ live, products, places, brand }: { live: DemoOrder[]; products: P[]; places: readonly string[]; brand: string }) {
  const rows = useMemo(() => {
    const r = seeded(`${brand}-stitch`);
    const mine = live.flatMap((o) => o.items.map((it) => {
      const [piece, mark = ''] = it.title.split(' · ');
      const [name = '', ini = ''] = mark.split(' / ');
      return { id: o.id, piece: piece!, name: name || '—', ini, to: o.city || '—', stage: 'Proof sent', live: true };
    }));
    const sample = Array.from({ length: 8 }, (_, i) => {
      const name = SURNAMES[i % SURNAMES.length]!;
      return { id: `${brand.slice(0, 3).toUpperCase()}-${String(30418 - i * 23)}`, piece: products[Math.floor(r() * products.length)]?.title ?? 'Jacket', name, ini: `${'AKJRNSGM'[i % 8]}${name[0]}`, to: places[Math.floor(r() * places.length)]!, stage: STAGES[Math.min(4, Math.floor(r() * 5))]!, live: false };
    });
    return [...mine, ...sample];
  }, [live, products, places, brand]);
  const count = (st: string) => rows.filter((x) => x.stage === st).length;
  return (
    <>
      <div className="db-kpis">{STAGES.slice(0, 4).map((st) => <article key={st}><span>{st}</span><b>{count(st)}</b><em>{st === 'Proof sent' ? 'Waiting on the customer' : st === 'Approved' ? 'Ready to digitise' : st === 'Stitching' ? 'On the machines' : 'Before it ships'}</em></article>)}</div>
      <article className="db-card">
        <header><h3>Stitch queue</h3><span className="db-tag">{live.length ? `${live.length} live from this demo` : 'Sample'}</span></header>
        <table className="db-table">
          <thead><tr><th>Order</th><th>Name on the back</th><th>Initials</th><th>Colourway</th><th>Ships to</th><th>Status</th></tr></thead>
          <tbody>{rows.map((x, i) => <tr key={x.id + i} className={x.live ? 'is-live' : ''}><td><b>{x.id}</b>{x.live ? <span className="db-pill is-on">New</span> : null}</td><td><span className="db-stitch">{x.name}</span></td><td>{x.ini || '—'}</td><td>{x.piece}</td><td>{x.to}</td><td><span className={`db-pill ${x.stage === 'Proof sent' ? 'is-new' : 'is-on'}`}>{x.stage}</span></td></tr>)}</tbody>
        </table>
        <p className="db-empty">Every name gets a proof on WhatsApp before stitching. Once the customer taps approve, it moves to digitising automatically.</p>
      </article>
    </>
  );
}
