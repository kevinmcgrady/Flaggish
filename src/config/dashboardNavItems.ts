import { urls } from '@/config/urls';

type DashboardNavItem = {
  text: string;
  url: string;
};

export const dashboardNavItems: DashboardNavItem[] = [
  {
    text: 'Projects',
    url: urls.dashboard.projects,
  },
  {
    text: 'Flags',
    url: urls.dashboard.flagsProd,
  },
  {
    text: 'API keys',
    url: urls.dashboard.apiKeys,
  },
];
