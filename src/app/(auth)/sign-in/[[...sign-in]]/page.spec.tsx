import '@testing-library/jest-dom';

import { SignIn } from '@clerk/nextjs';
import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { authLayout } from '@/config/authLayout';

import SignInPage from './page';

vi.mock('@clerk/nextjs', () => {
  return {
    SignIn: vi.fn((props) => (
      <div data-testid='sign-in-component' {...props} />
    )),
  };
});

describe('<SignInPage />', () => {
  it('should render the clerk signin component with the correct config', () => {
    const signInMock = vi.mocked(SignIn);

    render(<SignInPage />);

    const signinComponent = screen.getByTestId('sign-in-component');

    expect(signinComponent).toBeInTheDocument();
    expect(signInMock).toBeCalledWith({ appearance: authLayout }, {});
  });
});
