import type { Guide } from '../types';

const guides: Guide[] = [
  {
    slug: 'business-process-automation-india',
    collection: 'ai-systems',
    title: 'Business Process Automation in India: Where Should a Company Begin?',
    seoTitle: 'Business Process Automation in India: Where to Begin',
    description:
      'A practical starting point for business process automation in India: map the work, choose one recurring process, fix it, then decide what to automate.',
    dek:
      'Most automation projects are decided by the choice of process, not the technology. Here is how to map your work, pick one process, repair it and agree what a system should do.',
    keywords: [
      'business process automation India',
      'business process automation for Indian companies',
      'automate business processes',
      'workflow automation India',
      'where to start with automation',
      'process automation for MSMEs',
    ],
    publishedAt: '2026-09-11',
    visual: {
      kind: 'flow',
      title: 'Before you automate anything',
      steps: ['Map the work', 'Pick one process', 'Fix the process', 'Rules or AI', 'Owner and baseline', 'Run and review'],
      gate: 4,
      gateLabel: 'A named owner sets the baseline and the limits before launch',
    },
    summary: [
      'Business process automation is a decision about which process to change first, not about which tool to buy.',
      'Map the work from trigger to finished record, then choose one process with volume, writable rules and an owner.',
      'Repair the process before automating it. Rules handle structured work; a model earns its place on untidy input.',
      'Agree the integration points, the baseline and who reviews exceptions before anything goes live.',
    ],
    sections: [
      {
        id: 'what-it-means',
        heading: 'What does business process automation actually mean?',
        blocks: [
          {
            type: 'p',
            text: 'Business process automation means giving the repeatable parts of a recurring process to software: the copying, the checking, the chasing and the filing. The process stays yours. The judgement stays with your team. What changes is who does the clerical work in between, and how much of it happens without someone having to remember.',
          },
          {
            type: 'p',
            text: 'Most of it is not AI. A rule that files an enquiry into the right queue, a form that writes straight into your order system, a report that builds itself every Monday morning: that is automation, and it has been available for years. A model enters the picture when the input is untidy. A scanned delivery note. A customer message written half in Hindi and half in English. A contract nobody has opened since it was signed.',
          },
          {
            type: 'p',
            text: 'The hesitation most owners feel is reasonable. The Economic Survey 2025–26 chapter on [India’s AI ecosystem](https://www.indiabudget.gov.in/economicsurvey/doc/eschapter/echap14.pdf) notes considerable uncertainty about the capabilities and costs of AI, and describes enterprises that want to adopt it while avoiding being the ones who get it wrong. The way through is not a bigger tool. It is a smaller first question: which process, and why that one?',
          },
        ],
      },
      {
        id: 'map-the-work',
        heading: 'Where do you start? Map the work first.',
        blocks: [
          {
            type: 'p',
            text: 'You cannot automate a process nobody has written down. Before looking at software, watch the work as it is really done rather than as the process note describes it. Sit with the person doing it for a few hours. Note where they wait, what they retype, and what they do differently when a case is awkward.',
          },
          {
            type: 'list',
            ordered: true,
            items: [
              'The trigger: what starts the work, and through which channel it arrives.',
              'The unit of work: one invoice, one enquiry, one dispatch, one refund.',
              'The steps in order, with the name of whoever does each one.',
              'The systems touched along the way, and what is typed into each.',
              'The waiting: where a case sits, for how long, and whose approval it needs.',
              'The exceptions: the cases that break the pattern, and how often they arrive.',
              'The finish: the record, message or payment that means the work is done.',
            ],
          },
          {
            type: 'p',
            text: 'Two things usually surface. The process has more handoffs than anyone believed, and a good part of the delay is waiting rather than working. Waiting is often cured by a reminder and a named owner, not by software. If you want a shortcut into the shapes this work usually takes, the [solutions overview](/solutions) groups them by kind: enquiries, documents, back-office coordination, internal answers and reporting.',
          },
        ],
      },
      {
        id: 'pick-one-process',
        heading: 'Which process should be first?',
        blocks: [
          {
            type: 'p',
            text: 'A first process should be ordinary, frequent and yours to change. Ambition belongs to the second one. Read each candidate against a few signals before you argue about tools.',
          },
          {
            type: 'table',
            caption: 'Reading a candidate process',
            head: ['What to look at', 'Good sign', 'Warning sign'],
            rows: [
              ['Frequency', 'Daily or weekly', 'A few times a year'],
              ['Rules', 'Written, or easy to write', 'Different in every branch'],
              ['Inputs', 'Real examples are available', 'Locked in one person’s inbox'],
              ['Consequences', 'Mistakes are caught and fixed', 'Money moves without review'],
              ['Ownership', 'One person answers for it', 'Shared between three teams'],
            ],
          },
          {
            type: 'p',
            text: 'Volume matters more than visibility. A quiet process that runs 400 times a month will repay attention sooner than the one the leadership team talks about. If you are holding several candidates and cannot separate them, our companion guide on [finding repetitive work worth automating](/insights/identify-repetitive-work-to-automate) sets out the signals and a scoring table.',
          },
        ],
      },
      {
        id: 'fix-the-process-first',
        heading: 'Why should you fix the process before you automate it?',
        blocks: [
          {
            type: 'p',
            text: 'Automation copies your process, faults included. If approvals are vague today, an automated version routes work to the wrong person faster and with more confidence. If three people quietly re-enter the same figures because nobody trusts the first entry, automating the entry will not remove the mistrust. Cut the steps that exist only because of an old system, agree the exceptions, then build.',
          },
          {
            type: 'example',
            title: 'Illustrative example: a Pune distributor’s dealer orders',
            text: 'Suppose a distributor in Pune receives about 300 dealer purchase orders a month, mostly as WhatsApp photos and emailed PDFs. The order desk retypes each one. The obvious project is to read the orders automatically. Watching the work for a week shows something else: roughly a third of the orders are wrong on arrival, with superseded part codes, missing quantities or prices from an old list, and each one costs two or three phone calls. Automating the typing would have carried those errors through faster. Giving dealers a short order form with current part codes removes most of the calls first. What is left, reading the orders that still arrive as photographs and matching them to the price list, is a smaller and far safer thing to build.',
          },
          {
            type: 'note',
            tone: 'caution',
            title: 'Faster is not the same as better',
            text: 'A broken process running at speed produces more corrections, not fewer. Before automating, ask what proportion of cases come back for rework today, and why. If the answer is more than a handful, the repair is the project.',
          },
        ],
      },
      {
        id: 'rules-or-ai',
        heading: 'Do you need AI, or will simple rules do?',
        blocks: [
          {
            type: 'p',
            text: 'Once the process is clean, decide what kind of automation it needs. Rules are exact and repeatable. Given the same input they produce the same output, and anyone can read them. A model is different: it reads what a rule cannot, and returns a best estimate rather than a certainty.',
          },
          {
            type: 'p',
            text: 'That distinction should shape the build. The [NIST AI Risk Management Framework](https://nvlpubs.nist.gov/nistpubs/ai/NIST.AI.100-1.pdf) asks organisations to take viable non-AI alternative systems, approaches or methods into account alongside the resources needed to manage AI risk. Put plainly: if a rule will do the job, use the rule. It costs less to run, is easier to test and is simpler to explain to an auditor.',
          },
          {
            type: 'list',
            items: [
              'The input arrives in a fixed format from a system you control.',
              'The decision can be written as a table of conditions.',
              'The same input must always produce the same output.',
              'Volume is high and tolerance for surprise is low.',
            ],
          },
          {
            type: 'p',
            text: 'A model earns its place when the input is unstructured or inconsistent: a supplier invoice in an unfamiliar layout, an enquiry written in a mix of languages, a policy question that needs the right paragraph found. In most working systems both appear together, with the model reading and drafting while rules decide and act. [AI automation and traditional automation](/insights/ai-automation-vs-traditional-automation) compares the two in detail.',
          },
        ],
      },
      {
        id: 'integration',
        heading: 'How will it connect to your accounting software, CRM and WhatsApp?',
        blocks: [
          {
            type: 'p',
            text: 'Integration is where automation projects slow down, so answer it early and in writing. For every tool the process touches, ask three questions: can it be read from, can it be written to, and who authorises that access? A workflow that ends in a spreadsheet somebody emails around is not finished.',
          },
          {
            type: 'list',
            items: [
              'Does the tool offer an API, a supported export, or only a screen?',
              'Which fields are mandatory when a record is created, and who fills them today?',
              'What happens to duplicates: are they rejected, or accepted silently?',
              'Who inside your business owns the login, and what can that login do?',
              'What is the fallback when a connection is down for a day?',
            ],
          },
          {
            type: 'p',
            text: 'Statutory reporting deserves particular care, because the format is not yours to change. GSTN’s [overview of e-invoicing](https://tutorial.gst.gov.in/downloads/news/e_invoice_overview.pdf) is explicit that e-invoicing means reporting details of specified GST documents to a notified Invoice Registration Portal and obtaining an invoice reference number; it does not mean invoices are generated by a government portal. Businesses continue to create invoices in their own accounting, billing or ERP systems, and on reporting, the portal returns a signed e-invoice with a unique IRN and a QR code. Applicability follows notified turnover limits based on PAN, currently an aggregate turnover above ₹5 crore, applicable from 1 August 2023. Check where your business stands and design around the format, not against it.',
          },
          {
            type: 'note',
            tone: 'insight',
            title: 'Let it read before it writes',
            text: 'For the first weeks, let the system read, match and prepare while a person presses save. You learn where it is wrong without having to reverse anything, and the team gains confidence in the order it should.',
          },
        ],
      },
      {
        id: 'owner-and-baseline',
        heading: 'Who owns it, and how will you know it worked?',
        blocks: [
          {
            type: 'p',
            text: 'Two things decide whether the project is judged fairly: a named owner and a baseline measured before launch. The owner is someone in the business, not the vendor and not the person who wrote the code. They decide what the system may do alone, what waits for approval and when it must stop. Give them a pause switch and a way back to the manual process, and make it usable without permission from anyone.',
          },
          {
            type: 'p',
            text: 'The NIST framework makes the second point directly: managing systems intended to augment or replace human activity requires some form of baseline for comparison. Measure the current process for a fortnight on real cases, including the awkward ones, and record time per case, waiting time, rework and the share that turn out to be exceptions. Without that, every discussion after launch becomes an argument about impressions.',
          },
          {
            type: 'p',
            text: 'Then run a narrow first release and review it weekly with the people doing the work. Widen the boundary when the exception rate settles and reviewers stop rewriting the output. If you would rather take an outside view before committing a budget, BYBO’s [Blueprint](/blueprint) is a paid diagnostic that maps the workflow, sets a cost baseline, ranks opportunities and recommends what to automate or leave alone.',
          },
        ],
      },
    ],
    limitations: [
      'This guide covers internal business processes. Anything a regulator prescribes, such as tax reporting, follows that authority’s formats and timelines first.',
      'Low volumes rarely repay integration work. A process that runs twice a month may be better served by a checklist and a shared calendar.',
      'Nothing here predicts a saving. Your inputs, volumes and tools decide the result, and only your own baseline will show it.',
      'Automation cannot settle a disagreement between teams about how a process should run. Agree that first, on paper.',
      'Older on-premises software may offer no practical way in. Where that is true, the honest options are manual handover, a file exchange or a change of tool.',
    ],
    faqs: [
      {
        q: 'Where should a company begin with business process automation?',
        a: 'Begin with one recurring process you can describe from trigger to finished record, that runs often enough to matter and has a person who answers for it. Map how it is done today, remove the steps that exist only out of habit, and measure a baseline. Only then decide whether rules, a model, or a better form solves most of the problem.',
      },
      {
        q: 'Is business process automation the same as AI?',
        a: 'No. Most business process automation is deterministic: rules, forms, scheduled jobs and connections between systems. AI is one component you add when the input is unstructured or too varied for rules, such as scanned documents or free-text messages. Many useful projects contain no AI at all, and the cheapest reliable option is usually the right one.',
      },
      {
        q: 'Do we need to change our accounting software or CRM first?',
        a: 'Usually not. What matters is whether those tools can be read from and written to, and who controls that access. Check for an API or a supported export, confirm which fields are mandatory, and test with real records. Replace a tool only when it genuinely blocks the workflow, because a migration is a larger project than the automation itself.',
      },
      {
        q: 'How do we know a process is ready to automate?',
        a: 'It is ready when you can write the rules down, produce a representative set of real examples including the awkward ones, name the owner and the reviewer, and state what happens when the system is wrong. If any of those is missing, the next step is preparation rather than a build. A clear decision to wait is a useful outcome.',
      },
      {
        q: 'What should we measure after automating a process?',
        a: 'Measure the same things you measured before launch: time per case from arrival to finished record, waiting time, rework, the share of cases needing review and the cost of running the whole workflow. Watch the review step in particular. If reviewers approve everything unread, or rewrite most of the output, the design needs adjusting rather than expanding.',
      },
    ],
    bybo: [
      {
        href: '/solutions',
        label: 'Solutions',
        why: 'Common starting points by kind of work: enquiries, documents, operations, internal answers and reporting.',
      },
      {
        href: '/blueprint',
        label: 'AI Opportunity Blueprint',
        why: 'A paid diagnostic that maps the process, sets a cost baseline and recommends what to automate.',
      },
      {
        href: '/how-we-work',
        label: 'How we work',
        why: 'The stages from diagnosis to operation, with owners, approval rules and cost visibility.',
      },
    ],
    related: ['real-cost-of-repetitive-work', 'ai-for-indian-msmes', 'rank-ai-opportunities'],
    sources: [
      {
        title: 'Steps for e-Invoicing (e-invoice overview)',
        publisher: 'Goods and Services Tax Network (GSTN), Government of India',
        url: 'https://tutorial.gst.gov.in/downloads/news/e_invoice_overview.pdf',
      },
      {
        title: 'Artificial Intelligence Risk Management Framework (AI RMF 1.0), NIST AI 100-1',
        publisher: 'National Institute of Standards and Technology (NIST)',
        url: 'https://nvlpubs.nist.gov/nistpubs/ai/NIST.AI.100-1.pdf',
      },
      {
        title: 'Economic Survey 2025–26, Chapter 14: Evolution of the AI Ecosystem in India',
        publisher: 'Ministry of Finance, Government of India',
        url: 'https://www.indiabudget.gov.in/economicsurvey/doc/eschapter/echap14.pdf',
      },
    ],
  },
  {
    slug: 'ai-automation-vs-traditional-automation',
    collection: 'ai-systems',
    title: 'AI Automation vs Traditional Automation: What Businesses Need to Know',
    seoTitle: 'AI Automation vs Traditional Automation Explained',
    description:
      'How AI automation and traditional rule-based automation differ in input, reliability, testing, failure and cost, when each one wins, and how to combine them.',
    dek:
      'Rules do the same thing every time. A model reads what rules cannot and returns a best estimate. Knowing which one a job needs saves money, and prevents a quiet class of mistakes.',
    keywords: [
      'AI automation vs traditional automation',
      'rule-based automation vs AI',
      'RPA vs AI',
      'deterministic automation',
      'when to use AI automation',
      'workflow automation tools',
    ],
    publishedAt: '2026-09-11',
    visual: {
      kind: 'compare',
      title: 'Two kinds of automation',
      neutral: true,
      left: {
        label: 'Rules, RPA and workflow tools',
        items: [
          'Same input, same output, every time',
          'Needs structured, predictable input',
          'Fails loudly and stops',
          'Tested by running the steps',
          'Cost sits in build and licences',
        ],
      },
      right: {
        label: 'AI in the workflow',
        items: [
          'Reads documents, messages and speech',
          'Returns a best estimate, not a certainty',
          'Can fail quietly and plausibly',
          'Tested on samples with expected answers',
          'Cost follows usage and upkeep',
        ],
      },
    },
    summary: [
      'Traditional automation is deterministic: fixed steps on structured input, the same result every time, and failures that stop the run.',
      'AI handles unstructured or inconsistent input and returns a probable answer, which is useful and occasionally wrong.',
      'Most dependable systems use both: the model reads and drafts, the rules check and decide, a person approves what matters.',
      'They differ in testing, failure and cost. Plan for sampled evaluations, quiet errors and usage-based running costs.',
    ],
    sections: [
      {
        id: 'traditional-automation',
        heading: 'What does traditional automation actually do?',
        blocks: [
          {
            type: 'p',
            text: 'Traditional automation follows instructions somebody wrote. A rule moves an email into a queue when the subject contains a purchase order number. A workflow tool sends an approval request when a discount passes ten per cent. A script copies yesterday’s sales from one system into another every night at two. Robotic process automation, usually shortened to RPA, does the same thing by driving the screens of software that has no other way in.',
          },
          {
            type: 'p',
            text: 'The defining quality is determinism. The same input produces the same output today, next month and after an audit. You can read the rule, point at the line that made the decision and change it in an afternoon. That is worth a great deal in finance, statutory reporting and anything where consistency is the point.',
          },
          {
            type: 'list',
            items: [
              'Routing and assignment: send this kind of request to that team.',
              'Validation: reject an order with no delivery address or an unknown part code.',
              'Calculation: apply the tax rate, the discount slab, the freight rule.',
              'Movement: copy an approved record from one system to another on a schedule.',
              'Reminders: chase the approver on day two and escalate on day four.',
            ],
          },
        ],
      },
      {
        id: 'ai-automation',
        heading: 'What does AI add that rules cannot do?',
        blocks: [
          {
            type: 'p',
            text: 'Rules need the input to arrive in the shape they expect. Much of what a business receives does not: a scanned delivery challan, a supplier invoice in an unfamiliar layout, a WhatsApp message with a photograph and half a sentence, a forty-page contract with the renewal clause somewhere inside it. A model reads those and produces something structured from them.',
          },
          {
            type: 'p',
            text: 'It does so probabilistically. The [OECD](https://oecd.ai/en/ai-principles) describes an AI system as a machine-based system that, for explicit or implicit objectives, infers from the input it receives how to generate outputs such as predictions, content, recommendations or decisions, and notes that systems vary in their levels of autonomy and adaptiveness after deployment. Inference is the important word. The output is the most likely answer given the input, not a value looked up in a table, which is why the same question phrased two ways can produce two slightly different answers.',
          },
          {
            type: 'note',
            tone: 'insight',
            title: 'Estimates need a confidence rule',
            text: 'Because the output is an estimate, the useful design question is not “is it accurate?” but “what happens when it is unsure?” Decide in advance which cases go to a person, and make “I could not read this” an acceptable result.',
          },
        ],
      },
      {
        id: 'when-each-wins',
        heading: 'When does each approach win?',
        blocks: [
          {
            type: 'p',
            text: 'The choice follows the input and the consequences, not the ambition of the project. Read a job against both columns before deciding.',
          },
          {
            type: 'table',
            caption: 'Which approach suits which job',
            head: ['The job', 'Rules fit when', 'AI fits when'],
            rows: [
              ['Reading input', 'It arrives in fixed fields', 'Layouts and wording vary'],
              ['Deciding', 'The policy is written', 'Judgement is needed, with review'],
              ['Language', 'One language, set phrases', 'Mixed languages and free text'],
              ['Change', 'Rules change rarely', 'New formats keep arriving'],
              ['Audit', 'You must show the exact rule', 'You must show the source evidence'],
            ],
          },
          {
            type: 'p',
            text: 'One test settles many arguments. If you can write the decision as a table of conditions your team agrees with, use rules. They are cheaper, faster and easier to defend. Reach for a model when writing that table proves impossible because the input keeps changing shape.',
          },
        ],
      },
      {
        id: 'combining',
        heading: 'How do you combine the two?',
        blocks: [
          {
            type: 'p',
            text: 'The dependable pattern in most businesses is simple to state: the model reads, the rules decide. A model turns an untidy document or message into structured fields with a pointer to where each one came from. Deterministic rules then check those fields against your records and policies, and either act within agreed limits or route the case to a named person. That way the probabilistic part never quietly makes a commitment on your behalf.',
          },
          {
            type: 'example',
            title: 'Illustrative example: a Kochi freight forwarder’s delivery proofs',
            text: 'Suppose a freight forwarder in Kochi receives proof of delivery as photographs from drivers, scanned sheets from clients and the occasional emailed PDF. A model reads each one and extracts the consignment number, delivery date, receiver’s name and any handwritten remark, linking every field to its position on the image. Rules take over from there. If the consignment number matches an open shipment and the date falls inside the expected window, the record is closed and the client billing file is updated. If the number matches nothing, the date is out of range, or a remark mentions damage or shortage, the case goes to the operations desk with the image and the mismatch side by side. The model never closes a shipment. It only reads.',
          },
          {
            type: 'p',
            text: 'That division of labour is what [Agentic Operations](/systems/agentic-operations) is built around: bounded steps, permitted tools and consequential actions held behind an approval. When a workflow needs its own interface, data model and roles rather than a connection between existing tools, it moves closer to a [custom AI platform](/systems/custom-ai-platforms), where the same boundary between reading and deciding still applies.',
          },
        ],
      },
      {
        id: 'testing',
        heading: 'Why do the two need different kinds of testing?',
        blocks: [
          {
            type: 'p',
            text: 'A rule is tested the way any software is tested. You write the cases, run them, and the result either matches or it does not. Pass and fail are exact, and a passing test stays passing until somebody changes the code.',
          },
          {
            type: 'p',
            text: 'A model cannot be tested that way. You assemble a set of representative cases with the answers you expect, run them, and measure how often the output is right, how often it is wrong and how often the system correctly says it does not know. The [NIST AI Risk Management Framework](https://nvlpubs.nist.gov/nistpubs/ai/NIST.AI.100-1.pdf) is candid about the difficulty: it lists underdeveloped software testing standards and the difficulty of performing regular AI-based testing, or even determining what to test, among the risks that are new or increased compared with traditional software. It also warns that measurements taken in a controlled setting may differ from the risks that emerge in real-world operation.',
          },
          {
            type: 'note',
            tone: 'caution',
            title: 'Keep a set of real cases, not clean ones',
            text: 'Build the evaluation set from your own work, including poor scans, duplicates, missing fields and messages in mixed languages. Add every new failure to it. A model that scores well on tidy examples tells you very little about a Monday morning.',
          },
        ],
      },
      {
        id: 'failure',
        heading: 'How do they fail differently?',
        blocks: [
          {
            type: 'p',
            text: 'Traditional automation fails loudly. A field is missing, a connection times out, the run stops and somebody gets an alert. The failure is annoying and visible, which is the good kind. AI fails quietly. It returns a well-formed, plausible answer that happens to be wrong: the wrong invoice total, a delivery date nobody promised, a clause summarised in a way the contract does not support. Nothing stops, and nobody is alerted.',
          },
          {
            type: 'list',
            items: [
              'Check every extracted figure against a record you already hold.',
              'Show the source for each field, so a reviewer can verify without reopening the file.',
              'Set tolerances: how much a total may differ before a person must look.',
              'Route low-confidence and unmatched cases to a named reviewer, not to a queue.',
              'Sample completed cases each week, including the ones that passed cleanly.',
            ],
          },
          {
            type: 'p',
            text: 'Deciding where a person must stand is a design task in itself, covered in [when AI should decide and when a person should step in](/insights/when-ai-should-decide). The short version: the more expensive and less reversible the action, the earlier the human gate belongs.',
          },
        ],
      },
      {
        id: 'cost-and-maintenance',
        heading: 'What do they cost to run and keep running?',
        blocks: [
          {
            type: 'p',
            text: 'The cost shapes differ. Traditional automation is mostly a build cost plus licences: once it works, running it is close to free, and it keeps working until something it depends on changes. AI carries a running cost that moves with volume, because most systems pay per unit of text or per document processed, and that cost is easy to underestimate before you have measured a real month.',
          },
          {
            type: 'p',
            text: 'Maintenance differs too. Rules break when a system or a policy changes, and the break is obvious. Model-based steps degrade more subtly. The NIST framework notes that AI systems may require more frequent maintenance and triggers for corrective maintenance because of data, model or concept drift, and points to increased opacity and concerns about reproducibility. In practice, that means a standing review rather than a completed project: a sample checked each week, an owner who sees the exception rate, and a note of what changed when a provider updates a model.',
          },
          {
            type: 'p',
            text: 'None of this makes AI expensive by nature. It makes the comparison specific. Judge cost per completed case across the whole workflow, including review time, against the baseline you measured before launch, rather than comparing a licence fee with a per-document rate.',
          },
        ],
      },
    ],
    limitations: [
      'The distinction is not always clean. Many products described as AI are mostly rules with a model at one step, and the label tells you little about how they behave.',
      'This guide is about business workflows. Machine vision on a production line, pricing engines and safety-critical control systems carry their own engineering and assurance requirements.',
      'A model does not fix inaccessible data. If the information sits in a system with no way in, both approaches stall at the same point.',
      'Costs and accuracy change as providers release new models. Any comparison you make today should be re-measured at review time rather than assumed.',
    ],
    faqs: [
      {
        q: 'What is the main difference between AI automation and traditional automation?',
        a: 'Traditional automation follows written rules and is deterministic: the same input produces the same output every time, and it stops when something does not fit. AI infers an answer from the input it receives, so it copes with untidy documents and free text but returns a probable result rather than a certain one. That single difference drives the differences in testing, failure and cost.',
      },
      {
        q: 'Is RPA the same as AI automation?',
        a: 'No. Robotic process automation drives existing software the way a person would, clicking screens and copying fields according to fixed instructions. It is deterministic and breaks when a screen or a format changes. AI is sometimes added in front of RPA to read an unstructured document first, but the two solve different problems and are worth budgeting for separately.',
      },
      {
        q: 'Can we use both in the same workflow?',
        a: 'Yes, and most dependable systems do. The usual arrangement is that a model reads and structures the input while deterministic rules check the result against your records, act within agreed limits and escalate anything outside them. This keeps the probabilistic part away from commitments, and gives you a rule you can point at when someone asks why a case was handled that way.',
      },
      {
        q: 'Which is cheaper to run?',
        a: 'Rules are usually cheaper to run once built, because they carry no per-use charge, though they cost more to maintain when formats change often. AI carries a usage cost that scales with volume, plus review time and periodic re-testing. The honest comparison is cost per completed case across the whole workflow, including the people involved, measured against your current baseline.',
      },
      {
        q: 'How do we test an AI step before trusting it?',
        a: 'Assemble a set of real cases with the answers you expect, including poor scans, duplicates and awkward wording. Measure how often the output is correct, how often it is wrong and how often the system properly declines. Agree the pass level before you look at the results, keep the set as new failures appear, and re-run it whenever a model or prompt changes.',
      },
    ],
    bybo: [
      {
        href: '/systems/agentic-operations',
        label: 'Agentic Operations',
        why: 'How BYBO bounds multi-step work: permitted tools, approval gates and defined stop conditions.',
      },
      {
        href: '/systems/custom-ai-platforms',
        label: 'Custom AI Platforms',
        why: 'When a workflow needs its own product, with roles, data and integrations built around it.',
      },
      {
        href: '/blueprint',
        label: 'AI Opportunity Blueprint',
        why: 'A paid diagnostic that assesses whether a workflow needs rules, AI or a simpler fix.',
      },
    ],
    related: ['reduce-manual-data-entry', 'measure-ai-system-performance', 'what-is-a-business-ai-system'],
    sources: [
      {
        title: 'Artificial Intelligence Risk Management Framework (AI RMF 1.0), NIST AI 100-1',
        publisher: 'National Institute of Standards and Technology (NIST)',
        url: 'https://nvlpubs.nist.gov/nistpubs/ai/NIST.AI.100-1.pdf',
      },
      {
        title: 'OECD AI Principles, including the definition of an AI system',
        publisher: 'OECD.AI Policy Observatory',
        url: 'https://oecd.ai/en/ai-principles',
      },
    ],
  },
  {
    slug: 'identify-repetitive-work-to-automate',
    collection: 'ai-systems',
    title: 'How to Identify Repetitive Work That Is Worth Automating',
    description:
      'A practical method for finding repetitive work worth automating: where to look, eight signals to score, a simple scoring table, and the red flags to respect.',
    dek:
      'Not all repetitive work repays automation. Here is where to look for candidates, what to measure, how to score them without pretending to be precise, and when to walk away.',
    keywords: [
      'identify repetitive work to automate',
      'what to automate first',
      'automation candidates',
      'repetitive tasks in business',
      'automation scoring',
      'process automation checklist',
    ],
    publishedAt: '2026-09-11',
    visual: {
      kind: 'matrix',
      title: 'Which repetitive work is worth automating',
      x: ['Rare', 'Frequent'],
      y: ['Judgement-heavy', 'Rule-clear'],
      quadrants: [
        'Simplify it, leave it manual',
        'Strongest first candidates',
        'Keep it with people',
        'Assist, let people decide',
      ],
      highlight: 1,
    },
    summary: [
      'Look for work that repeats, follows a pattern, passes through several hands and produces a record somebody checks.',
      'Score candidates on frequency, volume, time, rework, handoffs, exceptions, data availability and risk.',
      'Respect the red flags: rare work, judgement-heavy decisions, a broken process, no owner and inputs you cannot reach.',
      'Measure the current work on real cases before choosing, otherwise you cannot tell later whether anything improved.',
    ],
    sections: [
      {
        id: 'where-to-look',
        heading: 'Where do you find the candidates?',
        blocks: [
          {
            type: 'p',
            text: 'Repetitive work hides in plain sight, because the people doing it stopped noticing years ago. It rarely appears in a process document, and almost never in a job description. It shows up in habits: the file opened every morning, the group message sent every evening, the spreadsheet rebuilt on the last working day of the month.',
          },
          {
            type: 'list',
            items: [
              'Ask each team what they would stop doing tomorrow if they could, and why they cannot.',
              'Look at the recurring entries in people’s calendars, especially the ones marked as blocked time.',
              'Open the shared inbox and count the messages that get the same reply.',
              'Find the spreadsheets whose figures are typed in from another system.',
              'Watch month-end and quarter-end: peaks reveal work that is manual all year.',
              'Ask why overtime happens, and on which days of the week it lands.',
            ],
          },
          {
            type: 'p',
            text: 'Write each candidate as a unit of work, not a department: one supplier invoice, one dealer order, one admission enquiry, one weekly outlet report. If you cannot describe the trigger and the finish in a sentence, you are looking at a function rather than a process, and it is too large to judge.',
          },
        ],
      },
      {
        id: 'signals',
        heading: 'Which signals tell you the work is worth automating?',
        blocks: [
          {
            type: 'p',
            text: 'Eight signals separate work that repays automation from work that merely feels tedious. The first four say how much the work costs you. The last four say how safely it can be handed to software.',
          },
          {
            type: 'list',
            ordered: true,
            items: [
              'Frequency: how often the work arrives, and whether it arrives evenly or in peaks.',
              'Volume: how many cases in a typical month, counted rather than estimated.',
              'Time per case: how long one case takes from arrival to finished record, including waiting.',
              'Rework: how often a case comes back for correction, and what causes it.',
              'Handoffs: how many people or systems the case passes through on the way.',
              'Exceptions: what share of cases break the pattern, and whether they are predictable.',
              'Data availability: whether you can reach the inputs and produce real examples today.',
              'Risk: what happens if the work is done wrong, and how quickly that would be noticed.',
            ],
          },
          {
            type: 'note',
            tone: 'insight',
            title: 'Handoffs cost more than keystrokes',
            text: 'A task that takes four minutes but sits in three queues can take four days. When you count time, count the waiting as well as the working. Waiting is often the larger prize, and sometimes a reminder fixes it without any automation at all.',
          },
        ],
      },
      {
        id: 'score',
        heading: 'How do you score candidates without pretending to be precise?',
        blocks: [
          {
            type: 'p',
            text: 'Score each signal from one to three, where three always means more attractive to automate. Keep it rough. The purpose is to make a conversation comparable, not to produce a number that decides for you.',
          },
          {
            type: 'table',
            caption: 'Scoring a candidate from one to three',
            head: ['Signal', 'Score 1', 'Score 3'],
            rows: [
              ['Frequency', 'Monthly or rarer', 'Daily'],
              ['Volume', 'Under 20 a month', 'Hundreds a month'],
              ['Time per case', 'A minute or two', 'Half an hour or more'],
              ['Rework', 'Rarely comes back', 'Often corrected later'],
              ['Handoffs', 'One person throughout', 'Three or more people'],
              ['Exceptions', 'Most cases are unusual', 'Most follow one pattern'],
              ['Data available', 'Locked in one inbox', 'Real examples on hand'],
              ['Risk if wrong', 'Money moves unchecked', 'Caught at the next step'],
            ],
          },
          {
            type: 'p',
            text: 'Read the shape, not only the total. A candidate scoring three everywhere except data availability is not ready; it is a data access task first. A candidate scoring three on volume and one on exceptions is a candidate for automating part of the work, usually the reading and preparing, while people keep the deciding.',
          },
        ],
      },
      {
        id: 'red-flags',
        heading: 'What are the red flags?',
        blocks: [
          {
            type: 'p',
            text: 'Some work should be left alone, however irritating it is. These signs are worth more weight than a high score elsewhere.',
          },
          {
            type: 'list',
            items: [
              'It happens rarely. Building and maintaining a system costs more than the work it saves.',
              'The decision is a judgement call, made differently by two experienced people for good reasons.',
              'The process is broken. Automating it makes the faults arrive faster and less visibly.',
              'Nobody owns it. Without a person who answers for the outcome, quality has no home.',
              'The inputs cannot be reached, or exist only on paper in another office.',
              'The rules are disputed between teams, or change with every negotiation.',
            ],
          },
          {
            type: 'note',
            tone: 'caution',
            title: 'The everything-else exception',
            text: 'Beware the process described as “simple, except when…” followed by six situations. Those exceptions are the real work. Count them honestly: if they are more than a fifth of cases, scope the system around them rather than pretending they will not arrive.',
          },
        ],
      },
      {
        id: 'baseline',
        heading: 'How do you measure the work as it stands today?',
        blocks: [
          {
            type: 'p',
            text: 'Scores rank candidates. A baseline tells you later whether anything actually improved. Take a fortnight of real cases, not a reconstruction from memory, and record time from arrival to finished record, waiting time, how many needed rework and how many turned out to be exceptions. Keep the awkward cases in the sample; they are the ones that decide whether a system survives contact with a normal week.',
          },
          {
            type: 'p',
            text: 'The [NIST AI Risk Management Framework](https://nvlpubs.nist.gov/nistpubs/ai/NIST.AI.100-1.pdf) makes the same point for systems meant to augment or replace human activity: managing them requires some form of baseline for comparison, and it notes this is difficult to systematise because software carries out tasks differently from people. That is a reason to measure the whole workflow rather than one step. If the reading gets faster and the approval queue grows, nothing has been gained.',
          },
          {
            type: 'p',
            text: 'While you measure, price the work in rough terms: hours multiplied by a loaded hourly cost, plus the cost of the errors you found. [The real cost of repetitive work](/insights/real-cost-of-repetitive-work) goes into that arithmetic; a rough figure agreed with the finance lead is enough to decide whether a candidate is worth a project at all.',
          },
        ],
      },
      {
        id: 'worked-shortlist',
        heading: 'What does this look like on a real shortlist?',
        blocks: [
          {
            type: 'example',
            title: 'Illustrative example: a Rajkot equipment dealer’s shortlist',
            text: 'Suppose an equipment dealer lists four candidates. Annual maintenance contract renewals: 60 a month, each taking twenty minutes to look up, draft and chase, with clear rules and low risk. Spare-part enquiries on WhatsApp: hundreds a month, highly repetitive, but prices are negotiated case by case. Customs paperwork for imported units: eight a month, every one different, high consequences if wrong. The monthly service report: built once a month from three systems, four hours of copying, no judgement involved. Scored on the eight signals, renewals and the service report come out ahead. The enquiries are worth automating only up to the point of a draft, because the price is a commitment. The customs paperwork scores low on frequency and high on risk, and is left with the person who knows it.',
          },
          {
            type: 'p',
            text: 'Notice that the loudest complaint, the enquiries, is not the best first candidate, and the quietest task, the monthly report, may be the easiest win. Notice too that two candidates split into an automated part and a human part. That split is usually where the safe value sits.',
          },
        ],
      },
      {
        id: 'from-shortlist-to-decision',
        heading: 'How do you turn a shortlist into a decision?',
        blocks: [
          {
            type: 'p',
            text: 'Before committing to anything, test the cheaper answer. A clearer form, a corrected master list, a shared inbox rule or one setting in software you already pay for will sometimes remove most of the work. Automation should be the option that wins on merit, not the option nobody questioned.',
          },
          {
            type: 'p',
            text: 'Then decide the pace deliberately. The Economic Survey 2025–26 chapter on [India’s AI ecosystem](https://www.indiabudget.gov.in/economicsurvey/doc/eschapter/echap14.pdf) suggests sequencing over speed, and classifying uses as deploy now, pilot or defer according to readiness across data, skills and legal frameworks. That is a sound habit for a single business too: one candidate to build, one to pilot in a limited way, and the rest deferred with a written reason and a date to revisit.',
          },
          {
            type: 'p',
            text: 'For the final comparison between the two or three that survive, [choosing the first workflow with a clear head](/insights/rank-ai-opportunities) weighs impact, repetition, readiness and risk together, and ends with a one-page case. The [solutions overview](/solutions) shows the shapes these systems usually take, and BYBO’s [Blueprint](/blueprint) is the paid version of this exercise, with the workflow mapped, the baseline costed and a recommendation on what to automate or leave alone.',
          },
        ],
      },
    ],
    limitations: [
      'A score is a conversation aid, not a decision. Two candidates a point apart are effectively equal, and the shape of the scores matters more than the total.',
      'Frequency and volume are easy to overestimate from memory. Count a real month before comparing candidates, or the ranking reflects irritation rather than cost.',
      'This method finds work worth automating. It does not tell you whether rules or a model should do it, or what the build will involve.',
      'Work that involves personal data, money movement or regulated decisions needs a compliance and risk review alongside this assessment, not after it.',
    ],
    faqs: [
      {
        q: 'How do we find repetitive work that is worth automating?',
        a: 'Ask teams what they would stop doing tomorrow, look at recurring calendar blocks, count the messages in shared inboxes that get identical replies, and watch what happens at month-end. Write each candidate as one unit of work with a trigger and a finish, then score it on frequency, volume, time, rework, handoffs, exceptions, data availability and risk.',
      },
      {
        q: 'How much volume does a task need before automation is worthwhile?',
        a: 'There is no universal threshold, because it depends on the time each case takes, the cost of errors and how much of the work a system can actually carry. A practical test is arithmetic: hours saved a month multiplied by a loaded hourly cost, compared with the build and running cost. If the two are close, the answer is usually no.',
      },
      {
        q: 'Should we automate the task people complain about most?',
        a: 'Not automatically. The loudest complaint is often about a task with high judgement or high consequence, which is the least suitable to hand over. Score complaints alongside quiet, high-volume work such as report building or record matching. Those quieter tasks often score better and carry less risk, and fixing them buys credibility for the harder projects.',
      },
      {
        q: 'What if a task is repetitive but the rules keep changing?',
        a: 'Find out why. If rules change because the market changes, build the changeable part as settings a business owner can edit rather than logic buried in code. If they change because nobody has agreed them, that disagreement is the first task. Automating unsettled rules produces confident output that half the business will dispute.',
      },
      {
        q: 'Do we need to measure the current process first?',
        a: 'Yes, and it takes less time than expected. A fortnight of real cases, timed from arrival to finished record, with rework and exceptions noted, is enough. Without it, you cannot show whether a system helped, and every review becomes a debate about impressions. Keep the difficult cases in the sample rather than the tidy ones.',
      },
    ],
    bybo: [
      {
        href: '/solutions',
        label: 'Solutions',
        why: 'The usual shapes this work takes: enquiries, documents, operations, internal answers and reporting.',
      },
      {
        href: '/blueprint',
        label: 'AI Opportunity Blueprint',
        why: 'A paid diagnostic that maps the workflow, costs the baseline and ranks what is worth building.',
      },
      {
        href: '/insights/rank-ai-opportunities',
        label: 'Choose the first workflow with a clear head',
        why: 'The next step once you have a shortlist: comparing impact, repetition, readiness and risk.',
      },
    ],
    related: ['real-cost-of-repetitive-work', 'why-ai-pilots-fail', 'ai-for-indian-msmes'],
    sources: [
      {
        title: 'Artificial Intelligence Risk Management Framework (AI RMF 1.0), NIST AI 100-1',
        publisher: 'National Institute of Standards and Technology (NIST)',
        url: 'https://nvlpubs.nist.gov/nistpubs/ai/NIST.AI.100-1.pdf',
      },
      {
        title: 'Economic Survey 2025–26, Chapter 14: Evolution of the AI Ecosystem in India',
        publisher: 'Ministry of Finance, Government of India',
        url: 'https://www.indiabudget.gov.in/economicsurvey/doc/eschapter/echap14.pdf',
      },
    ],
  },
];

export default guides;
