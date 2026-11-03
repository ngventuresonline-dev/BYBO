/**
 * Art-directed scene photos for demos, made with OpenAI's image API. For a
 * store, each scene is generated from the brand's own product photo so their
 * real product sits at the heart of every frame. Images are kept in Vercel
 * Blob and served by /demo-media. Without OPENAI_API_KEY nothing is made and
 * the demo falls back to drawn studio sets.
 */

const MODEL = process.env.BYBO_IMAGE_MODEL ?? 'gpt-image-2.5-flare';

export const scenesConfigured = () => !!process.env.OPENAI_API_KEY;

const STYLE = 'Photorealistic luxury campaign photography, crisp detail, soft natural light, shallow depth of field, no text, no watermarks, no extra logos.';
const FRAMING = 'Wide 3:2 frame. Keep the left third calm and uncluttered for a headline. Place the hero subject about 62% across and 45% down.';

/** The full image prompt for one scene. */
export function scenePrompt(brief: string, opts: { product: boolean; palette: string }) {
  return [
    brief,
    opts.product ? 'The product must be the exact product in the reference image: identical shape, proportions, colours, materials and finish. It is the clear hero, sharp and prominent, filling roughly 60% of the frame height.' : '',
    FRAMING,
    `Colour palette: ${opts.palette}. Any people are Indian.`,
    STYLE,
  ].filter(Boolean).join(' ');
}

async function openai(path: string, init: RequestInit) {
  const res = await fetch(`https://api.openai.com/v1/images/${path}`, {
    ...init,
    headers: { Authorization: `Bearer ${process.env.OPENAI_API_KEY}`, ...(init.headers ?? {}) },
    signal: AbortSignal.timeout(170_000),
  });
  if (!res.ok) throw new Error(`image_failed_${res.status}: ${(await res.text().catch(() => '')).slice(0, 200)}`);
  const data = await res.json() as { data?: { b64_json?: string }[] };
  const b64 = data.data?.[0]?.b64_json;
  if (!b64) throw new Error('image_empty');
  return Buffer.from(b64, 'base64');
}

async function one(prompt: string, reference: Blob | null) {
  const common = { model: MODEL, size: '1536x1024', quality: 'high', output_format: 'webp', output_compression: '86' };
  if (reference) {
    const form = new FormData();
    for (const [k, v] of Object.entries(common)) form.append(k, v);
    form.append('prompt', prompt);
    form.append('image[]', reference, 'product.png');
    return openai('edits', { method: 'POST', body: form });
  }
  return openai('generations', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ ...common, output_compression: 86, prompt }) });
}

/** Make one image from a brief and keep it under a name. Returns its served path. */
export async function generateImage(slug: string, name: string, brief: string, opts: { productImage: string | null; palette: string; raw?: boolean }): Promise<string> {
  if (!scenesConfigured()) throw new Error('openai_not_configured');
  let reference: Blob | null = null;
  if (opts.productImage) {
    const r = await fetch(opts.productImage, { signal: AbortSignal.timeout(20_000) }).catch(() => null);
    reference = r?.ok ? await r.blob() : null;
  }
  const img = await one(opts.raw ? `${brief} ${STYLE}` : scenePrompt(brief, { product: !!reference, palette: opts.palette }), reference);
  const { put } = await import('@vercel/blob');
  const path = `demo-media/${slug}/${name}.webp`;
  await put(path, img, { access: 'private', addRandomSuffix: false, allowOverwrite: true, contentType: 'image/webp' });
  return `/${path}?v=${Date.now().toString(36)}`;
}

/**
 * Make one image per brief, in parallel. Returns a served path per brief, or
 * null where that image failed. `productImage` is the brand's own photo.
 */
export async function generateScenes(slug: string, briefs: string[], opts: { productImage: string | null; palette: string }): Promise<(string | null)[]> {
  if (!scenesConfigured() || !briefs.length) return briefs.map(() => null);
  let reference: Blob | null = null;
  if (opts.productImage) {
    const r = await fetch(opts.productImage, { signal: AbortSignal.timeout(20_000) }).catch(() => null);
    reference = r?.ok ? await r.blob() : null;
  }
  const { put } = await import('@vercel/blob');
  return Promise.all(briefs.map(async (brief, i) => {
    try {
      const img = await one(scenePrompt(brief, { product: !!reference, palette: opts.palette }), reference);
      const path = `demo-media/${slug}/scene-${i + 1}.webp`;
      await put(path, img, { access: 'private', addRandomSuffix: false, allowOverwrite: true, contentType: 'image/webp' });
      return `/${path}`;
    } catch (err) {
      console.error('[demo scenes]', slug, i, (err as Error).message);
      return null;
    }
  }));
}
