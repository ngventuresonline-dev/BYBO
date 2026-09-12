import type { Guide } from '../types';

const guides: Guide[] = [
  {
    slug: 'business-automation-cost-india',
    collection: 'ai-systems',
    title: 'How Much Does Business Automation Cost in India?',
    description:
      'What business automation really costs in India: discovery, integrations, model usage, hosting, review time and upkeep, and how to judge value and quotes.',
    dek:
      'Nobody can price your workflow before seeing it. Here is the honest structure of an automation budget, what pushes it up or down, and how to compare two quotes.',
    keywords: [
      'business automation cost in India',
      'AI automation pricing India',
      'cost of an AI system for business',
      'automation project budget',
      'AI implementation cost',
      'how to compare automation quotes',
    ],
    publishedAt: '2026-09-11',
    visual: {
      kind: 'layers',
      title: 'Where the money actually goes',
      layers: [
        { label: 'Discovery', note: 'Map the work, agree scope and measures' },
        { label: 'Build and integrations', note: 'Connecting your tools is often the largest part' },
        { label: 'Model usage', note: 'Charged by volume, length and retries' },
        { label: 'Hosting and tools', note: 'Servers, storage, logging, alerting' },
        { label: 'Human review', note: 'Paid staff time inside the workflow' },
        { label: 'Upkeep and changes', note: 'Fixes, new formats, rules that move' },
      ],
    },
    summary: [
      'No honest quote exists before someone has seen the workflow, the real inputs and the tools it must touch.',
      'Integration, review time and upkeep usually cost more than model usage. Price the whole workflow, not the model.',
      'Estimate value against a measured baseline: time per case today, error and rework rate, and what a delay costs.',
      'A fixed-scope first release with written acceptance checks protects both sides better than an open-ended build.',
    ],
    sections: [
      {
        id: 'what-you-pay-for',
        heading: 'What are you actually paying for?',
        blocks: [
          {
            type: 'p',
            text: 'A quote for business automation is not a price for software. It is a price for a set of decisions being made carefully: what the system will handle, what it will refuse, which of your tools it will touch, who approves what, and how anyone will know it is working. The model is one line in that budget, and rarely the biggest one.',
          },
          {
            type: 'p',
            text: 'Costs come in two shapes. One-off costs cover discovery, design, the build itself, integration with your existing tools, testing on real cases and training the people who will use it. Recurring costs cover model usage, hosting, the staff time spent reviewing, monitoring and the upkeep that keeps the system honest as your work changes. A quote that describes only the first shape is incomplete, and the second shape is where surprises live.',
          },
          {
            type: 'note',
            tone: 'insight',
            title: 'Ask for the running cost before you sign',
            text: 'A build price without an estimated monthly cost at your volumes is half a quote. Ask what the system costs to run in month one, month six and at double the volume.',
          },
        ],
      },
      {
        id: 'cost-lines',
        heading: 'Which lines make up an automation budget?',
        blocks: [
          {
            type: 'p',
            text: 'Whatever the vendor calls them, most projects contain the same lines. Reading a proposal against this list makes gaps obvious: if a line is missing, either it is genuinely not needed, or it has been left for you to absorb later.',
          },
          {
            type: 'table',
            caption: 'The lines behind an automation quote',
            head: ['Cost line', 'What drives it', 'When you pay'],
            rows: [
              ['Discovery', 'Workflow complexity and number of exceptions', 'Once, before the build'],
              ['Design and build', 'Rules, screens, test cases, training', 'Once'],
              ['Integrations', 'How many tools, and what access they allow', 'Once, then upkeep'],
              ['Model usage', 'Volume, input length, retries, agent steps', 'Every month'],
              ['Hosting and tools', 'Storage, logs, monitoring, message channels', 'Every month'],
              ['Human review', 'Share of cases a person still checks', 'Every month, in salaries'],
              ['Maintenance', 'Format changes, rule changes, failures', 'Monthly or per change'],
              ['Change requests', 'Anything agreed after the scope was fixed', 'Per change'],
            ],
          },
          {
            type: 'p',
            text: 'The last line is where budgets usually slip. A new supplier format, a second approval level, a report leadership asks for in month three: each is reasonable, and each is work. Agree in advance how changes are estimated and approved, so the tenth small request does not arrive as one large invoice.',
          },
        ],
      },
      {
        id: 'integrations',
        heading: 'Why do integrations often cost more than the model?',
        blocks: [
          {
            type: 'p',
            text: 'Reading an invoice is now the easy part. Posting it into your accounting software, matching it to the right purchase order, respecting the permissions your finance team already set, handling the case where the software is unreachable at 6pm, and leaving a record someone can audit: that is the work. Every business runs a different combination of accounting software, CRM, order systems, shared drives and messaging channels, and each differs in what it will let an outside system read or write.',
          },
          {
            type: 'list',
            items: [
              'Cheaper to connect: modern software with a documented interface, one system to write to, and an administrator who can grant access this week.',
              'Dearer to connect: older on-premise software, screen-scraping or file exports as the only route, two systems that must stay in step, or access that needs a security review.',
              'Dearer again: work that spans several teams, where each handoff needs its own rules, retries and escalation path.',
            ],
          },
          {
            type: 'p',
            text: 'This is not an argument against connecting your tools. It is an argument for finding out early what each connection actually requires, because the answer moves the budget far more than the choice of model does. Where a workflow already wastes hours in re-keying between systems, the connection is usually the part worth paying for. [The real cost of repetitive work](/insights/real-cost-of-repetitive-work) covers how to size that side of the ledger.',
          },
        ],
      },
      {
        id: 'running-costs',
        heading: 'What does it cost to run each month?',
        blocks: [
          {
            type: 'p',
            text: 'Model usage is metered. You pay by how much text or how many documents go in and out, so longer inputs, retries, multi-step agent runs and rising volumes all raise the bill without anyone deciding to spend more. It is usually a modest line for a single workflow, and an unpleasant one if nobody watches it. Our guide on [keeping AI operating costs visible](/insights/control-ai-operating-costs) goes further into the mechanics.',
          },
          {
            type: 'p',
            text: 'Human review is the line most often left out. If a person checks a fifth of cases and each check takes three minutes, that is real salaried time, and it belongs in the cost per completed case. It should fall as the rules improve, but it should never fall to zero for consequential work.',
          },
          {
            type: 'p',
            text: 'Then there is upkeep. Research on production machine-learning systems described it as common to incur [massive ongoing maintenance costs](https://proceedings.neurips.cc/paper/2015/file/86df7dcfd896fcaf2674f757a2463eba-Paper.pdf) in real-world systems, and pointed at system-level causes around the model: data dependencies, configuration issues, hidden feedback loops and changes in the outside world. [NIST’s AI Risk Management Framework](https://nvlpubs.nist.gov/nistpubs/ai/NIST.AI.100-1.pdf) makes a related point in its comparison with traditional software: AI systems may require more frequent maintenance, and triggers for corrective maintenance, because data, models and the concepts they represent drift over time. Budget for someone to look after the system, not only to build it.',
          },
          {
            type: 'note',
            tone: 'caution',
            title: 'Running costs move on their own',
            text: 'Providers change prices and retire model versions. Volumes grow in your busy season. A quarterly check of cost per completed case keeps that from becoming a surprise.',
          },
        ],
      },
      {
        id: 'cheaper-or-dearer',
        heading: 'What makes one project cheaper and another dearer?',
        blocks: [
          {
            type: 'p',
            text: 'Two companies can ask for the same thing in the same words and receive quotes that differ by a wide margin, honestly. These are the conditions that usually explain it.',
          },
          {
            type: 'list',
            items: [
              'Cheaper: one workflow with a clear start and finish, one or two document types, digital inputs, rules that are already written down, and a named owner who can decide.',
              'Cheaper: approval stays manual in the first release, so the system prepares work instead of committing the business.',
              'Dearer: poor scans, handwriting, several languages, voice, or inputs that arrive in a different shape from every supplier.',
              'Dearer: many connected tools, several teams in the chain, tight response times, or decisions in a regulated activity that need extra evidence and sign-off.',
              'Dearer: a custom interface for staff or customers, rather than the workflow running inside tools they already use.',
            ],
          },
          {
            type: 'p',
            text: 'The useful move is to shrink the first release rather than to shrink the care taken over it. A narrow build that handles one document type well, with review in place, teaches you what the wider version should cost.',
          },
        ],
      },
      {
        id: 'value-against-baseline',
        heading: 'How do you estimate the value against your baseline?',
        blocks: [
          {
            type: 'p',
            text: 'Cost only means something next to a baseline. Measure the current work before you buy anything: cases per month, minutes of handling per case, waiting time between steps, error and rework rate, and what a late or wrong case costs you in penalties, credit notes or lost orders. NIST’s framework notes that managing systems intended to augment or replace human activity needs some form of baseline measure for comparison, and that it is genuinely hard to do well. Rough numbers agreed by the people doing the work beat precise numbers nobody believes.',
          },
          {
            type: 'example',
            title: 'Illustrative example: arithmetic for a Nashik parts distributor',
            text: 'Suppose the accounts team handles 400 supplier invoices a month, and each takes about twelve minutes of opening, typing and checking. That is 80 hours a month. Put your own fully loaded hourly cost against those hours and you have today’s clerical cost, before counting the errors caught late. Now suppose a system reads and matches the invoices, and that after three months two-thirds go through with a quick approval while the rest still need a person. The saving is not 80 hours: it is the difference between 80 hours and the review time that remains, minus model usage, hosting and a share of upkeep. Write those three lines down and the arithmetic argues with itself honestly. The numbers here are invented to show the method, not a claim about what any business achieves.',
          },
          {
            type: 'p',
            text: 'Be careful with the second half of the sum. Hours released only become money if they are used for something else or absorb growth you would otherwise hire for. The [2026 AI Index](https://hai.stanford.edu/ai-index/2026-ai-index-report) reports, from a survey of organisations using AI, that the share of respondents who believed AI had improved a given organisational measure was often similar to the share who believed it had no effect. Being specific about which measure you expect to move, and by how much, is what separates a business case from an aspiration.',
          },
        ],
      },
      {
        id: 'comparing-quotes',
        heading: 'How should you compare two quotes?',
        blocks: [
          {
            type: 'p',
            text: 'Price alone tells you very little, because the two proposals rarely describe the same job. Put both against the same questions.',
          },
          {
            type: 'list',
            ordered: true,
            items: [
              'What exactly is in scope, and what is explicitly out?',
              'What must our team supply: access, sample cases, decisions, reviewer time?',
              'What are the acceptance checks, and who signs them off?',
              'What is the estimated monthly running cost at our volumes, and at double?',
              'What happens when a document format or rule changes? Who pays?',
              'Who owns the code, the prompts, the evaluation cases and the data?',
              'What does handover or exit look like if we part ways in a year?',
            ],
          },
          {
            type: 'p',
            text: 'Prefer a fixed-scope first release with written acceptance checks. It forces both sides to be specific, gives you a real result to judge, and keeps the option of stopping. Open-ended time-and-materials work can suit genuine research, but for a first business workflow it moves the risk onto the party with the least information, which is usually you.',
          },
          {
            type: 'p',
            text: 'BYBO does not publish prices, because a number without your workflow behind it would be guesswork. Scope and fee are agreed before a [Blueprint](/blueprint) begins: the fee is quoted after scoping, and credited against implementation if you go ahead. The Blueprint itself produces the things a costed decision needs, including a workflow map, a cost baseline in time and rupees, a readiness review and a 90-day roadmap. If you would rather start with a conversation about the workflow, [tell us what keeps coming back](/apply).',
          },
        ],
      },
    ],
    limitations: [
      'No article can price your project. Volumes, inputs, tools and rules change the answer more than the choice of technology does.',
      'Model, hosting and channel prices change, and providers retire versions. Any estimate you build today needs revisiting before you commit.',
      'Savings are estimates until measured. Time released is only money if it absorbs growth or is used for other work.',
      'This is a general guide to cost structure. It is not a quotation, a market benchmark, or advice on any particular vendor’s pricing.',
    ],
    faqs: [
      {
        q: 'How much does it cost to automate a business process in India?',
        a: 'There is no single figure, and any quote given before someone has seen the workflow is guesswork. The honest answer depends on how many tools must be connected, how varied the inputs are, how much of the decision stays with a person, and what the system must be able to prove afterwards. Ask instead for the cost structure: one-off build, monthly running cost at your volumes, and the price of changes.',
      },
      {
        q: 'Is an AI system cheaper than hiring another person?',
        a: 'They are not the same purchase. A person handles ambiguity, exceptions and relationships; a system handles volume and consistency, and still needs someone to review the cases it cannot settle. The comparison worth doing is cost per completed case against your current baseline, including review time and upkeep. Often the honest result is that a system absorbs growth rather than removing a role.',
      },
      {
        q: 'What are the ongoing monthly costs of an AI workflow?',
        a: 'Model usage, hosting and storage, any message or channel charges, monitoring, the staff time spent reviewing and correcting, and maintenance as formats and rules change. Model usage moves with volume, input length and retries, so it is worth setting a budget alert per workflow from the first week. Track cost per completed case rather than cost per model call.',
      },
      {
        q: 'Why do two quotes for the same brief differ so much?',
        a: 'Usually because they describe different jobs. One may assume you supply clean digital inputs and a single system to write to; the other may include integration work, evaluation on real cases, reviewer training and a support arrangement. Differences in what happens after launch, who owns the work and how change requests are priced explain more of the gap than day rates do.',
      },
      {
        q: 'Should we pay for a discovery or diagnostic before building?',
        a: 'It is usually cheaper than discovering the same facts during a build. A paid diagnostic should produce something you can use even if you never build: a map of the workflow, a measured baseline, a readiness review and a recommendation about what to automate or leave alone. Ask what you keep, and whether the fee is credited against implementation if you proceed.',
      },
    ],
    bybo: [
      {
        href: '/blueprint',
        label: 'AI Opportunity Blueprint',
        why: 'A paid diagnostic that produces a workflow map, a cost baseline and a costed recommendation before any build.',
      },
      {
        href: '/how-we-work',
        label: 'How we work',
        why: 'Shows where baseline measures, acceptance checks and cost visibility sit in the delivery process.',
      },
      {
        href: '/apply',
        label: 'Talk to BYBO',
        why: 'Describe the recurring work and its volumes to start a conversation about scope and fee.',
      },
    ],
    related: ['real-cost-of-repetitive-work', 'control-ai-operating-costs', 'build-buy-or-integrate-ai'],
    sources: [
      {
        title: 'Artificial Intelligence Risk Management Framework (AI RMF 1.0), NIST AI 100-1',
        publisher: 'National Institute of Standards and Technology (NIST)',
        url: 'https://nvlpubs.nist.gov/nistpubs/ai/NIST.AI.100-1.pdf',
      },
      {
        title: 'Hidden Technical Debt in Machine Learning Systems (NeurIPS 2015)',
        publisher: 'Advances in Neural Information Processing Systems 28',
        url: 'https://proceedings.neurips.cc/paper/2015/file/86df7dcfd896fcaf2674f757a2463eba-Paper.pdf',
      },
      {
        title: 'The 2026 AI Index Report, Chapter 4: Economy',
        publisher: 'Stanford Institute for Human-Centered Artificial Intelligence (HAI)',
        url: 'https://hai.stanford.edu/ai-index/2026-ai-index-report',
      },
    ],
  },
  {
    slug: 'build-buy-or-integrate-ai',
    collection: 'ai-systems',
    title: 'Build, Buy or Integrate: Choosing the Right AI Approach for Your Business',
    seoTitle: 'Build, Buy or Integrate AI: How to Choose',
    description:
      'Buy a product, integrate models into the tools you already run, or build a platform. The criteria that decide it, a comparison table and sensible hybrids.',
    dek:
      'Most AI decisions are not about models. They are about who controls the workflow, the data and the roadmap. Here is how to choose between buying, integrating and building.',
    keywords: [
      'build vs buy AI',
      'build buy or integrate AI',
      'custom AI platform vs SaaS',
      'AI integration for business',
      'choosing an AI approach',
      'AI vendor selection',
    ],
    publishedAt: '2026-09-11',
    visual: {
      kind: 'spectrum',
      title: 'From buying to building',
      from: 'Buy what exists',
      to: 'Build your own',
      stops: [
        { label: 'Buy a product', note: 'Fastest start, least control over change' },
        { label: 'Configure and extend', note: 'Your rules inside software you rent' },
        { label: 'Integrate models', note: 'AI inside the tools you already run' },
        { label: 'Build a platform', note: 'Your workflow, your data, your interface' },
      ],
    },
    summary: [
      'Buy for work that is the same everywhere. Build only where the way you work is genuinely yours.',
      'Integration is the middle route most growing businesses need: your tools, your rules, models used where they help.',
      'Decide on differentiation, data, control, cost over time, speed, skills, lock-in and compliance, not on the demo.',
      'Hybrids are normal. Buy the common parts, integrate the connections, build the one thing nobody sells you.',
    ],
    sections: [
      {
        id: 'three-routes',
        heading: 'What do build, buy and integrate actually mean?',
        blocks: [
          {
            type: 'p',
            text: 'Almost every AI decision a growing company faces comes down to one of three routes, or a mix of them. The words get used loosely in sales conversations, so it is worth being precise about what each one commits you to.',
          },
          {
            type: 'list',
            items: [
              'Buy. You subscribe to software that already has AI features: a helpdesk that drafts replies, accounting software that reads receipts, a CRM that scores enquiries. The vendor owns the product, the model choice and the roadmap.',
              'Integrate. You keep the tools you run today and add AI where it helps: a model reads incoming documents and writes to your accounting software, or answers staff questions from your own approved files. You own the workflow and the rules; the model and the tools are rented.',
              'Build. You commission a platform shaped around your workflow, your data and the people who use it, with your own interface and your own operating rules.',
            ],
          },
          {
            type: 'p',
            text: 'The routes are not rival philosophies. A business of 200 people typically buys most of its software, integrates two or three workflows that matter, and builds at most one thing. The mistake is choosing a route by habit rather than by what the work needs. If the underlying idea of a workflow with inputs, rules, review and logs is new, start with [what a business AI system is](/insights/what-is-a-business-ai-system) and come back.',
          },
        ],
      },
      {
        id: 'decision-criteria',
        heading: 'Which criteria actually decide it?',
        blocks: [
          {
            type: 'p',
            text: 'Eight questions settle most of these decisions. Answer them about a specific workflow, not about your company in general, because the right answer for supplier invoices is often different from the right answer for your customer portal.',
          },
          {
            type: 'table',
            caption: 'Comparing the three routes',
            head: ['What matters', 'Buy', 'Integrate', 'Build'],
            rows: [
              ['Differentiation', 'Same as competitors', 'Your rules, rented tools', 'Your way of working'],
              ['Time to first result', 'Days or weeks', 'Weeks', 'Months'],
              ['Control over change', 'The vendor’s roadmap', 'Shared', 'Yours'],
              ['Data and access', 'Their terms', 'Agreed access per tool', 'You decide'],
              ['Cost shape', 'Per user, every month', 'Usage plus integration', 'Build now, run later'],
              ['Skills needed', 'Admin and training', 'Integration and review', 'Product and operations'],
              ['Switching later', 'Export and retrain people', 'Replace one connector', 'You hold the code'],
              ['Compliance evidence', 'What the vendor provides', 'Your logs, their processing', 'Whatever you design'],
            ],
          },
          {
            type: 'p',
            text: 'Two of these deserve more weight than they usually get. Cost over time, because a per-seat subscription that suits 20 people can look very different at 200. And control over change, because a workflow you depend on is only as stable as the roadmap underneath it.',
          },
        ],
      },
      {
        id: 'when-to-buy',
        heading: 'When is buying the right answer?',
        blocks: [
          {
            type: 'p',
            text: 'Buy when the work is the same in your business as in a thousand others, and being different would gain you nothing. Payroll, expense claims, e-way bill filing, meeting notes, basic helpdesk replies: there is no advantage in a bespoke version, and a product built for that job will be better tested than anything commissioned once.',
          },
          {
            type: 'p',
            text: 'Buying also wins when you need a result this quarter and have nobody to run a build. The honest trade is that you inherit someone else’s decisions: which model, what happens to your data, when features change, and what the price is in three years. Read what the contract says about processing your data, where it is stored and whether your content is used to improve their models.',
          },
          {
            type: 'note',
            tone: 'insight',
            title: 'Buy the boring parts on purpose',
            text: 'Every hour spent building something ordinary is an hour not spent on the workflow that only your business has. Buying the ordinary parts is a way of protecting the budget for the one that matters.',
          },
        ],
      },
      {
        id: 'when-to-integrate',
        heading: 'When does integrating models into your existing tools win?',
        blocks: [
          {
            type: 'p',
            text: 'Integration is the route most growing Indian businesses actually need, and the one most often skipped. Your records already live in accounting software, a CRM, an order system and a shared drive. Your rules already exist, even if only in someone’s head. What is missing is the part that reads the incoming document or enquiry, applies those rules, puts the result where it belongs and asks a person when it should.',
          },
          {
            type: 'p',
            text: 'It suits work where the process is yours but the components are not: an approval sequence particular to your business, a matching rule your finance head insists on, a WhatsApp enquiry flow that must respect what your sales team has promised. You keep the tools your team already knows, so training is lighter, and you can replace one model or one connector later without rebuilding the workflow.',
          },
          {
            type: 'list',
            items: [
              'Good signs for integrating: the tools expose a documented interface, an administrator can grant access, and the rules can be written down.',
              'Hard signs: the only route into a system is a manual export, or the vendor forbids automated access under your plan.',
              'Watch for: two systems that must stay in step, which turns one integration into a reconciliation problem.',
            ],
          },
        ],
      },
      {
        id: 'when-to-build',
        heading: 'When is a custom platform justified?',
        blocks: [
          {
            type: 'p',
            text: 'Build when the way you work is the product. That usually means one of four things: no vendor sells software for your particular process; the workflow is how you compete, so being average at it costs you customers; several roles need one place to work rather than four tools and a spreadsheet; or you plan to offer the capability to your own customers or partners.',
          },
          {
            type: 'p',
            text: 'Building is the only route that gives you the interface, the data model and the roadmap. It is also the one that asks most of you: product decisions, testing on real cases, a named owner, and an operating arrangement after launch. BYBO’s [Custom AI Platforms](/systems/custom-ai-platforms) work starts from a validated workflow for exactly that reason, and its own guidance is blunt about the test: a custom platform is right when your needs cannot be met well by an existing product or a simpler integration, and that is worth validating before committing.',
          },
          {
            type: 'note',
            tone: 'caution',
            title: 'A build you cannot operate is a liability',
            text: 'Ask who will monitor quality, handle failures, review costs and approve changes after launch. If the answer is nobody, buy or integrate instead, and revisit the build when that person exists.',
          },
        ],
      },
      {
        id: 'hybrid',
        heading: 'What does a sensible hybrid look like?',
        blocks: [
          {
            type: 'p',
            text: 'In practice the routes combine, and the interesting question is where you draw the line between them rather than which label you pick.',
          },
          {
            type: 'example',
            title: 'Illustrative example: a Jaipur handicrafts exporter',
            text: 'Suppose an exporter with 60 staff sells to European retailers. It buys standard software for accounting and email, because nothing about those is particular to the business. It integrates a document workflow that reads incoming purchase orders and specification sheets in several formats, checks them against the price list and stock, and puts the exceptions in front of the export desk with the original attached. It builds nothing in year one. In year two, when the same buyers start asking for a portal to track their orders, sample approvals and shipping documents, that becomes the case for a small platform, because no product sells the way this business handles sampling. Each step is decided on its own evidence, not as a single technology strategy.',
          },
          {
            type: 'p',
            text: 'A useful pattern: buy the commodity, integrate the connective work, and reserve building for the one workflow your customers would notice if you did it badly.',
          },
        ],
      },
      {
        id: 'lock-in-and-responsibility',
        heading: 'What about lock-in, data and who is responsible?',
        blocks: [
          {
            type: 'p',
            text: 'Every route creates some dependency. Buying ties you to a vendor’s product and price. Integrating ties you to a model provider and to whatever access your tools allow. Building ties you to your own code and to whoever maintains it. The question is not how to avoid dependency but how expensive it would be to change your mind, which is the subject of [AI vendor lock-in](/insights/ai-vendor-lock-in).',
          },
          {
            type: 'p',
            text: '[NIST’s AI Risk Management Framework](https://nvlpubs.nist.gov/nistpubs/ai/NIST.AI.100-1.pdf) treats this as a governance matter rather than a technical one. It asks for policies and procedures covering AI risks arising from third-party software and data, contingency processes for failures in third-party systems judged high-risk, and regular monitoring of the risks and benefits of third-party resources. It also notes that technologies acquired from third parties may be complex or opaque, and that the supplier’s risk tolerance may not match yours.',
          },
          {
            type: 'p',
            text: 'Responsibility does not transfer with the invoice. Under India’s [Digital Personal Data Protection Act, 2023](https://www.meity.gov.in/static/uploads/2024/06/2bf1f0e9f04e6fb4f8fef35e82c42aa5.pdf), a Data Fiduciary is responsible for complying with the Act in respect of processing undertaken on its behalf by a Data Processor, irrespective of any agreement to the contrary, and may involve a processor only under a valid contract. In plain terms: if you buy a tool that handles your customers’ personal data, the obligation stays with you, and the contract is part of how you meet it.',
          },
          {
            type: 'note',
            tone: 'caution',
            title: 'General information, not legal advice',
            text: 'The DPDP Rules were notified in November 2025 and their provisions commence in phases, so check which obligations already apply. Confirm your position with a qualified adviser before relying on this.',
          },
        ],
      },
      {
        id: 'how-to-decide',
        heading: 'How do you decide without a six-month study?',
        blocks: [
          {
            type: 'p',
            text: 'Take one workflow, not the whole company, and work through it in a fortnight.',
          },
          {
            type: 'list',
            ordered: true,
            items: [
              'Describe the unit of work and its finish line: from “purchase order arrives” to “order confirmed in the system”.',
              'Ask whether anything about how you do it is genuinely yours, or whether you do it the way everyone does.',
              'Look for a product that already covers it, and trial it with your real cases, not the vendor’s demo data.',
              'If it fits at eighty per cent, buy and adjust your process. If it fits the shape but not your rules, integrate.',
              'Only if neither holds, scope a first version of a build with a fixed boundary and written acceptance checks.',
              'Whichever route you pick, agree the owner, the review step, the logs and the cost view before launch.',
            ],
          },
          {
            type: 'p',
            text: 'An outside view helps when the answer is contested internally. BYBO’s [Blueprint](/blueprint) exists for this decision: it maps the workflow, measures the baseline, reviews readiness and recommends what to automate, integrate or leave alone, with scope and fee agreed before it begins. A clear recommendation to buy something you already own is a perfectly good outcome.',
          },
        ],
      },
    ],
    limitations: [
      'This compares routes, not products. Any specific tool needs its own trial on your real cases before you commit.',
      'Vendors change. A product that fits today can shift its pricing, features or terms, which is why exit cost belongs in the decision.',
      'Building is not automatically more capable. A poorly operated custom platform is worse than a well-run subscription.',
      'Regulated activities such as lending, insurance and healthcare carry sector rules that may narrow your options regardless of preference.',
    ],
    faqs: [
      {
        q: 'Should we build our own AI tool or buy an existing one?',
        a: 'Buy when the work is the same in your business as in everyone else’s, and build only where your way of working is genuinely different or is what customers value. Between the two sits integration, which usually fits growing businesses best: keep the tools you run, add models where they help, and keep the rules and the review in your hands.',
      },
      {
        q: 'Is a custom AI platform worth the cost for a mid-sized company?',
        a: 'Only when a product or an integration cannot do the job well. The test is not company size but whether the workflow is particular to you, whether several roles need one place to work, and whether someone will own it after launch. Validate the workflow first, then scope a narrow first version with written acceptance checks rather than a full platform.',
      },
      {
        q: 'What is the difference between integrating AI and buying AI software?',
        a: 'When you buy, the vendor decides the workflow, the model and the roadmap, and you configure what they allow. When you integrate, you keep your existing tools and add a model inside a workflow you define: your rules, your approval points, your logs. Integration takes longer to set up and gives you more control over how the work is actually done.',
      },
      {
        q: 'How do we avoid getting locked into one AI vendor?',
        a: 'Keep the workflow, the rules and the evaluation cases as yours rather than as settings inside a product. Prefer separation between your system and the model provider so a model can be swapped. Ask what you can export and in what format, who owns prompts and code, and what handover looks like. Then price the cost of leaving before you sign.',
      },
      {
        q: 'Can we start by buying and move to building later?',
        a: 'Yes, and it is often the sensible order. A bought product teaches you what the work really needs, which makes a later build cheaper and better specified. Protect that path by keeping your data exportable, documenting the rules you apply and recording the cases the product handles badly. Those become the requirements for whatever comes next.',
      },
    ],
    bybo: [
      {
        href: '/systems/custom-ai-platforms',
        label: 'Custom AI Platforms',
        why: 'Explains when a build is justified and how a platform is shaped around a validated workflow.',
      },
      {
        href: '/blueprint',
        label: 'AI Opportunity Blueprint',
        why: 'A paid diagnostic that recommends what to automate, integrate or leave alone before you commit.',
      },
      {
        href: '/systems',
        label: 'Systems overview',
        why: 'See the workflow patterns behind documents, enquiries, operations, knowledge and reporting.',
      },
    ],
    related: ['ai-vendor-lock-in', 'business-automation-cost-india', 'ai-for-indian-msmes'],
    sources: [
      {
        title: 'Artificial Intelligence Risk Management Framework (AI RMF 1.0), NIST AI 100-1',
        publisher: 'National Institute of Standards and Technology (NIST)',
        url: 'https://nvlpubs.nist.gov/nistpubs/ai/NIST.AI.100-1.pdf',
      },
      {
        title: 'The Digital Personal Data Protection Act, 2023 (No. 22 of 2023)',
        publisher: 'Ministry of Electronics and Information Technology (MeitY), Government of India',
        url: 'https://www.meity.gov.in/static/uploads/2024/06/2bf1f0e9f04e6fb4f8fef35e82c42aa5.pdf',
      },
    ],
  },
  {
    slug: 'ai-readiness-checklist',
    collection: 'ai-systems',
    title: 'A Practical AI Readiness Checklist for Growing Businesses',
    description:
      'An AI readiness checklist for growing businesses: the work, the data, systems and access, people and ownership, governance, budget and how to measure results.',
    dek:
      'Readiness is not about how modern your company feels. It is about one workflow: whether it can be described, measured, reached, reviewed and owned. Check it honestly.',
    keywords: [
      'AI readiness checklist',
      'is my business ready for AI',
      'AI readiness assessment',
      'preparing for AI adoption',
      'AI readiness for SMEs',
      'data readiness for AI',
    ],
    publishedAt: '2026-09-11',
    visual: {
      kind: 'checklist',
      title: 'Check these before you start',
      items: [
        'One recurring workflow with a clear finish',
        'A measured baseline in time and rupees',
        'Real examples you can actually reach',
        'Access your tools can grant safely',
        'A named owner and a named reviewer',
        'Written rules for exceptions and stopping',
        'A budget line for running and upkeep',
      ],
    },
    summary: [
      'Readiness is judged per workflow, not per company. A firm can be ready for invoices and not for enquiries.',
      'Six areas decide it: the work, the data, systems and access, people and ownership, governance, and budget with measurement.',
      'Ready enough means most boxes tick and the gaps have owners and dates, not that everything is perfect.',
      'A clear “not yet” is a useful result. Fix access, rules and the baseline first, then revisit.',
    ],
    sections: [
      {
        id: 'what-ready-means',
        heading: 'What does “ready” actually mean?',
        blocks: [
          {
            type: 'p',
            text: 'Readiness is not about how modern your company feels, how much data you have stored, or whether your team uses AI assistants privately. It is about whether one specific piece of recurring work can be described precisely, measured today, reached by software, reviewed by a person and owned by someone with a name. A company can be thoroughly ready for supplier invoices and nowhere near ready for customer enquiries, and that is normal.',
          },
          {
            type: 'p',
            text: 'That framing matches how risk frameworks treat the question. [NIST’s AI Risk Management Framework](https://nvlpubs.nist.gov/nistpubs/ai/NIST.AI.100-1.pdf) puts context first: understand the purpose, the users, the business value, the risk tolerance and the data before anything is built, and use that understanding to inform an initial go/no-go decision about whether to design, develop or deploy a system at all. The point of a readiness check is to earn a confident yes or an honest not yet.',
          },
          {
            type: 'note',
            tone: 'insight',
            title: 'Score one workflow, not the company',
            text: 'Run this checklist against a single workflow with a start and a finish. Company-wide readiness scores are comfortable to produce and impossible to act on.',
          },
        ],
      },
      {
        id: 'the-work',
        heading: 'The work: is there something worth automating?',
        blocks: [
          {
            type: 'p',
            text: 'Start here, because every later question depends on it. If the work cannot be described in a sentence, nothing downstream will save the project. For a fuller method, see [how to identify repetitive work that is worth automating](/insights/identify-repetitive-work-to-automate).',
          },
          {
            type: 'list',
            items: [
              'The work repeats, at least weekly and preferably daily, in a recognisable shape.',
              'The unit of work has a name your team already uses: an invoice, an enquiry, a site-visit request, a dealer order.',
              'There is a finish line everyone agrees on, such as “entry approved in the accounting software”.',
              'Someone can describe the exceptions, and roughly how often each one occurs.',
              'The volume is enough that consistency matters, and small enough that a first release can cover it.',
              'A simpler fix has been ruled out: a template, an inbox rule or a corrected form would not solve most of it.',
            ],
          },
          {
            type: 'p',
            text: 'If the last point is unresolved, resolve it first. Automating a process that should be redesigned makes the wrong version permanent and harder to argue with.',
          },
        ],
      },
      {
        id: 'data-and-documents',
        heading: 'The data: can the system see what it needs?',
        blocks: [
          {
            type: 'p',
            text: 'Most readiness failures are quiet ones. The information exists, but not in a form anything can use: a WhatsApp thread, a printout in a drawer, a spreadsheet three people edit differently. NIST’s framework asks teams to document data availability, representativeness and suitability before relying on a system, which is a formal way of saying: check that your examples look like the work.',
          },
          {
            type: 'list',
            items: [
              'You can gather thirty to fifty recent, real cases, including the awkward ones, without a special project.',
              'The inputs are digital, or can be scanned or photographed at a quality a person could read.',
              'There is a source of truth to check against: a purchase order, a price list, a master record, a policy document.',
              'Definitions are agreed. Two departments do not mean different things by “delivered” or “active customer”.',
              'You know which of these records contain personal data, and who is allowed to see them.',
            ],
          },
          {
            type: 'p',
            text: 'You do not need clean data. You need honest data: representative of the mess the system will meet, including the supplier who still sends a photograph of a printed challan.',
          },
        ],
      },
      {
        id: 'systems-and-access',
        heading: 'Systems and access: can it reach your tools safely?',
        blocks: [
          {
            type: 'p',
            text: 'A workflow that cannot reach your records ends as a drafting assistant. This is usually the area that turns a four-week build into a twelve-week one, so answer it before scoping anything.',
          },
          {
            type: 'list',
            items: [
              'Each tool in the chain has a documented interface, or an agreed export and import route that is reliable.',
              'An administrator can create a separate account for the system, rather than borrowing a staff member’s login.',
              'Permissions can be limited to the specific records and actions the task needs.',
              'A read-only or test setup is possible for the first weeks, so nothing writes to live records before you trust it.',
              'Someone in your business can approve access decisions without a three-month procurement cycle.',
              'Your software licences and terms allow automated access under the plan you are on.',
            ],
          },
          {
            type: 'p',
            text: 'These are the same controls that keep a system accountable later: separate accounts, limited permissions and a record of what was touched. BYBO treats them as part of every build, and its [Infrastructure & Governance](/systems/ai-infrastructure-governance) work covers teams that need a broader foundation or a review of systems already running.',
          },
        ],
      },
      {
        id: 'people-and-ownership',
        heading: 'People and ownership: who is actually responsible?',
        blocks: [
          {
            type: 'p',
            text: 'Systems without owners drift. This is the cheapest section of the checklist to satisfy and the most commonly skipped, because naming people makes the project real.',
          },
          {
            type: 'list',
            items: [
              'A named business owner is accountable for the outcome, not a committee and not “operations”.',
              'A named reviewer approves the consequential cases, and has the time for it in an ordinary week.',
              'The person who knows the exceptions can give a few hours during design, and is willing to be argued with.',
              'Someone is responsible for the technical operation, whether in your team or a partner’s.',
              'Leadership has said what the system is for, so the team is not guessing whether the goal is speed, accuracy or capacity.',
            ],
          },
          {
            type: 'p',
            text: 'NIST puts the same expectation plainly: roles and responsibilities for managing AI risks should be documented and clear to the people involved. In a 40-person company that is a line in a shared sheet, not an organisation chart.',
          },
        ],
      },
      {
        id: 'governance',
        heading: 'Governance: what happens when it gets something wrong?',
        blocks: [
          {
            type: 'p',
            text: 'You do not need a policy document to start. You need agreed answers to a handful of questions, written where the team can see them.',
          },
          {
            type: 'list',
            items: [
              'What the system may do on its own, and the limits: amounts, customers, record types.',
              'What always waits for approval: money, commitments to customers, changes to master records.',
              'When it must stop and escalate rather than guess.',
              'What gets logged: the input, the sources used, the proposed action, the approver and the result.',
              'Who a customer or colleague contacts when the system gets something wrong, and who fixes the cause.',
              'Whether personal data enters prompts or logs, why it is needed and how long it is kept.',
            ],
          },
          {
            type: 'note',
            tone: 'caution',
            title: 'Personal data: general information, not legal advice',
            text: 'India’s DPDP Rules were [notified in November 2025](https://www.pib.gov.in/PressReleasePage.aspx?PRID=2190655) and commence in phases, with most business obligations applying later. Check the current text and take advice for your case.',
          },
        ],
      },
      {
        id: 'budget-and-measurement',
        heading: 'Budget and measurement: how will you know it worked?',
        blocks: [
          {
            type: 'p',
            text: 'Two numbers decide whether a project is judged fairly: what the work costs today, and what the system costs to run. Collect the first before the build starts, because afterwards nobody can reconstruct it without argument.',
          },
          {
            type: 'table',
            caption: 'Baseline numbers to have before the first release',
            head: ['Measure', 'Where today’s number comes from'],
            rows: [
              ['Cases per month', 'Inbox counts, system exports, a two-week tally'],
              ['Minutes of handling per case', 'A timed sample with the people doing it'],
              ['Waiting time between steps', 'Timestamps, or a simple log kept for a week'],
              ['Errors and rework', 'Corrections, credit notes, repeated entries'],
              ['Cost per completed case', 'Staff time plus the tools already paid for'],
            ],
          },
          {
            type: 'p',
            text: 'Then budget for the running side, not only the build: model usage, hosting, reviewer time, monitoring, upkeep and the changes you will want in month three. [How much business automation costs in India](/insights/business-automation-cost-india) sets out those lines. A project with a build budget and no operating budget is not ready, however good the workflow looks.',
          },
        ],
      },
      {
        id: 'ready-enough',
        heading: 'What does “ready enough” look like, and what if you are not?',
        blocks: [
          {
            type: 'p',
            text: 'Ready enough is not a full set of ticks. It means the work, the people and the access are in place, the baseline can be measured within a fortnight, and every remaining gap has an owner and a date. If the gaps sit in the first, fourth or fifth section, fix them before building. If they sit in the data, a first release can often be narrowed to the document types you do have.',
          },
          {
            type: 'example',
            title: 'Illustrative example: a Ludhiana auto-components maker scores itself',
            text: 'Suppose a components maker with 120 staff runs this checklist against incoming customer purchase orders. The work is clearly repeating and has a finish line. Real examples are easy to find, though a third arrive as scanned attachments from two large buyers. The order system has an interface, but only the IT vendor can create accounts, and that will take three weeks. The production planner is willing to own it and to review exceptions for thirty minutes a day. Nobody has ever counted how long an order takes to enter. The honest verdict is “not yet, and nearly”: two people spend a fortnight timing the work and the vendor is asked for an account, after which the project starts with a much better brief. No technology decision was needed to reach that answer.',
          },
          {
            type: 'p',
            text: 'If several sections are weak at once, resist the pilot. A demo built on inaccessible records and unwritten rules teaches you nothing you did not already suspect. Where the answer is contested internally, an outside diagnostic such as BYBO’s [Blueprint](/blueprint) covers the same ground formally, with a workflow map, a cost baseline, a readiness review and a recommendation about what to build, delay or leave alone. Scope and fee are agreed before it begins.',
          },
        ],
      },
    ],
    limitations: [
      'A checklist cannot judge whether a workflow is worth automating. It only tells you whether you could do it well.',
      'Passing every point does not guarantee a good result. Evaluation on real cases and monitoring after launch still decide that.',
      'Readiness ages. Access, formats, staff and volumes change, so a check done a year ago may no longer describe your position.',
      'Regulated activities may add requirements this list does not cover. Treat the data protection points as general information, not legal advice.',
    ],
    faqs: [
      {
        q: 'How do I know if my business is ready for AI?',
        a: 'Ask it about one workflow rather than the company. It should repeat, have a clear finish line, have real examples you can gather, sit in tools that can grant limited access, have a named owner and reviewer, and have a baseline you can measure within a fortnight. If those hold, you are ready enough to start narrow.',
      },
      {
        q: 'Do we need clean data before we can use AI?',
        a: 'No, but you need representative data. Thirty to fifty real recent cases, including poor scans and awkward exceptions, are more useful than a tidy sample. What does matter is a source of truth to check against and agreed definitions, so two teams do not mean different things by the same word. Perfect data is not a precondition; reachable, honest data is.',
      },
      {
        q: 'Who should own AI readiness in a growing company?',
        a: 'One named person, usually the operations head or the leader of the function whose work is being automated. They hold the checklist, chase the gaps and decide when the project starts. Each system then needs a business owner accountable for outcomes and someone responsible for running it. Shared ownership with no name attached is the common failure.',
      },
      {
        q: 'What should we do if the checklist says we are not ready?',
        a: 'Treat it as a result, not a setback. Fix the specific gap: count the work for two weeks to get a baseline, ask your software vendor for a separate account, write down the exception rules, or name a reviewer. Most gaps take weeks rather than months, and every one of them would otherwise have surfaced mid-build at a higher price.',
      },
      {
        q: 'How long does it take to become ready for a first AI system?',
        a: 'For a well-chosen workflow, often a few weeks of preparation rather than a programme of change. Measuring the baseline and gathering examples take days. Access approvals and writing down rules usually take longest. If the honest estimate runs past a quarter, the workflow is probably too broad, so narrow it and check again.',
      },
    ],
    bybo: [
      {
        href: '/blueprint',
        label: 'AI Opportunity Blueprint',
        why: 'A paid diagnostic covering workflow mapping, a cost baseline, a readiness review and a recommendation.',
      },
      {
        href: '/systems/ai-infrastructure-governance',
        label: 'Infrastructure & Governance',
        why: 'How access controls, evaluations, logs and cost visibility are set up around a working system.',
      },
      {
        href: '/how-we-work',
        label: 'How we work',
        why: 'The sequence from diagnosis to operation, with named owners and agreed acceptance checks.',
      },
    ],
    related: ['rank-ai-opportunities', 'introduce-ai-without-uncontrolled-access', 'ai-for-indian-msmes'],
    sources: [
      {
        title: 'Artificial Intelligence Risk Management Framework (AI RMF 1.0), NIST AI 100-1',
        publisher: 'National Institute of Standards and Technology (NIST)',
        url: 'https://nvlpubs.nist.gov/nistpubs/ai/NIST.AI.100-1.pdf',
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
