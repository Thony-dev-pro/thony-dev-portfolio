const stats = [
  { value: "1+", label: "Années d'expérience" },
  { value: "30+", label: "Projets livrés" },
  { value: "12", label: "Clients satisfaits" },
  { value: "99%", label: "Uptime moyen" },
];

export function StatBar() {
  return (
    <section className="border-y border-[var(--color-line)] bg-white">
      <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 divide-x divide-y md:divide-y-0 divide-[var(--color-line)]">
        {stats.map((s) => (
          <div key={s.label} className="text-center py-8 px-4">
            <div className="text-[26px] font-medium tracking-tight">{s.value}</div>
            <div className="text-[12px] text-[var(--color-ink-soft)] mt-1">{s.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
