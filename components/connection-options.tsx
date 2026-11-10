import Link from 'next/link';

const linkClass = 'text-[color:var(--accent-text)] underline underline-offset-[3px]';

/** Shared route selection for the homepage and documentation entry point. */
export function ConnectionOptions() {
  return (
    <div className="not-prose grid gap-4 md:grid-cols-2">
      <div className="z-panel flex flex-col gap-3 bg-fd-background p-6">
        <p className="z-label">Hosted</p>
        <h3 className="z-h2 text-[1.375rem]">Nothing to install</h3>
        <p className="z-body">For claude.ai, the Claude phone apps and ChatGPT. I keep the server running.</p>
        <p className="font-medium text-fd-foreground">
          <span className="z-mark">14 days free</span>, then €7 a month or €69 a year.
        </p>
        <div className="mt-auto flex flex-wrap gap-3 pt-3">
          <Link className="z-btn z-btn-secondary" href="/docs/connect-claude-to-zotero#claude-ai">Connect Claude</Link>
          <Link className="z-btn z-btn-secondary" href="/docs/connect-chatgpt-to-zotero">Connect ChatGPT</Link>
        </div>
        <p className="z-small">
          Your Claude or ChatGPT plan has to allow connectors.{' '}
          <Link
            className={linkClass}
            href="/pricing#plans"
            data-umami-event="pricing-click"
            data-umami-event-source="connection-options"
          >
            See the hosted plans
          </Link>
        </p>
      </div>
      <div className="z-panel flex flex-col gap-3 bg-fd-background p-6">
        <p className="z-label">Free</p>
        <h3 className="z-h2 text-[1.375rem]">On your own computer</h3>
        <p className="z-body">For Claude Desktop, Claude Code, Cursor and other desktop clients. Reads the Zotero app and your local PDFs.</p>
        <p className="font-medium text-fd-foreground">Open source, every feature.</p>
        <div className="mt-auto flex flex-wrap gap-3 pt-3">
          <Link className="z-btn z-btn-secondary" href="/docs/connect-claude-to-zotero#claude-desktop">Install in Claude Desktop</Link>
          <Link className="z-btn z-btn-secondary" href="/docs/connect-claude-to-zotero#claude-code">Claude Code</Link>
        </div>
        <p className="z-small">
          Keep Zotero open with its local API switched on.{' '}
          <Link className={linkClass} href="/docs/connect-claude-to-zotero#cursor">Cursor and other clients</Link>
        </p>
      </div>
    </div>
  );
}
