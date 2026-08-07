/**
 * Nine per-industry diagrams. Each draws with `--dc-accent` and `--dc-ink-rgb`
 * so the same markup reads correctly inside a light or a dark bucket.
 */
const MONO = "IBM Plex Mono, monospace";
const A = "var(--dc-accent)";

/** Ink at a given alpha, resolved from whichever section wraps the card. */
const ink = (alpha: number) => `rgba(var(--dc-ink-rgb), ${alpha})`;

type VisualProps = { className?: string };

const box = "block w-full";

export function RfqToQuote({ className = "" }: VisualProps) {
  return (
    <svg viewBox="0 0 240 78" className={`${box} h-[78px] ${className}`} aria-hidden>
      <rect x="4" y="24" width="26" height="34" fill="none" stroke={ink(0.45)} />
      <line x1="10" y1="34" x2="24" y2="34" stroke={ink(0.3)} />
      <line x1="10" y1="41" x2="24" y2="41" stroke={ink(0.3)} />
      <line
        x1="36"
        y1="41"
        x2="196"
        y2="41"
        stroke={A}
        strokeDasharray="7 6"
        style={{ animation: "dc-march 2.6s linear infinite" }}
      />
      <rect x="104" y="33" width="16" height="16" fill={A} />
      <rect x="204" y="24" width="32" height="34" fill="none" stroke={ink(0.45)} />
      <text x="112" y="24" textAnchor="middle" fontFamily={MONO} fontSize="9" fill={A}>
        SPEC CHECK
      </text>
      <text x="17" y="72" textAnchor="middle" fontFamily={MONO} fontSize="9" fill={ink(0.45)}>
        RFQ
      </text>
      <text x="220" y="72" textAnchor="middle" fontFamily={MONO} fontSize="9" fill={ink(0.45)}>
        QUOTE
      </text>
    </svg>
  );
}

export function DocsToPosted({ className = "" }: VisualProps) {
  return (
    <svg viewBox="0 0 240 78" className={`${box} h-[78px] ${className}`} aria-hidden>
      {[14, 32, 50].map((y) => (
        <rect key={y} x="4" y={y} width="22" height="14" fill="none" stroke={ink(0.4)} />
      ))}
      <path d="M30 21 H70 M30 39 H70 M30 57 H70" stroke={ink(0.3)} fill="none" />
      <line
        x1="70"
        y1="39"
        x2="176"
        y2="39"
        stroke={A}
        strokeDasharray="7 6"
        style={{ animation: "dc-march 2.4s linear infinite" }}
      />
      <rect x="112" y="31" width="16" height="16" fill={A} />
      <path
        d="M128 39 C 150 39, 150 14, 176 14"
        stroke={ink(0.35)}
        fill="none"
        strokeDasharray="5 5"
        style={{ animation: "dc-march 3.4s linear infinite" }}
      />
      <rect x="180" y="33" width="14" height="14" fill="none" stroke={ink(0.5)} />
      <rect x="180" y="8" width="14" height="14" fill="none" stroke={ink(0.5)} />
      <text x="204" y="44" fontFamily={MONO} fontSize="9" fill={ink(0.45)}>
        POSTED
      </text>
      <text x="200" y="19" fontFamily={MONO} fontSize="9" fill={ink(0.45)}>
        QUEUE
      </text>
      <text x="120" y="70" textAnchor="middle" fontFamily={MONO} fontSize="9" fill={A}>
        VALIDATE
      </text>
    </svg>
  );
}

export function BillableShift({ className = "" }: VisualProps) {
  return (
    <svg viewBox="0 0 240 78" className={`${box} h-[78px] ${className}`} aria-hidden>
      <text x="4" y="16" fontFamily={MONO} fontSize="9" fill={ink(0.45)}>
        TODAY
      </text>
      <rect x="4" y="22" width="150" height="12" fill={ink(0.2)} />
      <rect x="154" y="22" width="82" height="12" fill={ink(0.45)} />
      <text x="4" y="54" fontFamily={MONO} fontSize="9" fill={A}>
        WITH A SYSTEM
      </text>
      <rect x="4" y="60" width="58" height="12" fill={ink(0.2)} />
      <rect x="62" y="60" width="174" height="12" fill={A} />
      <text x="200" y="18" textAnchor="end" fontFamily={MONO} fontSize="9" fill={ink(0.45)}>
        BILLABLE
      </text>
    </svg>
  );
}

export function GovernedCore({ className = "" }: VisualProps) {
  return (
    <svg viewBox="0 0 340 132" className={`${box} h-[132px] ${className}`} aria-hidden>
      {[
        [20, "DEMAND"],
        [60, "INVENTORY"],
        [100, "LAND DATA"],
      ].map(([y, label]) => (
        <text
          key={label as string}
          x="4"
          y={y as number}
          fontFamily={MONO}
          fontSize="9"
          fill={ink(0.4)}
        >
          {label}
        </text>
      ))}
      {[
        { y1: 17, y2: 50, dur: "2.6s" },
        { y1: 57, y2: 57, dur: "2.2s" },
        { y1: 97, y2: 64, dur: "3s" },
      ].map((l) => (
        <line
          key={l.y1}
          x1="66"
          y1={l.y1}
          x2="140"
          y2={l.y2}
          stroke={A}
          strokeDasharray="6 5"
          style={{ animation: `dc-march ${l.dur} linear infinite` }}
        />
      ))}
      <rect x="142" y="42" width="30" height="30" fill={A} />
      <rect
        x="142"
        y="42"
        width="30"
        height="30"
        fill="none"
        stroke={A}
        style={{
          transformOrigin: "157px 57px",
          animation: "dc-ring 3s ease-out infinite",
        }}
      />
      <text x="157" y="90" textAnchor="middle" fontFamily={MONO} fontSize="9" fill={A}>
        GOVERNED CORE
      </text>
      <path
        d="M172 50 H 200 L 212 26"
        fill="none"
        stroke={ink(0.35)}
        strokeDasharray="5 5"
        style={{ animation: "dc-march 3.4s linear infinite" }}
      />
      <path
        d="M172 64 H 200 L 212 100"
        fill="none"
        stroke={ink(0.35)}
        strokeDasharray="5 5"
        style={{ animation: "dc-march 3.8s linear infinite" }}
      />
      <text x="220" y="30" fontFamily={MONO} fontSize="9" fill={ink(0.55)}>
        SALES DESK
      </text>
      <text x="220" y="98" fontFamily={MONO} fontSize="9" fill={ink(0.55)}>
        INVESTMENT
      </text>
      <text x="220" y="110" fontFamily={MONO} fontSize="9" fill={ink(0.55)}>
        COMMITTEE
      </text>
    </svg>
  );
}

export function SlotFill({ className = "" }: VisualProps) {
  return (
    <svg viewBox="0 0 240 78" className={`${box} h-[78px] ${className}`} aria-hidden>
      {[0, 1, 2, 3, 4].map((i) => (
        <rect
          key={`empty-${i}`}
          x={4 + i * 24}
          y="16"
          width="20"
          height="20"
          fill={i % 2 === 0 ? ink(0.2) : "none"}
          stroke={i % 2 === 0 ? undefined : ink(0.3)}
        />
      ))}
      <text x="128" y="30" fontFamily={MONO} fontSize="9" fill={ink(0.45)}>
        EMPTY SLOTS
      </text>
      {[0, 1, 2, 3, 4].map((i) => (
        <rect
          key={`booked-${i}`}
          x={4 + i * 24}
          y="46"
          width="20"
          height="20"
          fill={i === 4 ? "none" : A}
          stroke={i === 4 ? A : undefined}
        />
      ))}
      <text x="128" y="60" fontFamily={MONO} fontSize="9" fill={A}>
        BOOKED + RECALLED
      </text>
    </svg>
  );
}

export function SeasonSpike({ className = "" }: VisualProps) {
  return (
    <svg viewBox="0 0 240 78" className={`${box} h-[78px] ${className}`} aria-hidden>
      <line x1="4" y1="66" x2="236" y2="66" stroke={ink(0.2)} />
      <polyline
        points="4,60 50,58 90,12 130,16 170,56 236,58"
        fill="none"
        stroke={ink(0.3)}
        strokeWidth="1.5"
        strokeDasharray="420"
        style={{ animation: "dc-draw 2.2s cubic-bezier(0.16,1,0.3,1) forwards" }}
      />
      <line
        x1="4"
        y1="40"
        x2="236"
        y2="40"
        stroke={A}
        strokeWidth="1.5"
        strokeDasharray="8 7"
        style={{ animation: "dc-march 2.6s linear infinite" }}
      />
      <text x="92" y="8" textAnchor="middle" fontFamily={MONO} fontSize="9" fill={ink(0.45)}>
        ADMISSION SEASON
      </text>
      <text x="236" y="34" textAnchor="end" fontFamily={MONO} fontSize="9" fill={A}>
        CAPACITY HELD FLAT
      </text>
    </svg>
  );
}

export function RtoLoop({ className = "" }: VisualProps) {
  return (
    <svg viewBox="0 0 240 78" className={`${box} h-[78px] ${className}`} aria-hidden>
      <line x1="8" y1="30" x2="232" y2="30" stroke={ink(0.3)} />
      <path
        d="M198 30 C 198 58, 62 58, 62 30"
        fill="none"
        stroke="var(--color-alert)"
        strokeDasharray="6 5"
        style={{ animation: "dc-march 3.2s linear infinite" }}
      />
      <rect x="4" y="24" width="10" height="12" fill={ink(0.5)} />
      <rect x="112" y="23" width="14" height="14" fill={A} />
      <rect x="226" y="24" width="10" height="12" fill={ink(0.5)} />
      <text x="4" y="18" fontFamily={MONO} fontSize="9" fill={ink(0.45)}>
        ORDER
      </text>
      <text x="236" y="18" textAnchor="end" fontFamily={MONO} fontSize="9" fill={ink(0.45)}>
        DELIVERED
      </text>
      <text
        x="130"
        y="72"
        textAnchor="middle"
        fontFamily={MONO}
        fontSize="9"
        fill="var(--color-alert)"
      >
        RTO RISK CAUGHT BEFORE DISPATCH
      </text>
    </svg>
  );
}

export function PeakDemand({ className = "" }: VisualProps) {
  const bars = [
    { x: 16, y: 40, h: 12 },
    { x: 40, y: 34, h: 18 },
    { x: 64, y: 26, h: 26 },
    { x: 88, y: 14, h: 38, peak: true },
    { x: 112, y: 18, h: 34, peak: true },
    { x: 136, y: 30, h: 22 },
    { x: 160, y: 38, h: 14 },
    { x: 184, y: 34, h: 18 },
  ];
  return (
    <svg viewBox="0 0 240 78" className={`${box} h-[78px] ${className}`} aria-hidden>
      <line x1="8" y1="52" x2="232" y2="52" stroke={ink(0.25)} />
      {bars.map((bar) => (
        <rect
          key={bar.x}
          x={bar.x}
          y={bar.y}
          width="10"
          height={bar.h}
          fill={bar.peak ? "var(--color-alert)" : ink(0.25)}
        />
      ))}
      <line
        x1="8"
        y1="14"
        x2="232"
        y2="14"
        stroke={A}
        strokeDasharray="7 6"
        style={{ animation: "dc-march 2.6s linear infinite" }}
      />
      <text x="232" y="10" textAnchor="end" fontFamily={MONO} fontSize="9" fill={A}>
        ANSWERED AT PEAK
      </text>
      <text x="8" y="70" fontFamily={MONO} fontSize="9" fill={ink(0.45)}>
        DEMAND PER HOUR · SERVICE HELD FLAT
      </text>
    </svg>
  );
}

export function OutletHub({ className = "" }: VisualProps) {
  return (
    <svg viewBox="0 0 240 78" className={`${box} h-[78px] ${className}`} aria-hidden>
      <circle cx="120" cy="40" r="12" fill={A} />
      {[
        [30, 18],
        [30, 62],
        [210, 18],
        [210, 62],
      ].map(([cx, cy]) => (
        <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r="7" fill="none" stroke={ink(0.45)} />
      ))}
      {[
        { x1: 37, y1: 22, x2: 108, y2: 36, dur: "2.4s" },
        { x1: 37, y1: 58, x2: 108, y2: 44, dur: "2.9s" },
        { x1: 132, y1: 36, x2: 203, y2: 22, dur: "2.6s" },
        { x1: 132, y1: 44, x2: 203, y2: 58, dur: "3.1s" },
      ].map((l) => (
        <line
          key={`${l.x1}-${l.y1}-${l.x2}`}
          x1={l.x1}
          y1={l.y1}
          x2={l.x2}
          y2={l.y2}
          stroke={A}
          strokeDasharray="6 5"
          style={{ animation: `dc-march ${l.dur} linear infinite` }}
        />
      ))}
      <text x="120" y="72" textAnchor="middle" fontFamily={MONO} fontSize="9" fill={ink(0.45)}>
        EVERY OUTLET · ONE LEAGUE TABLE
      </text>
    </svg>
  );
}
