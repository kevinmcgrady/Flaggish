import { Plan, PlanType } from '@/types/PlanType';

export const plans: Plan[] = [
  {
    title: 'Free',
    price: '£0',
    features: [
      '1 project',
      'Unlimited flags',
      'Create and manage flags',
      'Production and development flags',
    ],
    type: PlanType.FREE,
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
    type: PlanType.PAID,
  },
];
