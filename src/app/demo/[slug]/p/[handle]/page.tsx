/* eslint-disable @next/next/no-img-element -- the prospect's own product photos */
import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { DemoContent } from '@/lib/crm/autopilot';
import { DemoMotion } from '../../DemoMotion';
import { catalog, inr, loadDemo, off, words } from '../../data';
import { AddToCart, BuyBox, Gallery } from '../../store';

export const dynamic = 'force-dynamic';

async function find(slug: string, handle: string) {
  const demo = await loadDemo(slug);
  if (!demo) return null;
  const c = demo.content as DemoContent;
  const items = catalog(c);
  const item = items.find((i) => i.handle === handle);
  return item ? { c, items, item } : null;
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string; handle: string }> }): Promise<Metadata> {
  const { slug, handle } = await params;
  return { title: (await find(slug, handle))?.item.title ?? 'Product' };
}

/** A product page: gallery, price, quantity, add to bag, details, and more to shop. */
export default async function Product({ params }: { params: Promise<{ slug: string; handle: string }> }) {
  const { slug, handle } = await params;
  const found = await find(slug, handle);
  if (!found) notFound();
  const { c, items, item } = found;
  const base = `/demo/${slug}`;
  const pct = off(item);
  const w = words(c);
  const facts = c.facts ?? [];
  const paras = item.description.split('\n').map((s) => s.trim()).filter(Boolean);
  const related = items.filter((i) => i !== item && i.category === item.category).concat(items.filter((i) => i !== item && i.category !== item.category)).slice(0, 4);
  const buy = item.price != null ? { handle: item.handle, title: item.title, price: item.price, image: item.image } : null;

  return (
    <>
      <DemoMotion />
      <nav className="st-crumbs st-wrap"><Link href={base}>Home</Link> / <Link href={`${base}/shop?c=${encodeURIComponent(item.category)}`}>{item.category}</Link> / <span>{item.title}</span></nav>
      <section className="pd st-wrap">
        <Gallery images={item.images.length ? item.images : item.image ? [item.image] : []} title={item.title} />
        <div className="pd-info">
          <p className="demo-kicker">{item.category}</p>
          <h1>{item.title}</h1>
          {item.line ? <p className="pd-line">{item.line}</p> : null}
          <div className="pd-price">
            {item.price != null ? <b>{inr(item.price)}</b> : <b>{w.priceNote}</b>}
            {pct ? <><s>{inr(item.compare!)}</s><span className="demo-off">Save {pct}%</span></> : null}
          </div>
          {item.price != null ? <p className="pd-tax">Inclusive of all taxes</p> : null}
          {buy ? <BuyBox item={buy} facts={facts.slice(0, 3)} /> : (
            <div className="pd-buy">
              <Link className="demo-btn pd-now" href={`${base}/contact?p=${encodeURIComponent(item.title)}`}>{w.ask}</Link>
              <Link className="demo-btn is-ghost pd-now" href={`${base}/contact?p=${encodeURIComponent(`${item.title} (call)`)}`}>{w.call}</Link>
              {facts.length ? <ul className="pd-facts">{facts.slice(0, 3).map((f) => <li key={f}>{f}</li>)}</ul> : null}
            </div>
          )}
          <div className="pd-acc">
            {paras.length ? (
              <details open><summary>Description</summary>{paras.slice(0, 8).map((p) => <p key={p}>{p}</p>)}</details>
            ) : null}
            {facts.length ? <details><summary>Delivery & returns</summary><ul>{facts.map((f) => <li key={f}>{f}</li>)}</ul></details> : null}
            <details><summary>Payment</summary><p>UPI, cards and cash on delivery.</p></details>
          </div>
        </div>
      </section>

      {related.length ? (
        <section className="st-wrap pd-related">
          <div className="demo-head" data-reveal><p className="demo-kicker">You may also like</p><h2>Complete the routine</h2></div>
          <div className="sh-grid">
            {related.map((p) => (
              <article key={p.handle} className="sh-card" data-reveal>
                <Link href={`${base}/p/${p.handle}`} className="demo-card-img">{p.image ? <img src={p.image} alt={p.title} loading="lazy" /> : null}</Link>
                <Link href={`${base}/p/${p.handle}`}><h3>{p.title}</h3></Link>
                <div className="demo-price">
                  {p.price != null ? <b>{inr(p.price)}</b> : null}
                  {p.price != null ? <AddToCart item={{ handle: p.handle, title: p.title, price: p.price, image: p.image }} className="demo-add" label="Add" /> : null}
                </div>
              </article>
            ))}
          </div>
        </section>
      ) : null}

      {buy ? (
        <div className="pd-sticky">
          <span>{item.title}</span><b>{inr(buy.price)}</b>
          <AddToCart item={buy} className="demo-btn is-small" />
        </div>
      ) : null}
    </>
  );
}
