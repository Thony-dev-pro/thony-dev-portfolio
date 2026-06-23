import { createFileRoute } from "@tanstack/react-router";
import { BlogCard } from "@/components/BlogCard";
import { blogPosts } from "@/data/blogPosts";

export const Route = createFileRoute("/blog/")({
  head: () => ({
    meta: [
      { title: "Blog — Rasolofondraibe Thony" },
      { name: "description", content: "Articles techniques sur Node.js, PostgreSQL, Docker et l'architecture back-end." },
    ],
  }),
  component: BlogPage,
});

function BlogPage() {
  const featured = blogPosts.find((p) => p.featured);
  const rest = blogPosts.filter((p) => !p.featured);

  return (
    <section className="max-w-6xl mx-auto px-6 py-16">
      <header className="mb-10">
        <p className="eyebrow mb-2">Blog</p>
        <h1 className="text-[32px] font-medium tracking-tight">Mes réflexions sur le dev back-end</h1>
        <p className="mt-3 text-[15px] text-[var(--color-ink-soft)] max-w-2xl">
          Retours d'expérience, deep-dives techniques et notes pratiques pour développeurs Node.js.
        </p>
      </header>

      {featured && (
        <div className="mb-10">
          <BlogCard post={featured} featured />
        </div>
      )}

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
        {rest.map((p) => (
          <BlogCard key={p.slug} post={p} />
        ))}
      </div>
    </section>
  );
}
