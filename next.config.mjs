import { createMDX } from 'fumadocs-mdx/next';

const withMDX = createMDX();

/**
 * Zoteus marketing + docs site.
 * Served from the apex custom domain (zoteus.com) via GitHub Pages,
 * so NO basePath/assetPrefix (those are only for project pages).
 * @type {import('next').NextConfig}
 */
const config = {
  reactStrictMode: true,
  output: 'export',
  trailingSlash: true,
  images: { unoptimized: true },
};

export default withMDX(config);
