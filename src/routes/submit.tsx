import { createFileRoute } from "@tanstack/react-router";
import { Mail } from "lucide-react";
import { SectionEyebrow } from "@/components/site/Section";

const RECIPIENT = "berthareagan93@yahoo.com";
const JOTFORM_URL = "https://form.jotform.com/261793607544061";

export const Route = createFileRoute("/submit")({
  head: () => ({
    meta: [
      { title: "Submit Your Book for Review — Readers Review Circle" },
      { name: "description", content: "Submit your book for professional literary review by Readers Review Circle's 2,000+ member literary society." },
      { property: "og:title", content: "Submit Your Book — Readers Review Circle" },
      { property: "og:description", content: "Have your book read and reviewed by our 2000+ member literary society." },
      { property: "og:url", content: "/submit" },
    ],
    links: [{ rel: "canonical", href: "/submit" }],
  }),
  component: SubmitPage,
});

function SubmitPage() {
  return (
    <div className="mx-auto max-w-6xl px-6 lg:px-10 pt-20 pb-24">
      <div className="grid lg:grid-cols-[1fr_1.6fr] gap-16">
        <aside className="lg:sticky lg:top-32 self-start">
          <SectionEyebrow>For Authors</SectionEyebrow>
          <h1 className="font-serif text-4xl md:text-5xl text-foreground leading-tight text-balance">
            Submit Your Book for Review
          </h1>
          <p className="mt-6 text-muted-foreground leading-relaxed">
            All submissions are read personally by our founder Bertha Reagan and matched with reviewers from our 2,000+ member Circle whose tastes align with your work.
          </p>
          <div className="mt-10 p-6 border border-gold/30 bg-gold/5 rounded-sm">
            <div className="flex items-start gap-3">
              <Mail className="w-5 h-5 text-gold mt-0.5" />
              <div>
                <div className="text-xs uppercase tracking-[0.25em] text-ink mb-1">Questions?</div>
                <a href={`mailto:${RECIPIENT}`} className="font-serif text-lg text-foreground hover:text-gold break-all">
                  {RECIPIENT}
                </a>
              </div>
            </div>
          </div>
          <p className="mt-6 text-xs text-muted-foreground italic">
            Your book submission will be reviewed by Readers Review Circle and considered for professional literary feedback.
          </p>
          <p className="mt-4 text-sm text-muted-foreground">
            Having trouble with the form?{" "}
            <a href={JOTFORM_URL} target="_blank" rel="noopener noreferrer" className="text-gold hover:underline">
              Open it in a new tab
            </a>.
          </p>
        </aside>

        <div className="bg-card border border-border rounded-sm overflow-hidden">
          <iframe
            title="Book Submission Form"
            src={JOTFORM_URL}
            className="w-full"
            style={{ minHeight: "1200px", border: 0 }}
            allow="geolocation; microphone; camera; fullscreen"
          />
        </div>
      </div>
    </div>
  );
}
