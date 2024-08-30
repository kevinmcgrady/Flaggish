import '@testing-library/jest-dom';

import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { Header } from '@/components/site/Header';

vi.mock('@clerk/nextjs', () => {
  return {
    UserButton: vi.fn(() => <div data-testid='user-button' />),
  };
});
vi.mock('next/image', () => {
  return {
    default: vi.fn((props) => <img {...props} />),
  };
});
vi.mock('@/components/site/AuthNav', () => {
  return {
    AuthNav: vi.fn(() => <div data-testid='auth-nav' />),
  };
});
vi.mock('@/components/site/MobileNav', () => {
  return {
    MobileNav: vi.fn(() => <div data-testid='mobile-nav' />),
  };
});
vi.mock('@/components/site/Navigation', () => {
  return {
    Navigation: vi.fn(() => <div data-testid='navigation' />),
  };
});

describe('<Header />', () => {
  it('should display the logo', () => {
    render(<Header />);

    const logo = screen.getByRole('img');

    expect(logo).toBeInTheDocument();
    expect(logo).toHaveAttribute('src', '/images/logo.png');
    expect(logo).toHaveAttribute('alt', 'Flaggish logo');
    expect(logo).toHaveAttribute('height', '30');
    expect(logo).toHaveAttribute('width', '30');
  });

  it('should display the navigation', () => {
    render(<Header />);

    const navigation = screen.getByTestId('navigation');

    expect(navigation).toBeInTheDocument();
  });

  it('should display the auth nav', () => {
    render(<Header />);

    const authNav = screen.getByTestId('auth-nav');

    expect(authNav).toBeInTheDocument();
  });

  it('should display the mobile nav', () => {
    render(<Header />);

    const mobileNav = screen.getByTestId('mobile-nav');

    expect(mobileNav).toBeInTheDocument();
  });

  it('should display the user button', () => {
    render(<Header />);

    const userButton = screen.getByTestId('user-button');

    expect(userButton).toBeInTheDocument();
  });
});
