import type { ServiceDetail } from './types';

const detail: ServiceDetail = {
  slug: 'decision-intelligence',
  overview: {
    heading: 'One business, one set of numbers',
    paragraphs: [
      'Most reporting problems are not analysis problems. The sales figure in one system does not match the one in another, two teams define a completed order differently, and somebody spends two days a month rebuilding a spreadsheet before anyone can discuss it. Decision intelligence connects your business data, settles the definitions, and shows what changed and what appears to be driving it.',
      'The work BYBO takes on is the plumbing and the discipline behind the numbers: connecting approved sources, checking that the data is fresh and complete, reconciling the places where systems disagree, and building a view that shows movement rather than a wall of figures. Where a number is uncertain or a source is stale, the view says so instead of quietly averaging the problem away.',
      'The decision stays with people. The system brings the evidence, the assumptions and the caveats into one place so a leadership meeting argues about the business rather than about whose spreadsheet is right. Forecasts are treated as conditional estimates with visible assumptions, never as facts, and every action agreed in a review gets an owner and a date.',
    ],
  },
  audience: {
    heading: 'This tends to fit when',
    intro: 'The symptoms usually show up in the days before a review meeting.',
    items: [
      'Someone spends two days each month assembling the management report by hand.',
      'Two departments quote different revenue for the same period and both can justify it.',
      'You find out about a problem in an outlet or a region a month after it started.',
      'Nobody can say when the numbers on a dashboard were last refreshed.',
      'Planning happens in a spreadsheet whose assumptions only one person understands.',
    ],
  },
  deliverables: {
    heading: 'What you receive',
    items: [
      { title: 'An agreed definitions document', body: 'A written record of what each measure means, which source is authoritative, and how edge cases are counted. This is usually the most valuable item on the list.' },
      { title: 'Connected, checked data sources', body: 'Approved systems brought together with freshness and completeness checks, so a broken feed is visible rather than silently reported as a fall.' },
      { title: 'A reporting view built around change', body: 'A view that shows what moved, by how much and against what, with the source evidence one click away from each figure.' },
      { title: 'Reconciliation and exception handling', body: 'Rules for what happens when two systems disagree, and a queue of the differences for a person to resolve rather than an averaged number.' },
      { title: 'A review routine and documentation', body: 'An agreed meeting rhythm where the view is used, decisions and owners are recorded, plus documentation and training for the team who maintain it.' },
    ],
  },
  process: {
    heading: 'How the work runs',
    intro: 'Definitions come before dashboards. The order matters more than most people expect.',
    items: [
      { title: 'Connect', body: 'We bring the approved sources together under agreed access: the accounting system, the sales records, operations, and the spreadsheets that still matter. Nothing is copied without a reason.' },
      { title: 'Validate', body: 'We check freshness, completeness and definitions, and write down where the systems disagree. This stage frequently finds the real problem, and sometimes ends the project early with a cheaper fix.' },
      { title: 'Analyse', body: 'We identify the changes worth attention and the possible drivers behind them, with the strength of the evidence stated. A correlation is described as a correlation, not a cause.' },
      { title: 'Review', body: 'Your people challenge the interpretation against what they know about the month. Their corrections change the definitions and the thresholds, which is the point of the stage.' },
      { title: 'Decide', body: 'The action, the owner and the date are recorded with the evidence that supported them, so the next review starts from what was agreed last time.' },
    ],
  },
  connects: {
    heading: 'What it connects to',
    body: 'We read from systems you already run, under read-only access wherever possible, agreed source by source before any connection is built.',
    items: [
      'Your accounting or ERP system, as the usual source of record for money',
      'Your CRM and sales records, for pipeline and customer movement',
      'Your operations, inventory or production systems',
      'The spreadsheets that hold real business logic, where they are stable enough to trust',
      'Your identity provider, so who sees which figures follows your existing access rules',
    ],
  },
  bring: {
    heading: 'What you need to provide',
    items: [
      'The reports you actually use today, including the manual steps that produce them.',
      'A named owner for each definition, with the authority to settle a disagreement.',
      'Read access to the source systems, and the person who can grant it.',
      'Examples of past decisions the numbers should have supported, and where they fell short.',
      'A baseline: preparation time, how often figures are corrected after publication, and how long a signal takes to reach an action.',
    ],
  },
  cost: {
    heading: 'What drives the cost',
    paragraphs: [
      'BYBO publishes no prices. Scope and fee are agreed in writing before paid work begins, and the first conversation is free. Where the sources are messy or the definitions contested, the Blueprint is a paid diagnostic that establishes what you actually have and ends in a recommendation and a 90-day roadmap.',
      'Cost here is driven far more by data condition than by analysis. Clean, well-defined sources make the build straightforward; disputed definitions and inconsistent records add the most work, and that effort is usually worth doing whatever you build afterwards. [The cost guide](/insights/business-automation-cost-india) explains how to weigh this against the preparation time you spend today.',
    ],
    drivers: [
      'The number of source systems and how willingly they give up their data',
      'How much disagreement there is over definitions before you can compare anything',
      'The condition of historical records, and how far back the view needs to reach',
      'How often the view must refresh, and the checks that refresh has to pass',
      'Whether forecasting and scenario comparison are in scope or a later step',
    ],
  },
  measure: {
    heading: 'How it is judged',
    body: 'We record how reporting works today before anything is built, then compare the same measures after launch.',
    items: [
      'Reporting preparation time, from source to a report someone can use',
      'Data freshness, and how often the view is stale when it is read',
      'Reconciliation exceptions, and how quickly they are cleared',
      'Detection time: how long a meaningful change takes to become visible',
      'Time from signal to a recorded action with an owner',
    ],
  },
  control: {
    heading: 'Where a person decides',
    body: 'People make the decision. Forecasts and explanations expose their assumptions, the data period they used and how confident they are, so a recommendation can be argued with. Nothing acts on the numbers automatically: the system does not adjust a price, hold an order or change a plan. It shows the change, the evidence and the caveats, and your named decision-maker chooses what happens.',
  },
  faqs: [
    { q: 'Our data is a mess. Should we fix that first?', a: 'Not separately, and not entirely. Fixing everything before building anything tends to stall. We start with the sources one report genuinely needs, clean the definitions that report depends on, and leave the rest. The validation stage tells you honestly how much work the data is in, and sometimes that finding alone is worth the exercise.' },
    { q: 'Can it work from spreadsheets?', a: 'Yes, where the structure and the update process are reliable enough. A spreadsheet maintained by one person on their own laptop is a risk we will name rather than build on. Often the right first step is agreeing which spreadsheets hold real business logic and giving those a proper home.' },
    { q: 'Will this tell us what decision to make?', a: 'No, and you should be wary of anything that claims to. The system narrows attention to what changed, offers possible drivers with the strength of the evidence stated, and puts the caveats next to the figure. Your authorised people interpret it. [When AI should decide](/insights/when-ai-should-decide) sets out where that line sits.' },
    { q: 'What happens when two systems disagree?', a: 'The difference is flagged as an exception rather than averaged away. We agree reconciliation rules in advance — which source is authoritative for which measure, and what tolerance is acceptable — and anything outside that goes to a person to resolve. Persistent disagreements usually point at a process problem worth fixing at the source.' },
    { q: 'How much of our team’s time does it need?', a: 'The heaviest demand is agreeing definitions, and that is a business conversation rather than a technical one. Expect your named owners to spend real time settling what a completed order or an active customer means. After launch, the ongoing commitment is the review meeting itself and keeping source ownership current.' },
    { q: 'What is the first step?', a: 'Bring us the report that takes too long to prepare. A free conversation about how it is built today, who argues with it and what decision it is meant to support tells us most of what we need. From there, either a scoped build or a [Blueprint](/blueprint) if the sources need establishing first.' },
  ],
  reading: ['spreadsheet-reporting-to-decision-intelligence', 'when-ai-should-decide', 'measure-ai-system-performance'],
};

export default detail;
