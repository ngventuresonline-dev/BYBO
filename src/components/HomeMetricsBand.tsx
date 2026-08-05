import { Eye, Globe, Hexagon, Route } from "lucide-react";

const metrics = [
  {
    value: "7",
    label: "Systems",
    detail: "Platforms, agents, knowledge, intelligence, governance.",
    icon: Hexagon,
  },
  {
    value: "7+",
    label: "Industry contexts",
    detail: "Workflows shaped by sector risk and ownership.",
    icon: Globe,
  },
  {
    value: "90-day",
    label: "Blueprint roadmap",
    detail: "Diagnose and rank before you automate.",
    icon: Route,
  },
  {
    value: "100%",
    label: "Inspectable by design",
    detail: "Sources, confidence, and human approval visible.",
    icon: Eye,
  },
] as const;

export function HomeMetricsBand() {
  return (
    <section className="border-y border-line/70 bg-void">
      <div className="mx-auto w-full min-w-0 max-w-[1240px] px-[var(--page-x)] py-5 sm:py-6">
        <div className="home-metrics-track min-w-0">
          {metrics.map((metric) => {
            const Icon = metric.icon;
            return (
              <article key={metric.label} className="home-metric-card">
                <span className="home-metric-icon" aria-hidden="true">
                  <Icon size={15} strokeWidth={1.7} />
                </span>
                <div className="min-w-0">
                  <p className="home-metric-value">{metric.value}</p>
                  <p className="home-metric-label">{metric.label}</p>
                  <p className="home-metric-detail">{metric.detail}</p>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
