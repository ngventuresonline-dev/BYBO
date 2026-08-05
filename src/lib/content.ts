import {
  BarChart3,
  BookOpenCheck,
  BrainCircuit,
  FileText,
  ShieldCheck,
  Users,
  Workflow,
} from "lucide-react";

export type SystemDefinition = {
  slug: string;
  index: string;
  name: string;
  short: string;
  promise: string;
  description: string;
  icon: typeof BrainCircuit;
  pains: string[];
  capabilities: string[];
  outcomes: string[];
  bestFor: string[];
  modules: {
    title: string;
    description: string;
  }[];
  workflow: {
    label: string;
    description: string;
  }[];
  controls: string[];
  integrations: string[];
  metrics: string[];
  example: {
    before: string;
    system: string;
    after: string;
  };
};

export const systems: SystemDefinition[] = [
  {
    slug: "custom-ai-platforms",
    index: "01",
    name: "Custom AI Platforms",
    short: "Purpose-built AI products for core business operations.",
    promise: "Turn a validated business case into a secure, maintainable AI platform.",
    description:
      "Design and build production platforms that combine models, proprietary data, workflows, interfaces, and enterprise controls. BYBO supports discovery, delivery, integration, and managed operation without locking the business to one model or vendor.",
    icon: BrainCircuit,
    pains: [
      "Generic AI tools do not fit the operating model",
      "Promising prototypes lack production architecture and controls",
      "AI capabilities are fragmented across vendors and internal experiments",
    ],
    capabilities: [
      "Multi-model application architecture",
      "Secure data and retrieval layers",
      "Role-specific web and workflow interfaces",
      "API, event, and enterprise-system integration",
      "Evaluation, observability, and managed improvement",
    ],
    outcomes: [
      "A production system aligned to a defined business case",
      "Reusable platform capabilities instead of isolated pilots",
      "Clear ownership, operating controls, and support paths",
    ],
    bestFor: [
      "Mid-market and enterprise teams building differentiated AI products",
      "Business units replacing disconnected AI experiments",
      "Organizations needing a delivery partner and ongoing platform support",
    ],
    modules: [
      {
        title: "Platform foundation",
        description:
          "Establish application, identity, data, model, and deployment architecture around agreed security, reliability, and ownership requirements.",
      },
      {
        title: "AI capability layer",
        description:
          "Combine suitable language, vision, search, or predictive models with prompts, tools, retrieval, and deterministic business logic.",
      },
      {
        title: "Workflow and experience",
        description:
          "Deliver role-aware interfaces, review queues, notifications, and integrations that fit how employees, customers, or partners work.",
      },
      {
        title: "Platform operations",
        description:
          "Monitor quality, latency, cost, incidents, and model changes through a managed retainer or internal operating handover.",
      },
    ],
    workflow: [
      {
        label: "Frame",
        description:
          "Define users, decisions, data, risk, success measures, and the boundary of the first production release.",
      },
      {
        label: "Build",
        description:
          "Implement the platform in tested increments using representative data and explicit acceptance criteria.",
      },
      {
        label: "Integrate",
        description:
          "Connect identity, source systems, workflows, review controls, and operational telemetry.",
      },
      {
        label: "Operate",
        description:
          "Review production evidence, manage releases, resolve failures, and improve against agreed service measures.",
      },
    ],
    controls: [
      "Role-based access, tenant boundaries, and secrets management",
      "Model and prompt versioning with release approvals",
      "Evaluation gates for quality, safety, latency, and cost",
      "Audit trails, incident response, and rollback procedures",
    ],
    integrations: [
      "Salesforce",
      "Microsoft 365",
      "Google Workspace",
      "ServiceNow",
      "Snowflake",
      "Databricks",
      "Identity providers",
      "Internal APIs",
    ],
    metrics: [
      "Task success rate",
      "Evaluation pass rate",
      "Platform availability",
      "Response latency",
      "Cost per completed task",
      "Release and incident frequency",
    ],
    example: {
      before:
        "Several teams run separate AI pilots with duplicated infrastructure and inconsistent controls.",
      system:
        "BYBO builds a shared platform with governed model access, reusable services, role-based applications, and production monitoring.",
      after:
        "Teams ship approved use cases on a common foundation while platform owners retain operational visibility.",
    },
  },
  {
    slug: "agentic-operations",
    index: "02",
    name: "Agentic Operations",
    short: "Coordinated AI workflows with accountable human control.",
    promise: "Reduce operational handoffs through bounded agents that plan, use tools, and escalate.",
    description:
      "Build agent-assisted operations for multi-step work across teams and systems. Each agent receives a defined role, permitted tools, evidence requirements, budgets, and escalation rules rather than open-ended authority.",
    icon: Workflow,
    pains: [
      "Skilled teams spend time coordinating routine multi-system work",
      "Handoffs lose context and create avoidable queues",
      "Rigid automation breaks when inputs or cases vary",
    ],
    capabilities: [
      "Tool-using agents with scoped permissions",
      "Multi-step planning and state management",
      "Human review and exception queues",
      "Cross-system workflow orchestration",
      "Trace, replay, and performance evaluation",
    ],
    outcomes: [
      "Fewer manual coordination steps per case",
      "Consistent evidence and status across handoffs",
      "More capacity for exceptions and judgment-heavy work",
    ],
    bestFor: [
      "Shared services and operations teams with multi-step casework",
      "Processes spanning several applications and approval roles",
      "Organizations ready to govern agents as production software",
    ],
    modules: [
      {
        title: "Agent roles and tools",
        description:
          "Define narrow responsibilities, allowed actions, required evidence, context boundaries, and completion criteria for each agent.",
      },
      {
        title: "Orchestration and memory",
        description:
          "Coordinate tasks, durable case state, retries, and timeouts across agents, people, and enterprise systems.",
      },
      {
        title: "Human control plane",
        description:
          "Provide approval queues, intervention, and exception routing so accountable owners can review efficiently.",
      },
      {
        title: "Agent operations",
        description:
          "Evaluate traces, monitor tool use and cost, diagnose failures, and improve policies under controlled releases.",
      },
    ],
    workflow: [
      {
        label: "Intake",
        description:
          "A case enters with identity, context, service target, and applicable policy attached.",
      },
      {
        label: "Plan",
        description:
          "The agent selects permitted steps and tools within explicit time, cost, and authority limits.",
      },
      {
        label: "Execute",
        description:
          "Tools perform validated actions while each result and decision is recorded in the case trace.",
      },
      {
        label: "Review",
        description:
          "Exceptions, low-confidence steps, and high-impact actions reach an owner with evidence and options.",
      },
    ],
    controls: [
      "Allow-listed tools and least-privilege credentials",
      "Approval gates for financial, legal, customer, or irreversible actions",
      "Step, time, and cost limits with safe termination",
      "Trace retention, replay testing, and emergency suspension",
    ],
    integrations: [
      "ServiceNow",
      "Salesforce",
      "SAP",
      "Microsoft 365",
      "Slack",
      "Jira",
      "Robotic process automation",
      "Internal APIs",
    ],
    metrics: [
      "Case cycle time",
      "Manual touches per case",
      "Successful completion rate",
      "Exception and escalation rate",
      "Tool-call failure rate",
      "Cost per completed case",
    ],
    example: {
      before:
        "An analyst gathers evidence from four systems, prepares a case, and chases two approvals.",
      system:
        "Scoped agents collect and validate evidence, prepare the case, and route approval without making the accountable decision.",
      after:
        "The analyst reviews exceptions and approvals from one traceable workspace.",
    },
  },
  {
    slug: "enterprise-knowledge-systems",
    index: "03",
    name: "Enterprise Knowledge Systems",
    short: "Permission-aware answers grounded in enterprise knowledge.",
    promise: "Make trusted knowledge discoverable, cited, current, and useful inside daily work.",
    description:
      "Create governed knowledge platforms across documents, applications, records, and subject-matter expertise. Retrieval, citations, permissions, ownership, and feedback are designed together so answers remain inspectable.",
    icon: BookOpenCheck,
    pains: [
      "Employees search across disconnected repositories and tools",
      "Critical answers depend on a small number of experts",
      "Outdated or unauthorized content appears in AI responses",
    ],
    capabilities: [
      "Federated and indexed enterprise search",
      "Retrieval-augmented assistants with citations",
      "Permission-aware content access",
      "Knowledge ownership and lifecycle workflows",
      "Search analytics and answer evaluation",
    ],
    outcomes: [
      "Less time spent locating and verifying information",
      "More consistent use of approved knowledge",
      "Visible content gaps, owners, and refresh needs",
    ],
    bestFor: [
      "Organizations with knowledge spread across many repositories",
      "Regulated or policy-heavy teams requiring source evidence",
      "Enterprises building internal copilots for multiple functions",
    ],
    modules: [
      {
        title: "Knowledge ingestion",
        description:
          "Connect, parse, classify, and index approved repositories while retaining metadata, ownership, and access rules.",
      },
      {
        title: "Retrieval and answer layer",
        description:
          "Retrieve relevant passages, compose bounded answers, expose citations, and abstain when evidence is insufficient.",
      },
      {
        title: "Knowledge governance",
        description:
          "Assign owners, review sensitive content, manage retention and freshness, and preserve source-system permissions.",
      },
      {
        title: "Adoption and improvement",
        description:
          "Embed assistance in employee workflows and use feedback and evaluation data to address knowledge gaps.",
      },
    ],
    workflow: [
      {
        label: "Connect",
        description:
          "Approved sources enter with identity, permission, owner, sensitivity, and freshness metadata.",
      },
      {
        label: "Retrieve",
        description:
          "A query is interpreted and matched to authorized evidence from the most relevant sources.",
      },
      {
        label: "Answer",
        description:
          "The system returns a concise response with citations, scope, and uncertainty visible.",
      },
      {
        label: "Improve",
        description:
          "Feedback and failed searches create measurable actions for content owners and platform operators.",
      },
    ],
    controls: [
      "Source-level permissions enforced at retrieval time",
      "Citations and evidence visibility for material answers",
      "Freshness, retention, and content-owner policies",
      "Evaluation sets for accuracy, relevance, leakage, and abstention",
    ],
    integrations: [
      "SharePoint",
      "Microsoft Teams",
      "Google Drive",
      "Confluence",
      "Notion",
      "Salesforce",
      "ServiceNow",
      "Document management systems",
    ],
    metrics: [
      "Search success rate",
      "Citation validity",
      "Answer evaluation score",
      "Time to verified answer",
      "Abstention and escalation rate",
      "Stale-content coverage",
    ],
    example: {
      before:
        "A delivery team searches several repositories and asks experts to verify policy details.",
      system:
        "A permission-aware assistant retrieves approved passages, cites each source, and flags conflicting versions.",
      after:
        "The team reaches a verified answer faster while content owners receive a clear conflict to resolve.",
    },
  },
  {
    slug: "decision-intelligence",
    index: "04",
    name: "Decision Intelligence",
    short: "Evidence, scenarios, and recommendations in one decision layer.",
    promise: "Help leaders detect change, test options, and make traceable decisions sooner.",
    description:
      "Unify governed metrics, qualitative signals, forecasts, and business context into decision workspaces. The system explains evidence and uncertainty; accountable leaders retain the decision.",
    icon: BarChart3,
    pains: [
      "Leadership reports reconcile slowly and arrive after decisions",
      "Teams use conflicting metrics and assumptions",
      "Forecasts and recommendations are difficult to inspect",
    ],
    capabilities: [
      "Governed metrics and semantic layers",
      "Anomaly, driver, and trend analysis",
      "Forecasting and scenario comparison",
      "Decision briefs with linked evidence",
      "Decision and action tracking",
    ],
    outcomes: [
      "Shorter reporting and decision cycles",
      "Earlier visibility into material changes",
      "A reusable record of assumptions, evidence, and actions",
    ],
    bestFor: [
      "Executive and operating teams managing complex portfolios",
      "Functions with fragmented commercial, financial, or operational data",
      "Organizations needing inspectable forecasts and recommendations",
    ],
    modules: [
      {
        title: "Trusted data layer",
        description:
          "Map selected sources to governed metrics, quality checks, refresh schedules, and accountable owners.",
      },
      {
        title: "Signal and driver analysis",
        description:
          "Detect material movement and connect it to supporting segments, events, evidence, and known limitations.",
      },
      {
        title: "Forecast and scenarios",
        description:
          "Compare baseline and alternative assumptions with confidence ranges, sensitivities, and model provenance visible.",
      },
      {
        title: "Decision workspace",
        description:
          "Assemble briefs, capture decisions, assign follow-through, and measure results against the original thesis.",
      },
    ],
    workflow: [
      {
        label: "Unify",
        description:
          "Governed data and selected qualitative evidence are aligned to shared definitions.",
      },
      {
        label: "Detect",
        description:
          "The system identifies changes, anomalies, forecast shifts, and data-quality concerns.",
      },
      {
        label: "Assess",
        description:
          "Leaders inspect drivers, scenarios, assumptions, evidence, and uncertainty before choosing an action.",
      },
      {
        label: "Track",
        description:
          "Decisions, owners, expected effects, and observed results remain linked for later review.",
      },
    ],
    controls: [
      "Governed metric definitions and source lineage",
      "Model validation, back-testing, and drift monitoring",
      "Confidence ranges and assumptions shown with forecasts",
      "Recommendations separated from accountable decisions",
    ],
    integrations: [
      "Snowflake",
      "Databricks",
      "Power BI",
      "Tableau",
      "ERP platforms",
      "CRM platforms",
      "Planning systems",
      "Operational databases",
    ],
    metrics: [
      "Reporting preparation time",
      "Time to detect material change",
      "Forecast error",
      "Decision cycle time",
      "Action closure rate",
      "Metric reconciliation effort",
    ],
    example: {
      before:
        "A regional review begins with days of spreadsheet reconciliation and competing explanations.",
      system:
        "The workspace aligns metrics, highlights material variance, and presents drivers and scenarios with source links.",
      after:
        "Leaders spend the review testing assumptions and assigning actions instead of reconciling reports.",
    },
  },
  {
    slug: "customer-workforce-ai",
    index: "05",
    name: "Customer & Workforce AI",
    short: "Assistance designed around customers, employees, and service teams.",
    promise: "Improve service and employee productivity with grounded, role-aware AI assistance.",
    description:
      "Deploy customer-facing and workforce copilots that answer, summarize, recommend, and complete permitted actions across channels. Sensitive, ambiguous, and high-impact cases remain with trained people.",
    icon: Users,
    pains: [
      "Customers and employees wait for routine information or service",
      "Quality varies across channels, locations, and experience levels",
      "Teams switch between systems to resolve each request",
    ],
    capabilities: [
      "Customer service assistants and copilots",
      "Employee and field-service copilots",
      "Conversation and case summarization",
      "Next-best-action recommendations",
      "Quality review and coaching intelligence",
    ],
    outcomes: [
      "Faster access to approved answers and case context",
      "More consistent service execution",
      "More employee time available for complex interactions",
    ],
    bestFor: [
      "Enterprises operating service across several channels or regions",
      "Workforces relying on complex product, policy, or account knowledge",
      "Teams seeking measured copilot adoption with managed improvement",
    ],
    modules: [
      {
        title: "Customer assistance",
        description:
          "Answer grounded questions, collect context, and complete low-risk service actions across approved channels.",
      },
      {
        title: "Workforce copilot",
        description:
          "Bring relevant knowledge, account context, summaries, and recommended steps into employees' existing applications.",
      },
      {
        title: "Routing and escalation",
        description:
          "Route sensitive, complex, or low-confidence cases with a concise evidence-backed handoff.",
      },
      {
        title: "Quality and optimization",
        description:
          "Evaluate interactions for accuracy, compliance, resolution, and recurring friction to guide improvements.",
      },
    ],
    workflow: [
      {
        label: "Understand",
        description:
          "The system identifies the user, intent, channel, permissions, and relevant case context.",
      },
      {
        label: "Ground",
        description:
          "It retrieves approved knowledge and records while preserving source and access boundaries.",
      },
      {
        label: "Assist",
        description:
          "It answers, recommends, drafts, or completes a specifically permitted service action.",
      },
      {
        label: "Escalate",
        description:
          "Uncertain or sensitive work reaches a person with context, evidence, and the attempted resolution.",
      },
    ],
    controls: [
      "Identity, consent, and channel-specific disclosure",
      "Source-backed responses with confidence thresholds",
      "Human handling for regulated, sensitive, or consequential matters",
      "Interaction review, redaction, retention, and correction workflows",
    ],
    integrations: [
      "Salesforce",
      "ServiceNow",
      "Zendesk",
      "Microsoft Teams",
      "Contact-center platforms",
      "HR systems",
      "Field-service platforms",
      "Customer portals",
    ],
    metrics: [
      "Time to first useful response",
      "Resolution and containment rate",
      "Human escalation rate",
      "Answer quality score",
      "Employee adoption",
      "Customer and employee satisfaction",
    ],
    example: {
      before:
        "A specialist searches policy, account, and product systems while the customer waits.",
      system:
        "A copilot assembles authorized context, cites the policy, and prepares the permitted next action.",
      after:
        "The specialist verifies the evidence, resolves the request, and retains responsibility.",
    },
  },
  {
    slug: "document-multimodal-intelligence",
    index: "06",
    name: "Document & Multimodal Intelligence",
    short: "Operational intelligence from documents, images, audio, and video.",
    promise:
      "Convert complex unstructured inputs into validated data, evidence, and workflow actions.",
    description:
      "Build processing systems for contracts, forms, reports, images, recordings, and mixed-format case files. Extraction is paired with validation, provenance, review, and downstream integration.",
    icon: FileText,
    pains: [
      "High-value workflows depend on manual review of varied files",
      "Legacy OCR misses structure, context, and cross-document evidence",
      "Extracted data reaches systems without sufficient validation",
    ],
    capabilities: [
      "Document classification and structured extraction",
      "Image, audio, and video understanding",
      "Cross-document comparison and reconciliation",
      "Evidence-linked review workspaces",
      "Validation and exception routing",
    ],
    outcomes: [
      "Shorter processing time for document-heavy cases",
      "Fewer manual checks on routine inputs",
      "Traceable evidence for every extracted field and exception",
    ],
    bestFor: [
      "Insurance, financial, legal, healthcare, and logistics workflows",
      "Operations processing high volumes of mixed-format evidence",
      "Enterprises modernizing document automation beyond basic OCR",
    ],
    modules: [
      {
        title: "Multimodal intake",
        description:
          "Accept files and streams through controlled channels, detect type and quality, separate case contents, and preserve source metadata.",
      },
      {
        title: "Extraction and understanding",
        description:
          "Extract fields, tables, entities, clauses, events, and visual evidence using the appropriate model and deterministic parser.",
      },
      {
        title: "Validation and reconciliation",
        description:
          "Check values against schemas, records, calculations, cross-file evidence, and domain rules before downstream use.",
      },
      {
        title: "Review and integration",
        description:
          "Present exceptions with highlighted evidence, capture corrections, and write approved outputs to systems of record.",
      },
    ],
    workflow: [
      {
        label: "Ingest",
        description:
          "Documents and media enter a case with source, identity, permissions, and retention requirements.",
      },
      {
        label: "Interpret",
        description:
          "Models and parsers classify content and produce structured facts linked to page, region, or timestamp.",
      },
      {
        label: "Validate",
        description:
          "Rules and reference systems test completeness, consistency, confidence, and material discrepancies.",
      },
      {
        label: "Resolve",
        description:
          "Approved data proceeds while exceptions reach reviewers with the relevant evidence isolated.",
      },
    ],
    controls: [
      "Field-level provenance and confidence visibility",
      "Validation rules before records or payments change",
      "Human review thresholds based on risk and materiality",
      "Encryption, retention, redaction, and deletion policies",
    ],
    integrations: [
      "SharePoint",
      "Cloud storage",
      "Email",
      "Document management systems",
      "ERP platforms",
      "Claims platforms",
      "Case management",
      "Scanning and capture systems",
    ],
    metrics: [
      "Field extraction accuracy",
      "Straight-through processing rate",
      "Review time per case",
      "Exception rate",
      "Correction and rework rate",
      "Cost per processed case",
    ],
    example: {
      before:
        "A reviewer compares a form, supporting images, correspondence, and account records field by field.",
      system:
        "The system extracts case facts, links each value to evidence, validates records, and isolates discrepancies.",
      after:
        "The reviewer focuses on material exceptions and approves the final record from one workspace.",
    },
  },
  {
    slug: "ai-infrastructure-governance",
    index: "07",
    name: "AI Infrastructure & Governance",
    short: "A controlled foundation for reliable enterprise AI.",
    promise:
      "Standardize how AI systems are secured, evaluated, observed, and operated.",
    description:
      "Establish the shared infrastructure and governance needed to move AI from scattered experiments into production. BYBO can implement the foundation, enable internal teams, and operate key controls through a managed retainer.",
    icon: ShieldCheck,
    pains: [
      "Teams adopt models and vendors without shared standards",
      "Quality, cost, security, and risk are difficult to monitor",
      "Production ownership is unclear after pilots launch",
    ],
    capabilities: [
      "Model gateway and vendor abstraction",
      "Evaluation and release management",
      "Observability, cost, and incident operations",
      "Policy enforcement and audit evidence",
      "AI portfolio and risk governance",
    ],
    outcomes: [
      "Consistent controls across AI applications",
      "Faster production reviews using reusable evidence",
      "Clearer visibility into quality, risk, reliability, and spend",
    ],
    bestFor: [
      "Enterprises scaling AI across teams and vendors",
      "Organizations preparing AI systems for security or risk review",
      "Platform teams needing implementation and managed operations support",
    ],
    modules: [
      {
        title: "AI platform services",
        description:
          "Provide governed model access, routing, secrets, quotas, caching, and common services through stable internal interfaces.",
      },
      {
        title: "Evaluation framework",
        description:
          "Create representative datasets, automated checks, human review protocols, baselines, and release acceptance thresholds.",
      },
      {
        title: "Observability and FinOps",
        description:
          "Monitor traces, quality signals, latency, token and tool spend, failures, and service objectives across applications.",
      },
      {
        title: "Governance operations",
        description:
          "Maintain inventory, risk tiers, approvals, ownership, change records, incident procedures, and assurance evidence.",
      },
    ],
    workflow: [
      {
        label: "Inventory",
        description:
          "Register systems, owners, vendors, data classes, users, decisions, and risk tiers.",
      },
      {
        label: "Assess",
        description:
          "Test quality, privacy, security, robustness, cost, and operational readiness against intended use.",
      },
      {
        label: "Release",
        description:
          "Approve versioned models, prompts, policies, and application changes through documented gates.",
      },
      {
        label: "Assure",
        description:
          "Monitor production evidence, investigate incidents, review drift, and retire systems responsibly.",
      },
    ],
    controls: [
      "Central inventory with named business and technical owners",
      "Risk-tiered review and release requirements",
      "Continuous evaluation, access review, and audit logging",
      "Incident response, rollback, vendor exit, and decommissioning plans",
    ],
    integrations: [
      "Azure",
      "AWS",
      "Google Cloud",
      "Model providers",
      "Identity providers",
      "SIEM platforms",
      "Data catalogs",
      "CI/CD platforms",
    ],
    metrics: [
      "Evaluation pass rate",
      "Policy compliance coverage",
      "AI spend by system and task",
      "Latency and availability",
      "Incident and rollback frequency",
      "Time from review to approved release",
    ],
    example: {
      before:
        "Business units deploy AI applications with different vendors, tests, logs, and approval practices.",
      system:
        "A shared control plane standardizes model access, evaluation gates, telemetry, cost reporting, and ownership.",
      after:
        "Platform and risk teams review consistent evidence while product teams retain a supported path to production.",
    },
  },
];

export const industries = [
  {
    slug: "consumer-brands",
    name: "Consumer brands",
    description:
      "D2C, retail, e-commerce, hospitality, and multi-location brands with high volumes of customer and market signals.",
    opportunities: [
      "Customer support and retention",
      "Brand and creative intelligence",
      "Campaign and sales visibility",
    ],
  },
  {
    slug: "high-consideration",
    name: "High-consideration businesses",
    description:
      "Real estate, clinics, education, financial services, and professional services with long or complex buying journeys.",
    opportunities: [
      "Lead qualification and follow-up",
      "Appointment and consultation workflows",
      "Sales knowledge and decision support",
    ],
  },
  {
    slug: "operations-led",
    name: "Operations-led teams",
    description:
      "Businesses where documents, approvals, reconciliation, and internal coordination determine speed and margin.",
    opportunities: [
      "Document processing",
      "Internal knowledge access",
      "Exception and approval routing",
    ],
  },
];

export const engagementStages = [
  {
    index: "01",
    name: "Diagnose",
    label: "7–10 days",
    title: "The AI Opportunity Blueprint",
    description:
      "Map workflows, quantify leakage, rank opportunities, and define a credible 90-day roadmap.",
  },
  {
    index: "02",
    name: "Deploy",
    label: "4–12 weeks",
    title: "Production implementation",
    description:
      "Build the system, connect real tools and data, add controls, test with representative cases, and train the team.",
  },
  {
    index: "03",
    name: "Operate",
    label: "Ongoing",
    title: "Managed AI operations",
    description:
      "Monitor performance, review failures, maintain knowledge, control cost, and improve the workflow continuously.",
  },
  {
    index: "04",
    name: "Productize",
    label: "As patterns repeat",
    title: "Reusable operating modules",
    description:
      "Turn proven workflows into dependable modules that deploy faster and improve with each implementation.",
  },
];

export const proofOutcomes = [
  {
    industry: "Retail & consumer brand",
    metric: "40% faster support resolution",
    detail:
      "Omnichannel customer system across WhatsApp and web - same team, higher throughput on order and return queries.",
  },
  {
    industry: "Manufacturing & logistics",
    metric: "Exception cycles cut from days to hours",
    detail:
      "Agentic orchestration across ERP, WMS, and sales - mismatches surfaced and routed to the accountable owner automatically.",
  },
];

export type { InsightArticle, InsightBlock, InsightLink } from "./insight-articles";
export { getInsightArticle, getRelatedArticles, insightArticles } from "./insight-articles";

export type IndustrySolution = {
  slug: string;
  name: string;
  image: string;
  tagline: string;
  problem: string;
  conversation: string;
  provisions: {
    title: string;
    description: string;
    systemSlug: string;
  }[];
  outcomes: string[];
  engagement: string;
};

export const industrySolutions: IndustrySolution[] = [
  {
    slug: "real-estate",
    name: "Real estate",
    image: "/images/bybo-industry-real-estate.png",
    tagline: "Speed up high-value deals without losing control.",
    problem:
      "Enquiries arrive across portals, WhatsApp, and calls - but follow-up, site visits, and documentation still depend on individual brokers and coordinators.",
    conversation:
      "Your team is not losing demand. It is losing time between enquiry, qualification, site scheduling, and the documents needed to close.",
    provisions: [
      {
        title: "Enquiry intelligence platform",
        description:
          "Capture every lead with source context, budget signals, location intent, and broker assignment - then route high-intent buyers before competitors respond.",
        systemSlug: "custom-ai-platforms",
      },
      {
        title: "Agentic sales coordination",
        description:
          "Automate follow-up, visit scheduling, reminder sequences, and CRM updates while keeping pricing, inventory, and commitments under human approval.",
        systemSlug: "agentic-operations",
      },
      {
        title: "Project and policy knowledge",
        description:
          "Give sales teams instant, source-backed answers on floor plans, approvals, payment plans, and project updates from one governed knowledge layer.",
        systemSlug: "enterprise-knowledge-systems",
      },
      {
        title: "Document and agreement processing",
        description:
          "Extract, validate, and route KYC, booking forms, and vendor invoices - only exceptions reach your operations team.",
        systemSlug: "document-multimodal-intelligence",
      },
    ],
    outcomes: [
      "Faster first response on high-intent enquiries",
      "Fewer dropped follow-ups between teams",
      "Cleaner hand-offs from sales to documentation",
    ],
    engagement: "Platform build or phased project, typically starting with enquiry-to-visit workflow.",
  },
  {
    slug: "healthcare",
    name: "Healthcare",
    image: "/images/bybo-industry-healthcare.png",
    tagline: "Reduce admin drag. Protect clinical judgment.",
    problem:
      "Patient communication, appointment coordination, records, and internal policy questions consume staff time that should stay with care delivery.",
    conversation:
      "Patients expect immediate answers. Your team needs accuracy, privacy, and clear escalation - not another chatbot that guesses.",
    provisions: [
      {
        title: "Patient and front-desk experience",
        description:
          "Handle appointment queries, preparation instructions, follow-ups, and routine status checks across WhatsApp and web - with strict escalation for clinical topics.",
        systemSlug: "customer-workforce-ai",
      },
      {
        title: "Clinical and operational knowledge",
        description:
          "Search policies, SOPs, billing rules, and facility information with permissions, citations, and version control for admin and coordination teams.",
        systemSlug: "enterprise-knowledge-systems",
      },
      {
        title: "Document and records intelligence",
        description:
          "Process referrals, insurance forms, lab reports, and discharge summaries - structured extraction with audit trails and human review on sensitive cases.",
        systemSlug: "document-multimodal-intelligence",
      },
      {
        title: "Governed AI infrastructure",
        description:
          "Define access boundaries, retention, model usage, evaluation, and incident response so AI stays compliant with how your organisation operates.",
        systemSlug: "ai-infrastructure-governance",
      },
    ],
    outcomes: [
      "Lower front-desk and coordination load",
      "Consistent, policy-grounded responses",
      "Clear audit path for sensitive interactions",
    ],
    engagement: "Fixed-scope workflow first, then platform expansion across departments.",
  },
  {
    slug: "manufacturing",
    name: "Manufacturing & logistics",
    image: "/images/bybo-industry-operations.png",
    tagline: "Connect the floor, supply chain, and back office.",
    problem:
      "Orders, inventory exceptions, vendor documents, and internal requests move through email, spreadsheets, and people - creating delay and rework.",
    conversation:
      "When one system changes and nobody tells the other, margin disappears in exceptions, not in the plan.",
    provisions: [
      {
        title: "Exception orchestration platform",
        description:
          "Detect order, inventory, and fulfilment conflicts across ERP, WMS, and sales systems - then route recovery options to the accountable owner.",
        systemSlug: "agentic-operations",
      },
      {
        title: "Multimodal document operations",
        description:
          "Process POs, GRNs, invoices, customs documents, and QC reports with validation against master data and approval rules.",
        systemSlug: "document-multimodal-intelligence",
      },
      {
        title: "Operations intelligence",
        description:
          "Unify production, dispatch, and vendor performance signals into briefs leadership can act on - not reports assembled manually each week.",
        systemSlug: "decision-intelligence",
      },
      {
        title: "Workforce knowledge access",
        description:
          "Give supervisors and coordinators instant access to SOPs, safety rules, and troubleshooting guides on the floor.",
        systemSlug: "enterprise-knowledge-systems",
      },
    ],
    outcomes: [
      "Shorter exception resolution cycles",
      "Less manual document reconciliation",
      "Earlier visibility into operational risk",
    ],
    engagement: "Project-based deployment on one critical workflow, then managed operations.",
  },
  {
    slug: "financial-services",
    name: "Financial services",
    image: "/images/bybo-industry-financial.png",
    tagline: "Move faster on advice, onboarding, and compliance.",
    problem:
      "Client onboarding, document verification, policy questions, and internal research still require too many manual touches across teams.",
    conversation:
      "Your clients expect speed. Your regulators expect evidence. Both are possible when the system is designed with control from day one.",
    provisions: [
      {
        title: "Onboarding and KYC intelligence",
        description:
          "Extract, validate, and reconcile identity and financial documents - routing only mismatches and edge cases for human review.",
        systemSlug: "document-multimodal-intelligence",
      },
      {
        title: "Advisor and ops knowledge layer",
        description:
          "Give relationship and operations teams governed access to product rules, process guidance, and client context without searching five systems.",
        systemSlug: "enterprise-knowledge-systems",
      },
      {
        title: "Client communication system",
        description:
          "Answer routine service questions, appointment requests, and status updates with source-backed responses and defined escalation paths.",
        systemSlug: "customer-workforce-ai",
      },
      {
        title: "AI governance programme",
        description:
          "Establish model policies, access controls, logging, evaluation, and approval workflows before scaling across business units.",
        systemSlug: "ai-infrastructure-governance",
      },
    ],
    outcomes: [
      "Faster onboarding with fewer rework loops",
      "More consistent client-facing responses",
      "Audit-ready AI operating controls",
    ],
    engagement: "Blueprint-led programme with phased rollout by risk tier.",
  },
  {
    slug: "retail-consumer",
    name: "Retail & consumer brands",
    image: "/images/bybo-industry-consumer.png",
    tagline: "Turn customer signals into revenue and retention.",
    problem:
      "Support volume, campaign feedback, inventory questions, and sales follow-up compete for the same team - without a shared intelligence layer.",
    conversation:
      "You already have the demand. The gap is connecting what customers say, buy, and complain about to what your team does next.",
    provisions: [
      {
        title: "Omnichannel customer system",
        description:
          "Resolve orders, returns, product questions, and service issues across WhatsApp, web, and email with brand-safe, source-backed responses.",
        systemSlug: "customer-workforce-ai",
      },
      {
        title: "Commerce operations platform",
        description:
          "Coordinate inventory exceptions, fulfilment changes, and partner communications when standard tools cannot handle the edge cases.",
        systemSlug: "agentic-operations",
      },
      {
        title: "Brand and market intelligence",
        description:
          "Structure reviews, support themes, campaign learning, and competitor signals into briefs your growth team can actually use.",
        systemSlug: "decision-intelligence",
      },
      {
        title: "Custom growth applications",
        description:
          "Build internal tools for merchandising, partner onboarding, or franchise coordination when SaaS products stop at generic workflows.",
        systemSlug: "custom-ai-platforms",
      },
    ],
    outcomes: [
      "Higher support resolution without adding headcount",
      "Faster response to demand and inventory shifts",
      "Evidence-backed brand and campaign decisions",
    ],
    engagement: "Start with one high-volume channel or workflow, expand into platform.",
  },
  {
    slug: "food-beverage-hospitality",
    name: "Food, beverage & hospitality",
    image: "/images/bybo-industry-hospitality.png",
    tagline: "Keep service sharp across every outlet and channel.",
    problem:
      "Reservations, orders, supplier documents, staff queries, and guest feedback multiply with every location - but coordination still runs on WhatsApp and memory.",
    conversation:
      "Guests expect fast answers. Kitchens and outlets need consistency. HQ needs visibility without drowning in daily firefighting.",
    provisions: [
      {
        title: "Guest and reservation intelligence",
        description:
          "Handle bookings, waitlists, menu questions, and order status across channels - with escalation for complaints and VIP cases.",
        systemSlug: "customer-workforce-ai",
      },
      {
        title: "Outlet operations platform",
        description:
          "Coordinate inventory alerts, supplier delays, staffing hand-offs, and multi-location exceptions from one operating layer.",
        systemSlug: "agentic-operations",
      },
      {
        title: "SOP and recipe knowledge",
        description:
          "Give floor managers and staff instant access to recipes, prep standards, allergen info, and opening/closing procedures.",
        systemSlug: "enterprise-knowledge-systems",
      },
      {
        title: "Invoice and compliance processing",
        description:
          "Process vendor invoices, delivery challans, and franchise reports - validate against POs and flag only mismatches.",
        systemSlug: "document-multimodal-intelligence",
      },
    ],
    outcomes: [
      "Consistent guest experience across locations",
      "Less HQ time spent chasing outlet updates",
      "Faster vendor and document reconciliation",
    ],
    engagement: "Pilot one outlet workflow, then roll out across the network.",
  },
  {
    slug: "large-scale-enterprise",
    name: "Large-scale enterprise",
    image: "/images/bybo-industry-enterprise.png",
    tagline: "AI at scale - with governance built in.",
    problem:
      "Multiple business units, legacy systems, and fragmented AI experiments create cost, risk, and duplication without enterprise-wide impact.",
    conversation:
      "You do not need another pilot in one department. You need a platform strategy that scales with control, ownership, and measurable ROI.",
    provisions: [
      {
        title: "Enterprise AI platform programme",
        description:
          "Design and deliver shared application architecture, data layers, and interfaces that multiple units can reuse safely.",
        systemSlug: "custom-ai-platforms",
      },
      {
        title: "Cross-function agentic workflows",
        description:
          "Orchestrate work that spans finance, operations, sales, and HR - with approvals, audit trails, and role-based access.",
        systemSlug: "agentic-operations",
      },
      {
        title: "Executive decision layer",
        description:
          "Unify KPIs, anomalies, and management briefs across units so leadership sees one version of operational truth.",
        systemSlug: "decision-intelligence",
      },
      {
        title: "AI governance and MLOps foundation",
        description:
          "Establish model policies, evaluation, cost controls, security review, and incident response before wide rollout.",
        systemSlug: "ai-infrastructure-governance",
      },
    ],
    outcomes: [
      "Reusable capabilities instead of isolated pilots",
      "Clear ownership and compliance across units",
      "Measured expansion tied to business outcomes",
    ],
    engagement: "Blueprint and platform roadmap first, then phased deployment by business unit.",
  },
];

export const capabilityIcons = {
  systems: BrainCircuit,
};
