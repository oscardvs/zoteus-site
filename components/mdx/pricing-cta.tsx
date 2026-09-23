import Link from 'next/link';

/**
 * A tracked "get hosted access" button for the docs. `source` names the page it sits on, so
 * Umami can tell which guide sent the visitor to /pricing#plans.
 */
export function PricingCta({ source, label = 'Get hosted access, from €7/month' }: { source: string; label?: string }) {
  return (
    <div className="not-prose my-6">
      <Link
        href="/pricing#plans"
        className="z-btn z-btn-primary"
        data-umami-event="docs-pricing-click"
        data-umami-event-source={source}
      >
        {label}
        <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
          <path d="M5 12h14M13 6l6 6-6 6" />
        </svg>
      </Link>
    </div>
  );
}
