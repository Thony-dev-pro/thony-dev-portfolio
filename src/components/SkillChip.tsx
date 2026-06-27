import type { Skill } from "@/data/skills";

const levelToPct = (level: string) => {
  const l = level.toLowerCase();
  if (l.startsWith("avanc")) return 88;
  if (l.startsWith("inter")) return 62;
  return 45;
};

export function SkillChip({ skill }: { skill: Skill }) {
  const Icon = skill.icon;
  const pct = levelToPct(skill.level);
  return (
    <div className="border border-[var(--color-line)] rounded-[8px] bg-[var(--color-surface-alt)] px-3.5 py-3 transition-colors hover:border-[var(--color-brand)]">
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2.5 min-w-0">
          <Icon size={14} className="text-[var(--color-brand)] shrink-0" />
          <span className="text-[13px] font-medium truncate text-[var(--color-ink)]">{skill.name}</span>
        </div>
        <span className="text-[10px] font-mono text-[var(--color-ink-faint)] shrink-0 uppercase tracking-wider">{skill.level}</span>
      </div>
      <div className="mt-2.5 h-[2px] w-full bg-[var(--color-line)] rounded-full overflow-hidden">
        <div className="h-full bg-[var(--color-brand)]" style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}
