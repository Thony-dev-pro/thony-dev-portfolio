import type { Skill } from "@/data/skills";

export function SkillChip({ skill }: { skill: Skill }) {
  const Icon = skill.icon;
  return (
    <div className="flex items-center justify-between gap-3 border border-[var(--color-line)] rounded-[8px] bg-white px-3.5 py-3 transition-colors hover:border-[var(--color-brand)]">
      <div className="flex items-center gap-2.5 min-w-0">
        <Icon size={16} className="text-[var(--color-brand)] shrink-0" />
        <span className="text-[13px] font-medium truncate">{skill.name}</span>
      </div>
      <span className="text-[11px] text-[var(--color-ink-faint)] shrink-0">{skill.level}</span>
    </div>
  );
}
