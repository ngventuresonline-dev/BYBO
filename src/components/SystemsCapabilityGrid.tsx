"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { systems } from "@/lib/content";

export function SystemsCapabilityGrid() {
  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {systems.map((system) => {
        const Icon = system.icon;
        return (
          <Link
            key={system.slug}
            href={`/systems/${system.slug}`}
            className="group relative overflow-hidden rounded-2xl border border-line bg-panel p-6 transition-all duration-300 hover:-translate-y-1 hover:border-signal/40 hover:shadow-[0_24px_60px_rgba(0,0,0,0.25)]"
          >
            <div className="flex items-start justify-between">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-line bg-void text-signal">
                <Icon size={18} />
              </span>
              <span className="font-mono text-[0.56rem] text-signal">
                /{system.index}
              </span>
            </div>
            <h3 className="mt-8 font-display text-xl font-bold tracking-[-0.035em]">
              {system.name}
            </h3>
            <p className="mt-3 text-sm leading-6 text-fog">{system.short}</p>
            <span className="mt-6 inline-flex items-center gap-2 font-mono text-[0.58rem] uppercase tracking-[0.1em] text-dim transition-colors group-hover:text-signal">
              Full capability brief <ArrowUpRight size={12} />
            </span>
          </Link>
        );
      })}
    </div>
  );
}
