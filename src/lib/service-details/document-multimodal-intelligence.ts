import type { ServiceDetail } from './types';

const detail: ServiceDetail = {
  slug: 'document-multimodal-intelligence',
  overview: {
    heading: 'What this system does',
    paragraphs: [
      'Every business runs on documents that arrive in the wrong shape: an invoice as an email attachment, a purchase order as a scan, a proof of delivery as a photograph. Someone opens each one and retypes the numbers into your accounting software. This system reads those documents instead, checks them against your own records and rules, and passes the result to the tool where the work continues.',
      'It takes on the repetitive part: finding the fields, matching an invoice to its purchase order, noticing that a quantity differs or a tax number is missing, and preparing the entry. Each extracted field keeps a pointer back to the place on the page it came from, so nothing is taken on trust. Routine cases move within the limits you agree; anything uncertain stops.',
      'Judgement stays with people. A reviewer sees the exceptions, not the whole pile — the unclear scan, the price that does not match the contract, the onboarding file missing a document — with the original page beside the values. It is built to be honest about what it could not read, because a flagged document costs a minute and a wrong posting costs far more.',
    ],
  },
  audience: {
    heading: 'Signs this fits your business',
    items: [
      'Invoices arrive as email PDFs, scans and WhatsApp photographs, and two people retype them into your accounting software.',
      'Someone spends part of every day matching invoices to purchase orders and chasing the ones that do not agree.',
      'Onboarding or KYC files sit in a folder while a person checks whether every required document is present and legible.',
      'Document volume rises with the business, and the only way you have found to keep up is another pair of hands.',
    ],
  },
  deliverables: {
    heading: 'What you receive',
    items: [
      {
        title: 'A connected document workflow',
        body: 'A running path from where documents arrive — a mailbox, an upload, a shared folder — through extraction and checking to the system holding the record.',
      },
      {
        title: 'A review queue for exceptions',
        body: 'One place where a named reviewer resolves what the system would not decide alone, with the original page beside the extracted fields and the reason it was flagged.',
      },
      {
        title: 'An evaluation set from your own documents',
        body: 'Real examples, including the poor scans, with the correct answers agreed by your team. We use it to prove accuracy before launch and re-check it whenever anything changes.',
      },
      {
        title: 'Logs and a performance view',
        body: 'A record of what arrived, what was read, what changed and who approved it, alongside a simple view of volume, review rate, errors and running cost.',
      },
      {
        title: 'Documentation and training',
        body: 'Written rules, the escalation path and a session for the people who work the queue. Your team should be able to explain the system without us.',
      },
    ],
  },
  process: {
    heading: 'How the work runs',
    items: [
      {
        title: '1. Receive',
        body: 'We connect the channel documents arrive through: a shared mailbox, an upload page, a folder. Each arrival is registered, so nothing is silently dropped or processed twice.',
      },
      {
        title: '2. Read',
        body: 'The document is classified and its fields extracted, each carrying a reference to where it appeared. We capture only the fields your destination system needs.',
      },
      {
        title: '3. Check',
        body: 'Values are tested against your rules and records: does the invoice match the order, is the total correct, is a document missing. Confidence and rule failures decide what follows.',
      },
      {
        title: '4. Review',
        body: 'Anything unclear or outside policy goes to a named reviewer with the evidence attached. Corrections are recorded, and repeated corrections tell us what to change in the rules.',
      },
      {
        title: '5. Post',
        body: 'Approved records are written to your accounting system, ERP or a file your finance team already uses. Every write is logged, so you can always see what was sent and why.',
      },
    ],
  },
  connects: {
    heading: 'What it connects to',
    body: 'Connections are agreed one at a time, with the narrowest access that does the job, and nothing is written to a live system until your team has approved it in testing.',
    items: [
      'Your accounting or ERP system, for posting records and reading supplier and order data',
      'Email and shared mailboxes, where most documents actually arrive',
      'Document storage and drives, for the originals your auditors will ask for',
      'Your CRM or order system, when a document must be matched to a customer or an order',
      'Internal databases and spreadsheets holding the price lists a check depends on',
    ],
  },
  bring: {
    heading: 'What we need from you',
    items: [
      'A representative set of real documents, including the bad ones: creased scans, photographs, the supplier who ignores your format.',
      'The rules you apply today, even if they live in someone’s head: tolerances, what counts as a match, when a document must be rejected.',
      'Access to the systems the workflow reads from and writes to, agreed with whoever owns them.',
      'A named owner who can decide questions of policy and is accountable for the queue after launch.',
      'A baseline: how many documents you handle, how long one takes and how often something is corrected.',
    ],
  },
  cost: {
    heading: 'What drives the cost',
    paragraphs: [
      'BYBO publishes no prices, because the honest answer depends on your documents and your systems. Scope and fee are agreed in writing before paid work begins, and the first conversation costs nothing. Most engagements start with the [Blueprint](/blueprint), a paid diagnostic ending in a recommendation and a 90-day roadmap — including the recommendation not to build.',
      'Two costs matter and they behave differently: designing and building the workflow, which happens once, and running it — the processing, the review time it still needs and the monitoring that keeps it honest. We estimate both before you commit, and [the cost guide](/insights/business-automation-cost-india) explains how the arithmetic usually works.',
    ],
    drivers: [
      'How many document types you need covered, and how far layouts vary between senders',
      'The quality of what arrives — clean digital files are cheaper to handle than photographs of creased paper',
      'How many checks a document must pass, and whether those checks need data from another system',
      'The systems being written to, and whether they offer a usable interface',
      'Monthly volume, which drives running cost long after the build',
    ],
  },
  measure: {
    heading: 'How it is judged',
    body: 'We record a baseline from your current process before anything is built, then review the same measures after launch. A system that cannot be compared with what it replaced is not finished.',
    items: [
      'Time per document, arrival to posted record',
      'Error and rework rate, against the rate your manual process produces today',
      'Share of documents needing review, and whether it is falling',
      'Cost per completed record, including the review time it still consumes',
    ],
  },
  control: {
    heading: 'Where a person decides',
    body: 'Unclear fields and policy exceptions go to a named reviewer. You set where the line falls: a tolerance on a price difference, a value above which every invoice is seen, a supplier who is always checked. The system never quietly guesses to keep a queue clear — low confidence is a stop, not a suggestion. Reviewers can correct any field, and every correction is logged against the document and the person. If a connected system is unavailable, work waits and someone is told. Our guide on [when AI should decide](/insights/when-ai-should-decide) sets out how we draw those lines.',
  },
  faqs: [
    {
      q: 'How accurate is it, really?',
      a: 'Accuracy varies by document type and quality, so we measure it on your own examples rather than quoting a number. Before launch we agree a threshold per field, and anything below it is routed to review instead of posted. You see the results of that testing before committing to run it.',
    },
    {
      q: 'What happens when it gets something wrong?',
      a: 'The reviewer catches it in the queue and corrects the field. The correction is recorded, and repeated corrections of the same kind become a change to the rules. Anything that reached a live system is visible in the log with the original document attached, so your team can trace and reverse it.',
    },
    {
      q: 'Where does our data go, and is it kept?',
      a: 'That is agreed before building. Retention, where documents are processed and stored, and who can see them are written into the scope. Access is limited to what the workflow needs. If your sector imposes stricter rules, tell us early — it shapes the design rather than being added afterwards. Our [privacy page](/privacy) sets out the position.',
    },
    {
      q: 'Do we have to change our systems?',
      a: 'Usually not. The workflow is built around what you already run and writes into your existing accounting or operations tool. If a system offers no usable way in, we say so during scoping and describe the alternatives, including producing a file your team imports. We never recommend replacing working software to suit a workflow.',
    },
    {
      q: 'Can we start with one document type?',
      a: 'Yes, and we usually recommend it. One document type with real volume and a measurable baseline is the clearest way to find out whether this works for you. Adding the second type costs less, because the review queue, logging and connections already exist.',
    },
    {
      q: 'Who owns the system afterwards?',
      a: 'You do. The rules, documentation and records belong to your business, and a named person on your side owns the queue. You can ask us to operate it, or take it on internally with a documented handover. Either way the arrangement is explicit before launch, not decided once something breaks.',
    },
  ],
  reading: [
    'ai-invoice-purchase-order-processing',
    'document-automation-workflow',
    'reduce-manual-data-entry',
  ],
};

export default detail;
