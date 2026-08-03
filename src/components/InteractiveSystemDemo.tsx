"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight,
  Check,
  Database,
  FileText,
  Play,
  RefreshCw,
  Sparkles,
  Workflow,
} from "lucide-react";
import {
  SolutionBriefModal,
  type SolutionBrief,
} from "@/components/SolutionBriefModal";

const scenarios: Array<{
  id: string;
  short: string;
  label: string;
  icon: typeof Workflow;
  input: string;
  steps: { label: string; detail: string }[];
  response: string;
  solution: SolutionBrief;
}> = [
  {
    id: "platform",
    short: "Platform",
    label: "Coordinate a multi-system exception",
    icon: Workflow,
    input: "Order 4821 is at risk: inventory changed after the delivery commitment.",
    steps: [
      {
        label: "Context assembled",
        detail: "Order, inventory, customer tier, logistics, and commitment data connected.",
      },
      {
        label: "Options evaluated",
        detail: "Approved fulfilment alternatives checked against cost and service rules.",
      },
      {
        label: "Decision routed",
        detail: "The recommended recovery plan is sent to the accountable owner for approval.",
      },
    ],
    response:
      "Two recovery options are available. Option A preserves the commitment at ₹8,400 additional cost and requires approval.",
    solution: {
      title: "Exception orchestration for your business",
      subtitle:
        "When work spans ERP, CRM, logistics, and finance, BYBO builds a platform that evaluates options and routes decisions—without replacing your core systems.",
      visualSteps: ["Context assembled", "Options evaluated", "Decision routed"],
      howWeBuild: [
        "Map triggers, data sources, approval rules, and accountable owners.",
        "Connect live systems through secure APIs with clear permissions.",
        "Deploy a review interface with monitoring and continuous improvement.",
      ],
      businessImpact: [
        {
          label: "Faster recovery",
          detail: "Exceptions reach the right person with full context.",
        },
        {
          label: "Lower leakage",
          detail: "Inventory and commitments visible before bad decisions.",
        },
        {
          label: "Audit-ready",
          detail: "Every recommendation and approval stays on record.",
        },
      ],
      deliverables: [
        "Integration layer",
        "Decision engine",
        "Review console",
        "Monitoring",
      ],
      relatedSystemSlug: "agentic-operations",
      relatedSystemName: "Agentic Operations",
    },
  },
  {
    id: "knowledge",
    short: "Knowledge",
    label: "Answer an enterprise operating question",
    icon: Database,
    input: "Which renewal commitments made this quarter are not reflected in delivery plans?",
    steps: [
      {
        label: "Sources searched",
        detail: "CRM notes, contracts, account plans, and delivery records retrieved with permissions.",
      },
      {
        label: "Evidence reconciled",
        detail: "Commitments matched against owners, timelines, and current delivery capacity.",
      },
      {
        label: "Brief prepared",
        detail: "Gaps, source links, confidence, and accountable next actions made visible.",
      },
    ],
    response:
      "Four commitments need attention. Two have no delivery owner; one conflicts with current capacity. Sources are attached.",
    solution: {
      title: "Enterprise knowledge your teams can trust",
      subtitle:
        "Instead of searching folders and five applications, BYBO builds a governed layer that answers operating questions with sources and permissions.",
      visualSteps: ["Sources searched", "Evidence reconciled", "Brief prepared"],
      howWeBuild: [
        "Identify documents, systems, and owners that hold the truth.",
        "Connect repositories into one retrieval layer with access controls.",
        "Add review workflows for sensitive answers and low-confidence responses.",
      ],
      businessImpact: [
        {
          label: "Less searching",
          detail: "Teams stop rebuilding the same answer every week.",
        },
        {
          label: "Better decisions",
          detail: "Gaps surface before they become client issues.",
        },
        {
          label: "Institutional memory",
          detail: "Critical knowledge survives team changes.",
        },
      ],
      deliverables: [
        "Knowledge graph",
        "Search interface",
        "Source citations",
        "Access controls",
      ],
      relatedSystemSlug: "enterprise-knowledge-systems",
      relatedSystemName: "Enterprise Knowledge Systems",
    },
  },
  {
    id: "operations",
    short: "Multimodal",
    label: "Process a complex document",
    icon: FileText,
    input: "Vendor_Invoice_0427.pdf · 8 pages · received 10:42",
    steps: [
      {
        label: "Fields extracted",
        detail: "Vendor, invoice number, tax, line items, and totals read.",
      },
      {
        label: "Rules validated",
        detail: "Purchase order and expected totals checked.",
      },
      {
        label: "Exception isolated",
        detail: "Only the mismatched line item is sent for human review.",
      },
    ],
    response:
      "Seven line items are validated. One quantity mismatch is isolated with the source page and approval request.",
    solution: {
      title: "Document intelligence without manual drag",
      subtitle:
        "BYBO builds systems that read invoices, forms, and scans—validate against your rules, post clean cases, and send only exceptions with evidence attached.",
      visualSteps: ["Fields extracted", "Rules validated", "Exception isolated"],
      howWeBuild: [
        "Define document types, fields, validation rules, and approval thresholds.",
        "Connect outputs to ERP, finance, or workflow tools your team already uses.",
        "Measure accuracy and turnaround before expanding document coverage.",
      ],
      businessImpact: [
        {
          label: "Shorter cycles",
          detail: "Routine documents move without manual re-keying.",
        },
        {
          label: "Fewer errors",
          detail: "Validation happens before records or payments change.",
        },
        {
          label: "Focused effort",
          detail: "Your team reviews exceptions, not every page.",
        },
      ],
      deliverables: [
        "Extraction models",
        "Validation rules",
        "Exception queue",
        "ERP integration",
      ],
      relatedSystemSlug: "document-multimodal-intelligence",
      relatedSystemName: "Document & Multimodal Intelligence",
    },
  },
];

const STEP_INTERVAL_MS = 720;
const SOLUTION_DELAY_MS = 1800;

export function InteractiveSystemDemo() {
  const [activeId, setActiveId] = useState(scenarios[0].id);
  const [completed, setCompleted] = useState(0);
  const [running, setRunning] = useState(false);
  const [solutionOpen, setSolutionOpen] = useState(false);
  const [awaitingSolution, setAwaitingSolution] = useState(false);
  const timerRef = useRef<number | null>(null);
  const solutionTimerRef = useRef<number | null>(null);
  const shouldOpenSolutionRef = useRef(false);

  const active =
    scenarios.find((scenario) => scenario.id === activeId) ?? scenarios[0];
  const ActiveIcon = active.icon;

  const clearStepTimer = () => {
    if (timerRef.current !== null) {
      window.clearInterval(timerRef.current);
      timerRef.current = null;
    }
  };

  const clearSolutionTimer = () => {
    if (solutionTimerRef.current !== null) {
      window.clearTimeout(solutionTimerRef.current);
      solutionTimerRef.current = null;
    }
  };

  useEffect(
    () => () => {
      clearStepTimer();
      clearSolutionTimer();
    },
    [],
  );

  const selectScenario = (id: string) => {
    clearStepTimer();
    clearSolutionTimer();
    shouldOpenSolutionRef.current = false;
    setActiveId(id);
    setCompleted(0);
    setRunning(false);
    setAwaitingSolution(false);
    setSolutionOpen(false);
  };

  const run = () => {
    clearStepTimer();
    clearSolutionTimer();
    setSolutionOpen(false);
    setAwaitingSolution(false);
    setCompleted(0);
    setRunning(true);
    let nextStep = 0;

    timerRef.current = window.setInterval(() => {
      nextStep += 1;
      setCompleted(nextStep);

      if (nextStep >= active.steps.length) {
        clearStepTimer();
        setRunning(false);

        if (shouldOpenSolutionRef.current) {
          shouldOpenSolutionRef.current = false;
          setAwaitingSolution(true);
          solutionTimerRef.current = window.setTimeout(() => {
            setAwaitingSolution(false);
            setSolutionOpen(true);
          }, SOLUTION_DELAY_MS);
        }
      }
    }, STEP_INTERVAL_MS);
  };

  const handlePrimaryAction = () => {
    const isReplay = completed === active.steps.length;
    if (!isReplay) {
      shouldOpenSolutionRef.current = true;
    }
    run();
  };

  return (
    <>
      <div className="relative overflow-hidden border border-line bg-panel shadow-2xl shadow-black/30">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-signal to-transparent" />

        <div className="flex items-center justify-between border-b border-line px-5 py-4">
          <div className="flex items-center gap-3">
            <span className="flex h-9 w-9 items-center justify-center border border-line bg-void text-signal">
              <Sparkles size={16} aria-hidden="true" />
            </span>
            <div>
              <p className="technical-label text-cream">Workflow lab</p>
              <p className="mt-1 font-mono text-[0.55rem] uppercase tracking-[0.12em] text-dim">
                Try an illustrative BYBO system
              </p>
            </div>
          </div>
          <span
            className={`inline-flex items-center gap-2 font-mono text-[0.58rem] uppercase tracking-[0.12em] ${
              running
                ? "text-signal"
                : awaitingSolution
                  ? "text-signal"
                  : completed === active.steps.length
                    ? "text-success"
                    : "text-dim"
            }`}
          >
            <span
              className={`h-1.5 w-1.5 rounded-full ${
                running || awaitingSolution
                  ? "signal-pulse bg-signal"
                  : completed === active.steps.length
                    ? "bg-success"
                    : "bg-dim"
              }`}
            />
            {running
              ? "Running"
              : awaitingSolution
                ? "Preparing brief"
                : completed === active.steps.length
                  ? "Complete"
                  : "Ready"}
          </span>
        </div>

        <div className="grid grid-cols-3 border-b border-line">
          {scenarios.map((scenario) => (
            <button
              key={scenario.id}
              onClick={() => selectScenario(scenario.id)}
              className={`min-h-12 border-r border-line px-2 font-mono text-[0.58rem] font-semibold uppercase tracking-[0.08em] last:border-r-0 sm:px-4 ${
                scenario.id === activeId
                  ? "bg-signal text-signal-ink"
                  : "bg-void/35 text-dim hover:bg-panel-2 hover:text-cream"
              }`}
              aria-pressed={scenario.id === activeId}
            >
              {scenario.short}
            </button>
          ))}
        </div>

        <div className="p-5 sm:p-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={active.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.2 }}
            >
              <div className="flex items-start gap-3">
                <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center border border-line bg-void text-signal">
                  <ActiveIcon size={16} aria-hidden="true" />
                </span>
                <div>
                  <p className="font-display text-lg font-bold tracking-[-0.03em]">
                    {active.label}
                  </p>
                  <p className="mt-1 text-xs text-dim">
                    Run the workflow, read the system response, then see how BYBO
                    would build it.
                  </p>
                </div>
              </div>

              <div className="mt-5 border border-line bg-void/60 p-4">
                <p className="technical-label text-dim">Incoming signal</p>
                <p className="mt-3 text-sm leading-6 text-fog">
                  &ldquo;{active.input}&rdquo;
                </p>
              </div>

              <div className="mt-3 space-y-2">
                {active.steps.map((step, index) => {
                  const isComplete = index < completed;
                  const isActive = running && index === completed;
                  return (
                    <div
                      key={step.label}
                      className={`flex items-start gap-3 border px-4 py-3 transition-colors ${
                        isComplete
                          ? "border-success/30 bg-success/5"
                          : isActive
                            ? "border-signal/50 bg-signal/5"
                            : "border-line bg-panel-2/40"
                      }`}
                    >
                      <span
                        className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border ${
                          isComplete
                            ? "border-success bg-success text-signal-ink"
                            : isActive
                              ? "signal-pulse border-signal text-signal"
                              : "border-line text-dim"
                        }`}
                      >
                        {isComplete ? (
                          <Check size={11} strokeWidth={3} />
                        ) : (
                          <span className="font-mono text-[0.52rem]">{index + 1}</span>
                        )}
                      </span>
                      <div>
                        <p className={`text-xs font-semibold ${isComplete ? "text-cream" : "text-fog"}`}>
                          {step.label}
                        </p>
                        <p className="mt-1 text-[0.68rem] leading-5 text-dim">
                          {step.detail}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>

              <AnimatePresence>
                {completed === active.steps.length && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-3 border-l-2 border-signal bg-signal/5 px-4 py-3"
                  >
                    <p className="technical-label text-signal">System response</p>
                    <p className="mt-2 text-xs leading-5 text-fog">
                      {active.response}
                    </p>
                    {awaitingSolution && (
                      <p className="mt-3 font-mono text-[0.52rem] uppercase tracking-[0.1em] text-dim">
                        Opening solution brief…
                      </p>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </AnimatePresence>

          <div className="mt-5 grid gap-3">
            <button
              onClick={handlePrimaryAction}
              disabled={running || awaitingSolution}
              className="inline-flex min-h-12 w-full items-center justify-center gap-3 bg-cream px-5 font-mono text-[0.64rem] font-bold uppercase tracking-[0.1em] text-signal-ink transition-colors hover:bg-signal disabled:cursor-wait disabled:opacity-60"
            >
              {completed === active.steps.length ? (
                <RefreshCw size={14} aria-hidden="true" />
              ) : (
                <Play size={14} fill="currentColor" aria-hidden="true" />
              )}
              {running
                ? "System running"
                : awaitingSolution
                  ? "Preparing brief"
                  : completed === active.steps.length
                    ? "Run again"
                    : "Run this workflow"}
              {!running && !awaitingSolution && (
                <ArrowRight size={14} aria-hidden="true" />
              )}
            </button>

            {completed === active.steps.length && !awaitingSolution && (
              <button
                type="button"
                onClick={() => setSolutionOpen(true)}
                className="ghost-button w-full justify-center"
              >
                View solution brief
              </button>
            )}
          </div>

          <p className="mt-3 text-center font-mono text-[0.52rem] uppercase tracking-[0.1em] text-dim">
            Concept demonstration · no client data · no performance claim
          </p>
        </div>
      </div>

      <SolutionBriefModal
        open={solutionOpen}
        onClose={() => setSolutionOpen(false)}
        brief={active.solution}
      />
    </>
  );
}
