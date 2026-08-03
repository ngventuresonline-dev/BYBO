"use client";

import { motion, useReducedMotion } from "framer-motion";

const systemLabels = [
  { label: "Platforms", position: "left-[3%] top-[14%] sm:left-[2%] sm:top-[16%]" },
  { label: "Agents", position: "right-[2%] top-[18%] sm:top-[20%]" },
  { label: "Knowledge", position: "right-[2%] top-[44%] sm:top-[48%]" },
  { label: "Intelligence", position: "right-[3%] bottom-[12%] sm:bottom-[10%]" },
  { label: "Governance", position: "left-[3%] bottom-[14%] sm:bottom-[12%]" },
];

const nodes = [
  { cx: 118, cy: 92, delay: 0 },
  { cx: 282, cy: 98, delay: 0.15 },
  { cx: 298, cy: 168, delay: 0.3 },
  { cx: 198, cy: 238, delay: 0.45 },
  { cx: 102, cy: 206, delay: 0.6 },
];

function CapabilityGraphSvg() {
  const reduceMotion = useReducedMotion();

  return (
    <svg
      viewBox="0 0 400 320"
      className="h-full w-full"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <defs>
        <radialGradient id="coreGlow" cx="50%" cy="48%" r="50%">
          <stop offset="0%" stopColor="#b026ff" stopOpacity="0.45" />
          <stop offset="55%" stopColor="#b026ff" stopOpacity="0.08" />
          <stop offset="100%" stopColor="#b026ff" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="coreFill" x1="30%" y1="20%" x2="70%" y2="80%">
          <stop offset="0%" stopColor="#ff7a4d" />
          <stop offset="45%" stopColor="#b026ff" />
          <stop offset="100%" stopColor="#5a1578" />
        </linearGradient>
      </defs>

      <circle cx="200" cy="158" r="118" fill="url(#coreGlow)" />

      {nodes.map((node) => (
        <line
          key={`line-${node.cx}`}
          x1="200"
          y1="158"
          x2={node.cx}
          y2={node.cy}
          stroke="rgba(255,122,77,0.22)"
          strokeWidth="1"
        />
      ))}

      <motion.g
        animate={reduceMotion ? undefined : { rotate: 360 }}
        transition={{ duration: 48, repeat: Infinity, ease: "linear" }}
        style={{ transformOrigin: "200px 158px" }}
      >
        <ellipse
          cx="200"
          cy="158"
          rx="132"
          ry="46"
          stroke="rgba(176,38,255,0.28)"
          strokeWidth="1"
        />
        <ellipse
          cx="200"
          cy="158"
          rx="156"
          ry="58"
          stroke="rgba(176,38,255,0.16)"
          strokeWidth="0.8"
          transform="rotate(28 200 158)"
        />
      </motion.g>

      <motion.g
        animate={reduceMotion ? undefined : { rotate: -360 }}
        transition={{ duration: 36, repeat: Infinity, ease: "linear" }}
        style={{ transformOrigin: "200px 158px" }}
      >
        <circle
          cx="200"
          cy="158"
          r="108"
          stroke="rgba(241,240,235,0.12)"
          strokeWidth="0.8"
          strokeDasharray="4 8"
        />
      </motion.g>

      <motion.polygon
        points="200,108 232,126 224,162 176,162 168,126"
        fill="url(#coreFill)"
        fillOpacity="0.92"
        stroke="rgba(255,255,255,0.22)"
        strokeWidth="1.2"
        animate={
          reduceMotion
            ? undefined
            : { scale: [1, 1.04, 1], rotate: [0, 6, 0] }
        }
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        style={{ transformOrigin: "200px 158px" }}
      />

      <motion.circle
        cx="200"
        cy="158"
        r="22"
        fill="#ff5c2e"
        fillOpacity="0.95"
        animate={
          reduceMotion
            ? undefined
            : { scale: [1, 1.08, 1], opacity: [0.88, 1, 0.88] }
        }
        transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
      />

      {nodes.map((node) => (
        <motion.g
          key={`node-${node.cx}`}
          animate={
            reduceMotion
              ? undefined
              : { scale: [1, 1.15, 1], opacity: [0.75, 1, 0.75] }
          }
          transition={{
            duration: 2.8,
            repeat: Infinity,
            ease: "easeInOut",
            delay: node.delay,
          }}
          style={{ transformOrigin: `${node.cx}px ${node.cy}px` }}
        >
          <circle
            cx={node.cx}
            cy={node.cy}
            r="14"
            fill="rgba(176,38,255,0.14)"
          />
          <circle
            cx={node.cx}
            cy={node.cy}
            r="5"
            fill="#f1f0eb"
            stroke="#b026ff"
            strokeWidth="1"
          />
        </motion.g>
      ))}

      {Array.from({ length: 28 }).map((_, index) => {
        const angle = (index / 28) * Math.PI * 2;
        const radius = 92 + (index % 3) * 18;
        const x = 200 + Math.cos(angle) * radius;
        const y = 158 + Math.sin(angle) * radius * 0.55;
        return (
          <circle
            key={`particle-${index}`}
            cx={x}
            cy={y}
            r="1.2"
            fill="rgba(241,240,235,0.35)"
          />
        );
      })}
    </svg>
  );
}

export function EnterpriseCapabilityGraph() {
  return (
    <div className="flex min-h-[22rem] flex-col sm:min-h-[28rem] lg:min-h-[34rem]">
      <div className="relative min-h-[16rem] flex-1 overflow-hidden sm:min-h-[20rem] lg:min-h-[24rem]">
        <div className="absolute inset-0 flex items-center justify-center p-4 sm:p-6">
          <CapabilityGraphSvg />
        </div>
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_48%,transparent_0%,rgba(8,8,8,0.05)_42%,rgba(8,8,8,0.55)_88%)]" />

        {systemLabels.map((system) => (
          <div
            key={system.label}
            className={`pointer-events-none absolute ${system.position} rounded-full border border-white/10 bg-black/25 px-2 py-1.5 backdrop-blur-xl sm:px-3 sm:py-2`}
          >
            <span className="flex items-center gap-1.5 font-mono text-[0.48rem] uppercase tracking-[0.1em] text-white/55 sm:gap-2 sm:text-[0.54rem] sm:tracking-[0.12em]">
              <span className="h-1.5 w-1.5 rounded-full bg-signal shadow-[0_0_12px_#b026ff]" />
              {system.label}
            </span>
          </div>
        ))}
      </div>

      <div className="pointer-events-none shrink-0 px-4 pb-4 pt-3">
        <div className="rounded-2xl border border-white/10 bg-black/35 px-4 py-3 backdrop-blur-2xl">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="font-mono text-[0.52rem] uppercase tracking-[0.13em] text-white/35">
                Enterprise capability graph
              </p>
              <p className="mt-1 text-xs font-semibold text-white/75">
                Custom systems. One operating context.
              </p>
            </div>
            <span className="flex shrink-0 items-center gap-2 font-mono text-[0.52rem] uppercase tracking-[0.1em] text-success">
              <span className="signal-pulse h-1.5 w-1.5 rounded-full bg-success" />
              Live
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
