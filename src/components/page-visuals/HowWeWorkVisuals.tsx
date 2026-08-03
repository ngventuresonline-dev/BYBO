"use client";

import { motion } from "framer-motion";
import {
  Activity,
  Boxes,
  Gauge,
  Layers3,
  LineChart,
  Rocket,
  ScanSearch,
  Settings2,
  Users,
} from "lucide-react";

function VisualFrame({
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
      className={`overflow-hidden rounded-[1.1rem] border border-white/10 bg-[#0a0a0b] shadow-[0_20px_60px_rgba(0,0,0,0.35)] ${className}`}
    >
      <div className="flex items-center justify-between border-b border-white/10 px-4 py-2.5">
        <span className="font-mono text-[0.55rem] uppercase tracking-[0.12em] text-white/45 sm:text-[0.62rem]">
          {label}
        </span>
        <span className="font-mono text-[0.52rem] text-signal">BYBO</span>
      </div>
      <div className="p-4 sm:p-5">{children}</div>
    </div>
  );
}

export function EngagementPipelineVisual() {
  const stages = [
    { name: "Diagnose", detail: "Blueprint", icon: ScanSearch, active: true },
    { name: "Deploy", detail: "6–12 weeks", icon: Rocket, active: false },
    { name: "Operate", detail: "Ongoing", icon: Activity, active: false },
    { name: "Expand", detail: "Modules", icon: Layers3, active: false },
  ];

  return (
    <VisualFrame label="Engagement · end to end">
      <div className="grid gap-3 sm:grid-cols-4">
        {stages.map((stage, index) => {
          const Icon = stage.icon;
          return (
            <motion.div
              key={stage.name}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`relative rounded-xl border p-3 sm:p-4 ${
                stage.active
                  ? "border-signal/45 bg-signal/10"
                  : "border-white/10 bg-white/[0.02]"
              }`}
            >
              <div
                className={`mb-3 flex h-9 w-9 items-center justify-center rounded-lg border ${
                  stage.active
                    ? "border-signal/40 bg-signal/15 text-signal"
                    : "border-white/10 bg-white/[0.03] text-white/45"
                }`}
              >
                <Icon size={16} />
              </div>
              <p className="font-display text-sm font-bold text-cream sm:text-base">
                {stage.name}
              </p>
              <p className="mt-1 font-mono text-[0.52rem] uppercase tracking-[0.1em] text-dim">
                {stage.detail}
              </p>
              {index < stages.length - 1 && (
                <span className="absolute -right-2 top-1/2 hidden -translate-y-1/2 font-mono text-signal sm:inline">
                  →
                </span>
              )}
            </motion.div>
          );
        })}
      </div>
      <div className="mt-4 rounded-lg border border-white/10 bg-white/[0.02] p-3">
        <div className="flex items-center justify-between font-mono text-[0.52rem] uppercase tracking-[0.1em] text-dim">
          <span>Current focus</span>
          <span className="text-signal">Rank before build</span>
        </div>
        <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-white/10">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: "28%" }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="h-full rounded-full bg-signal"
          />
        </div>
      </div>
    </VisualFrame>
  );
}

export function StageOutcomeVisual({ stageIndex }: { stageIndex: number }) {
  const visuals = [
    {
      label: "Opportunity ranking",
      content: (
        <div className="grid grid-cols-2 gap-2">
          {["Build", "Pilot", "Defer", "Hold"].map((item, i) => (
            <div
              key={item}
              className={`rounded-md border px-2 py-2 text-center font-mono text-[0.48rem] sm:text-[0.55rem] ${
                i === 0
                  ? "border-signal/40 bg-signal/10 text-signal"
                  : "border-white/10 bg-white/[0.02] text-white/45"
              }`}
            >
              {item}
            </div>
          ))}
        </div>
      ),
    },
    {
      label: "Production path",
      content: (
        <div className="flex flex-col gap-1.5">
          {["Integrate", "Test cases", "Go live"].map((step, i) => (
            <div key={step} className="flex items-center gap-2">
              <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-signal/15 font-mono text-[0.45rem] text-signal">
                {i + 1}
              </span>
              <div className="h-2 flex-1 rounded-full bg-white/10">
                <div
                  className="h-full rounded-full bg-signal/70"
                  style={{ width: `${40 + i * 25}%` }}
                />
              </div>
              <span className="font-mono text-[0.48rem] text-white/45">{step}</span>
            </div>
          ))}
        </div>
      ),
    },
    {
      label: "Operating health",
      content: (
        <div className="space-y-2">
          {[
            { label: "Success rate", value: 94 },
            { label: "Escalations", value: 12 },
          ].map((metric) => (
            <div key={metric.label}>
              <div className="flex justify-between font-mono text-[0.48rem] text-dim">
                <span>{metric.label}</span>
                <span className="text-signal">{metric.value}%</span>
              </div>
              <div className="mt-1 h-1.5 rounded-full bg-white/10">
                <div
                  className="h-full rounded-full bg-success"
                  style={{ width: `${metric.value}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      ),
    },
    {
      label: "Reusable modules",
      content: (
        <div className="grid grid-cols-3 gap-1.5">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              animate={{ opacity: [0.35, 0.85, 0.35] }}
              transition={{ duration: 2.4, repeat: Infinity, delay: i * 0.15 }}
              className={`h-8 rounded-md border ${
                i === 0
                  ? "border-signal/35 bg-signal/10"
                  : "border-white/10 bg-white/[0.03]"
              }`}
            />
          ))}
        </div>
      ),
    },
  ];

  const visual = visuals[stageIndex] ?? visuals[0];

  return (
    <VisualFrame label={visual.label} className="h-full">
      {visual.content}
    </VisualFrame>
  );
}

export function CommercialModelVisual({
  variant,
}: {
  variant: "project" | "platform" | "managed" | "pod";
}) {
  const config = {
    project: {
      icon: Gauge,
      bars: [88, 62, 45],
      caption: "Milestone delivery",
    },
    platform: {
      icon: Boxes,
      bars: [72, 78, 85, 90],
      caption: "Platform layers",
    },
    managed: {
      icon: LineChart,
      bars: [91, 88, 93, 89, 95],
      caption: "Live performance",
    },
    pod: {
      icon: Users,
      bars: [70, 74, 79, 83],
      caption: "Portfolio throughput",
    },
  }[variant];

  const Icon = config.icon;

  return (
    <div className="overflow-hidden rounded-xl border border-white/10 bg-[#0a0a0b]">
      <div className="flex items-center justify-between border-b border-white/10 px-3 py-2">
        <span className="font-mono text-[0.48rem] uppercase tracking-[0.1em] text-white/40">
          {config.caption}
        </span>
        <span className="flex h-7 w-7 items-center justify-center rounded-md border border-signal/30 bg-signal/10 text-signal">
          <Icon size={14} />
        </span>
      </div>
      <div className="flex h-24 items-end gap-1.5 px-3 pb-3 pt-4 sm:h-28">
        {config.bars.map((height, index) => (
          <motion.div
            key={index}
            initial={{ height: 0 }}
            whileInView={{ height: `${height}%` }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.08, duration: 0.45 }}
            className={`flex-1 rounded-t-md ${
              index === config.bars.length - 1 ? "bg-signal" : "bg-white/15"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

export function ProductionReadinessVisual() {
  const layers = [
    "Baseline metrics",
    "Test cases",
    "Named owner",
    "Approval rules",
    "Escalation paths",
    "Audit trail",
  ];

  return (
    <VisualFrame label="Production readiness · required">
      <div className="grid gap-2 sm:grid-cols-2">
        {layers.map((layer, index) => (
          <motion.div
            key={layer}
            initial={{ opacity: 0, x: -6 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.06 }}
            className="flex items-center gap-2 rounded-lg border border-white/10 bg-white/[0.03] px-3 py-2.5"
          >
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-success/35 bg-success/10">
              <Settings2 size={12} className="text-success" />
            </span>
            <span className="text-xs text-cream">{layer}</span>
          </motion.div>
        ))}
      </div>
    </VisualFrame>
  );
}

export function CommercialModelsOverviewVisual() {
  const models = [
    { label: "Project", tone: "signal" },
    { label: "Platform", tone: "neutral" },
    { label: "Managed ops", tone: "neutral" },
    { label: "AI pod", tone: "neutral" },
  ];

  return (
    <VisualFrame label="Commercial models · fit to stage">
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
        {models.map((model, index) => (
          <motion.div
            key={model.label}
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.08 }}
            className={`rounded-lg border p-3 text-center ${
              model.tone === "signal"
                ? "border-signal/40 bg-signal/10"
                : "border-white/10 bg-white/[0.02]"
            }`}
          >
            <p className="font-display text-sm font-bold text-cream">{model.label}</p>
            <p className="mt-1 font-mono text-[0.45rem] uppercase tracking-[0.08em] text-dim">
              /0{index + 1}
            </p>
          </motion.div>
        ))}
      </div>
      <p className="mt-4 text-center font-mono text-[0.52rem] uppercase tracking-[0.1em] text-dim">
        Match the engagement shape to outcome and ownership
      </p>
    </VisualFrame>
  );
}
