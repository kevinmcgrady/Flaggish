import { urls } from './urls';

type NavItems = {
  text: string;
  url: string;
};

export const navItems: NavItems[] = [
  {
    text: 'Documentation',
    url: urls.home.root,
  },
  {
    text: 'Features',
    url: urls.home.features,
  },
  {
    text: 'Pricing',
    url: urls.home.pricing,
  },
];
