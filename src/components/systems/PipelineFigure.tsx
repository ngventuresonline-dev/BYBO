import type { FigureStage } from "@/lib/dc-systems";

const INK = "rgba(15,15,17,";
const MONO = "IBM Plex Mono, monospace";
const DEEP = "var(--color-signal-deep)";

const X_START = 90;
const X_END = 910;
const AXIS_Y = 120;

type PipelineFigureProps = {
  stages: FigureStage[];
  /** Index of the stage drawn as the approval gate. */
  gate: number;
  /** Correction loop label, drawn from the gate back one stage. */
  loopback?: string;
  footnote: string;
};

/**
 * One unit of work travelling left to right, with a single named approval gate
 * and an optional correction loop. Scales to any stage count.
 */
export function PipelineFigure({
  stages,
  gate,
  loopback,
  footnote,
}: PipelineFigureProps) {
  const span = stages.length > 1 ? (X_END - X_START) / (stages.length - 1) : 0;
  const xs = stages.map((_, i) => X_START + i * span);
  const gateX = xs[gate];
  const loopTargetX = xs[Math.max(0, gate - 1)];

  return (
    <svg viewBox="0 0 1000 272" className="block h-auto w-full" aria-hidden>
      <line
        x1={X_START}
        y1={AXIS_Y}
        x2={X_END}
        y2={AXIS_Y}
        stroke={`${INK}0.25)`}
        strokeWidth="1"
      />
      <line
        x1={X_START}
        y1={AXIS_Y}
        x2={X_END}
        y2={AXIS_Y}
        stroke={DEEP}
        strokeWidth="1.5"
        strokeDasharray="10 9"
        style={{ animation: "dc-march 3s linear infinite" }}
      />

      {stages.map((stage, i) => {
        const x = xs[i];
        const isGate = i === gate;
        return (
          <g key={stage.title}>
            {isGate ? (
              <>
                <rect x={x - 11} y={AXIS_Y - 10} width="22" height="22" fill={DEEP} />
                <rect
                  x={x - 11}
                  y={AXIS_Y - 10}
                  width="22"
                  height="22"
                  fill="none"
                  stroke={DEEP}
                  style={{
                    transformOrigin: `${x}px ${AXIS_Y + 1}px`,
                    animation: "dc-ring 2.8s ease-out infinite",
                  }}
                />
              </>
            ) : (
              <rect
                x={x - 8}
                y={AXIS_Y - 8}
                width="16"
                height="16"
                fill="none"
                stroke={`${INK}0.6)`}
              />
            )}

            <text
              x={x}
              y={isGate ? AXIS_Y - 26 : AXIS_Y - 22}
              textAnchor="middle"
              fontFamily="Archivo, sans-serif"
              fontSize="17"
              fontWeight="700"
              fill={isGate ? DEEP : "#0F0F11"}
            >
              {stage.title}
            </text>

            {(stage.lines ?? []).map((line, li) => (
              <text
                key={line}
                x={x}
                y={(isGate ? AXIS_Y + 34 : AXIS_Y + 30) + li * 14}
                textAnchor="middle"
                fontFamily={MONO}
                fontSize="10"
                fill={isGate && li === 0 ? DEEP : `${INK}0.5)`}
              >
                {line}
              </text>
            ))}
          </g>
        );
      })}

      {loopback ? (
        <>
          <path
            d={`M${gateX} 180 V 202 H ${loopTargetX} V 180`}
            fill="none"
            stroke={`${INK}0.3)`}
            strokeDasharray="5 5"
            style={{ animation: "dc-march 4s linear infinite" }}
          />
          <text
            x={(gateX + loopTargetX) / 2}
            y="220"
            textAnchor="middle"
            fontFamily={MONO}
            fontSize="10"
            fill={`${INK}0.45)`}
          >
            {loopback}
          </text>
        </>
      ) : null}

      <line x1={X_START} y1="256" x2={X_END} y2="256" stroke={`${INK}0.2)`} />
      <line x1={X_START} y1="250" x2={X_START} y2="262" stroke={`${INK}0.4)`} />
      <line x1={X_END} y1="250" x2={X_END} y2="262" stroke={`${INK}0.4)`} />
      <text
        x="500"
        y="248"
        textAnchor="middle"
        fontFamily={MONO}
        fontSize="10"
        fill={`${INK}0.45)`}
      >
        {footnote}
      </text>
    </svg>
  );
}
