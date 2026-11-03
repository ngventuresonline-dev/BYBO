'use client';

/* eslint-disable @next/next/no-img-element -- the prospect's own logo and product photos */
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { CartButton } from './store';

type NavItem = { title: string; handle: string; image: string | null; price: number | null; category: string };
const inr = (n: number) => `₹${Math.round(n).toLocaleString('en-IN')}`;

/**
 * The demo store's header: a mega menu with real products per category, live
 * product search, and a full-screen menu on phones.
 */
export function StoreHeader({ base, brand, logo, cats, items, featured }: { base: string; brand: string; logo: string | null; cats: string[]; items: NavItem[]; featured: NavItem | null }) {
  const [mega, setMega] = useState(false);
  const [active, setActive] = useState(cats[0] ?? '');
  const [search, setSearch] = useState(false);
  const [menu, setMenu] = useState(false);
  const [q, setQ] = useState('');
  const input = useRef<HTMLInputElement>(null);
  const path = usePathname();
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Close everything on navigation and on Escape.
  useEffect(() => {
    const t = setTimeout(() => { setMega(false); setSearch(false); setMenu(false); }, 0);
    return () => clearTimeout(t);
  }, [path]);
  useEffect(() => {
    const esc = (e: KeyboardEvent) => { if (e.key === 'Escape') { setMega(false); setSearch(false); setMenu(false); } };
    window.addEventListener('keydown', esc);
    return () => window.removeEventListener('keydown', esc);
  }, []);
  useEffect(() => { if (search) setTimeout(() => input.current?.focus(), 80); }, [search]);
  useEffect(() => {
    document.documentElement.style.overflow = menu || search ? 'hidden' : '';
    return () => { document.documentElement.style.overflow = ''; };
  }, [menu, search]);

  const open = () => { if (closeTimer.current) clearTimeout(closeTimer.current); setMega(true); };
  const close = () => { closeTimer.current = setTimeout(() => setMega(false), 140); };
  const inCat = items.filter((i) => i.category === active).slice(0, 3);
  const results = q.trim() ? items.filter((i) => i.title.toLowerCase().includes(q.trim().toLowerCase())).slice(0, 6) : items.slice(0, 4);

  return (
    <>
      <header className={`demo-nav st-header${mega ? ' is-mega' : ''}`} data-nav>
        <button type="button" className={`st-icon st-burger${menu ? ' is-x' : ''}`} onClick={() => setMenu(!menu)} aria-label={menu ? 'Close menu' : 'Open menu'} aria-expanded={menu}>
          <span /><span />
        </button>
        <Link href={base} className="demo-logo">{logo ? <img src={logo} alt={brand} /> : brand}</Link>
        <nav className="st-nav" onMouseLeave={close}>
          <Link href={`${base}/shop`} className={`st-nav-shop${mega ? ' is-on' : ''}`} onMouseEnter={open} onFocus={open} aria-expanded={mega}>Shop <i aria-hidden="true">⌄</i></Link>
          {cats.slice(0, 3).map((k) => <Link key={k} href={`${base}/shop?c=${encodeURIComponent(k)}`} onMouseEnter={close}>{k}</Link>)}
          <Link href={`${base}/about`} onMouseEnter={close}>Our story</Link>
          <Link href={`${base}/contact`} onMouseEnter={close}>Contact</Link>
        </nav>
        <div className="st-icons">
          <button type="button" className="st-icon" onClick={() => setSearch(true)} aria-label="Search products">
            <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="11" cy="11" r="6" /><path d="m20 20-4.5-4.5" /></svg>
          </button>
          <CartButton />
        </div>

        {/* Mega menu */}
        <div className={`st-mega${mega ? ' is-open' : ''}`} onMouseEnter={open} onMouseLeave={close}>
          <div className="st-mega-cats">
            <p className="demo-kicker">Shop by need</p>
            {cats.map((k) => (
              <Link key={k} href={`${base}/shop?c=${encodeURIComponent(k)}`} className={k === active ? 'is-on' : ''} onMouseEnter={() => setActive(k)}>
                {k}<span>{items.filter((i) => i.category === k).length}</span>
              </Link>
            ))}
            <Link href={`${base}/shop`} className="st-mega-all">View all {items.length} products →</Link>
          </div>
          <div className="st-mega-items" key={active}>
            {inCat.map((p, i) => (
              <Link key={p.handle} href={`${base}/p/${p.handle}`} className="st-mega-item" style={{ '--i': i } as React.CSSProperties}>
                <span className="st-mega-img">{p.image ? <img src={p.image} alt="" /> : null}</span>
                <b>{p.title}</b>
                {p.price != null ? <em>{inr(p.price)}</em> : null}
              </Link>
            ))}
          </div>
          {featured ? (
            <Link href={`${base}/p/${featured.handle}`} className="st-mega-feature">
              <span className="st-mega-img">{featured.image ? <img src={featured.image} alt="" /> : null}</span>
              <span className="st-mega-feature-copy"><small>Bestseller</small><b>{featured.title}</b>{featured.price != null ? <em>{inr(featured.price)} · Shop now →</em> : null}</span>
            </Link>
          ) : null}
        </div>
      </header>
      <div className={`st-scrim${mega ? ' is-on' : ''}`} aria-hidden="true" />

      {/* Search */}
      <div className={`st-search${search ? ' is-open' : ''}`} onClick={() => setSearch(false)} aria-hidden={!search}>
        <div className="st-search-panel" onClick={(e) => e.stopPropagation()}>
          <div className="st-search-bar">
            <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="11" cy="11" r="6" /><path d="m20 20-4.5-4.5" /></svg>
            <input ref={input} value={q} onChange={(e) => setQ(e.target.value)} placeholder={`Search ${brand}`} aria-label="Search products" />
            <button type="button" className="st-close" onClick={() => setSearch(false)} aria-label="Close search">×</button>
          </div>
          <div className="st-search-chips">{cats.map((k) => <Link key={k} href={`${base}/shop?c=${encodeURIComponent(k)}`}>{k}</Link>)}</div>
          <p className="demo-kicker">{q.trim() ? `${results.length} result${results.length === 1 ? '' : 's'}` : 'Popular right now'}</p>
          <div className="st-search-results">
            {results.map((p, i) => (
              <Link key={p.handle} href={`${base}/p/${p.handle}`} style={{ '--i': i } as React.CSSProperties}>
                <span className="st-mega-img">{p.image ? <img src={p.image} alt="" /> : null}</span>
                <b>{p.title}</b>
                {p.price != null ? <em>{inr(p.price)}</em> : null}
              </Link>
            ))}
            {!results.length ? <p className="st-note">Nothing matches “{q}”. Try a category above.</p> : null}
          </div>
        </div>
      </div>

      {/* Full-screen menu on phones */}
      <div className={`st-fullmenu${menu ? ' is-open' : ''}`} aria-hidden={!menu}>
        <nav>
          {[{ href: `${base}/shop`, label: 'Shop all' }, ...cats.map((k) => ({ href: `${base}/shop?c=${encodeURIComponent(k)}`, label: k })), { href: `${base}/about`, label: 'Our story' }, { href: `${base}/contact`, label: 'Contact' }].map((l, i) => (
            <Link key={l.href + l.label} href={l.href} style={{ '--i': i } as React.CSSProperties}><span>{String(i + 1).padStart(2, '0')}</span>{l.label}</Link>
          ))}
        </nav>
        <div className="st-fullmenu-strip">
          {items.slice(0, 6).map((p) => (
            <Link key={p.handle} href={`${base}/p/${p.handle}`}>
              <span className="st-mega-img">{p.image ? <img src={p.image} alt="" /> : null}</span>
              <b>{p.title}</b>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
