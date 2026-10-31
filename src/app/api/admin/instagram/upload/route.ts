import { handleUpload, type HandleUploadBody } from '@vercel/blob/client';
import { NextResponse } from 'next/server';
import { adminAuthorized } from '@/lib/instagram/auth';
import { MAX_MEDIA_BYTES, MEDIA_PATH_PREFIX } from '@/lib/instagram/config';
import { redactSecrets } from '@/lib/instagram/redact';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const TYPES = ['image/jpeg', 'image/jpg', 'image/pjpeg', 'image/png', 'video/mp4'];

/**
 * Browser upload token for the public media store. The file goes straight
 * to Blob (multipart for reels over the 4.5 MB function body limit).
 * Post JSON stays on the private lead store.
 */
export async function POST(request: Request) {
  const token = process.env.IG_BLOB_READ_WRITE_TOKEN;
  if (!token) return NextResponse.json({ error: 'media_store_unconfigured' }, { status: 503 });
  let body: HandleUploadBody;
  try {
    body = await request.json() as HandleUploadBody;
  } catch {
    return NextResponse.json({ error: 'invalid' }, { status: 400 });
  }
  const authed = adminAuthorized(request);
  if (body.type === 'blob.generate-client-token' && !authed) {
    return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
  }
  try {
    const json = await handleUpload({
      body,
      request,
      token,
      onBeforeGenerateToken: async (pathname) => {
        if (!authed) throw new Error('Not authenticated');
        if (!pathname.startsWith(MEDIA_PATH_PREFIX) || pathname.includes('..') || pathname.length > 300) {
          throw new Error('Invalid path');
        }
        return {
          allowedContentTypes: TYPES,
          maximumSizeInBytes: MAX_MEDIA_BYTES,
          addRandomSuffix: true,
        };
      },
    });
    return NextResponse.json(json);
  } catch (err) {
    console.error('instagram upload failed', redactSecrets(err instanceof Error ? err.message : 'error', [token]));
    return NextResponse.json({ error: 'upload_failed' }, { status: 400 });
  }
}
