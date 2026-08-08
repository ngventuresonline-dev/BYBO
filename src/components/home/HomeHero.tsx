import { NotchButton } from "@/components/dc/NotchButton";

const feed = [
  { time: "09:41", body: "INV-4471 · 14 fields", state: "posted", tone: "ok" },
  { time: "09:41", body: "POD-8802 · matched SO-119", state: "posted", tone: "ok" },
  {
    time: "09:42",
    body: "INV-4472 · GST mismatch ₹18,400",
    state: "held",
    tone: "held",
  },
  { time: "09:42", body: "KYC-2210 · 3 docs verified", state: "posted", tone: "ok" },
  { time: "09:43", body: "RFQ-0913 · quote drafted", state: "review", tone: "warn" },
] as const;

const TONE: Record<string, string> = {
  ok: "var(--color-success)",
  held: "var(--color-signal)",
  warn: "var(--color-warn)",
};

export function HomeHero() {
  return (
    <section className="dc dc-grid-field dc-sweep dc-divide relative overflow-hidden">
      <div className="relative grid min-[861px]:grid-cols-[1.28fr_1fr]">
        <div
          className="dc-pad pb-14 pt-16 min-[861px]:border-r"
          style={{ borderColor: "var(--dc-line)" }}
        >
          <p className="dc-label flex items-center gap-3">
            <span className="block h-px w-7 bg-signal" aria-hidden />
            <span>Enterprise AI systems · {"Bengaluru"}</span>
          </p>

          <h1 className="dc-h1 dc-h1-hero mt-11">
            AI systems,
            <br />
            built around
            <br />
            <span className="text-signal">your business.</span>
          </h1>

          <p
            className="mt-10 max-w-[46ch] text-[clamp(17px,1.5vw,20px)] leading-[1.42]"
            style={{ color: "var(--dc-muted)" }}
          >
            Production AI around your real workflows — built, run and measured. Not
            pilots.
          </p>

          <div className="mt-11 flex flex-wrap gap-2.5">
            <NotchButton href="/blueprint">Start a Blueprint</NotchButton>
            <NotchButton href="/systems" variant="ghost">
              What we build
            </NotchButton>
          </div>
        </div>

        <div className="dc-pad flex flex-col py-6">
          <div
            className="dc-mono flex items-center justify-between border-b pb-3.5 text-[10px] uppercase tracking-[0.16em]"
            style={{ borderColor: "var(--dc-line)", color: "var(--dc-faint)" }}
          >
            <span>Live · document operations</span>
            <span style={{ color: "var(--color-success)" }}>● running</span>
          </div>

          <ul className="dc-mono text-xs">
            {feed.map((row, i) => (
              <li
                key={row.body}
                className="grid grid-cols-[52px_1fr_68px] gap-3 border-b py-3"
                style={{
                  borderColor: "var(--dc-line-soft)",
                  background: row.tone === "held" ? "rgba(176,38,255,0.12)" : undefined,
                  animation: `dc-feed 8s ease-in-out ${i * 0.6}s infinite`,
                }}
              >
                <span style={{ color: "rgba(236,234,228,0.35)" }}>{row.time}</span>
                <span
                  style={{
                    color:
                      row.tone === "held"
                        ? "var(--color-cream)"
                        : "rgba(236,234,228,0.85)",
                  }}
                >
                  {row.body}
                </span>
                <span style={{ color: TONE[row.tone] }}>{row.state}</span>
              </li>
            ))}
          </ul>

          <div
            className="mt-auto border-t pt-5"
            style={{ borderColor: "var(--dc-line)" }}
          >
            <svg viewBox="0 0 300 74" className="block h-[74px] w-full" aria-hidden>
              <line
                x1="0"
                y1="37"
                x2="300"
                y2="37"
                stroke="rgba(236,234,228,0.16)"
                strokeWidth="1"
              />
              <polyline
                points="0,52 30,50 60,44 90,46 120,38 150,34 180,28 210,24 240,18 270,14 300,10"
                fill="none"
                stroke="var(--color-signal)"
                strokeWidth="1.5"
                strokeDasharray="420"
                style={{ animation: "dc-draw 2.6s cubic-bezier(0.16,1,0.3,1) forwards" }}
              />
              <polyline
                points="0,56 30,58 60,55 90,60 120,57 150,61 180,58 210,62 240,60 270,63 300,61"
                fill="none"
                stroke="rgba(236,234,228,0.3)"
                strokeWidth="1"
                strokeDasharray="420"
                style={{
                  animation: "dc-draw 2.6s cubic-bezier(0.16,1,0.3,1) 0.2s forwards",
                }}
              />
              <circle cx="300" cy="10" r="3" fill="var(--color-signal)" />
            </svg>
            <div
              className="dc-mono mt-1.5 flex justify-between text-[10px] uppercase tracking-[0.14em]"
              style={{ color: "var(--dc-faint)" }}
            >
              <span>Straight-through rate</span>
              <span className="text-signal">81%</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
