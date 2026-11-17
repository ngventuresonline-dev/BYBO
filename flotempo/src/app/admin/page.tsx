"use client";
import { useEffect, useMemo, useState } from "react";
import { db, rupees } from "@/lib/db";
import { brand } from "@/lib/brand";
import type { Captain, Trip, VehicleClass, Place } from "@/lib/types";
import { CityMap, Pin } from "@/components/CityMap";
import { Chip, Stars } from "@/components/ui";
import { Wordmark } from "@/components/Logo";
import { simTick, isHuman } from "@/lib/sim";
import { Activity, Bike, IndianRupee, ShieldAlert, Users, Zap, Play, Pause, Check, X } from "lucide-react";

type Sos = { id: string; trip_id: string | null; raised_by: string; resolved: boolean; at: string };
type Zone = { id: string; label: string; lat: number; lng: number; radius_km: number; multiplier: number; active: boolean };
type Tab = "live" | "captains" | "pricing";

const statusTone: Record<string, "flo" | "tempo" | "sky" | "surge" | "muted"> = {
  searching: "tempo", accepted: "sky", arrived: "sky", ongoing: "flo",
  completed: "muted", cancelled_rider: "surge", cancelled_captain: "surge", no_captain: "surge",
};

export default function Admin() {
  const [tab, setTab] = useState<Tab>("live");
  const [caps, setCaps] = useState<Captain[]>([]);
  const [trips, setTrips] = useState<Trip[]>([]);
  const [classes, setClasses] = useState<VehicleClass[]>([]);
  const [zones, setZones] = useState<Zone[]>([]);
  const [sos, setSos] = useState<Sos[]>([]);
  const [places, setPlaces] = useState<Place[]>([]);
  const [sim, setSim] = useState(false);

  useEffect(() => {
    if (new URLSearchParams(window.location.search).get("sim") === "1") setSim(true);
  }, []);

  async function load() {
    const since = new Date(Date.now() - 24 * 3600e3).toISOString();
    const [c, t, v, z, s, p] = await Promise.all([
      db.from("captains").select("*").order("created_at"),
      db.from("trips").select("*").gte("requested_at", since).order("requested_at", { ascending: false }).limit(200),
      db.from("vehicle_classes").select("*").order("sort_order"),
      db.from("surge_zones").select("*"),
      db.from("sos_alerts").select("*").order("at", { ascending: false }).limit(20),
      db.from("places").select("*"),
    ]);
    setCaps(c.data ?? []); setTrips(t.data ?? []); setClasses(v.data ?? []);
    setZones(z.data ?? []); setSos(s.data ?? []); setPlaces(p.data ?? []);
  }

  useEffect(() => {
    load();
    const ch = db.channel("ops")
      .on("postgres_changes", { event: "*", schema: "flotempo", table: "captains" }, ({ new: c }) =>
        setCaps((xs) => { const cap = c as Captain; const i = xs.findIndex((x) => x.id === cap.id); if (i < 0) return [...xs, cap]; const n = [...xs]; n[i] = cap; return n; }))
      .on("postgres_changes", { event: "*", schema: "flotempo", table: "trips" }, ({ new: t }) =>
        setTrips((xs) => { const tr = t as Trip; const i = xs.findIndex((x) => x.id === tr.id); if (i < 0) return [tr, ...xs]; const n = [...xs]; n[i] = tr; return n; }))
      .on("postgres_changes", { event: "INSERT", schema: "flotempo", table: "sos_alerts" }, ({ new: s }) => setSos((xs) => [s as Sos, ...xs]))
      .subscribe();
    return () => { db.removeChannel(ch); };
  }, []);

  // City simulator: random riders book, idle captains drift, nearest captain accepts & completes.
  useEffect(() => {
    if (!sim) return;
    const iv = setInterval(async () => {
      // drift online captains
      const online = caps.filter((c) => c.duty === "online" && c.lat && !isHuman(c.id));
      for (const c of online.sort(() => Math.random() - 0.5).slice(0, 4)) {
        const h = Number(c.heading ?? 0) + (Math.random() - 0.5) * 50;
        const r = (h * Math.PI) / 180;
        db.rpc("ping_location", { p_captain: c.id, p_lat: c.lat! + Math.cos(r) * 0.0012, p_lng: c.lng! + Math.sin(r) * 0.0012, p_heading: Math.round(h) });
      }
      // book a ride ~ every other tick
      if (Math.random() < 0.5 && places.length > 2) {
        const { data: riders } = await db.from("riders").select("id");
        const a = places[Math.floor(Math.random() * places.length)];
        let b = places[Math.floor(Math.random() * places.length)];
        if (b.id === a.id) b = places[(places.indexOf(a) + 3) % places.length];
        const cls = ["bike", "bike", "bike", "bike_ev", "auto", "auto", "cab"][Math.floor(Math.random() * 7)];
        await db.rpc("request_ride", {
          p_rider: riders![Math.floor(Math.random() * riders!.length)].id, p_class: cls, p_city: "blr",
          p_pickup_label: a.label, p_pickup_lat: a.lat, p_pickup_lng: a.lng, p_drop_label: b.label, p_drop_lat: b.lat, p_drop_lng: b.lng,
          p_pay: Math.random() < 0.35 ? "cash" : "upi",
        });
      }
      // advance simulated trips one step each (sim skips human-driven captains)
      const { data: act } = await db.from("trips").select("*").in("status", ["searching", "accepted", "arrived", "ongoing"]).limit(8);
      await Promise.all(((act ?? []) as Trip[]).map(simTick));
      db.rpc("expire_offers");
    }, 3000);
    return () => clearInterval(iv);
  }, [sim, caps, places]);

  const live = trips.filter((t) => ["searching", "accepted", "arrived", "ongoing"].includes(t.status));
  const done = trips.filter((t) => t.status === "completed");
  const settled = trips.filter((t) => !["searching", "accepted", "arrived", "ongoing"].includes(t.status));
  const gmv = done.reduce((s, t) => s + Number(t.fare_final ?? 0), 0);
  const comm = done.reduce((s, t) => s + Number(t.commission ?? 0), 0);
  const online = caps.filter((c) => c.duty !== "offline");

  const pins = useMemo<Pin[]>(() => [
    ...zones.filter((z) => z.active).map((z) => ({ id: "z" + z.id, kind: "surge" as const, lat: z.lat, lng: z.lng, color: brand.colors.surge, radiusKm: Number(z.radius_km) })),
    ...caps.filter((c) => c.lat && c.duty !== "offline").map((c) => ({ id: c.id, kind: "captain" as const, lat: c.lat!, lng: c.lng!, heading: Number(c.heading), color: c.duty === "on_trip" ? "#0E1A24" : brand.classes[c.vehicle_class_id]?.color, label: c.name, vehicle: c.vehicle_class_id })),
    ...live.filter((t) => t.status === "searching").map((t) => ({ id: "t" + t.id, kind: "pickup" as const, lat: t.pickup_lat, lng: t.pickup_lng, color: brand.colors.tempo })),
  ], [caps, live, zones]);

  return (
    <div className="min-h-dvh bg-ink text-fg">
      <header className="sticky top-0 z-20 flex flex-wrap items-center gap-x-6 gap-y-2 border-b border-line bg-ink/90 px-4 pb-2 pt-[max(0.75rem,env(safe-area-inset-top))] backdrop-blur md:flex-nowrap md:px-6 md:pb-3">
        <Wordmark size={26} sub="Operations · Bengaluru" />
        <button onClick={() => setSim(!sim)} aria-label={sim ? "Stop simulating city traffic" : "Simulate city traffic"}
          className={`ml-auto flex shrink-0 items-center gap-2 rounded-full px-3 py-2 text-[12px] font-bold md:order-last ${sim ? "bg-tempo text-fg" : "bg-fg/[0.07] text-muted"}`}>
          {sim ? <Pause size={13} /> : <Play size={13} />}
          <span className="md:hidden">{sim ? "Simulating" : "Simulate"}</span>
          <span className="hidden md:inline">{sim ? "Simulating city traffic" : "Simulate city traffic"}</span>
        </button>
        <nav className="-mx-1 flex w-full gap-1 overflow-x-auto px-1 [scrollbar-width:none] md:mx-0 md:w-auto md:px-0">
          {(["live", "captains", "pricing"] as Tab[]).map((t) => (
            <button key={t} onClick={() => setTab(t)} className={`shrink-0 whitespace-nowrap rounded-lg px-3 py-2 text-sm font-semibold capitalize ${tab === t ? "bg-fg/[0.07]" : "text-muted hover:text-fg"}`}>{t === "live" ? "Live ops" : t === "captains" ? "Captains & KYC" : "Pricing & surge"}</button>
          ))}
        </nav>
      </header>

      <div className="grid grid-cols-2 gap-3 px-4 pt-4 md:grid-cols-3 md:px-6 md:pt-5 xl:grid-cols-6">
        <Kpi icon={<Activity size={16} />} label="Live trips" value={live.length} tone="flo" />
        <Kpi icon={<Bike size={16} />} label="Captains online" value={`${online.length}/${caps.filter((c) => c.kyc_status === "approved").length}`} />
        <Kpi icon={<IndianRupee size={16} />} label="GMV · 24h" value={rupees(gmv)} />
        <Kpi icon={<IndianRupee size={16} />} label="Commission · 24h" value={rupees(comm)} tone="flo" />
        <Kpi icon={<Users size={16} />} label="Completion rate" value={settled.length ? Math.round((done.length / settled.length) * 100) + "%" : "—"} />
        <Kpi icon={<ShieldAlert size={16} />} label="Open SOS" value={sos.filter((s) => !s.resolved).length} tone={sos.some((s) => !s.resolved) ? "surge" : undefined} />
      </div>

      {tab === "live" && (
        <div className="grid gap-4 p-4 md:p-6 xl:grid-cols-[1fr_420px]">
          <div className="relative h-[56vh] min-h-[360px] overflow-hidden rounded-3xl ring-1 ring-line md:h-[620px]">
            <CityMap className="absolute inset-0" pins={pins} zoom={11.6} />
            <div className="absolute bottom-3 left-3 right-3 flex flex-wrap gap-x-3 gap-y-1.5 rounded-xl md:right-auto bg-ink/85 p-2 text-[11px] backdrop-blur">
              {classes.map((c) => <span key={c.id} className="flex items-center gap-1"><i className="h-2 w-2 rounded-full" style={{ background: brand.classes[c.id]?.color }} />{c.label}</span>)}
              <span className="flex items-center gap-1"><i className="h-2 w-2 rounded-full bg-fg" />On trip</span>
              <span className="flex items-center gap-1"><i className="h-2 w-2 rounded-full bg-tempo" />Waiting rider</span>
              <span className="flex items-center gap-1"><i className="h-2 w-2 rounded-full bg-surge/60" />Surge zone</span>
            </div>
          </div>
          <div className="flex h-[70vh] min-h-[420px] flex-col gap-4 md:h-[620px]">
            {sos.some((s) => !s.resolved) && (
              <div className="rounded-2xl bg-surge/10 p-3 ring-1 ring-surge/40">
                <div className="mb-2 flex items-center gap-2 text-sm font-bold text-surge-ink"><ShieldAlert size={16} />SOS alerts</div>
                {sos.filter((s) => !s.resolved).map((s) => (
                  <div key={s.id} className="flex items-center justify-between gap-2 py-1 text-[12px]">
                    <span className="min-w-0">Raised by {s.raised_by} · {new Date(s.at).toLocaleTimeString("en-IN")}</span>
                    <button onClick={async () => { await db.from("sos_alerts").update({ resolved: true, resolved_note: "Called rider, safe" }).eq("id", s.id); setSos((xs) => xs.map((x) => x.id === s.id ? { ...x, resolved: true } : x)); }} className="shrink-0 rounded-md bg-surge px-3 py-1.5 font-bold text-fg">Resolve</button>
                  </div>
                ))}
              </div>
            )}
            <div className="flex min-h-0 flex-1 flex-col rounded-3xl bg-ink-soft ring-1 ring-line">
              <div className="flex items-center justify-between border-b border-line px-4 py-3 text-sm font-bold">Trip feed <span className="text-[11px] font-normal text-muted">realtime</span></div>
              <div className="min-h-0 flex-1 overflow-y-auto">
                {trips.slice(0, 60).map((t) => {
                  const cap = caps.find((c) => c.id === t.captain_id);
                  return (
                    <div key={t.id} className="border-b border-line/60 px-4 py-2.5 text-[12px]">
                      <div className="flex items-center justify-between">
                        <span className="font-mono font-bold">{t.code}</span>
                        <Chip tone={statusTone[t.status]}>{t.status.replace("_", " ")}</Chip>
                      </div>
                      <div className="mt-1 truncate text-muted">{t.pickup_label} → {t.drop_label}</div>
                      <div className="mt-0.5 flex justify-between text-muted">
                        <span>{t.vehicle_class_id} · {cap?.name ?? "—"}{Number(t.surge) > 1 ? ` · ${t.surge}×` : ""}</span>
                        <span className="font-bold text-fg">{rupees(t.fare_final ?? t.fare_estimate)}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}

      {tab === "captains" && (
        <div className="p-4 md:p-6">
          <div className="overflow-x-auto rounded-3xl bg-ink-soft ring-1 ring-line">
            <table className="w-full min-w-[860px] text-left text-[13px]">
              <thead className="text-[11px] uppercase tracking-wider text-muted">
                <tr className="border-b border-line">{["Captain", "Vehicle", "Documents", "KYC", "Duty", "Rating", "Trips", "Wallet", ""].map((h) => <th key={h} className="px-4 py-3 font-semibold">{h}</th>)}</tr>
              </thead>
              <tbody>
                {caps.map((c) => (
                  <tr key={c.id} className="border-b border-line/50">
                    <td className="px-4 py-3"><div className="font-bold">{c.name}</div><div className="text-[11px] text-muted">{c.phone}</div></td>
                    <td className="px-4 py-3"><div>{c.vehicle_model}{c.is_ev && <span className="ml-1 text-flo-ink">⚡</span>}</div><div className="text-[11px] text-muted">{c.vehicle_number} · {c.vehicle_class_id}</div></td>
                    <td className="px-4 py-3 text-[11px]">
                      {[["DL", c.dl_number], ["RC", c.rc_number], ["Aadhaar", c.aadhaar_last4], ["PAN", c.pan_number]].map(([k, v]) => (
                        <span key={k} className={`mr-1 inline-block rounded px-1.5 py-0.5 ${v ? "bg-flo/15 text-flo-ink" : "bg-surge/15 text-surge-ink"}`}>{k}</span>
                      ))}
                    </td>
                    <td className="px-4 py-3"><Chip tone={c.kyc_status === "approved" ? "flo" : c.kyc_status === "pending_kyc" ? "tempo" : "surge"}>{c.kyc_status.replace("_", " ")}</Chip></td>
                    <td className="px-4 py-3 capitalize text-muted">{c.duty.replace("_", " ")}</td>
                    <td className="px-4 py-3"><Stars n={c.rating} /></td>
                    <td className="px-4 py-3">{c.trips_count.toLocaleString("en-IN")}</td>
                    <td className={`px-4 py-3 font-bold ${Number(c.wallet_balance) < 0 ? "text-surge-ink" : ""}`}>{rupees(c.wallet_balance)}</td>
                    <td className="px-4 py-3">
                      {c.kyc_status === "pending_kyc" && (
                        <div className="flex gap-1">
                          <button title="Approve" onClick={() => db.from("captains").update({ kyc_status: "approved" }).eq("id", c.id)} className="grid h-9 w-9 place-items-center rounded-lg bg-flo/20 text-flo-ink"><Check size={14} /></button>
                          <button title="Reject" onClick={() => db.from("captains").update({ kyc_status: "rejected", kyc_notes: "RC missing" }).eq("id", c.id)} className="grid h-9 w-9 place-items-center rounded-lg bg-surge/20 text-surge-ink"><X size={14} /></button>
                        </div>
                      )}
                      {c.kyc_status === "approved" && <button onClick={() => db.from("captains").update({ kyc_status: "suspended", duty: "offline" }).eq("id", c.id)} className="text-[11px] text-muted underline">Suspend</button>}
                      {c.kyc_status === "suspended" && <button onClick={() => db.from("captains").update({ kyc_status: "approved" }).eq("id", c.id)} className="text-[11px] text-flo-ink underline">Reinstate</button>}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {tab === "pricing" && (
        <div className="grid gap-4 p-4 md:p-6 xl:grid-cols-2">
          <div className="min-w-0 rounded-3xl bg-ink-soft p-4 ring-1 ring-line md:p-5">
            <div className="mb-1 text-sm font-bold">Fare cards</div>
            <div className="mb-4 text-[12px] text-muted">Edits apply to the next quote instantly — no app release.</div>
            <div className="-mx-4 overflow-x-auto px-4 md:mx-0 md:px-0">
            <table className="w-full min-w-[560px] text-[13px]">
              <thead className="text-[11px] uppercase text-muted"><tr>{["Class", "Base", "Incl. km", "₹/km", "₹/min", "Min", "Commission %"].map((h) => <th key={h} className="pb-2 text-left font-semibold">{h}</th>)}</tr></thead>
              <tbody>
                {classes.map((c) => (
                  <tr key={c.id} className="border-t border-line/60">
                    <td className="py-2 font-bold" style={{ color: brand.classes[c.id]?.color }}>{c.label}</td>
                    {(["base_fare", "base_km", "per_km", "per_min", "min_fare", "commission_pct"] as const).map((k) => (
                      <td key={k} className="py-2 pr-2">
                        <input defaultValue={c[k]} onBlur={(e) => db.from("vehicle_classes").update({ [k]: Number(e.target.value) }).eq("id", c.id)}
                          className="w-16 rounded-md bg-ink px-2 py-1 ring-1 ring-line focus:ring-flo" />
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
            </div>
          </div>
          <div className="min-w-0 rounded-3xl bg-ink-soft p-4 ring-1 ring-line md:p-5">
            <div className="mb-1 flex items-center gap-2 text-sm font-bold"><Zap size={15} className="text-surge-ink" />Surge zones</div>
            <div className="mb-4 text-[12px] text-muted">Multiplier applies to rides that start inside the radius.</div>
            {zones.map((z) => (
              <div key={z.id} className="flex items-center gap-3 border-t border-line/60 py-3 text-[13px]">
                <div className="min-w-0 flex-1"><div className="truncate font-bold">{z.label}</div><div className="text-[11px] text-muted">{z.radius_km} km radius</div></div>
                <input type="range" min={1} max={2.5} step={0.1} defaultValue={z.multiplier}
                  onChange={(e) => setZones((xs) => xs.map((x) => x.id === z.id ? { ...x, multiplier: Number(e.target.value) } : x))}
                  onMouseUp={(e) => db.from("surge_zones").update({ multiplier: Number((e.target as HTMLInputElement).value) }).eq("id", z.id)}
                  onTouchEnd={(e) => db.from("surge_zones").update({ multiplier: Number((e.target as HTMLInputElement).value) }).eq("id", z.id)}
                  className="w-24 shrink-0 accent-[#FF5A3C] sm:w-32" />
                <span className="w-10 text-right font-mono font-bold text-surge-ink">{Number(z.multiplier).toFixed(1)}×</span>
                <button onClick={async () => { await db.from("surge_zones").update({ active: !z.active }).eq("id", z.id); setZones((xs) => xs.map((x) => x.id === z.id ? { ...x, active: !x.active } : x)); }}
                  className={`shrink-0 rounded-full px-3 py-1.5 text-[11px] font-bold ${z.active ? "bg-surge text-fg" : "bg-fg/[0.07] text-muted"}`}>{z.active ? "ON" : "OFF"}</button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function Kpi({ icon, label, value, tone }: { icon: React.ReactNode; label: string; value: React.ReactNode; tone?: "flo" | "surge" }) {
  return (
    <div className="min-w-0 rounded-2xl bg-ink-soft p-3 ring-1 ring-line md:p-4">
      <div className="mb-2 flex items-center gap-1.5 text-[10px] uppercase tracking-wide text-muted md:gap-2 md:text-[11px] md:tracking-wider"><span className="shrink-0">{icon}</span><span className="truncate">{label}</span></div>
      <div className={`truncate text-xl font-extrabold md:text-2xl ${tone === "flo" ? "text-flo-ink" : tone === "surge" ? "text-surge-ink" : ""}`}>{value}</div>
    </div>
  );
}
