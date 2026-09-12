import type { Guide } from '../types';

const guides: Guide[] = [
  {
    slug: 'india-digital-economy-automation',
    collection: 'indian-business',
    title: 'India’s Digital Economy and the Next Wave of Business Automation',
    seoTitle: 'India’s Digital Economy and Business Automation',
    description:
      'India’s public digital systems now produce structured business records. What UPI, GST e-invoicing, Account Aggregator and ONDC change for automation.',
    dek:
      'India’s payments, tax and consent systems have made routine business records digital and structured. That is what makes the next wave of business automation practical, and it is also where the limits start.',
    keywords: [
      'India digital economy',
      'business automation India',
      'digital public infrastructure',
      'UPI reconciliation automation',
      'GST e-invoicing automation',
      'Account Aggregator for business',
      'ONDC for small businesses',
    ],
    publishedAt: '2026-09-11',
    visual: {
      kind: 'layers',
      title: 'From public rails to your operations',
      layers: [
        { label: 'Identity and documents', note: 'Issuer-verified records instead of photocopies' },
        { label: 'Payments', note: 'Referenced UPI records your systems can read' },
        { label: 'Tax and invoicing', note: 'One reference number for each invoice' },
        { label: 'Consent and commerce', note: 'Financial data and orders move in standard shapes' },
        { label: 'Your workflow', note: 'A person still approves anything consequential' },
      ],
    },
    summary: [
      'India’s public digital systems now emit structured records: referenced payments, reported invoices, consented financial data and verified documents.',
      'Structured data, not a cleverer model, is what makes automation dependable. Most of the remaining mess sits inside your own files.',
      'Start where a reference number already exists to check against: collections, supplier invoices, statements and onboarding documents.',
      'None of this removes judgement. People should still approve payments, credit terms and anything a customer or an officer will read.',
    ],
    sections: [
      {
        id: 'what-changed',
        heading: 'What has actually changed in India’s digital economy?',
        blocks: [
          {
            type: 'p',
            text: 'Most descriptions of India’s digital economy stop at scale. The more useful question for an operations lead is narrower: how much of the everyday paperwork now arrives as a record a computer can read without guessing? On that measure, a lot has changed in ten years.',
          },
          {
            type: 'p',
            text: 'Payments went first. In FY 2025–26, UPI carried 24,162 crore transactions worth around ₹314 lakh crore, and July 2026 alone recorded 2,366 crore transactions, with 741 banks live on the network ([Press Information Bureau](https://www.pib.gov.in/PressReleasePage.aspx?PRID=2302657)). Tax followed. Since 1 August 2023, businesses with aggregate turnover above ₹5 crore have had to report their B2B invoices to an invoice registration portal, under [Notification 10/2023-Central Tax](https://www.gstcouncil.gov.in/node/4365). Documents and commerce are moving the same way: DigiLocker had 67.63 crore users on 5 March 2026, with more than 950 crore documents issued through it by that month, and 1.16 lakh retail sellers were live on ONDC from over 630 cities and towns as of December 2025 ([PIB, India’s Digital Public Infrastructure](https://www.pib.gov.in/PressReleasePage.aspx?PRID=2235812)).',
          },
          {
            type: 'table',
            caption: 'What each public system leaves behind',
            head: ['System', 'What it produces', 'Why automation cares'],
            rows: [
              ['UPI', 'Referenced payment records', 'Match receipts without retyping'],
              ['GST e-invoicing', 'An invoice reference number', 'One agreed identity per invoice'],
              ['Account Aggregator', 'Consented financial statements', 'Data instead of scanned PDFs'],
              ['DigiLocker', 'Issuer-verified documents', 'Less checking of photocopies'],
              ['ONDC', 'Standard catalogue and order messages', 'Orders arrive in one shape'],
            ],
          },
        ],
      },
      {
        id: 'why-structured-data-matters',
        heading: 'Why does structured data matter more than the model?',
        blocks: [
          {
            type: 'p',
            text: 'Automation rarely fails because software cannot read. It fails because nobody can say which record is the true one. Two spellings of the same customer. A payment with no invoice number in the narration. A delivery note that exists only as a photo on a supervisor’s phone. When the underlying record carries an identifier, a date, an amount and a party, the work becomes checkable, and a system can be held to a rule rather than an impression.',
          },
          {
            type: 'list',
            items: [
              'An identifier: an invoice reference number, an order number, a transaction reference.',
              'A date and an amount that both sides of the transaction agree on.',
              'A party you can resolve to one customer or supplier record, not three.',
              'A status: reported, paid, delivered, cancelled, disputed.',
              'A source you can reopen when someone questions the number.',
            ],
          },
          {
            type: 'p',
            text: 'This is why the public systems matter to an ordinary business. They supply the identifiers. The [systems BYBO builds](/systems) are organised around that idea: read the record, check it against your own, and route what does not agree to a person with the evidence attached.',
          },
          {
            type: 'note',
            tone: 'insight',
            title: 'The reference number is the quiet upgrade',
            text: 'Before e-invoicing, matching a supplier bill meant reading a layout. After it, there is a number both parties reported to the same portal. That single shared key removes more automation risk than any amount of clever text extraction.',
          },
        ],
      },
      {
        id: 'payments-and-reconciliation',
        heading: 'Where does automation pay off first: collections and reconciliation',
        blocks: [
          {
            type: 'p',
            text: 'Person-to-merchant payments make up 63% of UPI transaction volume, and 86% of them are below ₹500 ([PIB](https://www.pib.gov.in/PressReleasePage.aspx?PRID=2302657)). For a retailer, distributor or clinic, that is the shape of the problem: a very large number of small, individually unremarkable credits that someone has to tie back to bills, counters, routes or days.',
          },
          {
            type: 'p',
            text: 'This is good ground for a first system because the answer is verifiable. Either the day’s collections match the day’s bills or they do not, and the difference has a name. A sensible first release reads the settlement file, matches what it can, groups the rest by likely reason, and puts a short exception list in front of one person each morning. Nothing is written back to the accounts until that person agrees.',
          },
          {
            type: 'example',
            title: 'Illustrative example: a Nashik distributor’s daily collections',
            text: 'Suppose a distributor takes around 900 UPI payments a week across four delivery routes, alongside cheques and a few cash collections. Today an accounts assistant spends most of Monday matching the bank statement to invoices, because drivers do not always note the bill number. A first release matches on amount, date, route and payer handle, clears the clean cases, and produces a list of about forty unmatched credits with the two or three invoices each one could belong to. The assistant resolves the list in an hour and the system learns the payer handles she confirms. Part payments, advances and anything from a customer on credit hold still wait for her decision.',
          },
        ],
      },
      {
        id: 'invoicing-and-reporting',
        heading: 'What does e-invoicing change for your documents and reporting?',
        blocks: [
          {
            type: 'p',
            text: 'E-invoicing changed the direction of travel for business documents. An invoice that has been reported to the portal is no longer only a file you sent; it is a record with a reference number that your customer, your supplier and your own accounts can all point to. For a business above the reporting threshold, that makes several everyday tasks less argumentative: confirming what was billed, tracing a disputed line item, or checking whether a supplier’s bill matches the purchase order and the goods received.',
          },
          {
            type: 'p',
            text: 'It also raises the cost of sloppy internal data. If your item codes, unit rates and customer names differ between your billing software, your price list and your delivery paperwork, reported invoices simply publish the inconsistency more widely. Before building anything, agree one master list for items, one for customers, and one owner for each.',
          },
          {
            type: 'note',
            tone: 'caution',
            title: 'General information, not tax or legal advice',
            text: 'Thresholds, exemptions and reporting time limits under GST change from time to time, and they differ by turnover and document type. Confirm the current position for your business with your tax adviser before you design a workflow around it.',
          },
        ],
      },
      {
        id: 'consent-and-verified-documents',
        heading: 'How do consent-based data sharing and verified documents help?',
        blocks: [
          {
            type: 'p',
            text: 'The Account Aggregator framework lets a customer share their financial information from one institution with another, with explicit consent each time. Under the Reserve Bank’s [Master Direction for Account Aggregators](https://www.rbi.org.in/Scripts/BS_ViewMasDirections.aspx?id=10598), the aggregator itself is only a conduit: it moves the information the customer has permitted and may not use that information for its own purposes. By the framework’s fourth anniversary, over 2.2 billion financial accounts were enabled for consent-based sharing and 112.34 million users had linked their accounts ([PIB](https://www.pib.gov.in/PressReleasePage.aspx?PRID=2162953)).',
          },
          {
            type: 'p',
            text: 'For a business that assesses customers, distributors or vendors, this changes the raw material. Instead of collecting six months of statements as PDFs over email and rekeying them, the data can arrive as data, with the customer’s permission recorded. DigiLocker does something similar for certificates and identity documents: the copy is issued by the source, so verification becomes a check rather than an investigation.',
          },
          {
            type: 'list',
            items: [
              'Ask for consent for a stated purpose and a stated period, and record it.',
              'Collect only the fields the decision needs, not everything available.',
              'Keep the assessment rules written down and reviewable, especially for credit terms.',
              'Let a person make the final call on limits, exceptions and rejections.',
              'Delete or restrict what you no longer need, on a schedule someone owns.',
            ],
          },
        ],
      },
      {
        id: 'reporting-and-decisions',
        heading: 'Does better data mean better decisions?',
        blocks: [
          {
            type: 'p',
            text: 'Not by itself. Cleaner inputs shorten the preparation of a report; they do not settle what the report means. Most management packs in growing companies fail on definitions rather than arithmetic. Sales includes returns in one branch and excludes them in another. Outstanding is measured from invoice date in accounts and from delivery date in sales. Two people then argue about the number instead of the business.',
          },
          {
            type: 'list',
            items: [
              'Agree the definition of each measure in writing before automating it.',
              'Show the period, the source and the last refresh next to every figure.',
              'Report the exceptions and the movement, not forty tiles nobody reads.',
              'Record what was decided and who owns the next step.',
            ],
          },
          {
            type: 'p',
            text: 'That is the discipline behind [Decision Intelligence](/systems/decision-intelligence): connect the approved sources, agree the definitions, surface what changed, and leave the interpretation with the people accountable for it. Forecasts should show their assumptions rather than present a single confident line.',
          },
        ],
      },
      {
        id: 'limits',
        heading: 'Where does public infrastructure stop and your own work begin?',
        blocks: [
          {
            type: 'p',
            text: 'Public systems standardise the edges of a transaction: the payment, the reported invoice, the consented statement, the issued certificate. They do nothing about the middle, which is where most Indian businesses actually operate. Order variations agreed on a call. Rate revisions in a WhatsApp thread. A delivery rescheduled because the customer’s godown was full. None of that arrives structured, and no amount of national infrastructure will structure it for you.',
          },
          {
            type: 'p',
            text: 'So the honest sequence is unchanged: pick one workflow, measure how it runs today, tidy the master data it depends on, and build a bounded first release with a person approving anything consequential. Our guide to [AI adoption in India](/insights/ai-adoption-in-india) sets out the national picture; this one is about the plumbing beneath it.',
          },
          {
            type: 'list',
            items: [
              'Access matters more than ambition: check what your accounting or ERP software actually permits.',
              'Exceptions are the work. Design the review queue before the automation.',
              'Keep a manual path. Portals and connections have outages, usually at month end.',
              'Watch the running cost per completed record, not only the licence fee.',
            ],
          },
        ],
      },
    ],
    limitations: [
      'National adoption figures describe the country, not your company. Your own volumes, error rates and turnaround times are the comparison that matters.',
      'E-invoicing rules, thresholds and time limits change. This is general information, and not tax or legal advice for your situation.',
      'Consent-based data sharing depends on the customer agreeing each time, and on the institutions holding the data being live on the framework.',
      'If your item and customer masters are inconsistent, structured public records will expose the problem rather than solve it.',
    ],
    faqs: [
      {
        q: 'What is digital public infrastructure, in business terms?',
        a: 'It is the shared, government-backed plumbing that many services run on: payments through UPI, tax reporting through the invoice registration portal, consented financial data through Account Aggregator, issued documents through DigiLocker, and open commerce messages through ONDC. For a business, the practical effect is that common records now carry standard identifiers, which makes them easier to check, match and automate.',
      },
      {
        q: 'Which automation should an Indian business build first?',
        a: 'Choose a workflow where a reference already exists to check against. Collections and bank reconciliation, supplier invoice matching, and document collection for onboarding are usually the strongest candidates. They repeat often, they have a verifiable right answer, and the exceptions are easy to define. Measure the current time, error rate and rework before you start, so the first release can be judged on evidence.',
      },
      {
        q: 'Do we need to be on ONDC or Account Aggregator to benefit?',
        a: 'No. Most businesses benefit indirectly, because their customers, banks and software suppliers are connected to these systems. Joining a network is a commercial decision with its own operating work, such as catalogue quality, fulfilment and support. Automation inside your own business, using the records these systems already produce, usually pays back sooner and carries less risk.',
      },
      {
        q: 'Does UPI data help with accounting automation?',
        a: 'It helps with matching. UPI settlement records carry references, timestamps and amounts, so a system can propose which invoice or bill each credit belongs to. It cannot decide how to treat a part payment, an advance or a customer on credit hold. In practice the system clears routine matches and hands a short exception list to one person, who confirms before anything is posted.',
      },
      {
        q: 'Is our data safe when we automate around these systems?',
        a: 'Treat it as a design question rather than an assumption. Decide which systems the workflow may read, which fields it needs, who can see the output and what is logged. Consent under the Account Aggregator framework is per purpose and per period. Personal data brings obligations under India’s data protection law, so confirm your position with a qualified adviser before launch.',
      },
    ],
    bybo: [
      {
        href: '/systems',
        label: 'AI systems and services',
        why: 'Seven capabilities built around recurring work: documents, enquiries, operations, knowledge and reporting.',
      },
      {
        href: '/systems/decision-intelligence',
        label: 'Decision Intelligence',
        why: 'Connect approved data, agree definitions and show what changed, with people making the decision.',
      },
      {
        href: '/blueprint',
        label: 'AI Opportunity Blueprint',
        why: 'A paid diagnostic that maps a workflow, measures the baseline and tests whether a build is worthwhile.',
      },
    ],
    related: ['spreadsheet-reporting-to-decision-intelligence', 'business-process-automation-india', 'ai-for-indian-msmes'],
    sources: [
      {
        title: 'UPI Completes 10 Years of Digital Payments Revolution (August 2026)',
        publisher: 'Press Information Bureau, Government of India',
        url: 'https://www.pib.gov.in/PressReleasePage.aspx?PRID=2302657',
      },
      {
        title: 'India’s Digital Public Infrastructure (backgrounder, March 2026)',
        publisher: 'Press Information Bureau, Government of India',
        url: 'https://www.pib.gov.in/PressReleasePage.aspx?PRID=2235812',
      },
      {
        title: 'Notification 10/2023-Central Tax, 10 May 2023: e-invoicing for aggregate turnover above ₹5 crore',
        publisher: 'GST Council, Government of India',
        url: 'https://www.gstcouncil.gov.in/node/4365',
      },
      {
        title: 'Celebrating four years of launch of the Account Aggregator Ecosystem',
        publisher: 'Press Information Bureau, Ministry of Finance',
        url: 'https://www.pib.gov.in/PressReleasePage.aspx?PRID=2162953',
      },
      {
        title: 'Master Direction – Non-Banking Financial Company – Account Aggregator (Reserve Bank) Directions, 2016',
        publisher: 'Reserve Bank of India',
        url: 'https://www.rbi.org.in/Scripts/BS_ViewMasDirections.aspx?id=10598',
      },
    ],
  },
  {
    slug: 'ai-for-indian-msmes',
    collection: 'indian-business',
    title: 'How Indian MSMEs Can Adopt AI Without Building a Large Technology Team',
    seoTitle: 'How Indian MSMEs Can Adopt AI Without a Tech Team',
    description:
      'A practical route for Indian MSMEs adopting AI: choose one workflow, use the tools you have, decide what to keep in-house, and size governance to your team.',
    dek:
      'Most MSMEs will never run an in-house AI team, and do not need one. What they do need is one workflow worth automating, a named owner for it, and a clear line between what they buy and what they keep.',
    keywords: [
      'AI for MSMEs',
      'AI for small business India',
      'MSME technology adoption',
      'AI without a technology team',
      'AI partner or in-house hire',
      'small business automation India',
    ],
    publishedAt: '2026-09-11',
    visual: {
      kind: 'matrix',
      title: 'Choosing the first workflow',
      x: ['Happens rarely', 'Happens daily'],
      y: ['Needs judgement', 'Follows clear rules'],
      quadrants: ['Automate later', 'Start here', 'Leave with people', 'Draft, a person decides'],
      highlight: 1,
    },
    summary: [
      'An MSME does not need a technology team to use AI. It needs one workflow, one owner and a measured baseline.',
      'Start inside the tools you already pay for. Commission a build only when a real limit appears, not before.',
      'Keep ownership of your data, your accounts and your decisions, whoever writes the software.',
      'Governance can fit on one page: who may use it, what needs approval, what is logged, what it costs each month.',
    ],
    sections: [
      {
        id: 'what-adoption-means',
        heading: 'What does adopting AI actually mean for an MSME?',
        blocks: [
          {
            type: 'p',
            text: 'The category is wide. In the Budget for 2025–26 the government raised the investment and turnover limits for classifying MSMEs to 2.5 and 2 times their earlier levels ([Press Information Bureau](https://www.pib.gov.in/PressReleasePage.aspx?PRID=2098389)), and the new definition took effect on 1 April 2025 ([Ministry of MSME year-end review](https://www.pib.gov.in/PressReleasePage.aspx?PRID=2209712)). A ten-person trading firm and a 300-person components maker are both MSMEs, and their AI questions are not the same.',
          },
          {
            type: 'table',
            caption: 'Classification limits after the revision, in rupees crore',
            head: ['Category', 'Investment up to', 'Turnover up to'],
            rows: [
              ['Micro', '2.5', '10'],
              ['Small', '25', '100'],
              ['Medium', '125', '500'],
            ],
          },
          {
            type: 'p',
            text: 'What they share is a constraint, not a size. More than 7.30 crore enterprises registered on the Udyam portal and the Udyam Assist Platform between July 2020 and December 2025 ([PIB](https://www.pib.gov.in/PressReleasePage.aspx?PRID=2209712)). Very few of them employ anyone whose job is software. So adoption cannot mean a platform programme. It means picking one piece of recurring work, giving it to a system with a person in charge of the result, and letting the outcome decide what happens next.',
          },
        ],
      },
      {
        id: 'constraints',
        heading: 'What really constrains a small team?',
        blocks: [
          {
            type: 'p',
            text: 'Budget is the constraint everyone names first. In practice it is rarely the binding one. Four others do more damage, and they are worth naming honestly before anyone demonstrates anything.',
          },
          {
            type: 'list',
            items: [
              'Owner attention. In most MSMEs the person who understands the exceptions is also the person selling, buying and signing cheques. Their time is the scarcest input in any project.',
              'No one to look after it. Software that nobody owns quietly stops being used. Someone has to notice when it goes wrong on a Tuesday.',
              'Records in the wrong places. Rates in a personal WhatsApp thread, orders on paper, customer history in one salesperson’s phone.',
              'Seasonality. A system that works in a normal week may fail in the festival rush, which is exactly when you needed it.',
              'Switching cost. A tool that does not sit inside the way your team already works will be abandoned within a month.',
            ],
          },
          {
            type: 'note',
            tone: 'insight',
            title: 'The scarce resource is attention, not money',
            text: 'Judge a proposal by how much of the owner’s week it consumes after launch, not only by what it costs. A system that needs an hour of the owner’s judgement every day has not saved anyone anything.',
          },
        ],
      },
      {
        id: 'one-workflow',
        heading: 'Which single workflow should you start with?',
        blocks: [
          {
            type: 'p',
            text: 'Pick work that happens often and follows rules most of the time. Frequency gives you enough cases to learn from within weeks. Rules give you a right answer to check against. Work that is rare, or that turns on relationships and judgement, belongs with people for now, whatever a demonstration suggests.',
          },
          {
            type: 'p',
            text: 'In most MSMEs the shortlist is short: enquiries arriving on WhatsApp and email, supplier invoices and delivery notes, order entry from customer messages, payment follow-ups, and the weekly numbers. BYBO’s [solutions by workflow](/solutions) are organised the same way, because the unit of work is what determines whether a system is worth building. If you have several candidates, rank them rather than argue: our guide to [ranking AI opportunities](/insights/rank-ai-opportunities) sets out a method that fits on a single sheet.',
          },
          {
            type: 'example',
            title: 'Illustrative example: a Ludhiana components maker’s order entry',
            text: 'Suppose a 40-person components maker receives around 60 purchase orders a week, most as PDFs attached to email, a few as photographs of printed sheets. Two people retype them into the accounting software, and mistakes surface at dispatch. A first release reads each order, matches part codes against the item master, checks the rate against the agreed price list, and prepares a draft sales order. Anything unmatched, any rate below the agreed price and any new buyer goes to the works manager, who approves every draft before it is created. After six weeks the firm compares entry time, dispatch errors and the number of orders needing correction against the numbers it recorded before starting.',
          },
        ],
      },
      {
        id: 'existing-tools',
        heading: 'How far can you get with tools you already pay for?',
        blocks: [
          {
            type: 'p',
            text: 'Further than most vendors will tell you. Accounting packages, spreadsheet suites, helpdesk products and business messaging tools have all added assistants and automation features. For a first step, these are usually the cheapest way to learn what your team will actually adopt, because they sit inside software your staff already open every morning.',
          },
          {
            type: 'list',
            items: [
              'Use the built-in features first, and note precisely where they stop.',
              'Write down the limit you hit: the format it cannot read, the check it cannot make, the system it cannot reach.',
              'Only then consider a build, and scope it to that limit rather than the whole department.',
              'Keep a plain record of every tool in use, who pays for it and what data it sees.',
            ],
          },
          {
            type: 'note',
            tone: 'caution',
            title: 'Unmanaged tools are the real exposure',
            text: 'In many small companies staff already paste customer details, price lists and draft contracts into consumer AI apps on personal accounts. That is a bigger risk than any project you are considering. Decide what may be pasted where, and say so in writing, before you start anything new.',
          },
        ],
      },
      {
        id: 'partner-or-hire',
        heading: 'Should you hire someone or work with a partner?',
        blocks: [
          {
            type: 'p',
            text: 'For a first system, hiring is usually the slower route. A single technical hire in a small firm has no colleague to review their work, no cover when they leave, and often no clear brief. A partner brings the pattern, the build and, if agreed, the running of it. The trade-off is dependence, which you manage through the contract rather than through hope.',
          },
          {
            type: 'table',
            caption: 'Two routes, with what each demands of you',
            head: ['Route', 'Suits you when', 'Watch for'],
            rows: [
              ['Hire in-house', 'Software is part of what you sell', 'One person holding all the knowledge'],
              ['Work with a partner', 'You need one workflow built well', 'Vague handover and support terms'],
              ['Both, in sequence', 'The first system proves its value', 'Building a team before a use case'],
            ],
          },
          {
            type: 'p',
            text: 'Whichever route you take, agree three things in writing before work starts: who owns the code and the data, what happens if you part ways, and who is on the phone when the system misbehaves during a busy week. [Build, buy or integrate](/insights/build-buy-or-integrate-ai) works through the same decision in more detail.',
          },
        ],
      },
      {
        id: 'what-to-keep',
        heading: 'What must stay yours, whoever builds it?',
        blocks: [
          {
            type: 'p',
            text: 'Outsourcing the work is normal. Outsourcing the ownership is how businesses end up unable to change suppliers. Four things should stay with you from the first day, and none of them require technical skill to hold.',
          },
          {
            type: 'list',
            ordered: true,
            items: [
              'The accounts. Cloud, model and messaging accounts should be in your company’s name, with your billing and at least one of your people as an administrator.',
              'The data. Your records, the extracted fields and the history of what the system did should be exportable in a common format on request.',
              'The decisions. Approval rules, price limits and escalation paths are business policy. Write them down and keep them under your control.',
              'The documentation. A plain description of what the system does, what it connects to and how to switch it off is worth more than the source code to most owners.',
            ],
          },
          {
            type: 'p',
            text: 'If the work eventually grows into a product your team uses daily, that is when a [custom AI platform](/systems/custom-ai-platforms) starts to make sense: shared data, permissions and integrations under one roof, with documented ownership and a handover you can act on. It is a poor place to start and a reasonable place to arrive.',
          },
        ],
      },
      {
        id: 'governance-and-value',
        heading: 'How much governance does a small company need?',
        blocks: [
          {
            type: 'p',
            text: 'Proportionate governance for an MSME is one page, reviewed every quarter. Who may use the system. What it may read. What it may do without asking. What must be approved by a named person. What is logged. What it costs per month, and who checks that number. Anything longer will not be read, and anything shorter leaves the owner exposed.',
          },
          {
            type: 'p',
            text: 'If the workflow touches personal data about customers, employees or applicants, obligations under India’s [Digital Personal Data Protection Act, 2023](https://www.meity.gov.in/static/uploads/2024/06/2bf1f0e9f04e6fb4f8fef35e82c42aa5.pdf) apply regardless of your size. Collect what the purpose needs, say why you are collecting it, and keep a record of consent. This is general information rather than legal advice, so confirm your position with a qualified adviser.',
          },
          {
            type: 'list',
            items: [
              'Measure the baseline before launch: time per case, error rate, rework, delay.',
              'Track cost per completed task, including review time, not only the software bill.',
              'Review every correction for the first month. Corrections are the cheapest training you will get.',
              'Set a decision date. Expand, adjust or stop, on evidence rather than sentiment.',
            ],
          },
        ],
      },
    ],
    limitations: [
      'If your records are mostly on paper or in personal phones, the first project is organising information, not adopting AI.',
      'Language and handwriting still vary in quality. Test with your own worst documents, not with clean samples.',
      'A small team cannot support many systems at once. One working workflow beats three half-finished pilots.',
      'This is general information, not legal or tax advice. Confirm data protection and sector obligations before launch.',
    ],
    faqs: [
      {
        q: 'Can a small business use AI without hiring technical staff?',
        a: 'Yes, for a first system. What you need is a person who knows the work and its exceptions, someone accountable for the result after launch, and access to the records involved. The build can sit with a partner or inside tools you already use. Agree ownership, support and handover in writing, so the absence of an in-house team never becomes an absence of control.',
      },
      {
        q: 'How do we know whether an AI project is worth the money?',
        a: 'Measure the work before you change it: how long each case takes, how often it goes wrong, how much rework follows and where it waits. Then compare the same measures after a few weeks of live use, including the time your team spends reviewing output. Judge cost per completed task rather than the licence fee. If the numbers do not move, stop and say so.',
      },
      {
        q: 'What should an MSME automate first?',
        a: 'Work that repeats often and follows rules most of the time. Order entry from customer messages, supplier invoice checking, enquiry capture and follow-up, and preparing the weekly numbers are common starting points. Avoid anything rare, relationship-led or legally sensitive at the start. The aim of the first release is a dependable result on ordinary cases, with exceptions routed to a person.',
      },
      {
        q: 'Should we build our own tool or use an existing product?',
        a: 'Use what exists until it visibly fails you. Products are cheaper, supported and quicker to abandon. When you hit a specific limit, such as a format nothing reads or a check nothing performs, scope a build around that limit alone. Building early is how small companies end up maintaining software instead of running a business.',
      },
      {
        q: 'What governance does a small company need for AI?',
        a: 'Enough to answer five questions on one page: who may use it, what data it may read, which actions need a named person’s approval, what is logged, and what it costs each month. Add a rule for what staff may paste into external tools. Review the page each quarter, and after any incident. Formal frameworks can wait until the system matters more.',
      },
    ],
    bybo: [
      {
        href: '/solutions',
        label: 'Solutions by workflow',
        why: 'Enquiries, documents, operations, knowledge, reporting or a website: pick the unit of work first.',
      },
      {
        href: '/systems/custom-ai-platforms',
        label: 'Custom AI Platforms',
        why: 'When a proven workflow becomes a product, with documented ownership, handover and support.',
      },
      {
        href: '/blueprint',
        label: 'AI Opportunity Blueprint',
        why: 'A paid diagnostic that ranks candidate workflows and tests readiness before anyone builds.',
      },
    ],
    related: ['ai-readiness-checklist', 'build-buy-or-integrate-ai', 'ai-for-manufacturing-and-exports'],
    sources: [
      {
        title: 'Investment and turnover limits for classification of all MSMEs to be enhanced to 2.5 and 2 times respectively (Budget 2025-26)',
        publisher: 'Press Information Bureau, Ministry of Finance',
        url: 'https://www.pib.gov.in/PressReleasePage.aspx?PRID=2098389',
      },
      {
        title: 'Year End Review 2025: Ministry of Micro, Small & Medium Enterprises',
        publisher: 'Press Information Bureau, Government of India',
        url: 'https://www.pib.gov.in/PressReleasePage.aspx?PRID=2209712',
      },
      {
        title: 'The Digital Personal Data Protection Act, 2023 (No. 22 of 2023)',
        publisher: 'Ministry of Electronics and Information Technology, Government of India',
        url: 'https://www.meity.gov.in/static/uploads/2024/06/2bf1f0e9f04e6fb4f8fef35e82c42aa5.pdf',
      },
    ],
  },
  {
    slug: 'ai-for-manufacturing-and-exports',
    collection: 'indian-business',
    title: 'AI for Manufacturing and Export Businesses: Practical Starting Points',
    seoTitle: 'AI for Manufacturing and Export Businesses in India',
    description:
      'Where AI helps manufacturers and exporters: purchase orders, supplier documents, quality records, production reports and export paperwork, with people approving.',
    dek:
      'Manufacturing and export businesses run on documents that must agree with one another. A system can prepare and check them. A person should still approve anything that reaches a buyer, a bank or an officer.',
    keywords: [
      'AI for manufacturing India',
      'AI for exporters',
      'export documentation automation',
      'purchase order automation',
      'quality records automation',
      'certificate of origin software',
    ],
    publishedAt: '2026-09-11',
    visual: {
      kind: 'flow',
      title: 'An export document, end to end',
      steps: ['Order received', 'Documents prepared', 'Checked against rules', 'Exporter approves', 'Filed and shipped'],
      gate: 3,
      gateLabel: 'A named person approves every declaration',
    },
    summary: [
      'Manufacturing and export work is a chain of documents that must agree: order, plan, quality record, invoice, packing list, declaration.',
      'Start where documents arrive from outside the company. Purchase orders and supplier bills have a checkable right answer.',
      'Export paperwork is moving to structured filing, so the value sits in preparing and checking rather than retyping.',
      'A person signs. Declarations, certificates and buyer commitments stay with someone named and accountable.',
    ],
    sections: [
      {
        id: 'where-paperwork-piles-up',
        heading: 'Where does the paperwork actually pile up?',
        blocks: [
          {
            type: 'p',
            text: 'India exported a record US$ 863.1 billion of goods and services in FY 2025–26, of which merchandise accounted for US$ 441.8 billion ([Press Information Bureau](https://www.pib.gov.in/PressReleasePage.aspx?PRID=2290437)). In the Budget speech for 2025–26, the Finance Minister said MSMEs are responsible for 45 per cent of exports ([PIB](https://www.pib.gov.in/PressReleasePage.aspx?PRID=2098389)). A great deal of that trade is administered by small teams working through documents that must agree with one another, often at short notice.',
          },
          {
            type: 'p',
            text: 'The characteristic problem of a manufacturing or export business is not one big task. It is a chain of small ones where a single mismatch stops a container. The part number on the order does not match the item master. The packing list says 480 pieces and the invoice says 500. The certificate names a different consignee. Each is trivial on its own, and each is expensive at the port.',
          },
          {
            type: 'table',
            caption: 'Where documents slip in an ordinary week',
            head: ['Document', 'What arrives', 'Where it slips'],
            rows: [
              ['Purchase order', 'PDF, email body or a photograph', 'Retyped part codes and rates'],
              ['Supplier invoice', 'Varied layouts, many suppliers', 'Matching to order and receipt'],
              ['Quality record', 'Shop-floor sheets and photos', 'Never reaches the buyer file'],
              ['Export invoice set', 'Invoice, packing list, declarations', 'Figures that stop agreeing'],
            ],
          },
        ],
      },
      {
        id: 'first-workflows',
        heading: 'Which workflows are worth starting with?',
        blocks: [
          {
            type: 'p',
            text: 'Start where documents arrive from outside the company, because those are the ones you cannot control and the ones with a verifiable right answer. Inside work, such as production planning, is usually better served by fixing the process before automating it.',
          },
          {
            type: 'list',
            items: [
              'Purchase orders and enquiries: read them, match them to your item master, draft the order.',
              'Supplier invoices and delivery notes: three-way matching against the order and the goods received.',
              'Export document sets: prepare the invoice, packing list and supporting documents from one agreed source.',
              'Quality and inspection records: capture them at the point of work, attach them to the batch.',
              'Buyer messages: summarise long threads, draft replies, and keep commitments in one place.',
              'Compliance checklists: assemble what a shipment or a buyer audit requires, and flag what is missing.',
            ],
          },
          {
            type: 'p',
            text: 'BYBO’s work with manufacturers and exporters sits mostly in this territory; the [industries page](/industries) sets out the workflows and the measures that go with them.',
          },
        ],
      },
      {
        id: 'purchase-orders',
        heading: 'How does this work for purchase orders and supplier documents?',
        blocks: [
          {
            type: 'p',
            text: 'A purchase order is a good first candidate because you can define correctness exactly. The part must exist. The rate must match the agreed price list or an approved exception. The quantity must be a valid multiple. The delivery date must be feasible against the current plan. A system can perform every one of those checks in a few seconds and, crucially, show its working: the field it read, the record it matched and the rule it applied. That is the pattern behind [Business Operations](/systems/document-multimodal-intelligence), where the exception, not the document, is what reaches a person.',
          },
          {
            type: 'p',
            text: 'Supplier documents work the same way in reverse. The invoice is checked against the purchase order and the goods received note, and only the differences are queued for someone to resolve. Our guide to [processing invoices and purchase orders](/insights/ai-invoice-purchase-order-processing) covers the mechanics in more depth.',
          },
          {
            type: 'example',
            title: 'Illustrative example: a Rajkot valve maker’s buyer amendments',
            text: 'Suppose a valve maker supplies three overseas buyers who amend orders often: a changed material grade here, a split delivery there, revised marking instructions the week before shipment. The amendments arrive in email threads, and the works order is updated from memory. A first release reads each amendment, compares it with the live order, and produces a single change note listing what differs: grade, quantity, delivery split, marking, price effect. The production head approves or rejects each line before anything reaches the shop floor, and the approved note becomes the version everyone works from. The firm keeps a record of every amendment and who accepted it, which settles most later disputes in one search.',
          },
        ],
      },
      {
        id: 'quality-and-production',
        heading: 'What about quality records and production reports?',
        blocks: [
          {
            type: 'p',
            text: 'Quality data usually exists. The problem is that it exists on paper, in a supervisor’s notebook or in photographs on a phone, and only becomes valuable when a buyer asks for it six months later. Capturing it in a usable form at the moment of inspection is a modest change that pays for itself the first time a claim arrives.',
          },
          {
            type: 'list',
            items: [
              'Read inspection sheets and gauge readings into a record attached to the batch and the order.',
              'Flag readings outside tolerance immediately, to the person who can act, not to a monthly report.',
              'Assemble the quality file a buyer or auditor asks for, rather than reconstructing it later.',
              'Summarise the shift or daily production report, with the exceptions named and the causes noted.',
              'Track recurring defects by part, machine, shift and supplier, so the pattern is visible.',
            ],
          },
          {
            type: 'note',
            tone: 'insight',
            title: 'Automate the record, not the judgement',
            text: 'A system can assemble the evidence that a batch was inspected and note where a reading fell outside limits. Whether to release the batch, scrap it or tell the buyer is a decision with commercial and safety consequences, and it belongs to a qualified person.',
          },
        ],
      },
      {
        id: 'export-documentation',
        heading: 'What can AI do with export documentation?',
        blocks: [
          {
            type: 'p',
            text: 'An export shipment carries a set of documents that must be internally consistent: the commercial invoice, the packing list, the shipping bill, the certificate of origin, and whatever the buyer, the bank or the destination requires. Most of the information is the same information, entered several times in different formats. That is precisely the work a system should absorb, preparing each document from one agreed source and checking the set against itself before anything is filed.',
          },
          {
            type: 'p',
            text: 'The filing side is becoming structured too. Electronic filing of non-preferential certificates of origin has been mandatory through the DGFT platform since 1 January 2025, and the system was processing over 7,000 certificates a day across 125 issuing agencies at launch ([Press Information Bureau](https://www.pib.gov.in/PressReleasePage.aspx?PRID=2096786)). In September 2026 the DGFT introduced an open API on the Trade Connect e-Platform that lets exporters apply for both preferential and non-preferential certificates directly from their own ERP or accounting software, so the same details need not be entered twice ([PIB](https://www.pib.gov.in/PressReleasePage.aspx?PRID=2307462)).',
          },
          {
            type: 'note',
            tone: 'caution',
            title: 'The declaration is still yours',
            text: 'Customs declarations, origin statements and preferential claims carry legal consequences for the exporter, not for the software. Use a system to prepare and cross-check, then have a named person review and file. Rules differ by agreement and destination, so take professional advice; this is general information only.',
          },
        ],
      },
      {
        id: 'buyer-communication',
        heading: 'Can it help with buyer communication and compliance checklists?',
        blocks: [
          {
            type: 'p',
            text: 'Export relationships live in long email threads across time zones, and the commitments inside them are easy to lose. A system can summarise a thread, list what has been promised and by when, draft a reply from approved information, and remind the owner before a date slips. What it should not do is agree a price, accept a penalty clause or confirm a delivery date on its own. Those are commitments, and commitments need a person.',
          },
          {
            type: 'list',
            items: [
              'Keep one place where every buyer commitment, date and change is recorded.',
              'Draft routine replies, such as dispatch updates and document requests, for a person to send.',
              'Assemble the pre-shipment checklist per buyer and destination, and flag missing items early.',
              'Alert the owner when a promised date is at risk, while there is still time to tell the buyer.',
            ],
          },
        ],
      },
      {
        id: 'how-to-start',
        heading: 'How do you start without disrupting the shop floor?',
        blocks: [
          {
            type: 'p',
            text: 'Run the new way alongside the old one until the evidence is clear. Nothing goes to a buyer, a bank or a portal without a person approving it, and nothing changes on the shop floor in week one.',
          },
          {
            type: 'list',
            ordered: true,
            items: [
              'Pick one document type with real volume: purchase orders, supplier invoices or the export invoice set.',
              'Collect fifty recent examples, including the poor scans, the amendments and the awkward buyers.',
              'Record the baseline: minutes per document, errors found later, rework, and where the work waits.',
              'Build a bounded release that drafts and checks, with a named approver for every output.',
              'Run it in parallel for a few weeks and review every correction the approver makes.',
              'Decide on the numbers: extend to the next document type, adjust the rules, or stop.',
            ],
          },
          {
            type: 'p',
            text: 'Two measures matter more than the rest: time from document received to record created, and the share of documents that needed correction after approval. If the second is not falling, the first is not worth much.',
          },
        ],
      },
    ],
    limitations: [
      'Poor scans, handwriting and photographs taken at an angle still cause errors. Test with your worst documents before you commit.',
      'Trade rules differ by agreement, product and destination, and they change. This is general information, not legal or customs advice.',
      'Machine and sensor data on the shop floor is a separate project with its own hardware and integration work.',
      'If your item master, price lists and buyer specifications disagree with each other, fix that first. Automation will spread the error faster.',
      'Nothing here removes the exporter’s responsibility for what is declared, certified or promised to a buyer.',
    ],
    faqs: [
      {
        q: 'Where should a manufacturer start with AI?',
        a: 'Start with documents arriving from outside: purchase orders, buyer amendments and supplier invoices. They repeat, they follow rules, and correctness can be checked against your item master, price list and orders. Machine data and production optimisation are worthwhile later, but they need sensors, integration and clean master data. A document workflow can be running in weeks and its results are easy to measure.',
      },
      {
        q: 'Can AI prepare export documents such as invoices and packing lists?',
        a: 'It can prepare drafts from one agreed source and check the set for consistency, which is where most errors appear. Quantities, values, marks and consignee details can be cross-checked across the invoice, packing list and supporting documents before filing. Filing and declaring remain the exporter’s responsibility: a named person should review and approve each document, because the legal consequences sit with your business.',
      },
      {
        q: 'Does automation help with certificates of origin?',
        a: 'Partly, and the official systems are moving in that direction. Electronic filing of non-preferential certificates has been mandatory through the DGFT platform since January 2025, and an open API introduced in September 2026 lets exporters apply from their own ERP or accounting software ([PIB](https://www.pib.gov.in/PressReleasePage.aspx?PRID=2307462)). Your system can prepare and validate the details; origin claims still need a person who understands the rules of the relevant agreement.',
      },
      {
        q: 'What about quality records and buyer audits?',
        a: 'Capture inspection data in a usable form when the inspection happens, attached to the batch and the order. A system can then assemble the quality file a buyer or auditor requests, flag readings outside tolerance at the time, and track recurring defects by part, machine or supplier. Decisions about releasing, reworking or scrapping a batch stay with a qualified person.',
      },
      {
        q: 'Do we need to replace our ERP first?',
        a: 'Usually not. Most first systems read documents, apply checks and write approved records into whatever you already run, provided that software allows access. Confirm what your ERP or accounting package actually permits before committing to anything, since integration options vary widely. Replacing core software is a much larger project and should be justified on its own terms, not as a prerequisite for automation.',
      },
    ],
    bybo: [
      {
        href: '/industries',
        label: 'Industries',
        why: 'Workflows and measures for manufacturing, exporters, logistics and other operations-led businesses.',
      },
      {
        href: '/systems/document-multimodal-intelligence',
        label: 'Business Operations',
        why: 'Read documents, check them against your records and route exceptions with the evidence attached.',
      },
      {
        href: '/systems/agentic-operations',
        label: 'Agentic Operations',
        why: 'Carry an order or a claim across teams and tools, with approval gates for consequential steps.',
      },
    ],
    related: ['ai-invoice-purchase-order-processing', 'ai-for-logistics-warehousing-3pl', 'document-automation-workflow'],
    sources: [
      {
        title: 'India’s Exports Scale Record US$ 863.1 Billion in FY 2025–26 (July 2026)',
        publisher: 'Press Information Bureau, Ministry of Commerce and Industry',
        url: 'https://www.pib.gov.in/PressReleasePage.aspx?PRID=2290437',
      },
      {
        title: 'DGFT Introduces Open API Facility for Certificate of Origin on the Trade Connect e-Platform (7 September 2026)',
        publisher: 'Press Information Bureau, Ministry of Commerce and Industry',
        url: 'https://www.pib.gov.in/PressReleasePage.aspx?PRID=2307462',
      },
      {
        title: 'DGFT Launches Enhanced eCoO 2.0 System with Provisions for Back-to-Back Certificates of Origin (27 January 2025)',
        publisher: 'Press Information Bureau, Ministry of Commerce and Industry',
        url: 'https://www.pib.gov.in/PressReleasePage.aspx?PRID=2096786',
      },
      {
        title: 'Investment and turnover limits for classification of all MSMEs to be enhanced to 2.5 and 2 times respectively (Budget 2025-26)',
        publisher: 'Press Information Bureau, Ministry of Finance',
        url: 'https://www.pib.gov.in/PressReleasePage.aspx?PRID=2098389',
      },
    ],
  },
];

export default guides;
