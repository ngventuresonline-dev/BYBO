"use client";

import Link from "next/link";
import { Check, MoveRight } from "lucide-react";
import { systems } from "@/lib/content";
import { CapabilityModulesSection } from "@/components/CapabilityModulesSection";
import { VisualTabStage } from "@/components/shared/VisualTabStage";
import { PilotVsSystemVisual } from "@/components/page-visuals/InsightVisuals";
import { SignalAccentSurface } from "@/components/SignalAccentSurface";

export function SystemDetailStage({ slug }: { slug: string }) {
  const system = systems.find((item) => item.slug === slug);
  if (!system) return null;
  const tabs = [
    {
      id: "fit",
      label: "Where it fits",
      headline: "Built for work that repeats and costs money when it breaks.",
      detail: "Strong fit when delay, inconsistency, or missing context shows up every week.",
      panel: (
        <div className="grid gap-3 sm:grid-cols-2">
          <div className="rounded-xl border border-black/8 bg-white p-4">
            <p className="font-mono text-[0.48rem] uppercase tracking-[0.1em] text-signal">
              Good fit
            </p>
            <ul className="mt-3 space-y-2">
              {system.bestFor.slice(0, 3).map((item) => (
                <li key={item} className="flex gap-2 text-xs leading-5 text-surface-ink">
                  <Check size={12} className="mt-0.5 shrink-0 text-signal" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-xl border border-black/8 bg-white p-4">
            <p className="font-mono text-[0.48rem] uppercase tracking-[0.1em] text-surface-muted">
              Warning signs
            </p>
            <ul className="mt-3 space-y-2">
              {system.pains.slice(0, 3).map((pain) => (
                <li
                  key={pain}
                  className="border-l-2 border-signal/30 pl-2 text-xs leading-5 text-surface-muted"
                >
                  {pain}
                </li>
              ))}
            </ul>
          </div>
        </div>
      ),
    },
    {
      id: "modules",
      label: "What we build",
      headline: "Modules picked for your workflow, not a fixed package.",
      panel: (
        <div className="-mx-1 text-surface-ink">
          <CapabilityModulesSection modules={system.modules} />
        </div>
      ),
    },
    {
      id: "flow",
      label: "How it runs",
      headline: "Signal in. Rules applied. Human approves. Action out.",
      panel: (
        <div className="space-y-2">
          {system.workflow.map((step, index) => (
            <div
              key={step.label}
              className="flex items-start gap-3 rounded-xl border border-black/8 bg-white px-3 py-3"
            >
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-signal/12 font-mono text-[0.48rem] text-signal">
                {index + 1}
              </span>
              <div className="min-w-0">
                <p className="text-xs font-semibold text-surface-ink">{step.label}</p>
                <p className="mt-0.5 text-[0.68rem] leading-5 text-surface-muted">
                  {step.description}
                </p>
              </div>
              {index < system.workflow.length - 1 && (
                <MoveRight size={14} className="ml-auto shrink-0 text-surface-muted" />
              )}
            </div>
          ))}
        </div>
      ),
    },
    {
      id: "governed",
      label: "Governed",
      headline: "Permissions, approvals, and audit by default.",
      panel: (
        <div className="space-y-3">
          <div className="flex flex-wrap gap-1.5">
            {system.controls.slice(0, 5).map((control) => (
              <span
                key={control}
                className="rounded-full border border-signal/20 bg-signal/8 px-2.5 py-1 font-mono text-[0.45rem] uppercase tracking-[0.08em] text-signal"
              >
                {control}
              </span>
            ))}
          </div>
          <div className="flex flex-wrap gap-1.5">
            {system.integrations.slice(0, 8).map((integration) => (
              <span
                key={integration}
                className="rounded-full border border-black/8 bg-white px-2.5 py-1 font-mono text-[0.45rem] uppercase tracking-[0.08em] text-surface-muted"
              >
                {integration}
              </span>
            ))}
          </div>
        </div>
      ),
    },
    {
      id: "proof",
      label: "Proof",
      headline: "Measure against a baseline before and after launch.",
      panel: (
        <div className="space-y-3">
          <div className="grid grid-cols-2 gap-2">
            {system.metrics.slice(0, 4).map((metric) => (
              <div
                key={metric}
                className="rounded-lg border border-black/8 bg-white px-3 py-2.5 text-xs font-semibold text-surface-ink"
              >
                {metric}
              </div>
            ))}
          </div>
          <div className="grid gap-2 lg:grid-cols-3">
            {[
              { label: "Before", text: system.example.before },
              { label: "System", text: system.example.system, accent: true },
              { label: "After", text: system.example.after },
            ].map((step) =>
              step.accent ? (
                <SignalAccentSurface
                  key={step.label}
                  variant="card"
                  className="rounded-xl p-3 text-sm leading-6"
                >
                  <p className="font-mono text-[0.45rem] uppercase tracking-[0.1em] opacity-70">
                    {step.label}
                  </p>
                  <p className="mt-2">{step.text}</p>
                </SignalAccentSurface>
              ) : (
                <div
                  key={step.label}
                  className="rounded-xl border border-black/8 bg-white p-3 text-sm leading-6 text-surface-muted"
                >
                  <p className="font-mono text-[0.45rem] uppercase tracking-[0.1em] text-surface-muted">
                    {step.label}
                  </p>
                  <p className="mt-2 text-surface-ink">{step.text}</p>
                </div>
              ),
            )}
          </div>
        </div>
      ),
    },
  ];

  return (
    <>
      <VisualTabStage
        eyebrow="Explore this system"
        title="Tap through how it works."
        subtitle="Five views. One system. No slide deck required."
        tone="light"
        tabs={tabs}
      />
      <section className="section-shell !py-10">
        <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="eyebrow">Not a pilot deck</p>
            <h2 className="section-title mt-5">Production system, not demo theatre.</h2>
          </div>
          <PilotVsSystemVisual />
        </div>
      </section>
    </>
  );
}
