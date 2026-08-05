import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Check, X } from "lucide-react";
import { FadeIn } from "@/components/FadeIn";
import { PageHero } from "@/components/PageHero";
import { PageHeroIllustration } from "@/components/page-visuals/HeroIllustrations";
import {
  CommercialModelVisual,
  CommercialModelsOverviewVisual,
  ProductionReadinessVisual,
  StageOutcomeVisual,
} from "@/components/page-visuals/HowWeWorkVisuals";
import { PilotVsSystemVisual } from "@/components/page-visuals/InsightVisuals";
import { engagementStages } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "How We Work",
  description:
    "How BYBO diagnoses bottlenecks, designs AI systems, deploys with human approval and governance, and operates platforms with measurable accountability.",
  path: "/how-we-work",
  keywords: [
    "AI implementation process",
    "enterprise AI delivery",
    "AI systems partner India",
    "human in the loop AI",
  ],
});

const commercialModels = [
  {
    variant: "project" as const,
    label: "Fixed-scope project",
    title: "Solve one defined operating problem.",
    text: "A milestone-based engagement for a production system with agreed workflow, integrations, controls, acceptance criteria, and handover.",
    fit: "Best for a clear process, sponsor, and measurable outcome.",
  },
  {
    variant: "platform" as const,
    label: "Custom platform build",
    title: "Create software unique to the business.",
    text: "Product strategy, UX, AI engineering, data connections, application development, deployment, and adoption delivered as one platform programme.",
    fit: "Best for strategic capabilities that off-the-shelf tools cannot provide.",
  },
  {
    variant: "managed" as const,
    label: "Managed AI operations",
    title: "Keep the system useful after launch.",
    text: "A monthly retainer covering monitoring, evaluations, incident response, model and prompt improvement, cost control, and an operating roadmap.",
    fit: "Best for business-critical systems that must improve continuously.",
  },
  {
    variant: "pod" as const,
    label: "Dedicated AI pod",
    title: "Add a focused build team to your organisation.",
    text: "A retained cross-functional team working against an agreed portfolio with product, engineering, automation, data, and AI capability.",
    fit: "Best for enterprises with several initiatives and internal ownership.",
  },
];

const exitConditions = [
  "A ranked opportunity and an evidence-backed recommendation.",
  "A tested production workflow with ownership and controls.",
  "Stable performance, monitored failures, and a visible ROI review.",
  "A repeatable module that reduces future deployment time.",
];

export default function HowWeWorkPage() {
  return (
    <>
      <PageHero visual={<PageHeroIllustration page="howWeWork" />}>
        <FadeIn immediate>
          <p className="eyebrow">How we work</p>
          <h1 className="display-title mt-7">
            From operating problem to operating system.
          </h1>
          <p className="body-large mt-8 max-w-2xl">
            We do not begin with an AI feature. We begin with the work, its
            economics, its exceptions, and the people accountable for it.
          </p>
        </FadeIn>
      </PageHero>

      <section className="section-shell">
        <FadeIn>
          <p className="eyebrow">The four stages</p>
          <h2 className="section-title mt-6">Diagnose → Deploy → Operate → Productize.</h2>
          <p className="mt-5 max-w-2xl text-base leading-7 text-fog">
            Each stage has a clear exit condition. You always know what was decided,
            what was built, and who owns what happens next.
          </p>
        </FadeIn>

        <div className="mt-10 space-y-6">
          {engagementStages.map((stage, index) => (
            <FadeIn key={stage.index} delay={index * 0.05}>
              <div className="overflow-hidden rounded-[1.2rem] border border-line bg-panel">
                <div className="grid lg:grid-cols-[1fr_minmax(14rem,18rem)]">
                  <div className="p-6 sm:p-8">
                    <div className="flex items-start gap-4">
                      <span className="font-mono text-xs font-bold text-signal">
                        /{stage.index}
                      </span>
                      <div className="min-w-0 flex-1">
                        <p className="font-display text-2xl font-extrabold tracking-[-0.04em] sm:text-3xl">
                          {stage.name}
                        </p>
                        <p className="technical-label mt-2 text-dim">{stage.label}</p>
                        <p className="mt-5 font-display text-lg font-bold tracking-[-0.03em] text-cream">
                          {stage.title}
                        </p>
                        <p className="mt-3 text-sm leading-7 text-fog">
                          {stage.description}
                        </p>
                        <div className="mt-6 rounded-xl border border-line bg-void/50 p-4">
                          <p className="technical-label text-dim">Exit condition</p>
                          <p className="mt-2 text-sm leading-6 text-fog">
                            {exitConditions[index]}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="border-t border-line bg-void/40 p-4 lg:border-l lg:border-t-0 lg:p-5">
                    <StageOutcomeVisual stageIndex={index} />
                  </div>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      <section className="border-y border-line bg-panel">
        <div className="section-shell">
          <FadeIn>
            <div className="grid gap-10 lg:grid-cols-2 lg:items-start">
              <div>
                <p className="eyebrow">Production standard</p>
                <h2 className="section-title mt-6">
                  What every deployment must include.
                </h2>
                <p className="mt-5 max-w-xl text-sm leading-7 text-fog">
                  These are non-negotiable. They are how we keep AI useful in real
                  operations - not just impressive in a demo.
                </p>
                <div className="relative mt-8 min-h-[14rem] overflow-hidden rounded-xl border border-line lg:hidden">
                  <Image
                    src="/images/bybo-industry-operations.png"
                    alt="Operations team reviewing a production workflow"
                    fill
                    sizes="100vw"
                    className="object-cover opacity-55"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-void via-void/30 to-transparent" />
                </div>
                <div className="mt-8 grid gap-3 sm:grid-cols-2">
                  {[
                    "A measurable baseline",
                    "Representative test cases",
                    "Named operating owner",
                    "Human approval rules",
                    "Escalation and failure handling",
                    "Data and vendor boundaries",
                    "Usage and cost visibility",
                    "Documentation and team training",
                  ].map((item) => (
                    <div
                      key={item}
                      className="flex items-start gap-3 border border-line bg-void p-4 text-sm text-fog"
                    >
                      <Check size={15} className="mt-0.5 shrink-0 text-success" />
                      {item}
                    </div>
                  ))}
                </div>
              </div>
              <div className="space-y-5">
                <ProductionReadinessVisual />
                <div className="relative min-h-[12rem] overflow-hidden rounded-xl border border-line">
                  <Image
                    src="/images/bybo-industry-operations.png"
                    alt="Operations team reviewing a production workflow"
                    fill
                    sizes="(min-width: 1024px) 45vw, 100vw"
                    className="object-cover opacity-50"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-void via-void/35 to-transparent" />
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      <section className="section-shell">
        <FadeIn>
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(16rem,22rem)] lg:items-start">
            <div>
              <p className="eyebrow">Commercial models</p>
              <h2 className="section-title mt-6">
                Engage us around the outcome.
              </h2>
              <p className="body-large mt-5 max-w-2xl">
                BYBO can deliver a defined project, build a complete AI platform,
                or remain accountable for the system after launch.
              </p>
            </div>
            <CommercialModelsOverviewVisual />
          </div>
        </FadeIn>

        <div className="mt-10 grid gap-4 lg:grid-cols-2">
          {commercialModels.map((model, index) => (
            <FadeIn key={model.label} delay={index * 0.05}>
              <article className="flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-panel">
                <div className="p-4 pb-0 sm:p-5 sm:pb-0">
                  <CommercialModelVisual variant={model.variant} />
                </div>
                <div className="flex flex-1 flex-col p-6 sm:p-8">
                  <div className="flex items-center justify-between">
                    <p className="technical-label text-signal">{model.label}</p>
                    <span className="font-mono text-[0.58rem] text-dim">
                      /0{index + 1}
                    </span>
                  </div>
                  <h3 className="mt-6 font-display text-xl font-bold tracking-[-0.04em] sm:text-2xl">
                    {model.title}
                  </h3>
                  <p className="mt-4 flex-1 text-sm leading-7 text-fog">{model.text}</p>
                  <p className="mt-6 border-t border-line pt-5 text-xs leading-6 text-dim">
                    {model.fit}
                  </p>
                </div>
              </article>
            </FadeIn>
          ))}
        </div>
      </section>

      <section className="border-y border-line bg-panel">
        <div className="section-shell">
          <FadeIn>
            <div className="grid gap-10 lg:grid-cols-2 lg:items-start">
              <div>
                <p className="eyebrow">What we do not promise</p>
                <h2 className="section-title mt-6">No theatre.</h2>
                <p className="mt-5 max-w-xl text-sm leading-7 text-fog">
                  Honest boundaries beat inflated claims. These are the myths we
                  refuse to sell - and what we build instead.
                </p>
                <div className="mt-8 divide-y divide-line border-y border-line">
                  {[
                    "A model will never make a mistake",
                    "Every workflow should be automated",
                    "A demo is the same as a production system",
                    "AI replaces the need for accountable people",
                  ].map((item) => (
                    <div key={item} className="flex items-center gap-4 py-5 text-fog">
                      <X size={16} className="shrink-0 text-signal" />
                      {item}
                    </div>
                  ))}
                </div>
              </div>
              <PilotVsSystemVisual />
            </div>
          </FadeIn>
        </div>
      </section>

      <section className="section-shell !py-16">
        <div className="grid gap-8 border border-line bg-panel p-7 sm:p-10 lg:grid-cols-[1fr_auto] lg:items-center">
          <div>
            <p className="technical-label text-signal">The first engagement</p>
            <p className="mt-3 font-display text-2xl font-extrabold tracking-[-0.045em] sm:text-3xl">
              Begin with the AI Opportunity Blueprint.
            </p>
          </div>
          <Link href="/blueprint" className="signal-button shrink-0">
            Explore the Blueprint <ArrowRight size={15} />
          </Link>
        </div>
      </section>
    </>
  );
}
