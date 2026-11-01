'use client';

import { useEffect, useRef, type RefObject } from 'react';
import { SHADERS, STORE_SCENE } from './showcase-shaders';

/* The one canvas behind all eight concept sites. Plain WebGL, one context, one program
   per site, and only the active one draws. The buffer always matches the canvas pixel
   for pixel (device pixel ratio, capped at 2), because anything less shows as blocks.
   Only if a device sustains slow frames does it step down, and never below one buffer
   pixel per CSS pixel. Programs compile in the background where the browser allows it,
   so a heavy shader never freezes the page. Stops off screen and in background tabs,
   runs at 30 fps on phones. This file only loads when the section comes near the
   viewport. Until a scene is ready, and on any device without WebGL, the CSS poster
   and the photo underneath stay in place. */

export type StageSignal = { pick: number; pulse: number; demo: { x: number; y: number } | null };

type Prog = { p: WebGLProgram; ready: boolean; u: Record<string, WebGLUniformLocation | null> };

const NAMES = ['uTime', 'uRes', 'uMouse', 'uScroll', 'uPick', 'uPulse'];
const COMPLETION_STATUS_KHR = 0x91B1;

/* The serum label: real type on a canvas, so it can be mipmapped and stay crisp. */
function drawLabel(font: string) {
  const c = document.createElement('canvas'); c.width = c.height = 1024;
  const x = c.getContext('2d')!;
  x.fillStyle = '#f5ebdc'; x.fillRect(0, 0, 1024, 1024);
  x.fillStyle = '#2b1320'; x.textAlign = 'center';
  x.font = `600 230px ${font}`; x.fillText('lumen', 512, 470);
  x.fillRect(372, 540, 280, 5);
  x.font = `italic 400 84px ${font}`; x.fillText('Clear Day', 512, 660);
  x.fillText('Serum', 512, 755);
  return c;
}

export default function ShowcaseStage({ site, signal, frame, view }: { site: number; signal: RefObject<StageSignal>; frame: RefObject<HTMLDivElement | null>; view: RefObject<HTMLDivElement | null> }) {
  const host = useRef<HTMLDivElement>(null);
  const select = useRef<(i: number) => void>(() => {});

  useEffect(() => {
    const el = host.current, fr = frame.current, vw = view.current;
    if (!el || !fr || !vw) return;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const phone = window.innerWidth < 760;
    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl', { antialias: false, alpha: false, depth: false, stencil: false, powerPreference: 'high-performance' });
    if (!gl) return;
    const parallel = gl.getExtension('KHR_parallel_shader_compile');
    const compile = (type: number, src: string) => { const sh = gl.createShader(type)!; gl.shaderSource(sh, src); gl.compileShader(sh); return sh; };
    const vert = compile(gl.VERTEX_SHADER, 'attribute vec2 p; void main(){ gl_Position = vec4(p, 0., 1.); }');
    gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    gl.enableVertexAttribArray(0); gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0);
    el.appendChild(canvas);

    const progs: (Prog | null | undefined)[] = [];
    const build = (i: number) => {
      if (progs[i] !== undefined) return;
      const p = gl.createProgram()!;
      gl.attachShader(p, vert);
      gl.attachShader(p, compile(gl.FRAGMENT_SHADER, SHADERS[i]));
      gl.bindAttribLocation(p, 0, 'p');
      gl.linkProgram(p);
      progs[i] = { p, ready: false, u: {} };
    };
    const ready = (i: number) => {
      const pr = progs[i]; if (!pr) return false;
      if (pr.ready) return true;
      if (parallel && !gl.getProgramParameter(pr.p, COMPLETION_STATUS_KHR)) return false;
      if (!gl.getProgramParameter(pr.p, gl.LINK_STATUS)) { progs[i] = null; return false; }
      for (const n of NAMES) pr.u[n] = gl.getUniformLocation(pr.p, n);
      pr.ready = true;
      return true;
    };

    let label: WebGLTexture | null = null;
    const loadLabel = () => {
      const family = getComputedStyle(fr).getPropertyValue('--sc-display').trim();
      const paint = () => {
        label = label ?? gl.createTexture();
        gl.bindTexture(gl.TEXTURE_2D, label);
        gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, drawLabel(family ? `${family}, Georgia, serif` : 'Georgia, serif'));
        gl.generateMipmap(gl.TEXTURE_2D);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_LINEAR);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
        const ani = gl.getExtension('EXT_texture_filter_anisotropic');
        if (ani) gl.texParameterf(gl.TEXTURE_2D, ani.TEXTURE_MAX_ANISOTROPY_EXT, 8);
      };
      paint();
      document.fonts?.ready.then(() => { if (!gl.isContextLost()) paint(); });
    };

    // Buffer size follows the canvas exactly. tier 0 is full resolution.
    const TIERS = [1, .75, .5];
    let tier = 0, w = 1, h = 1, cssW = 1, cssH = 1, exact: [number, number] | null = null;
    const fit = () => {
      const dpr = window.devicePixelRatio || 1, cap = Math.min(dpr, 2);
      const ratio = Math.max(1, cap * TIERS[tier]);
      const tw = Math.round(cssW * ratio), th = Math.round(cssH * ratio);
      // Trust the exact device size only when it agrees, so a fractional scale lands on real pixels.
      const sure = exact && Math.abs(exact[0] - tw) <= 2 && Math.abs(exact[1] - th) <= 2;
      w = Math.max(1, sure ? exact![0] : tw); h = Math.max(1, sure ? exact![1] : th);
      if (canvas.width !== w || canvas.height !== h) { canvas.width = w; canvas.height = h; gl.viewport(0, 0, w, h); }
      drawn = -1;
    };
    const ro = new ResizeObserver(([e]) => {
      cssW = e.contentRect.width; cssH = e.contentRect.height;
      const px = e.devicePixelContentBoxSize?.[0];
      exact = px ? [px.inlineSize, px.blockSize] : null;
      fit(); kick();
    });

    const mouse = { x: .5, y: .5 }, target = { x: .5, y: .5 };
    const point = (x: number, y: number) => { const b = fr.getBoundingClientRect(); target.x = x / b.width; target.y = 1 - y / b.height; };
    const move = (e: PointerEvent) => { const b = fr.getBoundingClientRect(); point(e.clientX - b.left, e.clientY - b.top); };
    fr.addEventListener('pointermove', move, { passive: true });

    let active = -1, scroll = 0, pick = 0, pulse = 0, drawn = -1, ever = -1;
    let visible = true, raf = 0, last = 0, slow = 0, seen = 0;
    const start = performance.now();
    const draw = (now: number) => {
      if (!ready(active)) return false;
      const pr = progs[active]!, sig = signal.current;
      if (sig.demo) { point(sig.demo.x, sig.demo.y); sig.demo = null; }
      if (sig.pulse) { pulse = 1; sig.pulse = 0; }
      const max = vw.scrollHeight - vw.clientHeight;
      const goal = max > 0 ? vw.scrollTop / max : 0;
      const first = ever !== active;
      scroll = first || reduce ? goal : scroll + (goal - scroll) * .09;
      pick = first ? sig.pick : pick + (sig.pick - pick) * .08;
      mouse.x += (target.x - mouse.x) * .06; mouse.y += (target.y - mouse.y) * .06;
      pulse *= .955;
      vw.style.setProperty('--mx', (mouse.x - .5).toFixed(3));
      vw.style.setProperty('--my', (.5 - mouse.y).toFixed(3));
      gl.useProgram(pr.p);
      gl.uniform1f(pr.u.uTime, (now - start) / 1000);
      gl.uniform2f(pr.u.uRes, w, h);
      gl.uniform2f(pr.u.uMouse, mouse.x, mouse.y);
      gl.uniform1f(pr.u.uScroll, scroll);
      gl.uniform1f(pr.u.uPick, pick);
      gl.uniform1f(pr.u.uPulse, pulse);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
      drawn = active;
      if (first) { ever = active; fr.dataset.gl = 'on'; }
      return true;
    };
    const loop = (now: number) => {
      raf = 0;
      if (!visible || document.hidden) return;
      const due = !phone || now - last > 32;
      if (due) {
        const dt = now - last; last = now;
        if (ever === active && dt < 400) { seen++; if (dt > (phone ? 48 : 26)) slow++; }
        if (seen >= 50) {
          if (slow > 34 && tier < TIERS.length - 1 && !reduce) { tier++; fit(); fr.dataset.tier = String(tier); }
          seen = 0; slow = 0;
        }
        const ok = draw(now);
        if (reduce && ok) return;
      }
      raf = requestAnimationFrame(loop);
    };
    function kick() { if (!raf && visible && !document.hidden) raf = requestAnimationFrame(loop); }

    select.current = i => {
      active = i; ever = -1; delete fr.dataset.gl; seen = 0; slow = 0;
      if (tier) { tier = 0; fit(); } // each scene gets the best its device can hold
      build(i); if (i === STORE_SCENE && !label) loadLabel();
      kick();
    };
    try { ro.observe(canvas, { box: 'device-pixel-content-box' }); } catch { ro.observe(canvas); }
    select.current(site);

    const onScroll = () => { if (reduce) kick(); };
    vw.addEventListener('scroll', onScroll, { passive: true });
    const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; kick(); });
    io.observe(fr);
    document.addEventListener('visibilitychange', kick);
    const lost = (e: Event) => { e.preventDefault(); cancelAnimationFrame(raf); visible = false; delete fr.dataset.gl; };
    canvas.addEventListener('webglcontextlost', lost);

    return () => {
      cancelAnimationFrame(raf); io.disconnect(); ro.disconnect();
      fr.removeEventListener('pointermove', move);
      vw.removeEventListener('scroll', onScroll);
      document.removeEventListener('visibilitychange', kick);
      canvas.removeEventListener('webglcontextlost', lost);
      select.current = () => {};
      delete fr.dataset.gl;
      gl.getExtension('WEBGL_lose_context')?.loseContext(); canvas.remove();
    };
    // Mounts once; `site` changes go through select below.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => { select.current(site); }, [site]);

  return <div ref={host} className="ws-sc-gl" aria-hidden />;
}
