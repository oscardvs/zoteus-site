import type { MetadataRoute } from 'next';
import { source } from '@/lib/source';
import { absoluteUrl } from '@/lib/seo';
import { lastModified } from '@/lib/last-modified';

export const dynamic = 'force-static';

/**
 * One sitemap for the whole static export: the four hand-written pages plus every docs
 * page the content loader knows about, so a new .mdx file is in the sitemap on its next
 * build without anyone remembering to add it.
 *
 * Each entry carries the git commit date of the file that produces it. That is what tells
 * Google which URLs are worth recrawling; entries whose date cannot be resolved are sent
 * without one rather than with a guess.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const entry = (url: string, sourcePath: string, priority: number) => {
    const date = lastModified(sourcePath);
    return date ? { url, priority, lastModified: date } : { url, priority };
  };

  const fixed: MetadataRoute.Sitemap = [
    entry(absoluteUrl('/'), 'app/(home)/page.tsx', 1),
    entry(absoluteUrl('/pricing'), 'app/(home)/pricing/page.tsx', 0.9),
    entry(absoluteUrl('/privacy'), 'app/(home)/privacy/page.tsx', 0.3),
    entry(absoluteUrl('/terms'), 'app/(home)/terms/page.tsx', 0.3),
  ];
  const docs: MetadataRoute.Sitemap = source.getPages().map((page) =>
    entry(absoluteUrl(page.url), `content/docs/${page.path}`, page.slugs.length === 0 ? 0.9 : 0.7),
  );
  return [...fixed, ...docs];
}
