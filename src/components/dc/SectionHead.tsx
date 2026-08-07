import type { ReactNode } from "react";

type SectionHeadProps = {
  /** Small mono label on the left, e.g. "Bucket A" or "Fig. 1 — One file". */
  label: string;
  /** Optional heading set inline with the label. */
  title?: ReactNode;
  /** Right-aligned mono note after the hairline, e.g. "Rev. 04 · median 40s". */
  note?: ReactNode;
  className?: string;
};

/**
 * The recurring band of: mono label · heading · hairline rule · mono note.
 * Used to head the industry buckets and the technical figures.
 */
export function SectionHead({ label, title, note, className = "" }: SectionHeadProps) {
  return (
    <div
      className={`flex flex-wrap items-baseline gap-x-5 gap-y-2 ${className}`.trim()}
    >
      <span className="dc-label" style={{ fontSize: 11, letterSpacing: "0.18em" }}>
        {label}
      </span>
      {title ? (
        <h2 className="text-[clamp(22px,2.4vw,30px)] font-extrabold tracking-[-0.045em]">
          {title}
        </h2>
      ) : null}
      <span
        className="hidden h-px min-w-8 flex-1 sm:block"
        style={{ background: "var(--dc-line)" }}
        aria-hidden
      />
      {note ? (
        <span className="dc-mono text-[11px]" style={{ color: "var(--dc-faint)" }}>
          {note}
        </span>
      ) : null}
    </div>
  );
}
