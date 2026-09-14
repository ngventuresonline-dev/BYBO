/**
 * The social sharing card for every page that is not an Insights guide.
 *
 * Each entry names the artwork the page already uses, so a link shared in
 * WhatsApp or LinkedIn shows that page's own picture rather than one house
 * image repeated 22 times. `key` is the slug used at /og/page/<key>.
 */
export type OgPage = {
  key: string;
  /** Page path, used to wire the metadata up. */
  path: string;
  /** Small line above the title. */
  eyebrow: string;
  /** Two or three words larger than everything else. */
  title: string;
  /** A file under public/images, without the extension. */
  art: string;
  /** Meta description, where the page does not write its own. Kept under 160
   *  characters so search results do not truncate it. */
  desc?: string;
};

export const ogPages: OgPage[] = [
  { key: 'home',        path: '/',             eyebrow: 'BYBO',                 title: 'AI systems built\naround your business.', art: 'reference-hero' },
  { key: 'solutions',   path: '/solutions',    eyebrow: 'Solutions',            title: 'The work you want\noff your plate.',        art: 'solutions-hero' },
  { key: 'systems',     path: '/systems',      eyebrow: 'Systems',              title: 'Seven systems and\na website studio.',                 art: 'reference-build' },
  { key: 'blueprint',   path: '/blueprint',    eyebrow: 'The Blueprint',        title: 'Know what is worth\nbuilding first.',  art: 'blueprint-hero' },
  { key: 'how-we-work', path: '/how-we-work',  eyebrow: 'How we work',          title: 'Understand the work.\nBuild the system.',              art: 'method-hero' },
  { key: 'industries',  path: '/industries',   eyebrow: 'Industries',           title: 'Where the same work\ncomes back weekly.',    art: 'industries-hero' },
  { key: 'about',       path: '/about',        eyebrow: 'About BYBO',           title: 'A studio for work\nthat keeps returning.',        art: 'about-hero' },
  { key: 'insights',    path: '/insights',     eyebrow: 'Insights',             title: 'Better questions.\nBetter systems.',                    art: 'insights-hero' },
  { key: 'apply',       path: '/apply',        eyebrow: 'Talk to BYBO',         title: 'Bring one workflow.\nThe first talk is free.',  art: 'contact-art' },

  { key: 'document-multimodal-intelligence', path: '/systems/document-multimodal-intelligence', eyebrow: 'Business Operations',        title: 'Less retyping.\nMore work moving.',            art: 'services/document-multimodal-intelligence' , desc: 'Read invoices, orders and onboarding files, check them against your own records, and send only the exceptions to a person — with the evidence attached.'},
  { key: 'agentic-operations',               path: '/systems/agentic-operations',               eyebrow: 'Agentic Operations',         title: 'Move the work.\nKeep the control.',            art: 'services/agentic-operations' , desc: 'Give recurring, multi-step work a clear path from request to resolution. Bounded agents act within agreed limits; consequential decisions wait for your team.'},
  { key: 'enterprise-knowledge-systems',     path: '/systems/enterprise-knowledge-systems',     eyebrow: 'Enterprise Knowledge',       title: 'Your knowledge.\nWithin reach.',               art: 'services/enterprise-knowledge-systems' , desc: 'Useful answers from policies, SOPs and past work — each one citing its source, respecting who may see what, and saying plainly when the evidence is missing.'},
  { key: 'custom-ai-platforms',              path: '/systems/custom-ai-platforms',              eyebrow: 'Custom AI Platforms',        title: 'Your way of working,\nbuilt into software.',   art: 'services/custom-ai-platforms' , desc: 'When no product fits how you work, we build one: your data, workflows and AI capabilities in a single product your team can own, maintain and extend.'},
  { key: 'customer-workforce-ai',            path: '/systems/customer-workforce-ai',            eyebrow: 'Customer & Workforce AI',    title: 'Be there for the\neveryday questions.',        art: 'services/customer-workforce-ai' , desc: 'Handle enquiries, bookings and routine support from approved information — and hand the conversation to a person when judgement or a commitment is needed.'},
  { key: 'decision-intelligence',            path: '/systems/decision-intelligence',            eyebrow: 'Decision Intelligence',      title: 'Know what changed.\nDecide what is next.',     art: 'services/decision-intelligence' , desc: 'Connect your business data, agree the definitions, and surface the changes worth twenty minutes — with the drivers, the assumptions and the caveats shown.'},
  { key: 'ai-infrastructure-governance',     path: '/systems/ai-infrastructure-governance',     eyebrow: 'Infrastructure & Governance', title: 'The confidence to\nkeep it running.',         art: 'services/ai-infrastructure-governance' , desc: 'Access control, evaluations, logs, cost visibility and a tested response when something fails — the operating foundation an AI system needs to stay trusted.'},
  { key: 'website-design-development',       path: '/systems/website-design-development',       eyebrow: 'Website Design & Development', title: 'Make them stop.\nMake them stay.',            art: 'services/website-design-development' , desc: 'Strategy, copy, design and build for Indian businesses, brands and creators. One team from the first conversation to launch, and a site your team can edit.'},
];

export const ogPageByPath = Object.fromEntries(ogPages.map(p => [p.path, p]));

/** The card URL for a page path, or undefined when the page has no card. */
export const ogFor = (path: string) => (ogPageByPath[path] ? `/og/page/${ogPageByPath[path].key}` : undefined);
