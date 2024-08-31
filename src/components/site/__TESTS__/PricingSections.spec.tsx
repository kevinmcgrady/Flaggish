import '@testing-library/jest-dom';

import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { PricingSection } from '@/components/site/PricingSections';
import { Plan, PlanType } from '@/types/PlanType';

describe('<PricingSection />', () => {
  it('it display the title and subtitle', () => {
    render(<PricingSection plans={[]} />);

    const title = screen.getByText('Pricing');
    const subtitle = screen.getByText(
      'Choose the plan that best suits your project',
    );

    expect(title).toBeInTheDocument();
    expect(subtitle).toBeInTheDocument();
  });

  it('should display the free plan', () => {
    const freePlan: Plan[] = [
      {
        title: 'free-plan',
        price: 'Free',
        type: PlanType.FREE,
        features: ['feature-1'],
      },
    ];

    render(<PricingSection plans={freePlan} />);

    expect(screen.getByText('free-plan')).toBeInTheDocument();
    expect(screen.getByText('Free')).toBeInTheDocument();
    expect(screen.getByText('feature-1')).toBeInTheDocument();
    expect(screen.queryByText('/ per project')).not.toBeInTheDocument();
  });

  it('should display the pro plan', () => {
    const proPlan: Plan[] = [
      {
        title: 'pro-plan',
        price: 'Pro',
        type: PlanType.PAID,
        features: ['feature-1'],
      },
    ];

    render(<PricingSection plans={proPlan} />);

    expect(screen.getByText('pro-plan')).toBeInTheDocument();
    expect(screen.getByText('Pro')).toBeInTheDocument();
    expect(screen.getByText('feature-1')).toBeInTheDocument();
    expect(screen.getByText('/ per project')).toBeInTheDocument();
  });
});
