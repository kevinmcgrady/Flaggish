import '@testing-library/jest-dom';

import { render,screen } from '@testing-library/react';
import { describe, expect, it,vi } from 'vitest';

import { NotFoundCard } from '@/components/site/NotFoundCard';
import { urls } from '@/config/urls';

vi.mock('next/image', () => {
  return {
    default: vi.fn((props) => <img {...props} />),
  };
});

describe('<NotFoundCard />', () => {
  it('should display the correct content', () => {
    render(<NotFoundCard />);
    const title = screen.getByText('Oops, are you lost?');
    const subTitle = screen.getByText('Get back on track!');
    const image = screen.getByRole('img');
    const link = screen.getByRole('link');

    expect(title).toBeInTheDocument();
    expect(subTitle).toBeInTheDocument();
    expect(image).toBeInTheDocument();
    expect(link).toBeInTheDocument();

    expect(image).toHaveAttribute('src', '/images/alert.png');
    expect(image).toHaveAttribute('alt', 'alert');

    expect(link).toHaveAttribute('href', urls.projects.root);
    expect(link).toHaveTextContent('Projects');
  });
});
