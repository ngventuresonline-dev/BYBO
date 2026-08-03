"use client";

import Link from "next/link";
import { Check } from "lucide-react";
import { FadeIn } from "../FadeIn";

const tiers = [
  {
    name: "Launch",
    price: "₹24,999",
    period: "/mo",
    desc: "One AI pillar to get started",
    features: ["1 solution pillar", "Basic automation", "Monthly reports", "Email support"],
    cta: "Get started",
    highlight: false,
  },
  {
    name: "Scale",
    price: "₹49,999",
    period: "/mo",
    desc: "Full stack for growing brands",
    features: [
      "3 solution pillars",
      "Full AI stack",
      "Bi-weekly optimization",
      "Account manager",
      "WhatsApp support",
    ],
    cta: "Get started",
    highlight: true,
  },
  {
    name: "Transform",
    price: "Custom",
    period: "",
    desc: "Enterprise & multi-location",
    features: [
      "All pillars + custom agents",
      "Dedicated team",
      "SLA & priority support",
      "White-label options",
    ],
    cta: "Talk to us",
    highlight: false,
  },
];

export function PricingPreviewSection() {
  return (
    <section className="section-pad bg-paper border-t border-border">
      <div className="max-w-6xl mx-auto px-6">
        <FadeIn>
          <div className="text-center mb-14">
            <p className="eyebrow mb-3">Pricing</p>
            <h2 className="font-display text-4xl md:text-5xl font-bold tracking-tight">
              Straightforward. No surprises.
            </h2>
            <p className="text-muted mt-4">
              + one-time setup from ₹15K–₹50K depending on scope
            </p>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {tiers.map((tier, i) => (
            <FadeIn key={tier.name} delay={i * 0.08}>
              <div
                className={`card p-8 h-full flex flex-col ${
                  tier.highlight ? "border-ink ring-1 ring-ink" : ""
                }`}
              >
                {tier.highlight && (
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-accent mb-4">
                    Most chosen
                  </span>
                )}
                <h3 className="font-display text-xl font-bold">{tier.name}</h3>
                <div className="mt-3 mb-1">
                  <span className="font-display text-4xl font-bold">{tier.price}</span>
                  <span className="text-muted text-sm">{tier.period}</span>
                </div>
                <p className="text-sm text-muted mb-6">{tier.desc}</p>
                <ul className="space-y-2.5 mb-8 flex-1">
                  {tier.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm text-muted">
                      <Check size={15} className="text-ink mt-0.5 shrink-0" strokeWidth={2.5} />
                      {f}
                    </li>
                  ))}
                </ul>
                <Link
                  href="/#contact"
                  className={`text-center py-3 rounded-full text-sm font-medium transition-all ${
                    tier.highlight
                      ? "btn-primary !w-full"
                      : "btn-secondary !w-full"
                  }`}
                >
                  {tier.cta}
                </Link>
              </div>
            </FadeIn>
          ))}
        </div>

        <FadeIn delay={0.2}>
          <p className="text-center mt-8">
            <Link href="/pricing" className="text-sm text-muted hover:text-ink underline underline-offset-4">
              Compare all features →
            </Link>
          </p>
        </FadeIn>
      </div>
    </section>
  );
}
