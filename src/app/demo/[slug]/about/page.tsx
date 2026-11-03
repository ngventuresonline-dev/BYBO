/* eslint-disable @next/next/no-img-element -- the prospect's own product photos */
import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { DemoContent } from '@/lib/crm/autopilot';
import { DemoMotion } from '../DemoMotion';
import { catalog, isCutout, loadDemo, pad } from '../data';

export const dynamic = 'force-dynamic';
export const metadata: Metadata = { title: 'Our story' };

/** Brand story, told from what they sell and promise. */
export default async function About({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const demo = await loadDemo(slug);
  if (!demo) notFound();
  const c = demo.content as DemoContent;
  const items = catalog(c);
  const hero = items.filter((i) => isCutout(i.image)).slice(0, 3);
  return (
    <>
      <DemoMotion />
      <section className="ab-hero">
        <div data-reveal>
          <p className="demo-kicker">Our story</p>
          <h1>{c.tagline}</h1>
          <p>{c.hero.sub}</p>
          <Link className="demo-btn" href={`/demo/${slug}/shop`}>Shop the range</Link>
        </div>
        <div className="ab-stack" aria-hidden="true">{hero.map((i, k) => <img key={i.handle} src={i.image!} alt="" style={{ '--k': k } as React.CSSProperties} />)}</div>
      </section>
      <section className="demo-section demo-why-grid ab-values">
        {c.offer.map((o, i) => (
          <article key={o.title} data-reveal style={{ transitionDelay: `${i * 110}ms` }}><span className="demo-num">{pad(i + 1)}</span><h3>{o.title}</h3><p>{o.text}</p></article>
        ))}
      </section>
      {(c.facts ?? []).length ? (
        <section className="ab-promise st-wrap" data-reveal>
          <h2>Our promise</h2>
          <ul>{(c.facts ?? []).map((f) => <li key={f}>✦ {f}</li>)}</ul>
        </section>
      ) : null}
    </>
  );
}
