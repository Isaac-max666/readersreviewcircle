Below is a copy-paste prompt you can drop into a fresh Lovable project to rebuild this website end-to-end. It captures brand, design system, routes, content, backend, integrations, and deployment.

---

# BUILD PROMPT: "Readers Review Circle" — Literary Book Review Society Website

Build a polished, editorial, magazine-style website for a book review society called **Readers Review Circle**, founded by **Bertha Reagan**. The brand voice is warm, literary, considered — think Kirkus Reviews meets a private reading club. 2,000+ member community offering honest, professional book reviews.

## Tech stack (non-negotiable)

- TanStack Start v1 (React 19, Vite 7, file-based routing in `src/routes/`)
- Tailwind CSS v4 via `src/styles.css` (native `@import`, `@theme` tokens, no `tailwind.config.js`)
- shadcn/ui (new-york style, Lucide icons)
- Lovable Cloud (Supabase) for DB + Storage
- Deployable to both Vercel and Netlify (detect via `VERCEL` / `NETLIFY` env vars in `vite.config.ts` and switch TanStack Start server preset accordingly; add `netlify.toml` and `vercel.json` with a `scripts/vercel-build-output.js` script that emits `.vercel/output`)

## Design system (`src/styles.css`)

Warm paper aesthetic with gold accents. Serif headings, sans body.

- Fonts: **Cormorant Garamond** (serif, self-hosted via `@font-face` from `fonts.gstatic.com`) for headings; **Inter** for body.
- Light theme (default): cream paper `--background: oklch(0.975 0.012 85)`, ink `--foreground: oklch(0.22 0.015 60)`, gold `--gold: oklch(0.72 0.13 75)`, dark charcoal primary `oklch(0.24 0.018 60)`.
- Dark theme mirrors those with `oklch(0.16 0.012 60)` background and `oklch(0.78 0.14 80)` gold.
- Utilities: `.paper` (radial gradient paper texture), `.gold-text` (linear gradient text), `.gold-rule`, `.ornament::before/::after` (thin gold rules flanking centered text), `.text-balance`, `animate-fade-up` / `-delay` / `-delay-2` (0.8s ease-out staggered), `animate-shimmer`.
- All colors are semantic tokens — never hardcode hex or `text-white`/`bg-black`.

Add a shadcn `Button` variant set including `gold`, `goldOutline`, and an `xl` size.

## Layout components (`src/components/site/`)

- `Header.tsx` — sticky header with wordmark "Readers Review Circle", nav links (Home, About, Reviews, Submit, Blog, Contact), mobile menu.
- `Footer.tsx` — multi-column with tagline, quick links, contact info (email `berthareagan93@yahoo.com`, WhatsApp `+1 332 209 8103`), copyright.
- `Section.tsx` — export `SectionEyebrow` (uppercase `text-[11px] tracking-[0.25em] text-ink`), `SectionTitle` (serif 4xl–5xl), `Ornament` (centered gold rule flanking optional text).

## Routes (file-based, `src/routes/`)

Every route needs its own `head()` with unique title/description/og tags. Root layout is `__root.tsx` with `HeadContent`, `<Outlet />`, Header + Footer + shadcn `Toaster`, and TanStack Query provider wired through `createRootRouteWithContext<{ queryClient }>`.

Root also injects **two JSON-LD blocks** via `scripts`:
1. `Organization` — name "Readers Review Circle", founder Bertha Reagan, email, url.
2. `WebSite` — with `potentialAction` `SearchAction` targeting `/search?q={search_term_string}`.

Include `google-site-verification` meta and og:image pointing to the logo.

### `/` (`index.tsx`) — Homepage
Hero with `heroBooks` background image (opacity 25%, fade to background), headline "Professional Book Reviews **That Build** Reader Trust" (italic gold on "That Build"), subhead mentioning "2,000+ passionate readers", 3 CTAs (Submit Your Book / Explore Reviews / Contact Bertha), gold ornament, italic tagline "We read slowly. We review honestly. We write so authors are better understood."

Then: stats strip (2,000+ Devoted Readers, 600+ Published Reviews, 180+ Author Collaborations, Weekly Literary Discussions — each with a Lucide icon), Featured Reviews (first 3 from data), auto-rotating testimonial marquee (6s interval, 4 testimonials, dot indicators), Meet the Owner section with founder portrait + "Founder Bertha Reagan" gold badge overlay, Recent Literary Discussions (3 blog previews next to open-book image), CTA card ("Have your book read by people who truly read.").

Export a reusable `ReviewCard` component from this file — used by `/reviews` too. Card shows cover (3:4), genre eyebrow, serif title, italic author, star rating (gold fills), 3-line summary, reviewer + date footer, gold hover lift.

### `/about` (`about.tsx`)
Bertha's story, mission, values, timeline of the circle's growth from 12 kitchen-table readers to 2,000+.

### `/reviews` (`reviews.tsx`)
Searchable library. Search input with `aria-label="Search reviews"` and Lucide `Search` icon. Genre pill filter row (`All` + 8 genres: Fiction, Romance, Mystery, Fantasy, Self-help, Business, Biography, Non-fiction). Grid of `ReviewCard`s. Empty state: serif italic "No reviews match that search — try another title."

### `/reviews/best-of-2024` (`reviews.best-of-2024.tsx`)
Curated SEO landing page — "The Best Indie Books of 2024: A Readers Review Circle Selection". Target keyword "book reviews". Modeled after Kirkus "Best of" lists.

### `/submit` (`submit.tsx`)
Book submission form. Fields: first name, last name, author email, book title, genre (select), draft number, word count (>0, ≤2,000,000), description, file upload.

Flow:
1. Upload file to Supabase Storage bucket `book-submissions` under a path prefixed with a random UUID (`^[0-9a-fA-F-]{36}-.+`).
2. Insert row into `book_submissions` table.
3. Generate a 7-day signed URL for the file.
4. User picks delivery method via **two buttons: "Submit via Email" (Mail icon) and "Submit via WhatsApp"**.
   - Email: `mailto:readersreviewcircle@gmail.com` prefilled with form data + signed URL.
   - WhatsApp: `wa.me/13322098103` prefilled with same content.
5. Success state shows method-specific instructions ("Your email app should have opened…").

State: `submitting`, `submittedVia`.

### `/blog` (`blog.tsx`)
Grid of 6 seeded posts from `BLOG_POSTS`. Categories: Review Craft, Monthly Highlights, Author Spotlight, Reading Culture, Literary Analysis.

### `/contact` (`contact.tsx`)
Contact form (Name, Email, Subject, Message — each input has an `id` and matching `<Label htmlFor>` for a11y). Sidebar with email + WhatsApp. FAQ section (visible Q&A). Inject a `FAQPage` JSON-LD block in `head()` with `mainEntity` mirroring the visible questions/answers.

### `/sitemap.xml` (`sitemap[.]xml.ts`)
Server route returning XML sitemap for all routes with `changefreq` + `priority`. Base URL is the published domain.

### `/robots.txt` (in `public/`)
Allow all, reference sitemap.

## Seed data (`src/lib/site-data.ts`)

Export three arrays. Use the exact content below:

**`GENRES`**: `["Fiction","Romance","Mystery","Fantasy","Self-help","Business","Biography","Non-fiction"]`.

**`REVIEWS`** — 8 items, each with id, title, author, genre, rating (4–5), cover (Unsplash 600w), summary (literate 1–2 sentences), reviewer, date. Titles:
1. "The Cartographer's Daughter" — Elena Marchetti (Fiction, 5★)
2. "Hollow Tide" — Daniel Voss (Mystery, 4★)
3. "Letters She Never Sent" — Priya Anand (Romance, 5★)
4. "The Quiet Empire" — James Whitlock (Business, 4★)
5. "Ashes of the Eight Towers" — R. M. Calder (Fantasy, 5★)
6. "Slow Mornings" — Anya Bell (Self-help, 4★)
7. "Composing a Life: Eudora Welty" — Harper Lassiter (Biography, 5★)
8. "The Last Forest Floor" — Dr. Amelia Crane (Non-fiction, 4★)

Reviewers rotate: Margaret Chen, Theodore Hayes, Sarah Okonkwo, Bertha Reagan, Lillian Park. Dates from Dec 2025 → March 2026.

**`TESTIMONIALS`** — 4 quotes from Elena Marchetti (author), Harper Lassiter (biographer), Northbridge Press (publisher), Margaret Chen (member since 2022).

**`BLOG_POSTS`** — 6 items with id, category, title, excerpt, date, read time. Categories listed above.

Assets: generate/use `heroBooks`, `openBook`, `founder-bertha` images in `src/assets/`.

## Backend (Lovable Cloud / Supabase)

### Table `public.book_submissions`
Columns: `id uuid pk default gen_random_uuid()`, `created_at timestamptz default now()`, `first_name`, `last_name`, `author_email`, `book_title`, `description`, `genre`, `draft_number`, `word_count int`, `file_path`, `file_name`.

Follow the public-schema grant + RLS structure exactly:
```sql
CREATE TABLE public.book_submissions (...);
GRANT INSERT ON public.book_submissions TO anon, authenticated;
GRANT ALL ON public.book_submissions TO service_role;
ALTER TABLE public.book_submissions ENABLE ROW LEVEL SECURITY;
```

Policies — **no SELECT policy** (submissions are write-only from the client; the team reads via the delivered email/WhatsApp link). INSERT policy validates:
- name/title/description/genre length ranges
- `author_email ~ '^[^\s]+@[^\s]+\.[^\s]+$'`
- `word_count > 0 AND word_count <= 2000000`
- `draft_number` range
- `file_path` and `file_name` non-empty

### Storage bucket `book-submissions`
Public = false. Policy on `storage.objects` for INSERT: `bucket_id = 'book-submissions' AND name ~ '^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}-.+'` (prevents overwriting other authors' files).

Client uses `@/integrations/supabase/client` (publishable key). No auth surface required.

## SEO / metadata

- Site URL: `https://reader-review-circle.lovable.app`
- Every route: unique `<title>` (<60 chars) + meta description (<160 chars) + og:title/og:description/og:type/twitter:card. Leaf routes with hero imagery set `og:image` to that image's absolute URL. Root sets a default og:image (logo).
- One `<h1>` per page. Semantic HTML. Alt text on all images. Lazy-load below-the-fold images, `fetchpriority="high"` on hero.
- FAQ page → `FAQPage` JSON-LD. Root → `Organization` + `WebSite` JSON-LD.
- Include `google-site-verification` meta in root head.

## Accessibility

- Every form input has an `id` + matching `<Label htmlFor>`.
- Search input has `aria-label="Search reviews"`.
- Testimonial dot buttons have `aria-label`s.
- Focus rings use the `--ring` (gold) token.

## Contact points (bake into copy)

- Email: `readersreviewcircle@gmail.com` (submissions) and `berthareagan93@yahoo.com` (Bertha direct)
- WhatsApp: `+1 332 209 8103` → `wa.me/13322098103`
- Founder: Bertha Reagan

## Deliverables

Build all of the above in one project. When done, verify `bun run build` succeeds, the `/sitemap.xml` route returns valid XML, and the submit form successfully uploads to storage + inserts a row + opens the chosen delivery method.
