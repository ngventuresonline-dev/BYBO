"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import {
  AgentsMock,
  IntegrationsMock,
  IntelligenceMock,
  KnowledgeMock,
  PlatformsMock,
} from "@/components/platform-stage/PlatformStageMocks";

const pillars = [
  {
    id: "platforms",
    title: "Custom AI Platforms",
    href: "/systems/custom-ai-platforms",
    Mock: PlatformsMock,
  },
  {
    id: "agents",
    title: "Agentic Operations",
    href: "/systems/agentic-operations",
    Mock: AgentsMock,
  },
  {
    id: "knowledge",
    title: "Enterprise Knowledge Systems",
    href: "/systems/enterprise-knowledge-systems",
    Mock: KnowledgeMock,
  },
  {
    id: "intelligence",
    title: "Decision Intelligence",
    href: "/systems/decision-intelligence",
    Mock: IntelligenceMock,
  },
  {
    id: "integrations",
    title: "Integrations to the tools you already use",
    href: "/systems",
    Mock: IntegrationsMock,
  },
] as const;

const ROTATE_MS = 6800;

export function HomePlatformStage() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [inView, setInView] = useState(false);
  const [progress, setProgress] = useState(0);
  const rootRef = useRef<HTMLDivElement>(null);
  const reduceMotionRef = useRef(false);

  useEffect(() => {
    reduceMotionRef.current = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
  }, []);

  useEffect(() => {
    const node = rootRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0.15, rootMargin: "80px 0px" },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!inView || paused || reduceMotionRef.current) {
      setProgress(0);
      return;
    }

    const started = Date.now();
    let tick = 0;

    tick = window.setInterval(() => {
      const elapsed = Date.now() - started;
      setProgress(Math.min(elapsed / ROTATE_MS, 1));
      if (elapsed >= ROTATE_MS) {
        window.clearInterval(tick);
        setActiveIndex((current) => (current + 1) % pillars.length);
      }
    }, 40);

    return () => window.clearInterval(tick);
  }, [inView, paused, activeIndex]);

  const active = pillars[activeIndex];
  const ActiveMock = active.Mock;

  return (
    <section
      ref={rootRef}
      className="platform-stage home-section border-b border-surface-line bg-surface text-surface-ink"
    >
      <div className="section-shell">
        <div className="mb-8 flex flex-col justify-between gap-5 lg:mb-10 lg:flex-row lg:items-end">
          <div className="max-w-2xl">
            <p className="eyebrow text-surface-muted">What we build</p>
            <h2 className="section-title mt-5 text-surface-ink">
              Build what off-the-shelf software cannot.
            </h2>
          </div>
          <Link
            href="/how-we-work"
            className="inline-flex min-h-11 items-center gap-2 font-mono text-[0.62rem] font-semibold uppercase tracking-[0.12em] text-surface-ink transition-colors hover:text-signal"
          >
            See how BYBO works
          </Link>
        </div>

        <div className="platform-stage__grid min-w-0">
          <nav
            className="platform-stage__nav"
            role="tablist"
            aria-label="BYBO platform capabilities"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
            onFocusCapture={() => setPaused(true)}
            onBlurCapture={(event) => {
              if (!event.currentTarget.contains(event.relatedTarget as Node)) {
                setPaused(false);
              }
            }}
          >
            {pillars.map((pillar, index) => {
              const selected = index === activeIndex;
              return (
                <button
                  key={pillar.id}
                  type="button"
                  role="tab"
                  aria-selected={selected}
                  aria-controls={`platform-panel-${pillar.id}`}
                  onClick={() => {
                    setActiveIndex(index);
                    setProgress(0);
                  }}
                  className={`platform-stage__tab ${selected ? "platform-stage__tab--active" : ""}`}
                >
                  <span className="platform-stage__tab-copy">{pillar.title}</span>
                  <ArrowUpRight
                    size={14}
                    className="platform-stage__tab-arrow"
                    aria-hidden="true"
                  />
                  {selected && !reduceMotionRef.current && inView && !paused && (
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

          <div
            id={`platform-panel-${active.id}`}
            role="tabpanel"
            className="platform-stage__panel"
            aria-live="polite"
          >
            <div className="platform-stage__panel-glow" aria-hidden="true" />
            <div key={active.id} className="platform-stage__mock platform-stage__mock--enter">
              <ActiveMock active={inView} />
            </div>
            <div className="platform-stage__panel-footer">
              <Link
                href={active.href}
                className="inline-flex items-center gap-2 font-mono text-[0.58rem] font-semibold uppercase tracking-[0.12em] text-surface-muted transition-colors hover:text-signal"
              >
                Explore this system
                <ArrowUpRight size={12} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
