import type { Metadata } from "next";
import { ClosingCta } from "@/components/dc/ClosingCta";
import { CONTACT } from "@/lib/site";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "About",
  description:
    "BYBO is a systems firm, not an AI agency. Based in Bengaluru, part of N&G Ventures, in partnership with Bcon Club — structured to still be there in month seven.",
  path: "/about",
  keywords: [
    "BYBO about",
    "AI systems firm Bengaluru",
    "N&G Ventures",
    "enterprise AI partner India",
  ],
});

const MONO = "IBM Plex Mono, monospace";
const INK = "rgba(15,15,17,";

const paragraphs = [
  "There are hundreds of firms in this city selling “AI transformation”. Almost all of them sell a one-off build: a chatbot, a content tool, a dashboard. A build is a single sale, and its price drops every few months as the tools improve. That is a race to the bottom, and we are not in it.",
  "The hard part is not getting an AI system to work in a demo. It is keeping it working in month seven, when your data has changed, the odd cases have turned up, the technology underneath has updated, and a supplier has quietly changed their format. Very few firms here are set up to still be around in month seven.",
  "So we built the firm around that instead. A paid study first, so the thinking is taken seriously. Then a build with an agreed scope and an agreed definition of done. Then a monthly arrangement with one named owner, a review every month, and a comparison against the numbers we recorded before anything went live.",
];

const closingParagraph =
  "It is a slower business to build than an agency. It is also the only version of this work we would put our own name against.";

const cards = [
  {
    label: "Parent",
    title: CONTACT.parent,
    body: "BYBO operates as its enterprise AI practice — which is why we can take on multi-quarter operating commitments.",
  },
  {
    label: "Partner",
    title: CONTACT.partner,
    body: "Our partner network across Indian business communities — the route through which most of our work arrives.",
  },
  {
    label: "Base",
    title: CONTACT.city,
    body: "On site during Diagnose and Deploy. Operating reviews monthly — in your office when it matters.",
  },
];

/** Pilots spike and fall away; an operated system compounds. */
function PilotsVsOperated() {
  return (
    <svg viewBox="0 0 320 160" className="mt-9 block h-auto w-full" aria-hidden>
      <line x1="20" y1="130" x2="300" y2="130" stroke={`${INK}0.25)`} />
      <polyline
        points="20,120 70,60 120,118 170,58 220,120 270,62 300,124"
        fill="none"
        stroke={`${INK}0.35)`}
        strokeWidth="1.5"
        strokeDasharray="420"
        style={{ animation: "dc-draw 2.4s cubic-bezier(0.16,1,0.3,1) forwards" }}
      />
      <polyline
        points="20,124 90,112 160,96 230,72 300,40"
        fill="none"
        stroke="var(--color-signal-deep)"
        strokeWidth="2"
        strokeDasharray="420"
        style={{ animation: "dc-draw 2.4s cubic-bezier(0.16,1,0.3,1) 0.3s forwards" }}
      />
      <text x="20" y="150" fontFamily={MONO} fontSize="10" fill={`${INK}0.45)`}>
        PILOTS: EXCITEMENT, THEN NOTHING
      </text>
      <text
        x="196"
        y="32"
        fontFamily={MONO}
        fontSize="10"
        fill="var(--color-signal-deep)"
      >
        OPERATED
      </text>
    </svg>
  );
}

export default function AboutPage() {
  return (
    <>
      <section className="dc dc-divide dc-pad pb-13 pt-[clamp(52px,6vw,76px)]">
        <p className="dc-label">About</p>
        <h1 className="dc-h1 mt-7 max-w-[14ch]">A systems firm, not an AI agency.</h1>
        <p
          className="mt-6 max-w-[58ch] text-[19px] leading-[1.45]"
          style={{ color: "var(--dc-muted)" }}
        >
          Based in {CONTACT.city}, part of {CONTACT.parent}, working in partnership with{" "}
          {CONTACT.partner}. Small on purpose: the work only holds up if the people who
          scoped it are the people who run it.
        </p>
      </section>

      <section className="dc-light dc-divide grid min-[861px]:grid-cols-[1fr_1.25fr]">
        <div
          className="dc-pad py-16 min-[861px]:border-r"
          style={{ borderColor: "var(--dc-line)" }}
        >
          <p className="text-[clamp(26px,3.2vw,42px)] font-bold leading-[1.08] tracking-[-0.045em]">
            Indian businesses have been sold AI three times already, and mostly received a
            demo.
          </p>
          <PilotsVsOperated />
        </div>

        <div className="dc-pad grid gap-5 py-16">
          {paragraphs.map((paragraph) => (
            <p
              key={paragraph.slice(0, 40)}
              className="text-[18px] leading-[1.6]"
              style={{ color: `${INK}0.72)` }}
            >
              {paragraph}
            </p>
          ))}
          <p className="text-[18px] leading-[1.6]">{closingParagraph}</p>
        </div>
      </section>

      <section
        className="dc dc-panels dc-divide md:grid-cols-3"
        style={{ borderColor: "var(--dc-line)" }}
      >
        {cards.map((card) => (
          <div key={card.label} className="p-11">
            <p className="dc-label-muted" style={{ color: "var(--color-signal)" }}>
              {card.label}
            </p>
            <h2 className="mt-3 text-[24px] font-bold tracking-[-0.04em]">
              {card.title}
            </h2>
            <p
              className="mt-2.5 text-[16px] leading-[1.5]"
              style={{ color: "var(--dc-muted)" }}
            >
              {card.body}
            </p>
          </div>
        ))}
      </section>

      <ClosingCta
        title="Talk to the people who would run it."
        blurb="No account manager in between. The person who scopes your Blueprint is the person who owns the system afterwards."
        primary={{ href: "/apply", label: "Apply for a consultation" }}
        secondary={{ href: "/how-we-work", label: "How we work" }}
      />
    </>
  );
}
