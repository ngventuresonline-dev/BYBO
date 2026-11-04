import { NextResponse, type NextRequest } from 'next/server';
import { DEMO_ORIGIN } from '@/lib/site';

/**
 * Client demos live on the demos site, never on bybo.in. A visit to
 * bybo.in/demo/... goes to the same page on DEMO_ORIGIN. The demos site serves
 * its own static demos and fetches any other from here, marking the request
 * with ?_via=bybo-demos, which is let through.
 */
export function proxy(req: NextRequest) {
  const { hostname, pathname, search, searchParams } = req.nextUrl;
  const local = hostname === 'localhost' || hostname === '127.0.0.1';
  const viaDemos = searchParams.get('_via') === 'bybo-demos' || (req.headers.get('x-forwarded-host') ?? '').includes('bybo-demos');
  if (local || viaDemos) return NextResponse.next();
  return NextResponse.redirect(new URL(pathname + search, DEMO_ORIGIN), 308);
}

export const config = { matcher: ['/demo/:path*'] };
