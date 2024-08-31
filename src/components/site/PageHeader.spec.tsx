import '@testing-library/jest-dom';

import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { PageHeader } from '@/components/site/PageHeader';

const title = 'title';
const description = 'description';
const ctaComponent = <p>cta-component</p>;

describe('<PageHeader />', () => {
  it('should display the correct details', () => {
    render(
      <PageHeader
        title={title}
        description={description}
        ctaComponent={ctaComponent}
      />,
    );

    expect(screen.getByText(title)).toBeInTheDocument();
    expect(screen.getByText(description)).toBeInTheDocument();
    expect(screen.getByText('cta-component')).toBeInTheDocument();
  });

  it('should hide the cta', () => {
    render(<PageHeader title={title} description={description} />);

    expect(screen.queryByText('cta-component')).not.toBeInTheDocument();
  });
});
