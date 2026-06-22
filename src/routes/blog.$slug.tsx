import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Clock, Linkedin, Twitter, Link as LinkIcon, ArrowLeft, ArrowRight } from "lucide-react";
import { blogPosts, type BlogPost } from "@/data/blogPosts";

export const Route = createFileRoute("/blog/$slug")({
  loader: ({ params }): { post: BlogPost; idx: number } => {
    const idx = blogPosts.findIndex((p) => p.slug === params.slug);
    if (idx === -1) throw notFound();
    return { post: blogPosts[idx], idx };
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: `${loaderData?.post.title ?? "Article"} — Blog` },
      { name: "description", content: loaderData?.post.excerpt ?? "" },
    ],
  }),
  component: BlogPostPage,
});

// Tiny markdown renderer for ## headings, paragraphs, code fences
function renderMarkdown(md: string) {
  const blocks: React.ReactNode[] = [];
  const lines = md.split("\n");
  let i = 0;
  let key = 0;
  while (i < lines.length) {
    const line = lines[i];
    if (line.startsWith("```")) {
      const buf: string[] = [];
      i++;
      while (i < lines.length && !lines[i].startsWith("```")) {
        buf.push(lines[i]);
        i++;
      }
      i++;
      blocks.push(
        <pre key={key++} className="rounded-[12px] border border-[var(--color-line)] bg-[var(--color-surface-alt)] p-5 my-5 font-mono text-[13px] leading-[1.7] overflow-x-auto">
          <code>{buf.join("\n")}</code>
        </pre>
      );
    } else if (line.startsWith("## ")) {
      blocks.push(
        <h2 key={key++} id={slugify(line.slice(3))} className="text-[22px] font-medium mt-10 mb-3 scroll-mt-20">
          {line.slice(3)}
        </h2>
      );
      i++;
    } else if (line.startsWith("- ")) {
      const items: string[] = [];
      while (i < lines.length && lines[i].startsWith("- ")) {
        items.push(lines[i].slice(2));
        i++;
      }
      blocks.push(
        <ul key={key++} className="list-disc pl-6 my-4 space-y-1.5 text-[15px] text-[var(--color-ink-soft)] leading-relaxed">
          {items.map((it, j) => <li key={j}>{renderInline(it)}</li>)}
        </ul>
      );
    } else if (line.trim() === "") {
      i++;
    } else {
      blocks.push(
        <p key={key++} className="text-[15px] text-[var(--color-ink-soft)] leading-relaxed my-4">
          {renderInline(line)}
        </p>
      );
      i++;
    }
  }
  return blocks;
}

function renderInline(text: string): React.ReactNode {
  const parts = text.split(/(`[^`]+`)/g);
  return parts.map((p, i) =>
    p.startsWith("`") && p.endsWith("`") ? (
      <code key={i} className="font-mono text-[0.9em] bg-[var(--color-surface-mute)] px-1.5 py-0.5 rounded">
        {p.slice(1, -1)}
      </code>
    ) : (
      <span key={i}>{p}</span>
    )
  );
}

function slugify(s: string) {
  return s.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

function BlogPostPage() {
  const { post, idx } = Route.useLoaderData();
  const headings = post.body.split("\n").filter((l: string) => l.startsWith("## ")).map((l: string) => l.slice(3));
  const recommended = blogPosts.filter((p) => p.slug !== post.slug).slice(0, 3);
  const prev = idx > 0 ? blogPosts[idx - 1] : null;
  const next = idx < blogPosts.length - 1 ? blogPosts[idx + 1] : null;

  return (
    <article className="max-w-6xl mx-auto px-6 py-12 grid lg:grid-cols-[1fr_280px] gap-12">
      <div>
        <Link to="/blog" className="inline-flex items-center gap-1.5 text-sm text-[var(--color-ink-soft)] hover:text-[var(--color-brand)] mb-8">
          <ArrowLeft size={14} /> Retour au blog
        </Link>

        <header className="mb-8">
          <span className="eyebrow">{post.category}</span>
          <h1 className="text-[32px] md:text-[38px] font-medium tracking-tight leading-tight mt-2">
            {post.title}
          </h1>
          <div className="flex items-center gap-4 mt-4 text-[13px] text-[var(--color-ink-faint)]">
            <span>{post.date}</span>
            <span className="flex items-center gap-1"><Clock size={12} /> {post.readTime}</span>
          </div>
        </header>

        <div className="aspect-[16/8] bg-gray-200 rounded-[12px] mb-10" />

        <div className="prose-content">
          {renderMarkdown(post.body)}
        </div>

        <div className="mt-12 pt-6 border-t border-[var(--color-line)] flex items-center gap-3">
          <span className="text-sm text-[var(--color-ink-soft)] mr-2">Partager :</span>
          <a href="#" className="btn-outline !py-1.5 !px-3 text-xs"><Linkedin size={13} /> LinkedIn</a>
          <a href="#" className="btn-outline !py-1.5 !px-3 text-xs"><Twitter size={13} /> Twitter</a>
          <button className="btn-outline !py-1.5 !px-3 text-xs"><LinkIcon size={13} /> Copier</button>
        </div>

        <nav className="mt-10 grid sm:grid-cols-2 gap-4">
          {prev ? (
            <Link to="/blog/$slug" params={{ slug: prev.slug }} className="border border-[var(--color-line)] rounded-[12px] p-5 hover:border-[var(--color-brand)] transition-colors">
              <div className="flex items-center gap-1.5 text-xs text-[var(--color-ink-faint)] mb-2"><ArrowLeft size={12} /> Précédent</div>
              <div className="text-[14px] font-medium leading-snug">{prev.title}</div>
            </Link>
          ) : <div />}
          {next ? (
            <Link to="/blog/$slug" params={{ slug: next.slug }} className="border border-[var(--color-line)] rounded-[12px] p-5 hover:border-[var(--color-brand)] transition-colors text-right">
              <div className="flex items-center justify-end gap-1.5 text-xs text-[var(--color-ink-faint)] mb-2">Suivant <ArrowRight size={12} /></div>
              <div className="text-[14px] font-medium leading-snug">{next.title}</div>
            </Link>
          ) : <div />}
        </nav>
      </div>

      <aside className="hidden lg:block">
        <div className="sticky top-20 flex flex-col gap-6">
          <div className="border border-[var(--color-line)] rounded-[12px] p-5 bg-white">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[var(--color-brand-soft)] text-[var(--color-brand-deep)] flex items-center justify-center font-medium">AM</div>
              <div>
                <div className="text-[14px] font-medium">Alexandre Martin</div>
                <div className="text-[12px] text-[var(--color-ink-soft)]">Dev Node.js back-end</div>
              </div>
            </div>
          </div>

          {headings.length > 0 && (
            <div>
              <p className="eyebrow mb-3">Sommaire</p>
              <ul className="flex flex-col gap-2 text-[13px]">
                {headings.map((h: string) => (
                  <li key={h}>
                    <a href={`#${slugify(h)}`} className="text-[var(--color-ink-soft)] hover:text-[var(--color-brand)] transition-colors">
                      {h}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div>
            <p className="eyebrow mb-3">À lire ensuite</p>
            <ul className="flex flex-col gap-3">
              {recommended.map((r) => (
                <li key={r.slug}>
                  <Link to="/blog/$slug" params={{ slug: r.slug }} className="block border border-[var(--color-line)] rounded-[8px] p-3 hover:border-[var(--color-brand)] transition-colors">
                    <div className="text-[13px] font-medium leading-snug">{r.title}</div>
                    <div className="text-[11px] text-[var(--color-ink-faint)] mt-1">{r.readTime}</div>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </aside>
    </article>
  );
}
