"use client";
import { useEffect, useMemo, useState } from "react";
import { db, rupees } from "@/lib/db";
import { brand } from "@/lib/brand";
import type { Captain, Trip, VehicleClass, Place } from "@/lib/types";
import { CityMap, Pin } from "@/components/CityMap";
import { Chip, Stars } from "@/components/ui";
import { Wordmark } from "@/components/Logo";
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
      const online = caps.filter((c) => c.duty === "online" && c.lat);
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
      // advance simulated trips (skip ones a human captain is driving: those with an accepted offer < 25s old stay manual)
      const { data: open } = await db.from("ride_offers").select("id, created_at").eq("state", "pending").lt("created_at", new Date(Date.now() - 6000).toISOString()).limit(2);
      for (const o of open ?? []) await db.rpc("accept_offer", { p_offer: o.id }).then(() => {}, () => {});
      const { data: act } = await db.from("trips").select("*").in("status", ["accepted", "arrived", "ongoing"]).lt("accepted_at", new Date(Date.now() - 12000).toISOString()).limit(3);
      for (const t of act ?? []) {
        if (t.status === "accepted") await db.rpc("mark_arrived", { p_trip: t.id });
        else if (t.status === "arrived") await db.rpc("start_trip", { p_trip: t.id, p_otp: t.start_otp });
        else if (Date.now() - new Date(t.started_at).getTime() > 15000) await db.rpc("end_trip", { p_trip: t.id });
      }
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
    ...caps.filter((c) => c.lat && c.duty !== "offline").map((c) => ({ id: c.id, kind: "captain" as const, lat: c.lat!, lng: c.lng!, heading: Number(c.heading), color: c.duty === "on_trip" ? "#FFFFFF" : brand.classes[c.vehicle_class_id]?.color, label: c.name })),
    ...live.filter((t) => t.status === "searching").map((t) => ({ id: "t" + t.id, kind: "pickup" as const, lat: t.pickup_lat, lng: t.pickup_lng, color: brand.colors.tempo })),
  ], [caps, live, zones]);

  return (
    <div className="min-h-dvh bg-ink text-[#EAF2F7]">
      <header className="sticky top-0 z-20 flex items-center gap-6 border-b border-line bg-ink/90 px-6 py-3 backdrop-blur">
        <Wordmark size={26} sub="Operations · Bengaluru" />
        <nav className="flex gap-1">
          {(["live", "captains", "pricing"] as Tab[]).map((t) => (
            <button key={t} onClick={() => setTab(t)} className={`rounded-lg px-3 py-1.5 text-sm font-semibold capitalize ${tab === t ? "bg-white/10" : "text-muted hover:text-white"}`}>{t === "live" ? "Live ops" : t === "captains" ? "Captains & KYC" : "Pricing & surge"}</button>
          ))}
        </nav>
        <button onClick={() => setSim(!sim)} className={`ml-auto flex items-center gap-2 rounded-full px-3 py-1.5 text-[12px] font-bold ${sim ? "bg-tempo text-ink" : "bg-white/10 text-muted"}`}>
          {sim ? <Pause size={13} /> : <Play size={13} />}{sim ? "Simulating city traffic" : "Simulate city traffic"}
        </button>
      </header>

      <div className="grid grid-cols-2 gap-3 px-6 pt-5 md:grid-cols-3 xl:grid-cols-6">
        <Kpi icon={<Activity size={16} />} label="Live trips" value={live.length} tone="flo" />
        <Kpi icon={<Bike size={16} />} label="Captains online" value={`${online.length}/${caps.filter((c) => c.kyc_status === "approved").length}`} />
        <Kpi icon={<IndianRupee size={16} />} label="GMV · 24h" value={rupees(gmv)} />
        <Kpi icon={<IndianRupee size={16} />} label="Commission · 24h" value={rupees(comm)} tone="flo" />
        <Kpi icon={<Users size={16} />} label="Completion rate" value={settled.length ? Math.round((done.length / settled.length) * 100) + "%" : "—"} />
        <Kpi icon={<ShieldAlert size={16} />} label="Open SOS" value={sos.filter((s) => !s.resolved).length} tone={sos.some((s) => !s.resolved) ? "surge" : undefined} />
      </div>

      {tab === "live" && (
        <div className="grid gap-4 p-6 xl:grid-cols-[1fr_420px]">
          <div className="relative h-[620px] overflow-hidden rounded-3xl ring-1 ring-line">
            <CityMap className="absolute inset-0" pins={pins} zoom={11.6} />
            <div className="absolute bottom-3 left-3 flex flex-wrap gap-2 rounded-xl bg-ink/85 p-2 text-[11px] backdrop-blur">
              {classes.map((c) => <span key={c.id} className="flex items-center gap-1"><i className="h-2 w-2 rounded-full" style={{ background: brand.classes[c.id]?.color }} />{c.label}</span>)}
              <span className="flex items-center gap-1"><i className="h-2 w-2 rounded-full bg-white" />On trip</span>
              <span className="flex items-center gap-1"><i className="h-2 w-2 rounded-full bg-tempo" />Waiting rider</span>
              <span className="flex items-center gap-1"><i className="h-2 w-2 rounded-full bg-surge/60" />Surge zone</span>
            </div>
          </div>
          <div className="flex h-[620px] flex-col gap-4">
            {sos.some((s) => !s.resolved) && (
              <div className="rounded-2xl bg-surge/10 p-3 ring-1 ring-surge/40">
                <div className="mb-2 flex items-center gap-2 text-sm font-bold text-surge"><ShieldAlert size={16} />SOS alerts</div>
                {sos.filter((s) => !s.resolved).map((s) => (
                  <div key={s.id} className="flex items-center justify-between py-1 text-[12px]">
                    <span>Raised by {s.raised_by} · {new Date(s.at).toLocaleTimeString("en-IN")}</span>
                    <button onClick={async () => { await db.from("sos_alerts").update({ resolved: true, resolved_note: "Called rider, safe" }).eq("id", s.id); setSos((xs) => xs.map((x) => x.id === s.id ? { ...x, resolved: true } : x)); }} className="rounded-md bg-surge px-2 py-0.5 font-bold text-ink">Resolve</button>
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
                        <span className="font-bold text-white">{rupees(t.fare_final ?? t.fare_estimate)}</span>
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
        <div className="p-6">
          <div className="overflow-x-auto rounded-3xl bg-ink-soft ring-1 ring-line">
            <table className="w-full text-left text-[13px]">
              <thead className="text-[11px] uppercase tracking-wider text-muted">
                <tr className="border-b border-line">{["Captain", "Vehicle", "Documents", "KYC", "Duty", "Rating", "Trips", "Wallet", ""].map((h) => <th key={h} className="px-4 py-3 font-semibold">{h}</th>)}</tr>
              </thead>
              <tbody>
                {caps.map((c) => (
                  <tr key={c.id} className="border-b border-line/50">
                    <td className="px-4 py-3"><div className="font-bold">{c.name}</div><div className="text-[11px] text-muted">{c.phone}</div></td>
                    <td className="px-4 py-3"><div>{c.vehicle_model}{c.is_ev && <span className="ml-1 text-flo">⚡</span>}</div><div className="text-[11px] text-muted">{c.vehicle_number} · {c.vehicle_class_id}</div></td>
                    <td className="px-4 py-3 text-[11px]">
                      {[["DL", c.dl_number], ["RC", c.rc_number], ["Aadhaar", c.aadhaar_last4], ["PAN", c.pan_number]].map(([k, v]) => (
                        <span key={k} className={`mr-1 inline-block rounded px-1.5 py-0.5 ${v ? "bg-flo/15 text-flo" : "bg-surge/15 text-surge"}`}>{k}</span>
                      ))}
                    </td>
                    <td className="px-4 py-3"><Chip tone={c.kyc_status === "approved" ? "flo" : c.kyc_status === "pending_kyc" ? "tempo" : "surge"}>{c.kyc_status.replace("_", " ")}</Chip></td>
                    <td className="px-4 py-3 capitalize text-muted">{c.duty.replace("_", " ")}</td>
                    <td className="px-4 py-3"><Stars n={c.rating} /></td>
                    <td className="px-4 py-3">{c.trips_count.toLocaleString("en-IN")}</td>
                    <td className={`px-4 py-3 font-bold ${Number(c.wallet_balance) < 0 ? "text-surge" : ""}`}>{rupees(c.wallet_balance)}</td>
                    <td className="px-4 py-3">
                      {c.kyc_status === "pending_kyc" && (
                        <div className="flex gap-1">
                          <button title="Approve" onClick={() => db.from("captains").update({ kyc_status: "approved" }).eq("id", c.id)} className="grid h-7 w-7 place-items-center rounded-lg bg-flo/20 text-flo"><Check size={14} /></button>
                          <button title="Reject" onClick={() => db.from("captains").update({ kyc_status: "rejected", kyc_notes: "RC missing" }).eq("id", c.id)} className="grid h-7 w-7 place-items-center rounded-lg bg-surge/20 text-surge"><X size={14} /></button>
                        </div>
                      )}
                      {c.kyc_status === "approved" && <button onClick={() => db.from("captains").update({ kyc_status: "suspended", duty: "offline" }).eq("id", c.id)} className="text-[11px] text-muted underline">Suspend</button>}
                      {c.kyc_status === "suspended" && <button onClick={() => db.from("captains").update({ kyc_status: "approved" }).eq("id", c.id)} className="text-[11px] text-flo underline">Reinstate</button>}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {tab === "pricing" && (
        <div className="grid gap-4 p-6 xl:grid-cols-2">
          <div className="rounded-3xl bg-ink-soft p-5 ring-1 ring-line">
            <div className="mb-1 text-sm font-bold">Fare cards</div>
            <div className="mb-4 text-[12px] text-muted">Edits apply to the next quote instantly — no app release.</div>
            <table className="w-full text-[13px]">
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
          <div className="rounded-3xl bg-ink-soft p-5 ring-1 ring-line">
            <div className="mb-1 flex items-center gap-2 text-sm font-bold"><Zap size={15} className="text-surge" />Surge zones</div>
            <div className="mb-4 text-[12px] text-muted">Multiplier applies to rides that start inside the radius.</div>
            {zones.map((z) => (
              <div key={z.id} className="flex items-center gap-3 border-t border-line/60 py-3 text-[13px]">
                <div className="flex-1"><div className="font-bold">{z.label}</div><div className="text-[11px] text-muted">{z.radius_km} km radius</div></div>
                <input type="range" min={1} max={2.5} step={0.1} defaultValue={z.multiplier}
                  onChange={(e) => setZones((xs) => xs.map((x) => x.id === z.id ? { ...x, multiplier: Number(e.target.value) } : x))}
                  onMouseUp={(e) => db.from("surge_zones").update({ multiplier: Number((e.target as HTMLInputElement).value) }).eq("id", z.id)}
                  onTouchEnd={(e) => db.from("surge_zones").update({ multiplier: Number((e.target as HTMLInputElement).value) }).eq("id", z.id)}
                  className="w-32 accent-[#FF5A3C]" />
                <span className="w-10 text-right font-mono font-bold text-surge">{Number(z.multiplier).toFixed(1)}×</span>
                <button onClick={async () => { await db.from("surge_zones").update({ active: !z.active }).eq("id", z.id); setZones((xs) => xs.map((x) => x.id === z.id ? { ...x, active: !x.active } : x)); }}
                  className={`rounded-full px-3 py-1 text-[11px] font-bold ${z.active ? "bg-surge text-ink" : "bg-white/10 text-muted"}`}>{z.active ? "ON" : "OFF"}</button>
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
    <div className="rounded-2xl bg-ink-soft p-4 ring-1 ring-line">
      <div className="mb-2 flex items-center gap-2 text-[11px] uppercase tracking-wider text-muted">{icon}{label}</div>
      <div className={`text-2xl font-extrabold ${tone === "flo" ? "text-flo" : tone === "surge" ? "text-surge" : ""}`}>{value}</div>
    </div>
  );
}
