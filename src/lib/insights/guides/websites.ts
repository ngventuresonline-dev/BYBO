import type { Guide } from '../types';

const guides: Guide[] = [
  {
    slug: 'what-makes-a-website-feel-premium',
    collection: 'websites',
    title: 'What Makes a Business Website Feel Premium?',
    description: 'Premium is not gold gradients or heavy animation. It comes from clarity, real photography, readable type, speed, mobile care and details that work.',
    dek: 'Premium is rarely about gold gradients or heavy animation. It comes from clarity, restraint, real words and pictures, and details that work on every screen. Here is how to judge your own site.',
    keywords: [
      'premium website design',
      'what makes a website look professional',
      'business website design India',
      'website design checklist',
      'luxury website design',
      'website first impression',
    ],
    publishedAt: '2026-09-11',
    visual: {
      kind: 'compare',
      title: 'Signals of neglect, signals of care',
      left: {
        label: 'Reads as cheap',
        items: [
          'Slogans that could belong to anyone',
          'Stock photos of handshakes and headsets',
          'Crowded layouts and faint grey text',
          'Pop-ups before a single line is read',
          'Broken forms, dead links, expired offers',
        ],
      },
      right: {
        label: 'Reads as premium',
        items: [
          'A clear promise on the first screen',
          'Your own photographs of people and work',
          'Two typefaces, generous space, readable contrast',
          'Fast, stable pages on an ordinary phone',
          'One confident next step on every page',
        ],
      },
    },
    summary: [
      'Premium is a feeling of care and confidence. It comes from clarity and restraint, not gold gradients or heavy animation.',
      'Real photographs and specific words prove more about your business than any template effect or stock image can.',
      'Speed, mobile layouts and readable contrast shape the impression, and Google and W3C publish measurable standards for each.',
      'Visitors decide whether to trust you through details: consistent pages, confident calls to action, and forms and links that work.',
    ],
    sections: [
      {
        id: 'what-premium-means',
        heading: 'What does “premium” actually mean on a website?',
        blocks: [
          {
            type: 'p',
            text: 'Ask a business owner what they mean by a premium website and you will usually hear a feeling, not a feature. They want visitors to think: these people are good at what they do, and they will look after me. That feeling is built from evidence. A visitor senses, often without putting it into words, that every choice on the page is deliberate.',
          },
          {
            type: 'p',
            text: 'Gold gradients, marble textures, autoplaying video and animated counters borrow the look of luxury without its substance. The brands people genuinely think of as premium tend to do the opposite: plenty of space, a few strong photographs, short sentences and one obvious next step. Restraint reads as confidence. A business that knows what it offers does not need to shout.',
          },
          {
            type: 'p',
            text: 'So the test of whether your business website feels premium is a practical one. Is it clear? Does it sound like you? Are the pictures real? Is it comfortable on a phone? Does everything work?',
          },
          {
            type: 'note',
            tone: 'insight',
            title: 'A website is a promise',
            text: 'The site sets an expectation of the service behind it. If it feels like a five-star hotel and the phone goes unanswered, the gap does more damage than a plainer site would. Aim for the best honest version of how you already work.',
          },
        ],
      },
      {
        id: 'clarity-and-point-of-view',
        heading: 'Is it clear what you do, and what you stand for?',
        blocks: [
          {
            type: 'p',
            text: 'Clarity is the first premium signal because it respects the visitor’s time. The opening screen should answer three questions at a glance: what you do, who it is for and what to do next. If a visitor has to scroll, open a menu or read your history to find out, the page has failed, however good it looks.',
          },
          {
            type: 'p',
            text: 'A point of view is the second. “Homes designed around light, shade and fewer, better rooms” tells you something about an architect’s judgement. “Innovative solutions with a focus on customer satisfaction” tells you nothing; any company in any city could say it. Specific lines carry a risk that vague ones avoid: someone can hold you to them. That is why they persuade. Write only the ones that are true.',
          },
          {
            type: 'table',
            caption: 'Vague lines and specific alternatives',
            head: ['Vague', 'Specific'],
            rows: [
              ['Quality solutions for all your needs', 'Office interiors for teams of 20 to 200 in Pune'],
              ['Customer satisfaction is our priority', 'Site photographs every Friday until handover'],
              ['A one-stop destination', 'Fit-out, equipment and signage for new clinics'],
              ['Best-in-class service', 'A named accountant who replies on WhatsApp'],
            ],
          },
        ],
      },
      {
        id: 'real-photography',
        heading: 'Why real photographs beat stock images and effects',
        blocks: [
          {
            type: 'p',
            text: 'Visitors have seen the handshake, the smiling agent in a headset and the glass tower at dusk many times before. Stock images suggest the business had nothing of its own to show. Photographs of your premises, people, process and finished work are evidence. They prove the business exists and show the standard of its work in a way no adjective can.',
          },
          {
            type: 'p',
            text: 'Real does not mean casual. Good business photography has consistent light, considered crops and a small, coherent set used across every page. Plan the pictures the way you plan the copy: which page needs which image, and what it must prove. Show people at work rather than posed in a row, and the details that reveal your standards.',
          },
          {
            type: 'example',
            title: 'Illustrative example: a Jaipur architecture practice',
            text: 'Imagine a small practice whose homepage opens with a stock render of a glass tower it did not design, under the line “Innovative designs for modern living”. Replace the render with a photograph of a courtyard house the practice completed, taken in late afternoon light. Replace the line with “Homes in Jaipur designed around light, shade and the way families live”. The layout, fonts and colours are unchanged, yet the page now shows evidence and a point of view. It could only belong to this practice.',
          },
        ],
      },
      {
        id: 'typography-spacing-contrast',
        heading: 'Typography, spacing and contrast do the quiet work',
        blocks: [
          {
            type: 'p',
            text: 'Much of what visitors read as quality is type and space. Use one or two typefaces, a clear scale of sizes and comfortable line lengths, and give everything room. A crowded page looks anxious; a spacious one looks as though someone has decided what matters. Keep the palette small, so one colour always means “this is the action”, and save motion for moments where it explains something.',
          },
          {
            type: 'p',
            text: 'Contrast is where elegance most often goes wrong. Thin, pale grey text looks refined on a large monitor and becomes hard to read on a mid-range phone in daylight. [W3C’s guidance on minimum contrast](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html) sets a ratio of at least 4.5:1 for normal text and 3:1 for large text, which it defines as at least 18 point, or 14 point bold. Logos are exempt. Your body copy, button labels and captions are not.',
          },
          {
            type: 'note',
            tone: 'caution',
            title: 'Check contrast before you approve the colours',
            text: 'Contrast is easy to measure with a free checker and awkward to change once the palette has spread to signage and packaging. Check text over photographs too, during design review rather than after launch.',
          },
        ],
      },
      {
        id: 'speed-and-mobile',
        heading: 'Speed and mobile care are part of the impression',
        blocks: [
          {
            type: 'p',
            text: 'A slow page feels careless, whatever it looks like once it arrives. Google’s Core Web Vitals turn that feeling into three measures. According to [web.dev](https://web.dev/articles/vitals), a good experience means Largest Contentful Paint within 2.5 seconds, Interaction to Next Paint of 200 milliseconds or less and Cumulative Layout Shift of 0.1 or less, measured at the 75th percentile of page loads on mobile and desktop. Put simply: the main content appears quickly, taps get a prompt response and nothing jumps around while the page loads.',
          },
          {
            type: 'p',
            text: 'Mobile deserves the same seriousness. Google [uses the mobile version of a site’s content](https://developers.google.com/search/docs/crawling-indexing/mobile/mobile-sites-mobile-first-indexing) for indexing and ranking, and recommends the same content, headings and image alt text on both versions. For many businesses the first visit happens on a phone, often from a link shared on WhatsApp or Instagram, so a cramped or cut-down mobile layout may be the version a new customer judges you by. Our guide to [mobile website experience](/insights/mobile-website-experience) goes further.',
          },
          {
            type: 'note',
            tone: 'insight',
            title: 'Speed is for visitors first',
            text: 'Google says Core Web Vitals are used by its ranking systems, but that good scores do not guarantee top positions and that the most relevant content is shown even when [page experience](https://developers.google.com/search/docs/appearance/page-experience) is weaker. Treat speed as part of how the site feels, not as a search trick.',
          },
        ],
      },
      {
        id: 'what-cheapens-a-site',
        heading: 'What makes a website feel cheap?',
        blocks: [
          {
            type: 'p',
            text: 'The premium feeling is rarely lost through a missing feature. It is lost through small signs that nobody is paying attention.',
          },
          {
            type: 'list',
            items: [
              'Stock photographs of people who do not work for you, in offices that are not yours.',
              'Copy that could belong to anyone: “quality”, “innovative”, “one-stop”, “customer-centric”.',
              'Pop-ups that cover the page before a line has been read. Google’s guidance is to [avoid intrusive interstitials](https://developers.google.com/search/docs/appearance/avoid-intrusive-interstitials) and use banners that take up a small part of the screen.',
              'Slow loading from autoplay video, oversized images and stacks of chat and tracking scripts.',
              'Broken mobile layouts: text running off the screen, buttons out of reach, menus that will not close.',
              'Several calls to action competing on one screen, each louder than the last.',
              'Signs of neglect: last season’s festive offer, an old copyright year and dead social links.',
            ],
          },
        ],
      },
      {
        id: 'consistency-and-working-details',
        heading: 'Consistency, confident calls to action and details that work',
        blocks: [
          {
            type: 'p',
            text: 'Many sites have a polished homepage and inner pages left to a template, yet visitors from search often land on an inner page first. The same type, spacing, photography, tone and buttons should run through every page, including the contact page and the page shown when a link is broken.',
          },
          {
            type: 'p',
            text: 'Calls to action need the same confidence. Give each page one primary action and name it for what it does: “Book a site visit”, “Request a table”, “Ask about a project”. Then say what happens next, and keep that promise. Our fictional [STILL HOUSE property concept](/systems/website-design-development#concept-property) shows the idea: one residence, a few considered views and a single “Arrange a visit” action.',
          },
          {
            type: 'p',
            text: 'The practical details have to work every time. A form should confirm what happens next and reach an inbox someone checks. A map pin should point to the right entrance, with a landmark if your address needs one. A WhatsApp button should open a chat with a sensible first message. A booking tool should show real availability or say honestly that it takes requests. Each broken detail costs more trust than a missing flourish.',
          },
          {
            type: 'example',
            title: 'Illustrative example: a Kochi clinic’s contact page',
            text: 'Picture a clinic whose new website looks calm and well made. The contact form still sends enquiries to a receptionist who left last year, the WhatsApp button opens a number no longer on WhatsApp and the map shows the old premises. A patient fills in the form, hears nothing and books elsewhere. None of this would show in a design review. It surfaces only when someone tests every journey from start to finish.',
          },
        ],
      },
      {
        id: 'review-your-own-website',
        heading: 'A checklist for reviewing your own website',
        blocks: [
          {
            type: 'p',
            text: 'Review your site the way a new customer meets it: on your own phone, on mobile data, opened from a WhatsApp link. Ask someone outside the business to find one piece of information and take one action while you watch. Then work through this list, starting with the pages that bring in enquiries or sales.',
          },
          {
            type: 'list',
            ordered: true,
            items: [
              'First screen: can a stranger say what you do, for whom and what to do next?',
              'Words and pictures: rewrite lines a competitor could use; replace stock images that are not yours.',
              'Type and contrast: one or two typefaces, room to breathe, body text at 4.5:1 or better.',
              'Speed: check key pages in Search Console’s Core Web Vitals report or PageSpeed Insights.',
              'Mobile: read, tap and complete an enquiry with one thumb, without zooming.',
              'Pop-ups: nothing covers the content before the visitor has read it.',
              'Calls to action: one primary action per page, named for what it does.',
              'Consistency: inner pages, the contact page and the error page match the homepage.',
              'Working details: submit every form, tap every number and WhatsApp link, open the map.',
              'Freshness: remove expired offers, old dates and links to inactive profiles.',
            ],
          },
          {
            type: 'note',
            tone: 'insight',
            title: 'Give the review an owner',
            text: 'A checklist helps only if someone repeats it. Name one person to run it each quarter and after every significant change. Most of these faults return quietly when nobody is looking.',
          },
          {
            type: 'p',
            text: 'Some findings are quick fixes: new photographs, sharper copy, a removed pop-up, a repaired form. Others point to the structure, such as an unclear story or pages that lead nowhere. That is what our [Website Design & Development](/systems/website-design-development) work is for: strategy, copy, design and build together, with your team reviewing the design, copy and key journeys before launch. You can [start a website enquiry](/apply?system=website-design-development) with what your review found.',
          },
        ],
      },
    ],
    limitations: [
      'Premium depends on your audience. A trade buyer may value a fast, searchable price list over photography.',
      'A website cannot carry a promise the business does not keep. Slow replies will undo a polished site quickly.',
      'Contrast ratios and Core Web Vitals are minimums, not proof of quality. A site can pass every check and still say nothing.',
      'Your own review has blind spots. You know the business too well to read the site as a stranger does.',
      'This checklist is not an accessibility audit. WCAG covers far more than contrast.',
    ],
    faqs: [
      {
        q: 'What makes a business website look professional?',
        a: 'Clarity, consistency and care. Visitors should understand what you do and what to do next from the first screen, and the same typefaces, spacing, photographic style and tone should run through every page. Real photographs, specific copy, readable contrast and working forms matter more than effects. Sites that look unprofessional usually fail on small signs of neglect: stock images, old offers, broken links.',
      },
      {
        q: 'Does a premium website need animation or video?',
        a: 'No. Animation and video help when they explain something, such as a product in use or a space you cannot capture in one photograph. As decoration, they add weight, slow pages on ordinary phones and can make layouts shift as they load. If you use video, the page should read well and work before it plays, and the main message should never depend on it.',
      },
      {
        q: 'How fast should a business website load?',
        a: 'Aim for the Core Web Vitals thresholds Google publishes. According to [web.dev](https://web.dev/articles/vitals), a good experience means Largest Contentful Paint within 2.5 seconds, Interaction to Next Paint of 200 milliseconds or less and Cumulative Layout Shift of 0.1 or less, measured at the 75th percentile of page loads. Check key pages in Search Console or PageSpeed Insights, then test on an ordinary phone.',
      },
      {
        q: 'Do pop-ups hurt a website?',
        a: 'They can, especially when they cover the content before a visitor has read anything. Google’s guidance on [intrusive interstitials](https://developers.google.com/search/docs/appearance/avoid-intrusive-interstitials) describes them as elements that obstruct the view of the content, usually for promotional purposes, and suggests small banners instead. Interstitials a site must show because of its content, such as an age gate, are exempt. For offers and sign-ups, an inline invitation is usually better.',
      },
      {
        q: 'Can I make my existing website feel premium without a full redesign?',
        a: 'Often, yes. Real photographs, sharper copy, fewer pop-ups, lighter images, better contrast and working forms can change how a site feels without touching its structure. A redesign is the better option when the problem is structural: the story is unclear, pages lead nowhere or the site is hard to update. Run the checklist first to see which kind of problem you have.',
      },
    ],
    bybo: [
      {
        href: '/systems/website-design-development',
        label: 'Website Design & Development',
        why: 'Strategy, copy, design and build brought together, with your review of design, copy and journeys before launch.',
      },
      {
        href: '/systems/website-design-development#concept-property',
        label: 'STILL HOUSE property concept',
        why: 'A fictional concept showing restraint in practice: a few considered views and one visit enquiry.',
      },
      {
        href: '/apply?system=website-design-development',
        label: 'Start a website enquiry',
        why: 'Share what your own review found and the goal your website needs to serve.',
      },
    ],
    related: ['mobile-website-experience', 'website-redesign-checklist', 'automate-customer-enquiries'],
    sources: [
      {
        title: 'Web Vitals',
        publisher: 'web.dev (Google)',
        url: 'https://web.dev/articles/vitals',
      },
      {
        title: 'Understanding page experience in Google Search results',
        publisher: 'Google Search Central',
        url: 'https://developers.google.com/search/docs/appearance/page-experience',
      },
      {
        title: 'Mobile site and mobile-first indexing best practices',
        publisher: 'Google Search Central',
        url: 'https://developers.google.com/search/docs/crawling-indexing/mobile/mobile-sites-mobile-first-indexing',
      },
      {
        title: 'Avoid intrusive interstitials and dialogs',
        publisher: 'Google Search Central',
        url: 'https://developers.google.com/search/docs/appearance/avoid-intrusive-interstitials',
      },
      {
        title: 'Understanding Success Criterion 1.4.3: Contrast (Minimum)',
        publisher: 'W3C Web Accessibility Initiative',
        url: 'https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html',
      },
    ],
  },
];

export default guides;
