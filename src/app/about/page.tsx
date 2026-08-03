import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Check } from "lucide-react";
import { FadeIn } from "@/components/FadeIn";
import { EngagementTimelineVisual } from "@/components/page-visuals/SharedPageVisuals";
import { PageHero } from "@/components/PageHero";
import { PageHeroIllustration } from "@/components/page-visuals/HeroIllustrations";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "About BYBO",
  description:
    "BYBO is an enterprise AI systems partner for growing Indian businesses—focused on practical implementation, governed operations, and measurable business outcomes.",
  path: "/about",
  keywords: [
    "BYBO",
    "enterprise AI company India",
    "AI systems partner",
  ],
});

export default function AboutPage() {
  return (
    <>
      <PageHero visual={<PageHeroIllustration page="about" />}>
        <FadeIn immediate>
          <p className="eyebrow">About BYBO</p>
          <h1 className="display-title mt-7">
            Bring Your Business Online now means something more.
          </h1>
          <p className="body-large mt-8 max-w-2xl">
            Online is no longer a website. It is a connected business that can
            understand signals, respond intelligently, and improve how work
            gets done.
          </p>
        </FadeIn>
      </PageHero>

      <section className="section-shell">
        <FadeIn>
          <p className="eyebrow">Our position</p>
          <div className="mt-6 grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(16rem,22rem)] lg:items-start lg:gap-12">
            <div className="min-w-0">
              <h2 className="section-title">
                AI implementation is an operating discipline.
              </h2>
              <div className="mt-8 max-w-3xl space-y-6 text-base leading-8 text-fog">
                <p>
                  Models are getting easier to access. Useful implementation is
                  not. A business still needs to understand its workflow, choose
                  the right boundary, connect reliable data, test representative
                  cases, and own the outcome.
                </p>
                <p>
                  BYBO exists to close that gap. We combine business diagnosis,
                  system design, integration, governance, and ongoing operations
                  in one accountable engagement.
                </p>
              </div>
            </div>
            <div className="min-w-0 lg:sticky lg:top-28">
              <EngagementTimelineVisual />
            </div>
          </div>
        </FadeIn>
      </section>

      <section className="border-y border-line bg-panel">
        <div className="section-shell">
          <FadeIn>
            <p className="eyebrow">Principles</p>
            <h2 className="section-title mt-6">
              What we will protect as we grow.
            </h2>
          </FadeIn>

          <div className="mt-14 grid gap-px border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
            {[
              ["The workflow comes first", "We do not force every problem into the same agent or platform."],
              ["Evidence before enthusiasm", "A baseline and a measurable business case come before implementation."],
              ["People remain accountable", "AI can assist, route, explain, and execute within defined boundaries."],
              ["Failure is designed for", "Escalation, exception handling, and observability are not afterthoughts."],
              ["Reuse without pretending", "Common modules help us deploy faster; every business still has real differences."],
              ["Plain language wins", "The business should understand what the system does, costs, and cannot do."],
            ].map(([title, text], index) => (
              <FadeIn key={title} delay={index * 0.04}>
                <div className="h-full bg-void p-7">
                  <Check size={16} className="text-signal" />
                  <h3 className="mt-7 font-display text-xl font-extrabold tracking-[-0.035em]">
                    {title}
                  </h3>
                  <p className="mt-3 text-sm leading-6 text-fog">{text}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <section className="section-shell">
        <FadeIn>
          <div className="grid gap-12 overflow-hidden rounded-[1.4rem] border border-line lg:grid-cols-2">
            <div className="relative min-h-[18rem]">
              <Image
                src="/images/bybo-industry-consumer.png"
                alt="Indian business operations across channels"
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />
            </div>
            <div className="flex flex-col justify-center p-7 sm:p-10">
              <p className="eyebrow">Built in Bengaluru</p>
              <h2 className="section-title mt-6">India-aware by default.</h2>
              <div className="mt-6 space-y-6 text-base leading-8 text-fog">
                <p>
                  Indian businesses often operate across WhatsApp, spreadsheets,
                  CRMs, calls, informal hand-offs, and deeply human customer
                  relationships. That reality matters more than a clean demo.
                </p>
                <p>
                  We design for that environment: multilingual conversations,
                  fragmented systems, practical budgets, human escalation, and
                  the need to prove value early.
                </p>
                <p className="technical-label text-dim">
                  N&amp;G Ventures · In partnership with Bcon Club
                </p>
              </div>
            </div>
          </div>
        </FadeIn>
      </section>

      <section className="section-shell !py-16">
        <div className="grid gap-8 border border-line bg-panel p-7 sm:p-10 lg:grid-cols-[1fr_auto] lg:items-center">
          <p className="font-display text-3xl font-extrabold tracking-[-0.045em]">
            Have a workflow worth investigating?
          </p>
          <Link href="/apply" className="signal-button">
            Apply for consultation <ArrowRight size={15} />
          </Link>
        </div>
      </section>
    </>
  );
}
