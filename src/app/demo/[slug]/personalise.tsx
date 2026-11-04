'use client';

/* eslint-disable @next/next/no-img-element -- the brand's own product renders */
import { useEffect, useId, useState } from 'react';
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

/**
 * Home page chapter: pick a colourway (or take the one chosen in the
 * wardrobe), type the family name, see the proof, and order for yourself,
 * the whole family, or as a gift. A share link reopens the same proof.
 */
export function Personaliser({ options, rules, kicker, title }: { options: Option[]; rules: Rules; kicker: string; title: string }) {
  const { add, money } = useCart();
  const [pick, setPick] = useState(options[0]?.handle ?? '');
  const [name, setName] = useState('');
  const [initials, setInitials] = useState('');
  const [view, setView] = useState<'back' | 'front'>('back');
  const [mode, setMode] = useState<'me' | 'family' | 'gift'>('me');
  const [family, setFamily] = useState<{ name: string; initials: string }[]>([{ name: '', initials: '' }]);
  const [note, setNote] = useState('');
  const [msg, setMsg] = useState('');

  // A jacket chosen in the wardrobe, or a shared link (?name=&ini=&jacket=), opens here.
  useEffect(() => {
    const q = new URLSearchParams(window.location.search);
    const t = setTimeout(() => {
      if (q.get('jacket') && options.some((x) => x.handle === q.get('jacket'))) setPick(q.get('jacket')!);
      if (q.get('name')) setName(clean(q.get('name')!, rules.max));
      if (q.get('ini')) setInitials(initialsOf(q.get('ini')!));
    }, 0);
    const onPick = (e: Event) => {
      const h = (e as CustomEvent<string>).detail;
      if (options.some((x) => x.handle === h)) setPick(h);
      document.getElementById('personalise')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    };
    window.addEventListener('demo:pick', onPick);
    return () => { clearTimeout(t); window.removeEventListener('demo:pick', onPick); };
  }, [options, rules.max]);

  const o = options.find((x) => x.handle === pick) ?? options[0];
  if (!o) return null;
  const ini = initials || initialsOf(name);
  const line = (n: string, i: string) => ({ handle: `${o.handle}--${n.toLowerCase().replace(/[^a-z]/g, '')}-${i.toLowerCase()}`, title: `${o.title} · ${n}${i ? ` / ${i}` : ''}`, price: o.price, image: o.back ?? o.image });
  const people = [{ name, initials: ini }, ...family.map((f) => ({ name: f.name, initials: f.initials || initialsOf(f.name) }))].filter((p) => p.name.length >= 2);
  const ready = mode === 'gift' || (mode === 'family' ? people.length >= 2 : name.length >= 2);
  const flash = (m: string) => { setMsg(m); setTimeout(() => setMsg(''), 2200); };

  const order = () => {
    if (mode === 'gift') add({ handle: `${o.handle}--gift-${Date.now().toString(36)}`, title: `${o.title} · Gift: they add their name${note ? ` · “${note.slice(0, 60)}”` : ''}`, price: o.price, image: o.back ?? o.image });
    else if (mode === 'family') people.forEach((p) => add(line(p.name, p.initials)));
    else add(line(name, ini));
    flash(mode === 'family' ? `${people.length} jackets added` : 'Added to bag');
  };
  const share = async () => {
    const url = `${window.location.origin}${window.location.pathname}?jacket=${o.handle}${name ? `&name=${encodeURIComponent(name)}` : ''}${ini ? `&ini=${ini}` : ''}#personalise`;
    try {
      if (navigator.share) await navigator.share({ title: `${name || 'Our'} ${o.title} jacket`, url });
      else { await navigator.clipboard.writeText(url); flash('Link copied'); }
    } catch { /* closed the share sheet */ }
  };

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
          <div className="pz-modes" role="tablist" aria-label="Who is it for">
            {([['me', 'For me'], ['family', 'Family set'], ['gift', 'A gift']] as const).map(([k, l]) => <button key={k} type="button" role="tab" aria-selected={mode === k} className={mode === k ? 'is-on' : ''} onClick={() => setMode(k)}>{l}</button>)}
          </div>
          {mode === 'gift' ? (
            <div className="pz-gift">
              <LetteringProof name="THEIR NAME" initials="" swatch={o.swatch} />
              <p>Pay now; they receive a link to add their own family name and initials, and approve the proof themselves.</p>
              <label className="pz-gift-note">Your message (optional)<textarea value={note} onChange={(e) => setNote(e.target.value.slice(0, 140))} rows={2} placeholder="For the first winter in Toronto…" /></label>
            </div>
          ) : (
            <>
              <LetteringProof name={name} initials={ini} swatch={o.swatch} />
              <Fields rules={rules} name={name} setName={setName} initials={initials} setInitials={setInitials} />
              {mode === 'family' ? (
                <div className="pz-family">
                  {family.map((f, i) => (
                    <div key={i} className="pz-family-row">
                      <input value={f.name} onChange={(e) => setFamily(family.map((x, k) => (k === i ? { ...x, name: clean(e.target.value, rules.max) } : x)))} placeholder={`Family member ${i + 2}`} aria-label={`Name ${i + 2}`} />
                      <input value={f.initials} onChange={(e) => setFamily(family.map((x, k) => (k === i ? { ...x, initials: initialsOf(e.target.value) } : x)))} placeholder={initialsOf(f.name) || 'AB'} aria-label={`Initials ${i + 2}`} maxLength={2} />
                      <button type="button" onClick={() => setFamily(family.filter((_, k) => k !== i))} aria-label="Remove">×</button>
                    </div>
                  ))}
                  {family.length < 7 ? <button type="button" className="pz-add" onClick={() => setFamily([...family, { name: name, initials: '' }])}>+ Add someone</button> : null}
                  <small>Same colourway for everyone, each with their own initials. Sizes are chosen at checkout.</small>
                </div>
              ) : null}
            </>
          )}
          <div className="pz-swatches" role="radiogroup" aria-label="Colourway">
            {options.map((x) => (
              <button key={x.handle} type="button" role="radio" aria-checked={x.handle === o.handle} title={x.title} className={x.handle === o.handle ? 'is-on' : ''} onClick={() => setPick(x.handle)} style={{ '--b': x.swatch.body, '--s': x.swatch.sleeve } as React.CSSProperties}><span /></button>
            ))}
          </div>
          <div className="pz-buy">
            <div><b>{money(o.price * (mode === 'family' ? Math.max(1, people.length) : 1))}</b><small>{mode === 'family' ? `${people.length || 1} × ${o.title}` : `${o.category} · ${o.title}`}</small></div>
            <button type="button" className="demo-btn" disabled={!ready} onClick={order}>
              {msg || (!ready ? (mode === 'family' ? 'Add at least two names' : 'Type your family name') : mode === 'gift' ? 'Add gift to bag' : mode === 'family' ? `Add ${people.length} jackets` : `Add ${name} to bag`)}
            </button>
          </div>
          <div className="pz-foot">
            {rules.note ? <p className="pz-note">{rules.note}</p> : <span />}
            {mode !== 'gift' ? <button type="button" className="pz-share" onClick={share}>Share this proof ↗</button> : null}
          </div>
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
