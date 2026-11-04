import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { crmConfigured, rpc } from '@/lib/crm/db';
import { askLink, lineTotal, milestoneAmounts, TOKEN, type PublicProposal } from '@/lib/crm/proposals';
import { CONTACT } from '@/lib/site';
import { ProposalActions } from './ProposalActions';
import './proposal.css';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Your proposal',
  description: 'A private proposal from BYBO.',
  robots: { index: false, follow: false, nocache: true, googleBot: { index: false, follow: false } },
};

const inr = (n: number) => `₹${(Math.round(n * 100) / 100).toLocaleString('en-IN', { maximumFractionDigits: 2 })}`;
const longDate = (iso: string) => new Date(iso).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' });

async function load(token: string) {
  if (!TOKEN.test(token) || !crmConfigured()) return null;
  try { return await rpc<PublicProposal | null>('bybo_proposal_by_token', { p_token: token }); }
  catch { return null; }
}

/** Valid through the end of its last day, India time. */
const isExpired = (validUntil: string | null) => !!validUntil && Date.parse(`${validUntil}T23:59:59+05:30`) < Date.now();

/** The client's proposal, opened from the private link in their email. */
export default async function ProposalPage({ params, searchParams }: { params: Promise<{ token: string }>; searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const { token } = await params;
  const sp = await searchParams;
  const p = await load(token);
  if (!p?.id) notFound();

  const title = p.title || 'Your proposal';
  const client = p.lead_company || p.lead_name || null;
  const items = p.items ?? [];
  const milestones = p.milestones ?? [];
  const total = Number(p.total) || 0;
  const shares = milestoneAmounts(total, milestones);
  const expired = isExpired(p.valid_until);
  const dated = p.sent_at ?? p.created_at;

  return (
    <main className="prop">
      <div className="prop-glow" aria-hidden="true" />
      <article className="prop-doc">
        <header className="prop-head">
          <div className="prop-brand"><span className="prop-mark">BYBO<span>.</span></span><span className="prop-kick">Proposal</span></div>
          {p.status === 'draft' ? <p className="prop-banner">Draft preview: the client has not been sent this yet.</p> : null}
          {client ? <p className="prop-for">Prepared for <b>{client}</b>{p.lead_company && p.lead_name ? <> · {p.lead_name}</> : null}</p> : null}
          <h1>{title}</h1>
          <dl className="prop-meta">
            <div><dt>Date</dt><dd>{longDate(dated)}</dd></div>
            {p.valid_until ? <div><dt>Valid until</dt><dd className={expired ? 'is-late' : ''}>{longDate(p.valid_until)}{expired ? ' (expired)' : ''}</dd></div> : null}
            <div><dt>Total</dt><dd>{inr(total)}</dd></div>
          </dl>
        </header>

        <section className="prop-section" aria-labelledby="prop-scope">
          <h2 id="prop-scope" className="prop-label">Scope and pricing</h2>
          <ol className="prop-items">
            {items.map((i, n) => (
              <li key={n}>
                <span className="prop-n">{String(n + 1).padStart(2, '0')}</span>
                <div className="prop-item-body">
                  <h3>{i.name}</h3>
                  {i.description ? <p>{i.description}</p> : null}
                  {Number(i.qty) !== 1 ? <small>{i.qty} × {inr(Number(i.amount))}</small> : null}
                </div>
                <strong>{inr(lineTotal(i))}</strong>
              </li>
            ))}
          </ol>
          <div className="prop-total">
            <span>Total</span>
            <strong>{inr(total)}</strong>
          </div>
          <p className="prop-fine">All amounts in Indian rupees.</p>
        </section>

        {milestones.length ? (
          <section className="prop-section" aria-labelledby="prop-pay">
            <h2 id="prop-pay" className="prop-label">Payment milestones</h2>
            <ol className="prop-ms">
              {milestones.map((m, n) => (
                <li key={n} style={{ '--w': `${m.pct}%` } as React.CSSProperties}>
                  <div><b>{m.label}</b><small>{m.pct}%</small></div>
                  <span className="prop-ms-bar" aria-hidden="true"><i /></span>
                  <strong>{inr(shares[n] ?? 0)}</strong>
                </li>
              ))}
            </ol>
          </section>
        ) : null}

        {p.notes ? (
          <section className="prop-section" aria-labelledby="prop-notes">
            <h2 id="prop-notes" className="prop-label">Notes</h2>
            <div className="prop-notes">{p.notes.split(/\n\s*\n/).map((para, n) => <p key={n}>{para}</p>)}</div>
          </section>
        ) : null}

        <ProposalActions token={p.token} status={p.status} expired={expired} preview={sp.preview === '1'} ask={askLink(title)} />

        <footer className="prop-foot">
          <p>BYBO · {CONTACT.city} · <a href={CONTACT.emailHref}>{CONTACT.email}</a> · <a href={`tel:${CONTACT.phoneHref}`}>{CONTACT.phone}</a></p>
          <p>This link is private to you. Please don’t share it outside your team.</p>
        </footer>
      </article>
    </main>
  );
}
