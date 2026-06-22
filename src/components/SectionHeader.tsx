import type { ReactNode } from "react";

export function SectionHeader({
  eyebrow,
  title,
  action,
}: {
  eyebrow: string;
  title: string;
  action?: ReactNode;
}) {
  return (
    <div className="flex items-end justify-between gap-4 mb-8">
      <div>
        <p className="eyebrow mb-2">{eyebrow}</p>
        <h2 className="text-[24px] md:text-[28px] font-medium tracking-tight">{title}</h2>
      </div>
      {action}
    </div>
  );
}
