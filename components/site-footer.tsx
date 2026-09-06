import Link from 'next/link';
import { guides } from '@/lib/layout.shared';
import { contactEmail, npmUrl, repoUrl, supportEmail } from '@/lib/shared';

const COLUMNS: { title: string; links: { label: string; href: string; external?: boolean }[] }[] = [
  {
    title: 'Docs',
    links: [
      { label: 'Documentation', href: '/docs' },
      ...guides.map((g) => ({ label: g.text, href: g.url })),
    ],
  },
  {
    title: 'Product',
    links: [
      { label: 'Pricing', href: '/pricing' },
      { label: 'GitHub', href: repoUrl, external: true },
      { label: 'npm', href: npmUrl, external: true },
      { label: 'MCP Registry', href: 'https://registry.modelcontextprotocol.io', external: true },
    ],
  },
  {
    title: 'Legal',
    links: [
      { label: 'Privacy', href: '/privacy' },
      { label: 'Terms', href: '/terms' },
    ],
  },
  {
    title: 'Contact',
    links: [
      { label: supportEmail, href: `mailto:${supportEmail}` },
      { label: contactEmail, href: `mailto:${contactEmail}` },
    ],
  },
];

export function SiteFooter() {
  return (
    <footer className="z-footer border-t border-fd-border">
      <div className="z-container py-12 md:py-16">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,3fr)]">
          <div>
            <Link href="/" className="z-wordmark">Zoteus</Link>
            <p className="z-small mt-4 max-w-xs">
              Not affiliated with or endorsed by the Corporation for Digital Scholarship / Zotero.
            </p>
          </div>
          <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-4">
            {COLUMNS.map((col) => (
              <nav key={col.title} aria-label={col.title}>
                <p className="z-label">{col.title}</p>
                <ul className="z-footer-links mt-3 flex flex-col text-sm">
                  {col.links.map((l) => (
                    <li key={l.href}>
                      <Link
                        href={l.href}
                        {...(l.external ? { target: '_blank', rel: 'noreferrer' } : {})}
                      >
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            ))}
          </div>
        </div>
      </div>
      <div className="border-t border-fd-border">
        <p className="z-container z-small py-5 text-[0.8rem]">MIT &copy; 2026 Oscar Devos</p>
      </div>
    </footer>
  );
}
