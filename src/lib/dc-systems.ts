/**
 * Presentation model for the capability stack, ordered by payback speed as in
 * the redesign. Display names and copy come from the design; `slug` points at
 * the existing detail routes so published URLs stay stable.
 */
export type FigureStage = {
  title: string;
  /** Up to two mono sub-lines printed under the node. */
  lines?: string[];
};

export type SystemSheet = {
  /** Hero headline on the detail page. */
  headline: string;
  lede: string;
  figure: {
    caption: string;
    note: string;
    stages: FigureStage[];
    /** Index of the stage drawn as the approval gate. */
    gate: number;
    /** Label on the correction loop back from the gate. */
    loopback?: string;
    footnote: string;
  };
  measures: string[];
  aside: { title: string; body: string };
};

export type StackEntry = {
  index: string;
  name: string;
  slug: string;
  /** Short blurb used in the home-page list. */
  brief: string;
  /** Longer blurb used on the /systems grid. */
  detail: string;
  /** Relative payback-speed bar width on the /systems hero. */
  payback: string;
  /** Hand-authored detail-page content; other systems derive theirs. */
  sheet?: SystemSheet;
};

export const STACK: StackEntry[] = [
  {
    index: "/01",
    name: "Business Operations",
    slug: "document-multimodal-intelligence",
    brief:
      "Reads your documents, checks the details, and sends approvals to the right person. The quickest saving to prove.",
    detail:
      "Invoices, PODs, KYC packets, RFQs, claims, contracts. The system reads them, checks them against your rules, posts them into your systems, and sends only the genuine exceptions to a person.",
    payback: "26%",
    sheet: {
      headline: "Stop paying people to re-type documents.",
      lede: "Invoices, purchase orders, PODs, KYC packets, RFQs, claims, contracts. If the work is “open the file, find the fields, check them, put them somewhere else”, this system does it unattended — and hands you back only the small share that genuinely needs a decision.",
      figure: {
        caption: "Fig. 1 — One file, end to end",
        note: "Rev. 04 · median 40s",
        gate: 3,
        loopback: "19% RETURNED FOR CORRECTION",
        footnote: "81% STRAIGHT THROUGH · 0% UNLOGGED",
        stages: [
          { title: "Arrives", lines: ["EMAIL · WHATSAPP", "PORTAL · SCANNER"] },
          { title: "Read", lines: ["14 FIELDS EXTRACTED", "EACH WITH CONFIDENCE"] },
          { title: "Checked", lines: ["MASTER DATA", "TOLERANCES · RULES"] },
          { title: "Approved", lines: ["APPROVAL GATE", "A NAMED PERSON"] },
          { title: "Posted", lines: ["TALLY · SAP · ZOHO", "WITH FULL TRAIL"] },
        ],
      },
      measures: [
        "Turnaround time per document, before and after",
        "Straight-through rate — the share needing no human at all",
        "Error and rework rate against your current baseline",
        "Cost per document, including what the models cost to run",
      ],
      aside: {
        title: "“Our data isn’t ready”",
        body: "It usually is not, and it does not need to be. We start with the documents exactly as they are — poor scans, different formats, four ways of naming the same thing. What we do need is a written rule for what “correct” means and one person who can settle an argument. The Blueprint sorts out both in the first week.",
      },
    },
  },
  {
    index: "/02",
    name: "Agentic Operations",
    slug: "agentic-operations",
    brief:
      "Work that spans teams and tools, carried end to end — every action logged, only the crucial ones held.",
    detail:
      "Work that crosses teams and tools — onboarding, reconciliation, order-to-cash — carried end to end and unattended. Every action logged; only the crucial ones wait for a person.",
    payback: "20%",
  },
  {
    index: "/03",
    name: "Enterprise Knowledge",
    slug: "enterprise-knowledge-systems",
    brief:
      "Ask a question, get the answer from your own documents, with the page it came from — or an honest “not found”.",
    detail:
      "Policies, contracts, SOPs and past projects made answerable — with the source line cited, permissions respected, and a refusal when the answer isn’t there.",
    payback: "16%",
  },
  {
    index: "/04",
    name: "Custom AI Platforms",
    slug: "custom-ai-platforms",
    brief:
      "Software built around how your business actually works, using your own data, and not tied to one supplier.",
    detail:
      "When the workflow is your actual advantage, it deserves a product. Models, your proprietary data, role-specific interfaces and enterprise controls — portable across vendors.",
    payback: "13%",
  },
  {
    index: "/05",
    name: "Customer & Workforce AI",
    slug: "customer-workforce-ai",
    brief:
      "Enquiries, bookings and follow-ups handled in your customer’s language, with only the sensitive ones passed to a person.",
    detail:
      "Enquiries answered in minutes, in the customer’s language, on WhatsApp or the phone. Most conversations never need a person; the ones that do are escalated by a rule you wrote.",
    payback: "10%",
  },
  {
    index: "/06",
    name: "Decision Intelligence",
    slug: "decision-intelligence",
    brief:
      "One set of numbers everyone trusts, updated on its own, with a note on what changed and why.",
    detail:
      "One version of the numbers across outlets, regions or lines — refreshed without anyone building a deck, with a written explanation of what moved and why.",
    payback: "8%",
  },
  {
    index: "/07",
    name: "Infrastructure & Governance",
    slug: "ai-infrastructure-governance",
    brief:
      "Who can use it, what it did, how well it works and what it costs. The part your compliance team asks about.",
    detail:
      "Access control, audit logs, evaluation runs, model and cost management. Not an upsell — it ships with everything above, because procurement will ask.",
    payback: "7%",
  },
];

/** The system the site funnels people toward first. */
export const LEAD_SYSTEM = STACK[0];

export const STACK_BY_SLUG = new Map(STACK.map((entry) => [entry.slug, entry]));
