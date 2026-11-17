"use client";
import { useEffect, useRef } from "react";
import maplibregl, { Map as MLMap, Marker } from "maplibre-gl";
import { CITY } from "@/lib/brand";

export type Pin = {
  id: string;
  lat: number;
  lng: number;
  color?: string;
  kind?: "captain" | "pickup" | "drop" | "surge";
  label?: string;
  heading?: number;
  radiusKm?: number;
  /** vehicle class id for captains: bike | bike_ev | auto | cab (defaults to bike) */
  vehicle?: string;
};

// CARTO's basemap CDN now answers "API KEY REQUIRED" tiles; OpenFreeMap is keyless.
const STYLE = "https://tiles.openfreemap.org/styles/positron";

function el(pin: Pin) {
  const d = document.createElement("div");
  const c = pin.color ?? "#00D08A";
  if (pin.kind === "surge") {
    d.style.cssText = `width:${Math.max(28, (pin.radiusKm ?? 2) * 14)}px;aspect-ratio:1;border-radius:999px;background:${c}22;border:1px solid ${c}66`;
    return d;
  }
  if (pin.kind === "pickup" || pin.kind === "drop") {
    const ring = pin.kind === "pickup" ? c : "#0E1A24";
    d.innerHTML = `<div style="display:flex;align-items:center;gap:6px">
      <div style="width:14px;height:14px;border-radius:${pin.kind === "pickup" ? "999px" : "3px"};background:${ring};box-shadow:0 0 0 4px ${ring}33"></div>
      ${pin.label ? `<div style="font:600 11px Inter,sans-serif;color:#0E1A24;background:#FFFFFFF2;box-shadow:0 1px 4px rgba(14,26,36,.18);padding:3px 7px;border-radius:7px;white-space:nowrap">${pin.label}</div>` : ""}
    </div>`;
    return d;
  }
  // captain: white badge with the vehicle glyph, heading pointer on the rim
  d.innerHTML = captainHTML(pin);
  d.dataset.cap = capKey(pin);
  d.title = pin.label ?? "";
  return d;
}

function capKey(pin: Pin) {
  return `${pin.vehicle ?? "bike"}|${pin.color ?? "#00D08A"}`;
}

function glyph(vehicle: string, c: string) {
  const s = `fill="none" stroke="${c}" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"`;
  if (vehicle === "cab")
    return `<g ${s}><path d="M3 16v-4l2.5-5h13L21 12v4z"/><path d="M5.5 12h13"/><circle cx="7.5" cy="17" r="1.8" fill="#fff"/><circle cx="16.5" cy="17" r="1.8" fill="#fff"/></g>`;
  if (vehicle === "auto")
    return `<g ${s}><path d="M4 15V9a4 4 0 0 1 4-4h6l4.5 5.5V15"/><path d="M3 15h18"/><path d="M12 5v10"/><circle cx="6.5" cy="17.5" r="2" fill="#fff"/><circle cx="17.5" cy="17.5" r="2" fill="#fff"/></g>`;
  // bike / bike_ev: electric scooter
  const bolt =
    vehicle === "bike_ev"
      ? `<path d="M7.6 2.5 5.4 6.6h2.3l-1.1 3.4 3.2-4.4H7.5l1.2-3.1z" fill="${c}" stroke="none"/>`
      : "";
  return `<g ${s}><circle cx="5.5" cy="17" r="2.6"/><circle cx="18.5" cy="17" r="2.6"/><path d="M8.1 17h7.8"/><path d="M15.9 17 17 6.5h2.5"/><path d="M5.5 17l2.6-5h4.4"/></g>${bolt}`;
}

function captainHTML(pin: Pin) {
  const c = pin.color ?? "#00D08A";
  const v = pin.vehicle ?? "bike";
  return `<div style="position:relative;width:36px;height:36px">
    <div class="ft-head" style="position:absolute;inset:-7px;transform:rotate(${pin.heading ?? 0}deg);transition:transform .6s ease">
      <svg width="12" height="8" viewBox="0 0 12 8" style="position:absolute;left:50%;top:0;margin-left:-6px"><path d="M6 0 L12 8 H0 Z" fill="${c}"/></svg>
    </div>
    <div style="position:absolute;inset:0;border-radius:999px;background:#FFFFFF;border:2px solid ${c};box-shadow:0 2px 8px rgba(14,26,36,.25);display:flex;align-items:center;justify-content:center">
      <svg width="22" height="22" viewBox="0 0 24 24">${glyph(v, c)}</svg>
    </div>
  </div>`;
}

export function CityMap({
  pins = [],
  route,
  center,
  zoom = 12.2,
  className = "",
  interactive = true,
}: {
  pins?: Pin[];
  route?: { from: [number, number]; to: [number, number] } | null;
  center?: [number, number];
  zoom?: number;
  className?: string;
  interactive?: boolean;
}) {
  const box = useRef<HTMLDivElement>(null);
  const map = useRef<MLMap | null>(null);
  const marks = useRef<Record<string, Marker>>({});

  useEffect(() => {
    if (!box.current || map.current) return;
    const m = new maplibregl.Map({
      container: box.current,
      style: STYLE,
      center: center ?? CITY.centre,
      zoom,
      interactive,
      attributionControl: { compact: true },
      // phones report 3x; 2x looks identical and halves the GPU work
      pixelRatio: Math.min(typeof window !== "undefined" ? window.devicePixelRatio : 1, 2),
      fadeDuration: 0,
    });
    // no accidental rotate / tilt on phones: two-finger gestures only zoom
    m.dragRotate.disable();
    m.touchZoomRotate.disableRotation();
    m.touchPitch.disable();
    map.current = m;
    return () => {
      m.remove();
      map.current = null;
      marks.current = {};
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // pins
  useEffect(() => {
    const m = map.current;
    if (!m) return;
    const seen = new Set<string>();
    for (const p of pins) {
      seen.add(p.id);
      const existing = marks.current[p.id];
      if (existing) {
        glide(existing, p.lng, p.lat);
        if (p.kind === "captain") {
          const node = existing.getElement();
          if (node.dataset.cap !== capKey(p)) {
            node.innerHTML = captainHTML(p);
            node.dataset.cap = capKey(p);
          } else {
            const head = node.querySelector<HTMLElement>(".ft-head");
            if (head) head.style.transform = `rotate(${p.heading ?? 0}deg)`;
          }
          node.title = p.label ?? "";
        }
      } else {
        marks.current[p.id] = new maplibregl.Marker({ element: el(p) })
          .setLngLat([p.lng, p.lat])
          .addTo(m);
      }
    }
    for (const id of Object.keys(marks.current)) {
      if (!seen.has(id)) {
        marks.current[id].remove();
        delete marks.current[id];
      }
    }
  }, [pins]);

  const routeKey = route ? `${route.from.join(",")}>${route.to.join(",")}` : "";
  const centerKey = center ? center.join(",") : "";

  // route line + fit
  useEffect(() => {
    const m = map.current;
    if (!m) return;
    const draw = () => {
      const data = {
        type: "FeatureCollection" as const,
        features: route
          ? [
              {
                type: "Feature" as const,
                properties: {},
                geometry: { type: "LineString" as const, coordinates: curve(route.from, route.to) },
              },
            ]
          : [],
      };
      const src = m.getSource("route") as maplibregl.GeoJSONSource | undefined;
      if (src) src.setData(data);
      else {
        m.addSource("route", { type: "geojson", data });
        m.addLayer({
          id: "route-glow",
          type: "line",
          source: "route",
          paint: { "line-color": "#00D08A", "line-width": 9, "line-opacity": 0.18, "line-blur": 3 },
        });
        m.addLayer({
          id: "route",
          type: "line",
          source: "route",
          paint: { "line-color": "#00D08A", "line-width": 3.2 },
        });
      }
      if (route) {
        const h = m.getContainer().clientHeight;
        m.fitBounds(
          [
            [Math.min(route.from[0], route.to[0]), Math.min(route.from[1], route.to[1])],
            [Math.max(route.from[0], route.to[0]), Math.max(route.from[1], route.to[1])],
          ],
          { padding: { top: 70, bottom: Math.min(330, Math.round(h * 0.45)), left: 50, right: 50 }, duration: 700 }
        );
      }
    };
    if (m.isStyleLoaded()) draw();
    else m.once("load", draw);
    // keyed on the coordinates, not the object: callers rebuild `route` every render,
    // and re-fitting on each captain ping made the map zoom by itself over and over
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [routeKey]);

  useEffect(() => {
    if (map.current && center) map.current.easeTo({ center, duration: 700 });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [centerKey]);

  // maplibre's unlayered `.maplibregl-map { position: relative }` beats Tailwind's
  // layered `absolute`, so the map gets its own inner box sized by inline style.
  return (
    <div className={className}>
      <div ref={box} style={{ position: "absolute", inset: 0 }} />
    </div>
  );
}

/** a gentle arc so the line reads as a road, not a ruler */
function curve(a: [number, number], b: [number, number]) {
  const pts: [number, number][] = [];
  const mx = (a[0] + b[0]) / 2 + (b[1] - a[1]) * 0.12;
  const my = (a[1] + b[1]) / 2 - (b[0] - a[0]) * 0.12;
  for (let t = 0; t <= 1.0001; t += 0.05) {
    const x = (1 - t) ** 2 * a[0] + 2 * (1 - t) * t * mx + t ** 2 * b[0];
    const y = (1 - t) ** 2 * a[1] + 2 * (1 - t) * t * my + t ** 2 * b[1];
    pts.push([x, y]);
  }
  return pts;
}

/** move a marker to a new position over ~1.1s instead of jumping (GPS pings arrive every 1–3s) */
const gliding = new WeakMap<Marker, number>();
function glide(mk: Marker, lng: number, lat: number) {
  const from = mk.getLngLat();
  const dLng = lng - from.lng, dLat = lat - from.lat;
  if (Math.abs(dLng) + Math.abs(dLat) < 1e-7) return;
  const prev = gliding.get(mk);
  if (prev) cancelAnimationFrame(prev);
  // big jumps (first fix, teleports) and reduced-motion users snap straight there
  if (Math.abs(dLng) + Math.abs(dLat) > 0.03 || matchMedia("(prefers-reduced-motion: reduce)").matches) {
    mk.setLngLat([lng, lat]);
    return;
  }
  const t0 = performance.now(), dur = 1100;
  const step = (now: number) => {
    const k = Math.min(1, (now - t0) / dur);
    const e = k * (2 - k); // ease-out
    mk.setLngLat([from.lng + dLng * e, from.lat + dLat * e]);
    if (k < 1) gliding.set(mk, requestAnimationFrame(step));
    else gliding.delete(mk);
  };
  gliding.set(mk, requestAnimationFrame(step));
}
