"use client";

import { useState } from "react";
import { Plus, Minus } from "lucide-react";
import { FadeIn } from "../FadeIn";

const faqs = [
  {
    q: "What does AI-first actually mean?",
    a: "We don't bolt ChatGPT onto your workflow. We build integrated systems — content engines, WhatsApp bots, ad optimizers — that connect and improve over time.",
  },
  {
    q: "How fast can you go live?",
    a: "Most clients deploy in 2–3 weeks. Week 1 is audit, week 2 is build, week 3 is launch.",
  },
  {
    q: "Do I need to be technical?",
    a: "No. We handle setup, training, and ongoing management. You get a dashboard and WhatsApp updates.",
  },
  {
    q: "Can I cancel or switch plans?",
    a: "Yes. Cancel anytime. Upgrade or downgrade and we'll adjust your stack within a week.",
  },
];

export function FAQSection() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="section-pad">
      <div className="max-w-2xl mx-auto px-6">
        <FadeIn>
          <h2 className="font-display text-3xl md:text-4xl font-bold tracking-tight mb-10">
            Questions
          </h2>
        </FadeIn>

        <div className="divide-y divide-border border-y border-border">
          {faqs.map((faq, i) => (
            <FadeIn key={faq.q} delay={i * 0.05}>
              <button
                className="w-full flex items-start justify-between gap-4 py-5 text-left"
                onClick={() => setOpen(open === i ? null : i)}
              >
                <span className="font-medium pr-4">{faq.q}</span>
                {open === i ? (
                  <Minus size={18} className="shrink-0 text-dim mt-0.5" />
                ) : (
                  <Plus size={18} className="shrink-0 text-dim mt-0.5" />
                )}
              </button>
              {open === i && (
                <p className="pb-5 text-muted text-sm leading-relaxed -mt-1">
                  {faq.a}
                </p>
              )}
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
