import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import type { DemoContent } from '@/lib/crm/autopilot';
import { loadDemo } from '../data';
import { ContactForm } from '../store';

export const dynamic = 'force-dynamic';
export const metadata: Metadata = { title: 'Contact' };

export default async function Contact({ params, searchParams }: { params: Promise<{ slug: string }>; searchParams: Promise<{ p?: string }> }) {
  const demo = await loadDemo((await params).slug);
  if (!demo) notFound();
  const c = demo.content as DemoContent;
  return (
    <>
      <section className="st-hero"><p className="demo-kicker">Contact</p><h1>We are here to help.</h1><p>Questions about an order or a product? Write to the {c.brand} team.</p></section>
      <section className="st-wrap ct">
        <ContactForm product={(await searchParams).p?.slice(0, 120)} />
        <aside className="st-summary">
          <h3>Good to know</h3>
          <ul className="pd-facts">{(c.facts ?? []).map((f) => <li key={f}>{f}</li>)}</ul>
        </aside>
      </section>
    </>
  );
}
