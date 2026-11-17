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
};

const STYLE = {
  version: 8 as const,
  sources: {
    carto: {
      type: "raster" as const,
      tiles: [
        "https://a.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}@2x.png",
        "https://b.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}@2x.png",
        "https://c.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}@2x.png",
      ],
      tileSize: 256,
      attribution: "© OpenStreetMap · © CARTO",
    },
  },
  layers: [{ id: "carto", type: "raster" as const, source: "carto" }],
};

function el(pin: Pin) {
  const d = document.createElement("div");
  const c = pin.color ?? "#00D08A";
  if (pin.kind === "surge") {
    d.style.cssText = `width:${Math.max(28, (pin.radiusKm ?? 2) * 14)}px;aspect-ratio:1;border-radius:999px;background:${c}22;border:1px solid ${c}66`;
    return d;
  }
  if (pin.kind === "pickup" || pin.kind === "drop") {
    const ring = pin.kind === "pickup" ? c : "#FFFFFF";
    d.innerHTML = `<div style="display:flex;align-items:center;gap:6px">
      <div style="width:14px;height:14px;border-radius:${pin.kind === "pickup" ? "999px" : "3px"};background:${ring};box-shadow:0 0 0 4px ${ring}33"></div>
      ${pin.label ? `<div style="font:600 11px Inter,sans-serif;color:#EAF2F7;background:#0A1017cc;padding:3px 7px;border-radius:7px;white-space:nowrap">${pin.label}</div>` : ""}
    </div>`;
    return d;
  }
  // captain
  d.innerHTML = `<div style="transform:rotate(${pin.heading ?? 0}deg)">
    <svg width="22" height="22" viewBox="0 0 24 24"><path d="M12 2 L19 21 L12 17 L5 21 Z" fill="${c}" stroke="#0A1017" stroke-width="1.2"/></svg>
  </div>`;
  d.title = pin.label ?? "";
  return d;
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
    });
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
        existing.setLngLat([p.lng, p.lat]);
        const inner = existing.getElement().firstElementChild as HTMLElement | null;
        if (inner && p.kind === "captain") inner.style.transform = `rotate(${p.heading ?? 0}deg)`;
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
        m.fitBounds(
          [
            [Math.min(route.from[0], route.to[0]), Math.min(route.from[1], route.to[1])],
            [Math.max(route.from[0], route.to[0]), Math.max(route.from[1], route.to[1])],
          ],
          { padding: { top: 70, bottom: 330, left: 60, right: 60 }, duration: 700 }
        );
      }
    };
    if (m.isStyleLoaded()) draw();
    else m.once("load", draw);
  }, [route]);

  useEffect(() => {
    if (map.current && center) map.current.easeTo({ center, duration: 700 });
  }, [center]);

  return <div ref={box} className={className} />;
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
