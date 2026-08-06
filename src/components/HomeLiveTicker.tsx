"use client";

import { useEffect, useRef, useState } from "react";

const tickerItems = [
  { label: "Workflows routed", base: 12840, rate: 0.34 },
  { label: "Approvals logged", base: 5620, rate: 0.18 },
  { label: "Sources cited", base: 94100, rate: 1.2 },
  { label: "Exceptions resolved", base: 3180, rate: 0.11 },
  { label: "Policies enforced", base: 22400, rate: 0.42 },
  { label: "Agent actions", base: 487000, rate: 2.8 },
] as const;

function formatCount(value: number) {
  if (value >= 1_000_000) return `${(value / 1_000_000).toFixed(2)}M`;
  if (value >= 10_000) return `${Math.round(value / 1000)}K`;
  return value.toLocaleString("en-IN");
}

export function HomeLiveTicker() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [counts, setCounts] = useState<number[]>(() =>
    tickerItems.map((item) => item.base),
  );
  const rootRef = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  const startRef = useRef(Date.now());

  useEffect(() => {
    const node = rootRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0.05 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!inView) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const rotateTimer = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % tickerItems.length);
    }, 3200);

    const tickTimer = window.setInterval(() => {
      const elapsed = (Date.now() - startRef.current) / 1000;
      setCounts(
        tickerItems.map((item) =>
          Math.floor(item.base + elapsed * item.rate * 60),
        ),
      );
    }, 120);

    return () => {
      window.clearInterval(rotateTimer);
      window.clearInterval(tickTimer);
    };
  }, [inView]);

  const active = tickerItems[activeIndex];

  return (
    <section
      ref={rootRef}
      className="home-live-ticker home-section border-b border-line/70 bg-void"
      aria-live="polite"
    >
      <div className="page-shell py-4 sm:py-5">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-mono text-[0.58rem] font-semibold uppercase tracking-[0.18em] text-dim">
            Systems in motion today
          </p>

          <div className="flex min-w-0 flex-1 flex-col gap-3 sm:max-w-xl sm:items-end">
            <div className="flex min-w-0 items-baseline gap-3 sm:justify-end">
              <span className="home-live-ticker__value tabular-nums">
                {formatCount(counts[activeIndex])}
              </span>
              <span className="font-mono text-[0.62rem] uppercase tracking-[0.14em] text-fog">
                {active.label}
              </span>
            </div>

            <div
              className="flex w-full flex-wrap gap-1.5 sm:justify-end"
              role="tablist"
              aria-label="Live system activity metrics"
            >
              {tickerItems.map((item, index) => {
                const selected = index === activeIndex;
                return (
                  <button
                    key={item.label}
                    type="button"
                    role="tab"
                    aria-selected={selected}
                    onClick={() => setActiveIndex(index)}
                    className={`home-live-ticker__pill ${selected ? "home-live-ticker__pill--active" : ""}`}
                  >
                    <span className="tabular-nums">{formatCount(counts[index])}</span>
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
