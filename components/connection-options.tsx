import Link from 'next/link';

/** Shared route selection for the homepage and documentation entry point. */
export function ConnectionOptions() {
  return (
    <div className="not-prose grid gap-4 md:grid-cols-2">
      <div className="z-panel flex flex-col gap-4 p-6">
        <h3 className="z-h3">Hosted: nothing to install</h3>
        <p className="z-body">Use your synced Zotero library in Claude or ChatGPT. Zoteus maintains the server and provides email support. Individual starts at €7/month or €69/year.</p>
        <p className="z-small">You need access to custom connectors in your AI account. Hosted access cannot read files that exist only on your computer or in your WebDAV storage.</p>
        <div className="mt-auto flex flex-wrap gap-3">
          <Link className="z-btn z-btn-secondary" href="/docs/connect-claude-to-zotero#claude-ai">Connect Claude</Link>
          <Link className="z-btn z-btn-secondary" href="/docs/connect-chatgpt-to-zotero">Connect ChatGPT</Link>
        </div>
        <Link className="z-link" href="/pricing#before-you-pay">Requirements and hosted plans</Link>
      </div>
      <div className="z-panel flex flex-col gap-4 p-6">
        <h3 className="z-h3">Free: run on your computer</h3>
        <p className="z-body">Connect Claude Desktop to the Zotero app and read your local PDFs. The open-source software is free, with the same tools and community support.</p>
        <p className="z-small">Keep Zotero running and enable its local API. Keyword search works without embeddings; search by meaning needs extra setup. Retrieved text is still sent to your chosen AI service.</p>
        <div className="mt-auto flex flex-wrap gap-3">
          <Link className="z-btn z-btn-secondary" href="/docs/connect-claude-to-zotero#claude-desktop">Install in Claude Desktop</Link>
          <Link className="z-btn z-btn-secondary" href="/docs/connect-claude-to-zotero#claude-code">Claude Code</Link>
        </div>
        <Link className="z-link" href="/docs/connect-claude-to-zotero#cursor">Cursor and other clients</Link>
      </div>
    </div>
  );
}
