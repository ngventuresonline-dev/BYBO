"use client";

import type { ReactNode } from "react";
import { useEffect, useRef, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

export type VisualTabItem = {
  id: string;
  label: string;
  headline: string;
  detail?: string;
  href?: string;
  linkLabel?: string;
  panel: ReactNode;
};

type VisualTabStageProps = {
  eyebrow: string;
  title: string;
  subtitle?: string;
  tabs: VisualTabItem[];
  tone?: "dark" | "light";
  rotateMs?: number;
};

export function VisualTabStage({
  eyebrow,
  title,
  subtitle,
  tabs,
  tone = "dark",
  rotateMs = 7000,
}: VisualTabStageProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [inView, setInView] = useState(false);
  const [progress, setProgress] = useState(0);
  const rootRef = useRef<HTMLDivElement>(null);
  const isLight = tone === "light";

  useEffect(() => {
    const node = rootRef.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0.12 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!inView || paused) {
      setProgress(0);
      return;
    }
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const started = Date.now();
    let tick = 0;
    tick = window.setInterval(() => {
      const elapsed = Date.now() - started;
      setProgress(Math.min(elapsed / rotateMs, 1));
      if (elapsed >= rotateMs) {
        window.clearInterval(tick);
        setActiveIndex((current) => (current + 1) % tabs.length);
      }
    }, 40);
    return () => window.clearInterval(tick);
  }, [inView, paused, activeIndex, rotateMs, tabs.length]);

  const active = tabs[activeIndex];

  return (
    <section
      ref={rootRef}
      className={`visual-tab-stage home-section border-b ${
        isLight
          ? "border-surface-line bg-surface text-surface-ink"
          : "border-line bg-void"
      }`}
    >
      <div className="section-shell">
        <div className="mb-8 max-w-2xl lg:mb-10">
          <p className={`eyebrow ${isLight ? "text-surface-muted" : ""}`}>{eyebrow}</p>
          <h2
            className={`section-title mt-5 ${isLight ? "text-surface-ink" : ""}`}
          >
            {title}
          </h2>
          {subtitle && (
            <p
              className={`mt-4 text-sm leading-6 ${
                isLight ? "text-surface-muted" : "text-fog"
              }`}
            >
              {subtitle}
            </p>
          )}
        </div>

        <div
          className="platform-stage__grid min-w-0"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <nav
            className="platform-stage__nav"
            role="tablist"
            aria-label={title}
          >
            {tabs.map((tab, index) => {
              const selected = index === activeIndex;
              return (
                <button
                  key={tab.id}
                  type="button"
                  role="tab"
                  aria-selected={selected}
                  onClick={() => {
                    setActiveIndex(index);
                    setProgress(0);
                  }}
                  className={`platform-stage__tab ${selected ? "platform-stage__tab--active" : ""}`}
                >
                  <span className="platform-stage__tab-copy">{tab.label}</span>
                  <ArrowUpRight
                    size={14}
                    className="platform-stage__tab-arrow"
                    aria-hidden="true"
                  />
                  {selected && inView && !paused && (
                    <span
                      className="platform-stage__progress"
                      style={{ transform: `scaleX(${progress})` }}
                      aria-hidden="true"
                    />
                  )}
                </button>
              );
            })}
          </nav>

          <div role="tabpanel" className="platform-stage__panel">
            <div className="platform-stage__panel-glow" aria-hidden="true" />
            <div key={active.id} className="platform-stage__mock platform-stage__mock--enter">
              <div className="px-1 pb-1 pt-0">
                <p className="font-display text-lg font-bold tracking-[-0.03em] text-surface-ink sm:text-xl">
                  {active.headline}
                </p>
                {active.detail && (
                  <p className="mt-2 max-w-lg text-sm leading-6 text-surface-muted">
                    {active.detail}
                  </p>
                )}
              </div>
              <div className="mt-4">{active.panel}</div>
              {active.href && active.linkLabel && (
                <div className="platform-stage__panel-footer">
                  <Link
                    href={active.href}
                    className="inline-flex items-center gap-2 font-mono text-[0.58rem] font-semibold uppercase tracking-[0.12em] text-surface-muted transition-colors hover:text-signal"
                  >
                    {active.linkLabel}
                    <ArrowUpRight size={12} />
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
