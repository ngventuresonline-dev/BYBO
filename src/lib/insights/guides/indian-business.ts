import type { Guide } from '../types';

const guides: Guide[] = [
  {
    slug: 'ai-adoption-in-india',
    collection: 'indian-business',
    title: 'AI Adoption in India: What It Means for Growing Businesses',
    description: 'What India’s national AI push means for a growing business: where AI helps first, what stays hard, how to avoid AI for its own sake and what to do first.',
    dek: 'AI adoption in India is being built at national scale: compute, language models, skills and governance. For a growing business, the useful question is narrower — which recurring work is ready, and what must be in place first?',
    keywords: [
      'AI adoption in India',
      'AI for Indian businesses',
      'IndiaAI Mission',
      'AI for growing businesses',
      'India AI governance guidelines',
      'how to start using AI in business',
    ],
    publishedAt: '2026-09-11',
    visual: {
      kind: 'flow',
      title: 'A sensible sequence for adopting AI',
      steps: ['Choose one workflow', 'Measure the baseline', 'Check readiness', 'Pilot with review', 'Decide on evidence'],
      gate: 3,
      gateLabel: 'A person approves anything consequential',
    },
    summary: [
      'India’s AI push is real, from funding and compute to skills and guidelines, but most of it reaches growing businesses indirectly.',
      'Using AI tools is common. Running a dependable AI workflow is rare: it needs data, integrations, an owner and review.',
      'Start with one recurring workflow that has a measured baseline, accessible records and someone who knows the exceptions.',
      'Build governance and cost tracking into the first release, and let evidence decide whether to expand, adjust or stop.',
    ],
    sections: [
      {
        id: 'what-is-happening',
        heading: 'What is actually happening with AI adoption in India?',
        blocks: [
          {
            type: 'p',
            text: 'Most coverage of AI adoption in India mixes three different things: what the government is funding, what individuals are using and what businesses have built into their operations. They move at different speeds, and only the last one changes how your company runs.',
          },
          {
            type: 'p',
            text: 'Start with the public programme. In March 2024 the Cabinet approved the IndiaAI Mission with a budget outlay of ₹10,371.92 crore, including plans for public AI compute of 10,000 or more GPUs ([Press Information Bureau](https://www.pib.gov.in/PressReleaseIframePage.aspx?PRID=2012355)). Compute has since grown well beyond that plan. In March 2026 the government told Parliament that more than 38,000 GPUs had been onboarded through the AI compute portal for Indian start-ups and academia, and that 190 projects had been approved, 46 of them with start-ups and MSMEs ([PIB, March 2026](https://www.pib.gov.in/PressReleasePage.aspx?PRID=2245069)).',
          },
          {
            type: 'p',
            text: 'Skills are moving too. [Stanford’s 2026 AI Index](https://hai.stanford.edu/ai-index/2026-ai-index-report) reports that India leads LinkedIn’s relative AI skill penetration measure at 3.0: AI skills appear on Indian member profiles at almost three times the global average.',
          },
          {
            type: 'p',
            text: 'Language is the other national thread. The [Economic Survey 2025–26](https://www.indiabudget.gov.in/economicsurvey/doc/eschapter/echap14.pdf) highlights BHASHINI and AI4Bharat as examples of language- and voice-first AI that can make digital services usable in people’s own languages, including on low-cost devices. [MeitY’s governance guidelines](https://static.pib.gov.in/WriteReadData/specificdocs/documents/2025/nov/doc2025115685601.pdf) describe AI as powering the next generation of public goods, after digital public infrastructure such as Aadhaar, UPI and DigiLocker.',
          },
          {
            type: 'table',
            caption: 'National signals, and what each means for a growing business',
            head: ['Signal', 'What is happening', 'What it means for you'],
            rows: [
              ['Public funding', 'A national mission: compute, data, skills, safety', 'More Indian models and suppliers over time'],
              ['Shared compute', 'Affordable GPUs for start-ups and academia', 'Mostly indirect; most firms buy AI as a service'],
              ['Skills', 'A large pool of AI-skilled professionals', 'Easier to find help; process knowledge stays with you'],
              ['Languages', 'Public work on Indian-language and voice AI', 'Test with your customers’ real messages'],
              ['Governance', 'Principles-led national guidelines', 'Build accountability into the first release'],
            ],
          },
        ],
      },
      {
        id: 'using-versus-running',
        heading: 'If so many people use AI, why do so few businesses run on it?',
        blocks: [
          {
            type: 'p',
            text: 'Individual use is already high among connected office workers. The [2026 AI Index](https://hai.stanford.edu/ai-index/2026-ai-index-report) cites a University of Melbourne and KPMG survey in which more than 80% of respondents in India said they regularly use AI at work. The report cautions that online surveys can overrepresent younger, urban and educated people, and Microsoft usage data in the same report shows lower AI use across South Asia. It also records the sharpest rise in AI nervousness of any country surveyed: concern about AI use in India rose 14 percentage points between 2024 and 2025.',
          },
          {
            type: 'p',
            text: 'Business integration is a different matter. The [Economic Survey 2025–26](https://www.indiabudget.gov.in/economicsurvey/doc/eschapter/echap14.pdf) cites a global McKinsey survey in which 88% of organisations used AI in at least one business function in 2025. Of those users, only 7% had fully deployed and integrated it.',
          },
          {
            type: 'p',
            text: 'The distance between those numbers is where growing businesses get stuck. A sales executive drafting replies in a chat tool is using AI. A business where every enquiry is logged, answered from approved information, routed to the right person and followed up is running a system. The second needs data, integrations, an owner and a review step. It is harder, and it is where most of the operational value sits.',
          },
          {
            type: 'note',
            tone: 'insight',
            title: 'Read national figures as context, not benchmarks',
            text: 'Most published adoption numbers describe large enterprises, technology workers or online survey samples. They say little about a 60-person distributor in Nagpur. Your own baseline, such as time per task, error rate or response time, is the comparison that tells you whether AI is helping.',
          },
        ],
      },
      {
        id: 'where-ai-helps-first',
        heading: 'Where does AI help a growing business first?',
        blocks: [
          {
            type: 'p',
            text: 'Start where the work repeats, arrives as text, documents or messages, follows your rules most of the time and has someone who can explain the exceptions. In most growing businesses, that points to a familiar set of workflows:',
          },
          {
            type: 'list',
            items: [
              'Enquiries: capturing WhatsApp, email and website enquiries, drafting replies from approved information and keeping follow-ups on track.',
              'Documents: reading invoices, purchase orders and delivery notes, checking them against your records and routing mismatches to a reviewer.',
              'Internal knowledge: answering staff questions from SOPs, product sheets and past proposals, with the source attached.',
              'Reporting: assembling the weekly numbers from your accounting software and spreadsheets, once the definitions are agreed.',
              'Coordination: moving a request between sales, stores and accounts, with a named owner at each decision.',
            ],
          },
          {
            type: 'p',
            text: 'None of these asks AI to run the business. Each takes a recurring piece of work, handles the routine part and hands the judgement to a person with the evidence attached. That is also how the [systems BYBO builds](/systems) are organised: around a unit of work, not around a model.',
          },
          {
            type: 'example',
            title: 'Illustrative example: a Surat textile wholesaler’s WhatsApp orders',
            text: 'Suppose a wholesaler receives around 250 orders a month on WhatsApp, typed in a mix of Gujarati, Hindi and English, often with a photo of a handwritten list. Two staff retype them into the accounting software. A sensible first release reads each message, drafts the order against the product list and flags anything unclear: an unknown design code, a price below the agreed rate, a new customer. A person confirms every draft before it becomes a sales order. After a month, the team compares retyping time and corrections with the baseline, then decides whether repeat orders from known customers can move with lighter review.',
          },
        ],
      },
      {
        id: 'what-stays-hard',
        heading: 'What stays hard, even as the tools improve?',
        blocks: [
          {
            type: 'p',
            text: 'Better models do not remove the operational work. Five issues usually decide whether a first system survives an ordinary week.',
          },
          {
            type: 'list',
            items: [
              'Data readiness. If product codes differ between your price list and your accounting software, or customer history lives on personal phones, the system inherits the mess. UPI receipts and GST filings are often in better shape than email threads, chats and PDFs.',
              'Integrations. Value appears when the output lands in the tool your team already uses. Check what access your accounting, ERP or CRM software allows before promising anything.',
              'Languages. Indian-language AI is improving, but test with your own material: mixed Hindi and English, regional product names, voice notes and poor scans.',
              'Governance. Decide who can see which data, which actions need approval and what happens when the system is unsure.',
              'Cost control. Model usage is only part of the bill. Review time, integration upkeep and corrections all count, so track cost per completed task.',
            ],
          },
          {
            type: 'p',
            text: 'If a workflow touches customers’ or employees’ personal data, plan for India’s data protection framework from the start. Our guide to [AI systems and the DPDP framework](/insights/ai-systems-and-dpdp-india) covers what to design for.',
          },
        ],
      },
      {
        id: 'ai-for-its-own-sake',
        heading: 'How do you avoid adopting AI for its own sake?',
        blocks: [
          {
            type: 'p',
            text: 'The [Economic Survey 2025–26](https://www.indiabudget.gov.in/economicsurvey/doc/eschapter/echap14.pdf) makes this argument at national level. Given India’s constraints on capital, compute, energy and infrastructure, it says “pursuing scale for its own sake is neither efficient nor necessary”, and it argues for application-led, sector-specific approaches, including small models tailored to defined uses. The same discipline works inside a company.',
          },
          {
            type: 'p',
            text: 'Before choosing a tool, answer four questions. What is the unit of work — an invoice, an enquiry, a site-visit request — and how many arrive each month? How long does it take today, and where does it wait? Would a simpler fix, such as a template, an inbox rule or a cleaner spreadsheet, solve most of it? Who will own the result after launch? If the answers are vague, the honest next step is preparation, not a build. [Ranking AI opportunities](/insights/rank-ai-opportunities) covers the method in more detail.',
          },
          {
            type: 'note',
            tone: 'caution',
            title: 'Signs you are adopting AI for its own sake',
            text: 'The brief starts with a tool rather than a problem. The success measure is “launch an AI pilot”. The demo runs on clean sample data. Nobody can say who reviews the exceptions. Any one of these is a reason to pause.',
          },
        ],
      },
      {
        id: 'sensible-sequence',
        heading: 'What is a sensible sequence for adopting AI?',
        blocks: [
          {
            type: 'p',
            text: 'The Survey argues for sequencing over speed. In proposing an AI Economic Council, it suggests classifying AI uses as ‘deploy now’, ‘pilot’ or ‘defer’, based on readiness across data, skills, legal frameworks and labour adjustment ([Economic Survey 2025–26](https://www.indiabudget.gov.in/economicsurvey/doc/eschapter/echap14.pdf)). Those three buckets translate well to a business:',
          },
          {
            type: 'list',
            ordered: true,
            items: [
              'Choose one recurring workflow with a visible cost: time, delay, errors or lost enquiries.',
              'Measure the baseline on real cases, including the awkward ones.',
              'Check readiness: access to the records, a named owner and someone who knows the exceptions.',
              'Build a bounded first release, with a person approving anything consequential.',
              'Run it against the baseline for a few weeks and review every correction.',
              'Decide with the evidence: expand, adjust or stop.',
            ],
          },
          {
            type: 'p',
            text: 'Steps one to three are diagnosis, and they are the cheapest place to learn that an idea will not work. BYBO’s [AI Opportunity Blueprint](/blueprint) is a paid diagnostic built around them: a workflow map, a cost baseline, an opportunity ranking, a readiness review, a build recommendation and a 90-day roadmap. You can use the plan without committing to a build.',
          },
        ],
      },
      {
        id: 'governance-expectations',
        heading: 'What does India’s AI governance approach expect of a business?',
        blocks: [
          {
            type: 'p',
            text: 'In November 2025, MeitY released the [India AI Governance Guidelines](https://static.pib.gov.in/WriteReadData/specificdocs/documents/2025/nov/doc2025115685601.pdf). They rest on seven principles, or sutras: Trust, People First, Innovation over Restraint, Fairness & Equity, Accountability, Understandable by Design, and Safety, Resilience & Sustainability. The approach is to govern applications of AI through the relevant sectoral regulators rather than regulate the underlying technology. At that stage, the guidelines concluded, a separate AI law was not needed, because existing laws on IT, data protection and consumer protection, among others, could be applied.',
          },
          {
            type: 'p',
            text: 'For industry, the guidelines recommend complying with Indian law, adopting voluntary frameworks, publishing transparency reports and providing grievance redressal. Safeguards should be proportionate: low-risk uses may need only basic commitments, while high-risk uses in sectors such as health or finance may need more.',
          },
          {
            type: 'p',
            text: 'For a growing business, that translates into habits you can adopt now: a named owner for each system, access limited to what the workflow needs, a log of what the system did, approval gates for money and commitments, a clear way for a customer to reach a person, and running costs reviewed every month.',
          },
          {
            type: 'note',
            tone: 'caution',
            title: 'General information, not legal advice',
            text: 'AI policy in India is still evolving, and these guidelines are not the only rules that apply. Check the current position, including data protection obligations and any guidance from your sector regulator, with a qualified adviser before you deploy.',
          },
        ],
      },
    ],
    limitations: [
      'National figures describe an ecosystem, not your company. Workplace-use surveys draw on online samples and may overstate use in smaller firms.',
      'This is general information, not legal advice. Confirm the current rules for your sector before deployment.',
      'Some decisions should stay with people: credit, clinical care, hiring and pricing exceptions need specialist judgement and clear accountability.',
      'If most records sit on paper or personal phones, the first project may be organising data, not adopting AI.',
    ],
    faqs: [
      {
        q: 'How widely is AI being adopted in India?',
        a: 'Among connected office workers, very widely. [Stanford’s 2026 AI Index](https://hai.stanford.edu/ai-index/2026-ai-index-report) cites a survey in which more than 80% of Indian respondents said they regularly use AI at work, though online samples can overrepresent younger, urban and educated people. Integration into business operations is much rarer. Treat headline numbers as context, and measure your own workflows instead.',
      },
      {
        q: 'What is the IndiaAI Mission?',
        a: 'It is the government’s national AI programme, approved by the Cabinet in March 2024 with an outlay of ₹10,371.92 crore ([PIB](https://www.pib.gov.in/PressReleaseIframePage.aspx?PRID=2012355)). It funds shared compute, Indian foundation models, datasets, skills and start-ups, among other pillars. Some projects involve MSMEs, but for most growing businesses the benefits arrive indirectly: better Indian-language models, more local suppliers and more skilled people.',
      },
      {
        q: 'Where should a growing business start with AI?',
        a: 'Start with one recurring workflow that has a visible cost and a person who knows its exceptions. Customer enquiries, supplier invoices and the weekly report are common choices. Measure how the work runs today, check that you can access the records it depends on, and build a bounded first release with a person reviewing consequential decisions. Expand only when the results beat the baseline.',
      },
      {
        q: 'Does India have a law that regulates AI?',
        a: 'Not a dedicated one when the national guidelines were published. MeitY’s [India AI Governance Guidelines](https://static.pib.gov.in/WriteReadData/specificdocs/documents/2025/nov/doc2025115685601.pdf), released in November 2025, concluded that a separate AI law was not needed at that stage, and that existing laws on IT, data protection and consumer protection can be applied to AI. Policy is evolving, so check the current position for your sector. This is general information, not legal advice.',
      },
      {
        q: 'Do we need an in-house AI team to adopt AI?',
        a: 'Usually not for a first system. You need a process owner who knows the work and its exceptions, someone accountable for the system once it runs, and access to the records involved. The build can be done with a partner, provided ownership, monitoring and support are agreed up front, whether through a managed arrangement or a documented handover.',
      },
      {
        q: 'Can AI handle Indian languages well enough for customer conversations?',
        a: 'Sometimes, and it is improving. The [Economic Survey 2025–26](https://www.indiabudget.gov.in/economicsurvey/doc/eschapter/echap14.pdf) points to public efforts such as BHASHINI and AI4Bharat that focus on Indian-language and voice-first AI. Quality can still vary by language, script, dialect and subject. Test with your customers’ real messages, including mixed Hindi and English and voice notes, and keep a person available for anything sensitive or unclear.',
      },
    ],
    bybo: [
      {
        href: '/blueprint',
        label: 'AI Opportunity Blueprint',
        why: 'A paid diagnostic that maps recurring work, measures the baseline and tests whether a system is worth building.',
      },
      {
        href: '/systems',
        label: 'AI systems and services',
        why: 'Seven AI capabilities, each built around recurring work such as documents, enquiries, operations and reporting.',
      },
      {
        href: '/systems/ai-infrastructure-governance',
        label: 'Infrastructure & Governance',
        why: 'Access controls, evaluations, logs and cost visibility, so an AI system stays accountable after launch.',
      },
    ],
    related: ['ai-readiness-checklist', 'ai-for-indian-msmes', 'control-ai-operating-costs'],
    sources: [
      {
        title: 'Cabinet Approves Ambitious IndiaAI Mission to Strengthen the AI Innovation Ecosystem (7 March 2024)',
        publisher: 'Press Information Bureau, Government of India',
        url: 'https://www.pib.gov.in/PressReleaseIframePage.aspx?PRID=2012355',
      },
      {
        title: 'IndiaAI Mission Expands AI Ecosystem with Affordable Compute and Startup Support (25 March 2026)',
        publisher: 'Press Information Bureau, Ministry of Electronics & IT',
        url: 'https://www.pib.gov.in/PressReleasePage.aspx?PRID=2245069',
      },
      {
        title: 'The 2026 AI Index Report',
        publisher: 'Stanford Institute for Human-Centered Artificial Intelligence (HAI)',
        url: 'https://hai.stanford.edu/ai-index/2026-ai-index-report',
      },
      {
        title: 'Economic Survey 2025–26, Chapter 14: Evolution of the AI Ecosystem in India: The Way Forward',
        publisher: 'Ministry of Finance, Government of India',
        url: 'https://www.indiabudget.gov.in/economicsurvey/doc/eschapter/echap14.pdf',
      },
      {
        title: 'India AI Governance Guidelines: Enabling Safe and Trusted AI Innovation',
        publisher: 'Ministry of Electronics and Information Technology (MeitY)',
        url: 'https://static.pib.gov.in/WriteReadData/specificdocs/documents/2025/nov/doc2025115685601.pdf',
      },
    ],
  },
];

export default guides;
