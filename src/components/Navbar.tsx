import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Menu, X, Download } from "lucide-react";

const links = [
  { to: "/", label: "À propos" },
  { to: "/projects", label: "Projets" },
  { to: "/blog", label: "Blog" },
  { to: "/contact", label: "Contact" },
] as const;

export function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-[var(--color-line)]">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 font-semibold text-[15px]">
          <span className="w-2.5 h-2.5 rounded-full bg-[var(--color-brand)]" />
          alex.dev
        </Link>

        <nav className="hidden md:flex items-center gap-7 text-sm text-[var(--color-ink-soft)]">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              activeOptions={{ exact: l.to === "/" }}
              activeProps={{ className: "text-[var(--color-brand)] font-medium" }}
              className="hover:text-[var(--color-ink)] transition-colors"
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:block">
          <a href="#" className="btn-outline text-sm">
            <Download size={14} /> Télécharger CV
          </a>
        </div>

        <button
          className="md:hidden p-2"
          onClick={() => setOpen(true)}
          aria-label="Ouvrir le menu"
        >
          <Menu size={20} />
        </button>
      </div>

      {open && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div className="absolute inset-0 bg-black/30" onClick={() => setOpen(false)} />
          <aside className="absolute right-0 top-0 h-full w-72 bg-white border-l border-[var(--color-line)] p-6 flex flex-col gap-5">
            <div className="flex items-center justify-between">
              <span className="font-semibold">Menu</span>
              <button onClick={() => setOpen(false)} aria-label="Fermer">
                <X size={20} />
              </button>
            </div>
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                onClick={() => setOpen(false)}
                className="text-[15px] text-[var(--color-ink)]"
              >
                {l.label}
              </Link>
            ))}
            <a href="#" className="btn-outline mt-2 text-sm">
              <Download size={14} /> Télécharger CV
            </a>
          </aside>
        </div>
      )}
    </header>
  );
}
