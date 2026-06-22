import { useState, useMemo } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { ProjectCard } from "@/components/ProjectCard";
import { projects, allTags } from "@/data/projects";

export const Route = createFileRoute("/projects")({
  head: () => ({
    meta: [
      { title: "Projets — Alexandre Martin" },
      { name: "description", content: "Sélection des projets back-end Node.js livrés par Alexandre Martin." },
    ],
  }),
  component: ProjectsPage,
});

function ProjectsPage() {
  const [tag, setTag] = useState("Tous");

  const filtered = useMemo(
    () => (tag === "Tous" ? projects : projects.filter((p) => p.tags.includes(tag))),
    [tag]
  );

  return (
    <section className="max-w-6xl mx-auto px-6 py-16">
      <header className="mb-10">
        <p className="eyebrow mb-2">Projets</p>
        <h1 className="text-[32px] font-medium tracking-tight">Mes projets</h1>
        <p className="mt-3 text-[15px] text-[var(--color-ink-soft)] max-w-2xl">
          Une sélection de projets back-end livrés ces dernières années, du POC à la prod 24/7.
        </p>
      </header>

      <div className="flex flex-wrap gap-2 mb-8">
        {allTags.map((t) => {
          const active = tag === t;
          return (
            <button
              key={t}
              onClick={() => setTag(t)}
              className={`text-[13px] px-3.5 py-1.5 rounded-full border transition-colors ${
                active
                  ? "bg-[var(--color-brand)] text-white border-[var(--color-brand)]"
                  : "bg-white text-[var(--color-ink-soft)] border-[var(--color-line)] hover:border-[var(--color-brand)]"
              }`}
            >
              {t}
            </button>
          );
        })}
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filtered.map((p) => (
          <ProjectCard key={p.id} project={p} />
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="text-center py-16 text-[var(--color-ink-soft)]">
          Aucun projet ne correspond à ce filtre.
        </p>
      )}
    </section>
  );
}
