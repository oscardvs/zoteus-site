import Link from 'next/link';
import { repoUrl, npmUrl } from '@/lib/shared';

export function SiteFooter() {
  return (
    <footer className="border-t border-fd-border">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-6 py-12 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <span className="z-wordmark">
            <svg viewBox="0 0 24 24" width="15" height="15" className="z-bolt" aria-hidden>
              <path d="M13 2 4.6 13.4H11l-1 8.6L19.4 10.2H13V2Z" fill="currentColor" />
            </svg>
            <span>Zoteus</span>
          </span>
          <p className="z-label mt-3 max-w-sm normal-case tracking-[0.03em]">
            Not affiliated with or endorsed by the Corporation for Digital Scholarship / Zotero.
          </p>
        </div>
        <nav className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-fd-muted-foreground">
          <Link href="/docs" className="hover:text-fd-foreground">Docs</Link>
          <Link href="/pricing" className="hover:text-fd-foreground">Pricing</Link>
          <Link href="/privacy" className="hover:text-fd-foreground">Privacy</Link>
          <Link href="/terms" className="hover:text-fd-foreground">Terms</Link>
          <Link href={repoUrl} target="_blank" rel="noreferrer" className="hover:text-fd-foreground">GitHub</Link>
          <Link href={npmUrl} target="_blank" rel="noreferrer" className="hover:text-fd-foreground">npm</Link>
          <Link href="https://registry.modelcontextprotocol.io" target="_blank" rel="noreferrer" className="hover:text-fd-foreground">MCP Registry</Link>
        </nav>
      </div>
      <p className="z-label pb-8 text-center normal-case tracking-[0.04em]">MIT © 2026 Oscar Devos</p>
    </footer>
  );
}
