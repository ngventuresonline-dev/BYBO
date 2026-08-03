"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, Check, ChevronRight } from "lucide-react";
import { systems } from "@/lib/content";

function SystemCatalogueDetail({
  active,
  activeIndex,
  compact = false,
}: {
  active: (typeof systems)[number];
  activeIndex: number;
  compact?: boolean;
}) {
  const ActiveIcon = active.icon;

  return (
    <>
      <div className="flex items-center justify-between">
        <span className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/12 bg-white/[0.045] text-signal backdrop-blur-xl sm:h-12 sm:w-12">
          <ActiveIcon size={20} />
        </span>
        <span className="font-mono text-[0.56rem] uppercase tracking-[0.14em] text-white/50">
          {String(activeIndex + 1).padStart(2, "0")} /{" "}
          {String(systems.length).padStart(2, "0")}
        </span>
      </div>

      <div className={`max-w-2xl ${compact ? "mt-5" : "mt-14"}`}>
        <p className="font-mono text-[0.58rem] uppercase tracking-[0.15em] text-signal">
          {active.short}
        </p>
        <h2
          className={`section-title text-pretty ${
            compact ? "mt-3 !text-xl sm:!text-2xl" : "mt-4"
          }`}
        >
          {active.promise}
        </h2>
        <p className="mt-4 text-sm leading-7 text-white/55 sm:mt-6 sm:text-base">
          {active.description}
        </p>
      </div>

      <div className="mt-6 grid gap-3 sm:grid-cols-2 sm:mt-8">
        {active.modules.slice(0, 4).map((module) => (
          <div
            key={module.title}
            className="rounded-xl border border-white/10 bg-black/25 p-4 backdrop-blur-md"
          >
            <p className="flex items-center gap-2 text-xs font-semibold text-white/80">
              <Check size={12} className="text-signal" />
              {module.title}
            </p>
          </div>
        ))}
      </div>

      <Link
        href={`/systems/${active.slug}`}
        className="mt-6 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-signal px-5 font-mono text-[0.62rem] font-bold uppercase tracking-[0.12em] text-signal-ink transition-transform hover:-translate-y-0.5 sm:w-fit"
      >
        Explore this system <ArrowUpRight size={14} />
      </Link>
    </>
  );
}

export function SystemsCatalogue() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const reduceMotion = useReducedMotion();
  const active = systems[activeIndex];
  const rowRefs = useRef<(HTMLDivElement | null)[]>([]);
  const skipInitialScrollRef = useRef(true);

  useEffect(() => {
    if (paused || reduceMotion) return;
    if (window.matchMedia("(max-width: 1023px)").matches) return;

    const timer = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % systems.length);
    }, 5600);
    return () => window.clearInterval(timer);
  }, [paused, reduceMotion]);

  useEffect(() => {
    const isMobile = window.matchMedia("(max-width: 1023px)").matches;
    if (!isMobile) return;

    if (skipInitialScrollRef.current) {
      skipInitialScrollRef.current = false;
      return;
    }

    rowRefs.current[activeIndex]?.scrollIntoView({
      behavior: reduceMotion ? "auto" : "smooth",
      block: "nearest",
    });
  }, [activeIndex, reduceMotion]);

  return (
    <div
      className="split-explorer-card overflow-hidden rounded-[2rem] border border-white/10 bg-[#0b0b0c] shadow-[0_35px_110px_rgba(0,0,0,0.35)]"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="hidden lg:grid lg:grid-cols-[0.43fr_1fr]">
        <div className="relative z-20 border-r border-white/10 p-3">
          {systems.map((system, index) => {
            const Icon = system.icon;
            const selected = index === activeIndex;
            return (
              <Link
                key={system.slug}
                href={`/systems/${system.slug}`}
                onMouseEnter={() => setActiveIndex(index)}
                onFocus={() => setActiveIndex(index)}
                className={`group relative grid min-h-24 grid-cols-[auto_1fr_auto] items-center gap-4 rounded-2xl px-4 transition-colors duration-300 sm:px-5 ${
                  selected
                    ? "bg-white text-void"
                    : "text-white/45 hover:bg-white/[0.045] hover:text-white"
                }`}
              >
                <span
                  className={`flex h-10 w-10 items-center justify-center rounded-xl border ${
                    selected
                      ? "border-black/10 bg-black/[0.035] text-signal-text"
                      : "border-white/10 bg-white/[0.025] text-white/50"
                  }`}
                >
                  <Icon size={17} />
                </span>
                <span>
                  <span
                    className={`block font-mono text-[0.52rem] uppercase tracking-[0.13em] ${
                      selected ? "text-signal-text" : "text-white/45"
                    }`}
                  >
                    System / {system.index}
                  </span>
                  <span className="mt-1.5 block font-display text-base font-bold tracking-[-0.03em] sm:text-lg">
                    {system.name}
                  </span>
                </span>
                <ArrowUpRight
                  size={15}
                  className={`transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 ${
                    selected ? "text-surface-muted" : "text-white/40"
                  }`}
                />
                {selected && !reduceMotion && (
                  <motion.span
                    key={`${system.slug}-progress`}
                    className="absolute inset-x-5 bottom-0 h-px origin-left bg-signal"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 5.6, ease: "linear" }}
                  />
                )}
              </Link>
            );
          })}
        </div>

        <div className="relative min-h-[39rem] overflow-hidden p-12">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_76%_22%,rgba(176,38,255,0.16),transparent_32%),radial-gradient(circle_at_20%_85%,rgba(124,161,255,0.08),transparent_36%)]" />
          <motion.div
            aria-hidden="true"
            className="pointer-events-none absolute -right-28 -top-28 h-[28rem] w-[28rem] rounded-full border border-white/15 bg-white/[0.025] shadow-[inset_0_0_90px_rgba(255,255,255,0.035)]"
            animate={
              reduceMotion
                ? undefined
                : { rotate: [0, 9, 0], scale: [1, 1.025, 1] }
            }
            transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
          >
            <div className="absolute inset-[17%] rounded-full border border-signal/25" />
            <div className="absolute inset-[36%] rounded-full border border-white/10 bg-signal/10 blur-sm" />
          </motion.div>

          <AnimatePresence mode="wait">
            <motion.div
              key={active.slug}
              initial={reduceMotion ? false : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduceMotion ? undefined : { opacity: 0, y: -8 }}
              transition={{ duration: 0.38, ease: "easeOut" }}
              className="relative z-10 flex h-full flex-col"
            >
              <SystemCatalogueDetail active={active} activeIndex={activeIndex} />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      <div className="lg:hidden">
        {systems.map((system, index) => {
          const Icon = system.icon;
          const isActive = activeIndex === index;

          return (
            <div
              key={system.slug}
              ref={(node) => {
                rowRefs.current[index] = node;
              }}
              className="border-b border-white/10 last:border-b-0"
            >
              <button
                type="button"
                onClick={() => setActiveIndex(index)}
                aria-expanded={isActive}
                className={`flex min-h-[4.75rem] w-full items-center justify-between gap-3 px-4 py-3 text-left sm:px-5 ${
                  isActive
                    ? "bg-white text-void"
                    : "text-white/45 hover:bg-white/[0.045] hover:text-white"
                }`}
              >
                <span className="flex min-w-0 items-center gap-3">
                  <span
                    className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border ${
                      isActive
                        ? "border-black/10 bg-black/[0.035] text-signal-text"
                        : "border-white/10 bg-white/[0.025] text-white/50"
                    }`}
                  >
                    <Icon size={16} />
                  </span>
                  <span className="min-w-0">
                    <span
                      className={`block font-mono text-[0.5rem] uppercase tracking-[0.12em] ${
                        isActive ? "text-signal-text" : "text-white/45"
                      }`}
                    >
                      System / {system.index}
                    </span>
                    <span className="mt-1 block truncate font-display text-sm font-bold tracking-[-0.03em]">
                      {system.name}
                    </span>
                  </span>
                </span>
                <ChevronRight
                  size={16}
                  className={`shrink-0 transition-transform ${
                    isActive ? "rotate-90 text-signal-text" : "text-white/40"
                  }`}
                />
              </button>

              <AnimatePresence initial={false}>
                {isActive && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                    className="overflow-hidden"
                  >
                    <div className="border-t border-white/10 px-4 py-5 sm:px-5">
                      <SystemCatalogueDetail
                        active={system}
                        activeIndex={index}
                        compact
                      />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </div>
  );
}
