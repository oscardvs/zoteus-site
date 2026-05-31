import type { ReactNode } from 'react';
import { SiteFooter } from '@/components/site-footer';

export function LegalPage({
  title,
  updated,
  intro,
  children,
}: {
  title: string;
  updated: string;
  intro: ReactNode;
  children: ReactNode;
}) {
  return (
    <main className="flex flex-col">
      <article className="mx-auto w-full max-w-3xl px-6 py-20">
        <p className="z-label">Legal</p>
        <h1 className="z-display mt-3 text-4xl sm:text-5xl">{title}</h1>
        <p className="z-mono mt-4 text-xs text-fd-muted-foreground">Last updated {updated}</p>
        <p className="mt-8 text-base leading-relaxed text-fd-muted-foreground">{intro}</p>
        <div className="mt-10 space-y-8">{children}</div>
      </article>
      <SiteFooter />
    </main>
  );
}

export function Sec({ h, children }: { h: string; children: ReactNode }) {
  return (
    <section>
      <h2 className="z-serif text-xl text-fd-foreground">{h}</h2>
      <div className="mt-3 space-y-3 text-sm leading-relaxed text-fd-muted-foreground [&_a]:text-[color:var(--accent-text)] [&_a:hover]:underline [&_strong]:text-fd-foreground [&_strong]:font-semibold [&_ul]:list-disc [&_ul]:pl-5 [&_li]:mt-1">
        {children}
      </div>
    </section>
  );
}
