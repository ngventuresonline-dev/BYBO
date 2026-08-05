import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { FadeIn } from "@/components/FadeIn";

export function HomeFinalCta() {
  return (
    <section className="final-cta-section border-t border-line">
      <div className="page-shell py-10 sm:py-14">
        <FadeIn>
          <div className="final-cta-card">
            <div className="final-cta-card__glow" aria-hidden="true" />

            <div className="final-cta-card__inner">
              <div className="final-cta-card__copy">
                <p className="final-cta-card__eyebrow">The right first move</p>
                <h2 className="final-cta-card__title">
                  Tell us where the business loses time.
                </h2>
                <p className="final-cta-card__body">
                  We&apos;ll decide together whether it deserves an AI system, a
                  simpler process fix, or no project at all.
                </p>
              </div>

              <Link href="/apply" className="final-cta-card__button">
                Apply for consultation
                <ArrowUpRight size={15} className="text-signal" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
