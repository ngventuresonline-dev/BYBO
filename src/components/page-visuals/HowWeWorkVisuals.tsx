"use client";

import type { ReactNode } from "react";
import { motion } from "framer-motion";
import {
  Activity,
  AlertCircle,
  Boxes,
  Check,
  Gauge,
  Layers3,
  LineChart,
  Rocket,
  ScanSearch,
  Settings2,
  Shield,
  Users,
} from "lucide-react";

function VisualFrame({
  label,
  children,
  className = "",
}: {
  label: string;
  children: ReactNode;
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
  switch (variant) {
    case "project":
      return <ProjectMilestoneVisual />;
    case "platform":
      return <PlatformLayersVisual />;
    case "managed":
      return <ManagedOpsVisual />;
    case "pod":
      return <DedicatedPodVisual />;
    default:
      return <ProjectMilestoneVisual />;
  }
}

function ModelChrome({
  label,
  icon: Icon,
  children,
}: {
  label: string;
  icon: typeof Gauge;
  children: ReactNode;
}) {
  return (
    <div className="overflow-hidden rounded-xl border border-white/10 bg-[#0a0a0b]">
      <div className="flex items-center justify-between border-b border-white/10 px-3 py-2">
        <span className="font-mono text-[0.48rem] uppercase tracking-[0.1em] text-white/40">
          {label}
        </span>
        <span className="flex h-7 w-7 items-center justify-center rounded-md border border-signal/30 bg-signal/10 text-signal">
          <Icon size={14} />
        </span>
      </div>
      <div className="px-3 py-3.5">{children}</div>
    </div>
  );
}

function ProjectMilestoneVisual() {
  const milestones = [
    { label: "Scope", state: "done" },
    { label: "Build", state: "done" },
    { label: "UAT", state: "active" },
    { label: "Handover", state: "pending" },
  ] as const;

  return (
    <ModelChrome label="Milestone delivery" icon={Gauge}>
      <div className="relative flex items-start justify-between gap-1">
        <div className="absolute left-3 right-3 top-[0.65rem] h-px bg-white/10" />
        {milestones.map((milestone, index) => {
          const done = milestone.state === "done";
          const active = milestone.state === "active";
          return (
            <div key={milestone.label} className="relative z-[1] flex flex-col items-center gap-2">
              <motion.span
                initial={{ scale: 0.8, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08 }}
                className={`flex h-5 w-5 items-center justify-center rounded-full border text-[0.45rem] ${
                  done
                    ? "border-success/40 bg-success/15 text-success"
                    : active
                      ? "border-signal bg-signal text-signal-ink signal-pulse"
                      : "border-white/15 bg-white/[0.03] text-white/35"
                }`}
              >
                {done ? <Check size={10} strokeWidth={3} /> : index + 1}
              </motion.span>
              <span
                className={`font-mono text-[0.42rem] uppercase tracking-[0.08em] ${
                  active ? "text-signal" : done ? "text-white/55" : "text-white/30"
                }`}
              >
                {milestone.label}
              </span>
            </div>
          );
        })}
      </div>
      <div className="mt-3 rounded-lg border border-white/10 bg-white/[0.02] px-2.5 py-2">
        <div className="flex items-center justify-between font-mono text-[0.42rem] uppercase tracking-[0.08em] text-dim">
          <span>Acceptance gate</span>
          <span className="text-signal">UAT in progress</span>
        </div>
      </div>
    </ModelChrome>
  );
}

function PlatformLayersVisual() {
  const layers = [
    { label: "Experience", width: "88%" },
    { label: "Workflow + AI", width: "96%" },
    { label: "Data + retrieval", width: "82%" },
    { label: "Identity + security", width: "74%" },
    { label: "Infrastructure", width: "68%" },
  ];

  return (
    <ModelChrome label="Platform layers" icon={Boxes}>
      <div className="space-y-1.5">
        {layers.map((layer, index) => (
          <motion.div
            key={layer.label}
            initial={{ opacity: 0, x: -8 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.07, duration: 0.45 }}
            className={`rounded-md border px-2 py-1.5 ${
              index === 0
                ? "border-signal/40 bg-signal/12"
                : "border-white/10 bg-white/[0.03]"
            }`}
            style={{ width: layer.width }}
          >
            <p
              className={`font-mono text-[0.42rem] uppercase tracking-[0.08em] ${
                index === 0 ? "text-signal" : "text-white/45"
              }`}
            >
              {layer.label}
            </p>
          </motion.div>
        ))}
      </div>
      <div className="mt-3 flex items-center gap-2 font-mono text-[0.42rem] uppercase tracking-[0.08em] text-dim">
        <Layers3 size={11} className="text-signal" />
        <span>One product programme, not a patchwork</span>
      </div>
    </ModelChrome>
  );
}

function ManagedOpsVisual() {
  const metrics = [
    { label: "Success rate", value: "94%", tone: "success" },
    { label: "Open incidents", value: "2", tone: "warn" },
  ];

  return (
    <ModelChrome label="Live performance" icon={LineChart}>
      <div className="flex items-center gap-2">
        <span className="signal-pulse h-1.5 w-1.5 rounded-full bg-success" />
        <span className="font-mono text-[0.42rem] uppercase tracking-[0.08em] text-success">
          Monitoring active
        </span>
      </div>
      <div className="mt-2.5 grid grid-cols-2 gap-2">
        {metrics.map((metric) => (
          <div
            key={metric.label}
            className="rounded-lg border border-white/10 bg-white/[0.02] px-2 py-2"
          >
            <p className="font-mono text-[0.4rem] uppercase tracking-[0.08em] text-dim">
              {metric.label}
            </p>
            <p
              className={`mt-1 font-display text-lg font-bold tracking-[-0.04em] ${
                metric.tone === "success" ? "text-success" : "text-signal"
              }`}
            >
              {metric.value}
            </p>
          </div>
        ))}
      </div>
      <div className="mt-2.5 flex h-10 items-end gap-1">
        {[42, 58, 51, 72, 68, 88, 94, 91].map((height, index) => (
          <motion.div
            key={index}
            initial={{ height: 0 }}
            whileInView={{ height: `${height}%` }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.05, duration: 0.35 }}
            className={`flex-1 rounded-t-sm ${
              index >= 6 ? "bg-success/80" : "bg-white/15"
            }`}
          />
        ))}
      </div>
      <div className="mt-2 flex items-center gap-1.5 text-[0.58rem] text-fog">
        <AlertCircle size={11} className="text-signal" />
        <span>Evaluations + cost controls on schedule</span>
      </div>
    </ModelChrome>
  );
}

function DedicatedPodVisual() {
  const roles = ["Product", "AI Eng", "Data", "Automation"];
  const columns = [
    { label: "Backlog", count: 4 },
    { label: "Active", count: 2 },
    { label: "Shipped", count: 6 },
  ];

  return (
    <ModelChrome label="Portfolio throughput" icon={Users}>
      <div className="grid grid-cols-4 gap-1.5">
        {roles.map((role, index) => (
          <motion.div
            key={role}
            initial={{ opacity: 0, y: 6 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.06 }}
            className="rounded-md border border-white/10 bg-white/[0.03] px-1.5 py-2 text-center"
          >
            <span className="mx-auto mb-1.5 flex h-6 w-6 items-center justify-center rounded-full border border-signal/25 bg-signal/10 font-mono text-[0.42rem] text-signal">
              {role.slice(0, 1)}
            </span>
            <p className="font-mono text-[0.38rem] uppercase tracking-[0.06em] text-white/45">
              {role}
            </p>
          </motion.div>
        ))}
      </div>
      <div className="mt-3 grid grid-cols-3 gap-1.5">
        {columns.map((column, index) => (
          <div
            key={column.label}
            className={`rounded-lg border px-2 py-2 ${
              index === 1
                ? "border-signal/35 bg-signal/8"
                : "border-white/10 bg-white/[0.02]"
            }`}
          >
            <p className="font-mono text-[0.38rem] uppercase tracking-[0.08em] text-dim">
              {column.label}
            </p>
            <p className="mt-1 font-display text-base font-bold text-cream">
              {column.count}
            </p>
          </div>
        ))}
      </div>
      <div className="mt-2 flex items-center gap-1.5 font-mono text-[0.42rem] uppercase tracking-[0.08em] text-dim">
        <Shield size={11} className="text-signal" />
        <span>Retained pod · agreed portfolio</span>
      </div>
    </ModelChrome>
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
