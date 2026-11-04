import { NextResponse } from 'next/server';
import { adminAuthorized } from '@/lib/instagram/auth';
import { callAudio, callsConfigured } from '@/lib/crm/calls';

/** Streams one AI call recording from ElevenLabs, so the key stays on the server. Admin only. */

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
export const maxDuration = 60;

const ID = /^[A-Za-z0-9_-]{8,80}$/;

export async function GET(request: Request, ctx: { params: Promise<{ cid: string }> }) {
  if (!adminAuthorized(request)) return new NextResponse(null, { status: 401 });
  const { cid } = await ctx.params;
  if (!callsConfigured() || !ID.test(cid)) return new NextResponse(null, { status: 404 });
  const res = await callAudio(cid).catch(() => null);
  if (!res?.ok || !res.body) return new NextResponse(null, { status: res?.status === 404 ? 404 : 502 });
  return new NextResponse(res.body, { headers: { 'content-type': res.headers.get('content-type') ?? 'audio/mpeg', 'cache-control': 'private, max-age=3600' } });
}
