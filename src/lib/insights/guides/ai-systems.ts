import type { Guide } from '../types';

const guides: Guide[] = [
  {
    slug: 'what-is-a-business-ai-system',
    collection: 'ai-systems',
    title: 'What Is a Business AI System? A Practical Guide for Indian Companies',
    seoTitle: 'What Is a Business AI System? A Guide for Indian Companies',
    description:
      'A business AI system is a workflow, not a chatbot: inputs, tools, rules, a model where useful, people at key decisions, logs and an owner. How to start one.',
    dek:
      'A plain definition, the parts that make one dependable, what it does well and badly, and how an Indian company can choose, run and judge its first system.',
    keywords: [
      'business AI system',
      'what is an AI system',
      'AI systems for Indian businesses',
      'AI workflow automation',
      'AI chatbot vs AI system',
      'first AI project for a business',
    ],
    publishedAt: '2026-09-11',
    visual: {
      kind: 'flow',
      title: 'A workflow first, a model second',
      steps: ['Work arrives', 'Gather context', 'Model reads and drafts', 'Rules check', 'Person decides', 'Act and log'],
      gate: 4,
      gateLabel: 'A named reviewer approves consequential actions',
    },
    summary: [
      'A business AI system is a workflow: inputs, tools, rules, a model where useful, people at decision points, logs and an owner.',
      'A chatbot answers questions. A system carries a unit of work, such as an invoice or an enquiry, to a recorded finish.',
      'Start with one recurring, measurable workflow that has a named owner and a clear point where a person decides.',
      'Judge it against a measured baseline: time per case, share needing review, errors and rework, and cost per completed case.',
    ],
    sections: [
      {
        id: 'what-it-is',
        heading: 'What is a business AI system?',
        blocks: [
          {
            type: 'p',
            text: 'A business AI system is a defined piece of recurring work, carried out by software and people together. Something arrives: a supplier invoice, a customer enquiry, a request for a site visit. The system gathers what it needs, uses an AI model where one genuinely helps, applies your rules and brings the decisions that matter to a named person. It finishes when a record is updated or a reply is sent, and it keeps a note of what happened.',
          },
          {
            type: 'p',
            text: 'Put simply, it is a workflow with seven parts: inputs, tools, rules, a model where useful, people at decision points, logs and an owner. Remove one and you usually get something less dependable. A model without rules improvises. A workflow without logs cannot be checked. A system without an owner drifts.',
          },
          {
            type: 'p',
            text: 'Formal definitions focus on the technology. The [OECD’s definition](https://oecd.ai/en/ai-principles) describes a machine-based system that works out from its input how to produce outputs such as predictions, content, recommendations or decisions. The [NIST AI Risk Management Framework](https://nvlpubs.nist.gov/nistpubs/ai/NIST.AI.100-1.pdf) builds on an earlier OECD wording and calls AI systems socio-technical: their risks and benefits depend on how they are used and who operates them, not only on the software. For a business, the model is one component. The dependable unit is the model plus the workflow, people and controls around it.',
          },
        ],
      },
      {
        id: 'chatbot-tool-or-system',
        heading: 'How is a system different from a chatbot or a one-off AI tool?',
        blocks: [
          {
            type: 'p',
            text: 'A chatbot holds a conversation. A one-off tool, such as an AI assistant a colleague uses to summarise a PDF, helps one person with one task. Both can be useful. Neither owns an outcome. A system carries a unit of work from start to finish.',
          },
          {
            type: 'table',
            caption: 'Three kinds of AI use, compared',
            head: ['Compared on', 'Chatbot', 'One-off AI tool', 'Business AI system'],
            rows: [
              ['Unit of work', 'A conversation', 'One person’s task', 'A case, start to finish'],
              ['Access to your records', 'Often limited','Whatever is pasted in', 'Agreed, limited permissions'],
              ['Who checks the output', 'The user, if anyone', 'The person using it', 'A named reviewer at set points'],
              ['Record of what happened', 'A chat history', 'Little or none', 'Inputs, actions and approvals'],
              ['Owner', 'Often unclear', 'The individual', 'A named business owner'],
              ['Judged by', 'Impressions', 'Impressions', 'A measured baseline'],
            ],
          },
          {
            type: 'p',
            text: 'The difference shows when something goes wrong. If a chatbot gives a customer the wrong delivery date, the conversation ends and nobody may notice. If a system reads the wrong quantity from a purchase order, the mismatch is caught at a review step or traced in the log, and someone is responsible for fixing the cause.',
          },
          {
            type: 'note',
            tone: 'insight',
            title: 'A chatbot can become part of a system',
            text: 'A WhatsApp assistant that answers product questions is a tool. It becomes part of a system when it works from approved information, records each conversation, hands sensitive or unusual cases to a person with the context attached, and has an owner who reviews what it gets wrong.',
          },
        ],
      },
      {
        id: 'the-parts',
        heading: 'What are the parts, and what does each one do?',
        blocks: [
          {
            type: 'p',
            text: 'None of these is exotic. Each has a counterpart in the way your team already works.',
          },
          {
            type: 'list',
            items: [
              'Inputs. The emails, PDFs, forms and WhatsApp messages the work starts from, including poor scans and missing fields.',
              'Tools. The software the work touches, such as your accounting software, CRM, order system or shared drive, reached only through agreed access.',
              'Rules. Your policies, written down: matching tolerances, approval limits, which customers or amounts always go to a person, and when the system must stop.',
              'A model, where useful. An AI model reads, classifies, extracts or drafts where fixed rules cannot cope with variety. Many steps need no model at all.',
              'People at decision points. Named reviewers who approve, edit or reject consequential actions, with the original evidence in front of them.',
              'Logs. A record of what arrived, what the system proposed, who decided, what changed and when.',
              'An owner. One person accountable for the business outcome, supported by someone responsible for the technical operation.',
            ],
          },
          {
            type: 'p',
            text: 'The model is rarely the largest part of the effort. Most of the work goes into the rules, the access, the review step and the cases that do not fit the pattern. That is also where most of the reliability comes from.',
          },
        ],
      },
      {
        id: 'in-practice',
        heading: 'What does one look like in practice?',
        blocks: [
          {
            type: 'example',
            title: 'Illustrative example: a Coimbatore distributor’s supplier invoices',
            text: 'Suppose a distributor receives about 600 supplier invoices a month, as PDFs by email and as phone photos on WhatsApp. Today, two accounts staff open each one, type the line items into the accounting software and check them against the purchase order and goods receipt. In a system, every invoice lands in one inbox. A model extracts the supplier’s GSTIN, invoice number, line items and tax amounts, each linked to where it appears on the page. Rules match the invoice to the purchase order and flag differences above an agreed tolerance. Clean matches wait in a daily batch for approval. Mismatches go to the accounts lead with the invoice, the order and the difference side by side. Nothing posts without approval in the first months. Every step is logged, and the finance controller reviews the exception rate each week.',
          },
          {
            type: 'p',
            text: 'Notice what the model does and does not do. It reads. It does not decide whether to pay a supplier. That decision stays with the accounts lead, who now spends time on the invoices that need judgement rather than on typing every one.',
          },
          {
            type: 'p',
            text: 'The same pattern of arrive, read, check, decide and record fits many kinds of work: enquiries and bookings, onboarding files, internal questions about policy, and the weekly numbers pack for leadership. The [systems overview](/systems) shows how it changes for each.',
          },
        ],
      },
      {
        id: 'strengths-and-limits',
        heading: 'What is an AI system good at, and where does it struggle?',
        blocks: [
          {
            type: 'p',
            text: 'It is good at recurring work with variable inputs: reading documents in many layouts, routing requests, drafting a first reply from approved information, finding the right clause in a long policy, or flagging a change in the numbers that deserves a look. The value comes from volume and consistency, not from a single impressive answer.',
          },
          {
            type: 'p',
            text: 'It struggles with rare or one-off decisions, with work whose rules are unwritten or disputed, and with judgements that carry serious consequences, such as a credit decision, a clinical call or a hiring choice, where a qualified person must remain responsible. It cannot use information it cannot reach, and it will not flag missing evidence unless it is designed to.',
          },
          {
            type: 'p',
            text: 'Conditions also change. The [NIST framework](https://nvlpubs.nist.gov/nistpubs/ai/NIST.AI.100-1.pdf) points out that risks measured in a controlled setting can differ from those that emerge in real-world operation. A system that handles twenty clean examples in a demo will meet a supplier’s new invoice layout, an enquiry written in a mix of Hindi and English, or a policy that changed last week. [The demo is the easy part](/insights/why-ai-pilots-fail) covers that gap.',
          },
          {
            type: 'note',
            tone: 'caution',
            title: 'Fluent is not the same as correct',
            text: 'Language models can produce confident, well-written output that is wrong. Design for it: show the source behind each answer, send uncertain cases to a person, and make “I could not find this” an acceptable result.',
          },
        ],
      },
      {
        id: 'first-system',
        heading: 'How should an Indian company approach its first one?',
        blocks: [
          {
            type: 'p',
            text: 'Start with the work, not the tool. Choose one recurring workflow with a clear unit of work, enough volume to matter, inputs you can actually access and someone who knows the exceptions. In Indian businesses that is often supplier invoices and their GST details, dealer orders arriving on WhatsApp, admission enquiries in peak season, or site-visit requests for a housing project.',
          },
          {
            type: 'list',
            ordered: true,
            items: [
              'Name the unit of work, with its start and finish: from “invoice arrives” to “entry approved in the accounting software”.',
              'Measure today’s baseline on real cases: time per case, waiting time, handoffs, errors and rework.',
              'Mark each decision point, name its owner, and agree what the system may do alone and when it must stop.',
              'Collect representative examples, including the awkward ones.',
              'Check whether a simpler fix, such as an inbox rule or a better template, solves most of the problem.',
            ],
          },
          {
            type: 'p',
            text: 'The NIST framework makes a similar point: understanding a proposed system’s context should inform an initial go/no-go decision, including whether AI is needed at all. A clear “not yet” is a useful result. For an outside view, BYBO’s [Blueprint](/blueprint) is a paid diagnostic that maps the workflow, sets a cost baseline, reviews readiness and recommends what to automate or leave alone.',
          },
          {
            type: 'p',
            text: 'The [India AI Governance Guidelines](https://static.pib.gov.in/WriteReadData/specificdocs/documents/2025/nov/doc2025115685601.pdf), released by MeitY in November 2025, take a principle-based approach that relies largely on existing laws, sectoral regulators and voluntary measures. Their guidance for industry asks firms to comply with Indian law, such as data protection law, and to offer a way to report AI-related harms and have them resolved. For a first system, that becomes three practical questions: whose personal data does the workflow touch, who can see it, and whom does a customer contact when the system gets something wrong?',
          },
          {
            type: 'note',
            tone: 'caution',
            title: 'General information, not legal advice',
            text: 'The guidelines are guidance rather than a statute, and they note that higher-risk uses in sensitive sectors such as health or finance may need additional safeguards. This summary reflects them at the time of writing. If your workflow handles personal data or sits in a regulated sector, confirm your obligations with a legal or compliance adviser before launch.',
          },
        ],
      },
      {
        id: 'is-it-working',
        heading: 'How do you tell if it is working?',
        blocks: [
          {
            type: 'p',
            text: 'Compare it with the baseline, not with the demo. The NIST framework notes that systems meant to support or replace human work need some form of baseline measure for comparison. Measure the whole workflow, from arrival to completed record, including the time people spend reviewing.',
          },
          {
            type: 'table',
            caption: 'Measures worth tracking from the first week',
            head: ['Measure', 'What it tells you'],
            rows: [
              ['Time per completed case', 'Whether the work moves faster end to end'],
              ['Share of cases needing review', 'How much judgement the work still needs'],
              ['Errors caught and errors missed', 'Whether the checks sit in the right place'],
              ['Reviewer edits and rejections', 'Where rules, inputs or drafts need work'],
              ['Cost per completed case', 'Model usage, review time and upkeep together'],
            ],
          },
          {
            type: 'p',
            text: 'Watch the review step closely. If reviewers approve everything without reading, the gate has become a formality. If they rewrite most drafts, the system is adding work. Either is a signal to adjust the rules, the inputs or the scope.',
          },
          {
            type: 'p',
            text: 'Decide in advance what would make you pause. The NIST framework includes assigned responsibility for superseding, disengaging or deactivating a system whose performance does not match its intended use. In a business, that means a pause switch, a fallback to the manual process and a named person allowed to use them. Operation is continuing work, which is why [how we work](/how-we-work) treats it as a stage in its own right: monitoring quality, resolving failures and keeping costs visible.',
          },
        ],
      },
    ],
    limitations: [
      'This guide is about internal business workflows. Consumer-facing AI products and safety-critical uses need more specialised risk and compliance work.',
      'Not every recurring task needs AI. Where inputs are structured and rules are fixed, conventional automation or a better process is often cheaper and more predictable.',
      'A system cannot settle a process your team disagrees about. If nobody can say how exceptions should be handled, agree that first.',
      'Results depend on your volumes, inputs and baseline. Nothing here predicts time or cost savings for a particular business.',
    ],
    faqs: [
      {
        q: 'Is a general AI assistant a business AI system?',
        a: 'Not on its own. A general-purpose assistant is a tool: it helps one person with one task, and that person checks the result. It becomes part of a business AI system when it sits inside a defined workflow, connected to the right records with limited permissions, bounded by written rules, reviewed at decision points, logged, and owned by someone accountable for the outcome.',
      },
      {
        q: 'Do we need to train our own AI model?',
        a: 'Usually not. Most business systems use an existing model through a provider, combined with your rules, records and review steps. Training or fine-tuning your own model makes sense only for a specific, measured need with enough good data behind it. What you do need to own is the workflow, the rules, the access decisions, test cases from your real work and operating responsibility.',
      },
      {
        q: 'How long does a first system take to build?',
        a: 'It depends on the workflow, your inputs and the tools involved, so treat any fixed promise with caution. Most of the time goes into the parts around the model: access, written rules, representative cases, testing the awkward ones and preparing reviewers. A narrow first boundary, such as reading and checking documents while approval stays manual, reaches a measurable result sooner than an end-to-end build.',
      },
      {
        q: 'What does a business AI system cost to run?',
        a: 'More than the model. Running cost includes model usage, integrations, hosting, monitoring, the time people spend reviewing and correcting, and maintenance as rules and inputs change. The useful comparison is cost per completed case against your current baseline, not the price of a single model response. Make costs visible from the first week, so they are managed rather than discovered.',
      },
      {
        q: 'Will an AI system replace our staff?',
        a: 'A well-designed system moves people from repetitive handling to decisions and exceptions. Whether that absorbs growth, frees time for other work or changes team size is a business decision, not a property of the technology. What should not change is responsibility. Consequential decisions stay with named people, and the system should make their judgement easier to exercise.',
      },
    ],
    bybo: [
      {
        href: '/systems',
        label: 'Systems overview',
        why: 'See how the same workflow pattern applies to documents, enquiries, operations, knowledge and reporting.',
      },
      {
        href: '/blueprint',
        label: 'AI Opportunity Blueprint',
        why: 'A paid diagnostic that maps a workflow, measures the baseline and recommends what is worth building.',
      },
      {
        href: '/how-we-work',
        label: 'How we work',
        why: 'The stages from diagnosis to operation, with owners, approval rules, failure handling and cost visibility.',
      },
    ],
    related: ['identify-repetitive-work-to-automate', 'measure-ai-system-performance', 'ai-for-indian-msmes'],
    sources: [
      {
        title: 'Artificial Intelligence Risk Management Framework (AI RMF 1.0), NIST AI 100-1',
        publisher: 'National Institute of Standards and Technology (NIST)',
        url: 'https://nvlpubs.nist.gov/nistpubs/ai/NIST.AI.100-1.pdf',
      },
      {
        title: 'OECD AI Principles overview, including the definition of an AI system',
        publisher: 'OECD.AI Policy Observatory',
        url: 'https://oecd.ai/en/ai-principles',
      },
      {
        title: 'India AI Governance Guidelines: Enabling Safe and Trusted AI Innovation',
        publisher: 'Ministry of Electronics and Information Technology (MeitY), Government of India',
        url: 'https://static.pib.gov.in/WriteReadData/specificdocs/documents/2025/nov/doc2025115685601.pdf',
      },
    ],
  },
];

export default guides;
