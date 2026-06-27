const stats = [
  { value: "1+", label: "ans d'expérience" },
  { value: "Full", label: "stack" },
];

export function StatBar() {
  return (
    <section className="max-w-6xl mx-auto px-6 pb-4">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {stats.map((s) => (
          <div
            key={s.label}
            className="border border-[var(--color-line)] bg-[var(--color-surface-alt)] rounded-[8px] py-6 px-5"
          >
            <div className="text-[28px] font-mono font-medium text-[var(--color-brand)] leading-none">
              {s.value}
            </div>
            <div className="mt-2 font-mono text-[11px] uppercase tracking-wider text-[var(--color-ink-faint)]">
              {s.label}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
