import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  ArrowUpRight,
  Check,
  Database,
  Eye,
  ShieldCheck,
  UserCheck,
} from "lucide-react";
import { ConnectedToolsRail } from "@/components/ConnectedToolsRail";
import { IndustryStage } from "@/components/IndustryStage";
import { InteractiveSystemDemo } from "@/components/InteractiveSystemDemo";
import { OperatingLayer } from "@/components/OperatingLayer";
import { OpportunityFinder } from "@/components/OpportunityFinder";
import { MidPageCta, ProofOutcomes } from "@/components/ProofOutcomes";
import { SpatialHeroVisual } from "@/components/SpatialHeroVisual";
import { WorkflowExplorer } from "@/components/WorkflowExplorer";
import { FadeIn } from "@/components/FadeIn";
import { engagementStages } from "@/lib/content";

export default function HomePage() {
  return (
    <>
      <section className="grain relative min-h-0 overflow-x-clip border-b border-line-soft pt-[4rem] sm:pt-[4.6rem] lg:min-h-svh">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-full min-h-[32rem] overflow-hidden lg:h-svh">
          <Image
            src="/images/bybo-hero-future-business.png"
            alt="Business leadership team reviewing an operational intelligence system"
            fill
            priority
            quality={68}
            sizes="100vw"
            className="object-cover object-[72%_center] opacity-45 lg:object-[68%_center]"
          />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,#080808_0%,rgba(8,8,8,0.92)_38%,rgba(8,8,8,0.72)_100%)] lg:bg-[linear-gradient(90deg,#080808_0%,rgba(8,8,8,0.96)_40%,rgba(8,8,8,0.38)_72%,rgba(8,8,8,0.62)_100%)]" />
          <div className="absolute inset-0 bg-[linear-gradient(0deg,#080808_0%,transparent_55%,rgba(8,8,8,0.3)_100%)]" />
        </div>
        <div className="pointer-events-none absolute -right-56 top-16 hidden h-[38rem] w-[38rem] rounded-full bg-signal/10 blur-[130px] lg:block" />
        <div className="pointer-events-none absolute left-[40%] top-[28%] hidden h-64 w-64 rounded-full bg-blue-300/5 blur-[100px] lg:block" />

        <div className="page-shell relative z-10 grid min-w-0 items-center gap-10 py-10 lg:min-h-[calc(100svh-4.6rem)] lg:grid-cols-[0.82fr_1.18fr] lg:py-14">
          <FadeIn immediate>
            <div className="min-w-0">
              <p className="eyebrow sm:whitespace-nowrap sm:text-[0.68rem] sm:tracking-[0.18em]">
                Enterprise AI systems · platforms · operations
              </p>
              <h1 className="display-title home-hero-title mt-6 text-balance sm:mt-7">
                <span className="text-signal-text">AI systems,</span> built around your{" "}
                <span className="text-signal-text">business.</span>
              </h1>
              <p className="body-large mt-6 max-w-xl text-pretty sm:mt-8">
                Reduce costs. Move faster. Make better decisions—with AI built
                for your business.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:mt-10 sm:flex-row sm:flex-wrap">
                <Link href="/apply" className="signal-button sm:w-auto">
                  Discuss a platform or system
                  <ArrowRight size={15} />
                </Link>
                <Link href="/how-we-work" className="ghost-button sm:w-auto">
                  See how BYBO works
                  <ArrowUpRight size={14} />
                </Link>
              </div>

              <div className="mt-8 flex flex-col gap-3 border-t border-line-soft pt-5 sm:mt-10 sm:flex-row sm:flex-wrap sm:gap-x-7 sm:gap-y-3">
                {[
                  "Built around real workflows",
                  "Human approval by design",
                  "Measured against a baseline",
                ].map((item) => (
                  <span
                    key={item}
                    className="inline-flex items-center gap-2 font-mono text-[0.62rem] uppercase tracking-[0.1em] text-dim"
                  >
                    <Check size={12} className="text-signal" />
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </FadeIn>

          <FadeIn immediate delay={0.14} direction="left">
            <div className="relative min-h-[22rem] overflow-hidden rounded-[1.4rem] border border-white/10 bg-black/25 shadow-[0_40px_120px_rgba(0,0,0,0.55)] backdrop-blur-sm sm:min-h-[28rem] sm:rounded-[2rem] lg:min-h-[34rem]">
              <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(145deg,rgba(255,255,255,0.06),transparent_28%,rgba(176,38,255,0.04)_78%,transparent)]" />
              <SpatialHeroVisual />
            </div>
          </FadeIn>
        </div>
      </section>

      <section className="relative overflow-hidden border-b border-line bg-void">
        <div className="pointer-events-none absolute left-1/2 top-1/2 h-[28rem] w-[28rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-signal/5 blur-[120px]" />
        <div className="section-shell relative grid gap-12 lg:grid-cols-[0.55fr_1fr] lg:items-center">
          <FadeIn>
            <div>
              <p className="eyebrow">See the system think</p>
              <h2 className="section-title mt-6">
                From signal to action.
              </h2>
              <p className="body-large mt-6 max-w-lg">
                Select a real business moment and watch how context, rules,
                approved knowledge, and human review work together.
              </p>
              <div className="mt-8 space-y-3 border-t border-line pt-5">
                {[
                  "No black-box answer",
                  "No invented client result",
                  "Every decision remains inspectable",
                ].map((item) => (
                  <p
                    key={item}
                    className="flex items-center gap-3 font-mono text-[0.62rem] uppercase tracking-[0.1em] text-dim"
                  >
                    <Check size={12} className="text-signal" />
                    {item}
                  </p>
                ))}
              </div>
              <Link href="/apply" className="signal-button mt-8">
                Discuss this workflow <ArrowRight size={15} />
              </Link>
            </div>
          </FadeIn>
          <FadeIn delay={0.08} direction="left">
            <InteractiveSystemDemo />
          </FadeIn>
        </div>
      </section>

      <ProofOutcomes />

      <section className="overflow-hidden border-b border-surface-line bg-surface text-surface-ink">
        <div className="page-shell grid gap-7 py-8 lg:grid-cols-[0.7fr_1.3fr] lg:items-center">
          <div>
            <p className="technical-label text-surface-muted">
              Designed to connect—not replace everything
            </p>
            <p className="mt-2 max-w-md text-sm leading-6 text-surface-muted">
              BYBO works around the channels, data, and systems already running
              your business.
            </p>
          </div>
          <ConnectedToolsRail />
        </div>
      </section>

      <section className="bg-surface text-surface-ink">
        <div className="section-shell">
          <FadeIn>
            <div className="mx-auto mb-14 max-w-3xl text-center">
              <p className="eyebrow">One operating layer</p>
              <h2 className="section-title mt-6">
                Build it. See it. Improve it.
              </h2>
              <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-surface-muted">
                A BYBO system is not a hidden automation. The workflow, data,
                approvals, exceptions, and operating health stay visible.
              </p>
            </div>
          </FadeIn>
          <FadeIn delay={0.08}>
            <OperatingLayer />
          </FadeIn>

          <div className="mt-12 grid gap-px border border-surface-line bg-surface-line md:grid-cols-3">
            {[
              {
                label: "Built into the workflow",
                text: "The system starts where work enters and ends where a person or tool needs to act.",
              },
              {
                label: "Operated with accountability",
                text: "Every important action has an owner, source, confidence level, and escalation path.",
              },
              {
                label: "Improved from evidence",
                text: "Recurring questions and exceptions become the roadmap for the next improvement.",
              },
            ].map((item) => (
              <div key={item.label} className="bg-surface p-6">
                <p className="technical-label text-signal">{item.label}</p>
                <p className="mt-3 text-sm leading-6 text-surface-muted">
                  {item.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-line bg-void">
        <div className="page-shell grid divide-y divide-line md:grid-cols-3 md:divide-x md:divide-y-0">
          {[
            {
              label: "Not an automation shop",
              text: "We engineer custom applications, platforms, agents, and intelligence layers.",
            },
            {
              label: "Not a black box",
              text: "Sources, confidence, approvals, and escalation remain visible.",
            },
            {
              label: "Not a demo lab",
              text: "We take selected systems from architecture through production and managed operation.",
            },
          ].map((item) => (
            <div key={item.label} className="px-0 py-8 md:px-8 md:first:pl-0 md:last:pr-0">
              <p className="technical-label text-signal">{item.label}</p>
              <p className="mt-3 max-w-sm text-sm leading-6 text-fog">{item.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="section-shell">
        <FadeIn>
          <div className="mb-14 grid gap-8 lg:grid-cols-[1fr_0.7fr] lg:items-end">
            <div>
              <p className="eyebrow">Enterprise AI capabilities</p>
              <h2 className="section-title mt-6">
                Build what off-the-shelf software cannot.
              </h2>
            </div>
            <p className="body-large max-w-xl">
              Explore custom platforms, agentic operations, knowledge systems,
              intelligence layers, and governed AI infrastructure.
            </p>
          </div>
        </FadeIn>
        <FadeIn delay={0.08}>
          <WorkflowExplorer />
        </FadeIn>
      </section>

      <section className="border-y border-line bg-panel">
        <div className="section-shell">
          <FadeIn>
            <div className="mb-12 max-w-3xl">
              <p className="eyebrow">Find the first opportunity</p>
              <h2 className="section-title mt-6">
                Where does momentum break?
              </h2>
              <p className="body-large mt-6 max-w-2xl">
                Use the finder to identify a sensible starting system. It gives
                direction—not an automated promise.
              </p>
            </div>
          </FadeIn>
          <FadeIn delay={0.08}>
            <OpportunityFinder />
          </FadeIn>
          <FadeIn delay={0.12}>
            <MidPageCta
              eyebrow="Ready to qualify"
              title="Found a workflow worth investigating?"
              body="Share the bottleneck and we will use the first conversation to decide whether a system, a Blueprint, or no project is the right move."
              href="/apply"
              label="Discuss this opportunity"
            />
          </FadeIn>
        </div>
      </section>

      <section className="bg-surface text-surface-ink">
        <div className="section-shell">
          <FadeIn>
            <div className="mb-14 flex flex-col justify-between gap-7 lg:flex-row lg:items-end">
              <div>
                <p className="eyebrow">The engagement model</p>
                <h2 className="section-title mt-6">
                  Diagnose before you automate.
                </h2>
              </div>
              <Link
                href="/blueprint"
                className="inline-flex min-h-11 w-fit items-center gap-2 font-mono text-[0.68rem] font-semibold uppercase tracking-[0.12em] text-surface-ink hover:text-signal"
              >
                Explore the Blueprint <ArrowRight size={15} />
              </Link>
            </div>
          </FadeIn>

          <div className="grid border border-surface-line lg:grid-cols-4">
            {engagementStages.map((stage, index) => (
              <FadeIn key={stage.index} delay={index * 0.05}>
                <div className="h-full border-b border-surface-line p-6 last:border-b-0 lg:border-b-0 lg:border-r lg:last:border-r-0 lg:p-7">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-semibold text-signal">
                      /{stage.index}
                    </span>
                    <span className="technical-label text-surface-muted">{stage.label}</span>
                  </div>
                  <p className="mt-9 font-display text-2xl font-extrabold tracking-[-0.04em]">
                    {stage.name}
                  </p>
                  <p className="mt-3 text-sm font-semibold text-surface-ink">{stage.title}</p>
                  <p className="mt-3 text-sm leading-6 text-surface-muted">{stage.description}</p>
                </div>
              </FadeIn>
            ))}
          </div>
          <div className="mt-4 grid gap-px overflow-hidden rounded-2xl border border-surface-line bg-surface-line sm:grid-cols-2 lg:grid-cols-4">
            {[
              "Fixed-scope delivery",
              "Custom platform build",
              "Managed AI retainer",
              "Dedicated AI pod",
            ].map((model, index) => (
              <div key={model} className="bg-surface p-5">
                <span className="font-mono text-[0.55rem] text-signal">
                  /0{index + 1}
                </span>
                <p className="mt-3 font-display text-sm font-bold tracking-[-0.025em]">
                  {model}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="grid-field border-y border-line bg-panel">
        <div className="section-shell grid gap-14 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
          <FadeIn>
            <div>
              <p className="eyebrow">Control is part of the product</p>
              <h2 className="section-title mt-6">
                AI under your control, not instead of it.
              </h2>
              <p className="body-large mt-6 max-w-xl">
                A production system must know what it can do, what needs
                approval, and when to stop.
              </p>
            </div>
          </FadeIn>

          <div className="grid gap-3 sm:grid-cols-2">
            {[
              {
                icon: UserCheck,
                title: "Human approval",
                text: "High-impact actions wait for the right person.",
              },
              {
                icon: Eye,
                title: "Visible reasoning",
                text: "Sources, confidence, and system activity remain inspectable.",
              },
              {
                icon: ShieldCheck,
                title: "Defined boundaries",
                text: "Permissions, escalation, and prohibited actions are explicit.",
              },
              {
                icon: Database,
                title: "Data discipline",
                text: "Access, retention, vendors, and cost are designed upfront.",
              },
            ].map((item, index) => (
              <FadeIn key={item.title} delay={index * 0.05}>
                <div className="technical-card h-full p-6">
                  <item.icon size={20} className="text-signal" />
                  <p className="mt-7 font-display text-lg font-bold tracking-[-0.03em]">
                    {item.title}
                  </p>
                  <p className="mt-2 text-sm leading-6 text-fog">{item.text}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-surface text-surface-ink">
        <div className="section-shell !pb-10 !pt-14 sm:!pt-16 lg:!pb-12">
          <FadeIn>
            <div className="mb-8 max-w-5xl lg:mb-10">
              <p className="eyebrow">Who BYBO is for</p>
              <div className="mt-5 grid gap-5 lg:mt-6 lg:grid-cols-[minmax(0,1fr)_minmax(16rem,22rem)] lg:items-start lg:gap-8">
                <h2 className="section-title">
                  Built for the environment around the work.
                </h2>
                <p className="text-base leading-7 text-surface-muted lg:pt-1">
                  Industry context changes the data, risk, customer expectation,
                  and where a human must stay in control. Explore where AI systems
                  create credible leverage.
                </p>
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={0.08}>
            <IndustryStage />
          </FadeIn>
        </div>
      </section>

      <section className="border-t border-line">
        <div className="page-shell py-10 sm:py-14">
          <FadeIn>
            <div className="relative overflow-hidden bg-signal px-6 py-12 sm:px-10 sm:py-16 lg:px-16">
              <div className="pointer-events-none absolute -right-16 -top-28 h-80 w-80 rounded-full border border-signal-ink/15" />
              <div className="relative grid gap-10 lg:grid-cols-[1fr_auto] lg:items-end">
                <div>
                  <p className="technical-label signal-surface-subtle">
                    The right first move
                  </p>
                  <h2 className="cta-title mt-5 max-w-3xl">
                    Tell us where the business loses time.
                  </h2>
                  <p className="mt-5 max-w-xl text-base leading-7 signal-surface-muted">
                    We&apos;ll decide together whether it deserves an AI system,
                    a simpler process fix, or no project at all.
                  </p>
                </div>
                <Link
                  href="/apply"
                  className="inline-flex min-h-14 items-center justify-center gap-3 bg-void px-6 font-mono text-[0.68rem] font-bold uppercase tracking-[0.12em] text-cream transition-transform hover:-translate-y-1"
                >
                  Apply for consultation <ArrowUpRight size={16} />
                </Link>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
