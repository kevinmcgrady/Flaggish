import { describe, expect, it, vi } from 'vitest';

import { useToast } from '@/components/ui/use-toast';
import { useCopyToClipboard } from '@/hooks/useCopyToClipboard';

vi.mock('@/components/ui/use-toast', () => {
  return {
    useToast: vi.fn(() => ({
      toast: vi.fn(),
    })),
  };
});

describe('useCopyToClipboard', () => {
  it('should copy text to clipboard', () => {
    const textToCopy = 'copyMe!';

    const { copyToClipboard } = useCopyToClipboard();

    const mockWriteText = vi.fn();

    Object.assign(navigator, {
      clipboard: {
        writeText: mockWriteText,
      },
    });

    copyToClipboard({
      textToCopy,
      toastTitle: '',
      toastDescription: '',
    });

    expect(mockWriteText).toBeCalledTimes(1);
    expect(mockWriteText).toBeCalledWith(textToCopy);
  });

  it('should display a success toast with the correct details', () => {
    const toastTitle = 'title';
    const toastDescription = 'description';

    const toastMock = vi.fn();
    vi.mocked(useToast).mockReturnValue({ toast: toastMock } as any);

    const { copyToClipboard } = useCopyToClipboard();

    copyToClipboard({
      textToCopy: 'copyMe!',
      toastTitle,
      toastDescription,
    });

    expect(toastMock).toBeCalledTimes(1);
    expect(toastMock).toBeCalledWith({
      title: toastTitle,
      description: toastDescription,
    });
  });
});
