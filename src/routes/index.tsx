import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Mail, Linkedin, Github, MapPin } from "lucide-react";
import { CodeBlock } from "@/components/CodeBlock";
import { SectionHeader } from "@/components/SectionHeader";
import { SkillChip } from "@/components/SkillChip";
import { ProjectCard } from "@/components/ProjectCard";
import { ContactItem } from "@/components/ContactItem";
import { skills } from "@/data/skills";
import { projects } from "@/data/projects";
import { experience } from "@/data/experience";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Rasolofondraibe Thony — Développeur Full Stack" },
      { name: "description", content: "Développeur Full Stack spécialisé en Node.js, Angular et MongoDB." },
    ],
  }),
  component: HomePage,
});

const heroCode = `// server.js
const express = require('express');
const app = express();

app.get('/api/hello', (req, res) => {
  res.json({ status: 'ok',
    message: 'Ready to build 🚀' });
});

app.listen(3000);`;

function HomePage() {
  const featured = projects.slice(0, 4);

  return (
    <>
      {/* HERO */}
      <section className="max-w-6xl mx-auto px-6 py-16 md:py-24 grid md:grid-cols-2 gap-12 items-center">
        <div className="fade-in">
          <p className="eyebrow mb-4">Développeur Full Stack</p>
          <h1 className="text-[32px] md:text-[38px] font-medium leading-[1.15] tracking-tight">
            Rasolofondraibe <span className="text-[var(--color-brand)]">Thony</span>
            <br />
            Node.js · Angular
          </h1>
          <p className="mt-5 text-[15px] text-[var(--color-ink-soft)] leading-relaxed max-w-lg">
            Je conçois des applications web complètes, du back-end à l'interface utilisateur.
            Spécialisé en Node.js, Angular et intégration de solutions de paiement.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Link to="/projects" className="btn-primary">
              Voir mes projets <ArrowRight size={14} />
            </Link>
            <Link to="/contact" className="btn-outline">Me contacter</Link>
          </div>
        </div>

        <div className="fade-in">
          <CodeBlock code={heroCode} />
        </div>
      </section>

      {/* STACK */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <SectionHeader eyebrow="Stack technique" title="Ce que j'utilise au quotidien" />
        <div className="grid gap-2.5" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))" }}>
          {skills.map((s) => (
            <SkillChip key={s.name} skill={s} />
          ))}
        </div>
      </section>

      {/* PROJETS */}
      <section className="bg-[var(--color-surface-alt)] border-y border-[var(--color-line)]">
        <div className="max-w-6xl mx-auto px-6 py-20">
          <SectionHeader
            eyebrow="Projets"
            title="Sélection récente"
            action={
              <Link to="/projects" className="text-sm text-[var(--color-brand)] hover:underline flex items-center gap-1">
                Voir tous <ArrowRight size={14} />
              </Link>
            }
          />
          <div className="grid md:grid-cols-2 gap-5">
            {featured.map((p) => (
              <ProjectCard key={p.id} project={p} />
            ))}
          </div>
        </div>
      </section>

      {/* EXPÉRIENCE */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <SectionHeader eyebrow="Parcours" title="Expérience professionnelle" />
        <div>
          {experience.map((e) => (
            <article
              key={e.role}
              className="grid grid-cols-1 md:grid-cols-[180px_1fr] gap-6 border-t border-[var(--color-line)] py-6"
            >
              <div className="text-[12px] font-mono text-[var(--color-ink-faint)]">{e.period}</div>
              <div>
                <h3 className="text-[16px] font-medium">{e.role} · <span className="text-[var(--color-ink-soft)]">{e.company}</span></h3>
                <ul className="mt-2 space-y-1">
                  {e.tasks.map((t) => (
                    <li key={t} className="text-[14px] text-[var(--color-ink-soft)] leading-relaxed flex gap-2">
                      <span className="text-[var(--color-brand)] mt-[3px] shrink-0">—</span>
                      {t}
                    </li>
                  ))}
                </ul>
                {e.stack && (
                  <p className="mt-3 text-[12px] font-mono text-[var(--color-brand)] opacity-80">{e.stack}</p>
                )}
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* CONTACT TEASER */}
      <section className="bg-[var(--color-surface-alt)] border-t border-[var(--color-line)]">
        <div className="max-w-6xl mx-auto px-6 py-20">
          <div className="mb-8">
            <p className="eyebrow mb-2">Contact</p>
            <h2 className="text-[24px] md:text-[28px] font-medium tracking-tight">Travaillons ensemble</h2>
            <p className="mt-2 text-[14px] text-[var(--color-ink-soft)]">
              Disponible pour missions freelance ou poste temps plein.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 gap-3">
            <ContactItem icon={Mail} label="Email" value="rasolofondraibethoony@gmail.com" href="mailto:rasolofondraibethoony@gmail.com" />
            <ContactItem icon={Linkedin} label="LinkedIn" value="linkedin.com/in/rasolofondraibe-thony-0ab57930a" href="https://www.linkedin.com/in/rasolofondraibe-thony-0ab57930a" />
            <ContactItem icon={Github} label="GitHub" value="github.com/Thony-dev-pro" href="https://github.com/Thony-dev-pro" />
            <ContactItem icon={MapPin} label="Localisation" value="Antananarivo, Madagascar" />
          </div>
        </div>
      </section>
    </>
  );
}
