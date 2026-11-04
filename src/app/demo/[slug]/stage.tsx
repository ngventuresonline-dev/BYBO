'use client';

import { useEffect, useRef, useState } from 'react';
import type * as T from 'three';
import { LetteringProof, type Swatch } from './personalise';
import { useCart } from './store';

type Look = { title: string; handle: string; price: number; swatch: Swatch };

const clean = (s: string) => s.toUpperCase().replace(/[^A-Z' -]/g, '').slice(0, 12);

/**
 * The name stage: a family name in real 3D chenille. Plush letters with a
 * metallic edge stand in a varsity arch on a felt panel, under studio light.
 * It cycles through family names on its own and rebuilds as you type.
 */
export function NameStage({ names, looks, font, kicker, headline, sub }: { names: string[]; looks: Look[]; font: string; kicker: string; headline: string; sub: string }) {
  const { money } = useCart();
  const host = useRef<HTMLDivElement>(null);
  const api = useRef<{ setName: (n: string) => void; setLook: (s: Swatch) => void } | null>(null);
  const [typed, setTyped] = useState('');
  const [look, setLook] = useState(0);
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);
  const typedRef = useRef('');
  const [flat, setFlat] = useState(0);

  // Without WebGL the same idea plays as a flat chenille proof that cycles names.
  useEffect(() => {
    if (!failed) return;
    const id = setInterval(() => setFlat((n) => n + 1), 2800);
    return () => clearInterval(id);
  }, [failed]);

  useEffect(() => {
    let dead = false;
    let cleanup = () => {};
    (async () => {
      try {
        const THREE = await import('three');
        const { FontLoader } = await import('three/examples/jsm/loaders/FontLoader.js');
        const { TextGeometry } = await import('three/examples/jsm/geometries/TextGeometry.js');
        const { RoomEnvironment } = await import('three/examples/jsm/environments/RoomEnvironment.js');
        const el = host.current;
        if (!el || dead) return;
        const typeface = new FontLoader().parse(await (await fetch(font)).json());

        const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
        renderer.setPixelRatio(Math.min(2, window.devicePixelRatio));
        renderer.outputColorSpace = THREE.SRGBColorSpace;
        renderer.toneMapping = THREE.ACESFilmicToneMapping;
        renderer.toneMappingExposure = 0.95;
        renderer.shadowMap.enabled = true;
        renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        el.appendChild(renderer.domElement);

        const scene = new THREE.Scene();
        const pmrem = new THREE.PMREMGenerator(renderer);
        scene.environment = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
        const camera = new THREE.PerspectiveCamera(32, 1, 0.1, 100);

        // Felt: a small noise texture, used as bump for the panel and the chenille faces.
        const noise = (size: number, amp: number) => {
          const c = document.createElement('canvas'); c.width = c.height = size;
          const g = c.getContext('2d')!; const img = g.createImageData(size, size);
          for (let i = 0; i < img.data.length; i += 4) { const v = 128 + (Math.random() - 0.5) * amp; img.data[i] = img.data[i + 1] = img.data[i + 2] = v; img.data[i + 3] = 255; }
          g.putImageData(img, 0, 0);
          const t = new THREE.CanvasTexture(c); t.wrapS = t.wrapT = THREE.RepeatWrapping; return t;
        };
        const feltBump = noise(256, 120); feltBump.repeat.set(60, 40);
        const chenilleBump = noise(128, 255); chenilleBump.repeat.set(3, 3);

        // The jacket back: a softly curved felt panel.
        const panelGeo = new THREE.PlaneGeometry(60, 40, 120, 80);
        const pos = panelGeo.attributes.position as T.BufferAttribute;
        for (let i = 0; i < pos.count; i++) { const x = pos.getX(i), y = pos.getY(i); pos.setZ(i, -0.012 * x * x - 0.008 * y * y); }
        panelGeo.computeVertexNormals();
        const felt = new THREE.MeshStandardMaterial({ color: '#15161a', roughness: 0.96, metalness: 0, bumpMap: feltBump, bumpScale: 0.6 });
        const panel = new THREE.Mesh(panelGeo, felt);
        panel.position.z = -0.25; panel.receiveShadow = true;
        scene.add(panel);

        const face = new THREE.MeshPhysicalMaterial({ color: '#e6dcc6', roughness: 0.97, sheen: 1, sheenRoughness: 0.55, sheenColor: new THREE.Color('#ffffff'), bumpMap: chenilleBump, bumpScale: 1.2 });
        const edge = new THREE.MeshStandardMaterial({ color: '#b08a4a', metalness: 0.85, roughness: 0.32 });

        // Studio light: a warm key from above, a cool rim, a soft fill.
        scene.add(new THREE.HemisphereLight('#fff6e8', '#1a1410', 0.18));
        const key = new THREE.SpotLight('#ffe9c8', 70, 30, 0.42, 0.85, 1.6);
        key.position.set(-2.5, 5.5, 6); key.castShadow = true; key.shadow.mapSize.set(1024, 1024); key.shadow.bias = -0.0004; key.shadow.radius = 6;
        key.target.position.set(0, 0.3, 0); scene.add(key, key.target);
        const rim = new THREE.DirectionalLight('#9fc4ff', 0.9); rim.position.set(5, 2, -2); scene.add(rim);

        type Letter = { group: T.Group; born: number; out: number | null; home: T.Vector3; rot: number };
        let letters: Letter[] = [];
        const word = new THREE.Group(); scene.add(word);

        const build = (text: string, now: number) => {
          letters.forEach((l) => { if (l.out == null) l.out = now; });
          const chars = [...(text || ' ')];
          const size = Math.min(0.92, 6.4 / Math.max(5, chars.length));
          const geos = chars.map((ch) => {
            if (ch === ' ') return null;
            const g = new TextGeometry(ch, { font: typeface, size, depth: size * 0.08, curveSegments: 8, bevelEnabled: true, bevelThickness: size * 0.05, bevelSize: size * 0.03, bevelSegments: 4 });
            g.computeBoundingBox(); return g;
          });
          const widths = geos.map((g, i) => (g ? g.boundingBox!.max.x - g.boundingBox!.min.x : size * 0.5) + (i < chars.length - 1 ? size * 0.12 : 0));
          const total = widths.reduce((a, b) => a + b, 0);
          const R = Math.max(5.5, total * 1.15);
          let x = -total / 2;
          geos.forEach((g, i) => {
            const w = widths[i]!;
            const cx = x + w / 2; x += w;
            if (!g) return;
            g.translate(-(g.boundingBox!.min.x + g.boundingBox!.max.x) / 2, -size * 0.38, 0);
            const theta = cx / R;
            const grp = new THREE.Group();
            const m = new THREE.Mesh(g, [face, edge]); m.castShadow = true;
            const outline = new THREE.Mesh(g, edge); outline.scale.setScalar(1.07); outline.position.z = -size * 0.07; outline.castShadow = true;
            grp.add(outline, m);
            const home = new THREE.Vector3(Math.sin(theta) * R, Math.cos(theta) * R - R + 0.55, 0);
            grp.position.copy(home).add(new THREE.Vector3(0, 1.4, 1.2));
            grp.rotation.z = -theta;
            grp.scale.setScalar(0.001);
            word.add(grp);
            letters.push({ group: grp, born: now + i * 70, out: null, home, rot: -theta });
          });
        };

        const resize = () => {
          const w = el.clientWidth, h = el.clientHeight;
          renderer.setSize(w, h, false);
          camera.aspect = w / h;
          camera.position.set(0, 0.35, w < h ? 13.5 : 8.6);
          camera.updateProjectionMatrix();
        };
        resize();
        const ro = new ResizeObserver(resize); ro.observe(el);

        let mx = 0, my = 0;
        const onMove = (e: PointerEvent) => { const r = el.getBoundingClientRect(); mx = ((e.clientX - r.left) / r.width - 0.5) * 2; my = ((e.clientY - r.top) / r.height - 0.5) * 2; };
        const onTilt = (e: DeviceOrientationEvent) => { if (e.gamma != null && e.beta != null) { mx = Math.max(-1, Math.min(1, e.gamma / 25)); my = Math.max(-1, Math.min(1, (e.beta - 45) / 25)); } };
        window.addEventListener('pointermove', onMove, { passive: true });
        window.addEventListener('deviceorientation', onTilt, { passive: true });

        let visible = true;
        const io = new IntersectionObserver(([en]) => { visible = !!en?.isIntersecting; }, { threshold: 0 }); io.observe(el);

        const ease = (t: number) => 1 - Math.pow(1 - Math.min(1, Math.max(0, t)), 3);
        const spring = (t: number) => { t = Math.min(1, Math.max(0, t)); return 1 - Math.exp(-6 * t) * Math.cos(9 * t); };
        let cycle = 0, lastSwap = 0, first = true;
        const start = performance.now();
        let raf = 0;
        const loop = (now: number) => {
          raf = requestAnimationFrame(loop);
          if (!visible) return;
          const t = (now - start) / 1000;
          if (!typedRef.current && now - lastSwap > 3200) { build(names[cycle++ % names.length]!, now); lastSwap = now; }
          letters = letters.filter((l) => {
            if (l.out != null) {
              const k = ease((now - l.out) / 420);
              l.group.position.y = l.home.y - k * 1.2; l.group.position.z = l.home.z + k * 0.8;
              l.group.rotation.x = k * 1.1; l.group.scale.setScalar(Math.max(0.001, 1 - k));
              if (k >= 1) { word.remove(l.group); (l.group.children[0] as T.Mesh).geometry.dispose(); return false; }
              return true;
            }
            const k = spring((now - l.born) / 900);
            l.group.position.set(l.home.x, l.home.y + (1 - k) * 1.4 + Math.sin(t * 1.4 + l.home.x) * 0.025, l.home.z + (1 - k) * 1.2);
            l.group.rotation.set((1 - k) * -0.9, Math.sin(t * 0.9 + l.home.x * 0.7) * 0.06, l.rot);
            l.group.scale.setScalar(Math.max(0.001, Math.min(1.04, k)));
            return true;
          });
          // A slow drift, plus the visitor's hand.
          camera.position.x += ((Math.sin(t * 0.25) * 1.1 + mx * 1.6) - camera.position.x) * 0.04;
          camera.position.y += ((0.35 + Math.cos(t * 0.2) * 0.25 - my * 0.8) - camera.position.y) * 0.04;
          camera.lookAt(0, 0.15, 0);
          key.position.x = -2.5 + Math.sin(t * 0.3) * 1.5;
          renderer.render(scene, camera);
          if (first) { first = false; setReady(true); }
        };
        raf = requestAnimationFrame(loop);

        api.current = {
          setName: (n) => { build(n, performance.now()); lastSwap = performance.now(); },
          setLook: (s) => { felt.color.set(s.body).multiplyScalar(0.8); face.color.set(s.letter).multiplyScalar(0.92); edge.color.set(s.edge); },
        };
        cleanup = () => {
          cancelAnimationFrame(raf); ro.disconnect(); io.disconnect();
          window.removeEventListener('pointermove', onMove); window.removeEventListener('deviceorientation', onTilt);
          renderer.dispose(); pmrem.dispose(); el.removeChild(renderer.domElement);
        };
      } catch {
        if (!dead) setFailed(true);
      }
    })();
    return () => { dead = true; cleanup(); };
  }, [font, names]);

  useEffect(() => { const s = looks[look]?.swatch; if (s) api.current?.setLook(s); }, [look, looks, ready]);

  const type = (v: string) => {
    const n = clean(v);
    setTyped(n); typedRef.current = n;
    if (n.length >= 1) api.current?.setName(n);
  };
  const go = () => {
    const l = looks[look];
    if (l) window.dispatchEvent(new CustomEvent('demo:pick', { detail: l.handle }));
    if (typed) window.dispatchEvent(new CustomEvent('demo:name', { detail: typed }));
  };
  const l = looks[look];

  return (
    <section className="ns" id="top" data-chapter="top">
      <div className={`ns-canvas${ready ? ' is-ready' : ''}${failed ? ' is-failed' : ''}`} ref={host} aria-hidden="true">
        {failed && looks[look] ? <div className="ns-flat" key={typed || flat}><LetteringProof name={typed || names[flat % names.length]!} initials="" swatch={looks[look]!.swatch} /></div> : null}
      </div>
      <div className="ns-vignette" aria-hidden="true" />
      <div className="ns-copy">
        <p className="demo-kicker">{kicker}</p>
        <h1>{headline}</h1>
        <p className="ns-sub">{sub}</p>
      </div>
      <div className="ns-dock">
        <label className="ns-input">
          <span>Your family name</span>
          <input value={typed} onChange={(e) => type(e.target.value)} placeholder="Type it here" autoCapitalize="characters" spellCheck={false} maxLength={12} />
        </label>
        <div className="ns-looks" role="radiogroup" aria-label="Colourway">
          {looks.map((x, i) => <button key={x.handle} type="button" role="radio" aria-checked={i === look} title={x.title} className={i === look ? 'is-on' : ''} onClick={() => setLook(i)} style={{ '--b': x.swatch.body, '--e': x.swatch.edge, '--l': x.swatch.letter } as React.CSSProperties}><span /></button>)}
        </div>
        <button type="button" className="demo-btn ns-go" onClick={go}>{l ? `Make it mine · ${money(l.price)}` : 'Make it mine'}</button>
      </div>
      <div className="ns-scroll" aria-hidden="true"><span />Scroll</div>
    </section>
  );
}
