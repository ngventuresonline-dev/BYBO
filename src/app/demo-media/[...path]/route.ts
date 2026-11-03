/** Serves generated demo scene photos from private Blob storage. Public, cached for a year. */
export async function GET(_req: Request, { params }: { params: Promise<{ path: string[] }> }) {
  const path = (await params).path.join('/');
  if (!/^[a-z0-9-]{3,60}\/[a-z0-9-]{3,40}\.webp$/.test(path)) return new Response('Not found', { status: 404 });
  const { get } = await import('@vercel/blob');
  const res = await get(`demo-media/${path}`, { access: 'private' }).catch(() => null);
  if (!res || res.statusCode !== 200 || !res.stream) return new Response('Not found', { status: 404 });
  return new Response(res.stream, { headers: { 'content-type': 'image/webp', 'cache-control': 'public, max-age=31536000, immutable' } });
}
