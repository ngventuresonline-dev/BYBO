import type { Guide } from '../types';

const guides: Guide[] = [
  {
    slug: 'ai-systems-and-dpdp-india',
    collection: 'governance',
    title: 'Building AI Systems Around India’s Digital Personal Data Protection Framework',
    seoTitle: 'Building AI Systems Around India’s DPDP Framework',
    description: 'How the DPDP Act 2023 and DPDP Rules 2025 apply to an AI workflow: consent and notice, data minimisation, security, breach intimation, retention and vendors.',
    dek: 'India’s data protection framework does not ban AI. It asks plain questions about the personal data your system touches: why you hold it, who can see it, how long you keep it and what happens when something goes wrong.',
    keywords: [
      'DPDP Act and AI systems',
      'DPDP Rules 2025',
      'data protection for AI in India',
      'personal data in AI workflows',
      'data fiduciary obligations',
      'DPDP compliance for businesses',
    ],
    publishedAt: '2026-09-11',
    visual: {
      kind: 'layers',
      title: 'Personal data in an AI workflow',
      layers: [
        { label: 'Collection', note: 'Notice and consent, or a legitimate use' },
        { label: 'What the model sees', note: 'Only the fields the task needs' },
        { label: 'Storage and logs', note: 'Access controlled, monitored, time-limited' },
        { label: 'Vendors', note: 'A contract and safeguards you can check' },
        { label: 'Erasure', note: 'Removed from records, logs and indexes' },
      ],
    },
    summary: [
      'The Act names the roles. A data fiduciary decides why and how personal data is processed, and answers for its processors.',
      'Most obligations become design questions: what the model sees, who reads the logs, how long anything is kept.',
      'The Rules were notified on 14 November 2025 with a phased timeline. Check the current position before relying on any date.',
      'This is general information, not legal advice. Ask a qualified adviser about your own processing.',
    ],
    sections: [
      {
        id: 'roles-and-scope',
        heading: 'Who does the law make responsible, and for what?',
        blocks: [
          {
            type: 'p',
            text: 'The Digital Personal Data Protection Act, 2023 uses three plain names. A Data Fiduciary determines the purpose and means of processing personal data (section 2(i)). A Data Principal is the individual the data is about (section 2(j)). A Data Processor processes it on a fiduciary’s behalf (section 2(k)). If your business decides why customer information is used and how, you are the fiduciary, even when a vendor’s software does the work.',
          },
          {
            type: 'p',
            text: 'Personal data means any data about an individual who is identifiable by or in relation to it (section 2(t)). Processing is defined widely, and includes collection, storage, retrieval, use, indexing, sharing and erasure (section 2(x)). Section 3 applies the Act to digital personal data processed within India, and to processing outside India connected with offering goods or services to people in India. Enquiry messages, KYC files, support transcripts and CRM notes are all in scope.',
          },
          {
            type: 'note',
            tone: 'caution',
            title: 'General information, not legal advice',
            text: 'The DPDP Rules, 2025 were notified on 14 November 2025. As notified, rules 1, 2 and 17 to 21 came into force on publication in the Official Gazette, rule 4 one year after publication, and rules 3, 5 to 16, 22 and 23 eighteen months after publication. The Press Information Bureau calls this an eighteen-month period for phased compliance. Dates and text can change, and how any of this applies depends on your facts. Check the current position, and take advice from a qualified adviser before you rely on it.',
          },
        ],
      },
      {
        id: 'consent-notice-legitimate-uses',
        heading: 'When may an AI system use someone’s personal data?',
        blocks: [
          {
            type: 'p',
            text: 'Section 4 allows processing only for a lawful purpose, which it defines as any purpose not expressly forbidden by law, and only where the person has given consent or one of the certain legitimate uses applies. Two questions, then, not one: is the purpose lawful, and what is your ground for it?',
          },
          {
            type: 'p',
            text: 'Consent has a shape. Section 6(1) requires it to be free, specific, informed, unconditional and unambiguous, given by a clear affirmative action, and limited to the personal data necessary for the specified purpose. That last phrase is where minimisation begins. Section 6(4) gives a right to withdraw with comparable ease, and section 6(6) requires you to stop, and to cause your processors to stop. Section 6(10) puts the burden on you to prove notice was given and consent taken, so both records belong inside the system.',
          },
          {
            type: 'p',
            text: 'Notice comes first. Section 5(1) requires it to state the personal data and the purpose, how she may exercise her rights and how she may complain to the Board. Rule 3 of the DPDP Rules, 2025 adds that the notice must be understandable on its own, and must give in clear and plain language at least an itemised description of the personal data and the specified purposes, with a specific description of the goods, services or uses the processing enables.',
          },
          {
            type: 'p',
            text: 'Section 7 lists the certain legitimate uses. The common one is clause (a): data the person voluntarily provided for a specified purpose, where she has not indicated that she objects. Others cover State functions, legal obligations, court orders, medical emergencies, disasters and employment purposes. It is a defined list, not a general exemption for anything convenient.',
          },
        ],
      },
      {
        id: 'minimising-what-the-model-sees',
        heading: 'How much personal data should the model actually see?',
        blocks: [
          {
            type: 'p',
            text: 'Purpose limitation and minimisation turn into three concrete decisions: what goes into the prompt, what goes into the retrieval index and what is written to the log. Each creates a copy of personal data that must then be protected, found and erased.',
          },
          {
            type: 'list',
            items: [
              'Inventory the personal data each workflow touches: which fields, which documents, which channels.',
              'Send the fields the task needs rather than the whole customer record.',
              'Mask or tokenise identifiers the task does not need. Rule 6 names masking and virtual tokens as security measures.',
              'Decide in writing whether a vendor may use your data to improve its models.',
              'Record the specified purpose for each workflow, so nobody justifies a use by saying the data was already in the file.',
            ],
          },
          {
            type: 'example',
            title: 'Illustrative example: a Coimbatore clinic’s appointment desk',
            text: 'Suppose a clinic uses an assistant to draft appointment reminders and answer questions about timings and directions. The task needs a name, an appointment time, a doctor and an address. It does not need diagnosis notes or payment history, so those fields never enter the prompt. The message log keeps the reminder text and a patient reference number, not the clinical record. When a patient asks for her data to be removed, the desk knows the three places to look.',
          },
        ],
      },
      {
        id: 'security-logs-and-breaches',
        heading: 'What do the security and breach rules mean for logs?',
        blocks: [
          {
            type: 'p',
            text: 'Section 8(5) requires reasonable security safeguards for personal data in your possession or control, including processing done on your behalf. Rule 6 sets the minimum: encryption, obfuscation, masking or virtual tokens; control of access to the computer resources used; visibility on access through logs, monitoring and review, so unauthorised access can be detected and investigated; backups; retention of those logs and data for one year unless another law requires otherwise; a contract term obliging your processor to take safeguards; and technical and organisational measures to make them effective.',
          },
          {
            type: 'p',
            text: 'Set that beside the way AI systems are usually built. Prompts, outputs and traces often contain personal data, and once they do they are personal data in your possession. The access rules you apply to the customer database apply to the prompt log too. Decide what is written there before launch, in the same spirit as [permissions, logs and approval gates](/insights/ai-permissions-logs-approval-gates).',
          },
          {
            type: 'p',
            text: 'A personal data breach is defined broadly in section 2(u): any unauthorised processing, or accidental disclosure, acquisition, sharing, use, alteration, destruction or loss of access, that compromises confidentiality, integrity or availability. Section 8(6) requires intimation to the Board and to each affected person, and rule 7 sets out the shape of it.',
          },
          {
            type: 'table',
            caption: 'Breach intimation as rule 7 sets it out',
            head: ['Who', 'When', 'What it must contain'],
            rows: [
              ['Each affected person', 'Without delay', 'The breach, likely consequences, mitigation, safety steps, a contact'],
              ['The Board, first message', 'Without delay', 'Nature, extent, timing, location and likely impact'],
              ['The Board, follow-up', 'Within 72 hours', 'Detailed facts, causes, mitigation, findings, remedies, intimations sent'],
            ],
          },
        ],
      },
      {
        id: 'retention-and-erasure',
        heading: 'How long can a system keep the data, and how do you delete it?',
        blocks: [
          {
            type: 'p',
            text: 'Section 8(7) requires erasure when consent is withdrawn, or as soon as it is reasonable to assume the specified purpose is no longer being served, whichever is earlier, unless retention is necessary to comply with a law in force. You must also cause your processor to erase what you gave it. Section 12 separately gives the person a right to correction, completion, updating and erasure on request.',
          },
          {
            type: 'p',
            text: 'Section 8(8) deems the purpose no longer served when the person neither approaches you for it nor exercises her rights for a prescribed period. Rule 8 and the Third Schedule prescribe those periods for specified classes, such as an e-commerce entity with not less than two crore registered users in India: three years from her last approach or from the commencement of the Rules, whichever is latest, with carve-outs for account access and stored tokens. Rule 8(2) requires at least forty-eight hours’ notice before that erasure.',
          },
          {
            type: 'p',
            text: 'There is a floor as well as a ceiling. Rule 8(3) requires personal data, associated traffic data and other logs of the processing to be kept for a minimum of one year, for the purposes in the Seventh Schedule, unless another law requires longer. The Rules illustrate it with an e-book platform that keeps order details and processing logs for a year even after the customer deletes her account.',
          },
          {
            type: 'p',
            text: 'Deletion in an AI system is rarely one button. A person’s data may sit in the application record, the prompt log, the retrieval index, the analytics copy, the vendor’s stored conversations and last night’s backup. Map those places while the system is being built. Our own [privacy information](/privacy) page is a short example of the plain tone that suits this.',
          },
        ],
      },
      {
        id: 'children-and-significant-fiduciaries',
        heading: 'What changes for children’s data and larger organisations?',
        blocks: [
          {
            type: 'p',
            text: 'A child is anyone who has not completed eighteen years (section 2(f)). Section 9 requires verifiable consent from a parent or lawful guardian before processing a child’s personal data, prohibits processing likely to cause a detrimental effect on a child’s well-being, and prohibits tracking, behavioural monitoring and targeted advertising directed at children. Rule 10 asks for due diligence that the person identifying herself as the parent is an identifiable adult. Rule 12 and the Fourth Schedule exempt certain classes and purposes, subject to conditions.',
          },
          {
            type: 'p',
            text: 'Under section 10 the Central Government may notify a fiduciary, or a class of them, as a Significant Data Fiduciary, weighing factors that include the volume and sensitivity of personal data processed and the risk to the rights of Data Principals. Such a fiduciary must appoint a Data Protection Officer based in India and an independent data auditor, and carry out periodic impact assessments and audits. Rule 13 makes those annual, requires significant observations to reach the Board, and adds due diligence that algorithmic software used to process personal data is not likely to pose a risk to those rights.',
          },
          {
            type: 'note',
            tone: 'insight',
            title: 'The larger obligations make a decent template',
            text: 'Most growing businesses are not notified as Significant Data Fiduciaries. The list still describes a serious operating position: someone accountable by name, an assessment before launch, an independent check afterwards.',
          },
        ],
      },
      {
        id: 'vendors-and-cross-border',
        heading: 'Where do vendors, processors and transfers outside India fit?',
        blocks: [
          {
            type: 'p',
            text: 'Section 8(1) is the sentence to remember when a vendor offers comfortable terms. The fiduciary is responsible for complying with the Act for any processing undertaken by it or on its behalf by a processor, irrespective of any agreement to the contrary. Section 8(2) permits engaging a processor only under a valid contract, and rule 6(1)(f) requires that contract to provide for security safeguards. Outsourcing the work does not outsource the responsibility. Six things belong in the contract:',
          },
          {
            type: 'list',
            items: [
              'The purposes the vendor may process for, and an explicit position on training models with your data.',
              'Sub-processors, and notice before they change.',
              'Security measures, and the evidence you can ask for.',
              'Breach notification to you fast enough to meet the rule 7 timelines.',
              'Deletion on request and on exit, including logs and derived copies.',
              'Where processing and storage take place.',
            ],
          },
          {
            type: 'p',
            text: 'On transfers, the Act takes a specific approach. Section 16(1) allows the Central Government, by notification, to restrict transfers of personal data for processing to a country or territory it notifies. Section 16(2) makes clear this does not displace any Indian law giving higher protection or a stricter restriction, so sector rules still bind you. Rule 15 adds that a transfer is subject to requirements the Government may specify about making personal data available to a foreign State, and rule 13(4) allows specified data of Significant Data Fiduciaries to be kept within India. In practice, know which region each provider processes in and keep the ability to change it, which is the [vendor lock-in question](/insights/ai-vendor-lock-in) in another form.',
          },
        ],
      },
      {
        id: 'first-steps',
        heading: 'Where should you start, and who enforces this?',
        blocks: [
          {
            type: 'p',
            text: 'Enforcement sits with the Data Protection Board of India, established under section 18. Section 27 lets it direct urgent remedial measures on a breach intimation, inquire into breaches and impose penalties. Section 33 allows the monetary penalties in the Schedule after an inquiry and a hearing, having regard to the nature, gravity and duration of the breach and what was done to mitigate it. The Schedule sets ceilings of up to two hundred and fifty crore rupees for failing to take reasonable security safeguards, up to two hundred crore rupees each for breach intimation and children’s obligations, and up to fifty crore rupees for any other breach.',
          },
          {
            type: 'list',
            ordered: true,
            items: [
              'Inventory the personal data each AI workflow touches, including prompts, logs and indexes.',
              'Write the specified purpose for each workflow and check your notice covers it.',
              'Reduce what the model sees: fields instead of full records.',
              'Decide what is written to logs, who may read them and how long they stay.',
              'Put the processor contract in place before data moves.',
              'Rehearse a deletion request and a breach intimation on paper, with a name against each step.',
            ],
          },
          {
            type: 'p',
            text: 'One design point is easy to miss. Section 8(3) requires completeness, accuracy and consistency of personal data likely to be used in a decision affecting the person or disclosed to another fiduciary. If your system prepares decisions about people, that is another reason to keep a person in the loop with the evidence beside the output. The rest is ordinary discipline, described in [what enterprise AI governance means in practice](/insights/enterprise-ai-governance). Our [Infrastructure & Governance](/systems/ai-infrastructure-governance) work covers the access controls, logs and evidence such a review asks for.',
          },
        ],
      },
    ],
    limitations: [
      'This article is general information, not legal advice. How the Act and Rules apply depends on your facts, and a qualified adviser should confirm your position.',
      'Commencement is phased and the text can change. Confirm the current provisions and dates from the Gazette or the Ministry before relying on them.',
      'Other laws may go further. Section 16(2) preserves any law giving higher protection or stricter transfer restrictions, so sector requirements can still apply.',
      'Minimisation reduces exposure; it does not remove it. A system that never sees a phone number can still cause harm through a wrong answer.',
    ],
    faqs: [
      {
        q: 'Does the DPDP Act apply to our AI system?',
        a: 'If it processes digital personal data in India, or processes it outside India in connection with offering goods or services to people in India, then yes. Section 3 sets that reach, and section 2(x) defines processing widely enough to cover collection, storage, retrieval, use and erasure. There is no separate carve-out for artificial intelligence.',
      },
      {
        q: 'Do we need consent before using customer data with an AI tool?',
        a: 'You need a lawful purpose and a ground: either consent or one of the certain legitimate uses in section 7 (section 4). Where consent is the ground, section 6(1) limits it to the personal data necessary for the specified purpose described in your notice. Using the same records for a different purpose, such as improving a model, is a fresh question rather than an extension of the original consent.',
      },
      {
        q: 'When must a personal data breach be reported under the DPDP Rules?',
        a: 'On becoming aware of a breach, rule 7 requires you to inform each affected person without delay, in plain language: the nature of the breach, the likely consequences for her, what you are doing, what she can do and a contact. The Board must be told without delay with a description, then given detailed information within seventy-two hours, or longer if it allows that on a written request.',
      },
      {
        q: 'When do the DPDP Rules, 2025 actually take effect?',
        a: 'They were notified on 14 November 2025. As notified, rules 1, 2 and 17 to 21 commenced on publication in the Official Gazette, rule 4 one year after publication, and rules 3, 5 to 16, 22 and 23 eighteen months after publication. The Press Information Bureau describes this as an eighteen-month phased compliance period. Timelines can be amended, so confirm the current position before planning around a date.',
      },
    ],
    bybo: [
      {
        href: '/systems/ai-infrastructure-governance',
        label: 'Infrastructure & Governance',
        why: 'Access controls, logs, evaluations and incident response are the evidence a data protection review will ask for.',
      },
      {
        href: '/privacy',
        label: 'BYBO privacy information',
        why: 'A short, plain example of telling people what happens to the information they send you.',
      },
      {
        href: '/how-we-work',
        label: 'How we work',
        why: 'Shows where data handling, permissions and approvals are agreed during a build, before anything goes live.',
      },
    ],
    related: ['enterprise-ai-governance', 'reduce-manual-data-entry', 'ai-for-education-and-lending'],
    sources: [
      {
        title: 'The Digital Personal Data Protection Act, 2023 (No. 22 of 2023)',
        publisher: 'Ministry of Electronics and Information Technology, Government of India',
        url: 'https://www.meity.gov.in/static/uploads/2024/06/2bf1f0e9f04e6fb4f8fef35e82c42aa5.pdf',
      },
      {
        title: 'The Digital Personal Data Protection Rules, 2025 (G.S.R. 846(E))',
        publisher: 'Ministry of Electronics and Information Technology, Government of India',
        url: 'https://www.meity.gov.in/static/uploads/2025/11/53450e6e5dc0bfa85ebd78686cadad39.pdf',
      },
      {
        title: 'DPDP Rules, 2025 Notified: A Citizen-Centric Framework for Privacy Protection and Responsible Data Use',
        publisher: 'Press Information Bureau, Government of India',
        url: 'https://www.pib.gov.in/PressReleasePage.aspx?PRID=2190655',
      },
    ],
  },
  {
    slug: 'control-ai-operating-costs',
    collection: 'governance',
    title: 'How to Keep AI Operating Costs Visible and Controlled',
    description: 'What an AI system costs to run each month, how to measure cost per completed item, and the budgets, alerts and design choices that keep the bill predictable.',
    dek: 'AI systems bill by usage, not by licence. This is how to see where the money goes, measure cost per completed item and keep the monthly total from drifting.',
    keywords: [
      'AI operating costs',
      'cost of running AI systems',
      'AI cost per token',
      'AI cost per task',
      'control AI spend',
      'AI budget and alerts',
    ],
    publishedAt: '2026-09-11',
    visual: {
      kind: 'flow',
      title: 'Keeping the monthly bill in view',
      steps: ['Measure a baseline', 'Set a budget', 'Alert on drift', 'Review the numbers', 'Change the design'],
      gate: 3,
      gateLabel: 'The owner decides what changes',
    },
    summary: [
      'AI systems bill by usage. Longer inputs, retries and extra steps change the total without anyone deciding to spend more.',
      'Measure cost per completed item, including review time, and compare it with the baseline you measured before the build.',
      'Budgets, per-workflow keys and alerts turn a surprising invoice into a number someone watches every month.',
      'Most of the saving is in the design: smaller models where they suffice, shorter context, caching and firm retry limits.',
    ],
    sections: [
      {
        id: 'where-the-money-goes',
        heading: 'What does an AI system actually cost to run?',
        blocks: [
          {
            type: 'p',
            text: 'A software subscription is a fixed line in the budget. A system built on models is not. It bills by use, so the total moves with volume, with the length of what you send, and with how many attempts each task takes. That is manageable, but only if you know which parts of the bill exist.',
          },
          {
            type: 'table',
            caption: 'The parts of a monthly AI bill',
            head: ['Cost', 'What drives it', 'Where it hides'],
            rows: [
              ['Model usage', 'Text sent and returned', 'Long prompts, retries, agent loops'],
              ['Hosting and compute', 'Servers, storage, uptime', 'Idle test environments'],
              ['Search and indexes', 'Documents stored and queried', 'Rebuilding an index after every change'],
              ['Integrations and channels', 'Messages, calls, per-record fees', 'Provider charges nobody priced'],
              ['Monitoring and logs', 'How much is kept, and for how long', 'Traces retained indefinitely'],
              ['Human review', 'Minutes per item, times volume', 'Time nobody books against the system'],
            ],
          },
          {
            type: 'p',
            text: 'The last row is the one most teams leave out. If two in ten documents need a person to check them, that review is part of what the workflow costs, and it is usually the part that grows fastest when quality slips.',
          },
          {
            type: 'p',
            text: 'It also helps to separate the two questions that get muddled in budget discussions. Building the system is a project cost, decided by scope: how many workflows, how many document types, how many systems it has to connect to and how much review the business wants. Running it is an operating cost that continues every month and moves with volume. A sensible scoping conversation prices both, and says plainly which parts are estimates.',
          },
        ],
      },
      {
        id: 'what-a-token-is',
        heading: 'What is a token, and why does it decide the bill?',
        blocks: [
          {
            type: 'p',
            text: 'Most providers price language models by the token. A token is a chunk of text, often a whole word and sometimes part of one. Models work through them one at a time: NIST’s [Generative AI Profile](https://nvlpubs.nist.gov/nistpubs/ai/NIST.AI.600-1.pdf) describes how such systems generate outputs, noting that large language models predict the next token or word in a sentence.',
          },
          {
            type: 'p',
            text: 'You are normally charged for the tokens you send and the tokens that come back, so the length of the input matters as much as the answer. A whole policy manual pasted into every prompt is paid for on every request. The same answer built from three relevant paragraphs costs a fraction of it. Attachments, long conversation histories and verbose instructions all count.',
          },
          {
            type: 'note',
            tone: 'insight',
            title: 'A price per token is not a budget',
            text: 'Prices differ by provider and model, and they change often, so a figure printed anywhere ages quickly. Work in your own unit instead: tokens per completed item, multiplied by items per month, plus the review time each item still needs.',
          },
        ],
      },
      {
        id: 'cost-per-completed-item',
        heading: 'Why measure cost per completed item?',
        blocks: [
          {
            type: 'p',
            text: 'Cost per model call is an engineering number. Cost per completed item is a business one: per processed invoice, per resolved enquiry, per prepared report. It includes the attempts that failed, the steps that were repeated and the minutes a person spent finishing the job, and it can be compared with what the work cost before.',
          },
          {
            type: 'example',
            title: 'Illustrative example: a Nashik distributor’s supplier invoices',
            text: 'Suppose the workflow handles 900 supplier invoices a month. A typical invoice takes three model calls, and one in ten is retried, so you are paying for about 3.3 calls per invoice rather than three. Two in ten invoices reach a person, at four minutes each, which is six hours of review a month. Cost per completed invoice is the whole month’s usage, including the failures, plus those six hours, divided by the invoices that were actually finished. That is the number to set against what the same work cost the accounts team last year.',
          },
          {
            type: 'p',
            text: 'This only works if you measured the baseline before the build. Volume, handling time and error rate for the current process are worth a fortnight of counting, and they make every later claim checkable. The same measurements decide whether the system is [actually working](/insights/measure-ai-system-performance), not only what it costs.',
          },
        ],
      },
      {
        id: 'budgets-and-alerts',
        heading: 'How do you stop the bill from arriving as a surprise?',
        blocks: [
          {
            type: 'p',
            text: 'Visibility first, control second. Both are ordinary account hygiene rather than special software.',
          },
          {
            type: 'list',
            items: [
              'Give each workflow its own key or project, so the invoice can be read by workflow instead of as one number.',
              'Set a monthly budget for each workflow, with alerts at a share of it rather than only at the limit.',
              'Use hard spend caps where the provider offers them, with lower ones on test environments.',
              'Alert on volume as well as money. A jump in requests is usually the earliest signal.',
              'Name one person who receives the alerts and is allowed to pause the workflow.',
            ],
          },
          {
            type: 'p',
            text: 'An alert that lands in a shared inbox nobody opens is decoration. The point of the name is that somebody can act the same day, before a loop runs all weekend.',
          },
          {
            type: 'p',
            text: 'Attribution matters as much as the total. When one invoice covers six workflows, nobody can tell whether the enquiry desk is expensive or the document reader is. Separate keys, a short label on every request and a simple monthly extract are usually enough to answer that without a reporting project. If a workflow cannot be costed on its own, it also cannot be judged on its own.',
          },
        ],
      },
      {
        id: 'design-choices',
        heading: 'Which design choices change the monthly total?',
        blocks: [
          {
            type: 'p',
            text: 'Most of the bill is decided when the workflow is designed, not when it is running. Six choices do most of the work.',
          },
          {
            type: 'list',
            items: [
              'Right-size the model. Extraction, classification and routing rarely need your most capable model; keep that one for the hard step.',
              'Trim the context. Send the three relevant paragraphs rather than the whole manual.',
              'Cache what repeats: identical questions, standard documents and any prompt prefix your provider allows you to reuse.',
              'Batch what is not urgent. Overnight runs for reports and back-scans avoid paying for haste.',
              'Limit retries and agent steps with a budget and a stop rule, so a confused run cannot spend all night trying.',
              'Re-index only what changed instead of rebuilding the whole index on every update.',
            ],
          },
          {
            type: 'p',
            text: 'Each of these is a trade. A smaller model is cheaper only if it still produces work your team accepts, which is why a change of model belongs with a rerun of your evaluation set and not with a hopeful deployment on a Friday.',
          },
        ],
      },
      {
        id: 'forecasting-with-volume',
        heading: 'How do you forecast cost as volume grows?',
        blocks: [
          {
            type: 'p',
            text: 'The useful forecast is simple: cost per completed item, multiplied by the volume you expect, plus a margin for retries and exceptions. Build it from measured numbers rather than from a vendor’s example, and redo it when the design changes.',
          },
          {
            type: 'p',
            text: 'If your business has a season, the bill has one too. Festive demand, quarter close, admissions intake and dispatch cycles all move volume, and the review queue moves with it. Plan for the peak month rather than the average one, and check three things before it arrives: provider rate limits, queueing behaviour when requests pile up, and whether the people who review exceptions will be available.',
          },
          {
            type: 'note',
            tone: 'caution',
            title: 'The invoice is not the whole cost',
            text: 'Output that a person has to correct is not cheap. The [NIST AI Risk Management Framework](https://nvlpubs.nist.gov/nistpubs/ai/NIST.AI.100-1.pdf) asks organisations to examine and document potential costs, including non-monetary ones, that come from AI errors or from how the system performs. Correction time, delay and lost trust belong in that list.',
          },
        ],
      },
      {
        id: 'monthly-review',
        heading: 'What belongs in a twenty-minute monthly review?',
        blocks: [
          {
            type: 'list',
            ordered: true,
            items: [
              'Spend by workflow against its budget, and the largest change since last month.',
              'Cost per completed item, and whether the trend is moving up or down.',
              'Volume, so a rising bill can be separated from a rising workload.',
              'Retry and failure rate, which is usually where quiet waste sits.',
              'Review minutes per item, and who is absorbing them.',
              'One decision, written down: leave it, tune it, move the model or retire the workflow.',
            ],
          },
          {
            type: 'p',
            text: 'Twenty minutes in an existing operations meeting is enough for a handful of workflows. Cost visibility is part of the operating foundation described in our [Infrastructure & Governance](/systems/ai-infrastructure-governance) work, and when several teams share one system, a [custom platform](/systems/custom-ai-platforms) can show usage per team rather than one bill for everyone.',
          },
        ],
      },
    ],
    limitations: [
      'Provider prices, model names and features change often. Any specific figure ages quickly, so measure your own workflows rather than copying a published number.',
      'Cost per item means little without quality beside it. A cheaper model that fails more often moves the cost into review time and rework.',
      'Not all costs are usage-based. Integration work, evaluation, maintenance and the time your team spends on changes are real and largely fixed.',
      'Not every workflow deserves optimising. If one costs little and works, put the attention on the one that does neither.',
    ],
    faqs: [
      {
        q: 'How much does it cost to run an AI system each month?',
        a: 'There is no single answer, because the bill is made of usage rather than a licence. It depends on volume, how much text each task sends and returns, how many steps and retries the workflow allows, hosting, integrations, log retention and the review time people still spend. Build the estimate from your own volumes and a measured cost per completed item.',
      },
      {
        q: 'What is a token in AI pricing?',
        a: 'A token is a chunk of text, often a word or part of one, and most providers charge for the tokens you send and the tokens the model returns. Longer prompts, attached documents, long conversation histories and repeated attempts all add tokens. That is why trimming context and limiting retries usually saves more than switching provider.',
      },
      {
        q: 'How do we stop AI costs from surprising us?',
        a: 'Separate keys or projects per workflow so the bill is readable, a monthly budget for each, alerts on both spend and request volume, hard caps where the provider offers them, and one named person who can pause a workflow the same day. Then a short monthly review of spend, cost per completed item and failure rate.',
      },
      {
        q: 'Is a cheaper model always the better choice?',
        a: 'No. A smaller model is cheaper per call, but if it produces work your team has to redo, the saving moves into review time and rework. Test any change against a set of real cases with an agreed pass level, then compare cost per completed item rather than cost per call.',
      },
      {
        q: 'Should staff review time count as an AI cost?',
        a: 'Yes. Review is part of how the workflow produces a finished result, so its minutes belong in the cost per completed item. Counting it also makes the effect of quality visible: when accuracy drops, the invoice may barely move while your team quietly absorbs the difference.',
      },
    ],
    bybo: [
      {
        href: '/systems/ai-infrastructure-governance',
        label: 'Infrastructure & Governance',
        why: 'Covers monitoring, cost visibility and the operating controls that keep usage and quality in one view.',
      },
      {
        href: '/systems/custom-ai-platforms',
        label: 'Custom AI Platforms',
        why: 'Useful when several teams share one system and usage, access and cost need to be visible per team.',
      },
      {
        href: '/blueprint',
        label: 'AI Opportunity Blueprint',
        why: 'A paid diagnostic that maps the workflow and decides what is worth building before costs are committed.',
      },
    ],
    related: ['business-automation-cost-india', 'real-cost-of-repetitive-work', 'measure-ai-system-performance'],
    sources: [
      {
        title: 'Artificial Intelligence Risk Management Framework (AI RMF 1.0)',
        publisher: 'National Institute of Standards and Technology (NIST)',
        url: 'https://nvlpubs.nist.gov/nistpubs/ai/NIST.AI.100-1.pdf',
      },
      {
        title: 'Artificial Intelligence Risk Management Framework: Generative Artificial Intelligence Profile (NIST AI 600-1)',
        publisher: 'National Institute of Standards and Technology (NIST)',
        url: 'https://nvlpubs.nist.gov/nistpubs/ai/NIST.AI.600-1.pdf',
      },
    ],
  },
  {
    slug: 'ai-vendor-lock-in',
    collection: 'governance',
    title: 'AI Vendor Lock-In: What Businesses Should Consider Before Building',
    seoTitle: 'AI Vendor Lock-In: What to Consider Before Building',
    description: 'Where AI vendor lock-in really happens, which portability measures are worth the effort, when lock-in is a fair trade, and what to ask a vendor before signing.',
    dek: 'Every AI system depends on someone else’s software. Lock-in is not a failure. It is a switching cost you should be able to name before you sign, and reduce where it matters.',
    keywords: [
      'AI vendor lock-in',
      'switching AI providers',
      'AI vendor evaluation',
      'AI exit clauses',
      'model portability',
      'AI platform contracts',
    ],
    publishedAt: '2026-09-11',
    visual: {
      kind: 'matrix',
      title: 'When lock-in is a fair trade',
      x: ['Easy to switch', 'Hard to switch'],
      y: ['Little gained', 'A lot gained'],
      quadrants: ['Adopt freely', 'Worth it, with an exit plan', 'Replace when convenient', 'Avoid: cost without payoff'],
      highlight: 1,
    },
    summary: [
      'Lock-in is the time, money and risk of changing your mind later. Every dependency has some. The question is whether you priced it.',
      'It hides in six places: model APIs, platforms, data formats, prompts and workflows, embeddings and the contract itself.',
      'Four things are worth keeping in your own hands: your data, your evaluation set, your prompts and your logs.',
      'Some lock-in is a fair trade for speed. Take it deliberately, write down the exit, and review it once a year.',
    ],
    sections: [
      {
        id: 'what-lock-in-is',
        heading: 'What does vendor lock-in actually mean here?',
        blocks: [
          {
            type: 'p',
            text: 'Lock-in is not a moral failing or a trap laid for you. It is simply the cost of changing your mind: the money, the weeks and the risk involved in moving a working system to a different provider. Every dependency carries some, including the spreadsheet macro your accountant wrote a decade ago. The question worth asking before a build is not how to avoid it, but how large it is and whether you would notice in time.',
          },
          {
            type: 'p',
            text: 'AI systems make this sharper for two reasons. Providers release, reprice and retire models faster than most software changes, and much of what makes your system valuable is not the model at all. It is your documents, your rules, your prompts and the record of what good output looks like. Where those live decides how painful a change of provider will be.',
          },
        ],
      },
      {
        id: 'where-lock-in-happens',
        heading: 'Where does lock-in actually happen?',
        blocks: [
          {
            type: 'p',
            text: 'It is rarely one decision. It accumulates in six layers, and they are not equally hard to unwind.',
          },
          {
            type: 'table',
            caption: 'Six layers, and what each one ties down',
            head: ['Layer', 'What ties you in', 'How hard to move'],
            rows: [
              ['Model API', 'Provider-specific features and formats', 'Moderate, if calls are in one place'],
              ['Platform or builder', 'Workflows drawn inside a vendor console', 'Hard, they rarely export'],
              ['Data and formats', 'Records held in the vendor’s structure', 'Depends entirely on export'],
              ['Prompts and logic', 'The wording and rules that make it work', 'Easy, if you keep a copy'],
              ['Embeddings and indexes', 'Vectors tied to one model', 'Rebuildable from source documents'],
              ['Contract and pricing', 'Term, minimums, notice, exit terms', 'Fixed until renewal'],
            ],
          },
          {
            type: 'p',
            text: 'Notice the pattern. The layers that are hardest to move are the ones where your own material is stored in someone else’s shape. A workflow you can read, a prompt you can copy and a document you still hold are all portable. A diagram inside a console and an index you cannot rebuild are not.',
          },
        ],
      },
      {
        id: 'when-lock-in-is-worth-it',
        heading: 'When is lock-in a fair trade?',
        blocks: [
          {
            type: 'p',
            text: 'Often. A managed service that gets a working enquiry desk running in three weeks may be worth far more than the theoretical freedom of a system you would have to staff and maintain. A workflow that handles forty items a month does not deserve an abstraction layer. Speed, reliability and the team you actually have are legitimate reasons to accept a dependency.',
          },
          {
            type: 'p',
            text: 'The judgement is a trade between what you gain and what leaving would cost. Take the dependency freely where the switching cost is low. Take it deliberately, with an exit written down, where the value is high and the switching cost is high. Be careful where the switching cost is high and the value is ordinary, which is where most regret sits.',
          },
          {
            type: 'p',
            text: 'The [NIST AI Risk Management Framework](https://nvlpubs.nist.gov/nistpubs/ai/NIST.AI.100-1.pdf) makes a related point about third parties: technologies acquired from them may be complex or opaque, and their risk tolerances may not match yours. It asks for policies covering third-party risks, and for contingency processes to handle failures or incidents in third-party data or AI systems judged to be high-risk. Both are worth having before you need them.',
          },
        ],
      },
      {
        id: 'portability-measures',
        heading: 'Which portability measures are worth the effort?',
        blocks: [
          {
            type: 'p',
            text: 'A few habits keep most of your options open, and none of them requires building your own platform.',
          },
          {
            type: 'list',
            items: [
              'Keep the source material. Hold the original documents and records, not only the derived index or the vendor’s processed copy.',
              'Own the evaluation set. Real cases with expected outcomes are what let you compare a new provider honestly in a day.',
              'Keep prompts and workflow definitions in your own repository, versioned, even when they are pasted into a console to run.',
              'Route model calls through one internal interface, so changing provider is a change in one place rather than forty.',
              'Export logs on a schedule, in a format you can read without the vendor’s viewer.',
              'Write down the configuration: models, settings, thresholds and integrations, so nobody has to reverse-engineer it later.',
            ],
          },
          {
            type: 'p',
            text: 'Portability is national policy as well as good sense. Among its recommendations for increasing adoption, the [India AI Governance Guidelines](https://static.pib.gov.in/WriteReadData/specificdocs/documents/2025/nov/doc2025115685601.pdf) ask for greater data availability, sharing and usability supported by data portability standards and data governance frameworks. The same instinct works inside a single business.',
          },
        ],
      },
      {
        id: 'contracts-and-exit',
        heading: 'What belongs in the contract before you sign?',
        blocks: [
          {
            type: 'p',
            text: 'Exit terms are cheapest to agree while you are still deciding. Once the system is live and the renewal is three weeks away, your position is weaker.',
          },
          {
            type: 'list',
            items: [
              'Your data returned on request, in a documented format, within a stated period.',
              'Deletion after exit, including logs, backups and derived copies such as embeddings.',
              'Who owns prompts, configurations and anything trained or tuned on your data.',
              'Notice periods, renewal terms and how price changes are communicated.',
              'Sub-processors and processing locations, with notice before either changes.',
              'Support, availability and what happens if a model you depend on is retired.',
            ],
          },
          {
            type: 'p',
            text: 'Some of this is not optional. Where a vendor processes personal data on your behalf, India’s framework requires a valid contract and holds you responsible for the processing anyway, which our guide to [India’s data protection framework](/insights/ai-systems-and-dpdp-india) covers in detail.',
          },
          {
            type: 'note',
            tone: 'caution',
            title: 'An exit you have never tested is a hope',
            text: 'Ask for a data export once during the first year and see what arrives: the format, the completeness, how long it took. That single test tells you more about your position than any clause in the agreement.',
          },
        ],
      },
      {
        id: 'questions-to-ask',
        heading: 'What should you ask a vendor before committing?',
        blocks: [
          {
            type: 'list',
            ordered: true,
            items: [
              'What exactly do we get back if we leave, in what format, and how long does it take?',
              'Can we run the same workflow against a different model, and what breaks if we do?',
              'Are our prompts and workflow definitions exportable as files we can keep?',
              'Where is our data processed and stored, and how would a change of region be handled?',
              'Is our data used to train or improve your models, and can that be switched off?',
              'How much notice do we get before a model, feature or price changes?',
              'What happens to our workflows if the model we rely on is retired?',
            ],
          },
          {
            type: 'p',
            text: 'The answers matter less than the manner of them. A vendor who answers precisely, in writing, is showing you how the relationship will run. Vagueness at this stage rarely improves after signature. The same questions are useful when you are still weighing [build, buy or integrate](/insights/build-buy-or-integrate-ai).',
          },
        ],
      },
      {
        id: 'a-sensible-position',
        heading: 'What does a sensible position look like?',
        blocks: [
          {
            type: 'example',
            title: 'Illustrative example: a Jaipur exporter’s quotation assistant',
            text: 'Suppose an exporter runs a quotation assistant on a hosted platform, because nobody in the team wants to operate infrastructure. They keep the original RFQ emails and specification sheets in their own storage, a set of sixty past quotations with the answers a senior estimator would accept, the prompts in a shared repository, and a monthly export of logs. When the provider changes its pricing tiers, the finance head asks what moving would involve. The answer is a fortnight of rebuilding and one day of rerunning the evaluation set, rather than a shrug. They stay, and the decision is now theirs rather than the vendor’s.',
          },
          {
            type: 'p',
            text: 'That is the whole idea. Accept the dependencies that buy you speed, keep the four portable things in your own hands, and know the size of the door. NIST’s framework asks for third-party risks and benefits to be monitored regularly, with pre-trained models watched as part of ordinary maintenance, which in a small company is one line in an annual review rather than a programme.',
          },
          {
            type: 'p',
            text: 'When a workflow becomes central enough that switching cost is a board-level question, that is usually the point to consider building a product around it. Our [Custom AI Platforms](/systems/custom-ai-platforms) work is designed with that separation in mind, with portability and handover agreed as part of the scope rather than discovered at renewal.',
          },
        ],
      },
    ],
    limitations: [
      'Portability has a price. An abstraction layer, exports and a maintained evaluation set all take effort, and a small workflow may not justify them.',
      'No design removes dependency. Even self-hosted models rely on hardware, libraries and people, and switching still costs weeks.',
      'Contract terms depend on your bargaining position. A small buyer may not change a standard agreement, though asking still tells you what you are dealing with.',
      'Models are not drop-in replacements. The same prompts can behave differently on another provider, which is why the evaluation set matters more than the interface.',
    ],
    faqs: [
      {
        q: 'What is AI vendor lock-in?',
        a: 'It is the cost of moving away from a provider once you depend on it: rebuilding workflows, exporting or recreating data, retraining people and accepting the risk of a period where the system is worse. It comes from model APIs, platforms, data formats, prompts held in a console, embeddings tied to one model and the contract itself.',
      },
      {
        q: 'How do we avoid getting locked into one AI provider?',
        a: 'You cannot avoid dependency entirely, but you can keep the valuable parts in your own hands: source documents, an evaluation set of real cases, prompts and workflow definitions in your own repository, exported logs and a documented configuration. Route model calls through one internal interface so a change of provider touches one place rather than every integration.',
      },
      {
        q: 'Is it always better to build rather than buy?',
        a: 'No. Building shifts the dependency rather than removing it, and adds operating work your team has to carry. Buying is often right for common workflows and for speed. Build when the workflow is genuinely specific to your business, the volume justifies it, and you can maintain what you make.',
      },
      {
        q: 'What should be in an AI vendor exit clause?',
        a: 'Return of your data in a documented format within a stated period, deletion afterwards including logs and derived copies, clarity on who owns prompts and anything tuned on your data, notice periods for price and model changes, sub-processor and location transparency, and what happens if a model you depend on is retired.',
      },
      {
        q: 'Do embeddings and vector databases create lock-in?',
        a: 'They can, because vectors are produced by a particular model and are not portable to another one. The practical protection is to keep the source documents and the pipeline that produced the index, so it can be rebuilt with a different model. Treat the index as a derived artefact, never as your only copy.',
      },
    ],
    bybo: [
      {
        href: '/systems/custom-ai-platforms',
        label: 'Custom AI Platforms',
        why: 'Explains how BYBO separates your product from its model providers, with portability and handover agreed in the scope.',
      },
      {
        href: '/blueprint',
        label: 'AI Opportunity Blueprint',
        why: 'A paid diagnostic that decides what is worth building before you commit to a platform or provider.',
      },
      {
        href: '/how-we-work',
        label: 'How we work',
        why: 'Shows how ownership, operating arrangements and handover are agreed through diagnosis, build and operation.',
      },
    ],
    related: ['build-buy-or-integrate-ai', 'control-ai-operating-costs', 'ai-for-indian-msmes'],
    sources: [
      {
        title: 'Artificial Intelligence Risk Management Framework (AI RMF 1.0)',
        publisher: 'National Institute of Standards and Technology (NIST)',
        url: 'https://nvlpubs.nist.gov/nistpubs/ai/NIST.AI.100-1.pdf',
      },
      {
        title: 'India AI Governance Guidelines: Enabling Safe and Trusted AI Innovation',
        publisher: 'Ministry of Electronics and Information Technology, IndiaAI Mission',
        url: 'https://static.pib.gov.in/WriteReadData/specificdocs/documents/2025/nov/doc2025115685601.pdf',
      },
    ],
  },
];

export default guides;
