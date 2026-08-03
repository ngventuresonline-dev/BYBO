"use client";

import Link from "next/link";
import { ArrowRight, Brain } from "lucide-react";
import { FadeIn } from "../FadeIn";

export function QuizSection() {
  return (
    <section id="quiz" className="py-24 md:py-32 bg-charcoal">
      <div className="max-w-7xl mx-auto px-6">
        <FadeIn>
          <div className="relative overflow-hidden rounded-3xl border border-teal/30 bg-gradient-to-br from-teal/10 via-slate/50 to-charcoal p-12 md:p-16 glow-teal">
            <div className="absolute top-0 right-0 w-64 h-64 bg-teal/10 rounded-full blur-3xl" />
            <div className="relative max-w-2xl">
              <div className="w-14 h-14 rounded-2xl bg-teal/20 flex items-center justify-center mb-6">
                <Brain size={28} className="text-teal" />
              </div>
              <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
                How AI-ready is your business?
              </h2>
              <p className="text-muted text-lg leading-relaxed mb-8">
                Take our 2-minute assessment and get a personalized AI roadmap —
                free, no strings attached.
              </p>
              <Link
                href="#contact"
                className="inline-flex items-center gap-2 bg-teal text-ink font-semibold px-8 py-4 rounded-xl hover:bg-teal-dark transition-all hover:-translate-y-0.5"
              >
                Start Free Assessment
                <ArrowRight size={18} />
              </Link>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
