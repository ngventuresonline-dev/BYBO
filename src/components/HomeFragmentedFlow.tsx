"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { ArrowUpRight } from "lucide-react";

const fragmentedNodes = [
  { id: "crm", label: "CRM", x: 12, y: 18 },
  { id: "erp", label: "ERP", x: 78, y: 14 },
  { id: "inbox", label: "Inbox", x: 86, y: 52 },
  { id: "sheets", label: "Sheets", x: 18, y: 72 },
  { id: "chat", label: "WhatsApp", x: 52, y: 82 },
] as const;

const unifiedNodes = [
  { id: "signal", label: "Signal", x: 14, y: 42 },
  { id: "bybo", label: "BYBO layer", x: 50, y: 42 },
  { id: "action", label: "Action", x: 86, y: 42 },
] as const;

export function HomeFragmentedFlow() {
  const [mode, setMode] = useState<"fragmented" | "unified">("fragmented");
  const [inView, setInView] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = rootRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0.2 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!inView) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const timer = window.setInterval(() => {
      setMode((current) => (current === "fragmented" ? "unified" : "fragmented"));
    }, 5200);

    return () => window.clearInterval(timer);
  }, [inView]);

  return (
    <section
      ref={rootRef}
      className="fragmented-flow home-section border-b border-line bg-void"
    >
      <div className="section-shell">
        <div className="mx-auto max-w-3xl text-center">
          <p className="eyebrow justify-center">Before BYBO</p>
          <h2 className="section-title mx-auto mt-5 title-wide">
            Tools that never spoke
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-sm leading-6 text-fog">
            This is what five separate tools to resolve one customer exception
            looks like.
          </p>
        </div>

        <div className="mt-8 flex justify-center gap-2">
          <button
            type="button"
            onClick={() => setMode("fragmented")}
            className={`fragmented-flow__toggle ${mode === "fragmented" ? "fragmented-flow__toggle--active" : ""}`}
            aria-pressed={mode === "fragmented"}
          >
            Fragmented
          </button>
          <button
            type="button"
            onClick={() => setMode("unified")}
            className={`fragmented-flow__toggle ${mode === "unified" ? "fragmented-flow__toggle--active" : ""}`}
            aria-pressed={mode === "unified"}
          >
            Unified with BYBO
          </button>
        </div>

        <div
          className={`fragmented-flow__canvas mt-8 ${mode === "unified" ? "fragmented-flow__canvas--unified" : ""}`}
        >
          <svg
            viewBox="0 0 100 100"
            className="fragmented-flow__svg"
            aria-hidden="true"
          >
            {mode === "fragmented" ? (
              <>
                <path
                  d="M18 22 C35 8, 55 10, 72 18"
                  className="fragmented-flow__line fragmented-flow__line--a"
                />
                <path
                  d="M72 18 C88 30, 90 45, 84 52"
                  className="fragmented-flow__line fragmented-flow__line--b"
                />
                <path
                  d="M84 52 C78 68, 62 78, 52 80"
                  className="fragmented-flow__line fragmented-flow__line--c"
                />
                <path
                  d="M52 80 C38 84, 24 78, 20 72"
                  className="fragmented-flow__line fragmented-flow__line--d"
                />
                <path
                  d="M20 72 C10 58, 8 38, 18 22"
                  className="fragmented-flow__line fragmented-flow__line--e"
                />
                <path
                  d="M18 22 C30 40, 42 55, 52 80"
                  className="fragmented-flow__line fragmented-flow__line--f"
                />
              </>
            ) : (
              <>
                <path
                  d="M18 42 H82"
                  className="fragmented-flow__line fragmented-flow__line--unified"
                />
                <path
                  d="M50 42 V58"
                  className="fragmented-flow__line fragmented-flow__line--unified fragmented-flow__line--pulse"
                />
              </>
            )}
          </svg>

          {(mode === "fragmented" ? fragmentedNodes : unifiedNodes).map((node) => (
            <div
              key={node.id}
              className={`fragmented-flow__node ${node.id === "bybo" ? "fragmented-flow__node--core" : ""}`}
              style={{ left: `${node.x}%`, top: `${node.y}%` }}
            >
              <span>{node.label}</span>
            </div>
          ))}

          <div className="fragmented-flow__caption">
            {mode === "fragmented" ? (
              <p className="text-xs leading-5 text-fog">
                Context copied manually. Approvals chased across channels. No
                single owner.
              </p>
            ) : (
              <p className="text-xs leading-5 text-fog">
                One signal path. Policy, sources, and human approval visible end
                to end.
              </p>
            )}
          </div>
        </div>

        <div className="mt-8 flex justify-center">
          <Link href="/how-we-work" className="ghost-button">
            See how BYBO connects the stack
            <ArrowUpRight size={13} />
          </Link>
        </div>
      </div>
    </section>
  );
}
