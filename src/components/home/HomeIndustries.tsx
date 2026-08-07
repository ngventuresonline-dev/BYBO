import Link from "next/link";

const INK = "rgba(15,15,17,";
const MONO = "IBM Plex Mono, monospace";
const DEEP = "var(--color-signal-deep)";

function DocumentFlow() {
  return (
    <svg viewBox="0 0 220 100" className="block h-[100px] w-full" aria-hidden>
      <rect x="8" y="26" width="30" height="40" fill="none" stroke={`${INK}0.45)`} />
      <rect x="14" y="20" width="30" height="40" fill="none" stroke={`${INK}0.3)`} />
      <line
        x1="52"
        y1="46"
        x2="150"
        y2="46"
        stroke={DEEP}
        strokeDasharray="8 6"
        style={{ animation: "dc-march 2.8s linear infinite" }}
      />
      <rect x="96" y="38" width="16" height="16" fill={DEEP} />
      <rect x="164" y="26" width="46" height="40" fill="none" stroke={`${INK}0.45)`} />
      <line x1="172" y1="38" x2="202" y2="38" stroke={`${INK}0.35)`} />
      <line x1="172" y1="46" x2="202" y2="46" stroke={`${INK}0.35)`} />
      <line x1="172" y1="54" x2="190" y2="54" stroke={`${INK}0.35)`} />
      <text
        x="104"
        y="82"
        textAnchor="middle"
        fontFamily={MONO}
        fontSize="9"
        letterSpacing="1"
        fill={`${INK}0.45)`}
      >
        DOCUMENT → CHECK → ERP
      </text>
    </svg>
  );
}

function FunnelFlow() {
  return (
    <svg viewBox="0 0 220 100" className="block h-[100px] w-full" aria-hidden>
      <polygon
        points="14,20 206,20 150,52 150,78 70,78 70,52"
        fill="none"
        stroke={`${INK}0.4)`}
      />
      <line x1="14" y1="20" x2="206" y2="20" stroke={DEEP} strokeWidth="2" />
      <line
        x1="70"
        y1="52"
        x2="150"
        y2="52"
        stroke={DEEP}
        strokeWidth="2"
        strokeDasharray="80"
        style={{ animation: "dc-draw 2s cubic-bezier(0.16,1,0.3,1) forwards" }}
      />
      <circle cx="110" cy="66" r="6" fill={DEEP} />
      <text
        x="110"
        y="96"
        textAnchor="middle"
        fontFamily={MONO}
        fontSize="9"
        letterSpacing="1"
        fill={`${INK}0.45)`}
      >
        ENQUIRY → QUALIFY → VISIT
      </text>
    </svg>
  );
}

function HubFlow() {
  return (
    <svg viewBox="0 0 220 100" className="block h-[100px] w-full" aria-hidden>
      <circle cx="110" cy="44" r="11" fill={DEEP} />
      {[
        [40, 22],
        [40, 66],
        [180, 22],
        [180, 66],
      ].map(([cx, cy]) => (
        <circle
          key={`${cx}-${cy}`}
          cx={cx}
          cy={cy}
          r="7"
          fill="none"
          stroke={`${INK}0.45)`}
        />
      ))}
      {[
        { x1: 47, y1: 26, x2: 100, y2: 40, dur: "2.4s" },
        { x1: 47, y1: 62, x2: 100, y2: 48, dur: "2.9s" },
        { x1: 121, y1: 40, x2: 173, y2: 26, dur: "2.6s" },
        { x1: 121, y1: 48, x2: 173, y2: 62, dur: "3.1s" },
      ].map((line) => (
        <line
          key={`${line.x1}-${line.y1}-${line.x2}`}
          {...line}
          stroke={DEEP}
          strokeDasharray="6 5"
          style={{ animation: `dc-march ${line.dur} linear infinite` }}
        />
      ))}
      <text
        x="110"
        y="94"
        textAnchor="middle"
        fontFamily={MONO}
        fontSize="9"
        letterSpacing="1"
        fill={`${INK}0.45)`}
      >
        OUTLETS → ONE VIEW
      </text>
    </svg>
  );
}

const groups = [
  {
    title: "Operations-led teams",
    blurb:
      "Manufacturing, logistics, exporters, professional services. Quotes, documents, approvals.",
    Visual: DocumentFlow,
  },
  {
    title: "High-consideration",
    blurb:
      "Real estate, healthcare, education, lending. Long journeys, expensive leads, hard guardrails.",
    Visual: FunnelFlow,
  },
  {
    title: "Consumer brands",
    blurb:
      "D2C, retail chains, hospitality, multi-location. Volume, returns, reviews, outlet variance.",
    Visual: HubFlow,
  },
];

export function HomeIndustries() {
  return (
    <section className="dc-light dc-divide">
      <div className="dc-pad pt-[clamp(52px,6vw,76px)]">
        <p className="dc-label">05 / Where we work</p>
        <div className="mt-6 flex flex-wrap items-end justify-between gap-10">
          <h2 className="dc-h2 max-w-[17ch]">Your industry changes the system.</h2>
          <Link
            href="/industries"
            className="dc-mono whitespace-nowrap text-[11px] uppercase tracking-[0.14em]"
            style={{ color: DEEP }}
          >
            All industries →
          </Link>
        </div>
      </div>

      <div
        className="dc-panels mt-12 border-t md:grid-cols-3"
        style={{ borderColor: "var(--dc-line)" }}
      >
        {groups.map(({ title, blurb, Visual }) => (
          <Link
            key={title}
            href="/industries"
            className="dc-pad block py-9 transition-colors hover:bg-[var(--color-surface-2)]"
          >
            <Visual />
            <h3 className="mt-4 text-[22px] font-bold tracking-[-0.035em]">{title}</h3>
            <p
              className="mt-2 text-[15px] leading-[1.5]"
              style={{ color: `${INK}0.6)` }}
            >
              {blurb}
            </p>
          </Link>
        ))}
      </div>

      <div className="dc-pad grid items-center gap-14 pb-[clamp(52px,6vw,76px)] pt-14 min-[861px]:grid-cols-[1fr_1.1fr]">
        <p className="text-[clamp(26px,3.2vw,44px)] font-bold leading-[1.06] tracking-[-0.045em]">
          We don’t publish results we can’t attribute.
        </p>
        <p className="text-[17px] leading-[1.6]" style={{ color: `${INK}0.62)` }}>
          You will not find invented multipliers or a wall of logos we have never worked
          with on this site. When a client goes on record, their numbers go up with their
          name attached. Until then we will show you the method, the controls, and a
          system running on your own scenario.
        </p>
      </div>
    </section>
  );
}
