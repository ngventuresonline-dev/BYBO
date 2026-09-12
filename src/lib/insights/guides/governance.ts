import type { Guide } from '../types';

const guides: Guide[] = [
  {
    slug: 'enterprise-ai-governance',
    collection: 'governance',
    title: 'What Enterprise AI Governance Actually Means in Practice',
    description: 'Enterprise AI governance in practice: a register of systems, named owners, access limits, approval gates, logs, evaluation and cost checks, sized to your risk.',
    dek: 'Enterprise AI governance is not a policy PDF. It is a short set of working agreements, sized to the risk: who owns each system, what it may touch, what needs approval and what happens when it goes wrong.',
    keywords: [
      'enterprise AI governance',
      'AI governance framework',
      'AI governance for small businesses',
      'AI governance in India',
      'AI risk management',
      'AI governance checklist',
    ],
    publishedAt: '2026-09-11',
    visual: {
      kind: 'compare',
      title: 'Governance on paper versus in practice',
      left: {
        label: 'A policy on file',
        items: [
          'Principles nobody knows how to apply',
          'No list of systems in use',
          'Access granted once, never reviewed',
          'Changes go live untested',
          'Costs discovered on the invoice',
        ],
      },
      right: {
        label: 'Working agreements',
        items: [
          'A register of every AI system',
          'A named owner for each one',
          'Written limits and approval gates',
          'Evaluation before every release',
          'Logs, costs and a review date',
        ],
      },
    },
    summary: [
      'Governance means working agreements: who owns each AI system, what it can reach and do, and how it is checked.',
      'Start with an inventory. You cannot govern systems nobody has listed, including tools teams adopted on their own.',
      'Match controls to consequence. A drafting assistant needs lighter rules than an agent that issues refunds or changes records.',
      'A 40-person company usually needs a register, named owners and a monthly review, not a committee.',
    ],
    sections: [
      {
        id: 'what-governance-means',
        heading: 'What does enterprise AI governance actually mean?',
        blocks: [
          {
            type: 'p',
            text: 'Enterprise AI governance is the set of working agreements that decide how AI systems are chosen, run, changed and stopped inside your business. Most companies begin with a policy: an acceptable-use note, a list of approved tools, a paragraph of principles. That is a reasonable start. But a policy does not tell anyone what happens on an ordinary Tuesday, when the invoice workflow posts the wrong amount or a sales assistant quotes a discontinued price.',
          },
          {
            type: 'p',
            text: 'A simpler test works better. Pick any AI system in use and see how long it takes to answer seven questions: what it is for, who owns it, what it can reach, what it may do without asking, where its activity is recorded, when it was last checked and what it costs each month. If the answers take minutes and come with evidence, you have governance. If they live in someone’s memory or a slide deck, you have good intentions.',
          },
          {
            type: 'note',
            tone: 'insight',
            title: 'A policy states intent. Governance leaves evidence.',
            text: 'The useful output of governance is not a document. It is a register entry, an approval record, an evaluation result and a dated review note that someone can open when a question comes up.',
          },
        ],
      },
      {
        id: 'what-frameworks-ask',
        heading: 'What do the main frameworks and Indian guidelines ask for?',
        blocks: [
          {
            type: 'p',
            text: 'The best-known reference is the [NIST AI Risk Management Framework](https://nvlpubs.nist.gov/nistpubs/ai/NIST.AI.100-1.pdf). It is voluntary and meant for organisations of all sizes and sectors. It groups the work into four functions (Govern, Map, Measure and Manage) and treats Govern as the one that runs through the rest. Two of its expectations translate directly into practice: a way to inventory AI systems, and roles and responsibilities that are documented and clear to the people involved.',
          },
          {
            type: 'p',
            text: '[ISO/IEC 42001:2023](https://www.iso.org/standard/42001) sets out requirements for establishing, implementing, maintaining and continually improving an AI management system. Organisations that want independent assurance can seek certification against it.',
          },
          {
            type: 'p',
            text: 'In India, MeitY [released the India AI Governance Guidelines](https://www.pib.gov.in/PressReleasePage.aspx?PRID=2186639) in November 2025 under the IndiaAI Mission. [The guidelines](https://static.pib.gov.in/WriteReadData/specificdocs/documents/2025/nov/doc2025115685601.pdf) take the view that, at this stage, a separate AI law is not needed and that existing laws on information technology, data protection and consumer protection can govern AI applications. They favour voluntary measures proportionate to the risk of harm. They ask organisations that develop or deploy AI to comply with applicable law, adopt voluntary codes and standards, provide a way to report AI-related harms and publish transparency reports.',
          },
          {
            type: 'p',
            text: 'Read side by side, these documents converge on a few habits: know what you run, name who is accountable, match controls to the harm a mistake could cause, keep evidence and review regularly.',
          },
          {
            type: 'note',
            tone: 'caution',
            title: 'General information, not legal advice',
            text: 'The India AI Governance Guidelines are recommendations, not a statute, and they note that some voluntary measures may become mandatory as the industry matures. Sector regulators and other laws may apply to your use case. Policy is still moving, so confirm the current position with a qualified adviser before relying on it.',
          },
        ],
      },
      {
        id: 'working-agreements',
        heading: 'Which working agreements make up AI governance in practice?',
        blocks: [
          {
            type: 'p',
            text: 'Eleven agreements cover most of what matters. Each is a question someone can answer and a record that shows the answer is true. None needs special software to begin. For a small number of systems, a shared sheet and a one-page note per system will do.',
          },
          {
            type: 'table',
            caption: 'The working agreements behind AI governance',
            head: ['Agreement', 'Question it answers', 'Evidence to keep'],
            rows: [
              ['Inventory', 'Which AI systems are in use?', 'A register with purpose and owner'],
              ['Ownership', 'Who is accountable for each?', 'Named business and technical owners'],
              ['Access', 'What data and tools can it reach?', 'A permissions list, reviewed on schedule'],
              ['Action limits', 'What may it do without asking?', 'Written limits and approval gates'],
              ['Logs', 'What did it do, and who approved?', 'Activity and approval records'],
              ['Evaluation', 'Is it good enough to release?', 'Results on representative cases'],
              ['Change control', 'Who approves a new model or prompt?', 'A change record and rollback path'],
              ['Incidents', 'What happens when it gets it wrong?', 'A response route and incident log'],
              ['Cost', 'What does each completed task cost?', 'A monthly usage and cost view'],
              ['Data protection', 'Whose personal data does it use?', 'Purpose, retention and access notes'],
              ['Review', 'Is it still worth running?', 'Dated review notes and decisions'],
            ],
          },
        ],
      },
      {
        id: 'access-limits-logs',
        heading: 'How do access, approval gates and logs work day to day?',
        blocks: [
          {
            type: 'p',
            text: 'Start with access. Give each system its own account rather than borrowing a person’s login, and grant only what the task needs. A drafting assistant for the sales team does not need write access to your accounting software. Review access when roles or workflows change, not only once a year.',
          },
          {
            type: 'p',
            text: 'Then write down the action limits. Most actions fall into three paths: proceed within agreed limits, wait for approval, or stop and escalate. Money, commitments to customers and changes to master records usually sit behind an approval gate. A gate works only when the reviewer sees the evidence and can approve, edit or reject, which is why it pays to [design the human decision into the workflow](/insights/human-in-the-loop-product-decision).',
          },
          {
            type: 'example',
            title: 'Illustrative example: a Tiruppur garment maker’s credit notes',
            text: 'Suppose an agent prepares credit notes for retailers who report short or damaged deliveries. It can read orders, delivery challans and retailer emails, draft the note and attach the evidence. Notes below ₹25,000 go to an accounts executive for approval; larger ones go to the finance head. It cannot change a retailer’s bank details or GSTIN at all. Every draft, approval and rejection is logged with the source documents. When a retailer disputes a note three weeks later, the team can see who approved it and on what evidence.',
          },
          {
            type: 'p',
            text: 'Logs should record the request, the sources used, the proposed action, the approver and the final result, including failures. A log nobody reads is only storage. Agree who samples it, how often and what they are looking for.',
          },
        ],
      },
      {
        id: 'change-and-incidents',
        heading: 'What should happen before a change and after a mistake?',
        blocks: [
          {
            type: 'p',
            text: 'Evaluate before release. Build a set of representative cases from real work, including poor scans, ambiguous requests and missing information, and write down the expected outcome. Sometimes the right outcome is to ask or stop. Agree the pass level with the business owner, then rerun the set whenever something changes: a new model version, a revised prompt, a new document format or a newly connected tool.',
          },
          {
            type: 'p',
            text: 'Treat each of those as a controlled change. Someone approves it, the record says what changed and why, and there is a way back. Updates from your model provider count too, even when nobody on your team touched the system. [NIST’s framework](https://nvlpubs.nist.gov/nistpubs/ai/NIST.AI.100-1.pdf) calls for post-deployment monitoring plans that include incident response, recovery and change management, which is a useful checklist even if you never adopt the full framework.',
          },
          {
            type: 'p',
            text: 'When something goes wrong, the response should already be written down:',
          },
          {
            type: 'list',
            ordered: true,
            items: [
              'Pause or narrow the workflow so the error stops spreading.',
              'Find the affected records, customers and decisions.',
              'Correct the records and tell the people affected where needed.',
              'Trace the cause: input, rule, model, integration or process.',
              'Add the case to the evaluation set before resuming.',
            ],
          },
        ],
      },
      {
        id: 'costs-and-personal-data',
        heading: 'Why do costs and personal data belong in governance?',
        blocks: [
          {
            type: 'p',
            text: 'AI costs move with usage. Longer inputs, retries, multi-step agent runs and growing volumes all change the monthly bill, often without anyone deciding to spend more. Track cost per completed task rather than per model call, include the time people spend reviewing and correcting, and set a budget alert for each workflow. A cost you see every month is a cost you can manage.',
          },
          {
            type: 'p',
            text: 'Personal data needs the same discipline. India’s [Digital Personal Data Protection Act, 2023 and its Rules](https://www.pib.gov.in/PressReleasePage.aspx?PRID=2190655), notified on 14 November 2025 with an eighteen-month phased compliance period, set out obligations for organisations that handle digital personal data. The framework’s principles include purpose limitation, data minimisation, storage limitation and security safeguards. For an AI system, they become plain questions: what personal data enters prompts and logs, whether the task needs it, how long logs keep it and who can read them.',
          },
          {
            type: 'p',
            text: 'Because commencement is phased, check which obligations already apply to you. Our guide to [building AI systems around India’s data protection framework](/insights/ai-systems-and-dpdp-india) goes further.',
          },
        ],
      },
      {
        id: 'proportionate-governance',
        heading: 'How much governance does a 40-person company need?',
        blocks: [
          {
            type: 'p',
            text: 'Less than a large enterprise, and more than none. [The India AI Governance Guidelines](https://static.pib.gov.in/WriteReadData/specificdocs/documents/2025/nov/doc2025115685601.pdf) make the same point about voluntary measures: low-risk applications may need only basic commitments, while high-risk applications in sensitive sectors such as health or finance may need additional safeguards. Scale your controls to what a mistake would cost, not to what a larger company does.',
          },
          {
            type: 'table',
            caption: 'Matching controls to consequence',
            head: ['What the system does', 'Example', 'Sensible controls'],
            rows: [
              ['Drafts for a person', 'Email and summary drafts', 'Approved tools, a data rule, an owner'],
              ['Answers from your knowledge', 'An SOP assistant for staff', 'Source permissions, citations, gap review'],
              ['Prepares actions', 'Invoice matching, enquiry replies', 'Evaluation set, approval gates, logs'],
              ['Takes actions', 'Refunds, record updates, bookings', 'Tight limits, alerts, rehearsed incident response'],
            ],
          },
          {
            type: 'example',
            title: 'Illustrative example: a 40-person Pune distributor',
            text: 'Suppose the operations head keeps a register of three systems: a writing assistant, a staff knowledge assistant and an invoice-matching workflow. Each has a named business owner. The writing assistant runs on approved company accounts, with a rule against pasting in customer data. The knowledge assistant answers only from folders the person asking can already open. Nothing from the invoice workflow posts without approval from accounts. Once a month, twenty minutes of the existing operations meeting covers corrections, incidents, costs and access changes. There is no committee.',
          },
          {
            type: 'p',
            text: 'A standing governance group starts to earn its place when you run many systems, work in a regulated activity, let systems act directly for customers or face customers who ask for formal assurance. That is also the point to consider a management-system approach such as ISO/IEC 42001.',
          },
        ],
      },
      {
        id: 'first-steps',
        heading: 'Where should you start this month?',
        blocks: [
          {
            type: 'list',
            ordered: true,
            items: [
              'List every AI tool and system in use, including personal accounts people use for work.',
              'Name a business owner for each one. Retire what nobody will own.',
              'Write one page per system: purpose, data, access, limits, approvals and cost.',
              'Put an approval gate on anything that moves money, commits you to a customer or changes master records.',
              'Build a small evaluation set from real cases before the next change.',
              'Book a monthly review of incidents, corrections, costs and access.',
            ],
          },
          {
            type: 'p',
            text: 'These agreements are cheaper to design in than to add after launch. At BYBO, core permissions, approvals, logging and failure handling are part of [how we work](/how-we-work) on every build. Our [Infrastructure & Governance](/systems/ai-infrastructure-governance) work helps teams that need a broader operating foundation, or a review of systems already running.',
          },
        ],
      },
    ],
    limitations: [
      'This is general information, not legal advice. Lending, insurance, healthcare and other regulated activities may carry sector rules that go beyond anything described here.',
      'Working agreements help only if people keep them. A register nobody updates gives false comfort, which can be worse than knowing you have gaps.',
      'Evaluation sets reduce risk; they cannot prove a system will handle every future case correctly. Monitoring and human review still matter after release.',
      'AI features built into software you subscribe to can change without notice. Your control is limited to settings, contracts and watching the results.',
    ],
    faqs: [
      {
        q: 'What does AI governance mean for a business?',
        a: 'It is the set of agreements that decide how AI systems are chosen, run, changed and stopped in your business. In practice that means a register of systems, a named owner for each, limits on what each can access and do, approval gates for consequential actions, logs, evaluation before changes, an incident route, visible costs and a regular review. The evidence matters more than the policy wording.',
      },
      {
        q: 'Is AI governance mandatory for businesses in India?',
        a: 'Not as a single, standalone requirement. The [India AI Governance Guidelines](https://www.pib.gov.in/PressReleasePage.aspx?PRID=2186639), released in November 2025, recommend voluntary measures proportionate to risk and take the view that existing laws already apply to AI applications. Those include data protection, IT and consumer protection law, and sector regulators may set their own rules. Policy is moving, so treat this as general information and check your position with a qualified adviser.',
      },
      {
        q: 'Does a small business need an AI governance framework?',
        a: 'Yes, but a small one. A company of 40 people usually needs a register of AI systems, a named owner for each, written limits and approval gates for consequential actions, basic logs and a monthly review. That can live in a shared sheet and an existing meeting. Formal committees and certification make sense later, if you run many systems, work in a regulated activity or customers ask for them.',
      },
      {
        q: 'Who should own AI governance in a company?',
        a: 'One named person should own the overall register and review, often the operations head in a smaller company. Each system then needs a business owner accountable for its outcomes and a technical owner responsible for how it runs. Leadership decides how much risk is acceptable. What fails is shared ownership with no name attached, where everyone assumes someone else is watching.',
      },
      {
        q: 'Should we get ISO/IEC 42001 certification?',
        a: 'Only if it serves a real need. ISO/IEC 42001 sets requirements for an AI management system, and certification can help when enterprise customers or partners ask for formal assurance. For most growing companies, the better first step is the working agreements themselves: a register, owners, limits, evaluation and review. Those are also the foundation any later certification would build on.',
      },
    ],
    bybo: [
      {
        href: '/systems/ai-infrastructure-governance',
        label: 'Infrastructure & Governance',
        why: 'Explains how BYBO sets up access controls, evaluations, logs, cost visibility and incident response for AI systems.',
      },
      {
        href: '/how-we-work',
        label: 'How we work',
        why: 'See how named owners, approval rules, failure handling and cost visibility fit into BYBO’s delivery process.',
      },
      {
        href: '/insights/human-in-the-loop-product-decision',
        label: 'Design the human decision into the workflow',
        why: 'A closer look at approval gates: the reviewer, the evidence and what happens while work waits.',
      },
    ],
    related: ['ai-permissions-logs-approval-gates', 'ai-pilots-to-working-systems', 'ai-for-indian-msmes'],
    sources: [
      {
        title: 'Artificial Intelligence Risk Management Framework (AI RMF 1.0)',
        publisher: 'National Institute of Standards and Technology (NIST)',
        url: 'https://nvlpubs.nist.gov/nistpubs/ai/NIST.AI.100-1.pdf',
      },
      {
        title: 'ISO/IEC 42001:2023 — AI management systems',
        publisher: 'International Organization for Standardization (ISO)',
        url: 'https://www.iso.org/standard/42001',
      },
      {
        title: 'India AI Governance Guidelines: Enabling Safe and Trusted AI Innovation',
        publisher: 'Ministry of Electronics and Information Technology, IndiaAI Mission',
        url: 'https://static.pib.gov.in/WriteReadData/specificdocs/documents/2025/nov/doc2025115685601.pdf',
      },
      {
        title: 'MeitY Unveils India AI Governance Guidelines under IndiaAI Mission to Ensure Safe, Inclusive, and Responsible Adoption of Artificial Intelligence across Sectors',
        publisher: 'Press Information Bureau, Government of India',
        url: 'https://www.pib.gov.in/PressReleasePage.aspx?PRID=2186639',
      },
      {
        title: 'DPDP Rules, 2025 Notified: A Citizen-Centric Framework for Privacy Protection and Responsible Data Use',
        publisher: 'Press Information Bureau, Government of India',
        url: 'https://www.pib.gov.in/PressReleasePage.aspx?PRID=2190655',
      },
    ],
  },
];

export default guides;
