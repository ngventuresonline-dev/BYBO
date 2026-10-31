/* A pass of moving light over a hero photo: a soft beam that follows the pointer,
   slow caustics, drifting dust and one sweep on arrival. Drawn small and blended over
   the photo with screen, so black adds nothing and the photo stays the picture. */
const frag = /* glsl */ `
precision highp float;
uniform float uTime, uScroll; uniform vec2 uRes, uMouse;
float hash(vec2 p){ return fract(sin(dot(p, vec2(127.1,311.7))) * 43758.5453); }
float noise(vec2 p){ vec2 i=floor(p), f=fract(p); vec2 u=f*f*(3.-2.*f);
  return mix(mix(hash(i),hash(i+vec2(1,0)),u.x), mix(hash(i+vec2(0,1)),hash(i+vec2(1,1)),u.x), u.y); }
void main(){
  vec2 uv = gl_FragCoord.xy/uRes;
  float asp = uRes.x/uRes.y, t = uTime;
  vec2 p = vec2(uv.x*asp, uv.y), m = vec2(uMouse.x*asp, uMouse.y);
  float side = mix(.5, smoothstep(.22,.62,uv.x), step(1.2,asp));
  float beam = exp(-dot(p-m,p-m)*5.2);
  vec2 q = p*2.6 + vec2(t*.05,-t*.03);
  float w = noise(q+noise(q*1.7+t*.08)*2.2);
  float caustic = pow(1.-abs(w*2.-1.),7.);
  vec3 col = vec3(.46,.24,1.)*beam*.34 + vec3(1.,.72,.42)*beam*.12;
  col += mix(vec3(.5,.3,1.),vec3(1.,.66,.36),uv.x)*caustic*(.05+beam*.34);
  for(int l=0;l<3;l++){
    float fl=float(l), sc=7.+fl*5.;
    vec2 g=(p+(uMouse-.5)*(.02+fl*.018))*sc+vec2(sin(t*.09+fl)*.6,-t*(.07+fl*.03));
    vec2 id=floor(g), f=fract(g)-.5;
    float h=hash(id+fl*5.);
    if(h>.72){
      vec2 o=vec2(hash(id+3.),hash(id+7.))*.7-.35;
      col+=vec3(1.,.85,.68)*smoothstep(.055,.0,length(f-o))*(.28+.32*sin(t*.8+h*50.))*(.45+beam*1.5);
    }
  }
  float sweep = smoothstep(.22,.0,abs(uv.x+uv.y*.35-t*.72+.25))*smoothstep(3.,2.,t);
  col += vec3(.62,.46,1.)*sweep*.42;
  col *= side*(1.-uScroll*.7);
  gl_FragColor = vec4(col,1.);
}`;

export function startHeroLight(hero: HTMLElement, live: { x: number; y: number; scroll: number }) {
  const phone = window.innerWidth < 760;
  const canvas = document.createElement('canvas');
  canvas.className = 'rp-hero-light'; canvas.setAttribute('aria-hidden', 'true');
  const gl = canvas.getContext('webgl', { antialias: false, alpha: false, depth: false, stencil: false, powerPreference: 'low-power' });
  if (!gl) return;
  const compile = (type: number, src: string) => { const sh = gl.createShader(type)!; gl.shaderSource(sh, src); gl.compileShader(sh); return sh; };
  const prog = gl.createProgram()!;
  gl.attachShader(prog, compile(gl.VERTEX_SHADER, 'attribute vec2 p; void main(){ gl_Position = vec4(p, 0., 1.); }'));
  gl.attachShader(prog, compile(gl.FRAGMENT_SHADER, frag));
  gl.linkProgram(prog);
  if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) return;
  gl.useProgram(prog);
  gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
  const loc = gl.getAttribLocation(prog, 'p');
  gl.enableVertexAttribArray(loc); gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);
  const u = (n: string) => gl.getUniformLocation(prog, n);
  const uTime = u('uTime'), uRes = u('uRes'), uMouse = u('uMouse'), uScroll = u('uScroll');
  hero.appendChild(canvas);

  const scale = phone ? .35 : .5;
  const resize = () => {
    const w = Math.max(1, Math.round(hero.clientWidth * scale)), h = Math.max(1, Math.round(hero.clientHeight * scale));
    canvas.width = w; canvas.height = h; gl.viewport(0, 0, w, h); gl.uniform2f(uRes, w, h);
  };
  resize();
  window.addEventListener('resize', resize);

  const mouse = { x: live.x, y: live.y };
  let visible = true, raf = 0, last = 0, stopped = false; const start = performance.now();
  const loop = (now: number) => {
    raf = 0;
    if (stopped || !visible || document.hidden) return;
    if (!phone || now - last > 32) {
      last = now;
      mouse.x += (live.x - mouse.x) * .07; mouse.y += (live.y - mouse.y) * .07;
      // No pointer on a phone, so the beam wanders by itself.
      const s = (now - start) / 1000;
      gl.uniform2f(uMouse, phone ? .5 + .3 * Math.sin(s * .3) : mouse.x, phone ? .55 + .22 * Math.cos(s * .23) : 1 - mouse.y);
      gl.uniform1f(uTime, s);
      gl.uniform1f(uScroll, live.scroll);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
    }
    raf = requestAnimationFrame(loop);
  };
  const kick = () => { if (!raf && visible && !document.hidden) raf = requestAnimationFrame(loop); };
  const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; kick(); });
  io.observe(hero);
  document.addEventListener('visibilitychange', kick);
  kick();
  requestAnimationFrame(() => canvas.classList.add('is-on'));

  return () => {
    stopped = true; cancelAnimationFrame(raf); io.disconnect();
    window.removeEventListener('resize', resize); document.removeEventListener('visibilitychange', kick);
    gl.getExtension('WEBGL_lose_context')?.loseContext(); canvas.remove();
  };
}
