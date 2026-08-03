"use client";

import { motion } from "framer-motion";

function Frame({
  label,
  children,
  className = "",
}: {
  label: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`relative flex w-full flex-col overflow-hidden rounded-xl border border-white/10 bg-[#0a0a0b] ${className}`}
    >
      <div className="flex shrink-0 items-center justify-between border-b border-white/10 px-3 py-2.5 sm:px-4">
        <span className="font-mono text-[0.55rem] uppercase tracking-[0.12em] text-white/45 sm:text-[0.62rem]">
          {label}
        </span>
        <span className="font-mono text-[0.52rem] text-signal sm:text-[0.58rem]">Blueprint</span>
      </div>
      <div className="relative min-h-0 flex-1 p-3 sm:p-4">{children}</div>
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_80%_0%,rgba(176,38,255,0.1),transparent_42%)]" />
    </div>
  );
}

export function BlueprintHeroVisual() {
  return (
    <Frame
      label="Blueprint output · preview"
      className="aspect-[16/10] min-h-[13.5rem] sm:min-h-[15rem] lg:min-h-[17rem]"
    >
      <div className="grid h-full min-h-[9.5rem] grid-cols-2 gap-2 sm:gap-3">
        <div className="flex min-h-0 flex-col rounded-lg border border-white/10 bg-white/[0.02] p-2 sm:p-2.5">
          <p className="font-mono text-[0.55rem] text-white/45 sm:text-[0.62rem]">
            Opportunity matrix
          </p>
          <div className="relative mt-2 min-h-[6.5rem] flex-1 rounded border border-white/10 bg-white/[0.02] sm:min-h-[7.5rem]">
            {[
              { x: "72%", y: "22%", label: "Build" },
              { x: "28%", y: "35%", label: "Pilot" },
              { x: "58%", y: "68%", label: "Defer" },
            ].map((dot, index) => (
              <motion.span
                key={dot.label}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2 + index * 0.12 }}
                className="absolute flex h-6 w-6 items-center justify-center rounded-full bg-signal font-mono text-[0.48rem] font-bold text-signal-ink sm:h-7 sm:w-7 sm:text-[0.52rem]"
                style={{ left: dot.x, top: dot.y, transform: "translate(-50%, -50%)" }}
                title={dot.label}
              >
                {index + 1}
              </motion.span>
            ))}
          </div>
        </div>
        <div className="flex min-h-0 flex-col gap-2 sm:gap-2.5">
          <div className="flex flex-1 flex-col rounded-lg border border-white/10 bg-white/[0.02] p-2 sm:p-2.5">
            <p className="font-mono text-[0.55rem] text-white/45 sm:text-[0.62rem]">
              90-day roadmap
            </p>
            <div className="mt-2 flex flex-1 flex-col justify-center space-y-1.5 sm:space-y-2">
              {["Diagnose", "Build v1", "Operate"].map((phase, index) => (
                <motion.div
                  key={phase}
                  initial={{ width: 0 }}
                  animate={{ width: `${55 + index * 18}%` }}
                  transition={{ delay: 0.35 + index * 0.1, duration: 0.5 }}
                  className="h-2 rounded-full bg-signal/70 sm:h-2.5"
                />
              ))}
            </div>
          </div>
          <div className="rounded-lg border border-success/25 bg-success/5 p-2 sm:p-2.5">
            <p className="font-mono text-[0.52rem] text-success sm:text-[0.58rem]">Financial case</p>
            <p className="mt-1 font-mono text-[0.68rem] font-bold text-cream sm:text-xs">High impact</p>
            <p className="font-mono text-[0.48rem] text-white/45 sm:text-[0.55rem]">3 workflows ranked</p>
          </div>
        </div>
      </div>
    </Frame>
  );
}

export function WorkflowMapVisual() {
  const nodes = ["Trigger", "Review", "Approve", "Post"];
  return (
    <Frame label="Workflow map · current state">
      <div className="flex h-full items-center justify-between gap-1">
        {nodes.map((node, index) => (
          <div key={node} className="flex flex-1 items-center">
            <motion.div
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="w-full rounded-lg border border-white/10 bg-white/[0.03] px-1 py-2 text-center"
            >
              <span className="font-mono text-[0.38rem] text-white/55">{node}</span>
            </motion.div>
            {index < nodes.length - 1 && (
              <span className="mx-0.5 text-[0.45rem] text-white/20">→</span>
            )}
          </div>
        ))}
      </div>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="absolute bottom-3 left-3 font-mono text-[0.38rem] text-signal"
      >
        3 hand-offs · 2 exception paths mapped
      </motion.p>
    </Frame>
  );
}

export function OpportunityMatrixVisual() {
  return (
    <Frame label="Opportunity matrix · ranked">
      <div className="grid h-full grid-cols-2 grid-rows-2 gap-1.5">
        {[
          { q: "High impact · Ready", items: ["Exception routing", "Doc intake"], hot: true },
          { q: "High impact · Later", items: ["Forecast layer"], hot: false },
          { q: "Lower · Ready", items: ["FAQ deflection"], hot: false },
          { q: "Defer", items: ["Full autonomy"], hot: false },
        ].map((cell, index) => (
          <motion.div
            key={cell.q}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: index * 0.08 }}
            className={`rounded-lg border p-2 ${
              cell.hot ? "border-signal/40 bg-signal/10" : "border-white/10 bg-white/[0.02]"
            }`}
          >
            <p className="font-mono text-[0.34rem] text-white/35">{cell.q}</p>
            {cell.items.map((item) => (
              <p key={item} className="mt-1 font-mono text-[0.4rem] text-cream">
                {item}
              </p>
            ))}
          </motion.div>
        ))}
      </div>
    </Frame>
  );
}

export function FinancialCaseVisual() {
  return (
    <Frame label="Financial case · assumptions visible">
      <div className="grid grid-cols-3 gap-2">
        {[
          { label: "Leakage level", value: "High" },
          { label: "Impact tier", value: "Strong" },
          { label: "Time to value", value: "4–7 mo" },
        ].map((item, index) => (
          <motion.div
            key={item.label}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="rounded-lg border border-white/10 bg-white/[0.03] p-2 text-center"
          >
            <p className="font-mono text-[0.34rem] text-white/35">{item.label}</p>
            <p className="font-mono text-[0.52rem] font-bold text-cream">{item.value}</p>
          </motion.div>
        ))}
      </div>
      <div className="mt-3 flex h-16 items-end gap-1">
        {[65, 48, 38, 28].map((h, index) => (
          <motion.div
            key={index}
            initial={{ height: 0 }}
            animate={{ height: `${h}%` }}
            transition={{ delay: 0.3 + index * 0.08 }}
            className={`flex-1 rounded-t ${index === 3 ? "bg-signal" : "bg-white/15"}`}
          />
        ))}
      </div>
    </Frame>
  );
}

export function ArchitectureVisual() {
  const layers = ["Experience", "Workflow", "AI + rules", "Data", "Integrations"];
  return (
    <Frame label="System architecture · proposed">
      <div className="flex h-full flex-col justify-center gap-1.5">
        {layers.map((layer, index) => (
          <motion.div
            key={layer}
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.08 }}
            className={`rounded-md border px-2 py-1.5 ${
              layer.includes("AI")
                ? "border-signal/40 bg-signal/10"
                : "border-white/10 bg-white/[0.03]"
            }`}
            style={{ marginLeft: `${index * 4}%`, width: `${100 - index * 4}%` }}
          >
            <span className="font-mono text-[0.4rem] text-white/60">{layer}</span>
          </motion.div>
        ))}
      </div>
    </Frame>
  );
}

export function RiskControlVisual() {
  return (
    <Frame label="Risk & control · boundaries">
      <div className="space-y-2">
        {[
          { action: "Read CRM + docs", status: "Auto", ok: true },
          { action: "Draft response", status: "Auto", ok: true },
          { action: "Change payment", status: "Approval", ok: false },
          { action: "Policy exception", status: "Escalate", ok: false },
        ].map((row, index) => (
          <motion.div
            key={row.action}
            initial={{ opacity: 0, x: -6 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.08 }}
            className="flex items-center justify-between rounded-lg border border-white/10 bg-white/[0.02] px-2 py-1.5"
          >
            <span className="font-mono text-[0.42rem] text-white/55">{row.action}</span>
            <span
              className={`rounded px-1.5 py-0.5 font-mono text-[0.36rem] ${
                row.ok ? "bg-success/15 text-success" : "bg-signal/15 text-signal"
              }`}
            >
              {row.status}
            </span>
          </motion.div>
        ))}
      </div>
    </Frame>
  );
}

export function RoadmapVisual() {
  const weeks = [
    { label: "Wk 1–2", task: "Blueprint + design" },
    { label: "Wk 3–6", task: "Build + integrate" },
    { label: "Wk 7–10", task: "Pilot + measure" },
    { label: "Wk 11–12", task: "Operate + expand" },
  ];
  return (
    <Frame label="90-day roadmap · sequenced">
      <div className="space-y-2">
        {weeks.map((week, index) => (
          <motion.div
            key={week.label}
            initial={{ opacity: 0, x: 8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="flex items-center gap-2"
          >
            <span className="w-12 shrink-0 font-mono text-[0.38rem] text-signal">{week.label}</span>
            <div className="h-px flex-1 bg-white/10" />
            <span className="font-mono text-[0.4rem] text-white/55">{week.task}</span>
          </motion.div>
        ))}
      </div>
    </Frame>
  );
}

export function BlueprintProcessVisual() {
  const steps = ["Context", "Observe", "Score", "Recommend"];
  return (
    <Frame label="Blueprint · 7–10 day process">
      <div className="flex h-full flex-col justify-center">
        <div className="flex items-center justify-between">
          {steps.map((step, index) => (
            <div key={step} className="flex flex-col items-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: index * 0.12 }}
                className="flex h-8 w-8 items-center justify-center rounded-full border border-signal bg-signal/15 font-mono text-[0.42rem] text-signal"
              >
                {index + 1}
              </motion.div>
              <span className="mt-1.5 font-mono text-[0.36rem] text-white/40">{step}</span>
            </div>
          ))}
        </div>
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="mx-4 mt-4 origin-left border-t border-dashed border-signal/40 pt-3"
        >
          <p className="text-center font-mono text-[0.4rem] text-white/45">
            Executive readout · ranked opportunities · build recommendation
          </p>
        </motion.div>
      </div>
    </Frame>
  );
}

const blueprintVisualMap: Record<string, React.ComponentType> = {
  "workflow-map": WorkflowMapVisual,
  "opportunity-matrix": OpportunityMatrixVisual,
  "financial-case": FinancialCaseVisual,
  architecture: ArchitectureVisual,
  "risk-control": RiskControlVisual,
  roadmap: RoadmapVisual,
};

export function BlueprintDeliverableVisual({ visualKey }: { visualKey: string }) {
  const Visual = blueprintVisualMap[visualKey] ?? WorkflowMapVisual;
  return <Visual />;
}

export function getBlueprintVisualKey(title: string): string {
  const map: Record<string, string> = {
    "Current-state workflow map": "workflow-map",
    "Opportunity matrix": "opportunity-matrix",
    "Financial case": "financial-case",
    "System architecture": "architecture",
    "Risk and control plan": "risk-control",
    "90-day roadmap": "roadmap",
  };
  return map[title] ?? "workflow-map";
}
