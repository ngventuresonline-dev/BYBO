"use client";
import { ReactNode } from "react";

export function Btn({
  children, onClick, kind = "primary", disabled, className = "",
}: {
  children: ReactNode; onClick?: () => void;
  kind?: "primary" | "ghost" | "danger" | "amber"; disabled?: boolean; className?: string;
}) {
  const styles: Record<string, string> = {
    primary: "bg-flo text-[#06231A] hover:bg-[#22E6A8]",
    amber: "bg-tempo text-[#2A1D00] hover:brightness-110",
    ghost: "bg-transparent text-fg border border-line hover:bg-ink-soft",
    danger: "bg-surge/15 text-surge-ink border border-surge/40 hover:bg-surge/25",
  };
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`w-full rounded-2xl py-3.5 text-[15px] font-bold transition disabled:opacity-40 disabled:cursor-not-allowed ${styles[kind]} ${className}`}
    >
      {children}
    </button>
  );
}

export function Row({ label, value, strong }: { label: string; value: ReactNode; strong?: boolean }) {
  return (
    <div className="flex items-baseline justify-between py-1.5 text-sm">
      <span className="text-muted">{label}</span>
      <span className={strong ? "font-bold text-[15px]" : "font-medium"}>{value}</span>
    </div>
  );
}

export function Chip({ children, tone = "flo" }: { children: ReactNode; tone?: "flo" | "surge" | "tempo" | "muted" | "sky" }) {
  const t: Record<string, string> = {
    flo: "bg-flo/15 text-flo-ink border-flo/30",
    surge: "bg-surge/15 text-surge-ink border-surge/30",
    tempo: "bg-tempo/15 text-tempo-ink border-tempo/30",
    sky: "bg-sky/15 text-sky-ink border-sky/30",
    muted: "bg-fg/[0.04] text-muted border-fg/10",
  };
  return (
    <span className={`inline-flex items-center gap-1 rounded-full border px-2.5 py-1 text-[11px] font-semibold ${t[tone]}`}>
      {children}
    </span>
  );
}

export function Stars({ n }: { n: number }) {
  return <span className="text-tempo-ink text-xs">★ {Number(n).toFixed(1)}</span>;
}

export function Phone({ children, label }: { children: ReactNode; label?: string }) {
  return (
    <div className="flex flex-col items-center gap-3">
      <div className="phone">{children}</div>
      {label && <div className="text-[11px] uppercase tracking-[0.2em] text-muted">{label}</div>}
    </div>
  );
}

export function VehicleGlyph({ kind, color, size = 22 }: { kind: string; color: string; size?: number }) {
  const sp = { stroke: color, strokeWidth: 1.8, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
  if (kind === "auto") {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <path d="M4 15.5V9a3.5 3.5 0 0 1 3.5-3.5H14c1 0 1.8.6 2.2 1.5L19 13l1.5 1v3.5" {...sp} />
        <path d="M11 5.5V13.5h8" {...sp} />
        <path d="M4 15.5V18h1M9 18h7" {...sp} />
        <circle cx="7" cy="18" r="2" {...sp} />
        <circle cx="18" cy="18" r="2" {...sp} />
      </svg>
    );
  }
  if (kind === "cab") {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <path d="M4.8 16.5H3v-4l1.5-1 2.5-4.5h7.5l4 4.5 2.5.8a1.5 1.5 0 0 1 1 1.4v2.8h-1.8M9 16.5h6" {...sp} />
        <path d="M5 11.5h13M10.5 7v4.5" {...sp} />
        <circle cx="7" cy="16.5" r="2" {...sp} />
        <circle cx="17" cy="16.5" r="2" {...sp} />
      </svg>
    );
  }
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <circle cx="5.5" cy="17" r="2.5" {...sp} />
      <circle cx="18.5" cy="17" r="2.5" {...sp} />
      <path d="M8 17h6.5l2.8-6M18.5 17L16.5 8M15 8h3" {...sp} />
      <path d="M3.5 14.5C4 12.8 5.5 12 7.5 12H11l1 5" {...sp} />
      {kind === "bike_ev" && <path d="M8.5 3L6.5 6.5h3L7.5 10" {...sp} />}
    </svg>
  );
}
