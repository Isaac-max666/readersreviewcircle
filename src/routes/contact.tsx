import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Mail, MapPin, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { SectionEyebrow } from "@/components/site/Section";
import { toast } from "sonner";

const EMAIL = "berthareagan93@yahoo.com";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact Bertha Reagan — Readers Review Circle" },
      { name: "description", content: "Get in touch with Bertha Reagan and the Readers Review Circle team. Authors, publishers, and readers welcome." },
      { property: "og:title", content: "Contact — Readers Review Circle" },
      { property: "og:description", content: "Reach our founder Bertha Reagan directly for reviews, collaborations, and questions." },
      { property: "og:url", content: "/contact" },
    ],
    links: [{ rel: "canonical", href: "/contact" }],
  }),
  component: ContactPage,
});

const FAQ = [
  { q: "How do I submit my book for review?", a: "Visit the Submit page and complete the submission form. All submissions go directly to Bertha Reagan at berthareagan93@yahoo.com for personal review." },
  { q: "Is there a fee for reviews?", a: "Readers Review Circle does not charge for reviews. We select books based on literary merit and reviewer interest within the Circle." },
  { q: "How long until I receive a response?", a: "Bertha responds to every submission personally. Initial responses typically arrive within two to three weeks; full reviews are published over the following month." },
  { q: "What genres do you review?", a: "Fiction, romance, mystery, fantasy, self-help, business, biography, and non-fiction. If your book sits between categories, send it anyway — we love books that resist easy shelving." },
  { q: "Where are reviews published?", a: "Primarily on Goodreads, where our community of 2,000+ readers is most active. Selected reviews are also featured in our Literary Journal here." },
  { q: "Can I request a specific reviewer?", a: "You may mention preferences in your submission, though final pairing rests with our editor based on reader fit." },
];

function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      toast.error("Please complete the required fields.");
      return;
    }
    const subject = encodeURIComponent(form.subject || `Message from ${form.name}`);
    const body = encodeURIComponent(`From: ${form.name} <${form.email}>\n\n${form.message}`);
    window.location.href = `mailto:${EMAIL}?subject=${subject}&body=${body}`;
    toast.success("Opening your email client...");
  };

  return (
    <div>
      <section className="mx-auto max-w-7xl px-6 lg:px-10 pt-20 pb-16">
        <div className="text-center max-w-3xl mx-auto">
          <SectionEyebrow>Get in Touch</SectionEyebrow>
          <h1 className="font-serif text-5xl md:text-6xl text-foreground text-balance">
            Write to the Circle
          </h1>
          <p className="mt-6 text-muted-foreground text-lg">
            For book submissions, collaborations, or simply to talk about books — Bertha reads every message herself.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 lg:px-10 pb-24">
        <div className="grid lg:grid-cols-[1fr_1.6fr] gap-12">
          <div className="space-y-6">
            <div className="p-8 bg-card border border-border rounded-sm">
              <Mail className="w-6 h-6 text-gold mb-4" strokeWidth={1.5} />
              <div className="text-xs uppercase tracking-[0.25em] text-muted-foreground mb-2">Email</div>
              <a href={`mailto:${EMAIL}`} className="font-serif text-xl text-foreground hover:text-gold break-all">
                {EMAIL}
              </a>
            </div>
            <div className="p-8 bg-card border border-border rounded-sm">
              <MapPin className="w-6 h-6 text-gold mb-4" strokeWidth={1.5} />
              <div className="text-xs uppercase tracking-[0.25em] text-muted-foreground mb-2">Primary Home</div>
              <div className="font-serif text-xl text-foreground">Goodreads</div>
              <div className="text-sm text-muted-foreground mt-1">Where 2,000+ of our readers gather daily.</div>
            </div>
            <div className="p-8 bg-primary text-primary-foreground rounded-sm">
              <div className="text-xs uppercase tracking-[0.25em] text-ink mb-2">Response Time</div>
              <div className="font-serif text-2xl">Within 2–3 weeks</div>
              <p className="text-sm text-primary-foreground/90 mt-2">Bertha responds personally to every message.</p>
            </div>
          </div>

          <form onSubmit={onSubmit} className="bg-card border border-border p-8 md:p-10 rounded-sm space-y-5">
            <div className="grid md:grid-cols-2 gap-5">
              <div className="space-y-2">
                <Label className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Your Name *</Label>
                <Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
              </div>
              <div className="space-y-2">
                <Label className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Email *</Label>
                <Input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required />
              </div>
            </div>
            <div className="space-y-2">
              <Label className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Subject</Label>
              <Input value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })} />
            </div>
            <div className="space-y-2">
              <Label className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Message *</Label>
              <Textarea rows={7} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} required />
            </div>
            <Button type="submit" variant="gold" size="xl" className="w-full">
              Send Message <Send className="w-4 h-4" />
            </Button>
          </form>
        </div>
      </section>

      <section className="bg-card/40 border-y border-border">
        <div className="mx-auto max-w-3xl px-6 lg:px-10 py-24">
          <div className="text-center mb-12">
            <SectionEyebrow>FAQ</SectionEyebrow>
            <h2 className="font-serif text-4xl text-foreground">Questions, Often Asked</h2>
          </div>
          <Accordion type="single" collapsible className="space-y-2">
            {FAQ.map((f, i) => (
              <AccordionItem key={i} value={`i${i}`} className="border border-border bg-background rounded-sm px-6">
                <AccordionTrigger className="font-serif text-lg text-left hover:text-gold hover:no-underline">
                  {f.q}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed">
                  {f.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>
    </div>
  );
}
