import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { REVIEWS, GENRES } from "@/lib/site-data";
import { ReviewCard } from "./index";
import { SectionEyebrow } from "@/components/site/Section";

export const Route = createFileRoute("/reviews")({
  head: () => ({
    meta: [
      { title: "Review Library — Readers Review Circle" },
      { name: "description", content: "Browse our searchable archive of literary reviews across fiction, romance, mystery, fantasy, biography, business, self-help and non-fiction." },
      { property: "og:title", content: "Review Library — Readers Review Circle" },
      { property: "og:description", content: "Honest, considered book reviews from our 2000+ member literary society." },
      { property: "og:url", content: "/reviews" },
    ],
    links: [{ rel: "canonical", href: "/reviews" }],
  }),
  component: ReviewsPage,
});

function ReviewsPage() {
  const [q, setQ] = useState("");
  const [genre, setGenre] = useState<string>("All");

  const filtered = useMemo(() => {
    return REVIEWS.filter((r) => {
      const matchG = genre === "All" || r.genre === genre;
      const matchQ = !q || (r.title + r.author + r.summary).toLowerCase().includes(q.toLowerCase());
      return matchG && matchQ;
    });
  }, [q, genre]);

  return (
    <div className="mx-auto max-w-7xl px-6 lg:px-10 pt-20 pb-24">
      <div className="text-center max-w-3xl mx-auto mb-14">
        <SectionEyebrow>The Library</SectionEyebrow>
        <h1 className="font-serif text-5xl md:text-6xl text-foreground text-balance">
          Reviews from the Circle
        </h1>
        <p className="mt-6 text-muted-foreground text-lg">
          Every review is written by a member of our reading community and edited for clarity, generosity, and honesty.
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-4 mb-10 max-w-3xl mx-auto">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search title, author, or theme..."
            aria-label="Search reviews"
            className="pl-10 h-12 bg-card border-border"
          />
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-2 mb-14">
        {["All", ...GENRES].map((g) => (
          <button
            key={g}
            onClick={() => setGenre(g)}
            className={`px-4 py-2 text-xs uppercase tracking-[0.2em] border rounded-full transition-colors ${
              genre === g
                ? "bg-primary text-primary-foreground border-primary"
                : "bg-transparent border-border text-foreground/90 hover:border-gold hover:text-foreground"
            }`}
          >
            {g}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <div className="text-center py-20 font-serif italic text-muted-foreground text-xl">
          No reviews match that search — try another title.
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map((r) => <ReviewCard key={r.id} r={r} />)}
        </div>
      )}
    </div>
  );
}
