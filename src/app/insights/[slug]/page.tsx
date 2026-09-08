import Link from 'next/link';
import { notFound } from 'next/navigation';
import { articles } from '@/lib/redesign';
import { Closing, Included, TextLink } from '@/components/studio/Shared';
import { pageMetadata } from '@/lib/seo';
import { getInsightArticle } from '@/lib/insight-articles';
type Props = {
    params: Promise<{
        slug: string;
    }>;
};
export function generateStaticParams() { return articles.map(a => ({ slug: a.slug })); }
export async function generateMetadata({ params }: Props) { const { slug } = await params; const a = articles.find(a => a.slug === slug); const original = getInsightArticle(slug); return a ? pageMetadata({ title: a.title, description: a.excerpt, path: `/insights/${slug}`, ogType: 'article', ogImage: original?.image, ogImageAlt: original?.imageAlt, publishedTime: a.date }) : {}; }
export default async function Article({ params }: Props) { const { slug } = await params; const a = articles.find(a => a.slug === slug); if (!a)
    notFound(); return <><header className="article-hero container"><TextLink href="/insights">All insights</TextLink><p className="eyebrow">{a.category} · {a.read}</p><h1>{a.title}</h1><p className="lede">{a.excerpt}</p><p className="article-byline">BYBO Editorial · <time dateTime={a.date}>{new Date(a.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' })}</time></p></header><section className="section light"><div className="container article-layout"><aside className="article-toc"><p className="eyebrow">In this note</p><nav aria-label="Article contents">{a.sections.map(([title], i) => <a href={`#section-${i}`} key={title}>{String(i + 1).padStart(2, '0')} {title}</a>)}</nav><div className="aside-callout"><h3>One workflow.<br />A clearer direction.</h3><p>Put the questions to work with an AI Opportunity Blueprint.</p><TextLink href="/blueprint">Explore the Blueprint</TextLink></div></aside><article className="article-body"><blockquote>{a.takeaway}</blockquote>{a.sections.map(([title, body], i) => <section id={`section-${i}`} key={title}><h2>{title}</h2><p>{body}</p>{i === 2 && <div className="article-checklist"><p className="eyebrow">Make it concrete</p><Included items={a.checklist}/></div>}</section>)}<div className="related-notes"><p className="eyebrow">Keep reading</p>{articles.filter(x => x.slug !== a.slug).map(x => <Link key={x.slug} href={`/insights/${x.slug}`}>{x.title} ↗</Link>)}</div></article></div></section><Closing title="Bring the question into the real work." body="We will help you map the workflow and decide what deserves a build."/></>; }
