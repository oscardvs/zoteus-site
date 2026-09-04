export const appName = 'Zoteus';
export const docsRoute = '/docs';
export const docsImageRoute = '/og/docs';
export const docsContentRoute = '/llms.mdx/docs';

export const gitConfig = {
  user: 'oscardvs',
  repo: 'zoteus',
  branch: 'main',
};

export const npmPackage = '@oscardvs/zoteus';
export const installCmd = 'npx -y @oscardvs/zoteus';

export const repoUrl = `https://github.com/${gitConfig.user}/${gitConfig.repo}`;
export const npmUrl = `https://www.npmjs.com/package/${npmPackage}`;

/** Contact for privacy/data requests. Set up an email forward to a real inbox. */
export const contactEmail = 'privacy@zoteus.com';
/** General/support contact (Namecheap forward → your inbox). */
export const supportEmail = 'support@zoteus.com';
/** Sales/pilot contact for lab and department enquiries. */
export const salesEmail = 'support@zoteus.com';
/** Operator legal entity. Governing-law jurisdiction = Belgium (wired into /terms + /privacy, 1 June 2026). */
export const operator = 'Oscar Devos (“Zoteus”)';
/** Governing-law jurisdiction for the Terms; EU consumer home-country mandatory rights are preserved. */
export const jurisdiction = 'Belgium';

/** The live hosted connector URL subscribers add in claude.ai. */
export const connectorUrl = 'https://mcp.zoteus.com/mcp';
/** Master switch for hosted-tier sales. Flip to false to pause new subscriptions. */
export const hostedLive: boolean = true;

/**
 * Booking link for the free 15-minute setup call that every pilot starts with.
 * bookingLive=false falls back to a mailto so the CTA is never a dead end.
 */
export const bookingLive: boolean = true;
export const bookingUrl = 'https://cal.com/oscardvs/15min';

/** Where a "book a call" CTA should actually point today. */
export const bookingHref = bookingLive
  ? bookingUrl
  : `mailto:${salesEmail}?subject=${encodeURIComponent('Zoteus lab pilot')}`;

/* ── Plans ────────────────────────────────────────────────────────────────
 * Self-hosting stays free with every feature, deliberately and permanently.
 * The paid tiers sell hosting, seats and support time, never features.
 * Checkout links are Polar (merchant of record: it handles EU VAT and receipts).
 * ─────────────────────────────────────────────────────────────────────── */

/**
 * Polar checkout links. Each offers BOTH billing periods for its tier: the customer
 * switches between monthly and annual inside the Polar checkout itself.
 */
export const individualCheckout = 'https://buy.polar.sh/polar_cl_8aWnHqVFlhuJLZxmPWnMXugrOFLdEv7hreOn114kR0O';
export const labCheckout = 'https://buy.polar.sh/polar_cl_VVi2Q157BpM3riRNxmvgLg4kv8V7V9TaojZh71Eebim';

export type PlanCta = 'checkout' | 'install' | 'contact';

export interface Plan {
  id: string;
  name: string;
  seats: string;
  /** Headline price and the period it is quoted in. */
  price: string;
  period: string;
  /** Secondary price line, e.g. the annual equivalent. Empty when there isn't one. */
  altPrice: string;
  blurb: string;
  features: string[];
  cta: PlanCta;
  /** Polar checkout links. Empty string = not yet created. */
  checkout: string;
  checkoutAlt: string;
  highlight: boolean;
}

export const plans: Plan[] = [
  {
    id: 'self-hosted',
    name: 'Self-hosted',
    seats: 'Unlimited',
    price: 'Free',
    period: '',
    altPrice: 'Forever',
    blurb: 'MIT-licensed. Run it yourself.',
    features: [
      'Every feature, no paywall',
      'Local-first; your machine, your keys',
      'Self-host the OAuth remote for a team',
      'Community support on GitHub',
    ],
    cta: 'install',
    checkout: '',
    checkoutAlt: '',
    highlight: false,
  },
  {
    id: 'individual',
    name: 'Individual',
    seats: '1 person',
    price: '€69',
    period: '/year',
    altPrice: 'or €7/month',
    blurb: 'One researcher, nothing to run.',
    features: [
      'Connect in claude.ai with one URL',
      'Your personal Zotero library',
      'Per-user Zotero login, encrypted at rest',
      'Always on, maintained and updated',
      'Email support · cancel anytime',
    ],
    cta: 'checkout',
    checkout: individualCheckout,
    checkoutAlt: '',
    highlight: false,
  },
  {
    id: 'lab',
    name: 'Lab',
    seats: 'Up to 10 seats',
    price: '€99',
    period: '/month',
    altPrice: 'or €990/year, two months free',
    blurb: 'Your whole group, on your shared Zotero group library.',
    features: [
      'Everything in Individual, for 10 people',
      'Zotero group libraries, shared across the team',
      'A 15-minute setup call with the maintainer',
      'Priority email support',
      'Invoicing and purchase orders',
    ],
    cta: 'checkout',
    checkout: labCheckout,
    checkoutAlt: '',
    highlight: true,
  },
  {
    id: 'department',
    name: 'Department',
    seats: 'Up to 50 seats',
    price: '€299',
    period: '/month',
    altPrice: 'or €2,990/year',
    blurb: 'A faculty, library or institute.',
    features: [
      'Everything in Lab, for up to 50 people',
      'Onboarding session for your researchers',
      'Data Processing Addendum (GDPR Art. 28)',
      'Procurement paperwork handled',
      'Named contact for your institution',
    ],
    cta: 'contact',
    checkout: '',
    checkoutAlt: '',
    highlight: false,
  },
];

export const planById = (id: string) => plans.find((p) => p.id === id);

/** Whether any paid plan has a live checkout link yet. */
export const anyCheckoutLive = plans.some((p) => p.cta === 'checkout' && p.checkout !== '');

/* ── Analytics ────────────────────────────────────────────────────────────
 * Umami Cloud, EU (Germany) region. Cookieless, no IP stored, no cross-site
 * identifier, so no consent banner is required (ePrivacy Art. 5(3) is not
 * engaged: nothing is written to or read from the visitor's device).
 * The website id is public by design; it ships in the page source.
 *
 * analyticsEnabled is the SINGLE gate. It turns on the tracker AND the
 * matching section of /privacy together, so the site can never track without
 * disclosing it. Until the id is pasted in, both stay off.
 * ─────────────────────────────────────────────────────────────────────── */
export const analyticsLive: boolean = true;
/** From the Umami dashboard: Settings → Websites → your site → Edit. */
export const umamiWebsiteId: string = '194a92db-fe9a-464d-a6ba-8bce8e411949';
export const umamiSrc = 'https://cloud.umami.is/script.js';
/** Hostname allowlist; the tracker no-ops anywhere else (localhost, forks). */
export const analyticsDomains = 'zoteus.com';

export const analyticsEnabled =
  analyticsLive && umamiWebsiteId !== '' && !umamiWebsiteId.startsWith('PASTE-');
