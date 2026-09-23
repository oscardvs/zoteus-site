import { source } from '@/lib/source';
import { llms } from 'fumadocs-core/source';
import { absoluteMarkdownLinks, absoluteUrl, siteUrl } from '@/lib/seo';
import { appName, connectorUrl, npmUrl, plans, repoUrl, selfHostedPlan } from '@/lib/shared';

export const revalidate = false;

/**
 * llms.txt in the llmstxt.org shape: an H1 with the product name, a blockquote summary,
 * a paragraph of key facts, then the docs index. fumadocs' own `index()` opens with the
 * page tree's name ("# Documentation") and emits site-relative links, so this route
 * writes its own header and renders only the tree's children, with every link absolute.
 *
 * Prices are read from the same `plans` array as /pricing, so the two cannot disagree. The
 * free self-hosted option is no longer a card on /pricing, so it is prepended here by hand.
 */
function priceLine(): string {
  return [selfHostedPlan, ...plans]
    .map((plan) =>
      plan.period
        ? `${plan.name} ${plan.price}${plan.period} ${plan.altPrice} (${plan.seats.toLowerCase()})`
        : `${plan.name} free, with every feature (${plan.seats.toLowerCase()})`,
    )
    .join('; ');
}

export function GET() {
  const index = llms(source);
  const docs = source
    .getPageTree()
    .children.map((node) => index.indexNode(node))
    .join('\n');

  const out = [
    `# ${appName}`,
    '',
    `> ${appName} is an open-source MCP server that lets Claude and ChatGPT read a Zotero library: it searches by keyword or by meaning, returns passages from your PDFs with page numbers, finds your own notes and PDF annotations, and formats citations in any CSL style. It is for researchers, students and review teams who keep their references in Zotero.`,
    '',
    `${appName} reads first and writes second: besides search and quoted passages with page locators, it shows PDF pages and figures as images and compares papers in a cited evidence table, and it can also add items by DOI or arXiv id, tag, file, edit and highlight items, with a reversible trash. The free option is the MIT-licensed local install, which runs on your own computer in Claude Desktop (a one-click extension), Claude Code, Cursor, VS Code, Zed, Codex and Gemini CLI, has every feature, and reads the PDFs on your disk through the Zotero desktop app. The hosted option is a maintained connector at ${connectorUrl} for claude.ai (browser, desktop and mobile apps) and ChatGPT, where you sign in with your Zotero account and install nothing. ChatGPT only connects to remote HTTPS servers and needs Developer mode on a paid ChatGPT plan, so it uses the hosted connector or a self-hosted remote (free software, your own hosting costs). Prices: ${priceLine()}. Labs get a free 30-day pilot. Full details: ${absoluteUrl('/pricing')}`,
    '',
    '## Docs',
    '',
    absoluteMarkdownLinks(docs),
    '',
    '## Optional',
    '',
    `- [Home page](${siteUrl}/): what ${appName} does, with a recorded session in claude.ai`,
    `- [Pricing](${absoluteUrl('/pricing')}): plans, what to check before paying, and questions`,
    `- [Full docs as one Markdown file](${siteUrl}/llms-full.txt)`,
    `- [Source code on GitHub](${repoUrl})`,
    `- [npm package](${npmUrl})`,
    '',
  ];

  return new Response(out.join('\n'));
}
