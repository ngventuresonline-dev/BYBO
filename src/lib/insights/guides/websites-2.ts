import type { Guide } from '../types';

const guides: Guide[] = [
  {
    slug: 'website-design-strategy-india',
    collection: 'websites',
    title: 'Website Design for Indian Businesses: Strategy Before Screens',
    seoTitle: 'Website Design for Indian Businesses: Strategy First',
    description: 'What to decide before a designer opens a file: audience, positioning, the job of each page, content, languages, mobile and WhatsApp journeys.',
    dek: 'Most website projects start with a reference link and end in arguments about taste. Here is what to agree first — and a one-page brief you can write yourself before any design begins.',
    keywords: [
      'website design for Indian businesses',
      'website strategy',
      'website brief template',
      'website planning India',
      'business website design',
      'website content strategy',
    ],
    publishedAt: '2026-09-11',
    visual: {
      kind: 'flow',
      title: 'The order that saves rework',
      steps: ['Audience', 'Positioning', 'Page jobs', 'Sign off brief', 'Design and build', 'Measure'],
      gate: 3,
      gateLabel: 'You approve the brief before design begins.',
    },
    summary: [
      'Agree the audience, the promise and the job of each page in writing before anyone designs a screen.',
      'Content sets the schedule. Words and photographs take far longer to produce than layouts take to draw.',
      'Languages, mobile layouts and WhatsApp replies are strategy decisions, not features added at the end.',
      'Choose two or three measures and record today’s baseline, or you cannot tell whether the new site worked.',
    ],
    sections: [
      {
        id: 'why-strategy-first',
        heading: 'Why does strategy come before the first screen?',
        blocks: [
          {
            type: 'p',
            text: 'Most website projects begin in the wrong place. Someone shares a link to a site they admire, a designer is asked to make something in that spirit, and within a week there are screens to react to. From then on the project is a conversation about taste: this shade of green, that photograph, a larger logo. The questions that decide whether the website earns anything are still unanswered, and now they are expensive to raise.',
          },
          {
            type: 'p',
            text: 'Strategy before screens does not mean a long document or a research phase your business cannot afford. It means writing down a small number of decisions first: who the site is for, what you want them to think, what each page has to achieve, which words and pictures you will need, and how you will judge the result. Those decisions take a few conversations. Reversing them after a design is approved takes weeks.',
          },
          {
            type: 'note',
            tone: 'insight',
            title: 'Most design arguments are unresolved strategy',
            text: 'When a team cannot agree on a homepage, the real disagreement is usually about who the site is for or what the business wants to be known for. Settle that and most layout choices answer themselves.',
          },
        ],
      },
      {
        id: 'audience-and-job',
        heading: 'Who is the website actually for?',
        blocks: [
          {
            type: 'p',
            text: 'The honest answer for many businesses is “everyone who might buy from us”, which is the same as nobody. A manufacturer in Coimbatore may be visited by a procurement manager at a large buyer, a distributor in another state, an existing customer hunting for a spare part number, and a candidate deciding whether to apply. All four are welcome. They cannot all own the first screen.',
          },
          {
            type: 'p',
            text: 'So rank them. Write the list in order of commercial importance, then write what each one came for and the single action you want from them. This is the shortest useful piece of strategy you can do, and it settles arguments later: when someone asks for a careers banner on the homepage, you can point at the list and ask which audience it serves.',
          },
          {
            type: 'table',
            caption: 'Rank the audiences, then name one action each',
            head: ['Who visits', 'What they came for', 'The action you want'],
            rows: [
              ['A procurement manager', 'Proof you can supply at scale', 'Request a quotation'],
              ['A distributor in another state', 'Territory and commercial terms', 'Ask about partnership'],
              ['A returning customer', 'A part number or document', 'Find it without a form'],
              ['A candidate', 'What working here is like', 'See open roles'],
            ],
          },
        ],
      },
      {
        id: 'positioning',
        heading: 'What do you want to be known for?',
        blocks: [
          {
            type: 'p',
            text: 'Positioning is the sentence a visitor could repeat to a colleague the next day. It is not a tagline and it is rarely poetic. “Fit-out and equipment for new dental clinics, across Maharashtra, in eight weeks” is positioning. “Quality solutions with a customer-first approach” is filler, and every competitor in your city can claim it without changing a word.',
          },
          {
            type: 'p',
            text: 'A specific claim carries a risk that a vague one avoids: someone can hold you to it. That is exactly why it persuades. Decide what you are willing to be held to, then decide what proves it. Proof is photographs of finished work, a list of the sectors you serve, the qualifications you actually hold, the names of the people who will do the job, and a straight answer on what you do not do.',
          },
          {
            type: 'p',
            text: 'Write the positioning line and the three proofs before the design brief. Both will shape the first screen, the order of the pages and the photographs you need to commission. Our fictional [NORTH advisory concept](/systems/website-design-development#concept-advisory) shows the effect: the site opens with a point of view rather than a description of the category.',
          },
        ],
      },
      {
        id: 'page-jobs',
        heading: 'Give every page one job',
        blocks: [
          {
            type: 'p',
            text: 'A website is not a brochure that happens to scroll. Each page should have one job, one main question it answers and one obvious next step. If you cannot say what a page is for, it does not need to exist, and every page you remove is a page you no longer have to write, photograph, translate and maintain.',
          },
          {
            type: 'list',
            items: [
              'Home: say what you do, for whom, and offer one clear next step.',
              'Service pages: answer the questions that decide the enquiry, then invite it.',
              'Work or projects: prove the standard with real examples rather than adjectives.',
              'About: show the people, the premises and the reason to trust them.',
              'Contact: make every route work — form, phone, WhatsApp, map, opening hours.',
            ],
          },
          {
            type: 'p',
            text: 'Sequence matters as much as the list. A visitor who arrives from a search result rarely lands on the homepage, so each page has to make sense on its own and point somewhere sensible next. Our companion guide on how to [plan a sitemap around the customer journey](/insights/website-sitemap-customer-journey) takes that further.',
          },
        ],
      },
      {
        id: 'content-first',
        heading: 'Why content should be written before the design',
        blocks: [
          {
            type: 'p',
            text: 'Placeholder text flatters a design. Real copy tests it. A heading that reads beautifully as three invented words often becomes four awkward lines once it says what your business really does, and a product grid designed for square studio shots looks wrong the moment your actual site photographs arrive.',
          },
          {
            type: 'p',
            text: 'Content is also the usual reason website projects slip. Design work can be scheduled; writing and photography depend on people who have other jobs. Decide who writes each page, who approves it and by when, before the design begins. Decide which photographs must be taken, and book the shoot early — a factory floor, a clinic reception or a finished flat cannot be photographed the week before launch.',
          },
          {
            type: 'example',
            title: 'Illustrative example: a Coimbatore pump manufacturer’s content list',
            text: 'Imagine a manufacturer planning twelve pages. Before any design starts, the marketing head lists what each page needs: a spec sheet, three photographs, an owner and a date. Two product pages have no owner and no photographs, because nobody in the company can describe those lines confidently. They are merged into one page with a “talk to an engineer” action. The site is now ten pages, all of which can actually be finished. The design brief shrinks with it.',
          },
        ],
      },
      {
        id: 'languages-mobile-whatsapp',
        heading: 'Languages, phones and the WhatsApp journey',
        blocks: [
          {
            type: 'p',
            text: 'Language is a strategy decision with design consequences. If you need Hindi, Tamil or Marathi alongside English, decide it now: it changes navigation, typography, line lengths and the translation budget. Google advises that you [use different URLs for each language version](https://developers.google.com/search/docs/specialty/international/managing-multi-regional-sites) rather than swapping content behind one address, and to avoid redirecting people automatically based on the language you assume they want. Give them a visible way to switch instead.',
          },
          {
            type: 'p',
            text: 'Each page should also declare its own language in the code. The W3C requires that [the default human language of each page can be programmatically determined](https://www.w3.org/WAI/WCAG22/Understanding/language-of-page.html) so that screen readers use the right pronunciation rules and browsers render the script correctly. Half-translated pages, where the menu changes but the body does not, fail both readers and search engines.',
          },
          {
            type: 'p',
            text: 'Phones come next, and not as a smaller version of the desktop design. Google [uses the mobile version of a site’s content](https://developers.google.com/search/docs/crawling-indexing/mobile/mobile-sites-mobile-first-indexing) for indexing and ranking, and recommends the same content, headings and image alt text on both. Design the phone layout first, then let the desktop layout inherit from it. Our guide to [mobile website experience](/insights/mobile-website-experience) covers the detail.',
          },
          {
            type: 'note',
            tone: 'caution',
            title: 'A WhatsApp button is a promise, not a feature',
            text: 'Decide whose phone it opens, the hours it is answered and what happens to the enquiry afterwards. Follow-up messages need consent: the [WhatsApp Business Messaging Policy](https://whatsappbusiness.com/policy/) requires opt-in permission from the recipient confirming they wish to receive your messages.',
          },
        ],
      },
      {
        id: 'measurement',
        heading: 'Decide now how you will know it worked',
        blocks: [
          {
            type: 'p',
            text: 'Agree two or three measures before the build, and record where you stand today. Enquiry form completions, calls and WhatsApp taps, bookings taken, quotation requests from the pages that matter: pick what reflects the business, not what is easy to count. Without a baseline from the current site, the new one can only be judged on how it looks.',
          },
          {
            type: 'list',
            items: [
              'Analytics that record the actions that matter, not only page views.',
              'A confirmation step for every form, so submissions can be counted honestly.',
              'Taps on phone numbers and WhatsApp links counted as actions.',
              'Search Console connected, with the current pages and their traffic exported before launch.',
              'A named owner and a monthly review of the same few numbers.',
            ],
          },
          {
            type: 'p',
            text: 'Be patient with search. Google’s own starter guide is blunt about it: “There are no secrets here that’ll automatically rank your site first in Google”, and it notes that [some changes might take effect in a few hours, others could take several months](https://developers.google.com/search/docs/fundamentals/seo-starter-guide). Judge a launch on enquiries and completed journeys first, and on search position over a longer period.',
          },
        ],
      },
      {
        id: 'one-page-brief',
        heading: 'A one-page website brief you can write yourself',
        blocks: [
          {
            type: 'p',
            text: 'You do not need a strategy consultant to produce a usable brief. Ten lines, agreed by the people who can actually decide, will do more for the project than a fifty-page document nobody reads. Write it before you invite proposals, and give the same sheet to every studio you speak to, so their quotations describe the same job.',
          },
          {
            type: 'list',
            ordered: true,
            items: [
              'The audiences, in order of importance, described as real people.',
              'What you want each audience to think, and the one action you want from them.',
              'Your positioning in a sentence a customer could repeat.',
              'Three pieces of proof you can actually show.',
              'The page list, each page with one job and one primary action.',
              'Languages, and who will translate and check them.',
              'A content owner and a date for every page.',
              'The photography and video that must be created.',
              'Integrations: payments, bookings, enquiry routing, your existing tools.',
              'Two or three measures, today’s baseline, and who reviews them monthly.',
            ],
          },
          {
            type: 'p',
            text: 'This is the same ground our [Website Design & Development](/systems/website-design-development) work covers before any visual direction is shown: audience, brand and business goals, then sitemap, copy and journeys, and only then design. If the harder question is what happens after the enquiry arrives — who replies, what gets recorded, which steps could be handled by a system — that is a workflow question rather than a website one, and the [AI Opportunity Blueprint](/blueprint) is the paid diagnostic that maps it.',
          },
        ],
      },
    ],
    limitations: [
      'A brief cannot replace judgement. Someone still has to choose between two good directions and own the choice.',
      'If the business itself cannot say what it sells and to whom, the website will not settle it. Fix that first.',
      'A single campaign or event page does not need this. One page job and one action is enough.',
      'Measures show what happened, not why. Talk to a few customers who did enquire, and a few who did not.',
      'Strategy will not rescue a site nobody maintains. Agree who owns content after launch, or the pages will drift.',
    ],
    faqs: [
      {
        q: 'What should we decide before hiring a website designer?',
        a: 'Decide your audiences in order of importance, the positioning line you want to be known for, the page list with one job per page, who writes and approves each page, whether you need more than one language, and the two or three measures you will judge the site by. Give the same sheet to every studio you approach, so the quotations you compare describe the same job.',
      },
      {
        q: 'Should the content be written before or after the design?',
        a: 'Before, or alongside. Real copy tests a layout in a way placeholder text cannot, and headings written to fit a design are usually vaguer than headings written to be true. In practice content is also what delays projects, because writing and photography depend on people with other responsibilities. Name an owner and a date for every page at the start.',
      },
      {
        q: 'Does our website need a Hindi or regional language version?',
        a: 'It depends on who buys from you and how they read. Decide before design, because a second language affects navigation, typography and budget. Google recommends a separate URL for each language version and advises against redirecting people automatically to a language you assume they want. Half-translated pages, where only the menu changes, serve nobody well.',
      },
      {
        q: 'Should a business website have a WhatsApp button?',
        a: 'Only if someone will answer it. A WhatsApp link changes what visitors expect: a quick, personal reply during working hours. Agree whose phone receives the chats, the hours you will answer, and how enquiries are recorded afterwards. For later marketing messages you need consent, as WhatsApp’s messaging policy requires opt-in permission from the recipient.',
      },
      {
        q: 'How do we measure whether a new website worked?',
        a: 'Choose two or three measures that reflect the business — enquiries completed, calls and WhatsApp taps, bookings, quotation requests — and record the current figures before launch. Set up analytics for those actions, connect Search Console, and give one person a monthly review. Judge enquiries and completed journeys first; search position takes longer to settle.',
      },
    ],
    bybo: [
      {
        href: '/systems/website-design-development',
        label: 'Website Design & Development',
        why: 'Discovery, sitemap, copy and journeys are agreed with you before any visual direction is designed.',
      },
      {
        href: '/systems/website-design-development#concept-advisory',
        label: 'NORTH advisory concept',
        why: 'A fictional concept showing what clear positioning looks like on the first screen.',
      },
      {
        href: '/blueprint',
        label: 'AI Opportunity Blueprint',
        why: 'A paid diagnostic for the workflow behind the website, such as how enquiries are handled.',
      },
    ],
    related: ['website-sitemap-customer-journey', 'what-makes-a-website-feel-premium', 'automate-customer-enquiries'],
    sources: [
      {
        title: 'Managing multi-regional and multilingual sites',
        publisher: 'Google Search Central',
        url: 'https://developers.google.com/search/docs/specialty/international/managing-multi-regional-sites',
      },
      {
        title: 'Understanding Success Criterion 3.1.1: Language of Page',
        publisher: 'W3C Web Accessibility Initiative',
        url: 'https://www.w3.org/WAI/WCAG22/Understanding/language-of-page.html',
      },
      {
        title: 'Mobile site and mobile-first indexing best practices',
        publisher: 'Google Search Central',
        url: 'https://developers.google.com/search/docs/crawling-indexing/mobile/mobile-sites-mobile-first-indexing',
      },
      {
        title: 'SEO Starter Guide: The Basics',
        publisher: 'Google Search Central',
        url: 'https://developers.google.com/search/docs/fundamentals/seo-starter-guide',
      },
      {
        title: 'WhatsApp Business Messaging Policy',
        publisher: 'WhatsApp',
        url: 'https://whatsappbusiness.com/policy/',
      },
    ],
  },
  {
    slug: 'business-website-cost-india',
    collection: 'websites',
    title: 'How Much Does a Professional Business Website Cost in India?',
    description: 'The honest drivers of website cost: strategy and copy, design templates, CMS, integrations, photography, performance, hosting and maintenance.',
    dek: 'Nobody can price a website before the scope exists. Here is what actually drives the cost, where quotations differ without saying so, and how to compare three proposals fairly.',
    keywords: [
      'business website cost India',
      'website design cost',
      'website development pricing',
      'how much does a website cost',
      'website maintenance cost',
      'template vs custom website',
    ],
    publishedAt: '2026-09-11',
    visual: {
      kind: 'layers',
      title: 'What you are actually paying for',
      layers: [
        { label: 'Strategy & content', note: 'Audience, positioning, sitemap, words' },
        { label: 'Design', note: 'Art direction and page templates' },
        { label: 'Build & CMS', note: 'Pages, editing tools, testing, handover' },
        { label: 'Integrations', note: 'Payments, bookings, CRM, WhatsApp, analytics' },
        { label: 'Running costs', note: 'Hosting, domain, licences, ongoing care' },
      ],
    },
    summary: [
      'A website price without a defined scope is a guess. Agree the deliverables, then ask for the number.',
      'Design cost follows the number of distinct templates, not the number of pages. Integrations follow complexity.',
      'Content, photography and translation are real costs, and they are the ones most often left out of quotations.',
      'Compare quotations line by line: same pages, same integrations, same content, same support after launch.',
    ],
    sections: [
      {
        id: 'why-no-price-list',
        heading: 'Why can nobody quote a website price straight away?',
        blocks: [
          {
            type: 'p',
            text: 'A website is not a product with a shelf price. Two businesses can ask for “a professional website” and mean jobs that differ by an order of magnitude: one needs eight pages of clear copy and an enquiry form, the other needs a product catalogue, payments, delivery rules, a booking calendar and two languages. The words are the same. The work is not.',
          },
          {
            type: 'p',
            text: 'This is why serious studios ask questions before they quote, and why BYBO publishes no price list. Our own answer on the [Website Design & Development](/systems/website-design-development) page is deliberately plain: what it costs depends on the pages, content, functionality and integrations, and the deliverables, fee and schedule are agreed after we understand your brief. What follows is not a price guide. It is a list of the things that move the number, so you can read a quotation and know what you are looking at.',
          },
          {
            type: 'note',
            tone: 'insight',
            title: 'Negotiate the scope, not the number',
            text: 'A lower price for the same brief usually means something has quietly been removed: the copywriting, the photography, the testing, or the support after launch. Change what you are buying before you argue about what it costs.',
          },
        ],
      },
      {
        id: 'strategy-and-copy',
        heading: 'Strategy and copy: the line most quotations leave out',
        blocks: [
          {
            type: 'p',
            text: 'The first real cost is thinking and writing. Someone has to establish who the site is for, what it must achieve, how the pages are ordered, and then write every heading, paragraph, service description and button label. That work exists whether or not it appears on the invoice. When it is missing from the quotation, it has usually been handed to you, and it is the reason website projects sit half-finished for months.',
          },
          {
            type: 'p',
            text: 'So read each proposal for the answer to one question: who is writing the words? If the studio is, the price includes interviews, drafts and revisions. If you are, your own team’s time is a real cost that will not appear anywhere in the comparison. Our guide on [strategy before screens](/insights/website-design-strategy-india) sets out what to decide before anyone quotes, and the same brief given to three studios produces three comparable numbers.',
          },
        ],
      },
      {
        id: 'design-and-templates',
        heading: 'Design cost follows templates, not pages',
        blocks: [
          {
            type: 'p',
            text: 'People instinctively count pages. Designers count templates. Fifty news articles that share one layout are one design; five pages that each look different are five. When you ask for a quotation, describe the distinct page types you need — home, service, product, article, contact — rather than the total page count, and the estimate becomes far more accurate.',
          },
          {
            type: 'p',
            text: 'Art direction is the other variable. A distinctive visual identity, custom illustration, considered motion and layouts drawn for your own photographs take longer than adapting a familiar pattern. Neither is wrong. A trade supplier may be better served by a clear, fast, unremarkable catalogue than by an award-winning homepage, and paying for restraint is a legitimate choice.',
          },
          {
            type: 'example',
            title: 'Illustrative example: two quotations for the same fourteen pages',
            text: 'Suppose a hospitality group asks three studios for a fourteen-page website. The first quotes fourteen individually designed pages with copy written from interviews and a photography day. The second quotes five templates, existing text supplied by the client and stock imagery. The third sits between them. All three are honest. Only the first two are easy to tell apart, because the third does not say how many templates it includes or who writes the copy. That is the line to ask about.',
          },
        ],
      },
      {
        id: 'build-cms-integrations',
        heading: 'Build, content management and integrations',
        blocks: [
          {
            type: 'p',
            text: 'Development turns approved designs into working pages: responsive layouts, forms, navigation, error states, testing on real devices. A content management system is a separate decision. Being able to edit your own pages is worth paying for, but every editable region has to be built, documented and tested, so “we want to change everything ourselves” costs more than “we will ask you twice a year”.',
          },
          {
            type: 'p',
            text: 'Integrations are where quotations diverge most, because each one is a small project with its own testing, failure cases and running charges.',
          },
          {
            type: 'list',
            items: [
              'Payments: a gateway account, checkout flow, refunds, invoices and per-transaction charges set by the provider.',
              'Bookings: real availability, confirmations, cancellations and the calendar your team already uses.',
              'CRM or sales tools: where an enquiry lands, who is notified and what is recorded.',
              'WhatsApp: a chat link is simple; automated notifications through the business platform are not.',
              'Analytics and tag management, consent handling, and the events that make measurement possible.',
            ],
          },
          {
            type: 'p',
            text: 'Ask for each integration to be listed separately, with what happens when it fails. If enquiries are meant to flow into an existing system, the cost of that plumbing belongs in the website budget rather than being discovered afterwards. The same reasoning applies to internal systems, which we cover in [how much business automation costs in India](/insights/business-automation-cost-india).',
          },
        ],
      },
      {
        id: 'photography-accessibility-performance',
        heading: 'Photography, accessibility and performance',
        blocks: [
          {
            type: 'p',
            text: 'Photography is the cost most often postponed and most often regretted. Your own pictures of premises, people, products and finished work are what separate your site from a template. A shoot has a fee, a day of your team’s time and usually a second visit for the things everyone forgot. Video costs more again. Budget for it at the start, or accept that the design will be built around images you do not own.',
          },
          {
            type: 'p',
            text: 'Accessibility is work, not a switch. The W3C publishes the Web Content Accessibility Guidelines with [success criteria at three levels: A, AA and AAA](https://www.w3.org/WAI/standards-guidelines/wcag/), and WCAG 2.2 is the current version. Meeting a level takes decisions during design — contrast, focus states, labels, keyboard order, alternative text — and a check before launch. Ask which level a studio is quoting for, and whether an audit is included or excluded.',
          },
          {
            type: 'p',
            text: 'Performance behaves the same way. According to [web.dev](https://web.dev/articles/vitals), a good experience means Largest Contentful Paint within 2.5 seconds, Interaction to Next Paint of 200 milliseconds or less and Cumulative Layout Shift of 0.1 or less, at the 75th percentile of page loads. Reaching those numbers on an ordinary phone takes image work, restraint with scripts and testing time. A quotation that ignores performance is not cheaper; it is incomplete.',
          },
        ],
      },
      {
        id: 'running-costs',
        heading: 'SEO foundations, hosting, domain and the yearly bill',
        blocks: [
          {
            type: 'p',
            text: 'Search foundations are part of the build: sensible URLs, titles and descriptions, headings, image alt text, a sitemap, Search Console connected and pages that load well. That is different from an ongoing search campaign, which is a separate service with a separate fee. Be careful of anyone who blurs the two. Google is direct about it: [no one can guarantee a #1 ranking on Google](https://developers.google.com/search/docs/fundamentals/do-i-need-seo), and it advises caution with firms that claim to.',
          },
          {
            type: 'p',
            text: 'Then there is the yearly bill, which continues long after the project ends. Domain registration and renewal. Hosting or platform subscriptions. Theme, plugin or font licences. A backup and security arrangement. Somebody to fix things. Third parties add their own charges too: a payment provider takes a share of each transaction, and under [Meta’s WhatsApp Business Platform pricing](https://developers.facebook.com/docs/whatsapp/pricing) you are charged when a template message is delivered, at rates that vary by the recipient’s country, while service messages are free. Ask for all of it in writing as an annual figure, and check the renewal price rather than the introductory one.',
          },
          {
            type: 'table',
            caption: 'One-time build costs and recurring costs',
            head: ['Recurring item', 'Set by', 'Ask before you sign'],
            rows: [
              ['Domain and hosting', 'Registrar and host', 'Renewal price, not the first-year offer'],
              ['Platform or plugin licences', 'The vendor', 'What breaks if a licence lapses'],
              ['Payment gateway', 'The provider', 'Per-transaction charges and settlement terms'],
              ['WhatsApp notifications', 'Meta', 'Which message types are charged'],
              ['Maintenance and support', 'Your studio', 'Response times and what counts as included'],
            ],
          },
        ],
      },
      {
        id: 'template-vs-custom',
        heading: 'Template or custom: which is honest for your business?',
        blocks: [
          {
            type: 'p',
            text: 'A template is not a compromise for every business. A single-location clinic that needs directions, timings, services and a booking link can be well served by a good template, launched quickly, with the saved budget spent on photography. What a template cannot do is make you look unlike everyone else who bought it, and its limits appear when you want a layout it was not designed for.',
          },
          {
            type: 'p',
            text: 'A custom build is worth it when the website has to do a job specific to your business: an unusual product journey, a booking flow with real constraints, several audiences with different needs, or a brand that is genuinely part of what you sell. It costs more at the start and gives you a foundation you can extend. The wrong version of this decision is expensive in both directions: an over-built site for a simple need, or a stretched template that fights every change for the next three years.',
          },
          {
            type: 'note',
            tone: 'caution',
            title: 'Count the cost over three years',
            text: 'Compare the build fee plus three years of subscriptions, licences, maintenance and the changes you know are coming. The cheaper first invoice is not always the cheaper website.',
          },
        ],
      },
      {
        id: 'compare-quotes',
        heading: 'How to compare three quotations fairly',
        blocks: [
          {
            type: 'p',
            text: 'Quotations become comparable only when the brief is the same. Send every studio the same page list, the same integrations and the same statement about who writes the copy. Then read each proposal for what it does not mention, which is where most disputes begin.',
          },
          {
            type: 'list',
            ordered: true,
            items: [
              'How many distinct page templates are included, and what does an extra one cost?',
              'Who writes the copy, and how many rounds of revision are included?',
              'Is photography included, arranged, or assumed to be supplied by us?',
              'Which integrations are in scope, and who pays their ongoing charges?',
              'What accessibility and performance standard is being targeted, and who verifies it?',
              'What is included after launch, for how long, and what is charged by the hour?',
              'Who owns the design files, code, content and domain when we part company?',
              'Is the fee inclusive of GST, and what is the payment schedule?',
            ],
          },
          {
            type: 'p',
            text: 'If you would rather start from the work than from a number, tell us what the website has to achieve and we will shape the scope with you, then agree the deliverables, fee and schedule. You can [start a website enquiry](/apply?system=website-design-development) with your page list and your one-page brief.',
          },
        ],
      },
    ],
    limitations: [
      'This guide explains cost drivers, not prices. Any figure quoted before the scope exists is a guess.',
      'Quotations are only comparable when the brief is identical. Different scopes explain most of the difference.',
      'Some charges are not the studio’s to set: gateway fees, platform subscriptions and messaging charges change.',
      'A cheaper build can cost more over three years if it is hard to edit, slow, or tied to a licence you cannot drop.',
      'Cost says nothing about fit. The most expensive proposal is not automatically the one that understands your business.',
    ],
    faqs: [
      {
        q: 'How much does a business website cost in India?',
        a: 'There is no single figure, because the scope varies enormously. An eight-page site with copy and an enquiry form is a different job from a catalogue with payments, bookings and two languages. What moves the number is the amount of strategy and copywriting, the number of distinct design templates, the content management setup, the integrations, the photography and the support you want afterwards. Define those, then ask for a quotation.',
      },
      {
        q: 'Does BYBO publish website prices?',
        a: 'No. What a website costs depends on the pages, content, functionality and integrations, so we agree the deliverables, fee and schedule after understanding your brief. Hosting, platform and third-party charges are made clear separately, so you can see what is ours and what is a vendor’s. If it helps, send your page list and we will tell you what we would need to scope it.',
      },
      {
        q: 'Is a template website cheaper than a custom one?',
        a: 'Usually at the start, and not always over three years. A good template suits a business with a straightforward need and a clear message, and it lets you spend the saving on photography and copy. A custom build is worth it when the site has to do something particular: an unusual product journey, real booking constraints, several distinct audiences, or a brand that is part of the product.',
      },
      {
        q: 'What are the ongoing costs of a website?',
        a: 'Domain renewal, hosting or platform subscriptions, any theme, plugin or font licences, backups and security, and maintenance or support. Payment gateways charge per transaction, and messaging platforms charge for some message types. Ask for the annual total in writing, and check renewal prices rather than first-year offers, because the second year is often the surprise.',
      },
      {
        q: 'Why do website quotations differ so much for the same brief?',
        a: 'Because they rarely cover the same work. One includes strategy, copywriting, photography, accessibility checks and three months of support; another assumes you supply the text and images and ends at launch. Template count, integrations and testing also differ. Ask each studio the same eight questions about scope, and most of the gap explains itself.',
      },
      {
        q: 'Should I pay for SEO as part of a website project?',
        a: 'Separate the two. Search foundations belong in the build: sensible URLs, titles, headings, alt text, a sitemap, Search Console and pages that load quickly. An ongoing search campaign is a different service with its own fee and its own reporting. Be wary of guarantees. Google states plainly that no one can guarantee a first position in its results.',
      },
    ],
    bybo: [
      {
        href: '/systems/website-design-development',
        label: 'Website Design & Development',
        why: 'Strategy, copy, design and build in one scope, with hosting and third-party charges made clear.',
      },
      {
        href: '/apply?system=website-design-development',
        label: 'Start a website enquiry',
        why: 'Send your page list and goals; we shape the scope, then agree deliverables, fee and schedule.',
      },
    ],
    related: ['website-design-strategy-india', 'business-automation-cost-india', 'what-makes-a-website-feel-premium'],
    sources: [
      {
        title: 'WCAG 2 Overview',
        publisher: 'W3C Web Accessibility Initiative',
        url: 'https://www.w3.org/WAI/standards-guidelines/wcag/',
      },
      {
        title: 'Web Vitals',
        publisher: 'web.dev (Google)',
        url: 'https://web.dev/articles/vitals',
      },
      {
        title: 'Do You Need an SEO?',
        publisher: 'Google Search Central',
        url: 'https://developers.google.com/search/docs/fundamentals/do-i-need-seo',
      },
      {
        title: 'Pricing on the WhatsApp Business Platform',
        publisher: 'Meta for Developers',
        url: 'https://developers.facebook.com/docs/whatsapp/pricing',
      },
    ],
  },
  {
    slug: 'website-redesign-checklist',
    collection: 'websites',
    title: 'Website Redesign Checklist: What to Keep, Improve or Remove',
    description: 'Audit before you rebuild: content inventory, analytics, URL mapping and redirects, accessibility, forms, and what to watch after launch.',
    dek: 'A redesign is the one website project that can leave you worse off than before. This checklist covers the audit, the URL mapping, the launch and the first ninety days.',
    keywords: [
      'website redesign checklist',
      'website redesign SEO',
      'website migration redirects',
      'content inventory',
      'redesign without losing traffic',
      'website relaunch checklist',
    ],
    publishedAt: '2026-09-11',
    visual: {
      kind: 'checklist',
      title: 'Before you rebuild the site',
      items: [
        'Export every URL and its search traffic',
        'List the pages that earn enquiries',
        'Map each old URL to a new one',
        'Keep the copy and pages that work',
        'Retest forms, integrations and tracking',
        'Redirect, then watch Search Console weekly',
      ],
    },
    summary: [
      'A redesign can leave you worse off. Your old site is evidence: audit it before anyone draws a new one.',
      'Keep the pages that rank and convert, improve the ones with attention but no action, remove the rest.',
      'Every changed URL needs a permanent redirect to its closest match. Google advises keeping them at least a year.',
      'Launch day is not the end. Watch coverage, redirects, enquiries and speed weekly for the first three months.',
    ],
    sections: [
      {
        id: 'why-redesigns-lose-ground',
        heading: 'Why do redesigns sometimes lose traffic and enquiries?',
        blocks: [
          {
            type: 'p',
            text: 'A redesign is the only website project that can leave a business worse off than it was. The new site looks better and earns less. It happens for ordinary reasons: pages that quietly brought enquiries were dropped, URLs changed with no redirects behind them, a form now reaches an inbox nobody opens, tracking was never reinstalled, and the one paragraph that answered the question every customer asks did not survive the rewrite.',
          },
          {
            type: 'p',
            text: 'The common cause is starting from taste. Someone dislikes the old site, so it is treated as a problem to be swept away rather than as a record of what worked. A redesign should begin as an audit. You are not only designing a new website; you are deciding what to carry across, and that decision needs evidence.',
          },
          {
            type: 'note',
            tone: 'insight',
            title: 'The old site is your best research',
            text: 'Three years of search traffic, enquiry sources and the pages people actually read tell you more about what to build than any reference site you admire.',
          },
        ],
      },
      {
        id: 'audit-content-and-analytics',
        heading: 'Start with an inventory, not a mood board',
        blocks: [
          {
            type: 'p',
            text: 'Two exports come before anything else. First, a complete list of the pages that exist: from your content management system, a crawl, or the sitemap, checked against each other because the three rarely agree. Second, twelve months of analytics and Search Console data, page by page. Save both files somewhere safe. You will want them again the week after launch, when the new site is live and something looks wrong.',
          },
          {
            type: 'p',
            text: 'Then build the inventory: one row per page, and a decision at the end of every row. It is tedious, and it is the part of a redesign that most reliably pays for itself.',
          },
          {
            type: 'list',
            items: [
              'URL, page title and what the page is for, in your own words.',
              'Visits, entrances and search queries over the last twelve months.',
              'Enquiries, calls, bookings or sales the page contributed to.',
              'Whether other sites link to it, and whether your team sends it to customers.',
              'When it was last updated, and who owns the content now.',
              'The decision: keep, improve, merge or remove.',
            ],
          },
        ],
      },
      {
        id: 'keep-improve-remove',
        heading: 'Deciding what to keep, improve or remove',
        blocks: [
          {
            type: 'p',
            text: 'Most decisions become obvious once the evidence sits in one place. A page that brings search traffic and enquiries is not a candidate for a rewrite because the new heading style suits a shorter title. A page that nobody has read in two years does not deserve a place in the new navigation simply because it exists.',
          },
          {
            type: 'table',
            caption: 'A decision rule for each page',
            head: ['What the inventory shows', 'Decision'],
            rows: [
              ['Search traffic and enquiries', 'Keep the page and its URL'],
              ['Attention but no next step', 'Improve the copy and the action'],
              ['Little traffic, still true and useful', 'Keep, but merge or simplify'],
              ['Little traffic, out of date', 'Remove and redirect to the nearest page'],
              ['The same subject on three pages', 'Merge into one, redirect the others'],
            ],
          },
          {
            type: 'p',
            text: 'Two cautions. Low traffic is not the same as low value: a pricing page, a terms page, a spare-parts list or a careers page can close business or save your team hours without ever looking impressive in analytics. Ask sales and reception which pages they send to customers before deleting anything. And when a page is kept, keep what made it work — the specific paragraph, the specification table, the answer nobody else publishes — rather than only its title. Our guide to [what makes a website feel premium](/insights/what-makes-a-website-feel-premium) is a useful second pass over the pages you decide to improve.',
          },
        ],
      },
      {
        id: 'urls-and-redirects',
        heading: 'URL mapping and redirects: the part that protects your search results',
        blocks: [
          {
            type: 'p',
            text: 'If any address changes, the URL map is the most important document in the project: one row per old URL, one new URL beside it, and no blanks. Build it from the inventory rather than from the new sitemap, so that pages are matched deliberately instead of by whatever the new structure happens to allow.',
          },
          {
            type: 'p',
            text: 'Google’s guidance on [moving a site with URL changes](https://developers.google.com/search/docs/crawling-indexing/site-move-with-url-changes) is specific about what to do next. Use server-side permanent redirects, such as 301 and 308, and keep them in place for at least a year so that ranking signals transfer. Update internal links to point at the new addresses, update canonical tags and language annotations, and submit the new sitemap in Search Console. The Change of Address tool applies only when the domain or subdomain itself changes.',
          },
          {
            type: 'p',
            text: 'The distinction between redirect types matters more than it sounds. [Google treats them differently](https://developers.google.com/search/docs/crawling-indexing/301-redirects): permanent redirects show the new target in search results, while temporary ones keep showing the source page. A temporary redirect left in place by accident is a common reason a new page never appears where the old one used to.',
          },
          {
            type: 'note',
            tone: 'caution',
            title: 'Do not send everything to the homepage',
            text: 'A blanket redirect looks tidy and helps nobody. Someone following a link to a product, a document or an article arrives at a page that does not answer them, and has to start searching again.',
          },
        ],
      },
      {
        id: 'forms-integrations-tracking',
        heading: 'Forms, integrations and the things that break quietly',
        blocks: [
          {
            type: 'p',
            text: 'Design faults get noticed. Broken plumbing does not, because the site looks perfectly well from the outside while enquiries disappear. Every connected part has to be tested again on the new site, by a person, on a phone, using real details rather than test entries nobody reads.',
          },
          {
            type: 'list',
            items: [
              'Submit every form and confirm it reaches an inbox someone actually checks.',
              'Check the automatic reply, the spam filtering and where the record is stored.',
              'Tap the phone number and the WhatsApp link, and confirm whose phone they reach.',
              'Complete one real payment and one refund, and one booking with a cancellation.',
              'Confirm enquiries still arrive in your sales or CRM tool, with their source recorded.',
              'Reinstall analytics and tag management, and check the actions you agreed to measure.',
            ],
          },
          {
            type: 'example',
            title: 'Illustrative example: a Pune equipment dealer’s missing page',
            text: 'Imagine a dealer whose old website had a plain page listing spare parts for a discontinued machine. It was unloved, and the new sitemap dropped it. Enquiries fell within a month, and nobody connected the two until the service manager mentioned that customers used to find that page by searching the model number. The page is restored at its old address, tidied but not rewritten. It was never a design problem; it was a page that answered a question nobody in the meeting had thought to ask.',
          },
        ],
      },
      {
        id: 'accessibility-and-performance',
        heading: 'Accessibility and speed are cheaper to fix during a rebuild',
        blocks: [
          {
            type: 'p',
            text: 'A redesign is the only moment when accessibility is inexpensive. Contrast, focus states, form labels, heading order, keyboard navigation and alternative text are design decisions before they are development tasks. The W3C sets its success criteria at [three levels, A, AA and AAA](https://www.w3.org/WAI/standards-guidelines/wcag/), encourages using the latest version, and notes that content meeting WCAG 2.2 also meets 2.1 and 2.0. Agree the level you are aiming for while the layouts are still drawings.',
          },
          {
            type: 'p',
            text: 'Speed deserves a before-and-after measurement on the same pages. [web.dev](https://web.dev/articles/vitals) sets the pass mark at Largest Contentful Paint within 2.5 seconds, Interaction to Next Paint of 200 milliseconds or less and Cumulative Layout Shift of 0.1 or less, at the 75th percentile of page loads. Record the old figures before launch. A redesign that adds a video header, three tracking scripts and uncompressed photographs can be slower than the site it replaced, and the numbers are the only way to notice before customers do.',
          },
        ],
      },
      {
        id: 'launch-checklist',
        heading: 'The launch checklist',
        blocks: [
          {
            type: 'p',
            text: 'Launch early in the week, in the morning, with the people who can fix things at their desks. Work down this list in order, and do not treat any item as done because somebody says it should be fine.',
          },
          {
            type: 'list',
            ordered: true,
            items: [
              'Confirm the site is indexable: no leftover noindex tags and no staging rules blocking crawlers.',
              'Test every redirect in the mapping, and check each one resolves in a single hop.',
              'Crawl the live site for broken links, missing titles and pages that return errors.',
              'Submit the new sitemap in Search Console and keep the old URL export safely.',
              'Submit each form, complete a payment and a booking, and check the confirmations.',
              'Confirm analytics, tag management and consent handling are recording correctly.',
              'Read the pages that earn enquiries side by side with the old versions.',
              'Set an error page that helps a visitor find what moved, with search and key links.',
              'Keep a full backup of the old site and its database for at least a year.',
            ],
          },
        ],
      },
      {
        id: 'after-launch',
        heading: 'What to watch in the first ninety days',
        blocks: [
          {
            type: 'p',
            text: 'Expect some movement. Google notes that [for medium-sized websites it can take a few weeks or more](https://developers.google.com/search/docs/crawling-indexing/site-move-with-url-changes) for the new URLs to start showing, and longer for larger sites. That is a reason to monitor weekly rather than to panic on day three, and a reason not to launch a fortnight before your busiest season.',
          },
          {
            type: 'list',
            items: [
              'Search Console: indexing coverage, crawl errors and pages reported as not found.',
              'Server logs or analytics: which old URLs are still being requested, and whether they redirect.',
              'Enquiries, calls and bookings against the baseline you recorded before launch.',
              'Core Web Vitals on the pages that matter, on mobile as well as desktop.',
              'Anything your team hears: a customer who could not find a document is a bug report.',
            ],
          },
          {
            type: 'p',
            text: 'When something drops, work through the same three questions before touching the design: does the old URL redirect to a page that answers the same question, did the content survive the rewrite, and is the page indexable? Most redesign losses are one of those three.',
          },
          {
            type: 'p',
            text: 'This is how we approach a rebuild in [Website Design & Development](/systems/website-design-development): review the current pages, keep valuable content and URLs where practical, and plan redirects for any structural change, with your team reviewing the design, copy and key journeys before it goes live. If you are still deciding what the new site should do, read [strategy before screens](/insights/website-design-strategy-india) first, then [tell us what you have](/apply?system=website-design-development) and what it needs to become.',
          },
        ],
      },
    ],
    limitations: [
      'An inventory shows what was measured. Some pages earn business without ever registering as a countable action.',
      'Redirects preserve as much as possible; they guarantee nothing. Search results move for reasons unrelated to your project.',
      'If the old site was never measured, you have no baseline. Start recording now, even before the redesign begins.',
      'A redesign cannot fix unclear positioning, slow replies or a service people are not asking for.',
      'A five-page site does not need this apparatus. One person can check it by hand in an afternoon.',
    ],
    faqs: [
      {
        q: 'Will a website redesign hurt our Google rankings?',
        a: 'It can, if URLs change without redirects, content that ranked is rewritten away, or the new site is accidentally left blocked from crawling. Done carefully, it need not. Keep the pages that earn traffic, map every changed URL to its closest match, use permanent redirects, update internal links and sitemaps, then monitor Search Console weekly for the first few months.',
      },
      {
        q: 'Do we need redirects if the page addresses stay the same?',
        a: 'Fewer, but check anyway. Trailing slashes, upper and lower case, moving from http to https, adding or dropping www, and a different file extension all create new addresses. Crawl the old site and the new one, compare the lists, and redirect anything that differs. One overlooked pattern can affect every page on the site at once.',
      },
      {
        q: 'How long should redirects stay in place?',
        a: 'Google advises keeping redirects for at least a year, so that ranking signals transfer to the new URLs, and suggests keeping them indefinitely for the sake of people following old links from emails, documents and other websites. Removing them a month after launch is a common and avoidable mistake, and the damage is hard to spot immediately.',
      },
      {
        q: 'Should we keep the old website content?',
        a: 'Keep what works and be honest about the rest. Pages with search traffic, enquiries or links from other sites should carry across, along with the specific paragraphs, specifications and answers that made them useful. Rewriting for tone is fine; deleting the detail that brought people there is not. Everything else can be merged or removed, with a redirect to the nearest relevant page.',
      },
      {
        q: 'How long does it take for traffic to recover after a redesign?',
        a: 'Google says that for medium-sized websites it can take a few weeks or more before the new URLs start appearing, and considerably longer for large ones. Watch weekly rather than daily, compare against the baseline you recorded, and check redirects and indexability before concluding anything. Avoid launching immediately before your busiest trading period.',
      },
      {
        q: 'What is the single most common redesign mistake?',
        a: 'Skipping the URL map. Teams agree the new sitemap, build the site and only think about old addresses on launch day, when there is no time to match hundreds of pages properly. Everything gets pointed at the homepage, links from other sites stop working and the pages that earned enquiries vanish. The map takes a day and protects years of work.',
      },
    ],
    bybo: [
      {
        href: '/systems/website-design-development',
        label: 'Website Design & Development',
        why: 'We review the current pages, keep valuable content and URLs where practical, and plan redirects.',
      },
      {
        href: '/apply?system=website-design-development',
        label: 'Start a website enquiry',
        why: 'Bring your inventory and analytics export; we will tell you what is worth keeping.',
      },
    ],
    related: ['website-design-strategy-india', 'mobile-website-experience', 'measure-ai-system-performance'],
    sources: [
      {
        title: 'How to move a site with URL changes',
        publisher: 'Google Search Central',
        url: 'https://developers.google.com/search/docs/crawling-indexing/site-move-with-url-changes',
      },
      {
        title: 'Redirects and Google Search',
        publisher: 'Google Search Central',
        url: 'https://developers.google.com/search/docs/crawling-indexing/301-redirects',
      },
      {
        title: 'WCAG 2 Overview',
        publisher: 'W3C Web Accessibility Initiative',
        url: 'https://www.w3.org/WAI/standards-guidelines/wcag/',
      },
      {
        title: 'Web Vitals',
        publisher: 'web.dev (Google)',
        url: 'https://web.dev/articles/vitals',
      },
    ],
  },
];

export default guides;
