import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Star, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SectionEyebrow } from "@/components/site/Section";

export const Route = createFileRoute("/reviews/best-of-2024")({
  head: () => ({
    meta: [
      { title: "The Best Indie Books of 2024: A Readers Review Circle Selection" },
      { name: "description", content: "Our annual curated guide to the best indie books of 2024, chosen by the Readers Review Circle community of 2000+ readers. Honest book reviews and standout recommendations." },
      { property: "og:title", content: "The Best Indie Books of 2024 — Readers Review Circle" },
      { property: "og:description", content: "Our annual curated guide to the best indie books of 2024, chosen by 2000+ devoted readers." },
      { property: "og:url", content: "https://reader-review-circle.lovable.app/reviews/best-of-2024" },
      { property: "og:type", content: "article" },
    ],
    links: [{ rel: "canonical", href: "https://reader-review-circle.lovable.app/reviews/best-of-2024" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Article",
          headline: "The Best Indie Books of 2024: A Readers Review Circle Selection",
          description: "A curated guide to the best indie books of 2024, selected by the Readers Review Circle community.",
          author: { "@type": "Organization", name: "Readers Review Circle" },
          publisher: { "@type": "Organization", name: "Readers Review Circle" },
          url: "https://reader-review-circle.lovable.app/reviews/best-of-2024",
          datePublished: "2024-12-15",
          dateModified: "2024-12-15",
        }),
      },
    ],
  }),
  component: BestOf2024Page,
});

const PICKS = [
  {
    rank: 1,
    title: "The Cartographer's Daughter",
    author: "Elena Marchetti",
    genre: "Fiction",
    rating: 5,
    image: "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=800&q=80",
    why: "A luminous, century-spanning meditation on inheritance, longing, and the maps we draw of one another. Marchetti's prose is a quiet symphony, and the novel's emotional architecture only deepens on rereading.",
    perfectFor: "Readers who loved The Invisible Bridge and Atonement.",
  },
  {
    rank: 2,
    title: "Hollow Tide",
    author: "Daniel Voss",
    genre: "Mystery",
    rating: 5,
    image: "https://images.unsplash.com/photo-1592496431122-2349e0fbc666?w=800&q=80",
    why: "A coastal noir with the bones of Highsmith and the heart of a folktale. Voss proves that atmosphere is a character, and the final chapter still divides our reading group — in the best way.",
    perfectFor: "Fans of Tana French and atmospheric, slow-burn crime.",
  },
  {
    rank: 3,
    title: "Letters She Never Sent",
    author: "Priya Anand",
    genre: "Romance",
    rating: 5,
    image: "https://images.unsplash.com/photo-1531901599143-df5010ab9438?w=800&q=80",
    why: "Aching, tender, and refreshingly grown-up. Anand writes a romance for readers who believe restraint can be the loudest declaration of love.",
    perfectFor: "Readers who want emotional intelligence over easy melodrama.",
  },
  {
    rank: 4,
    title: "Ashes of the Eight Towers",
    author: "R. M. Calder",
    genre: "Fantasy",
    rating: 5,
    image: "https://images.unsplash.com/photo-1621351183012-e2f9972dd9bf?w=800&q=80",
    why: "Worldbuilding of rare conviction. Calder writes as though every kingdom owes you a debt of detail — and then pays it in full across a sweeping, morally complex quest.",
    perfectFor: "Fantasy readers craving depth without the bloat.",
  },
  {
    rank: 5,
    title: "Composing a Life: Eudora Welty",
    author: "Harper Lassiter",
    genre: "Biography",
    rating: 5,
    image: "https://images.unsplash.com/photo-1589998059171-988d887df646?w=800&q=80",
    why: "A biographer who understands that the writer's room is also a portrait. Lassiter's study of Welty is essential for anyone who loves Southern letters and the quiet courage of a literary life.",
    perfectFor: "Biography readers and Welty devotees.",
  },
  {
    rank: 6,
    title: "The Quiet Empire",
    author: "James Whitlock",
    genre: "Business",
    rating: 4,
    image: "https://images.unsplash.com/photo-1629992101753-56d196c8aabb?w=800&q=80",
    why: "An unusually literate take on legacy companies and the leaders who steward them. No hype, no gurus — just craft, context, and the long view of business as a human institution.",
    perfectFor: "Leaders and founders who read for wisdom, not hacks.",
  },
  {
    rank: 7,
    title: "Slow Mornings",
    author: "Anya Bell",
    genre: "Self-help",
    rating: 4,
    image: "https://images.unsplash.com/photo-1535905557558-afc4877a26fc?w=800&q=80",
    why: "A gentle counterweight to productivity culture. Bell's chapters read like long letters from a wise older sister, and the advice lands because she admits her own struggles first.",
    perfectFor: "Anyone exhausted by hustle rhetoric and seeking a slower rhythm.",
  },
  {
    rank: 8,
    title: "The Last Forest Floor",
    author: "Dr. Amelia Crane",
    genre: "Non-fiction",
    rating: 4,
    image: "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=800&q=80",
    why: "Reportage that reads like nature writing of the highest order. Crane is urgent without ever feeling shrill, and her fieldwork lends every page the weight of witness.",
    perfectFor: "Readers of The Overstory and Braiding Sweetgrass.",
  },
];

const HONORABLE_MENTIONS = [
  { title: "The Salt Orchard", author: "Mira Delgado", genre: "Historical Fiction" },
  { title: "Parallel Mothers", author: "Joan Serrano", genre: "Literary Fiction" },
  { title: "Index of Quiet Things", author: "Tobias Hume", genre: "Essays" },
  { title: "Small Mercies, Big Cities", author: "Aisha Kowalski", genre: "Short Stories" },
];

function BestOf2024Page() {
  return (
    <div className="mx-auto max-w-7xl px-6 lg:px-10 pt-20 pb-24">
      <div className="max-w-3xl mx-auto text-center mb-16">
        <SectionEyebrow>Annual Selection</SectionEyebrow>
        <h1 className="font-serif text-5xl md:text-6xl text-foreground text-balance">
          The Best Indie Books of 2024
        </h1>
        <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
          A Readers Review Circle Selection. Each year our community of 2,000+ readers nominates, debates, and selects the indie titles that stayed with us long after the final page. These are the books we recommended most often — the ones that earned our trust through honest, thoughtful book reviews.
        </p>
      </div>

      <div className="max-w-3xl mx-auto mb-20 p-8 bg-card border border-border rounded-sm">
        <div className="flex items-start gap-4">
          <BookOpen className="w-6 h-6 text-gold shrink-0 mt-1" strokeWidth={1.5} />
          <div>
            <h2 className="font-serif text-2xl text-foreground mb-3">How We Chose</h2>
            <p className="text-muted-foreground leading-relaxed">
              Our selections come from submissions received through our review request form, titles discovered by members on Goodreads, and books that generated the strongest response in our monthly literary discussions. We read slowly, argue politely, and only include titles we would genuinely press into a friend's hands.
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-16 mb-24">
        {PICKS.map((pick) => (
          <article
            key={pick.title}
            className="grid lg:grid-cols-[200px_1fr] gap-8 items-start border-b border-border pb-16 last:border-0 last:pb-0"
          >
            <div className="relative">
              <div className="aspect-[2/3] overflow-hidden rounded-sm bg-muted">
                <img
                  src={pick.image}
                  alt={`Cover of ${pick.title} by ${pick.author}`}
                  loading="lazy"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -top-4 -left-4 w-10 h-10 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-serif text-xl">
                {pick.rank}
              </div>
            </div>
            <div>
              <div className="text-[11px] uppercase tracking-[0.3em] text-ink mb-2">{pick.genre}</div>
              <h3 className="font-serif text-3xl text-foreground mb-2">{pick.title}</h3>
              <div className="text-muted-foreground mb-4">by {pick.author}</div>
              <div className="flex items-center gap-1 mb-5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${i < pick.rating ? "text-gold fill-gold" : "text-muted"}`}
                  />
                ))}
                <span className="ml-2 text-sm text-muted-foreground">Circle rating</span>
              </div>
              <p className="text-foreground leading-relaxed mb-4">{pick.why}</p>
              <p className="text-sm text-muted-foreground italic">Perfect for: {pick.perfectFor}</p>
            </div>
          </article>
        ))}
      </div>

      <section className="bg-card/40 border-y border-border -mx-6 lg:-mx-10 px-6 lg:px-10 py-20 mb-20">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-serif text-3xl text-foreground mb-8 text-center">Honorable Mentions</h2>
          <p className="text-muted-foreground text-center mb-10 leading-relaxed">
            These titles didn't make the final eight, but they provoked some of the liveliest conversations in our circle — and several are already shaping our early 2025 reading list.
          </p>
          <div className="grid sm:grid-cols-2 gap-4">
            {HONORABLE_MENTIONS.map((book) => (
              <div key={book.title} className="p-5 bg-background border border-border rounded-sm">
                <div className="font-serif text-lg text-foreground">{book.title}</div>
                <div className="text-sm text-muted-foreground">by {book.author}</div>
                <div className="text-[11px] uppercase tracking-[0.25em] text-ink mt-2">{book.genre}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-3xl mx-auto text-center mb-16">
        <h2 className="font-serif text-3xl text-foreground mb-4">Want Your Book Considered Next Year?</h2>
        <p className="text-muted-foreground leading-relaxed mb-8">
          We review indie, hybrid, and traditionally published books year-round. Submit your title and our founder Bertha Reagan will personally review your request.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3">
          <Button asChild variant="gold" size="xl">
            <Link to="/submit">Submit a Book <ArrowRight className="w-4 h-4" /></Link>
          </Button>
          <Button asChild variant="goldOutline" size="xl">
            <Link to="/reviews">Browse All Reviews</Link>
          </Button>
        </div>
      </section>

      <section className="max-w-3xl mx-auto text-center">
        <p className="text-sm text-muted-foreground">
          Looking for more honest book reviews and curated recommendations? Explore our{" "}
          <Link to="/reviews" className="text-foreground underline hover:text-gold">full review library</Link>{" "}
          or{" "}
          <Link to="/contact" className="text-foreground underline hover:text-gold">contact Bertha Reagan</Link>{" "}
          directly.
        </p>
      </section>
    </div>
  );
}
