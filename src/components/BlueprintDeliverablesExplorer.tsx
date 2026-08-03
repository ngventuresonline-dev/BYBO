"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  BarChart3,
  Blocks,
  ChevronRight,
  FileSearch,
  Gauge,
  Map,
  ShieldCheck,
} from "lucide-react";
import {
  BlueprintDeliverableVisual,
  getBlueprintVisualKey,
} from "@/components/page-visuals/BlueprintVisuals";

type Deliverable = {
  title: string;
  text: string;
};

const deliverableIcons = {
  "Current-state workflow map": Map,
  "Opportunity matrix": Gauge,
  "Financial case": BarChart3,
  "System architecture": Blocks,
  "Risk and control plan": ShieldCheck,
  "90-day roadmap": FileSearch,
} as const;

function DeliverableDetail({
  item,
  index,
}: {
  item: Deliverable;
  index: number;
}) {
  const Icon = deliverableIcons[item.title as keyof typeof deliverableIcons] ?? Map;

  return (
    <div>
      <BlueprintDeliverableVisual visualKey={getBlueprintVisualKey(item.title)} />
      <div className="mt-2 flex items-center gap-2">
        <Icon size={18} className="text-signal" />
        <span className="font-mono text-[0.48rem] uppercase tracking-[0.12em] text-dim">
          Deliverable / 0{index + 1}
        </span>
      </div>
      <h3 className="mt-4 font-display text-2xl font-bold tracking-[-0.04em]">
        {item.title}
      </h3>
      <p className="mt-3 max-w-xl text-sm leading-7 text-fog">{item.text}</p>
    </div>
  );
}

type Props = {
  deliverables: Deliverable[];
};

export function BlueprintDeliverablesExplorer({ deliverables }: Props) {
  const [active, setActive] = useState(0);
  const skipInitialScrollRef = useRef(true);
  const rowRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const isMobile = window.matchMedia("(max-width: 1023px)").matches;
    if (!isMobile) return;
    if (skipInitialScrollRef.current) {
      skipInitialScrollRef.current = false;
      return;
    }
    rowRefs.current[active]?.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }, [active]);

  return (
    <div className="overflow-hidden rounded-[1.4rem] border border-line bg-panel">
      <div className="hidden lg:grid lg:grid-cols-[0.4fr_0.6fr]">
        <div className="border-r border-line">
          {deliverables.map((item, index) => (
            <button
              key={item.title}
              type="button"
              onClick={() => setActive(index)}
              className={`flex min-h-[4.5rem] w-full items-center justify-between gap-3 border-b border-line px-6 text-left last:border-b-0 ${
                active === index
                  ? "bg-signal text-signal-ink"
                  : "text-fog hover:bg-panel-2 hover:text-cream"
              }`}
            >
              <span className="flex items-center gap-3">
                <span
                  className={`font-mono text-[0.58rem] ${
                    active === index ? "signal-surface-subtle" : "text-dim"
                  }`}
                >
                  /0{index + 1}
                </span>
                <span className="font-display text-sm font-bold">{item.title}</span>
              </span>
              <ChevronRight size={15} />
            </button>
          ))}
        </div>
        <div className="p-8 xl:p-10">
          <AnimatePresence mode="wait">
            <motion.div
              key={deliverables[active].title}
              initial={{ opacity: 0, x: 12 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -8 }}
              transition={{ duration: 0.28 }}
            >
              <DeliverableDetail item={deliverables[active]} index={active} />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      <div className="lg:hidden">
        {deliverables.map((item, index) => {
          const isActive = active === index;
          return (
            <div
              key={item.title}
              ref={(node) => {
                rowRefs.current[index] = node;
              }}
              className="border-b border-line last:border-b-0"
            >
              <button
                type="button"
                onClick={() => setActive(index)}
                className={`flex min-h-[4.5rem] w-full items-center justify-between gap-3 px-5 text-left sm:px-6 ${
                  isActive ? "bg-signal text-signal-ink" : "text-fog"
                }`}
              >
                <span className="flex items-center gap-3">
                  <span
                    className={`font-mono text-[0.58rem] ${
                      isActive ? "signal-surface-subtle" : "text-dim"
                    }`}
                  >
                    /0{index + 1}
                  </span>
                  <span className="font-display text-sm font-bold">{item.title}</span>
                </span>
                <ChevronRight
                  size={15}
                  className={isActive ? "rotate-90" : undefined}
                />
              </button>
              <AnimatePresence initial={false}>
                {isActive && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="border-t border-line bg-void/40 px-5 py-6 sm:px-6">
                      <DeliverableDetail item={item} index={index} />
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
