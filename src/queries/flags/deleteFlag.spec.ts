import { currentUser, User } from '@clerk/nextjs/server';
import { describe, expect, it, vi } from 'vitest';

import { db } from '@/lib/db';
import { deleteFlag } from '@/queries/flags/deleteFlag';

vi.mock('@clerk/nextjs/server');
vi.mock('@/lib/db', () => {
  return {
    db: {
      flag: {
        delete: vi.fn(),
      },
    },
  };
});

const user = { emailAddresses: [{ emailAddress: 'email' }] };

describe('deleteFlag', () => {
  it('should return null if the user is logged out', async () => {
    const authMock = vi.mocked(currentUser).mockResolvedValue(null);
    const dbMock = vi.mocked(db.flag.delete);
    const actual = await deleteFlag('project-id', 'flag-id');

    expect(authMock).toHaveBeenCalledTimes(1);
    expect(dbMock).toHaveBeenCalledTimes(0);
    expect(actual).toBe(null);
  });

  it('should delete the flag', async () => {
    vi.mocked(currentUser).mockResolvedValue(user as User);
    const dbMock = vi.mocked(db.flag.delete);
    await deleteFlag('project-id', 'flag-id');

    expect(dbMock).toHaveBeenCalledTimes(1);
    expect(dbMock).toHaveBeenCalledWith({
      where: {
        projectId: 'project-id',
        id: 'flag-id',
      },
    });
  });
});
