/**
 * Flo Tempo brand system.
 * Replace the hex values here with the client's palette and the whole
 * product re-skins — nothing else references raw colours.
 */
export const brand = {
  name: "Flo Tempo",
  tagline: "Bengaluru, at your tempo.",
  colors: {
    ink: "#0A1017",        // near-black, all dark surfaces
    inkSoft: "#131B25",
    line: "#1F2A36",
    flo: "#00D08A",        // primary — EV green, motion
    floDim: "#06A86F",
    tempo: "#FFC53D",      // secondary — auto/amber, India-familiar
    surge: "#FF5A3C",      // surge, SOS, alerts
    sky: "#4DA3FF",        // cab / info
    paper: "#F6F8F7",
    muted: "#8597A8",
  },
  classes: {
    bike: { color: "#00D08A", icon: "bike" },
    bike_ev: { color: "#22E6A8", icon: "zap" },
    auto: { color: "#FFC53D", icon: "auto" },
    cab: { color: "#4DA3FF", icon: "car" },
  } as Record<string, { color: string; icon: string }>,
} as const;

export const CITY = {
  id: "blr",
  name: "Bengaluru",
  centre: [77.5946, 12.9716] as [number, number],
};
