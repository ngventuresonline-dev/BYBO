/**
 * The long-form explanation that sits under each service page: what the service is,
 * who it is for, what BYBO builds, how the work runs, what it costs and what is measured.
 * Written for a business visitor arriving cold — often from an advertisement.
 *
 * Text fields accept inline links written as [label](/path) for BYBO pages.
 */

export type DetailItem = { title: string; body: string };

export type ServiceDetail = {
  /** System slug, or 'solutions' for the solutions page. */
  slug: string;
  /** Plain explanation of the service. Three paragraphs. */
  overview: { heading: string; paragraphs: string[] };
  /** Signals a reader can recognise in their own business. */
  audience: { heading: string; intro?: string; items: string[] };
  /** What BYBO actually delivers. */
  deliverables: { heading: string; intro?: string; items: DetailItem[] };
  /** How the work runs, step by step. */
  process: { heading: string; intro?: string; items: DetailItem[] };
  /** The tools and systems it connects to, and how access is agreed. */
  connects: { heading: string; body: string; items: string[] };
  /** What the client needs to provide. */
  bring: { heading: string; intro?: string; items: string[] };
  /** What drives cost. No prices: BYBO publishes none. */
  cost: { heading: string; paragraphs: string[]; drivers: string[] };
  /** How success is measured against a baseline. */
  measure: { heading: string; body: string; items: string[] };
  /** Where a person stays responsible. */
  control: { heading: string; body: string };
  faqs: { q: string; a: string }[];
  /** Slugs of Insights guides to read next. */
  reading: string[];
};
