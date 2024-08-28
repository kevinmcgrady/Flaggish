import { currentUser, User } from '@clerk/nextjs/server';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { db } from '@/lib/db';
import { updateProjectDetails } from '@/queries/projects/updateProjectDetails';

beforeEach(() => {
  vi.resetAllMocks();
});

vi.mock('@clerk/nextjs/server');
vi.mock('@/lib/db', () => {
  return {
    db: {
      project: {
        update: vi.fn(),
      },
    },
  };
});

const user = { emailAddresses: [{ emailAddress: 'email' }], id: 'user-id' };

describe('updateProjectDetails', () => {
  it('should return null if the user is not logged in', async () => {
    const authMock = vi.mocked(currentUser).mockResolvedValue(null);
    const dbMock = vi.mocked(db.project.update);
    const actual = await updateProjectDetails(
      'project-id',
      'project-name',
      'project-description',
    );

    expect(authMock).toBeCalledTimes(1);
    expect(dbMock).toBeCalledTimes(0);
    expect(actual).toBe(null);
  });

  it('should update the correct project with the correct args', async () => {
    const authMock = vi.mocked(currentUser).mockResolvedValue(user as User);
    const dbMock = vi.mocked(db.project.update);
    await updateProjectDetails(
      'project-id',
      'project-name',
      'project-description',
    );

    expect(authMock).toHaveBeenCalledTimes(1);
    expect(dbMock).toHaveBeenCalledTimes(1);
    expect(dbMock).toHaveBeenCalledWith({
      where: {
        id: 'project-id',
        userId: 'user-id',
      },
      data: {
        name: 'project-name',
        description: 'project-description',
      },
    });
  });
});
