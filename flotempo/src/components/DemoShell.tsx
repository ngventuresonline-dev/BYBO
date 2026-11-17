"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Wordmark } from "@/components/Logo";
import { Bike, LayoutDashboard, Smartphone, Info, X } from "lucide-react";

const BASE = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const steps = [
  "Rider books a ride from Koramangala",
  "A captain accepts: tap Accept on the captain phone within 7s, or a nearby simulated captain takes it",
  "Rider reads the start PIN to the captain",
  "Ride starts, moves on the map and ends",
  "Ops sees every step live on the dashboard",
];

const apps = [
  { id: "rider", label: "Rider", sub: "Santosh", icon: Smartphone, src: `${BASE}/rider/` },
  { id: "captain", label: "Captain", sub: "Manjunath · Bike", icon: Bike, src: `${BASE}/captain/` },
  { id: "ops", label: "Ops", sub: "Live city traffic", icon: LayoutDashboard, src: `${BASE}/admin/?sim=1` },
] as const;

/**
 * Wide screens: rider and captain phones beside the ops dashboard.
 * Phones and tablets: one app at a time, full height, switched with tabs. Only the open
 * tab runs; the rider app has its own ride simulation, so a booking still completes.
 */
export function DemoShell() {
  const [tab, setTab] = useState<(typeof apps)[number]["id"]>("rider");
  const [help, setHelp] = useState(false);
  // mount only one layout, so each app (and its simulator) runs once
  const [wide, setWide] = useState<boolean | null>(null);
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1280px)");
    const on = () => setWide(mq.matches);
    on();
    mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, []);

  if (wide === null) return <main className="demo-mobile bg-ink" />;

  return (
    <>
      {/* ---------- phones & tablets ---------- */}
      {!wide && <main className="demo-mobile flex flex-col bg-ink">
        <header className="flex items-center justify-between gap-3 px-4 pb-2 pt-[max(0.75rem,env(safe-area-inset-top))]">
          <Link href="/"><Wordmark size={24} /></Link>
          <button onClick={() => setHelp(!help)} className="flex items-center gap-1.5 rounded-full bg-ink-soft px-3 py-2 text-[12px] font-bold ring-1 ring-line">
            {help ? <X size={14} /> : <Info size={14} />}How it works
          </button>
        </header>
        <nav className="mx-4 mb-2 grid grid-cols-3 gap-1 rounded-2xl bg-ink-soft p-1 ring-1 ring-line">
          {apps.map((a) => (
            <button key={a.id} onClick={() => { setTab(a.id); setHelp(false); }}
              className={`flex items-center justify-center gap-1.5 rounded-xl py-2.5 text-[13px] font-bold transition ${tab === a.id ? "bg-flo text-[#06231A]" : "text-muted"}`}>
              <a.icon size={15} />{a.label}
            </button>
          ))}
        </nav>
        <div className="relative min-h-0 flex-1 overflow-hidden border-t border-line">
          {/* one live app at a time: three WebGL maps at once made phones stutter.
              Rides live in the database, so switching tabs picks the ride back up. */}
          {apps.filter((a) => a.id === tab).map((a) => (
            <iframe key={a.id} src={a.src} title={`${a.label} app`} className="absolute inset-0 h-full w-full" />
          ))}
          {help && (
            <div className="absolute inset-x-3 top-3 z-10 rounded-2xl bg-ink-soft p-4 shadow-xl ring-1 ring-line">
              <Steps />
              <p className="mt-3 text-[12px] text-muted">Switch tabs to play the captain or watch ops. Rides carry on in the background.</p>
            </div>
          )}
        </div>
      </main>}

      {/* ---------- wide screens ---------- */}
      {wide && <main className="min-h-dvh px-6 py-6">
        <div className="mx-auto mb-6 flex max-w-[1500px] items-center justify-between gap-6">
          <Link href="/"><Wordmark size={28} /></Link>
          <Steps inline />
        </div>
        <div className="mx-auto grid max-w-[1500px] grid-cols-[390px_390px_1fr] items-start gap-8">
          {apps.slice(0, 2).map((a) => (
            <div key={a.id} className="flex flex-col items-center gap-3">
              <div className="phone"><iframe src={a.src} title={`${a.label} app`} className="h-full w-full" /></div>
              <div className="text-[11px] uppercase tracking-[0.2em] text-muted">{a.label} · {a.sub}</div>
            </div>
          ))}
          <div className="flex min-w-0 flex-col items-center gap-3">
            <iframe src={apps[2].src} title="Ops dashboard" className="h-[820px] max-h-[88vh] w-full rounded-3xl border border-line bg-ink" />
            <div className="text-[11px] uppercase tracking-[0.2em] text-muted">Operations dashboard · live city traffic</div>
          </div>
        </div>
      </main>}
    </>
  );
}

function Steps({ inline }: { inline?: boolean }) {
  return (
    <ol className={inline ? "flex max-w-[1100px] gap-5 text-[12px] text-muted" : "grid gap-2 text-[13px] leading-snug"}>
      {steps.map((s, i) => (
        <li key={i} className="flex gap-2">
          <b className="grid h-5 w-5 shrink-0 place-items-center rounded-full bg-flo text-[11px] text-[#06231A]">{i + 1}</b>
          <span>{s}</span>
        </li>
      ))}
    </ol>
  );
}
