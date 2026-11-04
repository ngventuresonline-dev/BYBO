'use client';

/* eslint-disable @next/next/no-img-element -- generated illustration photos */
import { useRef, useState } from 'react';
import type { DemoContent } from '@/lib/crm/autopilot';

/** A before/after you drag across: the right image is revealed over the left. */
export function Compare({ data }: { data: NonNullable<DemoContent['compare']> }) {
  const [pos, setPos] = useState(50);
  const box = useRef<HTMLDivElement>(null);
  const move = (x: number) => {
    const r = box.current?.getBoundingClientRect();
    if (r) setPos(Math.max(4, Math.min(96, ((x - r.left) / r.width) * 100)));
  };
  return (
    <section className="demo-section demo-compare-sec">
      <div className="demo-head is-center" data-reveal><p className="demo-kicker">{data.kicker}</p><h2>{data.title}</h2></div>
      <div
        ref={box}
        className="demo-ba"
        style={{ '--pos': `${pos}%` } as React.CSSProperties}
        onPointerDown={(e) => { e.currentTarget.setPointerCapture(e.pointerId); move(e.clientX); }}
        onPointerMove={(e) => { if (e.buttons) move(e.clientX); }}
      >
        <img src={data.left.image!} alt={data.left.label} draggable={false} />
        <div className="demo-ba-right"><img src={data.right.image!} alt={data.right.label} draggable={false} /></div>
        <span className="demo-ba-label is-left">{data.left.label}</span>
        <span className="demo-ba-label is-right">{data.right.label}</span>
        <input type="range" min={4} max={96} value={pos} onChange={(e) => setPos(Number(e.target.value))} aria-label="Compare" />
        <span className="demo-ba-handle" aria-hidden="true"><i>‹ ›</i></span>
      </div>
      {data.note ? <p className="demo-ba-note">{data.note}</p> : null}
    </section>
  );
}
