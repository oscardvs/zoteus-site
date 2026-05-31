import type { Metadata } from 'next';
import Link from 'next/link';
import { CopyCommand } from '@/components/copy-command';
import { Reveal } from '@/components/reveal';
import { SiteFooter } from '@/components/site-footer';
import { polarCheckout, hostedPrice, hostedPeriod } from '@/lib/shared';

export const metadata: Metadata = {
  title: 'Pricing',
  description:
    'Zoteus is free and open-source to self-host, with every feature. The optional hosted tier is a managed, always-on connector for €30/year — zero setup, billed via Polar.',
  alternates: { canonical: '/pricing' },
};

function Check() {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="mt-0.5 flex-none text-fd-primary" aria-hidden>
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}
function Arrow() {
  return (
    <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

const SELF = [
  'Every feature — no paywall, ever',
  'Local-first; your machine, your keys',
  'Self-host the OAuth remote for a team',
  'Community support on GitHub',
];
const HOSTED = [
  'Connect in claude.ai in ~30 seconds',
  'Per-user Zotero login, encrypted at rest',
  'Always-on, maintained & auto-updated',
  'You keep your data & your keys',
  'Email support · cancel anytime',
];

const FAQ = [
  {
    q: 'Why pay if it’s open-source?',
    a: 'You’re paying for hosting and maintenance, not features. Self-hosting gives you the exact same capabilities for free, forever — the hosted tier just means you don’t have to run or update anything.',
  },
  {
    q: 'Is my data safe?',
    a: 'Your Zotero key is encrypted at rest (AES-256-GCM) and only ever used to talk to your own Zotero library. Zoteus is a data processor, not a data owner — you can revoke access at any time, and reads stay scoped to your library.',
  },
  {
    q: 'Can I cancel?',
    a: 'Yes, any time from the Polar customer portal. Your access continues until the end of the billing period; there’s no lock-in and your library is always yours.',
  },
  {
    q: 'What’s different from self-hosting?',
    a: 'Nothing in the features — it’s the same Zoteus. The hosted tier just runs the always-on, public HTTPS connector for you so it works in claude.ai (web) without you provisioning a server.',
  },
  {
    q: 'How does billing work?',
    a: 'Checkout and billing are handled by Polar as the merchant of record, so EU VAT and receipts are taken care of. You’ll receive a license key to paste when you connect.',
  },
];

export default function PricingPage() {
  return (
    <main className="relative flex flex-col">
      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden border-b border-fd-border">
        <div className="z-grid pointer-events-none absolute inset-0 opacity-50" />
        <div
          className="pointer-events-none absolute -top-32 left-1/2 h-[28rem] w-[28rem] -translate-x-1/2 rounded-full blur-3xl"
          style={{ background: 'radial-gradient(circle, var(--accent-glow), transparent 65%)' }}
        />
        <div className="relative mx-auto max-w-3xl px-6 py-24 text-center md:py-28">
          <span className="z-eyebrow z-rise">Pricing</span>
          <h1 className="z-display z-rise mt-6 text-[2.6rem] sm:text-5xl" style={{ animationDelay: '60ms' }}>
            Free forever.<br />Hosted if you want it.
          </h1>
          <p className="z-rise mx-auto mt-6 max-w-xl text-lg leading-relaxed text-fd-muted-foreground" style={{ animationDelay: '140ms' }}>
            Zoteus is open-source and free to self-host — with <span className="z-serif italic text-fd-foreground">every</span> feature.
            The hosted tier is for people who’d rather not run anything. It also sustains the project.
          </p>
        </div>
      </section>

      {/* ── TIERS ────────────────────────────────────────────────────────── */}
      <section className="mx-auto w-full max-w-5xl px-6 py-20">
        <div className="grid items-stretch gap-5 md:grid-cols-2">
          {/* Self-hosted */}
          <Reveal>
            <div className="z-bezel h-full">
              <div className="z-bezel-inner flex h-full flex-col p-8">
                <p className="z-label">Self-hosted</p>
                <p className="z-display mt-4 text-5xl">Free</p>
                <p className="mt-2 text-sm text-fd-muted-foreground">MIT-licensed. Run it yourself, forever.</p>
                <ul className="mt-7 flex-1 space-y-3 text-sm text-fd-foreground">
                  {SELF.map((f) => (
                    <li key={f} className="flex gap-2.5"><Check /><span>{f}</span></li>
                  ))}
                </ul>
                <div className="mt-8 flex flex-col gap-3">
                  <CopyCommand />
                  <Link href="/docs" className="z-ghost w-fit text-sm">Read the docs <Arrow /></Link>
                </div>
              </div>
            </div>
          </Reveal>

          {/* Hosted — highlighted */}
          <Reveal delay={90}>
            <div className="z-bezel h-full" style={{ background: 'var(--accent-soft)', borderColor: 'color-mix(in oklab, var(--accent) 35%, var(--color-fd-border))' }}>
              <div className="z-bezel-inner flex h-full flex-col p-8">
                <div className="flex items-center justify-between">
                  <p className="z-label">Hosted</p>
                  <span className="z-label rounded-full border border-fd-primary/30 bg-[var(--accent-soft)] px-2.5 py-1 text-[color:var(--accent-text)]">Most convenient</span>
                </div>
                <p className="z-display mt-4 text-5xl">
                  {hostedPrice}
                  <span className="text-xl text-fd-muted-foreground">{hostedPeriod}</span>
                </p>
                <p className="mt-2 text-sm text-fd-muted-foreground">Managed, always-on connector. Zero setup.</p>
                <ul className="mt-7 flex-1 space-y-3 text-sm text-fd-foreground">
                  {HOSTED.map((f) => (
                    <li key={f} className="flex gap-2.5"><Check /><span>{f}</span></li>
                  ))}
                </ul>
                <div className="mt-8">
                  <a href={polarCheckout} className="z-cta w-full justify-center" aria-label="Subscribe to Zoteus Hosted">
                    Subscribe
                    <span className="z-cta-icon"><Arrow /></span>
                  </a>
                  <p className="z-label mt-3 text-center normal-case tracking-[0.03em]">
                    {hostedPrice}{hostedPeriod} · secure checkout & EU VAT via Polar
                  </p>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── HOW IT WORKS ─────────────────────────────────────────────────── */}
      <section className="border-y border-fd-border bg-fd-card/30">
        <div className="mx-auto w-full max-w-5xl px-6 py-20">
          <Reveal>
            <h2 className="z-display text-3xl sm:text-4xl">How the hosted tier works</h2>
          </Reveal>
          <div className="mt-10 grid gap-4 sm:grid-cols-3">
            {[
              ['01', 'Subscribe', 'Check out via Polar and get a license key by email.'],
              ['02', 'Connect', 'Add the connector in claude.ai and sign in to your own Zotero.'],
              ['03', 'Use', 'Paste your key once — your library is now available to your AI.'],
            ].map(([n, t, d], i) => (
              <Reveal key={n} delay={i * 70}>
                <div className="z-bezel h-full">
                  <div className="z-bezel-inner flex h-full flex-col gap-2 p-6">
                    <span className="z-mono text-sm text-fd-primary">{n}</span>
                    <h3 className="z-serif text-lg">{t}</h3>
                    <p className="text-sm text-fd-muted-foreground">{d}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ──────────────────────────────────────────────────────────── */}
      <section className="mx-auto w-full max-w-3xl px-6 py-20">
        <Reveal>
          <h2 className="z-display text-3xl sm:text-4xl">Questions</h2>
        </Reveal>
        <div className="mt-8 divide-y divide-fd-border border-y border-fd-border">
          {FAQ.map((item) => (
            <details key={item.q} className="group py-4">
              <summary className="z-serif flex cursor-pointer list-none items-center justify-between text-lg text-fd-foreground marker:hidden">
                {item.q}
                <span className="ml-4 flex-none text-fd-muted-foreground transition-transform duration-300 group-open:rotate-45">
                  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" aria-hidden><path d="M12 5v14M5 12h14" /></svg>
                </span>
              </summary>
              <p className="mt-3 max-w-2xl text-sm leading-relaxed text-fd-muted-foreground">{item.a}</p>
            </details>
          ))}
        </div>
        <Reveal>
          <div className="mt-12 text-center">
            <a href={polarCheckout} className="z-cta" aria-label="Subscribe to Zoteus Hosted">
              Get the hosted tier
              <span className="z-cta-icon"><Arrow /></span>
            </a>
            <p className="z-label mt-4 normal-case tracking-[0.03em]">Prefer to self-host? It’s free — <Link href="/docs" className="text-fd-primary hover:underline">start here</Link>.</p>
          </div>
        </Reveal>
      </section>

      <SiteFooter />
    </main>
  );
}
