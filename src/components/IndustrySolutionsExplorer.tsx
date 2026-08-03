"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowRight, ArrowUpRight, Check } from "lucide-react";
import { industrySolutions, systems } from "@/lib/content";

export function IndustrySolutionsExplorer() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const reduceMotion = useReducedMotion();
  const active = industrySolutions[activeIndex];

  useEffect(() => {
    if (paused || reduceMotion) return;
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
      <div className="grid lg:grid-cols-[0.34fr_1fr]">
        <div className="border-b border-white/10 p-3 lg:border-b-0 lg:border-r lg:p-4">
          <p className="px-3 pb-3 font-mono text-[0.56rem] uppercase tracking-[0.14em] text-white/50">
            Choose your industry
          </p>
          {industrySolutions.map((industry, index) => {
            const selected = index === activeIndex;
            return (
              <button
                key={industry.slug}
                type="button"
                onClick={() => setActiveIndex(index)}
                className={`relative mb-1 flex min-h-14 w-full items-center gap-3 rounded-xl px-4 text-left transition-colors ${
                  selected
                    ? "bg-white text-void"
                    : "text-white/45 hover:bg-white/[0.045] hover:text-white"
                }`}
              >
                <span
                  className={`font-mono text-[0.52rem] ${
                    selected ? "text-signal-text" : "text-white/45"
                  }`}
                >
                  0{index + 1}
                </span>
                <span className="text-sm font-semibold">{industry.name}</span>
                {selected && !reduceMotion && (
                  <motion.span
                    key={`${industry.slug}-progress`}
                    className="absolute inset-x-4 bottom-0 h-px origin-left bg-signal"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 7.2, ease: "linear" }}
                  />
                )}
              </button>
            );
          })}
        </div>

        <div className="relative min-h-[24rem] overflow-hidden sm:min-h-[32rem] lg:min-h-[42rem]">
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
                sizes="(min-width: 1024px) 66vw, 100vw"
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
              className="relative z-10 flex h-full flex-col p-6 sm:p-10 lg:p-12"
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
