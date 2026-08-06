import Link from "next/link";
import { ArrowRight } from "lucide-react";

type PageClosingCtaProps = {
  label?: string;
  title: string;
  href: string;
  button: string;
};

export function PageClosingCta({
  label = "Next step",
  title,
  href,
  button,
}: PageClosingCtaProps) {
  return (
    <section className="section-shell !py-14 sm:!py-16">
      <div className="page-closing-cta">
        <div>
          <p className="technical-label text-signal">{label}</p>
          <p className="mt-3 max-w-xl font-display text-2xl font-extrabold tracking-[-0.045em] sm:text-3xl">
            {title}
          </p>
        </div>
        <Link href={href} className="signal-button shrink-0">
          {button} <ArrowRight size={15} />
        </Link>
      </div>
    </section>
  );
}
