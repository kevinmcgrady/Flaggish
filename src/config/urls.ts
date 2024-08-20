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
  projects: {
    root: '/projects',
  },
  dashboard: {
    projectDetails: (slug: string) => `/project/${slug}/project-details`,
    flagsProd: (slug: string) => `/project/${slug}/flags?env=production`,
    flagsDev: (slug: string) => `/project/${slug}/flags?env=development`,
    apiKeys: (slug: string) => `/project/${slug}/apiKeys`,
  },
};
