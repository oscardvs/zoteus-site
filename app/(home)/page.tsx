import type { Metadata } from 'next';
import Link from 'next/link';
import { CopyCommand } from '@/components/copy-command';
import { DemoCard } from '@/components/demo-card';
import { JsonLd } from '@/components/json-ld';
import { SiteFooter } from '@/components/site-footer';
import { SystemDiagram } from '@/components/system-diagram';
import { siteDescription, softwareApplicationLd } from '@/lib/seo';
import { plans, repoUrl } from '@/lib/shared';

/* Title and description are inherited from the root layout; the home page only pins its canonical. */
export const metadata: Metadata = {
  alternates: { canonical: '/' },
};

function GitHubIcon() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden>
      <path d="M12 2.2A10 10 0 0 0 8.8 21.7c.5.1.7-.2.7-.5v-1.7c-2.8.6-3.4-1.3-3.4-1.3-.5-1.1-1.1-1.4-1.1-1.4-.9-.6.1-.6.1-.6 1 .1 1.5 1 1.5 1 .9 1.5 2.3 1.1 2.9.8.1-.6.3-1.1.6-1.3-2.2-.25-4.5-1.1-4.5-4.9 0-1.1.4-2 1-2.7-.1-.3-.4-1.3.1-2.6 0 0 .8-.3 2.7 1a9.3 9.3 0 0 1 5 0c1.9-1.3 2.7-1 2.7-1 .5 1.3.2 2.3.1 2.6.6.7 1 1.6 1 2.7 0 3.8-2.3 4.6-4.5 4.9.4.3.7.9.7 1.8v2.6c0 .3.2.6.7.5A10 10 0 0 0 12 2.2Z" />
    </svg>
  );
}

function ArrowIcon() {
  return (
    <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

const CLIENTS = ['Claude Desktop', 'Claude Code', 'Cursor', 'VS Code', 'Zed', 'Codex', 'Gemini CLI'];

const INSTALL = [
  { label: 'Claude Code', cmd: 'claude mcp add --transport stdio zoteus -- npx -y @oscardvs/zoteus' },
  { label: 'Any client (universal)', cmd: 'npx add-mcp @oscardvs/zoteus' },
];

/* Feature copy is unchanged. The tool names are the Zoteus tools that back
   each one, so a reader can match the claim to what the client will call. */
const FEATURES = [
  {
    title: 'Semantic search over your PDFs',
    body: 'Hybrid keyword and vector search across metadata, full text, and annotations, with page locators in the results. Runs on local embeddings by default.',
    tools: ['zotero_semantic_search', 'zotero_index', 'zotero_get_fulltext'],
  },
  {
    title: 'Citations from your own library',
    body: 'Zoteus reads the references in your Zotero library and formats them with citeproc-js in any CSL style.',
    tools: ['zotero_bibliography', 'zotero_format_bibliography', 'zotero_styles'],
  },
  {
    title: 'Add by identifier',
    body: 'Give it a DOI or arXiv id and it fetches the metadata and files the item. ISBN, PMID and URLs too, through a Zotero translation-server.',
    tools: ['zotero_import'],
  },
  {
    title: 'Safe, reversible writes',
    body: 'Versioned, optimistic-locked, reversible trash by default, gated delete.',
    tools: ['zotero_create_items', 'zotero_update_item', 'zotero_trash_items'],
  },
  {
    title: 'Runs on your machine',
    body: 'Reads go to the Zotero desktop app when it is running. Semantic search uses an on-device embedding model by default.',
    tools: ['Zotero local API, 127.0.0.1:23119'],
  },
  {
    title: 'Scholarly-context graph',
    body: 'Follow references and citing works through OpenAlex and Crossref. Zoteus also ships MCP Resources, Prompts, and the code-execution pattern for agent use.',
    tools: ['zotero_scholar'],
  },
];

export default function Home() {
  return (
    <main className="flex flex-col">
      <JsonLd data={softwareApplicationLd(siteDescription)} />
      {/* Hero */}
      <section className="border-b border-fd-border">
        <div className="z-container grid gap-12 py-14 sm:py-20 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-16 lg:py-28">
          <div>
            <p className="z-label">Open-source · Zotero MCP server</p>
            <h1 className="z-display z-h1 mt-5">Your whole Zotero library, inside Claude.</h1>
            <p className="z-lead mt-6 max-w-xl">
              Zoteus gives Claude, Cursor, and other MCP clients real access to your reference
              library: semantic search over your own PDFs, citations in any CSL style, add by
              DOI, attachments, and PDF highlights anchored to the text they quote.{' '}
              <strong>Installs with one command or a double-click. No Python.</strong>
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <CopyCommand />
              <Link href={repoUrl} className="z-btn z-btn-secondary" target="_blank" rel="noreferrer">
                <GitHubIcon />
                View on GitHub
              </Link>
            </div>
            <p className="z-label mt-6 flex flex-wrap gap-x-2 normal-case tracking-[0.02em]">
              <span>MIT-licensed</span>
              <span aria-hidden>·</span>
              <span>Runs on your machine</span>
              <span aria-hidden>·</span>
              <span>No telemetry</span>
            </p>
          </div>
          <DemoCard />
        </div>
      </section>

      {/* Clients */}
      <section className="border-b border-fd-border" aria-label="Supported clients">
        <div className="z-container flex flex-wrap items-baseline gap-x-6 gap-y-2 py-5">
          <span className="z-label">Works with</span>
          <ul className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-fd-muted-foreground">
            {CLIENTS.map((c) => (
              <li key={c}>{c}</li>
            ))}
          </ul>
        </div>
      </section>

      {/* The problem, and where Zoteus sits */}
      <section className="z-section">
        <div className="z-container">
          <div className="z-section-head">
            <h2 className="z-h2">
              Your references are in Zotero. Your AI client can&rsquo;t see them.
            </h2>
            <p className="z-lead">
              Without a connection, every new chat starts from nothing: you paste the same PDFs
              again, describe your library again, and a request for references can come back
              with <strong>citations that do not exist</strong>. Zoteus connects the library
              itself, so your AI works from <strong>what you&rsquo;ve already read and saved.</strong>
            </p>
          </div>
          <div className="mt-10 lg:mt-12">
            <SystemDiagram />
          </div>
        </div>
      </section>

      {/* Install */}
      <section id="install" className="z-section scroll-mt-20 border-t border-fd-border">
        <div className="z-container">
          <div className="z-section-head">
            <div>
              <p className="z-label">Install</p>
              <h2 className="z-h2 mt-3">One command for any MCP client.</h2>
            </div>
            <p className="z-lead">
              Reads work key-free against the running desktop app, and so do the personal-library
              writes that go through it. Add a Zotero API key for sync, group libraries, and writes
              when the app is closed.{' '}
              <Link href="/docs/connect-claude-to-zotero" className="text-[color:var(--accent-text)] underline underline-offset-[3px]">
                Step-by-step for Claude Desktop, claude.ai, Claude Code and Cursor
              </Link>
              .
            </p>
          </div>
          <div className="z-panel mt-10 divide-y divide-fd-border">
            {INSTALL.map((row) => (
              <div key={row.label} className="grid gap-3 p-4 sm:grid-cols-[11rem_minmax(0,1fr)] sm:items-center sm:gap-6 sm:px-6 sm:py-5">
                <p className="z-h3">{row.label}</p>
                <CopyCommand command={row.cmd} className="z-copy-wrap w-full" />
              </div>
            ))}
            <div className="grid gap-3 p-4 sm:grid-cols-[11rem_minmax(0,1fr)] sm:items-center sm:gap-6 sm:px-6 sm:py-5">
              <p className="z-h3">Claude Desktop</p>
              <p className="z-body text-[0.9375rem]">
                Download <code className="z-mono text-[0.875em] text-fd-foreground">zoteus.mcpb</code> from
                the{' '}
                <a
                  href={`${repoUrl}/releases/latest`}
                  className="text-[color:var(--accent-text)] underline underline-offset-[3px]"
                  target="_blank"
                  rel="noreferrer"
                >
                  latest release
                </a>{' '}
                and double-click it.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* What it does */}
      <section id="why" className="z-section scroll-mt-20 border-t border-fd-border">
        <div className="z-container">
          <div className="z-section-head">
            <div>
              <p className="z-label">What it does</p>
              <h2 className="z-h2 mt-3">Search, cite, add, and write back to your own library.</h2>
            </div>
            <div className="lg:justify-self-end">
              <Link href="/docs" className="z-link">
                Read the docs <ArrowIcon />
              </Link>
            </div>
          </div>
          <dl className="mt-8 grid gap-x-12 md:grid-cols-2">
            {FEATURES.map((f) => (
              <div key={f.title} className="border-t border-fd-border py-6">
                <dt className="z-h3 text-fd-foreground">{f.title}</dt>
                <dd className="z-body mt-2 text-[0.9375rem]">{f.body}</dd>
                <dd className="z-mono mt-3 text-[0.75rem] leading-relaxed text-fd-muted-foreground [overflow-wrap:anywhere]">
                  {f.tools.join(' · ')}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* Pricing */}
      <section className="z-section border-t border-fd-border">
        <div className="z-container">
          <div className="z-section-head">
            <div>
              <p className="z-label">Pricing</p>
              <h2 className="z-h2 mt-3">Free to self-host. Hosted for you or your lab.</h2>
            </div>
            <p className="z-lead">
              Self-hosting stays free, with every feature, permanently. The hosted plans sell
              hosting, seats and support, never features.
            </p>
          </div>
          <div className="z-panel mt-10 grid gap-px overflow-hidden bg-fd-border sm:grid-cols-2 xl:grid-cols-4">
            {plans.map((plan) => (
              <div key={plan.id} className="flex flex-col bg-fd-card p-5 sm:p-6">
                <h3 className="z-h3">{plan.name}</h3>
                <p className="mt-3 flex items-baseline gap-1">
                  <span className="z-display text-[1.9rem] leading-none">{plan.price}</span>
                  {plan.period && <span className="z-small">{plan.period}</span>}
                </p>
                <p className="z-small mt-1.5">{plan.altPrice}</p>
                <p className="z-body mt-3 flex-1 text-[0.9375rem]">{plan.blurb}</p>
                <p className="z-label mt-4">{plan.seats}</p>
              </div>
            ))}
          </div>
          <Link href="/pricing" className="z-link mt-6">
            Compare the plans <ArrowIcon />
          </Link>
        </div>
      </section>

      {/* Closing */}
      <section className="border-t border-fd-border">
        <div className="z-container grid gap-8 py-16 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center lg:py-24">
          <div>
            <h2 className="z-h2">Connect your Zotero library.</h2>
            <p className="z-lead mt-3 max-w-xl">
              One command in your MCP client. Open-source and free to self-host.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <CopyCommand />
            <Link href={repoUrl} className="z-btn z-btn-secondary" target="_blank" rel="noreferrer">
              <GitHubIcon /> View on GitHub
            </Link>
          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
