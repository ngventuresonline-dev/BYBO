'use client';

/* eslint-disable @next/next/no-img-element -- the brand's own product renders */
import { useId, useState } from 'react';
import { useCart } from './store';

export type Swatch = { body: string; sleeve: string; letter: string; edge: string };
type Option = { handle: string; title: string; price: number; image: string | null; back: string | null; category: string; swatch: Swatch };
type Rules = { name_label: string; initials_label?: string; max: number; note?: string };

const clean = (s: string, max: number) => s.toUpperCase().replace(/[^A-Z' -]/g, '').slice(0, max);
const initialsOf = (s: string) => s.toUpperCase().replace(/[^A-Z]/g, '').slice(0, 2);

/**
 * A stitch proof: the surname in a shallow varsity arch and the initials, in
 * the colourway's chenille and edge colours on a felt panel of its body
 * colour. It is a lettering preview, not a photo of the jacket.
 */
export function LetteringProof({ name, initials, swatch, small }: { name: string; initials: string; swatch: Swatch; small?: boolean }) {
  const id = useId().replace(/:/g, '');
  const text = name || 'YOUR NAME';
  const size = Math.max(46, Math.min(92, 760 / Math.max(5, text.length)));
  return (
    <svg className={`pz-proof${small ? ' is-small' : ''}`} viewBox="0 0 600 420" role="img" aria-label={`Lettering proof: ${text}${initials ? `, initials ${initials}` : ''}`}>
      <defs>
        <filter id={`felt${id}`}><feTurbulence type="fractalNoise" baseFrequency=".9" numOctaves="3" result="n" /><feColorMatrix in="n" type="saturate" values="0" /><feComponentTransfer><feFuncA type="table" tableValues="0 .22" /></feComponentTransfer><feComposite in2="SourceGraphic" operator="in" /><feBlend in="SourceGraphic" mode="multiply" /></filter>
        <filter id={`chenille${id}`} x="-10%" y="-20%" width="120%" height="140%"><feTurbulence type="fractalNoise" baseFrequency="1.6" numOctaves="2" result="t" /><feDisplacementMap in="SourceGraphic" in2="t" scale="2.2" result="d" /><feDropShadow in="d" dx="0" dy="3" stdDeviation="2.5" floodOpacity=".45" /></filter>
        <path id={`arc${id}`} d="M 60 250 Q 300 120 540 250" />
      </defs>
      <rect width="600" height="420" rx="28" fill={swatch.body} filter={`url(#felt${id})`} />
      <rect x="10" y="10" width="580" height="400" rx="22" fill="none" stroke="rgba(255,255,255,.08)" strokeDasharray="3 7" />
      <g filter={`url(#chenille${id})`} fontFamily="var(--f-varsity), 'Graduate', Georgia, serif" fontWeight="400" textAnchor="middle">
        <text fontSize={size} letterSpacing="2" fill={swatch.edge} stroke={swatch.edge} strokeWidth="14" strokeLinejoin="round"><textPath href={`#arc${id}`} startOffset="50%">{text}</textPath></text>
        <text fontSize={size} letterSpacing="2" fill={swatch.letter} stroke={swatch.letter} strokeWidth="5" strokeLinejoin="round"><textPath href={`#arc${id}`} startOffset="50%">{text}</textPath></text>
        {initials ? (
          <>
            <text x="300" y="352" fontSize="64" fill={swatch.edge} stroke={swatch.edge} strokeWidth="11" strokeLinejoin="round">{initials}</text>
            <text x="300" y="352" fontSize="64" fill={swatch.letter} stroke={swatch.letter} strokeWidth="4" strokeLinejoin="round">{initials}</text>
          </>
        ) : null}
      </g>
      <text x="300" y="398" textAnchor="middle" fontSize="11" letterSpacing="3" fill="rgba(255,255,255,.45)" fontFamily="system-ui, sans-serif">LETTERING PROOF · BACK ARCH{initials ? ' · CHEST INITIALS' : ''}</text>
    </svg>
  );
}

/** The two inputs: name (letters only) and initials (two letters, filled from the name until edited). */
function Fields({ rules, name, setName, initials, setInitials }: { rules: Rules; name: string; setName: (s: string) => void; initials: string; setInitials: (s: string) => void }) {
  return (
    <div className="pz-fields">
      <label>{rules.name_label}<input value={name} onChange={(e) => setName(clean(e.target.value, rules.max))} placeholder="e.g. DHILLON" maxLength={rules.max} autoCapitalize="characters" spellCheck={false} /><small>{name.length}/{rules.max}</small></label>
      {rules.initials_label ? <label>{rules.initials_label}<input value={initials} onChange={(e) => setInitials(initialsOf(e.target.value))} placeholder="AD" maxLength={2} autoCapitalize="characters" spellCheck={false} /></label> : null}
    </div>
  );
}

/** Home page chapter: pick a colourway, type the family name, see the proof, add to bag. */
export function Personaliser({ options, rules, kicker, title }: { options: Option[]; rules: Rules; kicker: string; title: string }) {
  const { add, money } = useCart();
  const [pick, setPick] = useState(options[0]?.handle ?? '');
  const [name, setName] = useState('');
  const [initials, setInitials] = useState('');
  const [view, setView] = useState<'back' | 'front'>('back');
  const [done, setDone] = useState(false);
  const o = options.find((x) => x.handle === pick) ?? options[0];
  if (!o) return null;
  const ready = name.length >= 2;
  return (
    <section className="pz" id="personalise" data-chapter="personalise">
      <div className="pz-head" data-reveal><p className="demo-kicker">{kicker}</p><h2>{title}</h2></div>
      <div className="pz-grid">
        <div className="pz-photo">
          <img key={o.handle + view} src={(view === 'back' ? o.back : o.image) ?? o.image ?? ''} alt={`${o.title}, ${view}`} />
          <div className="pz-toggle" role="group" aria-label="View">{(['back', 'front'] as const).map((v) => <button key={v} type="button" className={v === view ? 'is-on' : ''} onClick={() => setView(v)}>{v === 'back' ? 'Back' : 'Front'}</button>)}</div>
          <span className="pz-tag">{o.title}</span>
        </div>
        <div className="pz-panel">
          <LetteringProof name={name} initials={initials || initialsOf(name)} swatch={o.swatch} />
          <Fields rules={rules} name={name} setName={(s) => { setName(s); setDone(false); }} initials={initials} setInitials={setInitials} />
          <div className="pz-swatches" role="radiogroup" aria-label="Colourway">
            {options.map((x) => (
              <button key={x.handle} type="button" role="radio" aria-checked={x.handle === o.handle} title={x.title} className={x.handle === o.handle ? 'is-on' : ''} onClick={() => setPick(x.handle)} style={{ '--b': x.swatch.body, '--s': x.swatch.sleeve } as React.CSSProperties}><span /></button>
            ))}
          </div>
          <div className="pz-buy">
            <div><b>{money(o.price)}</b><small>{o.category} · {o.title}</small></div>
            <button type="button" className="demo-btn" disabled={!ready} onClick={() => { add({ handle: `${o.handle}--${name.toLowerCase().replace(/[^a-z]/g, '')}-${(initials || initialsOf(name)).toLowerCase()}`, title: `${o.title} · ${name}${initials || initialsOf(name) ? ` / ${initials || initialsOf(name)}` : ''}`, price: o.price, image: o.back ?? o.image }); setDone(true); }}>
              {done ? 'Added ✓' : ready ? `Add ${name} to bag` : 'Type your family name'}
            </button>
          </div>
          {rules.note ? <p className="pz-note">{rules.note}</p> : null}
        </div>
      </div>
    </section>
  );
}

/** On the product page: the same fields and a small proof above the buy buttons. */
export function PersonaliseBox({ item, rules, swatch, onChange }: { item: { title: string }; rules: Rules; swatch: Swatch | null; onChange: (v: { name: string; initials: string }) => void }) {
  const [name, setName] = useState('');
  const [initials, setInitials] = useState('');
  const set = (n: string, i: string) => { setName(n); setInitials(i); onChange({ name: n, initials: i || initialsOf(n) }); };
  return (
    <div className="pz-box" aria-label={`Personalise ${item.title}`}>
      {swatch ? <LetteringProof name={name} initials={initials || initialsOf(name)} swatch={swatch} small /> : null}
      <Fields rules={rules} name={name} setName={(s) => set(s, initials)} initials={initials} setInitials={(s) => set(name, s)} />
      {rules.note ? <p className="pz-note">{rules.note}</p> : null}
    </div>
  );
}
