export function Logo({ size = 28, mono = false }: { size?: number; mono?: boolean }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" aria-hidden>
      <rect width="48" height="48" rx="13" fill={mono ? "#fff" : "#00D08A"} />
      {/* speed chevrons forming an F */}
      <path d="M13 14h21l-4 6H13z" fill={mono ? "#0A1017" : "#06231A"} />
      <path d="M13 23h15l-4 6H13z" fill={mono ? "#0A1017" : "#06231A"} />
      <path d="M13 32h9l-4 6h-5z" fill={mono ? "#0A1017" : "#06231A"} opacity=".55" />
    </svg>
  );
}

export function Wordmark({ size = 28, sub }: { size?: number; sub?: string }) {
  return (
    <div className="flex items-center gap-2.5">
      <Logo size={size} />
      <div className="leading-none">
        <div className="font-extrabold tracking-tight" style={{ fontSize: size * 0.64 }}>
          flo<span className="text-flo">tempo</span>
        </div>
        {sub && <div className="text-[10px] uppercase tracking-[0.18em] text-muted mt-1">{sub}</div>}
      </div>
    </div>
  );
}
