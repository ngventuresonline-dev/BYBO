/**
 * The Blueprint page's content.
 *
 * This is the paid product most engagements start with, so the page has to
 * answer a buyer's real questions: what it is, what arrives at the end, what
 * the days look like, what it costs and what happens if the answer is "do not
 * build". No prices and no promised dates — both depend on scope, and the two
 * durations quoted here are the ones already offered.
 */

export const overview = [
  'A Blueprint is a short, paid piece of work that answers one question honestly: is this worth building, and if so, what should be built first. It is not a proposal dressed up as research. It ends in a recommendation you can act on, including the recommendation to leave the work alone.',
  'We start from the work itself rather than from a technology. We sit with the people who do it, follow a real case end to end, count how long it takes and how often it goes wrong, and find where the decisions actually happen. Most of what makes a system succeed or fail is visible at this stage, in the exceptions nobody wrote down.',
  'You keep everything it produces whether or not you build with us. The map, the baseline, the ranking and the roadmap are yours, in a form another supplier could quote against. A diagnostic you cannot take elsewhere is a sales document, not a diagnostic.',
];

export const tiers = [
  {
    name: 'One workflow',
    length: '72-hour fast track',
    art: 'reference-blueprint',
    blurb: 'One process, start to finish, when you already know which one hurts.',
    includes: [
      'A single workflow mapped end to end, with the exceptions',
      'A time-and-cost baseline taken from your own records',
      'A build-or-leave-it recommendation with the reasoning',
      'A first release you could start within the month',
    ],
    fit: 'Best when one process is clearly the problem and you want a decision quickly.',
  },
  {
    name: 'A full function',
    length: '3–10 working days',
    art: 'reference-build',
    blurb: 'A whole department, when you suspect several things are wrong but not which.',
    includes: [
      'Every recurring workflow in the function, mapped and measured',
      'The same baseline, plus where work waits between teams',
      'All the opportunities ranked against each other, not in isolation',
      'A 90-day roadmap with sequence, owners and measures',
    ],
    fit: 'Best when the pain is spread across a team and the sequence matters more than any one fix.',
  },
];

export const deliverables = [
  { title: 'A workflow map', body: 'Every step, handoff and waiting point in the real process — not the documented one. Drawn with the people who do the work, so they recognise it, and detailed enough that a developer could build from it.' },
  { title: 'A cost baseline', body: 'What the work costs you today in hours and rupees, taken from your own volumes and rates rather than an industry average. This is the number any future claim of improvement gets measured against.' },
  { title: 'An opportunity ranking', body: 'Each candidate scored on value, how often it repeats, how ready your data and systems are, and what could go wrong. Ranked against each other, so the argument is about the order rather than the merits of one idea.' },
  { title: 'A readiness review', body: 'Where the access, the data quality or the process itself would block a build, and what would have to change first. The uncomfortable findings are in here, because they are the ones that sink projects later.' },
  { title: 'A build recommendation', body: 'What to automate, what to fix without software, and what to leave alone. Each with the reasoning attached, so someone who was not in the room can follow the argument.' },
  { title: 'A 90-day roadmap', body: 'The sequence, who owns each step on your side, what has to be true before each one starts, and the measures you will judge it by. Written to be handed to whoever builds it, including a supplier who is not us.' },
];

export const days = [
  { label: 'Before we start', body: 'You send a representative set of examples and we agree who we need an hour with. Nothing is billed until the scope and fee are agreed in writing.' },
  { label: 'Sitting with the work', body: 'We watch the process happen and follow real cases, including the ones that went wrong. Most of the value is here: the exceptions, the workarounds and the informal rules nobody documented.' },
  { label: 'Counting it', body: 'Volumes, time per case, rework rate and the cost of getting it wrong — from your records where they exist, and from a sample we take together where they do not.' },
  { label: 'Testing what is possible', body: 'We check the awkward examples against what a system could actually read or decide, and confirm whether the systems it must reach offer a usable way in. This is where optimistic plans die cheaply.' },
  { label: 'Ranking and writing', body: 'Opportunities scored and ordered, the readiness gaps written up, and the recommendation drafted with its reasoning.' },
  { label: 'Walking you through it', body: 'A session with your team to challenge it. The plan changes in this meeting more often than not, which is the point of holding it.' },
];

export const bring = [
  'A recurring process, as it actually runs — not a cleaned-up version of it.',
  'A handful of representative examples, including the awkward ones: the bad scan, the supplier who ignores your format, the case everybody remembers.',
  'An hour each with two or three people who do the work and know the exceptions.',
  'Whatever numbers you already have on volume and time. If there are none, we take a sample together.',
  'A named person who can decide questions of policy while we are working.',
];

export const suits = {
  yes: [
    'The same work comes back every week and the volume is growing.',
    'You have been quoted for a build and cannot tell whether it is the right one.',
    'Two people inside the business disagree about where to start.',
    'A previous pilot did not survive contact with real work.',
  ],
  no: [
    'You need a system built next week — a Blueprint would delay you. Come to us with the build instead.',
    'The decision is already made and signed off. Paying to re-examine it wastes your money.',
    'The process changes completely every time. There is nothing stable to map yet.',
    'You want a document to justify a decision already taken. We will write what we find.',
  ],
};

export const investment = [
  'BYBO publishes no prices, because the honest figure depends on how many workflows are in scope, how many people we need time with, and how much of the measurement has to be built from scratch rather than read from your systems.',
  'The fee is quoted in writing after a free scoping conversation, and it is credited against implementation if you go on to build with us. You are paying for the thinking, and you keep the plan either way.',
];

export const feeDrivers = [
  'How many workflows are in scope, and whether they cross teams',
  'How many people we need an hour with, and where they are',
  'Whether usable volume and time data already exists, or has to be sampled',
  'How many systems the work touches, and whether they can be inspected',
  'Whether a proof of the hard part is needed before a recommendation is safe',
];

export const after = [
  { head: 'Build it', body: 'We scope the first release from the roadmap and agree a separate fee, with the Blueprint credited against it. The map, the baseline and the evaluation examples all carry straight into the build.' },
  { head: 'Build it elsewhere', body: 'Take the plan to your own team or another supplier. It is written to be quoted against, and we will answer their questions about it. This happens, and it is a fair outcome.' },
  { head: 'Do not build it', body: 'Sometimes the answer is a rule, a template, a form or a conversation with a supplier. If that is what we find, that is what the recommendation says — and you have spent a small amount to avoid spending a large one.' },
];

export const faqs: [string, string][] = [
  ['What if you conclude we should not build anything?',
    'Then that is the recommendation, in writing, with the reasoning. It is the outcome that saves you the most money, and it is why the diagnostic is paid — nobody can afford to reach that conclusion for free. You still keep the map, the baseline and the ranking.'],
  ['Is the fee really credited if we build with you?',
    'Yes, and it is written into the scope before the work starts rather than offered afterwards. If you build the recommended first release with us, the Blueprint fee comes off that engagement.'],
  ['How much of our time does it take?',
    'An hour each with two or three people who do the work, plus a session at the end to challenge the findings. We work around your week rather than asking the team to stop.'],
  ['Can we do this ourselves?',
    'Often, yes — and if you have someone who can sit with the work and argue with the conclusions, you should. Our guide on [choosing the first workflow](/insights/identify-repetitive-work-to-automate) sets out the method. People bring us in for the outside view and because an internal ranking tends to follow the loudest department.'],
  ['Do you need access to our systems?',
    'Usually only read access, and only where a number cannot be established any other way. Anything we look at is agreed in advance with whoever owns it, and the scope says what we may and may not touch.'],
  ['What happens to what you learn about our business?',
    'It stays with you. We do not reuse your process detail, your figures or your documents elsewhere, and the arrangement is written into the scope. Our [privacy information](/privacy) sets out the position.'],
  ['We already had a consultant look at this.',
    'Then bring their work. If it holds up we will say so and build on it rather than repeating it. What we usually add is the measurement and the readiness testing, which strategy work tends to skip.'],
  ['Is a Blueprint required before you will build?',
    'No. If you know the workflow, have the examples and can name the exceptions, we can scope a build directly. The Blueprint exists for when that is not yet true, or when the choice between candidates is genuinely open.'],
];

export const reading = ['identify-repetitive-work-to-automate', 'ai-readiness-checklist', 'business-automation-cost-india'];
