import { crmConfigured, rpc, type CrmLead } from '@/lib/crm/db';
import { bridgeXml, hangupXml, verifyAnswer } from '@/lib/crm/vobiz';
import { normalizePhone } from '@/lib/instant-call/phone';

/**
 * Vobiz calls this when the founder picks up a desk call. The signed lead id
 * says who to dial next; anything unsigned or expired just hangs up.
 */

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const xml = (body: string) => new Response(body, { headers: { 'Content-Type': 'application/xml' } });

async function answer(request: Request) {
  const q = new URL(request.url).searchParams;
  const lead = q.get('lead') ?? '';
  if (!/^[0-9a-f-]{36}$/i.test(lead) || !verifyAnswer(lead, q.get('exp') ?? '', q.get('sig') ?? '')) return xml(hangupXml('This call link has expired.'));
  if (!crmConfigured()) return xml(hangupXml('The lead desk is offline.'));
  const all = await rpc<CrmLead[]>('bybo_crm_list', {}).catch(() => [] as CrmLead[]);
  const phone = normalizePhone(all.find((l) => l.id === lead)?.phone);
  return xml(phone ? bridgeXml(phone) : hangupXml('This lead has no number to dial.'));
}

export const POST = answer;
export const GET = answer;
