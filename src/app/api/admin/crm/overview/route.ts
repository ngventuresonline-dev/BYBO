import { NextResponse } from 'next/server';
import { adminAuthorized } from '@/lib/instagram/auth';
import { crmConfigured, rpc } from '@/lib/crm/db';
import { automations, callQueue, instagramSummary, systemHealth } from '@/lib/crm/desk';
import { upcomingSlots } from '@/lib/bybo-ai/slots';
import { PRODUCTS } from '@/lib/payments/products';

/** Everything the desk shows besides the lead list. Admin only. */

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
export const maxDuration = 30;

export async function GET(request: Request) {
  if (!adminAuthorized(request)) return NextResponse.json({ ok: false }, { status: 401 });
  const health = systemHealth();
  const [feed, demos, queue, ig] = await Promise.all([
    crmConfigured() ? rpc<unknown[]>('bybo_crm_feed', { p_limit: 400 }).catch(() => null) : Promise.resolve(null),
    crmConfigured() ? rpc<unknown[]>('bybo_demo_list', {}).catch(() => []) : Promise.resolve([]),
    callQueue(),
    instagramSummary(),
  ]);
  return NextResponse.json({
    ok: true,
    health,
    automations: automations(health),
    feed,
    demos,
    queue,
    ig,
    slots: upcomingSlots(),
    products: PRODUCTS.map((p) => ({ id: p.id, name: p.name, price: p.price, group: p.group })),
  });
}
