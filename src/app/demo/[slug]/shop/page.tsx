import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import type { DemoContent } from '@/lib/crm/autopilot';
import { DemoMotion } from '../DemoMotion';
import { catalog, featured, loadDemo } from '../data';
import { ShopGrid } from '../store';

export const dynamic = 'force-dynamic';
export const metadata: Metadata = { title: 'Shop' };

/** The demo store's collection page: every product, with filters and sorting. */
export default async function Shop({ params, searchParams }: { params: Promise<{ slug: string }>; searchParams: Promise<{ c?: string }> }) {
  const { slug } = await params;
  const demo = await loadDemo(slug);
  if (!demo) notFound();
  const c = demo.content as DemoContent;
  const items = catalog(c);
  // Featured products lead the default order.
  const best = featured(c, items);
  const ordered = [...best, ...items.filter((i) => !best.includes(i))];
  const cats = [...new Set(items.map((i) => i.category))];
  const initial = (await searchParams).c;
  return (
    <>
      <DemoMotion />
      <section className="st-hero">
        <p className="demo-kicker">The collection</p>
        <h1>{initial && cats.includes(initial) ? initial : `Shop ${c.brand}`}</h1>
        <p>{c.hero.sub}</p>
      </section>
      <section className="st-wrap">
        <ShopGrid key={initial ?? 'all'} items={ordered} cats={cats} base={`/demo/${slug}`} initial={initial && cats.includes(initial) ? initial : 'All'} />
      </section>
    </>
  );
}
