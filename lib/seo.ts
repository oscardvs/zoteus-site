import { appName, npmUrl, plans, repoUrl, selfHostedPlan } from './shared';

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

/**
 * Absolute form of a site-relative href that may carry a #fragment or ?query, or point
 * at a file. A page path gets the canonical trailing slash; a file path (its last
 * segment has an extension, e.g. /images/x.png or /llms-full.txt) is left as it is.
 */
export function absoluteHref(href: string): string {
  const cut = href.search(/[?#]/);
  const path = cut === -1 ? href : href.slice(0, cut);
  const rest = cut === -1 ? '' : href.slice(cut);
  const last = path.slice(path.lastIndexOf('/') + 1);
  return `${siteUrl}${last.includes('.') ? path : canonicalPath(path)}${rest}`;
}

/**
 * Rewrites every site-relative Markdown link or image, `](/...)`, to an absolute
 * https://zoteus.com URL. llms.txt and the Markdown copies of the docs are read out of
 * context by crawlers and assistants, where a bare /docs/... path resolves to nothing.
 */
export function absoluteMarkdownLinks(markdown: string): string {
  return markdown.replace(/\]\((\/[^)\s]*)\)/g, (_m, href: string) => `](${absoluteHref(href)})`);
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
    offers: [selfHostedPlan, ...plans].map((plan) => ({
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

/**
 * VideoObject for the home page recording. Every value is measured or recorded, not
 * estimated: the duration comes from the file (28s), and uploadDate is the day the
 * session was captured against the maintainer's own library. Google needs name,
 * description, thumbnailUrl and uploadDate before it will consider a video at all.
 */
export function demoVideoLd(description: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'VideoObject',
    name: 'Zoteus answering a question from a Zotero library in claude.ai',
    description,
    thumbnailUrl: [`${siteUrl}/demo/claude-ai-poster.jpg`],
    uploadDate: '2026-09-06T20:51:59+02:00',
    duration: 'PT28S',
    contentUrl: `${siteUrl}/demo/claude-ai.mp4`,
    embedUrl: `${siteUrl}/#research-example`,
    isFamilyFriendly: true,
    inLanguage: 'en',
    publisher,
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
 * Questions and answers from a docs page's "## Frequently asked questions" section, read
 * out of the page's own processed Markdown: each `### Question` heading and the paragraph
 * under it. The visible section is the only source, so the FAQPage markup built from it
 * can never say something the page does not. Links, emphasis and code marks are reduced
 * to their text. Returns [] when the page has no such section.
 */
export function faqFromMarkdown(markdown: string): { q: string; a: string }[] {
  const section = /^## Frequently asked questions\b.*$([\s\S]*?)(?=^## |(?![\s\S]))/m.exec(markdown);
  if (!section) return [];
  const plain = (s: string) =>
    s
      .replace(/!?\[([^\]]*)\]\([^)]*\)/g, '$1')
      .replace(/\*\*([^*]+)\*\*/g, '$1')
      .replace(/\*([^*]+)\*/g, '$1')
      .replace(/`([^`]+)`/g, '$1')
      .replace(/\s+/g, ' ')
      .trim();
  return section[1]
    .split(/^### /m)
    .slice(1)
    .map((block) => {
      const newline = block.indexOf('\n');
      const heading = newline === -1 ? block : block.slice(0, newline);
      const body = newline === -1 ? '' : block.slice(newline + 1);
      return { q: plain(heading.replace(/\s*\[#[^\]]+\]\s*$/, '')), a: plain(body) };
    })
    .filter((item) => item.q && item.a);
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
