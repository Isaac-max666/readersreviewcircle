import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Mail, Upload, ArrowRight, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { SectionEyebrow, Ornament } from "@/components/site/Section";
import { GENRES } from "@/lib/site-data";
import { toast } from "sonner";

const RECIPIENT = "berthareagan93@yahoo.com";

export const Route = createFileRoute("/submit")({
  head: () => ({
    meta: [
      { title: "Submit Your Book for Review — Readers Review Circle" },
      { name: "description", content: "Submit your book directly to founder Bertha Reagan for professional literary review by Readers Review Circle." },
      { property: "og:title", content: "Submit Your Book — Readers Review Circle" },
      { property: "og:description", content: "Have your book read and reviewed by our 2000+ member literary society." },
      { property: "og:url", content: "/submit" },
    ],
    links: [{ rel: "canonical", href: "/submit" }],
  }),
  component: SubmitPage,
});

function SubmitPage() {
  const [form, setForm] = useState({
    name: "", title: "", genre: "Fiction", synopsis: "",
    cover: "", purchase: "", email: "", why: "",
  });
  const [sent, setSent] = useState(false);

  const update = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm({ ...form, [k]: e.target.value });

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.title || !form.email || !form.synopsis) {
      toast.error("Please complete the required fields.");
      return;
    }
    const subject = encodeURIComponent(`Book Submission — ${form.title} by ${form.name}`);
    const body = encodeURIComponent(
      `Author Name: ${form.name}\n` +
      `Book Title: ${form.title}\n` +
      `Genre: ${form.genre}\n` +
      `Contact Email: ${form.email}\n` +
      `Book Cover Link: ${form.cover}\n` +
      `Purchase Link: ${form.purchase}\n\n` +
      `Synopsis:\n${form.synopsis}\n\n` +
      `Why this book should be reviewed:\n${form.why}\n`
    );
    window.location.href = `mailto:${RECIPIENT}?subject=${subject}&body=${body}`;
    setSent(true);
    toast.success("Opening your email client — please send to complete submission.");
  };

  if (sent) {
    return (
      <div className="mx-auto max-w-3xl px-6 py-32 text-center">
        <CheckCircle2 className="w-16 h-16 text-gold mx-auto mb-6" strokeWidth={1.2} />
        <h1 className="font-serif text-4xl md:text-5xl text-foreground text-balance">
          Your book submission has been prepared.
        </h1>
        <Ornament />
        <p className="text-lg text-muted-foreground max-w-xl mx-auto">
          Your book submission will be reviewed by Readers Review Circle and considered for professional literary feedback.
        </p>
        <p className="mt-4 text-sm text-muted-foreground">
          If your email client did not open, please send your submission directly to{" "}
          <a className="text-gold hover:underline" href={`mailto:${RECIPIENT}`}>{RECIPIENT}</a>.
        </p>
        <Button variant="goldOutline" className="mt-8" onClick={() => setSent(false)}>
          Submit another book
        </Button>
      </div>
    );
  }

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
                <div className="text-xs uppercase tracking-[0.25em] text-gold mb-1">Submissions go to</div>
                <a href={`mailto:${RECIPIENT}`} className="font-serif text-lg text-foreground hover:text-gold break-all">
                  {RECIPIENT}
                </a>
              </div>
            </div>
          </div>
          <p className="mt-6 text-xs text-muted-foreground italic">
            Your book submission will be reviewed by Readers Review Circle and considered for professional literary feedback.
          </p>
        </aside>

        <form onSubmit={onSubmit} className="space-y-6 bg-card border border-border p-8 md:p-10 rounded-sm">
          <Row>
            <Field label="Author Name *">
              <Input value={form.name} onChange={update("name")} required />
            </Field>
            <Field label="Contact Email *">
              <Input type="email" value={form.email} onChange={update("email")} required />
            </Field>
          </Row>

          <Row>
            <Field label="Book Title *">
              <Input value={form.title} onChange={update("title")} required />
            </Field>
            <Field label="Genre">
              <select
                value={form.genre}
                onChange={update("genre")}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
              >
                {GENRES.map((g) => <option key={g} value={g}>{g}</option>)}
              </select>
            </Field>
          </Row>

          <Field label="Book Synopsis *">
            <Textarea rows={5} value={form.synopsis} onChange={update("synopsis")} required />
          </Field>

          <Row>
            <Field label="Book Cover (image URL)">
              <div className="relative">
                <Upload className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input className="pl-10" placeholder="https://..." value={form.cover} onChange={update("cover")} />
              </div>
            </Field>
            <Field label="Book Purchase Link">
              <Input placeholder="https://..." value={form.purchase} onChange={update("purchase")} />
            </Field>
          </Row>

          <Field label="Why should this book be reviewed?">
            <Textarea rows={4} value={form.why} onChange={update("why")} placeholder="Tell us about your readers, themes, and what would make our circle the right home for this book." />
          </Field>

          <Button type="submit" variant="gold" size="xl" className="w-full">
            Submit to Bertha Reagan <ArrowRight className="w-4 h-4" />
          </Button>
          <p className="text-xs text-muted-foreground text-center">
            Submissions are sent to <span className="text-foreground">{RECIPIENT}</span>
          </p>
        </form>
      </div>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="space-y-2">
      <Label className="text-xs uppercase tracking-[0.2em] text-muted-foreground">{label}</Label>
      {children}
    </div>
  );
}

function Row({ children }: { children: React.ReactNode }) {
  return <div className="grid md:grid-cols-2 gap-6">{children}</div>;
}
