/* eslint-disable @next/next/no-img-element -- demo pages show the prospect's own remote product photos */
import type { Metadata } from 'next';
import { notFound, redirect } from 'next/navigation';
import { crmConfigured, rpc } from '@/lib/crm/db';
import type { Demo, DemoContent } from '@/lib/crm/autopilot';
import { CONTACT } from '@/lib/site';
import { DemoMotion } from './DemoMotion';
import './demo.css';

export const dynamic = 'force-dynamic';

async function load(slug: string) {
  if (!crmConfigured() || !/^[a-z0-9-]{3,60}$/.test(slug)) return null;
  const rows = await rpc<Demo[]>('bybo_demo_by_slug', { p_slug: slug }).catch(() => []);
  return rows[0] ?? null;
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const d = await load((await params).slug);
  const c = d?.content as DemoContent | undefined;
  return { title: { absolute: c?.brand ? `${c.brand}: a demo by BYBO` : 'A demo by BYBO' }, robots: { index: false, follow: false } };
}

const inr = (n: number) => `₹${Math.round(n).toLocaleString('en-IN')}`;

/** A personalised demo BYBO prepared for one prospect: a redesign of their real site. Unlisted. */
export default async function DemoPage({ params }: { params: Promise<{ slug: string }> }) {
  const demo = await load((await params).slug);
  if (!demo) notFound();
  if (demo.kind === 'custom' && demo.url) redirect(demo.url);
  const c = demo.content as DemoContent;
  if (!c?.brand) notFound();
  const products = c.products ?? [];
  const facts = c.facts ?? [];
  const wa = `https://wa.me/${CONTACT.phone.replace(/\D/g, '')}?text=${encodeURIComponent(`Hi BYBO, I saw the demo for ${c.brand}. Let's talk.`)}`;
  const style = { '--d-from': c.palette.from, '--d-to': c.palette.to, '--d-accent': c.palette.accent } as React.CSSProperties;
  const [first, ...rest] = c.hero.headline.split(' ');
  const shop = products.length > 0;

  return (
    <div className={`demo s-${c.style ?? 'luxe'}`} style={style}>
      <DemoMotion />
      <div className="demo-ribbon">A redesign prepared by <b>BYBO</b> for {c.brand}{c.site_url ? <> · <a href={c.site_url} target="_blank" rel="noreferrer">see the current site</a></> : null}. Sample layout, ready to tailor.</div>

      <header className="demo-nav">
        <span className="demo-logo">{c.brand}</span>
        <nav>{(c.categories?.length ? c.categories : c.pages).slice(0, 5).map((p) => <a key={p} href={shop ? '#shop' : '#offer'}>{p}</a>)}</nav>
        <a className="demo-btn is-small" data-magnet href={shop ? '#shop' : '#contact'}>{shop ? 'Shop now' : 'Get in touch'}</a>
      </header>

      <section className={`demo-hero ${c.hero_image ? 'has-image' : ''}`}>
        <div className="demo-aurora" aria-hidden="true"><span /><span /><span /></div>
        <div className="demo-hero-copy">
          <p className="demo-eyebrow" data-reveal>{c.hero.eyebrow}</p>
          <h1 data-reveal><span className="demo-shine">{first}</span> {rest.join(' ')}</h1>
          <p className="demo-sub" data-reveal>{c.hero.sub}</p>
          <div className="demo-actions" data-reveal>
            <a className="demo-btn" data-magnet href={shop ? '#shop' : '#contact'}>{shop ? 'Shop the range' : 'Enquire now'}</a>
            <a className="demo-btn is-ghost" href="#why">Why {c.brand}</a>
          </div>
          {facts.length ? <ul className="demo-facts" data-reveal>{facts.slice(0, 3).map((f) => <li key={f}>✦ {f}</li>)}</ul> : null}
        </div>
        {c.hero_image ? (
          <div className="demo-hero-art" data-parallax>
            <div className="demo-orb" aria-hidden="true" />
            <div className="demo-ring" aria-hidden="true" />
            <img src={c.hero_image} alt={products[0]?.title ?? c.brand} />
          </div>
        ) : null}
      </section>

      {facts.length || c.categories?.length ? (
        <div className="demo-marquee" aria-hidden="true">
          <div>{[...Array(2)].map((_, k) => <span key={k}>{[...facts, ...(c.categories ?? [])].map((t) => <em key={t + k}>{t}<i>✦</i></em>)}</span>)}</div>
        </div>
      ) : null}

      {shop ? (
        <section className="demo-section" id="shop">
          <div className="demo-head" data-reveal>
            <p className="demo-kicker">Bestsellers</p>
            <h2>Shop {c.brand}</h2>
          </div>
          <div className="demo-products">
            {products.map((p, i) => {
              const off = p.price && p.compare && p.compare > p.price ? Math.round((1 - p.price / p.compare) * 100) : null;
              return (
                <article key={p.title} className="demo-product" data-reveal data-tilt style={{ transitionDelay: `${i * 70}ms` }}>
                  <div className="demo-product-img">
                    {off ? <span className="demo-off">{off}% off</span> : null}
                    {p.image ? <img src={p.image} alt={p.title} loading="lazy" /> : null}
                  </div>
                  <h3>{p.title}</h3>
                  <p>{p.line}</p>
                  <div className="demo-price">
                    {p.price != null ? <b>{inr(p.price)}</b> : null}
                    {p.compare && p.price && p.compare > p.price ? <s>{inr(p.compare)}</s> : null}
                    <span className="demo-add">Add to cart</span>
                  </div>
                </article>
              );
            })}
          </div>
        </section>
      ) : null}

      <section className="demo-section" id="why">
        <div className="demo-head" data-reveal><p className="demo-kicker">Why {c.brand}</p><h2>{c.tagline}</h2></div>
        <div className="demo-bento">
          {c.offer.map((o, i) => (
            <article key={o.title} className={`demo-tile t${i}`} data-reveal data-tilt>
              <span className="demo-num">0{i + 1}</span>
              <h3>{o.title}</h3>
              <p>{o.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="demo-section">
        <div className="demo-head" data-reveal><p className="demo-kicker">{shop ? 'From browse to doorstep' : 'How every enquiry is handled'}</p><h2>A smoother journey for every customer</h2></div>
        <ol className="demo-flow">
          {c.flow.map((f, i) => (
            <li key={f.step} data-reveal style={{ transitionDelay: `${i * 90}ms` }}><span>{i + 1}</span><div><h3>{f.step}</h3><p>{f.text}</p></div></li>
          ))}
        </ol>
      </section>

      <section className="demo-section demo-built">
        <div data-reveal>
          <p className="demo-kicker">What the new site does</p>
          <h2>Built to sell, around the clock.</h2>
          <p className="demo-sub">Pages: {c.pages.join(' · ')}</p>
        </div>
        <div className="demo-features">
          {c.features.map((f) => <div key={f.title} className="demo-feature" data-reveal><h3>{f.title}</h3><p>{f.text}</p></div>)}
        </div>
      </section>

      {c.redesign?.length ? (
        <section className="demo-section">
          <div className="demo-head" data-reveal><p className="demo-kicker">The redesign</p><h2>What changes from today</h2></div>
          <div className="demo-compare">
            {c.redesign.map((r) => (
              <div key={r.now} className="demo-compare-row" data-reveal>
                <p className="was"><span>Today</span>{r.was}</p>
                <p className="now"><span>With BYBO</span>{r.now}</p>
              </div>
            ))}
          </div>
        </section>
      ) : null}

      <section className="demo-cta" id="contact" data-reveal>
        <h2>{c.cta.headline}</h2>
        <p>{c.cta.sub}</p>
        <div className="demo-actions">
          <a className="demo-btn" data-magnet href={wa} target="_blank" rel="noreferrer">WhatsApp BYBO</a>
          <a className="demo-btn is-ghost" href={`mailto:${CONTACT.email}?subject=${encodeURIComponent(`Demo for ${c.brand}`)}`}>Email us</a>
        </div>
      </section>

      <footer className="demo-foot">Redesign by <a href="https://bybo.in">BYBO</a> · Built around your business</footer>
    </div>
  );
}
