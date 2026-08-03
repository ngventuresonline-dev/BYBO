import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { BYBOLogo } from "@/components/BYBOLogo";
import { systems } from "@/lib/content";

export function Footer() {
  return (
    <footer className="border-t border-line bg-panel">
      <div className="section-shell !pb-8 !pt-16">
        <div className="grid gap-12 lg:grid-cols-[1.2fr_2fr]">
          <div>
            <Link href="/" className="group inline-block">
              <BYBOLogo variant="footer" />
            </Link>
            <p className="mt-5 max-w-sm text-sm leading-6 text-fog">
              AI systems partner for growing Indian brands and businesses.
              Practical implementation, managed with measurable accountability.
            </p>
            <a
              href="mailto:hello@bybo.in"
              className="mt-6 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.12em] text-signal hover:text-cream"
            >
              hello@bybo.in <ArrowUpRight size={14} />
            </a>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
            <div>
              <p className="technical-label mb-4 text-dim">Systems</p>
              <ul className="space-y-3 text-sm text-fog">
                {systems.map((system) => (
                  <li key={system.slug}>
                    <Link
                      href={`/systems/${system.slug}`}
                      className="transition-colors hover:text-cream"
                    >
                      {system.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="technical-label mb-4 text-dim">Company</p>
              <ul className="space-y-3 text-sm text-fog">
                <li><Link href="/blueprint" className="hover:text-cream">Blueprint</Link></li>
                <li><Link href="/how-we-work" className="hover:text-cream">How we work</Link></li>
                <li><Link href="/industries" className="hover:text-cream">Industries</Link></li>
                <li><Link href="/about" className="hover:text-cream">About</Link></li>
                <li><Link href="/insights" className="hover:text-cream">Insights</Link></li>
              </ul>
            </div>
            <div>
              <p className="technical-label mb-4 text-dim">Start</p>
              <ul className="space-y-3 text-sm text-fog">
                <li><Link href="/apply" className="hover:text-cream">Apply for consultation</Link></li>
                <li>
                  <a
                    href="https://wa.me/916360079756"
                    target="_blank"
                    rel="noreferrer"
                    className="hover:text-cream"
                  >
                    WhatsApp
                  </a>
                </li>
                <li><a href="tel:+916360079756" className="hover:text-cream">+91 63600 79756</a></li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-3 border-t border-line pt-6 font-mono text-[0.62rem] uppercase tracking-[0.12em] text-dim sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 BYBO · Bengaluru</p>
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-5">
            <Link href="/privacy" className="hover:text-cream">Privacy</Link>
            <p>N&amp;G Ventures · In partnership with Bcon Club</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
