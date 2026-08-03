"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Check, ChevronRight } from "lucide-react";
import { SignalAccentLayers } from "@/components/SignalAccentSurface";
import { systems } from "@/lib/content";

type System = (typeof systems)[number];

function SystemDetailContent({
  system,
  compact = false,
}: {
  system: System;
  compact?: boolean;
}) {
  const Icon = system.icon;

  return (
    <>
      <div className="flex h-12 w-12 items-center justify-center border border-line bg-void text-signal">
        <Icon size={21} aria-hidden="true" />
      </div>
      <p
        className={`font-display font-bold tracking-[-0.04em] ${
          compact ? "mt-5 text-xl" : "mt-8 text-2xl sm:text-3xl"
        }`}
      >
        {system.short}
      </p>
      <p
        className={`max-w-2xl text-fog ${
          compact
            ? "mt-3 text-sm leading-6"
            : "mt-4 text-sm leading-6 sm:text-base sm:leading-7"
        }`}
      >
        {system.description}
      </p>

      <div className={`grid gap-3 sm:grid-cols-2 ${compact ? "mt-5" : "mt-8"}`}>
        {system.capabilities.slice(0, 4).map((capability) => (
          <div
            key={capability}
            className="flex items-start gap-3 border-t border-line pt-3 text-sm text-fog"
          >
            <Check size={15} className="mt-0.5 shrink-0 text-signal" />
            {capability}
          </div>
        ))}
      </div>

      <div className={compact ? "mt-6 space-y-3" : "mt-10 space-y-4"}>
        <Link
          href={`/systems/${system.slug}`}
          className="inline-flex min-h-11 w-full items-center justify-center gap-2 bg-signal px-5 font-mono text-[0.64rem] font-bold uppercase tracking-[0.1em] text-signal-ink transition-colors hover:bg-cream hover:text-signal-ink sm:w-fit sm:justify-start sm:bg-transparent sm:px-0 sm:font-semibold sm:normal-case sm:tracking-[0.12em] sm:text-cream sm:hover:text-signal-text"
        >
          Explore this system
          <ArrowRight size={15} />
        </Link>
        <Link
          href="/industries"
          className="inline-flex min-h-11 w-fit items-center gap-2 font-mono text-[0.62rem] font-semibold uppercase tracking-[0.12em] text-dim transition-colors hover:text-signal"
        >
          View all industries
          <ArrowRight size={14} />
        </Link>
      </div>
    </>
  );
}

function SystemRowButton({
  system,
  index,
  active,
  onSelect,
  expanded = false,
}: {
  system: System;
  index: number;
  active: number;
  onSelect: (index: number) => void;
  expanded?: boolean;
}) {
  const isActive = active === index;

  return (
    <button
      type="button"
      onClick={() => onSelect(index)}
      className={`group relative flex min-h-[5.25rem] w-full items-center justify-between gap-4 px-5 text-left transition-colors sm:px-7 ${
        isActive
          ? "signal-accent-active bg-signal text-signal-ink"
          : "bg-panel text-fog hover:bg-panel-2 hover:text-cream"
      }`}
      aria-expanded={isActive}
      aria-controls={`system-detail-${system.slug}`}
    >
      {isActive && <SignalAccentLayers tone="solid" />}
      <span className="relative z-[2] flex items-center gap-4">
        <span
          className={`font-mono text-[0.62rem] ${
            isActive ? "signal-surface-subtle" : "text-dim"
          }`}
        >
          /{system.index}
        </span>
        <span className="font-display text-base font-bold tracking-[-0.025em] sm:text-lg">
          {system.name}
        </span>
      </span>
      <ChevronRight
        size={17}
        className={`relative z-[2] shrink-0 transition-transform ${
          isActive
            ? expanded
              ? "rotate-90 translate-x-0"
              : "translate-x-1"
            : "text-dim group-hover:translate-x-1"
        }`}
        aria-hidden="true"
      />
    </button>
  );
}

export function WorkflowExplorer() {
  const [active, setActive] = useState(0);
  const current = systems[active];
  const rowRefs = useRef<(HTMLDivElement | null)[]>([]);
  const skipInitialScrollRef = useRef(true);

  const selectSystem = (index: number) => {
    setActive(index);
  };

  useEffect(() => {
    const isMobile = window.matchMedia("(max-width: 1023px)").matches;
    if (!isMobile) return;

    if (skipInitialScrollRef.current) {
      skipInitialScrollRef.current = false;
      return;
    }

    const row = rowRefs.current[active];
    if (!row) return;

    window.requestAnimationFrame(() => {
      row.scrollIntoView({ behavior: "smooth", block: "nearest" });
    });
  }, [active]);

  return (
    <div className="overflow-hidden border border-line bg-panel">
      {/* Desktop: list + side panel */}
      <div className="hidden lg:grid lg:grid-cols-[0.8fr_1.2fr]">
        <div className="border-r border-line">
          {systems.map((system, index) => (
            <div
              key={system.slug}
              className="border-b border-line last:border-b-0"
            >
              <SystemRowButton
                system={system}
                index={index}
                active={active}
                onSelect={selectSystem}
              />
            </div>
          ))}
        </div>

        <div className="relative min-h-[24rem] overflow-hidden p-5 sm:min-h-[34rem] sm:p-9 lg:p-12">
          <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full border border-signal/10" />
          <div className="pointer-events-none absolute -right-10 -top-10 h-44 w-44 rounded-full border border-signal/20" />

          <AnimatePresence mode="wait">
            <motion.div
              key={current.slug}
              initial={{ opacity: 0, x: 18 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -12 }}
              transition={{ duration: 0.25 }}
              className="relative z-10 flex h-full flex-col"
            >
              <SystemDetailContent system={current} />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Mobile: inline accordion — detail opens directly under the selected row */}
      <div className="lg:hidden">
        {systems.map((system, index) => {
          const isActive = active === index;

          return (
            <div
              key={system.slug}
              ref={(node) => {
                rowRefs.current[index] = node;
              }}
              className="border-b border-line last:border-b-0"
            >
              <SystemRowButton
                system={system}
                index={index}
                active={active}
                onSelect={selectSystem}
                expanded
              />

              <AnimatePresence initial={false}>
                {isActive && (
                  <motion.div
                    id={`system-detail-${system.slug}`}
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                    className="overflow-hidden"
                  >
                    <div className="border-t border-line/80 bg-void/50 px-5 py-6 sm:px-7">
                      <SystemDetailContent system={system} compact />
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
