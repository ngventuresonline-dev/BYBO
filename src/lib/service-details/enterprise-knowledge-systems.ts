import type { ServiceDetail } from './types';

const detail: ServiceDetail = {
  slug: 'enterprise-knowledge-systems',
  overview: {
    heading: 'What this system does',
    paragraphs: [
      'Your business already knows the answer to most questions your team asks each day. It is in a policy, a signed contract, an SOP written two years ago, or a proposal someone wrote for a similar client. The problem is finding it. This system answers questions from those sources, shows where each answer came from, and respects who may see what.',
      'It takes on the searching. A question is checked against the sources the person asking is permitted to see, the relevant passages are found, and an answer is written with the citation attached, so the reader can open the original and judge it. Where the evidence is thin or contradictory, the system says so instead of filling the gap with something plausible.',
      'What stays with people is authorship and ownership. Source owners still write the policy and approve the SOP; the system only makes their work reachable. When a question has no good answer, that gap is routed to the owner rather than left unanswered, so the knowledge base improves through use rather than through an annual clean-up nobody has time for.',
    ],
  },
  audience: {
    heading: 'Signs this fits your business',
    items: [
      'New joiners take months to become useful, mostly because they do not know who to ask.',
      'The same questions reach the same two experienced people, and the business quietly depends on them being available.',
      'Policies and SOPs exist in three places, and nobody is sure which version is current.',
      'Your team rewrites proposals from scratch because finding the approved wording takes longer than retyping it.',
      'Some information is genuinely restricted, so a shared folder open to everyone is not an acceptable answer.',
    ],
  },
  deliverables: {
    heading: 'What you receive',
    items: [
      {
        title: 'An answering system over your own sources',
        body: 'A place your team asks questions in plain language and gets answers drawn only from the material you approved, with the source named on every answer.',
      },
      {
        title: 'A source map with owners and permissions',
        body: 'A written record of which collections are included, who owns each one and who may see it. It is the document that makes access arguments short.',
      },
      {
        title: 'An evaluation set of real questions',
        body: 'Questions your team actually asks, with the answers your experts agree are correct. We test against it before launch and re-run it after every change to the sources.',
      },
      {
        title: 'A gap and review queue',
        body: 'Unanswered questions, stale documents and contradictions collected in one place and routed to the owner who can resolve them.',
      },
      {
        title: 'Logs, usage view and documentation',
        body: 'A record of questions asked and sources used, a simple view of adoption and unanswered rates, and notes for whoever maintains the system.',
      },
    ],
  },
  process: {
    heading: 'How the work runs',
    items: [
      {
        title: '1. Ask',
        body: 'Someone asks a question where they already work: a chat tool, an internal page, a search box. We agree the channels first, because a system nobody passes on the way to work goes unused.',
      },
      {
        title: '2. Check access',
        body: 'The question is answered only from sources that person is permitted to see. Permissions come from your existing access rules, and we test that restricted material stays restricted before launch.',
      },
      {
        title: '3. Retrieve',
        body: 'The relevant passages are found across the permitted collections, with the current version preferred over the superseded one wherever versioning exists.',
      },
      {
        title: '4. Answer',
        body: 'An answer is written with citations to the passages behind it. If the evidence is missing, weak or contradictory, that is stated plainly rather than smoothed over.',
      },
      {
        title: '5. Improve',
        body: 'Unanswered questions and flagged contradictions go to the source owner. Their fixes update the sources, and the evaluation set grows with the questions that caught a problem.',
      },
    ],
  },
  connects: {
    heading: 'What it connects to',
    body: 'Every source is added deliberately, with its owner named and its access rules carried through, and restrictions are tested before anyone is given the system.',
    items: [
      'Document storage and shared drives, where policies, SOPs and past work usually live',
      'Your intranet or wiki, when the current process is written there',
      'Contract and agreement stores, where the commercial detail sits',
      'Your CRM or project system, for past proposals, decisions and client history',
      'Email or chat archives, where they are in scope and the access rules allow it',
      'The chat or search tool your team already uses, so the answer arrives where the question was asked',
    ],
  },
  bring: {
    heading: 'What we need from you',
    items: [
      'The collections you want included, and an honest note on which are current and which are stale.',
      'Your access rules: who may see what, and which material must never appear in a general answer.',
      'A named owner for each collection, able to resolve a gap or approve a correction.',
      'A list of the questions your team really asks, including the ones that currently need an expert.',
      'A baseline: how long finding an answer takes today, and how often it is simply asked of a colleague.',
    ],
  },
  cost: {
    heading: 'What drives the cost',
    paragraphs: [
      'BYBO publishes no prices. What this costs depends on how many sources you include, what state they are in and how strict your access rules are, so scope and fee are agreed in writing before paid work begins. The first conversation costs nothing. Most engagements start with the [Blueprint](/blueprint), a paid diagnostic ending in a recommendation and a 90-day roadmap.',
      'The build is one cost; running it is another. Sources change, questions arrive, the evaluation set is re-run and someone reviews the gap queue. We set out both before you commit, and [the cost guide](/insights/business-automation-cost-india) explains the arithmetic in more detail.',
    ],
    drivers: [
      'How many collections are included, and whether they need cleaning before they are usable',
      'The format of the material — searchable text is cheaper than scans of printed pages',
      'How detailed your access rules are, since permissions must be verified at retrieval, not assumed',
      'The accuracy the questions demand, which sets the size of the evaluation set',
      'How often the sources change, which drives the ongoing refresh work',
    ],
  },
  measure: {
    heading: 'How it is judged',
    body: 'We agree a baseline for how answers are found today, then compare the same measures after launch and at each review point.',
    items: [
      'Time to find an answer, against the time the same question takes now',
      'Share of answers supported by a citation a reader can open',
      'Unanswered question rate, and how quickly gaps are closed',
      'Active adoption across the teams it was built for',
      'Correct-answer rate on the evaluation set, re-run after changes',
    ],
  },
  control: {
    heading: 'Where a person decides',
    body: 'Source owners review gaps and changes, and unsupported answers are withheld. That is the rule the design rests on: an answer without evidence is not offered, because a confident wrong answer about a policy is worse than no answer at all. Owners decide what enters the sources, what is retired and how a contradiction is resolved. Readers can flag an answer, and a flagged answer becomes a case in the review queue rather than a complaint that disappears. Nothing is published to a wider audience on the strength of a system answer alone. Our guide on [a named owner for AI systems](/insights/named-owner-for-ai-systems) explains why this role matters more than the technology.',
  },
  faqs: [
    {
      q: 'Can it make something up?',
      a: 'The design is intended to prevent it: answers are drawn from retrieved passages, citations are shown, and where evidence is missing the system says so and routes the gap to an owner. No system is perfect, which is why every answer carries the source. If a reader cannot check the answer, the answer has not done its job.',
    },
    {
      q: 'What happens when two documents contradict each other?',
      a: 'It should show both and say they disagree, rather than quietly choosing one. Where versioning exists, the current document is preferred and the superseded one marked. Persistent contradictions are logged for the source owner, because the real fix is in your documents rather than in the retrieval.',
    },
    {
      q: 'Do we need to organise everything first?',
      a: 'No, and we would rather you did not spend six months tidying before starting. We begin with the collections that answer the most common questions and note what is unusable. Documents that exist only as scans may need [document handling](/systems/document-multimodal-intelligence) before they can be searched properly, and the Blueprint identifies that early.',
    },
    {
      q: 'How do we know the answers are good enough?',
      a: 'By testing on questions your own experts have answered. We agree an evaluation set before launch, measure against it, and re-run it whenever sources or configuration change. That gives you a number you can argue with, rather than an impression formed from a few demonstrations.',
    },
    {
      q: 'What if our knowledge is mostly in people, not documents?',
      a: 'Then this is the wrong first step, and we will say so. A retrieval system can only reach what is written down. Where the useful knowledge sits with two or three experienced people, the honest recommendation is often to capture a small amount of it well before building anything.',
    },
    {
      q: 'What is the first step?',
      a: 'A conversation about the questions your team keeps asking and where the answers currently live. If it looks suitable, a Blueprint examines your sources, sets a baseline and ends with a recommendation and a 90-day roadmap. You can also [start an enquiry](/apply?system=enterprise-knowledge-systems) describing your sources.',
    },
  ],
  reading: [
    'internal-knowledge-system',
    'ai-for-sops-policies-knowledge',
    'evaluate-ai-quality-real-cases',
  ],
};

export default detail;
