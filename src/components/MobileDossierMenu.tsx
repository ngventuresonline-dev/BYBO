"use client";

import { useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowUpRight, X } from "lucide-react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { BYBOLogo } from "@/components/BYBOLogo";

const navLinks = [
  { href: "/systems", label: "Systems", note: "Capability catalogue" },
  { href: "/blueprint", label: "Blueprint", note: "7–10 day diagnostic" },
  { href: "/how-we-work", label: "How we work", note: "Diagnose → operate" },
  { href: "/industries", label: "Industries", note: "Sector context" },
  { href: "/insights", label: "Insights", note: "Operating notes" },
  { href: "/about", label: "About", note: "Who we are" },
];

function isActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

type Props = {
  open: boolean;
  onClose: (options?: { resetScroll?: boolean }) => void;
};

export function MobileDossierMenu({ open, onClose }: Props) {
  const pathname = usePathname();
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, onClose]);

  const spring = reduceMotion
    ? { duration: 0.2 }
    : { type: "spring" as const, damping: 34, stiffness: 320 };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label="Navigation dossier"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="dossier-overlay fixed inset-0 z-[60] lg:hidden"
        >
          <button
            type="button"
            aria-label="Close menu"
            className="absolute inset-0 cursor-default"
            onClick={() => onClose()}
          />

          <div className="dossier-stage pointer-events-none absolute inset-x-0 bottom-0 flex justify-center px-3 pb-5 pt-16 sm:px-5 sm:pb-8">
            <div className="relative w-full max-w-md pointer-events-auto">
              {[2, 1].map((layer) => (
                <motion.div
                  key={layer}
                  custom={layer}
                  initial={
                    reduceMotion
                      ? { opacity: 0 }
                      : { y: "110%", rotate: layer === 1 ? 2.5 : -2, opacity: 0 }
                  }
                  animate={
                    reduceMotion
                      ? { opacity: 0.35 }
                      : {
                          y: layer === 1 ? -10 : -20,
                          rotate: layer === 1 ? 1.8 : -1.4,
                          opacity: 1,
                        }
                  }
                  exit={
                    reduceMotion
                      ? { opacity: 0 }
                      : { y: "110%", rotate: 0, opacity: 0 }
                  }
                  transition={{
                    ...spring,
                    delay: reduceMotion ? 0 : layer * 0.05,
                  }}
                  className={`dossier-sheet dossier-sheet--ghost dossier-sheet--${layer}`}
                  aria-hidden="true"
                />
              ))}

              <motion.div
                initial={
                  reduceMotion ? { opacity: 0, y: 24 } : { y: "108%", rotate: 0, opacity: 0 }
                }
                animate={{ y: 0, rotate: 0, opacity: 1 }}
                exit={reduceMotion ? { opacity: 0, y: 24 } : { y: "108%", opacity: 0 }}
                transition={{ ...spring, delay: reduceMotion ? 0 : 0.08 }}
                className="dossier-panel"
              >
                <div className="dossier-panel__tab" aria-hidden="true">
                  <span>Navigation</span>
                </div>

                <div className="dossier-panel__header">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <BYBOLogo variant="nav" className="dossier-logo" />
                      <p className="dossier-meta mt-3">
                        Ref · BYBO-NAV · {new Date().getFullYear()}
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => onClose()}
                      aria-label="Close dossier"
                      className="dossier-close"
                    >
                      <X size={18} />
                    </button>
                  </div>
                  <div className="dossier-stamp" aria-hidden="true">
                    Operating file
                  </div>
                </div>

                <motion.nav
                  initial="closed"
                  animate="open"
                  exit="closed"
                  variants={{
                    closed: {},
                    open: {
                      transition: {
                        staggerChildren: reduceMotion ? 0 : 0.045,
                        delayChildren: reduceMotion ? 0 : 0.18,
                      },
                    },
                  }}
                  className="dossier-links"
                  aria-label="Mobile navigation"
                >
                  {navLinks.map((link, index) => {
                    const active = isActive(pathname, link.href);

                    return (
                      <motion.div
                        key={link.href}
                        variants={{
                          closed: { opacity: 0, x: reduceMotion ? 0 : -12 },
                          open: { opacity: 1, x: 0 },
                        }}
                        transition={spring}
                      >
                        <Link
                          href={link.href}
                          onClick={() => onClose({ resetScroll: true })}
                          className={`dossier-link ${active ? "dossier-link--active" : ""}`}
                        >
                          <span className="dossier-link__index">
                            {String(index + 1).padStart(2, "0")}
                          </span>
                          <span className="min-w-0 flex-1">
                            <span className="dossier-link__title">{link.label}</span>
                            <span className="dossier-link__note">{link.note}</span>
                          </span>
                          <ArrowUpRight
                            size={16}
                            className={`shrink-0 ${active ? "text-signal" : "text-surface-muted/70"}`}
                          />
                        </Link>
                      </motion.div>
                    );
                  })}
                </motion.nav>

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ ...spring, delay: reduceMotion ? 0 : 0.42 }}
                  className="dossier-panel__footer"
                >
                  <Link
                    href="/apply"
                    onClick={() => onClose({ resetScroll: true })}
                    className="site-nav-cta signal-button w-full"
                  >
                    Apply for consultation
                    <ArrowUpRight size={15} />
                  </Link>
                  <p className="dossier-footer-note">
                    Tap outside to close · Start with the workflow, not a feature list
                  </p>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
