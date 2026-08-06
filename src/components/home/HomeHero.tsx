import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { LazySpatialHeroVisual } from "@/components/home/HomeLazySections";

const chips = ["Real workflows", "Human approval", "Measured ROI"];

export function HomeHero() {
  return (
    <section className="home-hero home-section relative overflow-x-clip border-b border-line-soft pt-[4.25rem] sm:pt-[4.75rem]">
      <div className="pointer-events-none absolute inset-0">
        <div className="hero-stage__glow hero-stage__glow--a" />
        <div className="hero-stage__glow hero-stage__glow--b" />
        <div className="hero-stage__vignette" />
      </div>

      <div className="page-shell relative z-10 py-8 sm:py-12 lg:py-14">
        <div className="home-hero__grid">
          <div className="home-hero__copy min-w-0">
            <h1 className="hero-headline">
              <span className="hero-headline__line text-cream">AI systems,</span>
              <span className="hero-headline__line text-cream">built around</span>
              <span className="hero-headline__line hero-headline__accent">
                your business.
              </span>
            </h1>

            <p className="home-hero__lede mt-5 max-w-md sm:mt-6">
              Production AI around your workflows. Not pilots.
            </p>

            <div className="home-hero__actions mt-7 sm:mt-8">
              <Link href="/apply" className="signal-button w-full sm:w-auto">
                Discuss a platform or system
                <ArrowRight size={15} />
              </Link>
              <Link href="/how-we-work" className="ghost-button w-full sm:w-auto">
                See how BYBO works
                <ArrowRight size={14} />
              </Link>
            </div>

            <div className="home-hero__chips mt-8 flex flex-wrap gap-2 sm:mt-9">
              {chips.map((chip) => (
                <span key={chip} className="home-hero__chip">
                  {chip}
                </span>
              ))}
            </div>
          </div>

          <div className="home-hero__visual min-w-0">
            <div className="hero-visual">
              <div className="hero-visual__glow" aria-hidden="true" />
              <div className="hero-visual__frame">
                <LazySpatialHeroVisual />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
