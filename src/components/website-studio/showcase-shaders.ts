/* Fragment shaders for the four concept sites. Each one is a small real-time scene,
   drawn on a single full-frame triangle, so no 3D library and no model downloads.
   Shared uniforms:
   uScroll  0 to 1 through the concept site, drives the camera
   uMouse   the pointer (or the demo cursor) in 0 to 1
   uPick    what the visitor chose: a floor, a speciality, guests, items in the bag
   uPulse   1 on a confirmed booking or order, then decays */

const head = /* glsl */ `
precision highp float;
uniform float uTime, uScroll, uPick, uPulse; uniform vec2 uRes, uMouse;
float hash(vec2 p){ return fract(sin(dot(p, vec2(127.1,311.7))) * 43758.5453); }
float noise(vec2 p){ vec2 i=floor(p), f=fract(p); vec2 u=f*f*(3.-2.*f);
  return mix(mix(hash(i),hash(i+vec2(1,0)),u.x), mix(hash(i+vec2(0,1)),hash(i+vec2(1,1)),u.x), u.y); }
float fbm(vec2 p){ float v=0., a=.5; for(int i=0;i<3;i++){ v+=a*noise(p); p*=2.03; a*=.5; } return v; }
mat2 rot(float a){ float c=cos(a), s=sin(a); return mat2(c,-s,s,c); }
float smin(float a, float b, float k){ float h=clamp(.5+.5*(b-a)/k,0.,1.); return mix(b,a,h)-k*h*(1.-h); }
float box2(vec2 p, vec2 b){ vec2 q=abs(p)-b; return length(max(q,0.))+min(max(q.x,q.y),0.); }
vec3 grade(vec3 c, vec2 uv){
  c = c/(1.+c*.35);
  c *= 1.-.55*dot(uv-.5,uv-.5);
  return c + (hash(gl_FragCoord.xy+fract(uTime))-.5)*.022;
}
`;

/* Estate: twisting towers rising from a tree canopy at dusk. The camera cranes from
   canopy height to above the roofs, and the towers unwind as it climbs. The floors
   for the chosen home glow. */
const estate = head + /* glsl */ `
float gTwist; vec3 gQ; float gMat, gId;
float tower(vec3 p, vec2 c, float h, float w, float ph, float id, inout float best){
  vec3 q = p-vec3(c.x,0.,c.y);
  q.xz = rot(q.y*gTwist+ph)*q.xz;
  float core = box2(q.xz,vec2(w))-.03;
  float slab = max(box2(q.xz,vec2(w+.07))-.04, abs(mod(q.y,.34)-.17)-.016);
  float d = max(min(core,slab), q.y-h);
  if(d<best){ best=d; gQ=q; gMat=slab<core?1.:0.; gId=id; }
  return d;
}
float map(vec3 p){
  float best=1e3;
  tower(p,vec2(0.,0.),7.,.82,.2,1.,best);
  tower(p,vec2(-2.5,1.3),5.4,.7,1.1,2.,best);
  tower(p,vec2(2.3,-1.2),6.2,.74,2.,3.,best);
  return best;
}
vec3 sky(vec3 rd, float s){
  vec3 zen = mix(vec3(.13,.11,.34),vec3(.025,.03,.1),s);
  vec3 hor = mix(vec3(1.,.56,.32),vec3(.5,.27,.42),s);
  vec3 c = mix(hor,zen,pow(clamp(rd.y+.02,0.,1.),.55));
  c += vec3(1.,.6,.3)*pow(max(dot(rd,normalize(vec3(-.7,.06,-.7))),0.),24.)*.7;
  c += step(.9965,hash(floor(rd.xy*170.)))*s*smoothstep(.05,.3,rd.y)*.7;
  return c;
}
void main(){
  vec2 uv = gl_FragCoord.xy/uRes;
  vec2 p = (gl_FragCoord.xy-.5*uRes)/min(uRes.x,uRes.y*1.05);
  float s = smoothstep(0.,1.,uScroll);
  gTwist = mix(.26,.05,s);
  float a = .62 + s*1.25 + (uMouse.x-.5)*.5 + uTime*.012;
  float R = mix(11.,9.,s);
  vec3 ro = vec3(sin(a)*R, mix(1.05,9.2,s)+(uMouse.y-.5)*.7, cos(a)*R);
  vec3 ta = vec3(0., mix(3.6,5.,s), 0.);
  vec3 f = normalize(ta-ro), r = normalize(cross(vec3(0,1,0),f)), u = cross(f,r);
  vec3 rd = normalize(p.x*r+p.y*u+1.35*f);
  float tp = rd.y<0. ? (.55-ro.y)/rd.y : 1e3;
  float t=.1; bool hit=false;
  for(int i=0;i<52;i++){
    float d=map(ro+rd*t);
    if(d<.0025*t){ hit=true; break; }
    t+=d*.72;
    if(t>32.||t>tp) break;
  }
  vec3 col = sky(rd,s);
  vec3 sun = normalize(vec3(-.7,.22,-.7));
  if(hit && t<tp){
    vec3 h=ro+rd*t; vec2 e=vec2(.004,-.004);
    vec3 n=normalize(e.xyy*map(h+e.xyy)+e.yyx*map(h+e.yyx)+e.yxy*map(h+e.yxy)+e.xxx*map(h+e.xxx));
    map(h);
    vec3 amb = mix(vec3(.22,.2,.42),vec3(.07,.08,.2),s);
    float dif = max(dot(n,sun),0.);
    float floorY = 1.45+uPick*1.75;
    float band = smoothstep(.62,.12,abs(gQ.y-floorY))*step(gId,1.5);
    if(gMat>.5){
      col = vec3(.62,.6,.6)*(amb*1.3+vec3(1.,.62,.38)*dif*.8);
    } else {
      vec2 w = vec2(gQ.x+gQ.z,gQ.y)*vec2(7.,1./.34);
      vec2 id = floor(w);
      float lit = step(.74-s*.2,hash(id+gId*7.3));
      lit *= .8+.2*sin(uTime*.2+hash(id)*40.);
      float pane = smoothstep(.1,.18,fract(w.x))*smoothstep(.1,.18,1.-fract(w.x))*smoothstep(.12,.24,fract(w.y))*smoothstep(.12,.24,1.-fract(w.y));
      vec3 glass = mix(vec3(.05,.07,.15),sky(reflect(rd,n),s)*.55,pow(1.-max(dot(-rd,n),0.),2.));
      col = glass + vec3(1.,.68,.34)*lit*pane*(.75+s*.5);
      col += vec3(1.,.74,.36)*band*pane*(1.2+.3*sin(uTime*2.));
    }
    col += vec3(1.,.72,.36)*band*.12;
    col = mix(col,sky(rd,s),1.-exp(-t*.035));
  } else if(tp<40.){
    vec3 h=ro+rd*tp;
    vec2 q=h.xz*2.6+vec2(uTime*.03,0.);
    float m=fbm(q), m2=fbm(q*3.1+m);
    float crown=smoothstep(.2,.75,m2);
    vec3 leaf = mix(vec3(.012,.04,.03),vec3(.09,.2,.1),crown*m*1.6);
    leaf += vec3(1.,.55,.25)*pow(crown,5.)*mix(.32,.06,s);
    col = mix(leaf,sky(rd,s),1.-exp(-tp*.024));
  }
  col += uPulse*vec3(1.,.72,.36)*.18;
  gl_FragColor = vec4(grade(col,uv),1.);
}`;

/* Clinic: pearl drops drifting apart in soft daylight. With scroll they come together
   into one calm form, and one drop follows the pointer. The speciality shifts the
   light. Kept pale so dark type stays readable on top. */
const clinic = head + /* glsl */ `
vec3 gM;
float map(vec3 p){
  float g = smoothstep(.05,.8,uScroll);
  float r = mix(1.25,.06,g), d = 1e3, t = uTime;
  float breath = 1.+.035*sin(t*1.5)+uPulse*.14;
  for(int i=0;i<6;i++){
    float fi=float(i), a=t*(.16+fi*.035)+fi*1.05;
    vec3 c=vec3(cos(a)*r*(1.+.25*sin(fi*2.1)), sin(a*1.3+fi)*r*.72, sin(a)*r*.55);
    d=smin(d,length(p-c)-(.36+.09*sin(fi*2.7)+g*.42)*breath,.58);
  }
  return smin(d,length(p-gM)-.2,.62);
}
void main(){
  vec2 uv = gl_FragCoord.xy/uRes;
  float s = min(uRes.x,uRes.y);
  vec2 p = (gl_FragCoord.xy-.5*uRes)/s;
  float wide = step(uRes.y*1.15,uRes.x);
  float g = smoothstep(.05,.8,uScroll);
  p -= mix(vec2(0.,mix(.34,.1,g)),vec2(mix(.52,.42,g),0.),wide);
  vec3 ro=vec3(0.,0.,5.6), rd=normalize(vec3(p,-1.95));
  gM = vec3(((uMouse-.5)*uRes/s - mix(vec2(0.,.3),vec2(.38,0.),wide))*3.1,.5);
  vec3 bg = mix(vec3(.95,.975,.955),vec3(.84,.93,.915),uv.y);
  bg += vec3(.05,.03,-.02)*sin(uv.x*3.+uTime*.1);
  vec3 col=bg; float t=2.2, near=1.; bool hit=false;
  for(int i=0;i<40;i++){
    float d=map(ro+rd*t);
    near=min(near,d);
    if(d<.003){ hit=true; break; }
    t+=d*.9; if(t>9.) break;
  }
  if(hit){
    vec3 h=ro+rd*t; vec2 e=vec2(.006,-.006);
    vec3 n=normalize(e.xyy*map(h+e.xyy)+e.yyx*map(h+e.yyx)+e.yxy*map(h+e.yxy)+e.xxx*map(h+e.xxx));
    float fr=pow(1.-max(dot(-rd,n),0.),2.2);
    float shift=uPick*.17;
    vec3 iri=.5+.5*cos(6.283*(fr*.75+n.y*.16+shift+vec3(.42,.56,.68)));
    vec3 l=normalize(vec3(.5,.8,.6));
    float dif=.82+.18*dot(n,l);
    col=mix(vec3(.93,.985,.965)*dif,iri,.16+smoothstep(.15,1.,fr)*.34);
    col+=pow(max(dot(reflect(rd,n),l),0.),36.)*.7;
    col=mix(col,bg,smoothstep(.72,1.,fr)*.75);
  } else {
    col+=vec3(.0,.03,.02)*smoothstep(1.6,.1,length(p));
    col=mix(col,vec3(.84,.95,.91),smoothstep(.09,.0,near)*.45);
  }
  col += uPulse*vec3(.06,.14,.1);
  gl_FragColor=vec4(col+(hash(gl_FragCoord.xy+fract(uTime))-.5)*.012,1.);
}`;

/* Restaurant: a candlelit table in the dark. One flame for every guest, leaning with
   the pointer, reflected in the table, with copper smoke and rising embers. Scroll
   pushes the camera toward the flames. */
const resto = head + /* glsl */ `
float flame(vec2 p, float seed, float wind, float h){
  p.x += (noise(vec2(p.y*7.-uTime*2.4,seed))-.5)*.09*smoothstep(0.,.2,p.y) + wind*p.y*p.y*5.;
  float k = clamp(p.y/h,0.,1.);
  float w = .036*sqrt(k+.02)*pow(1.-k,.8)*2.1;
  return smoothstep(1.15,.25,abs(p.x)/max(w,.0015))*step(0.,p.y)*step(p.y,h);
}
vec3 scene(vec2 p, float fade){
  float wind = (uMouse.x-.5)*.5, n = max(uPick,1.);
  vec3 c = vec3(0.);
  for(int i=0;i<12;i++){
    float fi=float(i), on=smoothstep(fi-.15,fi+.75,uPick);
    if(on<.01) continue;
    float row=mod(fi,2.), sc=1.-row*.2;
    vec2 q=(p-vec2((fi-(n-1.)*.5)*.21,-.1+row*.055))/sc;
    float ph=hash(vec2(fi,3.));
    float h=(.2+.05*sin(uTime*(3.+ph*2.)+ph*9.))*on;
    float fl=flame(q,fi*3.1,wind,h);
    float wax=smoothstep(.024,.02,abs(q.x))*smoothstep(0.,-.005,q.y)*smoothstep(-.3,-.292,q.y);
    float d=length((q-vec2(wind*.03,.08))*vec2(1.,.72));
    float k=q.y/max(h,.01);
    c+=mix(vec3(1.,.42,.12),vec3(1.,.9,.62),smoothstep(.65,.05,k))*fl*1.7*on;
    c+=vec3(1.,.5,.2)*.0028/(d*d+.012)*on;
    c+=vec3(.68,.56,.42)*wax*(.2+.6*smoothstep(-.2,0.,q.y))*on;
  }
  return c*fade;
}
void main(){
  vec2 uv = gl_FragCoord.xy/uRes;
  vec2 p = (gl_FragCoord.xy-.5*uRes)/min(uRes.x,uRes.y);
  float s = smoothstep(0.,1.,uScroll), t = uTime;
  p /= mix(1.,1.65,s);
  p.y += mix(-.1,.03,s);
  p.x -= (uMouse.x-.5)*.04 + step(uRes.y*1.15,uRes.x)*.36*s;
  float tbl = -.3;
  vec2 q = p*1.4+vec2(0.,-t*.05);
  vec2 w = vec2(fbm(q+t*.03),fbm(q*1.2-t*.025));
  float sm = fbm(q*1.1+w*1.9);
  vec3 col = mix(vec3(.014,.009,.008),vec3(.3,.12,.05),sm*sm*(.5+.45*s));
  col += scene(p,1.);
  if(p.y<tbl){
    vec2 m=vec2(p.x+(noise(p*34.)-.5)*.018,2.*tbl-p.y);
    col = col*.22+vec3(.03,.014,.01)+scene(m,.34)*smoothstep(-.8,tbl,p.y);
  }
  for(int l=0;l<3;l++){
    float fl=float(l);
    vec2 g=p*(5.+fl*3.5); g.y-=t*(.42+fl*.16); g.x+=sin(g.y*.7+fl*2.)*.4;
    vec2 id=floor(g), f=fract(g)-.5;
    float h=hash(id+fl*9.);
    if(h>.8-s*.1){
      vec2 o=vec2(hash(id+1.),hash(id+2.))*.7-.35;
      float e=.0016/(dot(f-o,f-o)+.0016);
      col+=vec3(1.,.48,.16)*e*(.5+.5*sin(t*3.+h*40.))*smoothstep(tbl,tbl+.2,p.y)*.9;
    }
  }
  col += uPulse*vec3(.4,.17,.05)*smoothstep(1.3,.1,length(p));
  gl_FragColor = vec4(grade(col,uv),1.);
}`;

/* Store: one glass bottle turning in a studio. Scroll spins and tilts it through the
   page, and every item in the bag raises the serum inside. */
const store = head + /* glsl */ `
float rb(vec2 p, vec2 b, float r){ vec2 q=abs(p)-b+r; return length(max(q,0.))+min(max(q.x,q.y),0.)-r; }
mat3 gR; float gCap;
float map(vec3 p){
  p = gR*p;
  vec2 q = vec2(length(vec2(p.x,p.z*1.5)),p.y);
  float body = rb(q-vec2(0.,-.26),vec2(.56,.82),.17);
  float neck = rb(vec2(length(p.xz),p.y)-vec2(0.,.68),vec2(.17,.16),.02);
  float cap = rb(vec2(length(p.xz),p.y)-vec2(0.,1.),vec2(.22,.23),.035);
  float d = smin(body,neck,.09);
  gCap = cap<d?1.:0.;
  return min(d,cap);
}
vec3 env(vec3 d){
  vec3 c = mix(vec3(.2,.1,.2),vec3(.95,.66,.56),smoothstep(-.7,.9,d.y));
  c += smoothstep(.5,.62,d.x)*smoothstep(.75,.3,abs(d.y))*vec3(1.5,1.35,1.25);
  c += smoothstep(.72,.8,-d.x)*smoothstep(.5,.1,abs(d.y))*vec3(.7,.5,.7);
  return c;
}
void main(){
  vec2 uv = gl_FragCoord.xy/uRes;
  float mn = min(uRes.x,uRes.y);
  vec2 p = (gl_FragCoord.xy-.5*uRes)/mn;
  float wide = step(uRes.y*1.15,uRes.x);
  float s = smoothstep(0.,1.,uScroll);
  vec2 off = mix(vec2(0.,mix(.22,.14,s)),vec2(mix(.48,0.,s),mix(.02,.14,s)),wide);
  vec2 c = p-off;
  float a = uScroll*7.2+.5+(uMouse.x-.5)*1.3+uTime*.1;
  float b = sin(uScroll*3.14)*.42+(uMouse.y-.5)*.25;
  float ca=cos(a), sa=sin(a), cb=cos(b), sb=sin(b);
  gR = mat3(ca,0.,sa, 0.,1.,0., -sa,0.,ca)*mat3(cb,sb,0., -sb,cb,0., 0.,0.,1.);
  vec3 ro = vec3(0.,0.,6.2), rd = normalize(vec3(c,-mix(2.15,1.8,s)));
  vec3 bg = mix(vec3(.17,.08,.17),vec3(.93,.61,.5),smoothstep(-.2,1.1,uv.y+uv.x*.3));
  bg = mix(bg,vec3(.09,.05,.11),smoothstep(.2,.95,length(p-off*.7)));
  float pool = length((c-vec2(0.,-.66))*vec2(1.,3.));
  bg += vec3(1.,.5,.35)*smoothstep(.62,.05,pool)*(.25+.14*sin(pool*22.-uTime*1.4));
  vec3 col=bg; float t=3.6; bool hit=false;
  for(int i=0;i<44;i++){
    float d=map(ro+rd*t);
    if(d<.002){ hit=true; break; }
    t+=d*.85; if(t>9.) break;
  }
  if(hit){
    vec3 h=ro+rd*t; vec2 e=vec2(.004,-.004);
    vec3 n=normalize(e.xyy*map(h+e.xyy)+e.yyx*map(h+e.yyx)+e.yxy*map(h+e.yxy)+e.xxx*map(h+e.xxx));
    map(h);
    float fr=pow(1.-max(dot(-rd,n),0.),3.);
    vec3 r=reflect(rd,n);
    if(gCap>.5){
      col=vec3(.07,.05,.08)+env(r)*.28+pow(max(r.x,0.),8.)*.5;
    } else {
      vec3 rf=refract(rd,n,.72), in1=gR*(h+rf*.42);
      float level=mix(-.12,.46,clamp(uPick/4.,0.,1.))+.05*sin(in1.x*6.+uTime*2.)*(uPulse+.2);
      float liquid=smoothstep(level+.012,level-.012,in1.y);
      vec3 behind=mix(bg,env(rf),.22)*.8;
      vec3 serum=mix(vec3(1.,.56,.18),vec3(.62,.11,.1),clamp(.42-in1.y*.55+dot(rf.xy,rf.xy)*.3,0.,1.));
      col=mix(behind,serum*(.7+.8*max(dot(n,vec3(.3,.6,.7)),0.)),liquid*.97);
      float meniscus=smoothstep(.03,0.,abs(in1.y-level));
      col+=vec3(1.,.8,.6)*meniscus*.4;
      vec3 lp=gR*h;
      float lab=smoothstep(.01,0.,abs(lp.y+.3)-.34)*smoothstep(.0,.05,lp.z);
      col=mix(col,vec3(.96,.92,.86),lab*.9);
      float tx=smoothstep(.06,.03,abs(lp.y+.23))*smoothstep(.34,.3,abs(lp.x));
      col=mix(col,vec3(.17,.1,.17),lab*tx*step(.45,fract(lp.x*18.)));
      col+=env(r)*(fr*1.1+.05);
    }
  }
  col += uPulse*vec3(.5,.26,.16)*smoothstep(1.2,.1,length(c));
  gl_FragColor=vec4(grade(col,uv),1.);
}`;

export const SHADERS = [estate, clinic, resto, store];
