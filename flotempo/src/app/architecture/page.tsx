import Link from "next/link";
import { Wordmark } from "@/components/Logo";

export const metadata = { title: "Flo Tempo — architecture" };

const C = { ink: "#0A1017", soft: "#131B25", line: "#2A3746", flo: "#00D08A", tempo: "#FFC53D", sky: "#4DA3FF", surge: "#FF5A3C", text: "#EAF2F7", muted: "#8597A8" };

function Box({ x, y, w, h, title, sub, color = C.line }: { x: number; y: number; w: number; h: number; title: string; sub?: string; color?: string }) {
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} rx={14} fill={C.soft} stroke={color} strokeWidth={1.5} />
      <text x={x + w / 2} y={y + (sub ? h / 2 - 4 : h / 2 + 5)} textAnchor="middle" fill={C.text} fontSize={14} fontWeight={700}>{title}</text>
      {sub && <text x={x + w / 2} y={y + h / 2 + 14} textAnchor="middle" fill={C.muted} fontSize={11}>{sub}</text>}
    </g>
  );
}
function Arrow({ d, color = C.muted, label, lx, ly }: { d: string; color?: string; label?: string; lx?: number; ly?: number }) {
  return (
    <g>
      <path d={d} fill="none" stroke={color} strokeWidth={1.5} markerEnd="url(#ah)" />
      {label && <text x={lx} y={ly} fill={C.muted} fontSize={10.5} textAnchor="middle">{label}</text>}
    </g>
  );
}

const states = [
  ["searching", "Rider requests · dispatch waves to nearest 3 captains, 20s each, radius widens"],
  ["accepted", "First captain to accept wins (row lock) · others superseded"],
  ["arrived", "Captain at pickup · rider shown 4-digit PIN"],
  ["ongoing", "PIN verified · GPS pings every 2–4s"],
  ["completed", "Fare recomputed on actual km/min · commission & ledger posted"],
];

const stack = [
  ["Rider & Captain apps", "React Native (Expo) — one codebase, iOS + Android. Background location (captain), push via FCM/APNs, deep links."],
  ["Ops dashboard", "Next.js on Vercel — role-based access (ops, finance, support, city lead)."],
  ["API & dispatch", "Postgres functions now; NestJS service at scale. Redis GEO for sub-10ms nearest-captain lookups."],
  ["Realtime", "Supabase Realtime / WebSockets for trip state, offers, live location."],
  ["Database", "Postgres + PostGIS, Mumbai region (data residency in India)."],
  ["Maps", "Google Maps Platform — Places autocomplete, Directions, ETA. MapLibre fallback to control cost."],
  ["Payments", "Razorpay — UPI intent, cards, wallet; Route for captain payouts; cash with commission-due ledger."],
  ["Identity & KYC", "Phone OTP (MSG91) · DL/RC/Aadhaar/PAN verification via DigiLocker / KYC provider · face match at go-online."],
  ["Safety", "SOS to ops desk + emergency contact, trip share link, call masking (Exotel), women-rider preference."],
  ["Observability", "Sentry, PostHog product analytics, uptime alerts, audit log on every admin change."],
];

export default function Architecture() {
  return (
    <main className="mx-auto max-w-6xl px-5 py-10">
      <div className="flex items-center justify-between"><Link href="/"><Wordmark size={30} /></Link><Link href="/demo" className="text-sm font-bold text-flo">Live demo →</Link></div>
      <h1 className="mt-10 text-4xl font-extrabold tracking-tight">How Flo Tempo works</h1>
      <p className="mt-3 max-w-2xl text-muted">Three client apps on one realtime backend. The prototype you can click runs this exact flow on a live database.</p>

      <section className="mt-10 overflow-x-auto rounded-3xl bg-ink-soft/40 p-4 ring-1 ring-line">
        <svg viewBox="0 0 1000 560" className="min-w-[860px]" fontFamily="Inter, sans-serif">
          <defs><marker id="ah" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0 0L10 5L0 10z" fill={C.muted} /></marker></defs>
          <text x={20} y={30} fill={C.muted} fontSize={11} letterSpacing={2}>CLIENTS</text>
          <Box x={20} y={45} w={260} h={70} title="Rider app" sub="React Native · iOS / Android" color={C.flo} />
          <Box x={370} y={45} w={260} h={70} title="Captain app" sub="React Native · background GPS" color={C.tempo} />
          <Box x={720} y={45} w={260} h={70} title="Ops dashboard" sub="Next.js · web" color={C.sky} />

          <text x={20} y={185} fill={C.muted} fontSize={11} letterSpacing={2}>EDGE</text>
          <Box x={20} y={200} w={960} h={54} title="API gateway · auth (phone OTP, JWT) · rate limits" />
          <Arrow d="M150 115 V198" /><Arrow d="M500 115 V198" /><Arrow d="M850 115 V198" />

          <text x={20} y={300} fill={C.muted} fontSize={11} letterSpacing={2}>CORE SERVICES</text>
          <Box x={20} y={315} w={180} h={66} title="Trips" sub="state machine" />
          <Box x={215} y={315} w={180} h={66} title="Dispatch" sub="geo-match · waves" color={C.flo} />
          <Box x={410} y={315} w={180} h={66} title="Pricing" sub="fare cards · surge" color={C.surge} />
          <Box x={605} y={315} w={180} h={66} title="Payments" sub="ledger · payouts" />
          <Box x={800} y={315} w={180} h={66} title="Realtime" sub="websockets · push" color={C.sky} />
          {[110, 305, 500, 695, 890].map((x) => <Arrow key={x} d={`M${x} 254 V313`} />)}

          <text x={20} y={430} fill={C.muted} fontSize={11} letterSpacing={2}>DATA</text>
          <Box x={20} y={445} w={300} h={60} title="Postgres + PostGIS" sub="trips · captains · ledger · audit" />
          <Box x={350} y={445} w={300} h={60} title="Redis GEO" sub="live captain positions · offer timers" />
          <Box x={680} y={445} w={300} h={60} title="Object storage" sub="KYC documents · encrypted" />
          <Arrow d="M110 381 V443" /><Arrow d="M305 381 L500 443" /><Arrow d="M695 381 L170 443" />

          <text x={20} y={545} fill={C.muted} fontSize={11}>External: Google Maps · Razorpay · MSG91 OTP · FCM/APNs · DigiLocker/KYC · Exotel call masking</text>
        </svg>
      </section>

      <section className="mt-12 grid gap-8 md:grid-cols-2">
        <div>
          <h2 className="text-2xl font-extrabold">Trip lifecycle</h2>
          <ol className="mt-5 space-y-3">
            {states.map(([s, d], i) => (
              <li key={s} className="flex gap-4">
                <div className="flex flex-col items-center"><div className="grid h-8 w-8 place-items-center rounded-full bg-flo/15 text-sm font-extrabold text-flo">{i + 1}</div>{i < states.length - 1 && <div className="w-px flex-1 bg-line" />}</div>
                <div className="pb-2"><div className="font-mono text-sm font-bold">{s}</div><div className="text-sm text-muted">{d}</div></div>
              </li>
            ))}
          </ol>
          <p className="mt-3 text-[13px] text-muted">Exit states: <span className="font-mono">cancelled_rider</span>, <span className="font-mono">cancelled_captain</span>, <span className="font-mono">no_captain</span> (90s without acceptance).</p>
        </div>
        <div>
          <h2 className="text-2xl font-extrabold">Money flow per trip</h2>
          <div className="mt-5 space-y-3 text-sm">
            <div className="rounded-2xl bg-ink-soft p-4 ring-1 ring-line"><b>Fare</b> = max(min fare, (base + km beyond included × ₹/km + min × ₹/min) × surge) + platform fee + GST (cab)</div>
            <div className="rounded-2xl bg-ink-soft p-4 ring-1 ring-line"><b className="text-flo">Prepaid (UPI/card/wallet):</b> Flo Tempo collects → captain wallet credited fare − commission → weekly or instant payout.</div>
            <div className="rounded-2xl bg-ink-soft p-4 ring-1 ring-line"><b className="text-tempo">Cash:</b> captain keeps cash → wallet debited commission → below −₹300, cash rides are locked until dues are paid.</div>
            <div className="rounded-2xl bg-ink-soft p-4 ring-1 ring-line"><b>Example (live):</b> Koramangala → Indiranagar, bike, 6.0 km, 1.4× surge → ₹113 · commission ₹22.60 · captain ₹90.40.</div>
          </div>
        </div>
      </section>

      <section className="mt-12">
        <h2 className="text-2xl font-extrabold">Production stack</h2>
        <div className="mt-5 grid gap-3 md:grid-cols-2">
          {stack.map(([k, v]) => <div key={k} className="rounded-2xl bg-ink-soft p-4 ring-1 ring-line"><div className="font-bold">{k}</div><div className="mt-1 text-sm text-muted">{v}</div></div>)}
        </div>
      </section>
    </main>
  );
}
