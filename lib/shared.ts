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

/** Polar (merchant-of-record) hosted checkout for the paid hosted tier. */
export const polarCheckout =
  'https://buy.polar.sh/polar_cl_nt676bwneSGam2n0l0sscA7uxLFBeuCeOesJN4frNdV';
export const hostedPrice = '€30';
export const hostedPeriod = '/year';

/** Contact for privacy/data requests. Set up an email forward to a real inbox. */
export const contactEmail = 'privacy@zoteus.com';
/** General/support contact (Namecheap forward → your inbox). */
export const supportEmail = 'support@zoteus.com';
/** Operator legal entity. Governing-law jurisdiction = Belgium (wired into /terms + /privacy, 1 June 2026). */
export const operator = 'Oscar Devos (“Zoteus”)';
/** Governing-law jurisdiction for the Terms; EU consumer home-country mandatory rights are preserved. */
export const jurisdiction = 'Belgium';

/** The live hosted connector URL subscribers add in claude.ai. */
export const connectorUrl = 'https://mcp.zoteus.com/mcp';
/** Master switch for hosted-tier sales. Flip to false to pause new subscriptions. */
export const hostedLive = true;
