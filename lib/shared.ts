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
