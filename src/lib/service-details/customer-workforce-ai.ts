import type { ServiceDetail } from './types';

const detail: ServiceDetail = {
  slug: 'customer-workforce-ai',
  overview: {
    heading: 'Everyday questions, answered from what you have approved',
    paragraphs: [
      'Every business has a layer of routine conversation: where is my order, can I move the appointment, what does the warranty cover, which form do I need. It arrives by email, WhatsApp, phone and the website form, and it competes with the work your team was hired to do. This system handles that layer from information you have approved, and hands the rest to a person.',
      'BYBO builds the part between the message arriving and the next step happening. The system reads the request, finds the relevant approved information, drafts or sends a response in your tone, takes the permitted action — a booking, a status update, a ticket — and records the outcome. Where the request is sensitive, unclear or involves a commitment, it stops and routes it.',
      'People keep the conversations that need judgement. A complaint, a pricing exception, a customer in difficulty, an employee question about their own terms: these reach a trained person with the history attached, not a cold transfer. Your team also owns the source information the system answers from, so what it says changes when your policy changes, not before.',
    ],
  },
  audience: {
    heading: 'This tends to fit when',
    intro: 'The signals are usually about volume and repetition rather than difficulty.',
    items: [
      'The same fifteen questions arrive every day and each is answered from scratch.',
      'Enquiries land in four places — a shared inbox, WhatsApp, a form and the phone — and nobody has one list of them.',
      'Good enquiries go cold at the weekend or overnight because there is no one to answer.',
      'Two people give different answers to the same question, and both believe they are right.',
      'Bookings and follow-ups depend on somebody remembering, and sometimes nobody does.',
    ],
  },
  deliverables: {
    heading: 'What you receive',
    items: [
      { title: 'A connected enquiry workflow', body: 'One path from the message arriving on any agreed channel, through understanding and response, to a recorded outcome and next step with an owner.' },
      { title: 'An approved answer source', body: 'The policies, prices, service terms and standard replies the system may answer from, with a named owner and a refresh schedule for each.' },
      { title: 'Escalation rules and a handover view', body: 'Written rules for what must reach a person, and a view that gives them the conversation, the customer record and what was already said.' },
      { title: 'An evaluation set of real conversations', body: 'Past enquiries, including the difficult ones, used to check response quality before launch and after every change to the rules.' },
      { title: 'Logs, a dashboard and training', body: 'Every conversation is inspectable, with volumes, escalations and outcomes on one view, plus training for the team who will supervise it.' },
    ],
  },
  process: {
    heading: 'How the work runs',
    intro: 'The workflow mirrors the shape of a real conversation, from arrival to follow-up.',
    items: [
      { title: 'Enquiry', body: 'We agree the channels the system covers and how each message reaches it. Anything outside those channels keeps working exactly as it does today.' },
      { title: 'Understand', body: 'The system captures what is being asked and the context around it: who the person is, what they bought, what happened last time. Missing context is asked for rather than assumed.' },
      { title: 'Respond', body: 'It answers from approved information only, in your tone, and says it does not know instead of inventing. Permitted actions such as a booking or a status update happen here.' },
      { title: 'Escalate', body: 'Sensitive, unclear and high-impact cases go to a trained person with the full thread attached. The escalation rules are yours and can be changed in a day.' },
      { title: 'Follow up', body: 'The outcome is recorded against the customer or the ticket, and the next step gets a date and an owner, so nothing depends on memory.' },
    ],
  },
  connects: {
    heading: 'What it connects to',
    body: 'Each channel and system is connected under permissions you agree first, and the system can only take the specific actions you have listed.',
    items: [
      'Your website forms, shared inboxes and messaging channels',
      'Your CRM or customer records, for history and contact details',
      'Your booking, scheduling or field service system',
      'Your helpdesk or ticketing tool, so escalations land where your team already works',
      'Your internal policy and knowledge sources, as the approved answer set',
    ],
  },
  bring: {
    heading: 'What you need to provide',
    items: [
      'A few hundred real past enquiries, including complaints and edge cases.',
      'The approved answers: policies, prices, service terms and what may never be promised.',
      'A named owner for the answer source, responsible for keeping it current.',
      'Access to the channels and systems the workflow touches.',
      'A baseline: current response times, volumes and how many enquiries go unanswered.',
    ],
  },
  cost: {
    heading: 'What drives the cost',
    paragraphs: [
      'BYBO publishes no prices. Scope and fee are agreed in writing before any paid work begins, and the first conversation is free. If you are not sure whether this is the right first system, the Blueprint is a paid diagnostic that ends in a recommendation and a 90-day roadmap.',
      'Build cost is driven mostly by channels and languages: each one adds testing, not just configuration. Running cost is driven by conversation volume and by the channel providers themselves, whose charges sit outside our fee and are shown separately in the operating plan. [The cost guide](/insights/business-automation-cost-india) sets out how to compare that against what the work costs you today.',
    ],
    drivers: [
      'How many channels the system covers, and whether voice is one of them',
      'The number of languages, each of which needs its own testing',
      'The state of your approved information, and how much has to be written down first',
      'How many actions it may take, rather than only draft, and the checks around them',
      'Conversation volume, which drives running cost and channel provider charges',
    ],
  },
  measure: {
    heading: 'How it is judged',
    body: 'We take a baseline from your current process first, then review the same measures after launch rather than counting messages handled.',
    items: [
      'Time to first useful response, not first automatic reply',
      'Resolution rate: enquiries closed without a person having to redo them',
      'Escalation quality: whether the right cases reached a person, with enough context',
      'Booking or follow-up completion against the agreed next step',
      'Review feedback from the team supervising the conversations',
    ],
  },
  control: {
    heading: 'Where a person decides',
    body: 'Sensitive conversations and commitments go to a person, with the context attached. That covers complaints, pricing exceptions, anything contractual, and any case where the system is not confident. You set those rules and can widen them at any time — many businesses start with the system drafting every reply for a person to send, then relax that once the evaluation results give them reason to.',
  },
  faqs: [
    { q: 'Will customers be told they are talking to a system?', a: 'Yes. We do not build systems that pretend to be a named colleague. The opening makes it clear what the customer is dealing with and how to reach a person, which in our experience reduces frustration rather than adding it. The tone is still yours, and the route to a human is always one message away.' },
    { q: 'What stops it inventing an answer?', a: 'It answers only from the information you approve, and is built to say it does not know and pass the enquiry on. Anything involving a price exception, a date it cannot verify or a commitment is routed to a person by rule. Real conversations are used to test this before launch and after each change.' },
    { q: 'What happens if it gets something wrong with a customer?', a: 'Every conversation is logged, so you can see exactly what was said. The case goes to a named owner, the wrong answer is corrected at its source, and the conversation joins the evaluation set so the same mistake is checked for at each release. Where the risk is high, that category moves behind a person.' },
    { q: 'How do you handle personal customer data?', a: 'The system reads only the fields the workflow needs, under permissions agreed in writing, and every access is recorded. Data stays in systems you own. We work to the least access that lets the workflow run, and review it as responsibilities change. Our [privacy page](/privacy) covers how BYBO handles what we see.' },
    { q: 'Can it work on WhatsApp, voice or in more than one language?', a: 'Each of those is a scoping decision rather than a switch. Channels need provider access and their own testing; languages need their own evaluation set, because a phrase that reads well in one may not in another. We start with the channel that carries most of your volume and add from there.' },
    { q: 'What is the first step?', a: 'A free conversation about where enquiries arrive and what happens to them now. If it looks worth building, we usually start narrow: one channel, one set of questions, with a person approving replies. You can begin at [apply](/apply?system=customer-workforce-ai) or read [how we work](/how-we-work) first.' },
  ],
  reading: ['automate-customer-enquiries', 'human-in-the-loop-product-decision', 'when-ai-workflows-go-wrong'],
};

export default detail;
