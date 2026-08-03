import type { InsightVisualKey } from "@/components/page-visuals/InsightVisuals";

export type InsightLink = {
  href: string;
  label: string;
  description?: string;
};

export type InsightBlock =
  | { type: "prose"; paragraphs: string[] }
  | { type: "heading"; text: string; level?: 2 | 3 }
  | { type: "visual"; visual: InsightVisualKey; caption?: string }
  | {
      type: "stats";
      items: { label: string; value: string; detail?: string }[];
    }
  | {
      type: "callout";
      variant: "insight" | "action" | "caution";
      title: string;
      body: string;
    }
  | { type: "checklist"; title: string; items: string[] }
  | { type: "pullquote"; text: string; attribution?: string }
  | { type: "links"; title: string; links: InsightLink[] };

export type InsightArticle = {
  slug: string;
  category: string;
  title: string;
  excerpt: string;
  metaDescription: string;
  seoKeywords: string[];
  readTime: string;
  published: boolean;
  publishedAt?: string;
  image: string;
  imageAlt: string;
  relatedSlugs: string[];
  blocks: InsightBlock[];
};

export const insightArticles: InsightArticle[] = [
  {
    slug: "why-ai-pilots-fail",
    category: "Field note",
    title: "Why most AI pilots never become operating systems",
    excerpt:
      "The gap between an impressive demo and a dependable workflow is governance, evaluation, and ownership.",
    metaDescription:
      "Learn why AI pilots fail in Indian businesses and how to move from demo to production with governance, baselines, and clear ownership. Enterprise AI implementation guide by BYBO.",
    seoKeywords: [
      "AI pilot failure",
      "enterprise AI implementation",
      "AI governance India",
      "production AI systems",
      "AI operating system",
      "human in the loop AI",
      "AI ROI measurement",
    ],
    readTime: "8 min",
    published: true,
    publishedAt: "2026-08-02",
    image: "/images/bybo-insight-pilots-fail.png",
    imageAlt:
      "Contrast between an AI demo screen and real business operations with documents and messages",
    relatedSlugs: ["rank-ai-opportunities", "human-in-the-loop-product-decision"],
    blocks: [
      {
        type: "prose",
        paragraphs: [
          "Most businesses have seen an AI demo that looked convincing. Few have seen one survive the first month of real operations.",
          "The failure rarely comes from the model. It comes from what happens after the demo: unclear ownership, missing escalation paths, no baseline to measure against, and a workflow that was never mapped with its exceptions.",
        ],
      },
      {
        type: "stats",
        items: [
          { label: "Root cause", value: "Process", detail: "Not the LLM" },
          { label: "Missing layer", value: "Controls", detail: "Not compute" },
          { label: "First fix", value: "Owner", detail: "Not more features" },
        ],
      },
      {
        type: "heading",
        text: "Demos optimise for the happy path",
      },
      {
        type: "prose",
        paragraphs: [
          "A pilot is designed to show what AI can do on a clean example. Production work lives in the exceptions — the incomplete form, the ambiguous customer message, the policy change nobody told the system about.",
          "When those cases hit an AI layer with no rules, no sources, and no human hand-off, trust collapses quickly. Teams revert to WhatsApp, spreadsheets, and manual review.",
        ],
      },
      {
        type: "visual",
        visual: "pilot-vs-system",
        caption: "What separates a shelfware pilot from a system your team actually uses.",
      },
      {
        type: "pullquote",
        text: "If the workflow cannot support a baseline, a control plan, and an owner, it is not ready for AI — it is ready for a workshop.",
      },
      {
        type: "heading",
        text: "Operating systems need three things pilots skip",
      },
      {
        type: "checklist",
        title: "Before you call it production",
        items: [
          "Named owner accountable for outcomes — not just the vendor invoice",
          "Control model: auto-act, approve, or escalate — defined per step",
          "Baseline metrics: time, error rate, and cost before automation",
          "Exception map: what happens when data is missing or ambiguous",
          "Evaluation loop: weekly review of failures, not just uptime",
        ],
      },
      {
        type: "prose",
        paragraphs: [
          "Without these, any ROI claim is theatre. You cannot improve what you did not measure, and you cannot measure what you never documented.",
        ],
      },
      {
        type: "heading",
        text: "Governance is not a disclaimer",
      },
      {
        type: "visual",
        visual: "governance-stack",
        caption: "Layers every production AI workflow should have — even before regulators ask.",
      },
      {
        type: "prose",
        paragraphs: [
          "Human-in-the-loop is often treated as fine print. In a real business it is a product decision. Escalation design — who sees what, when, and with what context — determines whether staff trust the system enough to use it.",
        ],
      },
      {
        type: "callout",
        variant: "action",
        title: "Start with one workflow",
        body: "Map inputs, tools, hand-offs, exceptions, and sign-off. If you cannot draw it in one page, you are not ready to build.",
      },
      {
        type: "links",
        title: "Related BYBO resources",
        links: [
          {
            href: "/blueprint",
            label: "AI Opportunity Blueprint",
            description: "7–10 day diagnostic before you commit to a build.",
          },
          {
            href: "/systems/ai-infrastructure-governance",
            label: "AI Infrastructure & Governance",
            description: "How BYBO designs controls, access, and audit from day one.",
          },
          {
            href: "/how-we-work",
            label: "How we work",
            description: "Diagnose before you automate — our engagement model.",
          },
        ],
      },
    ],
  },
  {
    slug: "rank-ai-opportunities",
    category: "Framework",
    title: "How to rank AI opportunities by impact, feasibility, and risk",
    excerpt:
      "A practical scoring model for deciding what to automate first — and what to leave alone.",
    metaDescription:
      "Use this AI opportunity scoring framework to rank automation candidates by business impact, readiness, frequency, and risk. Prioritise enterprise AI projects that actually ship.",
    seoKeywords: [
      "AI opportunity prioritisation",
      "AI use case scoring",
      "automation ROI framework",
      "enterprise AI roadmap",
      "AI feasibility assessment",
      "AI risk scoring",
      "which workflow to automate first",
    ],
    readTime: "10 min",
    published: true,
    publishedAt: "2026-08-05",
    image: "/images/bybo-insight-opportunity-matrix.png",
    imageAlt: "Executive team reviewing an AI opportunity matrix on dashboard screens",
    relatedSlugs: ["why-ai-pilots-fail", "human-in-the-loop-product-decision"],
    blocks: [
      {
        type: "prose",
        paragraphs: [
          "Every leadership team has a list of places AI could help. The hard part is not generating ideas — it is choosing the first workflow that deserves budget, attention, and political capital.",
          "This framework ranks candidates on four axes: impact, frequency, readiness, and risk. It is the same logic BYBO uses inside the AI Opportunity Blueprint — simplified so you can run a first pass internally.",
        ],
      },
      {
        type: "visual",
        visual: "opportunity-matrix",
        caption: "Four quadrants — build first, blueprint next, defer, or do not automate.",
      },
      {
        type: "heading",
        text: "The four scoring axes",
      },
      {
        type: "prose",
        paragraphs: [
          "Impact: how much time, revenue, quality, or visibility is lost when this workflow fails or slows down? Frequency: how often does it run — daily fire-fighting beats monthly edge cases. Readiness: do you have process knowledge, data access, and a willing owner? Risk: what happens if the system is wrong — customer harm, compliance exposure, or irreversible decisions?",
        ],
      },
      {
        type: "visual",
        visual: "scoring-grid",
        caption: "Sample scores for three common workflow types — scale 1–10.",
      },
      {
        type: "callout",
        variant: "caution",
        title: "Do not automate low-frequency, high-risk work first",
        body: "Boards love the strategic use case. Operations teams drown in daily exceptions. Start where volume and economics justify the investment.",
      },
      {
        type: "heading",
        text: "How to use the scores",
      },
      {
        type: "checklist",
        title: "Decision rules",
        items: [
          "Impact ≥ 7 and Readiness ≥ 6 → strong build candidate",
          "Impact ≥ 7 and Readiness < 6 → Blueprint or process fix first",
          "Risk ≥ 8 → human approval on every external action",
          "Frequency < 4 → usually not worth automating yet",
          "No owner → stop. Assign one before any vendor call.",
        ],
      },
      {
        type: "pullquote",
        text: "The best first project is boring on a slide and expensive in real life — because that is where margin actually leaks.",
      },
      {
        type: "prose",
        paragraphs: [
          "Rank your top five workflows. Pick one. Run a two-week baseline: measure time, touches, and failure modes. Only then decide whether AI is the right tool — or whether a simpler integration would solve eighty percent of the problem.",
        ],
      },
      {
        type: "links",
        title: "Put this framework to work",
        links: [
          {
            href: "/blueprint",
            label: "AI Opportunity Blueprint",
            description: "We score, financial-model, and roadmap your top workflows in 7–10 days.",
          },
          {
            href: "/systems",
            label: "BYBO systems catalogue",
            description: "Match ranked opportunities to the right system type.",
          },
          {
            href: "/apply?interest=blueprint",
            label: "Apply for a Blueprint",
            description: "Bring one workflow — we will tell you if it ranks.",
          },
        ],
      },
    ],
  },
  {
    slug: "human-in-the-loop-product-decision",
    category: "Operations",
    title: "Human-in-the-loop is a product decision, not a disclaimer",
    excerpt:
      "Good escalation design determines whether an AI system earns trust inside a real business.",
    metaDescription:
      "Design human-in-the-loop AI with clear escalation paths, approval gates, and audit trails. Learn how operations teams build trust in enterprise AI systems.",
    seoKeywords: [
      "human in the loop AI",
      "AI escalation design",
      "AI approval workflow",
      "enterprise AI trust",
      "AI governance operations",
      "human oversight AI India",
      "agentic AI controls",
    ],
    readTime: "9 min",
    published: true,
    publishedAt: "2026-08-08",
    image: "/images/bybo-insight-human-in-loop.png",
    imageAlt:
      "Operations team at an AI approval console with escalation paths on screen",
    relatedSlugs: ["why-ai-pilots-fail", "rank-ai-opportunities"],
    blocks: [
      {
        type: "prose",
        paragraphs: [
          "Terms and conditions bury human-in-the-loop at the bottom. Product teams should put it at the centre — because it defines what the system is allowed to do, what it must ask permission for, and what it must never touch.",
          "When escalation is an afterthought, staff work around the AI. When it is designed well, the AI becomes the fastest path to a correct decision — not a shortcut around accountability.",
        ],
      },
      {
        type: "visual",
        visual: "escalation-flow",
        caption: "A simple customer-service flow — auto, gate, approve, auto.",
      },
      {
        type: "heading",
        text: "Three tiers of action",
      },
      {
        type: "stats",
        items: [
          { label: "Auto-act", value: "Low risk", detail: "Source-backed, reversible" },
          { label: "Approve", value: "Medium", detail: "Human sign-off required" },
          { label: "Escalate", value: "High", detail: "Specialist only" },
        ],
      },
      {
        type: "prose",
        paragraphs: [
          "Every step in a workflow should be classified into one of these tiers before a line of code is written. Classification depends on your industry — a low-value refund may be auto in retail; a clinical triage message is never auto in healthcare.",
          "The mistake most teams make is binary thinking: fully automated or fully manual. Real operations live in the middle — and that middle is where product design earns or loses trust.",
        ],
      },
      {
        type: "heading",
        text: "What good escalation looks like",
      },
      {
        type: "checklist",
        title: "Design checklist",
        items: [
          "Reviewer sees the same sources the model used — not just the output",
          "One-click approve, edit, or reject — no re-keying into another system",
          "SLA on pending approvals — nothing sits invisible for days",
          "Audit log: who approved what, when, with which model version",
          "Feedback loop: rejections become training data for the next iteration",
        ],
      },
      {
        type: "callout",
        variant: "insight",
        title: "Trust is operational",
        body: "Your floor manager will not use a system that makes them look wrong in front of a customer. Design for their dignity, not just efficiency.",
      },
      {
        type: "visual",
        visual: "governance-stack",
        caption: "Governance layers that support escalation — not replace it.",
      },
      {
        type: "prose",
        paragraphs: [
          "Agentic systems amplify this challenge. When AI can chain multiple steps, each step needs its own gate — not one approval at the end of a black-box sequence.",
          "BYBO builds escalation into the workflow architecture from day one — visible in the operating layer, not hidden in a model prompt.",
        ],
      },
      {
        type: "links",
        title: "Explore related systems",
        links: [
          {
            href: "/systems/agentic-operations",
            label: "Agentic Operations",
            description: "Multi-step workflows with approvals and audit trails.",
          },
          {
            href: "/systems/customer-workforce-ai",
            label: "Customer & Workforce AI",
            description: "Front-line AI with brand-safe escalation paths.",
          },
          {
            href: "/systems/ai-infrastructure-governance",
            label: "AI Infrastructure & Governance",
            description: "Platform controls for access, logging, and evaluation.",
          },
        ],
      },
    ],
  },
];

export function getInsightArticle(slug: string) {
  return insightArticles.find((article) => article.slug === slug);
}

export function getRelatedArticles(slug: string) {
  const article = getInsightArticle(slug);
  if (!article) return [];
  return article.relatedSlugs
    .map((relatedSlug) => getInsightArticle(relatedSlug))
    .filter((item): item is InsightArticle => Boolean(item?.published));
}
