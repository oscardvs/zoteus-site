import type { BaseLayoutProps } from 'fumadocs-ui/layouts/shared';
import { gitConfig } from './shared';

/** The long-form guides under /docs, linked from the nav menu and the footer. */
export const guides: { text: string; description: string; url: string }[] = [
  {
    text: 'Connect Claude to Zotero',
    description: 'Step by step, for Claude Desktop, Claude Code and claude.ai.',
    url: '/docs/connect-claude-to-zotero',
  },
  {
    text: 'Group libraries for review teams',
    description: 'Screening references together in one shared Zotero library.',
    url: '/docs/group-libraries-for-review-teams',
  },
  {
    text: 'Zoteus and zotero-mcp',
    description: 'How the two Zotero MCP servers compare.',
    url: '/docs/zoteus-and-zotero-mcp',
  },
];

export function baseOptions(): BaseLayoutProps {
  return {
    nav: {
      title: <span className="z-wordmark">Zoteus</span>,
      transparentMode: 'top',
    },
    links: [
      { text: 'Docs', url: '/docs', active: 'nested-url' },
      {
        type: 'menu',
        text: 'Guides',
        items: guides.map((g) => ({ text: g.text, description: g.description, url: g.url })),
      },
      { text: 'Pricing', url: '/pricing' },
      { text: 'What it does', url: '/#why' },
    ],
    githubUrl: `https://github.com/${gitConfig.user}/${gitConfig.repo}`,
  };
}
