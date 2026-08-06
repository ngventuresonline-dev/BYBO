import Link from "next/link";
import { ArrowUpRight, Layers, ShieldCheck, Workflow } from "lucide-react";
import { FadeIn } from "@/components/FadeIn";

const pillars = [
  {
    icon: Workflow,
    title: "Built around real workflows",
    body: "Systems start where work enters - CRM, ERP, inbox, documents - and end where a person or tool must act.",
    href: "/how-we-work",
    cta: "How we work",
  },
  {
    icon: ShieldCheck,
    title: "Governed by default",
    body: "Permissions, escalation paths, prohibited actions, and human approval are part of the product - not an afterthought.",
    href: "/systems/ai-infrastructure-governance",
    cta: "Governance layer",
  },
  {
    icon: Layers,
    title: "Measured against a baseline",
    body: "Every deployment defines what success looks like before launch - cycle time, exceptions, cost, and ownership.",
    href: "/blueprint",
    cta: "Start with Blueprint",
  },
];

export function HomeValuePillars() {
  return (
    <section className="value-pillars home-section relative overflow-hidden border-b border-line bg-void">
      <div className="value-pillars__glow" aria-hidden="true" />
      <div className="value-pillars__rings" aria-hidden="true" />

      <div className="section-shell relative">
        <FadeIn>
          <div className="mx-auto mb-10 max-w-3xl text-center lg:mb-14">
            <p className="eyebrow justify-center">What we do</p>
            <h2 className="section-title mx-auto mt-5 title-wide">
              Practical{" "}
              <span className="text-signal">AI systems</span> - not experiments
              left in a slide deck.
            </h2>
          </div>
        </FadeIn>

        <div className="grid gap-4 lg:grid-cols-3 lg:gap-5">
          {pillars.map((pillar, index) => {
            const Icon = pillar.icon;
            return (
              <FadeIn key={pillar.title} delay={index * 0.06}>
                <article className="pillar-card group">
                  <span className="pillar-card__icon" aria-hidden="true">
                    <Icon size={18} strokeWidth={1.7} />
                  </span>
                  <div className="pillar-card__body">
                    <h3 className="pillar-card__title">{pillar.title}</h3>
                    <p className="pillar-card__copy">{pillar.body}</p>
                    <Link href={pillar.href} className="pillar-card__cta">
                      {pillar.cta} <ArrowUpRight size={12} />
                    </Link>
                  </div>
                </article>
              </FadeIn>
            );
          })}
        </div>
      </div>
    </section>
  );
}
