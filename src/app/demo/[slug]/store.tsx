'use client';

/* eslint-disable @next/next/no-img-element -- the prospect's own remote product photos */
import Link from 'next/link';
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';

export type Line = { handle: string; title: string; price: number; image: string | null; qty: number };
type Cart = {
  base: string; lines: Line[]; count: number; subtotal: number; open: boolean;
  add: (l: Omit<Line, 'qty'>, qty?: number) => void; money: (n: number) => string; currency: string; setQty: (handle: string, qty: number) => void; clear: () => void; setOpen: (o: boolean) => void;
};

const Ctx = createContext<Cart | null>(null);
export const useCart = () => useContext(Ctx)!;
import { money } from './data';
import { PersonaliseBox, type Swatch } from './personalise';

/** Orders and enquiries made on a demo, kept in this browser so the owner dashboard can show them. */
export type DemoOrder = { id: string; at: string; name: string; city: string; pay: string; items: { title: string; qty: number; price: number }[]; total: number };
export type DemoEnquiry = { at: string; name: string; contact: string; message: string; fields?: Record<string, string> };
export function readRecords<T>(base: string, kind: 'orders' | 'enquiries'): T[] {
  try { return JSON.parse(localStorage.getItem(`bybo-demo-${kind}:${base}`) ?? '[]') as T[]; } catch { return []; }
}
export function addRecord<T>(base: string, kind: 'orders' | 'enquiries', rec: T) {
  try { localStorage.setItem(`bybo-demo-${kind}:${base}`, JSON.stringify([rec, ...readRecords<T>(base, kind)].slice(0, 50))); } catch { /* private mode */ }
}

/** The demo shop's cart: kept in this browser only, per demo. */
export function CartProvider({ slug, currency = 'INR', children }: { slug: string; currency?: string; children: React.ReactNode }) {
  const key = `bybo-demo-cart:${slug}`;
  const [lines, setLines] = useState<Line[]>([]);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => { try { setLines(JSON.parse(localStorage.getItem(key) ?? '[]') as Line[]); } catch { /* private mode */ } }, 0);
    return () => clearTimeout(t);
  }, [key]);
  const save = useCallback((next: Line[]) => { setLines(next); try { localStorage.setItem(key, JSON.stringify(next)); } catch { /* private mode */ } }, [key]);
  // Functional update, so several adds in one go (a family set) all land.
  const add = useCallback((l: Omit<Line, 'qty'>, qty = 1) => {
    setLines((prev) => {
      const found = prev.find((x) => x.handle === l.handle);
      const next = found ? prev.map((x) => (x.handle === l.handle ? { ...x, qty: Math.min(10, x.qty + qty) } : x)) : [...prev, { ...l, qty }];
      try { localStorage.setItem(key, JSON.stringify(next)); } catch { /* private mode */ }
      return next;
    });
    setOpen(true);
  }, [key]);
  const setQty = useCallback((handle: string, qty: number) => save(qty <= 0 ? lines.filter((x) => x.handle !== handle) : lines.map((x) => (x.handle === handle ? { ...x, qty: Math.min(10, qty) } : x))), [lines, save]);
  const value = useMemo<Cart>(() => ({
    base: `/demo/${slug}`, lines, open, setOpen, add, setQty, clear: () => save([]), currency, money: (n: number) => money(n, currency),
    count: lines.reduce((n, l) => n + l.qty, 0), subtotal: lines.reduce((n, l) => n + l.qty * l.price, 0),
  }), [slug, lines, open, add, setQty, save, currency]);
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function CartButton() {
  const { count, setOpen } = useCart();
  return (
    <button type="button" className="st-icon" onClick={() => setOpen(true)} aria-label={`Cart, ${count} items`}>
      <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 7h12l-1 13H7L6 7Z" /><path d="M9 7a3 3 0 0 1 6 0" /></svg>
      {count ? <span className="st-badge">{count}</span> : null}
    </button>
  );
}

export function AddToCart({ item, qty = 1, label = 'Add to bag', className = 'demo-btn' }: { item: Omit<Line, 'qty'>; qty?: number; label?: string; className?: string }) {
  const { add } = useCart();
  const [done, setDone] = useState(false);
  return (
    <button type="button" className={className} onClick={() => { add(item, qty); setDone(true); setTimeout(() => setDone(false), 1400); }}>
      {done ? 'Added ✓' : label}
    </button>
  );
}

/** Product page buy box: quantity, add to bag, buy now. */
export function BuyBox({ item: base0, facts, personalise = null, swatch = null }: { item: Omit<Line, 'qty'>; facts: string[]; personalise?: { name_label: string; initials_label?: string; max: number; note?: string } | null; swatch?: Swatch | null }) {
  const [qty, setQty] = useState(1);
  const [mark, setMark] = useState({ name: '', initials: '' });
  const { add, base } = useCart();
  // A personalised piece is its own line in the bag, with the name in its title.
  const item = personalise && mark.name ? { ...base0, handle: `${base0.handle}--${mark.name.toLowerCase().replace(/[^a-z]/g, '')}-${mark.initials.toLowerCase()}`, title: `${base0.title} · ${mark.name}${mark.initials ? ` / ${mark.initials}` : ''}` } : base0;
  const blocked = !!personalise && mark.name.length < 2;
  return (
    <div className="pd-buy">
      {personalise ? <PersonaliseBox item={base0} rules={personalise} swatch={swatch} onChange={setMark} /> : null}
      <div className="pd-qty" role="group" aria-label="Quantity">
        <button type="button" onClick={() => setQty(Math.max(1, qty - 1))} aria-label="Less">−</button>
        <span>{qty}</span>
        <button type="button" onClick={() => setQty(Math.min(10, qty + 1))} aria-label="More">+</button>
      </div>
      {blocked ? <button type="button" className="demo-btn pd-add" disabled>Add your name first</button> : <AddToCart item={item} qty={qty} className="demo-btn pd-add" label={personalise ? `Add ${mark.name} to bag` : 'Add to bag'} />}
      {blocked ? null : <Link className="demo-btn is-ghost pd-now" href={`${base}/checkout`} onClick={() => add(item, qty)}>Buy it now</Link>}
      {facts.length ? <ul className="pd-facts">{facts.map((f) => <li key={f}>{f}</li>)}</ul> : null}
    </div>
  );
}

export function CartDrawer() {
  const { lines, open, setOpen, setQty, subtotal, base, money: inr } = useCart();
  useEffect(() => {
    const esc = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false); };
    window.addEventListener('keydown', esc);
    return () => window.removeEventListener('keydown', esc);
  }, [setOpen]);
  return (
    <div className={`st-drawer ${open ? 'is-open' : ''}`} onClick={() => setOpen(false)} aria-hidden={!open}>
      <aside onClick={(e) => e.stopPropagation()} aria-label="Your bag">
        <header><h2>Your bag</h2><button type="button" className="st-close" onClick={() => setOpen(false)} aria-label="Close">×</button></header>
        {lines.length ? <CartLines lines={lines} setQty={setQty} /> : <p className="st-empty">Your bag is empty.</p>}
        <div className="st-drawer-foot">
          <div className="st-sub"><span>Subtotal</span><b>{inr(subtotal)}</b></div>
          <Link className="demo-btn st-full" href={`${base}/checkout`} onClick={() => setOpen(false)} aria-disabled={!lines.length}>Checkout</Link>
          <Link className="st-link" href={`${base}/cart`} onClick={() => setOpen(false)}>View bag</Link>
        </div>
      </aside>
    </div>
  );
}

function CartLines({ lines, setQty }: { lines: Line[]; setQty: (h: string, q: number) => void }) {
  const { money: inr } = useCart();
  return (
    <ul className="st-lines">
      {lines.map((l) => (
        <li key={l.handle}>
          <div className="st-thumb">{l.image ? <img src={l.image} alt="" /> : null}</div>
          <div>
            <p className="st-title">{l.title}</p>
            <p className="st-price">{inr(l.price)}</p>
            <div className="pd-qty is-small">
              <button type="button" onClick={() => setQty(l.handle, l.qty - 1)} aria-label="Less">−</button>
              <span>{l.qty}</span>
              <button type="button" onClick={() => setQty(l.handle, l.qty + 1)} aria-label="More">+</button>
            </div>
          </div>
          <button type="button" className="st-remove" onClick={() => setQty(l.handle, 0)}>Remove</button>
        </li>
      ))}
    </ul>
  );
}

export function CartPage({ free }: { free: string | null }) {
  const { lines, setQty, subtotal, base, money: inr } = useCart();
  if (!lines.length) return <div className="st-page-empty"><p>Your bag is empty.</p><Link className="demo-btn" href={`${base}/shop`}>Start shopping</Link></div>;
  return (
    <div className="st-cart">
      <CartLines lines={lines} setQty={setQty} />
      <aside className="st-summary">
        <div className="st-sub"><span>Subtotal</span><b>{inr(subtotal)}</b></div>
        <div className="st-sub"><span>Delivery</span><b>{free ? 'Free' : 'At checkout'}</b></div>
        <div className="st-sub is-total"><span>Total</span><b>{inr(subtotal)}</b></div>
        <Link className="demo-btn st-full" href={`${base}/checkout`}>Checkout</Link>
        {free ? <p className="st-note">{free}</p> : null}
      </aside>
    </div>
  );
}

/** Checkout: a working form and order confirmation. Demo only: nothing is charged or sent. */
export function Checkout({ brand }: { brand: string }) {
  const { lines, subtotal, clear, base, money: inr, currency } = useCart();
  const abroad = currency !== 'INR';
  const [pay, setPay] = useState(currency === 'INR' ? 'upi' : 'card');
  const [order, setOrder] = useState<{ id: string; total: number; name: string; items: number } | null>(null);
  if (order) {
    return (
      <div className="co-done" data-reveal>
        <span className="co-tick">✓</span>
        <h2>Thank you, {order.name}.</h2>
        <p>Order <b>{order.id}</b> is confirmed: {order.items} item{order.items === 1 ? '' : 's'}, {inr(order.total)}. Updates will reach you on WhatsApp.</p>
        <p className="st-note">This is a demo checkout by BYBO. Nothing was charged.</p>
        <div className="demo-actions"><Link className="demo-btn" href={`${base}/shop`}>Keep shopping</Link><Link className="demo-btn is-ghost" href={`${base}/dashboard`}>See it in the owner dashboard →</Link></div>
      </div>
    );
  }
  if (!lines.length) return <div className="st-page-empty"><p>Your bag is empty.</p><Link className="demo-btn" href={`${base}/shop`}>Start shopping</Link></div>;
  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const full = String(f.get('name') ?? '').trim();
    const name = full.split(' ')[0] || 'there';
    const id = `${brand.slice(0, 3).toUpperCase()}-${String(Date.now()).slice(-6)}`;
    addRecord<DemoOrder>(base, 'orders', { id, at: new Date().toISOString(), name: full || 'Customer', city: String(f.get('city') ?? ''), pay, items: lines.map((l) => ({ title: l.title, qty: l.qty, price: l.price })), total: subtotal });
    setOrder({ id, total: subtotal, name, items: lines.reduce((n, l) => n + l.qty, 0) });
    clear();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  return (
    <form className="co" onSubmit={submit}>
      <div className="co-form">
        <fieldset><legend>Contact</legend>
          <label>Full name<input name="name" required autoComplete="name" /></label>
          <label>Mobile number<input name="phone" required inputMode="tel" pattern={abroad ? '[0-9 +()-]{7,18}' : '[0-9 +]{10,14}'} autoComplete="tel" /></label>
          <label>Email<input name="email" type="email" autoComplete="email" /></label>
        </fieldset>
        <fieldset><legend>Delivery address</legend>
          <label className="is-wide">Address<input name="address" required autoComplete="street-address" /></label>
          <label>City<input name="city" required autoComplete="address-level2" /></label>
          {abroad ? <label>Postcode or ZIP<input name="pin" required autoComplete="postal-code" /></label> : <label>PIN code<input name="pin" required inputMode="numeric" pattern="[0-9]{6}" autoComplete="postal-code" /></label>}
          {abroad ? <label>Country<select name="country" defaultValue="United States">{['United States', 'Canada', 'United Kingdom', 'Australia', 'New Zealand', 'United Arab Emirates', 'India', 'Other'].map((k) => <option key={k}>{k}</option>)}</select></label> : null}
        </fieldset>
        <fieldset><legend>Payment</legend>
          {(abroad ? [['card', 'Card', 'Visa, Mastercard, Amex'], ['wallet', 'Apple Pay or Google Pay', 'One tap on your phone'], ['paypal', 'PayPal', 'Pay with your PayPal account']] : [['upi', 'UPI', 'GPay, PhonePe, Paytm'], ['card', 'Card', 'Credit or debit card'], ['cod', 'Cash on delivery', 'Pay when it arrives']]).map(([v, t, d]) => (
            <label key={v} className={`co-pay ${pay === v ? 'is-on' : ''}`}><input type="radio" name="pay" value={v} checked={pay === v} onChange={() => setPay(v!)} /><b>{t}</b><span>{d}</span></label>
          ))}
        </fieldset>
        <button className="demo-btn st-full" type="submit">Place order · {inr(subtotal)}</button>
        <p className="st-note">Demo checkout: nothing is charged and no details are sent.</p>
      </div>
      <aside className="st-summary">
        <h3>Order summary</h3>
        <ul className="co-items">{lines.map((l) => <li key={l.handle}><span className="st-thumb">{l.image ? <img src={l.image} alt="" /> : null}<i>{l.qty}</i></span><p>{l.title}</p><b>{inr(l.qty * l.price)}</b></li>)}</ul>
        <div className="st-sub is-total"><span>Total</span><b>{inr(subtotal)}</b></div>
      </aside>
    </form>
  );
}

/** Shop grid with category filters and sorting. */
export function ShopGrid({ items, cats, base, initial = 'All', ask = 'Enquire', priceNote = 'Price on request' }: { ask?: string; priceNote?: string; initial?: string; items: { title: string; handle: string; price: number | null; compare: number | null; image: string | null; category: string; line: string }[]; cats: string[]; base: string }) {
  const { money: inr } = useCart();
  const [cat, setCat] = useState(initial);
  const [sort, setSort] = useState('featured');
  const list = items.filter((i) => cat === 'All' || i.category === cat).sort((a, b) => sort === 'low' ? (a.price ?? 0) - (b.price ?? 0) : sort === 'high' ? (b.price ?? 0) - (a.price ?? 0) : 0);
  return (
    <>
      <div className="sh-bar">
        <div className="sh-chips">{['All', ...cats].map((k) => <button key={k} type="button" className={k === cat ? 'is-on' : ''} onClick={() => setCat(k)}>{k}</button>)}</div>
        <label className="sh-sort">Sort<select value={sort} onChange={(e) => setSort(e.target.value)}><option value="featured">Featured</option><option value="low">Price: low to high</option><option value="high">Price: high to low</option></select></label>
      </div>
      <p className="sh-count">{list.length} products</p>
      <div className="sh-grid">
        {list.map((p) => {
          const pct = p.price && p.compare && p.compare > p.price ? Math.round((1 - p.price / p.compare) * 100) : null;
          return (
            <article key={p.handle} className="sh-card">
              <Link href={`${base}/p/${p.handle}`} className="demo-card-img">
                {pct ? <span className="demo-off">−{pct}%</span> : null}
                {p.image ? <img src={p.image} alt={p.title} loading="lazy" /> : null}
              </Link>
              <Link href={`${base}/p/${p.handle}`}><h3>{p.title}</h3></Link>
              <div className="demo-price">
                {p.price != null ? <b>{inr(p.price)}</b> : null}
                {pct ? <s>{inr(p.compare!)}</s> : null}
                {p.price != null ? <AddToCart item={{ handle: p.handle, title: p.title, price: p.price, image: p.image }} className="demo-add" label="Add" /> : <><b className="is-ask">{priceNote}</b><Link className="demo-add" href={`${base}/contact?p=${encodeURIComponent(p.title)}`}>{ask}</Link></>}
              </div>
            </article>
          );
        })}
      </div>
    </>
  );
}

/** Product gallery with thumbnails. */
export function Gallery({ images, title }: { images: string[]; title: string }) {
  const [i, setI] = useState(0);
  return (
    <div className="pd-gallery">
      <div className="pd-main"><img key={images[i]} src={images[i]} alt={title} /></div>
      {images.length > 1 ? <div className="pd-thumbs">{images.map((src, k) => <button key={src} type="button" className={k === i ? 'is-on' : ''} onClick={() => setI(k)} aria-label={`Image ${k + 1}`}><img src={src} alt="" /></button>)}</div> : null}
    </div>
  );
}

export function ContactForm({ product }: { product?: string }) {
  const [sent, setSent] = useState(false);
  const { base } = useCart();
  if (sent) return <div className="co-done"><span className="co-tick">✓</span><h2>Message received.</h2><p>We will reply within a day.</p><p className="st-note">Demo form by BYBO: nothing was sent.</p></div>;
  return (
    <form className="ct-form" onSubmit={(e) => {
      e.preventDefault();
      const f = new FormData(e.currentTarget);
      addRecord<DemoEnquiry>(base, 'enquiries', { at: new Date().toISOString(), name: String(f.get('name') ?? ''), contact: String(f.get('contact') ?? ''), message: String(f.get('message') ?? '') });
      setSent(true);
    }}>
      <label>Name<input name="name" required autoComplete="name" /></label>
      <label>Email or mobile<input name="contact" required /></label>
      <label className="is-wide">Message<textarea name="message" required rows={5} defaultValue={product ? `I'd like to know more about the ${product}.` : ''} /></label>
      <button className="demo-btn" type="submit">Send message</button>
    </form>
  );
}
