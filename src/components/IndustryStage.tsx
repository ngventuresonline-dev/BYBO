"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "framer-motion";
import { ArrowUpRight, Check, ChevronRight } from "lucide-react";
import { industrySolutions } from "@/lib/content";

type Industry = (typeof industrySolutions)[number];

function IndustryStageMobileDetail({
  industry,
  reduceMotion,
}: {
  industry: Industry;
  reduceMotion: boolean | null;
}) {
  return (
    <motion.div
      id={`industry-stage-panel-${industry.slug}`}
      role="tabpanel"
      initial={reduceMotion ? false : { opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: "auto" }}
      exit={reduceMotion ? undefined : { opacity: 0, height: 0 }}
      transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
      className="overflow-hidden lg:hidden"
    >
      <div className="space-y-4 px-1 pb-4 pt-3">
        <div className="relative h-44 overflow-hidden rounded-xl border border-white/10">
          <Image
            src={industry.image}
            alt={`${industry.name} working environment`}
            fill
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-[linear-gradient(0deg,rgba(11,11,12,0.72)_0%,transparent_60%)]" />
          <div className="absolute inset-x-0 bottom-0 p-4">
            <p className="font-mono text-[0.55rem] uppercase tracking-[0.14em] text-signal">
              {industry.tagline}
            </p>
            <h4 className="mt-1.5 font-display text-xl font-bold tracking-[-0.04em] text-cream">
              {industry.name}
            </h4>
          </div>
        </div>

        <p className="text-sm leading-6 text-white/60">{industry.conversation}</p>

        <div className="rounded-2xl border border-white/12 bg-black/40 p-4">
          <p className="font-mono text-[0.52rem] uppercase tracking-[0.13em] text-white/45">
            How BYBO supports this industry
          </p>
          <ul className="mt-3 space-y-2.5">
            {industry.outcomes.map((outcome) => (
              <li
                key={outcome}
                className="flex items-start gap-2 text-xs leading-5 text-white/75"
              >
                <Check size={12} className="mt-0.5 shrink-0 text-signal" />
                {outcome}
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-col gap-3 pt-1">
          <Link
            href={`/apply?industry=${industry.slug}`}
            className="signal-button w-full"
          >
            Discuss for your industry <ArrowUpRight size={13} />
          </Link>
          <Link
            href="/industries"
            className="inline-flex min-h-11 items-center justify-center gap-2 font-mono text-[0.62rem] font-semibold uppercase tracking-[0.12em] text-white/45 transition-colors hover:text-white"
          >
            View all industries <ArrowUpRight size={13} />
          </Link>
        </div>
      </div>
    </motion.div>
  );
}

export function IndustryStage() {
  const rootRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [inViewport, setInViewport] = useState(false);
  const reduceMotion = useReducedMotion();
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const springX = useSpring(pointerX, { stiffness: 90, damping: 24 });
  const springY = useSpring(pointerY, { stiffness: 90, damping: 24 });
  const imageX = useTransform(springX, [-1, 1], [-12, 12]);
  const imageY = useTransform(springY, [-1, 1], [-9, 9]);
  const lensX = useTransform(springX, [-1, 1], [18, -18]);
  const lensY = useTransform(springY, [-1, 1], [12, -12]);
  const active = industrySolutions[activeIndex];

  useEffect(() => {
    const node = rootRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => setInViewport(entry.isIntersecting),
      { threshold: 0.12, rootMargin: "120px 0px" },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!inViewport || paused || reduceMotion) return;
    if (window.matchMedia("(max-width: 1023px)").matches) return;

    const timer = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % industrySolutions.length);
    }, 6500);
    return () => window.clearInterval(timer);
  }, [inViewport, paused, reduceMotion]);

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!inViewport) return;
    if (window.matchMedia("(max-width: 1023px)").matches) return;
    const rect = event.currentTarget.getBoundingClientRect();
    pointerX.set(((event.clientX - rect.left) / rect.width) * 2 - 1);
    pointerY.set(((event.clientY - rect.top) / rect.height) * 2 - 1);
  };

  const resetPointer = () => {
    pointerX.set(0);
    pointerY.set(0);
    setPaused(false);
  };

  return (
    <div
      ref={rootRef}
      className="industry-stage"
      onPointerMove={handlePointerMove}
      onPointerEnter={() => setPaused(true)}
      onPointerLeave={resetPointer}
    >
      <div className="grid min-w-0 lg:min-h-[38rem] lg:grid-cols-[0.36fr_1fr]">
        <aside className="relative z-20 flex min-w-0 flex-col p-4 sm:p-5 lg:border-r lg:border-white/10 lg:p-7">
          <p className="font-mono text-[0.58rem] uppercase tracking-[0.16em] text-white/45">
            Industry environments
          </p>

          <div
            className="industry-list-scroll mt-5 flex-1 space-y-0 lg:mt-6 lg:max-h-[26rem] lg:overflow-y-auto lg:overscroll-contain lg:pr-1"
            role="tablist"
            aria-label="Select an industry environment"
          >
            {industrySolutions.map((industry, index) => {
              const selected = activeIndex === index;
              return (
                <div
                  key={industry.slug}
                  className={`min-w-0 border-b border-white/[0.08] last:border-b-0 ${
                    selected ? "border-b-transparent" : ""
                  }`}
                >
                  <button
                    type="button"
                    role="tab"
                    aria-selected={selected}
                    aria-controls={`industry-stage-panel-${industry.slug}`}
                    aria-expanded={selected}
                    onClick={() => setActiveIndex(index)}
                    className={`group relative flex min-h-12 w-full min-w-0 items-center gap-3 px-3 py-3 text-left transition-colors duration-300 ${
                      selected
                        ? "rounded-full bg-cream text-void shadow-[0_8px_24px_rgba(0,0,0,0.25)]"
                        : "rounded-xl text-white/45 hover:bg-white/[0.04] hover:text-white"
                    }`}
                  >
                    <span
                      className={`shrink-0 font-mono text-[0.55rem] leading-none ${
                        selected ? "text-signal" : "text-white/35"
                      }`}
                    >
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="min-w-0 flex-1 text-pretty text-xs font-semibold leading-snug sm:text-[0.9rem]">
                      {industry.name}
                    </span>
                    {selected && (
                      <ChevronRight
                        size={14}
                        className="shrink-0 text-void/55"
                        aria-hidden="true"
                      />
                    )}
                    {selected && !reduceMotion && (
                      <motion.span
                        key={`${industry.slug}-progress`}
                        className="absolute inset-x-3 bottom-1 hidden h-px origin-left bg-signal lg:block"
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        transition={{ duration: 6.5, ease: "linear" }}
                      />
                    )}
                  </button>

                  <AnimatePresence initial={false}>
                    {selected && (
                      <IndustryStageMobileDetail
                        industry={industry}
                        reduceMotion={reduceMotion}
                      />
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>

          <div className="mt-6 hidden flex-col gap-3 lg:mt-auto lg:flex">
            <Link
              href={`/apply?industry=${active.slug}`}
              className="signal-button w-full"
            >
              Discuss for your industry <ArrowUpRight size={13} />
            </Link>
            <Link
              href="/industries"
              className="inline-flex min-h-10 items-center gap-2 font-mono text-[0.6rem] font-semibold uppercase tracking-[0.12em] text-white/40 transition-colors hover:text-white"
            >
              View all industries <ArrowUpRight size={13} />
            </Link>
          </div>
        </aside>

        <div
          id="industry-stage-panel"
          role="tabpanel"
          className="relative hidden min-h-[34rem] overflow-hidden lg:block"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={active.slug}
              initial={reduceMotion ? false : { opacity: 0, scale: 1.03 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={reduceMotion ? undefined : { opacity: 0 }}
              transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
              className="absolute inset-0"
            >
              <motion.div
                className="absolute -inset-5"
                style={reduceMotion ? undefined : { x: imageX, y: imageY }}
              >
                <Image
                  src={active.image}
                  alt={`${active.name} working environment`}
                  fill
                  sizes="68vw"
                  loading="lazy"
                  className="object-cover"
                />
              </motion.div>
              <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(8,8,8,0.55)_0%,rgba(8,8,8,0.12)_48%,rgba(8,8,8,0.28)_100%)]" />
              <div className="absolute inset-0 bg-[linear-gradient(0deg,rgba(8,8,8,0.94)_0%,transparent_58%)]" />
            </motion.div>
          </AnimatePresence>

          <motion.div
            aria-hidden="true"
            className="pointer-events-none absolute -right-[6rem] top-[8%] h-[22rem] w-[22rem] rounded-full border border-signal/25"
            style={
              reduceMotion
                ? undefined
                : { x: lensX, y: lensY }
            }
            animate={
              reduceMotion || !inViewport
                ? undefined
                : { scale: [1, 1.04, 1], opacity: [0.55, 0.85, 0.55] }
            }
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          >
            <div className="absolute inset-[16%] rounded-full border border-signal/30" />
            <div className="absolute inset-[32%] rounded-full border border-signal/20" />
            <div className="absolute inset-[42%] rounded-full bg-signal/20 blur-2xl" />
          </motion.div>

          <div className="absolute inset-x-0 bottom-0 z-10 p-8 xl:p-10">
            <AnimatePresence mode="wait">
              <motion.div
                key={`${active.slug}-copy`}
                initial={reduceMotion ? false : { opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduceMotion ? undefined : { opacity: 0, y: -8 }}
                transition={{ duration: 0.38, ease: "easeOut" }}
              >
                <div className="grid min-w-0 gap-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
                  <div className="min-w-0">
                    <p className="font-mono text-[0.58rem] uppercase tracking-[0.15em] text-signal">
                      {active.tagline}
                    </p>
                    <h4 className="mt-3 font-display text-3xl font-bold tracking-[-0.045em] text-pretty text-cream xl:text-[2.15rem]">
                      {active.name}
                    </h4>
                    <p className="mt-3 max-w-md text-sm leading-6 text-pretty text-white/65">
                      {active.conversation}
                    </p>
                  </div>
                  <div className="rounded-2xl border border-white/12 bg-black/45 p-5 backdrop-blur-xl">
                    <p className="font-mono text-[0.52rem] uppercase tracking-[0.13em] text-white/45">
                      How BYBO supports this industry
                    </p>
                    <ul className="mt-3.5 space-y-2.5">
                      {active.outcomes.map((outcome) => (
                        <li
                          key={outcome}
                          className="flex items-start gap-2.5 text-xs leading-5 text-white/78"
                        >
                          <Check
                            size={12}
                            className="mt-0.5 shrink-0 text-signal"
                          />
                          {outcome}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
