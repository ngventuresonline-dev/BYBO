"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowUpRight, Menu } from "lucide-react";
import { motion } from "framer-motion";
import { MobileDossierMenu } from "@/components/MobileDossierMenu";
import { BYBOLogo } from "@/components/BYBOLogo";

const navLinks = [
  { href: "/systems", label: "Systems" },
  { href: "/blueprint", label: "Blueprint" },
  { href: "/how-we-work", label: "How we work" },
  { href: "/industries", label: "Industries" },
  { href: "/insights", label: "Insights" },
  { href: "/about", label: "About" },
];

function isActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const skipScrollRestoreRef = useRef(false);
  const pathname = usePathname();

  const closeMenu = (options?: { resetScroll?: boolean }) => {
    if (options?.resetScroll) {
      skipScrollRestoreRef.current = true;
    }
    setMobileOpen(false);
  };

  useEffect(() => {
    skipScrollRestoreRef.current = true;
    setMobileOpen(false);

    document.body.style.position = "";
    document.body.style.top = "";
    document.body.style.left = "";
    document.body.style.right = "";
    document.body.style.overflow = "";
  }, [pathname]);

  useEffect(() => {
    if (!mobileOpen) return;

    const scrollY = window.scrollY;
    document.body.style.position = "fixed";
    document.body.style.top = `-${scrollY}px`;
    document.body.style.left = "0";
    document.body.style.right = "0";
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.left = "";
      document.body.style.right = "";
      document.body.style.overflow = "";

      if (skipScrollRestoreRef.current) {
        skipScrollRestoreRef.current = false;
        window.scrollTo({ top: 0, left: 0, behavior: "auto" });
      } else {
        window.scrollTo({ top: scrollY, left: 0, behavior: "auto" });
      }
    };
  }, [mobileOpen]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <header className="fixed inset-x-0 top-2 z-50 sm:top-3">
        <div className="page-shell">
          <div
            className={`site-nav flex min-h-[3.85rem] items-center justify-between gap-4 px-3 sm:min-h-[4.25rem] sm:px-4 ${
              scrolled ? "site-nav--scrolled" : ""
            }`}
          >
            <Link href="/" className="group relative z-[1] py-1" aria-label="BYBO home">
              <BYBOLogo variant="nav" />
            </Link>

            <nav
              className="relative z-[1] hidden items-center gap-3 lg:flex"
              aria-label="Primary navigation"
            >
              <div className="site-nav-track">
                {navLinks.map((link) => {
                  const active = isActive(pathname, link.href);

                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      className={`site-nav-link ${active ? "site-nav-link--active" : ""}`}
                    >
                      {active && (
                        <motion.span
                          layoutId="nav-active-pill"
                          className="absolute inset-0 rounded-full border border-white/10 bg-white/[0.07] shadow-[0_0_24px_rgba(176,38,255,0.14)]"
                          transition={{
                            type: "spring",
                            stiffness: 420,
                            damping: 34,
                          }}
                        />
                      )}
                      <span className="relative z-[1]">{link.label}</span>
                    </Link>
                  );
                })}
              </div>

              <Link
                href="/apply"
                className="site-nav-cta signal-button ml-1 !min-h-[2.55rem] !rounded-full !px-5 !py-0"
              >
                Apply
                <ArrowUpRight size={14} aria-hidden="true" />
              </Link>
            </nav>

            <button
              type="button"
              className="site-nav-menu-btn relative z-[1] inline-flex min-h-11 min-w-11 items-center justify-center lg:hidden"
              onClick={() => setMobileOpen(true)}
              aria-label="Open menu"
              aria-expanded={mobileOpen}
            >
              <Menu size={20} />
            </button>
          </div>
        </div>
      </header>

      <MobileDossierMenu open={mobileOpen} onClose={closeMenu} />
    </>
  );
}
