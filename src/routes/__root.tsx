import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
  Link,
} from "@tanstack/react-router";

import appCss from "../styles.css?url";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { Toaster } from "@/components/ui/sonner";

function NotFoundComponent() {
  return (
    <>
      <Header />
      <div className="flex min-h-[70vh] items-center justify-center px-4">
        <div className="max-w-md text-center">
          <div className="font-serif text-8xl gold-text">404</div>
          <h2 className="mt-4 font-serif text-2xl text-foreground">This page is unwritten</h2>
          <p className="mt-3 text-sm text-muted-foreground">
            The chapter you're searching for doesn't appear to be in our library.
          </p>
          <Link
            to="/"
            className="mt-8 inline-flex items-center justify-center rounded-md bg-gold px-6 py-2.5 text-sm font-medium text-gold-foreground transition-colors hover:bg-gold/90"
          >
            Return Home
          </Link>
        </div>
      </div>
      <Footer />
    </>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="max-w-md text-center">
        <h1 className="font-serif text-3xl text-foreground">An unexpected page break</h1>
        <p className="mt-2 text-sm text-muted-foreground">Try refreshing this page.</p>
        <button
          onClick={() => { router.invalidate(); reset(); }}
          className="mt-6 rounded-md bg-primary px-5 py-2 text-sm text-primary-foreground hover:bg-primary/90"
        >
          Try again
        </button>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Readers Review Circle — Professional Book Reviews That Build Reader Trust" },
      { name: "description", content: "Readers Review Circle is a literary review society of 2000+ devoted readers offering authors thoughtful, honest book reviews. Submit your book for professional review." },
      { name: "author", content: "Bertha Reagan" },
      { property: "og:title", content: "Readers Review Circle — Professional Book Reviews That Build Reader Trust" },
      { property: "og:description", content: "Readers Review Circle is a literary review society of 2000+ devoted readers offering authors thoughtful, honest book reviews. Submit your book for professional review." },
      { property: "og:type", content: "website" },
      { property: "og:site_name", content: "Readers Review Circle" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Readers Review Circle — Professional Book Reviews That Build Reader Trust" },
      { name: "twitter:description", content: "Readers Review Circle is a literary review society of 2000+ devoted readers offering authors thoughtful, honest book reviews. Submit your book for professional review." },
      { property: "og:image", content: "https://storage.googleapis.com/gpt-engineer-file-uploads/6EhTyEsPWPNlSdVFOTQ2sRlH22F2/social-images/social-1779153595442-Readers_Review_Circle_Logo.webp" },
      { name: "twitter:image", content: "https://storage.googleapis.com/gpt-engineer-file-uploads/6EhTyEsPWPNlSdVFOTQ2sRlH22F2/social-images/social-1779153595442-Readers_Review_Circle_Logo.webp" },
    ],
    links: [{ rel: "stylesheet", href: appCss }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          name: "Readers Review Circle",
          founder: { "@type": "Person", name: "Bertha Reagan" },
          email: "berthareagan93@yahoo.com",
          description: "Literary review society of 2000+ readers offering professional book reviews.",
        }),
      },
      {
        src: "https://cdnjs.buymeacoffee.com/1.0.0/widget.prod.min.js",
        "data-name": "BMC-Widget",
        "data-cfasync": "false",
        "data-id": "readersreviewcircle",
        "data-description": "Support me on Buy me a coffee!",
        "data-message": "",
        "data-color": "#5F7FFF",
        "data-position": "Right",
        "data-x_margin": "18",
        "data-y_margin": "18",
        async: true,
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body className="paper antialiased">
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  return (
    <QueryClientProvider client={queryClient}>
      <Header />
      <main className="min-h-screen">
        <Outlet />
      </main>
      <Footer />
      <Toaster />
    </QueryClientProvider>
  );
}
