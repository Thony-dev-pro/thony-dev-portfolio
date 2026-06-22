import { Link } from "@tanstack/react-router";
import { Clock } from "lucide-react";
import type { BlogPost } from "@/data/blogPosts";

export function BlogCard({ post, featured = false }: { post: BlogPost; featured?: boolean }) {
  return (
    <Link
      to="/blog/$slug"
      params={{ slug: post.slug }}
      className={`group flex flex-col gap-3 border border-[var(--color-line)] rounded-[12px] overflow-hidden bg-white hover:border-[var(--color-brand)] transition-colors ${
        featured ? "md:flex-row" : ""
      }`}
    >
      <div
        className={`bg-gray-200 ${featured ? "md:w-1/2 aspect-[16/9] md:aspect-auto" : "aspect-[16/9]"}`}
      />
      <div className={`flex flex-col gap-2 p-5 ${featured ? "md:w-1/2 md:p-8 justify-center" : ""}`}>
        <span className="eyebrow">{post.category}</span>
        <h3 className={`font-medium leading-snug group-hover:text-[var(--color-brand)] transition-colors ${featured ? "text-[22px]" : "text-[16px]"}`}>
          {post.title}
        </h3>
        <p className="text-[13px] text-[var(--color-ink-soft)] leading-relaxed">
          {post.excerpt}
        </p>
        <div className="flex items-center gap-3 text-[12px] text-[var(--color-ink-faint)] mt-2">
          <span>{post.date}</span>
          <span className="flex items-center gap-1"><Clock size={12} /> {post.readTime}</span>
        </div>
      </div>
    </Link>
  );
}
