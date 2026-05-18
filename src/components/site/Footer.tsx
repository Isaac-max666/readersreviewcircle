import { Link } from "@tanstack/react-router";
import { BookOpen, Mail, Facebook, Twitter, Instagram } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function Footer() {
  return (
    <footer className="mt-32 border-t border-border bg-primary text-primary-foreground">
      <div className="mx-auto max-w-7xl px-6 lg:px-10 py-20">
        <div className="grid lg:grid-cols-[1.4fr_1fr_1fr_1.2fr] gap-12">
          <div>
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-full border border-gold/60 flex items-center justify-center text-gold">
                <BookOpen className="w-5 h-5" strokeWidth={1.5} />
              </div>
              <div className="font-serif text-xl">Readers Review Circle</div>
            </div>
            <p className="text-sm text-primary-foreground/70 leading-relaxed max-w-sm">
              A literary review society of 2000+ devoted readers offering authors honest, thoughtful and considered reviews since our founding.
            </p>
            <div className="flex gap-3 mt-6">
              {[Facebook, Twitter, Instagram].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-9 h-9 rounded-full border border-primary-foreground/20 hover:border-gold hover:text-gold flex items-center justify-center transition-colors"
                  aria-label="social"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-serif text-base mb-5 text-gold">Explore</h4>
            <ul className="space-y-3 text-sm text-primary-foreground/75">
              <li><Link to="/about" className="hover:text-gold">About</Link></li>
              <li><Link to="/reviews" className="hover:text-gold">Review Library</Link></li>
              <li><Link to="/blog" className="hover:text-gold">Literary Journal</Link></li>
              <li><Link to="/submit" className="hover:text-gold">Submit a Book</Link></li>
              <li><Link to="/contact" className="hover:text-gold">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-serif text-base mb-5 text-gold">Contact</h4>
            <ul className="space-y-3 text-sm text-primary-foreground/75">
              <li className="flex items-start gap-2">
                <Mail className="w-4 h-4 mt-0.5 text-gold shrink-0" />
                <a href="mailto:berthareagan93@yahoo.com" className="hover:text-gold break-all">
                  berthareagan93@yahoo.com
                </a>
              </li>
              <li>Founded by Bertha Reagan</li>
              <li>Primary platform: Goodreads</li>
            </ul>
          </div>

          <div>
            <h4 className="font-serif text-base mb-5 text-gold">The Monthly Dispatch</h4>
            <p className="text-sm text-primary-foreground/70 mb-4">
              Featured reviews, author spotlights, and reading recommendations — delivered once a month.
            </p>
            <form
              onSubmit={(e) => e.preventDefault()}
              className="flex gap-2"
            >
              <Input
                type="email"
                placeholder="Your email"
                className="bg-primary-foreground/5 border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/40"
              />
              <Button type="submit" variant="gold" size="sm">Subscribe</Button>
            </form>
          </div>
        </div>

        <div className="gold-rule mt-16 opacity-30" />
        <div className="mt-8 flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-primary-foreground/50">
          <div>© {new Date().getFullYear()} Readers Review Circle. All rights reserved.</div>
          <div className="font-serif italic">"A reader lives a thousand lives before he dies."</div>
        </div>
      </div>
    </footer>
  );
}
