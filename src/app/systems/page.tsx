import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { FadeIn } from "@/components/FadeIn";
import { PageHero } from "@/components/PageHero";
import { PageHeroIllustration } from "@/components/page-visuals/HeroIllustrations";
import { OpportunityFinder } from "@/components/OpportunityFinder";
import { SystemsCapabilityGrid } from "@/components/SystemsCapabilityGrid";
import { WorkflowExplorer } from "@/components/WorkflowExplorer";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "AI Systems",
  description:
    "Explore BYBO's seven enterprise AI systems: custom platforms, agentic operations, knowledge systems, decision intelligence, document AI, workforce AI, and governed infrastructure.",
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
          <h1 className="display-title mt-7">
            What BYBO builds.
          </h1>
          <p className="body-large mt-8 max-w-2xl">
            Seven coordinated capabilities - not a fixed software package.
            We design and deliver the systems your operating problem
            actually needs.
          </p>
          <p className="mt-4 max-w-lg text-sm leading-6 text-dim">
            Explore each system below, open the full implementation brief,
            or use the finder if you are not sure where to start.
          </p>
        </FadeIn>
      </PageHero>

      <section className="section-shell !pt-10">
        <FadeIn>
          <div className="mb-10 max-w-2xl">
            <p className="eyebrow">Explore the catalogue</p>
            <h2 className="section-title mt-5">
              Custom platforms, agentic ops, knowledge, intelligence, and
              governance.
            </h2>
          </div>
        </FadeIn>
        <FadeIn delay={0.06}>
          <WorkflowExplorer />
        </FadeIn>
      </section>

      <section className="border-y border-line bg-panel">
        <div className="section-shell">
          <FadeIn>
            <div className="mb-12 grid gap-8 lg:grid-cols-[0.7fr_1.3fr] lg:items-end">
              <div>
                <p className="eyebrow">All systems</p>
                <h2 className="section-title mt-6">
                  Open any capability brief.
                </h2>
              </div>
              <p className="body-large max-w-2xl">
                Each links to modules, workflows, controls, integrations, and
                an illustrative example of the operating change.
              </p>
            </div>
          </FadeIn>
          <FadeIn delay={0.08}>
            <SystemsCapabilityGrid />
          </FadeIn>
        </div>
      </section>

      <section className="border-b border-line bg-void">
        <div className="section-shell">
          <FadeIn>
            <Link
              href="/industries"
              className="group flex flex-col justify-between gap-6 rounded-[1.4rem] border border-line bg-panel p-7 transition-colors hover:border-signal/35 sm:p-9 lg:flex-row lg:items-center"
            >
              <div>
                <p className="eyebrow">Industry context</p>
                <h2 className="mt-4 max-w-xl font-display text-2xl font-bold tracking-[-0.04em] sm:text-3xl">
                  See how these systems apply in your sector.
                </h2>
                <p className="mt-3 max-w-lg text-sm leading-6 text-fog">
                  Real estate, healthcare, F&B, retail, manufacturing, finance,
                  and large-scale enterprise - each with its own workflows and
                  provisions.
                </p>
              </div>
              <span className="inline-flex min-h-11 shrink-0 items-center gap-2 font-mono text-[0.62rem] font-semibold uppercase tracking-[0.12em] text-signal group-hover:text-cream">
                View industries <ArrowUpRight size={14} />
              </span>
            </Link>
          </FadeIn>
        </div>
      </section>

      <section className="section-shell">
        <FadeIn>
          <div className="mb-12 max-w-3xl">
            <p className="eyebrow">Not sure where to start?</p>
            <h2 className="section-title mt-6">
              Tell us the workflow. We&apos;ll point to the right system.
            </h2>
            <p className="body-large mt-6 max-w-2xl">
              Use the finder to identify a sensible starting point - then open
              the system brief that matches your context.
            </p>
          </div>
        </FadeIn>
        <OpportunityFinder />
      </section>

      <section className="section-shell !py-16">
        <div className="flex flex-col justify-between gap-8 rounded-[1.6rem] border border-line bg-panel p-7 sm:p-10 lg:flex-row lg:items-center">
          <div>
            <p className="technical-label text-signal">Before implementation</p>
            <p className="mt-3 max-w-2xl font-display text-2xl font-extrabold tracking-[-0.04em]">
              Start with a Blueprint if the opportunity needs validation before
              platform investment.
            </p>
          </div>
          <Link href="/apply" className="signal-button shrink-0">
            Discuss your business <ArrowRight size={15} />
          </Link>
        </div>
      </section>
    </>
  );
}
