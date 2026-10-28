import { SITE, siteUrl } from '@/lib/seo';

/** Structured data for the app studio page, which renders its own layout
 *  rather than the shared service-detail block that normally carries this. */
const faqs: [string, string][] = [
  ['How much does an app cost?', 'It depends on what the app has to do. A booking app for one location and a marketplace with payments and an admin panel are very different builds. We scope it with you, then quote once, in writing, before any paid work starts.'],
  ['iPhone, Android or both?', 'It depends on who your customers are and how they will use it. Many apps launch on both from one shared codebase. We recommend after discovery and explain the trade-offs.'],
  ['Will Apple and Google approve it?', 'We design and build to their guidelines and handle the submission. The final decision is theirs, and if they ask for changes we work through them with you.'],
  ['What happens after launch?', 'Phones and operating systems keep changing, so apps need looking after. Updates, fixes and new features can be scoped around your needs. Ownership and handover are agreed in writing before work starts.'],
];

export function AppSchema() {
  const schema = [
    { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: faqs.map(([q, a]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })) },
    {
      '@context': 'https://schema.org',
      '@type': 'Service',
      name: 'App Design & Development',
      serviceType: 'Mobile and web app design and development',
      description: 'iPhone, Android and web apps for Indian businesses and founders. Product thinking, interface design and engineering from one studio, from the first sketch to the store.',
      url: siteUrl('/systems/app-design-development'),
      areaServed: { '@type': 'Country', name: 'India' },
      provider: { '@type': 'Organization', name: SITE.name, url: SITE.url },
    },
  ];
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, '<') }} />;
}
