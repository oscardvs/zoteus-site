# zoteus-site

The marketing and documentation site for [Zoteus](https://github.com/oscardvs/zoteus), an MCP server for Zotero libraries. It is served at [zoteus.com](https://zoteus.com).

The site is a [Fumadocs](https://fumadocs.dev) project on Next.js (App Router, static export). Docs pages are MDX files under `content/docs/`. On every push to `main`, the workflow in `.github/workflows/deploy.yml` builds the static export and deploys it to GitHub Pages; `public/CNAME` attaches the custom domain.

## Develop

The deploy workflow uses Node 22 and pnpm 10.

```bash
pnpm install
pnpm dev          # http://localhost:3000
pnpm build        # static export to out/
pnpm lint
pnpm types:check  # fumadocs-mdx + next typegen + tsc --noEmit
```

`pnpm install` runs `fumadocs-mdx` as a postinstall step to generate the content collections that `lib/source.ts` imports.

## Layout

| Path | What it is |
|---|---|
| `app/(home)/page.tsx` | Landing page |
| `app/(home)/pricing/page.tsx` | Pricing page for the self-hosted and hosted options |
| `app/(home)/privacy/page.tsx`, `app/(home)/terms/page.tsx` | Privacy policy and terms of service |
| `app/docs/[[...slug]]/page.tsx` | Docs pages rendered from `content/docs/*.mdx`; page order comes from `content/docs/meta.json` |
| `app/api/search/route.ts` | Static search index used by the docs search dialog |
| `app/llms.txt/route.ts`, `app/llms-full.txt/route.ts`, `app/llms.mdx/docs/[[...slug]]/route.ts` | Plain-text and Markdown versions of the docs for LLM clients |
| `app/og/home/image.png/route.tsx`, `app/og/docs/[...slug]/route.tsx` | Open Graph images for the home page and each docs page |
| `proxy.ts` | Rewrites `/docs/...` to the Markdown version when the client prefers Markdown or requests a `.md` URL |
| `lib/shared.ts` | Site-wide constants: app name, npm package and install command, hosted-tier price, contact addresses, connector URL, and the `hostedLive` switch that pauses hosted-tier sales |
| `lib/layout.shared.tsx` | Shared nav for the home and docs layouts |
| `lib/source.ts` | Fumadocs content loader |
| `components/` | Landing-page and docs components: copy-to-clipboard command, subscribe button, footer, search dialog, MDX components, Mermaid |

The docs under `content/docs/` cover the same topics as `docs/` in the Zoteus repository.

## Environment variables

| Variable | Read in | Purpose |
|---|---|---|
| `PAGES_BASE_PATH` | `next.config.mjs` | Next.js `basePath` and `assetPrefix`. Leave unset for zoteus.com; set to `/zoteus-site` to preview the site as a GitHub project page |

Nothing else is read from the environment.

## License

The site footer states MIT © 2026 Oscar Devos. This repository does not currently contain a LICENSE file. Zoteus is not affiliated with or endorsed by the Corporation for Digital Scholarship / Zotero.
