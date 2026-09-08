import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, ArrowUpRight, Check, ShieldCheck } from 'lucide-react';
import type { ReactNode } from 'react';
import { services } from '@/lib/redesign';
export function Button({ href, children, secondary = false }: {
    href: string;
    children: ReactNode;
    secondary?: boolean;
}) { return <Link className={`button ${secondary ? 'button-secondary' : ''}`} href={href}>{children}<ArrowRight size={17} aria-hidden="true"/></Link>; }
export function TextLink({ href, children }: {
    href: string;
    children: ReactNode;
}) { return <Link className="text-link" href={href}>{children}<ArrowUpRight size={17} aria-hidden="true"/></Link>; }
export function Section({ children, light = false, id, className = '' }: {
    children: ReactNode;
    light?: boolean;
    id?: string;
    className?: string;
}) { return <section id={id} className={`section ${light ? 'light' : ''} ${className}`}><div className="container">{children}</div></section>; }
export function Heading({ label, title, body }: {
    label?: string;
    title: string;
    body?: string;
}) { return <div className="section-heading">{label && <p className="eyebrow">{label}</p>}<h2>{title}</h2>{body && <p className="lede">{body}</p>}</div>; }
export function Hero({ label, title, body, primary = 'Talk to BYBO', href = '/apply', secondary, art = 'flow', children }: {
    label: string;
    title: string;
    body: string;
    primary?: string;
    href?: string;
    secondary?: {
        href: string;
        label: string;
    };
    art?: 'flow' | 'knowledge' | 'none';
    children?: ReactNode;
}) { return <section className={`hero ${art === 'none' ? 'hero-editorial' : ''}`}><div className="container hero-grid"><div className="hero-copy"><p className="eyebrow">{label}</p><h1>{title}</h1><p className="lede">{body}</p><div className="actions"><Button href={href}>{primary}</Button>{secondary && <Button href={secondary.href} secondary>{secondary.label}</Button>}</div></div>{art !== 'none' && <div className="hero-art"><Image src={`/images/studio-${art}.webp`} alt={art === 'flow' ? 'Violet glass ribbon following a continuous path through a dark architectural frame' : 'Layers of violet glass with an amber layer representing human review'} width={1536} height={1024} sizes="(max-width: 760px) 100vw, 55vw" priority/><div className="art-caption"><span>Built around your business.</span><span>BYBO / Bengaluru</span></div>{children}</div>}</div></section>; }
export function Flow({ steps, gate = 3, note }: {
    steps: [
        string,
        string
    ][];
    gate?: number;
    note: string;
}) { return <figure className="flow-figure"><div className="figure-label"><span>Illustrative workflow</span><span>Rules agreed with your team</span></div><ol className="flow">{steps.map(([title, body], i) => <li key={title} className={i === gate ? 'flow-gate' : ''}><span className="step-number">{String(i + 1).padStart(2, '0')}</span><h3>{title}</h3><p>{body}</p>{i === gate && <span className="gate-tag"><ShieldCheck size={14}/> Human control</span>}</li>)}</ol><figcaption><ShieldCheck size={18} aria-hidden="true"/>{note}</figcaption></figure>; }
export function Cards({ items }: {
    items: [
        string,
        string
    ][];
}) { return <div className="card-grid">{items.map(([title, body], i) => <article className="content-card" key={title}><span className="index">{String(i + 1).padStart(2, '0')}</span><h3>{title}</h3><p>{body}</p></article>)}</div>; }
export function FAQ({ items, title = 'A few things you might be wondering.' }: {
    items: [
        string,
        string
    ][];
    title?: string;
}) { return <Section light className="faq-section"><div className="faq-layout"><Heading label="Good questions" title={title}/><div>{items.map(([q, a]) => <details className="faq" key={q}><summary>{q}<span aria-hidden="true">+</span></summary><p>{a}</p></details>)}</div></div></Section>; }
export function Closing({ title = 'Bring us one recurring problem.', body = 'We will help you decide whether it needs a system.', href = '/apply', label = 'Talk to BYBO' }: {
    title?: string;
    body?: string;
    href?: string;
    label?: string;
}) { return <section className="closing"><div className="container closing-inner"><div><p className="eyebrow">A more capable tomorrow</p><h2>{title}</h2><p>{body}</p></div><Button href={href}>{label}</Button></div></section>; }
export function ServiceList({ compact = false }: {
    compact?: boolean;
}) { return <div className="service-list">{services.map((s, i) => <Link className="service-row" href={`/systems/${s.slug}`} key={s.slug}><span className="index">{String(i + 1).padStart(2, '0')}</span><div><h3>{s.name}</h3><p>{s.short}</p>{!compact && <span className="service-uses">{s.uses.slice(0, 3).map(u => u[0]).join(' · ')}</span>}</div><ArrowUpRight aria-label="Explore service"/></Link>)}</div>; }
export function Included({ items }: {
    items: string[];
}) { return <ul className="included">{items.map(x => <li key={x}><Check size={18} aria-hidden="true"/>{x}</li>)}</ul>; }
