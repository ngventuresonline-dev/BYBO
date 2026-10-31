import { NextResponse } from 'next/server';
import { adminAuthorized } from '@/lib/instagram/auth';
import { instagramConfig, liveConfigured } from '@/lib/instagram/config';
import { createGraphClient, instagramHealth, InstagramError } from '@/lib/instagram/graph';
import { redactSecrets } from '@/lib/instagram/redact';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

/**
 * Read-only. Confirms the page token can read the Instagram account and
 * the content publishing limit. It does not create or publish media.
 */
export async function GET(request: Request) {
  if (!adminAuthorized(request)) return NextResponse.json({ ok: false }, { status: 401 });
  const config = instagramConfig();
  if (!liveConfigured(config) || !config.token || !config.userId) {
    return NextResponse.json({ ok: false, reason: 'not_configured', dryRun: config.dryRun }, { status: 503 });
  }
  try {
    const health = await instagramHealth(createGraphClient({ token: config.token, userId: config.userId }));
    return NextResponse.json({ ok: true, dryRun: config.dryRun, ...health });
  } catch (err) {
    const message = err instanceof InstagramError ? err.message : 'instagram could not be reached';
    return NextResponse.json({
      ok: false,
      reason: 'health_failed',
      dryRun: config.dryRun,
      error: redactSecrets(message, [config.token, config.mediaToken]),
    }, { status: 502 });
  }
}
