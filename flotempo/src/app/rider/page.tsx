"use client";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { db, rupees } from "@/lib/db";
import { simTick } from "@/lib/sim";
import { brand } from "@/lib/brand";
import type { Captain, Place, Trip, VehicleClass } from "@/lib/types";
import { CityMap, Pin } from "@/components/CityMap";
import { Btn, Chip, Row, Stars, VehicleGlyph } from "@/components/ui";
import { Wordmark } from "@/components/Logo";
import { ArrowLeft, MapPin, Search, Shield, Share2, Phone as PhoneIcon, Wallet, Star, X } from "lucide-react";

type Quote = { total: number; surge: number; distance_km: number; duration_min: number };
type Step = "home" | "where" | "choose" | "trip";
const PAY = ["upi", "cash", "wallet", "card"] as const;

export default function RiderApp() {
  const [riderId, setRiderId] = useState<string | null>(null);
  const [riderName, setRiderName] = useState("");
  const [places, setPlaces] = useState<Place[]>([]);
  const [classes, setClasses] = useState<VehicleClass[]>([]);
  const [nearby, setNearby] = useState<Captain[]>([]);
  const [step, setStep] = useState<Step>("home");
  const [pickup, setPickup] = useState<Place | null>(null);
  const [drop, setDrop] = useState<Place | null>(null);
  const [q, setQ] = useState("");
  const [quotes, setQuotes] = useState<Record<string, Quote>>({});
  const [cls, setCls] = useState("bike");
  const [pay, setPay] = useState<(typeof PAY)[number]>("upi");
  const [trip, setTrip] = useState<Trip | null>(null);
  const [captain, setCaptain] = useState<Captain | null>(null);
  const [offers, setOffers] = useState(0);
  const [err, setErr] = useState("");
  const [sim, setSim] = useState(true);
  const [promo, setPromo] = useState(false);
  const [promoUsed, setPromoUsed] = useState(0);
  const [note, setNote] = useState("");
  const noteTimer = useRef<ReturnType<typeof setTimeout>>(undefined);

  function toast(msg: string) {
    setNote(msg);
    clearTimeout(noteTimer.current);
    noteTimer.current = setTimeout(() => setNote(""), 2600);
  }

  /** FLOFIRST: 50% off bike rides, capped at ₹40 */
  const promoOff = (classId: string, total: number) =>
    promo && classId.startsWith("bike") ? Math.min(40, Math.round(total * 0.5)) : 0;

  useEffect(() => {
    if (new URLSearchParams(location.search).get("sim") === "0") setSim(false);
  }, []);

  // live simulation: plays the captain's side until the ride is done
  const tripRef = useRef<Trip | null>(null);
  tripRef.current = trip;
  useEffect(() => {
    const active = trip && ["searching", "accepted", "arrived", "ongoing"].includes(trip.status);
    if (!sim || !active) return;
    let busy = false;
    const iv = setInterval(async () => {
      if (busy || !tripRef.current) return;
      busy = true;
      try { await simTick(tripRef.current); } finally { busy = false; }
    }, 1400);
    return () => clearInterval(iv);
  }, [sim, trip?.id, trip?.status]); // eslint-disable-line react-hooks/exhaustive-deps

  // bootstrap
  useEffect(() => {
    (async () => {
      const [{ data: r }, { data: p }, { data: c }, { data: caps }] = await Promise.all([
        db.from("riders").select("id,name").ilike("name", "Santosh%").limit(1).maybeSingle(),
        db.from("places").select("*").order("popular", { ascending: false }),
        db.from("vehicle_classes").select("*").order("sort_order"),
        db.from("captains").select("*").eq("duty", "online"),
      ]);
      if (r) { setRiderId(r.id); setRiderName(r.name); }
      setPlaces(p ?? []);
      setClasses(c ?? []);
      setNearby(caps ?? []);
      setPickup((p ?? []).find((x) => x.id === "koramangala") ?? null);
      // resume any live trip
      if (r) {
        const { data: live } = await db.from("trips").select("*").eq("rider_id", r.id)
          .in("status", ["searching", "accepted", "arrived", "ongoing"]).order("requested_at", { ascending: false }).limit(1);
        if (live?.[0]) { setTrip(live[0]); setStep("trip"); }
      }
    })();
  }, []);

  // live captains on the home map
  useEffect(() => {
    const ch = db.channel("rider-captains")
      .on("postgres_changes", { event: "UPDATE", schema: "flotempo", table: "captains" }, ({ new: c }) => {
        const cap = c as Captain;
        setNearby((xs) => {
          const rest = xs.filter((x) => x.id !== cap.id);
          return cap.duty === "offline" ? rest : [...rest, cap];
        });
        setCaptain((cur) => (cur && cur.id === cap.id ? cap : cur));
      }).subscribe();
    return () => { db.removeChannel(ch); };
  }, []);

  // follow the active trip
  useEffect(() => {
    if (!trip) return;
    const ch = db.channel("rider-trip-" + trip.id)
      .on("postgres_changes", { event: "UPDATE", schema: "flotempo", table: "trips", filter: `id=eq.${trip.id}` },
        ({ new: t }) => setTrip(t as Trip))
      .on("postgres_changes", { event: "*", schema: "flotempo", table: "ride_offers", filter: `trip_id=eq.${trip.id}` },
        () => countOffers(trip.id))
      .subscribe();
    countOffers(trip.id);
    return () => { db.removeChannel(ch); };
  }, [trip?.id]); // eslint-disable-line react-hooks/exhaustive-deps

  // pull the captain once assigned
  useEffect(() => {
    if (!trip?.captain_id) { setCaptain(null); return; }
    db.from("captains").select("*").eq("id", trip.captain_id).single().then(({ data }) => setCaptain(data));
  }, [trip?.captain_id]);

  // while searching, let the server roll offer waves forward
  useEffect(() => {
    if (trip?.status !== "searching") return;
    const t = setInterval(() => { db.rpc("expire_offers"); }, 4000);
    return () => clearInterval(t);
  }, [trip?.status]);

  async function countOffers(id: string) {
    const { count } = await db.from("ride_offers").select("id", { count: "exact", head: true }).eq("trip_id", id);
    setOffers(count ?? 0);
  }

  const loadQuotes = useCallback(async (a: Place, b: Place) => {
    const R = 6371, rad = Math.PI / 180;
    const h = Math.sin(((b.lat - a.lat) * rad) / 2) ** 2 +
      Math.cos(a.lat * rad) * Math.cos(b.lat * rad) * Math.sin(((b.lng - a.lng) * rad) / 2) ** 2;
    const km = Math.round(2 * R * Math.asin(Math.sqrt(h)) * 1.35 * 100) / 100;
    const min = Math.round((km / 18) * 600) / 10;
    const { data: surge } = await db.rpc("surge_at", { p_city: "blr", p_lat: a.lat, p_lng: a.lng });
    const out: Record<string, Quote> = {};
    await Promise.all(classes.map(async (c) => {
      const { data } = await db.rpc("quote", { p_class: c.id, p_km: km, p_min: min, p_surge: surge ?? 1 });
      if (data) out[c.id] = { total: Number(data.total), surge: Number(data.surge), distance_km: km, duration_min: min };
    }));
    setQuotes(out);
  }, [classes]);

  async function book() {
    if (!riderId || !pickup || !drop) return;
    setErr("");
    const { data, error } = await db.rpc("request_ride", {
      p_rider: riderId, p_class: cls, p_city: "blr",
      p_pickup_label: pickup.label, p_pickup_lat: pickup.lat, p_pickup_lng: pickup.lng,
      p_drop_label: drop.label, p_drop_lat: drop.lat, p_drop_lng: drop.lng, p_pay: pay,
    });
    if (error) { setErr(error.message); return; }
    setPromoUsed(promoOff(cls, Number((data as Trip).fare_estimate)));
    setTrip(data as Trip);
    setStep("trip");
  }

  async function cancel() {
    if (!trip) return;
    await db.rpc("cancel_trip", { p_trip: trip.id, p_by: "rider", p_reason: "Changed plans" });
  }

  async function rate(n: number) {
    if (!trip) return;
    await db.from("trips").update({ rider_rating: n }).eq("id", trip.id);
    setTrip({ ...trip, rider_rating: n });
  }

  async function sos() {
    if (!trip) return;
    await db.from("sos_alerts").insert({ trip_id: trip.id, raised_by: "rider", lat: captain?.lat, lng: captain?.lng });
    toast("SOS sent · safety desk and your emergency contact alerted");
  }

  function reset() { setTrip(null); setDrop(null); setStep("home"); setQuotes({}); setPromoUsed(0); }

  // ---- map state ----
  const pins = useMemo<Pin[]>(() => {
    const ps: Pin[] = [];
    if (step === "trip" && trip) {
      ps.push({ id: "p", kind: "pickup", lat: trip.pickup_lat, lng: trip.pickup_lng, label: "Pickup" });
      ps.push({ id: "d", kind: "drop", lat: trip.drop_lat, lng: trip.drop_lng, label: trip.drop_label });
      if (captain?.lat) ps.push({ id: "c-" + captain.id, kind: "captain", vehicle: captain.vehicle_class_id, lat: captain.lat, lng: captain.lng!, heading: Number(captain.heading), color: brand.classes[captain.vehicle_class_id]?.color });
      return ps;
    }
    for (const c of nearby) if (c.lat) ps.push({ id: "c-" + c.id, kind: "captain", vehicle: c.vehicle_class_id, lat: c.lat, lng: c.lng!, heading: Number(c.heading), color: brand.classes[c.vehicle_class_id]?.color });
    if (pickup) ps.push({ id: "p", kind: "pickup", lat: pickup.lat, lng: pickup.lng, label: step === "home" ? "You" : "Pickup" });
    if (drop && step === "choose") ps.push({ id: "d", kind: "drop", lat: drop.lat, lng: drop.lng, label: drop.label });
    return ps;
  }, [nearby, pickup, drop, step, trip, captain]);

  const route = step === "trip" && trip
    ? { from: [trip.pickup_lng, trip.pickup_lat] as [number, number], to: [trip.drop_lng, trip.drop_lat] as [number, number] }
    : step === "choose" && pickup && drop
    ? { from: [pickup.lng, pickup.lat] as [number, number], to: [drop.lng, drop.lat] as [number, number] }
    : null;

  const filtered = places.filter((p) => p.id !== pickup?.id && (q === "" || (p.label + p.sub_label).toLowerCase().includes(q.toLowerCase())));

  return (
    <div className="relative h-full w-full overflow-hidden bg-ink text-fg">
      <CityMap className="absolute inset-0" pins={pins} route={route} center={pickup && step === "home" ? [pickup.lng, pickup.lat] : undefined} zoom={13.2} />

      {/* top bar */}
      <div className="absolute inset-x-0 top-0 z-10 mx-auto flex max-w-[480px] items-center justify-between px-5 pt-[max(1.25rem,env(safe-area-inset-top))]">
        {step === "home" ? (
          <div className="rounded-2xl bg-ink/85 px-3 py-2 backdrop-blur"><Wordmark size={26} /></div>
        ) : step !== "trip" ? (
          <button onClick={() => setStep(step === "choose" ? "where" : "home")} className="grid h-10 w-10 place-items-center rounded-full bg-ink/85 backdrop-blur"><ArrowLeft size={18} /></button>
        ) : <span />}
        <div className="flex items-center gap-2">
          <button onClick={() => { setSim(!sim); toast(sim ? "Simulation off — play the captain in the captain app" : "Simulation on — a nearby captain will take your ride"); }}
            className={`flex items-center gap-1.5 rounded-full px-3 py-2 text-[11px] font-bold shadow-sm ring-1 backdrop-blur ${sim ? "bg-flo/15 text-flo-ink ring-flo/40" : "bg-ink/85 text-muted ring-line"}`}>
            <span className={`h-1.5 w-1.5 rounded-full ${sim ? "bg-flo" : "bg-muted"}`} />{sim ? "Live sim" : "Sim off"}
          </button>
          {step === "home" && <div className="grid h-10 w-10 place-items-center rounded-full bg-flo/20 text-sm font-bold text-flo-ink">{riderName.slice(0, 1)}</div>}
        </div>
      </div>

      {note && (
        <div className="pointer-events-none absolute inset-x-0 top-[calc(max(1.25rem,env(safe-area-inset-top))+3.25rem)] z-30 mx-auto max-w-[480px] px-5">
          <div className="rounded-2xl bg-fg px-4 py-2.5 text-center text-[12px] font-semibold text-white shadow-lg">{note}</div>
        </div>
      )}

      {/* sheets — phone-width column, centred on larger screens */}
      <div className="absolute inset-x-0 bottom-0 z-10 mx-auto max-w-[480px]">
        {step === "home" && (
          <div className="sheet px-5 pb-7 pt-4">
            <div className="mx-auto mb-4 h-1 w-10 rounded-full bg-fg/10" />
            <div className="text-[13px] text-muted">Namaskara, {riderName.split(" ")[0]} 👋</div>
            <div className="mb-4 text-[22px] font-extrabold tracking-tight">Where are you headed?</div>
            <button onClick={() => setStep("where")} className="mb-4 flex w-full items-center gap-3 rounded-2xl bg-ink px-4 py-4 text-left text-muted ring-1 ring-line">
              <Search size={18} className="text-flo-ink" /> Search destination
            </button>
            <div className="grid grid-cols-4 gap-2">
              {classes.map((c) => {
                const n = nearby.filter((x) => x.vehicle_class_id === c.id).length;
                return (
                  <button key={c.id} onClick={() => { setCls(c.id); setStep("where"); }}
                    className="flex flex-col items-center gap-1.5 rounded-2xl bg-ink py-3 ring-1 ring-line transition active:scale-95 hover:ring-flo/60">
                    <VehicleGlyph kind={c.id} color={brand.classes[c.id]?.color} />
                    <span className="text-[11px] font-semibold">{c.label}</span>
                    <span className="text-[10px] text-muted">{n ? `${n} near` : "—"}</span>
                  </button>
                );
              })}
            </div>
            <button onClick={() => { setPromo(!promo); toast(promo ? "FLOFIRST removed" : "FLOFIRST applied · 50% off bike rides"); }}
              className="mt-4 flex w-full items-center justify-between rounded-2xl bg-gradient-to-r from-flo/20 to-transparent px-4 py-3 text-left ring-1 ring-flo/25">
              <div><div className="text-sm font-bold">FLOFIRST · 50% off</div><div className="text-[11px] text-muted">Your first 3 bike rides, up to ₹40</div></div>
              <Chip>{promo ? "Applied ✓" : "Apply"}</Chip>
            </button>
            <div className="mt-3 text-center text-[11px] text-muted">{nearby.length} captains online near you</div>
          </div>
        )}

        {step === "where" && (
          <div className="sheet flex h-[78vh] max-h-[640px] flex-col px-5 pb-5 pt-4">
            <div className="mb-3 space-y-2 rounded-2xl bg-ink p-3 ring-1 ring-line">
              <div className="flex items-center gap-3 text-sm"><span className="h-2.5 w-2.5 shrink-0 rounded-full bg-flo" /><span className="min-w-0 truncate">{pickup?.label}</span><span className="ml-auto shrink-0 text-[11px] text-muted">Current location</span></div>
              <div className="ml-[4px] h-4 border-l border-dashed border-fg/20" />
              <div className="flex items-center gap-3"><span className="h-2.5 w-2.5 rounded-[3px] bg-fg" />
                <input autoFocus value={q} onChange={(e) => setQ(e.target.value)} placeholder="Where to?" className="w-full bg-transparent text-sm outline-none placeholder:text-muted" />
              </div>
            </div>
            <div className="text-[11px] font-semibold uppercase tracking-widest text-muted">{q ? "Results" : "Popular in Bengaluru"}</div>
            <div className="-mx-2 mt-1 flex-1 overflow-y-auto">
              {filtered.map((p) => (
                <button key={p.id} onClick={() => { setDrop(p); setStep("choose"); pickup && loadQuotes(pickup, p); }}
                  className="flex w-full items-center gap-3 rounded-xl px-2 py-3 text-left hover:bg-fg/[0.04]">
                  <div className="grid h-9 w-9 place-items-center rounded-full bg-fg/[0.04]"><MapPin size={16} className="text-muted" /></div>
                  <div><div className="text-sm font-semibold">{p.label}</div><div className="text-[12px] text-muted">{p.sub_label}</div></div>
                </button>
              ))}
            </div>
          </div>
        )}

        {step === "choose" && drop && (
          <div className="sheet px-5 pb-6 pt-4">
            <div className="mb-3 flex items-center justify-between">
              <div className="text-[17px] font-extrabold">Choose a ride</div>
              {Object.values(quotes)[0]?.surge > 1 && <Chip tone="surge">⚡ {Object.values(quotes)[0].surge}× high demand</Chip>}
            </div>
            <div className="space-y-2">
              {classes.map((c) => {
                const qt = quotes[c.id];
                const sel = cls === c.id;
                const avail = nearby.filter((n) => n.vehicle_class_id === c.id).length;
                return (
                  <button key={c.id} onClick={() => setCls(c.id)}
                    className={`flex w-full items-center gap-3 rounded-2xl px-3.5 py-3 text-left ring-1 transition ${sel ? "bg-flo/10 ring-flo" : "bg-ink ring-line"}`}>
                    <div className="grid h-11 w-11 place-items-center rounded-xl bg-fg/[0.04]">
                      <VehicleGlyph kind={c.id} color={brand.classes[c.id]?.color} size={24} />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2 text-[15px] font-bold">{c.label}{c.id === "bike_ev" && <Chip>EV</Chip>}</div>
                      <div className="text-[12px] text-muted">{avail ? `${2 + c.eta_bias_min + (avail > 2 ? 0 : 2)} min away · ${c.seats} seat${c.seats > 1 ? "s" : ""}` : "No captains nearby"}</div>
                    </div>
                    <div className="text-right">
                      {qt && promoOff(c.id, qt.total) > 0 && <div className="text-[11px] text-muted line-through">{rupees(qt.total)}</div>}
                      <div className="text-[16px] font-extrabold">{qt ? rupees(qt.total - promoOff(c.id, qt.total)) : "…"}</div>
                    </div>
                  </button>
                );
              })}
            </div>
            <div className="my-3 flex gap-2 overflow-x-auto">
              {PAY.map((p) => (
                <button key={p} onClick={() => setPay(p)} className={`flex shrink-0 items-center gap-1.5 rounded-full px-3.5 py-2 text-[12px] font-semibold uppercase ring-1 ${pay === p ? "bg-fg text-white ring-fg" : "ring-line text-muted"}`}>
                  {p === "wallet" && <Wallet size={12} />}{p}
                </button>
              ))}
            </div>
            {err && <div className="mb-2 text-xs text-surge-ink">{err}</div>}
            <Btn onClick={book} disabled={!quotes[cls]}>Book {classes.find((c) => c.id === cls)?.label} · {rupees((quotes[cls]?.total ?? 0) - promoOff(cls, quotes[cls]?.total ?? 0))}</Btn>
          </div>
        )}

        {step === "trip" && trip && (
          <TripSheet trip={trip} captain={captain} offers={offers} discount={promoUsed} sim={sim} onCancel={cancel} onSos={sos} onRate={rate} onDone={reset}
            onShare={async () => {
              const text = `I'm on a Flo Tempo ride (${trip.code}) from ${trip.pickup_label} to ${trip.drop_label}${captain ? ` with ${captain.name}, ${captain.vehicle_number}` : ""}.`;
              try { if (navigator.share) await navigator.share({ title: "My Flo Tempo ride", text }); else { await navigator.clipboard.writeText(text); toast("Trip details copied"); } } catch {}
            }} />
        )}
      </div>
    </div>
  );
}

function TripSheet({ trip, captain, offers, discount, sim, onCancel, onSos, onRate, onDone, onShare }: {
  trip: Trip; captain: Captain | null; offers: number; discount: number; sim: boolean;
  onCancel: () => void; onSos: () => void; onRate: (n: number) => void; onDone: () => void; onShare: () => void;
}) {
  if (trip.status === "searching") {
    return (
      <div className="sheet px-5 pb-7 pt-6 text-center">
        <div className="relative mx-auto mb-5 h-16 w-16 rounded-full bg-flo/20 pulse"><div className="absolute inset-4 rounded-full bg-flo" /></div>
        <div className="text-lg font-extrabold">Finding your captain</div>
        <div className="mt-1 text-sm text-muted">{offers ? `Request sent to ${offers} nearby captain${offers > 1 ? "s" : ""}…` : "Looking around you…"}</div>
        {sim && <div className="mt-2 text-[11px] text-flo-ink">Live sim · a nearby captain takes it in a few seconds</div>}
        <div className="my-5 rounded-2xl bg-ink p-3 text-left text-sm ring-1 ring-line">
          <div className="truncate"><span className="text-flo-ink">●</span> {trip.pickup_label}</div>
          <div className="truncate"><span>■</span> {trip.drop_label}</div>
          <div className="mt-1 text-[12px] text-muted">{trip.distance_km} km · est. {rupees(Number(trip.fare_estimate) - discount)} · {trip.pay_mode.toUpperCase()}</div>
        </div>
        <Btn kind="ghost" onClick={onCancel}>Cancel request</Btn>
      </div>
    );
  }
  if (trip.status === "no_captain" || trip.status.startsWith("cancelled")) {
    return (
      <div className="sheet px-5 pb-7 pt-6 text-center">
        <X className="mx-auto mb-3 text-surge-ink" />
        <div className="text-lg font-extrabold">{trip.status === "no_captain" ? "No captains free right now" : trip.status === "cancelled_captain" ? "Captain cancelled" : "Ride cancelled"}</div>
        <div className="mb-5 mt-1 text-sm text-muted">{trip.status === "no_captain" ? "Try again in a minute, or pick another vehicle type." : "No charge was made."}</div>
        <Btn onClick={onDone}>Back to home</Btn>
      </div>
    );
  }
  if (trip.status === "completed") {
    return (
      <div className="sheet px-5 pb-7 pt-5">
        <div className="mb-1 text-center text-[13px] text-flo-ink">Trip complete · {trip.code}</div>
        <div className="text-center text-4xl font-extrabold">{rupees(Number(trip.fare_final) - discount)}</div>
        <div className="mb-4 text-center text-[12px] text-muted">{trip.paid ? `Paid via ${trip.pay_mode.toUpperCase()}` : "Pay cash to your captain"}</div>
        <div className="rounded-2xl bg-ink px-4 py-2 ring-1 ring-line">
          <Row label="Distance" value={`${trip.distance_km} km`} />
          <Row label="Time" value={`${trip.duration_min} min`} />
          {Number(trip.surge) > 1 && <Row label="Demand multiplier" value={`${trip.surge}×`} />}
          {discount > 0 && <Row label="FLOFIRST" value={<span className="text-flo-ink">−{rupees(discount)}</span>} />}
          <Row label="Total" value={rupees(Number(trip.fare_final) - discount)} strong />
        </div>
        <div className="my-4 text-center">
          <div className="mb-2 text-sm font-semibold">Rate {captain?.name.split(" ")[0] ?? "your captain"}</div>
          <div className="flex justify-center gap-2">
            {[1, 2, 3, 4, 5].map((n) => (
              <button key={n} onClick={() => onRate(n)}><Star size={30} className={n <= (trip.rider_rating ?? 0) ? "fill-tempo text-tempo-ink" : "text-fg/15"} /></button>
            ))}
          </div>
        </div>
        <Btn onClick={onDone}>Done</Btn>
      </div>
    );
  }
  // accepted / arrived / ongoing
  const label = trip.status === "accepted" ? "Captain is on the way" : trip.status === "arrived" ? "Captain has arrived" : "On trip";
  return (
    <div className="sheet px-5 pb-6 pt-4">
      <div className="mb-3 flex items-center justify-between">
        <div><div className="text-[17px] font-extrabold">{label}</div>
          <div className="text-[12px] text-muted">{trip.status === "ongoing" ? `Dropping at ${trip.drop_label}` : "Share the PIN to start the ride"}</div></div>
        {trip.status !== "ongoing" && (
          <div className="rounded-xl bg-fg px-3 py-1.5 text-center text-white"><div className="text-[9px] font-bold uppercase tracking-widest">PIN</div><div className="text-xl font-extrabold tracking-[0.2em]">{trip.start_otp}</div></div>
        )}
      </div>
      {captain && (
        <div className="flex items-center gap-3 rounded-2xl bg-ink p-3 ring-1 ring-line">
          <div className="grid h-12 w-12 place-items-center rounded-full bg-flo/20 font-bold text-flo-ink">{captain.name.split(" ").map((s) => s[0]).join("")}</div>
          <div className="min-w-0 flex-1">
            <div className="font-bold">{captain.name} <Stars n={captain.rating} /></div>
            <div className="text-[12px] text-muted">{captain.vehicle_model} · {captain.trips_count.toLocaleString("en-IN")} trips</div>
            <div className="mt-1 inline-block rounded-md bg-tempo px-1.5 py-0.5 text-[11px] font-extrabold tracking-wider text-fg">{captain.vehicle_number}</div>
          </div>
          <a href={`tel:${captain.phone}`} className="grid h-10 w-10 place-items-center rounded-full bg-flo/15 text-flo-ink"><PhoneIcon size={16} /></a>
        </div>
      )}
      <div className="mt-3 grid grid-cols-3 gap-2">
        <button onClick={onSos} className="flex flex-col items-center gap-1 rounded-2xl bg-surge/10 py-2.5 text-[11px] font-bold text-surge-ink ring-1 ring-surge/30"><Shield size={16} />SOS</button>
        <button onClick={onShare} className="flex flex-col items-center gap-1 rounded-2xl bg-ink py-2.5 text-[11px] font-bold ring-1 ring-line"><Share2 size={16} />Share trip</button>
        <div className="flex flex-col items-center justify-center rounded-2xl bg-ink py-2.5 ring-1 ring-line"><div className="text-[15px] font-extrabold">{rupees(Number(trip.fare_estimate) - discount)}</div><div className="text-[10px] uppercase text-muted">{trip.pay_mode}</div></div>
      </div>
      {trip.status !== "ongoing" && <button onClick={onCancel} className="mt-3 w-full text-center text-[12px] text-muted underline">Cancel ride</button>}
    </div>
  );
}
