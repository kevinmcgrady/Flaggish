import '@testing-library/jest-dom';

import { render,screen } from '@testing-library/react';
import { describe, expect,it, vi } from 'vitest';

import { LeftSidebar } from './LeftSidebar';

vi.mock('@/components/dashboard/DashboardNav', () => {
  return {
    DashboardNav: vi.fn((props) => (
      <div data-testid='dashboard-nav' {...props} />
    )),
  };
});

describe('<LeftSidebar />', () => {
  it('should pass the slug to the dashboard nav', () => {
    render(<LeftSidebar slug='slug' />);

    const nav = screen.getByTestId('dashboard-nav');

    expect(nav).toHaveAttribute('slug', 'slug');
  });
});
