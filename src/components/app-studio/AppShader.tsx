'use client';

import { useEffect, useRef } from 'react';

/* Aurora: four ribbons of light drifting on noise, with curtains falling beneath them,
   bent toward the pointer. Plain WebGL (no library): one full-screen triangle drawn at
   reduced resolution and scaled up, since the light is soft. Paused off screen and in
   background tabs, and capped at 30 fps on phones. */
const frag = /* glsl */ `
precision highp float;
uniform float uTime; uniform vec2 uRes; uniform vec2 uMouse;
float hash(vec2 p){ return fract(sin(dot(p, vec2(127.1,311.7))) * 43758.5453); }
float noise(vec2 p){ vec2 i=floor(p), f=fract(p); vec2 u=f*f*(3.-2.*f);
  return mix(mix(hash(i),hash(i+vec2(1,0)),u.x), mix(hash(i+vec2(0,1)),hash(i+vec2(1,1)),u.x), u.y); }
float fbm(vec2 p){ float v=0., a=.5; for(int i=0;i<4;i++){ v+=a*noise(p); p*=2.03; a*=.5; } return v; }
vec3 hue(int i){
  if(i==0) return vec3(.49,.95,.83);   // mint
  if(i==1) return vec3(.36,.45,1.);    // electric blue
  if(i==2) return vec3(.58,.38,1.);    // violet
  return vec3(1.,.48,.85);             // pink
}
void main(){
  vec2 uv = gl_FragCoord.xy / uRes.xy;
  float s = min(uRes.x, uRes.y);
  vec2 p = (gl_FragCoord.xy - .5*uRes.xy) / s;
  vec2 m = (uMouse - .5) * uRes.xy / s;
  float t = uTime * .11;
  vec3 col = vec3(.022,.03,.048);
  for(int i=0;i<4;i++){
    float fi = float(i);
    float n = fbm(vec2(p.x*1.1 + t*(.7+fi*.18) + fi*3.7, fi*2.3 + t*.4));
    float y = .32 - fi*.13 + (n-.5)*.75 + .07*sin(p.x*2.2 + t*2.4 + fi*1.9);
    y += (m.y - y) * .3 * exp(-3.5*abs(p.x - m.x));                 // the pointer pulls the ribbons
    float d = p.y - y;
    vec3 c = hue(i);
    col += c * (.006 / (abs(d) + .006)) * .16;                       // the bright edge
    float rays = .55 + .45*fbm(vec2(p.x*9. + fi*5., t*1.5));
    col += c * smoothstep(-.42, 0., d) * step(d, 0.) * rays * .16;   // the curtain beneath it
  }
  col *= .45 + .75*smoothstep(1.3, .1, length(p - vec2(.45,.12)));  // brighter toward the phone
  col = mix(col, vec3(.022,.03,.048), smoothstep(.5,.0,uv.y) * .6);  // darker under the copy
  col += (hash(gl_FragCoord.xy + uTime) - .5) * .04;                 // grain
  gl_FragColor = vec4(col, 1.);
}`;

export default function AppShader() {
  const host = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = host.current; if (!el) return;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const phone = window.innerWidth < 760;
    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl', { antialias: false, alpha: false, depth: false, stencil: false, powerPreference: phone ? 'low-power' : 'high-performance' });
    if (!gl) return; // no WebGL: the CSS gradient underneath stays
    const shader = (type: number, src: string) => { const sh = gl.createShader(type)!; gl.shaderSource(sh, src); gl.compileShader(sh); return sh; };
    const prog = gl.createProgram()!;
    gl.attachShader(prog, shader(gl.VERTEX_SHADER, 'attribute vec2 p; void main(){ gl_Position = vec4(p, 0., 1.); }'));
    gl.attachShader(prog, shader(gl.FRAGMENT_SHADER, frag));
    gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) return;
    gl.useProgram(prog);
    gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    const loc = gl.getAttribLocation(prog, 'p');
    gl.enableVertexAttribArray(loc); gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);
    const uTime = gl.getUniformLocation(prog, 'uTime'), uRes = gl.getUniformLocation(prog, 'uRes'), uMouse = gl.getUniformLocation(prog, 'uMouse');
    el.appendChild(canvas);

    const scale = phone ? .5 : .75; // soft light survives being drawn small and scaled up
    const mouse = { x: .72, y: .62 }, target = { x: .72, y: .62 };
    const resize = () => {
      const w = Math.max(1, Math.round(el.clientWidth * scale)), h = Math.max(1, Math.round(el.clientHeight * scale));
      canvas.width = w; canvas.height = h; gl.viewport(0, 0, w, h); gl.uniform2f(uRes, w, h);
    };
    const move = (e: PointerEvent) => { const b = el.getBoundingClientRect(); target.x = (e.clientX - b.left) / b.width; target.y = 1 - (e.clientY - b.top) / b.height; };
    resize();
    window.addEventListener('resize', resize);
    window.addEventListener('pointermove', move, { passive: true });

    let visible = true, raf = 0, last = 0; const start = performance.now();
    const frame = (now: number) => {
      gl.uniform1f(uTime, (now - start) / 1000);
      mouse.x += (target.x - mouse.x) * .04; mouse.y += (target.y - mouse.y) * .04;
      gl.uniform2f(uMouse, mouse.x, mouse.y);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
    };
    function loop(now: number) {
      raf = 0;
      if (!phone || now - last > 32) { last = now; frame(now); }
      if (visible && !document.hidden) raf = requestAnimationFrame(loop);
    }
    const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; if (visible && !raf && !reduce) raf = requestAnimationFrame(loop); });
    io.observe(el);
    const onVis = () => { if (!document.hidden && visible && !raf && !reduce) raf = requestAnimationFrame(loop); };
    document.addEventListener('visibilitychange', onVis);
    if (reduce) frame(start + 9000); else raf = requestAnimationFrame(loop);
    requestAnimationFrame(() => el.classList.add('is-ready'));

    return () => {
      cancelAnimationFrame(raf); io.disconnect();
      window.removeEventListener('resize', resize); window.removeEventListener('pointermove', move);
      document.removeEventListener('visibilitychange', onVis);
      gl.getExtension('WEBGL_lose_context')?.loseContext(); canvas.remove();
    };
  }, []);

  return <div ref={host} className="as-shader" aria-hidden />;
}
