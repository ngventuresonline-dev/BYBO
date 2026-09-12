import type { Guide } from '../types';

const guides: Guide[] = [
  {
    slug: 'ai-for-logistics-warehousing-3pl',
    collection: 'indian-business',
    title: 'AI Workflows for Logistics, Warehousing and 3PL Companies',
    description:
      'Practical AI workflows for logistics, warehousing and 3PL firms: shipment status answers, POD and e-way bill documents, exceptions, reporting and billing.',
    dek:
      'A logistics business runs on questions, documents and exceptions. AI can handle the routine traffic from your own records and prepare the rest for a person. Commitments to a client stay with your team.',
    keywords: [
      'AI for logistics companies',
      'AI in warehousing',
      '3PL automation India',
      'shipment status automation',
      'proof of delivery processing',
      'logistics document automation',
    ],
    publishedAt: '2026-09-11',
    visual: {
      kind: 'flow',
      title: 'How an exception reaches a decision',
      steps: ['Signal arrives', 'Check the record', 'Assemble evidence', 'Owner decides', 'Log and inform'],
      gate: 3,
      gateLabel: 'A person owns the client commitment',
    },
    summary: [
      'Most of the value sits in the traffic around a shipment: status questions, documents, exceptions, client reports and billing checks.',
      'Answer only from your own systems. A guessed delivery date is worse for a client than an honest “we are checking”.',
      'Let the system assemble the evidence for a delay, damage or shortage. Let a named person own the claim and the credit note.',
      'Measure exception resolution time, document turnaround and billing disputes against a baseline taken before launch.',
    ],
    sections: [
      {
        id: 'where-the-day-goes',
        heading: 'Where does the day actually go in a 3PL business?',
        blocks: [
          {
            type: 'p',
            text: 'Ask an operations manager at a mid-sized 3PL what interrupted the day and the list rarely starts with freight. It starts with a client asking where a consignment is, a driver sending a photograph of a signed delivery note, a consignee refusing two cartons, a key account wanting last month’s service report by Friday, and an invoice query about detention charges that nobody can settle without three phone calls.',
          },
          {
            type: 'p',
            text: 'That traffic is the part AI can help with. Vehicles, racks and people still do the physical job. A system can answer the repeatable questions from your own records, read the documents that arrive as photographs and PDFs, notice exceptions early and prepare each one for the person who has to decide. BYBO’s [industries view](/industries) frames logistics and 3PL the same way: matching PODs with shipment records, preparing claims with the evidence attached, and flagging delays and unanswered requests.',
          },
          {
            type: 'list',
            items: [
              'Status questions from clients, consignees, branches and your own sales team.',
              'Documents: lorry receipts, PODs, e-way bills, weighment slips, damage photographs.',
              'Exceptions: delays, damages, shortages, wrong addresses, refused deliveries.',
              'Reporting: service levels, pending PODs, ageing, monthly review packs.',
              'Billing: rate cards, accessorial charges, credit notes and disputed lines.',
            ],
          },
          {
            type: 'note',
            tone: 'insight',
            title: 'Pick a unit of work you can count',
            text: 'Consignments a month. PODs collected. Exceptions raised. Invoice lines queried. A system built around a countable unit can be measured after launch. One built around “better communication” cannot.',
          },
        ],
      },
      {
        id: 'status-questions',
        heading: 'How should a system answer “where is my shipment?”',
        blocks: [
          {
            type: 'p',
            text: 'Status questions are the highest-volume, lowest-judgement work in a logistics business, and they arrive on every channel at once. A workable system reads the message, identifies the consignment from whatever the sender used — docket number, invoice number, purchase order, or a client name and a date — looks up your transport management system or tracking feed, and replies with what the record says.',
          },
          {
            type: 'p',
            text: 'Three rules keep it honest. Answer only from the record, never from inference. Say how old the information is, because a client can tell the difference between “delivered at 2.15 pm today” and “last scanned at Nashik yesterday evening”. And treat a predicted arrival as a commitment, because that is how the client will read it: publish an estimate only where your operation stands behind it, and hand anything tighter to the person who can actually promise it.',
          },
          {
            type: 'p',
            text: 'The gain is not only speed. It is that the branch team stops being interrupted for information that already exists, and that every question and answer leaves a record you can review later.',
          },
        ],
      },
      {
        id: 'documents-and-e-way-bills',
        heading: 'What can AI do with PODs, LRs and e-way bill documents?',
        blocks: [
          {
            type: 'p',
            text: 'Document work in logistics is mostly reading, matching and chasing. A system can read a photographed POD, pull out the docket number, delivery date, receiver name and any remark written on its face, check whether a stamp and signature are present, and match it to the shipment record. What it cannot read confidently goes to a queue with the image beside it. The pending-POD list then builds itself instead of being reconstructed on the last day of the month.',
          },
          {
            type: 'p',
            text: 'E-way bills add a clock. The official [e-way bill FAQ](https://docs.ewaybillgst.gov.in/html/faq_new.html) states that an e-way bill is required for a consignment of goods of value exceeding fifty thousand rupees, under section 68 of the GST Act read with rule 138. Validity runs one day for every 200 km of movement for regular transport, and one day for every 20 km for over-dimensional cargo, expiring at midnight of the last day. Validity starts at the first Part-B entry. A bill generated with wrong details cannot be edited: it has to be cancelled within twenty-four hours and generated afresh. The transporter carrying the consignment can extend validity, before or within eight hours after expiry, giving a reason.',
          },
          {
            type: 'p',
            text: 'Those are clocks and checks, not judgements, which is exactly what a system is good at. It can list bills expiring tonight against consignments still in transit, show Part-A slips with no Part-B entry, and compare bill details with the invoice so a mismatch is caught inside the cancellation window rather than at a check post. The person still records the reason, extends the bill and answers for it.',
          },
          {
            type: 'note',
            tone: 'caution',
            title: 'General information, not tax advice',
            text: 'Rules and thresholds change, and for intra-state movement the FAQ itself directs you to the provisions of the relevant state or union territory. Confirm the current position with your tax adviser before you encode any check into a workflow.',
          },
        ],
      },
      {
        id: 'exception-handling',
        heading: 'Delays, damages and shortages: what should the system prepare?',
        blocks: [
          {
            type: 'p',
            text: 'Clients judge a logistics partner on exceptions, not on the consignments that went well. The problem is rarely that nobody noticed. It is that noticing, gathering the evidence and reaching the person who can decide takes two days, by which time the client has escalated. A system can compress the gathering and leave the deciding alone.',
          },
          {
            type: 'list',
            items: [
              'What happened and when, in one line.',
              'The consignment record: docket, route, vehicle, planned and actual times.',
              'The documents: LR, POD, weighment slip, photographs of the damage.',
              'What the contract or service agreement says about this case.',
              'A draft note to the client and a draft internal action.',
              'Who owns the next step, and by when.',
            ],
          },
          {
            type: 'p',
            text: 'Assembling that pack is clerical. Deciding is not. Whether to accept a shortage claim, raise a debit note on a transporter, offer a credit or hold firm depends on the client relationship, the contract and the commercial position. That belongs to a person with authority and a written limit. This is what [agentic operations](/systems/agentic-operations) means in practice: bounded steps, permitted tools, and consequential actions held behind an approval.',
          },
          {
            type: 'example',
            title: 'Illustrative example: a Bhiwandi 3PL’s damage claim',
            text: 'Suppose a 3PL running a Bhiwandi warehouse dispatches around 900 consignments a month for a dozen clients. A consignee reports two damaged cartons on delivery. The driver has already sent photographs to a branch WhatsApp group. A system matches those photographs to the docket, pulls the POD where the receiver has written “2 cartons damaged”, checks the client’s agreed claim window and liability cap, drafts a note to the client and a debit note against the line-haul transporter, and puts the pack in the branch manager’s queue by 10 am. He approves the credit if it is inside his limit, or escalates with one click if it is not. At month end the claims have a record, not a memory.',
          },
        ],
      },
      {
        id: 'client-reporting',
        heading: 'Can a system prepare the client reports and review packs?',
        blocks: [
          {
            type: 'p',
            text: 'Monthly and weekly reporting is a good second workflow, because the inputs are already in your systems and the output has a deadline. The trap is that reports are disputed on definitions, not on arithmetic. Agree the definitions with the client first, write them down, and let the system apply them consistently. A pack that is assembled the same way every month is worth more than one that is beautifully formatted and quietly inconsistent.',
          },
          {
            type: 'table',
            caption: 'Agree these before automating a client report',
            head: ['Measure', 'Definition to agree', 'Common dispute'],
            rows: [
              ['On-time delivery', 'Against promised or planned date', 'Attempted deliveries'],
              ['Pending PODs', 'Days from delivery to upload', 'Illegible scans'],
              ['Damage rate', 'Per consignment or per carton', 'Concealed damage'],
              ['Detention', 'From gate-in or from arrival', 'Waiting at the consignee'],
            ],
          },
          {
            type: 'p',
            text: 'Let the system assemble the numbers and draft the commentary; let your account manager read it before it goes out. A report carrying an unexplained dip in service is worse than one that arrives a day later with the reason attached.',
          },
        ],
      },
      {
        id: 'warehouse-sops',
        heading: 'How does AI help a warehouse team follow its SOPs?',
        blocks: [
          {
            type: 'p',
            text: 'Warehouses run on written procedures and seasonal staff, which is an awkward combination. A supervisor on the night shift needs to know what to do with a short-received pallet, which client requires batch and expiry capture, how a damaged consignment is quarantined and who signs for it. The SOP file exists. Finding the right paragraph at 11 pm does not happen.',
          },
          {
            type: 'list',
            items: [
              'Answer procedure questions with the source paragraph attached, in the language the team uses.',
              'Turn a shift handover note or a voice message into a structured record.',
              'Draft a non-conformance report from what the supervisor describes, for review.',
              'Check that client-specific handling rules were recorded for the consignments that need them.',
              'Flag procedures that have not been reviewed since the process they describe changed.',
            ],
          },
          {
            type: 'p',
            text: 'Two cautions. A knowledge system is not training: it helps someone who broadly knows the job, and misleads someone who does not. And an answer is only as current as the document behind it, so every procedure needs an owner and a review date.',
          },
        ],
      },
      {
        id: 'billing-reconciliation',
        heading: 'Where does billing reconciliation fit?',
        blocks: [
          {
            type: 'p',
            text: 'Logistics billing is a reconciliation problem wearing an invoice. Chargeable weight against actual weight, zone against pin code, fuel surcharge against the agreed formula, detention against gate timings, storage against days occupied. Differences that surface a month later become disputes; the same differences caught at invoice preparation are just corrections.',
          },
          {
            type: 'p',
            text: 'A system can compare each invoice line against the rate card and the operational record, group the differences by client and reason, and rank them by value so the largest are looked at first. It can also do the mirror job on transporter bills you receive. What it should not do is issue a credit note or agree a rate exception. Those go to a person, with the comparison attached. The same discipline applies to supplier documents generally, as our guide to [invoice and purchase order processing](/insights/ai-invoice-purchase-order-processing) sets out.',
          },
        ],
      },
      {
        id: 'how-to-start',
        heading: 'How should a logistics business start?',
        blocks: [
          {
            type: 'p',
            text: 'Start with one unit of work that is frequent, repeatable and already recorded somewhere. Status replies and POD matching are the usual first choices because volume is high and the risk of a mistake is contained. Claims and billing come later, once the team trusts the plumbing.',
          },
          {
            type: 'list',
            ordered: true,
            items: [
              'Count the unit for a fortnight: how many arrive, how long each takes, where each waits.',
              'Check access: can the system read your transport system, tracking feed and document store?',
              'Name the owner for the workflow and the reviewer for its exceptions.',
              'Build a bounded first release with approval on anything a client will read as a promise.',
              'Review every correction weekly for a month, then decide whether to widen the scope.',
            ],
          },
          {
            type: 'p',
            text: 'The wider direction of travel favours businesses that keep clean digital records. DPIIT’s note on three years of the [National Logistics Policy](https://www.pib.gov.in/PressReleasePage.aspx?PRID=2167224) says the policy’s objectives include reducing logistics costs to global benchmarks and lifting India’s Logistics Performance Index ranking into the top 25 by 2030, and it names digital literacy among smaller operators as an outstanding challenge. None of that changes next Tuesday for a single 3PL. It does mean the habit of keeping consignment, document and exception data in order is worth building now.',
          },
        ],
      },
    ],
    limitations: [
      'A system cannot fix a physical problem. If vehicles run late because of capacity or route planning, faster replies will not move the freight.',
      'Status answers are capped by tracking quality. If positions are updated once a day by phone, that is the best any reply can be.',
      'Handwritten LRs, faint stamps and photographs taken in poor light still defeat extraction. Plan for a review queue and staff it.',
      'Claims, credit notes and rate exceptions need authority and commercial judgement. Keep them with named people and written limits.',
    ],
    faqs: [
      {
        q: 'Can AI answer client shipment status questions on WhatsApp?',
        a: 'Yes, for the routine ones. The system should identify the consignment, read the current position from your own tracking record and reply with what that record says, including how recent it is. Keep three things with people: revised delivery commitments, anything about a claim, and any conversation with a client who is already unhappy. Make the route to a person obvious in every conversation.',
      },
      {
        q: 'Can AI read our proof of delivery documents?',
        a: 'Usually, for printed and reasonably clear scans. Extraction works well on docket numbers, dates, printed names and stamps, and less well on handwriting, faded thermal paper and photographs taken at an angle. Expect a share of documents to need a human check, and design that queue deliberately. The bigger gain is often the automatic pending-POD list rather than the extraction itself.',
      },
      {
        q: 'Can a system manage e-way bill compliance for us?',
        a: 'It can watch and flag; it should not decide. The [e-way bill FAQ](https://docs.ewaybillgst.gov.in/html/faq_new.html) explains that validity runs one day per 200 km for regular transport, that a wrongly generated bill must be cancelled within twenty-four hours and raised again, and that the transporter can extend validity within eight hours after expiry with a reason. A system can surface those cases in time. Your team acts, and your tax adviser confirms the current rules.',
      },
      {
        q: 'Do we have to replace our transport management system?',
        a: 'Usually not. The question is what your existing systems will let a new workflow read and write. Check available interfaces, exports and permissions before scoping anything. A first release often reads from the transport system and writes into a document store and a review queue, leaving the system of record untouched until the workflow has proved itself.',
      },
      {
        q: 'What should a 3PL measure after launching an AI workflow?',
        a: 'Take a baseline first, then track exception resolution time, share of PODs matched without a person, time to first useful reply on status questions, and disputed invoice lines per month. Add cost per completed unit so the operating bill stays visible. Compare like with like: the same clients, the same lanes and the same season as the baseline.',
      },
    ],
    bybo: [
      {
        href: '/systems/agentic-operations',
        label: 'Agentic Operations',
        why: 'How multi-step logistics work moves between teams and tools, with approval gates on consequential actions.',
      },
      {
        href: '/industries',
        label: 'Industries BYBO works with',
        why: 'Where logistics and 3PL work sits, and the measure each industry usually starts from.',
      },
      {
        href: '/blueprint',
        label: 'AI Opportunity Blueprint',
        why: 'A paid diagnostic that maps one workflow, measures the baseline and tests whether a build is worthwhile.',
      },
    ],
    related: ['agentic-workflows-between-teams', 'ai-for-manufacturing-and-exports', 'when-ai-workflows-go-wrong'],
    sources: [
      {
        title: 'E-Way Bill System: Frequently Asked Questions',
        publisher: 'National Informatics Centre, e-Way Bill System (Goods and Services Tax)',
        url: 'https://docs.ewaybillgst.gov.in/html/faq_new.html',
      },
      {
        title: 'India Marks Three Years of National Logistics Policy (17 September 2025)',
        publisher: 'Press Information Bureau, Department for Promotion of Industry and Internal Trade',
        url: 'https://www.pib.gov.in/PressReleasePage.aspx?PRID=2167224',
      },
    ],
  },
  {
    slug: 'ai-for-professional-services',
    collection: 'indian-business',
    title: 'AI for Professional Services: From Research to Review-Ready Work',
    seoTitle: 'AI for Professional Services: Research to Review-Ready Work',
    description:
      'How CA, legal, consulting and advisory firms can use AI for research, first drafts and document review, with responsibility staying with the professional.',
    dek:
      'In a professional firm, AI is useful up to the point of review and no further. It can gather, draft and check. The qualified person still reads the source, forms the opinion and signs.',
    keywords: [
      'AI for professional services',
      'AI for CA firms',
      'AI for law firms India',
      'AI document review',
      'AI legal research citations',
      'knowledge management for consultants',
    ],
    publishedAt: '2026-09-11',
    visual: {
      kind: 'layers',
      title: 'How a review-ready draft is built',
      layers: [
        { label: 'Approved sources', note: 'Your own files, precedents and permitted references' },
        { label: 'Retrieval with citations', note: 'Every claim points to a document you can open' },
        { label: 'Draft to your template', note: 'House structure, defined terms, engagement facts' },
        { label: 'Professional review', note: 'The qualified person checks, edits and signs' },
        { label: 'Client output', note: 'Issued with the firm behind it' },
      ],
    },
    summary: [
      'AI is useful in the preparation around professional work: finding material, assembling facts, drafting and checking documents against a list.',
      'Every citation must resolve to a document someone can open. A confident answer with an invented reference is the main risk.',
      'The opinion, the advice and the signature stay with the qualified person, and so does the responsibility for the file.',
      'Confidentiality is a design constraint, not a policy note: engagement-level access, no cross-client visibility, agreed retention.',
    ],
    sections: [
      {
        id: 'what-changes',
        heading: 'What does AI actually change in a professional firm?',
        blocks: [
          {
            type: 'p',
            text: 'In a chartered accountancy practice, a law firm, an architecture studio or a consulting outfit, the product is judgement. What surrounds that judgement is a great deal of preparation: finding the relevant circular, pulling last year’s working papers, reading forty pages of a lease to extract eight dates, retyping client details into a template, chasing a document list before a filing.',
          },
          {
            type: 'p',
            text: 'That preparation is where AI belongs. It does not shorten the thinking. It shortens the distance between a question and the material a qualified person needs in order to think. BYBO’s [industries view](/industries) puts the same point plainly for professional services: experienced people spend too much time finding and reworking information, and the measure worth tracking is the time spent finding it.',
          },
          {
            type: 'note',
            tone: 'insight',
            title: 'Draw the line at the signature',
            text: 'A useful test for any proposed workflow: does it stop before the point where your firm’s name goes on the work? If it does, the risk is manageable. If it does not, redesign it until it does.',
          },
        ],
      },
      {
        id: 'research-with-citations',
        heading: 'Can you rely on AI research and its citations?',
        blocks: [
          {
            type: 'p',
            text: 'Only if every citation resolves to a document you can open, and only if someone opens them. This is the one risk that matters most in professional work, and it has a name. NIST’s [Generative AI Profile](https://nvlpubs.nist.gov/nistpubs/ai/NIST.AI.600-1.pdf) calls it confabulation: the production of confidently stated but erroneous or false content, colloquially called hallucination. The same document warns that outputs may include confabulated logic or citations that appear to justify an answer, which can mislead people into trusting it, and that the problem is sharpest with open-ended prompts and in fields requiring contextual or domain expertise. That is a description of professional research.',
          },
          {
            type: 'p',
            text: 'Two design choices reduce the exposure. First, restrict retrieval to a library you control: bare acts and rules downloaded from official sources, standards your firm subscribes to, your own precedents, past opinions and working papers. A system that can only quote from documents in your library cannot invent a judgment. Second, make the citation a link, not a string. If the answer says a clause requires something, the reviewer should reach the clause in one click and see it in context.',
          },
          {
            type: 'p',
            text: 'Even then, treat research output as a starting point for a person who knows the subject. It is a way to reach the relevant material faster, not a substitute for reading it.',
          },
        ],
      },
      {
        id: 'first-drafts',
        heading: 'Where do first drafts help, and where do they mislead?',
        blocks: [
          {
            type: 'p',
            text: 'Drafting help works best where the structure is settled and the content comes from facts already in your files: an engagement letter, a routine notice reply, a standard clause set, a scope note, a site observation report, the descriptive sections of a valuation. The system fills your template from the matter record, and a person edits what actually needs thought.',
          },
          {
            type: 'p',
            text: 'It misleads in the opposite case. Where the document carries an opinion, a judgement call or an unusual set of facts, a fluent draft is a liability: it reads as though the analysis has been done, which invites lighter review than the work deserves. Some firms handle this by marking machine-prepared drafts clearly and requiring the reviewer to record what they changed.',
          },
          {
            type: 'list',
            items: [
              'Draft from your own template and defined terms, not from a generic model of what such a document looks like.',
              'Pull client names, dates, amounts and party details from the matter record, never from the model’s memory.',
              'Leave gaps visible. An unfilled placeholder is better than a plausible invented figure.',
              'Keep the reasoning sections for the professional. Let the system prepare the surrounding material.',
              'Record who reviewed the draft, what changed and when it was issued.',
            ],
          },
        ],
      },
      {
        id: 'document-review',
        heading: 'What can AI do in document review?',
        blocks: [
          {
            type: 'p',
            text: 'Review is where the arithmetic of professional work becomes visible. A hundred lease deeds, three hundred vendor contracts, a data room before a transaction, a year of ledgers before an audit: the reading is linear, the fields you need are consistent, and the pressure is on the calendar.',
          },
          {
            type: 'p',
            text: 'A system can extract the fields into a review sheet, flag where a clause departs from your standard position, and mark the pages it could not read. Your team then reviews the exceptions and samples the rest. The value is in the ordering: the person spends their attention on the twelve documents that are unusual rather than on the eighty-eight that are not.',
          },
          {
            type: 'example',
            title: 'Illustrative example: a Chennai firm’s lease review',
            text: 'Suppose a mid-sized firm is asked to review 120 lease deeds for a retail client before a refinancing, with three weeks on the clock. A system reads each deed, extracts the parties, term, rent escalation, lock-in, notice period, security deposit and assignment restrictions into one sheet, and flags any deed where the lock-in exceeds the client’s standard or the assignment clause needs consent. Twenty-two deeds are flagged; nine pages across four deeds are marked unreadable. An associate checks the flagged deeds and the unreadable pages, then samples fifteen of the rest against the sheet to confirm the extraction is holding up. The partner reviews the exceptions and writes the note. Nobody signs anything based only on the sheet.',
          },
          {
            type: 'p',
            text: 'The sampling matters. Extraction quality varies by document type, scan quality and drafting style, so a fixed sample checked by a person is how you find out whether the tool is still reliable on this batch, not the last one.',
          },
        ],
      },
      {
        id: 'engagement-knowledge',
        heading: 'How do you make past engagements findable?',
        blocks: [
          {
            type: 'p',
            text: 'Most firms have already solved a version of every new problem, and cannot find the solution. The knowledge sits in a partner’s memory, an old proposal, a matter folder named after a client nobody recognises, and a mail thread from four years ago. New joiners rebuild what already exists, and the firm pays twice.',
          },
          {
            type: 'p',
            text: 'A knowledge system answers questions from that material with the source attached, and refuses to answer where the evidence is thin. Access rules are part of the design, not a setting applied afterwards: a person should be able to reach only the matters they are entitled to see. This is the shape of BYBO’s [Enterprise Knowledge](/systems/enterprise-knowledge-systems) work: an answer arrives with its source attached, and a gap is routed to an owner rather than filled in.',
          },
          {
            type: 'list',
            items: [
              'Decide what is in scope: precedents, opinions, templates, filings, project reports, past proposals.',
              'Give each source a named owner and a review date, so the answers stay current.',
              'Mirror your access rules exactly, including client-confidential and conflicted matters.',
              'Show the source with every answer, and let the system say when it cannot find one.',
              'Watch the unanswered questions. They tell you what your knowledge base is missing.',
            ],
          },
        ],
      },
      {
        id: 'client-queries',
        heading: 'Which client queries can a system answer?',
        blocks: [
          {
            type: 'p',
            text: 'Professional firms receive two kinds of client message and they need different treatment. The first is administrative: what is the status of my filing, which documents do you still need, when is the next deadline, can I have last quarter’s report again. The second asks for advice, even when it is phrased casually.',
          },
          {
            type: 'p',
            text: 'The first kind can be answered from your practice management record, and answering it promptly removes a real irritation for both sides. The second must reach a person, every time, with no attempt at a partial answer. A message asking whether a particular transaction attracts a particular treatment is a request for advice, however briefly it is written, and a machine answer to it is not a shortcut but an exposure.',
          },
          {
            type: 'table',
            caption: 'Two kinds of client message, two routes',
            head: ['Message', 'Route', 'What the client gets'],
            rows: [
              ['Filing status', 'Answered from the record', 'The current position and next date'],
              ['Document list', 'Answered from the checklist', 'What is pending, with names'],
              ['Copy of a report', 'Answered from the file store', 'The issued version only'],
              ['Any advice question', 'To the responsible professional', 'An acknowledgement and a call-back time'],
            ],
          },
        ],
      },
      {
        id: 'confidentiality',
        heading: 'How do you protect client confidentiality?',
        blocks: [
          {
            type: 'p',
            text: 'Confidentiality has to be designed into the workflow, because a knowledge system is by nature a machine for making information easier to reach. That is useful within a matter and unacceptable across a conflict wall.',
          },
          {
            type: 'list',
            items: [
              'Set access at engagement level and test it with a real conflicted example before launch.',
              'Keep client material inside systems whose terms you have read, including whether inputs are retained or used for training.',
              'Agree retention: how long working material stays, and what happens when an engagement closes.',
              'Log who asked what, and what the system showed them.',
              'Decide in advance which categories of material never leave your own environment.',
            ],
          },
          {
            type: 'note',
            tone: 'caution',
            title: 'Check your own obligations before you build',
            text: 'Your professional body’s code, your engagement letters and your client contracts govern what may be disclosed to a third-party service and what must be reviewed by a qualified person. Read the current text and take advice on your own position. This article is general information, not legal or professional advice.',
          },
          {
            type: 'p',
            text: 'Where client files contain personal data, India’s data protection framework applies to the processing as well. Our guide to [AI systems and the DPDP framework](/insights/ai-systems-and-dpdp-india) sets out what to design for.',
          },
        ],
      },
      {
        id: 'quality-review',
        heading: 'What does a quality check look like after launch?',
        blocks: [
          {
            type: 'p',
            text: 'Judge the system on your own work, not on a demonstration. The [NIST AI Risk Management Framework](https://nvlpubs.nist.gov/nistpubs/ai/NIST.AI.100-1.pdf) makes the general point precisely: validation is confirmation through objective evidence that requirements for a specific intended use have been fulfilled, and accuracy measurements should be paired with realistic test sets that represent the conditions of expected use.',
          },
          {
            type: 'p',
            text: 'In a firm, that means a set of real matters with known answers, including the awkward ones: the scanned deed, the client with two entities of similar name, the question your library does not cover. Check the citations resolve. Check the extraction against the document. Record what the reviewer changed, and read those changes monthly with the partner responsible. That pattern is covered further in [evaluating AI quality using real business cases](/insights/evaluate-ai-quality-real-cases).',
          },
        ],
      },
    ],
    limitations: [
      'Where an engagement turns on a novel question or a contested position, preparation help saves little and the risk of an unnoticed error rises.',
      'Retrieval only reaches what is digitised and organised. Physical files, unlabelled scans and personal drives stay invisible.',
      'Extraction quality varies with drafting style and scan quality. A sample must be checked by a person on every batch.',
      'None of this changes who is responsible. The professional who signs the work answers for it, whatever prepared the draft.',
    ],
    faqs: [
      {
        q: 'Can AI do legal or tax research for an Indian firm?',
        a: 'It can find and summarise material, but only reliably when it is restricted to sources you control and every citation resolves to a document a person opens. NIST’s [Generative AI Profile](https://nvlpubs.nist.gov/nistpubs/ai/NIST.AI.600-1.pdf) warns that generative systems can produce confidently stated but false content, including citations that appear to justify an answer. Treat research output as a route to the source, never as the authority itself.',
      },
      {
        q: 'Will AI replace junior professionals in a firm?',
        a: 'It changes what juniors spend time on rather than removing the need for them. Extraction, first drafts and file assembly get faster; reviewing exceptions, checking sources and learning the judgement behind the work does not. Firms that keep juniors close to the review step train them faster. Firms that let a tool do the reading and nobody the checking create a quality problem they will meet later.',
      },
      {
        q: 'Is it safe to put client documents into an AI tool?',
        a: 'That depends entirely on the tool’s terms, where the data sits, whether inputs are retained or used for training, and what your engagement letters and professional obligations allow. Read the current terms rather than the marketing page, decide which categories of material never leave your own environment, and take advice on your own position before any client material moves.',
      },
      {
        q: 'Where should a small firm start?',
        a: 'Start with an internal workflow that has no client-facing output: making your own precedents and past work searchable with sources attached. It is contained, the benefit shows up quickly in time spent searching, and it teaches your team how the system behaves before anything it produces reaches a client. Document review of a repeatable document type is a reasonable second step.',
      },
      {
        q: 'How do we stop a machine draft being issued without proper review?',
        a: 'Make the review a step in the workflow rather than a habit. Mark machine-prepared drafts clearly, require the reviewer to record what they changed before the document can be issued, and keep the issue action with a named person. Then read a sample of changes each month. If reviewers are consistently changing nothing, that is a signal to examine, not a saving.',
      },
    ],
    bybo: [
      {
        href: '/systems/enterprise-knowledge-systems',
        label: 'Enterprise Knowledge',
        why: 'Answers drawn from your own precedents and files, with sources attached and access rules respected.',
      },
      {
        href: '/industries',
        label: 'Industries BYBO works with',
        why: 'Where professional services fit, including precedent search, review packs and engagement coordination.',
      },
      {
        href: '/blueprint',
        label: 'AI Opportunity Blueprint',
        why: 'A paid diagnostic that maps one recurring workflow in the firm and tests whether a build is justified.',
      },
    ],
    related: ['internal-knowledge-system', 'evaluate-ai-quality-real-cases', 'portfolio-websites-for-professionals'],
    sources: [
      {
        title: 'NIST AI 600-1: Artificial Intelligence Risk Management Framework — Generative Artificial Intelligence Profile (July 2024)',
        publisher: 'National Institute of Standards and Technology, U.S. Department of Commerce',
        url: 'https://nvlpubs.nist.gov/nistpubs/ai/NIST.AI.600-1.pdf',
      },
      {
        title: 'NIST AI 100-1: Artificial Intelligence Risk Management Framework (AI RMF 1.0)',
        publisher: 'National Institute of Standards and Technology, U.S. Department of Commerce',
        url: 'https://nvlpubs.nist.gov/nistpubs/ai/NIST.AI.100-1.pdf',
      },
    ],
  },
  {
    slug: 'ai-for-real-estate-businesses',
    collection: 'indian-business',
    title: 'AI for Real Estate Businesses: Enquiries, Availability and Site Coordination',
    seoTitle: 'AI for Real Estate: Enquiries, Visits and Follow-Up',
    description:
      'How real estate firms can use AI for enquiry qualification, approved availability answers, site-visit scheduling, broker coordination and booking checks.',
    dek:
      'Property enquiries arrive at all hours and go cold quickly. A system can qualify them, answer from approved inventory and keep site visits moving. What you claim about a project stays your responsibility.',
    keywords: [
      'AI for real estate',
      'real estate lead qualification',
      'AI for property developers India',
      'site visit scheduling automation',
      'real estate enquiry management',
      'property availability system',
    ],
    publishedAt: '2026-09-11',
    visual: {
      kind: 'compare',
      title: 'Enquiry handling before and after',
      left: {
        label: 'How it usually runs',
        items: [
          'Leads spread across portals, calls and chats',
          'Availability answered from memory',
          'Visits confirmed by phone tag',
          'Follow-up depends on who remembers',
          'No record of what was promised',
        ],
      },
      right: {
        label: 'With a system',
        items: [
          'One record per enquiry, every channel',
          'Answers from approved inventory only',
          'Slots booked, confirmed and reminded',
          'Follow-up scheduled with a named owner',
          'Every claim traceable to a source',
        ],
      },
    },
    summary: [
      'Capture every enquiry in one record, ask the questions your sales team always asks, and route it with the context attached.',
      'Answer availability and price only from approved inventory. A stale “available” costs more than a slightly slower reply.',
      'Site visits are the step that converts. Schedule, confirm, remind and record what the visitor actually asked for.',
      'What you publish about a project is a claim with legal weight. Keep it with a named person who checks the source.',
    ],
    sections: [
      {
        id: 'where-enquiries-leak',
        heading: 'Where do property enquiries actually leak?',
        blocks: [
          {
            type: 'p',
            text: 'A property enquiry has a short half-life. Someone sees a listing at 10 pm, sends a message, and by the next afternoon has spoken to two other developers. Meanwhile the enquiry itself is scattered: a portal dashboard one person checks, a missed call on a marketing number, a WhatsApp message on a sales executive’s phone, a form on the project microsite that emails an inbox nobody opens at the weekend.',
          },
          {
            type: 'p',
            text: 'The losses are rarely dramatic. A caller is told a floor is available when it was blocked that morning. A visit is fixed for Sunday and nobody confirms it. A broker sends three leads and two are already in the system under different phone numbers. None of this is a strategy problem. It is clerical work with no owner, which is exactly what a system handles well, and what BYBO’s [industries view](/industries) describes for real estate: qualifying enquiries, booking visits and connecting approved inventory information.',
          },
          {
            type: 'note',
            tone: 'insight',
            title: 'Count enquiries, not leads',
            text: 'A lead is a marketing number. An enquiry is a person with a question, a budget and a timeline. Count enquiries by channel, count how many were answered within an hour, and count how many reached a site visit. Those three numbers usually explain the month.',
          },
        ],
      },
      {
        id: 'qualify-enquiries',
        heading: 'What should a system do with a new enquiry?',
        blocks: [
          {
            type: 'p',
            text: 'Take the clerical layer and leave the conversation. A system can pull every channel into one record per person, acknowledge within minutes, ask the two or three questions your team always asks, and route the enquiry to the right salesperson with everything already gathered.',
          },
          {
            type: 'list',
            ordered: true,
            items: [
              'Capture: one record per enquirer, with the source, the project asked about and the exact words used.',
              'De-duplicate: match on phone number and email so the same person is not worked twice.',
              'Qualify: configuration, budget range, preferred location, timeline, and whether it is for own use or investment.',
              'Acknowledge: confirm who will call and by when, rather than promising to revert shortly.',
              'Route: by project, language, ticket size or channel partner, with the record attached.',
              'Schedule: create the follow-up with a date and an owner before the enquiry cools.',
            ],
          },
          {
            type: 'p',
            text: 'Qualification is where restraint matters. Three questions asked in the enquirer’s own language will be answered. A form of eleven fields will not. And anyone who asks to speak to a person should reach one quickly. Our guide to [automating customer enquiries](/insights/automate-customer-enquiries) covers the handover in detail.',
          },
        ],
      },
      {
        id: 'availability-answers',
        heading: 'How do you answer availability questions without over-promising?',
        blocks: [
          {
            type: 'p',
            text: '“Is the third floor two-bedroom still available, and what is the price?” is the most common question and the most dangerous one to answer casually. The answer must come from one approved inventory record that someone maintains: unit status, hold, price as approved today, payment plan, and the date the record was last updated. If the system cannot see a current record, the correct reply is that a colleague will confirm, not a guess.',
          },
          {
            type: 'p',
            text: 'The reason to be strict is not only commercial. The [Real Estate (Regulation and Development) Act, 2016](https://rera.karnataka.gov.in/resources/staticpage/Real_Estate_Act.pdf) provides at section 3(1) that no promoter shall advertise, market, book, sell or offer for sale, or invite persons to purchase, any plot, apartment or building in a real estate project in a planning area without registering the project with the Real Estate Regulatory Authority. Section 11(2) requires that an advertisement or prospectus issued by the promoter mention prominently the website address of the Authority, where details of the registered project have been entered, and include the registration number obtained from the Authority. Section 12 provides that where a person makes an advance or deposit on the basis of information in a notice, advertisement or prospectus, or a model apartment, and sustains loss by reason of an incorrect or false statement in it, the promoter shall compensate them.',
          },
          {
            type: 'p',
            text: 'Read together, those provisions make automated replies a compliance matter as much as a sales one. Anything the system states about a project is a statement by you. So the practical design is narrow: an approved answer set, an approved inventory feed, the registration number and Authority website carried in the material, and a person for everything else. That is the boundary [Customer & Workforce AI](/systems/customer-workforce-ai) is built around: approved information for routine answers, and a person for commitments.',
          },
          {
            type: 'note',
            tone: 'caution',
            title: 'General information, not legal advice',
            text: 'This summarises the central Act only. Each state and union territory has its own Authority, rules and orders, and requirements for advertisements and disclosures differ between them. Check the current text on your state Authority’s website and take legal advice before you publish anything automatically.',
          },
        ],
      },
      {
        id: 'site-visits',
        heading: 'How can AI keep site visits moving?',
        blocks: [
          {
            type: 'p',
            text: 'The site visit is the step where interest becomes a decision, and it is mostly logistics. Offering slots that match the sales roster, confirming the address and the person to ask for, sending directions, reminding the day before, rescheduling without three phone calls, and capturing what happened afterwards.',
          },
          {
            type: 'example',
            title: 'Illustrative example: a Pune developer’s weekend visits',
            text: 'Suppose a developer with two projects in Pune receives around 400 enquiries a month, mostly on portals and WhatsApp, and converts a small fraction into weekend site visits. A system acknowledges each enquiry within minutes, asks configuration, budget band and preferred locality, and offers three visit slots from the sales roster. It confirms the slot, shares the location and the name of the executive, and sends a reminder the previous evening. On Monday morning it gives the sales head one view: visits booked, visits attended, the units each visitor asked about, and the six enquiries that went quiet after a price question. Nobody quotes a discount, holds a unit or confirms a payment plan; those go to the sales manager with the conversation attached.',
          },
          {
            type: 'p',
            text: 'The measure worth watching is enquiry-to-visit progression, and then visit-to-revisit. Both are honest numbers: they are hard to inflate and they respond quickly when the coordination improves.',
          },
        ],
      },
      {
        id: 'broker-coordination',
        heading: 'How do you coordinate brokers and channel partners?',
        blocks: [
          {
            type: 'p',
            text: 'Channel partners bring volume and disorder in equal measure. The same buyer is registered by two brokers. Collateral circulates in versions nobody approved. Attribution is argued about at the end of the quarter. A system can hold the register of partners, timestamp each lead, apply your attribution rule consistently, and share only current, approved material.',
          },
          {
            type: 'p',
            text: 'There is a compliance layer here too. Under the same Act, section 9(1) requires a real estate agent to obtain registration before facilitating the sale or purchase of a plot, apartment or building in a registered project in a planning area, and section 10 requires a registered agent not to facilitate sales in a project that is not registered with the Authority and not to engage in unfair trade practices, including false or misleading representations about the services. Keeping registration details, expiry dates and approved collateral in one place, with reminders, is ordinary administrative work that a system does reliably.',
          },
          {
            type: 'list',
            items: [
              'Hold each partner’s registration details and validity, with a reminder before expiry.',
              'Timestamp every submitted lead and apply one written attribution rule.',
              'Circulate only current approved creatives, price sheets and project facts.',
              'Flag duplicate submissions across partners before they become a dispute.',
              'Keep a record of what was shared, with whom and when.',
            ],
          },
        ],
      },
      {
        id: 'booking-documents',
        heading: 'What can a system check in booking documents?',
        blocks: [
          {
            type: 'p',
            text: 'Booking is where a friendly process turns into a file. Identity documents, the application form, the payment plan, the allotment letter, the agreement for sale, and for some buyers a home loan file as well. Most delays are caused by something missing rather than something disputed.',
          },
          {
            type: 'table',
            caption: 'What a system checks, and who decides',
            head: ['Step', 'System prepares', 'Person decides'],
            rows: [
              ['Document list', 'What is received and what is pending', 'Whether to proceed'],
              ['Identity papers', 'Completeness and legibility', 'Acceptance of the document'],
              ['Payment plan', 'Match against the approved plan', 'Any deviation'],
              ['Agreement pack', 'Checklist ready for review', 'Signature and execution'],
            ],
          },
          {
            type: 'p',
            text: 'One provision is worth knowing before designing any booking flow. Section 13(1) of the Act says a promoter shall not accept a sum of more than ten per cent of the cost of the apartment, plot or building as an advance payment or application fee from a person without first entering into a written agreement for sale with that person and registering it. A workflow that collects money should therefore be built with your legal adviser, not around a template found online.',
          },
        ],
      },
      {
        id: 'follow-up',
        heading: 'How do you follow up without becoming a nuisance?',
        blocks: [
          {
            type: 'p',
            text: 'Property follow-up has a poor reputation for good reason. Automation makes both outcomes easier: the useful reminder and the daily pestering. Decide the rhythm deliberately, write it down, and let the system stop when the enquirer stops responding or asks you to.',
          },
          {
            type: 'p',
            text: 'The rules matter as well as the manners. If your follow-up goes out by call or SMS, the Telecom Regulatory Authority of India’s [framework on unsolicited commercial communication](https://trai.gov.in/tcccpr) covers registration of senders and headers, consent and subscriber preferences. Ask your telecom or messaging provider how your headers and templates are registered before you schedule a campaign, and honour every request to stop on the day it arrives.',
          },
          {
            type: 'list',
            items: [
              'Agree how many follow-ups an unanswered enquiry receives, and over what period.',
              'Vary the reason to make contact: a floor plan, a construction update, a slot for a revisit.',
              'Stop automatically when the person asks, and record it against the enquiry.',
              'Keep quiet hours, and keep festival and weekend timings sensible.',
              'Hand the enquiry to a person the moment the questions become specific.',
            ],
          },
        ],
      },
      {
        id: 'what-stays-with-people',
        heading: 'What stays with people?',
        blocks: [
          {
            type: 'p',
            text: 'Price negotiation, discounts, holding a unit, possession timelines, anything about approvals or litigation, and every conversation with a buyer who is already unhappy. These are commitments, and a commitment made by an automated reply is still your commitment. Set them out as rules before launch, so the system hands over early rather than after three unsatisfying exchanges.',
          },
          {
            type: 'p',
            text: 'Then measure the workflow rather than the tool: enquiries answered within an hour, enquiry-to-visit progression, visits attended, follow-ups completed on time, and the share of conversations handed to a person. Take those numbers for a month before launch so you have something honest to compare against. If the project website is doing the first half of this job, our guide to [real estate website design](/insights/real-estate-website-design) covers what that page has to carry.',
          },
        ],
      },
    ],
    limitations: [
      'A system cannot fix a weak project or an unrealistic price. Faster replies bring the same objections sooner.',
      'Availability answers are only as good as the inventory record. If units are blocked on a spreadsheet, expect wrong answers.',
      'Statements about approvals, timelines and registration carry legal weight, and state requirements differ. Keep them with a named person.',
      'High-value buyers often want a person from the first message. Design for that rather than treating it as an exception.',
    ],
    faqs: [
      {
        q: 'Can AI qualify real estate enquiries automatically?',
        a: 'It can do the clerical part well: capture the enquiry from every channel, remove duplicates, ask two or three qualifying questions, acknowledge with a named person and a time, and route with the context attached. Judging whether a buyer is serious, reading hesitation and handling a price conversation still need a salesperson. Design the handover so the buyer never repeats what they have already said.',
      },
      {
        q: 'Can a chatbot tell buyers which units are available?',
        a: 'Only from an approved inventory record that someone keeps current, and only where the record is fresh enough to rely on. Publish unit status, approved price and payment plan from one source, show when it was last updated, and hand over anything involving a hold, a discount or a deviation. A stale “available” damages more trust than a slower answer from a person.',
      },
      {
        q: 'What does RERA mean for automated marketing messages?',
        a: 'The [Real Estate (Regulation and Development) Act, 2016](https://rera.karnataka.gov.in/resources/staticpage/Real_Estate_Act.pdf) requires registration before a project is advertised, marketed, booked or offered for sale in a planning area, and requires advertisements and prospectuses to prominently mention the Authority’s website address and the registration number. It also provides compensation where someone suffers loss from an incorrect or false statement. State rules differ, so check your Authority’s current requirements and take legal advice.',
      },
      {
        q: 'How do we stop follow-up automation annoying buyers?',
        a: 'Agree the number of contacts and the gap between them, give each one a reason worth reading, and stop the moment the person asks. Keep quiet hours. For calls and SMS, check how your headers, templates and consent are registered under [TRAI’s framework](https://trai.gov.in/tcccpr) before you schedule anything. Then review a sample of conversations monthly and cut whatever nobody responds to.',
      },
      {
        q: 'Where should a developer or brokerage start?',
        a: 'Start with capture, acknowledgement and routing on the channel that brings most enquiries, usually a portal or WhatsApp. It is low risk, it needs no claims about the project, and it exposes the state of your data quickly. Add approved availability answers only once one inventory record is genuinely current, and keep site-visit scheduling as the next step after that.',
      },
    ],
    bybo: [
      {
        href: '/systems/customer-workforce-ai',
        label: 'Customer & Workforce AI',
        why: 'Enquiries, bookings and follow-ups answered from approved information, with a person for commitments.',
      },
      {
        href: '/industries',
        label: 'Industries BYBO works with',
        why: 'Where real estate and developers fit, from enquiry qualification to booking document preparation.',
      },
      {
        href: '/systems/website-design-development#concept-property',
        label: 'STILL HOUSE, a property website concept',
        why: 'How a project website can present availability, location and enquiry capture before the visit.',
      },
    ],
    related: ['real-estate-website-design', 'automate-customer-enquiries', 'when-ai-should-decide'],
    sources: [
      {
        title: 'The Real Estate (Regulation and Development) Act, 2016 (Act No. 16 of 2016)',
        publisher: 'Government of India, published by the Karnataka Real Estate Regulatory Authority',
        url: 'https://rera.karnataka.gov.in/resources/staticpage/Real_Estate_Act.pdf',
      },
      {
        title: 'Unsolicited Commercial Communication: TCCCPR 2018, entity and header registration, consent and preferences',
        publisher: 'Telecom Regulatory Authority of India',
        url: 'https://trai.gov.in/tcccpr',
      },
    ],
  },
];

export default guides;
