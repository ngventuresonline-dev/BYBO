import type { Guide } from '../types';

const guides: Guide[] = [
  {
    slug: 'automate-customer-enquiries',
    collection: 'business-operations',
    title: 'How to Automate Customer Enquiries Without Losing the Human Touch',
    seoTitle: 'Automate Customer Enquiries Without Losing the Human Touch',
    description:
      'What to automate in customer enquiries across WhatsApp, email, calls and web forms, what to keep with people, and how to hand over without losing context.',
    dek:
      'To automate customer enquiries well, let the system capture, acknowledge, qualify and route. Keep judgement, empathy and commitments with people, and design the handover so no customer has to repeat themselves.',
    keywords: [
      'automate customer enquiries',
      'WhatsApp Business automation',
      'enquiry management system',
      'chatbot to human handoff',
      'AI customer support India',
      'lead qualification automation',
    ],
    publishedAt: '2026-09-11',
    visual: {
      kind: 'spectrum',
      title: 'From automatic reply to personal attention',
      from: 'Handled automatically',
      to: 'Handled by a person',
      stops: [
        { label: 'Capture and acknowledge', note: 'Every enquiry, every channel, with a next step' },
        { label: 'Approved answers', note: 'Hours, order status, published prices, documents needed' },
        { label: 'Draft for approval', note: 'Quotations, custom requests and delivery dates' },
        { label: 'Personal handover', note: 'Complaints, sensitive matters, high-value conversations' },
      ],
    },
    summary: [
      'Automate the clerical work around an enquiry: capture, acknowledge, qualify, draft, route, schedule the follow-up and record the outcome.',
      'Keep complaints, sensitive matters, commitments and high-value conversations with a named person, and make reaching that person easy.',
      'Answer only from approved, owned sources. When no approved answer exists, the system should say so and hand over.',
      'Judge success by time to first useful response, resolution, follow-up completion and whether customers had to repeat themselves.',
    ],
    sections: [
      {
        id: 'where-enquiries-get-lost',
        heading: 'Where do customer enquiries actually get lost?',
        blocks: [
          {
            type: 'p',
            text: 'An enquiry rarely fails because the reply was badly worded. It fails in the gaps. A WhatsApp message arrives at 9.40 pm and sits on one salesperson’s phone. A web form lands in an inbox nobody checks on Saturdays. A caller is promised a callback that no one writes down. By the time someone replies, the customer has asked somebody else.',
          },
          {
            type: 'table',
            caption: 'Each channel slips in its own way',
            head: ['Channel', 'What arrives', 'Where it slips'],
            rows: [
              ['WhatsApp', 'Short messages, photos, voice notes', 'On one person’s phone'],
              ['Email', 'Detail and attachments', 'Buried in a shared inbox'],
              ['Phone', 'Urgent questions, missed calls', 'In someone’s memory'],
              ['Web forms', 'Structured details', 'In an unwatched mailbox'],
              ['Marketplaces', 'Leads in a separate dashboard', 'Checked when someone remembers'],
            ],
          },
          {
            type: 'p',
            text: 'That is the part worth automating. When you automate customer enquiries well, you do not replace the conversation. You take over the clerical work around it, so every enquiry is captured, acknowledged and put in front of the right person, details already gathered. The human touch was never about a person typing every message. It is a customer feeling recognised, understood and looked after. Automation can help with the first two. The third needs people at the right moments.',
          },
        ],
      },
      {
        id: 'what-to-automate',
        heading: 'Which parts of customer enquiries can you automate?',
        blocks: [
          {
            type: 'p',
            text: 'Break an enquiry into the jobs your team does around it. Most simply get the enquiry into shape and repeat with little variation. These are the safest to hand to a system:',
          },
          {
            type: 'list',
            ordered: true,
            items: [
              'Capture: pull every channel into one record per customer, with their words, contact details, channel and time.',
              'Acknowledge: confirm receipt within minutes and say what happens next, and by when.',
              'Qualify: ask the two or three questions your team always asks, such as location, quantity or preferred date. Never ask for something the customer has already given.',
              'Draft: prepare a reply from approved information, to send or for a person to check.',
              'Route: send the enquiry to the right person by product, region, language, value or urgency.',
              'Schedule: create the follow-up with a date and an owner, and remind the owner before it slips.',
              'Record: log what was asked, answered and promised, and how it ended.',
            ],
          },
          {
            type: 'note',
            tone: 'insight',
            title: 'Acknowledge with a time, not a promise',
            text: '“We will get back to you shortly” tells the customer nothing. “Thanks, Meera. Rahul from our Pune office will call you before 11 am tomorrow” tells her who, how and when. It also gives Rahul a deadline the system can track.',
          },
          {
            type: 'p',
            text: 'Night and holiday enquiries benefit most. Instead of a pile of unread messages, the team starts the morning with a sorted queue.',
          },
        ],
      },
      {
        id: 'what-stays-with-people',
        heading: 'Which conversations should always reach a person?',
        blocks: [
          {
            type: 'p',
            text: 'Some conversations need someone who can take responsibility, read the mood and make a call. Write these down as rules, not instinct, so the system hands over early, not after three unhelpful replies:',
          },
          {
            type: 'list',
            items: [
              'Complaints, especially from anyone who has already written more than once.',
              'Sensitive matters: health, money trouble, a bereavement, a dispute or anything personal.',
              'High-value or strategic enquiries, such as a large order or a new distributor.',
              'Commitments and exceptions: discounts, non-standard delivery dates, refunds outside policy.',
              'Anything the system cannot classify confidently or is not approved to handle.',
              'Anyone who asks for a person.',
            ],
          },
          {
            type: 'p',
            text: 'The last rule is more than good manners. On the WhatsApp Business Platform, the [Business Messaging Policy](https://whatsappbusiness.com/policy/) allows automated replies but requires prompt, clear and direct routes to a person, such as an in-chat transfer, a phone number, an email address or a support form. Make that route obvious in every conversation. If a customer cannot find the way out, you may never hear why they stopped replying.',
          },
        ],
      },
      {
        id: 'approved-answers-only',
        heading: 'Why should automated replies use only approved answers?',
        blocks: [
          {
            type: 'p',
            text: 'An automated reply speaks for your business. Prices, stock, delivery times and policy terms should come only from sources someone owns and keeps current: the price list, the catalogue, the returns policy, the booking calendar. If the price list changes on the first of the month, the answers should change that day.',
          },
          {
            type: 'p',
            text: 'Give each type of question one of three paths. Send automatically when the answer is routine, approved and low-risk. Draft for approval when it carries a consequence, such as a quotation. Hand over when it needs judgement or has no approved answer. A missing answer should produce “let me bring in a colleague”, never a plausible guess; a guess that reads well is the most dangerous output. The same discipline runs through our [Customer & Workforce AI](/systems/customer-workforce-ai) work: every answer starts from approved information, and commitments go to a person.',
          },
          {
            type: 'example',
            title: 'Illustrative example: a Jaipur furniture workshop’s WhatsApp enquiries',
            text: 'Suppose a furniture workshop in Jaipur gets most of its enquiries on WhatsApp, many after 9 pm. A customer sends a photo of a dining table and asks, in a mix of Hindi and English, for the same design as an eight-seater in sheesham, delivered to Pune. The system replies in the same register, asks for the room size and delivery pin code, and shares the nearest catalogue design at its listed price, marked as the standard size. It does not quote the custom piece or promise a date; both depend on the workshop’s order book. It tells her the sales lead will call by noon and hands him a summary: photo, size, wood, destination, catalogue match, her language and the promised call time. He opens the call with the table, not with “How can I help?”',
          },
        ],
      },
      {
        id: 'handoff-design',
        heading: 'How do you hand over without making the customer repeat themselves?',
        blocks: [
          {
            type: 'p',
            text: 'The handover is where automation earns trust or loses it. The customer has already explained what they want. If the person who picks up opens with “How can I help you?”, the automation has made things worse. Every handover should carry a short packet:',
          },
          {
            type: 'list',
            items: [
              'A two-line summary of what the customer wants.',
              'The full conversation, with photos, voice notes and attachments.',
              'Answers to the qualifying questions.',
              'Anything already said or promised, and when.',
              'Why it was handed over: complaint, value, low confidence, sensitivity or a direct request.',
              'The customer’s language and preferred channel.',
            ],
          },
          {
            type: 'p',
            text: 'Tell the customer who will pick it up, roughly when and on which channel, and continue where they started. Moving a WhatsApp conversation to email without a reason feels like starting again. Then decide what happens if nobody picks it up: a response expectation, a backup owner and an alert before the customer notices the silence. [Design the human decision into the workflow](/insights/human-in-the-loop-product-decision) covers the reviewer’s side.',
          },
        ],
      },
      {
        id: 'tone-and-language',
        heading: 'How should automated replies sound in a multilingual market?',
        blocks: [
          {
            type: 'p',
            text: 'Many customers write the way they speak: Hindi or Tamil in Roman script, English mixed with a regional language, a voice note instead of text. A stiff, formal English reply to a message in Hinglish reads like a form letter. Decide which languages you will support, and test each one with real messages from your own customers, including the messy ones.',
          },
          {
            type: 'list',
            items: [
              'Reply in the customer’s language only where you have tested it; otherwise, say which languages you support and offer a person.',
              'Say it is an automated assistant. Do not give it a human name and pretend.',
              'Keep WhatsApp replies short. Put detail in a document or an email.',
              'One clear next step is warmer than three sentences of apology.',
              'Match your brand. A jeweller and a freight forwarder should not sound alike.',
            ],
          },
          {
            type: 'note',
            tone: 'caution',
            title: 'Translation is not approval',
            text: 'An answer approved in English is not automatically right in Marathi or Kannada. Terms like “refundable”, “warranty” and “booking amount” can shift in translation. Ask a fluent colleague to review the key answers in every language you support.',
          },
        ],
      },
      {
        id: 'follow-ups-and-personal-data',
        heading: 'What rules apply to follow-ups and customer data?',
        blocks: [
          {
            type: 'p',
            text: 'Follow-up is where automation turns into pestering. On WhatsApp, the [Business Messaging Policy](https://whatsappbusiness.com/policy/) lets you contact people only if they have given you their number and opted in. On the Business Platform, free-form replies are allowed within 24 hours of the customer’s last message; after that, you need an approved message template. You must also respect every request to stop. So the day-three “checking in on your quote” message is a template prepared in advance, and never goes to someone who has said no. Customers can block or report you, and a quality tier that stays low limits your messaging.',
          },
          {
            type: 'p',
            text: 'If follow-ups go out by SMS or phone, TRAI’s [commercial communication regulations (TCCCPR, 2018)](https://trai.gov.in/tcccpr) cover registration of senders, headers and message templates, consent and customer preferences. Ask your messaging provider how your messages are registered before you schedule anything.',
          },
          {
            type: 'p',
            text: 'Enquiries also carry personal data, sometimes sensitive. India’s [Digital Personal Data Protection Act, 2023](https://www.meity.gov.in/static/uploads/2024/06/2bf1f0e9f04e6fb4f8fef35e82c42aa5.pdf) governs how it is processed. Under the [DPDP Rules, 2025](https://www.meity.gov.in/static/uploads/2025/11/53450e6e5dc0bfa85ebd78686cadad39.pdf), notified in November 2025 with a phased start, notices must stand on their own and explain in clear and plain language what data is collected, for what purpose and how consent can be withdrawn. In practice, ask only for what the enquiry needs, say why, and record what the customer agreed to. Our guide to [AI systems and India’s DPDP framework](/insights/ai-systems-and-dpdp-india) goes further.',
          },
          {
            type: 'note',
            tone: 'caution',
            title: 'General information, not legal advice',
            text: 'This section summarises public documents as they stood in September 2026. Platform policies change. The DPDP Rules come into force in phases; as notified, the rule on notices applies eighteen months after publication. Check the current text and take advice on your own situation before launch.',
          },
        ],
      },
      {
        id: 'measure-and-failure-modes',
        heading: 'How do you measure it, and what tends to go wrong?',
        blocks: [
          {
            type: 'p',
            text: 'Measure before you launch. Take a few weeks of recent enquiries and note how long each waited for a useful reply, how many got none and how many promised follow-ups happened. Plain first-response time flatters automation, because an instant acknowledgement counts. Track the first useful response instead.',
          },
          {
            type: 'table',
            caption: 'Measures that reflect the customer’s experience',
            head: ['Measure', 'What it tells you', 'Watch out for'],
            rows: [
              ['Time to first useful response', 'Whether the customer got something to act on', 'Instant acknowledgements that say nothing'],
              ['Resolution rate', 'Enquiries closed without the customer chasing', 'Counting abandoned enquiries as resolved'],
              ['Handoff quality', 'Whether people pick up with full context', 'Staff re-asking answered questions'],
              ['Follow-up completion', 'Whether promised next steps happened on time', 'Reminders nobody acts on'],
            ],
          },
          {
            type: 'p',
            text: 'Most failures are predictable, so test for them before launch:',
          },
          {
            type: 'list',
            items: [
              'The confident wrong answer: a price or date nobody approved, delivered politely.',
              'The loop: a customer asks for a person and gets the menu again.',
              'The black hole: a handover lands in a queue nobody owns after 7 pm.',
              'The stale source: the price list changed; the answers did not.',
              'The silent stop: a connection breaks and enquiries pile up unseen, unless someone is alerted when the daily count drops to zero.',
            ],
          },
          {
            type: 'p',
            text: 'Start with one channel and the plainest jobs: capture, acknowledgement and routing. Add approved answers once the handovers work. For help choosing where to begin, the [AI Opportunity Blueprint](/blueprint) is a paid diagnostic that maps a workflow, assesses readiness and helps you decide what is worth building.',
          },
        ],
      },
    ],
    limitations: [
      'If most of your enquiries are bespoke or highly technical, automation will help more with capture and routing than with answers.',
      'Reply quality varies by language, script and channel. Test voice notes and mixed-language messages with real examples from your customers.',
      'Better routing cannot fix an understaffed team. It makes the queue visible; people still have to answer it.',
      'Some customers will always want to ring. Keep a number they can call and a person who answers it.',
    ],
    faqs: [
      {
        q: 'Can AI handle all customer enquiries on its own?',
        a: 'No, and it should not try. Automation handles the predictable parts well: capturing details, acknowledging, answering routine questions from approved information and routing the rest. Complaints, sensitive personal matters, policy exceptions and high-value negotiations need someone who can take responsibility and read the situation. A sound design sets these boundaries in advance and hands over early, with the full conversation attached.',
      },
      {
        q: 'Can we use a chatbot on WhatsApp Business?',
        a: 'Yes, within WhatsApp’s rules. For the WhatsApp Business Platform, the [Business Messaging Policy](https://whatsappbusiness.com/policy/) permits automated replies but requires prompt, clear and direct ways to reach a person. You also need opt-in before contacting people, approved message templates once 24 hours have passed since the customer’s last message, and respect for every request to stop. Check the current policy before launch.',
      },
      {
        q: 'How do we stop automated replies giving wrong information?',
        a: 'Limit the system to approved sources and make “let me bring in a colleague” an acceptable answer. Every price, policy and availability reply should trace back to a source with a named owner. Test it with questions it cannot answer and check that it hands over instead of guessing. After launch, review a sample of conversations each week and fix the source, not only the reply.',
      },
      {
        q: 'What should we measure after automating enquiries?',
        a: 'Measure time to first useful response, resolution rate, handoff quality and follow-up completion, each against a baseline taken before launch. Add one commercial measure that matters to you, such as enquiry-to-visit or enquiry-to-order. Handoff quality is easy to overlook: sample handed-over conversations and check whether your team had to ask anything the customer had already answered.',
      },
      {
        q: 'Which enquiries should we automate first?',
        a: 'Start with frequent, low-risk questions that already have an approved answer: opening hours, order status, documents required, availability or published prices. Choose the channel where most enquiries arrive, and begin with capture, acknowledgement and routing before adding automated answers. Fix what the first few weeks of handovers reveal, then widen the scope.',
      },
    ],
    bybo: [
      {
        href: '/systems/customer-workforce-ai',
        label: 'Customer & Workforce AI',
        why: 'How BYBO approaches enquiries, bookings and follow-ups, with approved answers and handovers that carry context.',
      },
      {
        href: '/insights/human-in-the-loop-product-decision',
        label: 'Design the human decision into the workflow',
        why: 'What the person taking over needs: the evidence, a clear decision and a fallback.',
      },
      {
        href: '/blueprint',
        label: 'AI Opportunity Blueprint',
        why: 'A paid diagnostic to map your enquiry workflow, assess readiness and decide what is worth building.',
      },
    ],
    related: ['when-ai-should-decide', 'measure-ai-system-performance', 'ai-for-real-estate-businesses'],
    sources: [
      {
        title: 'WhatsApp Business Messaging Policy',
        publisher: 'WhatsApp (Meta)',
        url: 'https://whatsappbusiness.com/policy/',
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
      {
        title: 'DPDP Rules, 2025 Notified (backgrounder)',
        publisher: 'Press Information Bureau, Government of India',
        url: 'https://static.pib.gov.in/WriteReadData/specificdocs/documents/2025/nov/doc20251117695301.pdf',
      },
      {
        title: 'Telecom Commercial Communications Customer Preference Regulations, 2018 (TCCCPR)',
        publisher: 'Telecom Regulatory Authority of India',
        url: 'https://trai.gov.in/tcccpr',
      },
    ],
  },
];

export default guides;
