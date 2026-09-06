import type { Metadata } from 'next';
import Link from 'next/link';
import { LegalPage, Sec } from '@/components/legal-page';
import { contactEmail, operator, repoUrl } from '@/lib/shared';

export const metadata: Metadata = {
  title: 'Terms of Service',
  description: 'Terms for the open-source Zoteus connector (MIT) and the optional hosted subscription.',
  alternates: { canonical: '/terms/' },
};

export default function Terms() {
  return (
    <LegalPage
      title="Terms of Service"
      updated="1 June 2026"
      intro={
        <>
          These terms cover the Zoteus website and the optional hosted subscription operated by{' '}
          {operator}. The open-source connector itself is governed by its{' '}
          <a href={`${repoUrl}/blob/main/LICENSE`} target="_blank" rel="noreferrer">MIT License</a>.
        </>
      }
    >
      <Sec h="The open-source connector">
        <p>
          Zoteus is free and open-source software provided under the MIT License, <strong>“as is”,
          without warranty</strong> of any kind. You’re free to self-host and modify it per that license.
        </p>
      </Sec>

      <Sec h="The hosted subscription">
        <ul>
          <li>The hosted connector is a subscription. Current plans are <strong>Individual</strong> (€69/year or €7/month), <strong>Lab</strong>, up to 10 seats (€99/month or €990/year) and <strong>Department</strong>, up to 50 seats (€299/month or €2,990/year). You choose monthly or annual billing at checkout, through Polar (the merchant of record).</li>
          <li>Seat limits are a contractual term of the plan you buy, not a technical restriction: we ask you to buy the plan that matches your group rather than enforcing headcount in software.</li>
          <li>You may <strong>cancel anytime</strong> from the Polar customer portal; access continues until the end of your paid period.</li>
          <li>Refunds follow Polar’s policy and your statutory rights; a fee is otherwise non-refundable after the period it covers begins.</li>
          <li>The service is provided on a reasonable-effort basis with <strong>no uptime SLA</strong>. We may change, suspend, or discontinue it with reasonable notice.</li>
          <li>As an EU consumer you have a <strong>14-day right of withdrawal</strong>. By starting to use the hosted connector immediately, you ask us to begin the service during this period and acknowledge that you lose the right of withdrawal once the service has been fully provided; otherwise you may withdraw within 14 days for a refund of any unused portion.</li>
          <li>If you use Zoteus to process other people’s personal data and need a <strong>Data Processing Addendum</strong> (Article 28 GDPR), email us and we’ll provide one.</li>
        </ul>
      </Sec>

      <Sec h="Acceptable use">
        <p>
          Use the hosted connector only with your own Zotero account and data, lawfully, and without
          attempting to overload, abuse, reverse-engineer the hosted infrastructure, or access other
          users’ data. We may suspend access for misuse.
        </p>
      </Sec>

      <Sec h="No warranty & liability">
        <p>
          The service and software are provided “as is”. To the extent permitted by law, we disclaim all
          warranties and are not liable for indirect or consequential damages; our total liability is
          limited to the fees you paid in the prior 12 months. Zoteus is a tool; you remain responsible
          for verifying any output, including citations, before relying on it.
        </p>
      </Sec>

      <Sec h="Trademarks">
        <p>
          “Zotero” is a trademark of the Corporation for Digital Scholarship. Zoteus works <em>with</em>{' '}
          Zotero but is not affiliated with, sponsored by, or endorsed by it.
        </p>
      </Sec>

      <Sec h="Changes & contact">
        <p>
          We may update these terms; material changes will be reflected by the “last updated” date. These
          terms are governed by the laws of <strong>Belgium</strong>, where the operator is based, and any
          disputes fall to the competent Belgian courts. If you are a consumer resident elsewhere in the EU,
          this does not deprive you of the mandatory consumer protections of your country of residence, which
          continue to apply. Questions:{' '}
          <a href={`mailto:${contactEmail}`}>{contactEmail}</a>. See also our{' '}
          <Link href="/privacy">Privacy Policy</Link>.
        </p>
      </Sec>
    </LegalPage>
  );
}
