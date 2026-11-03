import type { DemoContent } from './autopilot';

export type DemoQuality = { score: number; issues: string[] };

/**
 * How ready a demo is to send. A demo should convert on first look, so the
 * score rewards real products, art-directed scenes and complete copy, and
 * lists what is missing in plain words.
 */
export function demoQuality(c: DemoContent): DemoQuality {
  const issues: string[] = [];
  let score = 0;
  const store = (c.catalog?.length ?? c.products?.length ?? 0) > 0;
  const scenes = [c.hero_scene, ...(c.scenes ?? []).map((s) => s.image)].filter(Boolean).length;
  if (scenes >= 3) score += 35; else if (scenes) { score += 15; issues.push(`Only ${scenes} scene photo${scenes === 1 ? '' : 's'} (want 3+)`); } else issues.push('No scene photos yet: using drawn studio sets');
  if (store) {
    const withImg = (c.catalog ?? c.products ?? []).filter((p) => p.image).length;
    if (withImg >= 4) score += 25; else { score += withImg * 5; issues.push(`Only ${withImg} products with photos`); }
    if (c.scenes_show_product) score += 10; else issues.push('Scenes do not show their product');
  } else {
    if ((c.offer?.length ?? 0) + (c.features?.length ?? 0) >= 5) score += 35; else issues.push('Services are thin');
  }
  if (c.site_url) score += 10; else issues.push('Their current site was not found');
  if ((c.facts?.length ?? 0) >= 2) score += 10; else issues.push('Few trust facts from their site');
  if (c.hero?.headline && c.cta?.headline && (c.offer?.length ?? 0) >= 3) score += 10; else issues.push('Copy is incomplete');
  return { score: Math.min(100, score), issues };
}
