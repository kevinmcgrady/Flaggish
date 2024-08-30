import '@testing-library/jest-dom';

import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { Footer } from '@/components/site/Footer';
import { navItems } from '@/config/navItems';

describe('<Footer />', () => {
  it('should display the nav links', () => {
    render(<Footer />);

    navItems.forEach((item) => {
      const link = screen.getByText(item.text);
      expect(link).toBeInTheDocument();
      expect(link).toHaveAttribute('href', item.url);
    });
  });
});
