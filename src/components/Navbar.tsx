"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { NotchButton } from "@/components/dc/NotchButton";
import { CONTACT } from "@/lib/site";

const navLinks = [
  { href: "/systems", label: "Systems" },
  { href: "/how-we-work", label: "Method" },
  { href: "/industries", label: "Industries" },
  { href: "/blueprint", label: "Blueprint" },
  { href: "/about", label: "About" },
];

const menuLinks = [
  {
    href: "/systems",
    index: "/01",
    title: "What we build",
    blurb: "Seven systems, ordered by payback",
  },
  {
    href: "/how-we-work",
    index: "/02",
    title: "How we work",
    blurb: "Diagnose · Deploy · Operate · Expand",
  },
  {
    href: "/industries",
    index: "/03",
    title: "Industries",
    blurb: "Find the row that describes you",
  },
  {
    href: "/blueprint",
    index: "/04",
    title: "Blueprint",
    blurb: "The paid front door · credited against the build",
    feature: true,
  },
  {
    href: "/about",
    index: "/05",
    title: "About",
    blurb: "A systems firm, not an agency",
  },
  {
    href: "/insights",
    index: "/06",
    title: "Insights",
    blurb: "Written for the person who signs",
  },
];

function isActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function Navbar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const [lastPath, setLastPath] = useState(pathname);

  // Close the menu when the route changes, including on browser back.
  // Adjusting during render rather than in an effect avoids a second pass.
  if (pathname !== lastPath) {
    setLastPath(pathname);
    setOpen(false);
  }

  useEffect(() => {
    if (!open) return;

    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);

    return () => {
      document.body.style.overflow = overflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <>
      <header
        className="dc sticky top-0 z-40 flex h-[58px] items-center justify-between gap-4 px-5 sm:px-7"
        style={{
          background:
            "linear-gradient(180deg, rgba(10,10,12,0.66), rgba(10,10,12,0.38))",
          backdropFilter: "blur(26px) saturate(180%)",
          WebkitBackdropFilter: "blur(26px) saturate(180%)",
          boxShadow:
            "inset 0 1px 0 rgba(236,234,228,0.1), 0 1px 0 rgba(236,234,228,0.14), 0 30px 60px -40px rgba(0,0,0,1)",
          animation: "dc-menuin 520ms cubic-bezier(0.16,1,0.3,1) both",
        }}
      >
        <Link href="/" className="flex items-center gap-2.5" aria-label="BYBO home">
          <span className="font-display text-[20px] font-black tracking-[-0.06em] text-cream">
            BYBO
          </span>
          <span
            className="block h-2 w-2 bg-signal"
            style={{ animation: "dc-blip 2.6s ease-in-out infinite" }}
            aria-hidden
          />
        </Link>

        <nav
          className="hidden gap-[30px] min-[861px]:flex"
          aria-label="Primary navigation"
        >
          {navLinks.map((link) => {
            const active = isActive(pathname, link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={active ? "page" : undefined}
                className="dc-mono text-[11px] uppercase tracking-[0.14em] transition-colors hover:text-signal"
                style={{
                  color: active ? "var(--color-signal)" : "rgba(236,234,228,0.62)",
                }}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-3">
          <Link
            href="/apply"
            className="dc-mono border px-4 py-2 text-[11px] uppercase tracking-[0.14em] text-cream transition-colors hover:border-signal hover:bg-signal hover:text-void"
            style={{ borderColor: "rgba(236,234,228,0.35)" }}
          >
            Apply →
          </Link>

          <button
            type="button"
            onClick={() => setOpen(true)}
            aria-label="Open menu"
            aria-expanded={open}
            className="flex items-center gap-2 border px-3 py-2.5 transition-colors hover:border-signal min-[861px]:hidden"
            style={{ borderColor: "rgba(236,234,228,0.35)" }}
          >
            <span className="grid gap-[3px]" aria-hidden>
              <span className="block h-[1.5px] w-4 bg-cream" />
              <span className="block h-[1.5px] w-4 bg-cream" />
              <span className="block h-[1.5px] w-2.5 bg-signal" />
            </span>
            <span
              className="dc-mono text-[10px] uppercase tracking-[0.16em]"
              style={{ color: "rgba(236,234,228,0.7)" }}
            >
              Menu
            </span>
          </button>
        </div>
      </header>

      {open ? (
        <div
          className="dc dc-grid-field fixed inset-0 z-90 flex flex-col overflow-y-auto"
          style={{ animation: "dc-veil 420ms cubic-bezier(0.16,1,0.3,1)" }}
          role="dialog"
          aria-modal="true"
          aria-label="Site menu"
        >
          <div
            className="pointer-events-none absolute inset-x-0 top-0 h-20"
            style={{
              background:
                "linear-gradient(180deg, transparent, rgba(176,38,255,0.14), transparent)",
              animation: "dc-sweep 9s linear infinite",
            }}
            aria-hidden
          />

          <div
            className="dc-pad relative flex h-[58px] flex-none items-center justify-between border-b"
            style={{ borderColor: "var(--dc-line)" }}
          >
            <div className="flex items-center gap-2.5">
              <span className="font-display text-[20px] font-black tracking-[-0.06em]">
                BYBO
              </span>
              <span
                className="block h-2 w-2 bg-signal"
                style={{ animation: "dc-blip 2.6s ease-in-out infinite" }}
                aria-hidden
              />
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="dc-mono border px-3.5 py-2.5 text-[10px] uppercase tracking-[0.16em] text-cream transition-colors hover:border-signal hover:bg-signal hover:text-void"
              style={{ borderColor: "rgba(236,234,228,0.35)" }}
            >
              Close ✕
            </button>
          </div>

          <div className="relative flex-1 pt-6">
            <p className="dc-pad dc-label-muted pb-3.5" style={{ letterSpacing: "0.2em" }}>
              Navigate
            </p>

            {menuLinks.map((link, i) => (
              <Link
                key={link.href}
                href={link.href}
                className="dc-pad grid grid-cols-[44px_1fr] items-baseline gap-3.5 border-t py-4 transition-colors hover:bg-[rgba(176,38,255,0.1)]"
                style={{
                  borderColor: "rgba(236,234,228,0.12)",
                  background: link.feature ? "rgba(176,38,255,0.07)" : undefined,
                  borderBottomWidth: i === menuLinks.length - 1 ? 1 : undefined,
                  animation: `dc-menuin 420ms cubic-bezier(0.16,1,0.3,1) ${40 + i * 50}ms both`,
                }}
              >
                <span className="dc-mono text-[11px] text-signal">{link.index}</span>
                <span className="block">
                  <span
                    className="font-display block text-[clamp(28px,8vw,40px)] font-extrabold leading-none tracking-[-0.05em]"
                    style={{ color: link.feature ? "var(--color-signal)" : undefined }}
                  >
                    {link.title}
                  </span>
                  <span
                    className="mt-1.5 block text-sm"
                    style={{
                      color: link.feature
                        ? "rgba(236,234,228,0.6)"
                        : "rgba(236,234,228,0.5)",
                    }}
                  >
                    {link.blurb}
                  </span>
                </span>
              </Link>
            ))}

            <div
              className="dc-pad pb-9 pt-7"
              style={{
                animation: "dc-menuin 420ms cubic-bezier(0.16,1,0.3,1) 340ms both",
              }}
            >
              <NotchButton href="/apply" className="dc-btn--block">
                Apply for a consultation
              </NotchButton>

              <div
                className="dc-mono mt-5 flex flex-wrap justify-between gap-4 text-[11px]"
                style={{ color: "rgba(236,234,228,0.45)" }}
              >
                <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>
                <a href={`tel:${CONTACT.phoneHref}`}>{CONTACT.phone}</a>
              </div>

              <div
                className="dc-mono mt-4 flex items-center gap-2.5 border-t pt-4 text-[10px] uppercase tracking-[0.14em]"
                style={{
                  borderColor: "rgba(236,234,228,0.12)",
                  color: "rgba(236,234,228,0.35)",
                }}
              >
                <span
                  className="block h-1.5 w-1.5"
                  style={{
                    background: "var(--color-success)",
                    animation: "dc-blip 2.2s ease-in-out infinite",
                  }}
                  aria-hidden
                />
                <span>Systems running · Bengaluru</span>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
