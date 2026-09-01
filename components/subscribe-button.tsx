import { polarCheckout, supportEmail, hostedLive } from '@/lib/shared';

function Arrow() {
  return (
    <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

/**
 * Single source of truth for the hosted-tier CTA.
 * hostedLive=true  → live Polar checkout.
 * hostedLive=false → "Available at launch" + notify contact (kill-switch).
 */
export function SubscribeButton({ label = 'Subscribe', full = false }: { label?: string; full?: boolean }) {
  if (!hostedLive) {
    return (
      <div className={full ? 'w-full' : ''}>
        <span className="z-ghost cursor-default opacity-70" aria-disabled="true">Available at launch</span>
        <p className="z-label mt-2 normal-case tracking-[0.03em]">
          Get notified:{' '}
          <a href={`mailto:${supportEmail}`} className="text-[color:var(--accent-text)] hover:underline">{supportEmail}</a>
        </p>
      </div>
    );
  }
  return (
    <a
      href={polarCheckout}
      className={`z-cta ${full ? 'w-full justify-center' : ''}`}
      aria-label="Subscribe to Zoteus Hosted"
    >
      {label}
      <span className="z-cta-icon"><Arrow /></span>
    </a>
  );
}
