import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Mail, Linkedin, Github, MapPin, Send, CheckCircle2 } from "lucide-react";
import { ContactItem } from "@/components/ContactItem";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Rasolofondraibe Thony" },
      { name: "description", content: "Contactez Rasolofondraibe Thony pour une mission freelance ou un poste Full Stack." },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    subject: "Mission freelance",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const { firstName, lastName, email, subject, message } = form;
    const body = `Prénom: ${firstName}\nNom: ${lastName}\nEmail: ${email}\n\n${message}`;
    window.location.href = `mailto:rasolofondraibethoony@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setSent(true);
  };

  return (
    <section className="max-w-6xl mx-auto px-6 py-16">
      <header className="mb-12 max-w-2xl">
        <p className="eyebrow mb-2">Contact</p>
        <h1 className="text-[32px] font-medium tracking-tight">Parlons de votre projet</h1>
        <p className="mt-3 text-[15px] text-[var(--color-ink-soft)]">
          Réponse sous 24h. Disponible pour missions freelance ou poste temps plein.
        </p>
      </header>

      <div className="grid lg:grid-cols-2 gap-10">
        <div className="flex flex-col gap-3">
          <ContactItem icon={Mail} label="Email" value="rasolofondraibethoony@gmail.com" href="mailto:rasolofondraibethoony@gmail.com" />
          <ContactItem icon={Linkedin} label="LinkedIn" value="linkedin.com/in/rasolofondraibe-thony-0ab57930a" href="https://www.linkedin.com/in/rasolofondraibe-thony-0ab57930a" />
          <ContactItem icon={Github} label="GitHub" value="github.com/Thony-dev-pro" href="https://github.com/Thony-dev-pro" />
          <ContactItem icon={MapPin} label="Localisation" value="Antananarivo, Madagascar" />
          <p className="text-[13px] text-[var(--color-ink-soft)] mt-3 px-1">
            Réponse sous 24h · Disponible pour freelance
          </p>
        </div>

        <div className="border border-[var(--color-line)] rounded-[12px] p-6 md:p-8 bg-white">
          {sent ? (
            <div className="flex flex-col items-center justify-center text-center py-12 gap-3">
              <div className="w-12 h-12 rounded-full bg-[var(--color-brand-soft)] text-[var(--color-brand)] flex items-center justify-center">
                <CheckCircle2 size={24} />
              </div>
              <h2 className="text-[18px] font-medium text-[var(--color-brand-deep)]">Message envoyé</h2>
              <p className="text-[14px] text-[var(--color-ink-soft)] max-w-sm">
                Merci ! Je reviens vers vous dans les 24h.
              </p>
              <button onClick={() => setSent(false)} className="btn-outline mt-2 text-sm">
                Envoyer un autre message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div className="grid grid-cols-2 gap-4">
                <Field label="Prénom">
                  <input className="input-base" required value={form.firstName} onChange={(e) => setForm({ ...form, firstName: e.target.value })} />
                </Field>
                <Field label="Nom">
                  <input className="input-base" required value={form.lastName} onChange={(e) => setForm({ ...form, lastName: e.target.value })} />
                </Field>
              </div>
              <Field label="Email">
                <input type="email" className="input-base" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
              </Field>
              <Field label="Sujet">
                <select className="input-base" value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })}>
                  <option>Mission freelance</option>
                  <option>CDI</option>
                  <option>Question</option>
                  <option>Autre</option>
                </select>
              </Field>
              <Field label="Message">
                <textarea
                  rows={5}
                  className="input-base resize-none"
                  required
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                />
              </Field>
              <button type="submit" className="btn-primary mt-2 self-start">
                <Send size={14} /> Envoyer le message
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="text-[12px] font-medium text-[var(--color-ink)]">{label}</span>
      {children}
    </label>
  );
}
