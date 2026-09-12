import type { CollectionId } from './types';

export type Collection = {
  id: CollectionId;
  name: string;
  /** One line for cards and navigation. */
  short: string;
  /** Opening paragraph for the collection page. */
  intro: string;
  /** Where the closing call to action points. */
  cta: { title: string; href: string; label: string };
};

export const collections: Collection[] = [
  {
    id: 'ai-systems',
    name: 'AI Systems',
    short: 'What a business AI system is, where to begin and how to choose an approach.',
    intro: 'Plain explanations of business AI systems: what they are made of, which work suits them, what they cost and how to decide between building, buying and integrating.',
    cta: { title: 'Find your first useful workflow.', href: '/blueprint', label: 'Explore the Blueprint' },
  },
  {
    id: 'business-operations',
    name: 'Business Operations',
    short: 'Enquiries, documents, approvals, knowledge and reporting.',
    intro: 'The recurring work that keeps a company running — enquiries, invoices, approvals, internal knowledge and reports — and how a well-designed system can carry more of it.',
    cta: { title: 'Bring us one recurring problem.', href: '/apply', label: 'Talk to BYBO' },
  },
  {
    id: 'governance',
    name: 'Governance',
    short: 'Access, approvals, evaluation, ownership, data protection and cost.',
    intro: 'What keeps an AI system dependable once it is live: who may use it, what it may do, how its quality is checked, who owns it and what it costs to run.',
    cta: { title: 'Build a system you can explain.', href: '/systems/ai-infrastructure-governance', label: 'See Infrastructure & Governance' },
  },
  {
    id: 'indian-business',
    name: 'Indian Business',
    short: 'Practical AI for Indian companies, sectors and the wider economy.',
    intro: 'How Indian companies and sectors — from MSMEs and exporters to clinics, lenders and consumer brands — can put AI to practical, well-governed use.',
    cta: { title: 'See where it fits in your industry.', href: '/industries', label: 'Explore industries' },
  },
  {
    id: 'websites',
    name: 'Websites & Digital Experience',
    short: 'Strategy, structure, cost and craft for websites that move people forward.',
    intro: 'How to plan, design and judge a website for an Indian business, brand or creator: strategy before screens, structure around the customer and the details that make it feel considered.',
    cta: { title: 'Let’s build your next big impression.', href: '/apply?system=website-design-development', label: 'Discuss your website' },
  },
];

export const collectionById = Object.fromEntries(collections.map(c => [c.id, c])) as Record<CollectionId, Collection>;

/** The published order of the guides: the editorial map, collection by collection. */
export const editorialOrder: string[] = [
  'what-is-a-business-ai-system',
  'business-process-automation-india',
  'ai-automation-vs-traditional-automation',
  'identify-repetitive-work-to-automate',
  'seven-ai-systems-for-business-operations',
  'when-ai-should-decide',
  'ai-pilots-to-working-systems',
  'business-automation-cost-india',
  'build-buy-or-integrate-ai',
  'ai-readiness-checklist',
  'automate-customer-enquiries',
  'ai-invoice-purchase-order-processing',
  'document-automation-workflow',
  'agentic-workflows-between-teams',
  'reduce-manual-data-entry',
  'internal-knowledge-system',
  'ai-for-sops-policies-knowledge',
  'spreadsheet-reporting-to-decision-intelligence',
  'approval-workflow-design',
  'real-cost-of-repetitive-work',
  'enterprise-ai-governance',
  'introduce-ai-without-uncontrolled-access',
  'ai-permissions-logs-approval-gates',
  'measure-ai-system-performance',
  'when-ai-workflows-go-wrong',
  'named-owner-for-ai-systems',
  'evaluate-ai-quality-real-cases',
  'ai-systems-and-dpdp-india',
  'control-ai-operating-costs',
  'ai-vendor-lock-in',
  'ai-adoption-in-india',
  'india-digital-economy-automation',
  'ai-for-indian-msmes',
  'ai-for-manufacturing-and-exports',
  'ai-for-logistics-warehousing-3pl',
  'ai-for-professional-services',
  'ai-for-real-estate-businesses',
  'ai-for-healthcare-administration',
  'ai-for-education-and-lending',
  'ai-for-indian-consumer-brands',
  'what-makes-a-website-feel-premium',
  'website-design-strategy-india',
  'business-website-cost-india',
  'website-redesign-checklist',
  'website-sitemap-customer-journey',
  'd2c-website-design-india',
  'restaurant-website-design',
  'portfolio-websites-for-professionals',
  'real-estate-website-design',
  'mobile-website-experience',
];
