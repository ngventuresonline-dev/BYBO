import { readFile } from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';
import { ImageResponse } from 'next/og';
import { ogPages } from '@/lib/og-pages';

/** Social sharing card for every page that is not an Insights guide. */
export const dynamic = 'force-static';
export const dynamicParams = false;

export function generateStaticParams() {
  return ogPages.map(p => ({ key: p.key }));
}

/** The page's own artwork, inlined — the card is generated at build time, so
 *  there is no server to fetch it from. The site stores WebP, which the image
 *  renderer cannot decode, so it is converted and cropped to the card here. */
async function artData(art: string) {
  try {
    const file = await readFile(path.join(process.cwd(), 'public', 'images', `${art}.webp`));
    const jpeg = await sharp(file).resize(500, 630, { fit: 'cover', position: 'attention' }).jpeg({ quality: 80 }).toBuffer();
    return `data:image/jpeg;base64,${jpeg.toString('base64')}`;
  } catch {
    return null;
  }
}

export async function GET(_request: Request, { params }: { params: Promise<{ key: string }> }) {
  const { key } = await params;
  const p = ogPages.find(x => x.key === key);
  if (!p) return new Response('Not found', { status: 404 });

  const src = await artData(p.art);
  const [line1, line2] = p.title.split('\n');
  const longest = Math.max(line1.length, (line2 ?? '').length);

  return new ImageResponse(
    (
      <div style={{ width: '100%', height: '100%', display: 'flex', backgroundColor: '#111116' }}>
        {/* Type sits on solid ink, so it stays legible whatever the artwork does. */}
        <div
          style={{
            width: 700, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
            padding: '64px 56px 64px 72px', color: '#f5f4f0',
            backgroundColor: '#111116',
            backgroundImage: 'radial-gradient(circle at 6% 4%, rgba(121,60,255,.34), rgba(17,17,22,0) 62%), radial-gradient(circle at 0% 100%, rgba(243,185,80,.12), rgba(17,17,22,0) 46%)',
          }}
        >
          <div style={{ display: 'flex', fontSize: 22, letterSpacing: 4.5, textTransform: 'uppercase', color: '#b794ff' }}>
            {p.eyebrow}
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', fontSize: longest > 18 ? 52 : 62, lineHeight: 1.09, letterSpacing: -1.8 }}>
            <span>{line1}</span>
            {line2 && <span>{line2}</span>}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, fontSize: 21, color: '#cfc6dc' }}>
            <span style={{ width: 12, height: 12, borderRadius: 6, backgroundColor: '#f3b950' }} />
            bybo.in · Built around your business
          </div>
        </div>
        <div style={{ width: 500, height: '100%', display: 'flex', position: 'relative' }}>
          {src && <img src={src} width={500} height={630} style={{ position: 'absolute', inset: 0, objectFit: 'cover' }} />}
          {/* feather the seam so the panel does not look pasted on */}
          <div
            style={{
              position: 'absolute', inset: 0, display: 'flex',
              backgroundImage: 'linear-gradient(90deg, rgba(17,17,22,1) 0%, rgba(17,17,22,.45) 24%, rgba(17,17,22,0) 58%)',
            }}
          />
        </div>
      </div>
    ),
    { width: 1200, height: 630 },
  );
}
