import { currentUser, User } from '@clerk/nextjs/server';
import { Project } from '@prisma/client';
import { describe, expect, it, vi } from 'vitest';

import { createFlag } from '@/actions/flags/createFlag';
import { db } from '@/lib/db';

vi.mock('@clerk/nextjs/server');
vi.mock('@/lib/db', () => {
  return {
    db: {
      project: {
        findFirst: vi.fn(),
      },
      flag: {
        create: vi.fn(),
      },
    },
  };
});

const project: Project = {
  id: 'id',
  clientApiKey: 'client-key',
  description: 'description',
  isActive: true,
  name: 'name',
  secretApiKey: 'ssshhh',
  slug: 'slug',
  userId: 'user-id',
};

const user = {
  emailAddresses: [{ emailAddress: 'email' }],
};

describe('createFlag', () => {
  it('should return null if user is not logged in', async () => {
    const userMock = vi.mocked(currentUser).mockResolvedValue(null);
    const actual = await createFlag(
      'name',
      'description',
      'DEVELOPMENT',
      'project-id',
    );

    expect(userMock).toBeCalledTimes(1);
    expect(actual).toBe(null);
  });

  it('should return null if no project exists', async () => {
    vi.mocked(currentUser).mockResolvedValue(user as User);

    const projectDb = vi.mocked(db.project.findFirst).mockResolvedValue(null);

    const actual = await createFlag(
      'name',
      'description',
      'DEVELOPMENT',
      'project-id',
    );

    expect(projectDb).toBeCalledTimes(1);
    expect(actual).toBe(null);
  });

  it('should create the flag if the user is logged in and the project exists', async () => {
    vi.mocked(currentUser).mockResolvedValue(user as User);
    vi.mocked(db.project.findFirst).mockResolvedValue(project);
    const flagDbMock = vi.mocked(db.flag.create);

    await createFlag('name', 'description', 'DEVELOPMENT', 'project-id');

    expect(flagDbMock).toHaveBeenCalledTimes(1);
    expect(flagDbMock).toBeCalledWith({
      data: {
        name: 'name',
        description: 'description',
        projectId: 'project-id',
        enviroment: 'DEVELOPMENT',
        isToggled: true,
        slug: 'name',
      },
    });
  });
});
