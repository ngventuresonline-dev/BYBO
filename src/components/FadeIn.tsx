"use client";

import { ReactNode, useEffect, useRef, useState } from "react";

interface FadeInProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "down" | "left" | "right";
  immediate?: boolean;
}

export function FadeIn({
  children,
  className = "",
  delay = 0,
  direction = "up",
  immediate = false,
}: FadeInProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(immediate);

  useEffect(() => {
    if (immediate) return;

    const node = ref.current;
    if (!node) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: "-40px 0px", threshold: 0.08 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [immediate]);

  const directionClass = {
    up: "fade-in--up",
    down: "fade-in--down",
    left: "fade-in--left",
    right: "fade-in--right",
  }[direction];

  return (
    <div
      ref={ref}
      className={`fade-in ${directionClass} ${visible ? "fade-in--visible" : ""} ${className}`}
      style={{ transitionDelay: `${delay}s` }}
    >
      {children}
    </div>
  );
}
