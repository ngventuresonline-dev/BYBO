const stats = [
  { value: "50+", label: "Businesses served" },
  { value: "3×", label: "Avg. lead growth" },
  { value: "2 wk", label: "Time to deploy" },
  { value: "24/7", label: "AI always on" },
];

export function StatsStrip() {
  return (
    <section className="border-y border-border bg-paper">
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat) => (
            <div key={stat.label}>
              <p className="font-display text-3xl md:text-4xl font-bold tracking-tight">
                {stat.value}
              </p>
              <p className="text-sm text-muted mt-1">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
