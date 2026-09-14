import { Check, CircleAlert } from 'lucide-react';
import type { Worked, WorkedKind } from '@/lib/service-details/worked';

/** **bold** only — these strings are ours, not user input. */
function Emph({ text }: { text: string }) {
  return <>{text.split(/\*\*(.+?)\*\*/g).map((part, i) => (i % 2 ? <strong key={i}>{part}</strong> : part))}</>;
}

/* ── the left-hand panel: one mock per system ─────────────────────────── */

function Invoice() {
  return (
    <div className="we-doc">
      <div className="we-doc-head">
        <div><strong>SHAKTI PACKAGING</strong><span>GSTIN 29AABCS1429B1Z1</span></div>
        <div className="we-doc-no"><span>TAX INVOICE</span><strong>4471</strong></div>
      </div>
      <div className="we-doc-lines">
        <div><span>Corrugated box 12×9</span><span>1,200 × ₹34</span></div>
        <div><span>Kraft tape 48mm</span><span>60 × ₹95</span></div>
        <div className="is-flag"><span>Pallet wrap</span><span>18 × ₹410</span></div>
      </div>
      <div className="we-doc-total"><span>Total incl. GST</span><span>₹63,072</span></div>
    </div>
  );
}

function CaseTrail() {
  const steps: [string, string, 'done' | 'wait' | 'gate'][] = [
    ['Account created', 'Mon 11:02 · system', 'done'],
    ['Documents requested', 'Mon 11:03 · system', 'done'],
    ['GST certificate chased ×2', 'Tue, Thu · system', 'done'],
    ['Credit check run', 'Fri 09:38 · system', 'done'],
    ['Credit limit set', 'waiting on Arun', 'gate'],
    ['Account activated', 'not started', 'wait'],
  ];
  return (
    <ol className="we-trail">
      {steps.map(([t, m, s]) => (
        <li key={t} className={`is-${s}`}><span className="we-trail-dot" aria-hidden /><div><strong>{t}</strong><span>{m}</span></div></li>
      ))}
    </ol>
  );
}

function AnswerCard() {
  return (
    <div className="we-qa">
      <div className="we-qa-turn"><span className="we-qa-who">Asked</span><p>What notice do we have to give Shakti before changing an order?</p></div>
      <div className="we-qa-turn is-answer">
        <span className="we-qa-who">Answered</span>
        <p>Seven working days for a quantity change, fourteen for a specification change.</p>
        <span className="we-qa-cite">Supplier Terms v4 · clause 6.2 · updated March 2026</span>
      </div>
      <div className="we-qa-turn"><span className="we-qa-who">Asked</span><p>And the penalty if they deliver late?</p></div>
      <div className="we-qa-turn is-refused"><span className="we-qa-who">No answer given</span><p>Nothing current covers this.</p></div>
    </div>
  );
}

function RoleSplit() {
  return (
    <div className="we-roles">
      <div className="we-role">
        <span className="we-role-tag">Assessor</span>
        <div className="we-role-rows">
          <div><span>Policy &amp; cover</span><em>visible</em></div>
          <div><span>Medical notes</span><em>visible</em></div>
          <div><span>Draft assessment</span><em>visible</em></div>
          <div><span>Settle the claim</span><em className="is-can">can act</em></div>
        </div>
      </div>
      <div className="we-role is-limited">
        <span className="we-role-tag">Broker</span>
        <div className="we-role-rows">
          <div><span>Policy &amp; cover</span><em>visible</em></div>
          <div><span>Medical notes</span><em className="is-hidden">not fetched</em></div>
          <div><span>Draft assessment</span><em className="is-hidden">hidden</em></div>
          <div><span>Settle the claim</span><em className="is-hidden">no</em></div>
        </div>
      </div>
    </div>
  );
}

function ChatThread() {
  const turns: [string, string, 'in' | 'out'][] = [
    ['19:31', 'Are you open Saturday?', 'in'],
    ['19:31', 'Yes — 12 to 3, and 7 to 11. Would you like a table?', 'out'],
    ['19:33', 'Table for 4 at 8', 'in'],
    ['19:33', 'Held for you. Saturday 8pm, four people. Name for the booking?', 'out'],
    ['19:41', 'And what rate can you do for 20 people?', 'in'],
    ['19:42', 'Let me get someone who can answer that properly — one moment.', 'out'],
  ];
  return (
    <div className="we-chat">
      {turns.map(([t, m, dir], i) => (
        <div key={i} className={`we-msg is-${dir}`}><p>{m}</p><span>{t}</span></div>
      ))}
    </div>
  );
}

function SignalCard() {
  // Heights are a truncated scale so a 3.1-point move is visible; the axis is not zero-based.
  const bars = [86, 90, 84, 88, 92, 86, 54];
  return (
    <div className="we-signal">
      <div className="we-signal-head">
        <div><span>Gross margin, last 7 weeks</span><strong>58.9%</strong></div>
        <span className="we-signal-delta">▼ 3.1 pts</span>
      </div>
      <div className="we-signal-chart" role="img" aria-label="Gross margin flat for six weeks, then falling in the last week">
        {bars.map((h, i) => <span key={i} style={{ height: `${h}%` }} className={i === bars.length - 1 ? 'is-drop' : undefined} />)}
      </div>
      <p className="we-signal-def">Definition in use: revenue less landed cost, excluding freight recharges.</p>
      <div className="we-signal-drivers">
        <div><span>Distributor rate card change</span><strong>2.2 pts</strong></div>
        <div><span>Freight on the western route</span><strong>0.6 pts</strong></div>
        <div><span>Product mix</span><strong>0.3 pts</strong></div>
      </div>
      <p className="we-signal-stale">One source last refreshed 2 days ago.</p>
    </div>
  );
}

function AuditTable() {
  const rows: [string, string, string, string][] = [
    ['19 Sep 14:02', 'Release blocked', 'Prompt change · refunds', 'evaluation failed'],
    ['18 Sep 09:20', 'Action taken', 'Refund issued ₹2,400', 'approved by Divya'],
    ['17 Sep 16:44', 'Access denied', 'Support role · payroll data', 'outside permissions'],
    ['16 Sep 11:07', 'Release approved', 'Retrieval index rebuild', 'signed by Divya'],
  ];
  return (
    <div className="we-audit">
      {rows.map(([when, what, detail, note]) => (
        <div key={when} className={`we-audit-row ${what.includes('blocked') || what.includes('denied') ? 'is-block' : ''}`}>
          <span className="we-audit-when">{when}</span>
          <div><strong>{what}</strong><span>{detail}</span></div>
          <span className="we-audit-note">{note}</span>
        </div>
      ))}
      <div className="we-audit-foot"><span>1,284 actions this month</span><span>11 blocked</span><span>₹—— spend, shown in your currency</span></div>
    </div>
  );
}

const MOCKS: Record<WorkedKind, () => React.ReactElement> = {
  invoice: Invoice, case: CaseTrail, answer: AnswerCard, roles: RoleSplit, chat: ChatThread, signal: SignalCard, audit: AuditTable,
};

/* ── the section ──────────────────────────────────────────────────────── */

export function WorkedExample({ w }: { w: Worked }) {
  const Mock = MOCKS[w.kind];
  const [line1, line2] = w.heading.split('\n');
  return (
    <section className="sl-worked" aria-labelledby="sl-worked-title">
      <div className="container">
        <div className="sl-top">
          <div>
            <p className="eyebrow">A worked example</p>
            <h2 id="sl-worked-title">{line1}<br />{line2}</h2>
          </div>
          <p>{w.lede}</p>
        </div>

        <div className="we-frame">
          <div className="we-bar">
            <span aria-hidden /><span aria-hidden /><span aria-hidden />
            <span className="we-bar-url">{w.chrome}</span>
            <span className="we-bar-meta">{w.meta}</span>
          </div>
          <div className="we-body">
            <div className="we-left">
              <p className="eyebrow">{w.leftLabel}</p>
              <Mock />
              <p className="we-left-note">{w.leftNote}</p>
            </div>
            <div className="we-right">
              <p className="eyebrow">What the system did</p>
              {w.did.map(d => (
                <div key={d} className="we-did"><Check size={16} aria-hidden />{d}</div>
              ))}
              <div className="we-stop">
                <div className="we-stop-head"><CircleAlert size={16} aria-hidden />{w.stop.title}</div>
                <p><Emph text={w.stop.body} /></p>
              </div>
              <div className="we-person">
                <p className="eyebrow">Waiting on a person</p>
                <div className="we-person-row">
                  <span className="we-avatar" aria-hidden>{w.person.initials}</span>
                  <div><strong>{w.person.name}</strong><span>{w.person.note}</span></div>
                  <span className="we-btn">{w.person.primary}</span>
                  <span className="we-btn is-ghost">{w.person.secondary}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="we-after">
          {w.after.map((a, i) => (
            <div key={a.title} className={`we-after-item is-${i}`}><strong>{a.title}</strong><p>{a.body}</p></div>
          ))}
        </div>
        <p className="we-disclaimer">Illustrative example built to show the shape of the work. Not a client record.</p>
      </div>
    </section>
  );
}
