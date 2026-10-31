import { assertCanDial } from './guards';
import { leadBrief, type Lead } from './types';

const OUTBOUND_URL = 'https://api.elevenlabs.io/v1/convai/sip-trunk/outbound-call';

export function dynamicVariables(lead: Lead): Record<string, string> {
  const first = lead.name.trim().split(/\s+/)[0] ?? '';
  const source = typeof lead.raw.lead_source === 'string' ? lead.raw.lead_source : '';
  const brief = typeof lead.raw.lead_brief === 'string' && lead.raw.lead_brief.trim()
    ? lead.raw.lead_brief
    : leadBrief(lead);
  return {
    first_name: first,
    business_name: lead.business,
    enquiry: lead.enquiry.slice(0, 1000),
    email: lead.email,
    lead_brief: brief.slice(0, 500),
    lead_source: source,
    lead_id: lead.id,
  };
}

export function outboundBody(lead: Lead, env: NodeJS.ProcessEnv = process.env) {
  return {
    agent_id: env.BYBO_ELEVENLABS_AGENT_ID,
    agent_phone_number_id: env.BYBO_ELEVENLABS_PHONE_NUMBER_ID,
    to_number: lead.phone_e164,
    conversation_initiation_client_data: { dynamic_variables: dynamicVariables(lead) },
  };
}

/** The only function that POSTs an outbound call. It throws before any network I/O when the gates fail. */
export async function placeOutboundCall(lead: Lead, env: NodeJS.ProcessEnv = process.env): Promise<string> {
  assertCanDial(env, lead.phone_e164);
  const res = await fetch(OUTBOUND_URL, {
    method: 'POST',
    headers: {
      'xi-api-key': env.BYBO_ELEVENLABS_API_KEY ?? '',
      'content-type': 'application/json',
    },
    body: JSON.stringify(outboundBody(lead, env)),
    signal: AbortSignal.timeout(20_000),
  });
  if (!res.ok) throw new Error(`outbound call failed (${res.status})`);
  const json = await res.json() as { conversation_id?: string };
  if (!json.conversation_id) throw new Error('outbound call returned no conversation');
  return json.conversation_id;
}
