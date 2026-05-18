import { createFileRoute } from "@tanstack/react-router";
import { SectionEyebrow } from "@/components/site/Section";
import { BLOG_POSTS } from "@/lib/site-data";
import { ArrowUpRight } from "lucide-react";

export const Route = createFileRoute("/blog")({
  head: () => ({
    meta: [
      { title: "The Literary Journal — Readers Review Circle" },
      { name: "description", content: "Essays on review craft, reading culture, monthly book highlights, author spotlights, and literary analysis from Readers Review Circle." },
      { property: "og:title", content: "Literary Journal — Readers Review Circle" },
      { property: "og:description", content: "Essays, author spotlights, and reading culture from our literary society." },
      { property: "og:url", content: "/blog" },
    ],
    links: [{ rel: "canonical", href: "/blog" }],
  }),
  component: BlogPage,
});

const CATS = ["All", "Review Craft", "Reading Culture", "Monthly Highlights", "Author Spotlight", "Literary Analysis"];

function BlogPage() {
  const [feature, ...rest] = BLOG_POSTS;
  return (
    <div className="mx-auto max-w-7xl px-6 lg:px-10 pt-20 pb-24">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <SectionEyebrow>The Journal</SectionEyebrow>
        <h1 className="font-serif text-5xl md:text-6xl text-foreground text-balance">
          Notes on Reading, Reviewing, and Literary Life
        </h1>
      </div>

      <article className="group grid lg:grid-cols-[1.2fr_1fr] gap-10 mb-20 pb-16 border-b border-border">
        <div className="aspect-[16/10] overflow-hidden rounded-sm bg-muted">
          <img
            src="https://images.unsplash.com/photo-1455390582262-044cdead277a?w=1200&q=80"
            alt=""
            loading="eager"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
          />
        </div>
        <div className="flex flex-col justify-center">
          <div className="text-[11px] uppercase tracking-[0.3em] text-gold mb-3">Featured · {feature.category}</div>
          <h2 className="font-serif text-4xl md:text-5xl text-foreground leading-tight text-balance group-hover:text-gold transition-colors">
            <a href="#">{feature.title}</a>
          </h2>
          <p className="mt-5 text-muted-foreground leading-relaxed text-lg">{feature.excerpt}</p>
          <div className="mt-6 text-sm text-muted-foreground">{feature.date}</div>
        </div>
      </article>

      <div className="flex flex-wrap gap-2 mb-12 justify-center">
        {CATS.map((c, i) => (
          <button
            key={c}
            className={`px-4 py-2 text-xs uppercase tracking-[0.2em] border rounded-full transition-colors ${
              i === 0 ? "bg-primary text-primary-foreground border-primary" : "border-border text-foreground/70 hover:border-gold hover:text-foreground"
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-14">
        {rest.map((p) => (
          <article key={p.id} className="group cursor-pointer">
            <div className="text-[11px] uppercase tracking-[0.3em] text-gold mb-3">{p.category}</div>
            <h3 className="font-serif text-2xl text-foreground leading-snug group-hover:text-gold transition-colors flex items-start gap-2">
              {p.title}
              <ArrowUpRight className="w-5 h-5 mt-1 shrink-0 opacity-0 group-hover:opacity-100 -translate-x-1 group-hover:translate-x-0 transition-all" />
            </h3>
            <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{p.excerpt}</p>
            <div className="mt-4 text-xs text-muted-foreground tracking-wide">{p.date}</div>
          </article>
        ))}
      </div>
    </div>
  );
}
