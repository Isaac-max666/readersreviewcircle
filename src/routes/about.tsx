import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { SectionEyebrow, Ornament } from "@/components/site/Section";
import founder from "@/assets/founder-bertha.jpg";
import { ArrowRight } from "lucide-react";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Bertha Reagan & Readers Review Circle" },
      { name: "description", content: "Founded by Bertha Reagan, Readers Review Circle is a 2000+ member literary society devoted to thoughtful, honest book reviews." },
      { property: "og:title", content: "About — Readers Review Circle" },
      { property: "og:description", content: "Bertha Reagan's founder story, our mission, and how we serve authors and readers." },
      { property: "og:url", content: "/about" },
    ],
    links: [{ rel: "canonical", href: "/about" }],
  }),
  component: AboutPage,
});

const values = [
  { t: "Slow Reading", d: "We refuse to skim. A book we review is a book we have actually read — cover to cover, twice when needed." },
  { t: "Honest Generosity", d: "Our reviews are kind because they are candid. Authors deserve readers who tell them the truth with care." },
  { t: "Literary Standards", d: "We hold every book — regardless of genre — to the standard of considered craft." },
  { t: "A Reader-First Voice", d: "We write for the reader trying to decide what to read next. That is our compass." },
];

function AboutPage() {
  return (
    <div>
      <section className="mx-auto max-w-7xl px-6 lg:px-10 pt-24 pb-20">
        <div className="grid lg:grid-cols-[1fr_1.1fr] gap-16 items-center">
          <div className="relative">
            <div className="aspect-[4/5] overflow-hidden rounded-sm">
              <img src={founder} alt="Bertha Reagan, founder of Readers Review Circle" width={900} height={1100} loading="eager" className="w-full h-full object-cover" />
            </div>
            <div className="absolute -bottom-6 -right-6 bg-gold text-gold-foreground px-6 py-4 font-serif italic">
              <div className="text-xs tracking-widest uppercase mb-1 not-italic">Founder</div>
              <div className="text-xl">Bertha Reagan</div>
            </div>
          </div>
          <div>
            <SectionEyebrow>Our Story</SectionEyebrow>
            <h1 className="font-serif text-5xl md:text-6xl leading-tight text-foreground text-balance">
              A small circle of readers, grown into a literary society.
            </h1>
            <div className="mt-8 space-y-5 text-foreground/90 leading-relaxed">
              <p>
                Readers Review Circle began at Bertha Reagan's kitchen table in 2018 — twelve readers, one shared shelf, and an unhurried promise to take every book seriously.
              </p>
              <p>
                Almost a decade later, that promise has held. Today the Circle gathers more than{" "}
                <span className="text-foreground font-medium">2,000 devoted readers</span> on Goodreads and beyond, contributing reviews that authors quote, publishers reference, and readers genuinely trust.
              </p>
              <p>
                We remain small in spirit. Every review is read by a person. Every submission receives a personal response from our founder.
              </p>
            </div>
            <div className="mt-10">
              <Button asChild variant="gold" size="lg">
                <Link to="/submit">Submit Your Book <ArrowRight className="w-4 h-4" /></Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-card/40 border-y border-border">
        <div className="mx-auto max-w-5xl px-6 lg:px-10 py-24 text-center">
          <SectionEyebrow>Our Mission</SectionEyebrow>
          <h2 className="font-serif text-4xl md:text-5xl text-balance text-foreground">
            To make the bookworld <span className="italic gold-text">smaller, slower, and more honest</span>.
          </h2>
          <Ornament />
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            We exist to give authors readers who think, and to give readers reviews they can trust. Everything else is a footnote.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 lg:px-10 py-24">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <SectionEyebrow>What We Stand For</SectionEyebrow>
          <h2 className="font-serif text-4xl md:text-5xl text-foreground">Literary Values</h2>
        </div>
        <div className="grid md:grid-cols-2 gap-px bg-border">
          {values.map((v, i) => (
            <div key={v.t} className="bg-background p-10">
              <div className="text-gold font-serif text-2xl mb-4">0{i + 1}</div>
              <h3 className="font-serif text-2xl text-foreground mb-3">{v.t}</h3>
              <p className="text-muted-foreground leading-relaxed">{v.d}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-6 lg:px-10 pb-24">
        <div className="grid md:grid-cols-3 gap-px bg-border border border-border">
          {[
            { n: "180+", l: "Authors served" },
            { n: "2,000+", l: "Active readers" },
            { n: "600+", l: "Published reviews" },
          ].map((s) => (
            <div key={s.l} className="bg-background py-12 text-center">
              <div className="font-serif text-5xl gold-text">{s.n}</div>
              <div className="mt-3 text-xs uppercase tracking-[0.3em] text-muted-foreground">{s.l}</div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
