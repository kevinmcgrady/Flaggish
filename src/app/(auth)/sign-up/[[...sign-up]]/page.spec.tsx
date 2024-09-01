import '@testing-library/jest-dom';

import { SignUp } from '@clerk/nextjs';
import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { authLayout } from '@/config/authLayout';

import SignUpPage from './page';

vi.mock('@clerk/nextjs', () => {
  return {
    SignUp: vi.fn((props) => (
      <div data-testid='sign-in-component' {...props} />
    )),
  };
});

describe('<SignInPage />', () => {
  it('should render the clerk signin component with the correct config', () => {
    const signUpMock = vi.mocked(SignUp);

    render(<SignUpPage />);

    const signinComponent = screen.getByTestId('sign-in-component');

    expect(signinComponent).toBeInTheDocument();
    expect(signUpMock).toBeCalledWith({ appearance: authLayout }, {});
  });
});
