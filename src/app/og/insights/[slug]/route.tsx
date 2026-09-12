import { ImageResponse } from 'next/og';
import { collectionById, getGuide, guides } from '@/lib/insights';

/** Social sharing card for each guide, generated at build time. */
export const dynamic = 'force-static';
export const dynamicParams = false;

export function generateStaticParams() {
  return guides.map(g => ({ slug: g.slug }));
}

export async function GET(_request: Request, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const g = getGuide(slug);
  if (!g) return new Response('Not found', { status: 404 });
  const c = collectionById[g.collection];
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '72px 84px',
          color: '#f5f4f0',
          backgroundColor: '#111116',
          backgroundImage: 'radial-gradient(circle at 88% 8%, rgba(121,60,255,.55), rgba(17,17,22,0) 52%), radial-gradient(circle at 0% 100%, rgba(243,185,80,.16), rgba(17,17,22,0) 45%)',
        }}
      >
        <div style={{ display: 'flex', fontSize: 24, letterSpacing: 5, textTransform: 'uppercase', color: '#b794ff' }}>
          BYBO Insights · {c.name}
        </div>
        <div style={{ display: 'flex', fontSize: g.title.length > 72 ? 58 : 68, lineHeight: 1.1, letterSpacing: -1.5, maxWidth: 1020 }}>{g.title}</div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: 24, color: '#cfc6dc' }}>
          <span>bybo.in</span>
          <span style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <span style={{ width: 14, height: 14, borderRadius: 7, backgroundColor: '#f3b950' }} />
            {g.collection === 'websites' ? 'Websites built around your business' : 'AI systems built around your business'}
          </span>
        </div>
      </div>
    ),
    { width: 1200, height: 630 },
  );
}
