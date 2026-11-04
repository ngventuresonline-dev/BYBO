import { crmConfigured, rpc } from './db';

/**
 * The kill switch. A killed lead's demos and proposals stop resolving (the
 * database lookups skip them), and a client quote whose payer is that lead
 * stops taking payment. Off restores everything.
 */
export const killLead = (lead: string, on: boolean) => rpc<{ demos: number; proposals: number; killed: boolean }>('bybo_crm_kill', { p_lead: lead, p_on: on });

/** True when a payment link's payer belongs to a killed lead. */
export async function payerKilled(email?: string | null) {
  if (!email || !crmConfigured()) return false;
  return rpc<boolean>('bybo_lead_killed', { p_email: email }).catch(() => false);
}
