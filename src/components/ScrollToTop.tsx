"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

function scrollToTop() {
  window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  document.documentElement.scrollTop = 0;
  document.body.scrollTop = 0;
}

export function ScrollToTop() {
  const pathname = usePathname();

  useEffect(() => {
    if ("scrollRestoration" in history) {
      history.scrollRestoration = "manual";
    }
  }, []);

  useEffect(() => {
    scrollToTop();

    // Run again after paint so we win over Next.js scroll/focus and menu unlock.
    const frame = requestAnimationFrame(() => {
      requestAnimationFrame(scrollToTop);
    });

    return () => cancelAnimationFrame(frame);
  }, [pathname]);

  return null;
}
