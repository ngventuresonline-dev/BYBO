import type { Guide } from '../types';

const guides: Guide[] = [
  {
    slug: 'seven-ai-systems-for-business-operations',
    collection: 'ai-systems',
    title: 'Seven AI Systems That Can Improve Everyday Business Operations',
    seoTitle: 'Seven AI Systems for Everyday Business Operations',
    description: 'Seven kinds of business AI system: what each one handles, a worked example, where a named person stays in control and the measure worth watching.',
    dek: 'Documents, coordination, knowledge, customers, decisions, custom products and the controls beneath them. What each system does, where judgement stays with a person, and what to measure.',
    keywords: [
      'AI systems for business operations',
      'types of business AI systems',
      'AI for business processes',
      'document AI for business',
      'agentic workflows',
      'AI systems for Indian companies',
    ],
    publishedAt: '2026-09-11',
    visual: {
      kind: 'checklist',
      title: 'Seven systems, seven kinds of work',
      items: [
        'Documents read, checked and posted with evidence',
        'Multi-step work carried across teams and tools',
        'Answers drawn from your approved knowledge',
        'Enquiries handled, with people for sensitive cases',
        'Reports that show what actually changed',
        'A platform for work only you do',
        'Access, evaluations, logs and visible costs',
      ],
    },
    summary: [
      'Seven system types cover most everyday operations: documents, coordination, knowledge, customer contact, decisions, custom products and the controls beneath them.',
      'Each has the same shape: work arrives, the system prepares it, a named person decides what matters, and the result is logged.',
      'Choose by the work that repeats and costs you, not by the technology. Almost every company needs one system first, not seven.',
      'Judge each against a measure you could take today, such as time per document or the share of cases needing review.',
    ],
    sections: [
      {
        id: 'the-shared-shape',
        heading: 'What do all seven have in common?',
        blocks: [
          {
            type: 'p',
            text: 'BYBO groups its work into seven kinds of system. That is less a product catalogue than a map of where recurring work piles up in a growing company: paperwork that has to be read, work that has to move between teams, knowledge that lives in three people’s heads, customers who want an answer today, numbers that arrive too late to act on, work that no off-the-shelf product fits, and the controls that keep all of it inside agreed limits.',
          },
          {
            type: 'p',
            text: 'Each one has the same shape. Work arrives. The system gathers what it needs from the tools it is permitted to reach. A model reads, drafts or compares. Your rules run. A named person decides the things that matter. The result is written back and recorded. Keep that sequence and you have a system. Drop the rules, the person or the record and you usually have a demo.',
          },
          {
            type: 'note',
            tone: 'insight',
            title: 'Seven kinds of system, one operating pattern',
            text: 'If you can name the unit of work, the tools it touches, the point where a person decides and the measure you will watch, you can specify any of the seven on one page.',
          },
        ],
      },
      {
        id: 'documents',
        heading: 'Reading documents: invoices, KYC files and shipping paperwork',
        blocks: [
          {
            type: 'p',
            text: '[Business Operations](/systems/document-multimodal-intelligence) is the document desk. Files arrive by email, upload or a connected inbox. The system reads the fields and keeps a link back to where each one appears on the page, checks them against your rules and your records, and routes what does not match. Invoices and purchase orders, KYC and onboarding files, proof of delivery and claims, contracts and RFQs: the work has the same shape in each case, which is why one design covers so much of it.',
          },
          {
            type: 'example',
            title: 'Illustrative example: a Surat exporter’s shipping documents',
            text: 'Suppose an exporter receives packing lists, commercial invoices and bills of lading from three freight forwarders, each in its own layout. The system reads all three, checks that quantities, container numbers and invoice values agree, and prepares the set for the documentation executive. Where two documents disagree, it shows them side by side with the difference marked. Nothing goes to the bank until a person approves the set.',
          },
          {
            type: 'p',
            text: 'The person stays in control at the exception. Unclear fields and policy exceptions go to a named reviewer with the original document beside the extracted value, and you decide which routine cases may proceed inside agreed limits. The measure that matters early is not accuracy in the abstract but the share of documents needing review, watched next to time per document and rework.',
          },
        ],
      },
      {
        id: 'moving-work',
        heading: 'Moving multi-step work between teams and tools',
        blocks: [
          {
            type: 'p',
            text: 'Some work never sits in one inbox. Onboarding a customer, chasing an unpaid order, investigating a reconciliation difference: each is a sequence of small tasks across several people and several systems, and most of the delay is the waiting in between. [Agentic Operations](/systems/agentic-operations) gives that sequence a path. A trigger arrives, the agent plans the permitted next steps, gathers the evidence, drafts the action, and stops at the approval gate.',
          },
          {
            type: 'p',
            text: 'Bounded is the important word. An agent has only the tools, data, actions and budgets defined for its role. Money, commitments to customers and sensitive record changes sit behind approval. Retry limits and escalation paths are written before launch, so a failed step is recorded and routed rather than quietly skipped. Suppose a 3PL matches proofs of delivery to shipment records each morning: the agent can assemble the claim with its evidence, but a person still signs it.',
          },
          {
            type: 'p',
            text: 'Keep expectations grounded. In the survey behind the [2026 AI Index](https://hai.stanford.edu/ai-index/2026-ai-index-report), a majority of respondents reported no agent use at all in most business functions, and scaled use was in the single digits for nearly all of them. Treat an agent as a bounded workflow you can pause, not as a colleague who will pick things up.',
          },
        ],
      },
      {
        id: 'knowledge',
        heading: 'Answering questions from your own knowledge',
        blocks: [
          {
            type: 'p',
            text: 'Most companies already own the answers. They sit in SOPs, policies, past proposals, drawings and email threads, and finding them costs experienced people an hour here and an hour there. [Enterprise Knowledge](/systems/enterprise-knowledge-systems) makes that material usable: a question comes in, the system checks what the person asking is allowed to see, finds the relevant passage, answers with the source attached, and flags a gap when the evidence is not there.',
          },
          {
            type: 'p',
            text: 'Two design choices decide whether people trust it. The first is permissions: retrieval respects the access the person already has, and restricted material stays restricted. The second is the honest gap. An answer with no source behind it should be withheld and routed to the owner of that content rather than filled in. Suppose a store manager asks how to process a damaged-stock return: the useful answer names the current SOP and its date.',
          },
          {
            type: 'p',
            text: 'A person stays in control as the source owner. Someone must keep the underlying material current, review the questions that could not be answered and retire the versions that should no longer be quoted. Watch the share of answers supported by a source, and the questions that keep coming back unanswered.',
          },
        ],
      },
      {
        id: 'customers',
        heading: 'Handling enquiries, bookings and routine support',
        blocks: [
          {
            type: 'p',
            text: 'Enquiries arrive on WhatsApp, on the phone, through a form and in the shared inbox, and the cost of a slow reply is usually invisible until you count the ones that went nowhere. [Customer & Workforce AI](/systems/customer-workforce-ai) captures the enquiry with its context, answers from approved information, coordinates the next step such as a site visit or a callback, and keeps a record of what was promised.',
          },
          {
            type: 'p',
            text: 'The control point is the handover. Sensitive conversations, pricing exceptions and anything that commits the business go to a person, with the conversation and context attached so the customer does not have to repeat themselves. Suppose a housing developer receives forty enquiries a day in a launch week: the system can capture and qualify them and book site visits, while the sales manager takes the negotiation.',
          },
          {
            type: 'note',
            tone: 'caution',
            title: 'A reply is a commitment',
            text: 'Anything the system tells a customer is a statement by your business. Keep it to approved information, leave prices and availability out of scope unless a reliable source is connected, and let a person take over mid-conversation.',
          },
        ],
      },
      {
        id: 'decisions',
        heading: 'Turning scattered numbers into a decision',
        blocks: [
          {
            type: 'p',
            text: 'The weekly numbers pack is often three days of copying and one hour of discussion. [Decision Intelligence](/systems/decision-intelligence) reverses that ratio. It connects the approved sources, checks freshness and definitions, compares the period with what came before, and shows what changed along with the possible drivers and the evidence underneath.',
          },
          {
            type: 'p',
            text: 'The first argument is usually about definitions rather than analysis. What counts as an order, when revenue is recognised, whether a branch transfer is a sale: agreeing these once is most of the value. After that, people can spend the meeting on the movement in the business instead of on whose spreadsheet is right.',
          },
          {
            type: 'p',
            text: 'People decide. Forecasts are conditional estimates, and the view should show their assumptions, the data period and the uncertainty rather than one confident number. Suppose a restaurant group sees one kitchen’s food cost move two points: the system points at the change and the likely drivers, and the operations head decides what to do about it.',
          },
        ],
      },
      {
        id: 'platforms-and-controls',
        heading: 'When do you need your own platform, and what sits underneath all seven?',
        blocks: [
          {
            type: 'p',
            text: '[Custom AI Platforms](/systems/custom-ai-platforms) are for the work only you do, where an existing product or a simpler integration will not fit and the workflow has already proved itself somewhere less expensive. The sequence is frame, design, build, validate and operate, and your team signs off on quality, access and release criteria before launch. Two questions belong in the scope from the first day: who maintains it, and how portable it is between model providers.',
          },
          {
            type: 'p',
            text: '[Infrastructure & Governance](/systems/ai-infrastructure-governance) is the layer beneath the other six: who can see what, which changes were evaluated before release, what the system did, what it cost and what happens when it fails. Core permissions, approvals, logging and failure handling belong in every build rather than in a later phase.',
          },
          {
            type: 'p',
            text: 'That view is not only ours. The [India AI Governance Guidelines](https://static.pib.gov.in/WriteReadData/specificdocs/documents/2025/nov/doc2025115685601.pdf), released by MeitY in November 2025, ask organisations to build human-in-the-loop mechanisms at critical decision points where appropriate, so that outputs can be reviewed, overridden or supplemented by human judgement before they cause harm.',
          },
        ],
      },
      {
        id: 'where-to-start',
        heading: 'Which of the seven should you start with?',
        blocks: [
          {
            type: 'p',
            text: 'Start with the work, not the list. Choose one recurring workflow with a clear unit of work, enough volume to matter, inputs you can actually reach and someone who knows the exceptions by heart. Then agree, before anything is built, the number that will tell you whether it worked. The [NIST AI Risk Management Framework](https://nvlpubs.nist.gov/nistpubs/ai/NIST.AI.100-1.pdf) makes the point in its own vocabulary: managing the risk of a system meant to augment or replace human activity needs some form of baseline measure for comparison.',
          },
          {
            type: 'table',
            caption: 'One measure worth agreeing before you build',
            head: ['System', 'The measure that shows it is working'],
            rows: [
              ['Business Operations', 'Time per document and share needing review'],
              ['Agentic Operations', 'End-to-end completion time per case'],
              ['Enterprise Knowledge', 'Share of answers supported by a source'],
              ['Customer & Workforce AI', 'Time to first useful response'],
              ['Decision Intelligence', 'Reporting preparation time and data freshness'],
              ['Custom AI Platforms', 'Task success rate and active use'],
              ['Infrastructure & Governance', 'Cost per task and incident recovery time'],
            ],
          },
          {
            type: 'list',
            ordered: true,
            items: [
              'Name the unit of work and where it starts and finishes.',
              'Measure today on real cases, including the awkward ones.',
              'Mark every decision point and name the person who owns it.',
              'Check whether a template, a form or an inbox rule fixes most of it.',
              'Build the narrowest version that produces a measurable result.',
            ],
          },
        ],
      },
    ],
    limitations: [
      'These seven are a way of organising work, not a shopping list. Many businesses need one system, run well, for a year before a second earns any attention.',
      'Nothing here predicts a saving for your business. Volumes, input quality, existing tools and how much review the work needs all change the arithmetic.',
      'Where inputs are already structured and the rules never vary, conventional automation or a fixed integration is usually cheaper and more predictable than a model.',
      'AI features inside software you already subscribe to overlap with several of these. Check what you are paying for before commissioning anything new.',
    ],
    faqs: [
      {
        q: 'Do we need all seven AI systems?',
        a: 'No. The seven describe kinds of work, not a sequence to buy. Almost every company should run one system properly first, learn what its exceptions look like and what it costs to operate, then decide whether a second earns its place. The governance layer is the exception: access limits, evaluation, logs and cost visibility belong in the first build, not in a later phase.',
      },
      {
        q: 'Which system do companies usually start with?',
        a: 'Start where work repeats, the inputs are reachable and a mistake is recoverable. In many Indian businesses that means documents, because invoices, purchase orders and onboarding files arrive constantly in awkward formats and the current cost is easy to measure. But the right first system is the one your team already complains about, where someone will own the result and the exceptions are known.',
      },
      {
        q: 'Can one system do several of these jobs?',
        a: 'Often yes, and the boundary matters less than the controls. A document workflow that also routes exceptions across teams is doing two of the seven. What should not blur is the specification: each unit of work needs its own rules, its own approval points, its own owner and its own measure, even when they share a model, an interface and the same underlying access.',
      },
      {
        q: 'What is the difference between an agent and ordinary automation?',
        a: 'Ordinary automation follows a fixed path: if this, then that. An agent chooses among permitted steps to reach a goal, which helps when the path varies with the case and adds risk because the sequence is not fixed in advance. That is why an agent needs defined tools, defined actions, budget limits, retry rules and approval gates before it touches anything consequential.',
      },
      {
        q: 'How do we know one of these systems is working?',
        a: 'Compare it with the baseline you measured before launch, across the whole workflow rather than the model step. Watch time per completed case, the share needing review, errors caught and missed, reviewer edits and rejections, and cost per completed case including review time. If reviewers approve everything without reading, or rewrite most drafts, the design needs attention rather than the model.',
      },
    ],
    bybo: [
      {
        href: '/systems',
        label: 'Systems overview',
        why: 'The seven systems side by side, with the workflow, the gate and the measures BYBO uses for each.',
      },
      {
        href: '/blueprint',
        label: 'AI Opportunity Blueprint',
        why: 'A paid diagnostic that maps one workflow, measures the baseline and recommends what is worth building.',
      },
      {
        href: '/how-we-work',
        label: 'How we work',
        why: 'Diagnosis, build, operation and expansion, with named owners and measured outcomes at each stage.',
      },
    ],
    related: ['what-is-a-business-ai-system', 'internal-knowledge-system', 'ai-for-indian-msmes'],
    sources: [
      {
        title: 'Artificial Intelligence Risk Management Framework (AI RMF 1.0), NIST AI 100-1',
        publisher: 'National Institute of Standards and Technology (NIST)',
        url: 'https://nvlpubs.nist.gov/nistpubs/ai/NIST.AI.100-1.pdf',
      },
      {
        title: 'The 2026 AI Index Report, chapter 4: Economy (corporate AI adoption)',
        publisher: 'Stanford Institute for Human-Centered Artificial Intelligence (Stanford HAI)',
        url: 'https://hai.stanford.edu/ai-index/2026-ai-index-report',
      },
      {
        title: 'India AI Governance Guidelines: Enabling Safe and Trusted AI Innovation',
        publisher: 'Ministry of Electronics and Information Technology (MeitY), Government of India',
        url: 'https://static.pib.gov.in/WriteReadData/specificdocs/documents/2025/nov/doc2025115685601.pdf',
      },
    ],
  },
  {
    slug: 'when-ai-should-decide',
    collection: 'ai-systems',
    title: 'When Should AI Make a Decision—and When Should a Person Step In?',
    seoTitle: 'When Should AI Decide, and When Should a Person?',
    description: 'Six tests for deciding what an AI system may do alone: reversibility, consequence, evidence, confidence, regulation and customer impact, with three clear paths.',
    dek: 'Not every decision needs a person, and not every decision can be handed to a system. Six tests, three paths, and the thresholds that keep the difference visible.',
    keywords: [
      'when should AI make decisions',
      'human in the loop AI',
      'AI decision thresholds',
      'AI approval gates',
      'automation bias',
      'AI oversight for business',
    ],
    publishedAt: '2026-09-11',
    visual: {
      kind: 'spectrum',
      title: 'Three paths for one decision',
      from: 'Routine and reversible',
      to: 'Serious and hard to undo',
      stops: [
        { label: 'Proceed', note: 'Inside written limits, logged and sampled' },
        { label: 'Ask', note: 'A named reviewer approves before anything happens' },
        { label: 'Escalate', note: 'A specialist decides outside the system' },
      ],
    },
    summary: [
      'Six tests settle most cases: reversibility, consequence, evidence quality, model confidence, regulation and how directly the customer feels it.',
      'Turn the tests into three paths — proceed, ask, escalate — with a written threshold for moving between them.',
      'A reviewer needs evidence in one place, authority to reject and enough time. Without those three, the gate is decoration.',
      'Watch approval, edit and rejection rates. A gate that approves everything is a rubber stamp, not a control.',
    ],
    sections: [
      {
        id: 'the-real-question',
        heading: 'What are you actually deciding when you automate a decision?',
        blocks: [
          {
            type: 'p',
            text: 'The question is rarely whether AI should decide. It is which slice of a decision a system may finish on its own, which slice it should prepare for someone else to approve, and which slice it must not touch at all. A refund is not one decision: reading the complaint, matching the order, judging whether the policy applies and releasing the money are four, and they do not all belong to the same owner.',
          },
          {
            type: 'p',
            text: 'The [NIST AI Risk Management Framework](https://nvlpubs.nist.gov/nistpubs/ai/NIST.AI.100-1.pdf) describes the range without prescribing a point on it. Human-AI configurations, it notes, can span from fully autonomous to fully manual: a system may decide on its own, defer the decision to a human expert, or serve as an additional opinion for a person who decides. Some systems need no oversight at all; others specifically require it. The framework also declines to set a risk tolerance for you, because tolerance depends on your context, your obligations and what a mistake would cost.',
          },
          {
            type: 'p',
            text: 'So this is a business judgement, made once per decision type and written down. The six tests below are the ones worth arguing about in a room with the person who owns the process today.',
          },
        ],
      },
      {
        id: 'six-tests',
        heading: 'Six tests that decide who decides',
        blocks: [
          {
            type: 'table',
            caption: 'Six tests for a single decision type',
            head: ['Test', 'The question', 'Send it to a person when'],
            rows: [
              ['Reversibility', 'Can we undo this, and how easily?', 'Undoing needs an apology, a refund or a filing'],
              ['Consequence', 'What is the worst plausible outcome?', 'One mistake harms someone or costs seriously'],
              ['Evidence', 'Is the information complete and current?', 'Sources are missing, stale or contradict each other'],
              ['Confidence', 'How sure is the system, and on what basis?', 'The case is unusual or sits near the line'],
              ['Obligation', 'Does law, contract or policy require a person?', 'A regulator, a contract or your own policy says so'],
              ['Customer impact', 'Will the customer feel this directly?', 'The message is sensitive or makes a promise'],
            ],
          },
          {
            type: 'p',
            text: 'Two of the six are misread often enough to be worth a warning. Confidence is not correctness: a model can produce a fluent, well-formatted answer with a high score attached and still be wrong, particularly on a case unlike anything it has seen. And reversibility is a property of your process rather than of the model. A journal entry you can reverse before the month closes is more reversible than the same amount paid out through a bank file, and far more reversible than an email already read by a customer.',
          },
          {
            type: 'p',
            text: 'Run the tests on a decision type, not on a whole workflow. Most workflows contain one or two decisions that need a person and a dozen steps that do not, and treating them all the same is how teams end up either approving everything by hand or approving nothing at all.',
          },
        ],
      },
      {
        id: 'three-paths',
        heading: 'Proceed, ask or escalate: giving each decision a path',
        blocks: [
          {
            type: 'p',
            text: 'Three paths cover almost everything, and every decision type should be assigned to one of them in writing.',
          },
          {
            type: 'list',
            items: [
              'Proceed. The system acts inside written limits and records what it did. The check is sampling and monitoring after the fact, not approval before it.',
              'Ask. The system prepares the action with its evidence and a named reviewer approves, edits or rejects it before anything happens.',
              'Escalate. The case leaves the system for a specialist, and the outcome comes back into the record so the pattern stays visible.',
            ],
          },
          {
            type: 'p',
            text: 'The mechanics of a good gate — the reviewer, the evidence, the fallback when nobody responds — are covered in our note on how to [design the human decision into the workflow](/insights/human-in-the-loop-product-decision). What this article adds is the allocation: which decisions belong in which path, and what moves a case between them.',
          },
          {
            type: 'p',
            text: 'Choose the default deliberately. Sending everything to the ask path feels safe and rarely is. An approval queue that nobody clears delays the work, trains reviewers to click through in batches, and hides the few cases that genuinely needed a person. Automating a decision and reviewing a sample of the results is sometimes the more careful choice.',
          },
        ],
      },
      {
        id: 'thresholds',
        heading: 'How do you set a threshold you can defend?',
        blocks: [
          {
            type: 'p',
            text: 'A usable threshold has three parts: a business limit expressed in your own units, an evidence rule, and a named exception list. The limit is an amount, a discount, a tenure or a quantity. The evidence rule says what must be present and agree before the automatic path is available. The exception list names the cases that always go to a person, whatever the numbers say.',
          },
          {
            type: 'example',
            title: 'Illustrative example: a Bengaluru D2C brand’s returns desk',
            text: 'Suppose returns arrive by email and WhatsApp. Under ₹2,000, with a photograph attached and a matching delivered order, the refund is approved automatically and appears in a daily log. Between ₹2,000 and ₹10,000, the system prepares the refund with the order, the photograph and the policy clause, and a support lead approves it. Above that, or where the customer mentions injury, a legal complaint or a repeat failure, the case leaves the system for the head of support. The limits are dated, owned by the head of support, and reviewed monthly against what reviewers actually changed.',
          },
          {
            type: 'p',
            text: 'Start narrower than you think you need, and widen on evidence. A run of cases at the current limit that reviewers approved without a single edit is a reason to raise it. A cluster of corrections, a new supplier, a changed policy or a festival-season spike in volume is a reason to lower it again. Record each change with a date and a reason, so nobody has to reconstruct why the limit is what it is.',
          },
        ],
      },
      {
        id: 'reviewer-design',
        heading: 'What does a reviewer need in order to decide anything?',
        blocks: [
          {
            type: 'p',
            text: 'A gate is only as good as the person standing at it, and reviewers need four things: the evidence in one place, a clearly stated proposed action, real authority to reject it, and time. The first two are design work. The third is a management decision. The fourth is arithmetic that teams skip.',
          },
          {
            type: 'p',
            text: 'Count the review capacity before launch. Suppose a workflow sends 120 cases a day to one person, and an honest review takes two minutes. That is four hours of somebody’s day, every day, before holidays and sick leave. Either the volume reaching the gate has to fall, or a second reviewer has to exist, or the queue will be cleared by clicking. Reviewing is work, and it belongs in the operating cost of the system.',
          },
          {
            type: 'note',
            tone: 'insight',
            title: 'A reviewer who cannot say no is not a control',
            text: 'If rejecting a proposal creates more work than accepting it, the queue will approve. Make rejection cheap: a reason code, an automatic route to the right person, and no re-keying of what the system already gathered.',
          },
        ],
      },
      {
        id: 'rubber-stamping',
        heading: 'How do you know the gate is not just a rubber stamp?',
        blocks: [
          {
            type: 'p',
            text: 'People defer to confident machines, and a well-presented recommendation can crowd out the reviewer’s own reading of the case. NIST puts the risk carefully: results from human-AI interaction vary, and under some conditions the AI part of the interaction can amplify human biases, producing more biased decisions than either the person or the system alone. The same framework observes that data on how often, and why, people overrule a system in live use is worth collecting and analysing.',
          },
          {
            type: 'p',
            text: 'So collect it. These five measures make a rubber stamp visible within a month:',
          },
          {
            type: 'list',
            items: [
              'Approval, edit and rejection rates, per reviewer and per case type.',
              'Median seconds spent on a case before the decision.',
              'Reversals, complaints and corrections that arrive after approval.',
              'Results on planted test cases with known errors in them.',
              'What reviewers wrote in the reason field when they rejected something.',
            ],
          },
          {
            type: 'p',
            text: 'Read the numbers in both directions. If almost everything is approved within a few seconds, the gate is a formality. If reviewers edit more than half of what reaches them, the system is adding work rather than removing it, and the rules, the inputs or the scope need attention before anyone widens the automatic path.',
          },
        ],
      },
      {
        id: 'review-and-change',
        heading: 'When should the limits change, and who may switch it off?',
        blocks: [
          {
            type: 'p',
            text: 'Decisions age. A threshold set in a quiet month meets the festival season. A supplier changes its invoice layout, a policy is rewritten, a model version is updated by your provider without anyone on your team touching the system. Put the decision rules on the same review cycle as the system itself, and treat a change to a threshold as a change to the system: someone approves it, the record says why, and there is a way back.',
          },
          {
            type: 'p',
            text: 'Agree in advance who may narrow the automatic path or stop it. NIST asks for exactly that: mechanisms and assigned responsibilities to supersede, disengage or deactivate a system whose performance or outcomes do not match its intended use. In a business, that is a pause switch, a fallback to the manual process, and one named person allowed to use both without a meeting. The evaluations, logs and cost visibility behind those decisions are what our [Infrastructure & Governance](/systems/ai-infrastructure-governance) work puts in place, and what a review of a running system looks at first.',
          },
          {
            type: 'p',
            text: 'Two Indian reference points are worth knowing. The [India AI Governance Guidelines](https://static.pib.gov.in/WriteReadData/specificdocs/documents/2025/nov/doc2025115685601.pdf), released by MeitY in November 2025, ask organisations to build human-in-the-loop mechanisms at critical decision points where appropriate, so that outputs can be reviewed, overridden or supplemented by human judgement before they cause harm. They also note that direct human oversight is ineffective in some settings, such as high-velocity algorithmic trading, where automated checks and system-level constraints do the work instead.',
          },
          {
            type: 'note',
            tone: 'caution',
            title: 'General information, not legal advice',
            text: 'Lending, insurance, healthcare, education and hiring carry sector rules about who may decide and what must be recorded. Confirm your obligations with a qualified adviser before letting a system decide anything in those areas.',
          },
        ],
      },
    ],
    limitations: [
      'These tests order a discussion; they do not produce a score. Two sensible people can place the same decision in different paths, which is why the choice should be written down and dated.',
      'Confidence scores are not probabilities of being right. Treat them as one input among several, and never as the only condition for an automatic action.',
      'A human review step does not by itself make a decision safe or lawful. If a regulator requires a qualified person, the requirement is about who decides, not about who clicks approve.',
      'Thresholds tuned on a quiet period will misbehave in a peak one. Test them against your busiest month, not your calmest.',
    ],
    faqs: [
      {
        q: 'Which decisions should AI never make on its own?',
        a: 'Anything irreversible, anything where a single error causes serious harm, and anything a law, contract or professional obligation reserves for a qualified person. In everyday operations that usually means releasing money outside agreed limits, changing master data such as bank details or a GSTIN, terminating a service, making a commitment to a customer, and any decision about a person’s credit, health, employment or admission.',
      },
      {
        q: 'How confident does a model need to be before it can act?',
        a: 'Confidence alone is the wrong gate. Pair it with conditions you can check: required fields present, sources agreeing with each other, the case falling inside a written business limit, and no exception flag raised. Then set the level from your own logs by finding where reviewers stopped changing anything, rather than from a number quoted by a vendor.',
      },
      {
        q: 'Is a human review step enough to make an AI system safe?',
        a: 'Only if the review is real. A reviewer needs the original evidence, a clear proposed action, authority to reject and the time to look. Without those, approval becomes a formality that adds delay and a false sense of control. Measure approval, edit and rejection rates and the seconds spent per case; if approval is near universal and instant, redesign the gate.',
      },
      {
        q: 'How do we stop reviewers approving everything automatically?',
        a: 'Reduce the volume reaching the gate so each case gets attention, show what is uncertain rather than only the recommendation, make rejecting as easy as approving, and rotate reviewers so nobody spends a whole day clicking. Add occasional test cases with known errors, and review the results with the team as a design problem rather than as a performance issue.',
      },
      {
        q: 'Should we start fully manual and automate decisions later?',
        a: 'Usually yes for consequential decisions. Run the system in preparation mode first: it gathers evidence and proposes an action while every case goes to a person. The approvals, edits and rejections from those weeks become the evidence for your first automatic path, and they show which cases were never suitable for one. It is slower to start and much easier to defend.',
      },
    ],
    bybo: [
      {
        href: '/systems/ai-infrastructure-governance',
        label: 'Infrastructure & Governance',
        why: 'Access limits, evaluations, logs, cost visibility and incident response behind every decision a system makes.',
      },
      {
        href: '/insights/human-in-the-loop-product-decision',
        label: 'Design the human decision into the workflow',
        why: 'The mechanics of a good gate: the reviewer, the evidence, the fallback and the record.',
      },
      {
        href: '/how-we-work',
        label: 'How we work',
        why: 'Where decision rules, owners and approval limits are agreed in BYBO’s delivery process.',
      },
    ],
    related: ['approval-workflow-design', 'ai-permissions-logs-approval-gates', 'ai-for-education-and-lending'],
    sources: [
      {
        title: 'Artificial Intelligence Risk Management Framework (AI RMF 1.0), NIST AI 100-1',
        publisher: 'National Institute of Standards and Technology (NIST)',
        url: 'https://nvlpubs.nist.gov/nistpubs/ai/NIST.AI.100-1.pdf',
      },
      {
        title: 'India AI Governance Guidelines: Enabling Safe and Trusted AI Innovation',
        publisher: 'Ministry of Electronics and Information Technology (MeitY), Government of India',
        url: 'https://static.pib.gov.in/WriteReadData/specificdocs/documents/2025/nov/doc2025115685601.pdf',
      },
    ],
  },
  {
    slug: 'ai-pilots-to-working-systems',
    collection: 'ai-systems',
    title: 'Why Most AI Pilots Never Become Working Business Systems',
    description: 'AI pilots stall for organisational reasons: no owner, no baseline, no integration budget, tidy test data and no plan for exceptions. And how to close each gap.',
    dek: 'The model is rarely the problem. A handful of organisational gaps decide whether a pilot becomes a system the business relies on, and each one can be closed before you start.',
    keywords: [
      'AI pilot to production',
      'why AI pilots fail',
      'scaling AI in business',
      'AI proof of concept',
      'AI project ownership',
      'AI implementation India',
    ],
    publishedAt: '2026-09-11',
    visual: {
      kind: 'compare',
      title: 'From stalled pilot to working system',
      left: {
        label: 'A pilot that stalls',
        items: [
          'An enthusiast, not an owner',
          'No measured before and after',
          'Hand-picked, tidy test files',
          'Exceptions discovered in week one',
          'Success defined after the fact',
        ],
      },
      right: {
        label: 'A system that runs',
        items: [
          'Named business and technical owners',
          'A baseline measured on real cases',
          'Test cases from a random real month',
          'An exception queue with an owner',
          'Success criteria and stop conditions agreed first',
        ],
      },
    },
    summary: [
      'A pilot proves a model can handle examples under supervision. It does not prove the work will be done correctly every week.',
      'The gaps are organisational: no owner, no baseline, no integration budget, tidy test data, no exception plan, no change management.',
      'Decide the success criteria and the stop conditions before the pilot ends, not after the demo goes well.',
      'Run the new system beside the old process until the numbers hold, then narrow the manual path deliberately.',
    ],
    sections: [
      {
        id: 'what-a-pilot-proves',
        heading: 'What does a successful pilot actually prove?',
        blocks: [
          {
            type: 'p',
            text: 'A pilot answers a narrow question: can a model handle examples of this work while someone knowledgeable watches? That is worth knowing, and it is not the question the business is asking. The business wants to know whether the work will still be done correctly on a Thursday in the festival season, when volumes have doubled, the person who built the pilot has moved on, and a supplier has changed its invoice format without telling anyone.',
          },
          {
            type: 'p',
            text: 'Adoption figures show the distance between the two questions. The [Economic Survey 2025–26](https://www.indiabudget.gov.in/economicsurvey/doc/eschapter/echap14.pdf), citing a McKinsey survey of 1,993 firms, reports that 88% of organisations surveyed in 2025 used AI in at least one business function; of those using it, 31% were scaling it across the organisation and 7% had fully deployed and integrated it. The [2026 AI Index](https://hai.stanford.edu/ai-index/2026-ai-index-report) breaks the same survey down by company size: among organisations with under US$100 million in revenue, 39% were experimenting and 22% piloting, against 25% scaling and 5% fully scaled. Trying AI is now ordinary. Finishing the job is not.',
          },
          {
            type: 'p',
            text: 'What stops a pilot is often something nobody was assigned to answer rather than something the model could not do. BYBO’s field note, [the demo is the easy part](/insights/why-ai-pilots-fail), makes that case briefly. This article goes through the organisational gaps one at a time.',
          },
        ],
      },
      {
        id: 'who-owns-it',
        heading: 'Who owns it once the demo is over?',
        blocks: [
          {
            type: 'p',
            text: 'Pilots are usually driven by one interested person: a founder, a head of operations, a bright analyst. That is a good way to start and a poor way to continue. Enthusiasm is not a role. When the pilot ends, someone has to hold the outcome in their objectives, and someone has to be responsible for the software actually running.',
          },
          {
            type: 'p',
            text: 'Ownership only means something when it is specific. Write down who reviews the failures each week, who approves a change to a prompt, a rule or a model version, who answers the phone when the workflow stops on a Saturday, who keeps the source documents current, and whose budget pays for the model usage. If those five answers name fewer than two people, the system has an owner in theory only.',
          },
          {
            type: 'note',
            tone: 'insight',
            title: 'Two owners, not one',
            text: 'A business owner is accountable for the outcome and decides what the system may do. A technical owner is responsible for it running, and for the change record. Different people, both named, both aware of it.',
          },
        ],
      },
      {
        id: 'no-baseline',
        heading: 'Without a baseline, nobody can say whether it worked',
        blocks: [
          {
            type: 'p',
            text: 'The most common reason a pilot cannot be defended in a budget meeting is that nothing was measured before it started. “Faster than before” is not a claim anyone can check. The [NIST AI Risk Management Framework](https://nvlpubs.nist.gov/nistpubs/ai/NIST.AI.100-1.pdf) is blunt about it: managing the risk of a system intended to augment or replace human activity requires some form of baseline measure for comparison, and that is difficult precisely because the system does the task differently from the person.',
          },
          {
            type: 'p',
            text: 'Measure the whole workflow, not the model step, and measure it on real cases before anything changes. Suppose a team handles 400 supplier invoices a month at about six minutes each: that is roughly 40 hours. If a system halves the handling time but one invoice in five becomes an exception that needs three minutes of review, the saving is about 16 hours a month. Still worth having, and now arguable with numbers rather than impressions.',
          },
          {
            type: 'p',
            text: 'The same arithmetic protects you from the opposite error. A workflow that saves four minutes on a task performed twice a week was never going to repay the integration work, however well the demo went. Choosing between candidates before you build is its own exercise, covered in [choose the first workflow with a clear head](/insights/rank-ai-opportunities).',
          },
        ],
      },
      {
        id: 'integration-and-exceptions',
        heading: 'The work nobody budgeted: integration and exceptions',
        blocks: [
          {
            type: 'p',
            text: 'A pilot usually reads from a folder of exported files and writes its results into a spreadsheet someone checks. Production has to read from the live source and write back into the system of record, which is where the real cost sits. This is the list that turns a two-week pilot into a three-month project, and it belongs in the plan from the beginning:',
          },
          {
            type: 'list',
            items: [
              'Credentials and permissions for a service account, not a person’s login.',
              'A test environment, or an agreed way to test safely against live data.',
              'Writing back to the accounting, ERP or CRM system, with protection against duplicates.',
              'Retries, timeouts and a defined behaviour when a connected tool is unavailable.',
              'An exception queue: where unmatched cases go, who works it, and by when.',
              'Monitoring, alerts and a monthly view of usage and cost.',
            ],
          },
          {
            type: 'p',
            text: 'Exceptions deserve particular attention, because they are the part of the work a pilot rarely touches. If nine cases in ten are handled automatically and the tenth lands in a queue nobody owns, the business has not saved effort. It has moved the effort somewhere less visible, and the oldest items in that queue are usually the ones that matter most.',
          },
        ],
      },
      {
        id: 'test-data',
        heading: 'Why the test data flatters the pilot',
        blocks: [
          {
            type: 'p',
            text: 'Test sets are usually assembled by a helpful colleague, and helpful colleagues pick clean examples. That is how a pilot reaches an impressive number on cases that never represented the work. NIST makes the general version of the point: measurements taken in a controlled setting may differ from the risks that emerge in real-world operation.',
          },
          {
            type: 'example',
            title: 'Illustrative example: a Ludhiana exporter’s RFQ pilot',
            text: 'Suppose a pilot reads 60 requests for quotation, chosen by the sales coordinator, all clean PDFs from three regular buyers. It performs beautifully. In the first live week the system meets a scanned fax, a photograph taken on a shop floor, an enquiry written in a mix of Hindi and English, a revision of an earlier request that should replace it rather than duplicate it, and one message that is really a complaint. None of those is a model failure. They are a sampling failure, and they were knowable in advance.',
          },
          {
            type: 'p',
            text: 'Build the evaluation set from a random month of real work instead. Include the duplicates, the incomplete files, the ones that arrived on the wrong channel and the ones the team argued about. Write the expected outcome for each before anyone runs the system, and accept that for some cases the correct outcome is to stop and ask. Then rerun the whole set whenever the model version, the prompt, the rules or the input formats change.',
          },
        ],
      },
      {
        id: 'the-people',
        heading: 'The change nobody managed',
        blocks: [
          {
            type: 'p',
            text: 'A system that makes a team’s work harder will be routed around, quietly and effectively. If the accounts executive now has to check a screen, open the original invoice in another window and re-key a correction, the pilot has added a step. People will go back to the way that works, and the usage graph will fall for reasons no one records.',
          },
          {
            type: 'p',
            text: 'Three things reduce that risk, and none of them is a training session. Involve the people who do the work while the rules are being written, because they know the exceptions. Change what is expected of them explicitly: if reviewing 60 cases a day is now part of the job, something else has to leave it. And be straight about why the system exists — absorbing growth, ending overtime, shortening a customer wait — because in the absence of an answer people will assume the worst one.',
          },
          {
            type: 'note',
            tone: 'caution',
            title: 'Adoption is a measure, not an assumption',
            text: 'Track how many cases actually flow through the system, and how many are handled outside it. A workflow used for a third of the volume is telling you something about its design, not about the team.',
          },
        ],
      },
      {
        id: 'the-path',
        heading: 'What does a path from pilot to production look like?',
        blocks: [
          {
            type: 'p',
            text: 'The move from pilot to system is a set of decisions, most of which are cheaper to make before the pilot than after it. Agree them in this order:',
          },
          {
            type: 'list',
            ordered: true,
            items: [
              'Write the success criteria and the stop conditions before the pilot begins.',
              'Name the business owner and the technical owner, in writing.',
              'Measure the current workflow on real cases, including the awkward ones.',
              'Rebuild the evaluation set from a random real month, with expected outcomes.',
              'Agree what the system may do alone, what needs approval and what it must never touch.',
              'Budget the integration, the exception queue and the first three months of operation.',
              'Run beside the manual process until the numbers hold, then narrow the manual path.',
              'Set the review date, the pause switch and the person allowed to use it.',
            ],
          },
          {
            type: 'p',
            text: 'The last point is not pessimism. NIST asks organisations to assign responsibility for superseding, disengaging or deactivating a system whose outcomes do not match its intended use, and a business version of that is simply a pause switch and a named person. Knowing you can stop is what makes it reasonable to start.',
          },
          {
            type: 'p',
            text: 'BYBO treats operation as a stage in its own right rather than a handover: [how we work](/how-we-work) runs from diagnosis through build and operation to expansion, with named owners, approval rules, failure handling and visible costs at each step. Where the first question is which workflow deserves the attention at all, the [Blueprint](/blueprint) is a paid diagnostic that maps the workflow, measures the baseline and says what is worth building — including, sometimes, nothing yet.',
          },
        ],
      },
    ],
    limitations: [
      'The published adoption figures quoted here describe surveyed organisations worldwide, mostly larger than a typical Indian MSME. They show a pattern, not a prediction for your company.',
      'Not every stalled pilot should be rescued. A pilot that revealed the workflow is not worth automating has done its job, and continuing is the more expensive mistake.',
      'This article is about internal operational workflows. Customer-facing products and regulated decisions need additional legal, security and sector-specific work.',
      'Closing these gaps improves the odds. It does not guarantee that a particular system will pay for itself, which is why the baseline and the stop conditions matter.',
    ],
    faqs: [
      {
        q: 'How long should an AI pilot run?',
        a: 'Long enough to meet a full cycle of the work, including a peak period and the exceptions, which for most operational workflows means weeks rather than days. Fix the end date and the success criteria before it starts. An open-ended pilot tends to continue until enthusiasm runs out, which produces a decision by exhaustion instead of by evidence.',
      },
      {
        q: 'What is the difference between a pilot and a proof of concept?',
        a: 'A proof of concept tests feasibility in a sandbox: can a model read this document type at all? A pilot runs on real work with real people, usually beside the existing process, and tests whether the workflow holds up. They answer different questions, and a successful proof of concept says almost nothing about whether the business can operate the result.',
      },
      {
        q: 'What does it cost to take a pilot into production?',
        a: 'It depends on the integrations, the volume, the review the work needs and the state of your data, so treat a fixed figure with caution. The drivers are consistent: connecting to the system of record, handling exceptions, evaluation before each change, monitoring, model usage and the people who review and correct. Ask any supplier to price operation for a year, not delivery.',
      },
      {
        q: 'Should we run the old process alongside the new system?',
        a: 'For consequential work, yes. Parallel running is how you compare the two on the same cases and build the evidence for widening the automatic path. It costs more for a period, so agree in advance how long it runs and what result ends it. Then narrow the manual path deliberately rather than letting it fade.',
      },
      {
        q: 'When should we stop a pilot instead of taking it further?',
        a: 'Stop when the baseline shows the workflow is too small to repay the integration, when nobody will own the outcome, when the inputs cannot be reached reliably, or when the exceptions turn out to be the majority of the work. Stop also if the team cannot agree how the process should behave. A clear decision not to proceed is a useful result, and it costs less now than later.',
      },
    ],
    bybo: [
      {
        href: '/how-we-work',
        label: 'How we work',
        why: 'Diagnosis, build, operation and expansion, with named owners, approval rules and failure handling at each stage.',
      },
      {
        href: '/blueprint',
        label: 'AI Opportunity Blueprint',
        why: 'A paid diagnostic that maps a workflow, measures the baseline and recommends what is worth building.',
      },
      {
        href: '/insights/why-ai-pilots-fail',
        label: 'The demo is the easy part',
        why: 'A short field note on evaluation sets, owners, failure handling and the cost of the whole workflow.',
      },
    ],
    related: ['measure-ai-system-performance', 'named-owner-for-ai-systems', 'ai-readiness-checklist'],
    sources: [
      {
        title: 'Economic Survey 2025–26, Chapter 14: Evolution of the AI Ecosystem in India',
        publisher: 'Ministry of Finance, Government of India',
        url: 'https://www.indiabudget.gov.in/economicsurvey/doc/eschapter/echap14.pdf',
      },
      {
        title: 'The 2026 AI Index Report, chapter 4: Economy (corporate AI adoption)',
        publisher: 'Stanford Institute for Human-Centered Artificial Intelligence (Stanford HAI)',
        url: 'https://hai.stanford.edu/ai-index/2026-ai-index-report',
      },
      {
        title: 'Artificial Intelligence Risk Management Framework (AI RMF 1.0), NIST AI 100-1',
        publisher: 'National Institute of Standards and Technology (NIST)',
        url: 'https://nvlpubs.nist.gov/nistpubs/ai/NIST.AI.100-1.pdf',
      },
    ],
  },
];

export default guides;
