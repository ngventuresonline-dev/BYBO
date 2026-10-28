'use client';

import { useEffect, useRef, useState, type ReactNode } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform, useMotionValue, useMotionValueEvent, useReducedMotion, type MotionValue } from 'framer-motion';
import { Check } from 'lucide-react';
import { img, Phone, StatusBar, DAYS, useFadeIn, useFadeInOut } from './parts';

/* ---------------- sketch to store ---------------- */

const STAGES: [string, string][] = [
  ['Idea', 'A sketch is enough to start. We begin with who it is for and the one job it must do.'],
  ['Flow', 'Every screen and every tap mapped out before anything is designed.'],
  ['Design', 'Real content, real photography and a look that is unmistakably yours.'],
  ['Prototype', 'You tap through it on your own phone before it is built.'],
  ['Build', 'Interface, logic, services and data, engineered as one system.'],
  ['Launch', 'Tested on real devices, submitted to the stores and handed over.'],
];

const SKETCH = [
  'M14 26 C 38 24, 62 28, 86 25',
  'M14 38 L86 37 L87 98 L13 99 Z',
  'M14 38 L86 98 M86 37 L14 99',
  'M14 112 C 40 110, 56 113, 74 111',
  'M14 123 C 30 122, 42 124, 56 123',
  'M14 140 L46 139 L47 162 L14 163 Z',
  'M54 140 L86 139 L87 162 L54 163 Z',
  'M16 184 C 14 176, 86 175, 85 183 C 87 191, 15 192, 16 184 Z',
];

function SketchPath({ d, p, i }: { d: string; p: MotionValue<number>; i: number }) {
  const len = useTransform(p, [.02 + i * .012, .06 + i * .012], [0, 1], { clamp: true });
  return <motion.path d={d} style={{ pathLength: len }} />;
}

function Layer({ z, o, lo, label, className, children }: { z: MotionValue<number>; o?: MotionValue<number>; lo: MotionValue<number>; label: string; className: string; children?: ReactNode }) {
  return (
    <motion.div className={`as-layer ${className}`} style={{ z, opacity: o }}>
      {children}
      <motion.span className="as-layer-label" style={{ opacity: lo }}>{label}</motion.span>
    </motion.div>
  );
}

export function BuildSequence() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] });
  // A function mapping on purpose: Framer otherwise hands range-based opacity to a native
  // scroll timeline, which maps sub-ranges wrongly and fades layers back out at the end.
  const progress = useTransform(scrollYProgress, v => v);
  const still = useMotionValue(1);
  const p = reduce ? still : progress;
  const [stage, setStage] = useState(reduce ? 5 : 0);
  useMotionValueEvent(scrollYProgress, 'change', v => { if (!reduce) setStage(Math.min(5, Math.floor(v * 6.0001))); });

  // the whole device
  const rotX = useTransform(p, [0, .08, .66, .76, .84, .94], [18, 0, 0, 56, 56, 0]);
  const rotZ = useTransform(p, [.66, .76, .84, .94], [0, -36, -36, 0]);
  const rotY = useTransform(p, [0, .08, .84, .94, 1], [-24, 0, 0, -10, -14]);
  const scale = useTransform(p, [0, .08, .66, .76, .84, .94], [.86, 1, 1, .82, .82, 1]);
  // screens on the phone
  const paper = useFadeInOut(p, 0, .02, .2, .26);
  const wire = useFadeInOut(p, .2, .26, .34, .4);
  const design = useFadeIn(p, .34, .42);
  const photo = useTransform(p, [.36, .5], [1.25, 1]);
  // the flow: neighbouring screens slide out
  const sideX = useTransform(p, [.17, .26, .3, .36], ['0%', '78%', '78%', '0%']);
  const sideXn = useTransform(sideX, v => `-${v}`);
  const sideO = useFadeInOut(p, .17, .21, .31, .36);
  const links = useTransform(p, [.24, .3], [0, 1], { clamp: true });
  // the prototype: a tap, then a sheet
  const finger = useFadeInOut(p, .5, .53, .6, .63);
  const fingerY = useTransform(p, [.5, .56], ['45%', '91%']);
  const press = useTransform(p, [.56, .575, .59], [1, .7, 1]);
  const sheet = useTransform(p, [.58, .64], ['105%', '0%']);
  // the build: the layers come apart
  // layers sit further apart on wide screens, where the device is bigger
  const [spread, setSpread] = useState(1);
  useEffect(() => { const m = window.matchMedia('(min-width: 1100px)'); const set = () => setSpread(m.matches ? 1.6 : 1); set(); m.addEventListener('change', set); return () => m.removeEventListener('change', set); }, []);
  const zUi = useTransform(p, [.7, .8, .84, .92], [0, 150 * spread, 150 * spread, 0]);
  const zLogic = useTransform(p, [.7, .8, .84, .92], [0, 100 * spread, 100 * spread, 0]);
  const zApi = useTransform(p, [.7, .8, .84, .92], [0, 50 * spread, 50 * spread, 0]);
  const zData = useMotionValue(0);
  const inner = useFadeInOut(p, .68, .73, .86, .9);
  const labels = useFadeInOut(p, .76, .8, .84, .87);
  // the launch
  const badge = useTransform(p, [.92, .97], [0, 1], { clamp: true });
  const bar = useTransform(p, [0, 1], ['0%', '100%']);

  return (
    <section ref={ref} className="as-build" id="build" aria-label="How a BYBO app comes together">
      <div className="as-build-sticky">
        <div className="container as-build-grid">
          <div className="as-build-copy">
            <p className="as-kicker">From sketch to store</p>
            <ol className="as-stages">
              {STAGES.map(([t, d], i) => (
                <li key={t} data-on={i === stage ? '' : undefined} data-done={i < stage ? '' : undefined}>
                  <span className="as-stage-n">{String(i + 1).padStart(2, '0')}</span>
                  <div><h3>{t}</h3><p>{d}</p></div>
                </li>
              ))}
            </ol>
            <div className="as-build-bar"><motion.span style={{ width: bar }} /></div>
          </div>

          <div className="as-scene" aria-hidden>
            <motion.div className="as-rig" style={{ rotateX: rotX, rotateY: rotY, rotateZ: rotZ, scale }}>
              {/* neighbouring screens in the flow */}
              <motion.div className="as-side" style={{ x: sideXn, opacity: sideO, z: -90 }}>
                <Phone><div className="as-app as-mini"><StatusBar /><span className="as-mini-photo"><Image src={img('shop')} alt="" fill sizes="160px" /></span><i /><i /><i className="s" /></div></Phone>
              </motion.div>
              <motion.div className="as-side r" style={{ x: sideX, opacity: sideO, z: -90 }}>
                <Phone><div className="as-app as-mini"><StatusBar /><span className="as-mini-tick"><Check /></span><i /><i className="s" /><span className="as-mini-btn" /></div></Phone>
              </motion.div>
              <motion.svg className="as-links" viewBox="0 0 300 100" style={{ opacity: sideO }}>
                <motion.path d="M70 50 C 100 20, 120 20, 140 40" style={{ pathLength: links }} />
                <motion.path d="M160 60 C 180 80, 200 80, 230 50" style={{ pathLength: links }} />
              </motion.svg>

              {/* the device, in layers */}
              <Layer z={zData} label="Data" lo={labels} className="as-l-data" o={inner} />
              <Layer z={zApi} label="Services & API" lo={labels} className="as-l-api" o={inner}><span className="as-nodes"><i /><i /><i /><i /></span></Layer>
              <Layer z={zLogic} label="Logic" lo={labels} className="as-l-logic" o={inner}><span className="as-flowchart"><i /><i /><i /></span></Layer>
              <Layer z={zUi} label="Interface" lo={labels} className="as-l-ui">
                <Phone>
                  <motion.div className="as-paper" style={{ opacity: paper }}>
                    <svg viewBox="0 0 100 210">{SKETCH.map((d, i) => <SketchPath key={i} d={d} p={p} i={i} />)}</svg>
                  </motion.div>
                  <motion.div className="as-wire" style={{ opacity: wire }}>
                    <span className="w-photo" /><span className="w-t" /><span className="w-t s" /><span className="w-chip" /><span className="w-chip b" /><span className="w-btn" />
                  </motion.div>
                  <motion.div className="as-app as-design" style={{ opacity: design }}>
                    <motion.div className="as-design-photo" style={{ scale: photo }}><Image src={img('stay')} alt="" fill sizes="320px" /></motion.div>
                    <StatusBar />
                    <div className="as-design-body">
                      <small>Your stay</small>
                      <h6>Courtyard room</h6>
                      <div className="as-days mini">{DAYS.slice(2, 7).map(([d, n], i) => <span key={d} data-on={i === 2 ? '' : undefined}><small>{d}</small>{n}</span>)}</div>
                      <motion.span className="as-cta" style={{ scale: press }}>Reserve</motion.span>
                    </div>
                    <motion.div className="as-sheet" style={{ y: sheet }}>
                      <span className="as-sheet-tick"><Check /></span><b>You’re booked</b><span>Fri 14 to Sun 16 · 2 nights</span>
                    </motion.div>
                    <motion.span className="as-finger" style={{ top: fingerY, opacity: finger }} />
                  </motion.div>
                </Phone>
              </Layer>
            </motion.div>
            <motion.div className="as-launch" style={{ scale: badge, opacity: badge }}>
              <span className="as-live" /> Ready for the App Store and Google Play
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

