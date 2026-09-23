import type { Metadata } from 'next';
import Link from 'next/link';
import { SiteFooter } from '@/components/site-footer';
import { TrackCheckoutComplete } from '@/components/track-checkout-complete';
import { connectorUrl, supportEmail } from '@/lib/shared';

/*
 * Polar's success URL. Not in the sitemap (app/sitemap.ts lists pages by hand) and
 * noindex, because it only makes sense straight after a checkout.
 */
export const metadata: Metadata = {
  title: 'Thank you',
  description: 'Your Zoteus subscription is active. Connect claude.ai or ChatGPT to your Zotero library in three steps.',
  robots: { index: false, follow: true },
};

const linkClass = 'text-[color:var(--accent-text)] underline underline-offset-[3px]';

function Url() {
  return <span className="z-mono text-[0.875em] text-fd-foreground [overflow-wrap:anywhere]">{connectorUrl}</span>;
}

export default function ThanksPage() {
  return (
    <main className="flex flex-col">
      <TrackCheckoutComplete />
      <section className="border-b border-fd-border">
        <div className="z-container py-14 sm:py-20">
          <p className="z-label">Thank you</p>
          <h1 className="z-display z-h1 mt-5 max-w-3xl">Thanks for subscribing to Zoteus.</h1>
          <p className="z-lead mt-6 max-w-2xl">
            Polar is emailing your licence key to the address you used at checkout. Keep that email
            open: you paste the key once, when you connect. Then add Zoteus where you want to use your
            library.
          </p>
        </div>
      </section>

      <section className="z-section">
        <div className="z-container">
          <h2 className="z-h2">Connect in three steps</h2>
          <ol className="mt-8 grid gap-4 lg:grid-cols-3">
            <li className="z-panel flex flex-col p-5 sm:p-6">
              <span className="z-mono text-sm text-fd-muted-foreground">01</span>
              <h3 className="z-h3 mt-2">Claude</h3>
              <p className="z-body mt-3 flex-1 text-[0.9375rem]">
                In claude.ai, open <strong>Settings</strong> (called <strong>Customize</strong> on some
                plans), then <strong>Connectors</strong>, then <strong>Add custom connector</strong>. For
                the URL, enter exactly <Url />, then click <strong>Add</strong>, then{' '}
                <strong>Connect</strong>. The connector then works in the Claude desktop and mobile apps
                too.
              </p>
              <Link href="/docs/connect-claude-to-zotero#claude-ai" className="z-link mt-5">
                Full Claude guide
              </Link>
            </li>
            <li className="z-panel flex flex-col p-5 sm:p-6">
              <span className="z-mono text-sm text-fd-muted-foreground">02</span>
              <h3 className="z-h3 mt-2">ChatGPT</h3>
              <p className="z-body mt-3 flex-1 text-[0.9375rem]">
                Turn on <strong>Developer mode</strong> (<strong>Settings</strong>, then{' '}
                <strong>Security and login</strong>; paid ChatGPT plans only). Click{' '}
                <strong>Plugins</strong> in the left sidebar, then <strong>Create app</strong>. Set{' '}
                <strong>Connection</strong> to <strong>Server URL</strong>, the{' '}
                <strong>MCP Server URL</strong> to <Url />, and <strong>Authentication</strong> to{' '}
                <strong>OAuth</strong>. Tick <strong>I understand and want to continue</strong> and click{' '}
                <strong>Create</strong>.
              </p>
              <Link href="/docs/connect-chatgpt-to-zotero#add-zoteus-to-chatgpt" className="z-link mt-5">
                Full ChatGPT guide
              </Link>
            </li>
            <li className="z-panel flex flex-col p-5 sm:p-6">
              <span className="z-mono text-sm text-fd-muted-foreground">03</span>
              <h3 className="z-h3 mt-2">Sign in</h3>
              <p className="z-body mt-3 flex-1 text-[0.9375rem]">
                Click <strong>Connect</strong> in Claude, or <strong>Sign in with Zoteus</strong> in
                ChatGPT. On the Zoteus page, paste the licence key from your Polar email. You then go to
                zotero.org: sign in and approve the access Zoteus asks for, and you land back in your chat.
                Ask <em>Am I connected to my Zotero library?</em>
              </p>
              <Link href="/docs/first-research-task" className="z-link mt-5">
                Find and verify your first passage
              </Link>
            </li>
          </ol>
          <p className="z-small mt-6 max-w-3xl">
            In ChatGPT, if the plugin says <em>No app actions available yet</em>, click{' '}
            <strong>Refresh</strong> in the <strong>Information</strong> section of the plugin page. No
            email after a few minutes? Check your spam folder, then write to{' '}
            <a href={`mailto:${supportEmail}`} className={linkClass}>{supportEmail}</a>. Never paste your
            licence key into a chat.
          </p>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
