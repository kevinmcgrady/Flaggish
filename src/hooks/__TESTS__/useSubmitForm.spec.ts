import { act,renderHook } from '@testing-library/react';
import { useRouter } from 'next/navigation';
import { describe, expect, it, vi } from 'vitest';

import { useToast } from '@/components/ui/use-toast';
import { useSubmitForm } from '@/hooks/useSubmitForm';

vi.mock('next/navigation', () => ({
  useRouter: vi.fn(),
}));

vi.mock('@/components/ui/use-toast', () => ({
  useToast: vi.fn(),
}));

describe('useSubmitForm', () => {
  it('should submit the form successfully', async () => {
    const action = vi.fn().mockResolvedValueOnce(undefined);

    const mockRefresh = vi.fn();
    const mockToast = vi.fn();

    vi.mocked(useRouter).mockReturnValue({ refresh: mockRefresh } as any);
    vi.mocked(useToast).mockReturnValue({ toast: mockToast } as any);

    const successToast = {
      title: 'Success!',
      description: 'Form submitted successfully.',
    };

    const { result } = renderHook(() => useSubmitForm());
    const { onSubmit } = result.current;

    await act(async () => {
      await onSubmit({ action, successToast });
    });

    expect(result.current.isLoading).toBe(false);
    expect(action).toHaveBeenCalledTimes(1);
    expect(mockRefresh).toHaveBeenCalledTimes(1);
    expect(mockToast).toHaveBeenCalledWith({
      title: successToast.title,
      description: successToast.description,
    });
  });

  it('should submit the form successfully', async () => {
    const action = vi.fn().mockRejectedValue(undefined);

    const mockRefresh = vi.fn();
    const mockToast = vi.fn();

    vi.mocked(useRouter).mockReturnValue({ refresh: mockRefresh } as any);
    vi.mocked(useToast).mockReturnValue({ toast: mockToast } as any);

    const errorToast = {
      title: 'Oops!',
      description: 'There was an error, please try again.',
      variant: 'destructive',
    };

    const { result } = renderHook(() => useSubmitForm());
    const { onSubmit } = result.current;

    await act(async () => {
      await onSubmit({ action, successToast: { title: '', description: '' } });
    });

    expect(result.current.isLoading).toBe(false);
    expect(action).toHaveBeenCalledTimes(1);
    expect(mockRefresh).toHaveBeenCalledTimes(0);
    expect(mockToast).toHaveBeenCalledWith({
      title: errorToast.title,
      description: errorToast.description,
      variant: errorToast.variant,
    });
  });
});
