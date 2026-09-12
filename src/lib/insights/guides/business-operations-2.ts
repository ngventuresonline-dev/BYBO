import type { Guide } from '../types';

const guides: Guide[] = [
  {
    slug: 'ai-invoice-purchase-order-processing',
    collection: 'business-operations',
    title: 'How AI Can Help Businesses Process Invoices and Purchase Orders',
    seoTitle: 'AI for Invoice and Purchase Order Processing',
    description:
      'How a system reads invoices and purchase orders from PDFs, scans and photos, matches them against your records, checks tax details and sends exceptions to a person.',
    dek:
      'Invoice and purchase order work is mostly reading, matching and checking. A system can do the reading and the matching. Approving the payable, and paying it, stays with your team.',
    keywords: [
      'invoice processing automation',
      'AI invoice processing India',
      'purchase order matching',
      'three-way matching',
      'accounts payable automation',
      'GST e-invoice IRN',
      'invoice data extraction',
    ],
    publishedAt: '2026-09-11',
    visual: {
      kind: 'flow',
      title: 'From invoice to approved payable',
      steps: ['Receive invoice', 'Read fields', 'Match PO and receipt', 'Review exceptions', 'Prepare payable'],
      gate: 3,
      gateLabel: 'Accounts reviews and approves',
    },
    summary: [
      'A document system reads invoices and purchase orders, extracts the fields and matches them against your orders and goods receipts.',
      'Agree tolerances in advance. Anything outside them becomes an exception with a named owner, not a quiet adjustment.',
      'Preparing a payable is not paying it. Approval limits, segregation of duties and payment authority stay where they already are.',
      'Measure time per invoice, share needing review, rework and duplicates caught, against a baseline taken before launch.',
    ],
    sections: [
      {
        id: 'where-the-time-goes',
        heading: 'Why do invoices and purchase orders take so long?',
        blocks: [
          {
            type: 'p',
            text: 'An invoice is a small document that creates a surprising amount of work. Someone opens the email and downloads the file. Someone types the supplier name, the invoice number, the date, the taxable value, the tax split and the line items into the accounting software. Someone finds the purchase order and checks the rates against it. Someone in the warehouse confirms what actually arrived. If two cartons are short, a phone call starts, and the invoice waits in a tray until that call ends.',
          },
          {
            type: 'p',
            text: 'None of this is difficult. It is repetitive, it happens hundreds of times a month, and it is easy to get slightly wrong at four in the afternoon on the last day of the month. The cost shows up later, in places that do not look like data entry:',
          },
          {
            type: 'list',
            items: [
              'The same invoice paid twice, once against the emailed copy and once against the courier copy.',
              'A price increase nobody agreed, paid because the rate was never compared with the order.',
              'A short delivery paid in full, with the credit note chased months later.',
              'Early-payment terms missed because the file was still with someone for approval.',
              'A month-end scramble to find documents that were always going to be needed.',
            ],
          },
          {
            type: 'p',
            text: 'The work worth handing to a system is the reading, the matching and the checking. What stays with people is the judgement: whether a difference is acceptable, whether a supplier should be paid this week, and whether an unusual request is genuine.',
          },
        ],
      },
      {
        id: 'what-a-system-reads',
        heading: 'What can a system actually read from an invoice or purchase order?',
        blocks: [
          {
            type: 'p',
            text: 'Documents arrive in whatever shape the sender had to hand. A clean PDF produced by the supplier’s billing software. A scan of a printed invoice, slightly skewed. A photograph taken on a phone and sent on WhatsApp, with a thumb over one corner. A purchase order forwarded three times, so the useful page is the third attachment. A system that only reads tidy PDFs will not survive a normal week.',
          },
          {
            type: 'p',
            text: 'Modern document systems read images and PDFs together and pull out named fields rather than a wall of text. For an invoice, that usually means:',
          },
          {
            type: 'list',
            items: [
              'Supplier name, address and GSTIN, and the buyer details on the invoice.',
              'Invoice number, invoice date, and any purchase order or contract reference.',
              'Line items: description, HSN code, quantity, unit, rate and line value.',
              'Taxable value, the tax split, any discount, freight or packing charges, and the total.',
              'Payment terms, due date and the bank details printed on the document.',
            ],
          },
          {
            type: 'p',
            text: 'Two properties matter more than the length of that list. First, every value should come with a confidence score, so the system can hold back what it is unsure about instead of guessing. Second, every value should link to the place on the page it was read from, so a reviewer can check it in a second rather than reading the whole document again. That is the pattern behind our [Business Operations](/systems/document-multimodal-intelligence) work, and the same pipeline applies to any document type, as [the general document workflow](/insights/document-automation-workflow) sets out.',
          },
          {
            type: 'note',
            tone: 'insight',
            title: 'A field with no evidence is a guess',
            text: 'Ask for extraction that shows its working: the value, where on the page it came from, and how confident the system is. Reviewers then check a highlighted box, not a whole invoice. It also makes disagreements with a supplier much easier to settle.',
          },
        ],
      },
      {
        id: 'two-way-and-three-way-matching',
        heading: 'How does matching against the PO and goods receipt work?',
        blocks: [
          {
            type: 'p',
            text: 'Matching is the step that turns a read document into a checked one. Two-way matching compares the invoice with the purchase order. Three-way matching adds the goods receipt or delivery note, so you also confirm that what is billed is what arrived. Services often use a two-way match against the order and a signed completion note instead of a receipt.',
          },
          {
            type: 'table',
            caption: 'What each match compares',
            head: ['Match', 'Compares', 'Catches'],
            rows: [
              ['Two-way', 'Invoice against purchase order', 'Wrong rate, wrong item, no order'],
              ['Three-way', 'Invoice, order and goods receipt', 'Short supply, damaged goods, early billing'],
              ['Contract', 'Invoice against agreed terms', 'Unapproved charges, expired rates'],
            ],
          },
          {
            type: 'p',
            text: 'Real purchasing is untidier than the diagram. One order may be delivered in four lots and invoiced five times. A supplier may bill freight that the order does not mention. A credit note may arrive weeks after the invoice it corrects. So the matching rules need to handle partial receipts, cumulative quantities against a single order, and documents that arrive out of order. Agree how each of those behaves before launch, in writing, with the person who does the work today.',
          },
        ],
      },
      {
        id: 'tax-and-supplier-checks',
        heading: 'Which checks belong before anything is posted?',
        blocks: [
          {
            type: 'p',
            text: 'Matching answers whether the commercial detail is right. A second set of checks asks whether the document is valid and whether it is safe to act on:',
          },
          {
            type: 'list',
            items: [
              'Is the supplier in your master list, and is the GSTIN on the invoice the one you hold?',
              'Do the tax lines add up, and is the tax type consistent with the place of supply?',
              'Is this a duplicate: same supplier, same invoice number, same amount, or the same file seen twice?',
              'Have the bank details changed since the last invoice from this supplier?',
              'Is the invoice within the agreed price list, and is the purchase order still open?',
            ],
          },
          {
            type: 'p',
            text: 'The bank-details check deserves its own rule. A changed account number on an otherwise ordinary invoice is one of the more common frauds in accounts payable. Treat it as an exception that a person confirms with the supplier on a number you already hold, never on a number printed on the new document.',
          },
          {
            type: 'p',
            text: 'India adds one more useful signal. For registered persons above a turnover threshold, invoices for business-to-business supplies must be reported to the invoice registration portal, which returns a unique Invoice Reference Number, a digitally signed invoice and a QR code, as the [GST e-invoice portal](https://einvoice1.gst.gov.in/) describes. The threshold has moved over the years: [Notification No. 10/2023 – Central Tax](https://www.gstcouncil.gov.in/sites/default/files/2024-05/10ct_eng.pdf) substituted the words “five crore rupees” for “ten crore rupees” with effect from 1 August 2023. If your supplier is covered, the presence and consistency of the IRN and QR code is worth checking before you post.',
          },
          {
            type: 'note',
            tone: 'caution',
            title: 'General information, not tax advice',
            text: 'Thresholds, exemptions and reporting windows change, and this summarises public documents as they stood in September 2026. Confirm what applies to your business on the e-invoice portal and with your tax adviser before you write a rule that blocks a payment.',
          },
        ],
      },
      {
        id: 'tolerances-and-exceptions',
        heading: 'How do tolerances keep exceptions honest?',
        blocks: [
          {
            type: 'p',
            text: 'If every difference of one rupee becomes an exception, your team will spend more time on the queue than they spent on the invoices. A tolerance is a difference you have agreed in advance to accept without a conversation: rounding, a small quantity variance on bulk material, freight within an agreed limit. Write the tolerances down, say who set them and when they will be reviewed, and keep them in one place rather than in each person’s head.',
          },
          {
            type: 'p',
            text: 'Everything outside tolerance becomes an exception with a reason: price difference, quantity difference, no purchase order, tax mismatch, possible duplicate, supplier not recognised. Reason codes are worth the small effort. After two months they tell you which suppliers, which categories and which internal habits create most of your rework.',
          },
          {
            type: 'example',
            title: 'Illustrative example: a Pune distributor’s three-way match',
            text: 'Suppose a distributor in Pune receives 400 supplier invoices a month. The purchase order says 500 cartons at ₹240. The goods receipt records 480 cartons, with 20 noted as damaged. The invoice bills 500 cartons at ₹248. The system reads all three documents, matches them and produces two exceptions rather than a payable: a quantity difference of 20 cartons and a rate difference of ₹8 per carton, which is above the agreed rounding tolerance. Both go to the purchase officer with the three documents side by side and the relevant lines highlighted. She confirms a revised rate agreed by email in March and asks the supplier for a credit note for the damaged cartons. The payable is prepared only after she approves it, with her note attached. The arithmetic here is illustrative, not a benchmark.',
          },
        ],
      },
      {
        id: 'approval-and-audit-trail',
        heading: 'Who approves, and what should the audit trail hold?',
        blocks: [
          {
            type: 'p',
            text: 'A system that reads and matches well can still create a governance problem if it is allowed to post and pay on its own. Keep the distinction clear. Preparing a payable is clerical work. Approving it is a financial decision that belongs to a person with the authority to make it, under the same limits and segregation of duties your auditor already expects. The system follows your approval policy; it does not replace it. [Design the human decision into the workflow](/insights/human-in-the-loop-product-decision) covers what the approver needs in front of them.',
          },
          {
            type: 'p',
            text: 'The trail behind each record should answer an auditor’s questions without anyone reconstructing the week:',
          },
          {
            type: 'list',
            items: [
              'The original file, where it arrived from, and when.',
              'Each extracted value, its confidence and the place on the page it came from.',
              'Which checks ran, and what each one returned.',
              'What the reviewer changed, and the reason they gave.',
              'Who approved it, at what time, and under which limit.',
              'The reference of the record created in your accounting system, and any failed attempt to create it.',
            ],
          },
          {
            type: 'p',
            text: 'That last point is easy to forget. If the connection to your accounting software fails halfway, you need to know whether the entry was created, so nobody posts it twice. Ask how the system prevents a repeated attempt from creating a second record.',
          },
        ],
      },
      {
        id: 'measure-and-start',
        heading: 'How do you measure it, and where should you start?',
        blocks: [
          {
            type: 'p',
            text: 'Measure the current state before you change anything. Take a month of invoices and record how long each took from arrival to posting, how many needed rework, how many were duplicates, how many discounts were missed and how much of month-end was spent looking for documents. Without that, any improvement is a matter of opinion.',
          },
          {
            type: 'list',
            items: [
              'Time per invoice, from arrival to a posted, approved record.',
              'Share of invoices needing human review, and how that changes month by month.',
              'Error and rework rate after posting, which matters more than extraction accuracy.',
              'Duplicates and rate differences caught before payment.',
              'Cost per completed record, including review time and the software you run.',
            ],
          },
          {
            type: 'p',
            text: 'Start narrow. One document type, one set of suppliers, one team, with review switched on for everything for the first few weeks. Widen the tolerances only when the exception queue tells you the checks are behaving. If you are not sure whether invoices are your best first workflow, the [AI Opportunity Blueprint](/blueprint) is a paid diagnostic that maps the workflow, assesses readiness and helps you decide what is worth building.',
          },
        ],
      },
    ],
    limitations: [
      'If a page is unreadable to a person, it is unreadable to the system. Torn, crumpled or half-photographed documents still need a human eye.',
      'Where purchase orders are informal, given verbally or agreed on WhatsApp, there is nothing reliable to match against. The process has to be fixed before the software helps.',
      'Handwritten annotations, rubber stamps, regional-language notes and supplier-specific abbreviations need testing case by case, not assuming.',
      'The system can show that a rate has changed. It cannot decide whether the new rate is acceptable, which is a commercial judgement.',
      'At low volumes the gain is small. A business handling thirty invoices a month may get more from tidying its filing than from a build.',
    ],
    faqs: [
      {
        q: 'Can AI read invoices sent as WhatsApp photographs?',
        a: 'Often, yes. Document systems read photographs as well as PDFs, and can correct for angle, shadow and lighting to a point. Quality still decides the result: a sharp photograph of a flat page usually reads well, while a crumpled invoice shot at an angle in poor light may not. Test with a sample of the photographs your suppliers actually send, including the bad ones, before you promise anything.',
      },
      {
        q: 'What is the difference between two-way and three-way matching?',
        a: 'Two-way matching compares the invoice with the purchase order, so you can see whether the rate, quantity and item ordered agree with what has been billed. Three-way matching adds the goods receipt or delivery note, so you also confirm what actually arrived. Three-way matching catches short supply and early billing, which a two-way match cannot see. Services are usually matched against the order and a completion note.',
      },
      {
        q: 'Will the system pay our suppliers automatically?',
        a: 'It should not, and in most businesses it must not. A sensible design prepares a payable and stops. Payment stays behind your existing approval limits, segregation of duties and banking controls, with a person authorising the release. Automation removes the typing and the chasing, not the accountability. If a vendor proposes automatic payment, ask which control in your current policy it replaces, and who signed that off.',
      },
      {
        q: 'Does this handle GST e-invoices and IRNs?',
        a: 'A system can read the Invoice Reference Number and QR code that the invoice registration portal returns, and check that they are present and consistent with the invoice in front of it. What it cannot do is tell you which rules apply to you. Thresholds and exemptions have changed several times, so confirm current requirements on the GST e-invoice portal and with your tax adviser rather than trusting a rule written last year.',
      },
      {
        q: 'How accurate is invoice data extraction?',
        a: 'Accuracy varies by document quality, layout and field, so a single headline number tells you little. A better question is what the system does when it is unsure. Ask for per-field confidence, a review queue for low-confidence values, and a test on fifty of your own documents, including the awkward ones. Judge it on the rework rate after posting, not on a demonstration with clean samples.',
      },
    ],
    bybo: [
      {
        href: '/systems/document-multimodal-intelligence',
        label: 'Business Operations',
        why: 'How BYBO reads invoices and orders, matches them to your records and routes exceptions with the evidence attached.',
      },
      {
        href: '/insights/human-in-the-loop-product-decision',
        label: 'Design the human decision into the workflow',
        why: 'What an approver needs in front of them: the evidence, a clear proposal and a fallback.',
      },
      {
        href: '/blueprint',
        label: 'AI Opportunity Blueprint',
        why: 'A paid diagnostic that maps the workflow, measures a baseline and decides what is worth building.',
      },
    ],
    related: ['reduce-manual-data-entry', 'ai-permissions-logs-approval-gates', 'ai-for-manufacturing-and-exports'],
    sources: [
      {
        title: 'Notification No. 10/2023 – Central Tax, dated 10 May 2023 (e-invoicing threshold)',
        publisher: 'Central Board of Indirect Taxes and Customs, Ministry of Finance',
        url: 'https://www.gstcouncil.gov.in/sites/default/files/2024-05/10ct_eng.pdf',
      },
      {
        title: 'e-Invoice System (Invoice Registration Portal)',
        publisher: 'Goods and Services Tax Network / National Informatics Centre',
        url: 'https://einvoice1.gst.gov.in/',
      },
    ],
  },
  {
    slug: 'document-automation-workflow',
    collection: 'business-operations',
    title: 'Document Automation: From Incoming File to Approved Business Record',
    seoTitle: 'Document Automation: File to Approved Record',
    description:
      'The path any incoming document follows: intake, classify, extract, validate, review, record and retain, with confidence, evidence and access under control.',
    dek:
      'Most document work follows the same path, whatever the file is. Getting each step right is what turns a scanned page into a record your team, your auditor and your customer can rely on.',
    keywords: [
      'document automation workflow',
      'intelligent document processing',
      'KYC document verification',
      'document classification and extraction',
      'document retention policy India',
      'automated document review',
    ],
    publishedAt: '2026-09-11',
    visual: {
      kind: 'layers',
      title: 'From incoming file to record',
      layers: [
        { label: 'Intake', note: 'Email, upload, WhatsApp, scanner, courier' },
        { label: 'Classify', note: 'Decide what the document is' },
        { label: 'Extract', note: 'Named fields, with evidence attached' },
        { label: 'Validate', note: 'Check against your records and rules' },
        { label: 'Review', note: 'A person resolves what is unclear' },
        { label: 'Record and retain', note: 'Post it, keep it, control who reads it' },
      ],
    },
    summary: [
      'Every document type follows one path: intake, classify, extract, validate, review, record and retain.',
      'Extraction is only useful with a confidence score and a link back to the place each value came from.',
      'Poor scans and handwriting are a capture problem before they are a software problem. Test with your worst real files.',
      'Decide retention and access before launch. A pile of copied documents is a liability, not an archive.',
    ],
    sections: [
      {
        id: 'what-document-automation-covers',
        heading: 'What does document automation actually cover?',
        blocks: [
          {
            type: 'p',
            text: 'Document automation is not one product. It is a path that a file follows from the moment it arrives to the moment it becomes a record someone can act on. The path is the same whether the document is a customer’s identity proof, a signed delivery note from a lorry driver, a supplier contract, a student’s application or a claim form. Only the fields and the checks change.',
          },
          {
            type: 'list',
            ordered: true,
            items: [
              'Intake: receive the file, note where it came from and attach it to a case.',
              'Classify: decide what the document is before reading it in detail.',
              'Extract: pull the named fields, each with a confidence score and its place on the page.',
              'Validate: compare what the document says with your records and your rules.',
              'Review: give a person the cases the system could not settle, with the evidence beside them.',
              'Record: create the entry in the system that owns it, and keep the reference.',
              'Retain: store the original for as long as it is needed, and no longer.',
            ],
          },
          {
            type: 'p',
            text: 'Most disappointing document projects skip a step. They read well and validate nothing, so mistakes reach the ledger. Or they validate carefully and never decide who owns the review queue, so the queue grows until people go around it. Our [Business Operations](/systems/document-multimodal-intelligence) work treats the whole path as the product. For the specific case of payables, [invoices and purchase orders](/insights/ai-invoice-purchase-order-processing) go into more detail on matching and tax checks.',
          },
        ],
      },
      {
        id: 'intake-and-classification',
        heading: 'How do documents get in, and how are they sorted?',
        blocks: [
          {
            type: 'p',
            text: 'Documents arrive by whichever route is easiest for the sender: an email attachment, a WhatsApp photograph, a portal upload, an office scanner, a courier packet scanned as one long PDF. Give them one front door. A single intake point records the channel, the sender, the time and the case the file belongs to, and it removes the copies of the same file that arrive twice.',
          },
          {
            type: 'p',
            text: 'Classification comes before detailed reading. A single PDF may hold four different documents. A customer may send an address proof where an income proof was asked for. If the system decides wrongly what a file is, everything after that is wrong in a way that is hard to see. So classification should split multi-document files, name each part, attach it to the right case and send anything it cannot place confidently to a person rather than to a default folder.',
          },
          {
            type: 'note',
            tone: 'insight',
            title: 'Sort before you read',
            text: 'A misfiled document costs more than a mis-read field. A wrong value gets caught in validation. A file sitting in the wrong case is invisible until a customer asks why nothing has happened.',
          },
        ],
      },
      {
        id: 'extraction-confidence-evidence',
        heading: 'What should extraction give you besides the values?',
        blocks: [
          {
            type: 'p',
            text: 'For each document type, write down the fields you actually need. Not everything on the page: the fields your next step depends on. An identity document may need name, date of birth, document number and expiry. A delivery note may need the shipment reference, the quantities and whether it is signed. Anything beyond that is work you are paying for twice, once to extract and once to check.',
          },
          {
            type: 'table',
            caption: 'What every extracted field should carry',
            head: ['Property', 'Why it matters'],
            rows: [
              ['The value', 'What the next step will use'],
              ['A confidence score', 'Lets the system hold back what it is unsure of'],
              ['Evidence', 'Shows the reviewer where on the page it came from'],
              ['A source reference', 'Ties the value to a file and a version'],
            ],
          },
          {
            type: 'p',
            text: 'Set the confidence thresholds per field rather than per document. A middle name read at seventy per cent confidence may be fine; an account number at the same confidence is not. Above the threshold the value flows on. Below it, the field, not the whole document, goes to review. That single distinction usually decides whether a review queue is workable or hated.',
          },
        ],
      },
      {
        id: 'validation',
        heading: 'Which checks turn extracted text into a record you can trust?',
        blocks: [
          {
            type: 'p',
            text: 'Extraction tells you what the page says. Validation asks whether it can be true, and whether it agrees with what you already hold:',
          },
          {
            type: 'list',
            items: [
              'Completeness: are all the documents on the checklist present, and all required fields filled?',
              'Consistency: does the name on one document match the name on the others, allowing for initials and spelling variants?',
              'Currency: is the document still valid, and is it within the period your policy allows?',
              'Arithmetic: do the totals, quantities and dates hold together?',
              'Duplication: has this exact file, or this reference, been processed before?',
              'Format: does an identifier have the structure it is supposed to have?',
            ],
          },
          {
            type: 'p',
            text: 'When the document carries personal data, accuracy is more than good practice. India’s [Digital Personal Data Protection Act, 2023](https://www.meity.gov.in/static/uploads/2024/06/2bf1f0e9f04e6fb4f8fef35e82c42aa5.pdf) provides that where personal data is likely to be used to make a decision that affects the person, or to be disclosed to another data fiduciary, the organisation processing it must ensure its completeness, accuracy and consistency. An extraction error that changes someone’s eligibility is not a small operational slip.',
          },
        ],
      },
      {
        id: 'poor-scans-and-handwriting',
        heading: 'What happens with poor scans and handwriting?',
        blocks: [
          {
            type: 'p',
            text: 'Reading quality falls away for reasons that have nothing to do with the software: low-resolution photographs, shadow across the page, a stamp printed over the figures, a carbon copy of a challan, a faded thermal print, a staple through a table, a page photographed at an angle so the last column tapers away. Handwriting adds its own difficulty. Printed capitals in boxes read far better than joined-up writing, and a crossed seven, a European one and a hurried nine are genuinely ambiguous.',
          },
          {
            type: 'p',
            text: 'The useful responses happen at intake, not in the model:',
          },
          {
            type: 'list',
            items: [
              'Tell people how to capture: flat page, full page in frame, good light, no flash on glossy paper.',
              'Check quality at intake and ask again immediately, while the person and the document are still together.',
              'Keep the original file untouched, whatever the system does with a cleaned-up copy.',
              'Never let a low-confidence field be filled quietly with a plausible value.',
              'Track which document types and which sources produce the most review, and fix those at source.',
            ],
          },
          {
            type: 'example',
            title: 'Illustrative example: a Coimbatore workshop’s delivery notes',
            text: 'Suppose a workshop in Coimbatore receives about sixty signed delivery notes a day, photographed in the yard by the store team. The printed header, the shipment reference and the tabulated quantities read reliably. The handwritten corrections in the margin, where a driver has struck out one quantity and written another, do not. The system extracts the printed fields, marks any note with a handwritten change as an exception, and shows the store supervisor the photograph with that region highlighted. Around one in eight notes reaches her. The largest single improvement is not a better model: it is a clipboard and a lamp near the gate, so the photograph is flat and lit. The numbers here are illustrative.',
          },
        ],
      },
      {
        id: 'review-and-becoming-a-record',
        heading: 'When does a document become a business record?',
        blocks: [
          {
            type: 'p',
            text: 'A review queue is a workplace, so design it like one. The reviewer should see the document and the proposed values side by side, with the uncertain fields highlighted; be able to correct a field, reject the document or ask for a better copy; and give a reason in one click rather than a paragraph. Every correction is recorded against the field, not only against the document, so you can see which fields cause trouble.',
          },
          {
            type: 'p',
            text: 'The record is created at the end of that, not at the start. Posting means writing to the system that owns the truth for this document type, and keeping the reference it returns. Keep three things linked for the life of the record: the original file, the values as extracted, and the values as approved, with the reason for any difference. That link is what lets you answer a question two years later without reconstructing anyone’s week. It also keeps [manual data entry](/insights/reduce-manual-data-entry) from creeping back in through a side door.',
          },
          {
            type: 'note',
            tone: 'insight',
            title: 'Corrections are data, not noise',
            text: 'Read the corrections monthly with the process owner. A field that is corrected often points at a rule to change, a form to redesign or a supplier to talk to. Fix the cause, not each instance.',
          },
        ],
      },
      {
        id: 'retention-and-access',
        heading: 'How long do you keep it, and who can see it?',
        blocks: [
          {
            type: 'p',
            text: 'Automation multiplies copies. The original file, the cleaned image, the extracted text, the record in your business software, an export in someone’s folder. Decide the retention schedule before launch, document type by document type: what you keep, in which place, for how long, on what basis, and who removes it when the time comes. Some periods are set by tax, company or sector rules, so agree them with your auditor rather than guessing.',
          },
          {
            type: 'p',
            text: 'For personal data the direction runs the other way. The [DPDP Act](https://www.meity.gov.in/static/uploads/2024/06/2bf1f0e9f04e6fb4f8fef35e82c42aa5.pdf) provides that, unless retention is necessary for compliance with a law in force, personal data must be erased when the person withdraws consent or as soon as it is reasonable to assume the purpose is no longer being served, whichever is earlier. The [DPDP Rules, 2025](https://www.meity.gov.in/static/uploads/2025/11/53450e6e5dc0bfa85ebd78686cadad39.pdf) were notified in November 2025, with obligations commencing in phases. A folder of scanned identity documents kept because storage is cheap is a liability, not an archive.',
          },
          {
            type: 'p',
            text: 'Access deserves the same care. Decide who may open a completed file, who may only see the fields, what is masked on screen, and what is recorded when someone downloads a copy. If a service provider processes documents on your behalf, that relationship belongs in a contract, with the same access rules applied to them.',
          },
          {
            type: 'note',
            tone: 'caution',
            title: 'General information, not legal advice',
            text: 'This summarises public documents as they stood in September 2026, and the Rules commence in phases. Check the current text and take advice on your own obligations, particularly if you are regulated, before you write a retention rule that deletes anything.',
          },
        ],
      },
    ],
    limitations: [
      'A document type you see twice a month is usually cheaper to handle by hand. Automation earns its keep on volume and repetition.',
      'Software cannot rescue a badly designed form. Redesigning the form, or how it is filled in, often gives a larger gain than any model.',
      'Quality varies sharply by document type. A system that handles delivery notes well may still need close review on contracts.',
      'Automating a broken process makes its errors arrive faster and in greater number. Agree the process first.',
      'In regulated work, such as lending or healthcare, the rules decide what counts as valid verification. The system follows those rules; it does not define them.',
    ],
    faqs: [
      {
        q: 'Which documents are worth automating first?',
        a: 'Choose a type that arrives often, follows a recognisable structure and feeds a step people are waiting on: delivery notes, application forms, onboarding files, standard supplier documents. Avoid starting with your most varied or most sensitive type. A good first choice has enough volume to measure within a month and a named owner who already handles the exceptions today.',
      },
      {
        q: 'How is this different from OCR?',
        a: 'Optical character recognition turns an image into text. That is one step inside a longer path. Document automation also decides what the document is, pulls named fields rather than a wall of text, attaches confidence and evidence to each value, checks the values against your records, routes what is unclear to a person and creates the record at the end. OCR alone leaves all of that with your team.',
      },
      {
        q: 'Who is responsible if the system reads something wrong?',
        a: 'Your business is. Responsibility for a record does not move to a supplier or a model. That is why the design matters: confidence thresholds so uncertain values stop, a named reviewer for exceptions, an audit trail that shows what was extracted, what was changed and who approved it. Software vendors carry contractual obligations; the accountability for the decision stays with you.',
      },
      {
        q: 'Can it read handwriting?',
        a: 'Partly, and unevenly. Printed capitals in guided boxes read reasonably well. Joined-up handwriting, annotations in the margin and signatures do not. The sensible design reads what it can, marks the rest for review, and never fills a blank with a plausible guess. If handwriting is central to your documents, test on a real sample and set expectations from that result, not from a demonstration.',
      },
      {
        q: 'How long should we keep the original files?',
        a: 'Long enough to satisfy the law and any real business need, and no longer. Tax, company and sector rules set minimum periods for many records, so agree those with your auditor. Where documents contain personal data, the DPDP Act points the other way, requiring erasure once the purpose is served unless a law requires retention. Write a schedule per document type and give someone the job of applying it.',
      },
    ],
    bybo: [
      {
        href: '/systems/document-multimodal-intelligence',
        label: 'Business Operations',
        why: 'BYBO builds the whole path: intake, extraction with evidence, validation, review and a record you can trace.',
      },
      {
        href: '/insights/ai-invoice-purchase-order-processing',
        label: 'Invoices and purchase orders',
        why: 'The same pipeline applied to payables, with matching, tax checks and approval limits.',
      },
      {
        href: '/how-we-work',
        label: 'How we work',
        why: 'How a document workflow is scoped, tested against real files and handed over with an owner.',
      },
    ],
    related: ['ai-systems-and-dpdp-india', 'identify-repetitive-work-to-automate', 'ai-for-education-and-lending'],
    sources: [
      {
        title: 'The Digital Personal Data Protection Act, 2023 (No. 22 of 2023)',
        publisher: 'Ministry of Electronics and Information Technology, Government of India',
        url: 'https://www.meity.gov.in/static/uploads/2024/06/2bf1f0e9f04e6fb4f8fef35e82c42aa5.pdf',
      },
      {
        title: 'Digital Personal Data Protection Rules, 2025 (G.S.R. 846(E))',
        publisher: 'Ministry of Electronics and Information Technology, Government of India',
        url: 'https://www.meity.gov.in/static/uploads/2025/11/53450e6e5dc0bfa85ebd78686cadad39.pdf',
      },
    ],
  },
  {
    slug: 'agentic-workflows-between-teams',
    collection: 'business-operations',
    title: 'How Agentic Workflows Keep Recurring Work Moving Between Teams',
    seoTitle: 'How Agentic Workflows Move Work Between Teams',
    description:
      'What an agentic workflow is in plain terms, how it carries a case between sales, operations and accounts, and the limits, approvals and retries it needs to be safe.',
    dek:
      'An agentic workflow carries a multi-step task across your tools, inside limits you set. The value is not cleverness. It is that nothing waits for someone to remember it.',
    keywords: [
      'agentic workflow',
      'AI agents for business operations',
      'workflow automation between teams',
      'approval gates and action limits',
      'idempotency in automation',
      'back office process automation India',
    ],
    publishedAt: '2026-09-11',
    visual: {
      kind: 'compare',
      title: 'Passed by email, or carried',
      left: {
        label: 'Passed by email',
        items: [
          'Each step waits to be noticed',
          'Context retyped at every handoff',
          'No record of who owns it now',
          'Delays surface when a customer asks',
        ],
      },
      right: {
        label: 'Carried by a workflow',
        items: [
          'The next step starts on its own',
          'Context travels with the case',
          'A named owner at every stage',
          'A timeout raises it before the customer does',
        ],
      },
    },
    summary: [
      'An agentic workflow carries a task from trigger to finish across your tools, choosing permitted steps inside limits you set.',
      'Write the limits down: which tools, which records, which actions, what value, how many, how long before it escalates.',
      'Repeats must be safe. The same instruction arriving twice should not create two invoices or two payments.',
      'Money, commitments, legal documents and anything hard to reverse stay behind a person’s approval.',
    ],
    sections: [
      {
        id: 'what-is-an-agentic-workflow',
        heading: 'What is an agentic workflow, in plain terms?',
        blocks: [
          {
            type: 'p',
            text: 'An agentic workflow is a system that carries a multi-step task from the event that starts it to the point where it is finished, using the tools it has been given, inside limits you have set. It is not a chatbot, and it is not a single clever answer. It is closer to a diligent coordinator who knows the process, has keys to a few specific cupboards, and has been told exactly when to knock on a manager’s door.',
          },
          {
            type: 'p',
            text: 'The difference from older automation is narrow but useful. A fixed rule runs the same steps in the same order and stops when reality differs from the diagram. An agent can choose its next step from a set you have approved, gather what is missing, notice that a case does not look normal and hand it to a person with an explanation. What it must never have is open-ended freedom. That is why our [Agentic Operations](/systems/agentic-operations) work starts by writing down the boundary, not the ambition.',
          },
        ],
      },
      {
        id: 'where-work-stalls',
        heading: 'Where does recurring work stall between teams?',
        blocks: [
          {
            type: 'p',
            text: 'Look at any recurring case that crosses two or three teams and the pattern repeats. The steps are not the problem. The gaps between them are, because each gap needs a person to notice something and pick it up.',
          },
          {
            type: 'table',
            caption: 'One order, three teams, four pauses',
            head: ['Stage', 'Who acts', 'Where it stalls'],
            rows: [
              ['Order agreed', 'Sales', 'Details sit in a chat thread'],
              ['Fulfilment', 'Operations', 'Waiting on a stock confirmation'],
              ['Invoice raised', 'Accounts', 'Missing order reference'],
              ['Follow-up', 'Sales', 'Nobody knows the current state'],
            ],
          },
          {
            type: 'p',
            text: 'Two costs come out of those pauses. The obvious one is time: an order that could close on Tuesday closes on Friday. The quieter one is retyping. The same customer name, quantity and delivery address are entered three times, in three systems, by three people, and the third copy is the one that goes on the invoice. An agentic workflow is worth considering exactly where the work is repeatable, the finish is definable and the delay is caused by handoffs rather than by thinking.',
          },
        ],
      },
      {
        id: 'limits-the-agent-works-inside',
        heading: 'What limits should an agent work inside?',
        blocks: [
          {
            type: 'p',
            text: 'Autonomy is not a single dial. It is a set of specific permissions, and each one should be written in language your operations lead can read and challenge:',
          },
          {
            type: 'list',
            items: [
              'Tools: which systems it may read, and the shorter list it may write to.',
              'Data: which records, which customers and which fields, with everything else out of reach.',
              'Actions: which actions it may take at all, and which it may only propose.',
              'Value: a limit per action and per day, above which a person decides.',
              'Volume: how many cases an hour before it pauses and asks whether something is wrong.',
              'Time: how long a case may sit at any step before it is escalated.',
              'Stop conditions: what makes it stop entirely and call a named person.',
            ],
          },
          {
            type: 'p',
            text: 'Write these before anyone builds. They are also the honest answer to “how much can we trust it?”, which is the wrong question. You do not need to trust a workflow that cannot do anything you have not permitted, and that records everything it does.',
          },
        ],
      },
      {
        id: 'approvals-and-handoffs',
        heading: 'How should approvals and handoffs be designed?',
        blocks: [
          {
            type: 'p',
            text: 'An approval is part of the product, not an interruption to it. Decide who approves each consequential action, what they see when they are asked, how long they have, and what happens if they do not respond. An approval request that arrives without the evidence behind it simply moves the investigation to a busier person. [Approval workflows that do not slow the business down](/insights/approval-workflow-design) goes further into that design.',
          },
          {
            type: 'p',
            text: 'Handoffs between teams need the same discipline. When a case moves from sales to operations, or from operations to accounts, it should carry:',
          },
          {
            type: 'list',
            items: [
              'The case reference, and the customer or supplier it belongs to.',
              'What has already happened, with times and the person or step responsible.',
              'What is being proposed now, and why.',
              'What is missing or uncertain, stated plainly.',
              'Who owns it from this moment, and by when they are expected to act.',
            ],
          },
          {
            type: 'p',
            text: 'That packet is what stops the receiving team from starting again. It is also the record you will want when a customer asks, six weeks later, why something took as long as it did.',
          },
        ],
      },
      {
        id: 'retries-duplicates-and-timeouts',
        heading: 'Retries, duplicates and timeouts: what should you insist on?',
        blocks: [
          {
            type: 'p',
            text: 'Systems fail in the middle, and this is where careless automation does real damage. A workflow asks your accounting software to create an invoice. The connection times out. Did the invoice get created? If the workflow simply tries again, the customer may receive two.',
          },
          {
            type: 'p',
            text: 'The safeguard has an unfriendly name and a simple meaning. An action is idempotent when repeating it has the same effect as doing it once. The idea comes from how the web is specified: the IETF’s [HTTP Semantics specification](https://www.rfc-editor.org/rfc/rfc9110.html) treats a request as idempotent when the intended effect of several identical requests is the same as for a single one. In practice it means every action carries a unique reference, such as “case 4021, create invoice”, so the receiving system recognises the repeat and returns the original result instead of creating a second record.',
          },
          {
            type: 'list',
            items: [
              'A retry limit, with a growing gap between attempts, rather than a loop.',
              'A unique reference on every action that creates, sends or pays something.',
              'A place for failed cases to wait, visible to a person, not a silent log file.',
              'An alert when retries are exhausted, naming the case and the step.',
              'A timeout at every step, so a case that stops moving is raised rather than forgotten.',
            ],
          },
          {
            type: 'note',
            tone: 'caution',
            title: 'Ask what happens after a half-finished step',
            text: 'It is the most revealing question you can put to anyone selling you a workflow. If the answer is not specific, in terms of retries, duplicates and who is told, the design is not finished, whatever the demonstration showed.',
          },
        ],
      },
      {
        id: 'who-is-notified',
        heading: 'Who gets told, and who owns the case?',
        blocks: [
          {
            type: 'p',
            text: 'Every case should have an owner at every moment, including while the system is working on it. If a step is waiting on an approval, the owner is the approver. If it has failed twice, the owner is whoever is named for that failure. An unowned case is how a workflow quietly loses work that a person would have chased.',
          },
          {
            type: 'p',
            text: 'Notify by exception. A message for every completed step trains people to ignore the channel, and the one that mattered goes past unread. Send a short daily summary for the routine, and a direct message only for a case that is blocked, unusual or waiting on that person. Keep the full record elsewhere, for anyone who wants to look.',
          },
          {
            type: 'example',
            title: 'Illustrative example: a Surat exporter’s order handover',
            text: 'Suppose an exporter in Surat agrees an order on a call, and the salesperson sends the details in a message. The workflow opens a case, reads the details into a structured record, checks stock and the production schedule, and prepares the packing and dispatch documents from templates. It does not promise a delivery date. It asks the operations lead to approve the date and any substitution, showing the stock position and the current schedule alongside. Once approved, it tells accounts what to invoice, with the order reference attached, and sets a follow-up for dispatch day. If the stock check fails twice, the case stops with the operations lead rather than moving on with an assumption.',
          },
        ],
      },
      {
        id: 'where-agents-should-not-act-alone',
        heading: 'Where should an agent never act alone?',
        blocks: [
          {
            type: 'p',
            text: 'Some actions should always sit behind a person, no matter how well the workflow has run for six months:',
          },
          {
            type: 'list',
            items: [
              'Moving money, releasing payments or changing bank details.',
              'Commitments to a customer: price, discount, delivery date, scope.',
              'Anything legally binding, including signing or accepting terms.',
              'Sharing personal or confidential information outside the business.',
              'Employment matters, and anything affecting a person’s standing or livelihood.',
              'Actions that are hard to reverse, such as deleting records or cancelling a booking.',
              'Any case that does not look like the cases the workflow was designed for.',
            ],
          },
          {
            type: 'p',
            text: 'Two operating requirements follow. First, someone must be able to pause a running workflow and see what it has already done, at any hour, without engineering help. Second, its behaviour needs watching after launch, not only before it. The voluntary [NIST AI Risk Management Framework](https://nvlpubs.nist.gov/nistpubs/ai/NIST.AI.100-1.pdf) organises that work into four functions, Govern, Map, Measure and Manage, with Govern running through the others, which is a reasonable shape even for a small team that will never adopt the whole framework. [What happens when an AI workflow gets something wrong](/insights/when-ai-workflows-go-wrong) covers the response when it does.',
          },
        ],
      },
    ],
    limitations: [
      'Agentic workflows suit repeatable work with a definable finish. Open-ended judgement, negotiation and relationship work are a poor fit.',
      'Every connected tool becomes a dependency. If a system has no usable interface, or is unreliable, the workflow inherits that problem.',
      'Software cannot settle a disagreement about who owns a step. That is an organisational decision, and it has to be made first.',
      'More autonomy means more monitoring, not less. Budget for the people who watch the queue, review exceptions and maintain the rules.',
      'If teams have no shared reference for a case, such as an order number, the first project is tidying that up, not building an agent.',
    ],
    faqs: [
      {
        q: 'What is the difference between an agentic workflow and ordinary automation?',
        a: 'Ordinary automation follows fixed steps in a fixed order and stops when something differs from the plan. An agentic workflow can choose its next step from a permitted set, gather missing information, and hand the case to a person with an explanation when it cannot proceed. The trade-off is that it needs explicit limits, logging and approval gates, which fixed automation gets from being rigid.',
      },
      {
        q: 'What does idempotency mean for a business workflow?',
        a: 'It means repeating an action has the same result as doing it once. If the system asks your accounting software to raise an invoice and the connection drops, a safe design can retry without creating a second invoice, because the action carried a unique reference. Ask any supplier how repeated attempts are prevented from creating duplicate invoices, payments or messages. It is a short question with a revealing answer.',
      },
      {
        q: 'How much freedom should we give an agent at the start?',
        a: 'Start with permission to read widely and write narrowly. Let it gather context, prepare drafts and propose actions, while a person approves anything that leaves the business or costs money. Widen the boundary only where the record shows the proposals were consistently approved without change. Autonomy earned from evidence is easier to defend than autonomy assumed at launch.',
      },
      {
        q: 'What happens when a tool the workflow depends on goes down?',
        a: 'It should stop that case cleanly, record where it stopped, retry within an agreed limit, and tell a named person once those retries are exhausted. What it must not do is continue as though the step succeeded, or repeat an action that may already have taken effect. Ask to see this behaviour tested before launch, with the integration deliberately switched off.',
      },
      {
        q: 'Will this change how our teams work?',
        a: 'Yes, and that is worth planning for. Work arrives in a queue rather than by message, exceptions become visible, and steps that were informal have to be written down. Most teams find the visibility useful once the first month passes. Involve the people who do the work in defining the limits and the handoff packet, or the workflow will be worked around rather than used.',
      },
    ],
    bybo: [
      {
        href: '/systems/agentic-operations',
        label: 'Agentic Operations',
        why: 'How BYBO gives recurring work a path from request to resolution, with permitted tools and approval gates.',
      },
      {
        href: '/insights/approval-workflow-design',
        label: 'Approval workflow design',
        why: 'How to place approvals so they protect the business without becoming the new bottleneck.',
      },
      {
        href: '/blueprint',
        label: 'AI Opportunity Blueprint',
        why: 'A paid diagnostic that maps a cross-team workflow, measures the baseline and sets the boundary.',
      },
    ],
    related: ['when-ai-workflows-go-wrong', 'ai-for-logistics-warehousing-3pl', 'approval-workflow-design'],
    sources: [
      {
        title: 'Artificial Intelligence Risk Management Framework (AI RMF 1.0)',
        publisher: 'National Institute of Standards and Technology (NIST)',
        url: 'https://nvlpubs.nist.gov/nistpubs/ai/NIST.AI.100-1.pdf',
      },
      {
        title: 'RFC 9110: HTTP Semantics (idempotent methods)',
        publisher: 'Internet Engineering Task Force (IETF)',
        url: 'https://www.rfc-editor.org/rfc/rfc9110.html',
      },
    ],
  },
];

export default guides;
