import '@testing-library/jest-dom';

import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { WelcomeScreen } from '@/components/site/WelcomeScreen';
import { urls } from '@/config/urls';

vi.mock('@/components/projects/CreateProject', () => {
  return {
    CreateProject: vi.fn(() => <div data-testid='create-project' />),
  };
});

vi.mock('next/image', () => {
  return {
    default: vi.fn((props) => <img {...props} />),
  };
});

describe('<WelcomeScreen />', () => {
  it('should display the correct information', () => {
    render(<WelcomeScreen />);

    const title = screen.getByText('Welcome to Flaggish');
    const subtitle = screen.getByText('The feature flag manager for NextJs');
    const getStarted = screen.getByText('To Get Started 🎉');
    const firstStep = screen.getByText('1. Create your first project');
    const secondStep = screen.getByText('2. Install the SDK and follow the');
    const link = screen.getByRole('link');
    const logo = screen.getByRole('img');

    expect(title).toBeInTheDocument();
    expect(subtitle).toBeInTheDocument();
    expect(getStarted).toBeInTheDocument();
    expect(firstStep).toBeInTheDocument();
    expect(secondStep).toBeInTheDocument();
    expect(link).toBeInTheDocument();
    expect(logo).toBeInTheDocument();

    expect(link).toHaveAttribute('href', urls.home.docs);
    expect(link).toHaveTextContent('install guide');
    expect(link).toHaveAttribute('target', '_blank');

    expect(logo).toHaveAttribute('alt', 'Flaggish logo');
    expect(logo).toHaveAttribute('src', '/images/logo.png');
  });

  it('should display the create project button', () => {
    render(<WelcomeScreen />);

    const createProjectButton = screen.getByTestId('create-project');

    expect(createProjectButton).toBeInTheDocument();
  });
});
