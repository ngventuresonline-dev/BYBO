const MONO = "IBM Plex Mono, monospace";
const FOG = "rgba(236,234,228,";

const pilotFailures = [
  "Works on the happy path, breaks on the real one",
  "Nobody owns it once the demo ends",
  "No baseline, so no way to prove it helped",
  "Nobody agreed what happens when it is wrong",
];

const systemAnswers = [
  "Exceptions mapped before launch, not after",
  "A named owner on our side and yours",
  "Baseline measured in week one, reviewed monthly",
  "Approval only on the crucial calls, in writing",
];

/** A line that runs out and stops dead. */
function PilotDiagram() {
  return (
    <svg viewBox="0 0 400 90" className="my-5 block h-[90px] w-full" aria-hidden>
      <line x1="20" y1="45" x2="300" y2="45" stroke={`${FOG}0.25)`} strokeWidth="1" />
      {[20, 160, 300].map((cx) => (
        <circle key={cx} cx={cx} cy="45" r="5" fill="none" stroke={`${FOG}0.45)`} />
      ))}
      <line x1="308" y1="37" x2="324" y2="53" stroke="var(--color-alert)" strokeWidth="1.5" />
      <line x1="324" y1="37" x2="308" y2="53" stroke="var(--color-alert)" strokeWidth="1.5" />
      {[
        [20, "demo"],
        [160, "applause"],
        [300, "month 4"],
      ].map(([x, label]) => (
        <text
          key={label as string}
          x={x as number}
          y="70"
          textAnchor="middle"
          fontFamily={MONO}
          fontSize="9"
          fill={`${FOG}0.4)`}
        >
          {label}
        </text>
      ))}
      <text x="360" y="49" fontFamily={MONO} fontSize="9" fill="var(--color-alert)">
        stops
      </text>
    </svg>
  );
}

/** A loop that corrects itself and comes back round. */
function SystemLoopDiagram() {
  return (
    <svg viewBox="0 0 400 90" className="my-5 block h-[90px] w-full" aria-hidden>
      <path d="M20 45 H300 A34 34 0 0 1 300 45" fill="none" stroke={`${FOG}0.2)`} />
      <path
        d="M20 45 H300"
        fill="none"
        stroke="var(--color-signal)"
        strokeWidth="1.5"
        strokeDasharray="9 7"
        style={{ animation: "dc-march 2.6s linear infinite" }}
      />
      <path
        d="M300 45 C 350 45, 350 12, 300 12 L 90 12 C 40 12, 40 45, 20 45"
        fill="none"
        stroke="var(--color-signal)"
        strokeWidth="1.5"
        strokeDasharray="9 7"
        style={{ animation: "dc-march 2.6s linear infinite" }}
      />
      {[15, 155, 295].map((x) => (
        <rect key={x} x={x} y="40" width="10" height="10" fill="var(--color-signal)" />
      ))}
      {[
        [20, "baseline"],
        [160, "operate"],
        [300, "review"],
      ].map(([x, label]) => (
        <text
          key={label as string}
          x={x as number}
          y="70"
          textAnchor="middle"
          fontFamily={MONO}
          fontSize="9"
          fill={`${FOG}0.55)`}
        >
          {label}
        </text>
      ))}
      <text
        x="195"
        y="8"
        textAnchor="middle"
        fontFamily={MONO}
        fontSize="9"
        fill="var(--color-signal)"
      >
        correct, every month
      </text>
    </svg>
  );
}

export function HomeObjection() {
  return (
    <section className="dc dc-divide dc-pad dc-section">
      <p className="dc-label">04 / The objection</p>
      <h2 className="dc-h2 mt-6 max-w-[21ch] text-[clamp(30px,4.4vw,66px)] leading-[0.94] tracking-[-0.05em]">
        “We already tried an AI pilot. Nothing came of it.”
      </h2>
      <p
        className="mt-5 max-w-[56ch] text-[19px] leading-[1.45]"
        style={{ color: "var(--dc-muted)" }}
      >
        Usually true, and usually for the same four reasons. A trial is a demo. A working
        system is something your team relies on every day.
      </p>

      <div
        className="dc-panels mt-11 border md:grid-cols-2"
        style={{ borderColor: "var(--dc-line)" }}
      >
        <div className="p-8">
          <p className="dc-label-muted">A typical pilot</p>
          <PilotDiagram />
          <ul className="grid gap-3">
            {pilotFailures.map((item) => (
              <li key={item} className="text-[17px]" style={{ color: `${FOG}0.5)` }}>
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div
          className="border-l-2 p-8"
          style={{
            background: "rgba(176,38,255,0.07)",
            borderLeftColor: "var(--color-signal)",
          }}
        >
          <p className="dc-label-muted" style={{ color: "var(--color-signal)" }}>
            A BYBO system
          </p>
          <SystemLoopDiagram />
          <ul className="grid gap-3">
            {systemAnswers.map((item) => (
              <li key={item} className="text-[17px]">
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
