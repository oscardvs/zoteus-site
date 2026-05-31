import type { Metadata } from 'next';
import Link from 'next/link';
import { LegalPage, Sec } from '@/components/legal-page';
import { contactEmail, operator } from '@/lib/shared';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'What Zoteus stores, why, and your rights — for the open-source connector and the optional hosted tier.',
  alternates: { canonical: '/privacy' },
};

export default function Privacy() {
  return (
    <LegalPage
      title="Privacy Policy"
      updated="31 May 2026"
      intro={
        <>
          Zoteus, operated by {operator}, is an open-source connector between your Zotero library
          and AI assistants. This policy covers the website, the self-hosted connector, and the
          optional <Link href="/pricing">hosted tier</Link>. The short version: if you self-host,
          we never see your data; if you use the hosted tier, we store the minimum needed to run it
          for you, encrypted, and you can delete it at any time.
        </>
      }
    >
      <Sec h="Self-hosting: we collect nothing">
        <p>
          The open-source connector runs on <strong>your own machine or server</strong>. Your Zotero
          credentials and library data flow only between your device, your Zotero account, and the AI
          client you choose. We have no access to any of it, and the connector phones home to nobody.
        </p>
      </Sec>

      <Sec h="The hosted tier: what we store">
        <p>If you subscribe to the hosted connector, we store only what’s required to operate it:</p>
        <ul>
          <li><strong>Your Zotero API key / login</strong>, used solely to access <em>your</em> library on your behalf. It is <strong>encrypted at rest (AES-256-GCM)</strong> and transmitted over TLS.</li>
          <li><strong>Your account email and subscription status</strong>, to provision and maintain access (managed via Polar — see Payments).</li>
          <li><strong>Operational logs</strong> with secrets redacted, kept short-term for reliability and abuse prevention.</li>
        </ul>
        <p>
          We act as a <strong>data processor</strong> for your library data — you remain in control
          of it. We do not read, mine, sell, or use your library or PDFs to train anything. Reads stay
          scoped to your own library.
        </p>
      </Sec>

      <Sec h="Payments">
        <p>
          Checkout and billing are handled by <a href="https://polar.sh" target="_blank" rel="noreferrer">Polar</a> as
          the merchant of record. We never see your card details. Polar processes your payment data
          under its own privacy policy.
        </p>
      </Sec>

      <Sec h="Sub-processors">
        <ul>
          <li><strong>Polar</strong> — checkout, subscriptions, and licensing.</li>
          <li><strong>Cloud hosting provider</strong> — runs the hosted connector instance.</li>
          <li><strong>Your own Zotero account</strong> — the source of the library data you ask us to access.</li>
        </ul>
      </Sec>

      <Sec h="Retention & deletion">
        <p>
          We keep your encrypted key only while your subscription is active. Revoke the key in Zotero
          at any time to cut off access immediately, cancel to stop renewal, or email us to delete your
          stored data outright. On cancellation we delete stored credentials within 30 days.
        </p>
      </Sec>

      <Sec h="Your rights">
        <p>
          Where the GDPR applies, you can request access, correction, deletion, or a copy of your data,
          and withdraw consent at any time. Contact <a href={`mailto:${contactEmail}`}>{contactEmail}</a> and
          we’ll respond promptly.
        </p>
      </Sec>

      <Sec h="Security">
        <p>
          Credentials are encrypted at rest, traffic is served over HTTPS, and access is scoped to your
          own library. No system is perfectly secure, but we keep the stored surface area deliberately
          small.
        </p>
      </Sec>

      <Sec h="Contact">
        <p>
          Questions or requests: <a href={`mailto:${contactEmail}`}>{contactEmail}</a>. Not affiliated
          with or endorsed by the Corporation for Digital Scholarship / Zotero.
        </p>
      </Sec>
    </LegalPage>
  );
}
