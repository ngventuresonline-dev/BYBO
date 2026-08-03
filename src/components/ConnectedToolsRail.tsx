"use client";

import { motion, useReducedMotion } from "framer-motion";

const toolRows = [
  [
    ["WhatsApp", "Channel"],
    ["HubSpot", "CRM"],
    ["Shopify", "Commerce"],
    ["Google Workspace", "Productivity"],
    ["Razorpay", "Payments"],
    ["Freshdesk", "Support"],
    ["Tally", "Operations"],
    ["Meta Ads", "Acquisition"],
    ["PostgreSQL", "Data"],
  ],
  [
    ["Zoho", "CRM"],
    ["Salesforce", "CRM"],
    ["WooCommerce", "Commerce"],
    ["Microsoft 365", "Productivity"],
    ["Stripe", "Payments"],
    ["Intercom", "Support"],
    ["Slack", "Collaboration"],
    ["Notion", "Knowledge"],
    ["Airtable", "Operations"],
  ],
];

export function ConnectedToolsRail() {
  const reduceMotion = useReducedMotion();
  const tools = toolRows.flat();

  if (reduceMotion) {
    return (
      <div className="grid grid-cols-2 overflow-hidden rounded-2xl border border-surface-line bg-surface-line sm:grid-cols-3">
        {tools.map(([tool, category]) => (
          <div
            key={tool}
            className="flex min-h-20 flex-col justify-center bg-surface px-4"
          >
            <span className="font-display text-sm font-bold tracking-[-0.025em]">
              {tool}
            </span>
            <span className="mt-1 font-mono text-[0.48rem] uppercase tracking-[0.12em] text-surface-muted">
              {category}
            </span>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div
      className="relative overflow-hidden rounded-2xl border border-surface-line bg-surface"
      style={{
        maskImage:
          "linear-gradient(90deg, transparent, black 5%, black 95%, transparent)",
      }}
    >
      {toolRows.map((row, rowIndex) => (
        <div
          key={rowIndex}
          className={`${rowIndex === 0 ? "border-b border-surface-line" : ""} overflow-hidden`}
        >
          <motion.div
            className="flex w-max"
            initial={{ x: rowIndex === 0 ? "0%" : "-50%" }}
            animate={{ x: rowIndex === 0 ? "-50%" : "0%" }}
            transition={{
              duration: rowIndex === 0 ? 34 : 38,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            {[...row, ...row].map(([tool, category], index) => (
              <div
                key={`${tool}-${index}`}
                aria-hidden={index >= row.length}
                className="relative flex min-h-20 w-40 shrink-0 flex-col justify-center border-r border-surface-line bg-surface px-4 sm:w-44"
              >
                <span className="font-display text-sm font-bold tracking-[-0.025em] text-surface-ink">
                  {tool}
                </span>
                <span className="mt-1 font-mono text-[0.48rem] uppercase tracking-[0.12em] text-surface-muted">
                  {category}
                </span>
                <span className="absolute bottom-3 right-3 h-1 w-1 rounded-full bg-signal/60" />
              </div>
            ))}
          </motion.div>
        </div>
      ))}
    </div>
  );
}
