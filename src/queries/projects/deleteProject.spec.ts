import { currentUser, User } from '@clerk/nextjs/server';
import { beforeEach,describe, expect, it, vi } from 'vitest';

import { db } from '@/lib/db';
import { deleteProject } from '@/queries/projects/deleteProject';

beforeEach(() => {
  vi.resetAllMocks();
});

vi.mock('@clerk/nextjs/server');
vi.mock('@/lib/db', () => {
  return {
    db: {
      project: {
        delete: vi.fn(),
      },
    },
  };
});

const user = { emailAddresses: [{ emailAddress: 'email' }], id: 'user-id' };

describe('deleteProject', () => {
  it('should return null if the user is logged out', async () => {
    const authMock = vi.mocked(currentUser).mockResolvedValue(null);
    const dbMock = vi.mocked(db.project.delete);
    const actual = await deleteProject('project-id');

    expect(authMock).toHaveBeenCalledTimes(1);
    expect(dbMock).toHaveBeenCalledTimes(0);
    expect(actual).toBe(null);
  });

  it('should delete the project with the correct args', async () => {
    const authMock = vi.mocked(currentUser).mockResolvedValue(user as User);
    const dbMock = vi.mocked(db.project.delete);

    await deleteProject('project-id');

    expect(authMock).toHaveBeenCalledTimes(1);
    expect(dbMock).toHaveBeenCalledTimes(1);
    expect(dbMock).toHaveBeenCalledWith({
      where: {
        id: 'project-id',
        userId: 'user-id',
      },
    });
  });
});
