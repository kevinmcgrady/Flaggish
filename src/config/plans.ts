export type PlanType = {
  title: string;
  price: string;
  features: string[];
  type: 'free' | 'paid';
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
    type: 'free',
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
    type: 'paid',
  },
];
