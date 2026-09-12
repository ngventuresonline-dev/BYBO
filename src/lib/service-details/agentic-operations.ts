import type { ServiceDetail } from './types';

const detail: ServiceDetail = {
  slug: 'agentic-operations',
  overview: {
    heading: 'What this system does',
    paragraphs: [
      'Some work is not one task but a sequence: a customer is signed, and then eight things must happen across four teams and three tools before anyone can invoice. Nothing in it is hard. It is slow because each step waits for a person to notice it. This system carries that work from request to resolution, doing the permitted steps itself and stopping at the ones that need a decision.',
      'An agent here is a bounded worker, not a general assistant. It has a defined role, a list of tools it may use, the data it may read, the actions it may take and a point at which it must stop and ask. Given a trigger, it works out the next permitted step, gathers context, prepares the action and either performs it or presents it for approval with the evidence attached.',
      'What stays with people is every consequential decision: money, commitments, anything a customer sees, anything hard to undo. Your team stops chasing status and starts approving prepared work. When something fails it is recorded and escalated rather than retried in silence, so a stuck case is visible on the day it sticks.',
    ],
  },
  audience: {
    heading: 'Signs this fits your business',
    items: [
      'A single order touches four teams, and the delay is almost entirely waiting rather than working.',
      'Your team lives in a chase: emails asking whether the check was done, the file sent, the customer answered.',
      'The same reconciliation happens every month, and most of the effort is gathering evidence before the judgement.',
      'Work is tracked in a spreadsheet nobody trusts, so status meetings exist to find out what is stuck.',
      'You already automated a few steps, but they break at the handoffs where one tool has to talk to another.',
    ],
  },
  deliverables: {
    heading: 'What you receive',
    items: [
      {
        title: 'One bounded workflow, running',
        body: 'A named workflow from trigger to resolution, each step defined and each connection agreed. Not a demonstration — something carrying real cases on the day it launches.',
      },
      {
        title: 'A permissions and limits sheet',
        body: 'A written statement of what the agent may read, which tools it may use, which actions it may take alone, what needs approval and when it must stop.',
      },
      {
        title: 'An approval queue with context',
        body: 'A place where the owner of a decision sees the prepared action, the evidence behind it and what follows if they approve, reject or send it back.',
      },
      {
        title: 'Failure handling you agreed in advance',
        body: 'Retry limits, timeouts, escalation paths and a stop control. A step that cannot complete is recorded and routed to a person, never dropped quietly.',
      },
      {
        title: 'Logs, a dashboard and documentation',
        body: 'A record of every case and action, a view of completion time and manual touches, and written operating notes for the people who run it.',
      },
    ],
  },
  process: {
    heading: 'How the work runs',
    items: [
      {
        title: '1. Trigger',
        body: 'We agree what starts a case: a form, an email, a record created in your CRM, a scheduled check. Each trigger is registered, so a case can be traced to its origin.',
      },
      {
        title: '2. Plan',
        body: 'The agent chooses the next step from the permitted set, based on the state of the work. It cannot invent a step outside that set, and unfamiliar situations route to a person.',
      },
      {
        title: '3. Prepare',
        body: 'It gathers the context the action needs — the order, the account history, the document — and drafts the action, so nothing waits on someone assembling facts.',
      },
      {
        title: '4. Approve',
        body: 'Consequential actions go to the named owner with the reasoning and evidence attached. Routine actions inside the agreed limits proceed without a queue, because approving everything is the same as approving nothing.',
      },
      {
        title: '5. Act and log',
        body: 'The approved action runs against the connected tool and the result is recorded: what was done, by whom, with what data. Failures escalate by the rules you set.',
      },
    ],
  },
  connects: {
    heading: 'What it connects to',
    body: 'Every connection is scoped to the narrowest access the workflow needs, granted by whoever owns that system, and tested on sample cases before it touches live records.',
    items: [
      'Your CRM or sales system, for the account and order context a step depends on',
      'Your accounting or ERP system, where the financial side of a case is recorded',
      'Email and messaging, for notifications, approvals and the trail of what was sent',
      'Task and ticket trackers, so work stays visible where your team looks',
      'Document storage, when a step produces or requires a file',
    ],
  },
  bring: {
    heading: 'What we need from you',
    items: [
      'One recurring workflow, described as it really runs today rather than as the diagram says.',
      'A set of past cases, including the awkward ones that went wrong or needed an exception.',
      'The decision rules and limits: what may proceed automatically, what must be approved, and by whom.',
      'A named owner, with authority to change a rule when the evidence says it is wrong.',
      'A baseline: how long a case takes end to end today and how many manual touches it needs.',
    ],
  },
  cost: {
    heading: 'What drives the cost',
    paragraphs: [
      'BYBO publishes no prices. What a workflow costs depends on how many steps it carries and how many systems it touches, so we agree scope and fee in writing before paid work begins. The first conversation costs nothing. Most engagements begin with the [Blueprint](/blueprint), a paid diagnostic ending in a recommendation and a 90-day roadmap.',
      'There is the cost of designing and building the workflow, and the cost of running it: the processing, the monitoring and the attention it takes when something fails. The second is easy to underestimate, so we set it out before you commit. [The cost guide](/insights/business-automation-cost-india) explains how the arithmetic tends to work.',
    ],
    drivers: [
      'The number of steps in the workflow and how many of them branch',
      'How many systems it must reach, and whether each offers a usable interface',
      'How much approval the work needs, since every gate must be designed carefully',
      'The cost of a mistake, which decides how much testing is justified',
      'Case volume, which drives the running cost month after month',
    ],
  },
  measure: {
    heading: 'How it is judged',
    body: 'We record how the workflow performs today before building anything, then compare the same measures after launch and at each review point.',
    items: [
      'End-to-end completion time, from trigger to resolution',
      'Manual touches per case, usually the number that moves first',
      'Exception resolution time, and how many cases become exceptions',
      'Cost per completed workflow, including the approval time it consumes',
    ],
  },
  control: {
    heading: 'Where a person decides',
    body: 'Money, commitments and sensitive changes stay behind agreed approval gates. Those gates are written down before the system runs, not discovered afterwards: a value above which every payment is seen, any message that reaches a customer, any change to a contract or a personal record. Alongside them sit the limits — how many actions in a period, how much may be committed, how many retries before it stops. There is always a control that halts the workflow, and someone whose job it is to use it. We write about the design of these gates in [permissions, logs and approval gates](/insights/ai-permissions-logs-approval-gates).',
  },
  faqs: [
    {
      q: 'How is this different from the automation rules we already have?',
      a: 'Rule-based automation follows a fixed path and breaks when a case does not fit. This handles the variation between cases — reading the context, choosing among permitted steps, preparing an action for judgement — while staying inside limits you set. Where a simple rule would do the job, we say so and recommend the simpler thing.',
    },
    {
      q: 'What if it takes an action we did not want?',
      a: 'It can only take actions on the permitted list, so the risk is a permitted action taken in the wrong case rather than something unexpected. Every action is logged with the reasoning and the data behind it, so it can be found and reversed where the connected system allows. Repeated misjudgements become a tightened rule or a new approval gate.',
    },
    {
      q: 'Can we stop it, and how quickly?',
      a: 'Yes. A stop control is part of every build, and it halts new cases immediately while leaving in-flight work visible rather than half-finished. Individual steps can be paused too. We test the stop before launch, because a control nobody has tried is not a control.',
    },
    {
      q: 'What happens to our data as it moves between tools?',
      a: 'The workflow reads and writes only what its steps need, under access your system owners grant. Where data is processed and how long records are kept is written into the scope. If a step would move sensitive information somewhere it should not go, that is a design decision we raise before building, not afterwards.',
    },
    {
      q: 'Does this need our documents to be in order first?',
      a: 'Not necessarily, though it helps. If a workflow depends on reading invoices or delivery notes, that reading may itself need [document handling](/systems/document-multimodal-intelligence) before the workflow can run reliably. The Blueprint identifies dependencies like this, so you are not surprised by a second build halfway through the first.',
    },
    {
      q: 'What is the first step?',
      a: 'A conversation about the workflow that costs you the most in waiting. If it looks suitable, a Blueprint examines real cases, sets a baseline and ends with a recommendation and a 90-day roadmap. You can also [start an enquiry](/apply?system=agentic-operations) describing the workflow you have in mind.',
    },
  ],
  reading: [
    'agentic-workflows-between-teams',
    'approval-workflow-design',
    'when-ai-workflows-go-wrong',
  ],
};

export default detail;
