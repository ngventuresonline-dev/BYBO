import type { ServiceDetail } from './types';

const detail: ServiceDetail = {
  slug: 'ai-infrastructure-governance',
  overview: {
    heading: 'What Infrastructure & Governance is',
    paragraphs: [
      'This is the operating foundation underneath an AI system: who may use it, what it may do, how a change is checked before it goes live, what it costs to run, and what happens the day it gets something wrong. Every system BYBO builds carries these controls already. This service is for businesses needing one shared foundation across several systems, or across work built by someone else.',
      'The work is unglamorous and specific. We name an owner for each system. We write permissions by role, so a person sees the records and takes the actions that match their job and nothing wider. We assemble an evaluation set from real past cases and run it before every release. We turn activity into readable logs and a cost view, and agree a response plan for failures.',
      'What stays with your people is judgement and authority. The controls decide nothing on your behalf; they make decisions visible and reversible. Your release owner approves changes. Your named operator watches quality and cost. If you later change vendor, model or team, the permissions, evaluations and records remain yours, as [how we work](/how-we-work) sets out.',
    ],
  },
  audience: {
    heading: 'Signals this is the right service',
    intro: 'You will recognise some of these in your own business.',
    items: [
      'Two or three AI tools are already in use and nobody can say which records each one can read.',
      'A prompt or model was changed last month and nobody checked it against real past cases first.',
      'The monthly usage bill arrives as one number that cannot be attributed to a team or a workflow.',
      'When an output was wrong, the team heard it from a customer rather than from a report.',
      'An auditor or a large client asked how AI decisions are recorded, and the answer took a week.',
    ],
  },
  deliverables: {
    heading: 'What you receive',
    items: [
      { title: 'A permissions map', body: 'A written table of roles: who reads which data, who triggers which action, who approves a release. Implemented in the systems, not only described.' },
      { title: 'An evaluation set', body: 'Real cases from your history, including awkward ones, each with the correct outcome recorded. Every change is scored against it before release.' },
      { title: 'Logs and an operating view', body: 'A readable record of what ran, what it decided, who approved it and what it cost, with quality, usage and reliability shown together.' },
      { title: 'A response plan', body: 'How a failure is detected, who is contacted, what pauses automatically, how you roll back and how the case is reviewed afterwards.' },
      { title: 'Documentation and handover', body: 'Plain-language notes on how the controls work and how to change them, plus a working session with the named owner and their deputy.' },
    ],
  },
  process: {
    heading: 'How the work runs',
    items: [
      { title: 'Define', body: 'We agree policies, boundaries and a named owner for each system, including what it must never do without a person and which records are out of scope.' },
      { title: 'Control', body: 'Permissions and runtime limits go in by role, with caps on volume, spend and available actions. Access is reviewed on an agreed cycle rather than left to drift.' },
      { title: 'Evaluate', body: 'We build the evaluation set from your cases and agree the pass mark with the people who do the work. A cheaper answer that is wrong is not cheaper.' },
      { title: 'Approve', body: 'A named release owner authorises each production change against the agreed checks, with a rollback path tested before it is needed rather than after.' },
      { title: 'Observe', body: 'After launch we monitor quality drift, failures, availability and cost per task. Incidents follow the response plan, and what is learned joins the evaluation set.' },
    ],
  },
  connects: {
    heading: 'What it connects to',
    body: 'Controls are only real where the work happens, so we connect to your existing systems under permissions your team agrees in writing beforehand.',
    items: [
      'Your identity and single sign-on provider, so roles follow the people you already manage',
      'Your cloud accounts and model providers, for usage and cost attribution',
      'Your existing AI systems and workflow tools, wherever they were built',
      'Your ticketing or service desk, so incidents arrive where the team already looks',
      'Your document storage, with read scopes limited to what is needed',
      'Your reporting tools, so the operating view sits beside the other business numbers',
    ],
  },
  bring: {
    heading: 'What you provide',
    items: [
      'A named owner for each system, with a deputy, and time in their week for reviews.',
      'Real past cases, including the difficult and disputed ones, to build the evaluation set from.',
      'The current rules: what is approved, what needs a person and what is prohibited.',
      'Access to the accounts involved, at the level agreed rather than an administrator key.',
      'A baseline for quality, cost and incident recovery today, even if the numbers are rough.',
    ],
  },
  cost: {
    heading: 'What it costs',
    paragraphs: [
      'BYBO publishes no prices, because the same words describe very different pieces of work. Scope and fee are agreed in writing before any paid work begins, and the first conversation is free. Where the picture is unclear, the sensible start is the [Blueprint](/blueprint): a paid diagnostic ending in a recommendation and a 90-day roadmap.',
      'Two costs behave differently. The build is one-off: assessment, controls, evaluation sets, documentation. Running costs continue: model and cloud usage, monitoring, and the hours your owner spends on reviews. Both are visible before you commit, and the cost view keeps the second honest. See [the cost guide](/insights/business-automation-cost-india).',
    ],
    drivers: [
      'How many systems and teams come under the same foundation',
      'Whether controls are added to existing work or built in from the start',
      'How many roles and permission levels your business genuinely needs',
      'The size of the evaluation set and how much must be assembled by hand',
      'Evidence requirements set by auditors, insurers or larger clients',
      'How much monitoring and reporting you want in place at launch',
    ],
  },
  measure: {
    heading: 'How it is judged',
    body: 'We record a baseline before anything changes, then review the same measures on an agreed cycle.',
    items: [
      'Evaluation pass rate on the agreed case set, tracked release by release',
      'Incident recovery time, from detection to a working system',
      'Cost per completed task, and how it moves as volume grows',
      'Access and audit coverage: systems with a named owner and reviewed permissions',
      'Share of releases that followed the approval path without an exception',
    ],
  },
  control: {
    heading: 'Where a person decides',
    body: 'Release owners approve changes against agreed checks, with a rollback path. A change can be evaluated automatically, but it goes live because a named person read the result and said yes. The same holds in operation: high-impact actions wait for the reviewer named in the permissions map, and if nobody responds within the agreed time the work escalates rather than proceeding quietly. Responsibility is written down before you need it.',
  },
  faqs: [
    { q: 'We already have an AI system built by someone else. Can you work on that?', a: 'Yes. We assess the architecture, permissions, failure handling and running costs as they stand, then set out what to fix first and what can wait. You get the assessment whether or not you ask us to do the remediation, and it is written so another team could act on it.' },
    { q: 'Does this make us compliant with data protection law?', a: 'No platform or vendor can promise that, and be careful of anyone who does. We implement the controls and evidence your security, legal and compliance owners specify, and make the records easy to produce when asked. The judgement about sufficiency stays with your advisers.' },
    { q: 'Will this slow our team down?', a: 'Reviews take time, so we scope them to match consequence. Routine work proceeds within agreed rules; changes and high-impact actions wait for a person. Most delay teams complain about comes from unclear ownership rather than the check itself, which is why naming an owner comes first.' },
    { q: 'What happens the first time it gets something wrong?', a: 'That is planned for rather than reacted to. The failure is detected, affected work pauses, the named owner is told, and you roll back. Afterwards the case joins the evaluation set so the same failure is caught before the next release. Nothing here assumes a system that is never wrong.' },
    { q: 'How much of our data do you need to see?', a: 'As little as the work requires. We prefer representative samples over full access, agree read scopes in writing before connecting anything, and keep access time-limited. Our handling of personal information is set out on the [privacy page](/privacy), and your security team can set stricter terms.' },
    { q: 'What is the first step, and who owns this afterwards?', a: 'A free conversation about one system you are unsure of: what it does, who uses it, what would happen if it failed on a Monday morning. Afterwards, everything is yours — the permissions map, evaluation set, logs and documentation. Start at [enquire about this system](/apply?system=ai-infrastructure-governance).' },
  ],
  reading: ['enterprise-ai-governance', 'ai-permissions-logs-approval-gates', 'when-ai-workflows-go-wrong'],
};

export default detail;
