import Link from 'next/link';
import { CopyCommand } from '@/components/copy-command';
import { Reveal } from '@/components/reveal';
import { SiteFooter } from '@/components/site-footer';
import { gitConfig, plans } from '@/lib/shared';

const repo = `https://github.com/${gitConfig.user}/${gitConfig.repo}`;

/* ── ultra-light line icons ──────────────────────────────────────────────── */
function Icon({ path, className = '' }: { path: string; className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width="20"
      height="20"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.3"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
      dangerouslySetInnerHTML={{ __html: path }}
    />
  );
}
const I = {
  search: '<circle cx="11" cy="11" r="7"/><path d="m21 21-4.3-4.3"/>',
  quote: '<path d="M7 7h4v4a4 4 0 0 1-4 4"/><path d="M15 7h4v4a4 4 0 0 1-4 4"/>',
  plus: '<path d="M12 5v14M5 12h14"/>',
  shield: '<path d="M12 3l7 3v5c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6z"/><path d="m9.5 12 1.8 1.8 3.5-3.6"/>',
  lock: '<rect x="4.5" y="10.5" width="15" height="10" rx="2.2"/><path d="M8 10.5V8a4 4 0 0 1 8 0v2.5"/>',
  graph: '<circle cx="6" cy="7" r="2.2"/><circle cx="18" cy="6" r="2.2"/><circle cx="14" cy="18" r="2.2"/><path d="M8 8.2 12.3 16M16 7.6 14.7 15.8"/>',
  arrow: '<path d="M5 12h14M13 6l6 6-6 6"/>',
  github:
    '<path d="M12 2.2A10 10 0 0 0 8.8 21.7c.5.1.7-.2.7-.5v-1.7c-2.8.6-3.4-1.3-3.4-1.3-.5-1.1-1.1-1.4-1.1-1.4-.9-.6.1-.6.1-.6 1 .1 1.5 1 1.5 1 .9 1.5 2.3 1.1 2.9.8.1-.6.3-1.1.6-1.3-2.2-.25-4.5-1.1-4.5-4.9 0-1.1.4-2 1-2.7-.1-.3-.4-1.3.1-2.6 0 0 .8-.3 2.7 1a9.3 9.3 0 0 1 5 0c1.9-1.3 2.7-1 2.7-1 .5 1.3.2 2.3.1 2.6.6.7 1 1.6 1 2.7 0 3.8-2.3 4.6-4.5 4.9.4.3.7.9.7 1.8v2.6c0 .3.2.6.7.5A10 10 0 0 0 12 2.2Z"/>',
};

/* ── faux demo card (stands in until demo.gif is recorded) ───────────────── */
function DemoCard() {
  return (
    <div className="z-bezel w-full">
      <div className="z-bezel-inner overflow-hidden">
        <div className="flex items-center gap-2 border-b border-fd-border px-4 py-3">
          <span className="h-2.5 w-2.5 rounded-full bg-fd-foreground/15" />
          <span className="h-2.5 w-2.5 rounded-full bg-fd-foreground/15" />
          <span className="h-2.5 w-2.5 rounded-full bg-fd-foreground/15" />
          <span className="z-label ml-2 normal-case tracking-normal">Claude · Zoteus connected</span>
          <span className="z-dot ml-auto" />
        </div>
        <div className="space-y-4 p-5 text-[0.92rem] leading-relaxed">
          <p className="ml-auto w-fit max-w-[85%] rounded-2xl rounded-br-md bg-fd-foreground/5 px-4 py-2.5 text-fd-foreground">
            Find papers in my library arguing against open-plan offices and draft a paragraph citing them.
          </p>
          <div className="flex items-center gap-2">
            <span className="z-mono inline-flex items-center gap-1.5 rounded-md border border-fd-primary/25 bg-[var(--accent-soft)] px-2 py-1 text-[0.72rem] text-fd-primary">
              <svg viewBox="0 0 24 24" width="11" height="11" aria-hidden><path d="M13 2 4.6 13.4H11l-1 8.6L19.4 10.2H13V2Z" fill="currentColor" /></svg>
              zotero_semantic_search
            </span>
            <span className="z-mono text-[0.72rem] text-fd-muted-foreground">5 results · cited</span>
          </div>
          <div className="space-y-2 text-fd-muted-foreground">
            <p>
              Several studies in your collection challenge the open-plan model. Bernstein &amp; Turban
              (2018) found face-to-face interaction <span className="text-fd-foreground">dropped ~70%</span> after
              the switch <span className="text-fd-primary">(p.&nbsp;4)</span>; Kim &amp; de Dear (2013) link it to
              lower satisfaction with privacy and acoustics.
            </p>
            <p className="z-mono border-l-2 border-fd-border pl-3 text-[0.78rem]">
              Bernstein, E. S., &amp; Turban, S. (2018). <span className="z-serif italic">The impact of the
              &lsquo;open&rsquo; workspace&hellip;</span> <em>Phil. Trans. R. Soc. B</em>, 373.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

const FEATURES = [
  { icon: I.search, title: 'Semantic search over your PDFs', body: 'Hybrid keyword and vector search across metadata, full text, and annotations, with page locators in the results. Runs on local embeddings by default.', span: 'md:col-span-3' },
  { icon: I.quote, title: 'Citations from your own library', body: 'Zoteus reads the references in your Zotero library and formats them with citeproc-js in any CSL style.', span: 'md:col-span-3' },
  { icon: I.plus, title: 'Add by identifier', body: 'Give it a DOI, ISBN, PMID, or arXiv id and it fetches the metadata and files the item.', span: 'md:col-span-2' },
  { icon: I.shield, title: 'Safe, reversible writes', body: 'Versioned, optimistic-locked, reversible trash by default, gated delete.', span: 'md:col-span-2' },
  { icon: I.lock, title: 'Runs on your machine', body: 'Reads go to the Zotero desktop app when it is running. Semantic search uses an on-device embedding model by default.', span: 'md:col-span-2' },
];

export default function Home() {
  return (
    <main className="relative flex flex-col">
      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden border-b border-fd-border">
        <div className="z-grid pointer-events-none absolute inset-0 opacity-60" />
        <div
          className="pointer-events-none absolute -top-40 left-1/2 h-[34rem] w-[34rem] -translate-x-1/4 rounded-full blur-3xl"
          style={{ background: 'radial-gradient(circle, var(--accent-glow), transparent 65%)' }}
        />
        <div className="relative mx-auto grid max-w-6xl gap-12 px-6 py-20 sm:py-24 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-14 lg:py-32">
          <div>
            <span className="z-eyebrow z-rise">Open-source · Zotero MCP server</span>
            <h1 className="z-display z-rise mt-6 text-balance text-[2.4rem] sm:text-5xl xl:text-6xl" style={{ animationDelay: '60ms' }}>
              The Zotero MCP server that writes back.
            </h1>
            <p className="z-rise mt-6 max-w-xl text-lg leading-relaxed text-fd-muted-foreground" style={{ animationDelay: '140ms' }}>
              Zoteus gives Claude, Cursor, and other MCP clients real access to your reference
              library: semantic search over your own PDFs, citations in any CSL style, add by
              DOI, attachments, and PDF annotations written back into the file, anchored to the
              text they quote. <span className="z-serif italic text-fd-foreground">Search is the easy half.</span>
            </p>
            <div className="z-rise mt-8 flex flex-wrap items-center gap-3" style={{ animationDelay: '220ms' }}>
              <CopyCommand />
              <Link href={repo} className="z-ghost" target="_blank" rel="noreferrer">
                <Icon path={I.github} className="text-fd-muted-foreground" />
                View on GitHub
              </Link>
            </div>
            <p className="z-label z-rise mt-6 normal-case tracking-[0.04em]" style={{ animationDelay: '300ms' }}>
              MIT-licensed · Runs on your machine · No telemetry
            </p>
          </div>
          <Reveal className="z-rise" delay={120}>
            <DemoCard />
          </Reveal>
        </div>
      </section>

      {/* ── CLIENT STRIP ─────────────────────────────────────────────────── */}
      <section className="border-b border-fd-border bg-fd-card/30">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center gap-x-8 gap-y-3 px-6 py-6">
          <span className="z-label">Works with</span>
          {['Claude Desktop', 'Claude Code', 'Cursor', 'VS Code', 'Zed', 'Codex', 'Gemini CLI'].map((c) => (
            <span key={c} className="z-mono text-sm text-fd-muted-foreground">{c}</span>
          ))}
        </div>
      </section>

      {/* ── INSTALL ──────────────────────────────────────────────────────── */}
      <section id="install" className="mx-auto w-full max-w-6xl scroll-mt-20 px-6 py-24">
        <Reveal>
          <span className="z-eyebrow">Install</span>
          <h2 className="z-display mt-5 text-3xl sm:text-4xl">One command for any MCP client.</h2>
          <p className="mt-4 max-w-2xl text-fd-muted-foreground">
            Reads work key-free against the desktop app. Add a Zotero API key for writes, sync,
            and group libraries.
          </p>
        </Reveal>
        <Reveal delay={80}>
          <div className="z-bezel mt-10 w-full">
            <div className="z-bezel-inner grid gap-px overflow-hidden md:grid-cols-3">
              {[
                { label: 'Claude Code', cmd: 'claude mcp add --transport stdio \\\n  zoteus -- npx -y @oscardvs/zoteus' },
                { label: 'Any client (universal)', cmd: 'npx add-mcp @oscardvs/zoteus' },
                { label: 'Claude Desktop', cmd: 'Download zoteus.mcpb\nfrom the latest release →' },
              ].map((s) => (
                <div key={s.label} className="bg-fd-card p-5">
                  <p className="z-label mb-3">{s.label}</p>
                  <pre className="z-mono whitespace-pre-wrap text-[0.8rem] leading-relaxed text-fd-foreground">{s.cmd}</pre>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </section>

      {/* ── PROBLEM ──────────────────────────────────────────────────────── */}
      <section className="border-y border-fd-border bg-fd-card/30">
        <div className="mx-auto max-w-3xl px-6 py-24 text-center">
          <Reveal>
            <h2 className="z-display text-balance text-[1.9rem] sm:text-3xl lg:text-[2.6rem]">
              Your references are in Zotero.{' '}
              <span className="block sm:inline">Your AI client can&rsquo;t see them.</span>
            </h2>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-fd-muted-foreground">
              Without a connection, every new chat starts from nothing: you paste the same PDFs again, describe
              your library again, and a request for references can come back with <span className="text-fd-foreground">citations that do not exist</span>.
              Zoteus connects the library itself, so your AI works from <span className="z-serif italic text-fd-foreground">what you&rsquo;ve already read and saved.</span>
            </p>
          </Reveal>
        </div>
      </section>

      {/* ── FEATURES (bento) ─────────────────────────────────────────────── */}
      <section id="why" className="mx-auto w-full max-w-6xl scroll-mt-20 px-6 py-24">
        <Reveal>
          <span className="z-eyebrow">What it does</span>
          <h2 className="z-display mt-5 max-w-2xl text-3xl sm:text-4xl">
            Search, cite, add, and write back to your own library.
          </h2>
        </Reveal>
        <div className="mt-12 grid gap-4 md:grid-cols-6">
          {FEATURES.map((f, i) => (
            <Reveal key={f.title} delay={i * 60} className={f.span}>
              <div className="z-bezel h-full">
                <div className="z-bezel-inner flex h-full flex-col gap-3 p-6">
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--accent-soft)] text-fd-primary">
                    <Icon path={f.icon} />
                  </span>
                  <h3 className="z-serif text-lg text-fd-foreground">{f.title}</h3>
                  <p className="text-sm leading-relaxed text-fd-muted-foreground">{f.body}</p>
                </div>
              </div>
            </Reveal>
          ))}
          <Reveal delay={300} className="md:col-span-6">
            <div className="z-bezel">
              <div className="z-bezel-inner flex flex-wrap items-center gap-x-6 gap-y-2 p-6">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--accent-soft)] text-fd-primary">
                  <Icon path={I.graph} />
                </span>
                <h3 className="z-serif text-lg text-fd-foreground">Scholarly-context graph</h3>
                <p className="max-w-xl text-sm text-fd-muted-foreground">
                  Follow references and citing works through OpenAlex and Crossref. Zoteus also
                  ships MCP Resources, Prompts, and the code-execution pattern for agent use.
                </p>
                <Link href="/docs" className="z-ghost ml-auto text-sm">
                  Read the docs <Icon path={I.arrow} className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── PRICING ──────────────────────────────────────────────────────── */}
      <section className="mx-auto w-full max-w-6xl px-6 py-24">
        <Reveal>
          <span className="z-eyebrow">Pricing</span>
          <h2 className="z-display mt-5 text-3xl sm:text-4xl">Free to self-host. Hosted for you or your lab.</h2>
          <p className="mt-4 max-w-2xl text-fd-muted-foreground">
            Self-hosting stays free, with every feature, permanently. The hosted plans sell
            hosting, seats and support, never features.
          </p>
        </Reveal>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {plans.map((plan, i) => (
            <Reveal key={plan.id} delay={i * 60}>
              <div
                className="z-bezel h-full"
                style={
                  plan.highlight
                    ? { background: 'var(--accent-soft)', borderColor: 'color-mix(in oklab, var(--accent) 35%, var(--color-fd-border))' }
                    : undefined
                }
              >
                <div className="z-bezel-inner flex h-full flex-col p-6">
                  <h3 className="z-serif text-lg">{plan.name}</h3>
                  <p className="z-display mt-2 text-3xl">
                    {plan.price}
                    {plan.period && <span className="text-base text-fd-muted-foreground">{plan.period}</span>}
                  </p>
                  <p className="mt-1.5 text-sm text-fd-muted-foreground">{plan.altPrice}</p>
                  <p className="mt-3 flex-1 text-sm text-fd-muted-foreground">{plan.blurb}</p>
                  <p className="z-mono mt-4 text-[0.7rem] uppercase tracking-[0.1em] text-fd-muted-foreground">{plan.seats}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal>
          <div className="mt-8">
            <Link href="/pricing" className="z-ghost">
              Compare the plans <Icon path={I.arrow} className="h-4 w-4" />
            </Link>
          </div>
        </Reveal>
      </section>

      {/* ── FINAL CTA ────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden border-t border-fd-border">
        <div
          className="pointer-events-none absolute inset-0"
          style={{ background: 'radial-gradient(ellipse at center, var(--accent-glow), transparent 70%)' }}
        />
        <div className="relative mx-auto max-w-3xl px-6 py-28 text-center">
          <Reveal>
            <h2 className="z-display text-balance text-[2.2rem] sm:text-4xl lg:text-5xl">Connect your Zotero library.</h2>
            <p className="mx-auto mt-5 max-w-xl text-lg text-fd-muted-foreground">
              One command in your MCP client. Open-source and free to self-host.
            </p>
            <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
              <CopyCommand />
              <Link href={repo} className="z-ghost" target="_blank" rel="noreferrer">
                <Icon path={I.github} className="text-fd-muted-foreground" /> View on GitHub
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── FOOTER ───────────────────────────────────────────────────────── */}
      <SiteFooter />
    </main>
  );
}
