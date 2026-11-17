"use client";
import { ReactNode, useEffect, useRef, useState } from "react";

const PEEK = 92; // px of the sheet left showing when collapsed

/**
 * Bottom sheet over the map: scrolls when its content is taller than the screen,
 * and drags (or taps) down to a small peek so the map can be seen, then back up.
 * `resetKey` re-opens it when the screen changes (e.g. a new ride step).
 */
export function BottomSheet({ children, resetKey }: { children: ReactNode; resetKey?: string }) {
  const [small, setSmall] = useState(false);
  const [drag, setDrag] = useState(0); // live finger offset while dragging
  const start = useRef<number | null>(null);
  const moved = useRef(false);

  useEffect(() => { setSmall(false); setDrag(0); }, [resetKey]);

  function down(e: React.PointerEvent) {
    start.current = e.clientY;
    moved.current = false;
    (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
  }
  function move(e: React.PointerEvent) {
    if (start.current === null) return;
    const dy = e.clientY - start.current;
    if (Math.abs(dy) > 4) moved.current = true;
    setDrag(small ? Math.min(0, dy) : Math.max(0, dy));
  }
  function up() {
    if (start.current === null) return;
    if (!moved.current) setSmall(!small); // a tap toggles
    else if (!small && drag > 60) setSmall(true);
    else if (small && drag < -40) setSmall(false);
    start.current = null;
    setDrag(0);
  }

  const base = small ? `calc(100% - ${PEEK}px)` : "0px";
  return (
    <div
      className="absolute inset-x-0 bottom-0 z-10 mx-auto max-w-[480px]"
      style={{
        transform: `translateY(calc(${base} + ${drag}px))`,
        transition: start.current === null ? "transform .28s cubic-bezier(.2,.8,.2,1)" : "none",
      }}
    >
      {/* grab handle: drag or tap to shrink / expand */}
      <button
        aria-label={small ? "Expand ride details" : "Shrink ride details"}
        onPointerDown={down} onPointerMove={move} onPointerUp={up} onPointerCancel={up}
        className="absolute inset-x-0 top-0 z-20 mx-auto flex h-7 w-32 touch-none items-start justify-center pt-2.5"
      >
        <span className="h-1.5 w-10 rounded-full bg-fg/20" />
      </button>
      <div className="sheet-scroll max-h-[min(82vh,82dvh)] overflow-y-auto overscroll-contain rounded-t-[28px]">
        {children}
      </div>
    </div>
  );
}
