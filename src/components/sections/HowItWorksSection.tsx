"use client";

import { FadeIn } from "../FadeIn";

const steps = [
  { num: "01", title: "Audit", desc: "30-min call. We map your gaps and build a roadmap." },
  { num: "02", title: "Build", desc: "Configure AI stack, train on your brand, get approval." },
  { num: "03", title: "Launch", desc: "Go live in 2 weeks. WhatsApp, dashboard, full handoff." },
  { num: "04", title: "Grow", desc: "We optimize weekly. You watch the numbers move." },
];

export function HowItWorksSection() {
  return (
    <section id="process" className="section-pad bg-paper border-y border-border">
      <div className="max-w-6xl mx-auto px-6">
        <FadeIn>
          <p className="eyebrow mb-3">Process</p>
          <h2 className="font-display text-4xl md:text-5xl font-bold tracking-tight mb-16">
            Audit to live in 4 weeks
          </h2>
        </FadeIn>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-border rounded-2xl overflow-hidden border border-border">
          {steps.map((step, i) => (
            <FadeIn key={step.num} delay={i * 0.08}>
              <div className="bg-paper p-8 h-full">
                <span className="font-display text-sm font-bold text-accent">{step.num}</span>
                <h3 className="font-display text-xl font-bold mt-4">{step.title}</h3>
                <p className="text-muted text-sm leading-relaxed mt-2">{step.desc}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
