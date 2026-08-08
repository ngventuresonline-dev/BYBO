import type { Metadata } from "next";
import { ClosingCta } from "@/components/dc/ClosingCta";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "How we work",
  description:
    "Diagnose, Deploy, Operate, Expand. Four stages in order, with a named owner, a measured baseline, and approval reserved for the decisions that need it.",
  path: "/how-we-work",
  keywords: [
    "AI delivery method",
    "AI operating model",
    "AI governance process",
    "managed AI operations India",
  ],
});

const MONO = "IBM Plex Mono, monospace";
const FOG = "rgba(236,234,228,";
const INK = "rgba(15,15,17,";

const stages = [
  {
    n: "01",
    title: "Diagnose",
    meta: "3–10 days · paid · credited",
    body: "We follow the work as it really happens, put a rupee figure on what the delays cost you each year, and put the options in order. You get a 90-day plan and a straight yes or no — sometimes that answer is “fix the process first”.",
  },
  {
    n: "02",
    title: "Deploy",
    meta: "4–12 weeks · fixed scope",
    body: "We build it, connect your real tools and data, set the limits, and test it on your own past cases rather than a demo. Then we train your team and hand over the instructions. What counts as “done” is agreed before we start.",
  },
  {
    n: "03",
    title: "Operate",
    meta: "Ongoing · this is the actual business",
    body: "We watch it, fix what breaks, keep its knowledge current, check its quality and keep the running costs down. Most firms hand over and disappear. Almost all the value comes in the months after launch, so that is the part we stay for.",
    feature: true,
  },
  {
    n: "04",
    title: "Expand",
    meta: "As patterns repeat",
    body: "The second job is faster and cheaper than the first, because the connections and checks already exist. Anything we build twice becomes a ready-made part, and you get the benefit of everything we have built before.",
  },
];

const included = [
  {
    title: "A baseline before launch",
    body: "We measure the current state first. Without it nobody can tell whether the system worked.",
  },
  {
    title: "A named owner",
    body: "One person at BYBO and one at your end. Not a shared inbox, not a ticket queue.",
  },
  {
    title: "Approval where it matters",
    body: "The routine runs unattended. Only the crucial calls — money, commitments, records — wait for a person you name.",
  },
  {
    title: "Failure handling",
    body: "Written before launch: what happens when it is unsure, wrong or offline, and who hears about it.",
  },
  {
    title: "Cost visibility",
    body: "What the system costs per month and per transaction, visible to you, not just to us.",
  },
  {
    title: "Team training",
    body: "The people working alongside it are trained on it, including on when to overrule it.",
  },
];

const timeline = [
  { x: 40, label: "01 DIAGNOSE", note: "3–10 days" },
  { x: 270, label: "02 DEPLOY", note: "4–12 weeks" },
  { x: 500, label: "03 OPERATE", note: "ongoing · SLA" },
  { x: 730, label: "04 EXPAND", note: "as patterns repeat" },
];

function StageTimeline() {
  return (
    <svg viewBox="0 0 1000 120" className="mt-11 block h-auto w-full" aria-hidden>
      <line x1="40" y1="60" x2="960" y2="60" stroke={`${FOG}0.18)`} />
      <line
        x1="40"
        y1="60"
        x2="960"
        y2="60"
        stroke="var(--color-signal)"
        strokeWidth="1.5"
        strokeDasharray="12 10"
        style={{ animation: "dc-march 3.2s linear infinite" }}
      />
      {[34, 264, 494, 724].map((x) => (
        <rect key={x} x={x} y="54" width="12" height="12" fill="var(--color-signal)" />
      ))}
      <rect x="954" y="54" width="12" height="12" fill="none" stroke={`${FOG}0.4)`} />
      {timeline.map((item) => (
        <g key={item.label}>
          <text
            x={item.x}
            y="42"
            fontFamily={MONO}
            fontSize="10"
            letterSpacing="1.6"
            fill={`${FOG}0.55)`}
          >
            {item.label}
          </text>
          <text x={item.x} y="88" fontFamily={MONO} fontSize="10" fill={`${FOG}0.35)`}>
            {item.note}
          </text>
        </g>
      ))}
    </svg>
  );
}

export default function HowWeWorkPage() {
  return (
    <>
      <section className="dc dc-divide dc-pad pb-13 pt-[clamp(52px,6vw,76px)]">
        <p className="dc-label">Method</p>
        <h1 className="dc-h1 mt-7 max-w-[13ch]">Diagnose. Deploy. Operate. Expand.</h1>
        <p
          className="mt-6 max-w-[58ch] text-[19px] leading-[1.45]"
          style={{ color: "var(--dc-muted)" }}
        >
          Four stages, in order. You can stop after any one of them, and it is always
          clear what happens next and who is doing it.
        </p>
        <StageTimeline />
      </section>

      <section className="dc dc-divide">
        {stages.map((stage, i) => (
          <div
            key={stage.n}
            className="dc-pad grid items-start gap-6 py-10 min-[1181px]:grid-cols-[84px_1fr_1.3fr] min-[1181px]:gap-10"
            style={{
              borderBottom:
                i === stages.length - 1 ? undefined : "1px solid rgba(236,234,228,0.1)",
              background: stage.feature ? "rgba(176,38,255,0.07)" : undefined,
              borderLeft: stage.feature ? "2px solid var(--color-signal)" : undefined,
            }}
          >
            <span className="dc-mono text-[11px] text-signal">{stage.n}</span>
            <div>
              <h2 className="font-display text-[30px] font-bold tracking-[-0.045em]">
                {stage.title}
              </h2>
              <p
                className="dc-mono mt-2.5 text-[11px] uppercase tracking-[0.12em]"
                style={{
                  color: stage.feature ? "var(--color-signal)" : `${FOG}0.4)`,
                }}
              >
                {stage.meta}
              </p>
            </div>
            <p
              className="text-[17px] leading-[1.55]"
              style={{ color: stage.feature ? `${FOG}0.8)` : `${FOG}0.66)` }}
            >
              {stage.body}
            </p>
          </div>
        ))}
      </section>

      <section className="dc-light dc-divide dc-pad pt-14">
        <h2 className="dc-h2 dc-h2-sm max-w-[20ch]">
          Six things every deployment includes.
        </h2>
        <p
          className="mt-4 max-w-[50ch] text-[17px] leading-[1.5]"
          style={{ color: "var(--dc-muted)" }}
        >
          Not options. Not a governance package sold separately at the end.
        </p>

        <div
          className="dc-panels mt-10 border md:grid-cols-2 min-[1181px]:grid-cols-3"
          style={{ borderColor: "var(--dc-line)" }}
        >
          {included.map((item) => (
            <div key={item.title} className="p-7">
              <h3 className="text-[19px] font-bold tracking-[-0.03em]">{item.title}</h3>
              <p
                className="mt-2 text-[15px] leading-[1.5]"
                style={{ color: `${INK}0.6)` }}
              >
                {item.body}
              </p>
            </div>
          ))}
        </div>

        <div className="grid items-center gap-16 py-16 min-[861px]:grid-cols-2">
          <div>
            <p className="dc-label" style={{ letterSpacing: "0.18em" }}>
              Versus a development agency
            </p>
            <h2 className="dc-h2 dc-h2-sm mt-4 text-[clamp(30px,4vw,54px)] leading-[0.98]">
              An agency finishes at handover. We start there.
            </h2>
          </div>
          <p className="text-[17px] leading-[1.6]" style={{ color: `${INK}0.68)` }}>
            A development shop is paid to deliver and leave. That is fine for a website.
            It does not work for an AI system, because these systems slip over time: your
            data changes, odd cases turn up, the technology underneath updates, and the
            running cost creeps. Someone has to watch it and correct it every month. We
            would rather be paid for that than for the build.
          </p>
        </div>
      </section>

      <ClosingCta
        title="Start with the stage that fits."
        blurb="Most engagements begin with a Blueprint. If you already know the workflow and the number, we can go straight to a fixed-scope build."
        primary={{ href: "/blueprint", label: "Start a Blueprint" }}
        secondary={{ href: "/apply", label: "Apply for a consultation" }}
      />
    </>
  );
}
