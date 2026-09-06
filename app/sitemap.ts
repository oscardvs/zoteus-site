import type { MetadataRoute } from 'next';
import { source } from '@/lib/source';
import { absoluteUrl } from '@/lib/seo';

export const dynamic = 'force-static';

/**
 * One sitemap for the whole static export: the four hand-written pages plus every docs
 * page the content loader knows about, so a new .mdx file is in the sitemap on its next
 * build without anyone remembering to add it.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const fixed: MetadataRoute.Sitemap = [
    { url: absoluteUrl('/'), priority: 1 },
    { url: absoluteUrl('/pricing'), priority: 0.9 },
    { url: absoluteUrl('/privacy'), priority: 0.3 },
    { url: absoluteUrl('/terms'), priority: 0.3 },
  ];
  const docs: MetadataRoute.Sitemap = source.getPages().map((page) => ({
    url: absoluteUrl(page.url),
    priority: page.slugs.length === 0 ? 0.9 : 0.7,
  }));
  return [...fixed, ...docs];
}
