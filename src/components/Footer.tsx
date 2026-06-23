import { Github, Linkedin, Twitter } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-[var(--color-line)] bg-white">
      <div className="max-w-6xl mx-auto px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-[var(--color-ink-soft)]">
        <p>© 2026 Rasolofondraibe Thony</p>
        <div className="flex items-center gap-5">
          <a href="https://github.com/alexmartin" aria-label="GitHub" className="hover:text-[var(--color-brand)]">
            <Github size={16} />
          </a>
          <a href="https://linkedin.com/in/alexmartin" aria-label="LinkedIn" className="hover:text-[var(--color-brand)]">
            <Linkedin size={16} />
          </a>
          <a href="https://twitter.com/alexmartin" aria-label="Twitter" className="hover:text-[var(--color-brand)]">
            <Twitter size={16} />
          </a>
        </div>
      </div>
    </footer>
  );
}
