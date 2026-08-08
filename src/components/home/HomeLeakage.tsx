"use client";

import { useId, useState } from "react";
import { NotchButton } from "@/components/dc/NotchButton";

/** Working days per year the estimate assumes. */
const WORKING_DAYS = 250;
/** Hours in one full-time equivalent year. */
const FTE_HOURS = 2000;

/** Indian-numbering short form: ₹1.2 Cr, ₹4.5 L, ₹92,400. */
function inr(n: number): string {
  if (n >= 1e7) return `₹${(n / 1e7).toFixed(n / 1e7 < 10 ? 2 : 1)} Cr`;
  if (n >= 1e5) return `₹${(n / 1e5).toFixed(n / 1e5 < 10 ? 1 : 0)} L`;
  return `₹${Math.round(n).toLocaleString("en-IN")}`;
}

const BAR_HEIGHTS = [34, 46, 40, 58, 52, 66, 74, 82, 95];

type SliderProps = {
  label: string;
  value: number;
  display: string;
  min: number;
  max: number;
  step?: number;
  onChange: (value: number) => void;
};

function Slider({ label, value, display, min, max, step = 1, onChange }: SliderProps) {
  const id = useId();
  return (
    <div>
      <div className="dc-mono mb-3 flex items-baseline justify-between text-[11px] uppercase tracking-[0.14em]">
        <label htmlFor={id} style={{ color: "rgba(236,234,228,0.55)" }}>
          {label}
        </label>
        <output htmlFor={id} className="text-sm text-signal">
          {display}
        </output>
      </div>
      <input
        id={id}
        type="range"
        className="dc-range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
      />
    </div>
  );
}

export function HomeLeakage() {
  const [people, setPeople] = useState(8);
  const [hoursStep, setHoursStep] = useState(4);
  const [rate, setRate] = useState(450);
  const [share, setShare] = useState(45);

  const hours = hoursStep * 0.5;
  const totalHours = people * hours * WORKING_DAYS;
  const totalCost = totalHours * rate;
  const hoursBack = totalHours * (share / 100);

  return (
    <section className="dc dc-divide">
      <div className="grid min-[861px]:grid-cols-[1fr_0.9fr]">
        <div
          className="dc-pad dc-section min-[861px]:border-r"
          style={{ borderColor: "var(--dc-line)" }}
        >
          <p className="dc-label">02 / Leakage</p>
          <h2 className="dc-h2 mt-6 max-w-[15ch] text-[clamp(32px,4.4vw,66px)] leading-[0.92]">
            What is repetitive work costing you a year?
          </h2>
          <p
            className="mt-5 max-w-[46ch] text-[18px] leading-[1.45]"
            style={{ color: "var(--dc-muted)" }}
          >
            Four numbers you already know. Nothing is sent to us. Take the answer to your
            accounts team and check it — that is the idea.
          </p>

          <div className="mt-10 grid max-w-[520px] gap-7">
            <Slider
              label="People doing the work"
              value={people}
              display={String(people)}
              min={1}
              max={120}
              onChange={setPeople}
            />
            <Slider
              label="Hours each, per day"
              value={hoursStep}
              display={`${hours.toFixed(1)} hrs`}
              min={1}
              max={14}
              onChange={setHoursStep}
            />
            <Slider
              label="Loaded cost per hour"
              value={rate}
              display={`₹${rate.toLocaleString("en-IN")}`}
              min={150}
              max={2500}
              step={50}
              onChange={setRate}
            />
            <Slider
              label="Share a system can absorb"
              value={share}
              display={`${share}%`}
              min={10}
              max={80}
              step={5}
              onChange={setShare}
            />
          </div>

          <div className="mt-10 max-w-[520px]">
            <div
              className="dc-mono mb-2.5 flex justify-between text-[10px] uppercase tracking-[0.16em]"
              style={{ color: "rgba(236,234,228,0.4)" }}
            >
              <span>Absorbed by the system</span>
              <span>Stays with your team</span>
            </div>
            <div
              className="flex h-[30px] overflow-hidden"
              style={{ background: "rgba(236,234,228,0.08)" }}
            >
              <div
                className="h-[30px] bg-signal"
                style={{
                  width: `${share}%`,
                  transition: "width 260ms cubic-bezier(0.16,1,0.3,1)",
                }}
              />
            </div>
            <div className="mt-1.5 flex" aria-hidden>
              {Array.from({ length: 10 }).map((_, i) => (
                <span
                  key={i}
                  className="block h-[5px] flex-1 border-l"
                  style={{
                    borderColor: "rgba(236,234,228,0.2)",
                    borderRightWidth: i === 9 ? 1 : 0,
                  }}
                />
              ))}
            </div>
          </div>
        </div>

        <div className="dc-pad dc-section" style={{ background: "rgba(176,38,255,0.06)" }}>
          <p className="dc-label-muted">Recoverable, per year</p>
          <p
            className="font-display mt-4 text-[clamp(46px,5.6vw,84px)] font-extrabold leading-[0.9] tracking-[-0.06em] text-signal"
            aria-live="polite"
          >
            {inr(totalCost * (share / 100))}
          </p>

          <div className="mt-9 flex h-24 items-end gap-[5px]" aria-hidden>
            {BAR_HEIGHTS.map((h, i) => (
              <span
                key={i}
                className="block flex-1"
                style={{
                  height: `${h}%`,
                  background: i >= 5 ? "var(--color-signal)" : "rgba(236,234,228,0.16)",
                  transformOrigin: "bottom",
                  animation: `dc-grow 700ms cubic-bezier(0.16,1,0.3,1) ${i * 60}ms forwards`,
                }}
              />
            ))}
          </div>
          <p
            className="dc-mono mt-2.5 text-[10px] uppercase tracking-[0.14em]"
            style={{ color: "rgba(236,234,228,0.35)" }}
          >
            Month 1 → 9 · capacity returned as the system takes load
          </p>

          <div className="my-8 h-px" style={{ background: "var(--dc-line)" }} />

          <dl className="dc-mono grid gap-4 text-[13px]">
            {[
              ["Total on repetitive work", inr(totalCost)],
              ["Hours returned", `${Math.round(hoursBack).toLocaleString("en-IN")} hrs`],
              ["Full-time equivalents", (hoursBack / FTE_HOURS).toFixed(1)],
            ].map(([term, value]) => (
              <div key={term} className="flex justify-between gap-4">
                <dt style={{ color: "rgba(236,234,228,0.5)" }}>{term}</dt>
                <dd>{value}</dd>
              </div>
            ))}
          </dl>

          <div className="my-8 h-px" style={{ background: "var(--dc-line)" }} />

          <p className="text-[15px] leading-[1.55]" style={{ color: "var(--dc-muted)" }}>
            This is a rough estimate, not a promise. The Blueprint gives you the real
            number from your own work.
          </p>

          <NotchButton href="/blueprint" className="mt-6">
            Get the measured number
          </NotchButton>
        </div>
      </div>
    </section>
  );
}
