import type { Guide } from '../types';

const guides: Guide[] = [
  {
    slug: 'spreadsheet-reporting-to-decision-intelligence',
    collection: 'business-operations',
    title: 'From Spreadsheet Reporting to Decision Intelligence',
    description:
      'How to move from a hand-built weekly spreadsheet pack to decision intelligence: connected sources, agreed definitions, validated numbers and people who decide.',
    dek:
      'A weekly pack that takes two days to build tells you what happened, late. Decision intelligence connects the sources, settles the definitions and shows what changed, so your people can spend the meeting deciding.',
    keywords: [
      'decision intelligence',
      'spreadsheet reporting',
      'automated business reporting',
      'MIS reporting India',
      'agreed metric definitions',
      'management reporting dashboard',
    ],
    publishedAt: '2026-09-11',
    visual: {
      kind: 'flow',
      title: 'From scattered sheets to a decision',
      steps: ['Connect sources', 'Agree definitions', 'Validate the data', 'Explain the change', 'Decide and record'],
      gate: 4,
      gateLabel: 'People interpret and decide',
    },
    summary: [
      'The weekly pack is not a spreadsheet problem. It is manual pulls, unagreed definitions and no record of what was decided.',
      'Settle definitions before you connect anything. Two teams reporting different revenue have a definition problem, not a dashboard problem.',
      'Validate on a schedule: freshness, completeness, reconciliation to a trusted total, and an alert when a source goes quiet.',
      'A useful report leads with what changed, attaches the evidence, and ends with a decision that has an owner and a review date.',
    ],
    sections: [
      {
        id: 'the-weekly-pack',
        heading: 'Why does the weekly report take two days to build?',
        blocks: [
          {
            type: 'p',
            text: 'Monday morning, someone exports last week from the accounting software. Someone else pulls the enquiry list out of the CRM. A third person keeps outlet numbers in a sheet that only they understand. The three files are copied into a fourth, a formula breaks because a column moved, and the pack lands on Wednesday afternoon. The first half of the meeting goes on disagreeing about one number. The second half goes on last month.',
          },
          {
            type: 'list',
            items: [
              'A capable person spends one or two days a week assembling numbers instead of thinking about them.',
              'The pack describes a week that is already over, so decisions arrive late by design.',
              'Three versions circulate, each named final, and nobody can say which was discussed.',
              'The meeting produces agreement in the room and no written record of what was decided.',
            ],
          },
          {
            type: 'p',
            text: 'None of this is the spreadsheet’s fault. A spreadsheet is an honest tool and most Indian businesses run real operations on one. The trouble starts when the same sheet is rebuilt by hand every week, from sources that disagree, by a person who has become the only one who knows how it works.',
          },
        ],
      },
      {
        id: 'same-metric-different-number',
        heading: 'Why do two teams report different numbers for the same month?',
        blocks: [
          {
            type: 'p',
            text: 'Usually because they are answering different questions with the same word. Sales counts an order when the customer confirms on WhatsApp. Finance counts it when the invoice is raised. Despatch counts it when the lorry leaves the gate. All three are behaving sensibly. None of them is wrong. The pack simply prints three answers and lets the loudest person win.',
          },
          {
            type: 'table',
            caption: 'One word, two meanings',
            head: ['Metric', 'One team means', 'Another team means'],
            rows: [
              ['Revenue', 'Invoiced this month', 'Collected this month'],
              ['Active customer', 'Ordered in 90 days', 'Has an open account'],
              ['On-time delivery', 'Left the warehouse on time', 'Reached the customer on time'],
              ['Enquiry', 'Every message received', 'Only the qualified ones'],
            ],
          },
          {
            type: 'p',
            text: 'Until the definitions are written down and agreed, a dashboard only distributes the disagreement faster and with better typography. This is why the first week of a reporting project is usually spent in conversation, not in software.',
          },
        ],
      },
      {
        id: 'agree-definitions',
        heading: 'How do you agree metric definitions people will keep?',
        blocks: [
          {
            type: 'p',
            text: 'Keep the list short. Most businesses need ten or twelve numbers that actually lead to a decision, not the sixty a reporting tool can produce. For each one, write a short entry and give it an owner:',
          },
          {
            type: 'list',
            ordered: true,
            items: [
              'The name people already use for it, not a new one invented for the report.',
              'A plain-English definition of what counts, in one or two sentences.',
              'What it excludes: cancelled orders, inter-branch transfers, samples, staff purchases, taxes.',
              'The source system it comes from, and how often it refreshes.',
              'The named owner who approves any change to the definition.',
              'The caveats a reader needs, such as a branch that reports late.',
            ],
          },
          {
            type: 'note',
            tone: 'insight',
            title: 'Most disputes are about exclusions',
            text: 'People rarely argue about what a number includes. They argue about what quietly fell out of it. Writing the exclusions down settles more meetings than any chart.',
          },
        ],
      },
      {
        id: 'connect-the-sources',
        heading: 'What does connecting your sources actually involve?',
        blocks: [
          {
            type: 'p',
            text: 'Connecting sources is less glamorous than it sounds. It is read-only access to your accounting software, your CRM and your operations tools, a reliable way to match the same customer across them, a refresh schedule everyone knows, and a decision about which sheets stay.',
          },
          {
            type: 'list',
            items: [
              'Agree read-only access first, with a named person who can grant and revoke it.',
              'Choose one identifier for a customer, an order and a site, and fix the mismatches you find.',
              'Set a refresh time and show it on the report, so nobody argues with a stale figure.',
              'Keep the sheets that are genuinely the source, such as targets or price lists, but give each one a fixed shape and one owner.',
              'Record what changed in the pipeline and when, so an unexplained jump can be traced.',
            ],
          },
          {
            type: 'p',
            text: 'Expect the joining to surface problems in how work is recorded: the same customer under three spellings, an outlet code entered by hand, a delivery date typed into a notes field. That is a finding, not a delay. Our guide to [reducing manual data entry](/insights/reduce-manual-data-entry) covers the entry side of the same problem.',
          },
        ],
      },
      {
        id: 'validate-before-anyone-reads',
        heading: 'What checks should run before anyone reads the numbers?',
        blocks: [
          {
            type: 'p',
            text: 'A chart renders whether or not the data behind it arrived. That is the quiet risk in automated reporting: the pack looks the same on the morning a feed failed. Run the checks before publication, and publish the result of the checks with the report.',
          },
          {
            type: 'list',
            items: [
              'Freshness: when did each source last load, and is anything older than it should be?',
              'Completeness: are all branches, outlets and channels present, and does the row count look sane?',
              'Reconciliation: does revenue tie back to a trusted total, such as the ledger?',
              'Duplicates and restatements: has last week changed since it was published, and why?',
              'Silence: alert someone when a source stops sending, rather than showing a flat line.',
            ],
          },
          {
            type: 'p',
            text: 'The habit of saying what you cannot measure is worth borrowing from risk practice. The [NIST AI Risk Management Framework](https://nvlpubs.nist.gov/nistpubs/ai/NIST.AI.100-1.pdf) asks organisations to select measurement approaches for the most significant risks and to document properly the things that will not, or cannot, be measured. In reporting, that means the caveat sits next to the number, not in a footnote nobody opens.',
          },
        ],
      },
      {
        id: 'what-changed-and-why',
        heading: 'How should a report show what changed and why?',
        blocks: [
          {
            type: 'p',
            text: 'Totals are a poor opening. Everyone in the room already has a rough idea of the month. What they do not have is the movement: which three things changed enough to be worth twenty minutes, and what sits underneath them. A useful entry is short and evidenced.',
          },
          {
            type: 'list',
            items: [
              'The movement, in the unit people think in: cases, orders, days, rupees.',
              'The comparison basis, stated plainly, and like for like where outlets or ranges changed.',
              'The most likely drivers, each with the rows or documents behind it, one click away.',
              'What the system could not explain, named rather than smoothed over.',
              'The caveat: a late branch, a restated week, a definition changed last quarter.',
            ],
          },
          {
            type: 'p',
            text: 'That is the shape of our [Decision Intelligence](/systems/decision-intelligence) work: bring approved data together, check freshness and definitions, surface the changes that deserve attention, and leave the interpretation with people. Forecasts and explanations are shown with their assumptions, because a number without its assumptions is just a confident guess.',
          },
        ],
      },
      {
        id: 'people-decide',
        heading: 'Who interprets the numbers, and what gets recorded?',
        blocks: [
          {
            type: 'p',
            text: 'A system can rank, compare, group and flag. It cannot know that a distributor was at a wedding all week, that a competitor opened two streets away, or that your best fitter was on leave. India’s [Economic Survey 2025–26](https://www.indiabudget.gov.in/economicsurvey/doc/eschapter/echap14.pdf) makes the same point about work in general: as AI absorbs retrieval and summarisation, the contribution people make shifts upward towards judgement, direction, expertise and synthesis. Reporting is an early example of that shift.',
          },
          {
            type: 'example',
            title: 'Illustrative example: a Coimbatore textile exporter’s Monday pack',
            text: 'Suppose an exporter with three units builds a weekly pack by hand. This week it shows order intake down by about a fifth, and the meeting spends an hour on whether the drop is real. Connected sources and a settled definition would answer it in a minute: two large orders were confirmed on WhatsApp but not entered until the following Tuesday, and one unit had begun counting repeat orders differently after a staff change. The number was never the problem. Nobody had agreed what it counted, and nobody had checked whether the week was complete before printing it.',
          },
          {
            type: 'p',
            text: 'Then record the decision where the numbers live: what was decided, who owns it, what you expect to see if it works, and when you will look again. Most reporting improves the week someone starts writing that down, because the next pack has something to answer to.',
          },
        ],
      },
      {
        id: 'when-a-spreadsheet-is-fine',
        heading: 'When is a spreadsheet still the right answer?',
        blocks: [
          {
            type: 'p',
            text: 'Often. If one person builds one report a month, from one system, and nobody disputes the numbers, a spreadsheet is the sensible tool and a connected platform would be an expensive way to make it prettier. The same is true while your process is still changing weekly: definitions worth automating are definitions that have stopped moving.',
          },
          {
            type: 'note',
            tone: 'caution',
            title: 'Fix the definition before you buy the dashboard',
            text: 'A shared sheet with an agreed definition and a named owner is better than a live dashboard built on numbers two teams still read differently. The second one is faster at being wrong.',
          },
          {
            type: 'p',
            text: 'The case changes when the pack has grown into a two-day job across several systems, when decisions wait on it, or when the person who built it is the only one who can. At that point the [AI Opportunity Blueprint](/blueprint) is a paid diagnostic that maps the workflow, establishes a cost baseline and gives you a recommendation about what is worth building.',
          },
        ],
      },
    ],
    limitations: [
      'Connected reporting spreads poor source data faster. If orders are recorded inconsistently at the branch, fix the recording before the reporting.',
      'Explanations produced by a system are hypotheses. Someone still has to test whether the suggested driver is the real one.',
      'Numbers you never captured cannot be recovered later. Lost enquiries and unrecorded reasons for churn need a change in how work is captured first.',
      'A weekly cycle does not become a daily one just because the data refreshes hourly. Decision rhythm is a management choice, not a technical setting.',
    ],
    faqs: [
      {
        q: 'What is decision intelligence, in plain terms?',
        a: 'It is reporting arranged around the decision rather than the chart. Sources are connected, definitions are agreed and owned, the data is validated before publication, and the output leads with what changed, the evidence behind it and the caveats. People still interpret and decide. The system’s job is to remove the assembly work and to make disagreement about facts unnecessary.',
      },
      {
        q: 'Do we have to stop using spreadsheets?',
        a: 'No. Most businesses keep spreadsheets for the things spreadsheets are good at: targets, planning assumptions, one-off analysis. What changes is their role. A sheet that is genuinely a source gets a fixed shape, a named owner and a refresh schedule. A sheet that only exists because three systems will not talk to each other is the one worth replacing.',
      },
      {
        q: 'How long does it take to agree metric definitions?',
        a: 'Less time than people fear, and more conversation than they expect. For ten or twelve numbers, a couple of working sessions with sales, finance and operations usually settles most of them, with a few left open for a week while someone checks how the system actually records them. The writing down is the work. The software comes after.',
      },
      {
        q: 'Can a system explain why a number moved?',
        a: 'It can propose explanations and show the evidence for each: which customers, which branch, which product group, which week. Those are hypotheses ranked by the data, not causes. A system has no view of a competitor’s pricing, a festival week or a supplier dispute unless you record those events somewhere it can read.',
      },
      {
        q: 'What should we measure to know reporting has improved?',
        a: 'Four measures cover most of it: preparation time per reporting cycle, data freshness at the moment the pack is read, the number of reconciliation exceptions raised, and the time from a signal appearing to an action being agreed. Take each one before you change anything, so the comparison afterwards means something.',
      },
    ],
    bybo: [
      {
        href: '/systems/decision-intelligence',
        label: 'Decision Intelligence',
        why: 'How BYBO connects sources, settles definitions and shows what changed, with the decision left to people.',
      },
      {
        href: '/blueprint',
        label: 'AI Opportunity Blueprint',
        why: 'A paid diagnostic that maps your reporting workflow, measures the baseline and recommends what to build.',
      },
      {
        href: '/insights/measure-ai-system-performance',
        label: 'How to measure whether an AI system is working',
        why: 'The measurement habits that keep a reporting system honest after launch.',
      },
    ],
    related: ['measure-ai-system-performance', 'reduce-manual-data-entry', 'seven-ai-systems-for-business-operations'],
    sources: [
      {
        title: 'Artificial Intelligence Risk Management Framework (AI RMF 1.0)',
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
    slug: 'approval-workflow-design',
    collection: 'business-operations',
    title: 'How to Design Approval Workflows That Do Not Slow the Business Down',
    seoTitle: 'Approval Workflows That Do Not Slow the Business Down',
    description:
      'Approval workflow design that protects the business without stalling it: tiered thresholds, named backups, response times, batching and evidence for approvers.',
    dek:
      'An approval should prevent a mistake worth preventing. Tier it by consequence, give the approver the evidence, set a response time, and retire the approvals that only add waiting.',
    keywords: [
      'approval workflow design',
      'approval process automation',
      'purchase approval workflow',
      'approval matrix thresholds',
      'approval turnaround time',
      'delegation of authority',
    ],
    publishedAt: '2026-09-11',
    visual: {
      kind: 'matrix',
      title: 'Match the control to the consequence',
      x: ['Low value', 'High value'],
      y: ['Easily reversed', 'Hard to reverse'],
      quadrants: [
        'One approver, same day',
        'Two approvers, evidence pack',
        'No approval, sample weekly',
        'One approver, firm time limit',
      ],
      highlight: 2,
    },
    summary: [
      'Approvals cost time in the waiting, not the signing. Design the queue, the backup and the response time first.',
      'Tier by consequence and reversibility. Low-value, easily reversed work needs a weekly sample, not a signature.',
      'Give the approver the request, the evidence, the policy check and a recommended action in one place.',
      'An approval that is granted unchanged every single time is a notification pretending to be a control.',
    ],
    sections: [
      {
        id: 'where-approvals-cost-time',
        heading: 'Where does an approval actually cost you time?',
        blocks: [
          {
            type: 'p',
            text: 'Signing takes seconds. Waiting takes days. A purchase order sits because the request arrived without the quotation attached. A leave application waits because the only approver is on a site visit until Thursday. A refund waits because three people must each say yes and each is waiting for the one before. By the time the decision is made, the supplier has revised the price and the customer has written again.',
          },
          {
            type: 'list',
            items: [
              'The request is unclear, so the approver asks a question and the clock restarts.',
              'The evidence is somewhere else: an email thread, a shared drive, someone’s phone.',
              'There is one approver and no backup, so travel and leave become business delays.',
              'No response time is agreed, so an approval is never late, only pending.',
              'The chain repeats the same check three times and adds nothing after the first.',
            ],
          },
          {
            type: 'p',
            text: 'The purpose of an approval is to prevent a mistake that would be expensive, public or hard to undo. Any approval that does not prevent such a mistake is a tax the business pays in waiting. Good design keeps the first kind and removes the second, and that judgement belongs to the people who own the process.',
          },
        ],
      },
      {
        id: 'tier-by-consequence',
        heading: 'How do you set approval thresholds that match consequence?',
        blocks: [
          {
            type: 'p',
            text: 'Two questions decide the tier. What does a wrong decision cost, and how hard is it to undo? Money is only one measure of consequence. A commitment made to a customer, access granted to personal data, a public post or a change to a master record can matter more than the rupee value attached to them.',
          },
          {
            type: 'table',
            caption: 'A four-tier approval pattern',
            head: ['Tier', 'What it covers', 'Control'],
            rows: [
              ['Routine', 'Within budget, easily reversed', 'No approval, weekly sample'],
              ['Standard', 'Ordinary spend, standard terms', 'One approver, one working day'],
              ['Consequential', 'Above threshold or new supplier', 'Two approvers, evidence pack'],
              ['Restricted', 'Refunds outside policy, data access', 'Named authority only'],
            ],
          },
          {
            type: 'p',
            text: 'Write the thresholds in your own numbers, in rupees where money is involved, and put a review date on them. A limit agreed three years ago quietly becomes a bottleneck as prices rise, until half of ordinary purchases need a director. Review the thresholds twice a year with the finance owner and the process owner together.',
          },
        ],
      },
      {
        id: 'delegation-and-backups',
        heading: 'Who approves when the approver is travelling?',
        blocks: [
          {
            type: 'p',
            text: 'The single most common cause of a stalled workflow is one person, unavailable. Factory visits, client meetings, medical leave and festival weeks are not exceptions; they are the calendar. Every approver needs a named backup, agreed in advance, not found in a panic on the day.',
          },
          {
            type: 'list',
            items: [
              'Name a backup for every approval role, and let the backup see the same queue.',
              'Delegate with a limit and an expiry date, so temporary authority does not become permanent.',
              'Show the age of each item in the queue, oldest first, so nothing simply sinks.',
              'Record who actually approved, not the role that was supposed to.',
              'Tell the requester who holds it now, so chasing does not need a phone call.',
            ],
          },
          {
            type: 'note',
            tone: 'caution',
            title: 'Shared logins destroy the record',
            text: 'When two people approve from one account, no log can tell you who decided. If an approval matters enough to exist, it matters enough to carry a name.',
          },
        ],
      },
      {
        id: 'response-times-and-escalation',
        heading: 'What response time should an approval carry?',
        blocks: [
          {
            type: 'p',
            text: 'Give every tier a response expectation and an escalation route, both written down. Same working day for routine items, one working day for standard, two for consequential ones with a full evidence pack. State the working hours the clock runs in, so a Saturday evening request is not counted as late on Monday morning.',
          },
          {
            type: 'p',
            text: 'Then decide what happens when the time runs out. The item escalates to the backup, the requester is told, and the queue owner sees it. What should not happen is silent auto-approval of a consequential action, which converts a control into a delay followed by a rubber stamp. Automatic approval is only honest where the item was already inside agreed limits, and in that case it is not an approval at all: it is a rule with a log.',
          },
        ],
      },
      {
        id: 'batch-the-routine',
        heading: 'Can routine approvals be batched?',
        blocks: [
          {
            type: 'p',
            text: 'Yes, and it is usually the cheapest improvement available. Approvals interrupt. Eleven separate notifications through the day cost an approver more than eleven items reviewed together, and the eleventh gets less attention than the first. Fix two approval runs a day, morning and late afternoon, and let the queue fill between them.',
          },
          {
            type: 'list',
            items: [
              'Group items of the same shape together: all purchase requisitions, then all leave requests.',
              'Approve by exception: the list is approved as a set, with anything unusual lifted out first.',
              'Never batch a restricted item, a new supplier or anything outside policy.',
              'Record each item separately, even when the decision was made in a batch.',
              'Keep a batch short enough to read properly. If it cannot be read, it is not being reviewed.',
            ],
          },
          {
            type: 'p',
            text: 'Batching works only when the system does the sorting: same type, same tier, checks already run, exceptions separated. A pile of dissimilar decisions produces exactly the tick-through the approval was meant to prevent.',
          },
        ],
      },
      {
        id: 'give-approvers-the-evidence',
        heading: 'What should an approver see before deciding?',
        blocks: [
          {
            type: 'p',
            text: 'The approval screen is a working surface, not a notification. Someone should be able to decide from it in under a minute, without opening three other systems. That means the request in one line, the amount and its budget position, the source document, the checks the system ran, and what it could not establish.',
          },
          {
            type: 'list',
            ordered: true,
            items: [
              'What is being asked for, in one line, with the requester and the date needed.',
              'The amount, the budget or contract it sits against, and the tier it fell into.',
              'The source document: the quotation, the invoice, the customer message, the specification.',
              'What was checked automatically: duplicate, price against the last order, supplier status.',
              'What could not be checked, named plainly, so silence is not read as approval.',
              'The recommended action and its reason, with approve, edit, reject and a place to say why.',
            ],
          },
          {
            type: 'p',
            text: 'This is the shape of the approval gates in our [Agentic Operations](/systems/agentic-operations) work: the system gathers context, prepares the action and holds consequential steps for a person. The reviewer’s side of the design is covered in [Design the human decision into the workflow](/insights/human-in-the-loop-product-decision), which is worth reading alongside this article. The [NIST AI Risk Management Framework](https://nvlpubs.nist.gov/nistpubs/ai/NIST.AI.100-1.pdf) makes the same expectation explicit for automated work: policies and procedures should define and differentiate roles and responsibilities for oversight, rather than leaving “someone will check it” as the plan.',
          },
        ],
      },
      {
        id: 'mobile-and-whatsapp',
        heading: 'Can approvals happen on a phone or on WhatsApp?',
        blocks: [
          {
            type: 'p',
            text: 'They can, and for owners who spend the week between sites they often should. The condition is that the chat is a doorway, not the record. The message carries a short summary and a link; the decision is written in the system, with the approver’s identity, the time, the version of the request they saw and any reason they gave.',
          },
          {
            type: 'list',
            items: [
              'Confirm who is approving. A message from a phone is not, by itself, proof of identity.',
              'Show the amount and the key figures in the message, so nobody approves a subject line.',
              'Link to the full evidence rather than pasting documents into a chat.',
              'Keep personal and payment details out of the conversation.',
              'Write the decision to the system of record, and let the chat be a copy of it.',
            ],
          },
          {
            type: 'p',
            text: 'If those messages go through the WhatsApp Business Platform, the [Business Messaging Policy](https://whatsappbusiness.com/policy/) applies to your use of WhatsApp Business Services. You may contact people only if they have given you their number and opted in, conversations you start use approved message templates, and you may reply without a template within 24 hours of the person’s last message. Check the current policy with your messaging provider before you build an approval flow on it.',
          },
        ],
      },
      {
        id: 'measure-and-remove',
        heading: 'How do you measure approval time and remove approvals that add no control?',
        blocks: [
          {
            type: 'p',
            text: 'Measure the queue, not the click. Time from request to decision, by tier. Time spent waiting versus time spent being worked on. Touches per request. The share approved without any change. The share rejected, and the reasons given. The share that escalated because nobody answered.',
          },
          {
            type: 'example',
            title: 'Illustrative example: a Nashik equipment supplier’s purchase approvals',
            text: 'Suppose a supplier requires three signatures on every purchase order. A month of records shows 120 orders, of which 95 are under a modest routine value, and every one of those 95 was approved unchanged by all three approvers. The control is not preventing anything; it is adding on average two days to each small order. A defensible redesign keeps two approvers above the threshold, drops to one below it, removes approval altogether for repeat orders from an approved supplier inside a standing budget, and samples ten of those a month for review. The numbers here are made up to show the reasoning. The exercise only works with your own.',
          },
          {
            type: 'p',
            text: 'That is the test worth applying to every approval in the business: in the last three months, how many times did this step change an outcome? If the answer is never, replace it with a sample check after the fact and keep the log. Keep, too, a way to stop: the [NIST framework](https://nvlpubs.nist.gov/nistpubs/ai/NIST.AI.100-1.pdf) asks for mechanisms, with assigned responsibilities, to supersede, disengage or deactivate a system whose behaviour is inconsistent with its intended use. For the permissions and logging side of the same design, see [AI permissions, logs and approval gates](/insights/ai-permissions-logs-approval-gates).',
          },
        ],
      },
    ],
    limitations: [
      'Statutory, board or lender requirements are not yours to redesign. Confirm what is mandated before you remove or merge a step.',
      'Approval design cannot fix an unclear policy. If nobody can say what a discount should be, the approver is writing the policy each time.',
      'Fewer approvers concentrates responsibility. The people who remain need better evidence and clearer authority, not merely more requests.',
      'Speed is not the only measure. An approval process that never rejects anything is fast because it is not doing its job.',
    ],
    faqs: [
      {
        q: 'How many approval levels should a purchase need?',
        a: 'As few as the consequence justifies. Most growing businesses manage with three or four tiers: no approval for routine reversible spend inside budget, one approver for ordinary purchases, two for amounts above a threshold or new suppliers, and a named authority for anything outside policy. More levels rarely add control. They add waiting, and they spread responsibility until nobody feels it.',
      },
      {
        q: 'Should an approval be granted automatically if nobody responds?',
        a: 'Not for anything consequential. Silence is not a decision, and a timeout that approves converts a control into a delay with a rubber stamp at the end. Escalate to the named backup instead, tell the requester, and show the item to the queue owner. Automatic approval is only reasonable where the request already sits inside agreed limits, and that is better described as a rule with a log.',
      },
      {
        q: 'Is approving on WhatsApp acceptable?',
        a: 'It can be, provided the chat is a doorway and not the record. Confirm who is approving, show the key figures in the message, link to the evidence rather than pasting documents, keep personal and payment details out of the conversation, and write the decision to your system with the approver, time and reason. If you use the WhatsApp Business Platform, its messaging policy governs how you may contact people.',
      },
      {
        q: 'How do we decide which approvals to remove?',
        a: 'Look at outcomes rather than opinions. For each approval step, count how many times in the last three months it changed the decision: rejected, reduced, corrected or delayed for a reason. A step that never changed anything is a notification. Replace it with a monthly sample of completed items, keep the log, and tell the team what you changed and why.',
      },
      {
        q: 'Can an AI system approve anything by itself?',
        a: 'It can act inside limits you have written down, such as reordering a stock item from an approved supplier within a standing budget. That is a rule with a record, not judgement. Commitments to customers, money leaving the business, changes to master data and anything outside policy should reach a named person, with the evidence assembled and the recommended action visible.',
      },
    ],
    bybo: [
      {
        href: '/systems/agentic-operations',
        label: 'Agentic Operations',
        why: 'How BYBO moves recurring work across teams while consequential steps stay behind agreed approval gates.',
      },
      {
        href: '/insights/human-in-the-loop-product-decision',
        label: 'Design the human decision into the workflow',
        why: 'The reviewer’s side: the evidence, the permitted responses and the fallback when nobody answers.',
      },
      {
        href: '/blueprint',
        label: 'AI Opportunity Blueprint',
        why: 'A paid diagnostic that maps handoffs and waiting points before you rebuild an approval process.',
      },
    ],
    related: ['when-ai-should-decide', 'ai-permissions-logs-approval-gates', 'agentic-workflows-between-teams'],
    sources: [
      {
        title: 'Artificial Intelligence Risk Management Framework (AI RMF 1.0)',
        publisher: 'National Institute of Standards and Technology (NIST)',
        url: 'https://nvlpubs.nist.gov/nistpubs/ai/NIST.AI.100-1.pdf',
      },
      {
        title: 'WhatsApp Business Messaging Policy',
        publisher: 'WhatsApp (Meta)',
        url: 'https://whatsappbusiness.com/policy/',
      },
    ],
  },
  {
    slug: 'real-cost-of-repetitive-work',
    collection: 'business-operations',
    title: 'The Real Cost of Repetitive Work in a Growing Company',
    description:
      'The cost of repetitive work is more than hours: delay, rework, customer waiting and owner attention. How to measure a baseline and decide what deserves a system.',
    dek:
      'Repetitive work shows up as hours on a timesheet and as delay, rework and tired people everywhere else. Here is how to measure the whole cost honestly, and why some of it should stay manual.',
    keywords: [
      'cost of repetitive work',
      'cost of manual processes',
      'team capacity calculator',
      'automation business case',
      'process baseline measurement',
      'operational efficiency for growing companies',
    ],
    publishedAt: '2026-09-11',
    visual: {
      kind: 'layers',
      title: 'What repetitive work actually costs',
      layers: [
        { label: 'Hours', note: 'The time the task visibly takes' },
        { label: 'Waiting', note: 'Work parked between two busy people' },
        { label: 'Rework', note: 'Corrections, chasing and duplicate entry' },
        { label: 'Customers', note: 'Slower quotes, answers and deliveries' },
        { label: 'People', note: 'Capable staff worn down by clerical work' },
        { label: 'Owners', note: 'Attention spent on work others could do' },
      ],
    },
    summary: [
      'Hours are the visible cost. Waiting, rework, customer delay and lost attention usually add more than the hours themselves.',
      'Measure a baseline by watching real work over several weeks, awkward cases included, before you estimate anything.',
      'Hours freed are capacity, not savings. They become value only if you decide in advance where the time goes.',
      'Some repetitive work should stay manual: low volume, changing rules, or a task that is itself the control.',
    ],
    sections: [
      {
        id: 'why-the-cost-hides',
        heading: 'Why is the cost of repetitive work so easy to miss?',
        blocks: [
          {
            type: 'p',
            text: 'Because it never arrives as a bill. Nobody raises an invoice for twenty minutes of retyping delivery details, or for the third time this week someone opened a WhatsApp thread to find an address. The work is spread across a dozen people in small pieces, each too small to complain about. It rises quietly with volume, so it feels like the price of doing well.',
          },
          {
            type: 'p',
            text: 'It is also the work that never gets escalated. A team that is behind on collections will say so. A team that spends the first hour of every morning copying yesterday’s orders into a sheet will simply come in earlier. By the time it becomes visible, it has usually taken the form of a hiring request, a missed month end or a good person handing in their notice.',
          },
        ],
      },
      {
        id: 'counting-the-hours',
        heading: 'How do you count the visible hours honestly?',
        blocks: [
          {
            type: 'p',
            text: 'Watch the work rather than asking about it. People underestimate frequency and overestimate their own speed, in both directions and usually by a lot. Sit with one person for a morning, count the times the task occurs, and time the whole loop: opening the file, finding the missing detail, entering it, checking it, chasing the person who did not reply, and doing it again when the detail turns out to be wrong.',
          },
          {
            type: 'p',
            text: 'Then do the plain arithmetic and label it as an estimate. Suppose four people each spend two hours a day on order entry and follow-up. Over 22 working days that is 176 hours a month, or roughly one full-time person. Multiply by a fully loaded hourly cost and you have a figure worth discussing. The [team-capacity calculator](/#team-capacity) on our homepage runs that same calculation with your numbers; it assumes 22 working days a month and shows capacity, not a saving.',
          },
          {
            type: 'note',
            tone: 'caution',
            title: 'Capacity is not the same as savings',
            text: 'Hours returned to a team are hours available. They only turn into money if the work those hours absorb is worth more than the work they replaced, and if the system’s own cost is subtracted first.',
          },
        ],
      },
      {
        id: 'hidden-costs',
        heading: 'Which costs never reach a timesheet?',
        blocks: [
          {
            type: 'p',
            text: 'The hours are the part everyone can see. The rest is spread across the business as delay, error and irritation, and each piece can be observed if you decide to look for it.',
          },
          {
            type: 'table',
            caption: 'The costs that hide behind the hours',
            head: ['Hidden cost', 'How it shows up', 'How to see it'],
            rows: [
              ['Waiting', 'Files parked between two people', 'Elapsed time versus touch time'],
              ['Errors', 'Wrong price, wrong address, wrong quantity', 'Count corrections for a month'],
              ['Rework', 'The same record handled twice', 'Touches per completed case'],
              ['Attrition', 'Capable juniors leave within a year', 'Ask in exit conversations'],
            ],
          },
          {
            type: 'p',
            text: 'Elapsed time against touch time is the most revealing pair. A quotation that takes forty minutes of work but four days to reach the customer is not a forty-minute problem. Most of the cost is in the queue, and the queue is invisible on every timesheet ever written.',
          },
        ],
      },
      {
        id: 'customers-cash-and-owners',
        heading: 'What does it cost customers, cash and the owner?',
        blocks: [
          {
            type: 'p',
            text: 'Customers feel repetitive work as waiting. The quotation that arrives on Thursday instead of Monday, the order confirmation that needs a reminder, the delivery date nobody can confirm without ringing the warehouse. You rarely hear about it. People who are made to wait tend to go quiet rather than complain, and the effect appears later as a smaller share of a customer’s business.',
          },
          {
            type: 'p',
            text: 'Cash feels it too. An invoice raised three days late is paid three days late, and month end becomes a scramble: reconciling, chasing missing documents, correcting entries before filing. The work itself is not difficult. It is simply done by hand, at the worst possible time, by the people who can least afford the interruption.',
          },
          {
            type: 'list',
            items: [
              'Owners become the exception desk, answering the questions the process cannot.',
              'Growth is met by hiring, because adding a person is the only lever anyone can see.',
              'Each new person learns steps that were never written down, from someone already busy.',
              'Senior people spend evenings on work that a junior could do if the process were clear.',
            ],
          },
        ],
      },
      {
        id: 'measuring-a-baseline',
        heading: 'How do you measure a baseline you can defend?',
        blocks: [
          {
            type: 'p',
            text: 'Pick one unit of work and stay with it: a purchase invoice, an enquiry, a proof of delivery, a dealer claim. A baseline about “operations” cannot be tested. A baseline about one document can.',
          },
          {
            type: 'list',
            ordered: true,
            items: [
              'Volume: how many of these a month, from the system rather than from memory.',
              'Touch time: minutes of actual work per case, timed on a normal day and a busy one.',
              'Wait time: elapsed time from arrival to completion, which is usually the larger number.',
              'Rework rate: how often a case is reopened, corrected or entered twice.',
              'Exception rate: how many cases leave the standard path, and for what reasons.',
              'Who measured, over which period, and what they excluded.',
            ],
          },
          {
            type: 'p',
            text: 'Include the awkward cases. Every process has a version that takes six times as long, and it is often the reason the team is tired. Then show the numbers to the people who do the work. They will correct you, and the corrected baseline is the one worth carrying into a decision. Our guide to [identifying repetitive work worth automating](/insights/identify-repetitive-work-to-automate) sets out how to compare candidates once you have several baselines.',
          },
        ],
      },
      {
        id: 'what-the-arithmetic-does-not-say',
        heading: 'What does the arithmetic not tell you?',
        blocks: [
          {
            type: 'p',
            text: 'It does not tell you what the freed hours are worth. That depends on a decision you have to make before you start: the time absorbs growth without a new hire, or it moves to work you cannot buy in, such as supplier negotiation and customer relationships, or it ends overtime and weekend catch-up. Say which one you are aiming at, and you can check afterwards whether it happened.',
          },
          {
            type: 'example',
            title: 'Illustrative example: a Kochi logistics firm’s proof-of-delivery filing',
            text: 'Suppose three coordinators each spend about ninety minutes a day matching signed delivery proofs to invoices and chasing the missing ones. Over 22 working days that is roughly 99 hours a month. A system that reads the documents and matches them might handle three cases in five without help, which sounds like sixty hours returned. In practice, someone still reviews the two in five that do not match, the review takes longer per case than the original filing did, and the first two months need close checking. The honest estimate is smaller and arrives later. All the figures here are invented to show the reasoning; only your own measured baseline can produce a real one.',
          },
          {
            type: 'p',
            text: 'Then subtract the system’s own cost: building it, the software it runs on, the people who review its exceptions, and the maintenance when a form or a rule changes. A system that halves the work but requires every case to be checked has not halved anything. This is why a cost baseline and an operating estimate belong in the same conversation.',
          },
        ],
      },
      {
        id: 'keep-some-work-manual',
        heading: 'Why should some repetitive work stay manual?',
        blocks: [
          {
            type: 'p',
            text: 'Adoption is no longer the hard part. The [2026 AI Index](https://hai.stanford.edu/ai-index/2026-ai-index-report) reports organisational adoption of AI reaching 88%, which makes the choosing more important than the adopting. India’s [Economic Survey 2025–26](https://www.indiabudget.gov.in/economicsurvey/doc/eschapter/echap14.pdf) frames the national question as not whether to adopt AI but how to pace its diffusion, warning that rapid, uncalibrated deployment risks displacing people faster than the economy can reabsorb them. Inside a single company the same caution reads as a practical instruction: pick the work deliberately.',
          },
          {
            type: 'list',
            items: [
              'Low volume: twice a month is a checklist, not a system.',
              'Rules that keep changing: automate a process that has stopped moving, not one still being argued about.',
              'The task is the control: a person eyeballing every dispatch may be the only check you have.',
              'The task is how people learn: juniors often learn the business by handling the small stuff.',
              'The contact is the product: a call to a long-standing customer is not overhead.',
              'The cost exceeds the benefit: some work is annoying and cheap, and should stay that way.',
            ],
          },
          {
            type: 'note',
            tone: 'insight',
            title: 'Delete before you automate',
            text: 'Some repetitive work exists because of a report nobody reads or a field nobody uses. Removing the step costs nothing and is the fastest improvement available.',
          },
        ],
      },
      {
        id: 'where-to-start',
        heading: 'What do you do once you have the number?',
        blocks: [
          {
            type: 'p',
            text: 'Rank the candidates by three things together: how often the work occurs, how long it takes end to end, and what it costs when it goes wrong. A high-volume task with mild consequences is a better first project than a rare one with severe consequences, because you can test it safely and see the result within weeks.',
          },
          {
            type: 'p',
            text: 'Then try the cheap fixes first. A shared inbox rule, a form that collects the missing field at the start, a template, a report switched off, or a connection between two tools you already pay for will sometimes remove most of the cost for a fraction of the effort. If the work survives that test and still costs what your baseline says, the [AI Opportunity Blueprint](/blueprint) is a paid diagnostic that maps the workflow, sets a cost baseline, ranks the opportunities and gives you a recommendation with a 90-day roadmap.',
          },
        ],
      },
    ],
    limitations: [
      'A baseline measured over two weeks can miss seasonality. Festival peaks, quarter ends and audit months change the picture considerably.',
      'Hours returned are not money saved. Unless the time is reassigned or absorbed by growth, no cost line will move.',
      'Measuring people’s work makes them uneasy. Explain why you are counting, or the numbers you collect will be polite fiction.',
      'Cost arithmetic cannot settle a decision on its own. Risk, customer experience and what your team can support all belong in the same discussion.',
    ],
    faqs: [
      {
        q: 'How do we calculate the cost of manual work?',
        a: 'Start with people multiplied by hours a day, multiplied by working days, multiplied by a fully loaded hourly cost. That gives the visible figure. Then add what the hours hide: corrections, duplicate entry, and the elapsed time cases spend waiting. Treat the result as an estimate with assumptions written beside it, and check it with the people who do the work.',
      },
      {
        q: 'What hourly cost should we use?',
        a: 'Use a fully loaded cost rather than the basic salary: gross pay plus statutory contributions and a share of overheads, divided by the hours actually worked in a month. Do not use a billing rate, which includes margin and will flatter the case. Apply the same method to every option you compare, and state the assumption openly.',
      },
      {
        q: 'How long should we measure before deciding?',
        a: 'Two to four weeks of observation covering both a normal and a busy period, plus a full month of volume counts taken from your systems. If the work is seasonal, look at last year’s peak month as well. The aim is not precision to the minute. It is a number your team recognises and will not dispute later.',
      },
      {
        q: 'Is repetitive work always worth automating?',
        a: 'No. Low-volume work, rules that change every few weeks, tasks that are themselves a control, and work where the human contact is the point are all better left alone. So is anything where the cost of building and maintaining a system exceeds what it removes. The useful question is which repetitive work is worth automating first, not how to automate all of it.',
      },
      {
        q: 'My team says the task only takes a few minutes. Are they wrong?',
        a: 'Usually they are right about the minutes and wrong about the count. Five minutes is nothing; five minutes forty times a day across three people is most of a working day. Measure frequency from the system rather than from memory, and time the whole loop, including finding the missing detail and correcting it afterwards.',
      },
    ],
    bybo: [
      {
        href: '/#team-capacity',
        label: 'Team-capacity calculator',
        why: 'Runs the hours arithmetic with your own numbers and shows capacity rather than a promised saving.',
      },
      {
        href: '/blueprint',
        label: 'AI Opportunity Blueprint',
        why: 'A paid diagnostic that maps the workflow, sets a cost baseline and ranks what is worth building.',
      },
      {
        href: '/insights/rank-ai-opportunities',
        label: 'Choose the first workflow with a clear head',
        why: 'How to compare impact, repetition, readiness and risk once you have measured a baseline.',
      },
    ],
    related: ['identify-repetitive-work-to-automate', 'business-automation-cost-india', 'control-ai-operating-costs'],
    sources: [
      {
        title: 'Economic Survey 2025–26, Chapter 14: Evolution of the AI Ecosystem in India',
        publisher: 'Ministry of Finance, Government of India',
        url: 'https://www.indiabudget.gov.in/economicsurvey/doc/eschapter/echap14.pdf',
      },
      {
        title: 'AI Index Report 2026',
        publisher: 'Stanford Institute for Human-Centered AI (HAI)',
        url: 'https://hai.stanford.edu/ai-index/2026-ai-index-report',
      },
    ],
  },
];

export default guides;
