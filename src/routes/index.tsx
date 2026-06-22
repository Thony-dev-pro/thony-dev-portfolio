import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Mail, Linkedin, Github, MapPin } from "lucide-react";
import { CodeBlock } from "@/components/CodeBlock";
import { StatBar } from "@/components/StatBar";
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
      { title: "Alexandre Martin — Développeur Node.js back-end" },
      { name: "description", content: "Architectures back-end robustes en Node.js, microservices et cloud. 5+ ans d'expérience." },
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
          <p className="eyebrow mb-4">Développeur back-end</p>
          <h1 className="text-[32px] md:text-[38px] font-medium leading-[1.15] tracking-tight">
            Alexandre <span className="text-[var(--color-brand)]">Martin</span>
            <br />
            Node.js · API · Cloud
          </h1>
          <p className="mt-5 text-[15px] text-[var(--color-ink-soft)] leading-relaxed max-w-lg">
            Je conçois des architectures back-end robustes et scalables.
            Spécialisé en Node.js, microservices REST/GraphQL et déploiement cloud.
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

      <StatBar />

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
                <p className="mt-2 text-[14px] text-[var(--color-ink-soft)] leading-relaxed">{e.description}</p>
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
            <ContactItem icon={Mail} label="Email" value="alex@martin.dev" href="mailto:alex@martin.dev" />
            <ContactItem icon={Linkedin} label="LinkedIn" value="linkedin.com/in/alexmartin" href="https://linkedin.com/in/alexmartin" />
            <ContactItem icon={Github} label="GitHub" value="github.com/alexmartin" href="https://github.com/alexmartin" />
            <ContactItem icon={MapPin} label="Localisation" value="Paris, France · Remote OK" />
          </div>
        </div>
      </section>
    </>
  );
}
