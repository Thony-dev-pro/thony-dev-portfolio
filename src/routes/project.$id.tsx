import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, Github, ExternalLink } from "lucide-react";
import { CodeBlock } from "@/components/CodeBlock";
import { projects, type Project } from "@/data/projects";

export const Route = createFileRoute("/project/$id")({
  loader: ({ params }): { project: Project } => {
    const project = projects.find((p) => p.id === params.id);
    if (!project) throw notFound();
    return { project };
  },
  component: ProjectDetailPage,
  notFoundComponent: () => (
    <div className="max-w-3xl mx-auto px-6 py-24 text-center">
      <h1 className="text-2xl font-medium">Projet introuvable</h1>
      <Link to="/projects" className="btn-primary mt-6 inline-flex">Retour aux projets</Link>
    </div>
  ),
});

function ProjectDetailPage() {
  const { project } = Route.useLoaderData();

  return (
    <article className="max-w-4xl mx-auto px-6 py-12">
      <Link
        to="/projects"
        className="inline-flex items-center gap-1.5 text-sm text-[var(--color-ink-soft)] hover:text-[var(--color-brand)] mb-8"
      >
        <ArrowLeft size={14} /> Retour aux projets
      </Link>

      <header className="mb-10">
        {project.featured && (
          <span className="inline-block text-[11px] font-medium px-2.5 py-1 rounded-full bg-[var(--color-brand-soft)] text-[var(--color-brand-deep)] mb-4">
            Featured
          </span>
        )}
        <h1 className="text-[32px] md:text-[38px] font-medium tracking-tight leading-tight">
          {project.title}
        </h1>
        {project.subtitle && (
          <p className="mt-3 text-[15px] md:text-[16px] text-[var(--color-brand)] font-mono">
            {project.subtitle}
          </p>
        )}
        <p className="mt-4 text-[16px] text-[var(--color-ink-soft)] leading-relaxed">
          {project.long}
        </p>
        <div className="flex flex-wrap gap-1.5 mt-5">
          {project.tags.map((t: string) => (
            <span key={t} className="tag-mono">{t}</span>
          ))}
        </div>
        {(project.github || project.githubLinks) && (
          <div className="flex flex-wrap gap-2 mt-5">
            {project.githubLinks
              ? project.githubLinks.map((l) => (
                  <a key={l.url} href={l.url} className="btn-terminal">
                    <Github size={14} /> {l.label}
                  </a>
                ))
              : project.github && (
                  <a href={project.github} className="btn-terminal">
                    <Github size={14} /> Voir sur GitHub
                  </a>
                )}
          </div>
        )}
      </header>

      {project.context && (
        <section className="mb-10">
          <h2 className="text-[20px] font-medium mb-3">Contexte</h2>
          <p className="text-[15px] text-[var(--color-ink-soft)] leading-relaxed">{project.context}</p>
        </section>
      )}

      {project.keyPoints && project.keyPoints.length > 0 && (
        <section className="mb-10">
          <h2 className="text-[20px] font-medium mb-4">Points clés techniques</h2>
          <ul className="space-y-2.5">
            {project.keyPoints.map((p, i) => (
              <li key={i} className="flex gap-3 text-[15px] text-[var(--color-ink-soft)] leading-relaxed">
                <span className="text-[var(--color-brand)] font-mono select-none">▸</span>
                <span>{p}</span>
              </li>
            ))}
          </ul>
        </section>
      )}

      {project.gallery && project.gallery.length > 0 && (
        <section className="mb-10">
          <h2 className="text-[20px] font-medium mb-4">Aperçus</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {project.gallery.map((g) => (
              <figure
                key={g.placeholder}
                className="border border-[var(--color-line)] rounded-[8px] bg-[var(--color-surface-alt)] overflow-hidden"
              >
                <div className="aspect-[16/10] flex items-center justify-center bg-[var(--color-surface-mute)] text-[var(--color-ink-faint)] font-mono text-[11px] px-3 text-center">
                  {g.placeholder}
                </div>
                <figcaption className="px-3 py-2 text-[12px] text-[var(--color-ink-soft)] border-t border-[var(--color-line)]">
                  {g.caption}
                </figcaption>
              </figure>
            ))}
          </div>
        </section>
      )}

      <section className="mb-10">
        <h2 className="text-[20px] font-medium mb-3">Le défi</h2>
        <p className="text-[15px] text-[var(--color-ink-soft)] leading-relaxed">{project.challenge}</p>
      </section>

      <section className="mb-10">
        <h2 className="text-[20px] font-medium mb-3">Solution technique</h2>
        <p className="text-[15px] text-[var(--color-ink-soft)] leading-relaxed mb-5">{project.solution}</p>
        <CodeBlock code={project.code} filename="extrait.js" />
      </section>

      <section className="mb-10">
        <h2 className="text-[20px] font-medium mb-4">Résultats</h2>
        <div className="grid sm:grid-cols-3 gap-4">
          {project.results.map((r: { label: string; value: string }) => (
            <div key={r.label} className="border border-[var(--color-line)] rounded-[12px] p-5 bg-[var(--color-surface-alt)]">
              <div className="text-[24px] font-medium text-[var(--color-brand)]">{r.value}</div>
              <div className="text-[12px] text-[var(--color-ink-soft)] mt-1">{r.label}</div>
            </div>
          ))}
        </div>
      </section>

      <div className="flex flex-wrap gap-3 mb-16">
        {project.github && (
          <a href={project.github} className="btn-primary"><Github size={14} /> Voir le code GitHub</a>
        )}
        {project.demo && (
          <a href={project.demo} className="btn-outline"><ExternalLink size={14} /> Demo live</a>
        )}
      </div>
    </article>
  );
}
