import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { DemoContent } from '@/lib/crm/autopilot';
import { DemoMotion } from '../DemoMotion';
import { blueprintOf, loadDemo } from '../data';
import { WorkGrid } from '../service-client';

export const dynamic = 'force-dynamic';
export const metadata: Metadata = { title: 'Work' };

/** Projects, properties, results or gallery, filterable by type. */
export default async function Work({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const demo = await loadDemo(slug);
  if (!demo) notFound();
  const c = demo.content as DemoContent;
  const bp = blueprintOf(c);
  const items = (c.work ?? []).filter((w) => w.image);
  return (
    <>
      <DemoMotion />
      <section className="st-hero"><p className="demo-kicker">{c.brand}</p><h1>{bp.workLabel}</h1>{c.areas?.length ? <p>{c.areas.join(' · ')}</p> : <p>{c.tagline}</p>}</section>
      <section className="sv-work is-full">
        <WorkGrid items={items} />
        {c.work_note ? <p className="sv-note">{c.work_note}</p> : null}
      </section>
      <section className="sv-band"><h2>{bp.form.title}</h2><Link className="demo-btn" href={`/demo/${slug}/contact`}>{bp.cta.primary}</Link></section>
    </>
  );
}
