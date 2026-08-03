"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

export function Hero() {
  return (
    <section className="pt-28 pb-16 md:pt-36 md:pb-24">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.21, 0.47, 0.32, 0.98] }}
          >
            <p className="eyebrow mb-6">Bring Your Business Online</p>
            <h1 className="font-display text-[2.75rem] sm:text-6xl lg:text-[4.25rem] font-bold leading-[1.02] tracking-tight">
              AI that runs your{" "}
              <span className="relative whitespace-nowrap">
                growth
                <span className="absolute -bottom-1 left-0 w-full h-3 bg-accent/20 -z-10 rounded-sm" />
              </span>
              , not just your ads.
            </h1>
            <p className="mt-6 text-lg text-muted leading-relaxed max-w-md">
              We build AI systems for marketing, sales, and operations — then
              run them for you. One partner. One stack. Real outcomes.
            </p>
            <div className="mt-10 flex flex-wrap gap-3">
              <Link href="/#contact" className="btn-primary">
                Book free AI audit
                <ArrowUpRight size={18} />
              </Link>
              <Link href="/solutions/ai-marketing" className="btn-secondary">
                See what we build
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.21, 0.47, 0.32, 0.98] }}
            className="relative"
          >
            <div className="card p-5 md:p-6 space-y-3">
              <div className="flex items-center justify-between pb-3 border-b border-border">
                <div>
                  <p className="text-xs text-dim uppercase tracking-wider">BYBO Dashboard</p>
                  <p className="font-display font-semibold mt-0.5">Acme D2C · Live</p>
                </div>
                <span className="flex items-center gap-1.5 text-xs font-medium text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  All systems active
                </span>
              </div>

              <div className="grid grid-cols-3 gap-3">
                {[
                  { label: "Leads today", value: "47", change: "+23%" },
                  { label: "Response time", value: "12s", change: "-68%" },
                  { label: "Content live", value: "18", change: "this week" },
                ].map((stat) => (
                  <div key={stat.label} className="bg-bg rounded-xl p-3 border border-border">
                    <p className="text-[10px] text-dim uppercase tracking-wide">{stat.label}</p>
                    <p className="font-display text-2xl font-bold mt-1">{stat.value}</p>
                    <p className="text-[10px] text-accent font-medium mt-0.5">{stat.change}</p>
                  </div>
                ))}
              </div>

              <div className="bg-bg rounded-xl p-4 border border-border">
                <p className="text-xs text-dim mb-3">Active AI agents</p>
                <div className="space-y-2">
                  {[
                    "WhatsApp qualifier — 12 conversations",
                    "Content engine — 3 posts scheduled",
                    "Meta ads — optimizing creative B",
                  ].map((item) => (
                    <div key={item} className="flex items-center gap-2 text-sm">
                      <span className="w-1 h-1 rounded-full bg-ink shrink-0" />
                      <span className="text-muted">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="absolute -z-10 -bottom-4 -right-4 w-full h-full rounded-[20px] bg-accent/10 border border-accent/20" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
