import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { FadeIn } from "@/components/FadeIn";

const exploreLinks = [
  {
    href: "/systems",
    label: "Systems",
    title: "Explore the capability stack",
    detail: "Platforms, agents, knowledge, intelligence, and governance.",
  },
  {
    href: "/how-we-work",
    label: "How we work",
    title: "See the delivery model",
    detail: "Diagnose, build, operate, and improve—with controls built in.",
  },
  {
    href: "/blueprint",
    label: "Blueprint",
    title: "Find the first opportunity",
    detail: "Qualify whether a workflow deserves a system or a Blueprint.",
  },
  {
    href: "/industries",
    label: "Industries",
    title: "Go deeper by environment",
    detail: "Real estate, healthcare, F&B, retail, manufacturing, and more.",
  },
];

export function HomeExploreStrip() {
  return (
    <section className="border-b border-line bg-void">
      <div className="section-shell py-12 sm:py-14">
        <FadeIn>
          <div className="mb-8 max-w-2xl">
            <p className="eyebrow">Go deeper</p>
            <h2 className="section-title mt-5">
              The homepage is the front door—not the whole building.
            </h2>
            <p className="mt-4 text-sm leading-6 text-fog">
              Pick a path to explore systems, delivery, qualification, or your
              industry in full detail.
            </p>
          </div>
        </FadeIn>

        <div className="grid gap-3 sm:grid-cols-2">
          {exploreLinks.map((item, index) => (
            <FadeIn key={item.href} delay={index * 0.04}>
              <Link
                href={item.href}
                className="group flex h-full flex-col justify-between rounded-2xl border border-line bg-panel p-5 transition-colors hover:border-signal/35 sm:p-6"
              >
                <div>
                  <p className="technical-label text-signal">{item.label}</p>
                  <p className="mt-3 font-display text-xl font-bold tracking-[-0.035em]">
                    {item.title}
                  </p>
                  <p className="mt-2 text-sm leading-6 text-fog">{item.detail}</p>
                </div>
                <span className="mt-5 inline-flex items-center gap-1.5 font-mono text-[0.58rem] font-semibold uppercase tracking-[0.1em] text-signal group-hover:text-cream">
                  Open <ArrowUpRight size={12} />
                </span>
              </Link>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
