import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Clock3 } from "lucide-react";
import { PageClosingCta } from "@/components/shared/PageClosingCta";
import { FadeIn } from "@/components/FadeIn";
import { PageHero } from "@/components/PageHero";
import { PageHeroIllustration } from "@/components/page-visuals/HeroIllustrations";
import { insightArticles } from "@/lib/insight-articles";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Insights",
  description:
    "Practical frameworks and field notes on deploying dependable enterprise AI - implementation, governance, opportunity prioritisation, and human-in-the-loop design.",
  path: "/insights",
  keywords: [
    "enterprise AI insights",
    "AI implementation India",
    "AI governance",
    "human in the loop",
    "AI opportunity framework",
  ],
});

export default function InsightsPage() {
  const published = insightArticles.filter((article) => article.published);

  return (
    <>
      <PageHero visual={<PageHeroIllustration page="insights" />}>
        <FadeIn immediate>
          <p className="eyebrow">Insights</p>
          <h1 className="display-title mt-7">
            Less AI theatre. More operating reality.
          </h1>
          <p className="body-large mt-8 max-w-xl">
            Short reads on what actually works in production.
          </p>
        </FadeIn>
      </PageHero>

      <section className="section-shell !pt-8">
        <div className="grid gap-6 lg:grid-cols-3">
          {published.map((article, index) => (
            <FadeIn key={article.slug} delay={index * 0.05}>
              <Link
                href={`/insights/${article.slug}`}
                className="group technical-card flex h-full flex-col overflow-hidden transition-colors hover:border-signal/35"
              >
                <div className="relative min-h-[11rem] overflow-hidden">
                  <Image
                    src={article.image}
                    alt={article.imageAlt}
                    fill
                    sizes="(min-width: 1024px) 33vw, 100vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />
                  <span className="absolute left-4 top-4 rounded-full border border-white/15 bg-black/45 px-2.5 py-1 font-mono text-[0.52rem] uppercase tracking-[0.12em] text-signal">
                    {article.category}
                  </span>
                </div>
                <div className="flex flex-1 flex-col p-6 sm:p-7">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[0.52rem] uppercase tracking-[0.1em] text-dim">
                      {article.publishedAt &&
                        new Date(article.publishedAt).toLocaleDateString("en-IN", {
                          month: "short",
                          year: "numeric",
                        })}
                    </span>
                    <span className="inline-flex items-center gap-1.5 font-mono text-[0.6rem] uppercase tracking-[0.1em] text-dim">
                      <Clock3 size={12} /> {article.readTime}
                    </span>
                  </div>
                  <h2 className="mt-5 font-display text-xl font-extrabold leading-tight tracking-[-0.04em] sm:text-2xl">
                    {article.title}
                  </h2>
                  <p className="mt-3 flex-1 text-sm leading-6 text-fog">
                    {article.excerpt}
                  </p>
                  <span className="mt-6 inline-flex items-center gap-2 font-mono text-[0.62rem] font-semibold uppercase tracking-[0.12em] text-signal group-hover:text-cream">
                    Read article <ArrowRight size={13} />
                  </span>
                </div>
              </Link>
            </FadeIn>
          ))}
        </div>
      </section>

      <PageClosingCta
        title="Bring us the operating problem."
        href="/apply"
        button="Start a conversation"
      />
    </>
  );
}
