/**
 * Reads a prospect's current website so their demo can redesign it with their
 * real products, photos, prices and facts. Shopify stores expose
 * /products.json; any other site gives its title, description, main images
 * and visible text. Best effort: a site that won't load returns null.
 */

export type SiteProduct = { title: string; price: number | null; compare: number | null; image: string | null; images: string[]; type: string | null; url: string };
export type SiteScan = {
  url: string;
  platform: 'shopify' | 'other';
  title: string | null;
  description: string | null;
  logo: string | null;
  ogImage: string | null;
  images: string[];
  products: SiteProduct[];
  text: string;
};

const UA = 'Mozilla/5.0 (compatible; BYBO-demo-builder/1.0; +https://bybo.in)';

async function get(url: string, ms = 12_000) {
  const res = await fetch(url, { headers: { 'user-agent': UA, accept: 'text/html,application/json' }, redirect: 'follow', signal: AbortSignal.timeout(ms) }).catch(() => null);
  return res?.ok ? res : null;
}

const decode = (s: string) => s.replace(/&amp;/g, '&').replace(/&quot;/g, '"').replace(/&#39;|&rsquo;/g, '’').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&nbsp;/g, ' ');
const meta = (html: string, key: string) => {
  const m = html.match(new RegExp(`<meta[^>]+(?:name|property)=["']${key}["'][^>]*content=["']([^"']+)`, 'i'))
    ?? html.match(new RegExp(`<meta[^>]+content=["']([^"']+)["'][^>]*(?:name|property)=["']${key}["']`, 'i'));
  return m ? decode(m[1]!.trim()) : null;
};

function absolute(src: string, base: string) {
  try {
    const u = new URL(src.startsWith('//') ? `https:${src}` : src, base);
    return u.protocol === 'https:' || u.protocol === 'http:' ? u.toString() : null;
  } catch { return null; }
}

export function normaliseUrl(raw: string | null | undefined): string | null {
  const s = (raw ?? '').trim();
  if (!s) return null;
  try {
    const u = new URL(/^https?:\/\//i.test(s) ? s : `https://${s}`);
    if (!u.hostname.includes('.') || /(^|\.)(facebook|instagram|linkedin|amazon|flipkart|google|youtube|wa\.me|whatsapp)\./i.test(u.hostname)) return null;
    return `${u.protocol}//${u.hostname}`;
  } catch { return null; }
}

export async function scanSite(rawUrl: string): Promise<SiteScan | null> {
  const url = normaliseUrl(rawUrl);
  if (!url) return null;
  const page = await get(url);
  if (!page) return null;
  const html = (await page.text()).slice(0, 600_000);

  const title = decode(html.match(/<title[^>]*>([^<]*)/i)?.[1]?.trim() ?? '') || null;
  const description = meta(html, 'description') ?? meta(html, 'og:description');
  const ogImage = (() => { const o = meta(html, 'og:image'); return o ? absolute(o, url) : null; })();
  const logo = (() => {
    const m = html.match(/<img[^>]+(?:class|alt|id)=["'][^"']*logo[^"']*["'][^>]*src=["']([^"']+)/i) ?? html.match(/<img[^>]+src=["']([^"']+)["'][^>]*(?:class|alt|id)=["'][^"']*logo/i);
    return m ? absolute(m[1]!, url) : null;
  })();
  const images = [...new Set([...html.matchAll(/<img[^>]+(?:data-src|src)=["']([^"']+)["']/gi)].map((m) => absolute(m[1]!, url)).filter((s): s is string => !!s && !/\.svg(\?|$)|icon|sprite|pixel|logo|badge|payment|flag/i.test(s)))].slice(0, 16);
  const text = decode(html.replace(/<script[\s\S]*?<\/script>|<style[\s\S]*?<\/style>|<noscript[\s\S]*?<\/noscript>/gi, ' ').replace(/<[^>]+>/g, ' ')).replace(/\s+/g, ' ').trim().slice(0, 3500);

  let products: SiteProduct[] = [];
  let platform: SiteScan['platform'] = /cdn\.shopify\.com|Shopify\.theme/i.test(html) ? 'shopify' : 'other';
  if (platform === 'shopify') {
    const res = await get(`${url}/products.json?limit=24`);
    const data = res ? await res.json().catch(() => null) as { products?: { title: string; handle: string; product_type?: string; variants?: { price?: string; compare_at_price?: string | null }[]; images?: { src: string }[] }[] } | null : null;
    products = (data?.products ?? []).slice(0, 12).map((p) => {
      const v = p.variants?.[0];
      const imgs = (p.images ?? []).map((i) => i.src).filter(Boolean).slice(0, 4);
      return {
        title: p.title, price: v?.price ? Number(v.price) : null, compare: v?.compare_at_price ? Number(v.compare_at_price) : null,
        image: imgs[0] ?? null, images: imgs, type: p.product_type || null, url: `${url}/products/${p.handle}`,
      };
    });
    if (!products.length) platform = 'other';
  }
  return { url, platform, title, description, logo, ogImage, images, products, text };
}
