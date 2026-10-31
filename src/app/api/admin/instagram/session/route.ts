import { NextResponse } from 'next/server';
import { ADMIN_COOKIE, adminSessionValue } from '@/lib/instagram/auth';
import { safeEqual } from '@/lib/instant-call/secrets';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const MAX_PASSWORD = 500;

function cookie(response: NextResponse, value: string, maxAge: number) {
  response.cookies.set(ADMIN_COOKIE, value, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge,
  });
  return response;
}

export async function POST(request: Request) {
  const secret = process.env.CRON_SECRET;
  if (!secret) return NextResponse.json({ ok: false, reason: 'not_configured' }, { status: 503 });
  let password = '';
  try {
    const body = await request.json() as { password?: unknown };
    if (typeof body.password === 'string') password = body.password;
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }
  if (password.length === 0 || password.length > MAX_PASSWORD || !safeEqual(password, secret)) {
    return NextResponse.json({ ok: false }, { status: 401 });
  }
  return cookie(NextResponse.json({ ok: true }), adminSessionValue(secret), 60 * 60 * 12);
}

export async function DELETE() {
  return cookie(NextResponse.json({ ok: true }), '', 0);
}
