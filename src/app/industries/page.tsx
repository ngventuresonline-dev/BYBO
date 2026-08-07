import type { Metadata } from "next";
import type { ComponentType } from "react";
import { SectionHead } from "@/components/dc/SectionHead";
import { ClosingCta } from "@/components/dc/ClosingCta";
import {
  BillableShift,
  DocsToPosted,
  GovernedCore,
  OutletHub,
  PeakDemand,
  RfqToQuote,
  RtoLoop,
  SeasonSpike,
  SlotFill,
} from "@/components/industries/IndustryVisuals";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Industries",
  description:
    "Three groups — operations-led teams, high-consideration businesses and consumer brands — with where an AI system belongs across demand, operations and intelligence, and the metric your board will ask about.",
  path: "/industries",
  keywords: [
    "AI for manufacturing India",
    "AI for logistics",
    "AI for real estate",
    "AI for healthcare clinics",
    "AI for D2C retail",
  ],
});

type Card = {
  code: string;
  title: string;
  hurts: string;
  Visual: ComponentType<{ className?: string }>;
  layers: { n: string; lead: string; body: string }[];
  metric: string;
};

type Bucket = {
  code: string;
  title: string;
  note: string;
  intro: string;
  light: boolean;
  cards: Card[];
};

const buckets: Bucket[] = [
  {
    code: "Bucket A",
    title: "Operations-led teams",
    note: "Largest whitespace in India",
    intro:
      "Where documents, approvals and coordination set your speed and your margin. The rules already exist — usually in one person’s head — so the payback is arithmetic rather than faith.",
    light: true,
    cards: [
      {
        code: "A1",
        title: "Manufacturing & exporters",
        hurts:
          "An RFQ lands as a PDF and a spec sheet. It waits for the one engineer who knows the tolerances. The quote goes out three days later, second.",
        Visual: RfqToQuote,
        layers: [
          {
            n: "01",
            lead: "Demand.",
            body: "RFQs parsed, spec-checked and priced into a draft quote; dealer and distributor follow-up.",
          },
          {
            n: "02",
            lead: "Plant & supply.",
            body: "Vendor documents, GRNs and QC records reconciled; drawings and tolerances made searchable.",
          },
          {
            n: "03",
            lead: "Order-book intelligence.",
            body: "Demand forecasting, input-cost movement, win/loss by product and region.",
          },
        ],
        metric: "Quote turnaround, then win rate",
      },
      {
        code: "A2",
        title: "Logistics & 3PL",
        hurts:
          "PODs and invoices keyed in by hand, exceptions chased on the phone, and a team answering “where is my shipment” all day.",
        Visual: DocsToPosted,
        layers: [
          {
            n: "01",
            lead: "Documents.",
            body: "PODs, e-way bills and invoices extracted, matched to the order and posted; only exceptions to a person.",
          },
          {
            n: "02",
            lead: "Network operations.",
            body: "Dwell and delay flagged early, status answered automatically, claims packaged with evidence.",
          },
          {
            n: "03",
            lead: "Margin intelligence.",
            body: "Lane profitability, fleet utilisation, detention and demurrage leakage.",
          },
        ],
        metric: "Documents per person, exception time",
      },
      {
        code: "A3",
        title: "Professional services",
        hurts:
          "Senior people spending their week on document review, precedent hunting and proposal drafting instead of the judgement clients pay for.",
        Visual: BillableShift,
        layers: [
          {
            n: "01",
            lead: "Knowledge.",
            body: "Past matters, precedents and filings answerable with the source paragraph cited.",
          },
          {
            n: "02",
            lead: "Delivery operations.",
            body: "Document review, diligence checklists and first-pass drafting — always behind a partner’s sign-off.",
          },
          {
            n: "03",
            lead: "Practice intelligence.",
            body: "Realisation, pipeline and pricing by matter type.",
          },
        ],
        metric: "Hours recovered per fee-earner",
      },
    ],
  },
  {
    code: "Bucket B",
    title: "High-consideration businesses",
    note: "Guardrails are the product",
    intro:
      "Long, human, expensive buying journeys. Speed of first response decides the deal, and one careless automated sentence can cost you a licence — so the guardrails, not the cleverness, are the product.",
    light: false,
    cards: [
      {
        code: "B1",
        title: "Real estate & developers",
        hurts:
          "Leads are expensive and answered late — but the larger leak sits either side of the sale: unit inventory in a spreadsheet, approvals chased over email, and land bought on instinct.",
        Visual: GovernedCore,
        layers: [
          {
            n: "01",
            lead: "Demand.",
            body: "Multilingual qualification within minutes, site-visit booking and no-show recovery, channel-partner attribution.",
          },
          {
            n: "02",
            lead: "Inventory & operations.",
            body: "Live unit availability, blocks and pricing; booking-to-registration paperwork; vendor bills and statutory filings read and checked.",
          },
          {
            n: "03",
            lead: "Land & investment intelligence.",
            body: "Parcel screening against comparables and absorption data, title and approval-risk flags, feasibility modelled before capital is committed.",
          },
        ],
        metric: "Cost per site visit · days to close a parcel",
      },
      {
        code: "B2",
        title: "Healthcare & clinics",
        hurts:
          "The front desk cannot answer every call at 11am. Slots go empty, pre-auth paperwork piles up, and recalls are never made.",
        Visual: SlotFill,
        layers: [
          {
            n: "01",
            lead: "Access.",
            body: "Booking, reschedule and recall around the clock, with a hard no-clinical-advice boundary.",
          },
          {
            n: "02",
            lead: "Clinical operations.",
            body: "Pre-authorisation and claim packets assembled, discharge summaries drafted for sign-off, consumables tracked.",
          },
          {
            n: "03",
            lead: "Capacity intelligence.",
            body: "Chair and slot utilisation, referral sources, payer mix.",
          },
        ],
        metric: "No-show rate and slot utilisation",
      },
      {
        code: "B3",
        title: "Education & lending",
        hurts:
          "Enquiries spike tenfold in season while counsellor headcount stays flat — and every reply has to survive a compliance review.",
        Visual: SeasonSpike,
        layers: [
          {
            n: "01",
            lead: "Enquiry.",
            body: "Admissions or loan enquiries qualified and routed to the right counsellor, in the applicant’s language.",
          },
          {
            n: "02",
            lead: "File operations.",
            body: "KYC, income and academic documents extracted, validated against policy, and audit-logged.",
          },
          {
            n: "03",
            lead: "Portfolio intelligence.",
            body: "Cohort conversion, collection cycles, early-risk signals on the book.",
          },
        ],
        metric: "Applications per counsellor, turnaround per file",
      },
    ],
  },
  {
    code: "Bucket C",
    title: "Consumer brands",
    note: "Volume and thin margin",
    intro:
      "High volume and thin margin, with thousands of small signals — tickets, returns, reviews, shift reports — that nobody has time to read. The money is in reading all of them, every day, and acting the same week.",
    light: true,
    cards: [
      {
        code: "C1",
        title: "D2C & e-commerce",
        hurts:
          "“Where is my order” swamps the inbox, a quarter of shipments come back, buying decisions are made on last month’s data, and thousands of reviews go unread.",
        Visual: RtoLoop,
        layers: [
          {
            n: "01",
            lead: "Support.",
            body: "Order status, returns and exchanges answered instantly; anything about money held for a person.",
          },
          {
            n: "02",
            lead: "Supply & inventory.",
            body: "RTO-risk scoring before dispatch, purchase-order and GRN reconciliation, stock cover by SKU and warehouse.",
          },
          {
            n: "03",
            lead: "Category intelligence.",
            body: "Every review and ticket read for defect and demand signals; creative and channel performance against contribution margin.",
          },
        ],
        metric: "Return-to-origin rate · contribution margin",
      },
      {
        code: "C2",
        title: "Restaurants & hospitality",
        hurts:
          "Nobody can pick up the phone at 8pm, wastage is guessed at, rosters are built on instinct, and outlet performance is invisible until month end.",
        Visual: PeakDemand,
        layers: [
          {
            n: "01",
            lead: "Front of house.",
            body: "Bookings, waitlists and review responses handled at peak hour, per outlet.",
          },
          {
            n: "02",
            lead: "Kitchen & supply.",
            body: "Indent forecasting, wastage and yield tracking, vendor invoice checks, roster suggestions against expected covers.",
          },
          {
            n: "03",
            lead: "Menu intelligence.",
            body: "Item-level profitability, sentiment by dish and outlet, pricing tested against demand.",
          },
        ],
        metric: "Covers captured per shift · food cost",
      },
      {
        code: "C3",
        title: "Multi-location retail",
        hurts:
          "Standards drift between outlets, stock sits in the wrong store, and managers report by WhatsApp screenshot — so nobody can say which branch is actually working.",
        Visual: OutletHub,
        layers: [
          {
            n: "01",
            lead: "Customer.",
            body: "Appointments, no-show recovery and loyalty follow-up, consistent across every branch.",
          },
          {
            n: "02",
            lead: "Store operations.",
            body: "SOP assistant for managers, stock transfers between outlets, audit and compliance checks read from photos and reports.",
          },
          {
            n: "03",
            lead: "Network intelligence.",
            body: "Like-for-like performance, catchment and site selection for the next store.",
          },
        ],
        metric: "Variance between best and worst outlet",
      },
    ],
  },
];

const lenses = [
  "01 Demand & customers",
  "02 Operations, inventory & documents",
  "03 Investment & decision intelligence",
];

function IndustryCard({ card }: { card: Card }) {
  const { Visual } = card;
  return (
    <article className="dc-pad flex flex-col gap-4.5 py-8">
      <div>
        <p className="dc-label-muted" style={{ color: "var(--dc-accent)" }}>
          {card.code}
        </p>
        <h3 className="mt-2 text-[22px] font-bold tracking-[-0.035em]">{card.title}</h3>
      </div>

      <div>
        <p className="dc-label-muted" style={{ letterSpacing: "0.16em" }}>
          What hurts
        </p>
        <p
          className="mt-1.5 text-[15px] leading-[1.5]"
          style={{ color: "var(--dc-muted)" }}
        >
          {card.hurts}
        </p>
      </div>

      <Visual />

      <div>
        <p className="dc-label-muted" style={{ letterSpacing: "0.16em" }}>
          Where the system sits
        </p>
        <div className="mt-2.5 grid gap-3">
          {card.layers.map((layer) => (
            <div key={layer.n} className="grid grid-cols-[26px_1fr] gap-2.5">
              <span
                className="dc-mono text-[10px]"
                style={{ color: "var(--dc-accent)" }}
              >
                {layer.n}
              </span>
              <p
                className="text-[14px] leading-[1.45]"
                style={{ color: "rgba(var(--dc-ink-rgb), 0.72)" }}
              >
                <span className="font-semibold" style={{ color: "var(--dc-ink)" }}>
                  {layer.lead}
                </span>{" "}
                {layer.body}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div
        className="mt-auto border-t pt-4"
        style={{ borderColor: "rgba(var(--dc-ink-rgb), 0.16)" }}
      >
        <p className="dc-label-muted" style={{ letterSpacing: "0.16em" }}>
          The metric
        </p>
        <p
          className="mt-1.5 text-[17px] font-semibold tracking-[-0.02em]"
          style={{ color: "var(--dc-accent)" }}
        >
          {card.metric}
        </p>
      </div>
    </article>
  );
}

export default function IndustriesPage() {
  return (
    <>
      <section className="dc dc-divide dc-pad pb-13 pt-[clamp(52px,6vw,76px)]">
        <p className="dc-label">Industries</p>
        <h1 className="dc-h1 mt-7 max-w-[15ch]">
          Find the business that looks like yours.
        </h1>
        <p
          className="mt-6 max-w-[62ch] text-[19px] leading-[1.45]"
          style={{ color: "var(--dc-muted)" }}
        >
          Three groups, because the shape of the problem repeats even when the industry
          does not. For each one we show where a system belongs across the whole business
          — the front office, the operations behind it, and the intelligence your
          leadership decides on — and the metric your board will ask about.
        </p>
        <ul className="mt-8 flex flex-wrap gap-2.5">
          {lenses.map((lens, i) => (
            <li
              key={lens}
              className="dc-mono border px-3.5 py-2.5 text-[11px] uppercase tracking-[0.12em]"
              style={{
                borderColor: i === 2 ? "var(--color-signal)" : "rgba(236,234,228,0.22)",
                color: i === 2 ? "var(--color-signal)" : "rgba(236,234,228,0.7)",
              }}
            >
              {lens}
            </li>
          ))}
        </ul>
      </section>

      {buckets.map((bucket) => (
        <section
          key={bucket.code}
          className={`${bucket.light ? "dc-light" : "dc"} dc-divide`}
        >
          <div className="dc-pad py-7">
            <SectionHead
              label={bucket.code}
              title={bucket.title}
              note={bucket.note}
            />
          </div>
          <p
            className="dc-pad max-w-[78ch] pb-7 text-[17px] leading-[1.5]"
            style={{ color: "var(--dc-muted)" }}
          >
            {bucket.intro}
          </p>
          <div
            className="dc-panels border-t md:grid-cols-2 min-[1181px]:grid-cols-3"
            style={{ borderColor: "var(--dc-line)" }}
          >
            {bucket.cards.map((card) => (
              <IndustryCard key={card.code} card={card} />
            ))}
          </div>
        </section>
      ))}

      <ClosingCta
        title="Tell us which row describes you."
        blurb="The shape repeats, but the rules are yours. A Blueprint maps your version of it and puts a number against the leak."
        primary={{ href: "/apply", label: "Apply for a consultation" }}
        secondary={{ href: "/blueprint", label: "Start a Blueprint" }}
      />
    </>
  );
}
