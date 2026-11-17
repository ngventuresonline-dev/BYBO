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
    ghost: "bg-transparent text-[#EAF2F7] border border-line hover:bg-ink-soft",
    danger: "bg-surge/15 text-surge border border-surge/40 hover:bg-surge/25",
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
    flo: "bg-flo/15 text-flo border-flo/30",
    surge: "bg-surge/15 text-surge border-surge/30",
    tempo: "bg-tempo/15 text-tempo border-tempo/30",
    sky: "bg-sky/15 text-sky border-sky/30",
    muted: "bg-white/5 text-muted border-white/10",
  };
  return (
    <span className={`inline-flex items-center gap-1 rounded-full border px-2.5 py-1 text-[11px] font-semibold ${t[tone]}`}>
      {children}
    </span>
  );
}

export function Stars({ n }: { n: number }) {
  return <span className="text-tempo text-xs">★ {Number(n).toFixed(1)}</span>;
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
  if (kind === "auto") {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <path d="M4 16V11c0-3 2.5-5 5.5-5H13l4 5h1.5A2.5 2.5 0 0 1 21 13.5V16" stroke={color} strokeWidth="1.8" strokeLinecap="round" />
        <circle cx="7" cy="17.5" r="2.2" stroke={color} strokeWidth="1.8" />
        <circle cx="18" cy="17.5" r="2.2" stroke={color} strokeWidth="1.8" />
        <path d="M4 16h11" stroke={color} strokeWidth="1.8" />
      </svg>
    );
  }
  if (kind === "cab") {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <path d="M3 16v-3l2-5h14l2 5v3" stroke={color} strokeWidth="1.8" strokeLinecap="round" />
        <path d="M5 13h14" stroke={color} strokeWidth="1.6" />
        <circle cx="7" cy="17" r="2" stroke={color} strokeWidth="1.8" />
        <circle cx="17" cy="17" r="2" stroke={color} strokeWidth="1.8" />
      </svg>
    );
  }
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <circle cx="5.5" cy="17" r="2.6" stroke={color} strokeWidth="1.8" />
      <circle cx="18.5" cy="17" r="2.6" stroke={color} strokeWidth="1.8" />
      <path d="M8 17h7l-2-6h-3M13 11l3-4h3" stroke={color} strokeWidth="1.8" strokeLinecap="round" />
      <path d="M10 7h4" stroke={color} strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}
