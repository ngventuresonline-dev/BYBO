import { ReactNode } from "react";

/** Full-screen on a phone; a phone-sized device on tablet and desktop, so it reads as an app. */
export function AppFrame({ children }: { children: ReactNode }) {
  return (
    <div className="app-stage">
      <div className="app-device">{children}</div>
    </div>
  );
}
