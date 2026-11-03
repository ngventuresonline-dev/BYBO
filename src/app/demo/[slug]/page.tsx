import type { Metadata } from 'next';
import { notFound, redirect } from 'next/navigation';
import { crmConfigured, rpc } from '@/lib/crm/db';
import type { Demo, DemoContent } from '@/lib/crm/autopilot';
import { CONTACT } from '@/lib/site';
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
  return { title: c?.brand ? `${c.brand}: a demo by BYBO` : 'Demo by BYBO', robots: { index: false, follow: false } };
}

/** A personalised demo BYBO prepared for one prospect. Unlisted; the slug carries a random suffix. */
export default async function DemoPage({ params }: { params: Promise<{ slug: string }> }) {
  const demo = await load((await params).slug);
  if (!demo) notFound();
  if (demo.kind === 'custom' && demo.url) redirect(demo.url);
  const c = demo.content as DemoContent;
  if (!c?.brand) notFound();
  const wa = `https://wa.me/${CONTACT.phone.replace(/\D/g, '')}?text=${encodeURIComponent(`Hi BYBO, I saw the demo for ${c.brand}. Let's talk.`)}`;
  const style = { '--d-from': c.palette.from, '--d-to': c.palette.to, '--d-accent': c.palette.accent } as React.CSSProperties;

  return (
    <div className="demo" style={style}>
      <div className="demo-ribbon">A demo prepared by <b>BYBO</b> for {c.brand}. Sample content, ready to tailor.</div>

      <header className="demo-nav">
        <span className="demo-logo">{c.brand}</span>
        <nav>{c.pages.slice(0, 4).map((p) => <span key={p}>{p}</span>)}</nav>
        <a className="demo-btn is-small" href="#contact">Get in touch</a>
      </header>

      <section className="demo-hero">
        <div className="demo-glow" aria-hidden="true" />
        <p className="demo-eyebrow">{c.hero.eyebrow}</p>
        <h1>{c.hero.headline}</h1>
        <p className="demo-sub">{c.hero.sub}</p>
        <div className="demo-actions">
          <a className="demo-btn" href="#contact">Enquire now</a>
          <a className="demo-btn is-ghost" href="#offer">See what we offer</a>
        </div>
        <p className="demo-tag">{c.tagline}</p>
      </section>

      <section className="demo-section" id="offer">
        <p className="demo-kicker">What you get</p>
        <div className="demo-grid">
          {c.offer.map((o, i) => (
            <article key={o.title} className="demo-card" style={{ animationDelay: `${i * 80}ms` }}>
              <span className="demo-num">0{i + 1}</span>
              <h3>{o.title}</h3>
              <p>{o.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="demo-section">
        <p className="demo-kicker">How every enquiry is handled</p>
        <ol className="demo-flow">
          {c.flow.map((f, i) => (
            <li key={f.step}><span>{i + 1}</span><div><h3>{f.step}</h3><p>{f.text}</p></div></li>
          ))}
        </ol>
      </section>

      <section className="demo-section demo-built">
        <div>
          <p className="demo-kicker">What BYBO would build</p>
          <h2>Your {c.industry.toLowerCase() || 'business'} site, working for you around the clock.</h2>
          <p className="demo-sub">Pages: {c.pages.join(' · ')}</p>
        </div>
        <div className="demo-features">
          {c.features.map((f) => <div key={f.title} className="demo-feature"><h3>{f.title}</h3><p>{f.text}</p></div>)}
        </div>
      </section>

      <section className="demo-cta" id="contact">
        <h2>{c.cta.headline}</h2>
        <p>{c.cta.sub}</p>
        <div className="demo-actions">
          <a className="demo-btn" href={wa} target="_blank" rel="noreferrer">WhatsApp BYBO</a>
          <a className="demo-btn is-ghost" href={`mailto:${CONTACT.email}?subject=${encodeURIComponent(`Demo for ${c.brand}`)}`}>Email us</a>
        </div>
      </section>

      <footer className="demo-foot">Built by <a href="https://bybo.in">BYBO</a> · Built around your business</footer>
    </div>
  );
}
