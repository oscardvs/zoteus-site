import type { Metadata } from 'next';
import Link from 'next/link';
import { CopyCommand } from '@/components/copy-command';
import { Reveal } from '@/components/reveal';
import { SiteFooter } from '@/components/site-footer';
import { SubscribeButton, BookCallButton } from '@/components/subscribe-button';
import { plans, hostedLive, supportEmail, connectorUrl, bookingHref, bookingLive } from '@/lib/shared';

export const metadata: Metadata = {
  title: 'Pricing',
  description:
    'Zoteus is free and open-source to self-host, with every feature. Hosted plans start at €69/year for one researcher and €99/month for a lab of up to 10, billed via Polar.',
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

const FAQ = [
  {
    q: 'Why pay if it’s open-source?',
    a: 'You’re paying for hosting and maintenance, not features. Self-hosting gives you the same capabilities for free, forever; the hosted plans mean you don’t have to run or update anything.',
  },
  {
    q: 'What counts as a lab?',
    a: 'A research group sharing one Zotero group library: a PI, postdocs, PhD students, and whoever else screens references with you. Up to 10 people on the Lab plan, up to 50 on Department. Seat limits are on trust, not enforced in software, so nobody gets locked out mid-review.',
  },
  {
    q: 'Can we try it before we pay?',
    a: 'Yes. Labs get a free 30-day pilot and I run the setup with you on a call. If it doesn’t fit your workflow, nothing happens at the end of the 30 days.',
  },
  {
    q: 'Is my data safe?',
    a: 'Your Zotero key is encrypted at rest (AES-256-GCM) and only ever used to talk to your own Zotero library. Zoteus is a data processor, not a data owner. You can revoke access at any time, and reads stay scoped to your library. There is no telemetry in the server.',
  },
  {
    q: 'Can I cancel?',
    a: 'Yes, any time from the Polar customer portal. Your access continues until the end of the billing period; there’s no lock-in and your library is always yours.',
  },
  {
    q: 'Can you invoice us, or take a purchase order?',
    a: 'Yes, on the Lab and Department plans. Annual billing suits grant funding better, and the annual price is two months cheaper than paying monthly. Email me and I’ll send an invoice.',
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
          <h1 className="z-display z-rise mt-6 text-balance text-[2.2rem] sm:text-4xl lg:text-5xl" style={{ animationDelay: '60ms' }}>
            Free to self-host. Hosted for you or your lab.
          </h1>
          <p className="z-rise mx-auto mt-6 max-w-xl text-lg leading-relaxed text-fd-muted-foreground" style={{ animationDelay: '140ms' }}>
            Zoteus is open-source and free to self-host, with <span className="z-serif italic text-fd-foreground">every</span> feature.
            The hosted plans are for people who’d rather not run anything. They also sustain the project.
          </p>
        </div>
      </section>

      {/* ── TIERS ────────────────────────────────────────────────────────── */}
      <section className="mx-auto w-full max-w-6xl px-6 py-20 2xl:max-w-[96rem]">
        <div className="grid items-stretch gap-4 sm:grid-cols-2 2xl:grid-cols-4">
          {plans.map((plan, i) => (
            <Reveal key={plan.id} delay={i * 70}>
              <div
                className="z-bezel h-full"
                style={
                  plan.highlight
                    ? { background: 'var(--accent-soft)', borderColor: 'color-mix(in oklab, var(--accent) 35%, var(--color-fd-border))' }
                    : undefined
                }
              >
                <div className="z-bezel-inner flex h-full flex-col p-7">
                  <div className="flex items-center justify-between gap-2">
                    <p className="z-label">{plan.name}</p>
                    {plan.highlight && (
                      <span className="z-label rounded-full border border-fd-primary/30 bg-[var(--accent-soft)] px-2.5 py-1 text-[color:var(--accent-text)]">
                        Most labs
                      </span>
                    )}
                  </div>
                  <p className="z-display mt-4 text-4xl">
                    {plan.price}
                    {plan.period && <span className="text-lg text-fd-muted-foreground">{plan.period}</span>}
                  </p>
                  <p className="mt-1.5 text-sm text-fd-muted-foreground">{plan.altPrice}</p>
                  <p className="mt-3 text-sm text-fd-muted-foreground">{plan.blurb}</p>
                  <p className="z-mono mt-3 text-[0.72rem] uppercase tracking-[0.1em] text-fd-muted-foreground">{plan.seats}</p>
                  <ul className="mt-6 flex-1 space-y-2.5 text-sm text-fd-foreground">
                    {plan.features.map((f) => (
                      <li key={f} className="flex gap-2.5"><Check /><span>{f}</span></li>
                    ))}
                  </ul>
                  <div className="mt-7 flex flex-col gap-3">
                    {plan.cta === 'install' ? (
                      <>
                        <CopyCommand />
                        <Link href="/docs" className="z-ghost w-fit text-sm">Read the docs <Arrow /></Link>
                      </>
                    ) : (
                      <>
                        <SubscribeButton plan={plan} full label={plan.cta === 'contact' ? 'Talk to us' : 'Subscribe'} />
                        {plan.id === 'lab' && (
                          <a
                            href={bookingHref}
                            className="z-label text-center normal-case tracking-[0.03em] text-[color:var(--accent-text)] hover:underline"
                            data-umami-event="book-call-click"
                            data-umami-event-source="pricing-lab"
                            {...(bookingLive ? { target: '_blank', rel: 'noreferrer' } : {})}
                          >
                            or start a free 30-day pilot
                          </a>
                        )}
                      </>
                    )}
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
        {hostedLive && (
          <p className="z-label mt-8 text-center normal-case tracking-[0.03em]">
            Secure checkout &amp; EU VAT via Polar · monthly or annual, chosen at checkout · cancel anytime
          </p>
        )}
      </section>

      {/* ── LAB PILOT ────────────────────────────────────────────────────── */}
      <section className="border-y border-fd-border bg-fd-card/30">
        <div className="mx-auto w-full max-w-3xl px-6 py-20 text-center">
          <Reveal>
            <span className="z-eyebrow">For research groups</span>
            <h2 className="z-display mt-5 text-balance text-[1.8rem] sm:text-3xl lg:text-4xl">Try it with your group library for 30 days.</h2>
            <p className="mx-auto mt-5 max-w-2xl text-fd-muted-foreground">
              If your team screens references together in a Zotero group library, the setup is the part
              that costs you an afternoon. So I do it with you: a 15-minute call, your group library
              connected, and 30 days to decide whether it earns its place. No card, and no obligation
              at the end of it.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <BookCallButton />
              <a href={`mailto:${supportEmail}`} className="z-ghost">Email me instead</a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── HOW IT WORKS ─────────────────────────────────────────────────── */}
      <section className="mx-auto w-full max-w-5xl px-6 py-20">
        <Reveal>
          <h2 className="z-display text-balance text-[1.8rem] sm:text-3xl lg:text-4xl">How the hosted plans work</h2>
        </Reveal>
        <div className="mt-10 grid gap-4 sm:grid-cols-3">
          {[
            ['01', 'Subscribe', 'Check out via Polar and get a license key by email.'],
            ['02', 'Connect', 'Add mcp.zoteus.com/mcp as a connector in claude.ai and sign in to your own Zotero.'],
            ['03', 'Use', 'Paste your key once. Your library is then available to your AI.'],
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
        <p className="z-mono mt-8 text-center text-sm text-fd-muted-foreground">
          Connector URL: <span className="text-fd-foreground">{connectorUrl}</span>
        </p>
      </section>

      {/* ── FAQ ──────────────────────────────────────────────────────────── */}
      <section className="mx-auto w-full max-w-3xl px-6 pb-20">
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
            <p className="z-label normal-case tracking-[0.03em]">Prefer to self-host? It’s free, with every feature: <Link href="/docs" className="text-fd-primary hover:underline">start here</Link>. Questions? <a href={`mailto:${supportEmail}`} className="text-fd-primary hover:underline">{supportEmail}</a></p>
          </div>
        </Reveal>
      </section>

      <SiteFooter />
    </main>
  );
}
