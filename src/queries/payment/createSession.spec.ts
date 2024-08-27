import { currentUser, User } from '@clerk/nextjs/server';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { stripe } from '@/lib/stripe';
import { createStripeSession } from '@/queries/payment/createSession';
import { absoluteUrl } from '@/utils/absoluteUrl';

beforeEach(() => {
  vi.resetAllMocks();
});

vi.mock('@clerk/nextjs/server');
vi.mock('@/utils/absoluteUrl');

vi.mock('@/lib/stripe', () => {
  return {
    stripe: {
      checkout: {
        sessions: {
          create: vi.fn(),
        },
      },
    },
  };
});

const user = { emailAddresses: [{ emailAddress: 'email' }], id: 'user-id' };

describe('createSession', () => {
  it('should return null if the user is not logged in', async () => {
    const authMock = vi.mocked(currentUser).mockResolvedValue(null);
    const stripeMock = vi.mocked(stripe.checkout.sessions.create);
    const actual = await createStripeSession({ projectId: 'project-id' });

    expect(authMock).toHaveBeenCalledTimes(1);
    expect(stripeMock).toHaveBeenCalledTimes(0);
    expect(actual).toBe(null);
  });

  it('should return a session url', async () => {
    const authMock = vi.mocked(currentUser).mockResolvedValue(user as User);
    const absoluteUrlMock = vi
      .mocked(absoluteUrl)
      .mockReturnValue('absolute-url');
    const stripeMock = vi
      .mocked(stripe.checkout.sessions.create)
      .mockResolvedValue({ url: 'session-url' } as any);
    const actual = await createStripeSession({ projectId: 'project-id' });

    expect(authMock).toHaveBeenCalledTimes(1);
    expect(absoluteUrlMock).toHaveBeenCalledTimes(1);
    expect(stripeMock).toHaveBeenCalledTimes(1);

    expect(stripeMock).toHaveBeenCalledWith({
      line_items: [
        {
          price: 'price_1PpTCnIa9gtTq6zr9WMkpYzs',
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: 'absolute-url',
      cancel_url: 'absolute-url',
      metadata: {
        projectId: 'project-id',
        userId: 'user-id',
      },
    });

    expect(actual).toBe('session-url');
  });

  it('should throw an error if stripe fails', async () => {
    vi.mocked(currentUser).mockResolvedValue(user as User);
    vi.mocked(absoluteUrl).mockReturnValue('absolute-url');
    vi.mocked(stripe.checkout.sessions.create).mockRejectedValue('error');

    await expect(() =>
      createStripeSession({ projectId: 'project-id' }),
    ).rejects.toThrowError();
  });
});
