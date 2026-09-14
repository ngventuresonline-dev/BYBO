'use client';

import Link from 'next/link';
import { Wordmark } from './Wordmark';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { ArrowUpRight, ChevronDown, Menu, X } from 'lucide-react';
import { services } from '@/lib/redesign';

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const menuButton = useRef<HTMLButtonElement>(null);
  const serviceWrap = useRef<HTMLDivElement>(null);

  // The header glass thickens once the page moves, so it reads as glass over the
  // hero and stays legible over the cream sections below it.
  useEffect(() => {
    let frame = 0;
    const read = () => { frame = 0; setScrolled(window.scrollY > 24); };
    const onScroll = () => { if (!frame) frame = requestAnimationFrame(read); };
    read();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => { window.removeEventListener('scroll', onScroll); if (frame) cancelAnimationFrame(frame); };
  }, []);

  useEffect(() => {
    function closeOnEscape(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setOpen(false);
        setServicesOpen(false);
        menuButton.current?.focus();
      }
    }
    function closeServicesOutside(event: PointerEvent) {
      if (serviceWrap.current && !serviceWrap.current.contains(event.target as Node)) setServicesOpen(false);
    }
    document.addEventListener('keydown', closeOnEscape);
    document.addEventListener('pointerdown', closeServicesOutside);
    return () => {
      document.removeEventListener('keydown', closeOnEscape);
      document.removeEventListener('pointerdown', closeServicesOutside);
    };
  }, []);

  const close = () => {
    setOpen(false);
    setServicesOpen(false);
  };

  return (
    <header className="site-header" data-scrolled={scrolled ? '' : undefined} data-open={open ? '' : undefined}>
      <span className="sh-glass" aria-hidden />
      <div className="container nav-inner">
        <Link href="/" className="wordmark" aria-label="BYBO home" onClick={close}>
          <Wordmark />
        </Link>
        <span className="brand-note">Built around your business.</span>
        <button ref={menuButton} type="button" className="menu-toggle" aria-label={open ? 'Close navigation' : 'Open navigation'} aria-controls="site-navigation" aria-expanded={open} onClick={() => setOpen(!open)}>
          {open ? <X /> : <Menu />}
        </button>
        <nav id="site-navigation" aria-label="Main navigation" className={open ? 'nav-links is-open' : 'nav-links'}>
          <Link href="/solutions" aria-current={pathname === '/solutions' ? 'page' : undefined} onClick={close}>Solutions</Link>
          <div className="nav-services" ref={serviceWrap}>
            <button type="button" aria-expanded={servicesOpen} aria-controls="services-menu" onClick={() => setServicesOpen(!servicesOpen)}>Systems <ChevronDown size={14} /></button>
            {servicesOpen && (
              <div className="services-menu" id="services-menu">
                <Link href="/systems" className="all-services" onClick={close}>Explore all systems <ArrowUpRight size={16} /></Link>
                {services.map((service) => <Link href={`/systems/${service.slug}`} key={service.slug} onClick={close} aria-current={pathname === `/systems/${service.slug}` ? 'page' : undefined}>{service.name}</Link>)}
              </div>
            )}
          </div>
          {[["/industries", "Industries"], ["/how-we-work", "How we work"], ["/insights", "Insights"]].map(([href, label]) => <Link key={href} href={href} onClick={close} aria-current={pathname === href ? 'page' : undefined}>{label}</Link>)}
          <Link href="/apply" className="nav-cta" onClick={close}>Talk to BYBO <ArrowUpRight size={16} /></Link>
        </nav>
      </div>
    </header>
  );
}
