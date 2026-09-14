import { SITE, siteUrl } from '@/lib/seo';

/** Structured data for the website studio page, which renders its own layout
 *  rather than the shared service-detail block that normally carries this. */
const faqs: [string, string][] = [
  ['Are these websites real client projects?', 'They are fictional concept websites, built so you can explore different design directions and interactions. They are not client projects or finished commerce, booking or subscription services.'],
  ['Can you redesign our existing website?', 'Yes. We work from your current site, content and brand, then agree what to retain, improve or rebuild. Redirects and continuity are part of the launch scope.'],
  ['Can you connect bookings, payments or our existing tools?', 'Yes. We scope the integrations around your systems and the experience you need. Platform subscriptions, payment-provider charges and ongoing costs are made clear before the build.'],
  ['How much does a website cost?', 'It follows what is inside it: how many pages, whether the copy exists, whether the site sells, books or explains, and what it connects to. The first conversation is free. We scope the site with you, then quote once in writing before any paid work begins.'],
  ['How long does it take?', 'That depends on the same things as the cost, and on how quickly content and approvals come back. We agree the schedule alongside the scope rather than promise a date beforehand.'],
  ['Will we be able to update the website?', 'We can include a content management setup and editing guidance for your team. Ongoing maintenance and improvements can be scoped separately.'],
];

export function WebsiteSchema() {
  const schema = [
    { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: faqs.map(([q, a]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })) },
    {
      '@context': 'https://schema.org',
      '@type': 'Service',
      name: 'Website Design & Development',
      serviceType: 'Website design and development',
      description: 'Strategy, copy, design and build for Indian businesses, brands and creators. One team from the first conversation to launch.',
      url: siteUrl('/systems/website-design-development'),
      areaServed: { '@type': 'Country', name: 'India' },
      provider: { '@type': 'Organization', name: SITE.name, url: SITE.url },
    },
  ];
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, '\u003c') }} />;
}
