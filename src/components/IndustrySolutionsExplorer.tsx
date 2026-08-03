"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowRight, ArrowUpRight, Check } from "lucide-react";
import { industrySolutions, systems } from "@/lib/content";

type Industry = (typeof industrySolutions)[number];

function IndustryExplorerMobileDetail({
  industry,
  reduceMotion,
}: {
  industry: Industry;
  reduceMotion: boolean | null;
}) {
  return (
    <motion.div
      id={`industry-explorer-panel-${industry.slug}`}
      role="tabpanel"
      initial={reduceMotion ? false : { opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: "auto" }}
      exit={reduceMotion ? undefined : { opacity: 0, height: 0 }}
      transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
      className="overflow-hidden lg:hidden"
    >
      <div className="space-y-5 px-1 pb-2 pt-3">
        <div className="min-w-0">
          <p className="font-mono text-[0.58rem] uppercase tracking-[0.15em] text-signal">
            {industry.tagline}
          </p>
          <h2 className="section-title mt-3 !text-xl text-pretty text-void sm:!text-2xl">
            {industry.name}
          </h2>
          <p className="mt-3 text-sm leading-7 text-pretty text-void/72 sm:text-base">
            {industry.conversation}
          </p>
        </div>

        <div className="grid gap-3">
          {industry.provisions.map((provision) => {
            const system = systems.find(
              (item) => item.slug === provision.systemSlug,
            );
            return (
              <div
                key={provision.title}
                className="rounded-xl border border-void/10 bg-void/[0.04] p-4"
              >
                <p className="font-display text-sm font-bold text-void sm:text-base">
                  {provision.title}
                </p>
                <p className="mt-2 text-xs leading-6 text-void/58">
                  {provision.description}
                </p>
                {system && (
                  <Link
                    href={`/systems/${system.slug}`}
                    className="mt-4 inline-flex items-center gap-1.5 font-mono text-[0.55rem] uppercase tracking-[0.1em] text-signal hover:text-void"
                  >
                    {system.name} <ArrowUpRight size={11} />
                  </Link>
                )}
              </div>
            );
          })}
        </div>

        <div className="border-t border-void/10 pt-4">
          <p className="technical-label text-void/50">What changes</p>
          <ul className="mt-4 space-y-2">
            {industry.outcomes.map((outcome) => (
              <li
                key={outcome}
                className="flex items-start gap-2 text-xs leading-5 text-void/70"
              >
                <Check size={12} className="mt-0.5 shrink-0 text-signal" />
                {outcome}
              </li>
            ))}
          </ul>
          <p className="mt-4 text-xs leading-6 text-void/45">
            {industry.engagement}
          </p>
        </div>

        <div className="relative h-36 overflow-hidden rounded-xl">
          <Image
            src={industry.image}
            alt={`${industry.name} operating environment`}
            fill
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-[linear-gradient(0deg,rgba(11,11,12,0.45)_0%,transparent_55%)]" />
        </div>

        <Link
          href={`/apply?industry=${industry.slug}`}
          className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-signal px-6 font-mono text-[0.62rem] font-bold uppercase tracking-[0.12em] text-signal-ink transition-transform hover:-translate-y-0.5"
        >
          Discuss {industry.name} <ArrowRight size={14} />
        </Link>
      </div>
    </motion.div>
  );
}

export function IndustrySolutionsExplorer() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const reduceMotion = useReducedMotion();
  const active = industrySolutions[activeIndex];

  useEffect(() => {
    if (paused || reduceMotion) return;
    if (window.matchMedia("(max-width: 1023px)").matches) return;

    const timer = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % industrySolutions.length);
    }, 7200);
    return () => window.clearInterval(timer);
  }, [paused, reduceMotion]);

  return (
    <div
      className="overflow-hidden rounded-[1.4rem] border border-white/10 bg-[#0b0b0c] shadow-[0_40px_120px_rgba(0,0,0,0.4)] sm:rounded-[2rem]"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="grid min-w-0 lg:grid-cols-[0.34fr_1fr]">
        <div className="min-w-0 p-3 sm:p-4 lg:border-r lg:border-white/10">
          <p className="px-1 pb-3 font-mono text-[0.56rem] uppercase tracking-[0.14em] text-white/50 sm:px-3">
            Choose your industry
          </p>

          <div role="tablist" aria-label="Choose your industry">
            {industrySolutions.map((industry, index) => {
              const selected = index === activeIndex;
              return (
                <div key={industry.slug} className="min-w-0">
                  <button
                    type="button"
                    role="tab"
                    aria-selected={selected}
                    aria-controls={`industry-explorer-panel-${industry.slug}`}
                    onClick={() => setActiveIndex(index)}
                    className={`relative mb-1 flex min-h-14 w-full min-w-0 items-start gap-3 rounded-xl px-4 py-3.5 text-left transition-colors ${
                      selected
                        ? "bg-white text-void"
                        : "text-white/45 hover:bg-white/[0.045] hover:text-white"
                    }`}
                  >
                    <span
                      className={`mt-0.5 shrink-0 font-mono text-[0.52rem] leading-none ${
                        selected ? "text-signal-text" : "text-white/45"
                      }`}
                    >
                      0{index + 1}
                    </span>
                    <span className="min-w-0 flex-1 text-pretty text-sm font-semibold leading-snug">
                      {industry.name}
                    </span>
                    {selected && !reduceMotion && (
                      <motion.span
                        key={`${industry.slug}-progress`}
                        className="absolute inset-x-4 bottom-0 hidden h-px origin-left bg-signal lg:block"
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        transition={{ duration: 7.2, ease: "linear" }}
                      />
                    )}
                  </button>

                  <AnimatePresence initial={false}>
                    {selected && (
                      <IndustryExplorerMobileDetail
                        industry={industry}
                        reduceMotion={reduceMotion}
                      />
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>

        <div className="relative hidden min-h-[42rem] overflow-hidden lg:block">
          <AnimatePresence mode="wait">
            <motion.div
              key={active.slug}
              initial={reduceMotion ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={reduceMotion ? undefined : { opacity: 0 }}
              transition={{ duration: 0.45 }}
              className="absolute inset-0"
            >
              <Image
                src={active.image}
                alt={`${active.name} operating environment`}
                fill
                sizes="66vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(8,8,8,0.92)_0%,rgba(8,8,8,0.55)_42%,rgba(8,8,8,0.78)_100%)]" />
              <div className="absolute inset-0 bg-[linear-gradient(0deg,rgba(8,8,8,0.98)_0%,transparent_55%)]" />
            </motion.div>
          </AnimatePresence>

          <AnimatePresence mode="wait">
            <motion.div
              key={`${active.slug}-copy`}
              initial={reduceMotion ? false : { opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduceMotion ? undefined : { opacity: 0, y: -8 }}
              transition={{ duration: 0.35 }}
              className="relative z-10 flex h-full flex-col p-12"
            >
              <div className="max-w-2xl">
                <p className="font-mono text-[0.58rem] uppercase tracking-[0.15em] text-signal">
                  {active.tagline}
                </p>
                <h2 className="section-title mt-4 text-cream">
                  {active.name}
                </h2>
                <p className="mt-5 text-base leading-7 text-white/72">
                  {active.conversation}
                </p>
              </div>

              <div className="mt-8 grid gap-3 lg:grid-cols-2">
                {active.provisions.map((provision) => {
                  const system = systems.find(
                    (item) => item.slug === provision.systemSlug,
                  );
                  return (
                    <div
                      key={provision.title}
                      className="rounded-xl border border-white/12 bg-black/40 p-5 backdrop-blur-md"
                    >
                      <p className="font-display text-base font-bold text-cream">
                        {provision.title}
                      </p>
                      <p className="mt-2 text-xs leading-6 text-white/58">
                        {provision.description}
                      </p>
                      {system && (
                        <Link
                          href={`/systems/${system.slug}`}
                          className="mt-4 inline-flex items-center gap-1.5 font-mono text-[0.55rem] uppercase tracking-[0.1em] text-signal hover:text-cream"
                        >
                          {system.name} <ArrowUpRight size={11} />
                        </Link>
                      )}
                    </div>
                  );
                })}
              </div>

              <div className="mt-auto grid gap-6 border-t border-white/10 pt-8 lg:grid-cols-[1fr_auto] lg:items-end">
                <div>
                  <p className="technical-label text-white/50">What changes</p>
                  <ul className="mt-4 flex flex-wrap gap-x-6 gap-y-2">
                    {active.outcomes.map((outcome) => (
                      <li
                        key={outcome}
                        className="flex items-center gap-2 text-xs text-white/70"
                      >
                        <Check size={12} className="text-signal" />
                        {outcome}
                      </li>
                    ))}
                  </ul>
                  <p className="mt-4 text-xs leading-6 text-white/45">
                    {active.engagement}
                  </p>
                </div>
                <Link
                  href={`/apply?industry=${active.slug}`}
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-signal px-6 font-mono text-[0.62rem] font-bold uppercase tracking-[0.12em] text-signal-ink transition-transform hover:-translate-y-0.5"
                >
                  Discuss {active.name} <ArrowRight size={14} />
                </Link>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
