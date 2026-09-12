import type { ServiceDetail } from './types';

const detail: ServiceDetail = {
  slug: 'systems',
  overview: {
    heading: 'What a BYBO system actually is',
    paragraphs: [
      'A BYBO system is a piece of your business put on rails. Not a tool you log into and hope people adopt, but a workflow — an invoice arriving, an enquiry landing, a policy question, a monthly report — mapped, connected to the software you already run, given rules for the ordinary cases and a person for the ones that matter. Seven cover the work inside the business. The eighth, the website studio, covers how the outside meets it.',
      'All eight are built the same way underneath. A mapped workflow rather than a vague ambition. Agreed access, granted system by system and read-only where reading is enough. A person standing at the decisions that carry money, commitments or risk. A log of what happened, measures taken before anything was built, and one named owner inside your business who keeps it honest afterwards.',
      'What differs between them is the shape of the work, not the discipline. [Business Operations](/systems/document-multimodal-intelligence) handles documents. [Agentic Operations](/systems/agentic-operations) moves work between teams and tools. [Enterprise Knowledge](/systems/enterprise-knowledge-systems) answers questions from your own material. [Decision Intelligence](/systems/decision-intelligence) settles the numbers. Choosing between them is a question about your workflow, not about technology.',
    ],
  },
  audience: {
    heading: 'Signs a system is the right answer',
    intro: 'These are workflow symptoms, and they are what we listen for in a first conversation.',
    items: [
      'The same work repeats every week and the steps are the same each time.',
      'Information is retyped from one screen into another because two systems do not speak.',
      'Nobody can say who owns a step, so it stalls whenever the usual person is away.',
      'You have bought software that solved part of the problem and left the joins to people.',
      'When something goes wrong, there is no record of what happened or who approved it.',
      'The work is growing faster than the headcount you are willing to add to it.',
    ],
  },
  deliverables: {
    heading: 'What every BYBO system includes',
    intro: 'Whichever of the eight you start with, these arrive with it.',
    items: [
      { title: 'A mapped workflow', body: 'The real path the work takes, written down: the trigger, every step, the exceptions people quietly handle, and the point where it stalls today.' },
      { title: 'Connected access, agreed source by source', body: 'The system reads and writes only where you have approved it, at the narrowest permission that does the job. Nothing is connected because it was convenient.' },
      { title: 'Human decision points', body: 'Agreed gates where a named person reviews before anything consequential happens, with the evidence gathered so the review takes seconds, not an afternoon.' },
      { title: 'Logs, measures and a baseline', body: 'A record of what the system did and why, plus the before-and-after measures agreed at the start, so whether it worked has an answer.' },
      { title: 'Documentation, training and a named owner', body: 'Written operating instructions, training for the people who use it daily, and one person inside your business who owns it once we step back.' },
    ],
  },
  process: {
    heading: 'From first conversation to running',
    intro: 'The path is the same for all eight; only the build stage looks different.',
    items: [
      { title: 'Understand', body: 'A free conversation about the workflow that is costing you and what the failure looks like. We say plainly if a system is the wrong answer, and often the cheaper fix is a process change.' },
      { title: 'Map or Blueprint', body: 'Where the picture is clear we map the workflow directly. Where it is not, [the Blueprint](/blueprint) is a paid diagnostic ending in a recommendation and a 90-day roadmap.' },
      { title: 'Build against real examples', body: 'We build on your own material — your documents, your enquiries, your records — not a demonstration set. Scope and fee are agreed in writing before this stage begins.' },
      { title: 'Run in parallel', body: 'The system runs alongside the current process while your team compares the two and corrects it. Their corrections change the rules and thresholds; that is the point of the stage.' },
      { title: 'Hand over and measure', body: 'Your named owner takes it, with documentation and training. We compare the agreed measures against the baseline and decide together whether a next system is worth it.' },
    ],
  },
  connects: {
    heading: 'What systems connect to',
    body: 'Every system works with software you already run, and each connection is agreed in writing before it is built.',
    items: [
      'Your accounting or ERP system, usually as the source of record for money',
      'Your CRM, enquiry inbox and the channels customers actually use',
      'Your document storage, shared drives and email',
      'Your operations, inventory, scheduling or production systems',
      'Your identity provider, so access follows the rules you already enforce',
      'Your website and forms, where the outside world meets the workflow',
    ],
  },
  bring: {
    heading: 'What you provide',
    items: [
      'A real workflow with real volume behind it, not a hypothetical one.',
      'Representative examples, including the awkward ones you would rather not show us.',
      'The current rules, including the judgement calls people make without writing them down.',
      'A named owner with the authority to settle a disagreement about how the work should run.',
      'A baseline: time taken, error rate and cost as things stand today.',
    ],
  },
  cost: {
    heading: 'What drives the cost',
    paragraphs: [
      'BYBO publishes no prices. The first conversation is free, scope and fee are agreed in writing before any paid work begins, and the Blueprint is a separate paid diagnostic where the workflow needs establishing first. You are never asked to commit before you know what you are buying.',
      'Across all eight, cost tracks the condition of the workflow more than the technology. A clean process with tidy access is straightforward. A contested one with scattered records costs more, and that work is worth doing whatever you build afterwards. [The cost guide](/insights/business-automation-cost-india) sets out how to weigh it against what the work costs you today.',
    ],
    drivers: [
      'How many steps the workflow has, and how much they vary case to case',
      'The number of systems it must connect to and how willingly they give up access',
      'The condition of your records and examples before anything can be built',
      'How much judgement sits in the work, and how many decision points it needs',
      'Governance requirements: approval gates, retention, audit and reporting',
      'Whether the system runs on its own after launch or is extended over time',
    ],
  },
  measure: {
    heading: 'The measures they share',
    body: 'We record how the workflow performs today before anything is built, then compare the same measures after launch.',
    items: [
      'Time per item, from arrival to a completed, checked outcome',
      'Error and rework rate against the same work done by hand',
      'Share of cases needing human review, and whether that share is settling',
      'Cost per completed record or resolved case',
      'How often the system is used at all once the novelty has passed',
      'Time from a problem occurring to somebody noticing it',
    ],
  },
  control: {
    heading: 'Where a person stays responsible',
    body: 'No BYBO system decides on its own where the decision carries weight. Money, commitments and sensitive changes stay behind agreed approval gates, and the gate is set by you. Unsupported answers are withheld rather than guessed. Every action is logged with its evidence, so a decision can be reviewed and argued with afterwards. One named person owns each system, and that person can pause it without our involvement.',
  },
  faqs: [
    { q: 'Which of the eight do we need?', a: 'Start from the workflow, not the list. If documents arrive and are retyped, it is Business Operations. If work stalls between teams, Agentic Operations. If people cannot find what the business knows, Enterprise Knowledge. If the numbers are argued about, Decision Intelligence. A free conversation usually settles it.' },
    { q: 'Can we start with just one?', a: 'Yes, and we would rather you did. One workflow, measured honestly, tells you more than a broad programme. The foundations built for the first system — agreed access, identity, logging, the governance pattern — are reused by the next, so the second is usually less work.' },
    { q: 'Will it work with the tools we already have?', a: 'That is the intention: systems are built around your software, not as a replacement for it. What matters is whether a tool will give up its data and accept updates through a supported interface. We check that during scoping and tell you where a connection is not practical.' },
    { q: 'Who runs it after launch?', a: 'A named person in your business owns it, and part of the work is making sure they can. You receive written operating instructions, training and the logs needed to see what is happening. Ongoing support is agreed separately if you want it, but nothing depends on us to keep running.' },
    { q: 'How is this different from buying a tool?', a: 'A tool gives you capability and leaves the workflow to you. Most of the cost sits in that gap — the joins, the exceptions, the rules nobody wrote down. A system is the workflow itself, with the tool inside it. Sometimes a tool is enough, and we will say so.' },
    { q: 'What if we are not ready?', a: 'Then we will say so. Common reasons: the process is about to change, the records are not in a state anyone can build on, or no one can be named as owner. None is fatal and some are cheap to fix. The readiness checklist in our Insights lets you test this yourself.' },
  ],
  reading: ['what-is-a-business-ai-system', 'seven-ai-systems-for-business-operations', 'ai-readiness-checklist'],
};

export default detail;
