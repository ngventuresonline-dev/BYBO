import type { Metadata } from "next";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Check,
  Database,
  LockKeyhole,
  MoveRight,
  Plug,
} from "lucide-react";
import { FadeIn } from "@/components/FadeIn";
import { CapabilityModulesSection } from "@/components/CapabilityModulesSection";
import { SystemHeroIllustration } from "@/components/page-visuals/HeroIllustrations";
import { SignalAccentSurface } from "@/components/SignalAccentSurface";
import { systems } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";

type Props = {
  params: Promise<{ slug: string }>;
};

const legacySystemRoutes: Record<string, string> = {
  revenue: "custom-ai-platforms",
  "customer-experience": "customer-workforce-ai",
  "brand-intelligence": "enterprise-knowledge-systems",
  "business-operations": "agentic-operations",
};

export function generateStaticParams() {
  return [
    ...systems.map((system) => ({ slug: system.slug })),
    ...Object.keys(legacySystemRoutes).map((slug) => ({ slug })),
  ];
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const resolvedSlug = legacySystemRoutes[slug] ?? slug;
  const system = systems.find((item) => item.slug === resolvedSlug);
  if (!system) return {};
  return pageMetadata({
    title: system.name,
    description: `${system.short} ${system.description}`.slice(0, 160),
    path: `/systems/${system.slug}`,
    keywords: [
      system.name,
      "enterprise AI system",
      "BYBO",
      ...system.capabilities.slice(0, 3),
    ],
  });
}

export default async function SystemDetailPage({ params }: Props) {
  const { slug } = await params;
  if (legacySystemRoutes[slug]) {
    redirect(`/systems/${legacySystemRoutes[slug]}`);
  }
  const system = systems.find((item) => item.slug === slug);
  if (!system) notFound();

  const Icon = system.icon;
  const systemIndex = systems.findIndex((item) => item.slug === system.slug);
  const nextSystem = systems[(systemIndex + 1) % systems.length];
  const implementationStages = [
    {
      number: "01",
      title: "Map the operating reality",
      text: "Document the trigger, volume, people, tools, decisions, exceptions, baseline, and cost of the current workflow.",
    },
    {
      number: "02",
      title: "Design the controlled system",
      text: "Define data access, knowledge, rules, model responsibilities, human approvals, failure states, and the measurable target.",
    },
    {
      number: "03",
      title: "Deploy with representative work",
      text: "Connect the real environment, test normal and difficult cases, train owners, and release through a controlled production rollout.",
    },
    {
      number: "04",
      title: "Operate and improve",
      text: "Monitor quality, exceptions, adoption, cost, and outcomes; then improve the system from operating evidence.",
    },
  ];

  return (
    <>
      <section className="page-hero relative overflow-hidden">
        <div className="section-shell relative">
          <FadeIn immediate>
            <Link
              href="/systems"
              className="inline-flex min-h-11 items-center gap-2 font-mono text-[0.66rem] uppercase tracking-[0.12em] text-dim hover:text-cream"
            >
              <ArrowLeft size={14} /> All systems
            </Link>
            <div className="page-hero-grid mt-8">
              <div className="page-hero-copy min-w-0">
                <div className="flex items-center gap-4">
                  <span className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.035] text-signal">
                    <Icon size={21} />
                  </span>
                  <span className="technical-label text-signal">
                    System / {system.index}
                  </span>
                </div>
                <h1 className="display-title mt-7">{system.name}</h1>
                <p className="font-display mt-6 text-2xl font-bold leading-tight tracking-[-0.04em] text-cream sm:text-3xl">
                  {system.promise}
                </p>
                <p className="body-large mt-5 max-w-2xl">{system.description}</p>
              </div>
              <div className="page-hero-aside-wrap min-w-0">
                <SystemHeroIllustration slug={system.slug} />
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      <section className="border-b border-line bg-panel">
        <div className="section-shell grid gap-12 lg:grid-cols-[0.72fr_1.28fr]">
          <FadeIn>
            <div>
              <p className="eyebrow">Where this earns its place</p>
              <h2 className="section-title mt-6">
                A system for repeated, valuable work.
              </h2>
              <p className="body-large mt-6 max-w-lg">
                This is usually the right direction when volume, delay,
                inconsistency, or missing context creates a measurable business
                cost.
              </p>
            </div>
          </FadeIn>

          <div className="grid gap-3 sm:grid-cols-2">
            <FadeIn delay={0.05}>
              <div className="h-full rounded-2xl border border-line bg-void p-6 sm:p-7">
                <p className="technical-label text-signal">Good fit</p>
                <ul className="mt-6 space-y-4">
                  {system.bestFor.map((item) => (
                    <li key={item} className="flex items-start gap-3 text-sm leading-6 text-fog">
                      <Check size={14} className="mt-1 shrink-0 text-signal" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </FadeIn>
            <FadeIn delay={0.1}>
              <div className="h-full rounded-2xl border border-line bg-void p-6 sm:p-7">
                <p className="technical-label text-signal">Signals to investigate</p>
                <ul className="mt-6 space-y-4">
                  {system.pains.map((pain) => (
                  <li
                    key={pain}
                      className="border-l border-signal py-0.5 pl-4 text-sm leading-6 text-fog"
                  >
                    {pain}
                  </li>
                ))}
              </ul>
            </div>
            </FadeIn>
          </div>
        </div>
      </section>

      <section id="capabilities" className="bg-surface text-surface-ink">
        <div className="section-shell">
          <FadeIn>
            <div className="grid gap-8 lg:grid-cols-[0.7fr_1.3fr] lg:items-end">
              <div>
                <p className="eyebrow">What BYBO can build</p>
                <h2 className="section-title mt-6">
                  One system. Several coordinated capabilities.
                </h2>
              </div>
              <p className="max-w-2xl text-lg leading-8 text-surface-muted">
                These are configurable modules - not a fixed software package. We
                select and connect only what the operating problem requires.
              </p>
            </div>
          </FadeIn>

          <CapabilityModulesSection modules={system.modules} />
        </div>
      </section>

      <section className="border-y border-line bg-panel">
        <div className="section-shell">
          <FadeIn>
            <p className="eyebrow">The operating flow</p>
            <h2 className="section-title mt-6">
              From business signal to accountable action.
            </h2>
          </FadeIn>
          <div className="mt-12 grid gap-3 lg:grid-cols-4">
            {system.workflow.map((step, index) => (
              <FadeIn key={step.label} delay={index * 0.06}>
                <div className="relative h-full rounded-2xl border border-line bg-void p-6">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs text-signal">
                      /0{index + 1}
                    </span>
                    {index < system.workflow.length - 1 && (
                      <MoveRight size={16} className="hidden text-dim lg:block" />
                    )}
                  </div>
                  <h3 className="mt-9 font-display text-xl font-bold tracking-[-0.035em]">
                    {step.label}
                  </h3>
                  <p className="mt-3 text-sm leading-6 text-fog">
                    {step.description}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <section className="section-shell">
        <div className="grid gap-4 lg:grid-cols-2">
          <FadeIn>
            <div className="h-full rounded-[1.7rem] border border-line bg-panel p-7 sm:p-9">
              <LockKeyhole size={20} className="text-signal" />
              <p className="eyebrow mt-7">Control by design</p>
              <h2 className="mt-5 font-display text-3xl font-bold tracking-[-0.045em]">
                What stays governed.
              </h2>
              <ul className="mt-8 space-y-4">
                {system.controls.map((control) => (
                  <li key={control} className="flex items-start gap-3 text-sm leading-6 text-fog">
                    <Check size={14} className="mt-1 shrink-0 text-signal" />
                    {control}
                  </li>
                ))}
              </ul>
            </div>
          </FadeIn>
          <FadeIn delay={0.06}>
            <div className="h-full rounded-[1.7rem] border border-line bg-panel p-7 sm:p-9">
              <Plug size={20} className="text-signal" />
              <p className="eyebrow mt-7">Built into your environment</p>
              <h2 className="mt-5 font-display text-3xl font-bold tracking-[-0.045em]">
                What it can connect.
              </h2>
              <p className="mt-4 text-sm leading-6 text-fog">
                The exact connection depends on available APIs, permissions,
                security requirements, and the workflow we agree to operate.
              </p>
              <div className="mt-8 flex flex-wrap gap-2">
                {system.integrations.map((integration) => (
                  <span
                    key={integration}
                    className="rounded-full border border-line bg-void px-4 py-2 font-mono text-[0.58rem] uppercase tracking-[0.1em] text-fog"
                  >
                    {integration}
                  </span>
                ))}
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      <section className="border-y border-surface-line bg-surface text-surface-ink">
        <div className="section-shell">
          <FadeIn>
            <div className="grid gap-10 lg:grid-cols-[0.72fr_1.28fr]">
              <div>
                <Database size={20} className="text-signal" />
                <p className="eyebrow mt-7">Measurement</p>
                <h2 className="section-title mt-6">
                  Define success before deployment.
                </h2>
                <p className="mt-5 max-w-lg text-sm leading-7 text-surface-muted">
                  We agree a baseline and the few measures that prove whether
                  the system is improving the workflow - not merely producing
                  activity.
                </p>
              </div>
              <div className="grid gap-px overflow-hidden rounded-2xl border border-surface-line bg-surface-line sm:grid-cols-2">
                {system.metrics.map((metric, index) => (
                  <div key={metric} className="flex min-h-24 items-center gap-4 bg-surface p-5">
                    <span className="font-mono text-[0.58rem] text-signal">
                      0{index + 1}
                    </span>
                    <span className="font-display text-base font-bold tracking-[-0.025em]">
                      {metric}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      <section className="section-shell">
        <FadeIn>
          <p className="eyebrow">How we deliver it</p>
          <h2 className="section-title mt-6">
            From opportunity to operated system.
          </h2>
        </FadeIn>
        <div className="mt-12 grid gap-3 lg:grid-cols-4">
          {implementationStages.map((stage, index) => (
            <FadeIn key={stage.number} delay={index * 0.05}>
              <div className="h-full rounded-2xl border border-line p-6">
                <span className="font-mono text-xs text-signal">/{stage.number}</span>
                <h3 className="mt-8 font-display text-xl font-bold tracking-[-0.035em]">
                  {stage.title}
                </h3>
                <p className="mt-3 text-sm leading-6 text-fog">{stage.text}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      <section className="border-y border-line bg-panel">
        <div className="section-shell">
          <FadeIn>
            <p className="eyebrow">Illustrative workflow</p>
            <h2 className="section-title mt-6">
              One example of the operating change.
            </h2>
            <p className="mt-5 max-w-2xl text-sm leading-6 text-dim">
              This explains the pattern. It is not a client result or guaranteed
              performance claim.
            </p>
          </FadeIn>
          <div className="mt-12 grid gap-3 lg:grid-cols-[1fr_auto_1fr_auto_1fr] lg:items-stretch">
            {[
              { label: "Before", text: system.example.before },
              { label: "System", text: system.example.system },
              { label: "After", text: system.example.after },
            ].map((step, index) => (
              <div key={step.label} className="contents">
                <FadeIn delay={index * 0.07}>
                  {index === 1 ? (
                    <SignalAccentSurface
                      variant="card"
                      className="h-full rounded-2xl p-6"
                    >
                      <p className="technical-label signal-surface-subtle">
                        {step.label}
                      </p>
                      <p className="mt-5 text-base leading-7 text-signal-ink">
                        {step.text}
                      </p>
                    </SignalAccentSurface>
                  ) : (
                    <div className="h-full rounded-2xl border border-line bg-void p-6">
                      <p className="technical-label text-dim">{step.label}</p>
                      <p className="mt-5 text-base leading-7 text-fog">
                        {step.text}
                      </p>
                    </div>
                  )}
                </FadeIn>
                {index < 2 && (
                  <div className="hidden items-center justify-center text-signal lg:flex">
                    <MoveRight size={20} />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-shell !py-16">
        <div className="grid gap-8 rounded-[1.7rem] border border-line bg-panel p-7 sm:p-10 lg:grid-cols-[1fr_auto] lg:items-center">
          <div>
            <p className="technical-label text-signal">Investigate this opportunity</p>
            <h2 className="mt-3 max-w-2xl font-display text-3xl font-bold tracking-[-0.045em]">
              Show us the workflow. We&apos;ll help determine what deserves to be built.
            </h2>
          </div>
          <Link href={`/apply?system=${system.slug}`} className="signal-button">
            Discuss {system.name} <ArrowRight size={15} />
          </Link>
        </div>
        <Link
          href={`/systems/${nextSystem.slug}`}
          className="group mt-4 flex min-h-24 items-center justify-between rounded-2xl border border-line px-6 transition-colors hover:bg-panel"
        >
          <span>
            <span className="technical-label text-dim">Next system</span>
            <span className="mt-2 block font-display text-xl font-bold tracking-[-0.035em]">
              {nextSystem.name}
            </span>
          </span>
          <ArrowRight className="text-signal transition-transform group-hover:translate-x-1" />
        </Link>
      </section>
    </>
  );
}
