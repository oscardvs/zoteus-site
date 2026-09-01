import type { BaseLayoutProps } from 'fumadocs-ui/layouts/shared';
import { gitConfig } from './shared';

function Wordmark() {
  return (
    <span className="z-wordmark">
      <svg viewBox="0 0 24 24" width="15" height="15" className="z-bolt" aria-hidden="true">
        <path d="M13 2 4.6 13.4H11l-1 8.6L19.4 10.2H13V2Z" fill="currentColor" />
      </svg>
      <span>Zoteus</span>
    </span>
  );
}

export function baseOptions(): BaseLayoutProps {
  return {
    nav: {
      title: <Wordmark />,
      transparentMode: 'top',
    },
    links: [
      { text: 'Docs', url: '/docs' },
      { text: 'Pricing', url: '/pricing' },
      { text: 'What it does', url: '/#why' },
    ],
    githubUrl: `https://github.com/${gitConfig.user}/${gitConfig.repo}`,
  };
}
