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
import { ArrowUpRight, Check } from "lucide-react";
import { industrySolutions } from "@/lib/content";

function IndustryDetailCopy({
  active,
  compact = false,
}: {
  active: (typeof industrySolutions)[number];
  compact?: boolean;
}) {
  return (
    <>
      <div>
        <p className="font-mono text-[0.58rem] uppercase tracking-[0.15em] text-signal">
          {active.tagline}
        </p>
        <h4
          className={`mt-3 max-w-xl font-display font-bold leading-snug tracking-[-0.045em] text-pretty ${
            compact ? "text-xl sm:text-2xl" : "text-2xl sm:text-3xl"
          }`}
        >
          {active.name}
        </h4>
        <p className="mt-3 max-w-xl text-sm leading-6 text-white/58">
          {active.conversation}
        </p>
      </div>
      <div className="rounded-2xl border border-white/12 bg-black/35 p-4 backdrop-blur-xl">
        <p className="font-mono text-[0.52rem] uppercase tracking-[0.13em] text-white/50">
          How BYBO supports this industry
        </p>
        <ul className="mt-3 space-y-2.5">
          {active.outcomes.map((outcome) => (
            <li
              key={outcome}
              className="flex items-start gap-2 text-xs leading-5 text-white/72"
            >
              <Check size={12} className="mt-0.5 shrink-0 text-signal" />
              {outcome}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

function IndustryThumb({
  active,
  reduceMotion,
}: {
  active: (typeof industrySolutions)[number];
  reduceMotion: boolean | null;
}) {
  return (
    <div className="mobile-panel-thumb relative w-full">
      <AnimatePresence mode="wait">
        <motion.div
          key={`${active.slug}-thumb`}
          initial={reduceMotion ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={reduceMotion ? undefined : { opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="absolute inset-0"
        >
          <Image
            src={active.image}
            alt=""
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-[linear-gradient(0deg,rgba(11,11,12,0.35)_0%,transparent_55%)]" />
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

function IndustryPicker({
  activeIndex,
  onSelect,
  reduceMotion,
  variant,
  scrollRef,
}: {
  activeIndex: number;
  onSelect: (index: number) => void;
  reduceMotion: boolean | null;
  variant: "mobile" | "desktop";
  scrollRef?: (node: HTMLButtonElement | null, index: number) => void;
}) {
  const isMobile = variant === "mobile";

  return (
    <div
      className={
        isMobile
          ? "mobile-chip-row industry-list-scroll flex gap-2 overflow-x-auto overscroll-x-contain"
          : "industry-list-scroll mt-8 hidden max-h-[28rem] space-y-1 overflow-y-auto overscroll-contain py-1 pr-1 lg:mt-auto lg:block"
      }
      role="tablist"
      aria-label="Select an industry environment"
    >
      {industrySolutions.map((industry, index) => {
        const selected = activeIndex === index;
        return (
          <button
            key={industry.slug}
            ref={(node) => scrollRef?.(node, index)}
            type="button"
            role="tab"
            aria-selected={selected}
            aria-controls="industry-stage-panel"
            onClick={() => onSelect(index)}
            className={
              isMobile
                ? `shrink-0 snap-start rounded-full border px-3 py-2 text-left transition-colors ${
                    selected
                      ? "border-signal/40 bg-white text-void"
                      : "border-white/12 bg-white/[0.03] text-white/55"
                  }`
                : `group relative flex min-h-12 w-full cursor-pointer items-start gap-3 rounded-xl px-3 py-3 text-left transition-colors duration-300 ${
                    selected
                      ? "bg-white text-void"
                      : "text-white/45 hover:bg-white/[0.045] hover:text-white"
                  }`
            }
          >
            {isMobile ? (
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
                <span className="min-w-0 flex-1 text-xs font-semibold leading-snug text-pretty sm:text-sm">
                  {industry.name}
                </span>
                {selected && !reduceMotion && (
                  <motion.span
                    key={`${industry.slug}-progress`}
                    className="absolute inset-x-0 bottom-0 h-px origin-left bg-signal"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 6.5, ease: "linear" }}
                  />
                )}
              </>
            )}
          </button>
        );
      })}
    </div>
  );
}

export function IndustryStage() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [paused, setPaused] = useState(false);
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
  const chipRefs = useRef<(HTMLButtonElement | null)[]>([]);

  useEffect(() => {
    if (paused || reduceMotion) return;
    if (window.matchMedia("(max-width: 1023px)").matches) return;

    const timer = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % industrySolutions.length);
    }, 6500);
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

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
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

  const ctaLinks = (
    <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap lg:flex-col">
      <Link
        href={`/apply?industry=${active.slug}`}
        className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-signal px-5 font-mono text-[0.62rem] font-bold uppercase tracking-[0.12em] text-signal-ink transition-transform hover:-translate-y-0.5"
      >
        Discuss for your industry <ArrowUpRight size={13} />
      </Link>
      <Link
        href="/industries"
        className="inline-flex min-h-11 items-center justify-center gap-2 font-mono text-[0.62rem] font-semibold uppercase tracking-[0.12em] text-white/45 transition-colors hover:text-white sm:justify-start lg:justify-start"
      >
        View all industries <ArrowUpRight size={13} />
      </Link>
    </div>
  );

  return (
    <div
      className="split-explorer-card overflow-hidden rounded-[1.4rem] border border-white/10 bg-[#0b0b0c] text-cream shadow-[0_36px_100px_rgba(0,0,0,0.28)] sm:rounded-[2rem]"
      onPointerMove={handlePointerMove}
      onPointerEnter={() => setPaused(true)}
      onPointerLeave={resetPointer}
    >
      <div className="grid lg:min-h-[38rem] lg:grid-cols-[0.38fr_1fr]">
        <div className="relative z-20 flex flex-col border-b border-white/10 p-4 sm:p-5 lg:border-b-0 lg:border-r lg:p-8">
          <div>
            <p className="font-mono text-[0.58rem] uppercase tracking-[0.15em] text-white/50">
              Industry environments
            </p>
            <h3 className="mt-3 font-display text-lg font-bold leading-snug tracking-[-0.04em] sm:mt-4 sm:text-2xl">
              Context changes the system.
            </h3>
          </div>

          <IndustryPicker
            activeIndex={activeIndex}
            onSelect={setActiveIndex}
            reduceMotion={reduceMotion}
            variant="mobile"
            scrollRef={(node, index) => {
              chipRefs.current[index] = node;
            }}
          />

          <IndustryPicker
            activeIndex={activeIndex}
            onSelect={setActiveIndex}
            reduceMotion={reduceMotion}
            variant="desktop"
          />

          <div className="mt-7 hidden flex-col gap-3 lg:mt-8 lg:flex">{ctaLinks}</div>
        </div>

        <div id="industry-stage-panel" role="tabpanel" className="relative bg-[#0b0b0c]">
          <div className="lg:hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={`${active.slug}-mobile-copy`}
                initial={reduceMotion ? false : { opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduceMotion ? undefined : { opacity: 0 }}
                transition={{ duration: 0.28 }}
                className="space-y-5 p-4 sm:space-y-6 sm:p-5"
              >
                <IndustryDetailCopy active={active} compact />
                <IndustryThumb active={active} reduceMotion={reduceMotion} />
                {ctaLinks}
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="relative hidden min-h-[34rem] flex-col justify-end overflow-hidden lg:flex">
            <AnimatePresence mode="wait">
              <motion.div
                key={active.slug}
                initial={reduceMotion ? false : { opacity: 0, scale: 1.035 }}
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
                    className="object-cover"
                  />
                </motion.div>
                <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(8,8,8,0.66)_0%,rgba(8,8,8,0.16)_50%,rgba(8,8,8,0.3)_100%)]" />
                <div className="absolute inset-0 bg-[linear-gradient(0deg,rgba(8,8,8,0.96)_0%,transparent_58%)]" />
              </motion.div>
            </AnimatePresence>

            <motion.div
              aria-hidden="true"
              className="pointer-events-none absolute -right-[7rem] -top-[7rem] h-[25rem] w-[25rem] rounded-full border border-white/20 bg-white/[0.035] shadow-[inset_0_0_70px_rgba(255,255,255,0.05),0_0_80px_rgba(176,38,255,0.08)] backdrop-blur-[2px]"
              style={
                reduceMotion
                  ? undefined
                  : { x: lensX, y: lensY, rotateX: 12, rotateY: -16 }
              }
              animate={
                reduceMotion
                  ? undefined
                  : { rotate: [0, 8, 0], scale: [1, 1.025, 1] }
              }
              transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
            >
              <div className="absolute inset-[18%] rounded-full border border-signal/35" />
              <div className="absolute inset-[35%] rounded-full bg-signal/15 blur-2xl" />
            </motion.div>

            <motion.div
              aria-hidden="true"
              className="pointer-events-none absolute left-[9%] top-[13%] h-20 w-20 rounded-[1.4rem] border border-white/15 bg-white/[0.045] backdrop-blur-md"
              animate={
                reduceMotion
                  ? undefined
                  : { y: [0, -12, 0], rotate: [8, 14, 8] }
              }
              transition={{ duration: 7.5, repeat: Infinity, ease: "easeInOut" }}
            />

            <div className="relative z-10 p-10">
              <AnimatePresence mode="wait">
                <motion.div
                  key={`${active.slug}-copy`}
                  initial={reduceMotion ? false : { opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={reduceMotion ? undefined : { opacity: 0, y: -8 }}
                  transition={{ duration: 0.38, ease: "easeOut" }}
                >
                  <div className="grid gap-6 lg:grid-cols-[1fr_0.8fr] lg:items-end">
                    <IndustryDetailCopy active={active} />
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
