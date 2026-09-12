import type { ServiceDetail } from './types';

const detail: ServiceDetail = {
  slug: 'solutions',
  overview: {
    heading: 'How to find your starting point',
    paragraphs: [
      'This page is for the visitor who knows something in the business is slower than it should be, but not what to call it. BYBO builds seven kinds of system and designs websites. You do not need to know which one you want. Describe one piece of work that keeps coming back — an inbox nobody has time for, a report that takes two days, a pile of documents somebody retypes — and the starting point usually names itself.',
      'We start from the work rather than the technology. The same enquiry can lead to a document workflow, a knowledge system or a plain change to who does what on a Thursday. Sometimes the honest answer is that automation is the wrong tool and a simpler fix costs less. We would rather say that early than sell you a build. All eight options are laid out on the systems page.',
      'What lands with your team is always the same three things: a working system, written operating rules and a named owner inside your business. Not a pilot, not a demonstration, not a licence you renew forever without knowing what it does. If the picture is still unclear after a conversation, the Blueprint is a paid diagnostic ending in a recommendation and a 90-day roadmap.',
    ],
  },
  audience: {
    heading: 'Signals you are in the right place',
    intro: 'One of these is usually the reason people arrive here.',
    items: [
      'Headcount has grown faster than output, and the extra people absorb admin rather than add capacity.',
      'The same information is typed into three systems by three people, and they disagree by Friday.',
      'Good enquiries go cold because nobody got to them in time.',
      'The answer to a routine question lives in one person’s head, and that person is on leave.',
      'You tried an AI tool, it impressed everyone for a fortnight, and nobody uses it now.',
      'You cannot say what your current process costs, only that it feels expensive.',
    ],
  },
  deliverables: {
    heading: 'The paths you can take',
    intro: 'Each of these is a different starting point. Most businesses begin with one.',
    items: [
      { title: 'Enquiries and conversations', body: 'Routine questions, bookings and follow-ups handled consistently while your people take the sensitive ones. This is Customer & Workforce AI.' },
      { title: 'Documents and data entry', body: 'Invoices, purchase orders and delivery paperwork read, checked against your records and routed with the evidence attached. This is Business Operations.' },
      { title: 'Work that crosses teams', body: 'Repeatable back-office processes with a visible owner at every handoff and approval before anything consequential happens. This is [Agentic Operations](/systems/agentic-operations).' },
      { title: 'Answers your team keeps asking for', body: 'Approved policies, procedures and product knowledge made findable, with the source shown beside the answer. This is Enterprise Knowledge.' },
      { title: 'Reporting and decisions', body: 'Sources connected, definitions agreed and changes explained, so the discussion starts from the same numbers. This is [Decision Intelligence](/systems/decision-intelligence).' },
      { title: 'A website, or something built from scratch', body: 'A distinctive site for a brand, business or creator, or a platform shaped around work only you do. See [Website Design & Development](/systems/website-design-development), or Custom AI Platforms.' },
    ],
  },
  process: {
    heading: 'From first conversation to a working system',
    items: [
      { title: 'A first conversation', body: 'Free, and usually about forty minutes. You describe one recurring piece of work; we ask what happens when it goes wrong, and who currently notices.' },
      { title: 'Diagnosis', body: 'We map the process as it really runs, including the exceptions nobody documented, and record a baseline in time, volume and errors. Where the scope is wider, this is the Blueprint.' },
      { title: 'A recommendation and a scope', body: 'We say what is worth building, what is not, and in what order. Scope and fee are agreed in writing before any paid work begins, so there are no surprises mid-build.' },
      { title: 'Build with your people in the room', body: 'We build against your real cases and show working software early rather than at the end. The person who does the work today tests it and tells us where it is wrong.' },
      { title: 'Launch, measure and hand over', body: 'The system goes live with a named owner, agreed rules and monitoring. We review it against the baseline you recorded, and adjust as the business changes.' },
    ],
  },
  connects: {
    heading: 'What these systems connect to',
    body: 'Nothing here replaces your existing software; it joins the tools you already run, under permissions your team agrees before anything is connected.',
    items: [
      'Your accounting and billing software',
      'Your CRM and sales tools',
      'Your email, messaging and shared inboxes',
      'Your document storage and drives',
      'Your inventory, order or job management system',
      'Your reporting and spreadsheet tools',
    ],
  },
  bring: {
    heading: 'What you provide',
    items: [
      'One recurring piece of work described concretely, with a real example attached.',
      'A named owner who understands the process and can make decisions about it.',
      'The current rules: what is allowed, what needs approval and what must never be automatic.',
      'Access to the relevant records and tools, at the level agreed rather than wholesale.',
      'A baseline, however rough: how long it takes today, how often it happens and what goes wrong.',
    ],
  },
  cost: {
    heading: 'What it costs',
    paragraphs: [
      'BYBO publishes no prices, because the work varies too much for a figure to be honest. Scope and fee are agreed in writing before any paid work begins. The first conversation is free and carries no obligation. Where the right build is not yet clear, the Blueprint is a paid diagnostic ending in a recommendation and a 90-day roadmap — including, sometimes, the recommendation not to build.',
      'Plan for two kinds of cost. There is the build, which is one-off, and running the system, which continues: model and cloud usage, monitoring, and the hours your named owner spends reviewing. Both are visible before you commit. [The cost guide](/insights/business-automation-cost-india) sets out what drives the number and how to compare it against the manual process.',
    ],
    drivers: [
      'How many workflows are in scope, and whether they cross teams',
      'The state of your records and how much cleaning they need first',
      'How many systems have to be connected, and how well they allow it',
      'How much judgement the work requires, and therefore how much review it needs',
      'Volume, which drives running cost more than build cost',
      'How much training and change support your team wants',
    ],
  },
  measure: {
    heading: 'How it is judged',
    body: 'We record a baseline before anything is built, then compare the same measures after launch.',
    items: [
      'Time per case, from arrival to completed record',
      'Error and rework rate against what it was before',
      'Share of cases needing human review, and whether that share falls sensibly',
      'Cost per completed unit of work, including what it costs to run',
      'Adoption: whether the people it was built for still use it after three months',
    ],
  },
  control: {
    heading: 'Where a person decides',
    body: 'Every system BYBO builds has a gate, and it is placed deliberately. Unclear inputs and policy exceptions go to a named reviewer with the evidence beside them. Consequential actions wait for approval. Recommendations stay separate from decisions, so a report suggests and a person chooses. If nobody responds within the agreed time, the work escalates rather than proceeding quietly. The rules are yours, written down, and changeable as your business learns what it trusts.',
  },
  faqs: [
    { q: 'We are not sure which system we need. Is that a problem?', a: 'No, it is the normal starting position and the reason this page exists. Describe the work rather than the technology and we will tell you which path fits, or that none does. Choosing the wrong system is far more expensive than spending a free conversation working out the right one.' },
    { q: 'What if the answer is that we should not automate this?', a: 'Then we say so. Sometimes the fix is a clearer process, a different form or one person changing what they do on a Tuesday. That answer costs you a conversation and saves a build. We would rather be useful now than sell you something you resent in six months.' },
    { q: 'How much of our team’s time will this take?', a: 'Less than a project, more than nothing. Expect your named owner to spend a few hours a week during the build, mostly reviewing real cases and answering questions about exceptions. Systems built without the person who does the work are the ones that quietly stop being used.' },
    { q: 'What happens to our data?', a: 'We work with the least access that does the job, prefer representative samples over wholesale copies, and agree read and write scopes in writing before connecting anything. Our handling of personal information is set out on the [privacy page](/privacy), and your security team can set stricter conditions.' },
    { q: 'We tried an AI pilot before and it went nowhere. Why would this differ?', a: 'Usually because the pilot had no owner, no baseline and no plan for the awkward cases. We name an owner before building, record what the work costs today, and design for the exceptions rather than the clean demonstration. Less exciting to watch, and more likely to still be running next year.' },
    { q: 'What is the first step?', a: 'One free conversation about one recurring problem. No specification needed; a real example is enough. We will discuss the work, say whether a system is appropriate and agree a sensible next step. Start at [talk to BYBO](/apply).' },
  ],
  reading: ['seven-ai-systems-for-business-operations', 'identify-repetitive-work-to-automate', 'why-ai-pilots-fail'],
};

export default detail;
