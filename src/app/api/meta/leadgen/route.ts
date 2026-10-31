import { NextResponse } from 'next/server';
import { captureMappedMetaLead } from '@/lib/instant-call/flow';
import { extractLeadgenIds, graphLeadToMapped } from '@/lib/instant-call/meta';
import { safeEqual } from '@/lib/instant-call/secrets';
import { verifyMetaSignature } from '@/lib/instant-call/webhook';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

/** Meta leadgen webhook. GET verifies the hub challenge. POST fetches the lead and runs the same call gates. */

export async function GET(request: Request) {
  const url = new URL(request.url);
  const mode = url.searchParams.get('hub.mode');
  const token = url.searchParams.get('hub.verify_token');
  const challenge = url.searchParams.get('hub.challenge');
  const secret = process.env.META_VERIFY_TOKEN;
  if (mode === 'subscribe' && secret && token && challenge && safeEqual(token, secret)) {
    return new Response(challenge, { status: 200, headers: { 'content-type': 'text/plain' } });
  }
  return new Response('forbidden', { status: 403 });
}

export async function POST(request: Request) {
  const raw = await request.text();
  if (!verifyMetaSignature(raw, request.headers.get('x-hub-signature-256'), process.env.META_APP_SECRET)) {
    return NextResponse.json({ ok: false }, { status: 401 });
  }
  let body: unknown;
  try {
    body = JSON.parse(raw);
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  const ids = extractLeadgenIds(body);
  if (ids.length === 0) return NextResponse.json({ ok: true, results: [] });
  const token = process.env.META_PAGE_ACCESS_TOKEN;
  if (!token) return NextResponse.json({ ok: false, reason: 'not_configured' }, { status: 503 });

  const results: Array<{ id: string; action: string }> = [];
  for (const id of ids) {
    try {
      const payload = await fetchGraphLead(id, token);
      const mapped = graphLeadToMapped(payload);
      if (!mapped.externalId) mapped.externalId = id;
      const saved = await captureMappedMetaLead(mapped);
      results.push({ id, action: saved.action });
    } catch (err) {
      console.error('meta lead failed', err instanceof Error ? err.message : 'error');
      results.push({ id, action: 'error' });
    }
  }
  return NextResponse.json({ ok: true, results });
}

export async function fetchGraphLead(leadgenId: string, token: string, fetchImpl: typeof fetch = fetch): Promise<unknown> {
  if (process.env.NODE_TEST_CONTEXT && fetchImpl === globalThis.fetch) {
    throw new Error('refusing graph during tests');
  }
  const version = process.env.META_GRAPH_VERSION?.trim() || 'v21.0';
  const url = new URL(`https://graph.facebook.com/${version}/${encodeURIComponent(leadgenId)}`);
  url.searchParams.set('fields', 'id,created_time,ad_id,ad_name,adset_id,adset_name,campaign_id,campaign_name,form_id,form_name,platform,field_data');
  url.searchParams.set('access_token', token);
  const res = await fetchImpl(url, { signal: AbortSignal.timeout(15_000) });
  if (!res.ok) throw new Error(`graph lead fetch failed (${res.status})`);
  return res.json();
}
