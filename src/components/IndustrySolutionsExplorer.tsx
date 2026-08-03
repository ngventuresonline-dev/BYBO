"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowRight, ArrowUpRight, Check } from "lucide-react";
import { industrySolutions, systems } from "@/lib/content";

function IndustryExplorerDetail({
  active,
  compact = false,
}: {
  active: (typeof industrySolutions)[number];
  compact?: boolean;
}) {
  return (
    <>
      <div className="max-w-2xl">
        <p className="font-mono text-[0.58rem] uppercase tracking-[0.15em] text-signal">
          {active.tagline}
        </p>
        <h2
          className={`section-title mt-3 text-pretty text-cream ${
            compact ? "!text-xl sm:!text-2xl" : "mt-4"
          }`}
        >
          {active.name}
        </h2>
        <p className="mt-4 text-sm leading-7 text-white/72 sm:text-base">
          {active.conversation}
        </p>
      </div>

      <div className="grid gap-3 lg:grid-cols-2">
        {active.provisions.map((provision) => {
          const system = systems.find(
            (item) => item.slug === provision.systemSlug,
          );
          return (
            <div
              key={provision.title}
              className="rounded-xl border border-white/12 bg-black/40 p-4 backdrop-blur-md sm:p-5"
            >
              <p className="font-display text-sm font-bold text-cream sm:text-base">
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

      <div className="grid gap-6 border-t border-white/10 pt-6 lg:grid-cols-[1fr_auto] lg:items-end lg:pt-8">
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
          <p className="mt-4 text-xs leading-6 text-white/45">{active.engagement}</p>
        </div>
        <Link
          href={`/apply?industry=${active.slug}`}
          className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-signal px-6 font-mono text-[0.62rem] font-bold uppercase tracking-[0.12em] text-signal-ink transition-transform hover:-translate-y-0.5 sm:w-auto"
        >
          Discuss {active.name} <ArrowRight size={14} />
        </Link>
      </div>
    </>
  );
}

export function IndustrySolutionsExplorer() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const reduceMotion = useReducedMotion();
  const active = industrySolutions[activeIndex];
  const chipRefs = useRef<(HTMLButtonElement | null)[]>([]);

  useEffect(() => {
    if (paused || reduceMotion) return;
    if (window.matchMedia("(max-width: 1023px)").matches) return;

    const timer = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % industrySolutions.length);
    }, 7200);
    return () => window.clearInterval(timer);
  }, [paused, reduceMotion]);

  useEffect(() => {
    const chip = chipRefs.current[activeIndex];
    if (!chip || !window.matchMedia("(max-width: 1023px)").matches) return;

    chip.scrollIntoView({
      behavior: reduceMotion ? "auto" : "smooth",
      block: "nearest",
      inline: "center",
    });
  }, [activeIndex, reduceMotion]);

  const pickerButton = (
    industry: (typeof industrySolutions)[number],
    index: number,
    selected: boolean,
    mobile: boolean,
  ) => (
    <button
      key={industry.slug}
      ref={mobile ? (node) => { chipRefs.current[index] = node; } : undefined}
      type="button"
      onClick={() => setActiveIndex(index)}
      className={
        mobile
          ? `shrink-0 snap-start rounded-full border px-3 py-2 text-left transition-colors ${
              selected
                ? "border-signal/40 bg-white text-void"
                : "border-white/12 bg-white/[0.03] text-white/55"
            }`
          : `relative flex min-h-12 w-full items-start gap-3 rounded-xl px-4 py-3 text-left transition-colors ${
              selected
                ? "bg-white text-void"
                : "text-white/45 hover:bg-white/[0.045] hover:text-white"
            }`
      }
    >
      {mobile ? (
        <span className="flex items-center gap-2 whitespace-nowrap">
          <span
            className={`font-mono text-[0.52rem] ${
              selected ? "text-signal-text" : "text-white/45"
            }`}
          >
            0{index + 1}
          </span>
          <span className="text-[0.72rem] font-semibold">{industry.name}</span>
        </span>
      ) : (
        <>
          <span
            className={`mt-0.5 shrink-0 font-mono text-[0.52rem] leading-none ${
              selected ? "text-signal-text" : "text-white/45"
            }`}
          >
            0{index + 1}
          </span>
          <span className="min-w-0 flex-1 text-sm font-semibold leading-snug text-pretty">
            {industry.name}
          </span>
          {selected && !reduceMotion && (
            <motion.span
              key={`${industry.slug}-progress`}
              className="absolute inset-x-4 bottom-0 h-px origin-left bg-signal"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 7.2, ease: "linear" }}
            />
          )}
        </>
      )}
    </button>
  );

  return (
    <div
      className="split-explorer-card overflow-hidden rounded-[1.4rem] border border-white/10 bg-[#0b0b0c] shadow-[0_40px_120px_rgba(0,0,0,0.4)] sm:rounded-[2rem]"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="grid lg:grid-cols-[0.34fr_1fr]">
        <div className="border-b border-white/10 p-3 sm:p-4 lg:border-b-0 lg:border-r">
          <p className="px-1 pb-3 font-mono text-[0.56rem] uppercase tracking-[0.14em] text-white/50 sm:px-3">
            Choose your industry
          </p>

          <div
            className="mobile-chip-row industry-list-scroll flex gap-2 overflow-x-auto overscroll-x-contain px-1 lg:hidden"
            role="tablist"
          >
            {industrySolutions.map((industry, index) =>
              pickerButton(industry, index, activeIndex === index, true),
            )}
          </div>

          <div className="industry-list-scroll hidden max-h-[28rem] space-y-1 overflow-y-auto overscroll-contain py-1 lg:block lg:max-h-none lg:overflow-visible">
            {industrySolutions.map((industry, index) =>
              pickerButton(industry, index, activeIndex === index, false),
            )}
          </div>
        </div>

        <div className="relative bg-[#0b0b0c]">
          <div className="lg:hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={`${active.slug}-mobile`}
                initial={reduceMotion ? false : { opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduceMotion ? undefined : { opacity: 0 }}
                transition={{ duration: 0.28 }}
                className="space-y-5 p-4 sm:space-y-6 sm:p-5"
              >
                <IndustryExplorerDetail active={active} compact />
                <div className="mobile-panel-thumb relative w-full overflow-hidden">
                  <Image
                    src={active.image}
                    alt={`${active.name} operating environment`}
                    fill
                    sizes="100vw"
                    className="object-cover"
                  />
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="relative hidden min-h-[42rem] flex-col overflow-hidden lg:flex">
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

            <div className="relative z-10 flex flex-1 flex-col overflow-y-auto p-12">
              <AnimatePresence mode="wait">
                <motion.div
                  key={`${active.slug}-desktop`}
                  initial={reduceMotion ? false : { opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={reduceMotion ? undefined : { opacity: 0, y: -8 }}
                  transition={{ duration: 0.35 }}
                  className="space-y-8"
                >
                  <IndustryExplorerDetail active={active} />
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
