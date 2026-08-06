"use client";

import { engagementStages } from "@/lib/content";
import { VisualTabStage } from "@/components/shared/VisualTabStage";
import {
  CommercialModelVisual,
} from "@/components/page-visuals/HowWeWorkVisuals";
import { LazyInteractiveSystemDemo } from "@/components/home/HomeLazySections";
import { PilotVsSystemVisual } from "@/components/page-visuals/InsightVisuals";
import {
  Activity,
  Check,
  Layers3,
  Rocket,
  ScanSearch,
} from "lucide-react";

const stageIcons = [ScanSearch, Rocket, Activity, Layers3];

const stagePanels = [
  {
    outcome: "Ranked roadmap in 7–10 days",
    chips: ["Workflow map", "Opportunity matrix", "90-day plan"],
  },
  {
    outcome: "Live system in 4–12 weeks",
    chips: ["Real integrations", "Human approval", "Team trained"],
  },
  {
    outcome: "Monitored after launch",
    chips: ["Performance review", "Cost control", "Improvement loop"],
  },
  {
    outcome: "Faster next deployment",
    chips: ["Reusable modules", "Shared controls", "Shorter rollout"],
  },
];

const engagementModels = [
  {
    id: "project",
    variant: "project" as const,
    label: "Fixed-scope project",
    headline: "One problem. One production system.",
    detail: "Milestones, acceptance criteria, handover.",
    href: "/apply",
    linkLabel: "Discuss a project",
  },
  {
    id: "platform",
    variant: "platform" as const,
    label: "Custom platform",
    headline: "Software built for your business.",
    detail: "Product, data, AI, and ops in one programme.",
    href: "/systems/custom-ai-platforms",
    linkLabel: "See platforms",
  },
  {
    id: "managed",
    variant: "managed" as const,
    label: "Managed operations",
    headline: "We keep it running and improving.",
    detail: "Monitoring, fixes, and roadmap on retainer.",
    href: "/apply",
    linkLabel: "Discuss managed ops",
  },
  {
    id: "pod",
    variant: "pod" as const,
    label: "Dedicated AI pod",
    headline: "A build team inside your org.",
    detail: "Product, engineering, and AI against your portfolio.",
    href: "/apply",
    linkLabel: "Discuss a pod",
  },
];

const standards = [
  "Baseline before launch",
  "Named owner",
  "Human approval",
  "Failure handling",
  "Cost visibility",
  "Team training",
];

export function HowWeWorkExperience() {
  const journeyTabs = engagementStages.map((stage, index) => {
    const Icon = stageIcons[index] ?? ScanSearch;
    const panel = stagePanels[index];
    return {
      id: stage.index,
      label: `${stage.name} · ${stage.label}`,
      headline: stage.title,
      detail: panel.outcome,
      href: index === 0 ? "/blueprint" : "/apply",
      linkLabel: index === 0 ? "See Blueprint" : "Start a conversation",
      panel: (
        <div className="rounded-xl border border-black/8 bg-white p-4">
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-signal/25 bg-signal/10 text-signal">
              <Icon size={18} />
            </span>
            <div>
              <p className="font-mono text-[0.48rem] uppercase tracking-[0.1em] text-surface-muted">
                You get
              </p>
              <p className="font-display text-base font-bold text-surface-ink">
                {panel.outcome}
              </p>
            </div>
          </div>
          <div className="mt-4 flex flex-wrap gap-1.5">
            {panel.chips.map((chip) => (
              <span
                key={chip}
                className="rounded-full border border-signal/20 bg-signal/8 px-2.5 py-1 font-mono text-[0.45rem] uppercase tracking-[0.08em] text-signal"
              >
                {chip}
              </span>
            ))}
          </div>
        </div>
      ),
    };
  });

  const engagementTabs = engagementModels.map((model) => ({
    id: model.id,
    label: model.label,
    headline: model.headline,
    detail: model.detail,
    href: model.href,
    linkLabel: model.linkLabel,
    panel: <CommercialModelVisual variant={model.variant} />,
  }));

  return (
    <>
      <VisualTabStage
        eyebrow="The path"
        title="Four steps. Always clear what happens next."
        tabs={journeyTabs}
        tone="light"
      />

      <section className="section-shell !py-12">
        <div className="mb-6 max-w-xl">
          <p className="eyebrow">See it work</p>
          <h2 className="section-title mt-5">Watch a system run on a real scenario.</h2>
        </div>
        <LazyInteractiveSystemDemo />
      </section>

      <VisualTabStage
        eyebrow="Ways to engage"
        title="Pick the shape that matches your outcome."
        tone="light"
        tabs={engagementTabs}
      />

      <section className="border-y border-line bg-panel">
        <div className="section-shell !py-12">
          <p className="eyebrow">Every deployment includes</p>
          <h2 className="section-title mt-5">Non-negotiables, not upsells.</h2>
          <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
            {standards.map((item) => (
              <div
                key={item}
                className="flex flex-col items-start gap-3 rounded-xl border border-line bg-void p-4"
              >
                <Check size={16} className="text-success" />
                <p className="text-xs font-semibold leading-5 text-cream">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-shell !py-12">
        <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="eyebrow">What we skip</p>
            <h2 className="section-title mt-5">No theatre. No black boxes.</h2>
          </div>
          <PilotVsSystemVisual />
        </div>
      </section>
    </>
  );
}
