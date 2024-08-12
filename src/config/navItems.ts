import { urls } from '@/config/urls';

type NavItems = {
  text: string;
  url: string;
  newTab: boolean;
};

export const navItems: NavItems[] = [
  {
    text: 'Documentation',
    url: urls.home.docs,
    newTab: true,
  },
  {
    text: 'Features',
    url: urls.home.features,
    newTab: false,
  },
  {
    text: 'Pricing',
    url: urls.home.pricing,
    newTab: false,
  },
];
