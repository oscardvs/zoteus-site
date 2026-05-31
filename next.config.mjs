import { createMDX } from 'fumadocs-mdx/next';

const withMDX = createMDX();

/**
 * Zoteus marketing + docs site.
 * Final home is the apex custom domain zoteus.com (basePath '').
 * The github.io PROJECT-PAGE preview serves from /zoteus-site, so CI sets
 * PAGES_BASE_PATH=/zoteus-site to make assets resolve there.
 * → When the custom domain is attached, delete PAGES_BASE_PATH from the
 *   deploy workflow (and add the zoteus.com CNAME). basePath returns to ''.
 * @type {import('next').NextConfig}
 */
const basePath = process.env.PAGES_BASE_PATH || '';
const config = {
  reactStrictMode: true,
  output: 'export',
  trailingSlash: true,
  images: { unoptimized: true },
  basePath,
  assetPrefix: basePath || undefined,
};

export default withMDX(config);
