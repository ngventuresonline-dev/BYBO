import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import type { DemoContent } from '@/lib/crm/autopilot';
import { forClient } from '@/lib/crm/blueprints';
import { blueprintOf, loadDemo } from '../data';
import { EnquiryForm } from '../service-client';
import { ContactForm } from '../store';

export const dynamic = 'force-dynamic';
export const metadata: Metadata = { title: 'Contact' };

export default async function Contact({ params, searchParams }: { params: Promise<{ slug: string }>; searchParams: Promise<{ p?: string; s?: string }> }) {
  const demo = await loadDemo((await params).slug);
  if (!demo) notFound();
  const c = demo.content as DemoContent;
  const bp = blueprintOf(c);
  const q = await searchParams;
  return (
    <>
      <section className="st-hero">
        <p className="demo-kicker">{bp.commerce ? 'Contact' : bp.cta.primary}</p>
        <h1>{bp.form.title}</h1>
        <p>{bp.commerce ? `Questions about an order or a product? Write to the ${c.brand} team.` : bp.form.sub}</p>
      </section>
      <section className="st-wrap ct">
        {bp.commerce
          ? <ContactForm product={q.p?.slice(0, 120)} />
          : <EnquiryForm bp={forClient(bp)} services={(c.services ?? []).map((s) => s.title)} areas={c.areas ?? []} pick={q.s?.slice(0, 120)} />}
        <aside className="st-summary">
          <h3>Good to know</h3>
          <ul className="pd-facts">{(c.facts ?? []).map((f) => <li key={f}>{f}</li>)}</ul>
        </aside>
      </section>
    </>
  );
}
