import { bookingHref, bookingLive, hostedLive, supportEmail, type Plan } from '@/lib/shared';

function Arrow() {
  return (
    <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

/**
 * The CTA for one paid plan.
 * hostedLive=false: "Available at launch" plus a notify contact (kill-switch).
 * plan.cta==='contact': talk to a human instead of a checkout (Department).
 */
export function SubscribeButton({
  plan,
  label,
  full = false,
}: {
  plan: Plan;
  label?: string;
  full?: boolean;
}) {
  const block = full ? 'z-btn-block' : '';

  if (!hostedLive) {
    return (
      <div className={full ? 'w-full' : ''}>
        <span className={`z-btn z-btn-secondary cursor-default opacity-70 ${block}`} aria-disabled="true">
          Available at launch
        </span>
        <p className="z-small mt-2">
          Get notified:{' '}
          <a href={`mailto:${supportEmail}`} className="text-[color:var(--accent-text)] hover:underline">{supportEmail}</a>
        </p>
      </div>
    );
  }

  if (plan.cta === 'contact' || !plan.checkout) {
    return (
      <a
        href={bookingHref}
        className={`z-btn z-btn-secondary ${block}`}
        aria-label={`Talk to us about the ${plan.name} plan`}
        data-umami-event="book-call-click"
        data-umami-event-source={`pricing-${plan.id}`}
        {...(bookingLive ? { target: '_blank', rel: 'noreferrer' } : {})}
      >
        {label ?? 'Talk to us'}
        <Arrow />
      </a>
    );
  }

  return (
    <a
      href={plan.checkout}
      className={`z-btn z-btn-primary ${block}`}
      aria-label={`Subscribe to Zoteus ${plan.name}`}
      data-umami-event="subscribe-click"
      data-umami-event-plan={plan.id}
    >
      {label ?? 'Subscribe'}
      <Arrow />
    </a>
  );
}

/** Book the free 15-minute setup call that every pilot starts with. `source` tags the Umami event. */
export function BookCallButton({
  label = 'Book a 15-minute setup call',
  full = false,
  source = 'pilot-section',
}: {
  label?: string;
  full?: boolean;
  source?: string;
}) {
  return (
    <a
      href={bookingHref}
      className={`z-btn z-btn-primary ${full ? 'z-btn-block' : ''}`}
      data-umami-event="book-call-click"
      data-umami-event-source={source}
      {...(bookingLive ? { target: '_blank', rel: 'noreferrer' } : {})}
    >
      {label}
      <Arrow />
    </a>
  );
}
