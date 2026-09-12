import type { ServiceDetail } from './types';
import documents from './document-multimodal-intelligence';
import agentic from './agentic-operations';
import knowledge from './enterprise-knowledge-systems';
import platforms from './custom-ai-platforms';
import customer from './customer-workforce-ai';
import decisions from './decision-intelligence';
import governance from './ai-infrastructure-governance';
import website from './website-design-development';
import solutions from './solutions';
import systemsOverview from './systems';

export type { ServiceDetail } from './types';

export const serviceDetails: Record<string, ServiceDetail> = Object.fromEntries(
  [documents, agentic, knowledge, platforms, customer, decisions, governance, website, solutions, systemsOverview].map(d => [d.slug, d]),
);
