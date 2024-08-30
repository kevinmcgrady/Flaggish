import { currentUser, User } from '@clerk/nextjs/server';
import { describe, expect, it, vi } from 'vitest';

import { syncUser } from '@/actions/auth/syncUser';
import { db } from '@/lib/db';
import { error, info } from '@/lib/logger';

vi.mock('@clerk/nextjs/server');
vi.mock('@/lib/db', () => {
  return {
    db: {
      user: {
        findUnique: vi.fn(),
        create: vi.fn(),
      },
    },
  };
});
vi.mock('@/lib/logger');

describe('syncUser', () => {
  it('should log an error if the user is logged out', async () => {
    vi.mocked(currentUser).mockResolvedValue(null);
    const mockedErrorLog = vi.mocked(error);

    await syncUser();

    expect(mockedErrorLog).toBeCalledTimes(1);
    expect(mockedErrorLog).toBeCalledWith({
      message: 'Unauthenticated',
      journey: 'auth',
      method: 'syncUser',
    });
  });

  it('should create a new user if it doesnt exist', async () => {
    const authUser = {
      id: 'user-id',
      imageUrl: 'image-url',
      emailAddresses: [{ emailAddress: 'email' }],
      firstName: 'first-name',
      lastName: 'last-name',
    };

    vi.mocked(currentUser).mockResolvedValue(authUser as User);
    const mockedDbUser = vi.mocked(db.user.findUnique).mockResolvedValue(null);
    const mockedDbUserCreate = vi.mocked(db.user.create);
    const successLogMock = vi.mocked(info);

    await syncUser();

    expect(mockedDbUser).toBeCalledTimes(1);
    expect(mockedDbUserCreate).toBeCalledWith({
      data: {
        id: authUser.id,
        imageUrl: authUser.imageUrl,
        emailAddress: authUser.emailAddresses[0].emailAddress,
        firstName: authUser.firstName!,
        lastName: authUser.lastName!,
      },
    });
    expect(successLogMock).toHaveBeenCalledTimes(1);
    expect(successLogMock).toHaveBeenCalledWith({
      message: 'user created',
      journey: 'auth',
      method: 'syncUser',
    });
  });
});
