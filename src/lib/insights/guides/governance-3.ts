import type { Guide } from '../types';

const guides: Guide[] = [
  {
    slug: 'when-ai-workflows-go-wrong',
    collection: 'governance',
    title: 'What Happens When an AI Workflow Gets Something Wrong?',
    description: 'Six ways an AI workflow gets things wrong, how to detect them, pause safely, correct the records, tell the people affected and stop the failure returning.',
    dek: 'Every AI workflow will get something wrong eventually. What separates a contained mistake from a damaging one is detection, a way to pause, an honest correction and a cause that actually gets fixed.',
    keywords: [
      'AI workflow errors',
      'AI incident response',
      'when AI gets it wrong',
      'AI system failure',
      'AI incident runbook',
      'AI error handling for business',
    ],
    publishedAt: '2026-09-11',
    visual: {
      kind: 'flow',
      title: 'What to do when it goes wrong',
      steps: [
        'Detect and confirm',
        'Pause the workflow',
        'Find affected records',
        'Correct and inform',
        'Fix the cause',
        'Update the tests',
      ],
      gate: 3,
      gateLabel: 'A named owner decides what is said',
    },
    summary: [
      'AI workflows fail in six recognisable ways. Silent drift is the expensive one, because nothing anywhere reports an error.',
      'Design detection and a pause switch before launch. You should not learn about a bad week from a customer.',
      'Correct the records, then tell the people affected in plain words. Speed of correction earns more trust than a clean record.',
      'Every incident should end in a named cause, a change and a new test case, so the same failure cannot pass again.',
    ],
    sections: [
      {
        id: 'six-ways-it-goes-wrong',
        heading: 'What kinds of mistakes does an AI workflow actually make?',
        blocks: [
          {
            type: 'p',
            text: 'An AI workflow rarely fails the way a machine fails. It does not stop with a red light. It keeps running, produces output that looks like every other day’s, and the mistake travels downstream into a ledger, an inbox or a customer’s expectation. So the useful question is not whether your system will get something wrong. It is how you will find out, how far it will have travelled by then, and how you will put it right.',
          },
          {
            type: 'p',
            text: 'Six failures cover most of what goes wrong in practice. They need different responses, so it helps to name them before you need to.',
          },
          {
            type: 'table',
            caption: 'Six ways an AI workflow gets it wrong',
            head: ['Failure', 'What it looks like', 'Usual first sign'],
            rows: [
              ['Wrong extraction', 'A value read from the wrong line', 'A mismatch at approval'],
              ['Wrong answer', 'A confident reply from a stale source', 'A customer corrects you'],
              ['Wrong action', 'A record changed that should not be', 'Someone asks who changed it'],
              ['Duplicate action', 'The same order, email or entry twice', 'A recipient complains'],
              ['Integration failure', 'A connection drops and work stops', 'The daily count falls to zero'],
              ['Silent drift', 'Quality slips slowly, nothing errors', 'Rework rises for no clear reason'],
            ],
          },
          {
            type: 'p',
            text: 'The first four produce a bad result. The fifth produces no result, which is easy to spot and easy to miss over a long weekend. The sixth costs the most, because nothing reports an error at all: a model version changes, a supplier alters a form, a price list moves, and the workflow carries on with quietly worse judgement.',
          },
        ],
      },
      {
        id: 'how-you-find-out',
        heading: 'How would you find out before the customer does?',
        blocks: [
          {
            type: 'p',
            text: 'Most teams find out from the person who was let down. That is a design choice, even if nobody made it deliberately. Decide instead what would tell you first, and put a number and an alert behind it. A daily count and a weekly sample do most of the work; our guide to [measuring whether an AI system is working](/insights/measure-ai-system-performance) covers the measures themselves.',
          },
          {
            type: 'list',
            items: [
              'Volume: how many documents, replies or records the workflow completed today, with an alert when the number falls to zero or doubles.',
              'Exception rate: how often the system asks for help. A sudden drop can mean it has stopped noticing what it does not know.',
              'Correction rate: how often a reviewer edits or rejects before approving, counted weekly rather than felt.',
              'Sampling: a person checks a small random sample of finished work each week, including work nobody complained about.',
              'Complaints tagged back to the workflow, so a pattern is visible instead of scattered across inboxes.',
              'Cost per completed task: a jump usually means retries or a loop nobody intended.',
            ],
          },
          {
            type: 'note',
            tone: 'caution',
            title: 'Nothing errors when a system drifts',
            text: 'Drift shows up as small extra work: a reviewer editing a little more, a team quietly double-checking. Those signals sit with people, not in logs, so ask for them in the monthly review rather than waiting for an alert that will never come.',
          },
        ],
      },
      {
        id: 'pausing-safely',
        heading: 'What does pausing an AI workflow safely look like?',
        blocks: [
          {
            type: 'p',
            text: 'A pause switch is a design decision, not a button someone improvises at 9 pm. Decide in advance what pausing means for each workflow, because stopping everything is sometimes worse than the fault: if the enquiry system stops, customers hear nothing at all.',
          },
          {
            type: 'list',
            items: [
              'Narrow: switch to drafts only. The system still prepares the work; a person releases every item.',
              'Partial: stop one document type, one supplier, one branch or one customer, and let the rest run.',
              'Full: stop the workflow and route the incoming work to the manual process it replaced.',
            ],
          },
          {
            type: 'p',
            text: 'Then name who may pull it. The reviewer on shift should be able to narrow a workflow without finding the operations head first, and should never be blamed for stopping something that turned out to be fine. Write the fallback beside it: who does this work by hand meanwhile, and for how long that is bearable. The [NIST AI Risk Management Framework](https://nvlpubs.nist.gov/nistpubs/ai/NIST.AI.100-1.pdf) asks for the same thing, calling for mechanisms and assigned responsibilities to supersede, disengage or deactivate systems behaving inconsistently with their intended use.',
          },
        ],
      },
      {
        id: 'containment-and-correction',
        heading: 'How do you contain the damage and correct the records?',
        blocks: [
          {
            type: 'p',
            text: 'Containment stops the mistake spreading; correction puts right what already spread. Both start with the step teams skip: work out how far it went before fixing anything.',
          },
          {
            type: 'list',
            ordered: true,
            items: [
              'Pause at the agreed level and tell the team, so nobody re-runs the job to see whether it works now.',
              'Set the window. When did the fault start? The change log usually answers: a model version, an edited prompt, a new form layout, a changed permission.',
              'List every record, message and decision produced inside that window. The list, not a sample.',
              'Sort by consequence: money moved, promises made to customers, master records changed, reports already used.',
              'Correct in that order, with a person approving each correction, and keep the original output as evidence.',
              'Only then resume, watching the first day more closely than usual.',
            ],
          },
          {
            type: 'example',
            title: 'Illustrative example: a Coimbatore pump distributor’s duplicate purchase orders',
            text: 'Suppose a workflow raises purchase orders when stock falls below a reorder level. On Friday evening the connection to the inventory system times out after the order is created but before the confirmation returns, so the workflow retries. Over the weekend, eleven suppliers receive the same order twice, and no alert fires, because from the workflow’s side every run succeeded. On Monday a supplier rings to ask which quantity is correct. The team narrows the workflow to drafts, lists every order raised since Friday, and calls the four suppliers whose lorries are already loaded before touching the paperwork. The fix is not a better prompt. It is a rule that the same reorder cannot raise a second order for the same item within a day, and an alert when a run ends without a confirmation.',
          },
        ],
      },
      {
        id: 'telling-people',
        heading: 'What do you tell the customers and colleagues affected?',
        blocks: [
          {
            type: 'p',
            text: 'Tell them early, in your own words, before they work it out. A short message beats a careful one that arrives three days later. Say what happened, what it affected, what you have already done, what they need to do, if anything, and who they can speak to. Tell your own team first, so nobody is caught unaware on a call, and record who was told, when and what was said. MeitY’s [India AI Governance Guidelines](https://static.pib.gov.in/WriteReadData/specificdocs/documents/2025/nov/doc2025115685601.pdf) make the same point from the other side: organisations deploying AI should run grievance redressal that is easy to reach and honours clear timelines, with the feedback analysed rather than filed.',
          },
          {
            type: 'p',
            text: 'When the failure exposes personal data rather than simply mishandling a record, a legal duty may also apply. Under India’s [Digital Personal Data Protection Act, 2023](https://www.meity.gov.in/static/uploads/2024/06/2bf1f0e9f04e6fb4f8fef35e82c42aa5.pdf), an organisation that decides how personal data is processed must protect it with reasonable security safeguards, and on a personal data breach must give the Data Protection Board and each affected person an intimation of it. The [Digital Personal Data Protection Rules, 2025](https://www.meity.gov.in/static/uploads/2025/11/53450e6e5dc0bfa85ebd78686cadad39.pdf), notified in November 2025, set out what the person is told, without delay and in clear and plain language: a description of the breach, the consequences likely to matter to her, what you have done to reduce the risk, what she can do to protect herself, and contact details for someone who can answer her questions. The Board is told without delay, with fuller detail within seventy-two hours of your becoming aware.',
          },
          {
            type: 'note',
            tone: 'caution',
            title: 'General information, not legal advice',
            text: 'The DPDP Rules commence in phases; as notified, the rules on security safeguards and breach intimation apply eighteen months after publication. Sector regulators and your own contracts may set their own duties and timelines. Check the current text and take advice on your situation.',
          },
        ],
      },
      {
        id: 'root-cause-and-tests',
        heading: 'How do you find the real cause and stop it repeating?',
        blocks: [
          {
            type: 'p',
            text: 'The instinct after a mistake is to correct the output, re-run the job and move on. That is how the same failure returns in six weeks with a different customer attached. Spend twenty minutes naming the cause instead, specifically enough that the fix is obvious:',
          },
          {
            type: 'list',
            items: [
              'Input: the document, message or record was different from anything the system had seen.',
              'Source: the answer was right for a price list, policy or catalogue that nobody had updated.',
              'Instruction: the rule or prompt did not cover this case, or covered it ambiguously.',
              'Model: the provider changed a version, and behaviour changed with it.',
              'Integration: a connection failed, timed out or returned something unexpected.',
              'Permission: the system could reach or change something it should never have been able to.',
              'Process: a person approved without looking, usually because the gate asks for a decision nobody can make in the time given.',
            ],
          },
          {
            type: 'p',
            text: 'Write the cause in one plain sentence, decide one change, and give it an owner and a date. Then add the case to the evaluation set so the next release has to pass it. That last step is what turns an incident into an improvement, and it is why [evaluation built from real business cases](/insights/evaluate-ai-quality-real-cases) is worth the effort of maintaining.',
          },
        ],
      },
      {
        id: 'incident-runbook',
        heading: 'What should an incident runbook contain?',
        blocks: [
          {
            type: 'p',
            text: 'A runbook is one page for each workflow that matters, written while everyone is calm. It says who acts at each stage and what gets written down, so the response does not depend on who happens to be in the office. Keep names, phone numbers and a date when it was last checked.',
          },
          {
            type: 'table',
            caption: 'A one-page incident runbook',
            head: ['Stage', 'Who acts', 'What is recorded'],
            rows: [
              ['Detect', 'Whoever notices, or an alert', 'Time noticed and first symptom'],
              ['Pause', 'Named responder on duty', 'Level of pause and time'],
              ['Assess', 'Business owner', 'Window, records affected, severity'],
              ['Correct', 'The team, with approvals', 'Each correction and its approver'],
              ['Inform', 'Business owner', 'Who was told, when and what was said'],
              ['Fix', 'Technical owner', 'Cause, change made, test added'],
              ['Resume', 'Business owner', 'Checks passed and date resumed'],
            ],
          },
          {
            type: 'p',
            text: 'Rehearse it once, on a quiet afternoon, with an invented failure. Rehearsal is where you discover that only one person can pause the workflow and she is on leave, or that nobody can produce a list of everything the system did last Tuesday. A runbook first read during an incident is a document, not a control.',
          },
        ],
      },
      {
        id: 'designing-for-recovery',
        heading: 'How do you design for recoverability before launch?',
        blocks: [
          {
            type: 'p',
            text: 'Recovery is cheaper to design in than to add afterwards, and most of it is plumbing agreed before the first release:',
          },
          {
            type: 'list',
            items: [
              'Stage consequential actions: prepare, then release on approval, so a mistake is caught before it leaves the building.',
              'Prefer reversible actions: a draft rather than a send, a credit note rather than an edit, an archive rather than a deletion.',
              'Set batch and rate limits, so a loop cannot reach two thousand customers before anyone wakes up.',
              'Make repeated runs safe: the same input should produce one result, however many times a retry fires.',
              'Keep logs of the input, the sources used, the proposed action, the approver and the result, including failures.',
            ],
          },
          {
            type: 'p',
            text: 'None of this makes a system infallible. It is the difference between an hour of annoyance and a fortnight of reconstruction. Failure handling, named owners and cost visibility are part of [how we work](/how-we-work) on every build, and our [Infrastructure & Governance](/systems/ai-infrastructure-governance) work covers detection, containment and recovery for systems already running.',
          },
        ],
      },
    ],
    limitations: [
      'This is general information, not legal advice. Data protection duties, sector regulators and customer contracts may impose their own notification requirements and timelines.',
      'A runbook only helps with failures you can detect. A system whose judgement nobody samples can be wrong for months without triggering anything here.',
      'Some actions cannot be undone: money paid, a message a customer has already read, a public post. For those, approval gates matter more than recovery plans.',
      'If the AI feature sits inside software you subscribe to, you may have neither the logs nor the pause switch assumed here. Ask the vendor before you depend on it.',
    ],
    faqs: [
      {
        q: 'What should we do first when an AI system makes a mistake?',
        a: 'Pause at the level that stops the mistake spreading, which is often drafts-only rather than a full stop. Then find the window in which the fault ran, and list every record, message and decision produced in it. Correct the highest-consequence items first, with a person approving each one. Investigating the cause comes after containment.',
      },
      {
        q: 'Do we have to tell customers when an AI workflow gets something wrong?',
        a: 'If the mistake affected them, yes, and sooner than feels comfortable. Say what happened, what it affected, what you have done and who they can speak to. Where personal data has been exposed, India’s DPDP framework sets out duties to inform each affected person and the Data Protection Board. Treat that as a legal question, not only a service one.',
      },
      {
        q: 'How do you stop an AI workflow doing the same thing twice?',
        a: 'Most duplicates come from retries after a timeout, where the first attempt actually succeeded. The fix is a rule that the same request produces one result: a reference the system checks before acting, a limit on repeats within a period, and an alert when a run ends without confirmation. Test it by breaking the connection deliberately before launch.',
      },
      {
        q: 'What is silent drift in an AI system?',
        a: 'Silent drift is a slow fall in quality with no error anywhere. A model version changes, a supplier alters a form, a policy is updated and nobody tells the system. Output still looks normal, so the cost appears as extra checking and rework. Weekly sampling of finished work and a tracked correction rate are the practical defences.',
      },
      {
        q: 'Who should handle an AI incident in a small company?',
        a: 'The named business owner leads: they decide the pause, the priorities and what customers are told. A technical owner finds the cause and makes the change. In a company of forty people that is two named individuals with a deputy each, not a committee. Put the names on the runbook and check them when people change roles.',
      },
    ],
    bybo: [
      {
        href: '/systems/ai-infrastructure-governance',
        label: 'Infrastructure & Governance',
        why: 'How BYBO sets up detection, containment, logs and recovery so failures are visible and routed to a named owner.',
      },
      {
        href: '/how-we-work',
        label: 'How we work',
        why: 'Failure handling, named owners and cost visibility are part of delivery, not an addition after launch.',
      },
      {
        href: '/insights/human-in-the-loop-product-decision',
        label: 'Design the human decision into the workflow',
        why: 'What the reviewer needs to see before approving, and where a workflow should stop and ask.',
      },
    ],
    related: ['measure-ai-system-performance', 'ai-pilots-to-working-systems', 'reduce-manual-data-entry'],
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
    slug: 'named-owner-for-ai-systems',
    collection: 'governance',
    title: 'Why Every Business AI System Needs a Named Owner',
    description: 'Business owner, technical owner and reviewers: who is accountable for an AI system’s outcomes, changes, sources, access, costs, incidents and retirement.',
    dek: 'An AI system without a named owner drifts quietly: quality slips, access widens, costs rise and nobody notices. Ownership is one person, a short list of responsibilities and a handover that survives someone leaving.',
    keywords: [
      'AI system owner',
      'AI accountability',
      'who owns AI systems',
      'AI governance roles',
      'RACI for AI systems',
      'AI ownership handover',
    ],
    publishedAt: '2026-09-11',
    visual: {
      kind: 'layers',
      title: 'Who owns an AI system',
      layers: [
        { label: 'Business owner', note: 'Accountable for outcomes, limits and cost' },
        { label: 'Technical owner', note: 'Responsible for how it runs and changes' },
        { label: 'Reviewers', note: 'Approve or reject individual pieces of work' },
        { label: 'Everyone who uses it', note: 'Follow the rules, report what looks wrong' },
      ],
    },
    summary: [
      'Ownership means a person, not a department. If nobody’s phone rings when the system errs, nobody owns it.',
      'Split it in two: a business owner accountable for outcomes and limits, a technical owner responsible for how it runs.',
      'Write down seven responsibilities: outcomes, changes, sources, access, costs, incidents and retirement. Each carries a name and a review date.',
      'Plan the handover before you need it. A system left behind by the person who built it becomes a black box within weeks.',
    ],
    sections: [
      {
        id: 'what-a-named-owner-means',
        heading: 'What does a named owner actually mean?',
        blocks: [
          {
            type: 'p',
            text: 'Ask who owns an AI system and the answer is usually a department. Operations owns the invoice workflow. Marketing owns the content assistant. IT owns whatever nobody else claimed. A department cannot notice that answers have got worse, cannot approve a change and cannot decide to switch something off. In practice, departmental ownership means the next person to spot a problem decides whether it is theirs.',
          },
          {
            type: 'p',
            text: 'A named owner is one person, written down, with the standing to make decisions about the system. The test is simple. If the workflow issued a wrong credit note at four o’clock this afternoon, whose phone rings? If the answer is two names, both will assume the other is handling it. If the answer is nobody, the mistake waits until it becomes a complaint.',
          },
          {
            type: 'note',
            tone: 'insight',
            title: 'Ownership is not blame',
            text: 'An owner’s job is to notice, decide and get things fixed, not to have written the code or to be at fault when a supplier changes a form. If owning a system means being blamed for every error it makes, no capable person will agree to own one.',
          },
        ],
      },
      {
        id: 'business-and-technical-owners',
        heading: 'Business owner or technical owner: who decides what?',
        blocks: [
          {
            type: 'p',
            text: 'Most systems need two owners, because two different questions have to be answered. Should this run at all, and is the result good enough for the business? And does it work, safely and within its limits? One person can hold both in a very small team, but the questions still need separating, or the person who builds a change also decides whether it is acceptable.',
          },
          {
            type: 'table',
            caption: 'Two owners, two kinds of question',
            head: ['The question', 'Business owner', 'Technical owner'],
            rows: [
              ['Should it run at all?', 'Decides', 'Advises on what is feasible'],
              ['What may it do unaided?', 'Sets the limits', 'Builds and enforces them'],
              ['Is the output good enough?', 'Agrees the pass level', 'Runs the evaluation'],
              ['Who may see what?', 'Approves access', 'Applies and reviews it'],
              ['A change is proposed', 'Approves the release', 'Tests it and can roll back'],
              ['Something goes wrong', 'Decides the response', 'Finds the cause and fixes it'],
            ],
          },
          {
            type: 'p',
            text: 'Reviewers are the third role and the easiest to leave undefined. They approve or reject individual pieces of work: this credit note, this reply, this record change. A reviewer owns the decision in front of them, not the system. That distinction matters after a mistake, when the question of who approved something is separate from who allowed the workflow to reach that point. The [NIST AI Risk Management Framework](https://nvlpubs.nist.gov/nistpubs/ai/NIST.AI.100-1.pdf) asks for policies that define and differentiate roles and responsibilities for human oversight, and for roles, responsibilities and lines of communication that are documented and clear to the people involved.',
          },
        ],
      },
      {
        id: 'what-the-owner-is-responsible-for',
        heading: 'What is the owner responsible for, in practice?',
        blocks: [
          {
            type: 'p',
            text: 'Seven responsibilities cover almost everything. Written out, they take half a page per system, and that half page is what makes ownership real rather than a title on a register.',
          },
          {
            type: 'list',
            items: [
              'Outcomes: the system still does the job it was built for, measured against the baseline agreed before launch.',
              'Changes: nothing goes live without approval, and there is a way back if it makes things worse.',
              'Sources: the price list, policy, catalogue or knowledge folder it answers from is current and has an owner of its own.',
              'Access: what it can read and change is reviewed when roles, tools or workflows change, not once a year.',
              'Costs: someone sees the monthly figure, understands what moved it and can [keep it visible and controlled](/insights/control-ai-operating-costs).',
              'Incidents: when it gets something wrong, a named person leads the response and signs off the resumption.',
              'Retirement: when the workflow changes or the system stops earning its place, the owner turns it off and revokes its access.',
            ],
          },
          {
            type: 'note',
            tone: 'caution',
            title: 'An owner without authority is a scapegoat',
            text: 'If the owner cannot pause the workflow, refuse a release or spend a little to fix a source, they are carrying the consequence without the control. Give the role explicit authority in writing, and give it time in the working week.',
          },
        ],
      },
      {
        id: 'responsibility-table',
        heading: 'How do you write responsibilities down without a formal chart?',
        blocks: [
          {
            type: 'p',
            text: 'Formal responsibility charts rarely survive contact with a forty-person company. The plain version fits on one screen: the events that actually happen, who decides, who does the work and who must be told. Write it once, per system, and settle the arguments before they arrive.',
          },
          {
            type: 'table',
            caption: 'Who decides what, in plain words',
            head: ['Event', 'Who decides', 'Who does it', 'Who must know'],
            rows: [
              ['A new source is added', 'Business owner', 'Technical owner', 'Reviewers'],
              ['Prompt or model change', 'Business owner', 'Technical owner', 'Reviewers'],
              ['Access request', 'Business owner', 'Technical owner', 'The data’s owner'],
              ['Quality falls below the line', 'Business owner', 'Technical owner', 'Leadership'],
              ['Monthly cost rises sharply', 'Business owner', 'Technical owner', 'Finance'],
              ['An incident', 'Business owner', 'Both owners', 'Affected teams'],
              ['Retiring the system', 'Leadership', 'Technical owner', 'Everyone using it'],
            ],
          },
          {
            type: 'p',
            text: 'Two columns do most of the work. The decision column stops changes arriving unannounced; the must-know column stops reviewers discovering on Monday that the system now behaves differently. Where you cannot fill a cell with a person’s name, you have found the gap worth fixing first.',
          },
        ],
      },
      {
        id: 'without-an-owner',
        heading: 'What goes wrong when nobody owns the system?',
        blocks: [
          {
            type: 'p',
            text: 'Unowned systems rarely fail loudly. They decay, and the decay is only visible to someone whose job it is to look:',
          },
          {
            type: 'list',
            items: [
              'Quality slips and nobody says so, because everyone assumes the extra checking is normal now.',
              'Access widens: read access granted for a pilot is still in place two years later.',
              'Costs drift upward and arrive as one unexplained line on a card statement.',
              'A model or vendor update lands with nobody testing what changed.',
              'Two teams edit the same instructions in opposite directions.',
              'When it fails, the first hour goes on working out who is allowed to decide anything.',
            ],
          },
          {
            type: 'example',
            title: 'Illustrative example: a Nashik logistics firm’s rate-card assistant',
            text: 'Suppose an analyst builds an assistant that answers freight rate questions for the sales team, using a rate card kept in a shared folder. It works well, and she leaves in March. The rate card is revised in July by someone who does not know the assistant reads it, and again in September in a new format the assistant cannot read cleanly. Nobody owns quality, so nobody samples the answers. By November the sales team has learned to check every quote manually, but the assistant is still running, still costing money and still being trusted by two new joiners who were never told it can be wrong. Nothing broke. Ownership simply left the building.',
          },
          {
            type: 'p',
            text: 'That pattern is why the response to a failure needs a name attached long before the failure happens. Our guide to [what happens when an AI workflow gets something wrong](/insights/when-ai-workflows-go-wrong) covers the response itself.',
          },
        ],
      },
      {
        id: 'handover',
        heading: 'What happens when the owner leaves?',
        blocks: [
          {
            type: 'p',
            text: 'People change roles and leave. An AI system left behind by the person who built or ran it becomes a black box within weeks, because most of what mattered was never written down. Make the handover a condition of going live, not a task for someone’s notice period.',
          },
          {
            type: 'list',
            items: [
              'What the system is for, and the limits it must not cross.',
              'Where the instructions and configuration live, and who may change them.',
              'The access list: what it can reach, who approved that and when it is next reviewed.',
              'The sources it answers from, and who keeps each one current.',
              'The evaluation set and the last results, with the date and version they refer to.',
              'The cost picture: what it spends, on what, and the budget alert.',
              'Known failure modes, the incident runbook and the names on it.',
            ],
          },
          {
            type: 'p',
            text: 'Two rules keep it honest. No system goes live with only one person who understands it. And ownership transfers in writing on a date, with the new owner named on the register, rather than passing informally to whoever answers the first question about it.',
          },
        ],
      },
      {
        id: 'choosing-an-owner',
        heading: 'How do you choose an owner, and how many can one person hold?',
        blocks: [
          {
            type: 'p',
            text: 'Choose the person who feels the consequence. If the system prepares purchase orders, the owner sits in purchasing, not in IT. If it answers customer enquiries, it belongs to whoever answers for customer experience. Technical skill is the second owner’s job. What the business owner needs is judgement about the work, the standing to say no and about an hour a month to spend on it.',
          },
          {
            type: 'p',
            text: 'International guidance says much the same in more formal language. The OECD’s AI Principles hold that organisations and individuals developing, deploying or operating AI systems [should be held accountable for their proper functioning](https://oecd.ai/en/dashboards/ai-principles/P9). MeitY’s [India AI Governance Guidelines](https://static.pib.gov.in/WriteReadData/specificdocs/documents/2025/nov/doc2025115685601.pdf) put accountability among their seven guiding principles, ask that it be clearly assigned based on the function performed, and expect grievance redressal that people can actually reach. Both leave the practical question to you: which name goes next to which system.',
          },
          {
            type: 'p',
            text: 'One person can own several small systems. The signs that they hold too many are familiar: reviews slip, the cost line is unexplained, the register is out of date and access requests are approved without much thought. Leadership keeps one responsibility that cannot be delegated, which is deciding how much risk the business will carry. Named owners, approval rules and failure handling are part of [how we work](/how-we-work) on every build, so the question of who owns the system is settled before launch rather than after the first incident.',
          },
        ],
      },
    ],
    limitations: [
      'A name on a register is not capacity. If the owner has no time in the week to review anything, the appointment changes nothing.',
      'Internal ownership does not move legal responsibility. Your organisation remains responsible under whatever law applies; roles are for running the system well. This is general information, not legal advice.',
      'For AI features inside software you subscribe to, an owner controls settings, access and use, not the underlying model or the vendor’s updates.',
      'Very small teams often put both roles on one person. That works while the system is simple, but it removes the second pair of eyes on changes.',
    ],
    faqs: [
      {
        q: 'Who should own an AI system in a small company?',
        a: 'The person accountable for the work it touches. An invoice workflow belongs to whoever answers for purchasing or accounts, an enquiry assistant to whoever answers for customers. They need judgement about the work, authority to pause or refuse a release, and about an hour a month. A second, technical owner handles how it runs. In a company of forty, that is two names, not a committee.',
      },
      {
        q: 'What is the difference between a business owner and a technical owner?',
        a: 'The business owner decides whether the system should run, what it may do without asking, what counts as good enough and what happens after a mistake. The technical owner is responsible for how it runs: the build, the connections, testing, releases, rollbacks and finding causes. One decides, the other makes it work. Keeping them separate means the person making a change is not the only person judging it.',
      },
      {
        q: 'Can an external partner own our AI system?',
        a: 'A partner can build and operate a system, and can hold the technical owner’s responsibilities under an agreement. Accountability for outcomes stays inside your business, because only you can decide what is acceptable to your customers and regulators. Name an internal business owner from the start, agree what the partner does, what you decide, and what happens if the relationship ends.',
      },
      {
        q: 'How many AI systems can one person own?',
        a: 'It depends on how consequential they are rather than how many there are. A person can comfortably own several drafting assistants. One workflow that moves money or writes to customer records deserves proper attention on its own. Watch for the signs of overload: reviews postponed, unexplained costs, an out-of-date register and access approved without thought.',
      },
      {
        q: 'What should happen when the person who built the system leaves?',
        a: 'Ownership transfers in writing, on a date, to a named replacement, with a handover covering purpose and limits, where the configuration lives, the access list, the sources, the evaluation set and results, the cost picture and the incident runbook. Do not wait for the notice period. Requiring two people who understand each system, from launch, is what makes the handover possible.',
      },
    ],
    bybo: [
      {
        href: '/how-we-work',
        label: 'How we work',
        why: 'Named owners, approval rules and failure handling are agreed during delivery, not added after launch.',
      },
      {
        href: '/systems/ai-infrastructure-governance',
        label: 'Infrastructure & Governance',
        why: 'How BYBO sets up ownership, permissions, quality reviews and operating visibility for AI systems.',
      },
      {
        href: '/insights/why-ai-pilots-fail',
        label: 'The demo is the easy part',
        why: 'Why reliable operation needs ownership, exception handling and a baseline, not a better demonstration.',
      },
    ],
    related: ['when-ai-workflows-go-wrong', 'approval-workflow-design', 'ai-readiness-checklist'],
    sources: [
      {
        title: 'Artificial Intelligence Risk Management Framework (AI RMF 1.0)',
        publisher: 'National Institute of Standards and Technology (NIST)',
        url: 'https://nvlpubs.nist.gov/nistpubs/ai/NIST.AI.100-1.pdf',
      },
      {
        title: 'OECD AI Principles: Accountability (Principle 1.5)',
        publisher: 'OECD',
        url: 'https://oecd.ai/en/dashboards/ai-principles/P9',
      },
      {
        title: 'India AI Governance Guidelines: Enabling Safe and Trusted AI Innovation',
        publisher: 'Ministry of Electronics and Information Technology, IndiaAI Mission',
        url: 'https://static.pib.gov.in/WriteReadData/specificdocs/documents/2025/nov/doc2025115685601.pdf',
      },
    ],
  },
  {
    slug: 'evaluate-ai-quality-real-cases',
    collection: 'governance',
    title: 'How to Evaluate AI Quality Using Real Business Cases',
    description: 'Build an evaluation set from real cases, including the awkward ones: expected outcomes, scoring rubrics, reviewer agreement, release thresholds and privacy.',
    dek: 'A demonstration proves a system can work once. An evaluation set built from your own cases, including the awkward ones and those where stopping is the right answer, tells you whether it works often enough to release.',
    keywords: [
      'evaluate AI quality',
      'AI evaluation set',
      'testing AI systems',
      'AI accuracy testing',
      'AI quality assurance for business',
      'AI test cases',
    ],
    publishedAt: '2026-09-11',
    visual: {
      kind: 'checklist',
      title: 'What belongs in an evaluation set',
      items: [
        'Everyday cases, in the mix you actually receive',
        'Awkward ones: poor scans, mixed languages, missing fields',
        'Cases where the right answer is to stop',
        'A written expected outcome for every case',
        'Every past failure, added after it was fixed',
        'A held-back set the prompt writers never see',
      ],
    },
    summary: [
      'An evaluation set is a fixed collection of real cases with the correct outcome written down for each one.',
      'Include the awkward cases, and the cases where stopping to ask a person is the correct answer.',
      'Score against a written rubric, weight by consequence, and check that two reviewers agree before trusting the number.',
      'Re-run after every change, including model updates you did not ask for, and keep every result dated.',
    ],
    sections: [
      {
        id: 'why-real-cases',
        heading: 'Why do demonstrations pass and real work fail?',
        blocks: [
          {
            type: 'p',
            text: 'A demonstration uses the file somebody chose. It is legible, complete and typical of nothing. Real work arrives as a photograph of a delivery challan taken at an angle in poor light, an enquiry that asks two questions in two languages, an invoice from a supplier who changed their layout last month, and the same purchase order sent twice because the first email bounced. A system that handles the chosen file beautifully can still be wrong again and again on a normal Tuesday.',
          },
          {
            type: 'p',
            text: 'An evaluation set closes that gap. It is a fixed collection of real cases with the correct outcome written down for each, run the same way every time, so that a change in the score means a change in the system rather than a change in which examples someone tried. It is the difference between believing a system is good and being able to show it, and it is the only honest basis for the decision to release.',
          },
          {
            type: 'note',
            tone: 'insight',
            title: 'A score is only as honest as the cases behind it',
            text: 'Any system scores well on cases chosen by the person hoping it will pass. The value of an evaluation set comes from the cases nobody would have picked: the smudged scan, the ambiguous request, the exception that occurs twice a year and costs a great deal when it is handled badly.',
          },
        ],
      },
      {
        id: 'building-the-set',
        heading: 'How do you build an evaluation set from real work?',
        blocks: [
          {
            type: 'p',
            text: 'Take the cases from the work itself, over a period long enough to include a month-end and at least one quiet week. Do not write cases from imagination; you will invent the problems you already know about and miss the ones that actually happen.',
          },
          {
            type: 'list',
            items: [
              'Size: enough to show a pattern, few enough that a person can review the results in an afternoon. Forty to eighty cases per workflow is a workable start.',
              'Mix by frequency: if two-thirds of your invoices come from ten suppliers, the set should look like that, or your score will describe work you rarely do.',
              'Add the awkward ones deliberately: the poor scan, the message in three languages, the missing GSTIN, the duplicate, the supplier who changed their format, the customer who asks two things at once.',
              'Include cases where the correct outcome is to refuse, escalate or ask a question.',
              'Include a few cases from before the system existed, where you know how the business actually decided and why.',
              'Freeze it and version it. A set that quietly changes between runs cannot tell you whether anything improved.',
            ],
          },
          {
            type: 'example',
            title: 'Illustrative example: an Indore trading firm’s supplier invoices',
            text: 'Suppose a team assembles sixty invoices from three months of real post and email. Forty are ordinary. Twenty are the difficult ones the accounts executive remembers: two with the wrong purchase order number, three where the tax split does not add up, one photographed at an angle with a thumb over the total, four from a supplier who moved to a new template, two duplicates of the same bill, and eight where a person had to ring someone before approving. For each case they write what the system should produce, including the eight where the correct output is a question rather than a posting. Building the set takes two afternoons. It is then reused for every change for the next two years, and each new failure joins it.',
          },
        ],
      },
      {
        id: 'expected-outcomes',
        heading: 'What is the right answer when stopping is the right answer?',
        blocks: [
          {
            type: 'p',
            text: 'Every case needs an expected outcome written before the system sees it. Otherwise the review becomes a discussion of whether the output looks reasonable, which it usually does. What the expected outcome contains depends on the kind of work:',
          },
          {
            type: 'list',
            items: [
              'Extraction: the exact values for each required field, and where in the document they came from.',
              'An answer: the facts that must appear, the facts that must not, and the source it should be drawn from.',
              'An action: what should change in the other system, and what should not change.',
              'Stop and ask: the case is ambiguous, incomplete or outside the agreed limits, so the correct output is a question to a named person, with the reason.',
            ],
          },
          {
            type: 'p',
            text: 'That last category changes behaviour more than any other. If your set only rewards answers, you are training your reviewers and your suppliers to prefer a confident guess to an honest stop. Mark those cases clearly, and treat a system that answered them anyway as having failed, even when the answer happened to be right. Deciding where a workflow should pause is a design question in its own right, covered in [designing the human decision into the workflow](/insights/human-in-the-loop-product-decision).',
          },
        ],
      },
      {
        id: 'scoring',
        heading: 'How do you score work that is not simply right or wrong?',
        blocks: [
          {
            type: 'p',
            text: 'Right and wrong is too blunt for most business work. An answer can be correct but missing a caveat, or correct with a small edit, or wrong in a way that would have cost money. A short rubric, agreed in advance and applied the same way by everyone, gives you a number you can compare between runs.',
          },
          {
            type: 'table',
            caption: 'A five-level scoring rubric',
            head: ['Score', 'What it means', 'What it triggers'],
            rows: [
              ['Correct', 'Right result, right reason, right source', 'Nothing'],
              ['Correct with an edit', 'Right result, small correction needed', 'Note the pattern of edits'],
              ['Incomplete', 'A required field or caveat is missing', 'Fix the rule or the source'],
              ['Wrong', 'Wrong value, answer or action', 'Blocks the release'],
              ['Wrong and confident', 'Wrong, and it did not ask', 'Blocks the release, weighted highest'],
            ],
          },
          {
            type: 'p',
            text: 'Weight the score by consequence rather than counting cases equally. A wrong pin code and a wrong bank account are not the same event. The [NIST AI Risk Management Framework](https://nvlpubs.nist.gov/nistpubs/ai/NIST.AI.100-1.pdf) makes the same point in its own language: performance or assurance criteria should be measured and demonstrated for conditions similar to the setting the system will be deployed in, and the test sets and tools used should be documented.',
          },
        ],
      },
      {
        id: 'reviewer-agreement',
        heading: 'How do you know your reviewers agree?',
        blocks: [
          {
            type: 'p',
            text: 'Two experienced people scoring the same case can reach different verdicts, particularly on the middle categories. If your quality figure depends on who happened to score the run, it cannot be compared with last month. So test the scorers before you trust the score: give two people the same twenty cases, independently, and compare.',
          },
          {
            type: 'p',
            text: 'Where they disagree, the rubric is unclear, not the reviewer. Rewrite the definition, add an example of each score, and run the twenty again. It is also worth involving someone who did not build the system. The [NIST framework](https://nvlpubs.nist.gov/nistpubs/ai/NIST.AI.100-1.pdf) asks that internal experts who did not serve as front-line developers, or independent assessors, take part in regular assessments, with domain experts and users consulted as needed. In a smaller company, that can simply be the colleague who does the work every day rather than the person who wrote the instructions.',
          },
          {
            type: 'note',
            tone: 'caution',
            title: 'The prompt writer should not be the only scorer',
            text: 'Whoever wrote the instructions knows what the system meant to do, and will read charity into a vague output. Have the person who does the work score at least a sample, and keep their scores, not the builder’s, as the record.',
          },
        ],
      },
      {
        id: 'thresholds-and-reruns',
        heading: 'What is good enough to release, and when do you run it again?',
        blocks: [
          {
            type: 'p',
            text: 'Agree the pass level with the business owner before anyone sees the results, or the threshold will quietly become whatever the system scored. Express it in categories rather than a single average, because one number hides the failures that matter:',
          },
          {
            type: 'list',
            items: [
              'No wrong and confident results at all on anything that moves money, changes a master record or commits you to a customer.',
              'An agreed, small number of incomplete results elsewhere, each with a route for a person to catch it.',
              'A ceiling on the edit rate, since a system that is right but always edited is costing the reviewer more than it saves.',
              'A floor on the stop-and-ask cases: they must be handled correctly, not answered anyway.',
            ],
          },
          {
            type: 'p',
            text: 'Then re-run the set after every change: a revised prompt, a new source, a new document type, a changed integration, and above all a new model version, including one your provider deploys without asking you. Re-run on a schedule as well, perhaps quarterly, even when nothing on your side changed, because suppliers, formats and customers change under you. Keep each result dated and tied to the version it describes. Evaluation, logs and cost visibility are the everyday work of running a system, which is what our [Infrastructure & Governance](/systems/ai-infrastructure-governance) practice sets up; if you are still deciding which workflow deserves a build, the [AI Opportunity Blueprint](/blueprint) is a paid diagnostic that maps the work and assesses readiness first.',
          },
        ],
      },
      {
        id: 'leakage-and-privacy',
        heading: 'How do you stop test cases leaking, and protect the data in them?',
        blocks: [
          {
            type: 'p',
            text: 'There is a quiet way to fool yourself. A case fails, someone pastes it into the system’s instructions as an example of how to handle that situation, and the next run passes. You have not taught the system to reason; you have told it the answer. Keep the examples inside the prompt separate from the cases you score, and hold back a portion of the set that the people writing instructions never see. When a failure teaches you something general, write the general rule and add a fresh, similar case to the set rather than the one you fixed.',
          },
          {
            type: 'p',
            text: 'Evaluation sets are made of real customer records, so treat them as such. Under India’s [Digital Personal Data Protection Act, 2023](https://www.meity.gov.in/static/uploads/2024/06/2bf1f0e9f04e6fb4f8fef35e82c42aa5.pdf), an organisation must protect personal data in its possession with reasonable security safeguards and erase it, unless a law requires retention, once it is reasonable to assume the purpose is no longer being served. The [Digital Personal Data Protection Rules, 2025](https://www.meity.gov.in/static/uploads/2025/11/53450e6e5dc0bfa85ebd78686cadad39.pdf) describe those safeguards in practical terms: measures such as encryption, masking or tokens, control over who can reach the data, and visibility of access through logs, monitoring and review.',
          },
          {
            type: 'p',
            text: 'In practice that means a few habits. Keep the set inside systems you already control, not on a laptop or a personal drive. Mask what the test does not need, since a name and an account number rarely affect whether a total was read correctly. Keep the list of who can open it short, and note where the cases came from and when they should be removed. Where a case is too sensitive to copy, test against it in place.',
          },
          {
            type: 'note',
            tone: 'caution',
            title: 'General information, not legal advice',
            text: 'The DPDP Rules commence in phases; as notified, the rules on security safeguards apply eighteen months after publication. Your sector may add its own requirements for handling records. Check the current text and take advice on your own situation before building a set from live customer data.',
          },
        ],
      },
    ],
    limitations: [
      'An evaluation set shows how a system behaves on the cases in it. It cannot prove the next unusual case will be handled well, so sampling and review continue after release.',
      'Scores drift as the business changes. A set built around last year’s suppliers, products or questions slowly stops describing your work.',
      'Some work has no single right answer, such as tone in a customer reply. There, judge against clear criteria and accept a range rather than pretending to be exact.',
      'This is general information, not legal advice. Using real customer records for testing may carry obligations under data protection law and your own contracts.',
    ],
    faqs: [
      {
        q: 'How many test cases do we need to evaluate an AI system?',
        a: 'Fewer than most people expect, if they are chosen well. Forty to eighty cases per workflow is a workable start: enough to show a pattern, few enough for a person to review the results in an afternoon. What matters more than volume is the mix. The set should match the work you actually receive and include the awkward cases and the ones where the right answer is to stop.',
      },
      {
        q: 'Can we use real customer data to test an AI system?',
        a: 'Often yes, with care. Keep the cases inside systems you already control, mask the details the test does not need, limit who can open the set and note when it should be removed. India’s data protection framework requires reasonable security safeguards and erasure once the purpose is served. Treat it as a legal question as well as a practical one and take advice on your own situation.',
      },
      {
        q: 'What accuracy should a business AI system reach before launch?',
        a: 'There is no universal figure, and a single average is the wrong shape of answer. Set the level by consequence: no confidently wrong results on anything that moves money or commits you to a customer, a small agreed number of incomplete results elsewhere, and correct handling of every case where the system should stop and ask. Agree it with the business owner before you see the results.',
      },
      {
        q: 'How often should we re-run the evaluation?',
        a: 'After every change: a revised prompt, a new source or document type, a changed connection, and any new model version, including one your provider rolls out without asking. Then on a schedule, perhaps quarterly, even when nothing changed on your side, because formats, suppliers and customer behaviour move. Keep each result dated and attached to the version it describes.',
      },
      {
        q: 'Who should score the results of an AI evaluation?',
        a: 'The people who do the work, not the person who wrote the instructions. Have two reviewers score the same twenty cases independently first; where they disagree, the rubric needs rewriting rather than the reviewer needing correcting. Keep the domain reviewer’s scores as the record, and let the builder see them rather than produce them.',
      },
    ],
    bybo: [
      {
        href: '/systems/ai-infrastructure-governance',
        label: 'Infrastructure & Governance',
        why: 'How BYBO sets up quality reviews, release checks, logs and operating visibility for AI systems.',
      },
      {
        href: '/blueprint',
        label: 'AI Opportunity Blueprint',
        why: 'A paid diagnostic that maps a workflow, assesses readiness and gathers the representative cases.',
      },
      {
        href: '/how-we-work',
        label: 'How we work',
        why: 'Representative cases and agreed acceptance checks are part of BYBO’s build and launch stage.',
      },
    ],
    related: ['measure-ai-system-performance', 'when-ai-should-decide', 'document-automation-workflow'],
    sources: [
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
      {
        title: 'Digital Personal Data Protection Rules, 2025 (G.S.R. 846(E))',
        publisher: 'Ministry of Electronics and Information Technology, Government of India',
        url: 'https://www.meity.gov.in/static/uploads/2025/11/53450e6e5dc0bfa85ebd78686cadad39.pdf',
      },
    ],
  },
];

export default guides;
