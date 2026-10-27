'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';

/* Liquid light: domain-warped noise in the brand palette, nudged by the pointer.
   One full-screen triangle, capped pixel ratio, paused off screen and in background tabs. */
const frag = /* glsl */ `
precision highp float;
uniform float uTime; uniform vec2 uRes; uniform vec2 uMouse;
float hash(vec2 p){ return fract(sin(dot(p, vec2(127.1,311.7))) * 43758.5453); }
float noise(vec2 p){ vec2 i=floor(p), f=fract(p); vec2 u=f*f*(3.-2.*f);
  return mix(mix(hash(i),hash(i+vec2(1,0)),u.x), mix(hash(i+vec2(0,1)),hash(i+vec2(1,1)),u.x), u.y); }
float fbm(vec2 p){ float v=0., a=.5; for(int i=0;i<5;i++){ v+=a*noise(p); p*=2.02; a*=.5; } return v; }
void main(){
  vec2 uv = gl_FragCoord.xy / uRes.xy;
  vec2 p = (gl_FragCoord.xy - .5*uRes.xy) / min(uRes.x,uRes.y);
  float t = uTime * .07;
  vec2 m = (uMouse - .5) * vec2(uRes.x/min(uRes.x,uRes.y), 1.);
  p += (p - m) * .12 * exp(-2.5*length(p - m));           // light bends toward the pointer
  vec2 q = vec2(fbm(p*1.6 + t), fbm(p*1.6 - t + 4.1));
  vec2 r = vec2(fbm(p*1.9 + 3.*q + vec2(1.7,9.2) + t*1.3), fbm(p*1.9 + 3.*q + vec2(8.3,2.8) - t));
  float f = fbm(p*1.4 + 3.2*r);
  vec3 ink = vec3(.043,.039,.063), violet = vec3(.47,.24,1.), lilac = vec3(.77,.66,1.), amber = vec3(.95,.72,.31);
  vec3 col = mix(ink, violet, smoothstep(.25,.85,f));
  col = mix(col, lilac, smoothstep(.62,1.,f*length(q)) * .55);
  col = mix(col, amber, smoothstep(.72,1.05,r.x*f) * .45);
  col *= .55 + .55*smoothstep(1.25, .1, length(p - vec2(.35,.15)));   // vignette, brighter top right
  col = mix(col, ink, smoothstep(.55,.0,uv.y) * .55);                  // darker toward the copy
  col += (hash(gl_FragCoord.xy + uTime) - .5) * .045;                  // grain
  gl_FragColor = vec4(col, 1.);
}`;

export default function HeroShader() {
  const host = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = host.current; if (!el) return;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let renderer: THREE.WebGLRenderer;
    try { renderer = new THREE.WebGLRenderer({ antialias: false, alpha: false, powerPreference: 'high-performance' }); }
    catch { return; } // no WebGL: the CSS gradient underneath stays
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, window.innerWidth < 760 ? 1 : 1.5));
    el.appendChild(renderer.domElement);
    const scene = new THREE.Scene(), cam = new THREE.Camera();
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.Float32BufferAttribute([-1, -1, 0, 3, -1, 0, -1, 3, 0], 3));
    const uni = { uTime: { value: 0 }, uRes: { value: new THREE.Vector2() }, uMouse: { value: new THREE.Vector2(.7, .6) } };
    const mat = new THREE.ShaderMaterial({ vertexShader: 'void main(){ gl_Position = vec4(position,1.); }', fragmentShader: frag, uniforms: uni });
    scene.add(new THREE.Mesh(geo, mat));

    const target = new THREE.Vector2(.7, .6);
    const resize = () => { const w = el.clientWidth, h = el.clientHeight; renderer.setSize(w, h, false); uni.uRes.value.set(w * renderer.getPixelRatio(), h * renderer.getPixelRatio()); };
    const move = (e: PointerEvent) => { const b = el.getBoundingClientRect(); target.set((e.clientX - b.left) / b.width, 1 - (e.clientY - b.top) / b.height); };
    resize();
    window.addEventListener('resize', resize);
    window.addEventListener('pointermove', move, { passive: true });

    let visible = true, raf = 0; const start = performance.now();
    const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; if (visible && !raf && !reduce) raf = requestAnimationFrame(loop); });
    io.observe(el);
    function loop(now: number) {
      raf = 0;
      uni.uTime.value = (now - start) / 1000;
      uni.uMouse.value.lerp(target, .05);
      renderer.render(scene, cam);
      if (visible && !document.hidden) raf = requestAnimationFrame(loop);
    }
    const onVis = () => { if (!document.hidden && visible && !raf && !reduce) raf = requestAnimationFrame(loop); };
    document.addEventListener('visibilitychange', onVis);
    if (reduce) { uni.uTime.value = 12; renderer.render(scene, cam); } else raf = requestAnimationFrame(loop);
    requestAnimationFrame(() => el.classList.add('is-ready'));

    return () => {
      cancelAnimationFrame(raf); io.disconnect();
      window.removeEventListener('resize', resize); window.removeEventListener('pointermove', move);
      document.removeEventListener('visibilitychange', onVis);
      geo.dispose(); mat.dispose(); renderer.dispose(); renderer.domElement.remove();
    };
  }, []);

  return <div ref={host} className="ws-shader" aria-hidden />;
}
