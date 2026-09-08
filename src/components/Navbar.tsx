'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { ArrowUpRight, ChevronDown, Menu, X } from 'lucide-react';
import { services } from '@/lib/redesign';
export function Navbar() {
    const pathname = usePathname();
    const [open, setOpen] = useState(false);
    const [servicesOpen, setServicesOpen] = useState(false);
    const menuButton = useRef<HTMLButtonElement>(null);
    const serviceWrap = useRef<HTMLDivElement>(null);
    useEffect(() => { function close(e: KeyboardEvent) { if (e.key === 'Escape') {
        setOpen(false);
        setServicesOpen(false);
        menuButton.current?.focus();
    } } function outside(e: PointerEvent) { if (serviceWrap.current && !serviceWrap.current.contains(e.target as Node))
        setServicesOpen(false); } document.addEventListener('keydown', close); document.addEventListener('pointerdown', outside); return () => { document.removeEventListener('keydown', close); document.removeEventListener('pointerdown', outside); }; }, []);
    const close = () => { setOpen(false); setServicesOpen(false); };
    return <header className="site-header"><div className="container nav-inner"><Link href="/" className="wordmark" aria-label="BYBO home" onClick={close}>BYBO<span className="brand-dot">.</span></Link><span className="brand-note">Built around<br />your business.</span><button ref={menuButton} type="button" className="menu-toggle" aria-label={open ? 'Close navigation' : 'Open navigation'} aria-controls="site-navigation" aria-expanded={open} onClick={() => setOpen(!open)}>{open ? <X /> : <Menu />}</button><nav id="site-navigation" aria-label="Main navigation" className={open ? 'nav-links is-open' : 'nav-links'}><Link href="/solutions" aria-current={pathname === '/solutions' ? 'page' : undefined} onClick={close}>Solutions</Link><div className="nav-services" ref={serviceWrap}><button type="button" aria-expanded={servicesOpen} aria-controls="services-menu" onClick={() => setServicesOpen(!servicesOpen)}>Services <ChevronDown size={14}/></button>{servicesOpen && <div className="services-menu" id="services-menu"><Link href="/systems" className="all-services" onClick={close}>Explore all services <ArrowUpRight size={16}/></Link>{services.map(s => <Link href={`/systems/${s.slug}`} key={s.slug} onClick={close} aria-current={pathname === `/systems/${s.slug}` ? 'page' : undefined}>{s.name}</Link>)}</div>}</div>{[['/industries', 'Industries'], ['/how-we-work', 'How we work'], ['/insights', 'Insights']].map(([href, label]) => <Link key={href} href={href} onClick={close} aria-current={pathname === href ? 'page' : undefined}>{label}</Link>)}<Link href="/apply" className="nav-cta" onClick={close}>Talk to BYBO <ArrowUpRight size={16}/></Link></nav></div></header>;
}
