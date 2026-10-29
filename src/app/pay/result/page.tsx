import type { Metadata } from 'next';
import Link from 'next/link';
import { inr, readLink } from '@/lib/payments/link';
import { orderStatus, phonepeConfigured, type OrderStatus } from '@/lib/payments/phonepe';
import { sendReceipts } from '@/lib/payments/mail';
import { CONTACT } from '@/lib/site';
import '../pay.css';

export const metadata: Metadata = { title: 'Payment status', robots: { index: false, follow: false } };
export const dynamic = 'force-dynamic';

/** Receipts already sent by this instance, so a refresh doesn't resend them. */
const receipted = new Set<string>();

export default async function PayResult({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const sp = await searchParams;
  const orderId = typeof sp.o === 'string' ? sp.o.slice(0, 80) : '';
  const token = typeof sp.t === 'string' ? sp.t.slice(0, 4000) : '';
  const link = token ? readLink(token) : null;

  let status: OrderStatus | null = null;
  let checkFailed = false;
  if (orderId && link && phonepeConfigured()) {
    try { status = await orderStatus(orderId); } catch { checkFailed = true; }
  }

  // Trust PhonePe, and only for this link: the order must carry its reference and amount.
  const matches = !!(status && link && orderId.startsWith(`bybo_${link.id.replace(/[^a-zA-Z0-9_-]/g, '_').slice(0, 30)}_`) && status.amountPaisa === Math.round(link.amount * 100));
  const paid = matches && status!.state === 'COMPLETED';
  const failed = matches && status!.state === 'FAILED';

  if (paid && !receipted.has(orderId)) {
    receipted.add(orderId);
    await sendReceipts(link!, { orderId, transactionId: status!.transactionId, mode: status!.paymentMode, paidAt: new Date() }).catch(() => {});
  }

  return (
    <main className="pay">
      <section className="pay-card">
        {paid ? (
          <>
            <div className="pay-status is-ok" aria-hidden="true">✓</div>
            <p className="pay-kick">Payment received</p>
            <h1>Thank you, {link!.name.split(' ')[0]}.</h1>
            <p className="pay-sub">{inr(link!.amount)} for {link!.purpose}. A receipt is on its way to {link!.email}.</p>
            <dl className="pay-rows">
              <div><dt>Reference</dt><dd>{link!.id}</dd></div>
              <div><dt>Order ID</dt><dd>{orderId}</dd></div>
              {status!.transactionId && <div><dt>PhonePe transaction</dt><dd>{status!.transactionId}</dd></div>}
            </dl>
            <Link className="pay-btn is-ghost" href="/">Back to bybo.in</Link>
          </>
        ) : failed ? (
          <>
            <div className="pay-status is-bad" aria-hidden="true">×</div>
            <p className="pay-kick">Payment didn&apos;t go through</p>
            <h1>No money was taken.</h1>
            <p className="pay-sub">If your bank shows a debit, it is usually reversed automatically. You can try again below.</p>
            <Link className="pay-btn" href="/pay">Try again</Link>
          </>
        ) : (
          <>
            <div className="pay-status is-wait" aria-hidden="true">…</div>
            <p className="pay-kick">Checking your payment</p>
            <h1>{checkFailed || !link ? "We couldn't confirm it yet." : 'Your payment is processing.'}</h1>
            <p className="pay-sub">This can take a minute. Refresh this page shortly. If money was debited and this doesn&apos;t update, email {CONTACT.email} with your reference{link ? ` ${link.id}` : ''}.</p>
            <a className="pay-btn is-ghost" href="">Refresh status</a>
          </>
        )}
      </section>
    </main>
  );
}
