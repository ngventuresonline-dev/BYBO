import { articles } from '@/lib/redesign';
import { finalArticles } from '@/components/studio/FinalReferenceData';
import aiSystems from './guides/ai-systems';
import aiSystems2 from './guides/ai-systems-2';
import aiSystems3 from './guides/ai-systems-3';
import aiSystems4 from './guides/ai-systems-4';
import businessOperations from './guides/business-operations';
import businessOperations2 from './guides/business-operations-2';
import businessOperations3 from './guides/business-operations-3';
import businessOperations4 from './guides/business-operations-4';
import governance from './guides/governance';
import governance2 from './guides/governance-2';
import governance3 from './guides/governance-3';
import governance4 from './guides/governance-4';
import indianBusiness from './guides/indian-business';
import indianBusiness2 from './guides/indian-business-2';
import indianBusiness3 from './guides/indian-business-3';
import indianBusiness4 from './guides/indian-business-4';
import websites from './guides/websites';
import websites2 from './guides/websites-2';
import websites3 from './guides/websites-3';
import websites4 from './guides/websites-4';
import { editorialOrder } from './collections';
import type { CollectionId, Guide, GuideBlock, GuideVisual } from './types';

export type { CollectionId, Guide, GuideBlock, GuideVisual } from './types';
export { collections, collectionById, editorialOrder } from './collections';

const rank = new Map(editorialOrder.map((slug, i) => [slug, i]));

export const guides: Guide[] = [
  ...aiSystems, ...aiSystems2, ...aiSystems3, ...aiSystems4,
  ...businessOperations, ...businessOperations2, ...businessOperations3, ...businessOperations4,
  ...governance, ...governance2, ...governance3, ...governance4,
  ...indianBusiness, ...indianBusiness2, ...indianBusiness3, ...indianBusiness4,
  ...websites, ...websites2, ...websites3, ...websites4,
].sort((a, b) => (rank.get(a.slug) ?? 999) - (rank.get(b.slug) ?? 999));

export function getGuide(slug: string) {
  return guides.find(g => g.slug === slug);
}

const LINK = /\[([^\]]+)\]\(([^)\s]+)\)/g;
const words = (text: string) => (text.replace(LINK, '$1').match(/\S+/g) || []).length;
const blockWords = (b: GuideBlock) =>
  b.type === 'p' ? words(b.text)
  : b.type === 'list' ? b.items.reduce((n, i) => n + words(i), 0)
  : b.type === 'table' ? [b.caption, ...b.head, ...b.rows.flat()].reduce((n, t) => n + words(t), 0)
  : words(b.title) + words(b.text);

export function readMinutes(g: Guide) {
  const total =
    g.summary.reduce((n, s) => n + words(s), 0) +
    g.sections.reduce((n, s) => n + words(s.heading) + s.blocks.reduce((m, b) => m + blockWords(b), 0), 0) +
    g.limitations.reduce((n, l) => n + words(l), 0) +
    g.faqs.reduce((n, f) => n + words(f.q) + words(f.a), 0);
  return Math.max(3, Math.round(total / 220));
}

export function formatDate(iso: string) {
  return new Date(`${iso}T00:00:00Z`).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' });
}

/** The three designed articles that predate the guides, placed in their collections. */
const features: { slug: (typeof finalArticles)[number]['slug']; collection: CollectionId }[] = [
  { slug: 'rank-ai-opportunities', collection: 'ai-systems' },
  { slug: 'why-ai-pilots-fail', collection: 'ai-systems' },
  { slug: 'human-in-the-loop-product-decision', collection: 'governance' },
];

export type InsightCard = {
  slug: string;
  href: string;
  collection: CollectionId;
  title: string;
  excerpt: string;
  readMinutes: number;
  date: string;
  /** Cover image under /images, without the extension. */
  art: string;
};

export const insightCards: InsightCard[] = [
  ...guides.map(g => ({
    slug: g.slug,
    href: `/insights/${g.slug}`,
    collection: g.collection,
    title: g.title,
    excerpt: g.dek,
    readMinutes: readMinutes(g),
    date: g.publishedAt,
    art: `insights/${g.slug}`,
  })),
  ...features.map(({ slug, collection }) => {
    const a = finalArticles.find(a => a.slug === slug)!;
    const meta = articles.find(a => a.slug === slug)!;
    return {
      slug,
      href: `/insights/${slug}`,
      collection,
      title: a.title,
      excerpt: a.excerpt,
      readMinutes: parseInt(meta.read, 10) || 5,
      date: meta.date,
      art: a.art,
    };
  }),
];

const publishedHrefs = new Set(insightCards.map(c => c.href));

/** False for a link to an insight that is not published yet (it would 404). */
export function isLiveHref(href: string) {
  return !href.startsWith('/insights/') || href.startsWith('/insights/topics/') || publishedHrefs.has(href);
}

export function cardsIn(collection: CollectionId) {
  return insightCards.filter(c => c.collection === collection);
}

export function cardFor(slug: string) {
  return insightCards.find(c => c.slug === slug);
}
