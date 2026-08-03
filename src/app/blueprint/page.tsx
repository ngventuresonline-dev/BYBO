import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
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
    "A fixed-scope 7–10 day BYBO engagement that maps workflows, ranks AI opportunities, and defines a credible 90-day implementation roadmap for your business.",
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
    text: "How the work actually moves—including exceptions, ownership, and hand-offs.",
  },
  {
    title: "Opportunity matrix",
    text: "Use cases ranked by business impact, feasibility, readiness, and risk.",
  },
  {
    title: "Financial case",
    text: "A transparent estimate of leakage, cost, potential value, and assumptions.",
  },
  {
    title: "System architecture",
    text: "The tools, data, models, controls, and integrations required.",
  },
  {
    title: "Risk and control plan",
    text: "What the system may do, what requires approval, and when it escalates.",
  },
  {
    title: "90-day roadmap",
    text: "A sequenced implementation plan with owners, milestones, and success measures.",
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
          <p className="body-large mt-8 max-w-2xl">
            The AI Opportunity Blueprint turns operational pain into a ranked,
            financially grounded implementation roadmap.
          </p>
        </FadeIn>
      </PageHero>

      <section id="deliverables" className="section-shell scroll-mt-24">
        <FadeIn>
          <div className="grid gap-8 lg:grid-cols-[0.55fr_1.45fr] lg:items-end">
            <div>
              <p className="eyebrow">What you receive</p>
              <h2 className="section-title mt-6">
                A decision document, not a sales deck.
              </h2>
              <p className="mt-5 max-w-md text-sm leading-7 text-fog">
                Six tangible outputs—each with workflow evidence, financial
                assumptions, and a clear recommendation on what to build first.
              </p>
            </div>
            <p className="font-mono text-[0.52rem] uppercase tracking-[0.12em] text-dim lg:text-right">
              Tap a deliverable to preview
            </p>
          </div>
        </FadeIn>

        <FadeIn delay={0.06}>
          <div className="mt-12">
            <BlueprintDeliverablesExplorer deliverables={deliverables} />
          </div>
        </FadeIn>
      </section>

      <section className="border-y border-line bg-panel">
        <div className="section-shell">
          <FadeIn>
            <div className="grid gap-12 lg:grid-cols-[0.55fr_0.45fr] lg:items-start">
              <div>
                <p className="eyebrow">The working sessions</p>
                <h2 className="section-title mt-6">What happens during the Blueprint.</h2>
                <div className="mt-10 divide-y divide-line border-y border-line">
                  {[
                    [
                      "Leadership context",
                      "Business goals, economics, constraints, and the decisions the system must support.",
                    ],
                    [
                      "Workflow observation",
                      "The actual process, edge cases, failure points, and human judgment involved.",
                    ],
                    [
                      "Tools and data review",
                      "Available systems, access, quality, ownership, integration limits, and vendor risk.",
                    ],
                    [
                      "Opportunity scoring",
                      "Impact, frequency, feasibility, readiness, risk, and time-to-value.",
                    ],
                    [
                      "Executive recommendation",
                      "What to build first, what to defer, and what should remain a human process.",
                    ],
                  ].map(([title, text], index) => (
                    <FadeIn key={title} delay={index * 0.04}>
                      <div className="grid gap-3 py-6 sm:grid-cols-[3rem_0.65fr_1.35fr]">
                        <span className="font-mono text-xs text-signal">0{index + 1}</span>
                        <p className="font-display text-lg font-bold">{title}</p>
                        <p className="text-sm leading-6 text-fog">{text}</p>
                      </div>
                    </FadeIn>
                  ))}
                </div>
              </div>
              <div className="lg:sticky lg:top-28">
                <BlueprintProcessVisual />
                <div className="relative mt-4 min-h-[14rem] overflow-hidden rounded-xl border border-line">
                  <Image
                    src="/images/bybo-industry-operations.png"
                    alt="Operations team reviewing workflow maps"
                    fill
                    sizes="(min-width: 1024px) 40vw, 100vw"
                    className="object-cover opacity-70"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                  <p className="absolute bottom-4 left-4 max-w-[20ch] font-mono text-[0.52rem] uppercase tracking-[0.1em] text-white/70">
                    Working sessions with your process owners
                  </p>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      <section className="section-shell">
        <FadeIn>
          <div className="grid overflow-hidden border border-line lg:grid-cols-2">
            <div className="relative min-h-[14rem] lg:min-h-0">
              <Image
                src="/images/bybo-industry-consumer.png"
                alt=""
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover opacity-35"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-void via-void/90 to-transparent lg:from-void/80" />
            </div>
            <div className="grid lg:grid-cols-2">
              <div className="border-b border-line p-7 sm:p-10 lg:border-b-0 lg:border-r">
                <p className="technical-label text-success">Good fit</p>
                <ul className="mt-7 space-y-4 text-sm leading-6 text-fog">
                  <li>— A repeated workflow with meaningful volume</li>
                  <li>— A process owner who can participate</li>
                  <li>— Access to representative data and cases</li>
                  <li>— A measurable reason to improve</li>
                </ul>
              </div>
              <div className="p-7 sm:p-10">
                <p className="technical-label text-signal">Not yet</p>
                <ul className="mt-7 space-y-4 text-sm leading-6 text-fog">
                  <li>— AI primarily for publicity</li>
                  <li>— No accountable owner or baseline</li>
                  <li>— A low-frequency problem with weak economics</li>
                  <li>— Expectation of unsupervised, perfect automation</li>
                </ul>
              </div>
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
                className="inline-flex min-h-14 shrink-0 items-center justify-center gap-2 bg-void px-6 font-mono text-[0.68rem] font-bold uppercase tracking-[0.12em] text-cream"
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
