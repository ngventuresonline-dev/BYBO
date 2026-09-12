/**
 * Editorial guides for the Insights section.
 *
 * Text fields accept inline links written as [label](/path) for BYBO pages or
 * [label](https://…) for external references. Everything else is plain text.
 */

export type CollectionId =
  | 'ai-systems'
  | 'business-operations'
  | 'governance'
  | 'indian-business'
  | 'websites';

/** The article's editorial visual, drawn in the site's violet-glass style. */
export type GuideVisual =
  /** A left-to-right workflow. `gate` is the index of the step a person owns (drawn in amber). */
  | { kind: 'flow'; title: string; steps: string[]; gate?: number; gateLabel?: string }
  /**
   * Two columns side by side. `left` is the current or weaker state (plain dashes),
   * `right` the better one (highlighted, with ticks). Set `neutral` for an even-handed
   * comparison of two options, which draws both columns the same.
   */
  | { kind: 'compare'; title: string; left: { label: string; items: string[] }; right: { label: string; items: string[] }; neutral?: boolean }
  /** A 2×2 grid. Quadrants run top-left, top-right, bottom-left, bottom-right. */
  | { kind: 'matrix'; title: string; x: [low: string, high: string]; y: [low: string, high: string]; quadrants: [string, string, string, string]; highlight?: 0 | 1 | 2 | 3 }
  /** Stacked layers, top to bottom. */
  | { kind: 'layers'; title: string; layers: { label: string; note: string }[] }
  /** Points along a scale between two extremes. */
  | { kind: 'spectrum'; title: string; from: string; to: string; stops: { label: string; note: string }[] }
  /** A short checklist. */
  | { kind: 'checklist'; title: string; items: string[] };

export type GuideBlock =
  | { type: 'p'; text: string }
  | { type: 'list'; items: string[]; ordered?: boolean }
  /** A worked, clearly illustrative example. Never presented as a real client. */
  | { type: 'example'; title: string; text: string }
  | { type: 'note'; tone: 'insight' | 'caution'; title: string; text: string }
  | { type: 'table'; caption: string; head: string[]; rows: string[][] };

export type GuideSection = {
  /** Anchor for the contents navigation, kebab-case and unique within the guide. */
  id: string;
  heading: string;
  blocks: GuideBlock[];
};

export type GuideSource = {
  title: string;
  publisher: string;
  url: string;
};

export type Guide = {
  slug: string;
  collection: CollectionId;
  /** The H1. Written for search, in BYBO's voice. */
  title: string;
  /** Shorter title for the browser tab and search result when `title` runs past ~60 characters. */
  seoTitle?: string;
  /** Meta description, 140–160 characters. */
  description: string;
  /** One or two sentences under the H1. */
  dek: string;
  keywords: string[];
  /** ISO date, e.g. 2026-09-11. */
  publishedAt: string;
  visual: GuideVisual;
  /** Three or four short takeaways shown as "In brief". */
  summary: string[];
  sections: GuideSection[];
  /** Honest limits: where the advice does not apply or what it cannot do. */
  limitations: string[];
  faqs: { q: string; a: string }[];
  /** Where BYBO fits, linking to the relevant pages. */
  bybo: { href: string; label: string; why: string }[];
  /** Slugs of other guides to read next. */
  related: string[];
  /** Authoritative references for economic, regulatory or technical claims. */
  sources: GuideSource[];
};
