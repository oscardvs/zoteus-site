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
      <article className="z-container z-container-narrow z-section">
        <p className="z-label">Legal</p>
        <h1 className="z-display z-h1 mt-3">{title}</h1>
        <p className="z-mono mt-4 text-sm text-fd-muted-foreground">Last updated {updated}</p>
        <p className="z-lead mt-8 [&_a]:text-[color:var(--accent-text)] [&_a]:underline [&_a]:underline-offset-[3px]">{intro}</p>
        <div className="mt-12 space-y-10">{children}</div>
      </article>
      <SiteFooter />
    </main>
  );
}

export function Sec({ h, children }: { h: string; children: ReactNode }) {
  return (
    <section>
      <h2 className="z-h3 text-[1.2rem] text-fd-foreground">{h}</h2>
      <div className="z-body mt-3 space-y-3 [&_a]:text-[color:var(--accent-text)] [&_a]:underline [&_a]:underline-offset-[3px] [&_strong]:text-fd-foreground [&_strong]:font-medium [&_ul]:list-disc [&_ul]:pl-5 [&_li]:mt-1.5 [&_code]:z-mono [&_code]:text-[0.9em] [&_code]:text-fd-foreground">
        {children}
      </div>
    </section>
  );
}
