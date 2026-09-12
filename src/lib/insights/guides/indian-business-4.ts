import type { Guide } from '../types';

const guides: Guide[] = [
  {
    slug: 'ai-for-healthcare-administration',
    collection: 'indian-business',
    title: 'AI for Healthcare Administration Without Replacing Clinical Judgement',
    seoTitle: 'AI for Healthcare Administration in India',
    description:
      'How clinics and hospitals can use AI for appointments, reminders, front-desk questions and insurance paperwork, while every clinical judgement stays with people.',
    dek:
      'Administrative work is where AI helps a clinic first: appointments, reminders, routine front-desk questions and insurance files. Diagnosis, triage and treatment advice stay with clinical staff, and that boundary has to be designed in.',
    keywords: [
      'AI for healthcare administration',
      'clinic appointment automation India',
      'hospital front desk automation',
      'TPA insurance paperwork automation',
      'healthcare AI India',
      'patient data protection DPDP',
    ],
    publishedAt: '2026-09-11',
    visual: {
      kind: 'flow',
      title: 'A front-desk request, end to end',
      steps: ['Request arrives', 'Check the record', 'Prepare the action', 'Staff confirm', 'Record and remind'],
      gate: 3,
      gateLabel: 'Anything clinical goes to clinical staff, unanswered',
    },
    summary: [
      'Start with administration: appointments, reminders, routine questions, document completeness and insurance paperwork.',
      'Diagnosis, triage and treatment advice stay out of scope. Write the boundary down and test that the system holds it.',
      'Health information needs tighter handling than most business data: least access, short retention, logs and a named owner.',
      'Measure appointment completion, time to a useful reply and rework on insurance files against a baseline taken first.',
    ],
    sections: [
      {
        id: 'what-counts-as-administration',
        heading: 'What counts as healthcare administration, and what does not?',
        blocks: [
          {
            type: 'p',
            text: 'A clinic’s day holds two kinds of work that look similar from the reception desk and are not similar at all. One is administration: booking a slot, confirming it, finding a file, checking whether a form is complete, chasing a payer for an approval. The other is care: deciding what is wrong, how urgent it is and what to do about it. AI for healthcare administration means the first kind only, and the distinction has to be written down before anything is built.',
          },
          {
            type: 'p',
            text: 'The reason is not squeamishness. Administrative work is repetitive, follows written rules and produces a checkable result: the appointment exists or it does not, the form has the policy number or it does not. Clinical work depends on judgement, on what the person in front of you is not saying, and on responsibility that a named practitioner carries. A system that is good at the first is not, by that fact, safe at the second. MeitY’s [India AI Governance Guidelines](https://static.pib.gov.in/WriteReadData/specificdocs/documents/2025/nov/doc2025115685601.pdf) make a related point: safeguards should be proportionate to the risk of harm, and high-risk applications in sensitive sectors such as health or finance may require additional ones.',
          },
          {
            type: 'note',
            tone: 'caution',
            title: 'The line the system must not cross',
            text: 'No symptom assessment, no suggestion of a diagnosis, no advice on medicines or dosage, and no deciding how urgent a case is. Sorting patients by urgency is a clinical act, whatever the software calls it. If a message contains a symptom, it goes to clinical staff unanswered.',
          },
        ],
      },
      {
        id: 'front-desk-work',
        heading: 'Which front-desk work is worth handing to a system?',
        blocks: [
          {
            type: 'p',
            text: 'Look at what interrupts your front desk most often. In most clinics and small hospitals it is the same short list, arriving by phone, WhatsApp, walk-in and web form at once:',
          },
          {
            type: 'list',
            items: [
              'Booking, confirming, rescheduling and cancelling appointments against the real consulting calendar.',
              'Answering routine questions with approved answers: consulting hours, which doctor sits when, what to bring, fasting instructions for a listed test, parking and directions.',
              'Sending reminders before the visit and follow-up notes after it, in the patient’s language.',
              'Checking that a file is complete before it is submitted: ID, referral, previous reports, signatures, policy details.',
              'Preparing insurance and TPA paperwork for a person to review and send.',
              'Answering the same billing questions: what a listed package covers, what a receipt shows, how to get a duplicate.',
              'Producing the weekly view of capacity: slots used, cancellations, no-shows and where the queue builds.',
            ],
          },
          {
            type: 'p',
            text: 'BYBO’s [industries view](/industries) frames clinic work the same way: bookings and reminders, administrative document completeness, and a review of capacity and no-show patterns, with appointment completion as the measure. None of that asks a system to know anything about medicine. It asks it to be reliable about time, records and paperwork.',
          },
        ],
      },
      {
        id: 'appointments-and-reminders',
        heading: 'How can a system reduce missed appointments?',
        blocks: [
          {
            type: 'p',
            text: 'A missed appointment costs twice: the slot is empty and the patient is still unwell. Most misses are ordinary. The reminder went to an old number, the message was in a language the patient does not read, the time was inconvenient and nobody offered another, or the patient tried to cancel and could not reach anyone.',
          },
          {
            type: 'p',
            text: 'A useful system attacks each of those directly. It confirms at the time of booking with the doctor’s name, the date, the time and what to bring. It reminds at an interval your team chooses, in the language the patient used. It lets the patient confirm, reschedule or cancel in one reply, and it puts a released slot in front of the people on the waiting list. It flags patients who have not confirmed so the desk can call the ones who matter most.',
          },
          {
            type: 'p',
            text: 'Measure it honestly. Count today’s no-show rate by session before you change anything, because morning and evening clinics rarely behave alike, then compare the same weeks after launch. A system that sends more messages and changes nothing is an expense, not an improvement.',
          },
          {
            type: 'note',
            tone: 'insight',
            title: 'Rescheduling is worth more than reminding',
            text: 'A reminder tells a patient they are about to miss a visit. A reschedule offer keeps them in the clinic’s care and refills the slot. If you build one thing, build the path from “I cannot come” to a new time that reception did not have to arrange.',
          },
        ],
      },
      {
        id: 'insurance-and-documents',
        heading: 'What about insurance and TPA paperwork?',
        blocks: [
          {
            type: 'p',
            text: 'Insurance files are administration in its purest form: a checklist, a payer’s format and a queue. They are also where a small omission costs days. A missing signature, a policy number that does not match the ID, an old employer name, a report that was scanned at an angle and cannot be read.',
          },
          {
            type: 'p',
            text: 'A document system can hold a checklist per payer, read what has been submitted, compare it with the checklist and produce a short list of what is missing or inconsistent. It can assemble the pack in the order the payer wants it. What it should not do is decide clinical content, write the medical justification or submit anything on its own.',
          },
          {
            type: 'example',
            title: 'Illustrative example: a Coimbatore clinic’s pre-authorisation files',
            text: 'Suppose a 40-bed multi-speciality clinic sends around 120 pre-authorisation requests a month to five payers, each with a slightly different checklist. Two administrators assemble them, and roughly a third come back with a query, usually for a missing document or a mismatched detail. A bounded first release reads each incoming file, checks it against that payer’s checklist, and produces a list: consent form unsigned, policy number differs from the ID card, one report unreadable. The administrator fixes the gaps, the treating team supplies anything clinical, and a person presses send. After two months, the clinic compares query rate and days-to-approval with the numbers it recorded before.',
          },
        ],
      },
      {
        id: 'boundaries-and-escalation',
        heading: 'Where must the system stop and a person take over?',
        blocks: [
          {
            type: 'p',
            text: 'Escalation cannot be a good intention. It has to be a written rule, tested with real messages, because patients do not separate administration from care when they write. A message asking to move an appointment often ends with a description of pain.',
          },
          {
            type: 'list',
            items: [
              'Any symptom, however casually mentioned, and any question about whether something is serious.',
              'Anything about medicines: names, doses, substitutes, side effects, whether to continue.',
              'Test and scan results, including “has my report come” when the report carries findings.',
              'Requests to be seen sooner, which are urgency decisions in disguise.',
              'Distress, a complaint about care, or anything involving a death or a serious outcome.',
              'Anything the system cannot classify with confidence, and anyone who asks for a person.',
            ],
          },
          {
            type: 'p',
            text: 'Design the handover as carefully as the reply. The message goes to a named role with a response expectation and a fallback for nights and holidays, and the patient is told plainly that a person from the clinic will respond. Silence after an escalation is worse than no automation at all. Our guide on [when AI should decide and when a person should step in](/insights/when-ai-should-decide) sets out how to choose those thresholds.',
          },
        ],
      },
      {
        id: 'health-data',
        heading: 'How should patient information be handled?',
        blocks: [
          {
            type: 'p',
            text: 'Health information deserves tighter handling than most business data, and India’s framework says useful things about how. The [Digital Personal Data Protection Act, 2023](https://www.meity.gov.in/static/uploads/2024/06/2bf1f0e9f04e6fb4f8fef35e82c42aa5.pdf) requires an organisation holding personal data to take reasonable security safeguards against a breach, and, where the data is likely to be used to make a decision affecting the person or shared with another organisation, to ensure it is complete, accurate and consistent. It also requires verifiable consent from a parent before processing a child’s personal data.',
          },
          {
            type: 'p',
            text: 'The [Digital Personal Data Protection Rules, 2025](https://www.meity.gov.in/static/uploads/2025/11/53450e6e5dc0bfa85ebd78686cadad39.pdf), notified in November 2025, put detail on that. Reasonable security safeguards are to include, at a minimum, measures such as encryption, obfuscation or masking, control over access to the systems used, and visibility on who accessed personal data through logs, monitoring and review, with those logs retained for a year. As notified, most of these rules commence eighteen months after publication, so check the current text and what already applies to you. The Rules also list clinical establishments and healthcare professionals among the classes that are not bound by two of the children’s data provisions, where processing is restricted to providing health services to the child to the extent necessary to protect her health.',
          },
          {
            type: 'p',
            text: 'If you exchange records under the Ayushman Bharat Digital Mission, consent is the mechanism. The National Health Authority describes the [Health Information Exchange and Consent Manager](https://abdm.gov.in/strapicms/uploads/ABDM_HIE_CM_ea5d4c0559.pdf) as a gateway that requires user consent for every data transaction, with granular control over what is shared, and as a data-blind gateway that passes information without reading it.',
          },
          {
            type: 'p',
            text: 'In practice that becomes a short set of decisions you make once and review: which records the system may read, which fields ever leave your premises, how long conversations and logs are kept, who can open them, and what happens the day a phone is lost. Those controls are the substance of [Infrastructure & Governance](/systems/ai-infrastructure-governance) work, and they cost far less to design in than to add later.',
          },
          {
            type: 'note',
            tone: 'caution',
            title: 'General information, not legal advice',
            text: 'This summarises public documents as they stood in September 2026, and commencement is phased. Clinical practice, medical records and telemedicine carry their own rules from your council and state authorities. Confirm the current position with a qualified adviser before you deploy.',
          },
        ],
      },
      {
        id: 'measuring-and-starting',
        heading: 'How do you know it is working, and where should you start?',
        blocks: [
          {
            type: 'p',
            text: 'Judge an administrative system on administrative outcomes, measured against a baseline you took before launch. Four measures cover most of it, and each has a way of flattering you if you are not careful.',
          },
          {
            type: 'table',
            caption: 'Measures for an administrative system in a clinic',
            head: ['Measure', 'What it tells you', 'Watch out for'],
            rows: [
              ['Appointment completion', 'Whether booked patients actually arrive', 'Improvement caused by a new doctor, not the system'],
              ['Time to a useful reply', 'Whether the desk answers before people give up', 'Instant acknowledgements that answer nothing'],
              ['Insurance query rate', 'Whether files go out complete', 'Fewer files sent, rather than better ones'],
              ['Escalations handled in time', 'Whether clinical messages reach people quickly', 'Escalations that sit in an unwatched queue'],
            ],
          },
          {
            type: 'p',
            text: 'Start with one channel and one job, usually appointments in the channel where most requests already arrive. Add approved answers once the escalation path has survived a month of real messages. Insurance paperwork can follow, because it needs the payer checklists agreed first. If you want the sequence worked out on your own numbers before committing to a build, the [AI Opportunity Blueprint](/blueprint) is a paid diagnostic that maps the workflow, measures the baseline and says plainly whether a system is worth building.',
          },
        ],
      },
    ],
    limitations: [
      'This guide covers administration only. Anything touching diagnosis, triage or treatment needs clinical governance and specialist advice well beyond its scope.',
      'A single-doctor practice may find that a shared calendar, a written phone script and one trained receptionist solve most of the problem more cheaply.',
      'If records sit on paper or in software with no way to read data out of it, the first project is records, not AI.',
      'Reply quality varies by language and script. Test with the messages your own patients send, including voice notes and mixed languages.',
      'General information, not legal advice. Data protection and clinical practice rules apply to your specific setting and change over time.',
    ],
    faqs: [
      {
        q: 'Can AI answer patients’ medical questions?',
        a: 'It should not. Symptom questions, urgency, medicines and results all need a registered practitioner who takes responsibility for the answer. Build the system to recognise those messages and pass them to clinical staff without attempting a reply, and tell the patient a person from the clinic will respond. Test the boundary with real messages before launch, because patients mix an appointment request and a symptom in the same sentence.',
      },
      {
        q: 'Which administrative tasks should a clinic automate first?',
        a: 'Appointments, in whichever channel already carries most requests. Booking, confirmation, reminders and rescheduling have clear rules, a checkable result and a measure you probably already track. Routine approved answers, such as consulting hours and what to bring, come next. Leave insurance paperwork until the payer checklists are agreed in writing, and leave anything clinical out of scope entirely.',
      },
      {
        q: 'Is patient data safe in an AI system?',
        a: 'That depends entirely on how it is built. India’s data protection framework expects reasonable security safeguards, including measures such as encryption or masking, access control and logs of who read what. In practice, give the system the narrowest access that does the job, keep conversations and logs only as long as you need them, name someone accountable, and review access when roles change. This is general information, not legal advice.',
      },
      {
        q: 'Will this replace our front-desk staff?',
        a: 'It changes what they spend the day on rather than removing the need for them. The repetitive parts, such as confirmations, reminders and completeness checks, move to the system. Patients who are anxious, confused or unwell still need a person, and so does every clinical message. Most clinics find the desk becomes reachable rather than smaller, which is usually the actual complaint.',
      },
      {
        q: 'How do we measure whether it worked?',
        a: 'Take a baseline first: no-show rate by session, how long enquiries wait for a useful reply, how many insurance files come back with a query, and how quickly clinical messages reach a practitioner. Compare the same measures after a month or two, including the awkward weeks. Add the running cost per completed task, so the improvement is judged against what it costs to keep going.',
      },
    ],
    bybo: [
      {
        href: '/industries',
        label: 'Industries',
        why: 'Shows how BYBO frames clinic work: bookings and reminders, document completeness and capacity review.',
      },
      {
        href: '/systems/ai-infrastructure-governance',
        label: 'Infrastructure & Governance',
        why: 'Access limits, logs, evaluations and cost visibility, which health information needs from the first release.',
      },
      {
        href: '/systems/customer-workforce-ai',
        label: 'Customer & Workforce AI',
        why: 'How enquiries, bookings and follow-ups run on approved information, with handovers that carry context.',
      },
    ],
    related: ['when-ai-should-decide', 'ai-systems-and-dpdp-india', 'automate-customer-enquiries'],
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
      {
        title: 'Health Information Exchange Consent Manager (HIE-CM)',
        publisher: 'National Health Authority, Ayushman Bharat Digital Mission',
        url: 'https://abdm.gov.in/strapicms/uploads/ABDM_HIE_CM_ea5d4c0559.pdf',
      },
      {
        title: 'India AI Governance Guidelines: Enabling Safe and Trusted AI Innovation',
        publisher: 'Ministry of Electronics and Information Technology (MeitY)',
        url: 'https://static.pib.gov.in/WriteReadData/specificdocs/documents/2025/nov/doc2025115685601.pdf',
      },
    ],
  },
  {
    slug: 'ai-for-education-and-lending',
    collection: 'indian-business',
    title: 'AI for Education and Lending: Faster Files with Human Decisions',
    seoTitle: 'AI for Education and Lending Operations',
    description:
      'How education and lending teams use AI for enquiries, application intake and document checks, while admission and credit decisions stay with people.',
    dek:
      'In education and lending, the unit of work is a file: an enquiry, a form, documents, checks, a decision. A system can keep the file moving. The admission or credit decision belongs to a person who can explain it.',
    keywords: [
      'AI for education and lending',
      'loan application document checks',
      'admission enquiry automation',
      'KYC document verification support',
      'RBI digital lending directions',
      'application processing automation India',
    ],
    publishedAt: '2026-09-11',
    visual: {
      kind: 'layers',
      title: 'Four layers of an application file',
      layers: [
        { label: 'Intake', note: 'Every enquiry captured, with source and language' },
        { label: 'Completeness', note: 'Documents listed, matched and chased before review' },
        { label: 'Checks', note: 'Evidence prepared, never a final ruling' },
        { label: 'The decision', note: 'A named person decides and records why' },
      ],
    },
    summary: [
      'Education and lending both run on files. Most of the delay sits in chasing documents, not in deciding.',
      'A system can capture enquiries, check completeness, prepare verification packs and keep files moving between people.',
      'Admission and credit decisions stay with named people who can explain them, with the evidence in front of them.',
      'Fairness and explainability are design work: test on real past files, record reasons and review who gets refused.',
    ],
    sections: [
      {
        id: 'why-together',
        heading: 'Why do education and lending belong in one guide?',
        blocks: [
          {
            type: 'p',
            text: 'An admissions office and a lending team would not recognise much in each other’s week, yet their operational problem is nearly identical. Someone applies. Documents arrive in a mess of formats. Details have to match across papers issued by different authorities. A queue builds at exactly the time of year when the team is smallest. And at the end there is a decision about a person’s future that somebody has to be able to justify.',
          },
          {
            type: 'p',
            text: 'BYBO’s [industries view](/industries) groups the two together for that reason, with the same three jobs listed under each: route enquiries to the right person, check application completeness, and track handoffs and progress, measured by application turnaround time. That is a useful frame, because it puts the work where the delay actually is. In most application processes, the decision takes minutes. The file takes weeks.',
          },
          {
            type: 'note',
            tone: 'insight',
            title: 'Count the waiting, not the deciding',
            text: 'Before choosing anything to build, take twenty recent files and mark where each one waited: for a document, for a signature, for a verification, for someone to notice it had arrived. The pattern usually decides the project for you.',
          },
        ],
      },
      {
        id: 'education-intake',
        heading: 'What can a system do with education enquiries and applications?',
        blocks: [
          {
            type: 'p',
            text: 'Admission season is a volume problem with a service problem inside it. Parents and students ask the same twenty questions across phone, WhatsApp, web forms and walk-ins, while the team is also assembling files. The clerical half of that can move to a system:',
          },
          {
            type: 'list',
            items: [
              'Capture every enquiry in one place, with the programme asked about, the channel and the language used.',
              'Route it to the right counsellor by programme, campus, language or the stage the student has reached.',
              'Answer published questions from approved sources: eligibility criteria, fees as published, deadlines, documents required, hostel details.',
              'Check application completeness against the list for that programme, and name what is missing.',
              'Read submitted documents for obvious problems: a name that differs from the certificate, a missing page, an unreadable scan, an expired ID.',
              'Track the cohort: who has applied, submitted, paid, confirmed or gone quiet, with a reminder before each deadline.',
            ],
          },
          {
            type: 'p',
            text: 'What the system should not do is rank applicants, score them, or interpret an eligibility rule that is not written down. Published criteria can be checked mechanically. Anything requiring interpretation, such as an unusual qualification from another board or a hardship case, goes to a person with the file attached.',
          },
        ],
      },
      {
        id: 'lending-intake',
        heading: 'What can a system do with a loan file?',
        blocks: [
          {
            type: 'p',
            text: 'The same shape appears in lending, with tighter rules around it. A system can accept an application, list the documents the product needs, read what has been uploaded, compare details across the bank statement, the identity document and the application form, and prepare a file the credit team can assess in one sitting. It can flag what is missing, what does not match and what looks unreadable. It can chase the borrower for the gap.',
          },
          {
            type: 'p',
            text: 'It cannot take over the assessment. The [Reserve Bank of India (Digital Lending) Directions, 2025](https://www.rbi.org.in/Scripts/NotificationUser.aspx?Id=12848&Mode=0), dated 8 May 2025, require the regulated entity to obtain information on the borrower’s economic profile, including at a minimum age, occupation and income, to assess creditworthiness before extending any loan, and to keep that on record for audit. Where a lending service provider is involved, the Directions state that an outsourcing agreement shall in no manner dilute or absolve the regulated entity of its obligations, and that it remains fully responsible for the acts and omissions of that provider. Grievance redressal stays with the regulated entity too, with nodal officers designated and their contact details displayed.',
          },
          {
            type: 'p',
            text: 'Read plainly, that settles the design question. Software can prepare, check, chase and present. Accountability does not move with the work.',
          },
        ],
      },
      {
        id: 'decisions-stay-with-people',
        heading: 'Which decisions must stay with people?',
        blocks: [
          {
            type: 'p',
            text: 'Admission and credit decisions, and every exception around them: a waiver, a rejection, a request to reconsider, an unusual document, a case that does not fit the policy. These are decisions about a person, and someone has to own them.',
          },
          {
            type: 'p',
            text: 'The Reserve Bank’s [FREE-AI Committee report](https://rbidocs.rbi.org.in/rdocs/PublicationReport/Pdfs/FREEAIR130820250A24FF2D4578453F824C72ED9F5D5851.PDF), released in August 2025, puts it in principles it calls sutras. Under ‘People First’, AI should augment human decision-making but defer to human judgment, with final authority resting with humans who can override the system. Under ‘Accountability’, entities that deploy AI remain fully accountable for the decisions and outcomes, regardless of the level of automation, and accountability cannot be delegated to the model and underlying algorithm. The report is a committee’s recommendations rather than a regulation, but the principles are a sound design brief for anyone outside finance too.',
          },
          {
            type: 'example',
            title: 'Illustrative example: a Nagpur lender’s two-wheeler loan files',
            text: 'Suppose a small lender receives around 700 two-wheeler applications a month through dealer showrooms. Files arrive as phone photographs: an identity document, an address proof, six months of bank statements, an income declaration. Two executives spend most of the day chasing missing pages. A bounded first release checks each file against the product’s document list, compares the name and address across documents, marks statements that are illegible or incomplete, and sends the dealer one message listing exactly what is needed. The credit officer opens a complete file, reads the assessment inputs, and decides. Nothing is approved, declined or priced by the system, and the reason for every decision is recorded by the officer who made it.',
          },
        ],
      },
      {
        id: 'fairness-and-explainability',
        heading: 'How do you keep the process fair and explainable?',
        blocks: [
          {
            type: 'p',
            text: 'It is tempting to think that fairness is safe as long as a person signs at the end. It is not. The way a file is prepared shapes the decision: what is flagged, what is summarised, what order the queue is in, which cases carry a warning. A system that quietly pushes certain applicants down the list has affected outcomes without ever deciding anything.',
          },
          {
            type: 'list',
            items: [
              'Decide what the system may never use or infer: caste, religion, gender, region, and the crude proxies for them such as surname, address area or school.',
              'Test on history. Take a set of past files with known outcomes and compare what the system flags with what your team actually found.',
              'Compare rejection reasons across groups you can legitimately measure, such as first-time applicants, and ask why any pattern exists.',
              'Record a reason for every refusal in words the applicant could be given, not a score.',
              'Publish the checklist. If the requirements are written down, an applicant can fix a gap instead of guessing.',
              'Sample refused files each month with the process owner, and treat every corrected case as a test case.',
            ],
          },
          {
            type: 'p',
            text: 'The FREE-AI report treats this as a design property rather than a report you write afterwards: outcomes should be fair and non-discriminatory, and understandability should be a core design feature, with disclosures and outcomes that the deploying entity can explain. That is a fair test for an admissions system as much as a credit one. If nobody in the room can say why a file was flagged, the flag should not exist.',
          },
        ],
      },
      {
        id: 'data-and-consent',
        heading: 'What rules apply to the data in these files?',
        blocks: [
          {
            type: 'p',
            text: 'Both sectors handle sensitive material about people who are not in a strong position to argue. India’s [Digital Personal Data Protection Act, 2023](https://www.meity.gov.in/static/uploads/2024/06/2bf1f0e9f04e6fb4f8fef35e82c42aa5.pdf) applies to all of it. Two provisions matter especially here. Where personal data is likely to be used to make a decision affecting the person, or to be shared with another organisation, it must be complete, accurate and consistent. And a child is anyone under eighteen: processing a child’s personal data requires verifiable consent from a parent or lawful guardian, and tracking, behavioural monitoring and targeted advertising directed at children are not permitted.',
          },
          {
            type: 'p',
            text: 'For schools and colleges there is a narrow carve-out. The [Digital Personal Data Protection Rules, 2025](https://www.meity.gov.in/static/uploads/2025/11/53450e6e5dc0bfa85ebd78686cadad39.pdf), notified in November 2025, list educational institutions among the classes for whom two of those children’s provisions do not apply, where the processing is restricted to tracking and behavioural monitoring for the institution’s educational activities or in the interests of the safety of children enrolled with it. That is a specific permission for a specific purpose, not a general licence.',
          },
          {
            type: 'p',
            text: 'On the lending side, the Digital Lending Directions require that data collection through a lending app be need-based, with the borrower’s prior and explicit consent and an audit trail, and that the borrower be able to deny consent for specific data, restrict disclosure to third parties and revoke consent already given. Design for that from the start: collect the fields the file needs, say why, and keep the record of what was agreed.',
          },
          {
            type: 'note',
            tone: 'caution',
            title: 'General information, not legal advice',
            text: 'This summarises public documents as they stood in September 2026. The Directions apply to entities the Reserve Bank regulates and their service providers; data protection obligations commence in phases. Check the current text and take advice on your own position before you launch.',
          },
        ],
      },
      {
        id: 'where-to-start',
        heading: 'Where should you start, and what should you measure?',
        blocks: [
          {
            type: 'p',
            text: 'Start with completeness, in one programme or one loan product. It is the least risky part of the file, the easiest to specify and usually the largest share of the delay. Enquiry routing is a good second, because it needs the same records and gives the team back its mornings.',
          },
          {
            type: 'table',
            caption: 'What to measure on an application workflow',
            head: ['Measure', 'Why it matters'],
            rows: [
              ['Turnaround time per file', 'The number applicants actually feel'],
              ['Complete at first submission', 'Shows whether the chasing has reduced'],
              ['Rework and resubmissions', 'Catches checks that create work elsewhere'],
              ['Decisions with a recorded reason', 'The basis for explaining any outcome later'],
            ],
          },
          {
            type: 'p',
            text: 'Take those numbers before launch, including at the seasonal peak, and compare like for like afterwards. The document handling itself is [Business Operations](/systems/document-multimodal-intelligence) work: reading a file, checking it against your rules and records, and routing what does not fit to a named reviewer with the evidence attached. The decision at the end of it stays exactly where it was, which is the point of building the rest well.',
          },
        ],
      },
    ],
    limitations: [
      'A regulated lender carries obligations no supplier can absorb. Responsibility for the decision, the data and the complaint stays with the regulated entity.',
      'A system cannot make a thin file creditworthy or an incomplete application admissible. It can only make the gap visible sooner and cheaper.',
      'Fairness testing needs history. If you cannot assemble past files with outcomes and reasons, begin by recording decisions properly for a season.',
      'Seasonal peaks are the real test. A workflow that copes in a quiet month may still need extra people in the rush.',
      'General information, not legal advice. Sector rules change; confirm the current position with a qualified adviser before deployment.',
    ],
    faqs: [
      {
        q: 'Can AI approve or reject a loan application?',
        a: 'The credit decision should stay with the lender’s authorised people. Under the Reserve Bank of India (Digital Lending) Directions, 2025, the regulated entity must obtain the borrower’s economic profile and assess creditworthiness before extending a loan, keep it on record, and remains fully responsible even where a lending service provider is involved. A system can prepare and check the file. It should not decide, price or decline.',
      },
      {
        q: 'Can a college use AI to decide admissions?',
        a: 'Use it to check published criteria and completeness, not to select students. Eligibility rules that are written down can be verified mechanically, and that saves real time in the rush. Anything needing interpretation, such as an unfamiliar board, a hardship case or a discretionary seat, belongs with the admissions committee, which should record the reason for its decision in words the applicant could be shown.',
      },
      {
        q: 'How does AI help with KYC without taking over the checks?',
        a: 'It prepares the evidence. A system can confirm that the required documents are present, compare the name, date of birth and address across them, mark poor scans and expiry dates, and assemble the pack for the reviewer. The verification decision, and responsibility for it, stays with the people your policy names. Keep the collection need-based, take explicit consent, and log what was accessed.',
      },
      {
        q: 'What data protection rules apply to student and borrower files?',
        a: 'India’s Digital Personal Data Protection Act, 2023 applies to both. Personal data used for decisions about a person must be complete, accurate and consistent, and children under eighteen need verifiable parental consent, with limited exceptions for educational institutions set out in the 2025 Rules. Lending apps must collect on a need basis with explicit consent and an audit trail. This is general information, not legal advice.',
      },
      {
        q: 'Where does a system help most during admission season?',
        a: 'In the two hours a day counsellors lose to chasing. Capture every enquiry with its programme and language, route it to the right person, answer the published questions automatically, and let the system tell each applicant precisely which document is still missing. The counsellor then spends the call on the conversation that changes a decision, rather than on reading out a checklist.',
      },
    ],
    bybo: [
      {
        href: '/systems/document-multimodal-intelligence',
        label: 'Business Operations',
        why: 'Reads application documents, checks them against your rules and routes exceptions with the evidence attached.',
      },
      {
        href: '/industries',
        label: 'Industries',
        why: 'Shows how BYBO frames education and lending: enquiry routing, application completeness and handoff tracking.',
      },
      {
        href: '/insights/human-in-the-loop-product-decision',
        label: 'Design the human decision into the workflow',
        why: 'What the person approving a file needs: the evidence, a clear choice and a fallback.',
      },
    ],
    related: ['document-automation-workflow', 'ai-permissions-logs-approval-gates', 'build-buy-or-integrate-ai'],
    sources: [
      {
        title: 'Reserve Bank of India (Digital Lending) Directions, 2025 (RBI/2025-26/36, 8 May 2025)',
        publisher: 'Reserve Bank of India',
        url: 'https://www.rbi.org.in/Scripts/NotificationUser.aspx?Id=12848&Mode=0',
      },
      {
        title: 'Report of the Committee on Framework for Responsible and Ethical Enablement of Artificial Intelligence (FREE-AI) in the Financial Sector',
        publisher: 'Reserve Bank of India',
        url: 'https://rbidocs.rbi.org.in/rdocs/PublicationReport/Pdfs/FREEAIR130820250A24FF2D4578453F824C72ED9F5D5851.PDF',
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
    slug: 'ai-for-indian-consumer-brands',
    collection: 'indian-business',
    title: 'AI for Indian Consumer Brands: Support, Orders and Operational Visibility',
    seoTitle: 'AI for Indian Consumer Brands: Support and Orders',
    description:
      'How Indian D2C and retail brands use AI for order-status and returns queries, refund exceptions, review analysis and one reporting view across marketplaces.',
    dek:
      'Support queues, returns, stock questions and marketplace reports compete for the same few people. A system can answer from approved data, send the exceptions to a person and keep one honest view of the week.',
    keywords: [
      'AI for consumer brands India',
      'D2C customer support automation',
      'order status automation India',
      'returns and refunds automation',
      'marketplace reporting for D2C brands',
      'e-commerce consumer protection rules India',
    ],
    publishedAt: '2026-09-11',
    visual: {
      kind: 'compare',
      title: 'Support before and after a system',
      left: {
        label: 'How the queue runs today',
        items: [
          'Order questions answered by hand',
          'Policy quoted from memory',
          'Refund exceptions decided case by case',
          'Reviews read when someone has time',
          'Marketplace numbers rebuilt every Monday',
        ],
      },
      right: {
        label: 'With a system underneath',
        items: [
          'Order status read from the live record',
          'One approved answer per policy question',
          'Exceptions routed with the order attached',
          'Recurring issues counted and named',
          'One weekly view, definitions agreed',
        ],
      },
    },
    summary: [
      'Answer order and returns questions from live, approved data, or say plainly that a person will follow up.',
      'Refund exceptions, goodwill and complaints go to people, with the order, the conversation and the policy attached.',
      'Read reviews and support conversations to find recurring issues, not to produce a sentiment score nobody acts on.',
      'One reporting view across marketplaces and your own site is worth more than faster replies, and needs agreed definitions.',
    ],
    sections: [
      {
        id: 'where-the-day-goes',
        heading: 'Where does the day go in a consumer brand?',
        blocks: [
          {
            type: 'p',
            text: 'A growing Indian consumer brand usually runs on a small operations team and a very wide surface. Orders arrive through your own website and two or three marketplaces. Questions arrive on WhatsApp, Instagram, email and a phone number printed on the box. Returns arrive by courier, sometimes without the paperwork. Stock sits in a warehouse, a marketplace fulfilment centre and, if you have shops, in the shops. Every one of those has its own dashboard, and none of them agrees with the others.',
          },
          {
            type: 'p',
            text: 'BYBO’s [industries view](/industries) describes the pattern bluntly: support, returns and stock questions compete for the same attention. The jobs it lists are the practical ones, and they are the right first candidates: answer approved order-status questions, route return and refund exceptions, and read product feedback for recurring issues, with resolution time per enquiry as the measure.',
          },
          {
            type: 'p',
            text: 'None of that is glamorous. It is also where the week goes, and where customers form their opinion of a brand they have only ever met through a parcel.',
          },
        ],
      },
      {
        id: 'answer-from-approved-data',
        heading: 'Which questions can be answered from approved data?',
        blocks: [
          {
            type: 'p',
            text: 'A large share of every support queue is the same handful of questions, and each has a factual answer sitting in a system you already run:',
          },
          {
            type: 'list',
            items: [
              'Where is my order, and when will it arrive, taken from the live shipment record.',
              'Has my return been picked up, and has the refund been issued.',
              'What is the returns or exchange window for the item I bought.',
              'Do you deliver to this pin code, and what are the charges.',
              'How do I exchange a size, and what does the warranty cover.',
              'What does this charge on my invoice mean.',
            ],
          },
          {
            type: 'p',
            text: 'The discipline that makes this safe is narrow: the answer comes from the record, not from the model’s general knowledge. If the system cannot see the order, it must not estimate a delivery date. If the courier’s tracking has not updated in two days, the honest reply says so and offers a person. Set an alert for the case that quietly ruins trust, which is an integration that stops returning data while the replies keep going out.',
          },
          {
            type: 'note',
            tone: 'insight',
            title: '“I cannot see that” is a good answer',
            text: 'A plausible guess about a delivery date is worse than an admission and a callback. Build the system so that missing data produces a handover, and test it by disconnecting a source and watching what the customer receives.',
          },
        ],
      },
      {
        id: 'returns-and-refunds',
        heading: 'What happens with returns, refunds and complaints?',
        blocks: [
          {
            type: 'p',
            text: 'Split the work in two. Inside policy, a return within the window on an eligible item, the system can accept the request, book the pickup, tell the customer what happens next and record it. Outside policy, everything else: a return after the window, a damaged item, a missing parcel, a repeat complaint, a request for goodwill, anything involving a dispute or a threat to escalate. Those go to a person, with the order, the full conversation and the relevant policy line already attached, and with a limit on what each role can approve.',
          },
          {
            type: 'p',
            text: 'The obligations behind that queue are not optional. Under the [Consumer Protection (E-Commerce) Rules, 2020](https://consumeraffairs.gov.in/public/upload/files/E%20commerce%20rules_1732703966.pdf), notified in July 2020, an e-commerce entity must have a grievance redressal mechanism and appoint a grievance officer whose name, contact details and designation are displayed, and must ensure that the officer acknowledges a consumer complaint within forty-eight hours and redresses it within one month of receipt. Marketplace entities must give a ticket number for each complaint so the consumer can track it, and must provide information on returns, refunds, exchange, warranty and guarantee, delivery and shipment, payment methods and the grievance mechanism. Sellers on a marketplace carry their own grievance-officer duty on the same timelines.',
          },
          {
            type: 'p',
            text: 'More is coming. The [Consumer Protection (E-Commerce) (Amendment) Rules, 2026](https://consumeraffairs.gov.in/public/upload/files/E%20Commerce%20Amendment%20Rules%202026_1789127949.pdf), notified in September 2026 and stated to come into force from 1 January, keep those timelines and add duties: sponsored listings must be distinctly identified, a price reduction must be shown alongside the prior price, defined as the lowest price in the thirty days before the announcement, entities must not mislead users by manipulating search results, and every entity must comply with the Guidelines for Prevention and Regulation of Dark Patterns, 2023, conduct a yearly self-audit and display a certificate to that effect.',
          },
          {
            type: 'note',
            tone: 'caution',
            title: 'General information, not legal advice',
            text: 'An automated acknowledgement is not redress, and a bot that cannot be escaped is not a grievance mechanism. These duties sit with your business, not with a supplier. Check the current text and take advice on how the rules apply to you.',
          },
        ],
      },
      {
        id: 'reviews-and-feedback',
        heading: 'What can you actually learn from reviews and support conversations?',
        blocks: [
          {
            type: 'p',
            text: 'Most brands already have the answer to their biggest quality problem, written down by customers, spread across a marketplace review page, a support inbox and a hundred Instagram replies. The useful job is not scoring that material. It is grouping it: reading everything from the last month, sorting it into recurring issues, counting each one and naming what it attaches to.',
          },
          {
            type: 'p',
            text: 'A good output reads like an operations note. Fourteen mentions of a pump that leaks, all on one batch code. Nine complaints about delivery delays, all to the same set of pin codes. Six people describing the same size as running small, all on one style. Each theme carries three real quotations and a link to the orders behind it, so the person reading it can check rather than believe. Point it at your own support conversations too, since the complaints that never reach a public review are often the more useful ones.',
          },
          {
            type: 'example',
            title: 'Illustrative example: a Bengaluru skincare brand’s returns queue',
            text: 'Suppose a skincare brand ships around 9,000 orders a month across its own site and two marketplaces, with returns running higher than the founder expects. A monthly read of returns reasons, reviews and support chats groups them: most returns cite a leaking cap, and almost all of those orders trace back to one production batch and one courier region. The system does not decide anything. It produces a list with counts, examples and order references. Operations checks the batch, quality changes the cap supplier, and support gets one approved answer for affected customers. The next month’s list is compared with this one, which is how anyone can tell whether the fix worked.',
          },
          {
            type: 'p',
            text: 'Two things to avoid. A sentiment score is a number that moves without telling anyone what to do; prefer counted themes with examples. And drafted replies to public reviews should be approved by a person before they are posted, because a reply is a public statement about a product from your brand.',
          },
        ],
      },
      {
        id: 'one-view-across-channels',
        heading: 'How do you get one view across marketplaces and your own site?',
        blocks: [
          {
            type: 'p',
            text: 'Most reporting arguments in consumer businesses are definition arguments in disguise. The marketplace dashboard, the website analytics and the accounts sheet all report a different number for the same week, and the meeting spends its first twenty minutes deciding whose number to believe. No system fixes that until people agree what the words mean.',
          },
          {
            type: 'table',
            caption: 'Definitions to settle before any dashboard',
            head: ['Term', 'Question to settle'],
            rows: [
              ['An order', 'Counted when placed, dispatched or delivered'],
              ['Revenue', 'Gross, net of returns, or net of marketplace fees'],
              ['A return', 'Dated by request, pickup or refund'],
              ['A stock-out', 'Zero in the warehouse, or unavailable to buy'],
            ],
          },
          {
            type: 'p',
            text: 'With those agreed, a reporting system can pull each source on a schedule, apply the same definitions, reconcile what does not match and show what changed rather than everything. That is [Decision Intelligence](/systems/decision-intelligence) work: connected data, checked freshness, changes worth attention, and people who interpret them. Include a data-freshness line on the report itself. A number that is three days stale and a number from this morning should not sit side by side without saying so.',
          },
        ],
      },
      {
        id: 'stock-and-campaigns',
        heading: 'Can it help with stock visibility and campaign coordination?',
        blocks: [
          {
            type: 'p',
            text: 'This is where reporting turns into operations. The costly mistakes in a consumer brand tend to be coordination failures rather than analysis failures: money spent driving traffic to a size that ran out yesterday, a launch email sent before the listing went live, a marketplace price that nobody remembered to change back.',
          },
          {
            type: 'list',
            items: [
              'Watch stock against planned promotions and warn before a campaign points at a product you cannot ship.',
              'Flag listings that are live in one channel and missing in another, or priced differently without a reason.',
              'Run the launch checklist across teams: listing, images, stock, price, support answers, courier serviceability.',
              'Prepare the daily exception list: undelivered orders past their promise date, pickups not collected, refunds pending beyond your own limit.',
              'Draft the routine coordination messages to a warehouse or courier, for a person to send.',
            ],
          },
          {
            type: 'p',
            text: 'Keep the actions bounded. Alerting a marketing owner that a promoted product is nearly out of stock is a safe automation. Pausing the campaign itself, changing a price or messaging a customer about a substitute are decisions with money attached, and belong behind an approval that a named person gives.',
          },
        ],
      },
      {
        id: 'what-to-do-first',
        heading: 'What should you do first?',
        blocks: [
          {
            type: 'p',
            text: 'Take one channel, the one carrying most questions, and one question type, usually order status. Connect it to the live record, write the escape route to a person, and run it for a month against a baseline you took first: time to a useful reply, share resolved without a person, and how many customers had to repeat themselves. Add returns inside policy next, then the monthly feedback read, then reporting once the definitions are agreed. Our guide on [automating customer enquiries](/insights/automate-customer-enquiries) covers the handover in more detail.',
          },
          {
            type: 'p',
            text: 'Two things to hold on to as it grows. Support conversations contain personal data, and India’s [Digital Personal Data Protection Act, 2023](https://www.meity.gov.in/static/uploads/2024/06/2bf1f0e9f04e6fb4f8fef35e82c42aa5.pdf) requires reasonable security safeguards for it, so collect what the query needs and no more. And watch the running cost per resolved conversation alongside the volume, because a queue that grows cheaply is the point of the exercise, and a queue that grows expensively is just a bigger queue.',
          },
        ],
      },
    ],
    limitations: [
      'If your order and stock records are inaccurate, faster answers spread the error further. Fix the record before automating the reply.',
      'Marketplaces decide what data and actions they allow. Check what each channel permits before promising a single view or automated updates.',
      'Reviews tell you about people who wrote reviews. Treat them as a signal about products and batches, not as a measure of your customers.',
      'Automation cannot rescue a policy customers find unfair. It applies that policy faster, more consistently and more visibly.',
      'General information, not legal advice. Consumer protection and data protection duties sit with your business; confirm the current position with an adviser.',
    ],
    faqs: [
      {
        q: 'Can AI answer order-status questions on its own?',
        a: 'Yes, when it reads the live order and shipment record and is built to stop when it cannot. Give it the order data, the returns policy and the delivery information as approved sources, and require a handover whenever the record is missing, stale or contradictory. Keep a clear route to a person in every conversation, and check what each messaging channel’s own policies require before you launch.',
      },
      {
        q: 'Should refunds be issued automatically?',
        a: 'Only inside limits you have written down, such as a return within the window on an eligible item below a value you set. Everything else, including late returns, damaged goods, missing parcels, repeat complaints and goodwill, should reach a person with the order and conversation attached. Refunds move money, so they deserve the same approval discipline as any other payment.',
      },
      {
        q: 'What do India’s e-commerce rules require for customer complaints?',
        a: 'Under the Consumer Protection (E-Commerce) Rules, 2020, an e-commerce entity must have a grievance redressal mechanism and a named grievance officer displayed on the platform, and the officer must acknowledge a complaint within forty-eight hours and redress it within one month. Marketplace entities must also give a ticket number for tracking. Automation can help you meet those timelines; it does not transfer the duty. This is general information, not legal advice.',
      },
      {
        q: 'Can AI write replies to our marketplace reviews?',
        a: 'It can draft them, and a person should approve them before they are posted. A review reply is a public statement about your product, and a confident wrong one, such as promising a replacement policy you do not offer, is expensive to withdraw. Use the drafting to save time on wording, and keep the approval, especially for anything involving a defect, a refund or a health claim.',
      },
      {
        q: 'How do we compare marketplace and website performance fairly?',
        a: 'Agree the definitions before building any dashboard: when an order is counted, whether revenue is gross or net of returns and fees, how a return is dated, and what counts as a stock-out. Then pull each source on a schedule, apply those definitions to all of them, and show the reconciliation. Add a freshness stamp so nobody compares this morning’s figure with last week’s.',
      },
    ],
    bybo: [
      {
        href: '/systems/decision-intelligence',
        label: 'Decision Intelligence',
        why: 'Connects channel data, agrees definitions and shows the changes worth attention, with people making the call.',
      },
      {
        href: '/industries',
        label: 'Industries',
        why: 'Shows how BYBO frames D2C, retail and hospitality work: support, returns, feedback and outlet reporting.',
      },
      {
        href: '/systems/customer-workforce-ai',
        label: 'Customer & Workforce AI',
        why: 'Handles enquiries and follow-ups from approved information, and hands sensitive conversations to a person.',
      },
    ],
    related: ['spreadsheet-reporting-to-decision-intelligence', 'measure-ai-system-performance', 'd2c-website-design-india'],
    sources: [
      {
        title: 'Consumer Protection (E-Commerce) Rules, 2020 (G.S.R. 462(E), 23 July 2020)',
        publisher: 'Department of Consumer Affairs, Ministry of Consumer Affairs, Food and Public Distribution',
        url: 'https://consumeraffairs.gov.in/public/upload/files/E%20commerce%20rules_1732703966.pdf',
      },
      {
        title: 'Consumer Protection (E-Commerce) (Amendment) Rules, 2026',
        publisher: 'Department of Consumer Affairs, Ministry of Consumer Affairs, Food and Public Distribution',
        url: 'https://consumeraffairs.gov.in/public/upload/files/E%20Commerce%20Amendment%20Rules%202026_1789127949.pdf',
      },
      {
        title: 'The Digital Personal Data Protection Act, 2023 (No. 22 of 2023)',
        publisher: 'Ministry of Electronics and Information Technology, Government of India',
        url: 'https://www.meity.gov.in/static/uploads/2024/06/2bf1f0e9f04e6fb4f8fef35e82c42aa5.pdf',
      },
    ],
  },
];

export default guides;
