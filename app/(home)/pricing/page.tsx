import type { Metadata } from 'next';
import Link from 'next/link';
import { CopyCommand } from '@/components/copy-command';
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
    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="mt-[3px] flex-none text-fd-muted-foreground" aria-hidden>
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
function Plus() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" aria-hidden>
      <path d="M12 5v14M5 12h14" />
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

const STEPS = [
  ['01', 'Subscribe', 'Check out via Polar and get a license key by email.'],
  ['02', 'Connect', 'Add mcp.zoteus.com/mcp as a connector in claude.ai and sign in to your own Zotero.'],
  ['03', 'Use', 'Paste your key once. Your library is then available to your AI.'],
];

export default function PricingPage() {
  return (
    <main className="flex flex-col">
      {/* Intro */}
      <section className="border-b border-fd-border">
        <div className="z-container py-14 sm:py-20">
          <p className="z-label">Pricing</p>
          <h1 className="z-display z-h1 mt-5 max-w-3xl">Free to self-host. Hosted for you or your lab.</h1>
          <p className="z-lead mt-6 max-w-2xl">
            Zoteus is open-source and free to self-host, with <strong>every</strong> feature.
            The hosted plans are for people who’d rather not run anything. They also sustain the project.
          </p>
        </div>
      </section>

      {/* Tiers */}
      <section className="z-section">
        <div className="z-container">
          <div className="grid items-stretch gap-4 md:grid-cols-2 xl:grid-cols-4">
            {plans.map((plan) => (
              <div key={plan.id} className={`z-panel flex flex-col p-5 sm:p-6 ${plan.highlight ? 'z-panel-strong' : ''}`}>
                <div className="flex items-center justify-between gap-2">
                  <h2 className="z-h3">{plan.name}</h2>
                  {plan.highlight && (
                    <span className="z-label rounded border border-fd-border px-1.5 py-0.5 text-[0.68rem] text-fd-foreground">
                      Most labs
                    </span>
                  )}
                </div>
                <p className="mt-4 flex items-baseline gap-1">
                  <span className="z-display text-[2.1rem] leading-none">{plan.price}</span>
                  {plan.period && <span className="z-small">{plan.period}</span>}
                </p>
                <p className="z-small mt-1.5">{plan.altPrice}</p>
                <p className="z-body mt-3 text-[0.9375rem]">{plan.blurb}</p>
                <p className="z-label mt-3">{plan.seats}</p>
                <ul className="mt-5 flex-1 space-y-2 text-[0.9375rem] leading-snug text-fd-foreground">
                  {plan.features.map((f) => (
                    <li key={f} className="flex gap-2.5"><Check /><span>{f}</span></li>
                  ))}
                </ul>
                <div className="mt-6 flex flex-col gap-2">
                  {plan.cta === 'install' ? (
                    <>
                      <CopyCommand className="z-copy-wrap w-full" />
                      <Link href="/docs" className="z-link text-sm">Read the docs <Arrow /></Link>
                    </>
                  ) : (
                    <>
                      <SubscribeButton plan={plan} full label={plan.cta === 'contact' ? 'Talk to us' : 'Subscribe'} />
                      {plan.id === 'lab' && (
                        <a
                          href={bookingHref}
                          className="z-link justify-center text-sm"
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
            ))}
          </div>
          {hostedLive && (
            <p className="z-small mt-6">
              Secure checkout &amp; EU VAT via Polar · monthly or annual, chosen at checkout · cancel anytime
            </p>
          )}
        </div>
      </section>

      {/* Lab pilot */}
      <section className="border-y border-fd-border bg-fd-card/50">
        <div className="z-container z-section grid gap-8 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:items-center">
          <div>
            <p className="z-label">For research groups</p>
            <h2 className="z-h2 mt-3">Try it with your group library for 30 days.</h2>
            <p className="z-body mt-4 max-w-2xl">
              If your team screens references together in a Zotero group library, the setup is the part
              that costs you an afternoon. So I do it with you: a 15-minute call, your group library
              connected, and 30 days to decide whether it earns its place. No card, and no obligation
              at the end of it.
            </p>
          </div>
          <div className="flex flex-wrap gap-3 lg:justify-end">
            <BookCallButton />
            <a href={`mailto:${supportEmail}`} className="z-btn z-btn-secondary">Email me instead</a>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="z-section">
        <div className="z-container">
          <h2 className="z-h2">How the hosted plans work</h2>
          <ol className="mt-8 grid gap-x-8 sm:grid-cols-3">
            {STEPS.map(([n, t, d]) => (
              <li key={n} className="border-t border-fd-border py-5">
                <span className="z-mono text-sm text-fd-muted-foreground">{n}</span>
                <h3 className="z-h3 mt-2">{t}</h3>
                <p className="z-body mt-1.5 text-[0.9375rem]">{d}</p>
              </li>
            ))}
          </ol>
          <p className="z-small mt-6">
            Connector URL: <span className="z-mono text-fd-foreground">{connectorUrl}</span>
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section className="pb-16 sm:pb-24">
        <div className="z-container">
          <h2 className="z-h2">Questions</h2>
          <div className="z-faq mt-6 max-w-3xl divide-y divide-fd-border border-y border-fd-border">
            {FAQ.map((item) => (
              <details key={item.q}>
                <summary>
                  {item.q}
                  <Plus />
                </summary>
                <p className="z-body max-w-2xl pb-5 text-[0.9375rem]">{item.a}</p>
              </details>
            ))}
          </div>
          <p className="z-small mt-10 max-w-3xl">
            Prefer to self-host? It’s free, with every feature:{' '}
            <Link href="/docs" className="text-[color:var(--accent-text)] underline underline-offset-[3px]">start here</Link>.
            Questions?{' '}
            <a href={`mailto:${supportEmail}`} className="text-[color:var(--accent-text)] underline underline-offset-[3px]">{supportEmail}</a>
          </p>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
