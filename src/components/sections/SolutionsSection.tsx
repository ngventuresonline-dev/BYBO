"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { FadeIn } from "../FadeIn";

const solutions = [
  {
    title: "AI Marketing",
    description: "Content, ads, and campaigns on autopilot. Your brand voice, scaled.",
    href: "/solutions/ai-marketing",
    stats: [
      { v: "20+", l: "Posts/wk" },
      { v: "3.2×", l: "Ad ROAS" },
      { v: "14d", l: "Deploy" },
    ],
  },
  {
    title: "AI Sales",
    description: "Lead qualification, outreach, CRM automation.",
    href: "/solutions/ai-marketing",
  },
  {
    title: "AI Operations",
    description: "WhatsApp agents, support, booking flows.",
    href: "/solutions/ai-marketing",
  },
  {
    title: "Analytics",
    description: "Unified dashboards and AI-generated reports.",
    href: "/solutions/ai-marketing",
  },
  {
    title: "Custom AI",
    description: "Bespoke agents for your unique workflows.",
    href: "/solutions/ai-marketing",
  },
];

export function SolutionsSection() {
  const [featured, ...rest] = solutions;

  return (
    <section className="section-pad">
      <div className="max-w-6xl mx-auto px-6">
        <FadeIn>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
            <div>
              <p className="eyebrow mb-3">What we build</p>
              <h2 className="font-display text-4xl md:text-5xl font-bold tracking-tight max-w-lg">
                Five systems. One partner.
              </h2>
            </div>
            <p className="text-muted max-w-sm leading-relaxed">
              Pick one pillar or deploy the full stack. Every system connects to
              the same AI brain.
            </p>
          </div>
        </FadeIn>

        <FadeIn delay={0.05}>
          <Link
            href={featured.href}
            className="card card-hover relative block bg-ink text-white border-ink p-8 md:p-10 mb-4 group"
          >
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8">
              <div>
                <h3 className="font-display text-2xl md:text-3xl font-bold">
                  {featured.title}
                </h3>
                <p className="mt-3 text-white/60 max-w-md leading-relaxed">
                  {featured.description}
                </p>
              </div>
              <div className="flex gap-10">
                {featured.stats!.map((s) => (
                  <div key={s.l}>
                    <p className="font-display text-3xl font-bold text-accent">{s.v}</p>
                    <p className="text-xs text-white/40 mt-1 uppercase tracking-wider">{s.l}</p>
                  </div>
                ))}
              </div>
            </div>
            <ArrowUpRight
              size={22}
              className="absolute top-8 right-8 text-white/30 group-hover:text-accent transition-colors hidden md:block"
            />
          </Link>
        </FadeIn>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {rest.map((item, i) => (
            <FadeIn key={item.title} delay={0.1 + i * 0.05}>
              <Link href={item.href} className="card card-hover block p-6 h-full group relative">
                <ArrowUpRight
                  size={18}
                  className="absolute top-5 right-5 text-dim group-hover:text-ink transition-colors"
                />
                <h3 className="font-display text-lg font-bold pr-8">{item.title}</h3>
                <p className="mt-2 text-sm text-muted leading-relaxed">{item.description}</p>
              </Link>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
