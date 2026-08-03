"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Check, X } from "lucide-react";

export type SolutionBrief = {
  title: string;
  subtitle: string;
  visualSteps: string[];
  howWeBuild: string[];
  businessImpact: { label: string; detail: string }[];
  deliverables: string[];
  relatedSystemSlug: string;
  relatedSystemName: string;
};

type Props = {
  open: boolean;
  onClose: () => void;
  brief: SolutionBrief;
};

export function SolutionBriefModal({ open, onClose, brief }: Props) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[80] flex items-end justify-center bg-black/75 p-0 backdrop-blur-md sm:items-center sm:p-6"
          onClick={onClose}
          role="presentation"
        >
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
            className="relative max-h-[92svh] w-full max-w-xl overflow-y-auto rounded-t-[1.4rem] border border-white/10 bg-[#0c0c0d] shadow-[0_40px_120px_rgba(0,0,0,0.6)] sm:rounded-[1.4rem]"
            onClick={(event) => event.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-labelledby="solution-brief-title"
          >
            <div className="relative overflow-hidden border-b border-white/10 px-6 py-6 sm:px-7">
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_80%_0%,rgba(176,38,255,0.18),transparent_45%)]" />
              <div className="relative flex items-start justify-between gap-4">
                <div>
                  <p className="font-mono text-[0.56rem] uppercase tracking-[0.14em] text-signal">
                    Your business solution
                  </p>
                  <h2
                    id="solution-brief-title"
                    className="mt-2 font-display text-xl font-bold leading-tight tracking-[-0.035em] text-cream sm:text-2xl"
                  >
                    {brief.title}
                  </h2>
                  <p className="mt-3 text-sm leading-6 text-fog">{brief.subtitle}</p>
                </div>
                <button
                  type="button"
                  onClick={onClose}
                  className="inline-flex min-h-10 min-w-10 shrink-0 items-center justify-center rounded-full border border-white/10 text-cream"
                  aria-label="Close solution brief"
                >
                  <X size={16} />
                </button>
              </div>

              <div className="relative mt-6 grid grid-cols-3 gap-2">
                {brief.visualSteps.map((step, index) => (
                  <div key={step} className="relative text-center">
                    <div className="mx-auto flex h-8 w-8 items-center justify-center rounded-full border border-signal/40 bg-signal/10 font-mono text-[0.58rem] text-signal">
                      0{index + 1}
                    </div>
                    <p className="mt-2 text-[0.62rem] leading-4 text-white/55">{step}</p>
                    {index < brief.visualSteps.length - 1 && (
                      <span className="absolute left-[calc(50%+1rem)] top-4 hidden h-px w-[calc(100%-2rem)] bg-signal/25 sm:block" />
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-6 px-6 py-6 sm:px-7">
              <div>
                <p className="technical-label text-dim">What BYBO builds</p>
                <ul className="mt-3 space-y-2.5">
                  {brief.howWeBuild.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-2.5 text-sm leading-5 text-fog"
                    >
                      <Check size={13} className="mt-0.5 shrink-0 text-signal" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="grid gap-2 sm:grid-cols-3">
                {brief.businessImpact.map((item) => (
                  <div
                    key={item.label}
                    className="rounded-lg border border-white/8 bg-white/[0.03] p-3"
                  >
                    <p className="font-display text-xs font-bold text-cream">
                      {item.label}
                    </p>
                    <p className="mt-1.5 text-[0.68rem] leading-5 text-fog">
                      {item.detail}
                    </p>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap gap-1.5">
                {brief.deliverables.map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-line px-2.5 py-1 font-mono text-[0.5rem] uppercase tracking-[0.1em] text-dim"
                  >
                    {item}
                  </span>
                ))}
              </div>

              <div className="flex flex-col gap-2 border-t border-white/10 pt-5 sm:flex-row">
                <Link
                  href={`/systems/${brief.relatedSystemSlug}`}
                  className="signal-button flex-1 justify-center !min-h-11"
                  onClick={onClose}
                >
                  Explore system <ArrowRight size={13} />
                </Link>
                <Link
                  href={`/apply?system=${brief.relatedSystemSlug}`}
                  className="ghost-button flex-1 justify-center !min-h-11"
                  onClick={onClose}
                >
                  Discuss for your business
                </Link>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
