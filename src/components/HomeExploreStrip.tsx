import Link from "next/link";
import {
  ArrowUpRight,
  Globe,
  Layers3,
  LayoutGrid,
  Target,
} from "lucide-react";
import { FadeIn } from "@/components/FadeIn";

const exploreLinks = [
  {
    href: "/systems",
    label: "Systems",
    title: "Explore the capability stack",
    detail: "Platforms, agents, knowledge, intelligence, and governance.",
    icon: Layers3,
    visual: "stack",
  },
  {
    href: "/how-we-work",
    label: "How we work",
    title: "See the delivery model",
    detail: "Diagnose, build, operate, and improve - with controls built in.",
    icon: Target,
    visual: "radar",
  },
  {
    href: "/blueprint",
    label: "Blueprint",
    title: "Find the first opportunity",
    detail: "Qualify whether a workflow deserves a system or a Blueprint.",
    icon: LayoutGrid,
    visual: "grid",
  },
  {
    href: "/industries",
    label: "Industries",
    title: "Go deeper by environment",
    detail: "Real estate, healthcare, F&B, retail, manufacturing, and more.",
    icon: Globe,
    visual: "globe",
  },
] as const;

function ExploreCardVisual({ type }: { type: (typeof exploreLinks)[number]["visual"] }) {
  if (type === "stack") {
    return (
      <svg viewBox="0 0 160 120" className="h-full w-full" aria-hidden="true">
        <defs>
          <linearGradient id="explore-stack-a" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#c44aff" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#9013d4" stopOpacity="0.35" />
          </linearGradient>
        </defs>
        <g transform="translate(38 18)">
          <rect x="18" y="52" width="72" height="18" rx="3" fill="url(#explore-stack-a)" opacity="0.35" />
          <rect x="10" y="34" width="88" height="18" rx="3" fill="url(#explore-stack-a)" opacity="0.55" />
          <rect x="0" y="16" width="108" height="18" rx="3" fill="url(#explore-stack-a)" />
          <rect x="0" y="16" width="108" height="18" rx="3" fill="none" stroke="#c44aff" strokeWidth="1" opacity="0.6" />
        </g>
      </svg>
    );
  }

  if (type === "radar") {
    return (
      <svg viewBox="0 0 160 120" className="h-full w-full" aria-hidden="true">
        <g transform="translate(80 60)">
          {[46, 34, 22, 10].map((r) => (
            <circle
              key={r}
              r={r}
              fill="none"
              stroke="#b026ff"
              strokeWidth="1"
              opacity={0.12 + r / 120}
            />
          ))}
          <circle r="4" fill="#b026ff" opacity="0.9" />
          <circle r="8" fill="#b026ff" opacity="0.18" />
          <line x1="0" y1="0" x2="34" y2="-18" stroke="#c44aff" strokeWidth="1.5" opacity="0.7" />
          <circle cx="34" cy="-18" r="3" fill="#c44aff" />
        </g>
      </svg>
    );
  }

  if (type === "grid") {
    return (
      <svg viewBox="0 0 160 120" className="h-full w-full" aria-hidden="true">
        <g transform="translate(34 24)">
          {Array.from({ length: 16 }).map((_, i) => {
            const col = i % 4;
            const row = Math.floor(i / 4);
            const active = i === 6;
            return (
              <rect
                key={i}
                x={col * 22}
                y={row * 18}
                width="18"
                height="14"
                rx="2"
                fill={active ? "#b026ff" : "rgba(176,38,255,0.12)"}
                stroke={active ? "#c44aff" : "rgba(176,38,255,0.25)"}
                strokeWidth="1"
                opacity={active ? 1 : 0.7}
              />
            );
          })}
        </g>
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 160 120" className="h-full w-full" aria-hidden="true">
      <ellipse cx="80" cy="62" rx="52" ry="30" fill="none" stroke="rgba(176,38,255,0.2)" strokeWidth="1" />
      {[
        [58, 48],
        [92, 44],
        [74, 58],
        [104, 62],
        [66, 72],
        [88, 76],
        [48, 58],
        [110, 52],
      ].map(([cx, cy], i) => (
        <circle
          key={i}
          cx={cx}
          cy={cy}
          r={i % 3 === 0 ? 3.5 : 2.5}
          fill="#b026ff"
          opacity={0.35 + (i % 4) * 0.15}
        />
      ))}
      <path
        d="M28 62 Q80 28 132 62 Q80 96 28 62"
        fill="none"
        stroke="rgba(176,38,255,0.15)"
        strokeWidth="1"
      />
    </svg>
  );
}

export function HomeExploreStrip() {
  return (
    <section className="explore-strip relative overflow-hidden border-b border-line bg-void">
      <div className="explore-strip__glow" aria-hidden="true" />
      <div className="explore-strip__dots" aria-hidden="true" />

      <div className="section-shell relative">
        <FadeIn>
          <div className="mb-8 max-w-2xl lg:mb-10">
            <p className="eyebrow">Go deeper</p>
            <h2 className="section-title mt-5">Explore in full detail</h2>
            <p className="mt-4 text-sm leading-6 text-fog">
              Systems, delivery model, Blueprint, and industry context - each on
              its own page.
            </p>
          </div>
        </FadeIn>

        <div className="explore-strip__grid">
          {exploreLinks.map((item, index) => {
            const Icon = item.icon;
            return (
              <FadeIn key={item.href} delay={index * 0.05}>
                <Link href={item.href} className="explore-card group">
                  <div className="explore-card__body">
                    <div className="explore-card__meta">
                      <span className="explore-card__icon" aria-hidden="true">
                        <Icon size={16} strokeWidth={1.6} />
                      </span>
                      <p className="explore-card__label">{item.label}</p>
                    </div>
                    <h3 className="explore-card__title">{item.title}</h3>
                    <p className="explore-card__detail">{item.detail}</p>
                    <span className="explore-card__cta">
                      Open <ArrowUpRight size={12} />
                    </span>
                  </div>
                  <div className="explore-card__visual-wrap" aria-hidden="true">
                    <ExploreCardVisual type={item.visual} />
                  </div>
                </Link>
              </FadeIn>
            );
          })}
        </div>
      </div>
    </section>
  );
}
