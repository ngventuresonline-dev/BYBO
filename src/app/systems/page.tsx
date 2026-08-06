import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { FadeIn } from "@/components/FadeIn";
import { PageHero } from "@/components/PageHero";
import { PageHeroIllustration } from "@/components/page-visuals/HeroIllustrations";
import { OpportunityFinder } from "@/components/OpportunityFinder";
import { WorkflowExplorer } from "@/components/WorkflowExplorer";
import { PageClosingCta } from "@/components/shared/PageClosingCta";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "AI Systems",
  description:
    "Explore BYBO's seven enterprise AI systems: custom platforms, agentic operations, knowledge, intelligence, and governed infrastructure.",
  path: "/systems",
  keywords: [
    "enterprise AI systems",
    "custom AI platforms",
    "agentic operations",
    "enterprise knowledge systems",
    "decision intelligence AI",
  ],
});

export default function SystemsPage() {
  return (
    <>
      <PageHero visual={<PageHeroIllustration page="systems" />}>
        <FadeIn immediate>
          <p className="eyebrow">AI systems</p>
          <h1 className="display-title mt-7">What BYBO builds.</h1>
          <p className="body-large mt-8 max-w-xl">
            Seven capabilities. Tap one. See how it works.
          </p>
        </FadeIn>
      </PageHero>

      <section className="section-shell !pt-8">
        <FadeIn>
          <WorkflowExplorer />
        </FadeIn>
      </section>

      <section className="border-y border-line bg-panel">
        <div className="section-shell !py-12">
          <FadeIn>
            <Link
              href="/industries"
              className="group flex flex-col justify-between gap-5 rounded-2xl border border-line bg-void p-6 transition-colors hover:border-signal/35 sm:flex-row sm:items-center sm:p-8"
            >
              <div>
                <p className="eyebrow">Industry context</p>
                <h2 className="mt-3 font-display text-2xl font-bold tracking-[-0.04em]">
                  See how systems change by sector.
                </h2>
              </div>
              <span className="inline-flex items-center gap-2 font-mono text-[0.62rem] font-semibold uppercase tracking-[0.12em] text-signal group-hover:text-cream">
                View industries <ArrowUpRight size={14} />
              </span>
            </Link>
          </FadeIn>
        </div>
      </section>

      <section className="section-shell">
        <FadeIn>
          <div className="mb-8 max-w-xl">
            <p className="eyebrow">Not sure where to start?</p>
            <h2 className="section-title mt-5">Tell us the workflow.</h2>
          </div>
        </FadeIn>
        <OpportunityFinder />
      </section>

      <PageClosingCta
        label="Before you build"
        title="Validate the opportunity with a Blueprint first."
        href="/blueprint"
        button="Explore the Blueprint"
      />
    </>
  );
}
