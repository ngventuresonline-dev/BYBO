import Link from "next/link";
import type { Metadata } from "next";
import { ArrowRight, ArrowUpRight, Check } from "lucide-react";
import { ConnectedToolsRail } from "@/components/ConnectedToolsRail";
import { IndustryStage } from "@/components/IndustryStage";
import { InteractiveSystemDemo } from "@/components/InteractiveSystemDemo";
import { OpportunityFinder } from "@/components/OpportunityFinder";
import { SpatialHeroVisual } from "@/components/SpatialHeroVisual";
import { WorkflowExplorer } from "@/components/WorkflowExplorer";
import { HomeMetricsBand } from "@/components/HomeMetricsBand";
import { HomeValuePillars } from "@/components/HomeValuePillars";
import { HomeExploreStrip } from "@/components/HomeExploreStrip";
import { HomeFinalCta } from "@/components/HomeFinalCta";
import { FadeIn } from "@/components/FadeIn";
import { pageMetadata, SITE } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: SITE.defaultTitle,
  description: SITE.defaultDescription,
  path: "/",
  keywords: [
    "enterprise AI systems India",
    "custom AI platforms",
    "agentic AI operations",
    "enterprise knowledge systems",
    "AI systems partner",
    "BYBO",
  ],
});

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="hero-stage relative min-h-0 overflow-x-clip border-b border-line-soft pt-[4.25rem] sm:pt-[4.75rem] lg:min-h-svh">
        <div className="pointer-events-none absolute inset-0">
          <div className="hero-stage__glow hero-stage__glow--a" />
          <div className="hero-stage__glow hero-stage__glow--b" />
          <div className="hero-stage__vignette" />
        </div>

        <div className="page-shell relative z-10 grid min-w-0 items-center gap-8 py-8 sm:gap-10 sm:py-14 lg:min-h-[calc(100svh-4.75rem)] lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)] lg:gap-12 lg:py-16">
          <FadeIn immediate>
            <div className="hero-copy min-w-0">
              <h1 className="hero-headline">
                <span className="hero-headline__line text-cream">AI systems,</span>
                <span className="hero-headline__line text-cream">built around</span>
                <span className="hero-headline__line hero-headline__accent">
                  your business.
                </span>
              </h1>

              <p className="hero-lede mt-5 max-w-md text-pretty text-[0.98rem] leading-7 text-fog sm:mt-7 sm:text-[1.05rem] sm:leading-8">
                Reduce costs. Move faster. Make better decisions with AI built
                for your business.
              </p>

              <div className="hero-actions mt-7 sm:mt-9">
                <Link href="/apply" className="signal-button w-full sm:w-auto">
                  Discuss a platform or system
                  <ArrowRight size={15} />
                </Link>
                <Link href="/how-we-work" className="ghost-button w-full sm:w-auto">
                  See how BYBO works
                  <ArrowRight size={14} />
                </Link>
              </div>

              <ul className="hero-proof mt-8 list-none p-0 sm:mt-10">
                {[
                  "Built around real workflows",
                  "Human approval by design",
                  "Measured against a baseline",
                ].map((item) => (
                  <li key={item} className="hero-proof__item">
                    <span className="hero-proof-check" aria-hidden="true">
                      <Check size={11} strokeWidth={2.5} />
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </FadeIn>

          <FadeIn immediate delay={0.1} direction="left">
            <div className="hero-visual">
              <div className="hero-visual__glow" aria-hidden="true" />
              <div className="hero-visual__frame">
                <SpatialHeroVisual />
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      <HomeMetricsBand />

      {/* Interactive: system demo */}
      <section className="workflow-lab-section relative overflow-hidden border-b border-line bg-void">
        <div className="pointer-events-none absolute left-[18%] top-[20%] h-[22rem] w-[22rem] rounded-full bg-signal/[0.07] blur-[110px]" />
        <div className="pointer-events-none absolute right-[8%] bottom-[10%] h-[18rem] w-[18rem] rounded-full bg-signal/[0.05] blur-[100px]" />
        <div className="section-shell relative grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-center lg:gap-14">
          <FadeIn>
            <div className="max-w-md">
              <p className="eyebrow eyebrow--bar">See the system think</p>
              <h2 className="section-title mt-5">
                From signal to action.
                <span
                  className="ml-1.5 inline-block h-2.5 w-2.5 translate-y-[-0.2em] bg-signal align-middle"
                  aria-hidden="true"
                />
              </h2>
              <p className="mt-5 text-sm leading-6 text-fog sm:text-[0.95rem] sm:leading-7">
                Pick a business moment and watch context, rules, and human review
                work together. No black box.
              </p>
              <Link
                href="/systems"
                className="mt-7 inline-flex items-center gap-2 font-mono text-[0.62rem] font-semibold uppercase tracking-[0.14em] text-signal transition-colors hover:text-cream"
              >
                Explore all systems <ArrowUpRight size={13} />
              </Link>
            </div>
          </FadeIn>
          <FadeIn delay={0.08} direction="left">
            <InteractiveSystemDemo />
          </FadeIn>
        </div>
      </section>

      <HomeValuePillars />

      <section className="overflow-hidden border-b border-surface-line bg-surface text-surface-ink">
        <div className="page-shell grid gap-7 py-8 lg:grid-cols-[0.7fr_1.3fr] lg:items-center">
          <div>
            <p className="technical-label text-surface-muted">
              Designed to connect, not replace everything
            </p>
            <p className="mt-2 max-w-md text-sm leading-6 text-surface-muted">
              BYBO works around the channels, data, and systems already running
              your business.
            </p>
          </div>
          <ConnectedToolsRail />
        </div>
      </section>

      {/* Interactive: systems explorer */}
      <section className="border-b border-line bg-panel">
        <div className="section-shell">
          <FadeIn>
            <div className="mb-8 flex flex-col justify-between gap-5 lg:mb-10 lg:flex-row lg:items-end">
              <div className="max-w-xl">
                <p className="eyebrow">Enterprise AI capabilities</p>
                <h2 className="section-title mt-5">
                  Build what off-the-shelf software cannot.
                </h2>
              </div>
              <Link
                href="/systems"
                className="inline-flex min-h-11 w-fit items-center gap-2 font-mono text-[0.62rem] font-semibold uppercase tracking-[0.12em] text-signal hover:text-cream"
              >
                View full systems catalogue <ArrowUpRight size={13} />
              </Link>
            </div>
          </FadeIn>
          <FadeIn delay={0.06}>
            <WorkflowExplorer />
          </FadeIn>
        </div>
      </section>

      {/* Interactive: opportunity finder */}
      <section className="relative overflow-hidden border-b border-line bg-void">
        <div
          className="pointer-events-none absolute left-1/2 top-[18%] h-[22rem] w-[22rem] -translate-x-1/2 rounded-full bg-signal/[0.07] blur-[110px]"
          aria-hidden="true"
        />
        <div className="section-shell relative">
          <FadeIn>
            <div className="mb-8 max-w-2xl lg:mb-10">
              <p className="eyebrow">Find the first opportunity</p>
              <h2 className="section-title mt-5">Where does momentum break?</h2>
              <p className="mt-4 text-sm leading-6 text-fog">
                A quick qualifier, not a promise. Full Blueprint detail lives on{" "}
                <Link href="/blueprint" className="text-signal hover:text-cream">
                  the Blueprint page
                </Link>
                .
              </p>
            </div>
          </FadeIn>
          <FadeIn delay={0.06}>
            <OpportunityFinder />
          </FadeIn>
        </div>
      </section>

      {/* Interactive: industries preview */}
      <section className="bg-surface text-surface-ink">
        <div className="section-shell !pb-8 !pt-10 sm:!pb-10 sm:!pt-12 lg:!pb-14">
          <FadeIn>
            <div className="mb-8 flex flex-col justify-between gap-5 lg:mb-10 lg:flex-row lg:items-end">
              <div className="max-w-xl">
                <p className="eyebrow">Who BYBO is for</p>
                <h2 className="section-title mt-5 text-surface-ink">
                  Context changes the system.
                </h2>
                <p className="mt-4 text-sm leading-6 text-surface-muted">
                  Tap an industry to preview, or open the full industries page
                  for provisions, outcomes, and engagement models.
                </p>
              </div>
              <Link
                href="/industries"
                className="inline-flex min-h-11 w-fit items-center gap-2 font-mono text-[0.62rem] font-semibold uppercase tracking-[0.14em] text-surface-ink transition-colors hover:text-signal"
              >
                All industries <ArrowUpRight size={13} />
              </Link>
            </div>
          </FadeIn>
          <FadeIn delay={0.06}>
            <IndustryStage />
          </FadeIn>
        </div>
      </section>

      <HomeExploreStrip />

      <HomeFinalCta />
    </>
  );
}
