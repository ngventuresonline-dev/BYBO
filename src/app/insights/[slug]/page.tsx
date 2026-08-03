import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, Clock3 } from "lucide-react";
import { FadeIn } from "@/components/FadeIn";
import { InsightArticleContent } from "@/components/InsightArticleContent";
import { InsightArticleHeroIllustration } from "@/components/page-visuals/HeroIllustrations";
import { SignalAccentSurface } from "@/components/SignalAccentSurface";
import {
  getInsightArticle,
  getRelatedArticles,
  insightArticles,
} from "@/lib/insight-articles";
import { pageMetadata } from "@/lib/seo";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return insightArticles
    .filter((article) => article.published)
    .map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = getInsightArticle(slug);

  if (!article?.published) {
    return pageMetadata({
      title: "Insight not found",
      description: "This BYBO insight article could not be found.",
      path: `/insights/${slug}`,
      noIndex: true,
    });
  }

  return pageMetadata({
    title: article.title,
    description: article.metaDescription,
    path: `/insights/${article.slug}`,
    keywords: article.seoKeywords,
    ogType: "article",
    ogImage: article.image,
    ogImageAlt: article.imageAlt,
    publishedTime: article.publishedAt,
  });
}

export default async function InsightArticlePage({ params }: Props) {
  const { slug } = await params;
  const article = getInsightArticle(slug);

  if (!article?.published) {
    notFound();
  }

  const related = getRelatedArticles(slug);

  return (
    <>
      <section className="page-hero border-b border-line">
        <div className="section-shell relative">
          <FadeIn immediate>
            <Link
              href="/insights"
              className="inline-flex items-center gap-2 font-mono text-[0.62rem] uppercase tracking-[0.12em] text-dim transition-colors hover:text-cream"
            >
              <ArrowLeft size={14} /> All insights
            </Link>
            <div className="page-hero-grid mt-8">
              <div className="page-hero-copy min-w-0">
                <div className="flex flex-wrap items-center gap-4">
                  <span className="technical-label text-signal">{article.category}</span>
                  <span className="inline-flex items-center gap-1.5 font-mono text-[0.6rem] uppercase tracking-[0.1em] text-dim">
                    <Clock3 size={12} /> {article.readTime}
                  </span>
                  {article.publishedAt && (
                    <span className="font-mono text-[0.6rem] uppercase tracking-[0.1em] text-dim">
                      {new Date(article.publishedAt).toLocaleDateString("en-IN", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })}
                    </span>
                  )}
                </div>
                <h1 className="display-title title-wide mt-7">{article.title}</h1>
                <p className="body-large mt-8 max-w-2xl">{article.excerpt}</p>
              </div>
              <div className="page-hero-aside-wrap min-w-0">
                <InsightArticleHeroIllustration slug={slug} />
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      <section className="section-shell">
        <div className="grid gap-12 lg:grid-cols-[1fr_0.36fr] lg:items-start">
          <FadeIn>
            <article className="min-w-0">
              <InsightArticleContent article={article} />
            </article>
          </FadeIn>

          <aside className="space-y-6 lg:sticky lg:top-28">
            <FadeIn delay={0.06}>
              <div className="overflow-hidden rounded-[1.2rem] border border-line">
                <div className="relative aspect-[16/10]">
                  <Image
                    src={article.image}
                    alt={article.imageAlt}
                    fill
                    sizes="(min-width: 1024px) 360px, 100vw"
                    className="object-cover"
                  />
                </div>
              </div>
            </FadeIn>

            {related.length > 0 && (
              <FadeIn delay={0.1}>
                <div className="rounded-[1.2rem] border border-line bg-panel p-5">
                  <p className="technical-label text-signal">Related reading</p>
                  <ul className="mt-4 space-y-4">
                    {related.map((item) => (
                      <li key={item.slug}>
                        <Link
                          href={`/insights/${item.slug}`}
                          className="group block"
                        >
                          <p className="font-mono text-[0.48rem] uppercase tracking-[0.1em] text-dim">
                            {item.category}
                          </p>
                          <p className="mt-1 font-display text-sm font-bold leading-snug text-cream group-hover:text-signal">
                            {item.title}
                          </p>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </FadeIn>
            )}

            <FadeIn delay={0.14}>
              <SignalAccentSurface variant="soft" className="rounded-[1.2rem] p-5">
                <p className="technical-label text-signal">Next step</p>
                <p className="mt-3 text-sm leading-6 text-fog">
                  Map one workflow. We will tell you honestly whether it deserves
                  a system.
                </p>
                <Link href="/apply" className="signal-button mt-5 w-full sm:w-auto">
                  Discuss your workflow <ArrowRight size={14} />
                </Link>
              </SignalAccentSurface>
            </FadeIn>
          </aside>
        </div>
      </section>
    </>
  );
}
