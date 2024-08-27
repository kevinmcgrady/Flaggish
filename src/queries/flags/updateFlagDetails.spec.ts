import { currentUser, User } from '@clerk/nextjs/server';
import { describe,expect, it, vi } from 'vitest';

import { db } from '@/lib/db';

import { updateFlagDetails } from './updateFlagDetails';

vi.mock('@clerk/nextjs/server');
vi.mock('@/lib/db', () => {
  return {
    db: {
      flag: {
        update: vi.fn(),
      },
    },
  };
});

const user = { emailAddresses: [{ emailAddress: 'email' }] };

describe('updateFlagDetails', () => {
  it('should return null if the user is not logged in', async () => {
    const authMock = vi.mocked(currentUser).mockResolvedValue(null);
    const dbMock = vi.mocked(db.flag.update);
    const actual = await updateFlagDetails(
      'project-id',
      'flag-id',
      'name',
      'description',
    );

    expect(authMock).toBeCalledTimes(1);
    expect(dbMock).toBeCalledTimes(0);
    expect(actual).toBe(null);
  });

  it('should update the flag details', async () => {
    vi.mocked(currentUser).mockResolvedValue(user as User);
    const dbMock = vi.mocked(db.flag.update);
    await updateFlagDetails('project-id', 'flag-id', 'name', 'description');

    expect(dbMock).toBeCalledTimes(1);
    expect(dbMock).toBeCalledWith({
      where: {
        id: 'flag-id',
        projectId: 'project-id',
      },
      data: {
        name: 'name',
        description: 'description',
      },
    });
  });
});
