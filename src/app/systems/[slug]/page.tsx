import type { Metadata } from "next";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { NotchButton } from "@/components/dc/NotchButton";
import { SectionHead } from "@/components/dc/SectionHead";
import { ClosingCta } from "@/components/dc/ClosingCta";
import { PipelineFigure } from "@/components/systems/PipelineFigure";
import { systems, type SystemDefinition } from "@/lib/content";
import { STACK_BY_SLUG, type SystemSheet } from "@/lib/dc-systems";
import { pageMetadata } from "@/lib/seo";

type Props = {
  params: Promise<{ slug: string }>;
};

const legacySystemRoutes: Record<string, string> = {
  revenue: "custom-ai-platforms",
  "customer-experience": "customer-workforce-ai",
  "brand-intelligence": "enterprise-knowledge-systems",
  // The redesign names the document system "Business Operations".
  "business-operations": "document-multimodal-intelligence",
};

export function generateStaticParams() {
  return [
    ...systems.map((system) => ({ slug: system.slug })),
    ...Object.keys(legacySystemRoutes).map((slug) => ({ slug })),
  ];
}

/**
 * Systems without hand-authored sheet copy derive one from the content model:
 * the workflow becomes the figure, and metrics become what we measure.
 */
function deriveSheet(system: SystemDefinition): SystemSheet {
  const stages = system.workflow.map((step) => ({ title: step.label }));
  return {
    headline: system.promise,
    lede: system.description,
    figure: {
      caption: "Fig. 1 — How the system runs",
      note: `${stages.length} stages · one gate`,
      stages,
      gate: Math.max(0, stages.length - 2),
      footnote: "EVERY STEP RECORDED · EXCEPTIONS ROUTED TO A NAMED PERSON",
    },
    measures: system.metrics.slice(0, 4),
    aside: {
      title: "Controls, not an afterthought",
      body: system.controls.join(". ") + ".",
    },
  };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const resolvedSlug = legacySystemRoutes[slug] ?? slug;
  const system = systems.find((item) => item.slug === resolvedSlug);
  if (!system) return {};

  const entry = STACK_BY_SLUG.get(system.slug);
  const name = entry?.name ?? system.name;

  return pageMetadata({
    title: name,
    description: `${system.short} ${system.description}`.slice(0, 160),
    path: `/systems/${system.slug}`,
    keywords: [name, "enterprise AI system", "BYBO", ...system.capabilities.slice(0, 3)],
  });
}

export default async function SystemDetailPage({ params }: Props) {
  const { slug } = await params;
  if (legacySystemRoutes[slug]) {
    redirect(`/systems/${legacySystemRoutes[slug]}`);
  }

  const system = systems.find((item) => item.slug === slug);
  if (!system) notFound();

  const entry = STACK_BY_SLUG.get(system.slug);
  const name = entry?.name ?? system.name;
  const sheet = entry?.sheet ?? deriveSheet(system);

  return (
    <>
      <section className="dc dc-divide dc-pad py-6">
        <Link
          href="/systems"
          className="dc-mono text-[11px] uppercase tracking-[0.14em] transition-colors hover:text-signal"
          style={{ color: "rgba(236,234,228,0.5)" }}
        >
          ← Capability stack
        </Link>
      </section>

      <section className="dc dc-divide dc-pad pb-13 pt-16">
        <p className="dc-label">
          {entry ? `${entry.index} · ${name}` : name}
        </p>
        <h1 className="dc-h1 mt-7 max-w-[14ch]">{sheet.headline}</h1>
        <div className="mt-9 grid items-end gap-14 min-[861px]:grid-cols-[1.1fr_auto]">
          <p
            className="max-w-[54ch] text-[19px] leading-[1.45]"
            style={{ color: "var(--dc-muted)" }}
          >
            {sheet.lede}
          </p>
          <NotchButton href="/apply">Discuss this system</NotchButton>
        </div>
      </section>

      <section className="dc-light dc-divide dc-pad py-14">
        <SectionHead
          label={sheet.figure.caption}
          note={sheet.figure.note}
          className="mb-10"
        />
        <PipelineFigure
          stages={sheet.figure.stages}
          gate={sheet.figure.gate}
          loopback={sheet.figure.loopback}
          footnote={sheet.figure.footnote}
        />
      </section>

      <section
        className="dc dc-panels dc-divide md:grid-cols-2"
        style={{ borderColor: "var(--dc-line)" }}
      >
        <div className="dc-pad py-12">
          <p className="dc-label-muted mb-6">What we measure</p>
          <ul className="grid gap-4">
            {sheet.measures.map((item) => (
              <li key={item} className="text-[17px] leading-[1.45]">
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="dc-pad py-12" style={{ background: "rgba(176,38,255,0.07)" }}>
          <p className="dc-label-muted mb-6" style={{ color: "var(--color-signal)" }}>
            {sheet.aside.title}
          </p>
          <p
            className="text-[17px] leading-[1.6]"
            style={{ color: "rgba(236,234,228,0.78)" }}
          >
            {sheet.aside.body}
          </p>
        </div>
      </section>

      <ClosingCta
        title="Tell us where the business loses time."
        blurb="Forty-five minutes, no slides. We will either suggest a Blueprint, point you to a cheaper fix you can do without us, or tell you this is not a job for AI."
        primary={{ href: "/apply", label: "Apply for a consultation" }}
        secondary={{ href: "/systems", label: "All seven systems" }}
      />
    </>
  );
}
