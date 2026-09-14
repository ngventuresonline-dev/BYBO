/**
 * The worked example that sits near the top of each system page: the system
 * shown doing its job on one real-shaped case, including the part where it stops.
 *
 * These are illustrative, built to show the shape of the work — the same footing
 * as the concept websites on the studio page. They are not client records, and
 * every one carries that line on the page.
 */

/** Which mock the left-hand panel renders. One per system. */
export type WorkedKind = 'invoice' | 'case' | 'answer' | 'roles' | 'chat' | 'signal' | 'audit';

export type Worked = {
  /** Section heading, two lines. */
  heading: string;
  lede: string;
  /** The line in the fake browser bar. */
  chrome: string;
  /** Timestamps at the right of the bar. */
  meta: string;
  kind: WorkedKind;
  /** Label above the left panel. */
  leftLabel: string;
  /** Caption under the left panel. */
  leftNote: string;
  /** What the system got through on its own. */
  did: string[];
  /** Where it stopped and why. */
  stop: { title: string; body: string };
  /** Who it went to. */
  person: { initials: string; name: string; note: string; primary: string; secondary: string };
  /** Three consequences, shown under the frame. */
  after: { title: string; body: string }[];
};

export const worked: Record<string, Worked> = {
  'document-multimodal-intelligence': {
    heading: 'One invoice,\nstart to finish.',
    lede: 'Not a description of the system. The system, on one real-shaped document — including the part where it stops.',
    chrome: 'document desk / invoice 4471',
    meta: 'received 09:14 · read 09:14 · stopped 09:14',
    kind: 'invoice',
    leftLabel: 'What arrived',
    leftNote: 'A photograph from a supplier who has never used your format. The highlight is the system pointing at where the value came from.',
    did: [
      'Classified as a tax invoice · read 11 fields',
      'Matched supplier to your ledger · GSTIN valid',
      'Checked 3 lines against PO-2210 · 2 matched',
    ],
    stop: {
      title: 'Stopped. One line does not match.',
      body: 'Pallet wrap billed at ₹410. PO-2210 says ₹365, and the last four invoices from this supplier say ₹365. Difference on this invoice: **₹810**. Your tolerance is ₹200, so it does not pass on its own.',
    },
    person: { initials: 'PR', name: 'Priya, Accounts Payable', note: 'Notified 09:14 · original page attached', primary: 'Approve', secondary: 'Query supplier' },
    after: [
      { title: 'The other 47 that morning', body: 'Matched, posted and logged without anyone opening them. Priya saw one.' },
      { title: 'If she approves', body: 'It posts, and the approval is recorded against her name with the document attached.' },
      { title: 'If it happens again', body: 'Repeated corrections of the same kind become a change to the rules, not a permanent chore.' },
    ],
  },

  'agentic-operations': {
    heading: 'One onboarding,\nfive days in.',
    lede: 'A case moving through your business on its own, and the two places it is waiting on somebody.',
    chrome: 'operations / new customer · Vasanth Textiles',
    meta: 'opened Mon 11:02 · last action Fri 09:40',
    kind: 'case',
    leftLabel: 'Where the case is',
    leftNote: 'Every step carries who did it and when. Nothing moves to the next step until the one before it is recorded.',
    did: [
      'Created the account and requested the four onboarding documents',
      'Chased the missing GST certificate twice, three days apart',
      'Ran the credit check · limit suggested ₹4,00,000',
    ],
    stop: {
      title: 'Stopped. This one commits money.',
      body: 'A credit limit is a commitment, so it never sets itself. The suggestion is **₹4,00,000** against a requested ₹6,00,000, based on the check and two references. Anything above ₹2,00,000 needs a head of sales.',
    },
    person: { initials: 'AK', name: 'Arun, Head of Sales', note: 'Notified Fri 09:40 · credit report attached', primary: 'Set limit', secondary: 'Ask for more' },
    after: [
      { title: 'The four steps before it', body: 'Ran without anyone touching them, each logged with a timestamp and an owner.' },
      { title: 'If the tool fails', body: 'The step retries to an agreed limit, then stops and tells a person. It never continues quietly.' },
      { title: 'If nobody answers', body: 'The case escalates on a schedule you set, rather than sitting in an inbox nobody owns.' },
    ],
  },

  'enterprise-knowledge-systems': {
    heading: 'Two questions.\nOne honest refusal.',
    lede: 'What a good answer looks like — and what the system does when the evidence is not there.',
    chrome: 'knowledge / #ops-help',
    meta: 'answered in 4s · 2 sources · 1 refused',
    kind: 'answer',
    leftLabel: 'Asked by your team',
    leftNote: 'Every answer carries the clause it came from. Click the citation and you are looking at the source document, not a summary of it.',
    did: [
      'Checked what this person is allowed to see before retrieving anything',
      'Found the clause in Supplier Terms v4 · updated March 2026',
      'Answered with the citation attached',
    ],
    stop: {
      title: 'Refused the second question.',
      body: 'Asked about the penalty for late delivery, it found nothing current — the only mention sits in a **2019 draft that was never signed**. Rather than answer from it, the question goes to the owner of that document.',
    },
    person: { initials: 'MR', name: 'Meera, Procurement', note: 'Owner of Supplier Terms · asked to fill the gap', primary: 'Add the clause', secondary: 'Mark as N/A' },
    after: [
      { title: 'The permission check', body: 'Runs before retrieval, not after. Someone without access never sees that the document exists.' },
      { title: 'The gap becomes work', body: 'Unanswered questions build a list of what your knowledge base is actually missing.' },
      { title: 'When a document changes', body: 'Answers that cited it are flagged, so nothing keeps quoting last year’s terms.' },
    ],
  },

  'custom-ai-platforms': {
    heading: 'One screen,\ntwo kinds of user.',
    lede: 'The same claim, seen by the person who can settle it and the person who can only look.',
    chrome: 'claims workspace / CL-88213',
    meta: 'assessor view · read-only view',
    kind: 'roles',
    leftLabel: 'What each role sees',
    leftNote: 'The role is not a setting on a screen. It decides what is fetched, what is shown and what can be pressed.',
    did: [
      'Assembled the claim from four sources into one view',
      'Drafted the assessment with the policy clauses it relied on',
      'Hid the medical notes from the broker view entirely',
    ],
    stop: {
      title: 'The settlement is not the software’s to make.',
      body: 'The draft says **₹1,85,000** against a claim of ₹2,40,000, with the two deductions shown and the clause behind each. An assessor signs it. The broker sees the outcome once it is signed, never the draft.',
    },
    person: { initials: 'SD', name: 'Sunil, Claims Assessor', note: 'Assessment drafted · four sources attached', primary: 'Sign off', secondary: 'Send back' },
    after: [
      { title: 'Built once, reused', body: 'Permissions, logging and the model layer are shared, so the second workflow costs less than the first.' },
      { title: 'It is your product', body: 'The code, the data and the operating documentation are yours, whoever runs it afterwards.' },
      { title: 'If you outgrow a model', body: 'The product and the model provider are kept separate on purpose, so one can change without the other.' },
    ],
  },

  'customer-workforce-ai': {
    heading: 'One conversation,\nhanded over cleanly.',
    lede: 'A booking taken end to end, then the question where a person has to step in.',
    chrome: 'WhatsApp · +91 98••• ••234',
    meta: 'first reply 6s · handed over at 19:42',
    kind: 'chat',
    leftLabel: 'The conversation',
    leftNote: 'Written from your approved information only. It never invents an offer to keep a conversation moving.',
    did: [
      'Answered the opening hours question from your own listing',
      'Held a table for four at 8pm Saturday and confirmed it',
      'Recorded the booking against the customer’s number',
    ],
    stop: {
      title: 'Stopped. This one is a discount.',
      body: 'Asked for a rate on a party of twenty, it does not guess. Group pricing is not in the approved information, and a promise here is a promise your business has to keep. The thread goes to a person **with everything said so far attached**.',
    },
    person: { initials: 'NA', name: 'Nadia, Front of House', note: 'Full thread attached · customer told a person is coming', primary: 'Take over', secondary: 'Send a template' },
    after: [
      { title: 'The customer is told', body: 'Not left waiting on a reply that never comes. The handover is visible in the conversation.' },
      { title: 'Out of hours', body: 'The message is captured with its context and queued, rather than lost until Monday.' },
      { title: 'What it never does', body: 'Quote a price, agree an exception or make a commitment that is not in the approved information.' },
    ],
  },

  'decision-intelligence': {
    heading: 'One number moved.\nHere is what is under it.',
    lede: 'Not a dashboard. The one change worth twenty minutes, opened up.',
    chrome: 'decisions / weekly review',
    meta: 'data to Sun 23:59 · 3 sources · 1 stale',
    kind: 'signal',
    leftLabel: 'What changed',
    leftNote: 'The definition being used is printed beside the number, because half of these arguments are really about definitions.',
    did: [
      'Reconciled three sources and flagged one that is two days behind',
      'Found gross margin down 3.1 points against the four-week average',
      'Ranked the three drivers underneath it by contribution',
    ],
    stop: {
      title: 'It will not tell you what to do.',
      body: 'Most of the movement — **2.2 of the 3.1 points** — is one distributor moving to a discounted rate card on 2 September. Whether that was agreed, and whether it continues, is not in the data. The system says what changed, not what it means.',
    },
    person: { initials: 'RG', name: 'Ravi, Commercial', note: 'Flagged Mon 07:00 · workings attached', primary: 'Record a decision', secondary: 'Ask for the detail' },
    after: [
      { title: 'The stale source', body: 'Shown, not hidden. A number you cannot date is a number you cannot use.' },
      { title: 'The decision is recorded', body: 'What was decided, by whom, on what evidence — so the next review starts from it.' },
      { title: 'Forecasts stay conditional', body: 'Assumptions and the data period are shown with every projection. They are estimates, not promises.' },
    ],
  },

  'ai-infrastructure-governance': {
    heading: 'The screen your\nauditor asks for.',
    lede: 'Who could act, what ran, what it cost, what was blocked, and who signed off the last change.',
    chrome: 'governance / september',
    meta: '1,284 actions · 11 blocked · 2 releases',
    kind: 'audit',
    leftLabel: 'The record',
    leftNote: 'Not a report someone assembles at quarter end. The log is the system, written as the work happens.',
    did: [
      'Recorded 1,284 actions with the person or system behind each',
      'Blocked 11 attempts that fell outside a role’s permissions',
      'Held the 12 September release until its evaluation passed',
    ],
    stop: {
      title: 'One release did not go out.',
      body: 'A prompt change on 19 September failed **two of the forty cases** in the evaluation set, both on refund wording. It stayed unreleased. The evidence, the failing cases and the rollback point are all in the record.',
    },
    person: { initials: 'DV', name: 'Divya, Release Owner', note: 'Evaluation report attached · rollback point recorded', primary: 'Approve anyway', secondary: 'Send back to build' },
    after: [
      { title: 'Cost sits beside quality', body: 'Spend per workflow is in the same view, because a system that is accurate and unaffordable is still a problem.' },
      { title: 'Incidents have a path', body: 'Who is told, what pauses, how it is recovered — agreed in advance, not improvised.' },
      { title: 'It applies to existing systems', body: 'This can be put around AI you already run, not only what BYBO builds.' },
    ],
  },
};
