/* eslint-disable @next/next/no-img-element -- demo pages show the prospect's own remote photos */
import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { DemoContent } from '@/lib/crm/autopilot';
import { CONTACT } from '@/lib/site';
import { DemoMotion } from './DemoMotion';
import { blueprintOf, catalog, featured, money, isCutout, loadDemo, off, pad, words } from './data';
import { AddToCart } from './store';
import { Compare } from './compare';
import { MenuBlock, ServicesBlock, WorkBlock } from './services';
import { Personaliser } from './personalise';
import { Wardrobe } from './wardrobe';
import { NameStage } from './stage';

export const dynamic = 'force-dynamic';

// Where the product floats on each drawn studio set: centre x/y in % of the screen, and scale.
const STUDIO_FLOAT = [{ x: 66, y: 48, s: 0.92 }, { x: 64, y: 40, s: 0.62 }, { x: 60, y: 48, s: 0.86 }];

/** Words that rise in one after another as the section reveals. */
function Words({ text }: { text: string }) {
  return <>{text.split(' ').map((w, i) => <span key={i}><span className="w" style={{ '--i': i } as React.CSSProperties}><span>{w}</span></span>{' '}</span>)}</>;
}

/** The demo store's home page: a cinematic product story, then the shop. */
export default async function DemoHome({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const demo = await loadDemo(slug);
  if (!demo) notFound();
  const c = demo.content as DemoContent;
  const inr = (n: number) => money(n, c.currency);
  const base = `/demo/${slug}`;
  const items = catalog(c);
  const w = words(c);
  const best = featured(c, items);
  const facts = c.facts ?? [];
  const scenes = c.scenes ?? [];
  const gallery = c.gallery ?? [];
  const shop = items.length > 0;
  const bp = blueprintOf(c);
  const commerce = bp.commerce;
  const proofPage = c.work?.some((x) => x.image) ? 'work' : 'services';
  const spotlight = !commerce ? null : c.spotlight ?? (best[0]?.image ? { image: best[0].image, kicker: best[0].title, title: c.tagline, callouts: (c.features ?? []).map((f) => f.title).slice(0, 4) } : null);
  const spotItem = items.find((i) => i.images.includes(spotlight?.image ?? '')) ?? best[0];
  const inScene = !!c.scenes_show_product;
  const floatImage = c.hero_float ?? items.find((p) => isCutout(p.image))?.image ?? null;
  const heroFloat = inScene ? null : floatImage;
  const heroItem = items.find((i) => i.images.includes(floatImage ?? '')) ?? best[0];
  const whyItem = items.find((i) => isCutout(i.image) && i.image !== floatImage) ?? heroItem;
  const ctaItem = items.find((i) => isCutout(i.image) && i !== whyItem && i.image !== floatImage) ?? whyItem;
  const cats = [...new Set(items.map((i) => i.category))].slice(0, 4).map((k) => ({ name: k, item: items.find((i) => i.category === k && isCutout(i.image)) ?? items.find((i) => i.category === k)!, n: items.filter((i) => i.category === k).length }));
  const wa = `https://wa.me/${CONTACT.phone.replace(/\D/g, '')}?text=${encodeURIComponent(`Hi BYBO, I saw the demo for ${c.brand}. Let's talk.`)}`;

  // Hero frames: art-directed scene photos when we have them, otherwise studio sets drawn in their colours.
  // Their own site photos are never reused here: the redesign tells their story in a new way.
  const frames = [
    { image: c.hero_scene ?? null, kicker: c.hero.eyebrow, title: c.hero.headline, text: c.hero.sub, float: c.hero_float_pos, product: c.hero_product },
    ...scenes.map((x) => ({ ...x, image: x.image ?? null })),
  ].slice(0, 4);
  const chapters = [
    { id: 'top', label: 'Intro' },
    ...(c.story?.steps?.length ? [{ id: 'how', label: 'How it works' }] : []),
    ...(cats.length > 1 ? [{ id: 'cats', label: 'Categories' }] : []),
    ...(shop ? [{ id: 'shop', label: 'Bestsellers' }] : []),
    ...(spotlight ? [{ id: 'spotlight', label: 'Product' }] : []),
    ...(!commerce && c.services?.length ? [{ id: 'services', label: bp.servicesLabel }] : []),
    ...(!commerce && c.work?.some((x) => x.image) ? [{ id: 'work', label: bp.workLabel }] : []),
    { id: 'why', label: `Why ${c.brand}` },
  ];

  return (
    <>
      <DemoMotion />
      {c.wardrobe ? null : <ol className="demo-rail" aria-hidden="true">
        {chapters.map((ch, i) => <li key={ch.id} data-rail={ch.id}><span>{pad(i + 1)}</span><em>{ch.label}</em></li>)}
      </ol>}

      {/* The name stage: the family name in real 3D chenille, cycling and typed live. */}
      {c.stage ? (
        <NameStage
          names={c.stage.names} font="/demos/nameborne/fonts/graduate.typeface.json"
          kicker={c.hero.eyebrow} headline={c.hero.headline} sub={c.hero.sub}
          looks={c.stage.looks.map((h) => items.find((i) => i.handle === h)).filter((i) => !!i?.swatch && i.price != null).map((i) => ({ title: i!.title, handle: i!.handle, price: i!.price!, swatch: i!.swatch! }))}
        />
      ) : null}

      {/* The wardrobe: every piece on one rail, the chosen one steps forward. */}
      {c.wardrobe ? (
        <Wardrobe
          kicker={c.wardrobe.kicker} title={c.wardrobe.title}
          jackets={items.filter((i) => i.price != null).map((i) => {
            const [role = '', ...rest] = i.description.split('\n');
            const specs = rest.join(' ').split(/\.\s+/).map((x) => x.replace(/\.$/, '').trim()).filter((x) => /^(Body|Sleeves|Lettering|Fit|Collection): /.test(x));
            return { handle: i.handle, code: i.handle.split('-')[0]!.toUpperCase(), title: i.title, price: i.price!, front: i.images[0] ?? i.image, back: i.images[1] ?? null, hanger: i.images[2] ?? null, category: i.category, role, specs };
          })}
        />
      ) : null}

      {/* Intro: scroll into the fabric before the store opens. */}
      {c.intro_image ? (
        <section className="demo-pin demo-intro" data-pin>
          <div className="demo-stage">
            <img src={c.intro_image} alt="" fetchPriority="high" />
            <div className="demo-intro-mark"><span>{c.brand}</span><small>{c.tagline}</small></div>
            <div className="demo-scroll-hint" aria-hidden="true"><span />Scroll</div>
          </div>
        </section>
      ) : null}

      {/* Hero: a pinned, full-screen scene with their product in front from the first second.
          Scenes cross-fade and slowly zoom while the captions change. */}
      {/* With the 3D stage as the hero, the photo chapter would only repeat it. */}
      {c.stage ? null : (
      <section className={`demo-pin demo-hero${inScene ? ' is-in-scene' : ''}`} id={c.stage ? 'lookbook' : 'top'} data-pin data-frames={frames.length} data-chapter={c.stage ? 'lookbook' : 'top'} style={{ '--n': frames.length, '--fx': frames[0]?.float?.x ?? 66, '--fy': frames[0]?.float?.y ?? 48, '--fs': frames[0]?.float?.s ?? 0.92 } as React.CSSProperties}>
        <div className="demo-stage">
          {frames.map((f, i) => (
            <div key={i} className={`demo-frame${i === 0 ? ' is-active is-shown' : ''}`} data-frame={i} data-float={JSON.stringify(f.float ?? STUDIO_FLOAT[i % 3])}>
              {f.image ? <img src={f.image} alt={inScene && heroItem ? heroItem.title : ''} data-fx={f.float?.x ?? 60} style={{ objectPosition: `${f.float?.x ?? 60}% 22%` }} fetchPriority={i === 0 ? 'high' : 'auto'} loading="eager" decoding="async" /> : <div className={`demo-studio s${i % 3}`} aria-hidden="true"><i /><i /><i /></div>}
            </div>
          ))}
          <div className="demo-hero-scrim" aria-hidden="true" />
          <div className="demo-motes" aria-hidden="true">{Array.from({ length: 14 }, (_, i) => <i key={i} style={{ '--i': i } as React.CSSProperties} />)}</div>
          {heroFloat ? (
            <Link href={heroItem ? `${base}/p/${heroItem.handle}` : `${base}/shop`} className="demo-float" aria-label={heroItem?.title ?? 'Shop'}>
              <div className="demo-float-glow" />
              <img src={heroFloat} alt={heroItem?.title ?? ''} fetchPriority="high" />
              {heroItem?.price != null ? <span className="demo-float-tag"><b>{heroItem.title}</b>{inr(heroItem.price)}</span> : null}
            </Link>
          ) : null}
          {/* One hotspot per scene, on that scene's own product; it fades with its scene. */}
          {inScene ? frames.map((f, i) => {
            const item = items.find((x) => x.handle === f.product) ?? (i === 0 ? heroItem : undefined);
            return item ? (
              <Link key={i} href={`${base}/p/${item.handle}`} className={`demo-hotspot${i === 0 ? ' is-active' : ''}`} data-frame={i} aria-label={`${item.title}, view product`}
                style={{ '--hx': f.float?.x ?? 64, '--hy': f.float?.y ?? 45 } as React.CSSProperties}>
                <span className="demo-hotspot-dot" />
                <span className="demo-hotspot-tag"><b>{item.title}</b>{item.price != null ? inr(item.price) : 'View'} →</span>
              </Link>
            ) : null;
          }) : null}
          <div className="demo-captions">
            {frames.map((f, i) => (
              <div key={f.title + i} className={`demo-caption${i === 0 ? ' is-active' : ''}`} data-frame={i}>
                <p className="demo-kicker">{f.kicker}</p>
                {i === 0 && !c.stage ? <h1>{f.title}</h1> : <h2>{f.title}</h2>}
                <p className="demo-caption-text">{f.text}</p>
              </div>
            ))}
          </div>
          <div className="demo-hero-cta">
            {/* A studio or service with nothing to buy asks for the booking or brief instead. */}
            {commerce ? <Link className="demo-btn" data-magnet href={`${base}/shop`}>{bp.cta.primary}</Link> : <Link className="demo-btn" data-magnet href={`${base}/contact`}>{bp.cta.primary}</Link>}
            {!commerce ? <Link className="demo-btn is-ghost" href={`${base}/${proofPage}`}>{bp.cta.secondary}</Link> : c.personalise && heroItem?.price != null ? <a className="demo-btn is-ghost" href="#personalise">Add your name · {inr(heroItem.price)}</a> : heroItem?.price != null ? <AddToCart item={{ handle: heroItem.handle, title: heroItem.title, price: heroItem.price, image: heroItem.image }} className="demo-btn is-ghost" label={`Add to bag · ${inr(heroItem.price)}`} /> : <Link className="demo-btn is-ghost" href={`${base}/contact`}>{w.call}</Link>}
          </div>
          <div className="demo-dots" aria-hidden="true">{frames.map((f, i) => <i key={i} data-frame={i} className={i === 0 ? 'is-active' : ''} />)}</div>
          <div className="demo-scroll-hint" aria-hidden="true"><span />Scroll</div>
        </div>
      </section>
      )}

      {/* How it works: pinned while each step's close-up and callouts play in turn. */}
      {c.story?.steps?.length ? (
        <section className="demo-pin demo-story" id="how" data-pin data-frames={c.story.steps.length} data-chapter="how" style={{ '--n': c.story.steps.length } as React.CSSProperties}>
          <div className="demo-stage">
            {c.story.steps.map((s, i) => (
              <div key={i} className={`demo-frame${i === 0 ? ' is-active is-shown' : ''}`} data-frame={i}>
                {s.image ? <img src={s.image} alt={s.title} loading="eager" decoding="async" /> : null}
              </div>
            ))}
            <div className="demo-story-shade" aria-hidden="true" />
            <div className="demo-story-head"><p className="demo-kicker">{c.story.kicker}</p><h2>{c.story.title}</h2></div>
            {c.story.steps.map((s, i) => (
              <div key={i} className={`demo-story-step${i === 0 ? ' is-active' : ''}`} data-frame={i}>
                <span className="demo-story-no">{pad(i + 1)}<i>/ {pad(c.story!.steps.length)}</i></span>
                <h3>{s.title}</h3>
                <p>{s.text}</p>
                <ul>{s.callouts.map((t, k) => <li key={t} style={{ '--k': k } as React.CSSProperties}><span />{t}</li>)}</ul>
              </div>
            ))}
            <ol className="demo-story-rail" aria-hidden="true">{c.story.steps.map((s, i) => <li key={i} data-frame={i} className={i === 0 ? 'is-active' : ''}><b>{pad(i + 1)}</b>{s.title}</li>)}</ol>
          </div>
        </section>
      ) : null}

      {facts.length ? (
        <div className="demo-marquee" aria-hidden="true">
          <div>{[0, 1].map((k) => <span key={k}>{[...facts, ...cats.map((x) => x.name)].map((t) => <em key={t + k}>{t}<i>✦</i></em>)}</span>)}</div>
        </div>
      ) : null}

      {/* Made-to-order brands: type the name, see the stitch proof, add to bag. */}
      {c.personalise ? (
        <Personaliser
          kicker={c.stage ? "Order yours" : "Make it yours"} title={c.stage ? "Make it yours." : "Wear your name."}
          rules={c.personalise}
          options={items.filter((i) => i.swatch && i.price != null).map((i) => ({ handle: i.handle, title: i.title, price: i.price!, image: i.image, back: i.images[1] ?? null, category: i.category, swatch: i.swatch! }))}
        />
      ) : null}

      {c.origins?.length ? (
        <section className="demo-section hm-origins" id="origins">
          <div className="demo-head is-center" data-reveal><p className="demo-kicker">{w.originsKicker}</p><h2><Words text={w.originsTitle} /></h2></div>
          <div className="hm-origin-row">
            {c.origins.map((o, i) => (
              <Link key={o.name} href={`${base}/shop?c=${encodeURIComponent(o.name)}`} className="hm-origin" data-reveal style={{ transitionDelay: `${i * 90}ms` }}>
                <span className="hm-origin-img">{o.image ? <img src={o.image} alt={o.name} loading="lazy" /> : null}</span>
                <small>{o.region}</small>
                <b>{o.name}</b>
                <em>{o.text}</em>
              </Link>
            ))}
          </div>
        </section>
      ) : null}

      {cats.length > 1 && !c.origins?.length ? (
        <section className="demo-section hm-cats" id="cats" data-chapter="cats">
          <div className="demo-head" data-reveal><p className="demo-kicker">Shop by need</p><h2><Words text="Find your perfect match." /></h2></div>
          <div className="hm-cat-grid">
            {cats.map((k, i) => (
              <Link key={k.name} href={`${base}/shop?c=${encodeURIComponent(k.name)}`} className="hm-cat" data-reveal data-tilt style={{ transitionDelay: `${i * 90}ms` }}>
                {k.item?.image ? <img src={k.item.image} alt="" loading="lazy" /> : null}
                <span><b>{k.name}</b>{k.n} product{k.n === 1 ? '' : 's'} →</span>
              </Link>
            ))}
          </div>
        </section>
      ) : null}

      {/* Bestsellers: a horizontal rail driven by vertical scroll. */}
      {shop ? (
        <section className="demo-hscroll" id="shop" data-hscroll data-chapter="shop">
          <div className="demo-stage">
            <div className="demo-shop-head">
              <p className="demo-kicker">{w.featuredKicker}</p>
              <h2>{w.featuredTitle}</h2>
              <Link className="demo-shop-hint" href={`${base}/shop`}>View all {items.length} →</Link>
            </div>
            <div className="demo-track" data-track>
              {best.map((p, i) => {
                const pct = off(p);
                return (
                  <article key={p.handle} className="demo-card" data-tilt>
                    <Link href={`${base}/p/${p.handle}`} className="demo-card-img">
                      <span className="demo-card-no">{pad(i + 1)}</span>
                      {pct ? <span className="demo-off">−{pct}%</span> : null}
                      {p.image ? <img src={p.image} alt={p.title} loading="lazy" /> : null}
                    </Link>
                    <Link href={`${base}/p/${p.handle}`}><h3>{p.title}</h3></Link>
                    <p>{p.line}</p>
                    <div className="demo-price">
                      {p.price != null ? <b>{inr(p.price)}</b> : null}
                      {pct ? <s>{inr(p.compare!)}</s> : null}
                      {p.price != null ? <AddToCart item={{ handle: p.handle, title: p.title, price: p.price, image: p.image }} className="demo-add" /> : <><b className="is-ask">{w.priceNote}</b><Link className="demo-add" href={`${base}/contact?p=${encodeURIComponent(p.title)}`}>{w.askShort}</Link></>}
                    </div>
                  </article>
                );
              })}
            </div>
            <div className="demo-track-bar" aria-hidden="true"><span /></div>
          </div>
        </section>
      ) : null}

      {c.compare?.left.image && c.compare.right.image ? <Compare data={c.compare} /> : null}

      {/* Product spotlight: the product turns as feature callouts arrive one by one. */}
      {spotlight ? (
        <section className={`demo-pin demo-spot ${isCutout(spotlight.image) ? 'is-cutout' : 'is-photo'}`} id="spotlight" data-pin data-chapter="spotlight">
          <div className="demo-stage">
            <div className="demo-spot-head">
              <p className="demo-kicker">{spotlight.kicker}</p>
              <h2>{spotlight.title}</h2>
              {spotItem ? <div className="demo-spot-buy"><b>{spotItem.price != null ? inr(spotItem.price) : ''}</b><Link className="demo-btn is-small" href={`${base}/p/${spotItem.handle}`}>View product</Link></div> : null}
            </div>
            <div className="demo-spot-orb" aria-hidden="true" />
            <div className="demo-spot-img"><img src={spotlight.image} alt={spotlight.kicker || c.brand} /></div>
            {spotlight.callouts.map((t, i) => (
              <div key={t} className={`demo-callout c${i}`} style={{ '--t': (0.12 + i * (0.7 / Math.max(1, spotlight.callouts.length))).toFixed(2) } as React.CSSProperties}>
                <span className="demo-callout-dot" /><span className="demo-callout-line" /><p><b>{pad(i + 1)}</b>{t}</p>
              </div>
            ))}
          </div>
        </section>
      ) : null}

      {/* Services, menu and work, in the order the blueprint sets. */}
      {commerce ? null : bp.home.filter((x) => x === 'services' || x === 'menu' || x === 'work').map((x) =>
        x === 'work' ? <WorkBlock key={x} c={c} bp={bp} base={base} /> : x === 'menu' ? <MenuBlock key={x} c={c} bp={bp} base={base} /> : <ServicesBlock key={x} c={c} bp={bp} base={base} />)}

      <section className="demo-section demo-why" id="why" data-chapter="why">
        <div>
          <div className="demo-head" data-reveal><p className="demo-kicker">Why {c.brand}</p><h2><Words text={c.tagline} /></h2></div>
          <div className="demo-why-grid">
            {c.offer.map((o, i) => (
              <article key={o.title} data-reveal style={{ transitionDelay: `${i * 110}ms` }}>
                <span className="demo-num">{pad(i + 1)}</span>
                <h3>{o.title}</h3>
                <p>{o.text}</p>
              </article>
            ))}
          </div>
        </div>
        {whyItem?.image ? (
          <Link href={`${base}/p/${whyItem.handle}`} className="demo-why-product">
            <img src={whyItem.image} alt={whyItem.title} loading="lazy" data-speed="0.08" />
            <span className="demo-float-tag"><b>{whyItem.title}</b>{whyItem.price != null ? inr(whyItem.price) : ''}</span>
          </Link>
        ) : null}
      </section>

      {commerce && gallery.length >= 3 ? (
        <section className="demo-gallery">
          {gallery.map((g, i) => <figure key={g} className={`g${i % 3}`} data-speed={[0.12, -0.08, 0.18][i % 3]}><img src={g} alt="" loading="lazy" /></figure>)}
        </section>
      ) : null}

      {c.flow?.length ? (
        <section className="demo-section demo-journey" data-reveal>
          <div className="demo-head"><p className="demo-kicker">{bp.processTitle}</p><h2>Simple, start to finish.</h2></div>
          <ol>{c.flow.map((f, i) => <li key={f.step} style={{ transitionDelay: `${i * 120}ms` }}><span>{pad(i + 1)}</span><h3>{f.step}</h3><p>{f.text}</p></li>)}</ol>
        </section>
      ) : null}

      <section className="demo-cta">
        <div className="demo-ripples" aria-hidden="true"><i /><i /><i /><i /></div>
        {ctaItem?.image ? <img className="demo-cta-img" src={ctaItem.image} alt="" loading="lazy" /> : null}
        <div className="demo-cta-copy" data-reveal>
          <h2>{c.cta.headline}</h2>
          <p>{c.cta.sub}</p>
          <div className="demo-actions">
            {commerce ? <Link className="demo-btn" data-magnet href={`${base}/shop`}>Shop now</Link> : <Link className="demo-btn" data-magnet href={`${base}/contact`}>{bp.cta.primary}</Link>}
            {commerce ? <Link className="demo-btn is-ghost" href={`${base}/contact`}>{bp.cta.secondary}</Link> : <Link className="demo-btn is-ghost" href={`${base}/${proofPage}`}>{bp.cta.secondary}</Link>}
          </div>
        </div>
      </section>

      {c.redesign?.length ? (
        <section className="demo-notes">
          <p className="demo-kicker">A note from BYBO</p>
          <h2>What this redesign changes for {c.brand}</h2>
          <div className="demo-compare">
            {c.redesign.map((r) => (
              <div key={r.now} className="demo-compare-row" data-reveal>
                <p className="was"><span>Today</span>{r.was}</p>
                <p className="now"><span>Redesign</span>{r.now}</p>
              </div>
            ))}
          </div>
          <div className="demo-actions is-left">
            <a className="demo-btn is-light" href={wa} target="_blank" rel="noreferrer">WhatsApp BYBO</a>
            <a className="demo-btn is-ghost is-light-ghost" href={`mailto:${CONTACT.email}?subject=${encodeURIComponent(`Demo for ${c.brand}`)}`}>Email BYBO</a>
          </div>
        </section>
      ) : null}
    </>
  );
}
