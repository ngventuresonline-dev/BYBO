import type { ServiceDetail } from './types';

const detail: ServiceDetail = {
  slug: 'custom-ai-platforms',
  overview: {
    heading: 'A product built around your way of working',
    paragraphs: [
      'Most businesses run on a workflow no product quite matches. The steps are yours, the rules are yours, and the software you bought was written for someone else. A custom platform is one place where that workflow actually lives: an internal workspace, a customer or partner portal, or a product you sell, with the data, the permissions and the AI capabilities behind one interface.',
      'BYBO takes on the whole product, not one clever part of it. We frame who uses it and what a good outcome looks like, design the screens and the boundaries of the system, build the data model and the connections to your existing tools, and put a review queue where a person needs to check something. Every action the platform can take is agreed in advance.',
      'What stays with people is judgement and release. Your team decides what quality is good enough, who may see which record, and when a version goes live. We build the evidence for those calls: real test cases, activity logs and a plain view of what the system did. Ownership after launch is explicit — an operating arrangement with us, or a documented handover.',
    ],
  },
  audience: {
    heading: 'This tends to fit when',
    intro: 'A custom build is not always the right answer. These are the signals that suggest it might be.',
    items: [
      'Your team runs the core process across a spreadsheet, a shared inbox and two tools that do not speak to each other.',
      'You have bought software three times and configured your way around the same missing step each time.',
      'Different roles need very different views of the same job, and today everyone sees everything.',
      'A pilot proved an AI capability is useful, but nobody can use it without you in the room.',
    ],
  },
  deliverables: {
    heading: 'What you receive',
    items: [
      { title: 'A working platform for a defined first version', body: 'The interface, the data model and the workflow behind it, scoped to the users and tasks we agree at the start rather than everything at once.' },
      { title: 'Roles, permissions and a review queue', body: 'Each role sees and does only what it should. Work that needs approval waits in a queue with the context attached.' },
      { title: 'Connections to your existing systems', body: 'Permission-scoped links to the tools you already run, so the platform reads and writes real records instead of copies.' },
      { title: 'An evaluation set and release checks', body: 'Real cases the platform must handle correctly, run before each release so you can see whether a change improved things.' },
      { title: 'Logs, a cost view and documentation', body: 'A record of what the system did, what it is costing to run, and written handover covering the code, the operating steps and training.' },
    ],
  },
  process: {
    heading: 'How the work runs',
    intro: 'Five stages, each ending in a decision you make before the next begins.',
    items: [
      { title: 'Frame', body: 'We map the users, the workflow and what success looks like in numbers you already track. This usually starts as a paid [Blueprint](/blueprint), ending in a recommendation and a 90-day roadmap.' },
      { title: 'Design', body: 'We design the interfaces role by role and set the boundaries: what the system may do alone, what it must ask about, what sits outside it. You sign off before any build starts.' },
      { title: 'Build', body: 'We build the data model, the integrations and the AI capabilities in slices you can see working. Each slice comes with the test cases it has to pass.' },
      { title: 'Validate', body: 'Your people run the real workflow on real cases, not a script. Their findings set the release criteria, and anything unresolved is listed rather than quietly deferred.' },
      { title: 'Operate', body: 'After launch we monitor quality, cost and failures, and adapt the platform as the business changes. [How we work](/how-we-work) sets out the review rhythm.' },
    ],
  },
  connects: {
    heading: 'What it connects to',
    body: 'A platform is only useful if it reads and writes the records you already keep, so we agree each connection and the permissions it uses before anything is built.',
    items: [
      'Your accounting or ERP software, for invoices, orders and ledgers',
      'Your CRM and sales records, for customers, quotes and pipeline',
      'Your identity provider, so access follows your existing joiners and leavers process',
      'Model providers, kept separate from your product so it stays portable',
    ],
  },
  bring: {
    heading: 'What you need to provide',
    items: [
      'A named owner with the authority to decide scope, quality and release.',
      'Representative examples of the work, including the awkward cases you would rather not show.',
      'The current rules: who approves what, and what the exceptions are.',
      'Access to the systems the platform must connect to, and the person who can grant it.',
      'A baseline: how long the work takes today, how often it is redone and what it costs.',
    ],
  },
  cost: {
    heading: 'What drives the cost',
    paragraphs: [
      'BYBO publishes no prices, because a platform is priced by what it has to do. We agree scope and fee in writing before any paid work begins, and the first conversation costs nothing. Where the shape of the work is unclear, the Blueprint is a paid diagnostic ending in a recommendation and a 90-day roadmap.',
      'The main variables are the number of distinct roles, the systems it must connect to, and how strict the release checks need to be. Running costs are separate from build costs and depend on usage, so we show them as a range with the assumptions behind it. [The cost guide](/insights/business-automation-cost-india) explains the arithmetic.',
    ],
    drivers: [
      'The number of roles and distinct screens the first version must support',
      'How many systems it connects to, and whether they offer sensible interfaces',
      'How much evaluation a release must pass before it goes live',
      'Whether we operate the platform or you take a documented handover',
    ],
  },
  measure: {
    heading: 'How it is judged',
    body: 'We agree a baseline before the build and review the same measures after launch, so the comparison is against your current process rather than an ideal.',
    items: [
      'Task success rate on the agreed set of real cases',
      'Active adoption: how many intended users actually work in it each week',
      'Response time for the tasks the platform is meant to speed up',
      'Cost per completed task, build and running costs kept separate',
    ],
  },
  control: {
    heading: 'Where a person decides',
    body: 'Your team signs off on quality, access and the release criteria before launch, and that gate stays in place for every later change. Inside the platform, actions with consequences — a commitment to a customer, a payment, a record leaving your business — wait for a named person, with the context attached. Nothing is approved by default because it worked last time.',
  },
  faqs: [
    { q: 'How do we know a custom build is not overkill?', a: 'Often it is. The honest test is whether an existing product plus a few connections would do the job at acceptable cost. We look at that first and will say so if the answer is yes. A build earns its place when the workflow is genuinely yours, several roles need different views of it, and the gap costs time every week.' },
    { q: 'Where does our data live, and who can see it?', a: 'Your data stays in systems you own, under access rules you set. The platform reads and writes through permissions we agree in writing, and every access is logged. We work to the least access that lets the workflow run. Our [privacy page](/privacy) sets out how BYBO handles what we see during the work.' },
    { q: 'What happens when the platform gets something wrong?', a: 'It should fail visibly rather than quietly. Failures are logged, routed to a named owner and shown with the case that caused them. Wrong cases go into the evaluation set, so the same mistake is checked for at every release. Where a mistake would be expensive, that step waits for a person instead.' },
    { q: 'How much of our team’s time will this take?', a: 'Most of it lands in framing and validation. Expect your named owner to be available regularly through the build, and a small group of real users to test the workflow on real cases before launch. Gathering examples and writing down the current rules is the part businesses usually underestimate.' },
    { q: 'Will we be tied to you or to one model provider?', a: 'We design a sensible separation between your product and the model behind it, so the provider can change without rebuilding the platform. Code ownership, documentation and handover terms are agreed in the scope, not afterwards. If you later want to run it in-house, the documentation and training are written for that outcome.' },
    { q: 'Can we start smaller than a full platform?', a: 'Yes, and usually you should. A first version covering one role and one workflow tells you more than a specification does. If the need turns out to be narrower, a connected workflow from [agentic operations](/systems/agentic-operations) may be the better build, and we will say so rather than sell you a platform.' },
  ],
  reading: ['build-buy-or-integrate-ai', 'why-ai-pilots-fail', 'ai-vendor-lock-in'],
};

export default detail;
