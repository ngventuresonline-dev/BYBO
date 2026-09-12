import type { Guide } from '../types';

const guides: Guide[] = [
  {
    slug: 'introduce-ai-without-uncontrolled-access',
    collection: 'governance',
    title: 'How to Introduce AI Without Giving It Uncontrolled Access',
    description: 'Introduce AI with least privilege: read before write, scoped service accounts, per-action permissions, dry runs, approval for writes and a staged rollout.',
    dek: 'Capability decides how useful an AI system is. Access decides how much a mistake costs. Here is how to grant permissions in the order that keeps both under control.',
    keywords: [
      'AI access control',
      'least privilege AI',
      'AI permissions for business',
      'shadow AI policy',
      'AI acceptable use policy',
      'safely introduce AI at work',
    ],
    publishedAt: '2026-09-11',
    visual: {
      kind: 'spectrum',
      title: 'How much access to grant, and when',
      from: 'A person does the work',
      to: 'The system does the work',
      stops: [
        { label: 'Drafts only', note: 'No connection to your systems' },
        { label: 'Reads your data', note: 'Scoped, read-only, no changes possible' },
        { label: 'Prepares actions', note: 'Writes nothing until a person approves' },
        { label: 'Acts within limits', note: 'Bounded writes, logged, with stop rules' },
      ],
    },
    summary: [
      'Capability decides how useful a system is. Access decides how expensive it is when it gets something wrong.',
      'Start read-only. Let write access be earned one action at a time, on evidence from real work.',
      'Give each system its own scoped account. Borrowing a person’s login hides who acted and inherits every permission they hold.',
      'Staff pasting data into public tools is the exposure nobody registers. Answer it with an approved route and one page of rules.',
    ],
    sections: [
      {
        id: 'access-decides-risk',
        heading: 'Why does access decide how much an AI mistake costs?',
        blocks: [
          {
            type: 'p',
            text: 'Most AI conversations begin with capability: what can it do? The more useful question is narrower. What can it reach, and what can it change without asking? A model that writes a weak summary wastes five minutes. The same model with write access to your accounting software, an email account and your customer records can spend a fortnight of someone’s time being confidently wrong in public. Capability decides how useful a system is. Access decides what a mistake costs.',
          },
          {
            type: 'p',
            text: 'The principle behind this is old and dull, which is why it holds. NIST defines [least privilege](https://csrc.nist.gov/glossary/term/least_privilege) as designing a system so that each entity is granted the minimum resources and authorisations it needs to perform its function. Nothing in that changes because the entity is now a language model. What does change is that the entity decides for itself which of its permissions to use, and it can be argued into using them by the contents of a document it was asked to read.',
          },
          {
            type: 'note',
            tone: 'insight',
            title: 'A mistake reaches exactly as far as its permissions',
            text: 'You cannot make an AI system incapable of being wrong. You can decide in advance how much a wrong answer is allowed to touch. That decision is a permissions list, not a paragraph of principles.',
          },
        ],
      },
      {
        id: 'read-before-write',
        heading: 'What does read before write mean in practice?',
        blocks: [
          {
            type: 'p',
            text: 'Split any system you are considering into two halves. Reading is looking at documents, records, messages and past work. Writing is changing something in the world: updating a record, sending a message, issuing a credit note, booking a slot. Reading can expose information. Writing creates work, spends money and reaches customers. The two deserve different levels of trust, and they can be granted months apart.',
          },
          {
            type: 'p',
            text: 'A read-only first release is not a wasted release. The system prepares the work and a person completes it, which is close to how [the human decision should be designed into the workflow](/insights/human-in-the-loop-product-decision) in any case. Meanwhile you collect the things you will want before widening access:',
          },
          {
            type: 'list',
            items: [
              'Real cases, including the awkward ones no demo ever contains.',
              'A correction rate measured by the people reviewing the output.',
              'A cost per completed item based on actual volumes, not an estimate.',
              'Evidence of which formats, languages and requests defeat it.',
              'Time for the team to learn where the system is dependable.',
            ],
          },
          {
            type: 'p',
            text: 'Write access then becomes something a system earns, one action at a time, on evidence you could show a sceptical colleague.',
          },
        ],
      },
      {
        id: 'service-accounts',
        heading: 'Should the system use its own account or a person’s login?',
        blocks: [
          {
            type: 'p',
            text: 'Its own. Give each AI system a named service account created for that workflow, with permissions granted to it directly. Borrowing an employee’s login is the common shortcut and it costs you three things. You cannot tell from a log whether the person or the system acted. You cannot switch the system off without locking out the person. And it inherits every permission that colleague has collected over six years, including the ones nobody remembers granting.',
          },
          {
            type: 'p',
            text: 'One account per system per environment is a sensible rule, and the staging account should never hold live credentials. Give the account an owner, a review date and the narrowest role your software allows. If your accounting package offers only administrator or read-only, that is a real constraint, better discovered during scoping than during a rollout.',
          },
          {
            type: 'p',
            text: 'There is one useful exception. When a system answers questions from internal knowledge, the safer design is for it to act with the permissions of the person asking, so a question cannot return a document that person could not already open. Scheduled workflows have no person to inherit from, which is precisely when a tightly scoped service account matters most.',
          },
        ],
      },
      {
        id: 'per-action-permissions',
        heading: 'How do you grant permissions per action rather than per system?',
        blocks: [
          {
            type: 'p',
            text: 'Connect the CRM is not a permission. It is a bundle of several dozen. The work worth doing before a build takes an afternoon: list every tool the workflow touches, then write down, for each one, what the system may read and what it may change. Anything absent from that list is refused by default rather than allowed by oversight.',
          },
          {
            type: 'table',
            caption: 'Scoping one workflow, tool by tool',
            head: ['Connected tool', 'May read', 'May change'],
            rows: [
              ['Shared mailbox', 'Enquiry threads only', 'Nothing. Drafts are saved, never sent'],
              ['Accounting software', 'Invoices and ledgers', 'Nothing until write access is earned'],
              ['Customer records', 'Contacts, orders, status', 'Notes only, no field edits'],
              ['File storage', 'One folder for this workflow', 'A drafts folder inside it'],
              ['Master data', 'Prices and tax details', 'Never, in any release'],
            ],
          },
          {
            type: 'p',
            text: 'The OWASP GenAI Security Project calls the failure mode [excessive agency](https://genai.owasp.org/llmrisk/llm062025-excessive-agency/): damage done when a system holds more functionality, more permissions or more autonomy than its task requires. Its guidance is refreshingly practical. Keep the set of available tools small, avoid open-ended ones, and check authorisation inside the system being changed rather than trusting the model to restrain itself.',
          },
          {
            type: 'example',
            title: 'Illustrative example: a Nashik auto-parts supplier’s order desk',
            text: 'Suppose a supplier connects an AI workflow to its order desk. It reads purchase orders from one shared mailbox, the current price list and the stock view. It writes a draft order confirmation into a drafts folder and adds a note to the customer record. It cannot send email, change a price, adjust stock or edit bank details, because none of those appear on its list. When a customer emails a revised quantity, the system prepares the amended confirmation and the sales coordinator sends it. The permissions are dull enough that nobody loses sleep over what the system might do on a bad day.',
          },
        ],
      },
      {
        id: 'sandbox-and-dry-runs',
        heading: 'Where should the system run before it touches live data?',
        blocks: [
          {
            type: 'p',
            text: 'Build and test in a separate environment with copies of your data, masking personal details wherever the workflow does not need them. A staging copy of your customer table carries the same obligations as the original, so it is not the place to relax about who has access.',
          },
          {
            type: 'p',
            text: 'Then run a dry run in production. The system works on live inputs, prepares the action it would take and records it, but executes nothing. For two or three weeks you compare what it would have done against what the team actually did. That comparison is the most honest evaluation available to you, and it costs nothing but attention. It also exposes the failures worth rehearsing: a tool that times out, a duplicate document, a record that changed halfway through the job.',
          },
          {
            type: 'note',
            tone: 'caution',
            title: 'Clean test data proves very little',
            text: 'A test set built from tidy examples will pass. Include poor scans, missing fields, duplicates, mixed languages and requests the system ought to refuse. Agree what a correct refusal looks like before you agree a pass mark.',
          },
        ],
      },
      {
        id: 'secrets-and-vendors',
        heading: 'How should keys, secrets and vendor terms be handled?',
        blocks: [
          {
            type: 'p',
            text: 'Every connection needs a credential, and credentials spread. Keep them in a secrets manager or the vault your platform provides, never in a prompt, a spreadsheet or a code repository. Issue one per system per environment so that revoking one stays narrow, rotate them on a schedule, and revoke them when a contractor, a vendor or a workflow goes away. If a key ever appears in a chat message, treat it as compromised and replace it that day.',
          },
          {
            type: 'p',
            text: 'Then read the terms of the services you connect. The UK National Cyber Security Centre’s [guidelines for secure AI system development](https://www.ncsc.gov.uk/collection/guidelines-secure-ai-system-development) treat supply chain security and secure deployment as parts of the lifecycle rather than afterthoughts, and the same logic applies to a business buying a service. Four questions cover most of it: whether your inputs are used to improve the vendor’s models, how long prompts and outputs are retained and who can read them, which sub-processors and regions are involved, and how your data is exported and deleted when you leave.',
          },
          {
            type: 'p',
            text: 'Write the answers down beside the system rather than trusting a sales call. Where personal data is involved they carry legal weight as well as commercial weight, which our guide to [India’s data protection framework](/insights/ai-systems-and-dpdp-india) takes further, and the exit terms belong with [vendor lock-in](/insights/ai-vendor-lock-in).',
          },
        ],
      },
      {
        id: 'shadow-ai',
        heading: 'What about staff pasting company data into public AI tools?',
        blocks: [
          {
            type: 'p',
            text: 'This is usually where the real exposure sits, and it is almost never on anyone’s register. People paste a customer email, a draft contract or a supplier price list into whichever free tool is open in the browser, because it saves twenty minutes and nobody told them otherwise. A ban announced by email does not fix it. It moves the same activity onto personal phones, where you can see none of it.',
          },
          {
            type: 'p',
            text: 'What works is a pairing: an approved route plus a short written rule. Give people accounts on tools your business controls, with the data settings you chose, and publish an acceptable-use note somebody will actually read. One page is enough.',
          },
          {
            type: 'list',
            items: [
              'Which tools are approved for work, and on which accounts.',
              'What must never be pasted anywhere: customer personal data, identity and bank details, passwords, unreleased pricing.',
              'What always needs a person’s check before it reaches a customer or a regulator.',
              'That any output is a draft, and the person who sends it owns it.',
              'Who to ask when the rule is unclear, and how to report a mistake without blame.',
            ],
          },
          {
            type: 'p',
            text: 'Then check whether the approved route is genuinely easier than the shortcut. If signing in takes four steps and the free tool takes none, people will keep taking the shortcut, whatever the policy says.',
          },
        ],
      },
      {
        id: 'staged-rollout',
        heading: 'What does a staged rollout actually look like?',
        blocks: [
          {
            type: 'list',
            ordered: true,
            items: [
              'Read-only, one team, real work. Nothing the system produces leaves the building unchecked.',
              'Dry-run writes. The system prepares actions and logs them; people still do the doing.',
              'Narrow writes with approval on every case, inside one workflow and one set of records.',
              'Raise limits one action type at a time, only where the correction rate supports it.',
              'Widen to a second team after the first has run a full month, including a month-end.',
              'Book the review date now, and agree in advance what would make you narrow access again.',
            ],
          },
          {
            type: 'p',
            text: 'None of this is expensive. It is mostly a matter of deciding things in a particular order, and of writing down decisions that would otherwise live in one person’s head. At BYBO, access rules, approvals, logging and failure handling are part of [how we work](/how-we-work) on every build, and our [Infrastructure & Governance](/systems/ai-infrastructure-governance) work supports teams that need those foundations across several systems, or a review of what is already running.',
          },
        ],
      },
    ],
    limitations: [
      'This is general information, not legal advice. Regulated activities such as lending, insurance and healthcare carry sector obligations that go well beyond access design.',
      'Least privilege limits the damage of a mistake. It does not stop poor output reaching a customer through an approved route, which is what review and evaluation are for.',
      'Some software offers only coarse roles. Where a tool cannot express the permission you want, the honest answer is a narrower integration or a manual step, not a wider grant.',
      'AI features inside software you already subscribe to can be switched on by default. Your controls there are settings, contracts and attention rather than architecture.',
      'A staged rollout takes longer than a single launch. Teams under pressure to show progress tend to skip the middle stages, where most of the learning is.',
    ],
    faqs: [
      {
        q: 'How do you stop AI from accessing sensitive data?',
        a: 'Give the system its own account, grant only the sources the task needs, and keep sensitive fields outside that grant entirely. For internal question answering, let it act with the permissions of the person asking, so it cannot return anything they could not already open. Mask personal details in test copies and check what the vendor retains. Access you never granted is the only access you can be certain will not be used.',
      },
      {
        q: 'What does least privilege mean for an AI system?',
        a: 'It means the system holds the minimum access needed to do its job and nothing kept for convenience. NIST defines least privilege as granting each entity the minimum resources and authorisations required to perform its function. For an AI workflow that becomes a named service account, a written list of readable sources, a shorter list of permitted actions, and refusal by default for anything on neither list.',
      },
      {
        q: 'Should an AI system have write access to our business systems?',
        a: 'Eventually, for narrow actions, once you have evidence. Start read-only, then run writes as dry runs so you can compare intent against what people actually did. Grant real write access one action at a time, with approval on every case at first. Master data such as bank details, tax registrations and prices is best left permanently out of reach, and actions that move money or reach a customer should keep their gate long after routine ones lose theirs.',
      },
      {
        q: 'How do we stop employees pasting company data into public AI tools?',
        a: 'Give them a better route and a rule they can remember. Approved accounts on tools you control, with data settings you chose, remove most of the incentive. A one-page note should say which tools are approved, what may never be pasted anywhere, and who to ask when it is unclear. Make reporting a mistake safe. The alternative is not fewer mistakes, only fewer that you hear about.',
      },
      {
        q: 'What should we check in an AI vendor’s data terms?',
        a: 'Four things, recorded beside the system: whether your inputs are used to train or improve their models, how long prompts and outputs are retained and who can read them, which sub-processors and regions are involved, and how data is exported and deleted when you leave. Ask before the pilot. These terms are much harder to renegotiate once a workflow depends on the tool.',
      },
    ],
    bybo: [
      {
        href: '/systems/ai-infrastructure-governance',
        label: 'Infrastructure & Governance',
        why: 'Shows how BYBO sets access controls, runtime limits, logs and incident response around AI systems.',
      },
      {
        href: '/how-we-work',
        label: 'How we work',
        why: 'Access rules, named owners, approval rules and failure handling are part of every BYBO build.',
      },
      {
        href: '/blueprint',
        label: 'The Blueprint',
        why: 'A scoped diagnosis that settles the workflow, access needs and first boundary before anything is built.',
      },
    ],
    related: ['ai-permissions-logs-approval-gates', 'when-ai-should-decide', 'ai-readiness-checklist'],
    sources: [
      {
        title: 'Least privilege (glossary definition, NIST SP 800-53 Rev. 5)',
        publisher: 'National Institute of Standards and Technology (NIST)',
        url: 'https://csrc.nist.gov/glossary/term/least_privilege',
      },
      {
        title: 'LLM06:2025 Excessive Agency, OWASP Top 10 for LLM Applications',
        publisher: 'OWASP GenAI Security Project',
        url: 'https://genai.owasp.org/llmrisk/llm062025-excessive-agency/',
      },
      {
        title: 'Guidelines for secure AI system development',
        publisher: 'UK National Cyber Security Centre (NCSC)',
        url: 'https://www.ncsc.gov.uk/collection/guidelines-secure-ai-system-development',
      },
    ],
  },
  {
    slug: 'ai-permissions-logs-approval-gates',
    collection: 'governance',
    title: 'AI Permissions, Logs and Approval Gates: A Business Guide',
    description: 'A practical reference for AI permissions, logs and approval gates: who may use a system, what it may change, what a log records and how to set gate thresholds.',
    dek: 'Three controls decide whether an AI system stays inside its lane: a permission model, a log that can answer questions weeks later, and gates set to the consequence of the action.',
    keywords: [
      'AI permissions',
      'AI audit logs',
      'AI approval gates',
      'AI access control policy',
      'AI logging requirements India',
      'human approval in AI workflows',
    ],
    publishedAt: '2026-09-11',
    visual: {
      kind: 'matrix',
      title: 'Which actions need an approval gate',
      x: ['Easy to reverse', 'Hard to reverse'],
      y: ['Low impact', 'High impact'],
      quadrants: [
        'Approve above a threshold',
        'Always approve, always log',
        'Let it run, sample weekly',
        'Check before it is sent',
      ],
      highlight: 1,
    },
    summary: [
      'Permissions decide what is possible, gates decide what needs a person, and logs record what actually happened.',
      'A useful log entry holds the inputs, the proposed action, the decision, the approver and the failures.',
      'Set gates by consequence and reversibility, not by how impressive the automation looks in a demo.',
      'Every gate needs four settings: a threshold, the evidence attached, a named reviewer and a timeout.',
    ],
    sections: [
      {
        id: 'three-controls',
        heading: 'What do permissions, logs and gates each answer?',
        blocks: [
          {
            type: 'p',
            text: 'Three controls do most of the work in an AI system that touches real records, and they are routinely confused with one another. Permissions decide what is possible at all. Gates decide what needs a person before it happens. Logs record what did happen, in enough detail to answer a question three weeks later. Drop one and the other two weaken. Gates without permissions can be walked around, permissions without logs cannot be checked, and logs without gates simply document the damage in good order.',
          },
          {
            type: 'p',
            text: 'None of the three needs special software to begin. A permission model can be a page per system. A gate can be an approval step in a tool your team already opens every day. A log can start as structured rows the workflow writes as it runs. What matters is that each answers a specific question on a specific day, usually a day when something has gone wrong and someone senior is asking.',
          },
          {
            type: 'note',
            tone: 'insight',
            title: 'Design each control against the awkward question',
            text: 'Ask what you would need if a customer disputed an action next month. The answer is nearly always the evidence used, the decision taken and the name of the person who took it.',
          },
        ],
      },
      {
        id: 'permission-model',
        heading: 'What goes into a written permission model?',
        blocks: [
          {
            type: 'p',
            text: 'A permission model has two halves that are easy to conflate. The first is about people: who may use this system, in which team, for which kind of work. The second is about the system itself: what it may read, what it may change and how far it may go without asking. Write both down for each system. Six lines usually cover it.',
          },
          {
            type: 'list',
            ordered: true,
            items: [
              'Who may use it, and who may not.',
              'Whose permissions apply when it fetches information.',
              'The sources it can read, named precisely rather than by category.',
              'The actions it can take, with anything unlisted refused by default.',
              'The limits on those actions: amounts, volumes, working hours, retries.',
              'Who approves what, and who takes over when that person is away.',
            ],
          },
          {
            type: 'p',
            text: 'The second line is the one teams skip. For question answering, the safer pattern is for the system to use the permissions of the person asking, so an answer cannot travel past existing access. Scheduled workflows have no person to inherit from and need their own scoped account, which is where [introducing AI without uncontrolled access](/insights/introduce-ai-without-uncontrolled-access) starts.',
          },
        ],
      },
      {
        id: 'useful-log',
        heading: 'What should a useful log actually record?',
        blocks: [
          {
            type: 'p',
            text: 'A line saying the workflow completed is storage, not evidence. A useful entry lets somebody who was not there reconstruct the decision without running it again. That means the inputs, the sources consulted, the action proposed, the human decision and the result, including the results that were failures.',
          },
          {
            type: 'table',
            caption: 'What one log entry should contain',
            head: ['Recorded', 'Question it answers'],
            rows: [
              ['Time and system version', 'Which release behaved this way'],
              ['Trigger and requester', 'A person, a schedule or another system'],
              ['Inputs and sources used', 'What the decision was based on'],
              ['Proposed action', 'What it intended, even if nothing happened'],
              ['Decision and approver', 'Who allowed this, and when'],
              ['Outcome and errors', 'Whether it worked, and how it failed'],
              ['Duration and cost', 'What this run consumed'],
            ],
          },
          {
            type: 'p',
            text: 'NIST’s [Guide to Computer Security Log Management](https://nvlpubs.nist.gov/nistpubs/Legacy/SP/nistspecialpublication800-92.pdf) makes a point worth borrowing wholesale: logging is a process to be planned, with defined roles, written logging policies and a routine for analysing what is collected. It also separates ordinary retention from preservation, which is keeping records you would normally discard because they belong to an investigation. Both ideas transfer directly to an AI workflow.',
          },
        ],
      },
      {
        id: 'retention-and-review',
        heading: 'How long should logs be kept, and who reads them?',
        blocks: [
          {
            type: 'p',
            text: 'Two different questions hide inside that one. How long do you keep records, and how often does somebody look at them? The first is partly a legal matter. In India, CERT-In’s [directions of 28 April 2022](https://www.cert-in.org.in/PDF/CERT-In_Directions_70B_28.04.2022.pdf), issued under sub-section (6) of section 70B of the Information Technology Act, 2000, require service providers, intermediaries, data centres, body corporate and government organisations to enable logs of all their ICT systems and maintain them securely for a rolling period of 180 days within Indian jurisdiction, to be provided to CERT-In when an incident is reported or when directed.',
          },
          {
            type: 'note',
            tone: 'caution',
            title: 'General information, not legal advice',
            text: 'How those directions apply to your systems, and what else applies to personal data sitting inside your logs, is a question for your own legal and security advisers. Read the current text rather than a summary of it, including this one. Our guide to [India’s data protection framework](/insights/ai-systems-and-dpdp-india) covers the personal data side.',
          },
          {
            type: 'p',
            text: 'The second question is the one that improves systems. Agree who samples the log, how often, and what they are looking for. Approvals granted in under five seconds, repeated retries, refusals, actions taken at two in the morning and the same customer appearing four times in a week are all worth a second look. Logs about people are themselves sensitive: record what you need, mask what you do not, restrict who can open them and give them a deletion date.',
          },
        ],
      },
      {
        id: 'designing-gates',
        heading: 'How do you design an approval gate people can actually use?',
        blocks: [
          {
            type: 'p',
            text: 'A gate is a decision, not a checkbox. Four settings decide whether it protects the business or merely adds a day to everything.',
          },
          {
            type: 'list',
            items: [
              'The threshold: what crosses the gate. An amount, a customer type, a first-time record, a case the system flagged as uncertain.',
              'The evidence: the original request, the sources used, the proposed action and an honest note on what could not be established.',
              'The response: approve, edit or reject, with a reason captured on rejection so the rules can improve.',
              'The timeout: what happens when nobody answers. Escalate to a named person, or hold and tell someone. Never approve by default.',
            ],
          },
          {
            type: 'p',
            text: 'A request that lands in a shared inbox with nobody’s name on it is not a gate. [Designing the human decision into the workflow](/insights/human-in-the-loop-product-decision) goes deeper into the reviewer’s experience. The point here is that all four settings are decisions you record, rather than defaults you inherit from whichever tool you happen to use.',
          },
        ],
      },
      {
        id: 'thresholds-and-timeouts',
        heading: 'What thresholds and timeouts are sensible at the start?',
        blocks: [
          {
            type: 'p',
            text: 'Start tighter than feels necessary. Approve every case for the first few weeks, however tedious, because that period is what produces the evidence for every threshold you set afterwards. Then loosen one thing at a time and watch the correction rate rather than the volume.',
          },
          {
            type: 'example',
            title: 'Illustrative example: a Chennai consumer brand’s refund approvals',
            text: 'Suppose a brand handles refund requests from its own website and two marketplaces. The system reads the order, the delivery record and the customer’s message, then proposes a refund with the evidence attached. For the first month, a person approves every proposal. After that, refunds up to ₹2,000 on delivered orders with a photograph attached proceed on their own. Anything larger, anything on a disputed delivery and anything from a repeat requester goes to the support lead, who has four working hours before it escalates to the operations head. Bank details stay outside what the system can change. The threshold was not chosen by instinct: it came from a month of approvals in which nobody found a case below ₹2,000 they wanted to refuse.',
          },
          {
            type: 'p',
            text: 'Timeouts deserve the same care as thresholds. Decide what happens overnight, over a weekend and during a festival week when the named reviewer is unreachable. The fallback should be another person, a narrower action or a pause, and it should be written down before the first case reaches it.',
          },
        ],
      },
      {
        id: 'actions-and-controls',
        heading: 'Which controls suit which kind of action?',
        blocks: [
          {
            type: 'p',
            text: 'Actions are not equally consequential, and treating them as though they were produces either paralysis or exposure. Two questions sort them quickly. How large is the effect if it is wrong, and how easily can it be undone? A wrong internal note is trivial. A wrong message to a customer cannot be recalled, however small the sum involved. A wrong payment is both large and hard to reverse.',
          },
          {
            type: 'table',
            caption: 'Action types and the controls that fit them',
            head: ['Action type', 'Example', 'Controls that fit'],
            rows: [
              ['Read and summarise', 'Draft a reply from an enquiry', 'Scoped read access, weekly sample'],
              ['Prepare a draft', 'A quotation or credit note', 'No send rights, evidence attached'],
              ['Update a record', 'Change an order status', 'Field-level limits, full log entry'],
              ['Message a customer', 'Email or a messaging channel', 'Approved templates or a gate'],
              ['Move money', 'Refunds, credit notes, payouts', 'Threshold approval, second reviewer'],
              ['Change master data', 'Bank details, tax numbers, prices', 'No automated change at all'],
            ],
          },
          {
            type: 'p',
            text: 'The OWASP GenAI Security Project reaches a similar conclusion from the security side, advising that consequential actions require user approval and that authorisation be checked in the system being changed rather than left to the model to respect. Use the table as a starting point and then argue with it, because the right line depends on your customers, your regulator and how quickly your team can put a mistake right.',
          },
        ],
      },
      {
        id: 'starting-set',
        heading: 'What is a sensible starting set for one workflow?',
        blocks: [
          {
            type: 'list',
            ordered: true,
            items: [
              'One page naming the system, its owner, its readable sources and its permitted actions.',
              'A service account holding those permissions and nothing else, with a review date.',
              'A log entry per run: inputs, proposed action, decision, approver, outcome and cost.',
              'One gate on the most consequential action, with a named reviewer and a timeout.',
              'A weekly sample of twenty entries, read by the owner, for the first six weeks.',
              'A written rule for what would make you close a gate that you had opened.',
            ],
          },
          {
            type: 'p',
            text: 'All of this is cheap to design in and expensive to retrofit. BYBO treats permissions, evaluations, logs and cost visibility as part of the [Infrastructure & Governance](/systems/ai-infrastructure-governance) foundation rather than a later phase. The measures that tell you whether the arrangement is working are a separate discipline, covered in [how to measure whether an AI system is working](/insights/measure-ai-system-performance).',
          },
        ],
      },
    ],
    limitations: [
      'This is general information, not legal advice. Logging, retention and reporting obligations differ by sector and by the data involved, and they change.',
      'Logs carry their own risk. A detailed record of decisions about customers is sensitive material that needs access limits, masking and a deletion date.',
      'Gates slow work down. Too many of them, or reviewers who are too slow, and people will route around the system entirely, which is the worse outcome.',
      'A permission model describes intent. It becomes true only when somebody checks the settings inside each tool, on a schedule, against what the page claims.',
    ],
    faqs: [
      {
        q: 'What should an AI system log?',
        a: 'Enough for someone who was not there to reconstruct the decision. In practice: the time and the version that ran, what triggered it, the inputs and sources used, the action proposed, the human decision and approver, the outcome including failures, and the cost of the run. Failures matter as much as successes, because a workflow that quietly gives up leaves no trace unless you record it.',
      },
      {
        q: 'How long should we keep AI system logs?',
        a: 'Long enough to answer disputes, and no longer than your obligations and your risk appetite justify. CERT-In directions of April 2022 require a range of organisations to maintain logs of their ICT systems securely for a rolling period of 180 days within Indian jurisdiction. Sector rules, contracts and data protection obligations may point to different periods for different records, so agree retention with your legal and security advisers rather than defaulting to keeping everything forever.',
      },
      {
        q: 'What is an approval gate in an AI workflow?',
        a: 'A point where the system stops and waits for a person before an action takes effect. A working gate has four parts: a threshold that decides which cases stop there, the evidence a reviewer needs, the permitted responses of approve, edit or reject, and a timeout that says what happens when nobody answers. Without the last two it is a queue, not a control.',
      },
      {
        q: 'Who should approve AI actions in a small company?',
        a: 'The person who would approve the same action if a colleague proposed it. Refunds usually sit with a support or accounts lead, purchase commitments with whoever holds that authority today, customer messages with the account owner. Do not invent a new approval hierarchy for AI. Reuse the one the business already trusts, and name a fallback for leave and holidays.',
      },
      {
        q: 'Do we need special software for AI permissions and logs?',
        a: 'Not to start. A page per system for permissions, structured rows written by the workflow for logs, and an approval step in a tool your team already uses will carry a handful of systems a long way. Dedicated tooling earns its place when you have many systems, several teams, or an auditor asking for consistent evidence across all of them.',
      },
    ],
    bybo: [
      {
        href: '/systems/ai-infrastructure-governance',
        label: 'Infrastructure & Governance',
        why: 'Covers access and permissions, evaluation before release, monitoring, costs and incident handling for AI systems.',
      },
      {
        href: '/systems/agentic-operations',
        label: 'Agentic Operations',
        why: 'Shows how permitted actions, approval gates and stop conditions are agreed before a workflow runs.',
      },
      {
        href: '/insights/human-in-the-loop-product-decision',
        label: 'Design the human decision into the workflow',
        why: 'A closer look at the reviewer, the evidence they need and what happens while work waits.',
      },
    ],
    related: ['approval-workflow-design', 'when-ai-should-decide', 'introduce-ai-without-uncontrolled-access'],
    sources: [
      {
        title: 'Directions under sub-section (6) of section 70B of the Information Technology Act, 2000, dated 28 April 2022',
        publisher: 'Indian Computer Emergency Response Team (CERT-In), Ministry of Electronics and Information Technology',
        url: 'https://www.cert-in.org.in/PDF/CERT-In_Directions_70B_28.04.2022.pdf',
      },
      {
        title: 'SP 800-92, Guide to Computer Security Log Management',
        publisher: 'National Institute of Standards and Technology (NIST)',
        url: 'https://nvlpubs.nist.gov/nistpubs/Legacy/SP/nistspecialpublication800-92.pdf',
      },
      {
        title: 'LLM06:2025 Excessive Agency, OWASP Top 10 for LLM Applications',
        publisher: 'OWASP GenAI Security Project',
        url: 'https://genai.owasp.org/llmrisk/llm062025-excessive-agency/',
      },
    ],
  },
  {
    slug: 'measure-ai-system-performance',
    collection: 'governance',
    title: 'How to Measure Whether an AI System Is Actually Working',
    description: 'Measure an AI system on business outcomes: record a baseline first, then track cycle time, first-pass accuracy, exceptions, corrections, reviewer time and cost.',
    dek: 'A model score is not a business result. Measure the work itself: a baseline before launch, then cycle time, corrections, reviewer minutes and cost per completed item.',
    keywords: [
      'measure AI performance',
      'AI system metrics for business',
      'AI return on investment',
      'baseline before AI project',
      'AI quality monitoring',
      'when to roll back an AI system',
    ],
    publishedAt: '2026-09-11',
    visual: {
      kind: 'compare',
      title: 'Model metrics versus business outcomes',
      left: {
        label: 'What the demo measures',
        items: [
          'Accuracy on a curated test set',
          'How quickly it responds',
          'How impressive the output reads',
          'Number of tasks attempted',
          'Enthusiasm in the first week',
        ],
      },
      right: {
        label: 'What the business measures',
        items: [
          'A baseline recorded before launch',
          'Cycle time per completed item',
          'First-pass accuracy and rework',
          'Reviewer minutes per item',
          'Cost per completed item',
        ],
      },
    },
    summary: [
      'Measure completed units of work, not model calls. An invoice posted, an enquiry closed, a report signed off.',
      'Record a baseline over two or three ordinary weeks before launch. Without it, every later number is an assertion.',
      'Watch corrections and exceptions weekly; they move before cycle time and cost do.',
      'Agree the stop conditions before launch, while nobody is invested in the answer.',
    ],
    sections: [
      {
        id: 'scores-versus-outcomes',
        heading: 'Why do model scores rarely answer the business question?',
        blocks: [
          {
            type: 'p',
            text: 'A demonstration usually ends with an accuracy score. It is a real number, carefully produced, and it answers a question your business did not ask. Accurate on which cases, judged by whom, against whose version of the correct answer? A system can score well on a tidy test set and still leave your team doing the same amount of work, because the cases it gets wrong are the ones that take an hour to unpick and a phone call to fix.',
          },
          {
            type: 'p',
            text: 'The [NIST AI Risk Management Framework](https://nvlpubs.nist.gov/nistpubs/ai/NIST.AI.100-1.pdf) states the difficulty plainly: while measuring AI risks in a laboratory or a controlled environment may yield important insights before deployment, those measurements may differ from the risks that emerge in operational, real-world settings. The same applies to benefits. What a system does in a demonstration and what it does on an ordinary Tuesday in your business are two different measurements, and only one of them pays for itself.',
          },
          {
            type: 'note',
            tone: 'insight',
            title: 'The unit is a completed item, not a model call',
            text: 'Measure whole pieces of work: an invoice posted, an enquiry answered and closed, a report signed off. Anything narrower flatters the system by ignoring the work that surrounds it.',
          },
        ],
      },
      {
        id: 'baseline-first',
        heading: 'What should you measure before the system goes live?',
        blocks: [
          {
            type: 'p',
            text: 'The most valuable measurement happens before anything is built, and it is the step most often skipped because it feels like delay. Without a baseline, every later number is an assertion and every review becomes a debate about whose impression is right. With one, the decision to continue, adjust or stop takes ten minutes. Baseline first, review after launch, is why the diagnosis stage of [how we work](/how-we-work) exists at all.',
          },
          {
            type: 'p',
            text: 'Spend two or three ordinary weeks recording the work as it is, including a busy one. A baseline drawn from a quiet fortnight will make the system look worse than it is the moment volumes rise.',
          },
          {
            type: 'list',
            items: [
              'Volume: how many items arrive in a week, and how that changes with the season.',
              'Time: minutes of actual work per item, and hours of waiting between steps.',
              'Touches: how many people handle one item before it is finished.',
              'Rework: how often something is corrected, returned or done twice, and why.',
              'Cost: salary time plus the tools involved, expressed per completed item.',
              'Failure: how often an item is lost, late or escalated to a manager.',
            ],
          },
          {
            type: 'p',
            text: 'NIST makes a related point about comparison: managing the risk of systems meant to augment or replace human activity requires some form of baseline for comparison, and that is difficult to systematise because an AI system performs the task differently from a person. That is an argument for measuring the workflow end to end rather than staging a contest between a colleague and a model.',
          },
        ],
      },
      {
        id: 'measures-that-matter',
        heading: 'Which measures actually tell you whether it is working?',
        blocks: [
          {
            type: 'p',
            text: 'Seven measures cover most business workflows. Track all of them together, because each one can be improved at the expense of another by a team that means well.',
          },
          {
            type: 'table',
            caption: 'Seven measures worth tracking',
            head: ['Measure', 'What it tells you', 'What to watch'],
            rows: [
              ['Cycle time', 'Arrival to finished, in hours', 'Faster drafts, slower approvals'],
              ['First-pass accuracy', 'Share needing no correction', 'Reviewers approving without reading'],
              ['Exception rate', 'Share handed back to people', 'A low rate can mean overconfidence'],
              ['Correction rate', 'How often reviewers edit output', 'Small edits recorded as approvals'],
              ['Reviewer time', 'Minutes a person spends per item', 'Work moved rather than removed'],
              ['Cost per completed item', 'What one finished unit costs', 'Retries, long inputs, rising volume'],
              ['Customer effect', 'Reply time, complaints, repeat contact', 'Quick replies that resolve nothing'],
            ],
          },
          {
            type: 'p',
            text: 'Write down the definition of each measure before you start. The argument about whether cycle time includes the customer’s own delay will otherwise arrive on the day the numbers are inconvenient. Agreed definitions with the evidence behind them are the substance of [Decision Intelligence](/systems/decision-intelligence) work, and the same discipline applies to measuring the AI system itself. Cost deserves particular care, because usage-based bills move quietly; [keeping operating costs visible](/insights/control-ai-operating-costs) is a discipline of its own.',
          },
        ],
      },
      {
        id: 'sampling-and-cadence',
        heading: 'How much should you check, and how often?',
        blocks: [
          {
            type: 'p',
            text: 'You cannot review everything, and reviewing nothing is how a slow decline goes unnoticed for a quarter. A sample works if it is drawn honestly: a fixed number of items a week, chosen at random rather than by the person hoping for a good result, plus every exception and every correction. Those last two are not a sample. They are the complete record of where the system struggles, and they are the most useful reading in the business.',
          },
          {
            type: 'p',
            text: 'Weekly for the first six weeks, monthly after that, is a reasonable rhythm. Thirty minutes inside a meeting that already happens beats a new committee. One named person owns the numbers and brings them. Occasionally have a second reviewer check a handful of approved items, because reviewers drift too, especially when the output is usually right.',
          },
          {
            type: 'example',
            title: 'Illustrative example: a Jaipur exporter’s enquiry desk',
            text: 'Suppose an exporter receives about 60 enquiries a week. A baseline fortnight shows 14 minutes of work per enquiry, an average of nine working hours before the first useful reply, and one enquiry in eight needing a second round because a specification was missed. Three months after launch, reviewer time is 6 minutes per enquiry and first replies take two working hours. The second-round rate has moved only to one in nine. The time saved is real and worth keeping. The quality problem was never a speed problem: the missing specifications need to be asked for at the point of enquiry, which is a change to the enquiry form and the sales script rather than anything a better model would fix.',
          },
        ],
      },
      {
        id: 'leading-and-lagging',
        heading: 'Which signals warn you early, and which confirm the result?',
        blocks: [
          {
            type: 'p',
            text: 'Two kinds of number are worth separating. Leading indicators move first and tell you something is changing. Lagging indicators confirm what the change was worth. Teams that watch only the second kind find out a quarter late.',
          },
          {
            type: 'list',
            items: [
              'Leading: correction rate, exception rate, retries and timeouts, unusually long inputs, reviewers overriding the same suggestion, a shift in the mix of cases arriving.',
              'Lagging: cycle time, first-pass accuracy over a month, cost per completed item, complaints, and the business outcome the workflow exists to serve.',
            ],
          },
          {
            type: 'p',
            text: 'Read trends rather than single weeks. At low volumes, one difficult customer can move a weekly figure enough to start an unnecessary project. When something does move, check the dull explanations first: the mix of incoming work changed, a connected tool changed, the model version was updated by your provider, a new person joined the review rota, or the process itself changed and nobody told the system’s owner.',
          },
        ],
      },
      {
        id: 'stop-or-roll-back',
        heading: 'When should you narrow, roll back or switch it off?',
        blocks: [
          {
            type: 'p',
            text: 'Agree the stop conditions before launch, while nobody has anything invested in the answer. The NIST framework asks for mechanisms, applied and understood, with responsibilities assigned, to supersede, disengage or deactivate AI systems that show performance or outcomes inconsistent with their intended use. In a company of forty people that is one paragraph on the system’s page and one name beside it.',
          },
          {
            type: 'list',
            ordered: true,
            items: [
              'First-pass accuracy falls below the level the business owner agreed, for two reviews running.',
              'A customer is harmed, or a mistake reaches a regulator, an auditor or the public.',
              'Cost per completed item rises above what the manual process cost.',
              'Reviewer time per item is not falling, three months in, once the novelty has gone.',
              'The workflow itself has changed enough that the system is answering last year’s question.',
            ],
          },
          {
            type: 'p',
            text: 'Narrowing is usually better than switching off: put the gate back, reduce the scope to the cases it handles well, and keep the rest with people. Either way, keep the cases that triggered the decision and add them to your evaluation set, which is the subject of [evaluating AI quality using real business cases](/insights/evaluate-ai-quality-real-cases). A rollback with evidence is a cheaper outcome than a system nobody trusts and nobody stops.',
          },
        ],
      },
      {
        id: 'reporting',
        heading: 'How should any of this be reported to the business?',
        blocks: [
          {
            type: 'p',
            text: 'One page a month, in the same shape every month. The baseline, the current figure and the direction of travel for each measure. Cost per completed item. Incidents, corrections and what was done about them. Decisions taken, with names against them. Anyone should be able to read it in three minutes and know whether to be pleased.',
          },
          {
            type: 'p',
            text: 'Leave out model names, token counts and anything that cannot be tied to work getting done. Organisations that want a formal version of this loop can look at [ISO/IEC 42001](https://www.iso.org/standard/42001), which sets requirements for establishing, implementing, maintaining and continually improving an AI management system. The monthly page is the small, honest version of the same idea, and for most growing businesses it is the version that gets read.',
          },
        ],
      },
    ],
    limitations: [
      'Measurement costs effort of its own. A weekly review nobody attends produces numbers nobody trusts, so measure fewer things properly rather than everything badly.',
      'Small volumes are noisy. Below a few dozen items a week, monthly figures and case-by-case reading will tell you more than any weekly dashboard.',
      'Numbers miss things that matter. Whether the team trusts the output, and whether the work has become less tedious, appears in conversation long before it appears in a measure.',
      'Attribution is rarely clean. Seasonality, staff changes, a pricing change or a new process can move the same figures, which is why the baseline and a record of changes both matter.',
    ],
    faqs: [
      {
        q: 'How do you measure the return on an AI system?',
        a: 'Compare the cost of a completed unit of work before and after, using the baseline you recorded. Include everything: model and platform charges, integration and maintenance, and the minutes people still spend reviewing and correcting. Then decide honestly what the system caused and what other changes caused. A payback claim that ignores reviewer time, or credits the system with a busy quarter, will not survive its first serious question.',
      },
      {
        q: 'What metrics should we track for an AI workflow?',
        a: 'Seven cover most cases: cycle time per item, first-pass accuracy, exception rate, correction rate, reviewer minutes per item, cost per completed item, and a customer-facing measure such as reply time or complaints. Track them together. Any one of them can be improved at the expense of another, and a system that halves drafting time while doubling approval time has not helped anybody.',
      },
      {
        q: 'What is a good accuracy level for a business AI system?',
        a: 'It depends entirely on the consequence of an error and on what the current process achieves. A drafting assistant that is right nine times in ten may be useful, because a person reads everything anyway. The same rate on payments or on customer commitments would be unacceptable. Set the level with the business owner against the measured baseline, and write down what the system should do when it is unsure.',
      },
      {
        q: 'How often should we review an AI system after launch?',
        a: 'Weekly for the first six weeks, then monthly once the figures settle. Read every exception and every correction each time, plus a random sample of ordinary items. Book it into a meeting that already exists and give one person the job of bringing the numbers. Reviews that depend on someone finding spare time quietly stop happening around the second month.',
      },
      {
        q: 'When should we switch off an AI system?',
        a: 'When it stops meeting the conditions you agreed before launch: accuracy below the agreed level across two reviews, a customer harmed, cost per item above the manual baseline, reviewer time that is not falling, or a workflow that has changed underneath it. Narrowing the scope is often the better move. Whichever you choose, keep the cases that prompted it for the next evaluation.',
      },
    ],
    bybo: [
      {
        href: '/how-we-work',
        label: 'How we work',
        why: 'Baseline measures, named owners and review after launch are built into BYBO’s delivery sequence.',
      },
      {
        href: '/systems/decision-intelligence',
        label: 'Decision Intelligence',
        why: 'Agreed definitions, checked data and the evidence behind each number, so reviews argue about decisions.',
      },
      {
        href: '/systems/ai-infrastructure-governance',
        label: 'Infrastructure & Governance',
        why: 'Evaluation, monitoring, cost visibility and incident response for systems already running.',
      },
    ],
    related: ['evaluate-ai-quality-real-cases', 'spreadsheet-reporting-to-decision-intelligence', 'ai-pilots-to-working-systems'],
    sources: [
      {
        title: 'Artificial Intelligence Risk Management Framework (AI RMF 1.0)',
        publisher: 'National Institute of Standards and Technology (NIST)',
        url: 'https://nvlpubs.nist.gov/nistpubs/ai/NIST.AI.100-1.pdf',
      },
      {
        title: 'ISO/IEC 42001:2023 — AI management systems',
        publisher: 'International Organization for Standardization (ISO)',
        url: 'https://www.iso.org/standard/42001',
      },
    ],
  },
];

export default guides;
