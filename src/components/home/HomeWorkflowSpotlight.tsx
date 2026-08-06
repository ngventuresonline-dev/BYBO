import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { LazyInteractiveSystemDemo } from "@/components/home/HomeLazySections";

export function HomeWorkflowSpotlight() {
  return (
    <section className="home-workflow-spotlight home-section border-b border-surface-line bg-surface text-surface-ink">
      <div className="section-shell !py-10 sm:!py-14">
        <div className="mb-6 flex flex-col justify-between gap-4 sm:mb-8 sm:flex-row sm:items-end">
          <div className="max-w-lg">
            <p className="eyebrow text-surface-muted">Try it now</p>
            <h2 className="section-title mt-4 text-surface-ink">
              Watch a system handle a real scenario.
            </h2>
          </div>
          <Link
            href="/systems"
            className="inline-flex min-h-11 items-center gap-2 font-mono text-[0.62rem] font-semibold uppercase tracking-[0.12em] text-surface-ink transition-colors hover:text-signal"
          >
            All systems <ArrowUpRight size={13} />
          </Link>
        </div>

        <LazyInteractiveSystemDemo />
      </div>
    </section>
  );
}
