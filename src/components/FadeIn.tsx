"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

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
  const directions = {
    up: { y: 24, x: 0 },
    down: { y: -24, x: 0 },
    left: { x: 24, y: 0 },
    right: { x: -24, y: 0 },
  };

  const animationProps = immediate
    ? {
        initial: { opacity: 0, ...directions[direction] },
        animate: { opacity: 1, x: 0, y: 0 },
        transition: { duration: 0.6, delay, ease: [0.21, 0.47, 0.32, 0.98] as const },
      }
    : {
        initial: { opacity: 0, ...directions[direction] },
        whileInView: { opacity: 1, x: 0, y: 0 },
        viewport: { once: true, margin: "-80px" },
        transition: { duration: 0.6, delay, ease: [0.21, 0.47, 0.32, 0.98] as const },
      };

  return (
    <motion.div {...animationProps} className={className}>
      {children}
    </motion.div>
  );
}
