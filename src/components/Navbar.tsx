'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useCallback, useEffect, useRef, useState } from 'react';
import { ArrowUpRight, ArrowRight, ChevronDown, Menu, X } from 'lucide-react';
import { Wordmark } from './Wordmark';
import { services } from '@/lib/redesign';
import './navbar.css';

const LINKS: [string, string][] = [
  ['/solutions', 'Solutions'],
  ['/industries', 'Industries'],
  ['/how-we-work', 'How we work'],
  ['/insights', 'Insights'],
];

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);          // the phone sheet
  const [mega, setMega] = useState(false);          // the systems panel
  const [preview, setPreview] = useState(0);        // which system the panel shows
  const [scrolled, setScrolled] = useState(false);
  const menuButton = useRef<HTMLButtonElement>(null);
  const systemsWrap = useRef<HTMLDivElement>(null);
  const closeTimer = useRef<number | undefined>(undefined);

  /* Scrolling moves elements under a stationary cursor, which fires mouseleave
     even though the pointer never left the panel. Closing on a short delay
     that any re-entry cancels keeps the panel up while you scroll it. */
  const holdMega = useCallback(() => { window.clearTimeout(closeTimer.current); setMega(true); }, []);
  const releaseMega = useCallback(() => {
    window.clearTimeout(closeTimer.current);
    closeTimer.current = window.setTimeout(() => setMega(false), 260);
  }, []);
  useEffect(() => () => window.clearTimeout(closeTimer.current), []);

  const close = useCallback(() => { setOpen(false); setMega(false); }, []);

  /** The glass thickens once the page moves, so it stays legible over cream. */
  useEffect(() => {
    let frame = 0;
    const read = () => { frame = 0; setScrolled(window.scrollY > 24); };
    const onScroll = () => { if (!frame) frame = requestAnimationFrame(read); };
    read();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => { window.removeEventListener('scroll', onScroll); if (frame) cancelAnimationFrame(frame); };
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== 'Escape') return;
      if (mega || open) { close(); menuButton.current?.focus(); }
    };
    const onPointer = (e: PointerEvent) => {
      if (systemsWrap.current && !systemsWrap.current.contains(e.target as Node)) setMega(false);
    };
    document.addEventListener('keydown', onKey);
    document.addEventListener('pointerdown', onPointer);
    return () => { document.removeEventListener('keydown', onKey); document.removeEventListener('pointerdown', onPointer); };
  }, [mega, open, close]);

  /** The sheet covers the page, so the page beneath must not scroll with it. */
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = prev; };
  }, [open]);

  useEffect(close, [pathname, close]);

  const shown = services[preview];

  return (
    <header className="site-header" data-scrolled={scrolled ? '' : undefined} data-open={open ? '' : undefined}>
      <span className="sh-glass" aria-hidden />
      <div className="container nav-inner">
        <Link href="/" className="wordmark" aria-label="BYBO home" onClick={close}>
          <Wordmark />
        </Link>
        <span className="brand-note">Built around your business.</span>

        <button
          ref={menuButton} type="button" className="menu-toggle"
          aria-label={open ? 'Close navigation' : 'Open navigation'}
          aria-controls="site-navigation" aria-expanded={open}
          onClick={() => setOpen(!open)}
        >
          {open ? <X /> : <Menu />}
        </button>

        <nav id="site-navigation" aria-label="Main navigation" className={open ? 'nav-links is-open' : 'nav-links'}>
          <div className="nav-sheet-head" aria-hidden>Menu</div>

          <Link href="/solutions" aria-current={pathname === '/solutions' ? 'page' : undefined} onClick={close} data-n="01">Solutions</Link>

          {/* Systems: a preview panel on a desktop, an inline grid on a phone */}
          <div className="nav-systems" ref={systemsWrap} onMouseEnter={holdMega} onMouseLeave={releaseMega}>
            <button
              type="button" data-n="02" aria-expanded={mega} aria-controls="systems-panel"
              onClick={() => setMega(!mega)} onMouseEnter={holdMega}
            >
              Systems <ChevronDown size={14} aria-hidden />
            </button>

            <div className="nav-panel" id="systems-panel" hidden={!mega}>
              <div className="container nav-panel-inner">
                <div className="nav-panel-list">
                  <p className="nav-panel-eyebrow">Seven systems and a website studio</p>
                  <ul>
                    {services.map((s, i) => (
                      <li key={s.slug}>
                        <Link
                          href={`/systems/${s.slug}`} onClick={close}
                          aria-current={pathname === `/systems/${s.slug}` ? 'page' : undefined}
                          onMouseEnter={() => setPreview(i)} onFocus={() => setPreview(i)}
                          data-active={preview === i ? '' : undefined}
                        >
                          <span className="nav-panel-num">{String(i + 1).padStart(2, '0')}</span>
                          <span className="nav-panel-name">{s.name}</span>
                          <ArrowRight size={15} aria-hidden />
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>

                <Link href={`/systems/${shown.slug}`} className="nav-panel-preview" onClick={close} tabIndex={-1} aria-hidden>
                  <span className="nav-panel-shot">
                    <Image key={shown.slug} src={`/images/services/${shown.slug}.webp`} alt="" width={700} height={466} sizes="380px" />
                  </span>
                  <span className="nav-panel-copy">
                    <strong>{shown.headline}</strong>
                    <span>{shown.short}</span>
                    <span className="nav-panel-go">See it work <ArrowRight size={14} aria-hidden /></span>
                  </span>
                </Link>

                <div className="nav-panel-aside">
                  <p>Not sure which one?</p>
                  <Link href="/blueprint" onClick={close}>Start with a Blueprint <ArrowUpRight size={15} aria-hidden /></Link>
                  <Link href="/systems" onClick={close}>See all systems <ArrowUpRight size={15} aria-hidden /></Link>
                  <Link href="/apply" onClick={close} className="nav-panel-talk">Or just tell us the workflow <ArrowRight size={15} aria-hidden /></Link>
                </div>
              </div>
            </div>

            {/* the phone version of the same list */}
            <div className="nav-systems-grid">
              {services.map(s => (
                <Link key={s.slug} href={`/systems/${s.slug}`} onClick={close}>
                  <Image src={`/images/services/${s.slug}.webp`} alt="" width={300} height={200} sizes="150px" />
                  <span>{s.name}</span>
                </Link>
              ))}
            </div>
          </div>

          {LINKS.slice(1).map(([href, label], i) => (
            <Link key={href} href={href} onClick={close} aria-current={pathname === href ? 'page' : undefined} data-n={String(i + 3).padStart(2, '0')}>
              {label}
            </Link>
          ))}

          <Link href="/apply" className="nav-cta" onClick={close}>Talk to BYBO <ArrowUpRight size={16} aria-hidden /></Link>

          <div className="nav-sheet-foot">
            <a href="mailto:hello@bybo.in">hello@bybo.in</a>
            <span>Built around your business.</span>
          </div>
        </nav>
      </div>
    </header>
  );
}
