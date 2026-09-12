import type { Guide } from '../types';

const guides: Guide[] = [
  {
    slug: 'website-sitemap-customer-journey',
    collection: 'websites',
    title: 'How to Plan a Website Sitemap Around the Customer Journey',
    description: 'A website sitemap works when it follows the questions customers arrive with. How to map journeys, give each page one job and name navigation plainly.',
    dek: 'Most sitemaps are drawn from the inside out: departments, services, history. Start instead with the questions people arrive with, and the structure gets simpler and shorter.',
    keywords: [
      'website sitemap',
      'website structure planning',
      'customer journey website design',
      'website navigation labels',
      'site architecture planning',
      'information architecture for business websites',
    ],
    publishedAt: '2026-09-11',
    visual: {
      kind: 'flow',
      title: 'Planning a sitemap in five steps',
      steps: [
        'List the questions',
        'Group by journey',
        'Give pages one job',
        'Name in plain words',
        'Test with real people',
      ],
      gate: 4,
      gateLabel: 'People try it before anything is designed',
    },
    summary: [
      'Start from the questions customers arrive with, not from your departments, your services list or your internal reporting lines.',
      'Give every page one job. If nobody can say what a page is for, merge it into another or leave it out.',
      'Name navigation in your customers’ words. Clear, specific link text helps readers and search engines alike.',
      'An XML sitemap is a file for search engines. It is not the same thing as a well-planned site structure.',
    ],
    sections: [
      {
        id: 'start-with-questions',
        heading: 'What questions do your customers arrive with?',
        blocks: [
          {
            type: 'p',
            text: 'Most sitemaps are drawn from the inside out. Someone opens a document, types Home, About Us, Services, Products, Blog and Contact, then arranges the company’s departments underneath. The result is a picture of the organisation. Visitors did not come for the organisation. They came with a question, usually on a phone, usually with somewhere else to be.',
          },
          {
            type: 'p',
            text: 'So begin with the questions. Ask the people who answer the phone, read the WhatsApp messages and reply to the enquiry inbox what they are asked every week, in the customer’s words rather than yours. Most businesses find the same eight or ten questions returning. Those questions are the first draft of the sitemap.',
          },
          {
            type: 'list',
            items: [
              'Do you do the specific thing I need, for a business or a home like mine?',
              'What does it cost, or what does the price depend on?',
              'How long does it take, and what do you need from me to start?',
              'Have you done this before, and can I see the work?',
              'Who are you, where are you, and can I come and look?',
              'What happens if something goes wrong after I pay?',
              'How do I begin, and who will I actually be dealing with?',
            ],
          },
          {
            type: 'note',
            tone: 'insight',
            title: 'A sitemap is a set of answers',
            text: 'Every page on the list should answer a question somebody asks. A page that answers nothing is a page nobody needed, and it quietly competes for attention with the pages that earn enquiries.',
          },
        ],
      },
      {
        id: 'journeys-by-audience',
        heading: 'Which journeys does the site need to serve?',
        blocks: [
          {
            type: 'p',
            text: 'The same website is read by people on very different errands. A first-time buyer from search wants proof you handle their case. Someone sent by a friend wants reassurance and a rough price. A customer of three years wants a spare part and a phone number. Each needs a different first page and a different next step, and a sitemap built only for the first-time buyer sends everyone else hunting through the menu.',
          },
          {
            type: 'p',
            text: 'Write out three or four journeys before you draw any structure. Not personas with invented names and stock photographs: just an audience, what brought them, what they must find, and the step you would like them to take.',
          },
          {
            type: 'table',
            caption: 'Four journeys through the same website',
            head: ['Who arrives', 'What they need', 'The step you want'],
            rows: [
              ['First-time buyer from search', 'Proof you handle their case', 'An enquiry with useful detail'],
              ['Visitor sent by a friend', 'Reassurance and a price basis', 'A call or a WhatsApp message'],
              ['Returning customer', 'Order status, spares, support', 'A support request, not a sales form'],
              ['Candidate or supplier', 'Who you are and how to reach you', 'The right inbox, not the sales one'],
            ],
          },
          {
            type: 'p',
            text: 'Journeys also show what does not need a page of its own. If no journey calls for the founder’s letter, it can live inside the About page.',
          },
        ],
      },
      {
        id: 'one-job-per-page',
        heading: 'Give every page one job',
        blocks: [
          {
            type: 'p',
            text: 'A page with one job is easy to write, easy to name and easy to find. A page with four jobs reads like a brochure assembled by committee, and it is the page people leave. Before anything is designed, write the job of each page in a sentence: “This page convinces a factory owner in Coimbatore that we can service their machine within a day, and gets them to request a visit.”',
          },
          {
            type: 'list',
            items: [
              'One question answered, one audience served, one next step offered.',
              'If two pages answer the same question, keep the better one and redirect the other.',
              'If a page exists only for a search phrase, it will read that way to people too.',
              'If a page cannot be described in one sentence, it is probably two pages.',
              'If nobody in your team can say who a page is for, it is a candidate for removal.',
            ],
          },
          {
            type: 'p',
            text: 'The exercise usually shrinks the sitemap, which is the point. It also finds the missing pages: the basis on which you price, the areas you deliver to, the page a returning customer has never had.',
          },
        ],
      },
      {
        id: 'navigation-in-plain-words',
        heading: 'Label the navigation in your customers’ words',
        blocks: [
          {
            type: 'p',
            text: 'Navigation labels are the shortest and most-read copy on a website, and clever ones are expensive. “Our Universe” and “Capabilities” sound better in a brand presentation than on a phone. The test is simple: read a label on its own and see whether a stranger could guess what sits behind it.',
          },
          {
            type: 'p',
            text: 'Search engines apply a similar test. Google’s [link best practices](https://developers.google.com/search/docs/crawling-indexing/links-crawlable) say good anchor text is “descriptive, reasonably concise, and relevant to the page that it’s on and to the page it links to”, and give “click here”, “read more” and “website” as examples of text to avoid. Menu labels, in-page links and buttons all benefit from the same discipline: name the destination, not the gesture.',
          },
          {
            type: 'p',
            text: 'Use the words your customers use, even when they are duller than your internal vocabulary. “Spare parts” beats “Aftermarket”. “Prices” beats “Investment”. “Book a table” beats “Reserve your experience”. Our own [Solutions](/solutions) page is grouped this way, around the problem someone arrives with rather than the systems we build.',
          },
          {
            type: 'note',
            tone: 'caution',
            title: 'Do not name the menu after the org chart',
            text: 'Departments make sense inside the business and nowhere else. Somebody looking for a replacement part does not know whether that lives under Sales, Service or Aftermarket. Name the thing they want, and put it where they look first.',
          },
        ],
      },
      {
        id: 'depth-and-discovery',
        heading: 'How deep should the structure go?',
        blocks: [
          {
            type: 'p',
            text: 'The rule that everything must sit within three clicks is folklore. People will take four steps when every step obviously leads somewhere useful, and abandon two when the labels are vague. Depth is not the problem; unclear paths are. Breadth has its own cost: a menu of fourteen items is a list nobody reads.',
          },
          {
            type: 'p',
            text: 'What does matter is that pages can be reached. Google’s guidance is blunt: “Every page you care about should have a link from at least one other page on your site.” For catalogues, its [ecommerce structure guidance](https://developers.google.com/search/docs/specialty/ecommerce/help-google-understand-your-ecommerce-site-structure) adds that if category pages do not link directly to all the products in a category, the crawler may never find them. Pages that exist only behind a filter, a search box or a link inside a PDF are hard for people to find and hard for search engines to see.',
          },
          {
            type: 'list',
            items: [
              'Every page reachable by an ordinary link, not only through search or a filter.',
              'Section pages that describe the section, not just list what is under it.',
              'Menus of five to seven items, with the detail one level down.',
              'Links inside the text of a page: a category page that names its products.',
              'A footer that carries what people look for last: hours, address, careers, policies.',
            ],
          },
        ],
      },
      {
        id: 'conversion-points',
        heading: 'Where do the conversion points belong?',
        blocks: [
          {
            type: 'p',
            text: 'A conversion point is any place a visitor can act: an enquiry form, a WhatsApp button, a phone number, a booking, a download. They belong where the question has just been answered, not only at the foot of the page. Someone who has just read that you service their machine model is ready; someone scrolling past a wall of text to find a form is not.',
          },
          {
            type: 'p',
            text: 'Give each page one primary action, named for what it does, with a quieter alternative for people who will not fill in a form. Then decide the unglamorous part: which inbox each form reaches, who owns it, and how quickly a reply is promised. A sitemap that plans nine forms into one unread mailbox has planned nine disappointments.',
          },
          {
            type: 'example',
            title: 'Illustrative example: a Coimbatore machine-service company’s sitemap',
            text: 'Suppose a company servicing textile machinery has five pages: Home, About Us, Services, Gallery and Contact. Services is one long page listing nine offerings; Gallery is forty untitled photographs; every form reaches one address. A month of enquiries shows three questions dominate: do you handle my machine, how quickly can you come, and what does a visit cost. The rewritten sitemap gives each machine family a page with a response commitment, adds a spares page for existing customers, replaces the gallery with three short job accounts, and gives technician applications their own page so they stop arriving in the sales inbox. Same business, same content budget, half the confusion.',
          },
        ],
      },
      {
        id: 'xml-sitemap-and-structure',
        heading: 'Is an XML sitemap the same as your site structure?',
        blocks: [
          {
            type: 'p',
            text: 'The word does two jobs, and mixing them up wastes meetings. The planning sitemap is the diagram your team argues over. The XML sitemap is a file for search engines. Google describes it as [a file where you provide information](https://developers.google.com/search/docs/crawling-indexing/sitemaps/overview) about the pages, videos and other files on your site, and the relationships between them.',
          },
          {
            type: 'p',
            text: 'It is useful, and it is not a substitute for structure. Google says you might need one if your site is large, is new with few links pointing to it, or carries a lot of rich media; and that you might not need one if your site is small, meaning about 500 pages or fewer, and is comprehensively linked internally. It also says plainly that a sitemap “doesn’t guarantee that all the items in your sitemap will be crawled and indexed”. Most content systems generate the file. Submit it, then spend your planning time on the human sitemap.',
          },
          {
            type: 'note',
            tone: 'insight',
            title: 'Two different documents',
            text: 'One is a diagram of pages, journeys and next steps that your team reviews and approves. The other is a machine-readable list that nobody reads. Keep both, and never let the second stand in for the first.',
          },
        ],
      },
      {
        id: 'test-before-you-build',
        heading: 'How do you test a sitemap before anything is designed?',
        blocks: [
          {
            type: 'p',
            text: 'A structure can be tested with nothing but a list of page names, which is the cheapest testing you will ever do. Give five people three real tasks and ask them where they would tap. You will hear which labels mean nothing within minutes, and before a designer has drawn a screen.',
          },
          {
            type: 'list',
            ordered: true,
            items: [
              'Write the page names as a plain list or on cards, with no design and no logo.',
              'Ask five people outside the business to complete three tasks a real customer would.',
              'Watch where they hesitate, go back or ask you a question. Do not help them.',
              'Rename whatever confused two or more people. Move whatever nobody found.',
              'Run it once more with the revised list. Two small rounds catch most of it.',
            ],
          },
          {
            type: 'p',
            text: 'Once the site is built, keep the navigation where people left it. WCAG 2.2 asks, at Level AA, that [navigational mechanisms repeated across pages](https://www.w3.org/WAI/WCAG22/Understanding/consistent-navigation.html) occur in the same relative order each time, unless the user changes them. That helps people using magnification or a screen reader, and it helps everyone else remember where things are.',
          },
          {
            type: 'p',
            text: 'Structure is the cheapest thing to change now and the most expensive to change later. It is why our [Website Design & Development](/systems/website-design-development) work agrees the sitemap, the journeys and the copy before any page is designed, and why we argue for [strategy before screens](/insights/website-design-strategy-india).',
          },
        ],
      },
    ],
    limitations: [
      'A sitemap cannot fix a weak offer. If the proposition is unclear, better structure only helps people leave sooner.',
      'Small sites can be over-planned. A five-page site needs an hour of clear thinking, not a two-day workshop.',
      'Journeys drawn from assumptions are guesses. Use real enquiries, search terms and support questions wherever you have them.',
      'Changing structure changes URLs. Agree redirects with whoever maintains the site before anything moves.',
      'Testing with five people finds confusion, not demand. It will not tell you whether a page is worth writing at all.',
    ],
    faqs: [
      {
        q: 'What is a website sitemap?',
        a: 'The word covers two things. A planning sitemap is a diagram of every page, how the pages relate and what each one is for; your team uses it to agree the structure before design. An XML sitemap is a file listing your URLs for search engines. Google describes it as a file providing information about the pages, videos and other files on your site, and the relationships between them.',
      },
      {
        q: 'How many pages should a business website have?',
        a: 'As many as there are questions worth answering properly, and no more. Most small businesses need between six and fifteen: a clear homepage, a page for each thing you sell, evidence of past work, the basis of your pricing, who you are, how to reach you, and whatever returning customers need. Extra pages written for search phrases usually dilute the ones that matter.',
      },
      {
        q: 'Do I need an XML sitemap for a small website?',
        a: 'Often not. Google says you might not need one if your site is small, which it describes as about 500 pages or fewer, and is comprehensively linked internally. It also says a sitemap does not guarantee that everything in it will be crawled and indexed. Most website platforms generate the file automatically, so the practical answer is to publish it and concentrate on internal links.',
      },
      {
        q: 'Should navigation labels be written for search engines?',
        a: 'Write them for customers, using the words customers use, and search engines generally follow. Google’s link guidance asks for anchor text that is descriptive, reasonably concise and relevant to both pages, and advises against generic text like “click here”. That is the same advice a plain-speaking editor would give. Stuffing keywords into a menu makes it harder to read and does not help.',
      },
      {
        q: 'How do I plan a sitemap for a website redesign?',
        a: 'Start from evidence rather than the old menu. List which pages bring enquiries, which search terms bring visitors and which questions your team answers by email every week. Keep what works, merge duplicates, remove what nobody reads, then map the result to your customers’ journeys. Agree redirects for every URL that changes before launch.',
      },
    ],
    bybo: [
      {
        href: '/solutions',
        label: 'Solutions',
        why: 'An example of grouping pages around the problem a visitor brings, rather than around internal structure.',
      },
      {
        href: '/systems/website-design-development',
        label: 'Website Design & Development',
        why: 'Sitemap, journeys and copy are agreed with you before any page is designed.',
      },
      {
        href: '/apply?system=website-design-development',
        label: 'Start a website enquiry',
        why: 'Bring your list of customer questions and we will work out the structure with you.',
      },
    ],
    related: ['website-design-strategy-india', 'website-redesign-checklist', 'automate-customer-enquiries'],
    sources: [
      {
        title: 'What is a sitemap?',
        publisher: 'Google Search Central',
        url: 'https://developers.google.com/search/docs/crawling-indexing/sitemaps/overview',
      },
      {
        title: 'Link best practices for Google',
        publisher: 'Google Search Central',
        url: 'https://developers.google.com/search/docs/crawling-indexing/links-crawlable',
      },
      {
        title: 'Help Google understand your ecommerce website structure',
        publisher: 'Google Search Central',
        url: 'https://developers.google.com/search/docs/specialty/ecommerce/help-google-understand-your-ecommerce-site-structure',
      },
      {
        title: 'Understanding Success Criterion 3.2.3: Consistent Navigation',
        publisher: 'W3C Web Accessibility Initiative',
        url: 'https://www.w3.org/WAI/WCAG22/Understanding/consistent-navigation.html',
      },
    ],
  },
  {
    slug: 'd2c-website-design-india',
    collection: 'websites',
    title: 'Website Design for Indian D2C Brands: From Discovery to Checkout',
    seoTitle: 'D2C Website Design in India: Discovery to Checkout',
    description: 'How Indian D2C brands can design a site that carries the story, answers product questions and gets people through checkout without late surprises.',
    dek: 'A D2C website earns its living between the first photograph and the payment screen. Here is what belongs at each step, from product discovery to a checkout that holds no surprises.',
    keywords: [
      'D2C website design India',
      'ecommerce website design India',
      'product page design',
      'checkout design India',
      'cash on delivery UPI checkout',
      'online store for Indian brand',
    ],
    publishedAt: '2026-09-11',
    visual: {
      kind: 'layers',
      title: 'What a D2C website has to carry',
      layers: [
        { label: 'Brand story', note: 'Why you make it, in your own words' },
        { label: 'Product discovery', note: 'Categories and filters that match how people shop' },
        { label: 'Product page', note: 'Photographs, sizes, ingredients, price, reviews' },
        { label: 'Delivery and payment', note: 'Pincode, charges and methods shown early' },
        { label: 'Checkout', note: 'Few fields, no surprises, one clear total' },
        { label: 'After the order', note: 'Tracking, returns and a person who replies' },
      ],
    },
    summary: [
      'A D2C site does the work of a shop assistant: it shows the product honestly and answers the next question.',
      'Indian e-commerce rules require specific information on the page, including the total price in a single figure and returns, delivery and grievance details.',
      'Most checkouts lose people to surprises: charges that appear late, fields nobody expected, urgency nobody believes.',
      'Test on a mid-range phone on mobile data. That is where the sale is won, or quietly lost.',
    ],
    sections: [
      {
        id: 'story-before-catalogue',
        heading: 'What should the homepage say before it sells anything?',
        blocks: [
          {
            type: 'p',
            text: 'A D2C brand competes with its own listing on a marketplace, and the marketplace usually has faster delivery, more reviews and a bigger discount. What it cannot show is why the thing was made, who makes it and what you refuse to compromise on. That is the advantage your own website starts with, so the first screen should use it.',
          },
          {
            type: 'p',
            text: 'One or two screens is enough: what it is, who it is for, why you make it this way. Then the products. Our fictional [FORME commerce concept](/systems/website-design-development#concept-shop) is built on that restraint — a line about the ritual, one photograph, two products, and a delivery-pincode check beside the buy button.',
          },
          {
            type: 'note',
            tone: 'insight',
            title: 'Say the ordinary thing plainly',
            text: 'Where it is made, what is in it, how long it lasts and what it costs are the details that persuade, because they can be checked. “Clean, conscious, curated” gives a shopper nothing to hold on to.',
          },
        ],
      },
      {
        id: 'product-discovery',
        heading: 'How do people find the right product?',
        blocks: [
          {
            type: 'p',
            text: 'Most Indian D2C brands have a modest catalogue: eight products, or sixty. Filters copied from a large marketplace look absurd at that size. Organise the range the way a customer describes the choice to a shop assistant — by skin type, by concern, by size, by occasion — and let the words on the category page do the sorting.',
          },
          {
            type: 'p',
            text: 'Discovery is also structural. Google’s [ecommerce structure guidance](https://developers.google.com/search/docs/specialty/ecommerce/help-google-understand-your-ecommerce-site-structure) asks for links from menus to category pages and from category pages to every product page, and warns that products not linked from a category page may never be found by the crawler. Products reachable only through a filter or the search box are hard for people and machines alike. Our guide to [planning a sitemap around the customer journey](/insights/website-sitemap-customer-journey) covers that groundwork.',
          },
          {
            type: 'list',
            items: [
              'A category page that explains the choice, not only a grid of tiles.',
              'Sorting people understand: bestselling, price, newest — not “relevance”.',
              'A search box that copes with how customers actually spell your product names.',
              'A clear route back to the full range from every product page.',
              'Out-of-stock items left visible, with a return date or a notify option.',
            ],
          },
        ],
      },
      {
        id: 'product-page',
        heading: 'What must a product page answer?',
        blocks: [
          {
            type: 'p',
            text: 'The product page is the shop assistant. It has to show scale, texture and use: the product in a hand, in its packaging, in the kitchen or bathroom it will live in, and a legible shot of the back of the pack for anything eaten or applied to skin. One hero image and three lifestyle crops is not enough for someone spending two thousand rupees on something they cannot smell.',
          },
          {
            type: 'table',
            caption: 'What a product page has to settle',
            head: ['The buyer’s question', 'What the page shows'],
            rows: [
              ['Is this for me?', 'Size, quantity, skin or fit guidance, who it suits'],
              ['What is in it?', 'Full ingredients or materials, in readable type'],
              ['Will it reach me?', 'Pincode check, delivery estimate, charges'],
              ['What if it is wrong?', 'Returns window, condition, who pays return postage'],
              ['Do others rate it?', 'Reviews with dates, including the middling ones'],
            ],
          },
          {
            type: 'p',
            text: 'Indian rules are specific about some of this. A brand selling its own goods on its own website is an inventory e-commerce entity under the [Consumer Protection (E-Commerce) Rules, 2020](https://consumeraffairs.gov.in/public/upload/files/E%20commerce%20rules_1732703966.pdf), which require it to display prominently, in a clear and accessible manner, the “total price in single figure of any good or service along with the breakup price”, showing compulsory and voluntary charges such as delivery, handling and applicable tax, together with accurate information on “return, refund, exchange, warranty and guarantee, delivery and shipment, cost of return shipping, mode of payments, grievance redressal mechanism”. The rules also require the legal name, address and contact details of customer care and the grievance officer to be shown prominently, and bar a seller from posing as a consumer to post reviews.',
          },
        ],
      },
      {
        id: 'delivery-and-payments',
        heading: 'Pincode, delivery, UPI and cash on delivery',
        blocks: [
          {
            type: 'p',
            text: 'The pincode question arrives early in India and deserves an early answer. Put the delivery estimate and any shipping charge next to the product, not three steps into the checkout. If you reach some pincodes in two days and others in seven, say so where the decision is made. The FORME concept keeps that check beside the buy button for the same reason.',
          },
          {
            type: 'p',
            text: 'Payment expectations have moved quickly. According to the [Press Information Bureau](https://www.pib.gov.in/PressReleaseIframePage.aspx?PRID=2302657), annual UPI transaction volume grew from 1.78 crore transactions in FY 2016-17 to more than 24,162 crore in FY 2025-26, and the IMF recognises UPI as the world’s largest real-time payment system by transaction volume. For a D2C brand, UPI belongs in the first release of the checkout, working properly on a phone.',
          },
          {
            type: 'p',
            text: 'Cash on delivery is a commercial decision before it is a design one: it carries collection costs and orders that come back undelivered. Whatever you decide, put it where the customer can see it, on the product page and at the pincode check rather than at the payment step. If it is limited by pincode or order value, say so before someone types an address.',
          },
          {
            type: 'note',
            tone: 'caution',
            title: 'Pre-ticked boxes are not allowed',
            text: 'The 2020 Rules say consent for a purchase must be “expressed through an explicit and affirmative action”, and that no e-commerce entity shall record it automatically, “including in the form of pre-ticked checkboxes”. Apply the same standard to the newsletter opt-in and the add-on nobody asked for.',
          },
        ],
      },
      {
        id: 'cart-and-checkout',
        heading: 'Where do checkouts lose people?',
        blocks: [
          {
            type: 'p',
            text: 'Checkouts rarely fail because they are ugly. They fail because something appears that the customer did not expect.',
          },
          {
            type: 'list',
            items: [
              'A shipping charge or handling fee that shows up only at the last step.',
              'A compulsory account before an order the customer wanted to place once.',
              'Fields that do not apply to most buyers, asked of everyone.',
              'A pincode typed three times, in three different formats.',
              'An OTP screen that loses the cart when the customer switches apps to read the code.',
              'A coupon box that sends people off to hunt for a code they never find.',
            ],
          },
          {
            type: 'p',
            text: 'Some of the tactics that lift a conversion chart are unfair trade practices in India. The Central Consumer Protection Authority issued [Guidelines for Prevention and Regulation of Dark Patterns](https://www.pib.gov.in/PressReleaseIframePage.aspx?PRID=1983994) on 30 November 2023, listing thirteen specified dark patterns, among them drip pricing, basket sneaking, false urgency, confirm shaming and subscription traps. The Department of Consumer Affairs has since [amended the e-commerce rules](https://www.pib.gov.in/PressReleaseIframePage.aspx?PRID=2308759): the Amendment Rules, 2026 require e-commerce entities to comply with those guidelines, run a yearly self-audit and display a certificate of compliance, and take effect on 1 January 2027.',
          },
          {
            type: 'note',
            tone: 'caution',
            title: 'General information, not legal advice',
            text: 'This summarises public documents as they stood in September 2026, including an amendment that takes effect on 1 January 2027. Read the current notification and take advice on how it applies to your business before you rely on any of it.',
          },
          {
            type: 'example',
            title: 'Illustrative example: a Jaipur candle brand’s checkout',
            text: 'Suppose a small candle brand sees plenty of carts and few orders. Rather than redesign anything, the founder sits with six customers on their own phones and watches. The shipping charge appears only after the address is typed, and two people stop there. Cash on delivery is greyed out with no explanation, so a third assumes the site is broken. A coupon box sends a fourth off to look for a code she never finds. The fixes are small: show the delivery charge beside the pincode check, state that cash on delivery is available above a given order value in that area, and hide the coupon box except during a campaign. The lesson is not a number for the next meeting. It is that most of what lost the sale was decided in the checkout, not in the product.',
          },
        ],
      },
      {
        id: 'after-the-order',
        heading: 'Returns, tracking and the promises made after payment',
        blocks: [
          {
            type: 'p',
            text: 'Write the returns policy the way you would explain it on the phone: how many days, in what condition, who pays return postage, how the refund arrives and how long it takes. The 2020 Rules require that information to be accurate and accessible, and do not allow a seller to refuse to take back goods that are defective, deficient, spurious or not as advertised. A vague policy protects nobody; it only costs you the order.',
          },
          {
            type: 'p',
            text: 'After payment the website still has work to do. An order-status page, an email and a message should say the same thing, and a delay should be admitted before the customer asks. If support runs on WhatsApp, its [Business Messaging Policy](https://whatsappbusiness.com/policy/) allows you to contact people only where they have given their number and opted in; on the Business Platform you may reply freely within 24 hours of the customer’s last message and need an approved template after that. Build that opt-in into the checkout as a choice, not a pre-ticked default.',
          },
        ],
      },
      {
        id: 'performance-on-real-phones',
        heading: 'Does it work on a mid-range phone?',
        blocks: [
          {
            type: 'p',
            text: 'A D2C site accumulates weight: large photographs, a review widget, a chat bubble, a loyalty script, three analytics tags. On an office laptop it feels quick. On a three-year-old Android on mobile data, the product page arrives in pieces and the buy button jumps as the last image loads.',
          },
          {
            type: 'p',
            text: 'Google publishes thresholds worth designing against. According to [web.dev](https://web.dev/articles/vitals), a good experience means Largest Contentful Paint within 2.5 seconds, Interaction to Next Paint of 200 milliseconds or less and Cumulative Layout Shift of 0.1 or less, measured at the 75th percentile of page loads across mobile and desktop. Measure the product page and the checkout first: they usually carry the most weight.',
          },
          {
            type: 'list',
            items: [
              'Compress product photographs and serve them at the size the phone shows.',
              'Reserve space for images and banners so nothing shifts as the page loads.',
              'Load galleries and reviews only when someone scrolls to them.',
              'Count your third-party scripts, and remove the ones nobody looks at.',
              'Re-test after every campaign: pop-ups and tracking tags arrive quietly.',
            ],
          },
        ],
      },
      {
        id: 'measure-what-matters',
        heading: 'What should you measure after launch?',
        blocks: [
          {
            type: 'p',
            text: 'Take a baseline before you change anything, then watch a few measures that describe the customer’s experience rather than flatter the site.',
          },
          {
            type: 'table',
            caption: 'Measures that reflect the buyer’s experience',
            head: ['Measure', 'What it tells you', 'Watch out for'],
            rows: [
              ['Product page to add-to-cart', 'Whether the page settles doubts', 'Campaign traffic that never intended to buy'],
              ['Checkout completion', 'Where the flow breaks down', 'Treating every abandoned cart as recoverable'],
              ['Returns and undelivered orders', 'Whether the page set expectations', 'Blaming couriers for size and colour surprises'],
              ['First reply time on support', 'Whether anyone is actually answering', 'Automatic acknowledgements that say nothing'],
            ],
          },
          {
            type: 'p',
            text: 'Read the numbers next to the messages. A dashboard tells you where people stopped; a customer complaining that the delivery charge appeared at the last step tells you why. Bringing the story, the structure, the product pages and the checkout together is what our [Website Design & Development](/systems/website-design-development) work is for, with your team reviewing the journeys before launch.',
          },
        ],
      },
    ],
    limitations: [
      'Design cannot fix a product people do not want, or a delivery promise the courier cannot keep.',
      'The rules quoted here are summarised from public documents and are amended. Read the current text and take advice for your own business.',
      'A brand site rarely beats a marketplace on price or delivery speed. Decide what your own site is for before you rebuild it.',
      'Checkout changes need testing on real devices with real payment methods. A staging test with a test card proves very little.',
      'Photographs and reviews take time to gather. A new brand will look thin for a while; say so honestly rather than inventing social proof.',
    ],
    faqs: [
      {
        q: 'What should an Indian D2C product page include?',
        a: 'Photographs that show scale and texture, the full ingredient or material list, sizes and variants, the total price in a single figure with charges and tax broken out, a delivery estimate against the customer’s pincode, the returns window and who pays return postage, and honest reviews. The 2020 e-commerce rules also require prominent grievance and customer care contacts.',
      },
      {
        q: 'Should a D2C brand offer cash on delivery?',
        a: 'It is a commercial decision rather than a design one, because cash on delivery carries collection costs and orders that come back undelivered. Whichever way you go, make it visible early: at the pincode check and on the product page, not at the payment step. If you limit it by pincode or order value, say so before the customer types an address.',
      },
      {
        q: 'What do Indian e-commerce rules require on a brand website?',
        a: 'The Consumer Protection (E-Commerce) Rules, 2020 require prominent display of the legal name and address, customer care and grievance officer contacts, the total price in a single figure with the breakup of charges and tax, and accurate information on returns, refunds, exchange, warranty, delivery and payment methods. Consent must be explicit, with no pre-ticked boxes. This is general information, not legal advice.',
      },
      {
        q: 'How do I reduce checkout abandonment?',
        a: 'Remove the surprises first. Show delivery charges and estimates before the cart, allow a guest checkout, ask only for fields you genuinely need, keep the total visible, and make the payment methods your customers use work properly on a phone. Then watch six real people buy something on their own devices. That usually finds more than a month of dashboard reading.',
      },
      {
        q: 'Are urgency timers and pre-ticked add-ons allowed in India?',
        a: 'Treat them with care. The Central Consumer Protection Authority issued Guidelines for Prevention and Regulation of Dark Patterns in November 2023, listing thirteen specified patterns including false urgency, basket sneaking, drip pricing and subscription traps. The 2026 amendment to the e-commerce rules, in force from 1 January 2027, requires compliance with those guidelines, a yearly self-audit and a displayed certificate.',
      },
    ],
    bybo: [
      {
        href: '/systems/website-design-development#concept-shop',
        label: 'FORME commerce concept',
        why: 'A fictional storefront concept showing product discovery, rupee pricing and a delivery-pincode journey.',
      },
      {
        href: '/systems/website-design-development',
        label: 'Website Design & Development',
        why: 'Story, structure, product pages and checkout designed together, with your review before launch.',
      },
      {
        href: '/apply?system=website-design-development',
        label: 'Start a website enquiry',
        why: 'Tell us your catalogue, your delivery reality and where your checkout loses people.',
      },
    ],
    related: ['what-makes-a-website-feel-premium', 'mobile-website-experience', 'ai-for-indian-consumer-brands'],
    sources: [
      {
        title: 'Consumer Protection (E-Commerce) Rules, 2020 (G.S.R. 462(E), 23 July 2020)',
        publisher: 'Department of Consumer Affairs, Government of India',
        url: 'https://consumeraffairs.gov.in/public/upload/files/E%20commerce%20rules_1732703966.pdf',
      },
      {
        title: 'Government amends E-Commerce Rules to strengthen consumer protection and promote transparency',
        publisher: 'Press Information Bureau, Government of India',
        url: 'https://www.pib.gov.in/PressReleaseIframePage.aspx?PRID=2308759',
      },
      {
        title: 'CCPA issues Guidelines for Prevention and Regulation of Dark Patterns, 2023',
        publisher: 'Press Information Bureau, Government of India',
        url: 'https://www.pib.gov.in/PressReleaseIframePage.aspx?PRID=1983994',
      },
      {
        title: 'UPI Completes 10 Years of Digital Payments',
        publisher: 'Press Information Bureau, Government of India',
        url: 'https://www.pib.gov.in/PressReleaseIframePage.aspx?PRID=2302657',
      },
      {
        title: 'Help Google understand your ecommerce website structure',
        publisher: 'Google Search Central',
        url: 'https://developers.google.com/search/docs/specialty/ecommerce/help-google-understand-your-ecommerce-site-structure',
      },
      {
        title: 'Web Vitals',
        publisher: 'web.dev (Google)',
        url: 'https://web.dev/articles/vitals',
      },
      {
        title: 'WhatsApp Business Messaging Policy',
        publisher: 'WhatsApp (Meta)',
        url: 'https://whatsappbusiness.com/policy/',
      },
    ],
  },
  {
    slug: 'restaurant-website-design',
    collection: 'websites',
    title: 'Restaurant Website Design: Menus, Bookings and Local Discovery',
    seoTitle: 'Restaurant Website Design: Menus and Bookings',
    description: 'What a restaurant website owes a hungry visitor: a readable menu with prices, dietary marks, a booking flow your team can keep and listings that agree.',
    dek: 'A restaurant website is read at seven in the evening, on a phone, by someone deciding where to eat. Four answers decide the table: the food, the price, the hours and the booking.',
    keywords: [
      'restaurant website design',
      'restaurant menu website',
      'online table booking website',
      'Google Business Profile restaurant',
      'cafe website design India',
      'restaurant local discovery',
    ],
    publishedAt: '2026-09-11',
    visual: {
      kind: 'compare',
      title: 'A PDF menu, or real pages',
      left: {
        label: 'Menu as a PDF',
        items: [
          'Downloads, then asks for pinch and zoom',
          'Out of date the week prices change',
          'Dishes cannot be linked or shared',
          'Rarely usable with a screen reader',
          'Invisible to anyone searching a dish',
        ],
      },
      right: {
        label: 'Menu as web pages',
        items: [
          'Opens instantly and reflows on a phone',
          'Edited by your team the same morning',
          'Every section has a link you can send',
          'Read aloud, searched and translated',
          'Veg, allergen and spice marks in the text',
        ],
      },
    },
    summary: [
      'Put the menu on the page as text with prices. A PDF asks a hungry person to download, pinch and squint.',
      'Mark vegetarian and non-vegetarian items and allergens: Indian food regulations require both against items on menu cards and boards.',
      'Match the booking flow to how your team really works: live availability, or an honest request with a promised reply time.',
      'Your website, your Google Business Profile and your door should agree on hours, address and phone number.',
    ],
    sections: [
      {
        id: 'what-diners-want',
        heading: 'What is someone looking for at seven in the evening?',
        blocks: [
          {
            type: 'p',
            text: 'Picture the visitor honestly. She is in an auto, or on the pavement outside, or arguing with four friends in a group chat, with your website open on a phone with one bar of signal. She wants four things: what the food is and whether there is something for everyone, roughly what it will cost, whether you are open and where exactly you are, and whether six people can get a table at eight.',
          },
          {
            type: 'p',
            text: 'Everything else — the chef’s training, the sourcing, the photograph of the wood-fired oven arriving on a truck — matters, and it matters after those four answers. Most restaurant websites reverse the order, opening with a full-screen video and a scroll prompt while the menu hides behind a hamburger icon.',
          },
          {
            type: 'note',
            tone: 'insight',
            title: 'Design for the decision, not the brochure',
            text: 'Menu, prices, hours, location and the way to book should each be one tap from the first screen, on the smallest phone you can find. Atmosphere is what convinces people once they have those.',
          },
        ],
      },
      {
        id: 'menu-as-pages',
        heading: 'Why the menu should be pages, not a PDF',
        blocks: [
          {
            type: 'p',
            text: 'The PDF menu is the most common fault in restaurant websites, and the most quietly expensive. It downloads, opens in another app and arrives laid out for a sheet of A4, so the reader is left pinching and dragging across a page designed for a printer. WCAG 2.2 asks, at Level AA, that content [reflow](https://www.w3.org/WAI/WCAG22/Understanding/reflow.html) without loss of information or functionality and without scrolling in two directions at a width equivalent to 320 CSS pixels. A fixed A4 layout fails that by design.',
          },
          {
            type: 'p',
            text: 'Pages also let the menu keep up with the kitchen. Prices change, a supplier fails, the tasting menu is rewritten in July. On web pages, someone in the restaurant edits a line before service. In a PDF, that means finding the designer and re-exporting the file, which is why so many menus online are a year old.',
          },
          {
            type: 'p',
            text: 'Structure it the way the printed menu is structured: sections in the order people eat, dish name as the kitchen says it, one honest line of description, and the price. Photograph a few dishes rather than all of them; a half-lit picture of every item does more harm than none.',
          },
        ],
      },
      {
        id: 'prices-and-dietary-marks',
        heading: 'Prices, dietary marks and what the regulations expect',
        blocks: [
          {
            type: 'p',
            text: 'Show the prices. A menu without prices asks people to telephone and ask, and most of them will simply choose somewhere else. If prices move often, date the menu rather than hiding the numbers, and say whether taxes are included so nobody is surprised by the bill.',
          },
          {
            type: 'p',
            text: 'India’s food regulations are specific about menus. Under the [Food Safety and Standards (Labelling and Display) Regulations, 2020](https://fssai.gov.in/upload/uploadfiles/files/Comp_Labelling%20Display_Version%20VIII_09_09_2025.pdf), food service establishments must mention, against the food items displayed on menu cards or boards, information relating to food allergens — which “may be depicted by easy to understand symbols” — and the logo for veg or non-veg. Establishments holding a central licence, or with outlets at ten or more locations, must also show the calorific value in kcal per serving with the serving size, together with the line “An average active adult requires 2,000 kcal energy per day, however, calorie needs may vary.” The regulations exempt some cases, including premises operating for fewer than 60 days in a year and items modified at a customer’s request.',
          },
          {
            type: 'note',
            tone: 'caution',
            title: 'General information, not legal advice',
            text: 'These regulations are amended from time to time and how they apply depends on your licence and your number of outlets. This summarises the compendium FSSAI published in September 2025; check the current text and take advice. Whatever the rule requires, marking veg, egg, nuts and dairy is plainly useful to your guests.',
          },
          {
            type: 'list',
            items: [
              'The dish name the kitchen and the servers actually use.',
              'One honest line of description, not three adjectives.',
              'The price, and whether taxes are included.',
              'Veg or non-veg marking, and allergen symbols with a key.',
              'Spice level where it genuinely varies between dishes.',
              'A note where a dish takes twenty minutes or is limited to a few portions.',
            ],
          },
        ],
      },
      {
        id: 'booking-flow',
        heading: 'A booking flow your team can actually keep',
        blocks: [
          {
            type: 'p',
            text: 'There are two honest designs. The first is live availability, where the site holds real tables and confirms immediately. The second is a request: “Send us the details and we will confirm on WhatsApp within the hour, between 10 am and 6 pm.” The dishonest third design is the one most restaurants have — a form that looks like a booking, produces a cheerful confirmation screen and is in fact an email nobody reads during service.',
          },
          {
            type: 'p',
            text: 'Ask for the date, the time, the number of guests, a name and a phone number, the occasion if there is one, and a single free line for anything else: a wheelchair, a high chair, a cake, a table away from the speakers. Nothing more. Then repeat the details back and say what happens next, including what to do if plans change.',
          },
          {
            type: 'p',
            text: 'Our fictional [EMBER restaurant concept](/systems/website-design-development#concept-restaurant) shows the shape of it: guests, a time, a prepared request, and a line stating plainly that no reservation has been made. On a working site, that last line is where you name who confirms and how quickly. When requests outgrow one person’s phone, the capture and follow-up can be handled as a workflow — our guide to [automating customer enquiries](/insights/automate-customer-enquiries) covers where a person should stay in it.',
          },
          {
            type: 'example',
            title: 'Illustrative example: a Bengaluru bistro’s Friday enquiries',
            text: 'Suppose a forty-cover bistro takes table requests through a form that emails the owner. On Friday evening the owner’s phone is on a shelf in the kitchen. Nine requests arrive between six and nine; four are answered the next morning, by which time two of those parties have eaten elsewhere. Nothing on the website is broken. The design promised a reply the business could not give at its busiest hour. Either the form says requests are confirmed between 10 am and 6 pm, or somebody on the floor gets them on their phone with an agreed response time. The restaurant has to choose; the website cannot.',
          },
        ],
      },
      {
        id: 'hours-and-location',
        heading: 'Hours, location and the details people check last',
        blocks: [
          {
            type: 'p',
            text: 'Hours are the detail most often wrong and most costly when it is. Publish them per service, with the last kitchen order, and treat the exceptions as content: the weekly off, festival closures, the Sunday brunch that stops during the monsoon.',
          },
          {
            type: 'p',
            text: 'Location needs the same care in Indian cities, where an address is rarely enough. A map pin on the block is not a map pin on the entrance, and a landmark line saves a driver two phone calls.',
          },
          {
            type: 'list',
            items: [
              'Opening times by service, with the time the kitchen stops taking orders.',
              'Weekly off, festival closures and any special hours.',
              'A map pin on the entrance, plus a landmark line for drivers.',
              'Parking, valet and the nearest metro station or bus stop.',
              'A tappable phone number, and someone who answers it during service.',
              'Access stated plainly: steps, a lift, an accessible toilet.',
            ],
          },
        ],
      },
      {
        id: 'google-business-profile',
        heading: 'Keeping Google and your website telling the same story',
        blocks: [
          {
            type: 'p',
            text: 'Many people never reach your website first. They see the Business Profile in Search or Maps, and decide from that. Google says local results are based on relevance, distance and prominence, and states plainly that there is [no way to request or pay](https://support.google.com/business/answer/7091) for a better local ranking. What it does recommend is within your control: verify the business, keep the information complete and current, including your full address and special hours, respond to reviews, and add photographs.',
          },
          {
            type: 'p',
            text: 'Consistency is the part a website can help with. Google’s [guidelines for representing your business](https://support.google.com/business/answer/3038177) ask that your name reflect your real-world name as used on your storefront, website and stationery, that you use a precise, accurate address, and that you provide your regular customer-facing hours. Your website is where a customer goes to check all three. Mismatches are what leave someone standing outside a closed door on a Tuesday.',
          },
          {
            type: 'p',
            text: 'The profile can carry the menu too. Google’s [menu editor](https://support.google.com/business/answer/9455840) lets food and drink businesses list items with descriptions and prices, grouped into sections, and changes can take 24 to 48 hours to appear on Maps and Search. Keep it in step with the site, and point the profile’s menu link at your menu page rather than at a PDF.',
          },
        ],
      },
      {
        id: 'photography-and-private-dining',
        heading: 'Photographs, events and private dining',
        blocks: [
          {
            type: 'p',
            text: 'Photograph the room at the hour people visit it, not at three in the afternoon with the lights off. Photograph a few dishes as they are actually plated, by the person who plates them, in consistent light. Photograph the staff. Stock images of pasta and generic candlelit tables are the fastest way to look like every other listing, and diners have learned to distrust them.',
          },
          {
            type: 'p',
            text: 'Private dining and events deserve a page that answers what an enquirer would otherwise send in three emails: how many people seated and standing, whether the space is exclusive, whether there is a minimum spend and what it is, sample set menus with prices, whether an outside cake is allowed, and who to contact with a phone number and a realistic reply time. Put it in text on the page. A PDF that has to be requested loses the enquiry to the restaurant that published its numbers.',
          },
        ],
      },
      {
        id: 'delivery-mobile-and-measurement',
        heading: 'Delivery links, mobile care and what to measure',
        blocks: [
          {
            type: 'p',
            text: 'If you are on delivery platforms, link to them clearly and keep the links working; a dead link to a closed listing is worse than none. If you take direct orders, state the area, the timings and the minimum order. Keep the delivery invitation below the table-booking one if the room is what you would rather fill.',
          },
          {
            type: 'p',
            text: 'Then read the whole site on a phone, standing up, with one thumb. Tap targets that are comfortable, a phone number that dials, a menu that loads on a mobile network in a basement, and nothing covering the page before a word has been read. Our guide to [mobile website experience](/insights/mobile-website-experience) goes further into the details.',
          },
          {
            type: 'table',
            caption: 'Measures worth watching for a restaurant',
            head: ['Measure', 'What it tells you'],
            rows: [
              ['Calls and direction taps', 'Whether the site is doing the practical work'],
              ['Menu page views per visit', 'Whether people find the menu at all'],
              ['Booking requests started and finished', 'Where the form loses people'],
              ['Requests answered within the promise', 'Whether the flow matches your staffing'],
            ],
          },
          {
            type: 'p',
            text: 'A restaurant site is small and unforgiving: eight pages, four questions, one impression made in ninety seconds. That is the kind of brief our [Website Design & Development](/systems/website-design-development) work is built for, from the menu structure and the booking flow to the visual direction and the launch checks, with your team reviewing the journeys before anything goes live.',
          },
        ],
      },
    ],
    limitations: [
      'A website cannot answer a table request. Bookings need a person, a routine and an agreed response time.',
      'Delivery platforms control their own listings. Your site can link to them; it cannot correct what they show.',
      'Food regulations depend on your licence and outlet count and are amended. Confirm the current requirements for your business.',
      'Photography is usually the largest cost in a restaurant website and the hardest to borrow. Budget for it before the build.',
      'Local visibility takes time, reviews and consistency. A new website does not make a place better known on its own.',
    ],
    faqs: [
      {
        q: 'Should a restaurant menu be a PDF on the website?',
        a: 'No. A PDF downloads, opens in another app and arrives sized for a sheet of paper, so a phone user must pinch and drag to read it. Web pages reflow to the screen, can be updated by your own team before service, can be searched, linked and read aloud, and let you mark veg, non-veg and allergens in the text. Keep a printable PDF if you want one, but never as the only menu.',
      },
      {
        q: 'What should a restaurant website include?',
        a: 'The menu as readable pages with prices, dietary and allergen marks, opening times by service with the last kitchen order, the exact location with a landmark and a map pin on the entrance, a booking or enquiry route with a promised reply time, a tappable phone number, real photographs of the room and the food, and a private dining page if you host events.',
      },
      {
        q: 'How do I get my restaurant to show up on Google Maps?',
        a: 'Claim and verify your Business Profile, then keep it complete and accurate: full address, categories, attributes, regular and special hours, photographs and replies to reviews. Google says local results depend on relevance, distance and prominence, and that there is no way to request or pay for a better ranking. Make sure your website carries the same name, address and hours.',
      },
      {
        q: 'Do restaurant menus in India have to show allergens and calories?',
        a: 'The Food Safety and Standards (Labelling and Display) Regulations, 2020 require food service establishments to mention allergen information and a veg or non-veg logo against items on menu cards or boards, with allergens allowed as easy-to-understand symbols. Calorie declarations apply to establishments with a central licence or outlets at ten or more locations. Some cases are exempt. Check the current text and take advice for your business.',
      },
      {
        q: 'Do I need an online table booking system?',
        a: 'Only if you can honour it. A live booking tool works when someone maintains real availability and the covers justify the subscription. For most independent restaurants an enquiry form is enough, provided it says who will reply and by when, and provided that promise matches your staffing. What loses trust is a form that behaves like a confirmation and is not one.',
      },
    ],
    bybo: [
      {
        href: '/systems/website-design-development#concept-restaurant',
        label: 'EMBER hospitality concept',
        why: 'A fictional dining concept showing menu exploration and a direct table enquiry on a phone.',
      },
      {
        href: '/systems/website-design-development',
        label: 'Website Design & Development',
        why: 'Menu structure, booking flow, visual direction and launch checks, reviewed with your team before launch.',
      },
      {
        href: '/systems/customer-workforce-ai',
        label: 'Customer & Workforce AI',
        why: 'For restaurants whose table requests and follow-ups have outgrown one person’s phone.',
      },
    ],
    related: ['mobile-website-experience', 'website-sitemap-customer-journey', 'automate-customer-enquiries'],
    sources: [
      {
        title: 'Understanding Success Criterion 1.4.10: Reflow',
        publisher: 'W3C Web Accessibility Initiative',
        url: 'https://www.w3.org/WAI/WCAG22/Understanding/reflow.html',
      },
      {
        title: 'Food Safety and Standards (Labelling and Display) Regulations, 2020 (compendium, Version VIII)',
        publisher: 'Food Safety and Standards Authority of India',
        url: 'https://fssai.gov.in/upload/uploadfiles/files/Comp_Labelling%20Display_Version%20VIII_09_09_2025.pdf',
      },
      {
        title: 'Tips to improve your local ranking on Google',
        publisher: 'Google Business Profile Help',
        url: 'https://support.google.com/business/answer/7091',
      },
      {
        title: 'Guidelines for representing your business on Google',
        publisher: 'Google Business Profile Help',
        url: 'https://support.google.com/business/answer/3038177',
      },
      {
        title: 'About the menu editor',
        publisher: 'Google Business Profile Help',
        url: 'https://support.google.com/business/answer/9455840',
      },
    ],
  },
];

export default guides;
