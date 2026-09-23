import type { Metadata } from 'next';
import Link from 'next/link';
import { SiteFooter } from '@/components/site-footer';
import { SubscribeButton, BookCallButton } from '@/components/subscribe-button';
import { JsonLd } from '@/components/json-ld';
import { OpenDetailsOnHash } from '@/components/open-details-on-hash';
import { faqPageLd } from '@/lib/seo';
import { plans, hostedLive, supportEmail, connectorUrl } from '@/lib/shared';

export const metadata: Metadata = {
  title: 'Hosted pricing and free local use',
  description:
    'Your Zotero library in claude.ai, the Claude mobile apps and ChatGPT, with nothing to install. Individual €69/year or €7/month with 14 days free, Lab €99/month for up to 10. The local install is free.',
  alternates: { canonical: '/pricing/' },
  openGraph: {
    title: 'Zoteus pricing: your Zotero library in claude.ai and ChatGPT',
    description:
      'Hosted Zoteus, nothing to install. Individual €69/year or €7/month with 14 days free. Lab €99/month for up to 10 seats, with a free 30-day pilot. The local install is free.',
    url: '/pricing/',
  },
};

function Check() {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="mt-[3px] flex-none text-fd-muted-foreground" aria-hidden>
      <path d="M20 6 9 17l-5-5" />
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

/* `link` is rendered after the answer on the page only; the FAQPage JSON-LD carries q and a. */
const FAQ: { q: string; a: string; link?: { label: string; href: string } }[] = [
  {
    q: 'Can Individual access a group library?',
    a: 'Individual is for one researcher, including the group libraries their Zotero account permits. Lab pays for up to ten people, assisted setup, priority email support, and invoicing or purchase orders. Group access is not a feature paywall. Neither plan promises multiple persistent library indexes or combined semantic search.',
    link: { label: 'Group-library setup and index limits', href: '/docs/group-libraries-for-review-teams' },
  },
  {
    q: 'Are embeddings and all my PDFs included?',
    a: 'Hosted currently searches metadata, notes and PDF full text by keyword. Search by meaning runs in the free local install. PDF access also depends on Zotero file availability: local-only and WebDAV file bytes cannot be fetched by the hosted connector.',
    link: { label: 'Check search readiness', href: '/docs/search-readiness' },
  },
  {
    q: 'Why pay if it’s open-source?',
    a: 'You’re paying for hosting and maintenance, not features. Self-hosting gives you the same capabilities for free, forever; the hosted plans mean you don’t have to run or update anything.',
  },
  {
    q: 'Does it work with ChatGPT?',
    a: 'Yes, on the hosted plans or with your own self-hosted remote. ChatGPT only connects to remote MCP servers, so the free local install does not apply to it. You need Developer mode, which OpenAI offers on the paid ChatGPT plans in the web app (Settings, then Security and login); a free ChatGPT account cannot add custom servers. Then add mcp.zoteus.com/mcp as a plugin and sign in with your Zotero account.',
    link: { label: 'Step by step: Connect ChatGPT to Zotero', href: '/docs/connect-chatgpt-to-zotero' },
  },
  {
    q: 'What counts as a lab?',
    a: 'A research group sharing one Zotero group library: a PI, postdocs, PhD students, and whoever else screens references with you. Up to 10 people on the Lab plan, up to 50 on Department. Arrange member access with support during setup. License keys can be bound to a Zotero account, so do not assume one key can be reused by every member.',
  },
  {
    q: 'Can we try it before we pay?',
    a: 'Yes. Individual starts with 14 days free, and you can cancel anytime from the Polar customer portal. Labs get a free 30-day pilot and I run the setup with you on a call. If it doesn’t fit your workflow, nothing happens at the end of the 30 days.',
  },
  {
    q: 'Is my data safe?',
    a: 'Your Zotero key is encrypted at rest (AES-256-GCM) and only ever used to talk to your own Zotero library. Zoteus is a data processor, not a data owner. You can revoke access at any time, and reads stay scoped to your library. Retrieved passages are sent to your chosen AI service. The software supports optional usage logging, disabled by default, and the hosted service keeps operational logs with secrets redacted for up to 30 days. See the privacy policy for storage and data paths.',
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
  ['02', 'Connect', 'Add mcp.zoteus.com/mcp as a connector in claude.ai or as a plugin in ChatGPT, and sign in to your own Zotero.'],
  ['03', 'Verify a passage', 'Confirm the selected library, find a known paper, and check a retrieved quotation against its PDF page.'],
];

export default function PricingPage() {
  return (
    <main className="flex flex-col">
      <JsonLd data={faqPageLd(FAQ)} />
      {/* Intro */}
      <section className="border-b border-fd-border">
        <div className="z-container py-14 sm:py-20">
          <p className="z-label">Pricing</p>
          <h1 className="z-display z-h1 mt-5 max-w-3xl">Your Zotero library in claude.ai, on your phone, and in ChatGPT.</h1>
          <p className="z-lead mt-6 max-w-2xl">
            Nothing to install. Add one URL, sign in with Zotero, and ask. Using Claude Desktop,
            Claude Code or Cursor? The{' '}
            <Link href="/docs/connect-claude-to-zotero/" className="text-[color:var(--accent-text)] underline underline-offset-[3px]">
              free local install
            </Link>{' '}
            already does everything, and you do not need a plan.
          </p>
        </div>
      </section>

      {/* Tiers */}
      <section className="z-section">
        <div className="z-container">
          <div id="plans" className="grid scroll-mt-24 items-stretch gap-4 lg:grid-cols-3">
            {plans.map((plan) => (
              <div key={plan.id} className={`z-panel flex flex-col p-5 sm:p-6 ${plan.highlight ? 'z-panel-strong' : ''}`}>
                <div className="flex items-center justify-between gap-2">
                  <h2 className="z-h3">{plan.name}</h2>
                  {plan.badge && (
                    <span className="z-label rounded border border-fd-border px-1.5 py-0.5 text-[0.68rem] text-fd-foreground">
                      {plan.badge}
                    </span>
                  )}
                </div>
                <p className="mt-4 flex items-baseline gap-1">
                  <span className="z-display text-[2.1rem] leading-none">{plan.price}</span>
                  {plan.period && <span className="z-small">{plan.period}</span>}
                </p>
                <p className="z-small mt-1.5">{plan.altPrice}</p>
                {plan.trial && hostedLive && (
                  <p className="mt-2 text-[0.9375rem] font-medium text-fd-foreground">{plan.trial}</p>
                )}
                <p className="z-body mt-3 text-[0.9375rem]">{plan.blurb}</p>
                <p className="z-label mt-3">{plan.seats}</p>
                <ul className="mt-5 flex-1 space-y-2 text-[0.9375rem] leading-snug text-fd-foreground">
                  {plan.features.map((f) => (
                    <li key={f} className="flex gap-2.5"><Check /><span>{f}</span></li>
                  ))}
                </ul>
                <div className="mt-6 flex flex-col gap-2">
                  {plan.id === 'lab' ? (
                    <>
                      <BookCallButton full label="Start free 30-day pilot" source="pricing-lab" />
                      {hostedLive && plan.checkout && (
                        <a
                          href={plan.checkout}
                          className="z-link justify-center text-sm"
                          aria-label={`Subscribe to Zoteus ${plan.name} now`}
                          data-umami-event="subscribe-click"
                          data-umami-event-plan={plan.id}
                        >
                          or subscribe now
                        </a>
                      )}
                    </>
                  ) : (
                    <SubscribeButton
                      plan={plan}
                      full
                      label={plan.cta === 'contact' ? 'Talk to us' : plan.trial ? 'Start 14-day free trial' : 'Subscribe'}
                    />
                  )}
                </div>
              </div>
            ))}
          </div>
          <p className="z-body mt-6 text-[0.9375rem]">
            Works when your PDFs sync to Zotero storage and your Claude or ChatGPT plan allows custom
            connectors.{' '}
            <a href="#before-you-pay" className="text-[color:var(--accent-text)] underline underline-offset-[3px]">
              See the full requirements
            </a>
            .
          </p>
          <p className="z-body mt-2 text-[0.9375rem]">
            On Claude Desktop, Claude Code or Cursor?{' '}
            <Link
              href="/docs/connect-claude-to-zotero/"
              className="text-[color:var(--accent-text)] underline underline-offset-[3px]"
              data-umami-event="install-free-click"
              data-umami-event-source="pricing"
            >
              Install Zoteus free on your computer
            </Link>
            .
          </p>
          {hostedLive && (
            <p className="z-small mt-4">
              Secure checkout &amp; EU VAT via Polar · monthly or annual, chosen at checkout · cancel anytime
            </p>
          )}
        </div>
      </section>

      {/* Requirements, collapsed below the plans; #before-you-pay is linked from the docs. */}
      <section id="before-you-pay" className="scroll-mt-24 pb-4">
        <div className="z-container">
          <OpenDetailsOnHash hash="#before-you-pay" detailsId="before-you-pay-details" />
          <div className="z-faq max-w-5xl border-y border-fd-border">
            <details id="before-you-pay-details">
              <summary>
                Before you pay: the full requirements
                <Plus />
              </summary>
              <ul className="z-body grid list-disc gap-x-10 gap-y-3 pb-5 pl-5 text-[0.9375rem] md:grid-cols-2">
                <li><strong>Your AI account:</strong> Zoteus does not include a Claude or ChatGPT subscription. Confirm custom connector access first. ChatGPT needs Developer mode on a supported paid web plan; workspace administrators may restrict it.</li>
                <li><strong>Your files:</strong> hosted access uses Zotero online. Metadata sync is not file sync. Files only on your disk or in WebDAV are not available as hosted PDF bytes.</li>
                <li><strong>Your search coverage:</strong> hosted currently searches metadata, notes and PDF full text by keyword; search by meaning runs in the free local install. PDF-body indexing is opt-in in the software, with defaults of 5,000 items and 40,000 body-text characters per item. Ask support to confirm the caps for your library before relying on them.</li>
                <li><strong>Your libraries and data:</strong> ordinary calls can use permitted groups, and each library you use, personal or group, can have its own search index, searchable one at a time or together. Hosting is currently in the US. Retrieved text goes to your AI service; check your institution&apos;s requirements.</li>
              </ul>
              <div className="flex flex-wrap gap-5 pb-6">
                <Link href="/docs/connect-claude-to-zotero#claude-ai" className="z-link">Claude requirements</Link>
                <Link href="/docs/connect-chatgpt-to-zotero" className="z-link">ChatGPT requirements</Link>
                <Link href="/docs/missing-pdfs" className="z-link">Check PDF availability</Link>
                <Link href="/privacy" className="z-link">Privacy and data paths</Link>
                <a href={`mailto:${supportEmail}?subject=Hosted%20search%20readiness`} className="z-link">Confirm my library&apos;s fit</a>
              </div>
            </details>
          </div>
        </div>
      </section>

      {/* Testimonial */}
      <section className="z-section">
        <div className="z-container">
          <figure className="z-panel mx-auto max-w-3xl p-6 sm:p-8">
            <blockquote className="z-body text-[1.0625rem] leading-relaxed">
              <p>
                &ldquo;I&rsquo;ve enjoyed using Zoteus immensely, largely because I am able to talk to
                my Zotero library and notes and query things that I would have otherwise been unable
                to do. It&rsquo;s made years of research trickling in in bits and pieces become part
                of a larger whole and I&rsquo;m extremely grateful to Oscar and the Zoteus team for
                enabling that.&rdquo;
              </p>
            </blockquote>
            <figcaption className="z-small mt-4">
              Ishaan Jajodia, PhD Candidate, Department of Political Science, Yale University
            </figcaption>
          </figure>
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
              at the end of it.{' '}
              <Link href="/docs/group-libraries-for-review-teams" className="text-[color:var(--accent-text)] underline underline-offset-[3px]">
                How a review team sets up a shared library
              </Link>
              .
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
                <p className="z-body max-w-2xl pb-5 text-[0.9375rem]">
                  {item.a}
                  {item.link && (
                    <>
                      {' '}
                      <Link href={item.link.href} className="text-[color:var(--accent-text)] underline underline-offset-[3px]">
                        {item.link.label}
                      </Link>
                      .
                    </>
                  )}
                </p>
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
