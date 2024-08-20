import { urls } from '@/config/urls';

type DashboardNavItem = {
  text: string;
  url: (slug: string) => string;
};

export const dashboardNavItems: DashboardNavItem[] = [
  {
    text: 'Project Details',
    url: (slug: string) => urls.dashboard.projectDetails(slug),
  },
  {
    text: 'Flags',
    url: (slug: string) => urls.dashboard.flagsProd(slug),
  },
  {
    text: 'API keys',
    url: (slug: string) => urls.dashboard.apiKeys(slug),
  },
];
