import { RootProvider } from 'fumadocs-ui/provider/next';
import './global.css';
import { Fraunces, IBM_Plex_Sans, JetBrains_Mono } from 'next/font/google';
import StaticSearchDialog from '@/components/search-dialog';
import type { Metadata } from 'next';

const description =
  'Zoteus is an open-source MCP server that gives Claude and other MCP clients access to your Zotero library: search, add by DOI, CSL citations, and local semantic search over your PDFs. Runs on your machine, MIT licensed.';

export const metadata: Metadata = {
  metadataBase: new URL('https://zoteus.com'),
  title: {
    default: 'Zoteus: an MCP server for your Zotero library',
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
    title: 'Zoteus: an MCP server for your Zotero library',
    description:
      'Open-source Zotero MCP server for Claude and other MCP clients: search, citations, safe writes, semantic search, and PDF passages.',
    images: [{ url: '/og/home/image.png', width: 1200, height: 630, alt: 'Zoteus' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Zoteus: an MCP server for your Zotero library',
    description:
      'Open-source Zotero MCP server for Claude and other MCP clients: search, citations, safe writes, semantic search, and PDF passages.',
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
