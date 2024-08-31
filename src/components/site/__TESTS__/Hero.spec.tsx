import '@testing-library/jest-dom';

import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { Hero } from '@/components/site/Hero';

vi.mock('@/components/ui/clipboard', () => {
  return {
    Clipboard: vi.fn(() => <div data-testid='clipboard' />),
  };
});

vi.mock('next/image', () => {
  return {
    default: vi.fn((props) => <img {...props} />),
  };
});

describe('<Hero />', () => {
  it('should display the correct information', () => {
    render(<Hero />);

    const inDevelopment = screen.getByText('Currently in development 🎉');
    const title = screen.getByText(/When feature flags meet NextJs/i);
    const tagLine = screen.getByText(
      'Flaggish is a feature flag manager for NextJs',
    );
    const clipboard = screen.getByTestId('clipboard');
    const logo = screen.getByRole('img');

    expect(inDevelopment).toBeInTheDocument();
    expect(title).toBeInTheDocument();
    expect(tagLine).toBeInTheDocument();
    expect(clipboard).toBeInTheDocument();

    expect(logo).toBeInTheDocument();
    expect(logo).toHaveAttribute('src', '/images/logo.png');
    expect(logo).toHaveAttribute('alt', 'Flaggish logo');
  });
});
