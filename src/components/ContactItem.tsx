import type { LucideIcon } from "lucide-react";

export function ContactItem({
  icon: Icon,
  label,
  value,
  href,
}: {
  icon: LucideIcon;
  label: string;
  value: string;
  href?: string;
}) {
  const Wrapper: React.ElementType = href ? "a" : "div";
  return (
    <Wrapper
      href={href}
      className="flex items-start gap-3 border border-[var(--color-line)] rounded-[12px] p-4 bg-white transition-colors hover:border-[var(--color-brand)]"
    >
      <div className="w-8 h-8 rounded-[8px] bg-[var(--color-brand-soft)] flex items-center justify-center text-[var(--color-brand)] shrink-0">
        <Icon size={16} />
      </div>
      <div className="min-w-0">
        <div className="text-[12px] text-[var(--color-ink-soft)]">{label}</div>
        <div className="text-[14px] font-medium truncate">{value}</div>
      </div>
    </Wrapper>
  );
}
