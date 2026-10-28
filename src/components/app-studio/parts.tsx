'use client';

import { useEffect, useLayoutEffect, type CSSProperties, type ReactNode } from 'react';
import { useTransform, type MotionValue } from 'framer-motion';
import { House, Search, Heart, User } from 'lucide-react';

/* Pieces shared by the app studio sections, which load as separate chunks. */

export const useIso = typeof window === 'undefined' ? useEffect : useLayoutEffect;
export const EASE = [0.16, 1, 0.3, 1] as const;
export const img = (n: string) => `/images/app-studio/${n}.webp`;

/** Fade in over [a,b]. Clamped, so it holds at 1 afterwards. */
export function useFadeIn(p: MotionValue<number>, a: number, b: number) {
  return useTransform(p, [a, b], [0, 1], { clamp: true });
}
/** Fade in over [a,b], hold, then fade out over [c,d]. */
export function useFadeInOut(p: MotionValue<number>, a: number, b: number, c: number, d: number) {
  return useTransform(p, [a, b, c, d], [0, 1, 1, 0], { clamp: true });
}

/* ---------------- the phone ---------------- */

/** A phone drawn in CSS. Everything on its screen is sized in container units, so it scales with the phone. */
export function Phone({ children, className = '', style }: { children: ReactNode; className?: string; style?: CSSProperties }) {
  return (
    <div className={`as-phone ${className}`} style={style}>
      <div className="as-screen">
        {children}
        <span className="as-island" />
      </div>
      <span className="as-sheen" />
    </div>
  );
}

export function StatusBar() {
  return <div className="as-status"><b>9:41</b><span><i /><i /><i /><i /></span><em /></div>;
}

export function TabBar({ on = 0 }: { on?: number }) {
  return (
    <div className="as-tabs">
      {[House, Search, Heart, User].map((I, i) => <span key={i} data-on={i === on ? '' : undefined}><I /></span>)}
    </div>
  );
}


export const DAYS = [['Mon', 10], ['Tue', 11], ['Wed', 12], ['Thu', 13], ['Fri', 14], ['Sat', 15], ['Sun', 16]] as const;
