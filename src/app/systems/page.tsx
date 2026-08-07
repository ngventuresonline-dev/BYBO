import type { Metadata } from "next";
import Link from "next/link";
import { NotchButton } from "@/components/dc/NotchButton";
import { STACK, LEAD_SYSTEM } from "@/lib/dc-systems";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "AI Systems",
  description:
    "Seven enterprise AI systems, ordered by how fast they pay back: business operations, agentic operations, knowledge, platforms, customer AI, decision intelligence and governance.",
  path: "/systems",
  keywords: [
    "enterprise AI systems",
    "custom AI platforms",
    "agentic operations",
    "enterprise knowledge systems",
    "decision intelligence AI",
  ],
});

const leadOutcomes = [
  "Turnaround time per file, measured against your own last quarter",
  "Documents processed per person, without adding headcount",
  "An audit trail your compliance reviewer can actually read",
];

/** Relative bar opacity steps down the stack, mirroring payback speed. */
const BAR_ALPHA = [1, 0.75, 0.55, 0.4, 0.3, 0.22, 0.16];

export default function SystemsPage() {
  return (
    <>
      <section className="dc dc-divide dc-pad pb-13 pt-[clamp(52px,6vw,76px)]">
        <p className="dc-label">Capability stack</p>
        <h1 className="dc-h1 mt-7 max-w-[15ch]">
          Seven systems, ordered by how fast they pay back.
        </h1>
        <p
          className="mt-6 max-w-[58ch] text-[19px] leading-[1.45]"
          style={{ color: "var(--dc-muted)" }}
        >
          Most businesses should start at the top. Documents and approvals are where the
          maths is clearest, the risk lowest, and the competition weakest.
        </p>

        <div className="mt-11 grid gap-1.5">
          <div className="grid items-center gap-5 min-[861px]:grid-cols-[150px_1fr]">
            <span className="dc-label-muted" style={{ letterSpacing: "0.14em" }}>
              Payback speed
            </span>
            <div className="flex h-[26px] gap-1" aria-hidden>
              {STACK.map((entry, i) => (
                <span
                  key={entry.slug}
                  className="block"
                  style={{
                    width: entry.payback,
                    background: `rgba(176,38,255,${BAR_ALPHA[i]})`,
                  }}
                />
              ))}
            </div>
          </div>
          <div className="hidden gap-5 min-[861px]:grid min-[861px]:grid-cols-[150px_1fr]">
            <span />
            <div
              className="dc-mono flex gap-1 text-[10px]"
              style={{ color: "rgba(236,234,228,0.35)" }}
              aria-hidden
            >
              {STACK.map((entry) => (
                <span key={entry.slug} style={{ width: entry.payback }}>
                  {entry.index}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section
        className="dc dc-divide"
        style={{ background: "rgba(176,38,255,0.06)" }}
      >
        <Link
          href={`/systems/${LEAD_SYSTEM.slug}`}
          className="grid min-[861px]:grid-cols-[1.2fr_1fr]"
        >
          <div
            className="dc-pad py-13 min-[861px]:border-r"
            style={{ borderColor: "var(--dc-line)" }}
          >
            <p className="dc-label" style={{ letterSpacing: "0.18em" }}>
              {LEAD_SYSTEM.index} · Start here
            </p>
            <h2 className="dc-h2 mt-4 text-[clamp(32px,4.4vw,58px)] leading-[0.94]">
              {LEAD_SYSTEM.name}
            </h2>
            <p
              className="mt-4 max-w-[48ch] text-[18px] leading-[1.5]"
              style={{ color: "rgba(236,234,228,0.66)" }}
            >
              {LEAD_SYSTEM.detail}
            </p>
            <p className="dc-mono mt-7 text-[11px] uppercase tracking-[0.14em] text-signal">
              Open the system sheet →
            </p>
          </div>

          <div className="dc-pad grid content-start gap-3.5 py-13">
            <p className="dc-label-muted">What changes</p>
            {leadOutcomes.map((item) => (
              <p
                key={item}
                className="text-[16px] leading-[1.45]"
                style={{ color: "rgba(236,234,228,0.85)" }}
              >
                {item}
              </p>
            ))}
          </div>
        </Link>
      </section>

      <section
        className="dc dc-panels dc-divide md:grid-cols-2"
        style={{ borderColor: "var(--dc-line)" }}
      >
        {STACK.slice(1).map((entry) => (
          <Link
            key={entry.slug}
            href={`/systems/${entry.slug}`}
            className="dc-pad block py-10 transition-colors hover:bg-[rgba(176,38,255,0.06)]"
          >
            <p className="dc-mono text-[11px] tracking-[0.18em] text-signal">
              {entry.index}
            </p>
            <h2 className="dc-h3 mt-3 text-[27px]">{entry.name}</h2>
            <p
              className="mt-3 text-[16px] leading-[1.5]"
              style={{ color: "var(--dc-muted)" }}
            >
              {entry.detail}
            </p>
          </Link>
        ))}
      </section>

      <section className="dc-light dc-pad dc-section grid items-center gap-12 min-[861px]:grid-cols-[1fr_auto]">
        <div>
          <h2 className="dc-h2 dc-h2-sm max-w-[22ch] text-[clamp(28px,3.6vw,48px)] leading-[0.98]">
            Not sure which one you need? That is what the Blueprint is for.
          </h2>
          <p
            className="mt-4 max-w-[54ch] text-[17px] leading-[1.5]"
            style={{ color: "var(--dc-muted)" }}
          >
            A few days of work, a ranked shortlist, and a recommendation that sometimes
            says “don’t build this”.
          </p>
        </div>
        <NotchButton href="/blueprint" variant="surface">
          Explore the Blueprint
        </NotchButton>
      </section>
    </>
  );
}
