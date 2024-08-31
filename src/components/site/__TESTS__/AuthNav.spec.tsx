import '@testing-library/jest-dom';

import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { urls } from '@/config/urls';

import { AuthNav } from '../AuthNav';

vi.mock('@clerk/nextjs', () => {
  return {
    SignedIn: vi.fn((props) => <div data-testid='signed-in' {...props} />),
    SignedOut: vi.fn((props) => <div data-testid='signed-out' {...props} />),
    UserButton: vi.fn((props) => <div data-testid='user-button' {...props} />),
  };
});

describe('<AuthNav />', () => {
  it('should display the auth navigation links', () => {
    render(<AuthNav />);

    const signedInButton = screen.getByTestId('signed-in');
    const signedOutButton = screen.getByTestId('signed-out');
    const userButton = screen.getByTestId('user-button');

    expect(signedInButton).toBeInTheDocument();
    expect(signedOutButton).toBeInTheDocument();
    expect(userButton).toBeInTheDocument();

    expect(screen.getByText('Projects')).toHaveAttribute(
      'href',
      urls.projects.root,
    );

    expect(screen.getByText('Sign in')).toHaveAttribute(
      'href',
      urls.auth.signIn,
    );
  });

  it('should include the classname', () => {
    render(<AuthNav className='classname' />);
    expect(screen.getByTestId('auth-nav')).toHaveClass('classname');
  });
});
