import '@testing-library/jest-dom';

import { Project } from '@prisma/client';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { useRouter } from 'next/navigation';
import { describe, expect, it, vi } from 'vitest';

import { createStripeSession } from '@/actions/payment/createSession';

import { useToast } from '../ui/use-toast';
import { ActivateProjectButton } from './ActivateProjectButton';

vi.mock('next/navigation');
vi.mock('@/components/ui/use-toast', () => {
  return {
    useToast: vi.fn(() => ({
      toast: vi.fn(),
    })),
  };
});
vi.mock('@/actions/payment/createSession');

const project: Project = {
  id: 'project-id',
  name: 'project-name',
  description: 'project-description',
  clientApiKey: 'client-key',
  secretApiKey: 'secret-key',
  isActive: true,
  slug: 'project-slug',
  userId: 'user-id',
};

describe('<ActivateProjectButton />', () => {
  it('should call the stripe session method on click', async () => {
    const pushMock = vi.fn();
    const stripeMock = vi
      .mocked(createStripeSession)
      .mockResolvedValue('stripe-url');
    vi.mocked(useRouter).mockReturnValue({ push: pushMock } as any);

    render(<ActivateProjectButton project={project} />);

    const button = screen.getByRole('button');

    await fireEvent.click(button);

    await waitFor(() => {
      expect(stripeMock).toBeCalledTimes(1);
      expect(stripeMock).toBeCalledWith({ projectId: 'project-id' });
      expect(pushMock).toBeCalledTimes(1);
      expect(pushMock).toBeCalledWith('stripe-url');
    });
  });

  it('should display a toast on error from stripe', async () => {
    const toastMock = vi.fn();
    vi.mocked(useToast).mockReturnValue({ toast: toastMock } as any);
    vi.mocked(createStripeSession).mockRejectedValue('error');

    render(<ActivateProjectButton project={project} />);

    const button = screen.getByRole('button');

    await fireEvent.click(button);

    await waitFor(() => {
      expect(toastMock).toBeCalledTimes(1);
      expect(toastMock).toBeCalledWith({
        description: 'There has been a problem, please try again',
        title: 'Oops!',
        variant: 'destructive',
      });
    });
  });
});
