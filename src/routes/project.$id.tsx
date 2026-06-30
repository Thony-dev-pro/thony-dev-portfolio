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
        <p className="mt-4 text-[16px] text-[var(--color-ink-soft)] leading-relaxed">
          {project.long}
        </p>
        <div className="flex flex-wrap gap-1.5 mt-5">
          {project.tags.map((t: string) => (
            <span key={t} className="tag-mono">{t}</span>
          ))}
        </div>
      </header>

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
            <div key={r.label} className="border border-[var(--color-line)] rounded-[12px] p-5 bg-white">
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
