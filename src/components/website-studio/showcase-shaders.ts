/* Fragment shaders for the eight concept sites. Each is a small real-time scene drawn
   on one full-frame triangle at full device resolution, so nothing here may depend on
   being scaled up. Three rules keep them sharp and cheap:
   - Every edge is drawn from its distance in pixels (see `cov`), never with step().
   - Fine detail fades to its average once it is smaller than a pixel, so it can't shimmer.
   - 3D objects sit inside a bounding shape, so empty sky costs nothing.
   Shared uniforms:
   uScroll  0 to 1 through the concept site, drives the camera
   uMouse   the pointer (or the demo cursor) in 0 to 1
   uPick    what the visitor chose
   uPulse   1 on a confirmed booking or order, then decays */

const head = /* glsl */ `
precision highp float;
uniform float uTime, uScroll, uPick, uPulse; uniform vec2 uRes, uMouse;
float hash(vec2 p){ vec3 q=fract(vec3(p.xyx)*.1031); q+=dot(q,q.yzx+33.33); return fract((q.x+q.y)*q.z); }
float noise(vec2 p){ vec2 i=floor(p), f=fract(p); vec2 u=f*f*f*(f*(f*6.-15.)+10.);
  return mix(mix(hash(i),hash(i+vec2(1,0)),u.x), mix(hash(i+vec2(0,1)),hash(i+vec2(1,1)),u.x), u.y); }
// fbm that drops any octave finer than the pixel footprint fp.
float fbm(vec2 p, float fp){ float v=0., a=.5, f=1.;
  for(int i=0;i<5;i++){ v+=a*mix(.5,noise(p*f),smoothstep(.7,.2,f*fp)); f*=2.03; a*=.5; } return v; }
mat2 rot(float a){ float c=cos(a), s=sin(a); return mat2(c,-s,s,c); }
float smin(float a, float b, float k){ float h=clamp(.5+.5*(b-a)/k,0.,1.); return mix(b,a,h)-k*h*(1.-h); }
float box2(vec2 p, vec2 b){ vec2 q=abs(p)-b; return length(max(q,0.))+min(max(q.x,q.y),0.); }
// Coverage of a shape from its signed distance d, for a pixel of size w.
float cov(float d, float w){ return clamp(.5-d/max(w,1e-5),0.,1.); }
vec2 sphere(vec3 ro, vec3 rd, float r){ float b=dot(ro,rd), c=dot(ro,ro)-r*r, h=b*b-c;
  if(h<0.) return vec2(-1.); h=sqrt(h); return vec2(-b-h,-b+h); }
vec3 grade(vec3 c, vec2 uv){
  c = c/(1.+c*.35);
  c *= 1.-.5*dot(uv-.5,uv-.5);
  return c + (hash(gl_FragCoord.xy+fract(uTime)*91.)-.5)/128.; // dither, so gradients never band
}
`;

/* Northwood: twisting towers rising from a tree canopy at dusk. The camera cranes from
   canopy height to above the roofs and the towers unwind as it climbs. Floors and
   windows are drawn on the surface with analytic edges. The chosen home's floors glow. */
const estate = head + /* glsl */ `
float gTwist; vec3 gQ; float gId;
void tower(vec3 p, vec2 c, float h, float w, float ph, float id, inout float best){
  vec3 q = p-vec3(c.x,0.,c.y);
  q.xz = rot(q.y*gTwist+ph)*q.xz;
  float d = max(box2(q.xz,vec2(w))-.05, q.y-h);
  if(d<best){ best=d; gQ=q; gId=id; }
}
float map(vec3 p){
  float best=1e3;
  tower(p,vec2(0.,0.),7.,.82,.2,1.,best);
  tower(p,vec2(-2.5,1.3),5.4,.7,1.1,2.,best);
  tower(p,vec2(2.3,-1.2),6.2,.74,2.,3.,best);
  return best;
}
vec3 sky(vec3 rd, float s, float pxa){
  vec3 zen = mix(vec3(.13,.11,.34),vec3(.025,.03,.1),s);
  vec3 hor = mix(vec3(1.,.56,.32),vec3(.5,.27,.42),s);
  vec3 c = mix(hor,zen,pow(clamp(rd.y+.02,0.,1.),.55));
  c += vec3(1.,.6,.3)*pow(max(dot(rd,normalize(vec3(-.7,.06,-.7))),0.),24.)*.7;
  if(s>.2 && rd.y>.02){
    vec2 g=rd.xz/(rd.y+.35)*46., id=floor(g);
    float h=hash(id);
    if(h>.82){ vec2 o=vec2(hash(id+1.),hash(id+2.))*.6+.2;
      c+=cov(length(fract(g)-o)-.035,pxa*46.)*s*(.4+h*.5); }
  }
  return c;
}
void main(){
  float mn=min(uRes.x,uRes.y*1.05);
  vec2 uv = gl_FragCoord.xy/uRes, p = (gl_FragCoord.xy-.5*uRes)/mn;
  float s = smoothstep(0.,1.,uScroll), foc=1.35, pxa=1./(mn*foc);
  gTwist = mix(.26,.05,s);
  float a = .62 + s*1.25 + (uMouse.x-.5)*.5 + uTime*.012;
  float R = mix(11.,9.,s);
  vec3 ro = vec3(sin(a)*R, mix(1.05,9.2,s)+(uMouse.y-.5)*.7, cos(a)*R);
  vec3 ta = vec3(0., mix(3.6,5.,s), 0.);
  vec3 f = normalize(ta-ro), r = normalize(cross(vec3(0,1,0),f)), u = cross(f,r);
  vec3 rd = normalize(p.x*r+p.y*u+foc*f);
  float tp = rd.y<0. ? (.55-ro.y)/rd.y : 1e3;
  vec3 col = sky(rd,s,pxa);
  if(tp<1e3){
    vec3 h=ro+rd*tp;
    float fp=tp*pxa/max(-rd.y,.012)*2.6;
    vec2 q=h.xz*2.6+vec2(uTime*.02,0.);
    float m=fbm(q*.45,fp*.45), n=fbm(q+m*2.,fp);
    float crown=smoothstep(.34,.66,n);
    vec3 leaf=mix(vec3(.012,.04,.03),vec3(.09,.2,.1),crown*m*1.7);
    leaf+=vec3(1.,.55,.25)*pow(crown,4.)*mix(.2,.04,s);
    col=mix(leaf,col,1.-exp(-tp*.024));
  }
  // Bounding cylinder around the towers: anything outside skips the march.
  float A=dot(rd.xz,rd.xz), B=dot(ro.xz,rd.xz), C=dot(ro.xz,ro.xz)-19.4, D=B*B-A*C;
  if(D>0.){
    D=sqrt(D);
    float t=max((-B-D)/A,.1), end=min((-B+D)/A,tp), best=1e3, bt=t;
    for(int i=0;i<44;i++){
      float d=map(ro+rd*t), k=d/(t*pxa);
      if(k<best){ best=k; bt=t; }
      if(k<.35||t>end) break;
      t+=d*.82;
    }
    float c=clamp((1.25-best)/.9,0.,1.);
    if(c>0.){
      t=bt;
      vec3 h=ro+rd*t; vec2 e=vec2(.0025,-.0025);
      vec3 n=normalize(e.xyy*map(h+e.xyy)+e.yyx*map(h+e.yyx)+e.yxy*map(h+e.yxy)+e.xxx*map(h+e.xxx));
      map(h);
      vec3 sun=normalize(vec3(-.7,.22,-.7));
      vec3 amb=mix(vec3(.22,.2,.42),vec3(.07,.08,.2),s);
      float dif=max(dot(n,sun),0.), fp=t*pxa/max(dot(-rd,n),.14);
      vec3 concrete=vec3(.62,.6,.6)*(amb*1.3+vec3(1.,.62,.38)*dif*.8);
      vec3 shade=concrete;
      if(n.y<.7){
        vec2 ab=abs(gQ.xz);
        float uu=ab.x>ab.y?gQ.z:gQ.x, ph=.34, cw=.15;
        float y=gQ.y/ph, x=uu/cw, fy=fract(y)-.5;
        float dS=(.5-abs(fy))*ph, dX=(.5-abs(fract(x)-.5))*cw;
        vec2 id=vec2(floor(x)+(ab.x>ab.y?40.:0.),floor(y));
        float slab=1.-smoothstep(.018-fp,.018+fp,dS);
        float pane=smoothstep(.011-fp,.011+fp,dX)*smoothstep(.042-fp,.042+fp,dS);
        float far=smoothstep(.012,.04,fp);
        pane=mix(pane,.58,far);
        float lit=mix(step(.72-s*.2,hash(id+gId*7.3))*(.8+.2*sin(uTime*.2+hash(id)*40.)),.34+s*.12,far);
        vec3 glass=mix(vec3(.05,.07,.15),sky(reflect(rd,n),s,pxa)*.55,pow(1.-max(dot(-rd,n),0.),2.));
        glass*=mix(.55,1.,smoothstep(.0,.13,(.5-fy)*ph));
        vec3 win=glass+vec3(1.,.68,.34)*lit*(.75+s*.5);
        float fl=1.45+uPick*1.75;
        float band=smoothstep(.62,.12,abs(gQ.y-fl))*(1.-smoothstep(1.4,1.6,gId));
        win+=vec3(1.,.74,.36)*band*(1.15+.25*sin(uTime*2.));
        shade=mix(mix(concrete*.72,win,pane),concrete*1.12,slab);
        shade+=vec3(1.,.72,.36)*band*.1;
      }
      shade=mix(shade,sky(rd,s,pxa),1.-exp(-t*.035));
      col=mix(col,shade,c);
    }
  }
  col += uPulse*vec3(1.,.72,.36)*.18;
  gl_FragColor = vec4(grade(col,uv),1.);
}`;

/* Sage Clinic: pearl drops drifting apart in soft daylight. With scroll they come
   together into one calm form, and one drop follows the pointer. Pale on purpose, so
   dark type stays readable on top. */
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
  float mn = min(uRes.x,uRes.y), foc=1.95, pxa=1./(mn*foc);
  vec2 p = (gl_FragCoord.xy-.5*uRes)/mn;
  float wide = step(uRes.y*1.15,uRes.x);
  float g = smoothstep(.05,.8,uScroll);
  vec2 off = mix(vec2(0.,mix(.34,.1,g)),vec2(mix(.52,.42,g),0.),wide);
  p -= off;
  vec3 ro=vec3(0.,0.,5.6), rd=normalize(vec3(p,-foc));
  gM = vec3(((uMouse-.5)*uRes/mn-off)*3.1,.5);
  vec3 bg = mix(vec3(.95,.975,.955),vec3(.84,.93,.915),uv.y);
  bg += vec3(.05,.03,-.02)*sin(uv.x*3.+uTime*.1);
  bg += vec3(.0,.03,.02)*smoothstep(1.6,.1,length(p));
  vec3 col=bg;
  vec2 b=sphere(ro,rd,3.3);
  if(b.x>0.){
    float t=b.x, best=1e3, bt=t;
    for(int i=0;i<34;i++){
      float d=map(ro+rd*t), k=d/(t*pxa);
      if(k<best){ best=k; bt=t; }
      if(k<.35||t>b.y) break;
      t+=d*.92;
    }
    float c=clamp((1.25-best)/.9,0.,1.);
    if(c>0.){
      vec3 h=ro+rd*bt; vec2 e=vec2(.004,-.004);
      vec3 n=normalize(e.xyy*map(h+e.xyy)+e.yyx*map(h+e.yyx)+e.yxy*map(h+e.yxy)+e.xxx*map(h+e.xxx));
      float fr=pow(1.-max(dot(-rd,n),0.),2.2);
      vec3 iri=.5+.5*cos(6.283*(fr*.75+n.y*.16+uPick*.17+vec3(.42,.56,.68)));
      vec3 l=normalize(vec3(.5,.8,.6));
      float dif=.82+.18*dot(n,l);
      vec3 s=mix(vec3(.93,.985,.965)*dif,iri,.16+smoothstep(.15,1.,fr)*.34);
      s+=pow(max(dot(reflect(rd,n),l),0.),36.)*.7;
      s=mix(s,bg,smoothstep(.72,1.,fr)*.75);
      col=mix(col,s,c);
    }
  }
  col += uPulse*vec3(.06,.14,.1);
  gl_FragColor=vec4(col+(hash(gl_FragCoord.xy+fract(uTime)*91.)-.5)/128.,1.);
}`;

/* Tamarind House: a candlelit table in the dark. One flame for every guest, leaning
   with the pointer, reflected in the table, with copper smoke and rising embers. */
const resto = head + /* glsl */ `
float flame(vec2 p, float seed, float wind, float h, float px){
  p.x += (noise(vec2(p.y*7.-uTime*2.4,seed))-.5)*.09*smoothstep(0.,.2,p.y) + wind*p.y*p.y*5.;
  float k = clamp(p.y/h,0.,1.);
  float w = .076*sqrt(k+.02)*pow(1.-k,.8);
  return smoothstep(w*1.15+px,w*.25,abs(p.x))*smoothstep(-px,px,p.y)*smoothstep(h+px,h-px,p.y);
}
vec3 scene(vec2 p, float px){
  float wind = (uMouse.x-.5)*.5, n = max(uPick,1.);
  vec3 c = vec3(0.);
  for(int i=0;i<12;i++){
    float fi=float(i), on=smoothstep(fi-.15,fi+.75,uPick);
    if(on<.01) continue;
    float row=mod(fi,2.), sc=1.-row*.2;
    vec2 q=(p-vec2((fi-(n-1.)*.5)*.21,-.1+row*.055))/sc;
    float ph=hash(vec2(fi,3.));
    float h=(.2+.05*sin(uTime*(3.+ph*2.)+ph*9.))*on;
    float fl=flame(q,fi*3.1,wind,h,px);
    float wax=cov(box2(q-vec2(0.,-.15),vec2(.022,.148))-.003,px);
    float d=length((q-vec2(wind*.03,.08))*vec2(1.,.72));
    float k=q.y/max(h,.01);
    c+=mix(vec3(1.,.42,.12),vec3(1.,.9,.62),smoothstep(.65,.05,k))*fl*1.7*on;
    c+=vec3(1.,.5,.2)*.0028/(d*d+.012)*on;
    c+=vec3(.68,.56,.42)*wax*(.2+.6*smoothstep(-.2,0.,q.y))*on;
    c+=vec3(1.,.8,.5)*cov(length((q+vec2(0.,.004))*vec2(1.,2.2))-.021,px)*on*.4;
  }
  return c;
}
void main(){
  float mn=min(uRes.x,uRes.y);
  vec2 uv = gl_FragCoord.xy/uRes, p = (gl_FragCoord.xy-.5*uRes)/mn;
  float s = smoothstep(0.,1.,uScroll), t = uTime, zoom=mix(1.,1.65,s), px=1./(mn*zoom);
  p /= zoom;
  p.y += mix(-.1,.03,s);
  p.x -= (uMouse.x-.5)*.04 + step(uRes.y*1.15,uRes.x)*.36*s;
  float tbl = -.3;
  vec2 q = p*1.4+vec2(0.,-t*.05);
  vec2 w = vec2(fbm(q+t*.03,px),fbm(q*1.2-t*.025,px));
  float sm = fbm(q*1.1+w*1.9,px);
  vec3 col = mix(vec3(.014,.009,.008),vec3(.3,.12,.05),sm*sm*(.5+.45*s));
  vec3 fg = scene(p,px);
  float above = smoothstep(tbl-px,tbl+px,p.y);
  vec3 under = col*.22+vec3(.03,.014,.01);
  if(above<1.){
    float rip=.004*sin(p.y*90.+t*.6+sin(p.x*16.)*1.4);
    under += scene(vec2(p.x+rip,2.*tbl-p.y),px*2.)*.34*smoothstep(-.8,tbl,p.y);
  }
  col = mix(under,col+fg,above);
  for(int l=0;l<3;l++){
    float fl=float(l);
    vec2 g=p*(5.+fl*3.5); g.y-=t*(.42+fl*.16); g.x+=sin(g.y*.7+fl*2.)*.4;
    vec2 id=floor(g), f=fract(g)-.5;
    float h=hash(id+fl*9.);
    if(h>.8-s*.1){
      vec2 o=vec2(hash(id+1.),hash(id+2.))*.5-.25;
      float r=length(f-o);
      float e=.0016/(r*r+.0016)*smoothstep(.25,.05,r);
      col+=vec3(1.,.48,.16)*e*(.5+.5*sin(t*3.+h*40.))*smoothstep(tbl,tbl+.2,p.y)*.9;
    }
  }
  col += uPulse*vec3(.4,.17,.05)*smoothstep(1.3,.1,length(p));
  gl_FragColor = vec4(grade(col,uv),1.);
}`;

/* Lumen: one glass bottle turning in a studio. Scroll spins and tilts it through the
   page, and every item in the bag raises the serum inside. The label is a real
   high-resolution texture with mipmaps, so its type stays crisp at any angle. */
const store = head + /* glsl */ `
uniform sampler2D uTex;
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
  float s = smoothstep(0.,1.,uScroll), foc=mix(2.15,1.8,s), pxa=1./(mn*foc);
  vec2 off = mix(vec2(0.,mix(.22,.14,s)),vec2(mix(.48,0.,s),mix(.02,.14,s)),wide);
  vec2 c = p-off;
  float a = uScroll*7.2+.5+(uMouse.x-.5)*1.3+uTime*.1;
  float b = sin(uScroll*3.14)*.42+(uMouse.y-.5)*.25;
  float ca=cos(a), sa=sin(a), cb=cos(b), sb=sin(b);
  gR = mat3(ca,0.,sa, 0.,1.,0., -sa,0.,ca)*mat3(cb,sb,0., -sb,cb,0., 0.,0.,1.);
  vec3 ro = vec3(0.,0.,6.2), rd = normalize(vec3(c,-foc));
  vec3 bg = mix(vec3(.17,.08,.17),vec3(.93,.61,.5),smoothstep(-.2,1.1,uv.y+uv.x*.3));
  bg = mix(bg,vec3(.09,.05,.11),smoothstep(.2,.95,length(p-off*.7)));
  float pool = length((c-vec2(0.,-.42))*vec2(1.,3.));
  bg += vec3(1.,.5,.35)*smoothstep(.5,.05,pool)*(.25+.14*sin(pool*22.-uTime*1.4));
  vec3 col=bg;
  vec2 bs=sphere(ro,rd,1.75);
  if(bs.x>0.){
    float t=bs.x, best=1e3, bt=t;
    for(int i=0;i<38;i++){
      float d=map(ro+rd*t), k=d/(t*pxa);
      if(k<best){ best=k; bt=t; }
      if(k<.35||t>bs.y) break;
      t+=d*.88;
    }
    float cv=clamp((1.25-best)/.9,0.,1.);
    if(cv>0.){
      vec3 h=ro+rd*bt; vec2 e=vec2(.0025,-.0025);
      vec3 n=normalize(e.xyy*map(h+e.xyy)+e.yyx*map(h+e.yyx)+e.yxy*map(h+e.yxy)+e.xxx*map(h+e.xxx));
      map(h);
      float fr=pow(1.-max(dot(-rd,n),0.),3.), fp=bt*pxa/max(dot(-rd,n),.2);
      vec3 r=reflect(rd,n), sh;
      if(gCap>.5){
        sh=vec3(.07,.05,.08)+env(r)*.28+pow(max(r.x,0.),8.)*.5;
      } else {
        vec3 rf=refract(rd,n,.72), in1=gR*(h+rf*.42);
        float level=mix(-.12,.46,clamp(uPick/4.,0.,1.))+.05*sin(in1.x*6.+uTime*2.)*(uPulse+.2);
        float liquid=smoothstep(level+fp,level-fp,in1.y);
        vec3 behind=mix(bg,env(rf),.22)*.8;
        vec3 serum=mix(vec3(1.,.56,.18),vec3(.62,.11,.1),clamp(.42-in1.y*.55+dot(rf.xy,rf.xy)*.3,0.,1.));
        sh=mix(behind,serum*(.7+.8*max(dot(n,vec3(.3,.6,.7)),0.)),liquid*.97);
        sh+=vec3(1.,.8,.6)*smoothstep(.03,0.,abs(in1.y-level))*.4;
        vec3 lp=gR*h;
        float ang=atan(lp.x,lp.z*1.5), dU=(.84-abs(ang))*.5, dV=.36-abs(lp.y+.3);
        float lab=clamp(min(dU,dV)/fp+.5,0.,1.);
        if(lab>0.) sh=mix(sh,texture2D(uTex,vec2(ang/1.68+.5,(lp.y+.66)/.72)).rgb*(.72+.3*max(dot(n,vec3(.4,.5,.76)),0.)),lab);
        sh+=env(r)*(fr*1.1+.05);
      }
      col=mix(col,sh,cv);
    }
  }
  col += uPulse*vec3(.5,.26,.16)*smoothstep(1.2,.1,length(c));
  gl_FragColor=vec4(grade(col,uv),1.);
}`;

/* Lantern Academy: a night sky drawn like a chalk proof. Scroll joins the stars one
   line at a time. The subject turns the figure. Pure distance fields, so every line is
   as crisp as vector art. */
const school = head + /* glsl */ `
vec2 node(float i, vec2 m){
  float h=hash(vec2(i,7.)), r=.14+.62*fract(h*7.3), a=i*2.399+uPick*.8+uTime*.012;
  vec2 q=vec2(cos(a),sin(a))*r*vec2(1.18,.82)+vec2(sin(uTime*.2+i)*.008,cos(uTime*.17+i)*.008);
  vec2 d=q-m; return q+d*.11*exp(-dot(d,d)*16.);
}
float seg(vec2 p, vec2 a, vec2 b){ vec2 pa=p-a, ba=b-a; return length(pa-ba*clamp(dot(pa,ba)/dot(ba,ba),0.,1.)); }
void main(){
  float mn=min(uRes.x,uRes.y), px=1./mn;
  vec2 uv=gl_FragCoord.xy/uRes, p=(gl_FragCoord.xy-.5*uRes)/mn;
  float wide=step(uRes.y*1.15,uRes.x);
  vec2 off=mix(vec2(0.,.2),vec2(.36,0.),wide);
  vec2 m=(uMouse-.5)*uRes/mn-off;
  p-=off;
  p*=rot(uScroll*.5);
  vec3 col=mix(vec3(.03,.05,.13),vec3(.07,.1,.24),smoothstep(-.8,.8,p.y+.3));
  col+=vec3(.16,.13,.32)*smoothstep(.95,.1,length(p));
  vec3 chalk=vec3(.96,.92,.8), gold=vec3(1.,.74,.36);
  for(int i=1;i<5;i++){
    float r=float(i)*.17, d=abs(length(p)-r);
    float dash=smoothstep(-.1,.1,sin(atan(p.y,p.x)*float(i*24)+uTime*.1*float(i)));
    col+=chalk*.1*cov(d-px*.6,px)*mix(1.,dash,.7);
  }
  float span=3.2+uScroll*12.+uPulse*2.;
  for(int i=0;i<15;i++){
    float fi=float(i);
    vec2 a=node(fi,m), b=node(fi+1.,m);
    float f=clamp(span-fi,0.,1.);
    if(f>0.){
      vec2 e=mix(a,b,f);
      float d=seg(p,a,e);
      col+=chalk*.8*cov(d-px*.75,px);
      col+=gold*.0009/(d*d+.0009)*.09;
    }
    float d=length(p-a), lit=smoothstep(-.3,.6,span-fi);
    col+=gold*.0016/(d*d+.0016)*(.12+.3*lit);
    col+=mix(chalk*.4,chalk,lit)*cov(d-.0065,px);
    col+=chalk*.4*lit*cov(abs(d-.018-.003*sin(uTime*1.4+fi))-px*.55,px);
  }
  col += uPulse*gold*.14*smoothstep(1.,.1,length(p));
  gl_FragColor=vec4(grade(col,uv),1.);
}`;

/* Ironline: flying down a hexagonal tunnel of light. Scroll is the throttle and the
   chosen class sets the colour. Rings are drawn from exact distance and fade to their
   average as they recede, so the vanishing point never shimmers. */
const gym = head + /* glsl */ `
void main(){
  float mn=min(uRes.x,uRes.y), px=1./mn;
  vec2 uv=gl_FragCoord.xy/uRes, p=(gl_FragCoord.xy-.5*uRes)/mn;
  float wide=step(uRes.y*1.15,uRes.x);
  p-=mix(vec2(0.,.16),vec2(.38,0.),wide)+(uMouse-.5)*vec2(.16,.1);
  p=rot(uScroll*1.6+uTime*.03)*p;
  vec2 a=abs(p);
  float r=max(a.y,a.x*.866+a.y*.5);                      // hexagon distance
  float t=uTime, z=.24/max(r,.002), speed=t*.5+uScroll*14.;
  float fp=z/max(r,.002)*px;
  float beat=.5+.5*sin(t*3.2);
  float k=uPick;
  vec3 hue=mix(mix(mix(vec3(1.,.2,.08),vec3(1.,.72,.05),clamp(k,0.,1.)),vec3(1.,.08,.3),clamp(k-1.,0.,1.)),vec3(.1,.8,1.),clamp(k-2.,0.,1.));
  float zz=z*2.2+speed, f=abs(fract(zz)-.5), w=.016;
  float fw=fp*2.2;
  float ring=smoothstep(w+fw,w-fw,f)*min(1.,w*2.4/max(fw,1e-4));
  float zb=z*.55+speed*.25, fb=abs(fract(zb)-.5), wb=.008, fwb=fp*.55;
  float thick=smoothstep(wb+fwb,wb-fwb,fb)*min(1.,wb*2.4/max(fwb,1e-4));
  float ang=atan(p.y,p.x)/1.0472, seam=abs(fract(ang)-.5), sw=px/max(r,.01)/1.0472;
  float edge=smoothstep(.006+sw,.006-sw,seam)*min(1.,.02/max(sw,1e-4));
  float depth=exp(-z*.34);
  vec3 col=vec3(.012,.01,.014)+hue*.018*depth;
  col+=hue*ring*depth*(.75+beat*.25)*1.3;
  col+=mix(hue,vec3(1.),.35)*thick*depth*2.;
  col+=hue*edge*depth*.5;
  col+=hue*.03/(1.+z*.5)*smoothstep(.0,.7,r);
  col+=vec3(1.,.9,.8)*.012/(r*r+.012)*.3;
  col*=.75+.25*smoothstep(.0,.6,r);
  col+=uPulse*hue*.3;
  gl_FragColor=vec4(grade(col,uv),1.);
}`;

/* Stillwater: a calm lake at first light. The surface is a sum of smooth waves with
   the fine ones dropped by distance, a ring spreads from the pointer, and scroll tilts
   the view from the shore out to open sky. */
const spa = head + /* glsl */ `
vec3 sky(vec2 q, float H, float px, float tint){
  float y=max(q.y-H,0.);
  vec3 low=mix(vec3(1.,.62,.42),vec3(.96,.56,.66),tint), high=mix(vec3(.04,.24,.3),vec3(.1,.13,.36),tint);
  vec3 c=mix(low,high,pow(clamp(y*2.4,0.,1.),.7));
  float d=length(q-vec2(-.22,H+.1));
  c+=vec3(1.,.8,.62)*.05/(d*d*7.+.05)*.42;
  return mix(c,vec3(1.,.94,.82),cov(d-.052,px));
}
void main(){
  float mn=min(uRes.x,uRes.y), px=1./mn;
  vec2 uv=gl_FragCoord.xy/uRes, p=(gl_FragCoord.xy-.5*uRes)/mn;
  float s=smoothstep(0.,1.,uScroll), t=uTime, H=mix(.3,.12,s)*uRes.y/mn, tint=clamp(uPick/3.,0.,1.);
  p.x+=(uMouse.x-.5)*.03;
  vec3 col=sky(p,H,px,tint);
  float hill=H+.035+.1*fbm(vec2(p.x*2.4+3.,1.),px*2.4)-.05+.04*sin(p.x*1.7+1.);
  float hill2=H+.012+.06*fbm(vec2(p.x*5.+9.,4.),px*5.)-.03;
  col=mix(col,mix(vec3(.2,.26,.36),col,.4),cov(p.y-hill,px));
  col=mix(col,vec3(.08,.2,.24),cov(p.y-hill2,px));
  float dy=H-p.y;
  if(dy>-px){
    float dd=max(dy,.003), z=.42/dd, fp=z/dd*px;
    vec2 w=vec2(p.x*z,z);
    vec2 g=vec2(0.);
    float f=3.;
    for(int i=0;i<8;i++){
      float fi=float(i), a=fi*2.4+.6;
      vec2 dir=vec2(cos(a),sin(a));
      float ph=dot(w,dir)*f+t*(.5+fi*.12);
      g+=dir*cos(ph)*smoothstep(.55,.12,f*fp)*.9;
      f*=1.42;
    }
    vec2 mw=vec2((uMouse.x-.5)*uRes.x/mn*(.42/max(H-(uMouse.y-.5)*uRes.y/mn,.04)),.42/max(H-(uMouse.y-.5)*uRes.y/mn,.04));
    vec2 rv=w-mw; float rl=length(rv)+.001;
    g+=rv/rl*cos(rl*11.-t*3.4)*exp(-rl*.5)*(.5+uPulse*3.)*smoothstep(.5,.1,11.*fp);
    vec3 n=normalize(vec3(g.x*.05,1.,g.y*.05+.012));
    vec2 q=vec2(p.x+n.x*.9,H+dd*.42+abs(n.z)*.62);
    float fres=.1+.9*pow(1.-clamp(dd*1.5,0.,1.),3.);
    vec3 deep=mix(vec3(.01,.13,.16),vec3(.03,.08,.2),tint);
    vec3 water=mix(deep,sky(q,H,px*4.,tint),fres*.78+.04);
    water+=vec3(1.,.86,.7)*pow(max(1.-length(vec2(p.x+.22+n.x*2.8,n.z*11.))*1.45,0.),3.)*.75;
    col=mix(col,water,clamp(dy/px+.5,0.,1.));
  }
  col+=uPulse*vec3(.1,.08,.06);
  gl_FragColor=vec4(grade(col,uv),1.);
}`;

/* Ridgeline Retreat: ranges of hills fading into the distance from afternoon to night.
   Each ridge is a sharp silhouette. The pointer shifts them at their own depths, scroll
   sets the sun, and each night of the stay brings out more stars. */
const hotel = head + /* glsl */ `
float ridge(float x, float px, float amp){
  float v=0., a=.5, f=1.;
  for(int i=0;i<6;i++){
    float n=noise(vec2(x*f,float(i)*7.));
    v+=a*mix(.5,1.-abs(n*2.-1.),smoothstep(.5,.15,f*px)); f*=2.1; a*=.48;
  }
  return v*amp;
}
void main(){
  float mn=min(uRes.x,uRes.y), px=1./mn;
  vec2 uv=gl_FragCoord.xy/uRes, p=(gl_FragCoord.xy-.5*uRes)/mn;
  float s=smoothstep(0.,1.,uScroll), t=uTime, top=.5*uRes.y/mn;
  float night=smoothstep(.45,.95,s), dusk=smoothstep(.0,.6,s)*(1.-night);
  vec3 hi=mix(mix(vec3(.3,.52,.74),vec3(.25,.2,.46),dusk),vec3(.02,.03,.09),night);
  vec3 lo=mix(mix(vec3(.96,.86,.68),vec3(1.,.5,.27),dusk),vec3(.09,.09,.2),night);
  float y=clamp(p.y/top*.5+.5,0.,1.);
  vec3 col=mix(lo,hi,pow(y,.8));
  vec2 sun=vec2(.3,mix(.32,-.5,s)*top*2.);
  float d=length(p-sun);
  col+=vec3(1.,.74,.45)*.04/(d*d*9.+.04)*.55*(1.-night);
  col=mix(col,vec3(1.,.93,.78),cov(d-.062,px)*(1.-night));
  vec2 mo=vec2(-.36,top*.62);
  col=mix(col,vec3(.93,.92,.86),cov(length(p-mo)-.042,px)*night*(1.-cov(length(p-mo-vec2(.016,.008))-.04,px)));
  float vis=night*.3+night*clamp(uPick/7.,0.,1.)*.7;
  if(vis>.01){
    for(int l=0;l<2;l++){
      float sc=26.+float(l)*26.;
      vec2 g=p*sc, id=floor(g);
      float h=hash(id+float(l)*5.);
      if(h>.62){ vec2 o=vec2(hash(id+1.),hash(id+2.))*.6+.2;
        col+=vec3(.9,.92,1.)*cov(length(fract(g)-o)-(.03+h*.03),px*sc)*vis*(.6+.4*sin(t*2.+h*60.)); }
    }
  }
  for(int i=0;i<6;i++){
    float fi=float(i), k=fi/5.;
    float par=(uMouse.x-.5)*(.02+k*.1)+s*(.08+k*.3);
    float base=mix(.16,-.34,k)*top*2.;
    if(p.y>base+.2) continue;                // above the tallest peak of this ridge
    float h=base+ridge((p.x+par)*(1.3+k*1.5)+fi*9.3,px*(1.3+k*1.5),mix(.2,.3,k))-.12;
    vec3 far=mix(mix(vec3(.62,.72,.82),vec3(.8,.5,.46),dusk),vec3(.09,.1,.2),night);
    vec3 near=mix(mix(vec3(.06,.16,.12),vec3(.1,.06,.12),dusk),vec3(.012,.016,.035),night);
    vec3 r=mix(far,near,pow(k,.8));
    float m=exp(-max(h-p.y,0.)*mix(5.,1.5,k));
    r=mix(r,mix(r,col,.3),m*(1.-k)*.6);
    float cv=cov(p.y-h,px);
    col=mix(col,r,cv);
    if(i<5 && abs(p.y-h+.09)<.16){
      float mist=fbm(vec2(p.x*2.+t*.02+fi,p.y*7.-fi),px*7.);
      col=mix(col,mix(lo,far,.4),smoothstep(.45,.75,mist)*smoothstep(.16,.0,abs(p.y-h+.09))*.26);
    }
  }
  col+=uPulse*vec3(.35,.24,.14)*(1.-night*.5);
  gl_FragColor=vec4(grade(col,uv),1.);
}`;

export const SHADERS = [estate, clinic, resto, store, school, gym, spa, hotel];
export const STORE_SCENE = 3;
