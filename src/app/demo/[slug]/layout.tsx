import type { Metadata } from 'next';
import Link from 'next/link';
import { Cormorant_Garamond, Fraunces, Manrope, Space_Grotesk } from 'next/font/google';
import { notFound, redirect } from 'next/navigation';
import type { DemoContent } from '@/lib/crm/autopilot';
import { CONTACT } from '@/lib/site';
import { LOOKS } from '@/lib/crm/blueprints';
import { blueprintOf, catalog, featured, isCutout, loadDemo, words } from './data';
import { StoreHeader } from './header';
import { CartDrawer, CartProvider } from './store';
import './demo.css';
import './shop.css';
import './service.css';

const editorial = Cormorant_Garamond({ subsets: ['latin'], weight: ['500', '600'], style: ['normal', 'italic'], variable: '--f-editorial', preload: false });
const soft = Fraunces({ subsets: ['latin'], weight: ['500', '600'], style: ['normal', 'italic'], variable: '--f-soft', preload: false });
const modern = Space_Grotesk({ subsets: ['latin'], weight: ['500', '600'], variable: '--f-modern', preload: false });
const body = Manrope({ subsets: ['latin'], weight: ['400', '500', '600'], variable: '--f-body', preload: false });

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const c = (await loadDemo((await params).slug))?.content as DemoContent | undefined;
  const brand = c?.brand ? `${c.brand}: a demo by BYBO` : 'A demo by BYBO';
  return { title: { absolute: brand, template: `%s · ${brand}` }, robots: { index: false, follow: false } };
}

/** True for a dark background, so surfaces and the header switch to light text. */
const isDark = (hex: string) => { const n = parseInt(hex.replace('#', ''), 16); return ((n >> 16 & 255) * 299 + (n >> 8 & 255) * 587 + (n & 255) * 114) / 1000 < 90; };

/** The demo store's frame: announcement bar, header with cart, footer. Every page of the demo shares it. */
export default async function DemoLayout({ children, params }: { children: React.ReactNode; params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const demo = await loadDemo(slug);
  if (!demo) notFound();
  if (demo.kind === 'custom' && demo.url) redirect(demo.url);
  const c = demo.content as DemoContent;
  if (!c?.brand) notFound();

  const base = `/demo/${slug}`;
  const bp = blueprintOf(c);
  // Without a theme of its own the demo takes its blueprint's look.
  const theme = c.theme ?? LOOKS[bp.kind];
  const style = { '--bg': theme.bg, '--ink': theme.ink, '--accent': theme.accent, '--soft': theme.soft } as React.CSSProperties;
  const items = catalog(c);
  const cats = [...new Set(items.map((i) => i.category))].slice(0, 4);
  // Service blueprints get their own pages in the menu instead of a shop.
  const pages = bp.commerce ? [] : [...(c.services?.length ? [{ href: `${base}/services`, label: bp.servicesLabel }] : []), ...(c.work?.some((w) => w.image) ? [{ href: `${base}/work`, label: bp.workLabel }] : [])];
  const links = [...(items.length ? [{ href: `${base}/shop`, label: 'Shop all' }] : pages), ...cats.map((k) => ({ href: `${base}/shop?c=${encodeURIComponent(k)}`, label: k })), { href: `${base}/about`, label: 'About' }, { href: `${base}/contact`, label: 'Contact' }];
  const facts = c.facts ?? [];
  const wa = `https://wa.me/${CONTACT.phone.replace(/\D/g, '')}?text=${encodeURIComponent(`Hi BYBO, I saw the demo for ${c.brand}. Let's talk.`)}`;

  return (
    <div className={`demo f-${c.font ?? 'editorial'} s-${c.style ?? 'luxe'} k-${bp.kind}${isDark(theme.bg) ? ' is-dark' : ''} ${editorial.variable} ${soft.variable} ${modern.variable} ${body.variable}`} style={style}>
      {/* The page behind the demo takes its background too, so nothing flashes the site's own colour. */}
      <style>{`html,body{background:${theme.bg}}`}</style>
      <CartProvider slug={slug}>
        <div className="demo-ribbon">{c.sample_note ? <>{c.sample_note} · </> : null}A demo prepared by <b>BYBO</b> for {c.brand}{c.site_url ? <> · <a href={c.site_url} target="_blank" rel="noreferrer">see the current site</a></> : null} · <Link href={`${base}/dashboard`}>open the owner dashboard</Link> · <a href={wa} target="_blank" rel="noreferrer">talk to BYBO</a></div>
        {facts.length ? <div className="st-announce"><div>{[0, 1].map((k) => <span key={k}>{facts.map((f) => <em key={f + k}>{f}</em>)}</span>)}</div></div> : null}
        <StoreHeader
          base={base} brand={c.brand} logo={c.logo ?? null} cats={cats}
          items={items.map((i) => ({ title: i.title, handle: i.handle, image: i.image, price: i.price, category: i.category }))}
          featured={(() => { const f = featured(c, items).find((i) => isCutout(i.image)) ?? items[0]; return f ? { title: f.title, handle: f.handle, image: f.image, price: f.price, category: f.category } : null; })()}
          badge={c.sample_note ? 'Featured' : 'Bestseller'}
          pages={pages} action={bp.commerce ? 'Enquire' : bp.cta.primary}
          quote={items.length && !items.some((i) => i.price != null) ? words(c).ask.replace(/ about this \w+$/i, '') : null}
        />

        <main>{children}</main>

        <footer className="st-foot">
          <div className="st-foot-brand">
            <p className="demo-logo">{c.brand}</p>
            <p>{c.tagline}</p>
          </div>
          <div><h4>{items.length ? 'Shop' : 'Explore'}</h4>{links.slice(0, 5).map((l) => <Link key={l.href} href={l.href}>{l.label}</Link>)}</div>
          <div><h4>Help</h4><Link href={`${base}/dashboard`}>Owner dashboard</Link><Link href={`${base}/contact`}>Contact us</Link><Link href={`${base}/about`}>Our story</Link>{items.length ? <Link href={`${base}/cart`}>Your bag</Link> : null}</div>
          <div><h4>Promise</h4>{facts.slice(0, 4).map((f) => <p key={f}>{f}</p>)}</div>
          <p className="st-foot-base">© {c.brand} · Redesign by <a href="https://bybo.in">BYBO</a></p>
        </footer>
        <Link href={`${base}/dashboard`} className="st-owner" aria-label="Open the owner dashboard"><i />Owner view</Link>
        <CartDrawer />
      </CartProvider>
    </div>
  );
}
