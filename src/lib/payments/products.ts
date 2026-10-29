/**
 * What can be bought on /pay. Prices are set here, on the server: the browser
 * only sends a product id, so an amount can't be changed in the page.
 *
 * Starter packages, priced against Indian agency rates researched in October
 * 2026 (mid-to-upper market). Change a price here and every card updates.
 */

export type Product = {
  id: string;
  name: string;
  price: number;
  group: 'Start here' | 'AI systems' | 'Websites & apps' | 'Films';
  service?: string; // the /systems/<slug> this package belongs to
  lead: string;
  description: string;
  includes: string[];
};

export const PRODUCTS: Product[] = [
  {
    id: 'blueprint', name: 'Blueprint', price: 15000, group: 'Start here',
    lead: 'Know before you commit.',
    description: 'We study the work, the tools and the numbers, then show you where a system or product pays back first.',
    includes: ['Process and opportunity map', 'Recommended first build', 'Fixed scope and quote in writing'],
  },
  {
    id: 'night-desk', name: 'Night Desk lead agent', price: 150000, group: 'AI systems', service: 'customer-workforce-ai',
    lead: 'Every enquiry answered in seconds.',
    description: 'An AI agent on one channel that replies at any hour, asks your qualifying questions, books the slot and hands your team a warm lead.',
    includes: ['One channel: WhatsApp, Instagram or website', 'Qualifying questions and booking', 'Handover to your team with the full chat'],
  },
  {
    id: 'document-workflow', name: 'Document workflow', price: 250000, group: 'AI systems', service: 'document-multimodal-intelligence',
    lead: 'Less retyping. More work moving.',
    description: 'One document process automated end to end: read, check against your rules, route exceptions to a person, post the result.',
    includes: ['One document type and workflow', 'Checks against your rules and records', 'Review queue for exceptions'],
  },
  {
    id: 'agent-workflow', name: 'Agentic workflow', price: 350000, group: 'AI systems', service: 'agentic-operations',
    lead: 'Move the work. Keep the control.',
    description: 'One multi-step workflow carried across your tools by a bounded agent, with approval gates on anything consequential.',
    includes: ['One workflow, from trigger to logged action', 'Integrations with your permitted tools', 'Approval gates and escalation rules'],
  },
  {
    id: 'knowledge-pilot', name: 'Knowledge assistant pilot', price: 200000, group: 'AI systems', service: 'enterprise-knowledge-systems',
    lead: 'Your knowledge. Within reach.',
    description: 'An assistant that answers from your policies, SOPs and documents, cites its sources and respects access permissions.',
    includes: ['Your chosen document sources', 'Answers with citations', 'Permission-aware retrieval'],
  },
  {
    id: 'decision-dashboard', name: 'Leadership dashboard', price: 150000, group: 'AI systems', service: 'decision-intelligence',
    lead: "Know what changed. Decide what's next.",
    description: 'Your key numbers connected and defined once, with the changes that deserve attention surfaced for the people who decide.',
    includes: ['Agreed metric definitions', 'Connected data sources', 'Change alerts with context'],
  },
  {
    id: 'ai-review', name: 'AI system review', price: 100000, group: 'AI systems', service: 'ai-infrastructure-governance',
    lead: 'The confidence to keep it running.',
    description: 'A review of an AI system you run: access, evaluations, logging, costs and failure handling, with a prioritised fix list.',
    includes: ['Architecture and controls review', 'Risk and cost findings', 'Prioritised improvement plan'],
  },
  {
    id: 'platform-sprint', name: 'Platform sprint', price: 500000, group: 'AI systems', service: 'custom-ai-platforms',
    lead: 'Your way of working, built into software.',
    description: 'A working prototype of your custom AI platform, tested with real users and workflows, ready to scope the full build.',
    includes: ['User and workflow framing', 'Clickable, working prototype', 'Full-build scope and plan'],
  },
  {
    id: 'business-website', name: 'Business website', price: 125000, group: 'Websites & apps', service: 'website-design-development',
    lead: 'A website worthy of what you do.',
    description: 'Strategy, copy, design and build for a distinctive business website that turns visitors into enquiries.',
    includes: ['Sitemap, copy and page design', 'Mobile-first build with enquiry forms', 'Analytics and handover'],
  },
  {
    id: 'app-mvp', name: 'App MVP', price: 600000, group: 'Websites & apps', service: 'app-design-development',
    lead: 'Apps people open every day.',
    description: 'The first version of your app, designed, prototyped on your phone, built and taken through the App Store and Google Play.',
    includes: ['Product scope for version one', 'Design and phone prototype', 'Build, testing and store submission'],
  },
  {
    id: 'ai-film', name: '30-second AI film', price: 100000, group: 'Films', service: 'motion-studio',
    lead: 'Ideas, on film.',
    description: 'A 30-second brand or product film made by our production system and directed by people. You approve the cut.',
    includes: ['Brief and style frames', 'Directed, edited 30-second film', 'Cut to the ratios each channel needs'],
  },
];

export const productById = (id: string) => PRODUCTS.find((p) => p.id === id) ?? null;
