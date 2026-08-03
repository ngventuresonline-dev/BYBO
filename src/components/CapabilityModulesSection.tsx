"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import { ModuleCapabilityVisual } from "@/components/capability-visuals/ModuleCapabilityVisual";
import { moduleVisualKey } from "@/lib/module-visuals";

type Module = {
  title: string;
  description: string;
};

type Props = {
  modules: Module[];
};

function ModuleDetail({ module, index }: { module: Module; index: number }) {
  const visualKey = moduleVisualKey(module.title);

  return (
    <div>
      <ModuleCapabilityVisual visualKey={visualKey} title={module.title} />
      <h3 className="mt-6 font-display text-2xl font-bold tracking-[-0.04em] text-surface-ink">
        {module.title}
      </h3>
      <p className="mt-3 max-w-xl text-sm leading-7 text-surface-muted">
        {module.description}
      </p>
      <p className="mt-4 font-mono text-[0.48rem] uppercase tracking-[0.12em] text-surface-muted/70">
        Module / 0{index + 1} · {visualKey.replace(/-/g, " ")}
      </p>
    </div>
  );
}

function ModuleButton({
  module,
  index,
  active,
  onSelect,
  expanded,
}: {
  module: Module;
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
      aria-expanded={isActive}
      className={`group flex min-h-[4.5rem] w-full items-center justify-between gap-4 px-5 text-left transition-colors sm:px-6 ${
        isActive
          ? "bg-surface-ink text-surface"
          : "text-surface-muted hover:bg-surface-2 hover:text-surface-ink"
      }`}
    >
      <span className="flex items-center gap-4">
        <span
          className={`font-mono text-[0.62rem] font-semibold ${
            isActive ? "text-signal" : "text-surface-muted/60"
          }`}
        >
          /0{index + 1}
        </span>
        <span className="font-display text-base font-bold tracking-[-0.025em] sm:text-lg">
          {module.title}
        </span>
      </span>
      <ChevronRight
        size={16}
        className={`shrink-0 transition-transform ${
          isActive && expanded ? "rotate-90" : isActive ? "text-signal" : "text-surface-muted/40"
        }`}
      />
    </button>
  );
}

export function CapabilityModulesSection({ modules }: Props) {
  const [active, setActive] = useState(0);
  const rowRefs = useRef<(HTMLDivElement | null)[]>([]);
  const skipInitialScrollRef = useRef(true);

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
    <div className="mt-14 overflow-hidden rounded-[1.4rem] border border-surface-line bg-surface shadow-[0_24px_80px_rgba(17,17,15,0.06)]">
      {/* Desktop */}
      <div className="hidden lg:grid lg:grid-cols-[0.42fr_0.58fr]">
        <div className="border-r border-surface-line">
          {modules.map((module, index) => (
            <div key={module.title} className="border-b border-surface-line last:border-b-0">
              <ModuleButton
                module={module}
                index={index}
                active={active}
                onSelect={setActive}
              />
            </div>
          ))}
        </div>

        <div className="p-8 xl:p-10">
          <AnimatePresence mode="wait">
            <motion.div
              key={modules[active].title}
              initial={{ opacity: 0, x: 12 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -8 }}
              transition={{ duration: 0.28 }}
            >
              <ModuleDetail module={modules[active]} index={active} />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Mobile accordion with inline visual */}
      <div className="lg:hidden">
        {modules.map((module, index) => {
          const isActive = active === index;
          return (
            <div
              key={module.title}
              ref={(node) => {
                rowRefs.current[index] = node;
              }}
              className="border-b border-surface-line last:border-b-0"
            >
              <ModuleButton
                module={module}
                index={index}
                active={active}
                onSelect={setActive}
                expanded
              />
              <AnimatePresence initial={false}>
                {isActive && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                    className="overflow-hidden"
                  >
                    <div className="border-t border-surface-line bg-surface-2/50 px-5 py-6 sm:px-6">
                      <ModuleDetail module={module} index={index} />
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
