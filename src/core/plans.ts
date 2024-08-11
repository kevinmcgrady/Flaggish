export type PlanType = {
  title: string;
  price: string;
  features: string[];
};

export const plans: PlanType[] = [
  {
    title: 'Free',
    price: '£0',
    features: [
      '1 project',
      'Unlimited flags',
      'Create and manage flags',
      'Production and development flags',
    ],
  },
  {
    title: 'Pro',
    price: '£10',
    features: [
      'Multiple projects',
      'Unlimited flags',
      'Create and manage flags',
      'Production and development flags',
    ],
  },
];
