import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  ArrowUpRight,
  Check,
} from "lucide-react";
import { ConnectedToolsRail } from "@/components/ConnectedToolsRail";
import { HomeExploreStrip } from "@/components/HomeExploreStrip";
import { IndustryStage } from "@/components/IndustryStage";
import { ProofOutcomes } from "@/components/ProofOutcomes";
import { SignalAccentSurface } from "@/components/SignalAccentSurface";
import { SpatialHeroVisual } from "@/components/SpatialHeroVisual";
import { WorkflowExplorer } from "@/components/WorkflowExplorer";
import { FadeIn } from "@/components/FadeIn";

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
            <div className="relative flex min-h-[22rem] overflow-hidden rounded-[1.4rem] border border-white/10 bg-[#0a0a0b] shadow-[0_40px_120px_rgba(0,0,0,0.55)] sm:min-h-[28rem] sm:rounded-[2rem] lg:min-h-[34rem]">
              <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(145deg,rgba(255,255,255,0.06),transparent_28%,rgba(176,38,255,0.06)_78%,transparent)]" />
              <SpatialHeroVisual />
            </div>
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

      <section className="section-shell">
        <FadeIn>
          <div className="mb-10 grid gap-6 lg:grid-cols-[1fr_0.7fr] lg:items-end">
            <div>
              <p className="eyebrow">Enterprise AI capabilities</p>
              <h2 className="section-title mt-5">
                Build what off-the-shelf software cannot.
              </h2>
            </div>
            <div className="flex flex-col gap-4 lg:items-end">
              <p className="body-large max-w-xl lg:text-right">
                Explore platforms, agentic operations, knowledge systems, and
                governed intelligence.
              </p>
              <Link
                href="/systems"
                className="inline-flex min-h-11 w-fit items-center gap-2 font-mono text-[0.62rem] font-semibold uppercase tracking-[0.12em] text-signal hover:text-cream"
              >
                View all systems <ArrowUpRight size={14} />
              </Link>
            </div>
          </div>
        </FadeIn>
        <FadeIn delay={0.08}>
          <WorkflowExplorer />
        </FadeIn>
      </section>

      <section className="scroll-mt-24 bg-surface text-surface-ink">
        <div className="section-shell !pb-8 !pt-10 sm:!pb-10 sm:!pt-14 lg:!pb-12 lg:!pt-16">
          <FadeIn>
            <div className="mb-8 max-w-5xl lg:mb-10">
              <p className="eyebrow">Who BYBO is for</p>
              <div className="mt-5 grid gap-5 lg:mt-6 lg:grid-cols-[minmax(0,1fr)_minmax(16rem,22rem)] lg:items-start lg:gap-8">
                <h2 className="section-title">
                  Built for the environment around the work.
                </h2>
                <p className="text-base leading-7 text-surface-muted lg:pt-1">
                  Tap an industry to preview how context changes the system—or
                  open the full industries page for provisions and outcomes.
                </p>
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={0.08}>
            <IndustryStage />
          </FadeIn>
        </div>
      </section>

      <HomeExploreStrip />

      <section className="border-t border-line">
        <div className="page-shell py-10 sm:py-14">
          <FadeIn>
            <SignalAccentSurface variant="band" className="px-6 py-12 sm:px-10 sm:py-16 lg:px-16">
              <div className="grid gap-10 lg:grid-cols-[1fr_auto] lg:items-end">
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
            </SignalAccentSurface>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
