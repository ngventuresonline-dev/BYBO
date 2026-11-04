/**
 * Website blueprints: the ready wireframe for each kind of business. A blueprint
 * fixes which pages the demo has, the order of the home page sections, what the
 * enquiry form asks, what the owner dashboard tracks, and what the drafting
 * model must write. Every demo is drafted into one of these, so an interior
 * studio gets services, projects and a consultation form, not a shop.
 */

export type Kind =
  | 'store' | 'catalogue' | 'interiors' | 'realestate' | 'salon' | 'clinic' | 'education' | 'restaurant'
  | 'hospitality' | 'fitness' | 'agency' | 'portfolio' | 'events' | 'local';

/** Home page sections the demo template knows how to draw. */
export type Section =
  | 'hero' | 'story' | 'marquee' | 'collections' | 'shop' | 'compare' | 'spotlight'
  | 'services' | 'menu' | 'work' | 'why' | 'process' | 'gallery' | 'cta' | 'notes';

export type Field = { name: string; label: string; type: 'text' | 'tel' | 'select' | 'date' | 'textarea'; options?: string[]; from?: 'services' | 'areas' | 'work' };

export type Blueprint = {
  kind: Kind;
  label: string;
  /** Who this is for, used to pick the blueprint and in the wireframe list. */
  for: string;
  match: RegExp;
  /** Commerce blueprints use the shop, product, cart and checkout pages. */
  commerce: boolean;
  /** Names for the two content pages: what they offer, and proof of their work. */
  servicesLabel: string;
  workLabel: string;
  pages: { path: string; label: string; sections: string[] }[];
  home: Section[];
  cta: { primary: string; secondary: string };
  processTitle: string;
  form: { title: string; sub: string; submit: string; fields: Field[] };
  dashboard: { kpis: [string, string][]; stages: string[]; sources: string[]; automations: [string, string][] };
  /** What the drafting model writes for services and work, and how to art-direct them. */
  draft: string;
};

const NAME: Field = { name: 'name', label: 'Your name', type: 'text' };
const PHONE: Field = { name: 'phone', label: 'Mobile or WhatsApp', type: 'tel' };
const NOTE: Field = { name: 'message', label: 'Anything we should know?', type: 'textarea' };
const BUDGET = (o: string[]): Field => ({ name: 'budget', label: 'Budget', type: 'select', options: o });
const WHEN = (o: string[]): Field => ({ name: 'when', label: 'When', type: 'select', options: o });

const store = (extra: Partial<Blueprint>): Blueprint => ({
  kind: 'store', label: 'Online store', for: 'D2C brands selling products online', match: /$^/, commerce: true,
  servicesLabel: 'Collections', workLabel: 'Lookbook',
  pages: [
    { path: '/', label: 'Home', sections: ['Pinned product hero', 'How it works', 'Collections', 'Bestsellers rail', 'Before and after', 'Product spotlight', 'Why us', 'How ordering works', 'Call to action'] },
    { path: '/shop', label: 'Shop', sections: ['Category filters', 'Product grid', 'Quick add'] },
    { path: '/p/[product]', label: 'Product', sections: ['Gallery', 'Price and buy box', 'Details and care', 'Related products'] },
    { path: '/cart', label: 'Cart', sections: ['Lines', 'Order summary'] },
    { path: '/checkout', label: 'Checkout', sections: ['Address', 'Payment', 'Confirmation'] },
    { path: '/about', label: 'Our story', sections: ['Brand story', 'Values', 'Promise'] },
    { path: '/contact', label: 'Contact', sections: ['Contact form', 'Good to know'] },
    { path: '/dashboard', label: 'Owner dashboard', sections: ['Revenue and orders', 'Carts', 'Campaigns', 'Automations', 'Products'] },
  ],
  home: ['hero', 'story', 'marquee', 'collections', 'shop', 'compare', 'spotlight', 'why', 'gallery', 'process', 'cta', 'notes'],
  cta: { primary: 'Shop the range', secondary: 'Ask us anything' },
  processTitle: 'How ordering works',
  form: { title: 'We are here to help.', sub: 'Questions about an order or a product? Write to us.', submit: 'Send message', fields: [NAME, PHONE, NOTE] },
  dashboard: { kpis: [], stages: [], sources: [], automations: [] },
  draft: '',
  ...extra,
});

const BLUEPRINTS: Blueprint[] = [
  store({}),
  store({
    kind: 'catalogue', label: 'Catalogue and bulk orders', for: 'Manufacturers, wholesalers and B2B suppliers with price on request',
    match: /manufactur|wholesal|supplier|distribut|b2b|industrial|export|packag|disposable|trading/i,
    cta: { primary: 'Browse the catalogue', secondary: 'Get a bulk quote' }, processTitle: 'How bulk orders work',
  }),
  {
    kind: 'interiors', label: 'Interior design and furniture', for: 'Interior designers, architects, furniture makers, décor and modular kitchen studios',
    match: /interior|architect|furniture|d[ée]cor|modular|kitchen|renovat|home design|turnkey/i, commerce: false,
    servicesLabel: 'Services', workLabel: 'Projects',
    pages: [
      { path: '/', label: 'Home', sections: ['Scroll-built room hero', 'Services', 'Selected projects', 'Why us', 'How we work', 'Consultation call to action'] },
      { path: '/services', label: 'Services', sections: ['Each service as a full chapter: photo, what is included, who it is for', 'Enquire about this service'] },
      { path: '/work', label: 'Projects', sections: ['Filter by type (homes, villas, commercial)', 'Project grid with location and scope'] },
      { path: '/about', label: 'Studio', sections: ['Studio story', 'Values', 'Promise'] },
      { path: '/contact', label: 'Book a consultation', sections: ['Project brief form: type, area, budget, timeline', 'Studio details'] },
      { path: '/dashboard', label: 'Owner dashboard', sections: ['Enquiries and site visits', 'Project pipeline', 'Lead sources', 'Campaigns', 'Automations'] },
    ],
    home: ['hero', 'marquee', 'services', 'work', 'why', 'process', 'cta', 'notes'],
    cta: { primary: 'Book a consultation', secondary: 'See our projects' }, processTitle: 'How we work',
    form: { title: 'Tell us about your space.', sub: 'A few details and our designer will call you back.', submit: 'Request a consultation', fields: [
      NAME, PHONE, { name: 'service', label: 'What do you need?', type: 'select', from: 'services' },
      { name: 'type', label: 'Property', type: 'select', options: ['Apartment', 'Villa or independent house', 'Office', 'Retail or restaurant', 'Other'] },
      { name: 'area', label: 'Location', type: 'select', from: 'areas' },
      BUDGET(['Under ₹10 lakh', '₹10–25 lakh', '₹25–50 lakh', '₹50 lakh+', 'Not sure yet']), WHEN(['Right away', 'In 1–3 months', 'In 3–6 months', 'Just exploring']), NOTE] },
    dashboard: { kpis: [['Enquiries this week', 'enq'], ['Site visits booked', 'visit'], ['Proposals out', 'prop'], ['Projects won', 'won']], stages: ['New enquiry', 'Consultation', 'Site visit', 'Design proposal', 'Won'], sources: ['Instagram', 'Google', 'Website', 'Referral', 'WhatsApp'], automations: [['Instant WhatsApp reply', 'Every enquiry gets a reply in seconds with your portfolio.'], ['Site visit reminder', 'A reminder the day before, with the designer’s name.'], ['Proposal follow-up', 'A nudge three days after the proposal goes out.'], ['Project updates', 'Weekly progress photos sent to the client.'], ['Review request', 'Asks for a Google review after handover.']] },
    draft: 'services: 4-6 things they do (e.g. full home interiors, turnkey execution, custom furniture, modular kitchens, commercial fit-outs), each with 3-4 short "what is included" points and an art-direction brief for a finished room or detail. work: 4-6 example projects using ONLY project names, places and types from the scan (e.g. "Villa, Golf Course Extension Road"); brief = a photo of that kind of finished space. areas: the cities or localities they serve, from the scan.',
  },
  {
    kind: 'realestate', label: 'Real estate', for: 'Developers, brokers and property consultants',
    match: /real estate|realty|propert|developer|builder|apartment|villa project|plots|broker/i, commerce: false,
    servicesLabel: 'Services', workLabel: 'Properties',
    pages: [
      { path: '/', label: 'Home', sections: ['Hero with property search intent', 'Featured properties', 'Services (buy, sell, rent, NRI)', 'Why us', 'How buying works', 'Site visit call to action'] },
      { path: '/work', label: 'Properties', sections: ['Filter by type and locality', 'Listing cards: configuration, locality, status'] },
      { path: '/services', label: 'Services', sections: ['Buy, sell, rent, home loans, NRI services'] },
      { path: '/about', label: 'About', sections: ['Story', 'Values', 'Promise'] },
      { path: '/contact', label: 'Book a site visit', sections: ['Requirement form: type, budget, locality', 'Office details'] },
      { path: '/dashboard', label: 'Owner dashboard', sections: ['Leads and site visits', 'Deal pipeline', 'Lead sources', 'Campaigns', 'Automations'] },
    ],
    home: ['hero', 'marquee', 'work', 'services', 'why', 'process', 'cta', 'notes'],
    cta: { primary: 'Book a site visit', secondary: 'See properties' }, processTitle: 'How buying works',
    form: { title: 'Find your next home.', sub: 'Share what you are looking for and we will shortlist for you.', submit: 'Get a shortlist', fields: [
      NAME, PHONE, { name: 'type', label: 'Looking for', type: 'select', options: ['Apartment', 'Villa', 'Plot', 'Commercial', 'Rent'] },
      { name: 'area', label: 'Preferred locality', type: 'select', from: 'areas' },
      BUDGET(['Under ₹50 lakh', '₹50 lakh–1 crore', '₹1–2 crore', '₹2 crore+']), WHEN(['This month', 'In 3 months', 'In 6 months', 'Just exploring']), NOTE] },
    dashboard: { kpis: [['New leads this week', 'enq'], ['Site visits booked', 'visit'], ['Negotiations', 'prop'], ['Deals closed', 'won']], stages: ['New lead', 'Qualified', 'Site visit', 'Negotiation', 'Closed'], sources: ['Instagram', 'Google', '99acres', 'Website', 'Referral'], automations: [['Instant WhatsApp reply', 'Matching properties sent the moment a lead comes in.'], ['Site visit reminder', 'Location pin and time sent the day before.'], ['Price drop alerts', 'Tells interested buyers when a price changes.'], ['Re-engage cold leads', 'Fresh listings to leads who went quiet.']] },
    draft: 'work: 4-6 properties using ONLY names, localities and configurations from the scan (never invent prices or sizes); meta = configuration, locality, status where stated. services: buying, selling, renting, loans or NRI help as the scan supports, with 3 points each. areas: localities from the scan. Briefs: architectural exterior and interior photography.',
  },
  {
    kind: 'salon', label: 'Salon and spa', for: 'Salons, spas, beauty studios, barbers, nail and bridal makeup artists',
    match: /salon|spa\b|beauty|barber|nail|makeup|bridal|grooming|hair|massage|wellness/i, commerce: false,
    servicesLabel: 'Treatments', workLabel: 'Gallery',
    pages: [
      { path: '/', label: 'Home', sections: ['Hero', 'Treatment menu with time and price', 'Gallery of looks', 'Why us', 'How booking works', 'Book call to action'] },
      { path: '/services', label: 'Treatments', sections: ['Menu by category: hair, skin, nails, spa', 'Duration and price where known'] },
      { path: '/work', label: 'Gallery', sections: ['Looks and results by category'] },
      { path: '/about', label: 'About', sections: ['Story', 'Hygiene and products promise'] },
      { path: '/contact', label: 'Book an appointment', sections: ['Booking form: treatment, date, time', 'Address and hours'] },
      { path: '/dashboard', label: 'Owner dashboard', sections: ['Bookings today', 'Booking pipeline', 'Repeat clients', 'Campaigns', 'Automations'] },
    ],
    home: ['hero', 'marquee', 'menu', 'work', 'why', 'process', 'cta', 'notes'],
    cta: { primary: 'Book an appointment', secondary: 'See treatments' }, processTitle: 'How booking works',
    form: { title: 'Book your appointment.', sub: 'Pick a treatment and a time; we confirm on WhatsApp.', submit: 'Request booking', fields: [
      NAME, PHONE, { name: 'service', label: 'Treatment', type: 'select', from: 'services' }, { name: 'date', label: 'Preferred date', type: 'date' },
      { name: 'when', label: 'Time', type: 'select', options: ['Morning', 'Afternoon', 'Evening'] }, NOTE] },
    dashboard: { kpis: [['Bookings today', 'enq'], ['Confirmed', 'visit'], ['Repeat clients', 'prop'], ['No-shows saved', 'won']], stages: ['Requested', 'Confirmed', 'In chair', 'Completed', 'Rebooked'], sources: ['Instagram', 'Google Maps', 'Walk-in', 'WhatsApp', 'Referral'], automations: [['Booking confirmation', 'Instant WhatsApp confirmation with time and stylist.'], ['Reminder', 'A reminder two hours before, so fewer no-shows.'], ['Rebook nudge', 'Suggests the next visit when a treatment is due.'], ['Birthday offer', 'A small treat on their birthday.']] },
    draft: 'services: 6-10 treatments grouped by category with duration and price ONLY if the scan states them (else null); points = 2-3 short lines. work: 4-6 looks or results, type = category; briefs = beauty editorial close-ups.',
  },
  {
    kind: 'clinic', label: 'Clinic and healthcare', for: 'Doctors, dental, skin and hair, physio, cosmetic and plastic surgery clinics',
    match: /clinic|dental|dentist|derma|skin|doctor|hospital|physio|surgeon|plastic surgery|cosmetic|ivf|eye|health/i, commerce: false,
    servicesLabel: 'Treatments', workLabel: 'Results',
    pages: [
      { path: '/', label: 'Home', sections: ['Hero', 'Treatments', 'What to expect', 'Why us', 'Your visit, step by step', 'Consultation call to action'] },
      { path: '/services', label: 'Treatments', sections: ['Each treatment: who it helps, what happens, recovery'] },
      { path: '/work', label: 'Results', sections: ['Illustrative results by treatment, clearly marked'] },
      { path: '/about', label: 'About the clinic', sections: ['Story', 'Care promise'] },
      { path: '/contact', label: 'Book a consultation', sections: ['Consultation form: concern, date', 'Clinic address and hours'] },
      { path: '/dashboard', label: 'Owner dashboard', sections: ['Consultations', 'Patient pipeline', 'Sources', 'Campaigns', 'Automations'] },
    ],
    home: ['hero', 'marquee', 'services', 'work', 'why', 'process', 'cta', 'notes'],
    cta: { primary: 'Book a consultation', secondary: 'See treatments' }, processTitle: 'Your visit, step by step',
    form: { title: 'Book a consultation.', sub: 'Tell us your concern and a time that suits you.', submit: 'Request consultation', fields: [
      NAME, PHONE, { name: 'service', label: 'Concern or treatment', type: 'select', from: 'services' }, { name: 'date', label: 'Preferred date', type: 'date' }, NOTE] },
    dashboard: { kpis: [['Consultations this week', 'enq'], ['Confirmed', 'visit'], ['Treatment plans', 'prop'], ['Treatments started', 'won']], stages: ['Enquiry', 'Consultation booked', 'Consulted', 'Plan shared', 'Treatment started'], sources: ['Google', 'Instagram', 'Practo', 'Website', 'Referral'], automations: [['Appointment confirmation', 'WhatsApp confirmation with directions.'], ['Reminder', 'A reminder the day before.'], ['Aftercare', 'Aftercare instructions after the treatment.'], ['Follow-up', 'Checks in a week later and books the review.']] },
    draft: 'services: 4-8 treatments from the scan with 3 points (who it helps, what happens, recovery). No medical claims beyond the scan. work: 3-4 illustrative results, always described as illustrative. Briefs: calm, clean clinical spaces and care moments, never graphic.',
  },
  {
    kind: 'education', label: 'Education and coaching', for: 'Coaching centres, schools, academies, tutors and course creators',
    match: /coaching|academy|school|tutor|education|institute|classes|course|training|learning|ielts|neet|jee/i, commerce: false,
    servicesLabel: 'Courses', workLabel: 'Campus',
    pages: [
      { path: '/', label: 'Home', sections: ['Hero', 'Courses', 'Campus and classes', 'Why us', 'How admission works', 'Free demo class call to action'] },
      { path: '/services', label: 'Courses', sections: ['Each course: who it is for, duration, batch timings, what is covered'] },
      { path: '/work', label: 'Campus', sections: ['Classrooms, labs and student life'] },
      { path: '/about', label: 'About', sections: ['Story', 'Teaching approach'] },
      { path: '/contact', label: 'Book a free demo class', sections: ['Admission form: course, class, mode', 'Centre details'] },
      { path: '/dashboard', label: 'Owner dashboard', sections: ['Admission enquiries', 'Admission pipeline', 'Sources', 'Campaigns', 'Automations'] },
    ],
    home: ['hero', 'marquee', 'services', 'work', 'why', 'process', 'cta', 'notes'],
    cta: { primary: 'Book a free demo class', secondary: 'See courses' }, processTitle: 'How admission works',
    form: { title: 'Book a free demo class.', sub: 'Tell us the course and we will share batch timings.', submit: 'Book demo class', fields: [
      NAME, PHONE, { name: 'service', label: 'Course', type: 'select', from: 'services' }, { name: 'type', label: 'Class or level', type: 'text' },
      { name: 'when', label: 'Mode', type: 'select', options: ['At the centre', 'Online', 'Either'] }, NOTE] },
    dashboard: { kpis: [['Enquiries this week', 'enq'], ['Demo classes booked', 'visit'], ['Counselling done', 'prop'], ['Admissions', 'won']], stages: ['Enquiry', 'Demo booked', 'Attended', 'Counselling', 'Admitted'], sources: ['Instagram', 'Google', 'Website', 'Referral', 'Seminar'], automations: [['Instant reply', 'Course brochure on WhatsApp the moment they ask.'], ['Demo class reminder', 'Reminder with time and location.'], ['Fee reminders', 'Gentle reminders before fees are due.'], ['Parent updates', 'Weekly attendance and test updates.']] },
    draft: 'services: 3-6 courses from the scan with 3 points each; duration only if stated. work: 3-5 campus or class moments. Never invent results, ranks or toppers. Briefs: bright classrooms, focused students (Indian), labs.',
  },
  {
    kind: 'restaurant', label: 'Restaurant and café', for: 'Restaurants, cafés, bakeries, cloud kitchens and caterers',
    match: /restaurant|caf[ée]|bakery|kitchen|food|dining|bistro|bar\b|brew|catering|sweets|mithai/i, commerce: false,
    servicesLabel: 'Menu', workLabel: 'Gallery',
    pages: [
      { path: '/', label: 'Home', sections: ['Hero', 'Signature dishes', 'Menu highlights', 'The space', 'Why us', 'Reserve call to action'] },
      { path: '/services', label: 'Menu', sections: ['Menu by course with prices where known'] },
      { path: '/work', label: 'Gallery', sections: ['Dishes and the space'] },
      { path: '/about', label: 'Our story', sections: ['Story', 'Kitchen promise'] },
      { path: '/contact', label: 'Reserve a table', sections: ['Reservation form: date, time, guests', 'Address and hours'] },
      { path: '/dashboard', label: 'Owner dashboard', sections: ['Reservations', 'Orders', 'Sources', 'Campaigns', 'Automations'] },
    ],
    home: ['hero', 'marquee', 'menu', 'work', 'why', 'process', 'cta', 'notes'],
    cta: { primary: 'Reserve a table', secondary: 'See the menu' }, processTitle: 'Visit us',
    form: { title: 'Reserve a table.', sub: 'We confirm on WhatsApp within minutes.', submit: 'Request table', fields: [
      NAME, PHONE, { name: 'date', label: 'Date', type: 'date' }, { name: 'when', label: 'Time', type: 'select', options: ['Lunch', 'Early dinner', 'Dinner', 'Late'] },
      { name: 'type', label: 'Guests', type: 'select', options: ['2', '3–4', '5–8', 'Private event'] }, NOTE] },
    dashboard: { kpis: [['Reservations today', 'enq'], ['Confirmed', 'visit'], ['Party enquiries', 'prop'], ['Repeat guests', 'won']], stages: ['Requested', 'Confirmed', 'Seated', 'Reviewed', 'Returned'], sources: ['Instagram', 'Google Maps', 'Zomato', 'Walk-in', 'WhatsApp'], automations: [['Reservation confirmation', 'Instant confirmation on WhatsApp.'], ['Review request', 'A Google review request the next day.'], ['Festival menus', 'Special menus sent to past guests.'], ['Birthday offer', 'A dessert on the house on their birthday.']] },
    draft: 'services: 6-10 dishes or menu sections from the scan, price only if stated; points = 1-2 lines. work: 4-6 dishes and the space. Briefs: moody, appetising food photography and the dining room.',
  },
  {
    kind: 'hospitality', label: 'Hotels, stays and venues', for: 'Hotels, resorts, homestays, banquet halls and wedding venues',
    match: /hotel|resort|homestay|stay|villa rental|banquet|venue|lawn|guest house|retreat/i, commerce: false,
    servicesLabel: 'Rooms and spaces', workLabel: 'Gallery',
    pages: [
      { path: '/', label: 'Home', sections: ['Hero', 'Rooms and spaces', 'Experiences', 'Gallery', 'Why us', 'Booking call to action'] },
      { path: '/services', label: 'Rooms and spaces', sections: ['Each room or hall: capacity, features'] },
      { path: '/work', label: 'Gallery', sections: ['Rooms, views, events'] },
      { path: '/about', label: 'About', sections: ['Story', 'Location'] },
      { path: '/contact', label: 'Check availability', sections: ['Availability form: dates, guests, occasion', 'Location'] },
      { path: '/dashboard', label: 'Owner dashboard', sections: ['Booking enquiries', 'Booking pipeline', 'Sources', 'Campaigns', 'Automations'] },
    ],
    home: ['hero', 'marquee', 'services', 'work', 'why', 'process', 'cta', 'notes'],
    cta: { primary: 'Check availability', secondary: 'See rooms' }, processTitle: 'How booking works',
    form: { title: 'Check availability.', sub: 'Share your dates and we will hold the best option.', submit: 'Check availability', fields: [
      NAME, PHONE, { name: 'service', label: 'Room or space', type: 'select', from: 'services' }, { name: 'date', label: 'Check-in or event date', type: 'date' },
      { name: 'type', label: 'Guests', type: 'select', options: ['1–2', '3–6', '7–20', '20+'] }, NOTE] },
    dashboard: { kpis: [['Enquiries this week', 'enq'], ['Quotes sent', 'visit'], ['Holds', 'prop'], ['Bookings', 'won']], stages: ['Enquiry', 'Quote sent', 'On hold', 'Advance paid', 'Booked'], sources: ['Instagram', 'Google', 'Booking sites', 'Website', 'Referral'], automations: [['Instant quote', 'Rates and photos on WhatsApp in seconds.'], ['Hold expiry reminder', 'A nudge before a hold lapses.'], ['Pre-arrival message', 'Directions and check-in details.'], ['Review request', 'Asks for a review after checkout.']] },
    draft: 'services: 3-6 rooms, halls or experiences from the scan with features as points; capacity only if stated. work: 4-6 views. Briefs: luxury hospitality photography.',
  },
  {
    kind: 'fitness', label: 'Gym and fitness', for: 'Gyms, yoga and dance studios, personal trainers and sports academies',
    match: /gym|fitness|yoga|pilates|crossfit|dance|trainer|sports|martial|zumba/i, commerce: false,
    servicesLabel: 'Programmes', workLabel: 'Studio',
    pages: [
      { path: '/', label: 'Home', sections: ['Hero', 'Programmes', 'The studio', 'Why us', 'How to start', 'Free trial call to action'] },
      { path: '/services', label: 'Programmes', sections: ['Each programme: who it is for, schedule'] },
      { path: '/work', label: 'Studio', sections: ['Spaces and classes'] },
      { path: '/about', label: 'About', sections: ['Story', 'Coaching approach'] },
      { path: '/contact', label: 'Book a free trial', sections: ['Trial form: programme, time', 'Address and hours'] },
      { path: '/dashboard', label: 'Owner dashboard', sections: ['Trials', 'Membership pipeline', 'Renewals', 'Campaigns', 'Automations'] },
    ],
    home: ['hero', 'marquee', 'services', 'work', 'why', 'process', 'cta', 'notes'],
    cta: { primary: 'Book a free trial', secondary: 'See programmes' }, processTitle: 'How to start',
    form: { title: 'Book a free trial.', sub: 'Pick a programme and a time.', submit: 'Book trial', fields: [
      NAME, PHONE, { name: 'service', label: 'Programme', type: 'select', from: 'services' }, { name: 'when', label: 'Preferred time', type: 'select', options: ['Early morning', 'Morning', 'Evening', 'Weekend'] }, NOTE] },
    dashboard: { kpis: [['Trial requests', 'enq'], ['Trials attended', 'visit'], ['Renewals due', 'prop'], ['New members', 'won']], stages: ['Enquiry', 'Trial booked', 'Trial done', 'Offer sent', 'Member'], sources: ['Instagram', 'Google Maps', 'Walk-in', 'Website', 'Referral'], automations: [['Trial confirmation', 'Time and what to bring, on WhatsApp.'], ['Missed-session nudge', 'Checks in after three missed sessions.'], ['Renewal reminder', 'A reminder before the membership ends.'], ['Progress check-in', 'Monthly progress prompt from the trainer.']] },
    draft: 'services: 3-6 programmes from the scan with 3 points. work: 3-5 spaces or classes. Briefs: energetic athletic photography, Indian people.',
  },
  {
    kind: 'agency', label: 'Professional services', for: 'Agencies, consultants, CA and legal firms, IT and software services',
    match: /agency|consult|marketing|software|it services|legal|law|chartered|accounting|advisory|studio|branding|digital/i, commerce: false,
    servicesLabel: 'Services', workLabel: 'Work',
    pages: [
      { path: '/', label: 'Home', sections: ['Hero', 'Services', 'Selected work', 'Why us', 'How we work', 'Call to action'] },
      { path: '/services', label: 'Services', sections: ['Each service: outcomes, what is included'] },
      { path: '/work', label: 'Work', sections: ['Case studies by industry'] },
      { path: '/about', label: 'About', sections: ['Story', 'Values'] },
      { path: '/contact', label: 'Start a conversation', sections: ['Brief form: service, budget, timeline', 'Office details'] },
      { path: '/dashboard', label: 'Owner dashboard', sections: ['Leads', 'Deal pipeline', 'Sources', 'Campaigns', 'Automations'] },
    ],
    home: ['hero', 'marquee', 'services', 'work', 'why', 'process', 'cta', 'notes'],
    cta: { primary: 'Book a call', secondary: 'See our work' }, processTitle: 'How we work',
    form: { title: 'Tell us what you need.', sub: 'A short brief and we will come back with next steps.', submit: 'Send brief', fields: [
      NAME, PHONE, { name: 'service', label: 'Service', type: 'select', from: 'services' }, BUDGET(['Under ₹1 lakh', '₹1–5 lakh', '₹5–20 lakh', '₹20 lakh+', 'Not sure']), WHEN(['This month', 'This quarter', 'Later']), NOTE] },
    dashboard: { kpis: [['New leads', 'enq'], ['Calls booked', 'visit'], ['Proposals out', 'prop'], ['Won', 'won']], stages: ['Lead', 'Discovery call', 'Proposal', 'Negotiation', 'Won'], sources: ['LinkedIn', 'Google', 'Referral', 'Website', 'Instagram'], automations: [['Instant reply', 'Credentials deck sent on enquiry.'], ['Call reminder', 'Reminder with the meeting link.'], ['Proposal follow-up', 'A nudge three days after the proposal.'], ['Monthly report', 'Results summary to every client.']] },
    draft: 'services: 4-6 services from the scan with outcomes as points. work: 3-5 example engagements using only client types or names from the scan. Briefs: modern studio and workspace photography.',
  },
  {
    kind: 'portfolio', label: 'Portfolio and personal brand', for: 'Photographers, artists, designers, freelancers and creators',
    match: /photograph|artist|freelanc|portfolio|creator|illustrat|film|videograph|influencer|musician|author/i, commerce: false,
    servicesLabel: 'Services', workLabel: 'Portfolio',
    pages: [
      { path: '/', label: 'Home', sections: ['Full-screen work hero', 'Selected work', 'Services', 'About', 'Enquiry call to action'] },
      { path: '/work', label: 'Portfolio', sections: ['Work by category'] },
      { path: '/services', label: 'Services', sections: ['Packages and what is included'] },
      { path: '/about', label: 'About', sections: ['Story', 'Approach'] },
      { path: '/contact', label: 'Enquire', sections: ['Enquiry form: type, date', 'Contact'] },
      { path: '/dashboard', label: 'Owner dashboard', sections: ['Enquiries', 'Bookings pipeline', 'Sources', 'Automations'] },
    ],
    home: ['hero', 'marquee', 'work', 'services', 'why', 'process', 'cta', 'notes'],
    cta: { primary: 'Enquire', secondary: 'See the portfolio' }, processTitle: 'How we work together',
    form: { title: 'Let’s work together.', sub: 'Tell me what you have in mind.', submit: 'Send enquiry', fields: [
      NAME, PHONE, { name: 'service', label: 'What for?', type: 'select', from: 'services' }, { name: 'date', label: 'Date (if any)', type: 'date' }, NOTE] },
    dashboard: { kpis: [['Enquiries', 'enq'], ['Calls', 'visit'], ['Quotes out', 'prop'], ['Booked', 'won']], stages: ['Enquiry', 'Call', 'Quote', 'Advance', 'Booked'], sources: ['Instagram', 'Referral', 'Google', 'Website', 'Behance'], automations: [['Instant reply', 'Packages sent on enquiry.'], ['Booking reminder', 'Details before the shoot or session.'], ['Delivery message', 'Gallery link when the work is ready.']] },
    draft: 'work: 4-8 pieces by category using only what the scan shows. services: 2-4 packages with points. Briefs: editorial photography in their style.',
  },
  {
    kind: 'events', label: 'Events and weddings', for: 'Wedding planners, decorators, caterers and event companies',
    match: /wedding|event|decorat|planner|catering|mehendi|sangeet|party/i, commerce: false,
    servicesLabel: 'Services', workLabel: 'Celebrations',
    pages: [
      { path: '/', label: 'Home', sections: ['Hero', 'Services', 'Celebrations', 'Why us', 'How planning works', 'Call to action'] },
      { path: '/services', label: 'Services', sections: ['Planning, décor, catering, entertainment'] },
      { path: '/work', label: 'Celebrations', sections: ['Events by type'] },
      { path: '/about', label: 'About', sections: ['Story', 'Promise'] },
      { path: '/contact', label: 'Plan your event', sections: ['Event form: type, date, guests, budget', 'Contact'] },
      { path: '/dashboard', label: 'Owner dashboard', sections: ['Enquiries', 'Event pipeline', 'Sources', 'Campaigns', 'Automations'] },
    ],
    home: ['hero', 'marquee', 'services', 'work', 'why', 'process', 'cta', 'notes'],
    cta: { primary: 'Plan your event', secondary: 'See celebrations' }, processTitle: 'How planning works',
    form: { title: 'Plan your event.', sub: 'Share the occasion and we will call you back.', submit: 'Start planning', fields: [
      NAME, PHONE, { name: 'type', label: 'Occasion', type: 'select', options: ['Wedding', 'Engagement', 'Birthday', 'Corporate', 'Other'] }, { name: 'date', label: 'Date', type: 'date' },
      BUDGET(['Under ₹5 lakh', '₹5–15 lakh', '₹15–50 lakh', '₹50 lakh+']), NOTE] },
    dashboard: { kpis: [['Enquiries', 'enq'], ['Meetings', 'visit'], ['Quotes out', 'prop'], ['Events booked', 'won']], stages: ['Enquiry', 'Meeting', 'Quote', 'Advance', 'Booked'], sources: ['Instagram', 'WedMeGood', 'Google', 'Referral', 'Website'], automations: [['Instant reply', 'Portfolio and packages on WhatsApp.'], ['Meeting reminder', 'Reminder before the planning meeting.'], ['Payment reminders', 'Milestone reminders before the event.'], ['Thank-you and review', 'After the event.']] },
    draft: 'services: 3-6 services with points. work: 4-6 celebrations by type from the scan. Briefs: grand Indian celebration photography.',
  },
  {
    kind: 'local', label: 'Local services', for: 'Repairs, cleaning, pest control, logistics, travel, auto and other local services',
    match: /$^/, commerce: false,
    servicesLabel: 'Services', workLabel: 'Our work',
    pages: [
      { path: '/', label: 'Home', sections: ['Hero', 'Services', 'Areas served', 'Why us', 'How it works', 'Call to action'] },
      { path: '/services', label: 'Services', sections: ['Each service: what is included'] },
      { path: '/work', label: 'Our work', sections: ['Jobs done'] },
      { path: '/about', label: 'About', sections: ['Story', 'Promise'] },
      { path: '/contact', label: 'Get a quote', sections: ['Request form: service, area, date', 'Contact'] },
      { path: '/dashboard', label: 'Owner dashboard', sections: ['Requests', 'Job pipeline', 'Sources', 'Automations'] },
    ],
    home: ['hero', 'marquee', 'services', 'work', 'why', 'process', 'cta', 'notes'],
    cta: { primary: 'Get a quote', secondary: 'See services' }, processTitle: 'How it works',
    form: { title: 'Get a quote.', sub: 'Tell us what you need and where.', submit: 'Request quote', fields: [
      NAME, PHONE, { name: 'service', label: 'Service', type: 'select', from: 'services' }, { name: 'area', label: 'Area', type: 'select', from: 'areas' }, { name: 'date', label: 'Preferred date', type: 'date' }, NOTE] },
    dashboard: { kpis: [['Requests', 'enq'], ['Quotes sent', 'visit'], ['Scheduled', 'prop'], ['Jobs done', 'won']], stages: ['Request', 'Quoted', 'Scheduled', 'Done', 'Reviewed'], sources: ['Google', 'Justdial', 'Instagram', 'WhatsApp', 'Referral'], automations: [['Instant quote reply', 'Rates sent on enquiry.'], ['Visit reminder', 'Technician name and time.'], ['Review request', 'After the job is done.']] },
    draft: 'services: 3-6 services with points. work: 3-4 jobs. areas: from the scan. Briefs: clean, professional on-the-job photography.',
  },
];

/**
 * Looks: three directions per kind, never one template. Dark cinematic (warm
 * low light, walnut, leather, concrete), light cinematic (sunlit, airy, film
 * grain) and pastel (soft colour fields, gentle). The drafting model picks the
 * one that fits the brand and sets the accent from the brand's own colour, so
 * two interior studios still look nothing alike.
 */
export type Look = { name: string; bg: string; ink: string; soft: string; accent: string; font: 'editorial' | 'modern' | 'soft'; mood: string };
const L = (name: string, bg: string, ink: string, soft: string, accent: string, font: Look['font'], mood: string): Look => ({ name, bg, ink, soft, accent, font, mood });
export const LOOK_OPTIONS: Record<Kind, Look[]> = {
  store: [L('light cinematic', '#faf7f2', '#1d1b1a', '#f1e4df', '#9a5b4f', 'editorial', 'Sunlit studio, the product on stone plinths, silk and shadow.'), L('pastel', '#fbf3f1', '#2b2124', '#f6dfe3', '#c46a7d', 'soft', 'Soft colour-field sets, product floating on pastel blocks.'), L('dark cinematic', '#121011', '#efe8e2', '#221d1f', '#c98f6b', 'editorial', 'Low-key studio, a single warm light raking across the product.')],
  catalogue: [L('light cinematic', '#f4f5f2', '#17201b', '#e1e8df', '#2f6b4f', 'modern', 'Clean daylight still life, products in neat stacks.'), L('dark cinematic', '#111312', '#e9ece8', '#1d211f', '#7fb38f', 'modern', 'Products under one warm spotlight on dark steel.'), L('pastel', '#f3f5f8', '#1a2230', '#dfe6f1', '#4c6ef5', 'modern', 'Products on soft colour blocks, playful but tidy.')],
  interiors: [L('dark cinematic', '#13110f', '#eee7dd', '#231f1b', '#c4935f', 'editorial', 'Board-formed concrete, oak and stone, warm low sun, one fixed camera.'), L('light cinematic', '#f4f0ea', '#1c1a17', '#e6ddd0', '#8a6a4a', 'editorial', 'Lime-washed walls, linen and oak in soft morning light.'), L('pastel', '#f6f1ec', '#2a2420', '#efe1d6', '#b77a63', 'soft', 'Terracotta, sage and blush rooms, rounded furniture, gentle light.')],
  realestate: [L('light cinematic', '#f3efe8', '#16140f', '#e4dccd', '#7a5a36', 'modern', 'Golden-hour exteriors, wide glass, calm skylines.'), L('dark cinematic', '#101214', '#e8e9ea', '#1c1f22', '#c2a36e', 'modern', 'Towers lit at blue hour, lobbies in warm light.'), L('pastel', '#f2f4f1', '#1b2420', '#dfe7e0', '#4f7d68', 'modern', 'Green courtyards and pale facades in soft daylight.')],
  salon: [L('pastel', '#f8f1ee', '#2a1f1d', '#eedbd3', '#b06a5b', 'editorial', 'Blush and nude tones, soft glow on skin and hair.'), L('light cinematic', '#f7f4ef', '#221d1a', '#ebe2d6', '#9c7b5b', 'editorial', 'Sunlit chairs, mirrors and plants, airy and calm.'), L('dark cinematic', '#141012', '#f0e6e8', '#241c20', '#d48a9a', 'editorial', 'Moody beauty close-ups, gloss and gold under low light.')],
  clinic: [L('light cinematic', '#f5f8f7', '#12302d', '#dcebe7', '#2f7d73', 'modern', 'Calm, bright, clean spaces, sage and white.'), L('pastel', '#f4f6fb', '#1c2540', '#e1e7f7', '#5b6fd6', 'soft', 'Soft blue and lilac, gentle care moments.'), L('dark cinematic', '#0f1416', '#e6eef0', '#1a2225', '#6fb5ad', 'modern', 'Precise, premium, softly lit treatment rooms.')],
  education: [L('light cinematic', '#f7f6f1', '#1b2340', '#e3e7f5', '#3d55d6', 'soft', 'Bright classrooms, warm daylight, notebooks and boards.'), L('pastel', '#f6f4fb', '#241d3a', '#e8e1f7', '#7a5cd6', 'soft', 'Playful colour fields, friendly and clear.'), L('dark cinematic', '#0f1220', '#e9ecf7', '#1b2033', '#f2b84b', 'modern', 'Focused night-study mood, desk lamps and screens.')],
  restaurant: [L('dark cinematic', '#15110e', '#f1e8dc', '#261e18', '#d0743f', 'editorial', 'Low-key food photography, brass and terracotta, steam.'), L('light cinematic', '#f7f1e8', '#231a14', '#eadcc9', '#b0532f', 'editorial', 'Sunlit tables, linen and fresh ingredients.'), L('pastel', '#fbf3ec', '#2b1f1a', '#f5ddd0', '#d9734e', 'soft', 'Cafe pastels, desserts and soft colour.')],
  hospitality: [L('dark cinematic', '#12110f', '#ece6dc', '#211e1a', '#b8955f', 'editorial', 'Slow luxury at dusk, linen, water and lamplight.'), L('light cinematic', '#f5f1ea', '#1f1c18', '#e8dfd0', '#8f7550', 'editorial', 'Morning light, white linen, views to the hills.'), L('pastel', '#f3f5f2', '#1e2420', '#e0e8e1', '#6c8f78', 'soft', 'Soft greens and sand, calm retreat.')],
  fitness: [L('dark cinematic', '#0e0f10', '#efefea', '#1d1f22', '#e4572e', 'modern', 'High-contrast athletic shots, rim light, motion.'), L('light cinematic', '#f3f3ef', '#111214', '#e3e4dc', '#d9481f', 'modern', 'Bright studio, natural light, clean lines.'), L('pastel', '#f4f3f8', '#1d1b29', '#e5e1f2', '#7e5bef', 'soft', 'Yoga and pilates in soft lilac and sand.')],
  agency: [L('dark cinematic', '#111110', '#ededea', '#1f1f1d', '#c9a26b', 'modern', 'Minimal studio, crisp shadows, warm accents.'), L('light cinematic', '#f4f3f0', '#121212', '#e6e4de', '#2d4bff', 'modern', 'Airy workspace, sketches and screens in daylight.'), L('pastel', '#f5f2f7', '#1f1a26', '#e9e1f0', '#9a5bd6', 'modern', 'Soft colour blocks, confident type.')],
  portfolio: [L('dark cinematic', '#121212', '#ececea', '#202020', '#c08457', 'editorial', 'Gallery dark, their work lit like exhibits.'), L('light cinematic', '#f3f1ec', '#151515', '#e5e1d8', '#8c5a3c', 'editorial', 'White-wall gallery, generous space.'), L('pastel', '#f7f2ef', '#25201d', '#efe2db', '#c27a62', 'soft', 'Soft paper tones, playful and personal.')],
  events: [L('light cinematic', '#fbf5ef', '#2b1d18', '#f1dfd2', '#b4485f', 'editorial', 'Grand celebrations in golden light, florals.'), L('dark cinematic', '#140f10', '#f2e6e2', '#251b1d', '#d9a35b', 'editorial', 'Night celebrations, fairy lights and marigold.'), L('pastel', '#faf4f6', '#2b1f25', '#f3e0e8', '#cf6f93', 'soft', 'Pastel florals, mehendi and day functions.')],
  local: [L('light cinematic', '#f5f7f8', '#142027', '#dde8ee', '#1f6fb2', 'modern', 'Clean, professional, on-the-job daylight.'), L('pastel', '#f3f6f4', '#17241d', '#dfeae3', '#2f8f62', 'soft', 'Friendly soft colour, tidy and trustworthy.'), L('dark cinematic', '#0f1214', '#e7ecef', '#1b2024', '#4fa3e0', 'modern', 'Night-blue, precise and premium.')],
};
/** The default look for a kind (its first direction). */
export const LOOKS = Object.fromEntries(Object.entries(LOOK_OPTIONS).map(([k, v]) => [k, v[0]!])) as Record<Kind, Look>;

/** A blueprint without its matcher, safe to hand to client components. */
export type ClientBlueprint = Omit<Blueprint, 'match'>;
export const forClient = ({ match: _match, ...rest }: Blueprint): ClientBlueprint => rest;

export const KINDS = BLUEPRINTS.map((b) => b.kind);
export const allBlueprints = () => BLUEPRINTS;

/** The blueprint for a kind, or by guessing from the industry text. Stores with products stay stores. */
export function blueprint(kind?: string | null, industry?: string | null, hasProducts = false): Blueprint {
  const named = BLUEPRINTS.find((b) => b.kind === kind);
  if (named) return named;
  if (hasProducts) return BLUEPRINTS[0]!;
  return BLUEPRINTS.find((b) => b.match.test(industry ?? '')) ?? BLUEPRINTS.find((b) => b.kind === 'local')!;
}
