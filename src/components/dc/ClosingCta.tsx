import type { ReactNode } from "react";
import { NotchButton } from "@/components/dc/NotchButton";

type Action = { href: string; label: string };

type ClosingCtaProps = {
  title: ReactNode;
  blurb: ReactNode;
  primary?: Action;
  secondary?: Action;
};

/** Full-bleed centred closing panel over the grid field. */
export function ClosingCta({
  title,
  blurb,
  primary = { href: "/apply", label: "Apply for a consultation" },
  secondary,
}: ClosingCtaProps) {
  return (
    <section className="dc dc-grid-field dc-divide relative overflow-hidden px-[clamp(20px,4vw,44px)] py-[clamp(64px,8vw,104px)] text-center">
      <div className="relative">
        <h2 className="font-display mx-auto max-w-[17ch] text-[clamp(38px,6.4vw,104px)] font-extrabold leading-[0.88] tracking-[-0.06em] text-balance">
          {title}
        </h2>
        <p
          className="mx-auto mt-6 max-w-[54ch] text-[19px] leading-[1.45]"
          style={{ color: "var(--dc-muted)" }}
        >
          {blurb}
        </p>
        <div className="mt-9 flex flex-wrap justify-center gap-2.5">
          <NotchButton href={primary.href}>{primary.label}</NotchButton>
          {secondary ? (
            <NotchButton href={secondary.href} variant="ghost">
              {secondary.label}
            </NotchButton>
          ) : null}
        </div>
      </div>
    </section>
  );
}
