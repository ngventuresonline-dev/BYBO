import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { FadeIn } from "@/components/FadeIn";
import { IndustrySolutionsExplorer } from "@/components/IndustrySolutionsExplorer";
import { IndustryVerticalGallery } from "@/components/IndustryVerticalGallery";
import { PageHero } from "@/components/PageHero";
import { PageHeroIllustration } from "@/components/page-visuals/HeroIllustrations";
import { industrySolutions } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Industries",
  description:
    "Industry-specific AI systems for real estate, healthcare, manufacturing, financial services, retail, F&B, and large-scale enterprise—built around your workflows and controls.",
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
            Built for how your industry actually operates.
          </h1>
          <p className="body-large mt-8 max-w-2xl">
            From F&B outlets and retail chains to enterprise units and
            regulated sectors—we design AI systems around your workflows,
            data, and governance—not generic promises.
          </p>
          <p className="mt-4 font-mono text-[0.58rem] uppercase tracking-[0.12em] text-dim">
            {industrySolutions.length} industry environments · mapped to BYBO systems
          </p>
        </FadeIn>
      </PageHero>

      <section className="section-shell">
        <FadeIn>
          <div className="mb-10 max-w-2xl">
            <p className="eyebrow">Explore by industry</p>
            <h2 className="section-title mt-5">
              See how we support your business—not just your sector label.
            </h2>
            <p className="mt-4 text-sm leading-6 text-fog">
              Select an industry to see the problems we address, the systems we
              build, and what changes when AI is designed with your operating
              context in mind.
            </p>
          </div>
        </FadeIn>
        <FadeIn delay={0.05}>
          <IndustrySolutionsExplorer />
        </FadeIn>
      </section>

      <section className="border-y border-line bg-panel">
        <div className="section-shell">
          <FadeIn>
            <Link
              href="/systems"
              className="group mb-14 flex flex-col justify-between gap-6 rounded-[1.4rem] border border-line bg-void p-7 transition-colors hover:border-signal/35 sm:p-9 lg:flex-row lg:items-center"
            >
              <div>
                <p className="eyebrow">The systems behind this</p>
                <h2 className="mt-4 max-w-xl font-display text-2xl font-bold tracking-[-0.04em] sm:text-3xl">
                  Every industry provision maps to a BYBO system.
                </h2>
                <p className="mt-3 max-w-lg text-sm leading-6 text-fog">
                  Explore custom platforms, agentic operations, knowledge
                  systems, decision intelligence, and the full capability
                  stack.
                </p>
              </div>
              <span className="inline-flex min-h-11 shrink-0 items-center gap-2 font-mono text-[0.62rem] font-semibold uppercase tracking-[0.12em] text-signal group-hover:text-cream">
                View all systems <ArrowUpRight size={14} />
              </span>
            </Link>
          </FadeIn>
          <FadeIn>
            <div className="mb-10 max-w-2xl">
              <p className="eyebrow">All industries</p>
              <h2 className="section-title mt-5">
                Retail, F&B, enterprise, and beyond.
              </h2>
              <p className="mt-4 text-sm leading-6 text-fog">
                Whether you run a single outlet, a multi-location brand, or a
                large business unit—we start with the workflow that costs you
                time, margin, or customer trust.
              </p>
            </div>
          </FadeIn>
          <IndustryVerticalGallery />
        </div>
      </section>

      <section className="section-shell">
        <FadeIn>
          <div className="grid gap-12 lg:grid-cols-[0.75fr_1.25fr]">
            <div>
              <p className="eyebrow">Selection criteria</p>
              <h2 className="section-title mt-6">
                We qualify the workflow, not the logo.
              </h2>
              <p className="mt-4 text-sm leading-6 text-fog">
                We take on work where AI can create measurable value—with clear
                ownership, controls, and a path to production.
              </p>
            </div>
            <div className="grid gap-px border border-line bg-line sm:grid-cols-2">
              {[
                ["Frequency", "The workflow happens often enough to create meaningful value."],
                ["Economics", "Delay, error, or effort has a measurable business cost."],
                ["Readiness", "There is usable process knowledge, data, and an owner."],
                ["Control", "The business accepts clear human review and governance."],
              ].map(([title, text]) => (
                <div key={title} className="bg-void p-6">
                  <p className="font-display text-xl font-bold">{title}</p>
                  <p className="mt-3 text-sm leading-6 text-fog">{text}</p>
                </div>
              ))}
            </div>
          </div>
        </FadeIn>
      </section>

      <section className="section-shell !py-16">
        <div className="relative grid gap-8 overflow-hidden border border-line lg:grid-cols-[1fr_auto] lg:items-center">
          <div className="relative min-h-[12rem] overflow-hidden lg:min-h-[14rem]">
            <Image
              src="/images/bybo-industry-consumer.png"
              alt=""
              fill
              sizes="(min-width: 1024px) 40vw, 100vw"
              className="object-cover opacity-40 lg:absolute lg:inset-0"
            />
            <div className="relative p-7 sm:p-10 lg:bg-gradient-to-r lg:from-void lg:via-void/95 lg:to-transparent">
              <p className="technical-label text-signal">Your industry not listed?</p>
              <p className="mt-3 max-w-2xl font-display text-3xl font-extrabold tracking-[-0.045em]">
                If the workflow is repeated and valuable, it may still be a fit.
              </p>
              <p className="mt-4 max-w-xl text-sm leading-6 text-fog">
                Describe the process—not just your sector—and we will tell you
                honestly whether a BYBO system makes sense.
              </p>
            </div>
          </div>
          <div className="flex shrink-0 p-7 sm:p-10 lg:p-0 lg:pr-10">
            <Link href="/apply" className="signal-button">
              Describe the workflow <ArrowRight size={15} />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
