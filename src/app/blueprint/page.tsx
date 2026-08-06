import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { BlueprintDeliverablesExplorer } from "@/components/BlueprintDeliverablesExplorer";
import { FadeIn } from "@/components/FadeIn";
import { PageHero } from "@/components/PageHero";
import { PageHeroIllustration } from "@/components/page-visuals/HeroIllustrations";
import { BlueprintProcessVisual } from "@/components/page-visuals/BlueprintVisuals";
import { SignalAccentSurface } from "@/components/SignalAccentSurface";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "AI Opportunity Blueprint",
  description:
    "A 7–10 day BYBO engagement that maps workflows, ranks AI opportunities, and defines a 90-day implementation roadmap.",
  path: "/blueprint",
  keywords: [
    "AI opportunity assessment",
    "AI roadmap",
    "enterprise AI blueprint",
    "AI discovery engagement",
  ],
});

const deliverables = [
  {
    title: "Current-state workflow map",
    text: "How work moves, including exceptions and hand-offs.",
  },
  {
    title: "Opportunity matrix",
    text: "Use cases ranked by impact, feasibility, and risk.",
  },
  {
    title: "Financial case",
    text: "Leakage, cost, value, and assumptions in plain numbers.",
  },
  {
    title: "System architecture",
    text: "Tools, data, models, controls, and integrations.",
  },
  {
    title: "Risk and control plan",
    text: "What auto-runs, what needs approval, when it escalates.",
  },
  {
    title: "90-day roadmap",
    text: "Owners, milestones, and success measures.",
  },
];

export default function BlueprintPage() {
  return (
    <>
      <PageHero visual={<PageHeroIllustration page="blueprint" />}>
        <FadeIn immediate>
          <p className="eyebrow">7–10 days</p>
          <h1 className="display-title mt-7">
            Know where AI pays before you build.
          </h1>
          <p className="body-large mt-8 max-w-xl">
            A ranked roadmap with numbers. Not a sales deck.
          </p>
        </FadeIn>
      </PageHero>

      <section id="deliverables" className="section-shell scroll-mt-24 !pt-8">
        <FadeIn>
          <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div className="max-w-md">
              <p className="eyebrow">What you receive</p>
              <h2 className="section-title mt-5">Six outputs. Tap to preview.</h2>
            </div>
            <p className="font-mono text-[0.52rem] uppercase tracking-[0.12em] text-dim">
              Interactive preview
            </p>
          </div>
        </FadeIn>
        <FadeIn delay={0.06}>
          <BlueprintDeliverablesExplorer deliverables={deliverables} />
        </FadeIn>
      </section>

      <section className="border-y border-line bg-panel">
        <div className="section-shell !py-12">
          <FadeIn>
            <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
              <div>
                <p className="eyebrow">How it runs</p>
                <h2 className="section-title mt-5">Five working sessions. One decision.</h2>
                <p className="mt-4 text-sm leading-6 text-fog">
                  Leadership context → workflow observation → data review → scoring → recommendation.
                </p>
              </div>
              <BlueprintProcessVisual />
            </div>
          </FadeIn>
        </div>
      </section>

      <section className="section-shell !py-12">
        <FadeIn>
          <div className="grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2">
            <div className="bg-void p-6 sm:p-8">
              <p className="technical-label text-success">Good fit</p>
              <ul className="mt-5 space-y-3 text-sm leading-6 text-fog">
                <li>Repeated workflow with volume</li>
                <li>Process owner available</li>
                <li>Representative data access</li>
                <li>Measurable cost of delay</li>
              </ul>
            </div>
            <div className="bg-void p-6 sm:p-8">
              <p className="technical-label text-signal">Not yet</p>
              <ul className="mt-5 space-y-3 text-sm leading-6 text-fog">
                <li>AI for publicity only</li>
                <li>No owner or baseline</li>
                <li>Rare problem, weak economics</li>
                <li>Expectation of perfect automation</li>
              </ul>
            </div>
          </div>
        </FadeIn>
      </section>

      <section className="border-t border-line">
        <div className="page-shell py-12">
          <SignalAccentSurface variant="band" className="p-8 sm:p-12">
            <p className="technical-label signal-surface-subtle">Start with clarity</p>
            <div className="mt-4 flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
              <h2 className="cta-title max-w-3xl">
                Bring us one workflow that deserves a serious look.
              </h2>
              <Link
                href="/apply?interest=blueprint"
                className="signal-button signal-button--inverse shrink-0"
              >
                Apply now <ArrowRight size={15} />
              </Link>
            </div>
          </SignalAccentSurface>
        </div>
      </section>
    </>
  );
}
