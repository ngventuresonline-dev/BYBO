import { cache } from 'react';
import { crmConfigured, rpc } from '@/lib/crm/db';
import type { Demo, DemoContent } from '@/lib/crm/autopilot';
import { blueprint } from '@/lib/crm/blueprints';

export type Item = { title: string; handle: string; price: number | null; compare: number | null; image: string | null; images: string[]; category: string; description: string; line: string; swatch?: { body: string; sleeve: string; letter: string; edge: string } };

/** One demo per request, shared by the layout and every page under it. */
export const loadDemo = cache(async (slug: string): Promise<Demo | null> => {
  if (!crmConfigured() || !/^[a-z0-9-]{3,60}$/.test(slug)) return null;
  const rows = await rpc<Demo[]>('bybo_demo_by_slug', { p_slug: slug }).catch(() => []);
  return rows[0] ?? null;
});

const slugify = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, 60) || 'item';

/** The demo shop's catalogue: their full store when we have it, else the featured products. */
export function catalog(c: DemoContent): Item[] {
  const lines = new Map((c.products ?? []).map((p) => [p.title, p.line]));
  const cats = c.categories ?? [];
  const categorise = (title: string, type: string | null) =>
    cats.find((k) => title.toLowerCase().includes(k.toLowerCase().replace(/s$/, '')))
    ?? cats.find((k) => k.toLowerCase() === type?.toLowerCase()) ?? cats[0] ?? type ?? 'Shop';
  const src = c.catalog?.length
    ? c.catalog
    : (c.products ?? []).map((p) => ({ title: p.title, handle: slugify(p.title), price: p.price, compare: p.compare, image: p.image, images: p.image ? [p.image] : [], type: null, description: '' }));
  const seen = new Set<string>();
  return src.map((p) => {
    let handle = slugify(p.handle || p.title);
    while (seen.has(handle)) handle += '-x';
    seen.add(handle);
    return { title: p.title, handle, price: p.price, compare: p.compare, image: p.image, images: p.images.length ? p.images : p.image ? [p.image] : [], category: categorise(p.title, p.type), description: p.description, line: lines.get(p.title) ?? '', swatch: 'swatch' in p ? p.swatch : undefined };
  });
}

/** The wireframe this demo follows: its pages, section order, form and dashboard. */
export const blueprintOf = (c: DemoContent) => blueprint(c.kind, c.industry, (c.catalog?.length ?? 0) > 0 || (c.products?.length ?? 0) > 0);

/** Featured products first, in the order the art direction chose. */
export function featured(c: DemoContent, items: Item[]): Item[] {
  const order = (c.products ?? []).map((p) => p.title);
  const picked = order.map((t) => items.find((i) => i.title === t)).filter((i): i is Item => !!i);
  return picked.length ? picked : items.slice(0, 8);
}

/** Business-specific wording with plain defaults. */
export function words(c: DemoContent) {
  const l = c.labels ?? {};
  return {
    originsKicker: l.origins_kicker ?? 'Shop by collection', originsTitle: l.origins_title ?? 'Collections',
    featuredKicker: l.featured_kicker ?? (c.sample_note ? 'Featured' : 'Bestsellers'), featuredTitle: l.featured_title ?? (c.sample_note ? `The ${c.brand} edit` : 'Most-loved pieces'),
    ask: l.ask ?? 'Enquire about this product', askShort: l.ask_short ?? 'Enquire', call: l.call ?? 'Book a video call', priceNote: l.price_note ?? 'Price on request',
  };
}

/** Prices in the demo's currency: rupees by default, dollars or pounds for brands selling abroad. */
export function money(n: number, currency = 'INR') {
  if (currency === 'INR') return `₹${Math.round(n).toLocaleString('en-IN')}`;
  return new Intl.NumberFormat('en-US', { style: 'currency', currency, maximumFractionDigits: 0 }).format(n);
}
export const inr = (n: number) => money(n);
export const pad = (n: number) => String(n).padStart(2, '0');
export const off = (i: Pick<Item, 'price' | 'compare'>) => (i.price && i.compare && i.compare > i.price ? Math.round((1 - i.price / i.compare) * 100) : null);
// Generated photos and our own product shots are full photos, not transparent cut-outs, whatever their format.
export const isCutout = (u?: string | null) => !!u && !/^\/(demo-media|demos)\//.test(u) && /\.(png|webp)(\?|$)/i.test(u);
