"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { FadeIn } from "../FadeIn";

export function CaseStudySection() {
  return (
    <section id="case-study" className="section-pad">
      <div className="max-w-6xl mx-auto px-6">
        <FadeIn>
          <div className="card overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-2">
              <div className="p-8 md:p-12 lg:p-16 flex flex-col justify-center">
                <p className="eyebrow mb-4">Case study</p>
                <h2 className="font-display text-3xl md:text-4xl font-bold leading-tight tracking-tight">
                  D2C skincare brand hit 3× leads in 60 days
                </h2>
                <p className="text-muted mt-4 leading-relaxed">
                  AI content pipeline + WhatsApp qualification bot + Meta ad
                  optimization. Deployed in 14 days. No new hires.
                </p>
                <blockquote className="mt-8 pl-4 border-l-2 border-accent text-muted italic">
                  &ldquo;We&apos;re finally growing without hiring three more
                  people.&rdquo;
                  <footer className="text-sm text-dim mt-2 not-italic">
                    — Founder, Bangalore
                  </footer>
                </blockquote>
                <Link
                  href="/#contact"
                  className="inline-flex items-center gap-1.5 text-sm font-medium mt-8 hover:gap-2.5 transition-all group"
                >
                  Get similar results
                  <ArrowUpRight size={16} className="group-hover:text-accent transition-colors" />
                </Link>
              </div>

              <div className="bg-ink text-paper p-8 md:p-12 flex items-center justify-center min-h-[280px]">
                <div className="grid grid-cols-3 gap-8 w-full max-w-sm">
                  {[
                    { v: "3×", l: "Leads" },
                    { v: "60%", l: "Faster replies" },
                    { v: "14d", l: "Deploy time" },
                  ].map((s) => (
                    <div key={s.l} className="text-center">
                      <p className="font-display text-4xl md:text-5xl font-bold text-accent">
                        {s.v}
                      </p>
                      <p className="text-xs text-white/50 mt-2 uppercase tracking-wider">
                        {s.l}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
