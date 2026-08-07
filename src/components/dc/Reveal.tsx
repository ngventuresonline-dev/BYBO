"use client";

import { useEffect, useRef } from "react";
import type { ElementType, ReactNode } from "react";

type RevealProps = {
  children: ReactNode;
  className?: string;
  as?: ElementType;
};

/**
 * Fades and lifts its child into view once, on first intersection.
 *
 * Mirrors the prototype's `data-reveal` behaviour, with one correction: the
 * prototype only hid elements already below the fold, so anything above it
 * stayed visible. We rely on `.dc-reveal` for the hidden state and mark
 * `data-seen` to release it — and if IntersectionObserver is unavailable, the
 * element is released immediately rather than left invisible.
 */
export function Reveal({ children, className = "", as: Tag = "div" }: RevealProps) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (typeof IntersectionObserver === "undefined") {
      el.setAttribute("data-seen", "1");
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.setAttribute("data-seen", "1");
          io.unobserve(entry.target);
        });
      },
      { rootMargin: "0px 0px -8% 0px" },
    );

    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <Tag ref={ref} className={`dc-reveal ${className}`.trim()}>
      {children}
    </Tag>
  );
}
