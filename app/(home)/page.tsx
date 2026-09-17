import type { Metadata } from 'next';
import Link from 'next/link';
import { CopyCommand } from '@/components/copy-command';
import { DemoVideo } from '@/components/demo-video';
import { JsonLd } from '@/components/json-ld';
import { SiteFooter } from '@/components/site-footer';
import { ConnectionOptions } from '@/components/connection-options';
import { demoVideoLd, siteDescription, softwareApplicationLd } from '@/lib/seo';
import { DEMO_VIDEO_DESCRIPTION } from '@/lib/shared';
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

const CLIENTS = ['Claude Desktop', 'Claude Code', 'ChatGPT', 'Cursor', 'VS Code', 'Zed', 'Codex', 'Gemini CLI'];

const INSTALL = [
  { label: 'Claude Code', cmd: 'claude mcp add --transport stdio zoteus -- npx -y @oscardvs/zoteus' },
  { label: 'Any client (universal)', cmd: 'npx add-mcp @oscardvs/zoteus' },
];

/* Tool names link the research outcomes to the available operations. */
const FEATURES = [
  {
    title: 'Find a paper or a passage',
    body: 'Search titles, abstracts, notes and annotations. Search by meaning needs an active embedding provider; PDF-body indexing is opt-in. Read the matched passage to verify its page and context.',
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
    title: 'Review changes to your library',
    body: 'Preview a metadata edit before applying it. Trash can be restored; arbitrary metadata changes do not have automatic undo.',
    tools: ['zotero_create_items', 'zotero_update_item', 'zotero_trash_items'],
  },
  {
    title: 'Runs on your machine',
    body: 'The free local route reads from your running Zotero app. You can install an on-device embedding model. Retrieved excerpts still go to the AI service you choose.',
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
      <JsonLd data={demoVideoLd(DEMO_VIDEO_DESCRIPTION)} />
      {/* Hero */}
      <section className="border-b border-fd-border">
        <div className="z-container grid items-center gap-10 py-14 sm:py-20 lg:grid-cols-[minmax(0,1.12fr)_minmax(0,0.88fr)] lg:gap-14 lg:py-24">
          <div className="max-w-2xl">
            <p className="z-label">Open-source · Zotero MCP server</p>
            <h1 className="z-display z-h1 mt-5 max-w-[17ch]">Find the evidence you saved in Zotero.</h1>
            <p className="z-lead mt-6 max-w-xl">
              Ask questions about your papers and notes in Claude or ChatGPT. Retrieve passages
              with page references, compare evidence, and turn your annotations into cited notes.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link href="#connect" className="z-btn z-btn-primary">Connect my library <ArrowIcon /></Link>
              <Link href="#research-examples" className="z-btn z-btn-secondary">See research workflows</Link>
            </div>
            <p className="z-label mt-6 flex flex-wrap gap-x-2 normal-case tracking-[0.02em]">
              <span>MIT-licensed</span>
              <span aria-hidden>·</span>
              <span>Free local install</span>
              <span aria-hidden>·</span>
              <span>Optional hosted plans</span>
            </p>
          </div>
          <DemoVideo />
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

      {/* Testimonial */}
      <section className="border-b border-fd-border" aria-label="What researchers say">
        <div className="z-container py-8 sm:py-10">
          <figure className="mx-auto max-w-3xl text-center">
            <blockquote className="z-body text-[1.0625rem] leading-relaxed sm:text-[1.125rem]">
              <p>
                &ldquo;I am able to talk to my Zotero library and notes and query things that I would
                have otherwise been unable to do. It&rsquo;s made years of research trickling in in
                bits and pieces become part of a larger whole.&rdquo;
              </p>
            </blockquote>
            <figcaption className="z-small mt-3">
              Ishaan Jajodia, PhD Candidate, Department of Political Science, Yale University
            </figcaption>
          </figure>
        </div>
      </section>

      <section id="connect" className="z-section scroll-mt-20">
        <div className="z-container">
          <p className="z-label">Connect your library</p>
          <h2 className="z-h2 mt-3 mb-8">Choose where you want to work.</h2>
          <ConnectionOptions />
          <p className="z-small mt-5">Connected already? <Link className="z-link" href="/docs/first-research-task">Find and verify your first passage</Link>.</p>
        </div>
      </section>

      <section id="research-examples" className="z-section border-t border-fd-border">
        <div className="z-container">
          <p className="z-label">Research workflows</p>
          <h2 className="z-h2 mt-3">From a question to evidence you can check.</h2>
          <p className="z-lead mt-4 max-w-3xl">These example prompts show what to ask and how to review the result. The recording above shows a real library session. The outputs below are illustrative formats, not findings from your library.</p>
          <div className="mt-8 grid gap-4 lg:grid-cols-3">
            {[
              { title: 'Recover a forgotten passage', prompt: 'Find the paper where I highlighted an objection to this method. Quote the passage with its page.', result: 'Paper title · your highlight or comment · retrieved quotation · page to verify', href: '/docs/first-research-task', label: 'Try a first evidence question' },
              { title: 'Compare several papers', prompt: 'Compare how these five papers support my question. Read the relevant passages first and mark missing evidence.', result: 'Study · finding · quotation · page · supported, contradicted, or unverified', href: '/docs/first-research-task#compare-evidence', label: 'Build an evidence table' },
              { title: 'Turn annotations into a note', prompt: 'Find my objections and decisions about this topic. Draft a cited note and show it to me before saving.', result: 'Your comment · source passage · cited synthesis · draft for your review', href: '/docs/annotations-to-literature-notes', label: 'Work with your annotations' },
            ].map((example) => (
              <article key={example.title} className="z-panel flex flex-col p-6">
                <h3 className="z-h3">{example.title}</h3>
                <p className="z-body mt-4">{example.prompt}</p>
                <p className="z-label mt-5">Result to check</p>
                <p className="z-small mt-2 mb-5">{example.result}</p>
                <Link href={example.href} className="z-link mt-auto">{example.label} <ArrowIcon /></Link>
              </article>
            ))}
          </div>
          <p className="z-small mt-6">A real reference does not guarantee a correct AI conclusion. Open the source passage, check its context, and label synthesis based only on abstracts.</p>
        </div>
      </section>

      {/* Install */}
      <section id="install" className="z-section scroll-mt-20 border-t border-fd-border">
        <div className="z-container">
          <div className="z-section-head">
            <div>
              <p className="z-label">Install</p>
              <h2 className="z-h2 mt-3">Prefer a terminal? Start locally.</h2>
            </div>
            <p className="z-lead">
              Reads work key-free against the running desktop app, and so do the personal-library
              writes that go through it. Add a Zotero API key for sync, group libraries, and writes
              when the app is closed.{' '}
              <Link href="/docs/connect-claude-to-zotero" className="text-[color:var(--accent-text)] underline underline-offset-[3px]">
                Step-by-step for Claude Desktop, claude.ai, ChatGPT, Claude Code and Cursor
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
                Download the <code className="z-mono text-[0.875em] text-fd-foreground">.mcpb</code> for your system from
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
              Choose hosted access or a free local install, then verify one passage from a paper you know.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <Link href="#connect" className="z-btn z-btn-primary">Connect my library <ArrowIcon /></Link>
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
