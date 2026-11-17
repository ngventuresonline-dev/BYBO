import Link from "next/link";
import { Wordmark } from "@/components/Logo";
import { ArrowRight, Smartphone, Bike, LayoutDashboard, Network } from "lucide-react";

const apps = [
  { href: "/rider", icon: Smartphone, title: "Rider app", body: "Book a bike, EV bike, auto or cab. Live fare with surge, UPI/cash/wallet, live tracking, start PIN, SOS, trip share, ratings.", tag: "iOS + Android" },
  { href: "/captain", icon: Bike, title: "Captain app", body: "Duty toggle, 20-second ride offers, navigation, PIN-verified start, cash/prepaid settlement, wallet ledger with negative-balance lock.", tag: "iOS + Android" },
  { href: "/admin", icon: LayoutDashboard, title: "Operations dashboard", body: "Live city map, trip feed, KPIs, captain KYC approvals, fare cards and surge zones editable without an app release, SOS desk.", tag: "Web" },
];

export default function Home() {
  return (
    <main className="mx-auto max-w-6xl px-5 py-10 md:py-16">
      <div className="flex items-center justify-between"><Wordmark size={34} /><span className="text-[12px] text-muted">Prototype · v0.1</span></div>
      <h1 className="mt-14 max-w-3xl text-4xl font-extrabold leading-[1.05] tracking-tight md:text-6xl">
        Bengaluru, at <span className="text-flo">your tempo.</span>
      </h1>
      <p className="mt-5 max-w-2xl text-lg text-muted">
        Three apps, one live backend. Book on the rider app, accept on the captain app, watch it land on the ops dashboard — in real time, on a real database.
      </p>
      <div className="mt-8 flex flex-wrap gap-3">
        <Link href="/demo" className="inline-flex items-center gap-2 rounded-2xl bg-flo px-6 py-3.5 font-extrabold text-[#06231A]">Open live demo <ArrowRight size={18} /></Link>
        <Link href="/architecture" className="inline-flex items-center gap-2 rounded-2xl px-6 py-3.5 font-bold ring-1 ring-line hover:bg-ink-soft"><Network size={18} />Architecture</Link>
      </div>
      <div className="mt-14 grid gap-4 md:grid-cols-3">
        {apps.map(({ href, icon: Icon, title, body, tag }) => (
          <Link key={href} href={href} className="group rounded-3xl bg-ink-soft p-6 ring-1 ring-line transition hover:ring-flo">
            <div className="mb-5 flex items-center justify-between"><div className="grid h-11 w-11 place-items-center rounded-2xl bg-flo/15 text-flo"><Icon size={20} /></div><span className="text-[11px] uppercase tracking-widest text-muted">{tag}</span></div>
            <div className="text-xl font-extrabold">{title}</div>
            <p className="mt-2 text-sm leading-relaxed text-muted">{body}</p>
            <div className="mt-5 flex items-center gap-1 text-sm font-bold text-flo">Open <ArrowRight size={15} className="transition group-hover:translate-x-1" /></div>
          </Link>
        ))}
      </div>
    </main>
  );
}
