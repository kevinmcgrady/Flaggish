import '@testing-library/jest-dom';

import { fireEvent,render, screen } from '@testing-library/react';
import { describe, expect,it, vi } from 'vitest';

import { SubmitButton } from '@/components/site/SubmitButton';

describe('<SubmitButton />', () => {
  it('should display children and type submit', () => {
    render(<SubmitButton isLoading={false}>ClickMe!</SubmitButton>);

    const button = screen.getByText('ClickMe!');

    expect(button).toBeInTheDocument();
    expect(button).toHaveAttribute('type', 'submit');
  });

  it('should call method on click', async () => {
    const onClickMock = vi.fn();

    render(
      <SubmitButton isLoading={false} onClick={onClickMock}>
        ClickMe!
      </SubmitButton>,
    );

    const button = screen.getByText('ClickMe!');

    await fireEvent.click(button);

    expect(onClickMock).toBeCalledTimes(1);
  });

  it('should show spinner when loading', () => {
    render(<SubmitButton isLoading={true}>ClickMe!</SubmitButton>);

    expect(screen.queryByText('ClickMe!')).not.toBeInTheDocument();
    expect(screen.getByTestId('loader')).toBeInTheDocument();
  });
});
