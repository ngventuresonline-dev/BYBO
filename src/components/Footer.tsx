import Link from "next/link";
import { CONTACT } from "@/lib/site";
import { STACK } from "@/lib/dc-systems";

const columns = [
  {
    heading: "Systems",
    links: [
      ...STACK.slice(0, 3).map((entry) => ({
        href: `/systems/${entry.slug}`,
        label: entry.name,
      })),
      { href: "/systems", label: "All seven →" },
    ],
  },
  {
    heading: "Company",
    links: [
      { href: "/blueprint", label: "Blueprint" },
      { href: "/how-we-work", label: "Method" },
      { href: "/industries", label: "Industries" },
      { href: "/about", label: "About" },
      { href: "/insights", label: "Insights" },
    ],
  },
  {
    heading: "Start",
    links: [
      { href: "/apply", label: "Apply for consultation" },
      { href: `https://wa.me/${CONTACT.phoneHref.replace("+", "")}`, label: "WhatsApp" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="dc border-t" style={{ borderColor: "var(--dc-line)" }}>
      <div className="dc-pad grid gap-11 pb-8 pt-14 min-[861px]:grid-cols-[1.5fr_1fr_1fr_1fr] sm:grid-cols-2">
        <div>
          <div className="flex items-center gap-2.5">
            <span className="font-display text-[22px] font-black tracking-[-0.06em]">
              BYBO
            </span>
            <span className="block h-2 w-2 bg-signal" aria-hidden />
          </div>
          <p
            className="mt-4 max-w-[34ch] text-[15px] leading-relaxed"
            style={{ color: "rgba(236,234,228,0.5)" }}
          >
            AI systems partner for growing Indian businesses. Built, operated and
            measured — in {CONTACT.city}.
          </p>
          <p className="dc-mono mt-4 text-[13px]">
            <a href={`mailto:${CONTACT.email}`} className="text-signal">
              {CONTACT.email}
            </a>
          </p>
          <p
            className="dc-mono mt-1.5 text-[13px]"
            style={{ color: "rgba(236,234,228,0.5)" }}
          >
            <a href={`tel:${CONTACT.phoneHref}`}>{CONTACT.phone}</a>
          </p>
        </div>

        {columns.map((column) => (
          <div key={column.heading} className="grid content-start gap-[11px] text-sm">
            <p
              className="dc-label-muted mb-1"
              style={{ color: "rgba(236,234,228,0.35)" }}
            >
              {column.heading}
            </p>
            {column.links.map((link) =>
              link.href.startsWith("http") ? (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noreferrer"
                  className="transition-colors hover:text-signal"
                  style={{ color: "rgba(236,234,228,0.7)" }}
                >
                  {link.label}
                </a>
              ) : (
                <Link
                  key={link.label}
                  href={link.href}
                  className="transition-colors hover:text-signal"
                  style={{ color: "rgba(236,234,228,0.7)" }}
                >
                  {link.label}
                </Link>
              ),
            )}
          </div>
        ))}
      </div>

      <div
        className="dc-pad dc-mono flex flex-wrap items-center justify-between gap-6 border-t py-5 text-[11px] tracking-[0.08em]"
        style={{
          borderColor: "var(--dc-line)",
          color: "rgba(236,234,228,0.4)",
        }}
      >
        <span>
          © {new Date().getFullYear()} BYBO · {CONTACT.city} · {CONTACT.parent}, in
          partnership with {CONTACT.partner}
        </span>
        <Link href="/privacy" className="transition-colors hover:text-signal">
          Privacy
        </Link>
      </div>
    </footer>
  );
}
