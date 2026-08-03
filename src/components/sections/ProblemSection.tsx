"use client";

import { Layers, Clock, TrendingDown } from "lucide-react";
import { FadeIn } from "../FadeIn";

const problems = [
  {
    icon: Layers,
    problem: "Too many disconnected tools",
    solution: "One unified AI stack that works together",
  },
  {
    icon: Clock,
    problem: "Manual work eating your team's time",
    solution: "AI handles the repeat tasks automatically",
  },
  {
    icon: TrendingDown,
    problem: "No clear ROI from marketing spend",
    solution: "Live dashboards and AI-generated reports",
  },
];

export function ProblemSection() {
  return (
    <section className="py-24 md:py-32 bg-charcoal">
      <div className="max-w-7xl mx-auto px-6">
        <FadeIn>
          <p className="text-teal text-sm font-medium uppercase tracking-wider mb-3">
            The Problem
          </p>
          <h2 className="font-display text-3xl md:text-5xl font-bold max-w-2xl">
            You&apos;re drowning in tools.{" "}
            <span className="text-muted">We give you one AI stack.</span>
          </h2>
        </FadeIn>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
          {problems.map((item, i) => (
            <FadeIn key={item.problem} delay={i * 0.1}>
              <div className="group bg-slate/50 border border-border rounded-2xl p-8 hover:border-teal/40 transition-all duration-300 h-full">
                <div className="w-12 h-12 rounded-xl bg-teal/10 flex items-center justify-center mb-6 group-hover:bg-teal/20 transition-colors">
                  <item.icon size={24} className="text-teal" />
                </div>
                <p className="text-surface font-medium text-lg mb-3">{item.problem}</p>
                <p className="text-muted leading-relaxed">
                  <span className="text-teal">→</span> {item.solution}
                </p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
