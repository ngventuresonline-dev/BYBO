"use client";

import { Check, MapPin, Workflow } from "lucide-react";
import { VisualTabStage } from "@/components/shared/VisualTabStage";
import { EngagementTimelineVisual } from "@/components/page-visuals/SharedPageVisuals";

const principleTabs = [
  {
    id: "workflow",
    label: "Workflow first",
    headline: "We start where work actually enters your business.",
    detail: "CRM, inbox, ERP, documents. Not a generic agent template.",
    panel: (
      <div className="flex items-center gap-4 rounded-xl border border-black/8 bg-white p-4">
        <Workflow size={28} className="text-signal" />
        <p className="text-sm leading-6 text-surface-ink">
          Every system maps to a real trigger, owner, and approval path your team already understands.
        </p>
      </div>
    ),
  },
  {
    id: "evidence",
    label: "Evidence first",
    headline: "Baseline and ROI before build.",
    detail: "Blueprint ranks opportunities with numbers, not hype.",
    panel: (
      <div className="grid grid-cols-3 gap-2">
        {["Map", "Rank", "Roadmap"].map((step, i) => (
          <div
            key={step}
            className={`rounded-lg border px-3 py-4 text-center ${
              i === 1 ? "border-signal/30 bg-signal/8" : "border-black/8 bg-white"
            }`}
          >
            <p className="font-mono text-[0.48rem] uppercase tracking-[0.1em] text-surface-muted">
              {step}
            </p>
          </div>
        ))}
      </div>
    ),
  },
  {
    id: "people",
    label: "People accountable",
    headline: "AI assists. People decide.",
    detail: "Approvals, escalation, and audit are part of the product.",
    panel: (
      <div className="space-y-2">
        {["Human approval paths", "Named owners", "Failure escalation"].map((item) => (
          <div
            key={item}
            className="flex items-center gap-2 rounded-lg border border-black/8 bg-white px-3 py-2 text-xs text-surface-ink"
          >
            <Check size={12} className="text-signal" />
            {item}
          </div>
        ))}
      </div>
    ),
  },
];

export function AboutExperience() {
  return (
    <>
      <VisualTabStage
        eyebrow="How we think"
        title="Three rules we do not break."
        tone="light"
        tabs={principleTabs}
      />

      <section className="section-shell !py-12">
        <div className="grid gap-8 lg:grid-cols-[1fr_minmax(16rem,22rem)] lg:items-start">
          <div>
            <p className="eyebrow">The engagement</p>
            <h2 className="section-title mt-5">Diagnose → Build → Operate.</h2>
            <p className="mt-4 max-w-md text-sm leading-6 text-fog">
              One partner from opportunity ranking through production and improvement.
            </p>
          </div>
          <EngagementTimelineVisual />
        </div>
      </section>

      <section className="border-y border-line bg-panel">
        <div className="section-shell !py-12">
          <div className="flex flex-col gap-6 rounded-2xl border border-line bg-void p-6 sm:flex-row sm:items-center sm:p-8">
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-signal/30 bg-signal/10 text-signal">
              <MapPin size={22} />
            </span>
            <div>
              <p className="eyebrow">Built in Bengaluru</p>
              <h2 className="mt-3 font-display text-xl font-bold tracking-[-0.04em] sm:text-2xl">
                India-aware by default.
              </h2>
              <p className="mt-3 max-w-2xl text-sm leading-6 text-fog">
                WhatsApp, spreadsheets, CRMs, and human relationships. We design for how Indian businesses actually run.
              </p>
              <p className="mt-4 font-mono text-[0.52rem] uppercase tracking-[0.1em] text-dim">
                N&amp;G Ventures · In partnership with Bcon Club
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
