import type { Metadata } from 'next';
import Link from 'next/link';
import { CopyCommand } from '@/components/copy-command';
import { DemoVideo } from '@/components/demo-video';
import { JsonLd } from '@/components/json-ld';
import { SiteFooter } from '@/components/site-footer';
import { ConnectionOptions } from '@/components/connection-options';
import { demoVideoLd, siteDescription, softwareApplicationLd } from '@/lib/seo';
import { DEMO_VIDEO_DESCRIPTION } from '@/lib/shared';
import { plans, repoUrl, selfHostedPlan, supportEmail } from '@/lib/shared';

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

const INSTALL = [
  { label: 'Claude Code', cmd: 'claude mcp add --transport stdio zoteus -- npx -y @oscardvs/zoteus' },
  { label: 'Any other client', cmd: 'npx add-mcp @oscardvs/zoteus' },
];

const ASKS = [
  {
    prompt: 'Find the paper where I highlighted an objection to this method. Quote the passage with its page.',
    gets: ['the paper', 'your highlight', 'the quote', 'its page'],
    href: '/docs/first-research-task',
    label: 'Try a first question',
  },
  {
    prompt: 'Compare how these five papers support my question. Read the relevant passages first and mark missing evidence.',
    gets: ['a table', 'one row per study', 'quote and page', 'supported or not'],
    href: '/docs/first-research-task#compare-evidence',
    label: 'Build an evidence table',
  },
  {
    prompt: 'Find my objections and decisions about this topic. Draft a cited note and show it to me before saving.',
    gets: ['a draft note', 'your own comments', 'the sources', 'saved only when you say so'],
    href: '/docs/annotations-to-literature-notes',
    label: 'Work with your annotations',
  },
];

const FEATURES = [
  { verb: 'Find', body: 'A paper, a note, a highlight, or the exact passage with its page.' },
  { verb: 'Cite', body: 'Bibliographies from your own records, in any CSL style.' },
  { verb: 'Add', body: 'Give it a DOI, arXiv id, ISBN, PMID or URL and it files the item.' },
  { verb: 'Edit', body: 'Preview a metadata change before it is applied. Trash can be restored, other edits have no undo.' },
  { verb: 'Follow', body: 'See what a paper cites and what cites it.' },
  { verb: 'Check', body: 'Paste a draft. It lists the citations missing from your library and the quotations that are not in the paper.' },
  { verb: 'Screen', body: 'Review teams record include and exclude decisions as Zotero tags and get the PRISMA numbers.' },
  { verb: 'Stay local', body: 'The free install reads the Zotero app and the PDFs on your machine.' },
];

const LIMITS = [
  'What it retrieves goes to the AI you use, local install included.',
  'Hosted can’t see PDFs stored only on your computer or in WebDAV.',
  'Hosted search by meaning covers titles, abstracts, notes and highlights. To build it, that text is sent to OpenAI.',
  'The model can misread a paper. Open the page.',
];

const linkClass = 'text-[color:var(--accent-text)] underline underline-offset-[3px]';

export default function Home() {
  return (
    <main className="flex flex-col">
      <JsonLd data={softwareApplicationLd(siteDescription)} />
      <JsonLd data={demoVideoLd(DEMO_VIDEO_DESCRIPTION)} />

      {/* Hero */}
      <section>
        <div className="z-container grid items-center gap-10 py-12 sm:py-16 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:gap-14 lg:py-20">
          <div className="max-w-2xl">
            <h1 className="z-display z-h1">
              Ask Claude or ChatGPT about the papers in <span className="z-mark">your Zotero library</span>.
            </h1>
            <p className="z-lead mt-6 max-w-xl">
              Zoteus connects them. Ask where you read something and get the passage back with its
              page number. Compare what your papers say. Turn your highlights into notes with the
              sources attached.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-3">
              <Link href="#connect" className="z-btn z-btn-primary">Connect my library <ArrowIcon /></Link>
              <Link
                href="/pricing#plans"
                className={linkClass}
                data-umami-event="home-pricing-click"
                data-umami-event-source="hero"
              >
                Hosted from €7/month, 14 days free
              </Link>
            </div>
            <p className="z-small mt-6 max-w-xl">
              Free and open source if you run it on your own computer. Works with Claude Desktop,
              Claude Code, ChatGPT, Cursor, VS Code, Zed, Codex and Gemini CLI.
            </p>
          </div>
          <DemoVideo />
        </div>
      </section>

      {/* Testimonial */}
      <section aria-label="What researchers say">
        <div className="z-container pb-6 sm:pb-10">
          <figure className="z-quote max-w-3xl">
            <blockquote>
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

      {/* What you can ask */}
      <section id="research-examples" className="z-section scroll-mt-20">
        <div className="z-container">
          <h2 className="z-h2">Things you can ask it</h2>
          <ul className="mt-8 grid gap-8 lg:grid-cols-3 lg:gap-6">
            {ASKS.map((ask) => (
              <li key={ask.href} className="flex flex-col">
                <p className="z-bubble">{ask.prompt}</p>
                <ul className="mt-4 flex flex-wrap gap-1.5" aria-label="What you get back">
                  {ask.gets.map((g) => (
                    <li key={g} className="z-chip">{g}</li>
                  ))}
                </ul>
                <Link href={ask.href} className={`${linkClass} mt-4 text-[0.9375rem]`}>{ask.label}</Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Connect */}
      <section id="connect" className="z-section scroll-mt-20 bg-fd-card">
        <div className="z-container">
          <h2 className="z-h2 mb-8">Two ways to connect</h2>
          <ConnectionOptions />
          <p className="z-small mt-5">
            Already connected?{' '}
            <Link className={linkClass} href="/docs/first-research-task">Find and check your first passage</Link>.
          </p>
        </div>
      </section>

      {/* What it does */}
      <section id="why" className="z-section scroll-mt-20">
        <div className="z-container z-split">
          <div>
            <h2 className="z-h2">What it does</h2>
            <p className="mt-3">
              <Link href="/docs" className={linkClass}>Read the docs</Link>
            </p>
          </div>
          <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_17rem] lg:gap-12">
            <dl className="grid gap-x-10 gap-y-6 sm:grid-cols-2">
              {FEATURES.map((f) => (
                <div key={f.verb}>
                  <dt className="z-verb">{f.verb}</dt>
                  <dd className="z-body mt-1 text-[0.9375rem]">{f.body}</dd>
                </div>
              ))}
            </dl>
            <aside className="z-note">
              <h3 className="z-h3">Worth knowing</h3>
              <ul className="mt-3 space-y-3 text-[0.9375rem] leading-snug">
                {LIMITS.map((l) => (
                  <li key={l}>{l}</li>
                ))}
              </ul>
            </aside>
          </div>
        </div>
      </section>

      {/* Install */}
      <section id="install" className="z-section scroll-mt-20 border-t border-fd-border">
        <div className="z-container z-split">
          <div>
            <h2 className="z-h2">Prefer a terminal?</h2>
            <p className="z-small mt-3">
              No API key needed while Zotero is open.{' '}
              <Link href="/docs/connect-claude-to-zotero" className={linkClass}>Step-by-step guide</Link>
            </p>
          </div>
          <div className="z-panel divide-y divide-fd-border bg-fd-background">
            {INSTALL.map((row) => (
              <div key={row.label} className="grid gap-3 p-4 sm:grid-cols-[9rem_minmax(0,1fr)] sm:items-center sm:gap-6 sm:px-5 sm:py-4">
                <p className="z-h3">{row.label}</p>
                <CopyCommand command={row.cmd} className="z-copy-wrap w-full" />
              </div>
            ))}
            <div className="grid gap-3 p-4 sm:grid-cols-[9rem_minmax(0,1fr)] sm:items-center sm:gap-6 sm:px-5 sm:py-4">
              <p className="z-h3">Claude Desktop</p>
              <p className="z-body text-[0.9375rem]">
                Download the <code className="z-mono text-[0.875em] text-fd-foreground">.mcpb</code> from the{' '}
                <a href={`${repoUrl}/releases/latest`} className={linkClass} target="_blank" rel="noreferrer">
                  latest release
                </a>{' '}
                and double-click it.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="z-section border-t border-fd-border">
        <div className="z-container z-split">
          <div>
            <h2 className="z-h2">Free on your computer. Paid if I host it.</h2>
            <p className="z-small mt-3">
              The free install has every feature and always will. Hosted pays for the server and
              support.
            </p>
          </div>
          <div>
            <ul className="border-t border-fd-border">
              {[selfHostedPlan, ...plans].map((plan) => (
                <li key={plan.id} className="grid grid-cols-[minmax(0,1fr)_auto] gap-x-6 gap-y-1 border-b border-fd-border py-3.5 sm:grid-cols-[8rem_9rem_minmax(0,1fr)] sm:items-baseline">
                  <h3 className="z-h3">{plan.name}</h3>
                  <p className="text-right font-semibold text-fd-foreground sm:text-left">{plan.price}{plan.period}</p>
                  <p className="z-small col-span-2 sm:col-span-1">{plan.blurb}</p>
                </li>
              ))}
            </ul>
            <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-3">
              <Link
                href="/pricing#plans"
                className="z-btn z-btn-primary"
                data-umami-event="home-pricing-click"
                data-umami-event-source="pricing-strip"
              >
                See the hosted plans <ArrowIcon />
              </Link>
              <Link href="/docs/connect-claude-to-zotero#claude-desktop" className={linkClass}>
                or install it free
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Who makes this */}
      <section className="z-section border-t border-fd-border">
        <div className="z-container z-split">
          <h2 className="z-h2">Who makes this</h2>
          <div>
            <p className="z-lead max-w-2xl">
              One person. I&rsquo;m Oscar Devos, I build Zoteus and run the hosted server. The code
              is open source, and when you write to{' '}
              <a href={`mailto:${supportEmail}`} className={linkClass}>{supportEmail}</a>, I&rsquo;m
              the one who answers.
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <Link href="#connect" className="z-btn z-btn-primary">Connect my library <ArrowIcon /></Link>
              <Link href={repoUrl} className="z-btn z-btn-secondary" target="_blank" rel="noreferrer">
                <GitHubIcon /> View on GitHub
              </Link>
            </div>
          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
