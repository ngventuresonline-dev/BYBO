const stats = [
  { value: "3–10", label: "Days to a ranked roadmap" },
  { value: "4–12", label: "Weeks to production" },
  { value: "1", label: "Named owner, ours and yours" },
  { value: "0", label: "Numbers we can’t attribute", accent: true },
];

export function HomeStats() {
  return (
    <section
      className="dc dc-panels dc-divide grid-cols-1 min-[561px]:grid-cols-2 min-[861px]:grid-cols-4"
    >
      {stats.map((stat) => (
        <div key={stat.label} className="dc-pad py-7">
          <p
            className="dc-stat"
            style={{ color: stat.accent ? "var(--color-signal)" : undefined }}
          >
            {stat.value}
          </p>
          <p className="dc-label-muted mt-2">{stat.label}</p>
        </div>
      ))}
    </section>
  );
}
