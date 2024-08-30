import '@testing-library/jest-dom';

import { render, screen } from '@testing-library/react';
import { usePathname } from 'next/navigation';
import { describe, expect, it, vi } from 'vitest';

import { DashboardNav } from '@/components/dashboard/DashboardNav';
import { buttonVariants } from '@/components/ui/button';

vi.mock('next/navigation');
vi.mock('@/components/ui/button');
vi.mock('@/config/dashboardNavItems', () => {
  return {
    dashboardNavItems: [
      { text: 'link', url: vi.fn().mockReturnValue('/slug/page') },
    ],
  };
});

describe('<DashboardNav />', () => {
  it('has correct classnames for default variant', () => {
    const buttonVariantsMock = vi.mocked(buttonVariants);

    render(<DashboardNav slug='project-slug' />);

    const dashboardNav = screen.getByTestId('dashboard-nav');

    expect(dashboardNav).toHaveClass('flex-col');
    expect(dashboardNav).not.toHaveClass('flex-row');
    expect(buttonVariantsMock).toHaveBeenCalledTimes(1);
    expect(buttonVariants).toHaveBeenCalledWith({
      size: 'default',
      variant: 'secondary',
    });
  });

  it('has the correct classnames for the mobile variant', () => {
    render(<DashboardNav slug='project-slug' variant='mobile' />);

    const dashboardNav = screen.getByTestId('dashboard-nav');
    expect(dashboardNav).not.toHaveClass('flex-col');
    expect(dashboardNav).toHaveClass('flex-row');
  });

  it('sets the button size to small for mobile', () => {
    const buttonVariantsMock = vi.mocked(buttonVariants);

    render(<DashboardNav slug='project-slug' variant='mobile' />);

    expect(buttonVariantsMock).toHaveBeenCalled();

    expect(buttonVariants).toHaveBeenCalledWith({
      size: 'sm',
      variant: 'secondary',
    });
  });

  it('sets the correct variant for active links', () => {
    const buttonVariantsMock = vi.mocked(buttonVariants);
    vi.mocked(usePathname).mockReturnValue('/slug/page');

    render(<DashboardNav slug='slug' variant='mobile' />);

    expect(buttonVariantsMock).toHaveBeenCalled();

    expect(buttonVariants).toHaveBeenCalledWith({
      size: 'sm',
      variant: 'default',
    });
  });
});
