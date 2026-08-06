"use client";

import type { ReactNode } from "react";
import { useEffect, useState } from "react";
import {
  Check,
  ChevronRight,
  Database,
  GitBranch,
  Search,
  Shield,
  Sparkles,
} from "lucide-react";

function MockChrome({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <div className="platform-mock">
      <div className="platform-mock__chrome">
        <span className="platform-mock__dot platform-mock__dot--a" />
        <span className="platform-mock__dot platform-mock__dot--b" />
        <span className="platform-mock__dot platform-mock__dot--c" />
        <span className="platform-mock__title">{title}</span>
      </div>
      <div className="platform-mock__body">{children}</div>
    </div>
  );
}

function useMockCycle(length: number, interval = 2200, enabled = true) {
  const [step, setStep] = useState(0);

  useEffect(() => {
    if (!enabled) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const timer = window.setInterval(() => {
      setStep((current) => (current + 1) % length);
    }, interval);

    return () => window.clearInterval(timer);
  }, [enabled, interval, length]);

  return step;
}

export function PlatformsMock({ active }: { active: boolean }) {
  const step = useMockCycle(4, 2400, active);
  const rows = [
    { label: "Order 4821 exception", status: "Routing", tone: "signal" },
    { label: "Inventory sync", status: "Complete", tone: "success" },
    { label: "Recovery plan draft", status: "Awaiting approval", tone: "warn" },
    { label: "Customer tier check", status: "Complete", tone: "success" },
  ];

  return (
    <MockChrome title="Operations platform">
      <div className="space-y-2.5">
        {rows.map((row, index) => {
          const lit = index <= step;
          return (
            <div
              key={row.label}
              className={`platform-mock__row ${lit ? "platform-mock__row--lit" : ""}`}
            >
              <GitBranch size={14} className="shrink-0 text-signal" />
              <div className="min-w-0 flex-1">
                <p className="truncate text-xs font-semibold text-surface-ink">
                  {row.label}
                </p>
                <p className="mt-0.5 font-mono text-[0.52rem] uppercase tracking-[0.1em] text-surface-muted">
                  {lit ? row.status : "Queued"}
                </p>
              </div>
              {lit && row.tone === "success" && (
                <Check size={14} className="shrink-0 text-emerald-600" />
              )}
              {lit && row.tone === "signal" && (
                <Sparkles size={14} className="shrink-0 text-signal" />
              )}
            </div>
          );
        })}
      </div>
      <div className="platform-mock__footer">
        <span className="platform-mock__badge platform-mock__badge--signal">
          Live orchestration
        </span>
        <span className="font-mono text-[0.52rem] text-surface-muted">
          4 systems connected
        </span>
      </div>
    </MockChrome>
  );
}

export function AgentsMock({ active }: { active: boolean }) {
  const step = useMockCycle(3, 2600, active);
  const steps = [
    "Context assembled from CRM + ERP",
    "Options scored against policy rules",
    "Routed to owner for approval",
  ];

  return (
    <MockChrome title="Agent run">
      <div className="platform-mock__agent-input">
        <p className="font-mono text-[0.52rem] uppercase tracking-[0.12em] text-surface-muted">
          Trigger
        </p>
        <p className="mt-2 text-sm leading-6 text-surface-ink">
          Delivery commitment at risk after inventory change on order 4821.
        </p>
      </div>
      <div className="mt-4 space-y-2">
        {steps.map((label, index) => {
          const done = index < step;
          const running = index === step;
          return (
            <div
              key={label}
              className={`platform-mock__step ${done ? "platform-mock__step--done" : running ? "platform-mock__step--active" : ""}`}
            >
              <span className="platform-mock__step-index">
                {done ? <Check size={10} strokeWidth={3} /> : index + 1}
              </span>
              <p className="text-xs leading-5 text-surface-ink">{label}</p>
            </div>
          );
        })}
      </div>
    </MockChrome>
  );
}

export function KnowledgeMock({ active }: { active: boolean }) {
  const step = useMockCycle(3, 2800, active);
  const sources = [
    "CRM renewal notes",
    "Signed contract pack",
    "Delivery capacity plan",
  ];

  return (
    <MockChrome title="Knowledge brief">
      <div className="platform-mock__search">
        <Search size={14} className="text-surface-muted" />
        <span className="text-sm text-surface-ink">
          Which renewals lack delivery owners?
        </span>
      </div>
      <div className="mt-4 space-y-2">
        {sources.map((source, index) => {
          const visible = index <= step;
          return (
            <div
              key={source}
              className={`platform-mock__source ${visible ? "platform-mock__source--visible" : ""}`}
            >
              <Database size={13} className="shrink-0 text-signal" />
              <span className="text-xs text-surface-ink">{source}</span>
              {visible && (
                <span className="ml-auto font-mono text-[0.48rem] uppercase tracking-[0.1em] text-emerald-700">
                  Matched
                </span>
              )}
            </div>
          );
        })}
      </div>
      {step >= 2 && (
        <div className="platform-mock__answer">
          <p className="font-mono text-[0.52rem] uppercase tracking-[0.12em] text-signal">
            Answer ready
          </p>
          <p className="mt-2 text-xs leading-5 text-surface-ink">
            4 commitments need attention. Sources attached with permissions.
          </p>
        </div>
      )}
    </MockChrome>
  );
}

export function IntelligenceMock({ active }: { active: boolean }) {
  const step = useMockCycle(3, 2500, active);
  const options = [
    { label: "Option A", detail: "Preserve commitment", cost: "₹8,400" },
    { label: "Option B", detail: "Delay + credit", cost: "₹2,100" },
    { label: "Option C", detail: "Split shipment", cost: "₹5,600" },
  ];

  return (
    <MockChrome title="Decision layer">
      <p className="text-xs leading-5 text-surface-muted">
        Scenario comparison with evidence and policy fit.
      </p>
      <div className="mt-4 space-y-2">
        {options.map((option, index) => {
          const highlighted = index === step;
          return (
            <div
              key={option.label}
              className={`platform-mock__option ${highlighted ? "platform-mock__option--active" : ""}`}
            >
              <div className="flex items-center justify-between gap-2">
                <p className="text-xs font-semibold text-surface-ink">
                  {option.label}
                </p>
                <span className="font-mono text-[0.52rem] text-surface-muted">
                  {option.cost}
                </span>
              </div>
              <p className="mt-1 text-[0.68rem] leading-5 text-surface-muted">
                {option.detail}
              </p>
              {highlighted && (
                <span className="platform-mock__badge platform-mock__badge--signal mt-2">
                  Recommended
                </span>
              )}
            </div>
          );
        })}
      </div>
    </MockChrome>
  );
}

export function GovernanceMock({ active }: { active: boolean }) {
  const step = useMockCycle(3, 2300, active);
  const checks = [
    "Spend limit within policy",
    "Owner identified and notified",
    "Audit trail written",
  ];

  return (
    <MockChrome title="Approval queue">
      <div className="platform-mock__approval-card">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-xs font-semibold text-surface-ink">
              Recovery plan for order 4821
            </p>
            <p className="mt-1 text-[0.68rem] text-surface-muted">
              Awaiting operations lead
            </p>
          </div>
          <Shield size={16} className="shrink-0 text-signal" />
        </div>
      </div>
      <div className="mt-4 space-y-2">
        {checks.map((check, index) => {
          const done = index < step;
          return (
            <div
              key={check}
              className={`platform-mock__check ${done ? "platform-mock__check--done" : ""}`}
            >
              <span className="platform-mock__step-index">
                {done ? <Check size={10} strokeWidth={3} /> : index + 1}
              </span>
              <p className="text-xs text-surface-ink">{check}</p>
              {done && (
                <ChevronRight size={12} className="ml-auto text-emerald-600" />
              )}
            </div>
          );
        })}
      </div>
    </MockChrome>
  );
}

export function IntegrationsMock({ active }: { active: boolean }) {
  const step = useMockCycle(6, 1800, active);
  const tools = [
    ["WhatsApp", "Channel"],
    ["HubSpot", "CRM"],
    ["Shopify", "Commerce"],
    ["PostgreSQL", "Data"],
    ["Freshdesk", "Support"],
    ["Slack", "Ops"],
  ];

  return (
    <MockChrome title="Connected stack">
      <div className="grid grid-cols-2 gap-2">
        {tools.map(([tool, category], index) => {
          const linked = index <= step;
          return (
            <div
              key={tool}
              className={`platform-mock__tool ${linked ? "platform-mock__tool--linked" : ""}`}
            >
              <p className="text-xs font-bold text-surface-ink">{tool}</p>
              <p className="mt-0.5 font-mono text-[0.48rem] uppercase tracking-[0.1em] text-surface-muted">
                {category}
              </p>
              {linked && <span className="platform-mock__link-dot" />}
            </div>
          );
        })}
      </div>
      <div className="platform-mock__footer">
        <span className="font-mono text-[0.52rem] text-surface-muted">
          {Math.min(step + 1, tools.length)} of {tools.length} linked
        </span>
        <span className="platform-mock__badge platform-mock__badge--signal">
          No rip-and-replace
        </span>
      </div>
    </MockChrome>
  );
}
