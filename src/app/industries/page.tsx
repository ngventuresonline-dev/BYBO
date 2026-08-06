import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { FadeIn } from "@/components/FadeIn";
import { IndustrySolutionsExplorer } from "@/components/IndustrySolutionsExplorer";
import { OpportunityFinder } from "@/components/OpportunityFinder";
import { PageHero } from "@/components/PageHero";
import { PageHeroIllustration } from "@/components/page-visuals/HeroIllustrations";
import { PageClosingCta } from "@/components/shared/PageClosingCta";
import { industrySolutions } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Industries",
  description:
    "Industry-specific AI systems for real estate, healthcare, manufacturing, retail, F&B, and enterprise - built around your workflows.",
  path: "/industries",
  keywords: [
    "AI for real estate",
    "AI for healthcare India",
    "manufacturing AI systems",
    "enterprise AI by industry",
  ],
});

export default function IndustriesPage() {
  return (
    <>
      <PageHero visual={<PageHeroIllustration page="industries" />}>
        <FadeIn immediate>
          <p className="eyebrow">Industries</p>
          <h1 className="display-title mt-7">
            Your industry changes the system.
          </h1>
          <p className="body-large mt-8 max-w-xl">
            Tap an environment. See the workflow, systems, and outcomes.
          </p>
          <p className="mt-4 font-mono text-[0.58rem] uppercase tracking-[0.12em] text-dim">
            {industrySolutions.length} environments mapped
          </p>
        </FadeIn>
      </PageHero>

      <section className="section-shell !pt-8">
        <FadeIn>
          <IndustrySolutionsExplorer />
        </FadeIn>
      </section>

      <section className="border-y border-line bg-panel">
        <div className="section-shell !py-12">
          <FadeIn>
            <Link
              href="/systems"
              className="group flex flex-col justify-between gap-5 rounded-2xl border border-line bg-void p-6 transition-colors hover:border-signal/35 sm:flex-row sm:items-center sm:p-8"
            >
              <div>
                <p className="eyebrow">The systems behind this</p>
                <h2 className="mt-3 font-display text-2xl font-bold tracking-[-0.04em]">
                  Every industry maps to a BYBO system.
                </h2>
              </div>
              <span className="inline-flex items-center gap-2 font-mono text-[0.62rem] font-semibold uppercase tracking-[0.12em] text-signal group-hover:text-cream">
                View all systems <ArrowUpRight size={14} />
              </span>
            </Link>
          </FadeIn>
        </div>
      </section>

      <section className="section-shell">
        <FadeIn>
          <div className="mb-8 max-w-xl">
            <p className="eyebrow">Qualify the workflow</p>
            <h2 className="section-title mt-5">Is your process a fit?</h2>
          </div>
        </FadeIn>
        <OpportunityFinder />
      </section>

      <PageClosingCta
        title="Industry not listed? Describe the workflow."
        href="/apply"
        button="Apply for consultation"
      />
    </>
  );
}
