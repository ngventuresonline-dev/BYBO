import Link from "next/link";
import { STACK } from "@/lib/dc-systems";

const INK = "rgba(15,15,17,";
const MONO = "IBM Plex Mono, monospace";

const rings = [
  { x: 10, size: 280, label: "GOVERNANCE", tx: 20, ty: 30, stroke: 0.3, dashed: true },
  { x: 42, size: 216, label: "INTELLIGENCE", tx: 52, ty: 62, stroke: 0.35 },
  { x: 74, size: 152, label: "KNOWLEDGE", tx: 84, ty: 94, stroke: 0.4 },
  { x: 106, size: 88, label: "OPERATIONS", tx: 116, ty: 126, stroke: 0.5, strong: true },
];

/** Concentric layers with the client's workflow at the centre. */
function StackDiagram() {
  return (
    <svg
      viewBox="0 0 300 300"
      className="mx-auto block h-auto w-full max-w-[340px]"
      aria-hidden
    >
      {rings.map((ring) => (
        <g key={ring.label}>
          <rect
            x={ring.x}
            y={ring.x}
            width={ring.size}
            height={ring.size}
            fill="none"
            stroke={`${INK}${ring.stroke})`}
            strokeDasharray={ring.dashed ? "6 5" : undefined}
            style={ring.dashed ? { animation: "dc-march 6s linear infinite" } : undefined}
          />
          <text
            x={ring.tx}
            y={ring.ty}
            fontFamily={MONO}
            fontSize="9"
            letterSpacing="1.4"
            fill={`${INK}${ring.strong ? 0.6 : 0.5})`}
          >
            {ring.label}
          </text>
        </g>
      ))}
      <rect x="132" y="136" width="36" height="36" fill="var(--color-signal-deep)" />
      <rect
        x="132"
        y="136"
        width="36"
        height="36"
        fill="none"
        stroke="var(--color-signal-deep)"
        style={{
          transformOrigin: "150px 154px",
          animation: "dc-ring 3.4s ease-out infinite",
        }}
      />
      <text
        x="150"
        y="290"
        textAnchor="middle"
        fontFamily={MONO}
        fontSize="10"
        fill={`${INK}0.45)`}
      >
        your workflow at the centre
      </text>
    </svg>
  );
}

export function HomeStack() {
  return (
    <section className="dc-light dc-divide">
      <div className="dc-pad pt-[clamp(52px,6vw,76px)]">
        <p className="dc-label">03 / What we build</p>
        <div className="mt-6 flex flex-wrap items-end justify-between gap-10">
          <h2 className="dc-h2 max-w-[16ch]">Seven systems, one stack.</h2>
          <Link
            href="/systems"
            className="dc-mono whitespace-nowrap text-[11px] uppercase tracking-[0.14em] transition-colors"
            style={{ color: "var(--color-signal-deep)" }}
          >
            All systems →
          </Link>
        </div>
      </div>

      <div className="dc-pad grid items-start gap-12 pb-[clamp(52px,6vw,76px)] pt-12 min-[861px]:grid-cols-[0.85fr_1.4fr]">
        <StackDiagram />

        <ul className="border-t" style={{ borderColor: `${INK}0.16)` }}>
          {STACK.map((entry, i) => (
            <li key={entry.slug}>
              <Link
                href={`/systems/${entry.slug}`}
                className="grid items-baseline gap-x-6 gap-y-2 border-b py-5 transition-colors hover:bg-[rgba(122,23,191,0.07)] min-[1181px]:grid-cols-[50px_1.1fr_1.7fr_96px]"
                style={{ borderColor: `${INK}0.12)` }}
              >
                <span
                  className="dc-mono text-[11px]"
                  style={{ color: "var(--color-signal-deep)" }}
                >
                  {entry.index}
                </span>
                <span className="text-[22px] font-bold tracking-[-0.04em]">
                  {entry.name}
                </span>
                <span
                  className="text-[16px] leading-[1.45]"
                  style={{ color: `${INK}0.6)` }}
                >
                  {entry.brief}
                </span>
                <span
                  className="dc-mono text-[10px] uppercase tracking-[0.14em] min-[1181px]:text-right"
                  style={{ color: "var(--color-signal-deep)" }}
                >
                  {i === 0 ? "Start here" : ""}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
