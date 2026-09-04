import Script from 'next/script';
import { analyticsDomains, analyticsEnabled, umamiSrc, umamiWebsiteId } from '@/lib/shared';

/**
 * Umami Cloud (EU region). Cookieless and IP-less: nothing is written to the
 * visitor's device, so this needs no consent banner. Disclosed on /privacy,
 * which is gated on the same analyticsEnabled flag.
 *
 * The tracker patches history.pushState/replaceState itself, so App Router
 * client-side navigations are counted without a usePathname effect and without
 * useSearchParams (which would need a Suspense boundary and break the export).
 *
 * data-do-not-track makes it record nothing when the browser sends DNT.
 */
export function Analytics() {
  if (!analyticsEnabled) return null;
  return (
    <Script
      src={umamiSrc}
      strategy="afterInteractive"
      data-website-id={umamiWebsiteId}
      data-domains={analyticsDomains}
      data-do-not-track="true"
    />
  );
}
