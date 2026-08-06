"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";

function ScenePlaceholder() {
  return (
    <div className="flex h-full min-h-[22rem] flex-col sm:min-h-[28rem] lg:min-h-[31rem]">
      <div className="relative min-h-0 flex-1 overflow-hidden">
        <div className="absolute left-1/2 top-1/2 h-52 w-52 -translate-x-1/2 -translate-y-1/2 rounded-full border border-signal/25 bg-signal/10 shadow-[0_0_100px_rgba(176,38,255,0.16)]" />
        <div className="absolute left-1/2 top-1/2 h-80 w-80 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/10" />
      </div>
      <div className="shrink-0 px-4 pb-4 pt-3">
        <div className="h-12 rounded-2xl border border-white/8 bg-white/[0.025]" />
      </div>
    </div>
  );
}

const AICoreScene = dynamic(
  () =>
    import("@/components/AICoreScene").then((module) => module.AICoreScene),
  {
    ssr: false,
    loading: ScenePlaceholder,
  },
);

export function SpatialHeroVisual() {
  const rootRef = useRef<HTMLDivElement>(null);
  const [shouldMount, setShouldMount] = useState(false);

  useEffect(() => {
    const node = rootRef.current;
    if (!node) return;

    const mountScene = () => setShouldMount(true);

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          mountScene();
          observer.disconnect();
        }
      },
      { rootMargin: "120px 0px", threshold: 0.01 },
    );

    observer.observe(node);

    const idle = window.requestIdleCallback;
    let idleHandle: number | undefined;
    let timeoutHandle: number | undefined;

    if (idle) {
      idleHandle = idle(mountScene, { timeout: 1200 });
    } else {
      timeoutHandle = window.setTimeout(mountScene, 600);
    }

    return () => {
      observer.disconnect();
      if (idleHandle !== undefined) window.cancelIdleCallback(idleHandle);
      if (timeoutHandle !== undefined) window.clearTimeout(timeoutHandle);
    };
  }, []);

  return (
    <div ref={rootRef} className="h-full">
      {shouldMount ? <AICoreScene /> : <ScenePlaceholder />}
    </div>
  );
}
