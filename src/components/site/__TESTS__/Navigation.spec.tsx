import '@testing-library/jest-dom';

import { render,screen } from '@testing-library/react';
import { describe, expect,it } from 'vitest';

import { Navigation } from '@/components/site/Navigation';
import { navItems } from '@/config/navItems';

describe('<Navigation />', () => {
  it('should render the nav links', () => {
    render(<Navigation />);

    navItems.forEach((item) => {
      const link = screen.getByText(item.text);
      const target = item.newTab ? '_blank' : '_self';

      expect(link).toBeInTheDocument();
      expect(link).toHaveAttribute('href', item.url);

      expect(link).toHaveAttribute('target', target);
    });
  });

  it('should include the classname in the props', () => {
    render(<Navigation className='classname' />);

    const nav = screen.getByRole('navigation');

    expect(nav).toHaveClass('classname');
  });
});
