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
/** Operator legal entity / jurisdiction — confirm before relying on the Terms. */
export const operator = 'Oscar Devos (“Zoteus”)';
