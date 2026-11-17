import { ImageResponse } from "next/og";

// WhatsApp / iMessage / LinkedIn link preview, rendered once at build time
export const dynamic = "force-static";
// alt text lives in layout.tsx metadata
const size = { width: 1200, height: 630 };


const INK = "#0E1A24", MUTED = "#5B6B7C", FLO = "#00D08A", FLO_INK = "#037A54";
const vehicles = [
  { label: "Bike", color: FLO, x: 70, y: 150 },
  { label: "EV", color: "#00B4D8", x: 236, y: 300 },
  { label: "Auto", color: "#FFB020", x: 160, y: 250 },
  { label: "Cab", color: "#4DA3FF", x: 250, y: 70 },
];

const font = (w: number, subset = "latin") =>
  fetch(`https://cdn.jsdelivr.net/fontsource/fonts/inter@latest/${subset}-${w}-normal.woff`).then((r) => r.arrayBuffer());

export async function GET() {
  const [regular, semi, bold, boldExt] = await Promise.all([font(400), font(600), font(800), font(800, "latin-ext")]);
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", background: "#F3F5F8", fontFamily: "Inter" }}>
        {/* left: pitch */}
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", padding: "0 0 0 80px", width: 680 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
            <div style={{ width: 72, height: 72, borderRadius: 20, background: FLO, display: "flex", flexDirection: "column", justifyContent: "center", padding: "0 0 0 18px", gap: 7 }}>
              <div style={{ width: 34, height: 9, background: "#06231A", borderRadius: 2 }} />
              <div style={{ width: 24, height: 9, background: "#06231A", borderRadius: 2 }} />
              <div style={{ width: 14, height: 9, background: "#06231A", borderRadius: 2, opacity: 0.55 }} />
            </div>
            <div style={{ display: "flex", fontSize: 46, fontWeight: 800, color: INK, letterSpacing: -1 }}>
              flo<span style={{ color: FLO_INK }}>tempo</span>
            </div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", marginTop: 44, fontSize: 64, fontWeight: 800, color: INK, lineHeight: 1.05, letterSpacing: -2 }}>
            <span>Bike, auto & cab</span>
            <span>rides in Bengaluru.</span>
          </div>
          <div style={{ marginTop: 26, fontSize: 28, color: MUTED, lineHeight: 1.35, display: "flex" }}>
            Live demo — book a ride, watch a captain pick you up, track it to the drop.
          </div>
          <div style={{ display: "flex", gap: 12, marginTop: 36 }}>
            {["Rider app", "Captain app", "Ops dashboard"].map((t) => (
              <div key={t} style={{ display: "flex", padding: "10px 20px", borderRadius: 999, background: "#FFFFFF", border: "2px solid #E1E7EE", fontSize: 22, fontWeight: 700, color: INK }}>{t}</div>
            ))}
          </div>
        </div>

        {/* right: phone with live map */}
        <div style={{ display: "flex", flex: 1, alignItems: "center", justifyContent: "center" }}>
          <div style={{ display: "flex", width: 330, height: 560, borderRadius: 48, background: INK, padding: 10, boxShadow: "0 30px 60px rgba(14,26,36,.25)" }}>
            <div style={{ display: "flex", flexDirection: "column", width: "100%", height: "100%", borderRadius: 40, overflow: "hidden", background: "#E9EDF1", position: "relative" }}>
              {/* streets */}
              {[90, 200, 330].map((y) => <div key={y} style={{ position: "absolute", left: 0, top: y, width: 310, height: 10, background: "#FFFFFF" }} />)}
              {[60, 180, 260].map((x) => <div key={x} style={{ position: "absolute", top: 0, left: x, width: 10, height: 540, background: "#FFFFFF" }} />)}
              {/* route */}
              <div style={{ position: "absolute", left: 95, top: 140, width: 150, height: 150, borderLeft: `6px solid ${FLO}`, borderBottom: `6px solid ${FLO}`, borderBottomLeftRadius: 60 }} />
              {vehicles.map((v) => (
                <div key={v.label} style={{ position: "absolute", left: v.x - 20, top: v.y - 20, width: 46, height: 46, borderRadius: 999, background: "#FFFFFF", border: `4px solid ${v.color}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 800, color: INK }}>{v.label}</div>
              ))}
              {/* sheet */}
              <div style={{ position: "absolute", left: 0, bottom: 0, width: 310, display: "flex", flexDirection: "column", background: "#FFFFFF", borderTopLeftRadius: 26, borderTopRightRadius: 26, padding: "20px 20px 26px" }}>
                <div style={{ display: "flex", fontSize: 15, color: MUTED }}>Captain is on the way</div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 6 }}>
                  <div style={{ display: "flex", fontSize: 21, fontWeight: 800, color: INK, whiteSpace: "nowrap" }}>Arriving in 2 min</div>
                  <div style={{ display: "flex", padding: "6px 12px", borderRadius: 10, background: INK, color: "#FFFFFF", fontSize: 20, fontWeight: 800, letterSpacing: 3 }}>9976</div>
                </div>
                <div style={{ display: "flex", marginTop: 16, padding: "14px 0", borderRadius: 16, background: FLO, color: "#06231A", fontSize: 19, fontWeight: 800, justifyContent: "center" }}>Track your ride live</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    ),
    { ...size, fonts: [
      { name: "Inter", data: regular, weight: 400 },
      { name: "Inter", data: semi, weight: 600 },
      { name: "Inter", data: bold, weight: 800 },
      { name: "Inter", data: boldExt, weight: 800 }, // ₹
    ] },
  );
}
