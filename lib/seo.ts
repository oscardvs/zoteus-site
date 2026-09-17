import { appName, npmUrl, plans, repoUrl } from './shared';

/** The public origin. Every canonical, sitemap entry and JSON-LD url is built from it. */
export const siteUrl = 'https://zoteus.com';

/**
 * Canonical path for a route. The site is exported with `trailingSlash: true`, so every
 * served URL ends in a slash (GitHub Pages 301s `/pricing` to `/pricing/`). A canonical
 * must match the served URL exactly, so it always carries the slash too.
 */
export function canonicalPath(path: string): string {
  const p = path.startsWith('/') ? path : `/${path}`;
  return p.endsWith('/') ? p : `${p}/`;
}

export function absoluteUrl(path: string): string {
  return `${siteUrl}${canonicalPath(path)}`;
}

const author = {
  '@type': 'Person',
  name: 'Oscar Devos',
  url: 'https://github.com/oscardvs',
} as const;

const publisher = {
  '@type': 'Organization',
  name: appName,
  url: `${siteUrl}/`,
  logo: { '@type': 'ImageObject', url: `${siteUrl}/icon.svg` },
} as const;

/** "€69" -> 69, "Free" -> 0. Prices live in lib/shared.ts and are never repeated here. */
function priceNumber(price: string): number {
  const n = Number.parseFloat(price.replace(/[^0-9.]/g, ''));
  return Number.isFinite(n) ? n : 0;
}

/**
 * SoftwareApplication for the home page. No aggregateRating: there are no collected
 * ratings, and inventing one is the kind of markup Google penalises. Offers are derived
 * from the plans array so the structured data can never disagree with /pricing.
 */
export function softwareApplicationLd(description: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: appName,
    url: `${siteUrl}/`,
    description,
    applicationCategory: 'ReferenceApplication',
    applicationSubCategory: 'Model Context Protocol (MCP) server for Zotero',
    operatingSystem: 'macOS, Windows, Linux',
    softwareRequirements: 'Node.js 20.19 or newer, or the Claude Desktop extension bundle; a Zotero library',
    license: 'https://opensource.org/license/mit',
    isAccessibleForFree: true,
    downloadUrl: npmUrl,
    installUrl: absoluteUrl('/docs/connect-claude-to-zotero'),
    softwareHelp: { '@type': 'CreativeWork', url: absoluteUrl('/docs') },
    sameAs: [repoUrl, npmUrl, 'https://registry.modelcontextprotocol.io'],
    author,
    offers: plans.map((plan) => ({
      '@type': 'Offer',
      name: `${appName} ${plan.name}`,
      price: priceNumber(plan.price),
      priceCurrency: 'EUR',
      description: [plan.period ? `per ${plan.period.replace('/', '')}` : 'self-hosted, free', plan.seats.toLowerCase()].join(', '),
      url: absoluteUrl('/pricing'),
    })),
    featureList: [
      'Hybrid keyword and semantic search over a Zotero library',
      'Passages from PDFs with page locators',
      'Bibliographies in any CSL style via citeproc-js',
      'Add items by DOI or arXiv id',
      'Create, edit, tag and organise items; reversible trash by default',
      'PDF highlights, underlines and notes anchored to a quoted passage',
      'Zotero group libraries',
      'Hosted connector for claude.ai and ChatGPT, or self-host the OAuth remote',
    ],
  };
}

/** FAQPage for a page that really renders those questions and answers on screen. */
export function faqPageLd(items: ReadonlyArray<{ q: string; a: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: { '@type': 'Answer', text: item.a },
    })),
  };
}

/**
 * TechArticle for a docs page: title, description and canonical url, nothing invented.
 * dateModified is the git commit date of the .mdx file and is omitted when history is
 * unavailable, so the markup never claims a freshness the page cannot back up.
 */
export function techArticleLd(page: {
  title: string;
  description?: string;
  path: string;
  modified?: Date;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'TechArticle',
    headline: page.title,
    description: page.description,
    url: absoluteUrl(page.path),
    inLanguage: 'en',
    ...(page.modified ? { dateModified: page.modified.toISOString() } : {}),
    author,
    publisher,
    about: { '@type': 'SoftwareApplication', name: appName, url: `${siteUrl}/` },
  };
}

/** The one meta description for the home page and the SoftwareApplication node. Under 160 characters. */
export const siteDescription =
  'Find evidence in your Zotero papers and notes with Claude or ChatGPT. Verify PDF passages, compare sources and cite. Free local install or hosted access.';
