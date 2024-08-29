import '@testing-library/jest-dom';

import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { describe, expect,it, vi } from 'vitest';

import { ApiKeyInput } from '@/components/dashboard/ApiKeyInput';
import { useCopyToClipboard } from '@/hooks/useCopyToClipboard';
import { useSubmitForm } from '@/hooks/useSubmitForm';
import { updateKey } from '@/queries/keys/updateKey';
import { ApiKeyType } from '@/types/ApiKeyType';

vi.mock('@/hooks/useSubmitForm', () => {
  return {
    useSubmitForm: vi.fn(() => ({
      isLoading: false,
      onSubmit: vi.fn(),
    })),
  };
});

vi.mock('@/hooks/useCopyToClipboard', () => {
  return {
    useCopyToClipboard: vi.fn(() => ({ copyToClipboard: vi.fn() })),
  };
});

vi.mock('@/queries/keys/updateKey', () => {
  return {
    updateKey: vi.fn(),
  };
});

describe('<ApiKeyInout />', () => {
  it('should display the correct text', () => {
    render(
      <ApiKeyInput
        apiKey='api-key'
        label='label'
        projectId='project-id'
        type={ApiKeyType.client}
      />,
    );

    const apiInput = screen.getByTestId('api-input');

    expect(screen.getByText('label')).toBeInTheDocument();
    expect(apiInput).toHaveAttribute('type', 'password');
  });

  it('should toggle the hidden field', async () => {
    render(
      <ApiKeyInput
        apiKey='api-key'
        label='label'
        projectId='project-id'
        type={ApiKeyType.client}
      />,
    );

    const hideButton = screen.getByTestId('hide-button');
    const apiInput = screen.getByTestId('api-input');

    await fireEvent.click(hideButton);

    expect(apiInput).toHaveAttribute('type', 'text');
  });

  it('should call the copy method', async () => {
    const copyToClipboardMock = vi.fn();

    vi.mocked(useCopyToClipboard).mockReturnValue({
      copyToClipboard: copyToClipboardMock,
    });

    render(
      <ApiKeyInput
        apiKey='api-key'
        label='label'
        projectId='project-id'
        type={ApiKeyType.client}
      />,
    );

    const copyButton = screen.getByTestId('copy-button');

    await fireEvent.click(copyButton);

    expect(copyToClipboardMock).toBeCalledTimes(1);
    expect(copyToClipboardMock).toBeCalledWith({
      textToCopy: 'api-key',
      toastDescription: 'Your api key has been copied',
      toastTitle: 'copied!',
    });
  });

  it('should call the generate key method', async () => {
    const actionMock = vi.fn();
    const updateKeyMock = vi.mocked(updateKey);

    vi.mocked(useSubmitForm).mockReturnValue({
      isLoading: false,
      onSubmit: actionMock,
    });

    render(
      <ApiKeyInput
        apiKey='api-key'
        label='label'
        projectId='project-id'
        type={ApiKeyType.client}
      />,
    );

    const generateKeyButton = screen.getByText('Generate new key');

    await fireEvent.click(generateKeyButton);

    await waitFor(() => {
      expect(actionMock).toHaveBeenCalledWith({
        successToast: {
          title: 'Key updated',
          description: 'Your key has been updated.',
        },
        action: expect.any(Function),
      });
    });

    await waitFor(async () => {
      const action = actionMock.mock.calls[0][0].action;
      await action();
      expect(updateKeyMock).toHaveBeenCalledWith(
        'project-id',
        ApiKeyType.client,
      );
    });
  });
});
