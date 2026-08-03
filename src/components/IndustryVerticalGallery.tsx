"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Check } from "lucide-react";
import { FadeIn } from "@/components/FadeIn";
import { industrySolutions } from "@/lib/content";

export function IndustryVerticalGallery() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
      {industrySolutions.map((industry, index) => (
        <FadeIn key={industry.slug} delay={index * 0.04}>
          <article className="group relative flex h-full flex-col overflow-hidden border border-line bg-panel transition-colors hover:border-signal/35">
            <div className="relative min-h-[12rem] overflow-hidden">
              <Image
                src={industry.image}
                alt={`${industry.name} operating environment`}
                fill
                sizes="(min-width: 1280px) 33vw, (min-width: 640px) 50vw, 100vw"
                className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <span className="absolute left-4 top-4 rounded-full border border-white/15 bg-black/45 px-2.5 py-1 font-mono text-[0.52rem] uppercase tracking-[0.12em] text-white/70">
                0{index + 1}
              </span>
            </div>

            <div className="flex flex-1 flex-col p-5 sm:p-6">
              <p className="font-mono text-[0.52rem] uppercase tracking-[0.12em] text-signal">
                {industry.tagline}
              </p>
              <h3 className="mt-2 font-display text-xl font-bold tracking-[-0.035em]">
                {industry.name}
              </h3>
              <p className="mt-3 flex-1 text-sm leading-6 text-fog">
                {industry.problem}
              </p>

              <ul className="mt-5 space-y-2 border-t border-line pt-4">
                {industry.outcomes.slice(0, 2).map((outcome) => (
                  <li
                    key={outcome}
                    className="flex items-start gap-2 text-xs leading-5 text-fog"
                  >
                    <Check size={12} className="mt-0.5 shrink-0 text-signal" />
                    {outcome}
                  </li>
                ))}
              </ul>

              <Link
                href={`/apply?industry=${industry.slug}`}
                className="mt-5 inline-flex items-center gap-1.5 font-mono text-[0.58rem] font-semibold uppercase tracking-[0.1em] text-signal transition-colors hover:text-cream"
              >
                Discuss for your business <ArrowUpRight size={12} />
              </Link>
            </div>
          </article>
        </FadeIn>
      ))}
    </div>
  );
}
