import { currentUser, User } from '@clerk/nextjs/server';
import { describe, expect, it, vi } from 'vitest';

import { db } from '@/lib/db';
import { updateFlag } from '@/queries/flags/updateFlag';

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

describe('updateFlag', () => {
  it('should return null if the user is not logged in', async () => {
    const authMock = vi.mocked(currentUser).mockResolvedValue(null);
    const dbMock = vi.mocked(db.flag.update);
    const expected = await updateFlag('project-id', 'flag-id', true);

    expect(authMock).toBeCalledTimes(1);
    expect(dbMock).toBeCalledTimes(0);
    expect(expected).toBe(null);
  });

  it('it should update the flag with the correct params', async () => {
    vi.mocked(currentUser).mockResolvedValue(user as User);
    const dbMock = vi.mocked(db.flag.update);
    await updateFlag('project-id', 'flag-id', true);

    expect(dbMock).toBeCalledTimes(1);
    expect(dbMock).toBeCalledWith({
      where: {
        id: 'flag-id',
        projectId: 'project-id',
      },
      data: {
        isToggled: true,
      },
    });
  });
});
