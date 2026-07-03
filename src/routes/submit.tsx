import { createFileRoute } from "@tanstack/react-router";
import { Mail, Upload, Loader2, CheckCircle2 } from "lucide-react";
import { useState } from "react";
import { z } from "zod";
import { SectionEyebrow } from "@/components/site/Section";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

const RECIPIENT = "readersreviewcircle@gmail.com";

const GENRES = [
  "Fiction",
  "Non-Fiction",
  "Mystery / Thriller",
  "Romance",
  "Fantasy",
  "Science Fiction",
  "Historical Fiction",
  "Literary Fiction",
  "Young Adult",
  "Children's",
  "Memoir / Biography",
  "Poetry",
  "Other",
];

const DRAFT_OPTIONS = [
  "1st Draft",
  "2nd Draft",
  "3rd Draft",
  "4th Draft",
  "5th Draft or later",
  "Final / Published",
];

const MAX_FILE_BYTES = 25 * 1024 * 1024; // 25 MB
const ACCEPTED_EXT = [".pdf", ".doc", ".docx"];

const schema = z.object({
  first_name: z.string().trim().min(1, "First name is required").max(80),
  last_name: z.string().trim().min(1, "Last name is required").max(80),
  book_title: z.string().trim().min(1, "Book title is required").max(200),
  author_email: z.string().trim().email("Enter a valid email").max(255),
  description: z
    .string()
    .trim()
    .min(20, "Please provide at least 20 characters")
    .max(2000, "Description must be under 2000 characters"),
  genre: z.string().min(1, "Select a genre"),
  draft_number: z.string().min(1, "Select a draft"),
  word_count: z
    .number({ invalid_type_error: "Enter a number" })
    .int("Whole numbers only")
    .positive("Must be greater than 0")
    .max(2_000_000, "That seems too high"),
});

export const Route = createFileRoute("/submit")({
  head: () => ({
    meta: [
      { title: "Submit Your Book for Review — Readers Review Circle" },
      {
        name: "description",
        content:
          "Submit your book for professional literary review by Readers Review Circle's 2,000+ member literary society.",
      },
      { property: "og:title", content: "Submit Your Book — Readers Review Circle" },
      {
        property: "og:description",
        content: "Have your book read and reviewed by our 2000+ member literary society.",
      },
      { property: "og:url", content: "/submit" },
    ],
    links: [{ rel: "canonical", href: "/submit" }],
  }),
  component: SubmitPage,
});

function SubmitPage() {
  const [submitting, setSubmitting] = useState<null | "email" | "whatsapp">(null);
  const [submittedVia, setSubmittedVia] = useState<null | "email" | "whatsapp">(null);
  const [file, setFile] = useState<File | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [genre, setGenre] = useState("");
  const [draftNumber, setDraftNumber] = useState("");

  async function handleSubmit(
    form: HTMLFormElement,
    method: "email" | "whatsapp",
  ) {
    const fd = new FormData(form);

    const payload = {
      first_name: String(fd.get("first_name") ?? ""),
      last_name: String(fd.get("last_name") ?? ""),
      book_title: String(fd.get("book_title") ?? ""),
      author_email: String(fd.get("author_email") ?? ""),
      description: String(fd.get("description") ?? ""),
      genre,
      draft_number: draftNumber,
      word_count: Number(fd.get("word_count")),
    };

    const nextErrors: Record<string, string> = {};

    if (!file) {
      nextErrors.file = "Please upload your book file";
    } else {
      const lower = file.name.toLowerCase();
      if (!ACCEPTED_EXT.some((ext) => lower.endsWith(ext))) {
        nextErrors.file = "File must be a PDF or Word document (.pdf, .doc, .docx)";
      } else if (file.size > MAX_FILE_BYTES) {
        nextErrors.file = "File must be 25 MB or smaller";
      }
    }

    const parsed = schema.safeParse(payload);
    if (!parsed.success) {
      for (const issue of parsed.error.issues) {
        const key = String(issue.path[0]);
        if (!nextErrors[key]) nextErrors[key] = issue.message;
      }
    }

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      toast.error("Please fix the highlighted fields");
      return;
    }

    setErrors({});
    setSubmitting(method);

    try {
      const data = parsed.data!;
      const safeName = file!.name.replace(/[^a-zA-Z0-9._-]/g, "_");
      const filePath = `${crypto.randomUUID()}-${safeName}`;

      const { error: uploadError } = await supabase.storage
        .from("book-submissions")
        .upload(filePath, file!, {
          contentType: file!.type || "application/octet-stream",
          upsert: false,
        });

      if (uploadError) throw uploadError;

      const { error: insertError } = await supabase.from("book_submissions").insert({
        first_name: data.first_name,
        last_name: data.last_name,
        book_title: data.book_title,
        author_email: data.author_email,
        description: data.description,
        genre: data.genre,
        draft_number: data.draft_number,
        word_count: data.word_count,
        file_path: filePath,
        file_name: file!.name,
      });

      if (insertError) throw insertError;

      const { data: signed } = await supabase.storage
        .from("book-submissions")
        .createSignedUrl(filePath, 60 * 60 * 24 * 7);

      const subject = `New Book Submission — ${data.book_title}`;
      const lines = [
        `New Book Submission`,
        ``,
        `Name: ${data.first_name} ${data.last_name}`,
        `Book Title: ${data.book_title}`,
        `Author Email: ${data.author_email}`,
        `Genre: ${data.genre}`,
        `Draft: ${data.draft_number}`,
        `Word Count: ${data.word_count.toLocaleString()}`,
        ``,
        `Description:`,
        data.description,
        ``,
        `File: ${file!.name}`,
        signed?.signedUrl ? `Download (valid 7 days): ${signed.signedUrl}` : ``,
      ].filter(Boolean);
      const body = lines.join("\n");

      if (method === "whatsapp") {
        const waUrl = `https://wa.me/13322098103?text=${encodeURIComponent(body)}`;
        window.open(waUrl, "_blank", "noopener,noreferrer");
        toast.success("Submission received — opening WhatsApp to send details");
      } else {
        const mailUrl = `mailto:${RECIPIENT}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
        window.location.href = mailUrl;
        toast.success("Submission received — opening your email app");
      }

      setSubmittedVia(method);
      form.reset();
      setFile(null);
      setGenre("");
      setDraftNumber("");
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong. Please try again or email us directly.");
    } finally {
      setSubmitting(null);
    }
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
            All submissions are read personally by our founder Bertha Reagan and matched with
            reviewers from our 2,000+ member Circle whose tastes align with your work.
          </p>
          <div className="mt-10 p-6 border border-gold/30 bg-gold/5 rounded-sm">
            <div className="flex items-start gap-3">
              <Mail className="w-5 h-5 text-gold mt-0.5" />
              <div>
                <div className="text-xs uppercase tracking-[0.25em] text-ink mb-1">Questions?</div>
                <a
                  href={`mailto:${RECIPIENT}`}
                  className="font-serif text-lg text-foreground hover:text-gold break-all"
                >
                  {RECIPIENT}
                </a>
              </div>
            </div>
          </div>
          <p className="mt-6 text-xs text-muted-foreground italic">
            Your submission is reviewed by Readers Review Circle and considered for professional
            literary feedback.
          </p>
        </aside>

        <div className="bg-card border border-border rounded-sm p-8 md:p-10">
          {submittedVia ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 rounded-full bg-gold/10 flex items-center justify-center mx-auto mb-6">
                <CheckCircle2 className="w-8 h-8 text-gold" />
              </div>
              <h2 className="font-serif text-3xl text-foreground mb-3">Submission confirmed</h2>
              <p className="text-muted-foreground max-w-md mx-auto">
                Your file was uploaded successfully and your review request has been received.
                Bertha will personally review your book and reach out at the email address you provided.
              </p>
              <div className="mt-6 p-4 bg-background border border-border rounded-sm text-left max-w-md mx-auto">
                <div className="text-xs uppercase tracking-[0.2em] text-ink mb-2">What happens next</div>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-gold mt-0.5 shrink-0" />
                    <span>
                      {submittedVia === "whatsapp"
                        ? "WhatsApp should have opened with your submission details — please press send to deliver it."
                        : `Your email app should have opened with the submission addressed to ${RECIPIENT} — please press send to deliver it.`}
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-gold mt-0.5 shrink-0" />
                    <span>We will confirm your spot and matching reviewer within 2–3 business days.</span>
                  </li>
                </ul>
              </div>
              <Button
                type="button"
                variant="outline"
                className="mt-8"
                onClick={() => setSubmittedVia(null)}
              >
                Submit another book
              </Button>
            </div>
          ) : (
            <form
              onSubmit={(e) => e.preventDefault()}
              noValidate
              className="space-y-6"
            >
              <div className="grid sm:grid-cols-2 gap-5">
                <Field label="First Name" htmlFor="first_name" error={errors.first_name}>
                  <Input id="first_name" name="first_name" required maxLength={80} />
                </Field>
                <Field label="Last Name" htmlFor="last_name" error={errors.last_name}>
                  <Input id="last_name" name="last_name" required maxLength={80} />
                </Field>
              </div>

              <Field label="Book Title" htmlFor="book_title" error={errors.book_title}>
                <Input id="book_title" name="book_title" required maxLength={200} />
              </Field>

              <Field
                label="Author's Email Address"
                htmlFor="author_email"
                error={errors.author_email}
              >
                <Input
                  id="author_email"
                  name="author_email"
                  type="email"
                  required
                  maxLength={255}
                />
              </Field>

              <Field
                label="Upload Book (PDF, DOC, DOCX — max 25 MB)"
                htmlFor="file"
                error={errors.file}
              >
                <label
                  htmlFor="file"
                  className="flex items-center gap-3 px-4 py-3 border border-dashed border-border rounded-sm bg-background hover:border-gold cursor-pointer transition-colors"
                >
                  <Upload className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm text-foreground truncate">
                    {file ? file.name : "Choose a file..."}
                  </span>
                </label>
                <input
                  id="file"
                  name="file"
                  type="file"
                  accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                  className="sr-only"
                  onChange={(e) => setFile(e.target.files?.[0] ?? null)}
                />
              </Field>

              <Field
                label="Brief Description of the Book"
                htmlFor="description"
                error={errors.description}
              >
                <Textarea
                  id="description"
                  name="description"
                  required
                  rows={5}
                  maxLength={2000}
                  placeholder="Give a short synopsis, themes, and what readers can expect."
                />
              </Field>

              <div className="grid sm:grid-cols-2 gap-5">
                <Field label="Genre" htmlFor="genre" error={errors.genre}>
                  <Select value={genre} onValueChange={setGenre}>
                    <SelectTrigger id="genre">
                      <SelectValue placeholder="Select a genre" />
                    </SelectTrigger>
                    <SelectContent>
                      {GENRES.map((g) => (
                        <SelectItem key={g} value={g}>
                          {g}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </Field>
                <Field
                  label="Which Draft?"
                  htmlFor="draft_number"
                  error={errors.draft_number}
                >
                  <Select value={draftNumber} onValueChange={setDraftNumber}>
                    <SelectTrigger id="draft_number">
                      <SelectValue placeholder="Select draft" />
                    </SelectTrigger>
                    <SelectContent>
                      {DRAFT_OPTIONS.map((d) => (
                        <SelectItem key={d} value={d}>
                          {d}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </Field>
              </div>

              <Field label="Word Count" htmlFor="word_count" error={errors.word_count}>
                <Input
                  id="word_count"
                  name="word_count"
                  type="number"
                  inputMode="numeric"
                  min={1}
                  step={1}
                  required
                />
              </Field>

              <div className="pt-2">
                <p className="text-xs uppercase tracking-[0.2em] text-ink mb-3">
                  Choose how to send your submission
                </p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <Button
                    type="button"
                    disabled={submitting !== null}
                    onClick={(e) => handleSubmit(e.currentTarget.form!, "email")}
                    className="flex-1"
                    size="lg"
                  >
                    {submitting === "email" ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Preparing email...
                      </>
                    ) : (
                      <>
                        <Mail className="w-4 h-4 mr-2" />
                        Submit via Email
                      </>
                    )}
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    disabled={submitting !== null}
                    onClick={(e) =>
                      handleSubmit(
                        e.currentTarget.form!.dispatchEvent as unknown as never,
                        "whatsapp",
                      ) as unknown as void
                    }
                    className="flex-1"
                    size="lg"
                  >
                    {submitting === "whatsapp" ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Opening WhatsApp...
                      </>
                    ) : (
                      "Submit via WhatsApp"
                    )}
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground mt-3">
                  Your file uploads either way — we just need to know where to send the details.
                </p>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

function Field({
  label,
  htmlFor,
  error,
  children,
}: {
  label: string;
  htmlFor: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-2">
      <Label htmlFor={htmlFor} className="text-xs uppercase tracking-[0.2em] text-ink">
        {label}
      </Label>
      {children}
      {error && <p className="text-xs text-destructive">{error}</p>}
    </div>
  );
}
