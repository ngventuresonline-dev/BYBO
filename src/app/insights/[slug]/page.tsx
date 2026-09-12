import { notFound } from 'next/navigation';
import { articles } from '@/lib/redesign';
import { pageMetadata, siteUrl, SITE } from '@/lib/seo';
import { getInsightArticle } from '@/lib/insight-articles';
import { collectionById, getGuide, guides, type Guide } from '@/lib/insights';
import { ReferenceArticle } from '@/components/studio/FinalReferencePages';
import { GuideArticle } from '@/components/insights/GuideArticle';

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return [...guides.map(g => ({ slug: g.slug })), ...articles.map(a => ({ slug: a.slug }))];
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const guide = getGuide(slug);
  if (guide) {
    return pageMetadata({
      title: guide.seoTitle || guide.title,
      description: guide.description,
      path: `/insights/${slug}`,
      keywords: guide.keywords,
      ogType: 'article',
      ogImage: `/og/insights/${slug}`,
      ogImageAlt: guide.title,
      publishedTime: guide.publishedAt,
    });
  }
  const a = articles.find(a => a.slug === slug);
  const original = getInsightArticle(slug);
  return a ? pageMetadata({ title: a.title, description: a.excerpt, path: `/insights/${slug}`, ogType: 'article', ogImage: original?.image, ogImageAlt: original?.imageAlt, publishedTime: a.date }) : {};
}

function guideJsonLd(g: Guide) {
  const url = siteUrl(`/insights/${g.slug}`);
  const c = collectionById[g.collection];
  const org = { '@type': 'Organization', name: SITE.name, url: SITE.url, logo: { '@type': 'ImageObject', url: siteUrl('/icon.svg') } };
  return [
    {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: g.title,
      description: g.description,
      image: siteUrl(`/og/insights/${g.slug}`),
      datePublished: g.publishedAt,
      dateModified: g.publishedAt,
      author: org,
      publisher: org,
      mainEntityOfPage: url,
      articleSection: c.name,
      keywords: g.keywords.join(', '),
      inLanguage: 'en-IN',
      citation: g.sources.map(s => ({ '@type': 'CreativeWork', name: s.title, url: s.url })),
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: SITE.url },
        { '@type': 'ListItem', position: 2, name: 'Insights', item: siteUrl('/insights') },
        { '@type': 'ListItem', position: 3, name: c.name, item: siteUrl(`/insights/topics/${c.id}`) },
        { '@type': 'ListItem', position: 4, name: g.title, item: url },
      ],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: g.faqs.map(f => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a.replace(/\[([^\]]+)\]\([^)]+\)/g, '$1') } })),
    },
  ];
}

export default async function Article({ params }: Props) {
  const { slug } = await params;
  const guide = getGuide(slug);
  if (guide) {
    return (
      <>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(guideJsonLd(guide)).replace(/</g, '\u003c') }} />
        <GuideArticle guide={guide} />
      </>
    );
  }
  if (!articles.some(a => a.slug === slug)) notFound();
  return <ReferenceArticle slug={slug} />;
}
