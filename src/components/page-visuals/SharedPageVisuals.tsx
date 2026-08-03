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
    <div className="relative overflow-hidden rounded-xl border border-white/10 bg-[#0a0a0b]">
      <div className="border-b border-white/10 px-3 py-2 font-mono text-[0.48rem] uppercase tracking-[0.14em] text-white/35">
        {label}
      </div>
      <div className="p-4">{children}</div>
    </div>
  );
}

export function EngagementTimelineVisual() {
  const stages = [
    { name: "Diagnose", days: "7–10d", active: true },
    { name: "Deploy", days: "6–12w", active: false },
    { name: "Operate", days: "Ongoing", active: false },
    { name: "Expand", days: "Quarterly", active: false },
  ];

  return (
    <Frame label="Engagement · end to end">
      <div className="grid gap-2 sm:grid-cols-4">
        {stages.map((stage, index) => (
          <motion.div
            key={stage.name}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`rounded-lg border p-3 ${
              stage.active
                ? "border-signal/40 bg-signal/10"
                : "border-white/10 bg-white/[0.02]"
            }`}
          >
            <p className="font-mono text-[0.38rem] text-white/35">{stage.days}</p>
            <p className="mt-1 font-display text-sm font-bold text-cream">{stage.name}</p>
          </motion.div>
        ))}
      </div>
    </Frame>
  );
}

export function ApplyFlowVisual() {
  const steps = [
    { label: "Submit workflow", detail: "2 min form" },
    { label: "Qualification call", detail: "30–45 min" },
    { label: "Blueprint if justified", detail: "7–10 days" },
  ];

  return (
    <Frame label="What happens next">
      <div className="space-y-3">
        {steps.map((step, index) => (
          <motion.div
            key={step.label}
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.12 }}
            className="flex items-center gap-3 rounded-lg border border-white/10 bg-white/[0.02] p-3"
          >
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-signal bg-signal/15 font-mono text-[0.5rem] font-bold text-signal">
              {index + 1}
            </span>
            <span className="min-w-0 flex-1">
              <span className="block text-sm font-semibold text-cream">{step.label}</span>
              <span className="mt-0.5 block font-mono text-[0.48rem] uppercase tracking-[0.08em] text-dim">
                {step.detail}
              </span>
            </span>
          </motion.div>
        ))}
      </div>
    </Frame>
  );
}

export function OperatingDisciplineVisual() {
  return (
    <div className="w-full min-w-0">
      <Frame label="Implementation · operating discipline">
        <div className="grid grid-cols-2 gap-2">
          {[
            "Workflow mapped",
            "Baseline set",
            "Controls defined",
            "Owner named",
            "Pilot tested",
            "ROI tracked",
          ].map((item, index) => (
            <motion.div
              key={item}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: index * 0.06 }}
              className="rounded-md border border-white/10 bg-white/[0.03] px-2 py-2 font-mono text-[0.42rem] leading-snug text-white/55"
            >
              {item}
            </motion.div>
          ))}
        </div>
      </Frame>
    </div>
  );
}

export function InsightCardVisual({ category }: { category: string }) {
  return (
    <div className="relative min-h-[10rem] overflow-hidden rounded-t-xl border-b border-line bg-[#0a0a0b]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_20%,rgba(176,38,255,0.18),transparent_50%)]" />
      <div className="relative flex h-full flex-col justify-between p-5">
        <span className="font-mono text-[0.48rem] uppercase tracking-[0.12em] text-signal">
          {category}
        </span>
        <div className="grid grid-cols-3 gap-1.5">
          {[...Array(3)].map((_, index) => (
            <motion.div
              key={index}
              animate={{ opacity: [0.25, 0.6, 0.25] }}
              transition={{ duration: 2.2, repeat: Infinity, delay: index * 0.2 }}
              className="h-8 rounded-md border border-white/10 bg-white/[0.04]"
            />
          ))}
        </div>
      </div>
    </div>
  );
}
