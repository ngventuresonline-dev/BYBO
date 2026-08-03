"use client";

import type { PageHeroKey } from "@/lib/hero-illustrations";

const STROKE = "rgba(255,255,255,0.14)";
const SIGNAL = "#b026ff";
const SIGNAL_SOFT = "rgba(176,38,255,0.22)";
const CREAM = "#f1f0eb";
const DIM = "rgba(255,255,255,0.38)";

function HeroIllustrationFrame({
  label,
  caption,
  children,
}: {
  label: string;
  caption: string;
  children: React.ReactNode;
}) {
  return (
    <figure className="page-hero-aside">
      <div className="hero-illustration" aria-hidden="true">
        <div className="hero-illustration__head">
          <span>{label}</span>
          <span className="hero-illustration__mark">BYBO</span>
        </div>
        <div className="hero-illustration__body">{children}</div>
        <div className="hero-illustration__glow" />
      </div>
      <figcaption className="page-hero-aside__caption">{caption}</figcaption>
    </figure>
  );
}

function Svg({ children, viewBox = "0 0 320 200" }: { children: React.ReactNode; viewBox?: string }) {
  return (
    <svg
      viewBox={viewBox}
      preserveAspectRatio="xMidYMid meet"
      className="hero-illustration__svg"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {children}
    </svg>
  );
}

function IndustriesIllustration() {
  const nodes = [
    { x: 160, y: 38, r: 14 },
    { x: 248, y: 78, r: 11 },
    { x: 248, y: 148, r: 11 },
    { x: 160, y: 188, r: 11 },
    { x: 72, y: 148, r: 11 },
    { x: 72, y: 78, r: 11 },
    { x: 160, y: 112, r: 18 },
  ];
  return (
    <HeroIllustrationFrame label="Sector map" caption="F&B, retail, enterprise, regulated">
      <Svg>
        {nodes.slice(0, 6).map((n, i) => (
          <line key={i} x1={160} y1={112} x2={n.x} y2={n.y} stroke={STROKE} strokeWidth="1" />
        ))}
        {nodes.map((n, i) => (
          <circle
            key={i}
            cx={n.x}
            cy={n.y}
            r={n.r}
            fill={i === 6 ? SIGNAL_SOFT : "rgba(255,255,255,0.04)"}
            stroke={i === 6 ? SIGNAL : STROKE}
            strokeWidth="1.2"
          />
        ))}
        <text x={160} y={116} textAnchor="middle" fill={SIGNAL} fontSize="8" fontFamily="monospace">
          7
        </text>
      </Svg>
    </HeroIllustrationFrame>
  );
}

function SystemsCatalogueIllustration() {
  const layers = [
    { y: 28, w: 220, label: "Governance" },
    { y: 58, w: 200, label: "Intelligence" },
    { y: 88, w: 180, label: "Knowledge" },
    { y: 118, w: 160, label: "Operations" },
    { y: 148, w: 140, label: "Platform" },
  ];
  return (
    <HeroIllustrationFrame label="Capability stack" caption="Seven coordinated systems">
      <Svg>
        {layers.map((layer, i) => (
          <g key={layer.label}>
            <rect
              x={(320 - layer.w) / 2}
              y={layer.y}
              width={layer.w}
              height={22}
              rx="4"
              fill={i === 0 ? SIGNAL_SOFT : "rgba(255,255,255,0.03)"}
              stroke={i === 0 ? SIGNAL : STROKE}
              strokeWidth="1"
            />
            <text
              x={160}
              y={layer.y + 14}
              textAnchor="middle"
              fill={i === 0 ? CREAM : DIM}
              fontSize="7"
              fontFamily="monospace"
              letterSpacing="1"
            >
              {layer.label.toUpperCase()}
            </text>
          </g>
        ))}
        <circle cx="286" cy="38" r="3" fill={SIGNAL} />
        <circle cx="286" cy="48" r="3" fill={SIGNAL} opacity="0.5" />
        <circle cx="286" cy="58" r="3" fill={SIGNAL} opacity="0.25" />
      </Svg>
    </HeroIllustrationFrame>
  );
}

function BlueprintIllustration() {
  return (
    <HeroIllustrationFrame label="Blueprint output" caption="7–10 days · rank before build">
      <Svg>
        <rect x="24" y="24" width="130" height="152" rx="6" stroke={STROKE} strokeWidth="1" fill="rgba(255,255,255,0.02)" />
        <text x="34" y="42" fill={DIM} fontSize="7" fontFamily="monospace">
          OPPORTUNITY MATRIX
        </text>
        <line x1="34" y1="100" x2="144" y2="100" stroke={STROKE} />
        <line x1="89" y1="52" x2="89" y2="164" stroke={STROKE} />
        {[
          [52, 68],
          [110, 82],
          [60, 130],
        ].map(([x, y], i) => (
          <circle key={i} cx={x} cy={y} r={8} fill={i === 0 ? SIGNAL : SIGNAL_SOFT} stroke={SIGNAL} strokeWidth="1" />
        ))}
        <rect x="166" y="24" width="130" height="70" rx="6" stroke={STROKE} strokeWidth="1" fill="rgba(255,255,255,0.02)" />
        <text x="176" y="42" fill={DIM} fontSize="7" fontFamily="monospace">
          90-DAY ROADMAP
        </text>
        {[0, 1, 2].map((i) => (
          <rect
            key={i}
            x={176}
            y={52 + i * 14}
            width={60 + i * 24}
            height="6"
            rx="2"
            fill={SIGNAL}
            opacity={0.35 + i * 0.2}
          />
        ))}
        <rect x="166" y="106" width="130" height="70" rx="6" stroke={SIGNAL} strokeWidth="1" fill={SIGNAL_SOFT} />
        <text x="176" y="126" fill={CREAM} fontSize="7" fontFamily="monospace">
          FINANCIAL CASE
        </text>
        <text x="176" y="148" fill={SIGNAL} fontSize="11" fontFamily="monospace" fontWeight="bold">
          High impact
        </text>
      </Svg>
    </HeroIllustrationFrame>
  );
}

function HowWeWorkIllustration() {
  const stages = ["Diagnose", "Deploy", "Operate", "Expand"];
  return (
    <HeroIllustrationFrame label="Engagement flow" caption="Diagnose → deploy → operate">
      <Svg>
        {stages.map((stage, i) => {
          const x = 28 + i * 72;
          return (
            <g key={stage}>
              {i < stages.length - 1 && (
                <path d={`M${x + 52} 100 L${x + 68} 100`} stroke={SIGNAL} strokeWidth="1" opacity="0.6" />
              )}
              <rect
                x={x}
                y={72}
                width={56}
                height="56"
                rx="8"
                fill={i === 0 ? SIGNAL_SOFT : "rgba(255,255,255,0.03)"}
                stroke={i === 0 ? SIGNAL : STROKE}
                strokeWidth="1"
              />
              <text x={x + 28} y={96} textAnchor="middle" fill={i === 0 ? CREAM : DIM} fontSize="7" fontFamily="monospace">
                {String(i + 1).padStart(2, "0")}
              </text>
              <text x={x + 28} y={114} textAnchor="middle" fill={i === 0 ? SIGNAL : DIM} fontSize="6.5" fontFamily="monospace">
                {stage.toUpperCase()}
              </text>
            </g>
          );
        })}
        <rect x="28" y="148" width="264" height="6" rx="3" fill="rgba(255,255,255,0.08)" />
        <rect x="28" y="148" width="72" height="6" rx="3" fill={SIGNAL} />
      </Svg>
    </HeroIllustrationFrame>
  );
}

function AboutIllustration() {
  return (
    <HeroIllustrationFrame label="Connected business" caption="Signals, systems, accountability">
      <Svg>
        <rect x="120" y="68" width="80" height="64" rx="8" stroke={SIGNAL} strokeWidth="1.2" fill={SIGNAL_SOFT} />
        <circle cx="160" cy="88" r="6" fill={SIGNAL} />
        {[
          [56, 56],
          [264, 56],
          [56, 144],
          [264, 144],
          [160, 36],
        ].map(([x, y], i) => (
          <g key={i}>
            <line x1={160} y1={88} x2={x} y2={y} stroke={STROKE} strokeWidth="1" />
            <rect x={x - 16} y={y - 12} width="32" height="24" rx="4" stroke={STROKE} strokeWidth="1" fill="rgba(255,255,255,0.03)" />
          </g>
        ))}
        <path d="M148 120h24M160 108v24" stroke={CREAM} strokeWidth="1.2" opacity="0.5" />
      </Svg>
    </HeroIllustrationFrame>
  );
}

function InsightsIllustration() {
  return (
    <HeroIllustrationFrame label="Operating notes" caption="Frameworks from production work">
      <Svg>
        <rect x="40" y="32" width="240" height="136" rx="8" stroke={STROKE} strokeWidth="1" fill="rgba(255,255,255,0.02)" />
        <rect x="56" y="48" width="80" height="8" rx="2" fill={SIGNAL} opacity="0.7" />
        <rect x="56" y="64" width="140" height="5" rx="1" fill="rgba(255,255,255,0.12)" />
        <rect x="56" y="76" width="120" height="5" rx="1" fill="rgba(255,255,255,0.08)" />
        {[0, 1, 2, 3].map((i) => (
          <rect
            key={i}
            x={56 + i * 44}
            y={100}
            width={28}
            height={48 - i * 8}
            rx="2"
            fill={i === 0 ? SIGNAL_SOFT : "rgba(255,255,255,0.04)"}
            stroke={i === 0 ? SIGNAL : STROKE}
            strokeWidth="1"
          />
        ))}
        <circle cx="248" cy="52" r="10" stroke={SIGNAL} strokeWidth="1" fill={SIGNAL_SOFT} />
        <path d="M244 52l3 3 6-6" stroke={CREAM} strokeWidth="1.2" />
      </Svg>
    </HeroIllustrationFrame>
  );
}

function PlatformIllustration() {
  return (
    <HeroIllustrationFrame label="Custom platform" caption="Purpose-built for your workflow">
      <Svg>
        <rect x="48" y="140" width="224" height="12" rx="2" fill="rgba(255,255,255,0.06)" />
        {[0, 1, 2].map((i) => (
          <rect
            key={i}
            x={64 + i * 8}
            y={48 + i * 28}
            width={192 - i * 16}
            height={36}
            rx="6"
            stroke={i === 2 ? SIGNAL : STROKE}
            strokeWidth="1"
            fill={i === 2 ? SIGNAL_SOFT : "rgba(255,255,255,0.03)"}
          />
        ))}
        <circle cx="160" cy="66" r="4" fill={SIGNAL} />
        <circle cx="176" cy="66" r="4" fill={DIM} />
        <circle cx="192" cy="66" r="4" fill={DIM} />
      </Svg>
    </HeroIllustrationFrame>
  );
}

function AgenticIllustration() {
  return (
    <HeroIllustrationFrame label="Agentic ops" caption="Coordinated workflows with control">
      <Svg>
        <circle cx="72" cy="100" r="20" stroke={STROKE} strokeWidth="1" fill="rgba(255,255,255,0.03)" />
        <circle cx="160" cy="56" r="20" stroke={SIGNAL} strokeWidth="1.2" fill={SIGNAL_SOFT} />
        <circle cx="248" cy="100" r="20" stroke={STROKE} strokeWidth="1" fill="rgba(255,255,255,0.03)" />
        <circle cx="160" cy="144" r="20" stroke={STROKE} strokeWidth="1" fill="rgba(255,255,255,0.03)" />
        <path d="M88 92 L140 68 M180 68 L232 92 M160 76 L160 124 M88 108 L140 132 M232 108 L180 132" stroke={SIGNAL} strokeWidth="1" opacity="0.55" />
        <circle cx="160" cy="56" r="5" fill={SIGNAL} />
      </Svg>
    </HeroIllustrationFrame>
  );
}

function KnowledgeIllustration() {
  return (
    <HeroIllustrationFrame label="Knowledge graph" caption="Permission-aware enterprise answers">
      <Svg>
        {[
          [160, 48],
          [88, 88],
          [232, 88],
          [64, 148],
          [160, 168],
          [256, 148],
        ].map(([x, y], i) => (
          <g key={i}>
            {i > 0 && (
              <line x1={160} y1={48} x2={x} y2={y} stroke={STROKE} strokeWidth="1" />
            )}
            <circle cx={x} cy={y} r={i === 0 ? 12 : 8} fill={i === 0 ? SIGNAL_SOFT : "rgba(255,255,255,0.04)"} stroke={i === 0 ? SIGNAL : STROKE} strokeWidth="1" />
          </g>
        ))}
        <rect x="132" y="96" width="56" height="32" rx="4" stroke={SIGNAL} strokeWidth="1" fill="rgba(8,8,8,0.6)" />
        <text x="160" y="116" textAnchor="middle" fill={CREAM} fontSize="6" fontFamily="monospace">
          CITED
        </text>
      </Svg>
    </HeroIllustrationFrame>
  );
}

function DecisionIllustration() {
  return (
    <HeroIllustrationFrame label="Decision matrix" caption="Evidence-backed recommendations">
      <Svg>
        <rect x="48" y="40" width="112" height="112" rx="4" stroke={STROKE} strokeWidth="1" fill="rgba(255,255,255,0.02)" />
        <line x1="48" y1="96" x2="160" y2="96" stroke={STROKE} />
        <line x1="104" y1="40" x2="104" y2="152" stroke={STROKE} />
        <rect x="168" y="40" width="104" height="112" rx="4" stroke={STROKE} strokeWidth="1" fill="rgba(255,255,255,0.02)" />
        <path d="M180 60h80M180 80h60M180 100h70M180 120h50" stroke={DIM} strokeWidth="4" strokeLinecap="round" />
        <circle cx="72" cy="72" r="6" fill={SIGNAL} />
        <text x="72" y="75" textAnchor="middle" fill="#0f0618" fontSize="6" fontFamily="monospace">
          1
        </text>
      </Svg>
    </HeroIllustrationFrame>
  );
}

function ExperienceIllustration() {
  return (
    <HeroIllustrationFrame label="Experience layer" caption="Customers and teams assisted">
      <Svg>
        <circle cx="112" cy="88" r="24" stroke={STROKE} strokeWidth="1" fill="rgba(255,255,255,0.03)" />
        <path d="M112 76a12 12 0 1 1 0 0" stroke={CREAM} strokeWidth="1.2" />
        <path d="M92 108c4-10 16-10 20 0" stroke={CREAM} strokeWidth="1.2" />
        <rect x="168" y="56" width="96" height="40" rx="8" stroke={SIGNAL} strokeWidth="1" fill={SIGNAL_SOFT} />
        <rect x="168" y="108" width="72" height="28" rx="8" stroke={STROKE} strokeWidth="1" fill="rgba(255,255,255,0.03)" />
        <path d="M180 72h56M180 82h40" stroke={CREAM} strokeWidth="1" opacity="0.5" />
      </Svg>
    </HeroIllustrationFrame>
  );
}

function DocumentIllustration() {
  return (
    <HeroIllustrationFrame label="Multimodal intake" caption="Documents, images, audio, video">
      <Svg>
        <rect x="56" y="40" width="72" height="96" rx="4" stroke={STROKE} strokeWidth="1" fill="rgba(255,255,255,0.03)" />
        <path d="M68 56h48M68 68h40M68 80h44" stroke={DIM} strokeWidth="2" strokeLinecap="round" />
        <rect x="144" y="48" width="56" height="40" rx="4" stroke={SIGNAL} strokeWidth="1" fill={SIGNAL_SOFT} />
        <circle cx="172" cy="68" r="8" stroke={CREAM} strokeWidth="1" />
        <rect x="144" y="100" width="120" height="36" rx="4" stroke={STROKE} strokeWidth="1" fill="rgba(255,255,255,0.03)" />
        <path d="M156 118h24M156 124h16" stroke={SIGNAL} strokeWidth="2" strokeLinecap="round" />
      </Svg>
    </HeroIllustrationFrame>
  );
}

function GovernanceIllustration() {
  return (
    <HeroIllustrationFrame label="Governed infra" caption="Controls, audit, observability">
      <Svg>
        <path
          d="M160 44 L208 68 V108 C208 132 160 156 160 156 C160 156 112 132 112 108 V68 Z"
          stroke={SIGNAL}
          strokeWidth="1.2"
          fill={SIGNAL_SOFT}
        />
        <rect x="136" y="128" width="48" height="36" rx="3" stroke={STROKE} strokeWidth="1" fill="rgba(255,255,255,0.04)" />
        {[0, 1, 2].map((i) => (
          <circle key={i} cx={148 + i * 12} cy="140" r="2" fill={i === 0 ? SIGNAL : DIM} />
        ))}
        <path d="M148 152h24" stroke={DIM} strokeWidth="1" />
      </Svg>
    </HeroIllustrationFrame>
  );
}

function InsightArticleIllustration({ variant }: { variant: "pilots" | "matrix" | "human" }) {
  const captions = {
    pilots: "Why pilots stall in production",
    matrix: "Ranking AI opportunities",
    human: "Human-in-the-loop decisions",
  };
  const labels = {
    pilots: "Pilot vs production",
    matrix: "Opportunity matrix",
    human: "Human oversight",
  };

  return (
    <HeroIllustrationFrame label={labels[variant]} caption={captions[variant]}>
      {variant === "pilots" && (
        <Svg>
          <rect x="32" y="48" width="120" height="104" rx="6" stroke={SIGNAL} strokeWidth="1" fill={SIGNAL_SOFT} />
          <circle cx="92" cy="88" r="16" stroke={CREAM} strokeWidth="1" />
          <rect x="168" y="48" width="120" height="104" rx="6" stroke={STROKE} strokeWidth="1" fill="rgba(255,255,255,0.02)" />
          {[0, 1, 2, 3].map((i) => (
            <rect key={i} x={180 + (i % 2) * 40} y={60 + Math.floor(i / 2) * 28} width="32" height="20" rx="2" stroke={STROKE} strokeWidth="1" />
          ))}
        </Svg>
      )}
      {variant === "matrix" && <DecisionIllustrationInner />}
      {variant === "human" && (
        <Svg>
          <rect x="48" y="56" width="224" height="88" rx="6" stroke={STROKE} strokeWidth="1" fill="rgba(255,255,255,0.02)" />
          <circle cx="88" cy="100" r="16" stroke={CREAM} strokeWidth="1" />
          <rect x="128" y="80" width="120" height="40" rx="4" stroke={SIGNAL} strokeWidth="1" fill={SIGNAL_SOFT} />
          <path d="M140 96h80M140 108h52" stroke={CREAM} strokeWidth="1" opacity="0.45" />
        </Svg>
      )}
    </HeroIllustrationFrame>
  );
}

function DecisionIllustrationInner() {
  return (
    <Svg>
      <rect x="64" y="48" width="96" height="96" rx="4" stroke={STROKE} strokeWidth="1" fill="rgba(255,255,255,0.02)" />
      <line x1="64" y1="96" x2="160" y2="96" stroke={STROKE} />
      <line x1="112" y1="48" x2="112" y2="144" stroke={STROKE} />
      <circle cx="88" cy="72" r="6" fill={SIGNAL} />
      <rect x="176" y="56" width="80" height="80" rx="4" stroke={STROKE} strokeWidth="1" fill="rgba(255,255,255,0.02)" />
    </Svg>
  );
}

const pageIllustrations: Record<PageHeroKey, () => React.ReactElement> = {
  industries: IndustriesIllustration,
  systems: SystemsCatalogueIllustration,
  blueprint: BlueprintIllustration,
  howWeWork: HowWeWorkIllustration,
  about: AboutIllustration,
  insights: InsightsIllustration,
};

const systemIllustrations: Record<string, () => React.ReactElement> = {
  "custom-ai-platforms": PlatformIllustration,
  "agentic-operations": AgenticIllustration,
  "enterprise-knowledge-systems": KnowledgeIllustration,
  "decision-intelligence": DecisionIllustration,
  "customer-workforce-ai": ExperienceIllustration,
  "document-multimodal-intelligence": DocumentIllustration,
  "ai-infrastructure-governance": GovernanceIllustration,
};

export function PageHeroIllustration({ page }: { page: PageHeroKey }) {
  const Illustration = pageIllustrations[page];
  return <Illustration />;
}

export function SystemHeroIllustration({ slug }: { slug: string }) {
  const Illustration = systemIllustrations[slug] ?? PlatformIllustration;
  return <Illustration />;
}

const articleVariants: Record<string, "pilots" | "matrix" | "human"> = {
  "why-ai-pilots-fail": "pilots",
  "rank-ai-opportunities": "matrix",
  "human-in-the-loop-product-decision": "human",
};

export function InsightArticleHeroIllustration({ slug }: { slug: string }) {
  const variant = articleVariants[slug] ?? "matrix";
  return <InsightArticleIllustration variant={variant} />;
}
