import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { DemoContent } from '@/lib/crm/autopilot';
import { DemoMotion } from '../DemoMotion';
import { blueprintOf, loadDemo } from '../data';
import { MenuBlock, ServicesBlock } from '../services';

export const dynamic = 'force-dynamic';
export const metadata: Metadata = { title: 'Services' };

/** Everything they offer, each as its own chapter (or a menu for salons and restaurants). */
export default async function Services({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const demo = await loadDemo(slug);
  if (!demo) notFound();
  const c = demo.content as DemoContent;
  const bp = blueprintOf(c);
  const base = `/demo/${slug}`;
  return (
    <>
      <DemoMotion />
      <section className="st-hero"><p className="demo-kicker">{c.brand}</p><h1>{bp.servicesLabel}</h1><p>{c.tagline}</p></section>
      {bp.home.includes('menu') ? <MenuBlock c={c} bp={bp} base={base} full /> : <ServicesBlock c={c} bp={bp} base={base} full />}
      <section className="sv-band"><h2>{bp.form.title}</h2><Link className="demo-btn" href={`${base}/contact`}>{bp.cta.primary}</Link></section>
    </>
  );
}
