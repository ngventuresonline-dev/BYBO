"use client";
import { useEffect, useMemo, useRef, useState } from "react";
import { db, rupees } from "@/lib/db";
import { brand } from "@/lib/brand";
import type { Captain, RideOffer, Trip } from "@/lib/types";
import { CityMap, Pin } from "@/components/CityMap";
import { Btn, Chip, Row, Stars, VehicleGlyph } from "@/components/ui";
import { Wordmark } from "@/components/Logo";
import { markHuman } from "@/lib/sim";
import { Navigation, ShieldCheck, Wallet, AlertTriangle, ChevronDown } from "lucide-react";

type Ledger = { id: number; kind: string; amount: number; balance_after: number; note: string; at: string };
const NEG_LIMIT = -300; // captains below this can't take cash trips

export default function CaptainApp() {
  const [list, setList] = useState<Captain[]>([]);
  const [me, setMe] = useState<Captain | null>(null);
  const [offer, setOffer] = useState<(RideOffer & { trip: Trip }) | null>(null);
  const [trip, setTrip] = useState<Trip | null>(null);
  const [otp, setOtp] = useState("");
  const [err, setErr] = useState("");
  const [tab, setTab] = useState<"home" | "wallet">("home");
  const [ledger, setLedger] = useState<Ledger[]>([]);
  const [today, setToday] = useState({ trips: 0, earn: 0 });
  const [now, setNow] = useState(Date.now());
  const [toast, setToast] = useState("");

  useEffect(() => { if (!toast) return; const t = setTimeout(() => setToast(""), 2500); return () => clearTimeout(t); }, [toast]);

  // tell the rider-side simulator this captain is driven by a human
  useEffect(() => {
    if (!me?.id) return;
    const id = me.id;
    markHuman(id);
    const t = setInterval(() => markHuman(id), 2000);
    return () => clearInterval(t);
  }, [me?.id]);

  useEffect(() => {
    db.from("captains").select("*").eq("kyc_status", "approved").order("name").then(({ data }) => {
      setList(data ?? []);
      const saved = typeof window !== "undefined" ? new URLSearchParams(location.search).get("c") : null;
      const pick = (data ?? []).find((c) => c.id === saved || c.phone.endsWith(saved ?? "x")) ?? (data ?? []).find((c) => c.name === "Manjunath K") ?? data?.[0];
      if (pick) setMe(pick);
    });
  }, []);

  useEffect(() => { const t = setInterval(() => setNow(Date.now()), 500); return () => clearInterval(t); }, []);

  // my record, offers and live trip
  useEffect(() => {
    if (!me) return;
    loadSide(me.id);
    db.from("trips").select("*").eq("captain_id", me.id).in("status", ["accepted", "arrived", "ongoing"]).limit(1)
      .then(({ data }) => setTrip(data?.[0] ?? null));
    pullOffer(me.id);
    const ch = db.channel("cap-" + me.id)
      .on("postgres_changes", { event: "*", schema: "flotempo", table: "ride_offers", filter: `captain_id=eq.${me.id}` }, () => pullOffer(me.id))
      .on("postgres_changes", { event: "UPDATE", schema: "flotempo", table: "captains", filter: `id=eq.${me.id}` }, ({ new: c }) => setMe(c as Captain))
      .on("postgres_changes", { event: "UPDATE", schema: "flotempo", table: "trips", filter: `captain_id=eq.${me.id}` }, ({ new: t }) => {
        const tt = t as Trip;
        setTrip(["accepted", "arrived", "ongoing"].includes(tt.status) ? tt : null);
        if (tt.status === "completed") loadSide(me.id);
      })
      .subscribe();
    return () => { db.removeChannel(ch); };
  }, [me?.id]); // eslint-disable-line react-hooks/exhaustive-deps

  async function loadSide(id: string) {
    const since = new Date(); since.setHours(0, 0, 0, 0);
    const [{ data: l }, { data: t }] = await Promise.all([
      db.from("wallet_ledger").select("*").eq("captain_id", id).order("at", { ascending: false }).limit(30),
      db.from("trips").select("captain_earning").eq("captain_id", id).eq("status", "completed").gte("ended_at", since.toISOString()),
    ]);
    setLedger(l ?? []);
    setToday({ trips: t?.length ?? 0, earn: (t ?? []).reduce((s, x) => s + Number(x.captain_earning), 0) });
  }

  async function pullOffer(id: string) {
    const { data } = await db.from("ride_offers").select("*, trip:trips(*)").eq("captain_id", id).eq("state", "pending")
      .gt("expires_at", new Date().toISOString()).order("created_at", { ascending: false }).limit(1);
    setOffer((data?.[0] as RideOffer & { trip: Trip }) ?? null);
  }

  // simulate GPS: drive towards pickup, then drop
  const tick = useRef(0);
  useEffect(() => {
    if (!me || !trip) return;
    const t = setInterval(async () => {
      const target = trip.status === "ongoing" ? [trip.drop_lat, trip.drop_lng] : [trip.pickup_lat, trip.pickup_lng];
      if (trip.status === "arrived") return;
      const lat = me.lat ?? target[0], lng = me.lng ?? target[1];
      const dLat = target[0] - lat, dLng = target[1] - lng;
      const dist = Math.hypot(dLat, dLng);
      if (dist < 0.0004) return;
      const step = Math.min(1, 0.0022 / dist);
      const heading = (Math.atan2(dLng, dLat) * 180) / Math.PI;
      tick.current++;
      await db.rpc("ping_location", { p_captain: me.id, p_lat: lat + dLat * step, p_lng: lng + dLng * step, p_heading: Math.round(heading) });
    }, 1500);
    return () => clearInterval(t);
  }, [me, trip]);

  async function duty(on: boolean) {
    if (!me) return;
    await db.from("captains").update({ duty: on ? "online" : "offline" }).eq("id", me.id);
    setMe({ ...me, duty: on ? "online" : "offline" });
  }
  async function accept() {
    if (!offer) return; setErr("");
    const { data, error } = await db.rpc("accept_offer", { p_offer: offer.id });
    if (error) { setErr(error.message === "trip already taken" ? "Another captain took this ride." : error.message); setOffer(null); return; }
    setTrip(data as Trip); setOffer(null);
  }
  async function decline() { if (offer) await db.rpc("decline_offer", { p_offer: offer.id }); setOffer(null); }
  async function arrived() { if (trip) await db.rpc("mark_arrived", { p_trip: trip.id }); }
  async function start() {
    if (!trip) return; setErr("");
    const { error } = await db.rpc("start_trip", { p_trip: trip.id, p_otp: otp });
    if (error) setErr("Wrong PIN — ask the rider again."); else setOtp("");
  }
  async function walletAction() {
    if (!me) return;
    const bal = Number(me.wallet_balance);
    if (bal < 0) {
      const { error } = await db.from("captains").update({ wallet_balance: 0 }).eq("id", me.id);
      if (error) { setToast("Couldn't pay dues · try again"); return; }
      setMe({ ...me, wallet_balance: 0 });
      setToast("Dues paid · you can take cash rides again");
    } else if (bal > 0) {
      setToast(`Withdrawal of ${rupees(bal)} requested · reaches your bank in 2 hrs`);
    }
  }
  async function end() { if (trip) await db.rpc("end_trip", { p_trip: trip.id }); }
  async function cancel() { if (trip) await db.rpc("cancel_trip", { p_trip: trip.id, p_by: "captain", p_reason: "Rider not reachable" }); }

  const pins = useMemo<Pin[]>(() => {
    const ps: Pin[] = [];
    if (me?.lat) ps.push({ id: "me", kind: "captain", lat: me.lat, lng: me.lng!, heading: Number(me.heading), color: brand.classes[me.vehicle_class_id]?.color, vehicle: me.vehicle_class_id });
    const t = trip ?? offer?.trip;
    if (t) {
      ps.push({ id: "p", kind: "pickup", lat: t.pickup_lat, lng: t.pickup_lng, label: "Pickup" });
      ps.push({ id: "d", kind: "drop", lat: t.drop_lat, lng: t.drop_lng, label: "Drop" });
    }
    return ps;
  }, [me, trip, offer]);
  const t = trip ?? offer?.trip;
  const route = t ? { from: [t.pickup_lng, t.pickup_lat] as [number, number], to: [t.drop_lng, t.drop_lat] as [number, number] } : null;

  if (!me) return <div className="grid h-full place-items-center bg-ink text-muted">Loading…</div>;
  const secs = offer ? Math.max(0, Math.ceil((new Date(offer.expires_at).getTime() - now) / 1000)) : 0;
  const blocked = Number(me.wallet_balance) < NEG_LIMIT;

  return (
    <div className="relative h-full w-full overflow-hidden bg-ink text-fg">
      <CityMap className="absolute inset-0" pins={pins} route={route} center={me.lat && !t ? [me.lng!, me.lat] : undefined} zoom={13.5} />

      {/* header */}
      <div className="absolute inset-x-0 top-0 z-10 mx-auto max-w-[480px] space-y-2 p-4 pt-[max(1rem,env(safe-area-inset-top))]">
        <div className="flex items-center justify-between rounded-2xl bg-ink/90 px-3 py-2.5 ring-1 ring-line backdrop-blur">
          <Wordmark size={22} sub="Captain" />
          <button onClick={() => !trip && duty(me.duty === "offline")} disabled={!!trip}
            className={`flex items-center gap-2 rounded-full px-3 py-1.5 text-[12px] font-extrabold ${me.duty === "offline" ? "bg-fg/[0.07] text-muted" : "bg-flo text-[#06231A]"}`}>
            <span className={`h-2 w-2 rounded-full ${me.duty === "offline" ? "bg-muted" : "bg-[#06231A]"}`} />
            {me.duty === "offline" ? "OFFLINE" : me.duty === "on_trip" ? "ON TRIP" : "ONLINE"}
          </button>
        </div>
        <div className="relative">
          <select value={me.id} onChange={(e) => { const c = list.find((x) => x.id === e.target.value); if (c) { setMe(c); setTrip(null); setOffer(null); } }}
            className="w-full appearance-none truncate rounded-xl bg-ink/90 py-2 pl-3 pr-8 text-[12px] text-muted ring-1 ring-line">
            {list.map((c) => <option key={c.id} value={c.id}>Demo as: {c.name} · {c.vehicle_class_id} · {c.vehicle_number}</option>)}
          </select>
          <ChevronDown size={14} className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-muted" />
        </div>
        {toast && (
          <div className="flex justify-center">
            <div role="status" className="rounded-full bg-fg px-4 py-2 text-center text-[12px] font-bold text-white shadow-lg">{toast}</div>
          </div>
        )}
      </div>

      <div className="absolute inset-x-0 bottom-0 z-10 mx-auto max-w-[480px]">
        {/* incoming offer */}
        {offer && !trip && (
          <div className="sheet px-5 pb-6 pt-4">
            <div className="mb-3 flex items-center justify-between">
              <Chip tone="tempo">New ride request</Chip>
              <div className="relative grid h-12 w-12 place-items-center">
                <svg className="absolute inset-0 -rotate-90" viewBox="0 0 36 36"><circle cx="18" cy="18" r="16" fill="none" stroke="#E1E7EE" strokeWidth="3" />
                  <circle cx="18" cy="18" r="16" fill="none" stroke="#00D08A" strokeWidth="3" strokeDasharray={`${(secs / 20) * 100.5} 100.5`} /></svg>
                <span className="text-sm font-extrabold">{secs}</span>
              </div>
            </div>
            <div className="text-4xl font-extrabold">{rupees(offer.trip.fare_estimate)}
              {Number(offer.trip.surge) > 1 && <span className="ml-2 align-middle"><Chip tone="surge">{offer.trip.surge}× surge</Chip></span>}</div>
            <div className="mb-3 text-[12px] text-muted">You earn ≈ {rupees(Number(offer.trip.fare_estimate) * 0.8)} · {offer.trip.pay_mode.toUpperCase()}</div>
            <div className="space-y-2 rounded-2xl bg-ink p-3 text-sm ring-1 ring-line">
              <div><span className="text-flo-ink">●</span> {offer.trip.pickup_label} <span className="text-muted">· {offer.distance_to_pickup_km} km away</span></div>
              <div><span>■</span> {offer.trip.drop_label} <span className="text-muted">· {offer.trip.distance_km} km trip</span></div>
            </div>
            {err && <div className="mt-2 text-xs text-surge-ink">{err}</div>}
            <div className="mt-4 grid grid-cols-3 gap-2">
              <Btn kind="ghost" onClick={decline}>Skip</Btn>
              <Btn onClick={accept} className="col-span-2" disabled={blocked && offer.trip.pay_mode === "cash"}>Accept ride</Btn>
            </div>
          </div>
        )}

        {/* active trip */}
        {trip && (
          <div className="sheet px-5 pb-6 pt-4">
            <div className="mb-2 flex items-center justify-between gap-2">
              <div className="min-w-0 text-[17px] font-extrabold">{trip.status === "accepted" ? "Go to pickup" : trip.status === "arrived" ? "Verify rider PIN" : "Drop the rider"}</div>
              <a target="_blank" rel="noreferrer" href={`https://www.google.com/maps/dir/?api=1&destination=${trip.status === "ongoing" ? `${trip.drop_lat},${trip.drop_lng}` : `${trip.pickup_lat},${trip.pickup_lng}`}&travelmode=driving`}
                className="flex shrink-0 items-center gap-1 rounded-full bg-sky/15 px-3 py-2 text-[12px] font-bold text-sky-ink"><Navigation size={13} />Navigate</a>
            </div>
            <div className="mb-3 rounded-2xl bg-ink p-3 text-sm ring-1 ring-line">
              <div className={trip.status === "ongoing" ? "text-muted line-through" : ""}><span className="text-flo-ink">●</span> {trip.pickup_label}</div>
              <div><span>■</span> {trip.drop_label}</div>
              <div className="mt-1 text-[12px] text-muted">{trip.code} · {trip.distance_km} km · {rupees(trip.fare_estimate)} · {trip.pay_mode.toUpperCase()}</div>
            </div>
            {trip.status === "accepted" && <><Btn onClick={arrived}>I&apos;ve arrived</Btn><button onClick={cancel} className="mt-2 w-full text-[12px] text-muted underline">Cancel trip</button></>}
            {trip.status === "arrived" && (
              <>
                <input value={otp} onChange={(e) => setOtp(e.target.value.replace(/\D/g, "").slice(0, 4))} inputMode="numeric" placeholder="• • • •"
                  className="mb-2 w-full rounded-2xl bg-ink py-3 text-center text-2xl font-extrabold tracking-[0.5em] outline-none ring-1 ring-line focus:ring-flo" />
                {err && <div className="mb-2 text-center text-xs text-surge-ink">{err}</div>}
                <Btn onClick={start} disabled={otp.length !== 4}>Start ride</Btn>
              </>
            )}
            {trip.status === "ongoing" && <Btn kind="amber" onClick={end}>End ride · collect {trip.pay_mode === "cash" ? "cash" : "nothing (prepaid)"}</Btn>}
          </div>
        )}

        {/* idle */}
        {!offer && !trip && (
          <div className="sheet px-5 pb-6 pt-3">
            <div className="mb-3 flex gap-1 rounded-xl bg-ink p-1 ring-1 ring-line">
              {(["home", "wallet"] as const).map((x) => (
                <button key={x} onClick={() => setTab(x)} className={`flex-1 rounded-lg py-2 text-[12px] font-bold capitalize ${tab === x ? "bg-fg/[0.07]" : "text-muted"}`}>{x === "home" ? "Today" : "Wallet"}</button>
              ))}
            </div>
            {tab === "home" ? (
              <>
                <div className="grid grid-cols-3 gap-2 text-center">
                  <Stat label="Earned today" value={rupees(today.earn)} />
                  <Stat label="Trips" value={String(today.trips)} />
                  <Stat label="Rating" value={<Stars n={me.rating} />} />
                </div>
                <div className="mt-3 flex items-center gap-3 rounded-2xl bg-ink p-3 ring-1 ring-line">
                  <VehicleGlyph kind={me.vehicle_class_id} color={brand.classes[me.vehicle_class_id]?.color} />
                  <div className="min-w-0 flex-1 text-sm"><div className="truncate font-bold">{me.vehicle_model}</div><div className="text-[12px] text-muted">{me.vehicle_number}</div></div>
                  <Chip><ShieldCheck size={12} />KYC verified</Chip>
                </div>
                {blocked && <div className="mt-3 flex gap-2 rounded-2xl bg-surge/10 p-3 text-[12px] text-surge-ink ring-1 ring-surge/30"><AlertTriangle size={16} />Wallet below {rupees(NEG_LIMIT)}. Recharge to receive cash rides.</div>}
                <div className="mt-3 text-center text-[12px] text-muted">{me.duty === "offline" ? "Go online to start receiving rides." : "Waiting for ride requests near you…"}</div>
              </>
            ) : (
              <>
                <div className="flex items-center justify-between rounded-2xl bg-ink p-4 ring-1 ring-line">
                  <div><div className="text-[12px] text-muted">Wallet balance</div><div className={`text-2xl font-extrabold ${Number(me.wallet_balance) < 0 ? "text-surge-ink" : ""}`}>{rupees(me.wallet_balance)}</div></div>
                  <button onClick={walletAction} disabled={Number(me.wallet_balance) === 0} className="flex items-center gap-1 rounded-full bg-flo disabled:opacity-50 px-3 py-2 text-[12px] font-extrabold text-[#06231A]"><Wallet size={14} />{Number(me.wallet_balance) < 0 ? "Pay dues" : "Withdraw"}</button>
                </div>
                <div className="mt-2 max-h-48 overflow-y-auto">
                  {ledger.length === 0 && <div className="py-6 text-center text-[12px] text-muted">No transactions yet</div>}
                  {ledger.map((l) => (
                    <Row key={l.id} label={l.note} value={<span className={Number(l.amount) < 0 ? "text-surge-ink" : "text-flo-ink"}>{Number(l.amount) < 0 ? "−" : "+"}{rupees(Math.abs(l.amount))}</span>} />
                  ))}
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: React.ReactNode }) {
  return <div className="rounded-2xl bg-ink py-3 ring-1 ring-line"><div className="text-lg font-extrabold">{value}</div><div className="text-[10px] uppercase tracking-wider text-muted">{label}</div></div>;
}
