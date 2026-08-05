import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { FadeIn } from "@/components/FadeIn";
import { proofOutcomes } from "@/lib/content";

export function ProofOutcomes() {
  return (
    <section className="border-b border-line bg-panel">
      <div className="section-shell py-12 sm:py-14">
        <FadeIn>
          <div className="mb-10 max-w-2xl">
            <p className="eyebrow">Operating outcomes</p>
            <h2 className="section-title mt-5">
              Measured against a baseline - not a demo.
            </h2>
            <p className="mt-4 text-sm leading-6 text-fog">
              Anonymised results from real workflow deployments. Outcomes vary by
              process, data quality, and ownership.
            </p>
          </div>
        </FadeIn>

        <div className="grid gap-4 md:grid-cols-2">
          {proofOutcomes.map((item, index) => (
            <FadeIn key={item.industry} delay={index * 0.05}>
              <article className="technical-card h-full p-6 sm:p-7">
                <p className="technical-label text-signal">{item.industry}</p>
                <p className="mt-4 font-display text-2xl font-bold tracking-[-0.04em]">
                  {item.metric}
                </p>
                <p className="mt-3 text-sm leading-6 text-fog">{item.detail}</p>
              </article>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

export function MidPageCta({
  eyebrow,
  title,
  body,
  href,
  label,
}: {
  eyebrow: string;
  title: string;
  body: string;
  href: string;
  label: string;
}) {
  return (
    <div className="mt-12 rounded-[1.4rem] border border-line bg-void/45 p-6 sm:flex sm:items-center sm:justify-between sm:gap-8 sm:p-8">
      <div>
        <p className="technical-label text-signal">{eyebrow}</p>
        <h3 className="mt-3 font-display text-2xl font-bold tracking-[-0.04em]">
          {title}
        </h3>
        <p className="mt-2 max-w-xl text-sm leading-6 text-fog">{body}</p>
      </div>
      <Link href={href} className="signal-button mt-6 w-full shrink-0 sm:mt-0 sm:w-auto">
        {label} <ArrowRight size={15} />
      </Link>
    </div>
  );
}
