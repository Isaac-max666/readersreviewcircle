import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ArrowRight, Star, Quote, BookOpen, Users, MessageCircle, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { SectionEyebrow, SectionTitle, Ornament } from "@/components/site/Section";
import { REVIEWS, TESTIMONIALS, BLOG_POSTS } from "@/lib/site-data";
import heroBooks from "@/assets/hero-books.jpg";
import openBook from "@/assets/open-book.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Readers Review Circle — Professional Book Reviews That Build Reader Trust" },
      { name: "description", content: "Readers Review Circle is a literary review network of 2000+ passionate readers delivering thoughtful, honest book reviews for authors and readers worldwide." },
      { property: "og:title", content: "Readers Review Circle — Professional Book Reviews" },
      { property: "og:description", content: "2000+ devoted readers. Honest reviews. Trusted literary recommendations." },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: HomePage,
});

const stats = [
  { n: "2,000+", l: "Devoted Readers", icon: Users },
  { n: "600+", l: "Published Reviews", icon: BookOpen },
  { n: "180+", l: "Author Collaborations", icon: Sparkles },
  { n: "Weekly", l: "Literary Discussions", icon: MessageCircle },
];

function HomePage() {
  const featured = REVIEWS.slice(0, 3);
  const recent = BLOG_POSTS.slice(0, 3);

  return (
    <div>
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <img src={heroBooks} alt="" width={1600} height={1200} className="w-full h-full object-cover opacity-25 dark:opacity-30" />
          <div className="absolute inset-0 bg-gradient-to-b from-background via-background/85 to-background" />
        </div>

        <div className="mx-auto max-w-7xl px-6 lg:px-10 pt-20 pb-28 lg:pt-32 lg:pb-40">
          <div className="max-w-4xl mx-auto text-center">
            <div className="animate-fade-up">
              <SectionEyebrow>Est. literary society · Goodreads</SectionEyebrow>
            </div>
            <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl leading-[1.05] tracking-tight text-foreground text-balance animate-fade-up">
              Professional Book Reviews <span className="italic gold-text">That Build</span> Reader Trust
            </h1>
            <p className="mt-8 text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed animate-fade-up-delay">
              Readers Review Circle is a thriving literary review network of{" "}
              <span className="text-foreground font-medium">2,000+ passionate readers</span>{" "}
              delivering thoughtful, honest book reviews for authors and readers worldwide.
            </p>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-3 animate-fade-up-delay-2">
              <Button asChild variant="gold" size="xl">
                <Link to="/submit">Submit Your Book <ArrowRight className="w-4 h-4" /></Link>
              </Button>
              <Button asChild variant="goldOutline" size="xl">
                <Link to="/reviews">Explore Reviews</Link>
              </Button>
              <Button asChild variant="ghost" size="xl">
                <Link to="/contact">Contact Bertha</Link>
              </Button>
            </div>
            <Ornament />
            <p className="font-serif italic text-base text-muted-foreground">
              "We read slowly. We review honestly. We write so authors are better understood."
            </p>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="border-y border-border bg-card/40 backdrop-blur">
        <div className="mx-auto max-w-7xl px-6 lg:px-10 py-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-y-10 gap-x-6">
            {stats.map((s) => (
              <div key={s.l} className="text-center">
                <s.icon className="w-5 h-5 text-gold mx-auto mb-3" strokeWidth={1.5} />
                <div className="font-serif text-4xl md:text-5xl text-foreground">{s.n}</div>
                <div className="mt-2 text-xs uppercase tracking-[0.25em] text-muted-foreground">{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURED REVIEWS */}
      <section className="mx-auto max-w-7xl px-6 lg:px-10 py-28">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14">
          <div>
            <SectionEyebrow>From the Library</SectionEyebrow>
            <SectionTitle>Featured Review Highlights</SectionTitle>
          </div>
          <Button asChild variant="goldOutline">
            <Link to="/reviews">Browse Full Library <ArrowRight className="w-4 h-4" /></Link>
          </Button>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {featured.map((r) => (
            <ReviewCard key={r.id} r={r} />
          ))}
        </div>
      </section>

      {/* TESTIMONIAL CAROUSEL */}
      <TestimonialMarquee />

      {/* RECENT DISCUSSIONS */}
      <section className="mx-auto max-w-7xl px-6 lg:px-10 py-28">
        <div className="grid lg:grid-cols-[1.1fr_1fr] gap-16 items-center">
          <div className="relative aspect-[4/3] rounded-sm overflow-hidden">
            <img src={openBook} alt="Open book with golden bookmark" width={1200} height={900} loading="lazy" className="w-full h-full object-cover" />
            <div className="absolute inset-0 ring-1 ring-inset ring-gold/20" />
          </div>
          <div>
            <SectionEyebrow>This Week in the Circle</SectionEyebrow>
            <SectionTitle>Recent Literary Discussions</SectionTitle>
            <div className="mt-10 space-y-7">
              {recent.map((p) => (
                <article key={p.id} className="group border-b border-border pb-7 last:border-0">
                  <div className="text-[11px] uppercase tracking-[0.25em] text-gold mb-2">{p.category}</div>
                  <h3 className="font-serif text-2xl text-foreground group-hover:text-gold transition-colors">
                    <Link to="/blog">{p.title}</Link>
                  </h3>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{p.excerpt}</p>
                  <div className="mt-3 text-xs text-muted-foreground tracking-wide">{p.date}</div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-5xl px-6 lg:px-10 py-20">
        <div className="relative overflow-hidden rounded-sm bg-primary text-primary-foreground px-8 py-20 md:px-16 md:py-24 text-center">
          <div className="absolute -top-20 -right-20 w-72 h-72 bg-gold/20 rounded-full blur-3xl" />
          <div className="absolute -bottom-20 -left-20 w-72 h-72 bg-gold/10 rounded-full blur-3xl" />
          <div className="relative">
            <SectionEyebrow>For Authors</SectionEyebrow>
            <h2 className="font-serif text-4xl md:text-5xl text-balance">
              Have your book read by people who <span className="italic gold-text">truly read</span>.
            </h2>
            <p className="mt-6 text-primary-foreground/75 max-w-xl mx-auto">
              Send your work to our circle for considered, professional literary review. We respond to every submission personally.
            </p>
            <Button asChild variant="gold" size="xl" className="mt-10">
              <Link to="/submit">Submit Your Book for Review <ArrowRight className="w-4 h-4" /></Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}

export function ReviewCard({ r }: { r: typeof REVIEWS[number] }) {
  return (
    <Card className="group overflow-hidden border-border bg-card hover:border-gold/50 transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_20px_60px_-15px_oklch(0.72_0.13_75/0.25)]">
      <div className="aspect-[3/4] overflow-hidden bg-muted">
        <img src={r.cover} alt={r.title} loading="lazy" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
      </div>
      <div className="p-7">
        <div className="text-[10px] uppercase tracking-[0.3em] text-gold mb-3">{r.genre}</div>
        <h3 className="font-serif text-2xl text-foreground leading-tight">{r.title}</h3>
        <p className="mt-1 text-sm italic text-muted-foreground">by {r.author}</p>
        <div className="flex items-center gap-0.5 mt-4">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star key={i} className={`w-3.5 h-3.5 ${i < r.rating ? "fill-gold text-gold" : "text-border"}`} />
          ))}
        </div>
        <p className="mt-5 text-sm text-muted-foreground leading-relaxed line-clamp-3">{r.summary}</p>
        <div className="mt-6 pt-5 border-t border-border flex items-center justify-between text-xs">
          <span className="text-foreground/80">Reviewed by {r.reviewer}</span>
          <span className="text-muted-foreground">{r.date}</span>
        </div>
      </div>
    </Card>
  );
}

function TestimonialMarquee() {
  const [idx, setIdx] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setIdx((i) => (i + 1) % TESTIMONIALS.length), 6000);
    return () => clearInterval(t);
  }, []);
  return (
    <section className="bg-card/40 border-y border-border">
      <div className="mx-auto max-w-4xl px-6 lg:px-10 py-24 text-center">
        <Quote className="w-10 h-10 text-gold/70 mx-auto mb-8" strokeWidth={1} />
        <div className="relative min-h-[180px]">
          {TESTIMONIALS.map((t, i) => (
            <div
              key={i}
              className={`absolute inset-0 transition-opacity duration-1000 ${i === idx ? "opacity-100" : "opacity-0 pointer-events-none"}`}
            >
              <p className="font-serif text-2xl md:text-3xl text-foreground leading-relaxed italic text-balance">
                "{t.quote}"
              </p>
              <Ornament />
              <div className="text-foreground font-medium">{t.name}</div>
              <div className="text-xs uppercase tracking-[0.25em] text-muted-foreground mt-1">{t.role}</div>
            </div>
          ))}
        </div>
        <div className="flex items-center justify-center gap-2 mt-10">
          {TESTIMONIALS.map((_, i) => (
            <button
              key={i}
              onClick={() => setIdx(i)}
              aria-label={`Testimonial ${i + 1}`}
              className={`h-1 transition-all ${i === idx ? "w-8 bg-gold" : "w-4 bg-border"}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
