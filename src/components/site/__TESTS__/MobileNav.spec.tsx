import '@testing-library/jest-dom';

import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { navItems } from '@/config/navItems';
import { urls } from '@/config/urls';

import { MobileNav } from '../MobileNav';

vi.mock('@clerk/nextjs', () => {
  return {
    SignedIn: vi.fn((props) => <div data-testid='signed-in' {...props} />),
    SignedOut: vi.fn((props) => <div data-testid='signed-out' {...props} />),
  };
});

describe('<MobileNav />', () => {
  it('should be hidden by default', () => {
    render(<MobileNav />);
    const mobileTrigger = screen.getByTestId('mobile-trigger');
    const navContent = screen.queryByTestId('nav-content');

    expect(mobileTrigger).toBeInTheDocument();
    expect(navContent).not.toBeInTheDocument();
  });

  it('should display the menu when the trigger is clicked', async () => {
    render(<MobileNav />);

    const mobileTrigger = screen.getByTestId('mobile-trigger');

    await fireEvent.click(mobileTrigger);

    await waitFor(() => {
      expect(screen.getByText('Site')).toBeInTheDocument();

      navItems.forEach((item) => {
        const link = screen.getByText(item.text);
        expect(link).toBeInTheDocument();
        expect(link).toHaveAttribute('href', item.url);
      });

      const projectsButton = screen.getByText('Projects');
      const signInButton = screen.getByText('Sign in');

      expect(projectsButton).toBeInTheDocument();
      expect(signInButton).toBeInTheDocument();
      expect(projectsButton).toHaveAttribute('href', urls.projects.root);
      expect(signInButton).toHaveAttribute('href', urls.auth.signIn);
    });
  });
});
