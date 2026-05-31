import type { Metadata } from 'next';
import Link from 'next/link';
import { LegalPage, Sec } from '@/components/legal-page';
import { contactEmail, operator, hostedPrice, hostedPeriod, repoUrl } from '@/lib/shared';

export const metadata: Metadata = {
  title: 'Terms of Service',
  description: 'Terms for the open-source Zoteus connector (MIT) and the optional hosted subscription.',
  alternates: { canonical: '/terms' },
};

export default function Terms() {
  return (
    <LegalPage
      title="Terms of Service"
      updated="31 May 2026"
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
          <li>The hosted connector is a subscription at <strong>{hostedPrice}{hostedPeriod}</strong>, billed annually through Polar (the merchant of record).</li>
          <li>You may <strong>cancel anytime</strong> from the Polar customer portal; access continues until the end of your paid period.</li>
          <li>Refunds follow Polar’s policy and your statutory rights; the annual fee is otherwise non-refundable after the period begins.</li>
          <li>The service is provided on a reasonable-effort basis with <strong>no uptime SLA</strong>. We may change, suspend, or discontinue it with reasonable notice.</li>
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
          limited to the fees you paid in the prior 12 months. Zoteus is a tool — you remain responsible
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
          We may update these terms; material changes will be reflected by the “last updated” date. The
          terms are governed by the laws of the operator’s jurisdiction. Questions:{' '}
          <a href={`mailto:${contactEmail}`}>{contactEmail}</a>. See also our{' '}
          <Link href="/privacy">Privacy Policy</Link>.
        </p>
      </Sec>
    </LegalPage>
  );
}
