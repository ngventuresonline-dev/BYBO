"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  BarChart3,
  Building2,
  Check,
  Crosshair,
  FileStack,
  Info,
  Layers,
  RotateCcw,
  Server,
  Users,
  Workflow,
} from "lucide-react";
import { systems } from "@/lib/content";

const bottlenecks = [
  {
    label: "A custom business platform",
    system: "custom-ai-platforms",
    icon: Building2,
  },
  {
    label: "Work spanning teams and tools",
    system: "agentic-operations",
    icon: Workflow,
  },
  {
    label: "Enterprise knowledge access",
    system: "enterprise-knowledge-systems",
    icon: Layers,
  },
  {
    label: "Reporting and decisions",
    system: "decision-intelligence",
    icon: BarChart3,
  },
  {
    label: "Customer or workforce experience",
    system: "customer-workforce-ai",
    icon: Users,
  },
  {
    label: "Documents, images, audio, or video",
    system: "document-multimodal-intelligence",
    icon: FileStack,
  },
  {
    label: "AI scale, reliability, and control",
    system: "ai-infrastructure-governance",
    icon: Server,
  },
];

const volumes = [
  { label: "Occasional", value: "low", helper: "A few cases each week" },
  { label: "Regular", value: "medium", helper: "Cases every working day" },
  { label: "High-volume", value: "high", helper: "Dozens or hundreds each day" },
];

const readiness = [
  { label: "Mostly manual", value: "manual" },
  { label: "Some tools, poorly connected", value: "fragmented" },
  { label: "Good systems, ready to integrate", value: "ready" },
];

const steps = [
  { id: 0, label: "01 / Bottleneck", title: "Where is the business losing the most momentum?" },
  { id: 1, label: "02 / Frequency", title: "How often does this workflow happen?" },
  { id: 2, label: "03 / Readiness", title: "What does the workflow run on today?" },
] as const;

export function OpportunityFinder() {
  const [step, setStep] = useState(0);
  const [bottleneck, setBottleneck] = useState("");
  const [volume, setVolume] = useState("");
  const [currentReadiness, setCurrentReadiness] = useState("");

  const result = useMemo(
    () => systems.find((system) => system.slug === bottleneck),
    [bottleneck],
  );

  const reset = () => {
    setStep(0);
    setBottleneck("");
    setVolume("");
    setCurrentReadiness("");
  };

  const recommendation =
    volume === "low"
      ? "Validate the workflow before automating it. The Blueprint should test whether the economics justify implementation."
      : currentReadiness === "manual"
        ? "Start by redesigning and documenting the workflow, then automate the stable parts with human review."
        : "Your workflow appears suitable for a focused production deployment after the Blueprint validates data and controls.";

  const canGoNext =
    (step === 0 && Boolean(bottleneck)) ||
    (step === 1 && Boolean(volume)) ||
    (step === 2 && Boolean(currentReadiness));

  const goNext = () => {
    if (!canGoNext) return;
    setStep((current) => Math.min(current + 1, 3));
  };

  const goBack = () => {
    setStep((current) => Math.max(current - 1, 0));
  };

  const progressStep = Math.min(step, 2);

  return (
    <div className="opportunity-finder">
      <div className="opportunity-finder__header">
        <div className="flex items-start gap-3">
          <span className="opportunity-finder__mark" aria-hidden="true">
            <Crosshair size={15} strokeWidth={1.8} />
          </span>
          <div>
            <p className="font-mono text-[0.68rem] font-bold uppercase tracking-[0.16em] text-signal">
              Opportunity finder
            </p>
            <p className="mt-1.5 text-sm leading-5 text-fog">
              Three questions. A sensible first direction - not a fake AI
              diagnosis.
            </p>
          </div>
        </div>

        <div
          className="opportunity-finder__progress"
          aria-label={`Step ${progressStep + 1} of 3`}
        >
          <div className="opportunity-finder__dots hidden sm:flex">
            {[0, 1, 2].map((index) => (
              <div key={index} className="flex items-center gap-2">
                {index > 0 && (
                  <span
                    className={`h-px w-6 ${
                      index <= progressStep ? "bg-signal/60" : "bg-line"
                    }`}
                  />
                )}
                <span
                  className={`flex h-7 w-7 items-center justify-center rounded-full border font-mono text-[0.62rem] font-bold ${
                    index <= progressStep
                      ? "border-signal bg-signal text-signal-ink"
                      : "border-line bg-void text-dim"
                  }`}
                >
                  {index + 1}
                </span>
              </div>
            ))}
          </div>
          <div className="flex flex-col items-end gap-2 sm:hidden">
            <div className="flex items-center gap-1.5">
              {[0, 1, 2].map((index) => (
                <span
                  key={index}
                  className={`h-1 w-8 rounded-full ${
                    index <= progressStep ? "bg-signal" : "bg-line"
                  }`}
                />
              ))}
            </div>
            <p className="font-mono text-[0.55rem] uppercase tracking-[0.14em] text-dim">
              {progressStep + 1} of 3
            </p>
          </div>
        </div>
      </div>

      <div className="opportunity-finder__body">
        <AnimatePresence mode="wait">
          {step <= 2 && (
            <motion.div
              key={steps[step].id}
              initial={{ opacity: 0, x: 12 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.2 }}
            >
              <p className="technical-label text-signal">{steps[step].label}</p>
              <h3 className="mt-4 font-display text-xl font-bold tracking-[-0.035em] text-cream sm:text-2xl">
                {steps[step].title}
              </h3>

              {step === 0 && (
                <div className="mt-6 grid gap-2.5 sm:grid-cols-2 sm:gap-3">
                  {bottlenecks.map((item) => (
                    <OptionButton
                      key={item.system}
                      label={item.label}
                      icon={item.icon}
                      selected={bottleneck === item.system}
                      onClick={() => setBottleneck(item.system)}
                    />
                  ))}
                </div>
              )}

              {step === 1 && (
                <div className="mt-6 grid gap-2.5 sm:grid-cols-3 sm:gap-3">
                  {volumes.map((item) => (
                    <OptionButton
                      key={item.value}
                      label={item.label}
                      helper={item.helper}
                      selected={volume === item.value}
                      onClick={() => setVolume(item.value)}
                    />
                  ))}
                </div>
              )}

              {step === 2 && (
                <div className="mt-6 grid gap-2.5 sm:grid-cols-3 sm:gap-3">
                  {readiness.map((item) => (
                    <OptionButton
                      key={item.value}
                      label={item.label}
                      selected={currentReadiness === item.value}
                      onClick={() => setCurrentReadiness(item.value)}
                    />
                  ))}
                </div>
              )}
            </motion.div>
          )}

          {step === 3 && result && (
            <motion.div
              key="result"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="flex min-h-0 flex-col justify-between gap-8"
            >
              <div>
                <p className="technical-label text-success">
                  Suggested starting point
                </p>
                <h3 className="section-title mt-4 max-w-3xl sm:mt-5">
                  Explore {result.name}
                </h3>
                <p className="mt-4 max-w-2xl text-base leading-7 text-fog">
                  {recommendation}
                </p>
                <div className="mt-7 border-l-2 border-signal pl-5">
                  <p className="technical-label text-dim">
                    Why the Blueprint comes first
                  </p>
                  <p className="mt-2 max-w-2xl text-sm leading-6 text-fog">
                    It checks the baseline, exceptions, data, risk, and financial
                    case before anyone commits to building software.
                  </p>
                </div>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row">
                <Link
                  href={`/apply?system=${result.slug}&volume=${volume}&readiness=${currentReadiness}`}
                  className="signal-button"
                >
                  Discuss this opportunity <ArrowRight size={15} />
                </Link>
                <button onClick={reset} className="ghost-button">
                  <RotateCcw size={14} /> Start again
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {step <= 2 && (
        <div className="opportunity-finder__footer">
          <p className="hidden items-center gap-2 text-xs text-dim sm:inline-flex">
            <Info size={13} className="text-signal" aria-hidden="true" />
            Your answers help us suggest the right starting point.
          </p>
          <div className="flex w-full flex-col-reverse gap-2 sm:w-auto sm:flex-row sm:justify-end sm:gap-3">
            <button
              type="button"
              onClick={goBack}
              disabled={step === 0}
              className={`ghost-button ${step === 0 ? "max-sm:hidden" : ""}`}
            >
              <ArrowLeft size={14} /> Previous
            </button>
            <button
              type="button"
              onClick={goNext}
              disabled={!canGoNext}
              className="signal-button"
            >
              <span className="sm:hidden">Continue</span>
              <span className="hidden sm:inline">Next</span>
              <ArrowRight size={14} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function OptionButton({
  label,
  helper,
  icon: Icon,
  selected,
  onClick,
}: {
  label: string;
  helper?: string;
  icon?: typeof Building2;
  selected?: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={selected}
      className={`opportunity-option ${selected ? "is-selected" : ""}`}
    >
      {Icon && (
        <span className="opportunity-option__icon" aria-hidden="true">
          <Icon size={15} strokeWidth={1.7} />
        </span>
      )}
      <span className="min-w-0 flex-1 text-left">
        <span className="block font-display text-[0.95rem] font-bold tracking-[-0.025em] text-cream">
          {label}
        </span>
        {helper && (
          <span className="mt-1 block text-xs leading-5 text-dim">{helper}</span>
        )}
      </span>
      <span className="opportunity-option__trail" aria-hidden="true">
        {selected ? <Check size={12} strokeWidth={3} /> : <ArrowRight size={14} />}
      </span>
    </button>
  );
}
