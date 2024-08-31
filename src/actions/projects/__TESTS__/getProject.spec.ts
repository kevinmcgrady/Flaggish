import { currentUser, User } from '@clerk/nextjs/server';
import { Project } from '@prisma/client';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { getProject } from '@/actions/projects/getProject';
import { db } from '@/lib/db';

beforeEach(() => {
  vi.resetAllMocks();
});

vi.mock('@clerk/nextjs/server');
vi.mock('@/lib/db', () => {
  return {
    db: {
      project: {
        findFirst: vi.fn(),
      },
    },
  };
});

const user = { emailAddresses: [{ emailAddress: 'email' }], id: 'user-id' };
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

describe('getProject', () => {
  it('should return null if the user is not logged in', async () => {
    const authMock = vi.mocked(currentUser).mockResolvedValue(null);
    const dbMock = vi.mocked(db.project.findFirst);
    const actual = await getProject('project-sluf');

    expect(authMock).toHaveBeenCalledTimes(1);
    expect(dbMock).toHaveBeenCalledTimes(0);
    expect(actual).toBe(null);
  });

  it('should return the users project', async () => {
    const authMock = vi.mocked(currentUser).mockResolvedValue(user as User);
    const dbMock = vi.mocked(db.project.findFirst).mockResolvedValue(project);
    const actual = await getProject('project-slug');

    expect(authMock).toHaveBeenCalledTimes(1);
    expect(dbMock).toHaveBeenCalledTimes(1);

    expect(dbMock).toHaveBeenCalledWith({
      where: {
        userId: 'user-id',
        slug: 'project-slug',
      },
    });

    expect(actual).toBe(project);
  });
});
