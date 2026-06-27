import { Github, Linkedin, Twitter } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-[var(--color-line)] bg-[var(--color-surface)]">
      <div className="max-w-6xl mx-auto px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-[11px] text-[var(--color-ink-faint)]">
        <p>© 2026 rasolofondraibe.thony</p>
        <div className="flex items-center gap-5">
          <a href="https://github.com/Thony-dev-pro" aria-label="GitHub" className="hover:text-[var(--color-brand)]">
            <Github size={14} />
          </a>
          <a href="https://linkedin.com/in/rasolofondraibe-thony-0ab57930a" aria-label="LinkedIn" className="hover:text-[var(--color-brand)]">
            <Linkedin size={14} />
          </a>
          <a href="#" aria-label="Twitter" className="hover:text-[var(--color-brand)]">
            <Twitter size={14} />
          </a>
        </div>
        <div className="flex items-center gap-2 text-[var(--color-brand)]">
          <span className="pulse-dot" />
          disponible
        </div>
      </div>
    </footer>
  );
}
