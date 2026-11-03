import { captureLead } from '@/lib/crm/db';
import { inr, signLink, type PayLink } from './link';
import { createOrder } from './phonepe';

/**
 * Opens a PhonePe order for a signed payment link and records the checkout in
 * the CRM. Returns PhonePe's checkout URL; the details are signed into the
 * return URL, so the result page can match PhonePe's confirmed amount.
 */
export async function startCheckout(link: PayLink, origin: string, now = Date.now()): Promise<string> {
  const token = signLink(link);
  const merchantOrderId = `bybo_${link.id.slice(0, 30)}_${now.toString(36)}`;
  const order = await createOrder({
    merchantOrderId,
    amountPaisa: Math.round(link.amount * 100),
    message: `BYBO: ${link.purpose}`,
    redirectUrl: `${origin}/pay/result?o=${encodeURIComponent(merchantOrderId)}&t=${encodeURIComponent(token)}`,
    meta: { ref: link.id, name: link.name, email: link.email, phone: link.phone, purpose: link.purpose },
  });
  await captureLead({
    source: 'payment', name: link.name, email: link.email, phone: link.phone, company: link.company,
    need: link.purpose, value: link.amount, stage: 'proposal',
    event: { kind: 'payment', title: `Started checkout: ${link.purpose} (${inr(link.amount)})`, meta: { ref: link.id, order: merchantOrderId } },
  });
  return order.redirectUrl;
}
