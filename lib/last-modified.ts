import { execFileSync } from 'node:child_process';

/**
 * Last-modified dates for <lastmod> in the sitemap and dateModified in the docs JSON-LD.
 *
 * Google leans on lastmod to decide what is worth recrawling, and a date it can catch out
 * is worse than no date at all, so this reads the git commit date and never the file's
 * mtime: CI rewrites every mtime to the moment of checkout, which would claim the whole
 * site changed on every deploy.
 *
 * It needs real history, so the deploy workflow checks out with `fetch-depth: 0`. On a
 * shallow clone (or outside a repo) the lookup returns undefined and the caller simply
 * omits the field rather than inventing one.
 */
const cache = new Map<string, Date | undefined>();

export function lastModified(repoPath: string): Date | undefined {
  const hit = cache.get(repoPath);
  if (hit !== undefined || cache.has(repoPath)) return hit;

  let date: Date | undefined;
  try {
    const iso = execFileSync('git', ['log', '-1', '--format=%cI', '--', repoPath], {
      encoding: 'utf8',
      stdio: ['ignore', 'pipe', 'ignore'],
    }).trim();
    const parsed = iso ? new Date(iso) : undefined;
    if (parsed && !Number.isNaN(parsed.getTime())) date = parsed;
  } catch {
    date = undefined;
  }

  cache.set(repoPath, date);
  return date;
}
