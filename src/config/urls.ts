export const urls = {
  home: {
    root: '/',
    features: '/#features',
    pricing: '/#pricing',
    docs: 'https://flaggish.gitbook.io/flaggish-docs',
  },
  auth: {
    signIn: '/sign-in',
    signUp: '/sign-up',
  },
  dashboard: {
    projects: '/projects',
    flagsProd: (slug: string) => `/${slug}/flags?env=production`,
    flagsDev: (slug: string) => `/${slug}/flags?env=development`,
    apiKeys: (slug: string) => `/${slug}/apiKeys`,
  },
};
