/**
 * The privacy notice and the terms of use.
 *
 * Kept as data so the wording can be reviewed and edited without touching
 * markup. Written to the structure India's Digital Personal Data Protection
 * Act 2023 expects of a notice, and to be accurate about this site as it
 * actually behaves — the previous notice said the enquiry form never reached
 * a BYBO server, which stopped being true when the form began posting to
 * /api/enquiry.
 *
 * NOT LEGAL ADVICE. This is a careful draft by people who build software, not
 * lawyers. Have it reviewed before relying on it, and see LAST_REVIEW below.
 */

export const LAST_UPDATED = '16 September 2026';

/** Where the law currently stands, stated plainly rather than overclaimed. */
export const DPDP_STATUS = {
  notified: '13 November 2025',
  consentManagers: '13 November 2026',
  substantive: '13 May 2027',
};

export type Section = { id: string; heading: string; paras?: string[]; list?: string[]; note?: string };

export const privacy: Section[] = [
  {
    id: 'who',
    heading: 'Who is responsible',
    paras: [
      'BYBO is the enterprise AI and website practice of N&G Ventures, based in Bengaluru, India. N&G Ventures is the Data Fiduciary for the personal data described here — the entity that decides why and how it is handled.',
      'For anything in this notice, write to support@bybo.in. That address reaches a person, and questions about your data are answered by a person rather than a form.',
    ],
  },
  {
    id: 'what',
    heading: 'What we collect, and why',
    paras: [
      'We ask for as little as will let us answer you properly. Nothing on this site asks for a payment card number, a government identifier such as Aadhaar or PAN, or any special category of data, and you should never send those to us through this website.',
    ],
    list: [
      'When you send an enquiry: your name, work email, and whatever you choose to put in the message. Company, phone, industry, role and website are optional, and the form works without them. We use this to understand your request, reply to it, and if you go ahead, to run the resulting engagement.',
      'When you use the chat widget: whatever you type into it, so that we can answer. The widget is our own software, running on proxe.bybo.in.',
      'When you allow measurement: how pages on this site are used, so that we can tell which are useful. This is off unless you turn it on, and the site works identically either way.',
      'Automatically, as with any website: your browser sends an IP address and user-agent with each request, which our host records in server logs for security and reliability.',
    ],
  },
  {
    id: 'lawful',
    heading: 'The basis on which we handle it',
    paras: [
      'For an enquiry, we rely on your consent, given by submitting the form, and afterwards on the legitimate purpose of answering you and managing the relationship you asked to start.',
      'For measurement, we rely only on consent, which you give or withhold using the banner on this site. Declining costs you nothing.',
      'Consent given here is meant to be as easy to withdraw as it was to give. Write to support@bybo.in, or use the measurement settings link in the footer, and it is done.',
    ],
  },
  {
    id: 'form',
    heading: 'What happens to the enquiry form',
    paras: [
      'When you press Send enquiry, the form posts to a BYBO server, which emails the contents to our team inbox and does not store them in a database. This is a change from an earlier version of this site, where the form only prepared a draft in your own email or WhatsApp app; that notice no longer describes how the site works, and this paragraph replaces it.',
      'The email is delivered by Resend, a transactional email provider, acting on our instructions. Your email address is set as the reply-to so that a reply from us reaches you directly.',
      'A hidden field and a per-address rate limit are used to reject automated submissions. Nothing about that involves tracking you.',
    ],
  },
  {
    id: 'processors',
    heading: 'Who else touches it',
    paras: ['We keep this list short on purpose, and it is complete as of the date above.'],
    list: [
      'Vercel — hosting and server logs, so that this site is served at all.',
      'Resend — delivery of the enquiry email described above.',
      'Google (Analytics and Tag Manager) — website measurement, only if you allow it.',
      'Meta — advertising measurement, only if you allow it.',
      'WhatsApp and your email provider — if you choose to contact us that way, that conversation is also handled under their own terms.',
    ],
    note: 'Some of these operate outside India. Where that is so, the transfer is made on the terms those providers offer and subject to any restrictions the Central Government places on particular countries under the DPDP Act.',
  },
  {
    id: 'clients',
    heading: 'Data inside the systems we build',
    paras: [
      'This notice covers this website. It does not cover the systems BYBO builds for a client.',
      'In that work the client is the Data Fiduciary and BYBO acts as a Data Processor on their instructions, under a written agreement that sets out what may be accessed, what is retained, where it is processed and what happens at the end. If your data is in a system we built for someone else, your rights are exercised with them, and they will tell you how.',
      'We do not reuse a client’s documents, figures or process detail to train anything, and we do not carry it into another engagement.',
    ],
  },
  {
    id: 'keeping',
    heading: 'How long we keep it',
    paras: [
      'An enquiry that does not become an engagement is kept while it is still reasonably live, and then deleted. An enquiry that does is kept for as long as the engagement runs and afterwards only for as long as tax, accounting or legal obligations require.',
      'Under the DPDP Act, personal data must be erased once the purpose it was given for is served and no law requires it to be kept. If you would like yours erased sooner, ask, and we will do it unless something requires otherwise — in which case we will tell you what.',
    ],
  },
  {
    id: 'rights',
    heading: 'Your rights',
    paras: ['Under the DPDP Act, as a Data Principal you may:'],
    list: [
      'Ask what personal data of yours we hold and what we have done with it.',
      'Ask us to correct anything inaccurate, complete anything incomplete, or update anything out of date.',
      'Ask us to erase it, where no law requires us to keep it.',
      'Withdraw consent you have given, at any time, as easily as you gave it.',
      'Nominate someone to exercise these rights on your behalf if you die or become incapable of exercising them yourself.',
      'Raise a grievance with us and have it answered — and if our answer does not satisfy you, take it to the Data Protection Board of India.',
    ],
    note: 'Write to support@bybo.in to exercise any of these. We will not charge you, and we will answer within a reasonable period. We may need to confirm who you are first, so that we do not hand your data to somebody else.',
  },
  {
    id: 'security',
    heading: 'Keeping it safe',
    paras: [
      'The site is served over HTTPS, access to the enquiry inbox is limited to people who need it, and credentials for the services listed above are held as environment secrets rather than in code.',
      'No one can promise a system is impossible to breach. What we can say is what happens if one occurs: under the DPDP Act we would notify the Data Protection Board and every affected person, and we would tell you what happened, what it affected and what to do, rather than the least we could get away with.',
    ],
  },
  {
    id: 'children',
    heading: 'Children',
    paras: [
      'This site is meant for people acting for a business and is not directed at children. We do not knowingly collect a child’s personal data. The DPDP Act requires verifiable parental consent before a child’s data is processed and prohibits tracking or behavioural advertising directed at children; if you believe a child has sent us something, write to support@bybo.in and we will delete it.',
    ],
  },
  {
    id: 'standing',
    heading: 'Where the law currently stands',
    paras: [
      `India’s Digital Personal Data Protection Act 2023 is in force, and the Digital Personal Data Protection Rules were notified on ${DPDP_STATUS.notified}. The obligations arrive in stages: the provisions on Consent Managers take effect on ${DPDP_STATUS.consentManagers}, and the principal substantive provisions on ${DPDP_STATUS.substantive}.`,
      'We are not waiting for those dates to behave as though they had arrived. This notice is written to the standard the Act sets, and we will update it as the remaining provisions commence and as the Data Protection Board issues guidance.',
    ],
  },
  {
    id: 'changes',
    heading: 'Changes to this notice',
    paras: [
      'When this notice changes materially we update the date at the top and, where the change affects how your data is handled, say so plainly rather than quietly revising the text. The paragraph above about the enquiry form is an example of that.',
    ],
  },
];

export const terms: Section[] = [
  {
    id: 'about',
    heading: 'What these terms cover',
    paras: [
      'These terms govern your use of bybo.in. They do not govern work BYBO does for a client — that is covered by the separate written agreement for that engagement, and where the two differ, the engagement agreement wins.',
      'By using this site you accept these terms. If you do not accept them, please do not use the site.',
    ],
  },
  {
    id: 'who',
    heading: 'Who you are dealing with',
    paras: [
      'bybo.in is operated by BYBO, the enterprise AI and website practice of N&G Ventures, Bengaluru, India. Contact: support@bybo.in.',
    ],
  },
  {
    id: 'use',
    heading: 'Using the site',
    paras: ['You may read this site, share links to it, and send us an enquiry. You may not:'],
    list: [
      'Use it in a way that breaks any law, or that interferes with anyone else’s use of it.',
      'Attempt to gain access to any part of it, or to any system connected to it, that has not been made available to you.',
      'Scrape it at a rate that degrades it for other people, or submit automated enquiries.',
      'Copy substantial parts of its written content and republish them as your own.',
    ],
  },
  {
    id: 'demos',
    heading: 'The demonstrations on this site',
    paras: [
      'Several pages carry interactive demonstrations: six concept websites in the studio showcase, and worked examples on the system pages. Each is labelled on the page, and the point bears repeating here.',
      'They are illustrative. The brands in them are fictional, the figures in them are invented to show the shape of a workflow, and none of them is a record of work done for a client. Nothing in them takes a real order, a real booking, a real payment or a real reservation, and no data you type into one is stored or acted on.',
      'They demonstrate what a system can be shaped to do. They are not a promise about what your system would do, which depends on your work, your data and your rules.',
    ],
  },
  {
    id: 'content',
    heading: 'What we publish, and what it is worth',
    paras: [
      'The Insights articles are written carefully and cite their sources, and the guidance on the service pages is given in good faith. It is general information about how this kind of work tends to go. It is not advice about your business, your legal position or your regulatory obligations, and it is not a substitute for taking proper advice on any of those.',
      'Anything on this site describing a regulation — including our summary of the DPDP Act — is a plain-language description for orientation, not a legal opinion, and may be overtaken by events.',
    ],
  },
  {
    id: 'enquiries',
    heading: 'Enquiries and what follows',
    paras: [
      'Sending an enquiry starts a conversation. It does not create a contract, reserve capacity, or oblige either of us to anything.',
      'BYBO publishes no prices on this site. Any fee, scope or timescale becomes real only when it is set out in a written agreement signed by both of us. Nothing on this site, and nothing said in a first conversation, is an offer capable of acceptance.',
      'Please do not send confidential material with a first enquiry. If we need it, we will agree how to handle it first.',
    ],
  },
  {
    id: 'ip',
    heading: 'Intellectual property',
    paras: [
      'The text, artwork, code, logo and layout of this site belong to N&G Ventures unless stated otherwise. You may quote a reasonable extract of an article with attribution and a link. You may not reproduce the site’s design or republish its content wholesale.',
      'What we produce during an engagement, and who owns it, is dealt with in that engagement’s agreement, not here.',
    ],
  },
  {
    id: 'third',
    heading: 'Third-party links and services',
    paras: [
      'This site links to other websites and loads a small number of third-party services, which are named in the privacy notice. We do not control them and are not responsible for their content or their handling of your data. Their terms apply to them.',
    ],
  },
  {
    id: 'availability',
    heading: 'Availability',
    paras: [
      'We try to keep this site up and correct, but we do not guarantee it will be available without interruption or free of error. We may change, suspend or withdraw any part of it, including a demonstration, without notice.',
    ],
  },
  {
    id: 'liability',
    heading: 'Liability',
    paras: [
      'To the extent the law allows, BYBO and N&G Ventures are not liable for loss arising from your use of this site or from reliance on its general information — including lost profit, lost business or lost data.',
      'Nothing here limits liability for anything that cannot lawfully be limited, including fraud or death or personal injury caused by negligence. Liability under a client engagement is governed by that engagement’s agreement.',
    ],
  },
  {
    id: 'law',
    heading: 'Governing law',
    paras: [
      'These terms are governed by the laws of India, and the courts at Bengaluru, Karnataka have exclusive jurisdiction over any dispute arising from them.',
    ],
  },
  {
    id: 'changes',
    heading: 'Changes to these terms',
    paras: [
      'We may update these terms. The date at the top shows when they last changed, and using the site after that means you accept the updated version.',
    ],
  },
];
