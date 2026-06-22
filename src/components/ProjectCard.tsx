import { Link } from "@tanstack/react-router";
import { Github, ExternalLink } from "lucide-react";
import type { Project } from "@/data/projects";

export function ProjectCard({ project }: { project: Project }) {
  return (
    <article
      className={`group rounded-[12px] border border-[var(--color-line)] bg-white p-5 flex flex-col gap-4 transition-colors hover:border-[var(--color-brand)] ${
        project.featured ? "border-t-2 border-t-[var(--color-brand)]" : ""
      }`}
    >
      <div className="flex items-center justify-between">
        {project.featured ? (
          <span className="text-[11px] font-medium px-2.5 py-1 rounded-full bg-[var(--color-brand-soft)] text-[var(--color-brand-deep)]">
            Featured
          </span>
        ) : <span />}
        <div className="flex items-center gap-3 text-[var(--color-ink-soft)]">
          {project.github && (
            <a
              href={project.github}
              onClick={(e) => e.stopPropagation()}
              className="flex items-center gap-1 text-xs hover:text-[var(--color-brand)]"
            >
              <Github size={14} /> Code
            </a>
          )}
          {project.demo && (
            <a
              href={project.demo}
              onClick={(e) => e.stopPropagation()}
              className="flex items-center gap-1 text-xs hover:text-[var(--color-brand)]"
            >
              <ExternalLink size={14} /> Demo
            </a>
          )}
        </div>
      </div>

      <Link
        to="/project/$id"
        params={{ id: project.id }}
        className="flex flex-col gap-3 flex-1"
      >
        <h3 className="text-[15px] font-medium leading-snug group-hover:text-[var(--color-brand)] transition-colors">
          {project.title}
        </h3>
        <p className="text-[13px] text-[var(--color-ink-soft)] leading-relaxed">
          {project.short}
        </p>
        <div className="flex flex-wrap gap-1.5 mt-auto pt-2">
          {project.tags.map((t) => (
            <span key={t} className="tag-mono">{t}</span>
          ))}
        </div>
      </Link>
    </article>
  );
}
