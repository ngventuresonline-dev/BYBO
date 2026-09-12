import type { Guide } from '../types';

const guides: Guide[] = [
  {
    slug: 'reduce-manual-data-entry',
    collection: 'business-operations',
    title: 'Reducing Manual Data Entry Without Creating New Operational Risk',
    seoTitle: 'Reduce Manual Data Entry Without New Operational Risk',
    description:
      'Where retyping happens, how to remove it with structured data, integrations, forms and extraction, and the controls that stop silent errors and bad master data.',
    dek:
      'Cutting out retyping is the easy half. The harder half is doing it without quietly corrupting your records: validation, confidence thresholds, sampling, reconciliation and a way back.',
    keywords: [
      'reduce manual data entry',
      'data entry automation',
      'automated data entry errors',
      'invoice data extraction India',
      'data quality controls',
      'master data management',
    ],
    publishedAt: '2026-09-11',
    visual: {
      kind: 'flow',
      title: 'Fewer keystrokes, same checks',
      steps: ['Capture once', 'Validate against rules', 'Unsure reads wait', 'A person decides', 'Post and reconcile'],
      gate: 3,
      gateLabel: 'A named reviewer sees the source',
    },
    summary: [
      'Retyping grows at the joins between tools: email to spreadsheet, spreadsheet to accounting, portal to ERP, form to CRM.',
      'Prefer structured data you already receive, then integrations, then forms. Use extraction only where the document is the only source.',
      'Automated entry fails quietly. Validation, confidence thresholds, sampling and reconciliation turn silent errors into visible exceptions.',
      'Count errors and rework on real records before you change anything, then measure the same way afterwards.',
    ],
    sections: [
      {
        id: 'where-retyping-happens',
        heading: 'Where does manual data entry actually happen?',
        blocks: [
          {
            type: 'p',
            text: 'Nobody decides to do manual data entry. It grows at the joins between tools. A supplier emails a purchase order. Someone types it into a spreadsheet to check stock, types it again into the accounting software, then adds the buyer to the CRM so the sales team can see the account. Each step takes four minutes. Together they are a full-time job that creates no new information, only copies of information you already had, each copy with its own chance of a mistake.',
          },
          {
            type: 'table',
            caption: 'Where the same data gets typed twice',
            head: ['Handover', 'What gets retyped', 'What breaks'],
            rows: [
              ['Email to spreadsheet', 'Order lines, quantities, rates', 'A wrong quantity nobody notices'],
              ['Spreadsheet to accounting', 'Invoice header and taxes', 'Totals that will not reconcile'],
              ['Portal to ERP', 'Marketplace and buyer orders', 'Two records for one order'],
              ['Form to CRM', 'Contact and company details', 'Three versions of one customer'],
              ['Chat to anywhere', 'Photographs of documents', 'Details that stay in a chat'],
            ],
          },
          {
            type: 'p',
            text: 'Begin by finding these joins, not by shopping for software. Take one ordinary week and mark every point where a person reads something on one screen and types it into another. Write down how long it takes, how often it happens and what goes wrong when it is wrong. That list is your work queue, ordered by volume and by what a mistake there would cost.',
          },
        ],
      },
      {
        id: 'ways-to-remove-it',
        heading: 'What are the options for removing retyping?',
        blocks: [
          {
            type: 'p',
            text: 'There are five responses, and they are not equally good. Work down the list. The higher options are cheaper, more reliable and easier to explain to an auditor.',
          },
          {
            type: 'list',
            ordered: true,
            items: [
              'Use structured data that already exists. If the information arrived in a machine-readable form, never re-enter it from a printout.',
              'Connect the systems. A supported integration between two tools you already pay for beats any clever workaround.',
              'Replace attachments with a form. If you are asking people for details, ask in fields you control, not in the body of an email.',
              'Extract from documents. Where the document is the only source, read the fields with software and check them before they land.',
              'Leave it alone. Rare, complicated, high-consequence entries are often cheaper and safer to keep with a person.',
            ],
          },
          {
            type: 'p',
            text: 'The first option is easy to miss in India, because the structured version is often already there. Under the GST e-invoice system, businesses continue to raise invoices in their own billing or accounting software and report them to an Invoice Registration Portal, which returns a digitally signed file carrying an Invoice Reference Number and a QR code, in a notified standard schema. [GSTN’s overview of the system](https://www.gstn.org.in/assets/mainDashboard/Pdf/GST%20e-invoice%20System%20-%20Overview%20-%20Version%20Dt.%2029-5-2020.pdf) lists one-time reporting of business-to-business invoice data and a substantial reduction in transcription errors among the benefits, since the same data reaches the tax department and the buyer’s purchase register. Where your suppliers issue e-invoices, that file is a better input than the PDF somebody prints and retypes.',
          },
          {
            type: 'note',
            tone: 'insight',
            title: 'The cheapest extraction is the one you avoid',
            text: 'Before teaching software to read a document, ask whether the sender can give you the same data as a file, a form entry or a portal download. Receiving data is always easier than reading it.',
          },
        ],
      },
      {
        id: 'new-risks',
        heading: 'What new risks appear once the typing stops?',
        blocks: [
          {
            type: 'p',
            text: 'Manual entry fails loudly. The person who typed it usually spots the mistake, or the colleague checking the batch does. Automated entry fails differently: quickly, consistently and quietly. One wrong rule reaches two thousand records before anyone looks, and everything downstream inherits it: stock positions, tax filings, supplier payouts, the Monday report.',
          },
          {
            type: 'list',
            items: [
              'Silent errors: a field read correctly but placed in the wrong column, or a date read as day-month when it was month-day.',
              'Duplicates: the same invoice posted twice because a retry looked like a new document.',
              'Wrong master data: a second supplier account created because the name was spelt differently.',
              'Permission creep: a connection given wide access because narrow access was harder to configure.',
              'Over-trust: people stop checking, because the system is usually right.',
            ],
          },
          {
            type: 'note',
            tone: 'caution',
            title: 'Confident and wrong is the dangerous combination',
            text: 'NIST’s [profile for generative AI](https://nvlpubs.nist.gov/nistpubs/ai/NIST.AI.600-1.pdf) describes confabulation as the production of confidently stated but erroneous content, and automation bias as excessive deference to automated systems. An extracted value never sounds unsure. That is precisely why sampling and reconciliation earn their place.',
          },
        ],
      },
      {
        id: 'controls',
        heading: 'Which controls keep automated entry honest?',
        blocks: [
          {
            type: 'p',
            text: 'Controls are not a layer you add after launch. They are the reason the workflow can run at all without a person reading every record. Five cover most of the risk, and each needs a decision from the business, not from whoever configures the tool.',
          },
          {
            type: 'table',
            caption: 'Five controls worth agreeing in advance',
            head: ['Control', 'What it does', 'What you must decide'],
            rows: [
              ['Validation', 'Rejects impossible values', 'Which fields must match a record'],
              ['Confidence threshold', 'Sends unsure reads to a person', 'The level, and who reviews'],
              ['Sampling', 'Checks a share of clean records', 'How many, how often, by whom'],
              ['Reconciliation', 'Compares totals with the source', 'Which totals, at what interval'],
              ['Rollback', 'Reverses a bad batch', 'How a run is identified and undone'],
            ],
          },
          {
            type: 'p',
            text: 'Validation is the cheapest control and the most neglected. A tax registration number has a format. A quantity is not negative. An invoice date is not in the future. A purchase order number either exists in your records or it does not. Most silent errors die here, before they reach a ledger. Confidence thresholds only help if unsure records go somewhere real: a named reviewer, with the original document beside the extracted fields, who can approve, correct or reject on one screen. Each correction is also evidence, so keep the corrected cases and use them to test the next change.',
          },
          {
            type: 'p',
            text: 'Reconciliation catches what the other controls missed. Once a day or once a week, compare counts and totals between the source and the destination. If the inbox received forty-four supplier invoices and the accounting software holds forty-two, something is stuck, and you want to know that on Tuesday rather than at month-end. Our [Infrastructure & Governance](/systems/ai-infrastructure-governance) work covers this side of a build: access limits, activity records, monitoring and a rehearsed way back when a run goes wrong.',
          },
        ],
      },
      {
        id: 'master-data',
        heading: 'Why does master data need stricter rules than transactions?',
        blocks: [
          {
            type: 'p',
            text: 'A wrong transaction can be corrected. Wrong master data spreads. A customer, supplier, item or ledger account created by mistake attaches itself to invoices, payments and reports for months, and splits your history in two. Anything that automates entry should be free to read master data and almost never allowed to change it.',
          },
          {
            type: 'list',
            items: [
              'Match incoming names against existing records, and send near-matches to a person instead of creating a new account.',
              'Never let a workflow create a supplier, customer or item record on its own.',
              'Put bank details, tax registration numbers, credit limits and addresses behind approval, always.',
              'Give each master list one owner who can say what a valid record looks like.',
            ],
          },
          {
            type: 'example',
            title: 'Illustrative example: a Nashik components supplier’s vendor list',
            text: 'Suppose a components supplier automates purchase invoice entry. The first month goes well, until a vendor sends an invoice under a slightly different trading name. The workflow creates a second vendor account, and payments split across the two. Nothing looks wrong on any single screen: both accounts are real, both carry invoices, both get paid. The problem surfaces at the quarterly supplier review, when neither account matches the negotiated volume discount. The rule changes after that. Unmatched vendor names never create an account; they wait in a queue the accounts head clears each morning, usually in ten minutes.',
          },
          {
            type: 'p',
            text: 'Some of these fields are personal data, and accuracy is then more than an operational matter. India’s [Digital Personal Data Protection Act, 2023](https://www.meity.gov.in/static/uploads/2024/06/2bf1f0e9f04e6fb4f8fef35e82c42aa5.pdf) provides that where personal data is likely to be used to make a decision affecting the person, or to be disclosed to another data fiduciary, the organisation processing it shall ensure its completeness, accuracy and consistency. A mis-read address on a delivery record, or a wrong bank account on a payout, is that obligation meeting a real workflow.',
          },
          {
            type: 'note',
            tone: 'caution',
            title: 'General information, not legal advice',
            text: 'This describes a public statute in general terms and is not advice on your situation. Obligations under the data protection framework commence in phases, so check the current text and take qualified advice before relying on any of it.',
          },
        ],
      },
      {
        id: 'measuring',
        heading: 'How do you measure error rates before and after?',
        blocks: [
          {
            type: 'p',
            text: 'You cannot claim fewer errors if nobody counted the old ones. Take a baseline before anything changes. Pull two hundred recent records of the kind you plan to automate, check each against its source document, and note what was wrong, how it was found and how long the correction took. It is a dull afternoon that saves a year of argument: manual entry is rarely as accurate as a team assumes.',
          },
          {
            type: 'table',
            caption: 'A baseline you can repeat afterwards',
            head: ['Measure', 'How to take it', 'Trap to avoid'],
            rows: [
              ['Error rate', 'Sample records against the source', 'Counting only errors you caught'],
              ['Rework rate', 'Time spent fixing posted records', 'Rework hidden inside month-end'],
              ['Cycle time', 'Arrival to posted record', 'An average hiding the slow tail'],
              ['Exception share', 'Records that needed a person', 'A threshold tuned to look good'],
            ],
          },
          {
            type: 'p',
            text: 'Then measure the same way after launch, on the same kind of records. NIST’s [AI Risk Management Framework](https://nvlpubs.nist.gov/nistpubs/ai/NIST.AI.100-1.pdf) asks that system performance criteria be measured and demonstrated for conditions similar to the deployment setting, and that the measures themselves be documented. In plain terms: test with your difficult documents rather than your clean ones, write down how you measured, and keep the method stable so the comparison means something. [How to measure whether an AI system is actually working](/insights/measure-ai-system-performance) goes further into that habit.',
          },
        ],
      },
      {
        id: 'where-to-start',
        heading: 'What is a sensible first project?',
        blocks: [
          {
            type: 'p',
            text: 'Pick one join, not one department. A single document type, one destination system, one owner. Enough volume for the effort to matter, and a low enough consequence that an early mistake is embarrassing rather than expensive.',
          },
          {
            type: 'list',
            ordered: true,
            items: [
              'Choose the join with the most repeated typing and the clearest rules.',
              'Take the baseline: error rate, rework, cycle time and volume.',
              'Check whether structured data or an integration removes the typing entirely.',
              'If extraction is needed, test it on your worst documents, not your best.',
              'Agree the validation rules, the confidence threshold, the reviewer and the sample size.',
              'Run both ways for two weeks, reconcile daily, then switch and keep sampling.',
            ],
          },
          {
            type: 'p',
            text: 'Our [Business Operations](/systems/document-multimodal-intelligence) work is built around that shape: read the document, check the details against your records, send exceptions to a person with the evidence attached, and update the approved destination only when the record is sound. If invoices and purchase orders are your busiest join, [how AI can help businesses process invoices and purchase orders](/insights/ai-invoice-purchase-order-processing) covers that case in more detail.',
          },
        ],
      },
    ],
    limitations: [
      'At low volumes the review, sampling and reconciliation work can cost more than the typing it removes. Count the whole cost, not the keystrokes.',
      'Extraction quality depends on the documents. Poor scans, handwriting and inconsistent layouts need more review, sometimes permanently.',
      'Integrations are limited by what your software allows. Some tools offer no supported route in, and workarounds that read screens break on the next update.',
      'Automation does not settle a disputed process. If three teams disagree about what a record should contain, a faster pipeline only spreads the disagreement.',
    ],
    faqs: [
      {
        q: 'How do we reduce manual data entry without losing accuracy?',
        a: 'Remove the typing and add the checks in the same change. Take structured data where it already exists, connect systems where you can, and use extraction only where a document is the only source. Then agree validation rules, a confidence threshold that routes unsure records to a named reviewer, a daily or weekly reconciliation, and a sample of clean records checked by a person.',
      },
      {
        q: 'Is data extraction from invoices accurate enough to post automatically?',
        a: 'For clean, repeating layouts with strong validation, often yes. For mixed suppliers, poor scans or handwritten notes, plan for a review step that never fully disappears. The practical answer comes from testing on your own worst documents and measuring the error rate against the source, not from a vendor accuracy figure taken on somebody else’s paperwork.',
      },
      {
        q: 'What is the biggest risk when you automate data entry?',
        a: 'Errors nobody sees. Manual mistakes are caught because a person made them and a person checks. Automated mistakes are consistent, fast and quiet, so they reach hundreds of records before anyone notices. Duplicates and corrupted master data are the expensive versions, which is why reconciliation, sampling and strict rules around supplier and customer records matter more than raw extraction accuracy.',
      },
      {
        q: 'Should we start with integrations or document extraction?',
        a: 'Integrations first, wherever they exist. A supported connection between two systems moves data with no reading step, so there is nothing to misread. Extraction is for documents that arrive as documents, from parties who will not change how they send them. Many teams buy extraction for a problem that a form, a portal download or an existing connector would have solved.',
      },
      {
        q: 'How do we measure whether it worked?',
        a: 'Compare like with like. Before you change anything, sample recent records against their sources and record the error rate, rework time and cycle time. After launch, repeat the same sampling on the same document types. Add the share of records that needed a person, and the cost of running the workflow, so a fall in typing is not quietly paid for by a rise in review.',
      },
    ],
    bybo: [
      {
        href: '/systems/document-multimodal-intelligence',
        label: 'Business Operations',
        why: 'How BYBO turns incoming documents into checked records, with exceptions routed to a person.',
      },
      {
        href: '/systems/ai-infrastructure-governance',
        label: 'Infrastructure & Governance',
        why: 'Access limits, activity records, monitoring and recovery for workflows that write into your systems.',
      },
      {
        href: '/blueprint',
        label: 'AI Opportunity Blueprint',
        why: 'A paid diagnostic that maps a workflow, tests readiness and decides what is worth building.',
      },
    ],
    related: ['document-automation-workflow', 'measure-ai-system-performance', 'identify-repetitive-work-to-automate'],
    sources: [
      {
        title: 'GST e-invoice / IRN System: Detailed Overview',
        publisher: 'Goods and Services Tax Network (GSTN)',
        url: 'https://www.gstn.org.in/assets/mainDashboard/Pdf/GST%20e-invoice%20System%20-%20Overview%20-%20Version%20Dt.%2029-5-2020.pdf',
      },
      {
        title: 'Artificial Intelligence Risk Management Framework: Generative Artificial Intelligence Profile (NIST AI 600-1)',
        publisher: 'National Institute of Standards and Technology (NIST)',
        url: 'https://nvlpubs.nist.gov/nistpubs/ai/NIST.AI.600-1.pdf',
      },
      {
        title: 'Artificial Intelligence Risk Management Framework (AI RMF 1.0)',
        publisher: 'National Institute of Standards and Technology (NIST)',
        url: 'https://nvlpubs.nist.gov/nistpubs/ai/NIST.AI.100-1.pdf',
      },
      {
        title: 'The Digital Personal Data Protection Act, 2023 (No. 22 of 2023)',
        publisher: 'Ministry of Electronics and Information Technology, Government of India',
        url: 'https://www.meity.gov.in/static/uploads/2024/06/2bf1f0e9f04e6fb4f8fef35e82c42aa5.pdf',
      },
    ],
  },
  {
    slug: 'internal-knowledge-system',
    collection: 'business-operations',
    title: 'How to Build an Internal Knowledge System Employees Can Trust',
    seoTitle: 'Build an Internal Knowledge System Staff Can Trust',
    description:
      'How to build an internal knowledge system staff trust: answers grounded in approved sources with citations, permissions that follow your own, owners and honest gaps.',
    dek:
      'An internal knowledge system earns trust by showing its evidence, respecting the permissions people already have, keeping each source owned and current, and saying plainly when it does not know.',
    keywords: [
      'internal knowledge system',
      'internal knowledge base AI',
      'enterprise knowledge management',
      'AI answers with citations',
      'knowledge base access control',
      'employee self-service knowledge',
    ],
    publishedAt: '2026-09-11',
    visual: {
      kind: 'checklist',
      title: 'What a trustworthy answer shows',
      items: [
        'The source document it used',
        'When that source was last reviewed',
        'Who owns the source',
        'Only what the asker may already see',
        'A clear gap when evidence is missing',
        'A route to the person who knows',
      ],
    },
    summary: [
      'Trust comes from predictable behaviour: grounded answers, visible sources, permissions that match your own, and an honest “I do not know”.',
      'Give every source an owner and a review date. A knowledge system inherits the quality of the catalogue behind it.',
      'Measure with a set of real questions, including ones the system should refuse to answer.',
      'Keep judgement, negotiation history and exceptions with colleagues. The system should route those, not attempt them.',
    ],
    sections: [
      {
        id: 'what-trust-means',
        heading: 'What makes staff trust an internal knowledge system?',
        blocks: [
          {
            type: 'p',
            text: 'Trust is not built by clever answers. It is built by predictable behaviour. A service engineer asks what the warranty covers on an industrial unit sold in Kerala last year, and gets a short answer, the clause it came from, the date that document was last reviewed and the name of the person who owns it. She can check in ten seconds. She stops checking after a few weeks, because every time she checked, it held.',
          },
          {
            type: 'p',
            text: 'Trust is lost in one incident. An assistant states a discount policy that expired in March, someone repeats it to a customer, and the whole team goes back to asking a colleague on chat. That is the real competition for an internal knowledge system: not a search box, but the two people everybody messages because they always know.',
          },
          {
            type: 'list',
            items: [
              'Grounded: every answer comes from a document your business approved, not from the model’s general knowledge.',
              'Permissioned: nobody sees through the assistant what they could not open directly.',
              'Current: each source has an owner, a review date and one live version.',
              'Honest: when the evidence is missing or contradictory, it says so and points to a person.',
            ],
          },
        ],
      },
      {
        id: 'grounded-answers',
        heading: 'Why must every answer come from an approved source?',
        blocks: [
          {
            type: 'p',
            text: 'A language model knows a great deal about the world and nothing about your credit terms. The useful pattern is narrow: take the question, find the passages that might answer it in your own approved material, answer from those passages only, and show which ones were used. Where nothing relevant is found, the honest output is a gap, not a fluent paragraph assembled from general knowledge.',
          },
          {
            type: 'p',
            text: 'This matters because the failure looks like a success. NIST’s [profile for generative AI](https://nvlpubs.nist.gov/nistpubs/ai/NIST.AI.600-1.pdf) describes confabulation as the production of confidently stated but erroneous content. The same document sets out what high-integrity information looks like: it distinguishes fact from opinion, acknowledges uncertainties, and can be linked to the original source with appropriate evidence. That is a fair specification for an internal answer, and it is why the citation is not decoration.',
          },
          {
            type: 'note',
            tone: 'insight',
            title: 'A citation is a link people actually open',
            text: 'A footnote naming a policy is not enough. The citation should open the document at the right section, so checking takes seconds. If checking is slow, nobody checks, and the system trains people to accept whatever it says.',
          },
        ],
      },
      {
        id: 'access-control',
        heading: 'How should access follow the permissions you already have?',
        blocks: [
          {
            type: 'p',
            text: 'The rule is simple to state and easy to break: a person should never learn through the assistant anything they could not open for themselves. Break it once with a salary band or a partner contract, and the system becomes a liability rather than a service.',
          },
          {
            type: 'list',
            items: [
              'Check permissions when the question is asked, against the asker’s own identity and current rights.',
              'Do not rely on filtering at the end. If a restricted passage reaches the answer, it has already been read.',
              'Test with a real restricted document and a real restricted account before launch, then again after every change.',
              'Record who asked what and which sources were used, and agree who reviews those records.',
              'Remember that a summary can leak what the file did not: figures, names and terms all travel.',
            ],
          },
          {
            type: 'p',
            text: 'Our [Enterprise Knowledge](/systems/enterprise-knowledge-systems) work treats access rules as part of the design rather than a setting: permissions are verified during retrieval, and restricted material is tested to confirm it stays restricted. For the wider question of what any AI system should be allowed to reach, [how to introduce AI without giving it uncontrolled access](/insights/introduce-ai-without-uncontrolled-access) is the companion piece.',
          },
        ],
      },
      {
        id: 'owners-and-freshness',
        heading: 'Who owns each source, and how does it stay current?',
        blocks: [
          {
            type: 'p',
            text: 'A knowledge system inherits the quality of the catalogue behind it. Before indexing anything, list the sources you are prepared to stand behind and give each one an owner, a review rhythm and a status. Everything else stays out. A folder called “Old_Final_v3” is not a source; it is a trap you have chosen to publish.',
          },
          {
            type: 'table',
            caption: 'A source register your team can maintain',
            head: ['Source', 'Owner', 'Review'],
            rows: [
              ['Price list and discount policy', 'Sales head', 'Monthly'],
              ['Standard operating procedures', 'Process owner', 'Quarterly'],
              ['HR and leave policies', 'HR lead', 'Twice a year'],
              ['Product specifications', 'Product manager', 'On every change'],
              ['Client commercial terms', 'Account owner', 'On renewal'],
            ],
          },
          {
            type: 'p',
            text: 'Then remove the duplicates. If three versions of the leave policy sit in three folders, the system will cite one of them, and it may not be the one that is in force. One live version, dated, with older copies clearly archived, does more for answer quality than any change to the software. The [India AI Governance Guidelines](https://static.pib.gov.in/WriteReadData/specificdocs/documents/2025/nov/doc2025115685601.pdf) published by MeitY put “People First” and “Understandable by Design” among their seven guiding principles, asking for human oversight and for disclosures the intended user can understand. In an internal system that means a person owns each source, and the answer shows enough for the reader to judge it.',
          },
        ],
      },
      {
        id: 'gaps-and-not-knowing',
        heading: 'What should it do when the answer is not there?',
        blocks: [
          {
            type: 'p',
            text: 'Saying “I could not find this in our approved sources” is the most valuable sentence an internal system can produce. It protects the reader, and it produces something useful: a list of what your documentation is missing, ranked by how often people ask. Route each gap to the owner of the nearest source, with the original question attached, and review the queue on a fixed day.',
          },
          {
            type: 'example',
            title: 'Illustrative example: a Kochi logistics firm’s internal helpdesk',
            text: 'Suppose a logistics company puts a knowledge assistant in front of its operations team. In the first month, a third of questions come back as gaps. Two patterns stand out: nobody has written down the documents required for a particular port, and the detention charge policy exists only in a manager’s head. The operations head writes the first as a one-page procedure and asks the manager to dictate the second, which is then edited and approved. Gap rates fall over the next two months, not because the software improved, but because the company wrote down what it already knew.',
          },
          {
            type: 'p',
            text: 'Contradictions deserve the same treatment. When two approved documents disagree, the useful behaviour is to show both and flag the conflict, not to pick a winner quietly. Somebody then has to decide which is right, which is exactly the work that keeps a knowledge base alive.',
          },
        ],
      },
      {
        id: 'measuring-quality',
        heading: 'How do you measure whether the answers are good?',
        blocks: [
          {
            type: 'p',
            text: 'Build an evaluation set from real questions your team has actually asked, with answers agreed by the people who know the work. Include awkward cases: questions with no approved answer, questions where two documents conflict, and questions the asker is not allowed to have answered. A set of fifty to a hundred questions is enough to see whether a change helped or hurt.',
          },
          {
            type: 'list',
            items: [
              'Source-supported rate: answers that cite a source the reviewer accepts as relevant.',
              'Correctness on the evaluation set, graded by a person who knows the subject.',
              'Refusal quality: whether it declined the questions it should have declined.',
              'Time to a usable answer, compared with the old habit of asking a colleague.',
              'Gap closure: how long a reported gap waits before its owner fixes the source.',
              'Repeat use: whether the same people come back next week without being told to.',
            ],
          },
          {
            type: 'p',
            text: 'NIST’s [AI Risk Management Framework](https://nvlpubs.nist.gov/nistpubs/ai/NIST.AI.100-1.pdf) asks that performance criteria be measured and demonstrated for conditions similar to the deployment setting, that the measures be documented, and that people who were not front-line developers of the system take part in regular assessment. In a small company that can be one experienced colleague reviewing twenty answers a month. The habit matters more than the scale.',
          },
        ],
      },
      {
        id: 'ask-a-person',
        heading: 'Where should people still ask a colleague?',
        blocks: [
          {
            type: 'p',
            text: 'A knowledge system is good at what has been written down and agreed. It is poor at everything a document cannot hold: why a client was given an exception two years ago, how a regulator responded last time, whether this customer will accept a delay. Name those areas openly, so people do not learn the boundary by being let down.',
          },
          {
            type: 'list',
            items: [
              'Judgement calls: pricing exceptions, credit decisions, whether to accept a return.',
              'Anything with a legal, safety or clinical consequence.',
              'History and relationships: what was promised, and by whom.',
              'Situations where the document is silent, ambiguous or out of date.',
              'New situations nobody has faced yet, which is where your next SOP comes from.',
            ],
          },
          {
            type: 'p',
            text: 'The system should hand these over rather than attempt them, naming the person or role to ask. That is also the bridge to the next piece of work: turning what those colleagues know into documents worth citing. [AI for SOPs, policies and institutional knowledge](/insights/ai-for-sops-policies-knowledge) covers how to capture and maintain the sources this system depends on.',
          },
        ],
      },
    ],
    limitations: [
      'A knowledge system cannot improve documents it is not allowed to read, and it will not compensate for material that was never written down.',
      'Permission checks are only as good as the permissions themselves. If your shared drive is open to everyone, the assistant will be too.',
      'Citations show where an answer came from, not that the source is correct. A confidently wrong policy document produces confidently wrong answers.',
      'Adoption is a habit, not a launch. Teams return to messaging a colleague unless the system is faster and has been right the last few times.',
    ],
    faqs: [
      {
        q: 'How is an internal knowledge system different from a search tool?',
        a: 'Search returns documents and leaves the reading to you. A knowledge system answers the question in a sentence or two, from approved material, and shows the passage it used so you can check. The difference matters most for people who are busy or new, who often cannot tell which of eleven results is the current version of a policy.',
      },
      {
        q: 'Will it expose confidential documents to the wrong staff?',
        a: 'It should not, and this is the part to test rather than assume. Permissions must be checked when the question is asked, against the person asking, so restricted material never reaches the answer. Before launch, try a restricted document with an account that should not see it, and repeat that test after every change to sources or access rules.',
      },
      {
        q: 'How do we stop it giving outdated answers?',
        a: 'Give every source an owner, a review date and a single live version, and archive the rest so they cannot be cited. Show the review date beside the answer. Where a policy changes on a known date, plan the update as part of the change, not afterwards. Most stale answers are stale documents, not a fault in the software.',
      },
      {
        q: 'What should the system do when it cannot find an answer?',
        a: 'Say so plainly, name the nearest owner or team to ask, and log the question as a gap. Withholding an answer is a feature: it keeps people from repeating something invented. The gap list is also the most useful documentation roadmap you will get, because it is ordered by what your team actually needs.',
      },
      {
        q: 'How many documents do we need before starting?',
        a: 'Fewer than most teams expect. One team, one subject area and the sources that team already trusts is a better start than an attempt to index everything. Narrow scope makes the answers better, the permissions simpler and the review manageable. Widen it once the first group uses the system without being reminded.',
      },
    ],
    bybo: [
      {
        href: '/systems/enterprise-knowledge-systems',
        label: 'Enterprise Knowledge',
        why: 'How BYBO builds answers that cite their sources, respect permissions and route gaps to owners.',
      },
      {
        href: '/systems/ai-infrastructure-governance',
        label: 'Infrastructure & Governance',
        why: 'The access rules, activity records and review habits behind a knowledge system people can trust.',
      },
      {
        href: '/how-we-work',
        label: 'How we work',
        why: 'Where named owners, measured baselines and human review fit into a BYBO build.',
      },
    ],
    related: ['ai-for-sops-policies-knowledge', 'introduce-ai-without-uncontrolled-access', 'ai-for-professional-services'],
    sources: [
      {
        title: 'Artificial Intelligence Risk Management Framework: Generative Artificial Intelligence Profile (NIST AI 600-1)',
        publisher: 'National Institute of Standards and Technology (NIST)',
        url: 'https://nvlpubs.nist.gov/nistpubs/ai/NIST.AI.600-1.pdf',
      },
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
  {
    slug: 'ai-for-sops-policies-knowledge',
    collection: 'business-operations',
    title: 'AI for SOPs, Policies and Institutional Knowledge',
    description:
      'How to capture what experienced staff know, turn it into SOPs and policies that stay current, and use AI to draft and refresh them with a named approver.',
    dek:
      'Most institutional knowledge lives in a few people’s heads. AI can help turn it into procedures worth following, provided a person owns each document and approves every version.',
    keywords: [
      'AI for SOPs',
      'standard operating procedures AI',
      'institutional knowledge capture',
      'policy management AI',
      'document version control SOP',
      'onboarding and training documentation',
    ],
    publishedAt: '2026-09-11',
    visual: {
      kind: 'layers',
      title: 'How a procedure stays alive',
      layers: [
        { label: 'What people do', note: 'The real process, still unwritten' },
        { label: 'Captured', note: 'Recorded walkthroughs and real cases' },
        { label: 'Drafted', note: 'A first version in your template' },
        { label: 'Approved', note: 'One named person signs it off' },
        { label: 'Maintained', note: 'Dated, owned, reviewed on change' },
      ],
    },
    summary: [
      'Written procedures drift from real work. The gap shows up as inconsistency, rework and dependence on two or three people.',
      'Ask experienced staff to correct a draft rather than write one. Correcting is faster and produces a better document.',
      'AI can draft, refresh, summarise and translate procedures. A named person approves every version before it is published.',
      'Version, date and owner should travel with the document, so an answer taken from it can be trusted later.',
    ],
    sections: [
      {
        id: 'why-sops-go-stale',
        heading: 'Why do SOPs stop matching how the work is really done?',
        blocks: [
          {
            type: 'p',
            text: 'Most companies have two procedures for everything. There is the written one, produced for a certification, a client audit or an investor, and there is the real one, which lives in the hands of the people doing the work. The written version was accurate on the day it was signed. Then a portal changed, a tax rule changed, a large customer insisted on a different label, and the real process moved on without telling the document.',
          },
          {
            type: 'p',
            text: 'The cost is easy to see once you look for it. New joiners learn from whoever sits closest, so two branches handle the same case differently. Nobody can cover for a colleague on leave. When someone with fifteen years of context resigns, a month of notice is not enough to get it out of their head, and the knowledge leaves with them. This is institutional knowledge: valuable, entirely undocumented and completely invisible on a balance sheet.',
          },
          {
            type: 'note',
            tone: 'insight',
            title: 'The real SOP is whatever people actually do',
            text: 'Start from the work, not from the folder. If the written procedure and the practice disagree, assume the practice has a reason, find out what it is, and then decide which one should change.',
          },
        ],
      },
      {
        id: 'capturing-tacit-knowledge',
        heading: 'How do you get what experienced staff know out of their heads?',
        blocks: [
          {
            type: 'p',
            text: 'Asking your best dispatch supervisor to “write the SOP” usually fails. Writing is a separate skill, it competes with a full day of work, and the parts they know so well that they no longer notice them are exactly the parts a newcomer needs. Talking is easier than writing, and correcting a draft is easier still.',
          },
          {
            type: 'list',
            ordered: true,
            items: [
              'Record a thirty-minute walkthrough while they do the task, narrating what they check and why.',
              'Follow one real case end to end, including a messy one, rather than the ideal version.',
              'Capture exceptions as they happen. When someone handles a case unusually, ask that day why.',
              'Harvest what already exists: the long chat answers, the email they resend every week, the notebook checklist.',
              'Interview two people who do the job differently. The disagreement is the interesting part.',
            ],
          },
          {
            type: 'p',
            text: 'AI helps with the tedious middle. A recording becomes a transcript, the transcript becomes a first draft in your own template, and the draft comes with a list of the questions it could not answer: which system the record is created in, who approves the exception, what happens on a holiday. The supervisor then spends twenty minutes correcting a draft instead of a week failing to start a blank page.',
          },
        ],
      },
      {
        id: 'what-ai-can-draft',
        heading: 'What can AI safely draft, refresh or summarise?',
        blocks: [
          {
            type: 'p',
            text: 'Treat it as a drafting assistant with no authority. It can produce, compare and reformat text quickly. It cannot decide what your policy is, and it does not know which of two contradictory documents the business intends to follow.',
          },
          {
            type: 'table',
            caption: 'Drafting tasks and who signs them off',
            head: ['Task', 'What the system does', 'Who approves'],
            rows: [
              ['First draft', 'Turn a walkthrough into a procedure', 'The person interviewed'],
              ['Refresh', 'Mark passages a change affects', 'The process owner'],
              ['Summary', 'A one-page version for onboarding', 'The process owner'],
              ['Translation', 'A regional-language version', 'A fluent colleague'],
              ['Consistency check', 'List where documents disagree', 'The policy owner'],
            ],
          },
          {
            type: 'p',
            text: 'Every row ends with a name, and that is the point. NIST’s [profile for generative AI](https://nvlpubs.nist.gov/nistpubs/ai/NIST.AI.600-1.pdf) notes that organisational use of these systems may warrant additional human review, tracking and documentation, and greater management oversight. Its [parent framework](https://nvlpubs.nist.gov/nistpubs/ai/NIST.AI.100-1.pdf) asks for policies and procedures that define and differentiate roles and responsibilities for human oversight of AI systems. India’s own [AI governance guidelines](https://static.pib.gov.in/WriteReadData/specificdocs/documents/2025/nov/doc2025115685601.pdf) make a related point, calling for human-in-the-loop mechanisms at critical decision points so that outputs can be reviewed, overridden or supplemented by human judgement before they cause harm. For SOPs that becomes one sentence in your document control note: a generated draft stays a draft until the named approver signs the version.',
          },
          {
            type: 'note',
            tone: 'caution',
            title: 'Never let a draft publish itself',
            text: 'A generated procedure can read beautifully and describe a step your business does not perform. Approval is not a formality here. The approver should walk through the procedure once with the document open, in the place where the work happens.',
          },
        ],
      },
      {
        id: 'versioning-and-approval',
        heading: 'How should versions and approvals work?',
        blocks: [
          {
            type: 'p',
            text: 'Document control sounds like an audit word, and it is really just five fields. Any team can keep them, and without them nobody can tell which copy is real. If you already work to a quality standard, you will have most of this in place; the discipline matters more than the format.',
          },
          {
            type: 'list',
            items: [
              'One live version per procedure, with a version number and an effective date.',
              'A named owner who maintains it, and a named approver who signed it.',
              'A short change note saying what changed and why, in plain words.',
              'Superseded versions archived rather than deleted, so you can show what applied in March.',
              'A review date, plus a rule that a system change triggers a review immediately.',
            ],
          },
          {
            type: 'p',
            text: 'These fields also pay off later. When a procedure becomes a source for an internal assistant, the version and the review date should travel with any answer taken from it. That is how our [Enterprise Knowledge](/systems/enterprise-knowledge-systems) work is set up: source owners keep the content, and the answers show what was used and when it was last reviewed.',
          },
        ],
      },
      {
        id: 'keeping-policies-consistent',
        heading: 'How do you keep policies from contradicting each other?',
        blocks: [
          {
            type: 'p',
            text: 'Contradiction is the quiet failure of a growing document set. Each policy is fine on its own. Read together, the branch manual and the finance approval matrix say different things about who may approve what, and staff follow whichever they were shown first. Comparing documents is dull, mechanical work, which makes it a good use for a drafting assistant: it can list every place two documents disagree and quote both.',
          },
          {
            type: 'example',
            title: 'Illustrative example: a Jaipur retail chain’s discount approvals',
            text: 'Suppose a retail chain with eleven stores runs a consistency check across its store manual, finance policy and staff handbook. The check flags three conflicts. The most consequential is a discount limit: the store manual lets a manager approve up to one figure, while the finance policy requires head-office approval above a lower one. Both documents were approved, two years apart, by different people. The system does not resolve it. The two owners meet for twenty minutes, agree a single figure, and both documents are reissued with the same effective date and a change note. The other two conflicts turn out to be wording, not substance.',
          },
          {
            type: 'p',
            text: 'Run the comparison when any policy changes, and once a quarter across the whole set. Keep the output as a list a person works through, not as automatic edits. The value is in surfacing the disagreement early, while it is still a document problem rather than a customer complaint.',
          },
        ],
      },
      {
        id: 'training-and-onboarding',
        heading: 'How does this help training and onboarding?',
        blocks: [
          {
            type: 'p',
            text: 'Good procedures make a new joiner useful faster, and they make cover for leave possible. Once the documents are current and owned, a few small things help more than a training platform.',
          },
          {
            type: 'list',
            items: [
              'A reading path per role, in order, with the current version of each document.',
              'A one-page summary of each long procedure, approved by the same owner.',
              'Practice questions drafted from the procedure and checked by the owner.',
              'A short note to the team whenever a procedure changes, saying what is different.',
              'A record of who has read the current version, which also answers audit questions.',
            ],
          },
          {
            type: 'p',
            text: 'Keep the limits honest. Reading a procedure is not the same as being able to follow it under pressure with an annoyed customer on the line. Supervised practice, a buddy for the first weeks and a named person to ask are still the parts that make somebody competent. Documentation makes those conversations shorter; it does not replace them.',
          },
        ],
      },
      {
        id: 'how-this-differs',
        heading: 'How is this different from an internal knowledge assistant?',
        blocks: [
          {
            type: 'p',
            text: 'Two jobs sit side by side and are often confused. This one is about the source: capturing what people know, writing it down, approving it and keeping it current. The other is about the surface: answering everyday questions from those documents, with citations and permissions. [How to build an internal knowledge system employees can trust](/insights/internal-knowledge-system) covers the second in detail.',
          },
          {
            type: 'p',
            text: 'They depend on each other. An assistant sitting on a stale, contradictory document set will answer confidently and wrongly, and your team will stop using it within a month. A beautifully maintained set of procedures nobody can find at the moment they need one is only slightly better. Fix the sources first, then make them easy to reach, and give both halves the same owner so neither becomes somebody else’s problem.',
          },
        ],
      },
    ],
    limitations: [
      'A drafting assistant cannot decide policy. Where two documents disagree, or a rule has a legal consequence, a person has to choose and take responsibility.',
      'Generated procedures can be plausible and wrong, especially about steps that exist only inside a system your documents never described.',
      'Documentation does not create competence. Judgement under pressure comes from supervised practice, not from reading the current version.',
      'Regulated activities may set their own requirements for document control, approval and retention. Treat this as general practice, not compliance advice.',
      'If nobody is given time to own a document set, the tooling will not save it. Ownership is a workload question before it is a technology one.',
    ],
    faqs: [
      {
        q: 'Can AI write our SOPs for us?',
        a: 'It can write the draft, not the procedure. Give it a recorded walkthrough, an old document or a set of real cases, and it will produce something in your template within minutes, along with the questions it could not answer. What it cannot do is decide how your business works. A named owner corrects the draft and a named approver signs the version.',
      },
      {
        q: 'How do we capture knowledge from staff who are about to retire?',
        a: 'Record conversations rather than asking for written notes. Walk through real cases, including the exceptions they handle instinctively, and ask why at each decision point. Turn the transcripts into drafts, let them correct the drafts, and prioritise the tasks only they perform. Start with the work that stops when they are away, not with the easiest procedure to write.',
      },
      {
        q: 'How often should SOPs and policies be reviewed?',
        a: 'On a fixed cycle and on every trigger. A quarterly or half-yearly review suits most procedures, but the more important rule is that any change to a system, a rule or a supplier triggers a review of the documents it touches. Add a review date to each document, and make the owner accountable for it in the same way as any other task.',
      },
      {
        q: 'Who should approve a procedure written with AI?',
        a: 'The same person who would approve one written by hand: the owner of that process, named in the document. Approval should mean they have walked through the steps where the work happens, not that they skimmed a draft. Record who approved it, on what date and what changed, so a later question about which version applied has an answer.',
      },
      {
        q: 'Is it safe to put confidential policies into an AI tool?',
        a: 'It depends entirely on the tool and the agreement behind it. Check where the data goes, whether it is retained, whether it is used for training and who inside your organisation can reach the results. Use company-controlled accounts, keep personal data out of drafts that do not need it, and treat unapproved consumer tools as unsuitable for confidential material.',
      },
    ],
    bybo: [
      {
        href: '/systems/enterprise-knowledge-systems',
        label: 'Enterprise Knowledge',
        why: 'How BYBO keeps policies and SOPs usable, with source owners, review queues and answers that cite them.',
      },
      {
        href: '/insights/internal-knowledge-system',
        label: 'Internal knowledge systems',
        why: 'The other half: answering everyday questions from the documents you maintain here.',
      },
      {
        href: '/blueprint',
        label: 'AI Opportunity Blueprint',
        why: 'A paid diagnostic that maps a workflow, tests readiness and decides what is worth building.',
      },
    ],
    related: ['internal-knowledge-system', 'named-owner-for-ai-systems', 'ai-for-manufacturing-and-exports'],
    sources: [
      {
        title: 'Artificial Intelligence Risk Management Framework: Generative Artificial Intelligence Profile (NIST AI 600-1)',
        publisher: 'National Institute of Standards and Technology (NIST)',
        url: 'https://nvlpubs.nist.gov/nistpubs/ai/NIST.AI.600-1.pdf',
      },
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
