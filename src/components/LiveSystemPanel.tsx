"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  BarChart3,
  BookOpenCheck,
  Headphones,
  Megaphone,
  Workflow,
} from "lucide-react";

const events = [
  {
    code: "REV",
    icon: Workflow,
    title: "New enquiry qualified",
    detail: "High intent · routed with context",
    state: "Ready for sales",
  },
  {
    code: "CX",
    icon: Headphones,
    title: "Customer question resolved",
    detail: "Answered from approved knowledge",
    state: "Confidence 96%",
  },
  {
    code: "BRD",
    icon: Megaphone,
    title: "Market signal detected",
    detail: "Repeated objection across 9 conversations",
    state: "Brief created",
  },
  {
    code: "OPS",
    icon: BookOpenCheck,
    title: "Document exception flagged",
    detail: "Routine fields validated automatically",
    state: "Human review",
  },
  {
    code: "DEC",
    icon: BarChart3,
    title: "Revenue anomaly explained",
    detail: "Source data linked to recommendation",
    state: "Leadership brief",
  },
];

export function LiveSystemPanel() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const interval = window.setInterval(() => {
      setActive((current) => (current + 1) % events.length);
    }, 3200);
    return () => window.clearInterval(interval);
  }, [paused]);

  const current = events[active];
  const CurrentIcon = current.icon;

  return (
    <div
      className="technical-card relative overflow-hidden"
      onPointerEnter={() => setPaused(true)}
      onPointerLeave={() => setPaused(false)}
    >
      <div className="scan-line pointer-events-none absolute inset-x-0 top-0 z-0 h-px bg-gradient-to-r from-transparent via-signal/60 to-transparent" />

      <div className="relative z-10 flex items-center justify-between border-b border-line px-5 py-4">
        <div>
          <p className="technical-label text-dim">System simulation</p>
          <p className="mt-1 font-mono text-[0.58rem] uppercase tracking-[0.12em] text-dim">
            Illustrative workflow · no client data
          </p>
        </div>
        <span className="inline-flex items-center gap-2 font-mono text-[0.62rem] uppercase tracking-[0.12em] text-success">
          <span className="signal-pulse h-1.5 w-1.5 rounded-full bg-success" />
          Running
        </span>
      </div>

      <div className="relative min-h-[19rem] p-5 sm:p-7">
        <AnimatePresence mode="wait">
          <motion.div
            key={current.code}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.28 }}
            className="flex min-h-[13rem] flex-col justify-between border border-line bg-void/70 p-5 sm:p-6"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex h-11 w-11 items-center justify-center border border-line bg-panel-2 text-signal">
                <CurrentIcon size={20} aria-hidden="true" />
              </div>
              <span className="font-mono text-[0.6rem] uppercase tracking-[0.12em] text-dim">
                {current.code} / 05
              </span>
            </div>

            <div className="mt-8">
              <p className="font-display text-xl font-bold tracking-[-0.035em] sm:text-2xl">
                {current.title}
              </p>
              <p className="mt-2 text-sm leading-6 text-fog">{current.detail}</p>
              <div className="mt-5 flex items-center gap-2 border-t border-line pt-4">
                <span className="h-1.5 w-1.5 rounded-full bg-signal" />
                <span className="font-mono text-[0.62rem] uppercase tracking-[0.1em] text-fog">
                  {current.state}
                </span>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        <div className="mt-5 flex items-center gap-2" aria-label="Select a system event">
          {events.map((event, index) => (
            <button
              key={event.code}
              onClick={() => setActive(index)}
              className={`min-h-11 flex-1 border transition-colors ${
                index === active
                  ? "border-signal bg-signal text-signal-ink"
                  : "border-line bg-panel text-dim hover:border-dim hover:text-cream"
              }`}
              aria-label={`Show ${event.title}`}
              aria-pressed={index === active}
            >
              <span className="font-mono text-[0.58rem] font-bold">{event.code}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
