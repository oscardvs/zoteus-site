import type { Metadata } from 'next';
import Link from 'next/link';
import { LegalPage, Sec } from '@/components/legal-page';
import { contactEmail, operator } from '@/lib/shared';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'What Zoteus stores, why, and your rights, for the open-source connector and the optional hosted tier.',
  alternates: { canonical: '/privacy' },
};

export default function Privacy() {
  return (
    <LegalPage
      title="Privacy Policy"
      updated="1 June 2026"
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
          <li><strong>Your account email and subscription status</strong>, to provision and maintain access (managed via Polar; see Payments).</li>
          <li><strong>Operational logs</strong> with secrets redacted, kept for reliability and abuse prevention and deleted within 30 days.</li>
        </ul>
        <p>
          We act as a <strong>data processor</strong> for your library data; you remain in control
          of it. We do not read, mine, sell, or use your library or PDFs to train anything. Reads stay
          scoped to your own library.
        </p>
        <p>
          We process your account email, subscription status, and encrypted Zotero key because they are
          necessary to provide the subscription you signed up for (<strong>Article 6(1)(b) GDPR</strong>,
          performance of our contract with you). We keep short-term operational logs on the basis of our
          legitimate interest in keeping the service reliable and preventing abuse (Article 6(1)(f) GDPR).
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
          <li><strong>Polar</strong>: checkout, subscriptions, and licensing.</li>
          <li><strong>Google Cloud (Google LLC)</strong>: hosts the hosted connector instance; see <em>International transfers</em> below.</li>
          <li><strong>Your own Zotero account</strong>: the source of the library data you ask us to access.</li>
        </ul>
      </Sec>

      <Sec h="International transfers">
        <p>
          The hosted connector currently runs on Google Cloud infrastructure located in the <strong>United
          States</strong> (region us-central1). This means that if you use the hosted tier, your encrypted
          Zotero API key and account email are transferred to and stored in the US. We rely on Google Cloud’s
          Standard Contractual Clauses (and, where applicable, the EU–US Data Privacy Framework) as the
          safeguard for this transfer under Articles 44–46 GDPR. We are evaluating moving hosting to a Google
          Cloud EU region to keep this data inside the EEA; if you <strong>self-host</strong>, no transfer
          takes place at all.
        </p>
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
          Where the GDPR applies, you can request access, correction, deletion, portability, or restriction
          of your data, and object to processing based on our legitimate interest. Contact{' '}
          <a href={`mailto:${contactEmail}`}>{contactEmail}</a> and we’ll respond promptly. You also have the
          right to lodge a complaint with your data protection authority; in Belgium, the{' '}
          <a href="https://www.gegevensbeschermingsautoriteit.be" target="_blank" rel="noreferrer">
            Gegevensbeschermingsautoriteit / Autorité de protection des données
          </a>.
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
          The data controller for the hosted tier is <strong>Oscar Devos</strong>, operating Zoteus from
          Belgium. You can reach the controller at <a href={`mailto:${contactEmail}`}>{contactEmail}</a> for
          any privacy question or data request. Not affiliated with or endorsed by the Corporation for Digital
          Scholarship / Zotero.
        </p>
      </Sec>
    </LegalPage>
  );
}
