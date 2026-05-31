import { RootProvider } from 'fumadocs-ui/provider/next';
import './global.css';
import { Fraunces, IBM_Plex_Sans, JetBrains_Mono } from 'next/font/google';
import StaticSearchDialog from '@/components/search-dialog';
import type { Metadata } from 'next';

const description =
  'The everything Zotero MCP server. Give Claude and any MCP client safe access to your Zotero library — search, add-by-DOI, CSL citations, and local semantic search over your PDFs. Real citations from your own library, not hallucinations. Local-first, open-source.';

export const metadata: Metadata = {
  metadataBase: new URL('https://zoteus.com'),
  title: {
    default: 'Zoteus — Your Zotero library, inside every AI conversation',
    template: '%s · Zoteus',
  },
  description,
  applicationName: 'Zoteus',
  keywords: [
    'Zotero MCP server',
    'Zotero Model Context Protocol',
    'Zotero for Claude',
    'reference manager MCP',
    'citations MCP',
    'semantic search',
    'bibliography',
    'academic research',
  ],
  authors: [{ name: 'Oscar Devos' }],
  openGraph: {
    type: 'website',
    url: 'https://zoteus.com',
    siteName: 'Zoteus',
    title: 'Zoteus — Your Zotero library, inside every AI conversation',
    description:
      'Real citations from your own library, not hallucinations. Local-first, open-source Zotero MCP server.',
    images: [{ url: '/og/home/image.png', width: 1200, height: 630, alt: 'Zoteus' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Zoteus — Your Zotero library, inside every AI conversation',
    description:
      'Real citations from your own library, not hallucinations. Local-first, open-source Zotero MCP server.',
    images: ['/og/home/image.png'],
  },
};

const fraunces = Fraunces({
  subsets: ['latin'],
  variable: '--font-fraunces',
  axes: ['SOFT', 'opsz'],
  display: 'swap',
});

const plex = IBM_Plex_Sans({
  subsets: ['latin'],
  variable: '--font-plex',
  weight: ['300', '400', '500', '600'],
  display: 'swap',
});

const mono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono-jet',
  weight: ['400', '500'],
  display: 'swap',
});

export default function Layout({ children }: LayoutProps<'/'>) {
  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${plex.variable} ${mono.variable}`}
      suppressHydrationWarning
    >
      <body className="flex flex-col min-h-screen">
        {/* Mark JS as available before paint so .z-reveal content is visible
            without JS (crawlers/no-JS) and only hidden-then-revealed with it. */}
        <script
          dangerouslySetInnerHTML={{
            __html: "document.documentElement.classList.add('js')",
          }}
        />
        <RootProvider search={{ SearchDialog: StaticSearchDialog }}>
          {children}
        </RootProvider>
      </body>
    </html>
  );
}
