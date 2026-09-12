import { Check, UserRound } from 'lucide-react';
import type { CSSProperties } from 'react';
import type { GuideVisual as Visual } from '@/lib/insights/types';

/**
 * The article's editorial figure, drawn in the site's violet-glass style.
 * `card` is the compact version used on listing cards: shorter, no notes.
 */
export function GuideVisual({ visual: v, size = 'full' }: { visual: Visual; size?: 'full' | 'card' }) {
  const card = size === 'card';
  return (
    <figure className={`gv gv--${v.kind} gv-${size}`}>
      <figcaption className="gv-title">{!card && <span>Figure</span>}{v.title}</figcaption>
      {v.kind === 'flow' && (
        <ol className="gv-flow">
          {v.steps.map((s, i) => (
            <li key={s} className={i === v.gate ? 'is-gate' : undefined}>
              <span className="gv-node">{i === v.gate ? <UserRound size={card ? 12 : 16} aria-hidden /> : i + 1}</span>
              <span className="gv-label">
                {s}
                {i === v.gate && !card && <small>{v.gateLabel || 'A person decides'}</small>}
              </span>
            </li>
          ))}
        </ol>
      )}
      {v.kind === 'compare' && (
        <div className="gv-compare">
          {[v.left, v.right].map((col, side) => (
            <div key={col.label} className={v.neutral ? 'gv-col is-option' : side ? 'gv-col is-after' : 'gv-col'}>
              <h4>{col.label}</h4>
              <ul>{(card ? col.items.slice(0, 3) : col.items).map(i => <li key={i}>{i}</li>)}</ul>
            </div>
          ))}
        </div>
      )}
      {v.kind === 'matrix' && (
        <div className="gv-matrix">
          <div className="gv-y"><span>{v.y[1]}</span><span>{v.y[0]}</span></div>
          <div className="gv-grid">
            {v.quadrants.map((q, i) => <div key={q} className={i === v.highlight ? 'is-hi' : undefined}>{q}</div>)}
          </div>
          <div className="gv-x"><span>{v.x[0]}</span><span>{v.x[1]}</span></div>
        </div>
      )}
      {v.kind === 'layers' && (
        <ol className="gv-layers">
          {v.layers.map((l, i) => (
            <li key={l.label} style={{ '--i': i } as CSSProperties}>
              <strong>{l.label}</strong>
              {!card && <span>{l.note}</span>}
            </li>
          ))}
        </ol>
      )}
      {v.kind === 'spectrum' && (
        <div className="gv-spectrum">
          {!card && <span className="gv-end">{v.from}</span>}
          <ol>
            {v.stops.map((s, i) => (
              <li key={s.label} style={{ '--p': v.stops.length > 1 ? i / (v.stops.length - 1) : 0 } as CSSProperties}>
                <strong>{s.label}</strong>
                {!card && <span>{s.note}</span>}
              </li>
            ))}
          </ol>
          {!card && <span className="gv-end is-to">{v.to}</span>}
        </div>
      )}
      {v.kind === 'checklist' && (
        <ul className="gv-check">
          {(card ? v.items.slice(0, 4) : v.items).map(i => (
            <li key={i}><span><Check size={card ? 11 : 14} strokeWidth={3} aria-hidden /></span>{i}</li>
          ))}
        </ul>
      )}
    </figure>
  );
}
