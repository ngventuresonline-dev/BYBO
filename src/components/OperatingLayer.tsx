"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Activity,
  ArrowRight,
  Check,
  Database,
  GitBranch,
  MessageSquareText,
  ShieldCheck,
  SlidersHorizontal,
} from "lucide-react";

const views = [
  {
    id: "design",
    label: "Design",
    icon: GitBranch,
    title: "Map the work before adding AI.",
    text: "Define the trigger, context, decision rules, approvals, and exceptions as one visible workflow.",
  },
  {
    id: "operate",
    label: "Operate",
    icon: Activity,
    title: "See what the system is doing.",
    text: "Monitor every run, inspect sources, surface failures, and keep the operating owner informed.",
  },
  {
    id: "improve",
    label: "Improve",
    icon: SlidersHorizontal,
    title: "Turn exceptions into learning.",
    text: "Review recurring failure patterns and improve knowledge, rules, prompts, and escalation paths.",
  },
];

export function OperatingLayer() {
  const [activeId, setActiveId] = useState("design");
  const active = views.find((view) => view.id === activeId) ?? views[0];

  return (
    <div className="overflow-hidden rounded-[1.6rem] border border-black/10 bg-[#141414] text-cream shadow-[0_30px_80px_rgba(20,20,20,0.18)]">
      <div className="flex items-center justify-between border-b border-white/10 px-5 py-4 sm:px-6">
        <div className="flex items-center gap-3">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-signal text-signal-ink">
            <Activity size={15} />
          </span>
          <div>
            <p className="text-sm font-semibold">BYBO Control Room</p>
            <p className="mt-0.5 font-mono text-[0.52rem] uppercase tracking-[0.1em] text-white/50">
              Demonstration environment
            </p>
          </div>
        </div>
        <span className="inline-flex items-center gap-2 font-mono text-[0.55rem] uppercase tracking-[0.1em] text-success">
          <span className="h-1.5 w-1.5 rounded-full bg-success" />
          Systems healthy
        </span>
      </div>

      <div className="grid lg:grid-cols-[0.32fr_1fr]">
        <div className="border-b border-white/10 bg-black/20 p-3 lg:border-b-0 lg:border-r">
          <div className="grid grid-cols-3 gap-2 lg:grid-cols-1">
            {views.map((view) => (
              <button
                key={view.id}
                onClick={() => setActiveId(view.id)}
                className={`flex min-h-12 items-center gap-3 rounded-xl px-3 text-left text-xs font-semibold transition-colors ${
                  activeId === view.id
                    ? "bg-white text-void"
                    : "text-white/45 hover:bg-white/5 hover:text-white"
                }`}
                aria-pressed={activeId === view.id}
              >
                <view.icon size={15} className="hidden shrink-0 sm:block" />
                {view.label}
              </button>
            ))}
          </div>

          <div className="mt-5 hidden border-t border-white/10 pt-5 lg:block">
            <p className="font-mono text-[0.52rem] uppercase tracking-[0.12em] text-white/30">
              Connected layer
            </p>
            <div className="mt-3 space-y-2">
              {[
                [MessageSquareText, "Customer channels"],
                [Database, "Business data"],
                [ShieldCheck, "Controls"],
              ].map(([Icon, label]) => {
                const Component = Icon as typeof MessageSquareText;
                return (
                  <div
                    key={label as string}
                    className="flex items-center gap-2 rounded-lg border border-white/8 px-3 py-2 text-[0.65rem] text-white/45"
                  >
                    <Component size={12} />
                    {label as string}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="min-h-[29rem] p-5 sm:p-7">
          <AnimatePresence mode="wait">
            <motion.div
              key={active.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.2 }}
            >
              <div className="flex flex-col gap-5 border-b border-white/10 pb-6 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <p className="font-mono text-[0.55rem] uppercase tracking-[0.13em] text-signal">
                    {active.label} layer
                  </p>
                  <h3 className="mt-3 max-w-xl font-display text-2xl font-extrabold tracking-[-0.04em] sm:text-3xl">
                    {active.title}
                  </h3>
                  <p className="mt-3 max-w-xl text-sm leading-6 text-white/48">
                    {active.text}
                  </p>
                </div>
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/10 text-signal">
                  <active.icon size={17} />
                </span>
              </div>

              {active.id === "design" && <DesignView />}
              {active.id === "operate" && <OperateView />}
              {active.id === "improve" && <ImproveView />}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

function DesignView() {
  return (
    <div className="mt-6">
      <div className="grid gap-3 sm:grid-cols-[1fr_auto_1fr_auto_1fr] sm:items-center">
        {[
          ["01", "Signal", "WhatsApp enquiry received"],
          ["02", "Reason", "Intent and context understood"],
          ["03", "Act", "Qualified brief sent to sales"],
        ].map(([index, title, detail], position) => (
          <div key={title} className="contents">
            <div className="rounded-xl border border-white/10 bg-white/[0.025] p-4">
              <span className="font-mono text-[0.52rem] text-signal">/{index}</span>
              <p className="mt-5 text-sm font-semibold">{title}</p>
              <p className="mt-2 text-[0.68rem] leading-5 text-white/38">{detail}</p>
            </div>
            {position < 2 && (
              <ArrowRight size={14} className="hidden text-white/20 sm:block" />
            )}
          </div>
        ))}
      </div>

      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        <div className="rounded-xl border border-white/10 p-4">
          <p className="font-mono text-[0.52rem] uppercase tracking-[0.1em] text-white/30">
            Human checkpoint
          </p>
          <p className="mt-2 text-xs text-white/60">
            Discount requests above the approved threshold.
          </p>
        </div>
        <div className="rounded-xl border border-white/10 p-4">
          <p className="font-mono text-[0.52rem] uppercase tracking-[0.1em] text-white/30">
            Exception path
          </p>
          <p className="mt-2 text-xs text-white/60">
            Missing product or delivery information.
          </p>
        </div>
      </div>
    </div>
  );
}

function OperateView() {
  return (
    <div className="mt-6 grid gap-3 sm:grid-cols-2">
      {[
        ["Revenue workflow", "Healthy", "Every decision traceable"],
        ["Support knowledge", "Review", "Two answers awaiting approval"],
        ["Document intake", "Healthy", "Exceptions routed correctly"],
        ["Management brief", "Scheduled", "Next summary at 18:00"],
      ].map(([title, state, detail], index) => (
        <div key={title} className="rounded-xl border border-white/10 bg-white/[0.025] p-4">
          <div className="flex items-center justify-between">
            <p className="text-xs font-semibold">{title}</p>
            <span
              className={`font-mono text-[0.5rem] uppercase tracking-[0.1em] ${
                index === 1 ? "text-signal" : "text-success"
              }`}
            >
              {state}
            </span>
          </div>
          <p className="mt-5 text-[0.68rem] text-white/35">{detail}</p>
          <div className="mt-3 h-1 overflow-hidden rounded-full bg-white/5">
            <div
              className={`h-full ${index === 1 ? "w-[58%] bg-signal" : "w-[86%] bg-success"}`}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

function ImproveView() {
  return (
    <div className="mt-6 space-y-3">
      {[
        ["Repeated question", "Customers ask whether festive packaging affects delivery time."],
        ["Observed gap", "The approved knowledge has packaging detail but no delivery qualifier."],
        ["Recommended change", "Add a delivery-time rule and test it against recent conversations."],
      ].map(([title, detail], index) => (
        <div
          key={title}
          className="grid gap-3 rounded-xl border border-white/10 bg-white/[0.025] p-4 sm:grid-cols-[2.2rem_0.45fr_1fr]"
        >
          <span
            className={`flex h-7 w-7 items-center justify-center rounded-full font-mono text-[0.55rem] ${
              index === 2 ? "bg-signal text-signal-ink" : "border border-white/10 text-white/50"
            }`}
          >
            {index === 2 ? <Check size={12} /> : `0${index + 1}`}
          </span>
          <p className="text-xs font-semibold">{title}</p>
          <p className="text-[0.68rem] leading-5 text-white/38">{detail}</p>
        </div>
      ))}
    </div>
  );
}
