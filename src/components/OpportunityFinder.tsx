"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight, RotateCcw } from "lucide-react";
import { systems } from "@/lib/content";

const bottlenecks = [
  { label: "A custom business platform", system: "custom-ai-platforms" },
  { label: "Work spanning teams and tools", system: "agentic-operations" },
  { label: "Enterprise knowledge access", system: "enterprise-knowledge-systems" },
  { label: "Reporting and decisions", system: "decision-intelligence" },
  { label: "Customer or workforce experience", system: "customer-workforce-ai" },
  {
    label: "Documents, images, audio, or video",
    system: "document-multimodal-intelligence",
  },
  { label: "AI scale, reliability, and control", system: "ai-infrastructure-governance" },
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

export function OpportunityFinder() {
  const [step, setStep] = useState(0);
  const [bottleneck, setBottleneck] = useState("");
  const [volume, setVolume] = useState("");
  const [currentReadiness, setCurrentReadiness] = useState("");

  const result = useMemo(
    () => systems.find((system) => system.slug === bottleneck),
    [bottleneck],
  );

  const chooseBottleneck = (value: string) => {
    setBottleneck(value);
    setStep(1);
  };

  const chooseVolume = (value: string) => {
    setVolume(value);
    setStep(2);
  };

  const chooseReadiness = (value: string) => {
    setCurrentReadiness(value);
    setStep(3);
  };

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

  return (
    <div className="technical-card overflow-hidden">
      <div className="flex flex-col gap-4 border-b border-line px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-7">
        <div>
          <p className="technical-label text-signal">Opportunity finder</p>
          <p className="mt-2 text-sm text-fog">
            Three questions. A sensible first direction—not a fake AI diagnosis.
          </p>
        </div>
        <div className="flex items-center gap-2" aria-label={`Step ${Math.min(step + 1, 3)} of 3`}>
          {[0, 1, 2].map((index) => (
            <span
              key={index}
              className={`h-1.5 w-10 ${
                index <= Math.min(step, 2) ? "bg-signal" : "bg-line"
              }`}
            />
          ))}
        </div>
      </div>

      <div className="min-h-[27rem] p-5 sm:p-7 lg:p-10">
        <AnimatePresence mode="wait">
          {step === 0 && (
            <QuestionFrame
              key="bottleneck"
              label="01 / Bottleneck"
              title="Where is the business losing the most momentum?"
            >
              <div className="grid gap-3 sm:grid-cols-2">
                {bottlenecks.map((item) => (
                  <OptionButton
                    key={item.system}
                    label={item.label}
                    onClick={() => chooseBottleneck(item.system)}
                  />
                ))}
              </div>
            </QuestionFrame>
          )}

          {step === 1 && (
            <QuestionFrame
              key="volume"
              label="02 / Frequency"
              title="How often does this workflow happen?"
              onBack={() => setStep(0)}
            >
              <div className="grid gap-3 sm:grid-cols-3">
                {volumes.map((item) => (
                  <OptionButton
                    key={item.value}
                    label={item.label}
                    helper={item.helper}
                    onClick={() => chooseVolume(item.value)}
                  />
                ))}
              </div>
            </QuestionFrame>
          )}

          {step === 2 && (
            <QuestionFrame
              key="readiness"
              label="03 / Readiness"
              title="What does the workflow run on today?"
              onBack={() => setStep(1)}
            >
              <div className="grid gap-3 sm:grid-cols-3">
                {readiness.map((item) => (
                  <OptionButton
                    key={item.value}
                    label={item.label}
                    onClick={() => chooseReadiness(item.value)}
                  />
                ))}
              </div>
            </QuestionFrame>
          )}

          {step === 3 && result && (
            <motion.div
              key="result"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="flex min-h-[21rem] flex-col justify-between"
            >
              <div>
                <p className="technical-label text-success">Suggested starting point</p>
                <h3 className="section-title mt-5 max-w-3xl">
                  Explore {result.name}
                </h3>
                <p className="mt-4 max-w-2xl text-base leading-7 text-fog">
                  {recommendation}
                </p>
                <div className="mt-7 border-l-2 border-signal pl-5">
                  <p className="technical-label text-dim">Why the Blueprint comes first</p>
                  <p className="mt-2 max-w-2xl text-sm leading-6 text-fog">
                    It checks the baseline, exceptions, data, risk, and financial
                    case before anyone commits to building software.
                  </p>
                </div>
              </div>

              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
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
    </div>
  );
}

function QuestionFrame({
  label,
  title,
  onBack,
  children,
}: {
  label: string;
  title: string;
  onBack?: () => void;
  children: React.ReactNode;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 14 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -10 }}
      transition={{ duration: 0.22 }}
    >
      <div className="flex items-start justify-between gap-5">
        <div>
          <p className="technical-label text-signal">{label}</p>
          <h3 className="section-title mt-5 max-w-3xl">
            {title}
          </h3>
        </div>
        {onBack && (
          <button
            onClick={onBack}
            className="inline-flex min-h-11 min-w-11 items-center justify-center border border-line text-dim hover:border-dim hover:text-cream"
            aria-label="Previous question"
          >
            <ArrowLeft size={17} />
          </button>
        )}
      </div>
      <div className="mt-9">{children}</div>
    </motion.div>
  );
}

function OptionButton({
  label,
  helper,
  onClick,
}: {
  label: string;
  helper?: string;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="group flex min-h-24 items-center justify-between gap-4 border border-line bg-void/50 p-5 text-left transition-colors hover:border-signal hover:bg-signal hover:text-signal-ink"
    >
      <span>
        <span className="block font-display text-base font-bold tracking-[-0.025em]">
          {label}
        </span>
        {helper && (
          <span className="mt-1.5 block text-xs leading-5 text-dim group-hover:text-signal-ink/75">
            {helper}
          </span>
        )}
      </span>
      <ArrowRight size={16} className="shrink-0 text-dim group-hover:text-signal-ink" />
    </button>
  );
}
