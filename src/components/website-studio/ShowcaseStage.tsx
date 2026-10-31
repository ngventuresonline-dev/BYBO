'use client';

import { useEffect, useRef, type RefObject } from 'react';
import { SHADERS } from './showcase-shaders';

/* The one canvas behind all four concept sites. Plain WebGL, one context, one program
   per site. Programs compile in the background where the browser allows it, so a
   heavy shader never freezes the page. Stops off screen and in background tabs, runs
   at 30 fps on phones and drops resolution on slow GPUs. This file only loads when
   the section comes near the viewport. Until a scene is ready, and on any device
   without WebGL, the CSS poster and the photo underneath stay in place. */

export type StageSignal = { pick: number; pulse: number; demo: { x: number; y: number } | null };

type Prog = { p: WebGLProgram; ready: boolean; u: Record<string, WebGLUniformLocation | null> };

const NAMES = ['uTime', 'uRes', 'uMouse', 'uScroll', 'uPick', 'uPulse'];
const COMPLETION_STATUS_KHR = 0x91B1;

export default function ShowcaseStage({ site, signal, frame, view }: { site: number; signal: RefObject<StageSignal>; frame: RefObject<HTMLDivElement | null>; view: RefObject<HTMLDivElement | null> }) {
  const host = useRef<HTMLDivElement>(null);
  const select = useRef<(i: number) => void>(() => {});

  useEffect(() => {
    const el = host.current, fr = frame.current, vw = view.current;
    if (!el || !fr || !vw) return;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const phone = window.innerWidth < 760;
    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl', { antialias: false, alpha: false, depth: false, stencil: false, powerPreference: phone ? 'low-power' : 'high-performance' });
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

    let scale = phone ? .7 : .8, w = 1, h = 1;
    const resize = () => {
      w = Math.max(1, Math.round(fr.clientWidth * scale)); h = Math.max(1, Math.round(fr.clientHeight * scale));
      canvas.width = w; canvas.height = h; gl.viewport(0, 0, w, h);
    };
    resize();

    const mouse = { x: .5, y: .5 }, target = { x: .5, y: .5 };
    const point = (x: number, y: number) => { const b = fr.getBoundingClientRect(); target.x = x / b.width; target.y = 1 - y / b.height; };
    const move = (e: PointerEvent) => { const b = fr.getBoundingClientRect(); point(e.clientX - b.left, e.clientY - b.top); };
    fr.addEventListener('pointermove', move, { passive: true });
    window.addEventListener('resize', resize);

    let active = -1, scroll = 0, pick = 0, pulse = 0, drawn = -1;
    let visible = true, raf = 0, last = 0, slow = 0, seen = 0;
    const start = performance.now();
    const draw = (now: number) => {
      if (!ready(active)) return false;
      const pr = progs[active]!, sig = signal.current;
      if (sig.demo) { point(sig.demo.x, sig.demo.y); sig.demo = null; }
      if (sig.pulse) { pulse = 1; sig.pulse = 0; }
      const max = vw.scrollHeight - vw.clientHeight;
      const goal = max > 0 ? vw.scrollTop / max : 0;
      const first = drawn !== active;
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
      if (first) { drawn = active; fr.dataset.gl = 'on'; }
      return true;
    };
    const loop = (now: number) => {
      raf = 0;
      if (!visible || document.hidden) return;
      const due = !phone || now - last > 32;
      if (due) {
        const dt = now - last; last = now;
        // Sustained slow frames: draw fewer pixels rather than drop to a slideshow.
        if (dt < 400) { seen++; if (dt > (phone ? 48 : 30)) slow++; }
        if (seen >= 45) { if (slow > 30 && scale > .36) { scale *= .75; resize(); } seen = 0; slow = 0; }
        const ok = draw(now);
        if (reduce && ok) return;
      }
      raf = requestAnimationFrame(loop);
    };
    const kick = () => { if (!raf && visible && !document.hidden) raf = requestAnimationFrame(loop); };

    select.current = i => { active = i; drawn = -1; delete fr.dataset.gl; build(i); kick(); };
    select.current(site);

    const onScroll = () => { if (reduce) kick(); };
    vw.addEventListener('scroll', onScroll, { passive: true });
    const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; kick(); });
    io.observe(fr);
    document.addEventListener('visibilitychange', kick);
    const lost = (e: Event) => { e.preventDefault(); cancelAnimationFrame(raf); visible = false; delete fr.dataset.gl; };
    canvas.addEventListener('webglcontextlost', lost);

    return () => {
      cancelAnimationFrame(raf); io.disconnect();
      fr.removeEventListener('pointermove', move); window.removeEventListener('resize', resize);
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
