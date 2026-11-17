import { db } from "@/lib/db";
import type { Captain, Trip } from "@/lib/types";

/**
 * Demo simulation: plays the captain's side of a ride so the rider app works on its own.
 * A captain open in the captain app (same browser, e.g. /demo) is "human-held": the
 * simulator never accepts offers for it or drives its trips, so a person can play it.
 */

const HUMAN_KEY = (id: string) => `flotempo:human:${id}`;
const HUMAN_TTL = 6000;

/** called by the captain app every couple of seconds while it is open */
export function markHuman(captainId: string) {
  try { localStorage.setItem(HUMAN_KEY(captainId), String(Date.now())); } catch {}
}

export function isHuman(captainId: string | null | undefined) {
  if (!captainId) return false;
  try { return Date.now() - Number(localStorage.getItem(HUMAN_KEY(captainId)) ?? 0) < HUMAN_TTL; } catch { return false; }
}

const ACCEPT_AFTER_MS = 7000; // leaves a person in the captain app time to accept first
const ARRIVED_PAUSE_MS = 4500; // time for the rider to see the PIN
const LEG_TICKS = 10; // each drive leg takes about this many ticks

const arrivedAt = new Map<string, number>();

/** move a captain one tick toward a point; returns true once there */
async function driveToward(c: Captain, lat: number, lng: number) {
  const from = { lat: c.lat ?? lat, lng: c.lng ?? lng };
  const dLat = lat - from.lat, dLng = lng - from.lng;
  const dist = Math.hypot(dLat, dLng);
  if (dist < 0.0006) return true;
  const step = Math.min(1, Math.max(0.0025, dist / LEG_TICKS) / dist);
  const heading = Math.round((Math.atan2(dLng, dLat) * 180) / Math.PI);
  await db.rpc("ping_location", { p_captain: c.id, p_lat: from.lat + dLat * step, p_lng: from.lng + dLng * step, p_heading: heading });
  return false;
}

const inFlight = new Set<string>();
const quiet = () => {};

/** advance one trip by one tick; safe to call repeatedly and from several places */
export async function simTick(snapshot: Trip) {
  if (inFlight.has(snapshot.id)) return;
  inFlight.add(snapshot.id);
  try {
    // always act on the live row: end_trip/start_trip don't guard their status server-side
    const { data: trip } = await db.from("trips").select("*").eq("id", snapshot.id).single();
    if (trip) await step(trip as Trip);
  } finally {
    inFlight.delete(snapshot.id);
  }
}

async function step(trip: Trip) {
  if (trip.status === "searching") {
    const { data: offers } = await db.from("ride_offers").select("id, captain_id, state, wave, created_at, distance_to_pickup_km")
      .eq("trip_id", trip.id).order("distance_to_pickup_km");
    const pending = (offers ?? []).filter((x) => x.state === "pending");
    const ripe = pending.filter((x) => Date.now() - new Date(x.created_at).getTime() > ACCEPT_AFTER_MS);
    const o = ripe.find((x) => !isHuman(x.captain_id));
    if (o) { await db.rpc("accept_offer", { p_offer: o.id }).then(quiet, quiet); return; }
    // nobody pending: widen the search instead of waiting for the 90s no-captain sweep
    if (!pending.length && Date.now() - new Date(trip.requested_at).getTime() > 3000) {
      const wave = Math.max(1, ...(offers ?? []).map((x) => Number(x.wave) || 1)) + 1;
      await db.rpc("dispatch", { p_trip: trip.id, p_wave: wave, p_radius: 8, p_limit: 5 }).then(quiet, quiet);
    }
    await db.rpc("expire_offers").then(quiet, quiet);
    return;
  }
  if (!["accepted", "arrived", "ongoing"].includes(trip.status) || !trip.captain_id || isHuman(trip.captain_id)) return;

  const { data: c } = await db.from("captains").select("*").eq("id", trip.captain_id).single();
  if (!c) return;

  if (trip.status === "accepted") {
    if (await driveToward(c, trip.pickup_lat, trip.pickup_lng)) await db.rpc("mark_arrived", { p_trip: trip.id });
  } else if (trip.status === "arrived") {
    const t0 = arrivedAt.get(trip.id) ?? Date.now();
    arrivedAt.set(trip.id, t0);
    if (Date.now() - t0 > ARRIVED_PAUSE_MS) { arrivedAt.delete(trip.id); await db.rpc("start_trip", { p_trip: trip.id, p_otp: trip.start_otp }); }
  } else if (await driveToward(c, trip.drop_lat, trip.drop_lng)) {
    await db.rpc("end_trip", { p_trip: trip.id });
  }
}
