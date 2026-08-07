import type { Metadata } from "next";
import { NotchButton } from "@/components/dc/NotchButton";
import { ClosingCta } from "@/components/dc/ClosingCta";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "The AI Opportunity Blueprint",
  description:
    "A paid diagnostic that ends in a ranked roadmap and a rupee figure — or in an honest recommendation not to build. Credited in full against implementation.",
  path: "/blueprint",
  keywords: [
    "AI opportunity assessment",
    "AI readiness diagnostic India",
    "AI roadmap consulting",
    "AI feasibility study",
  ],
});

const MONO = "IBM Plex Mono, monospace";
const INK = "rgba(15,15,17,";
const FOG = "rgba(236,234,228,";

const terms = [
  ["Fast track", "72 hours, one workflow", true],
  ["Full diagnostic", "3–10 working days", false],
  ["Output", "Document + working session", false],
  ["Obligation", "None", false],
] as const;

const deliverables = [
  {
    n: "01",
    title: "A workflow map of the function",
    body: "As it actually runs — hand-offs, waiting time, decision points, and the workarounds nobody documented.",
  },
  {
    n: "02",
    title: "Leakage quantified in ₹ per year",
    body: "The number that makes the rest of the conversation easy — and that you can defend inside your own company.",
  },
  {
    n: "03",
    title: "An opportunity ranking",
    body: "Scored on impact × feasibility × risk, so the sequence is argued rather than assumed.",
  },
  {
    n: "04",
    title: "A readiness assessment",
    body: "Data, integrations and controls: what is genuinely blocking, what is merely untidy, what we can work around.",
  },
  {
    n: "05",
    title: "A go / no-go recommendation",
    body: "Including what not to automate. Some Blueprints end with us recommending a smaller, cheaper fix.",
  },
  {
    n: "06",
    title: "A 90-day roadmap with owners",
    body: "Named people, sequenced work and the measurement plan — usable whether or not you build it with us.",
  },
];

const notThis = [
  "Not a slide deck about the future of AI",
  "Not a survey you fill in yourself",
  "Not an obligation to build anything",
  "Not a document only we can act on",
];

const bars = [
  { x: 60, w: 230, y: 40, alpha: 1, ink: "#F1EFE9", text: "DAY 1–2 · INTERVIEWS ON THE FLOOR" },
  { x: 200, w: 320, y: 76, alpha: 0.75, ink: "#F1EFE9", text: "DAY 3–5 · YOUR OWN VOLUME AND ERROR DATA" },
  { x: 430, w: 320, y: 112, alpha: 0.5, ink: "#0F0F11", text: "DAY 6–8 · OPTIONS MODELLED, PROOF ON REAL DATA" },
  { x: 700, w: 260, y: 148, alpha: 0.3, ink: "#0F0F11", text: "DAY 9–10 · PRESENTED, HANDED OVER" },
];

function BlueprintGantt() {
  return (
    <svg viewBox="0 0 1000 200" className="block h-auto w-full" aria-hidden>
      {[60, 290, 520, 750, 960].map((x) => (
        <line key={x} x1={x} y1="24" x2={x} y2="176" stroke={`${INK}0.12)`} />
      ))}
      {bars.map((bar) => (
        <g key={bar.text}>
          <rect
            x={bar.x}
            y={bar.y}
            width={bar.w}
            height="26"
            fill={`rgba(122,23,191,${bar.alpha})`}
          />
          <text
            x={bar.x + 12}
            y={bar.y + 18}
            fontFamily={MONO}
            fontSize="11"
            fill={bar.ink}
          >
            {bar.text}
          </text>
        </g>
      ))}
      {[
        [60, "D1"],
        [290, "D3"],
        [520, "D6"],
        [750, "D9"],
        [944, "D10"],
      ].map(([x, label]) => (
        <text
          key={label as string}
          x={x as number}
          y="18"
          fontFamily={MONO}
          fontSize="10"
          fill={`${INK}0.4)`}
        >
          {label}
        </text>
      ))}
    </svg>
  );
}

export default function BlueprintPage() {
  return (
    <>
      <section className="dc dc-divide grid min-[861px]:grid-cols-[1.25fr_1fr]">
        <div
          className="dc-pad pb-14 pt-[clamp(52px,6vw,76px)] min-[861px]:border-r"
          style={{ borderColor: "var(--dc-line)" }}
        >
          <p className="dc-label">The AI Opportunity Blueprint</p>
          <h1 className="dc-h1 mt-7 max-w-[12ch] text-[clamp(46px,7vw,112px)]">
            Days, not quarters. One honest answer.
          </h1>
          <p
            className="mt-7 max-w-[52ch] text-[19px] leading-[1.45]"
            style={{ color: "var(--dc-muted)" }}
          >
            A paid diagnostic that ends in a ranked roadmap and a rupee figure — or in us
            telling you the problem is a process, a hire, or nothing at all. We charge for
            it because free audits are sales calls in costume, and because the work is
            real.
          </p>
        </div>

        <div
          className="dc-pad pb-14 pt-[clamp(52px,6vw,76px)]"
          style={{ background: "rgba(176,38,255,0.06)" }}
        >
          <p className="dc-label-muted">What it costs you</p>
          <p className="font-display mt-3 text-[clamp(28px,3.2vw,42px)] font-extrabold leading-[1.02] tracking-[-0.05em] text-signal">
            About six hours of your team’s time.
          </p>
          <p
            className="mt-3 text-[16px] leading-[1.55]"
            style={{ color: "rgba(236,234,228,0.65)" }}
          >
            It is a paid engagement, scoped on the size of the function and credited in
            full against implementation if we go ahead. We will quote it on the first
            call, once we know what we are looking at.
          </p>

          <div className="my-7 h-px" style={{ background: "var(--dc-line)" }} />

          <dl className="dc-mono grid gap-3 text-xs">
            {terms.map(([term, value, accent]) => (
              <div key={term} className="flex justify-between gap-4">
                <dt style={{ color: `${FOG}0.5)` }}>{term}</dt>
                <dd style={{ color: accent ? "var(--color-signal)" : undefined }}>
                  {value}
                </dd>
              </div>
            ))}
          </dl>

          <NotchButton href="/apply" className="mt-7">
            Apply for a Blueprint
          </NotchButton>
        </div>
      </section>

      <section className="dc-light dc-divide dc-pad py-14">
        <p className="dc-label mb-8" style={{ letterSpacing: "0.18em" }}>
          How the full ten-day version runs
        </p>
        <BlueprintGantt />
      </section>

      <section className="dc dc-divide dc-pad pt-14">
        <h2 className="dc-h2 dc-h2-sm">What you actually receive.</h2>

        <div
          className="dc-panels mt-10 border md:grid-cols-2"
          style={{ borderColor: "var(--dc-line)" }}
        >
          {deliverables.map((item) => (
            <div key={item.n} className="p-8">
              <p className="dc-mono text-[11px] text-signal">{item.n}</p>
              <h3 className="mt-2.5 text-[20px] font-bold tracking-[-0.03em]">
                {item.title}
              </h3>
              <p
                className="mt-2 text-[15px] leading-[1.5]"
                style={{ color: `${FOG}0.55)` }}
              >
                {item.body}
              </p>
            </div>
          ))}
        </div>

        <div className="grid gap-16 py-15 min-[861px]:grid-cols-2">
          <div>
            <p className="dc-label-muted mb-5">What it is not</p>
            <ul className="grid gap-3">
              {notThis.map((item) => (
                <li key={item} className="text-[17px]" style={{ color: `${FOG}0.55)` }}>
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <p className="text-[17px] leading-[1.6]" style={{ color: `${FOG}0.75)` }}>
            Size is not the filter. We work with businesses from around ₹50 lakh to ₹1 Cr
            of revenue upward — the Blueprint is simply scoped to match: a single workflow
            and a 72-hour fast track for a small team, a full function for a larger one.
            If the honest answer is a process change and two good tools, we will say so on
            the first call, for free.
          </p>
        </div>
      </section>

      <ClosingCta
        title="Book the diagnostic."
        blurb="Tell us the function and we will scope the Blueprint on the first call — then credit it in full if you build with us."
        primary={{ href: "/apply", label: "Apply for a Blueprint" }}
        secondary={{ href: "/how-we-work", label: "How we work" }}
      />
    </>
  );
}
