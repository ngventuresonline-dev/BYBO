"use client";

import { motion } from "framer-motion";

function Frame({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="overflow-hidden rounded-[1.2rem] border border-line bg-[#0a0a0b] shadow-[0_24px_80px_rgba(0,0,0,0.35)]">
      <div className="border-b border-white/10 px-4 py-2.5 font-mono text-[0.5rem] uppercase tracking-[0.14em] text-white/35">
        {label}
      </div>
      <div className="p-4 sm:p-5">{children}</div>
    </div>
  );
}

export function PilotVsSystemVisual() {
  return (
    <Frame label="Pilot vs operating system">
      <div className="grid gap-3 sm:grid-cols-2">
        <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
          <p className="font-mono text-[0.48rem] uppercase tracking-[0.12em] text-dim">
            Typical pilot
          </p>
          <ul className="mt-3 space-y-2 text-xs leading-5 text-fog">
            {[
              "Happy-path demo only",
              "No named owner",
              "No baseline metrics",
              "Escalation undefined",
            ].map((item) => (
              <li key={item} className="flex gap-2">
                <span className="text-signal">—</span>
                {item}
              </li>
            ))}
          </ul>
        </div>
        <div className="rounded-xl border border-signal/35 bg-signal/10 p-4">
          <p className="font-mono text-[0.48rem] uppercase tracking-[0.12em] text-signal">
            Operating system
          </p>
          <ul className="mt-3 space-y-2 text-xs leading-5 text-cream/85">
            {[
              "Exceptions mapped",
              "Accountable owner",
              "ROI vs baseline",
              "Human approval paths",
            ].map((item) => (
              <li key={item} className="flex gap-2">
                <span className="text-success">✓</span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Frame>
  );
}

export function OpportunityMatrixVisual() {
  const cells = [
    { label: "Build first", score: "High impact · Ready", tone: "signal" },
    { label: "Blueprint next", score: "High impact · Gaps", tone: "neutral" },
    { label: "Defer", score: "Low frequency", tone: "neutral" },
    { label: "Do not automate", score: "High risk", tone: "warn" },
  ];

  return (
    <Frame label="Opportunity matrix · example scoring">
      <div className="grid grid-cols-2 gap-2">
        {cells.map((cell, index) => (
          <motion.div
            key={cell.label}
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.08 }}
            className={`rounded-lg border p-3 ${
              cell.tone === "signal"
                ? "border-signal/40 bg-signal/12"
                : cell.tone === "warn"
                  ? "border-white/15 bg-white/[0.03]"
                  : "border-white/10 bg-white/[0.02]"
            }`}
          >
            <p className="font-display text-sm font-bold text-cream">{cell.label}</p>
            <p className="mt-1 font-mono text-[0.45rem] uppercase tracking-[0.1em] text-dim">
              {cell.score}
            </p>
          </motion.div>
        ))}
      </div>
      <div className="mt-4 grid grid-cols-4 gap-1.5">
        {["Impact", "Frequency", "Readiness", "Risk"].map((axis) => (
          <div
            key={axis}
            className="rounded-md border border-white/10 px-2 py-2 text-center font-mono text-[0.42rem] uppercase tracking-[0.08em] text-white/45"
          >
            {axis}
          </div>
        ))}
      </div>
    </Frame>
  );
}

export function ScoringGridVisual() {
  const rows = [
    { workflow: "Order exception recovery", impact: 9, ready: 7, risk: 3 },
    { workflow: "Policy Q&A for staff", impact: 6, ready: 8, risk: 4 },
    { workflow: "Full autonomous pricing", impact: 8, ready: 2, risk: 9 },
  ];

  return (
    <Frame label="Sample scores · 1–10 scale">
      <div className="space-y-2">
        {rows.map((row, index) => (
          <motion.div
            key={row.workflow}
            initial={{ opacity: 0, x: -8 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="rounded-lg border border-white/10 bg-white/[0.02] p-3"
          >
            <p className="text-xs font-semibold text-cream">{row.workflow}</p>
            <div className="mt-2 grid grid-cols-3 gap-2">
              {[
                { label: "Impact", value: row.impact },
                { label: "Ready", value: row.ready },
                { label: "Risk", value: row.risk },
              ].map((metric) => (
                <div key={metric.label}>
                  <div className="flex justify-between font-mono text-[0.4rem] uppercase text-dim">
                    <span>{metric.label}</span>
                    <span className="text-signal">{metric.value}</span>
                  </div>
                  <div className="mt-1 h-1 overflow-hidden rounded-full bg-white/10">
                    <div
                      className="h-full rounded-full bg-signal"
                      style={{ width: `${metric.value * 10}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </Frame>
  );
}

export function EscalationFlowVisual() {
  const steps = [
    { label: "Customer query", type: "auto" },
    { label: "Retrieve policy", type: "auto" },
    { label: "Confidence check", type: "gate" },
    { label: "Human review", type: "human" },
    { label: "Send response", type: "auto" },
  ];

  return (
    <Frame label="Escalation flow · product design">
      <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:items-center">
        {steps.map((step, index) => (
          <div key={step.label} className="flex items-center gap-2">
            <div
              className={`rounded-lg border px-3 py-2 ${
                step.type === "human"
                  ? "border-signal/40 bg-signal/10"
                  : step.type === "gate"
                    ? "border-success/35 bg-success/10"
                    : "border-white/10 bg-white/[0.03]"
              }`}
            >
              <p className="font-mono text-[0.42rem] uppercase tracking-[0.08em] text-dim">
                {step.type === "human" ? "Approval" : step.type === "gate" ? "Gate" : "System"}
              </p>
              <p className="mt-0.5 text-xs font-semibold text-cream">{step.label}</p>
            </div>
            {index < steps.length - 1 && (
              <span className="hidden font-mono text-signal sm:inline">→</span>
            )}
          </div>
        ))}
      </div>
    </Frame>
  );
}

export function GovernanceStackVisual() {
  const layers = [
    "Access & permissions",
    "Source citations",
    "Versioned knowledge",
    "Audit logs",
    "Incident response",
  ];

  return (
    <Frame label="Governance stack">
      <div className="space-y-2">
        {layers.map((layer, index) => (
          <motion.div
            key={layer}
            initial={{ opacity: 0, y: 6 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.07 }}
            className="flex items-center gap-3 rounded-lg border border-white/10 bg-white/[0.03] px-3 py-2.5"
            style={{ marginLeft: `${index * 4}px` }}
          >
            <span className="font-mono text-[0.45rem] text-signal">0{index + 1}</span>
            <span className="text-xs text-cream">{layer}</span>
          </motion.div>
        ))}
      </div>
    </Frame>
  );
}

export const insightVisualMap = {
  "pilot-vs-system": PilotVsSystemVisual,
  "opportunity-matrix": OpportunityMatrixVisual,
  "scoring-grid": ScoringGridVisual,
  "escalation-flow": EscalationFlowVisual,
  "governance-stack": GovernanceStackVisual,
} as const;

export type InsightVisualKey = keyof typeof insightVisualMap;
