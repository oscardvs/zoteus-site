import { RootProvider } from 'fumadocs-ui/provider/next';
import './global.css';
import { Fraunces, IBM_Plex_Sans, JetBrains_Mono } from 'next/font/google';
import StaticSearchDialog from '@/components/search-dialog';
import { Analytics } from '@/components/analytics';
import type { Metadata } from 'next';
import { siteDescription, siteUrl } from '@/lib/seo';

const siteTitle = 'Zoteus: an open-source Zotero MCP server for Claude';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: siteTitle,
    template: '%s · Zoteus',
  },
  description: siteDescription,
  applicationName: 'Zoteus',
  keywords: [
    'Zotero MCP server',
    'connect Claude to Zotero',
    'Zotero Claude Desktop',
    'Zotero Claude Code',
    'Zotero Cursor MCP',
    'Zotero Model Context Protocol',
    'Zotero group library AI',
    'reference manager MCP',
    'citations MCP',
    'semantic search',
  ],
  authors: [{ name: 'Oscar Devos', url: 'https://github.com/oscardvs' }],
  creator: 'Oscar Devos',
  openGraph: {
    type: 'website',
    url: `${siteUrl}/`,
    siteName: 'Zoteus',
    title: siteTitle,
    description: siteDescription,
    locale: 'en_US',
    images: [{ url: '/og/home/image.png', width: 1200, height: 630, alt: 'Zoteus: an MCP server for your Zotero library' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: siteTitle,
    description: siteDescription,
    images: ['/og/home/image.png'],
  },
  robots: { index: true, follow: true },
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
        <Analytics />
      </body>
    </html>
  );
}
