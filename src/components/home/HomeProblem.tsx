import { Reveal } from "@/components/dc/Reveal";

const INK = "rgba(15,15,17,";
const MONO = "IBM Plex Mono, monospace";

/** The seven undocumented hand-offs an enquiry passes through today. */
const handoffs = [
  { x: 34, y: 148, title: "ENQUIRY 9PM", sub: "arrives" },
  { x: 104, y: 64, title: "WHATSAPP", sub: "unread · 13h" },
  { x: 174, y: 148, title: "SALES EXEC", sub: "retypes it" },
  { x: 244, y: 64, title: "EXCEL SHEET", sub: "one copy" },
  { x: 314, y: 148, title: "MANAGER", sub: "verbal ok" },
  { x: 384, y: 64, title: "EMAIL THREAD", sub: "forwarded" },
  { x: 450, y: 148, title: "ERP ENTRY", sub: "next morning" },
];

function HandoffDiagram() {
  return (
    <svg viewBox="0 0 520 214" className="mt-5 block h-[214px] w-full" aria-hidden>
      <polyline
        points="34,148 104,64 174,148 244,64 314,148 384,64 450,148 496,106"
        fill="none"
        stroke={`${INK}0.28)`}
        strokeWidth="1.5"
        strokeDasharray="7 6"
        style={{ animation: "dc-march 3.5s linear infinite" }}
      />
      {handoffs.map((node) => {
        const above = node.y < 100;
        return (
          <g key={node.title}>
            <circle cx={node.x} cy={node.y} r="5" fill="none" stroke={`${INK}0.5)`} />
            <text
              x={node.x}
              y={above ? node.y - 18 : node.y + 24}
              textAnchor="middle"
              fontFamily={MONO}
              fontSize="9"
              fill={`${INK}0.55)`}
            >
              {node.title}
            </text>
            <text
              x={node.x}
              y={above ? node.y - 31 : node.y + 37}
              textAnchor="middle"
              fontFamily={MONO}
              fontSize="9"
              fill={`${INK}0.35)`}
            >
              {node.sub}
            </text>
          </g>
        );
      })}
      <circle
        cx="496"
        cy="106"
        r="7"
        fill="none"
        stroke="var(--color-alert)"
        strokeWidth="1.5"
        style={{ animation: "dc-flicker 2.2s ease-in-out infinite" }}
      />
      <text
        x="496"
        y="92"
        textAnchor="middle"
        fontFamily={MONO}
        fontSize="9"
        fill="var(--color-alert)"
      >
        LOST
      </text>
      <text x="34" y="208" fontFamily={MONO} fontSize="9" fill={`${INK}0.4)`}>
        SEVEN HAND-OFFS · NOT ONE OF THEM RECORDED
      </text>
    </svg>
  );
}

function SystemPathDiagram() {
  return (
    <svg viewBox="0 0 460 190" className="mt-5 block h-[200px] w-full" aria-hidden>
      <line x1="24" y1="96" x2="436" y2="96" stroke={`${INK}0.25)`} strokeWidth="1.5" />
      <line
        x1="24"
        y1="96"
        x2="436"
        y2="96"
        stroke="var(--color-signal-deep)"
        strokeWidth="1.5"
        strokeDasharray="10 8"
        style={{ animation: "dc-march 2.4s linear infinite" }}
      />
      <rect x="18" y="90" width="12" height="12" fill="none" stroke={`${INK}0.6)`} />
      <rect x="122" y="90" width="12" height="12" fill="none" stroke={`${INK}0.6)`} />
      <rect x="226" y="88" width="16" height="16" fill="var(--color-signal-deep)" />
      <rect
        x="226"
        y="88"
        width="16"
        height="16"
        fill="none"
        stroke="var(--color-signal-deep)"
        style={{
          transformOrigin: "234px 96px",
          animation: "dc-ring 2.8s ease-out infinite",
        }}
      />
      <rect x="330" y="90" width="12" height="12" fill="none" stroke={`${INK}0.6)`} />
      <rect x="430" y="90" width="12" height="12" fill="none" stroke={`${INK}0.6)`} />

      <text x="24" y="76" textAnchor="middle" fontFamily={MONO} fontSize="10" fill={`${INK}0.5)`}>
        in
      </text>
      <text x="128" y="76" textAnchor="middle" fontFamily={MONO} fontSize="10" fill={`${INK}0.5)`}>
        read
      </text>
      <text
        x="234"
        y="72"
        textAnchor="middle"
        fontFamily={MONO}
        fontSize="10"
        fill="var(--color-signal-deep)"
      >
        crucial calls only
      </text>
      <text x="336" y="76" textAnchor="middle" fontFamily={MONO} fontSize="10" fill={`${INK}0.5)`}>
        act
      </text>
      <text x="436" y="76" textAnchor="middle" fontFamily={MONO} fontSize="10" fill={`${INK}0.5)`}>
        log
      </text>

      <line x1="24" y1="130" x2="436" y2="130" stroke={`${INK}0.2)`} strokeWidth="1" />
      <line x1="24" y1="125" x2="24" y2="135" stroke={`${INK}0.4)`} />
      <line x1="436" y1="125" x2="436" y2="135" stroke={`${INK}0.4)`} />
      <text x="230" y="152" textAnchor="middle" fontFamily={MONO} fontSize="10" fill={`${INK}0.45)`}>
        median 40 seconds · every step recorded
      </text>
    </svg>
  );
}

export function HomeProblem() {
  return (
    <section className="dc-light dc-divide">
      <div className="dc-pad pt-[clamp(52px,6vw,76px)]">
        <p className="dc-label">01 / The problem</p>
        <Reveal as="h2" className="dc-h2 mt-6 max-w-[18ch]">
          Work moves through your business by hand.
        </Reveal>
        <Reveal as="p" className="mt-6 max-w-[56ch] text-[19px] leading-[1.45]">
          <span style={{ color: "var(--dc-muted)" }}>
            Not the thinking. The typing, the chasing, and reading the same document for
            the fortieth time.
          </span>
        </Reveal>
      </div>

      <div
        className="dc-panels mt-14 border-t md:grid-cols-2"
        style={{ borderColor: "var(--dc-line)" }}
      >
        <div className="dc-pad py-10">
          <p className="dc-label-muted">Today · seven hand-offs, no record</p>
          <HandoffDiagram />
          <p className="mt-2 text-[17px] leading-[1.5]" style={{ color: `${INK}0.7)` }}>
            A customer writes at 9pm and hears back at 11am. The same invoice is typed
            into three systems. The answer everyone needs sits in one person’s head.
            Nothing is written down, so nothing can be measured.
          </p>
        </div>

        <div className="dc-pad py-10" style={{ background: "var(--color-surface-2)" }}>
          <p className="dc-label-muted" style={{ color: "var(--color-signal-deep)" }}>
            With a system · one path, one gate, one log
          </p>
          <SystemPathDiagram />
          <p className="mt-2 text-[17px] leading-[1.5]" style={{ color: `${INK}0.75)` }}>
            One path instead of seven. The system reads the details, checks them against
            your records, and files the normal ones straight away. Anything unusual goes
            to one named person. Every step is saved, so you can see exactly what
            happened.
          </p>
        </div>
      </div>
    </section>
  );
}
