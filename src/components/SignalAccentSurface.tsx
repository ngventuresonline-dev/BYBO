"use client";

import { useReducedMotion } from "framer-motion";

type Variant = "band" | "card" | "soft";

type Props = {
  variant?: Variant;
  className?: string;
  children: React.ReactNode;
  as?: "div" | "section" | "aside";
};

export function SignalAccentLayers({
  tone = "solid",
}: {
  tone?: "solid" | "soft";
}) {
  const reduceMotion = useReducedMotion();
  if (reduceMotion) return null;

  return (
    <>
      <span
        className={`signal-accent-plasma signal-accent-plasma-${tone}`}
        aria-hidden
      />
      <span className="signal-accent-orb signal-accent-orb-a" aria-hidden />
      <span className="signal-accent-orb signal-accent-orb-b" aria-hidden />
      <span className="signal-accent-scan" aria-hidden />
      <span className="signal-accent-edge" aria-hidden />
    </>
  );
}

export function SignalAccentSurface({
  variant = "band",
  className = "",
  children,
  as: Tag = "div",
}: Props) {
  const tone = variant === "soft" ? "soft" : "solid";

  return (
    <Tag
      className={`signal-accent-surface signal-accent-${variant} ${className}`}
    >
      <SignalAccentLayers tone={tone} />
      <div className="signal-accent-content">{children}</div>
    </Tag>
  );
}
