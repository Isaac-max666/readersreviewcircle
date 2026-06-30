import type { ReactNode } from "react";

export function SectionEyebrow({ children }: { children: ReactNode }) {
  return (
    <div className="text-[11px] uppercase tracking-[0.4em] text-ink font-medium mb-4">
      {children}
    </div>
  );
}

export function SectionTitle({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <h2 className={`font-serif text-4xl md:text-5xl text-foreground tracking-tight text-balance ${className}`}>
      {children}
    </h2>
  );
}

export function Ornament() {
  return (
    <div className="flex items-center justify-center gap-3 my-6">
      <span className="block h-px w-12 bg-gold/60" />
      <span className="w-1.5 h-1.5 rounded-full bg-gold" />
      <span className="block h-px w-12 bg-gold/60" />
    </div>
  );
}
