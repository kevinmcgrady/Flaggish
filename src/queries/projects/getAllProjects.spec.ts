import { currentUser, User } from '@clerk/nextjs/server';
import { beforeEach, describe, expect,it, vi } from 'vitest';

import { db } from '@/lib/db';
import { ProjectWithFlags } from '@/types/ProjectWithFlags';

import { getAllProjects } from './getAllProjects';

beforeEach(() => {
  vi.resetAllMocks();
});

vi.mock('@clerk/nextjs/server');
vi.mock('@/lib/db', () => {
  return {
    db: {
      project: {
        findMany: vi.fn(),
      },
    },
  };
});

const user = { emailAddresses: [{ emailAddress: 'email' }], id: 'user-id' };
const projects: ProjectWithFlags[] = [
  {
    id: 'project-id',
    name: 'project-name',
    slug: 'project-slug',
    description: 'project-description',
    clientApiKey: 'client-key',
    secretApiKey: 'secret-key',
    isActive: true,
    userId: 'user-id',
    flags: [
      {
        id: 'flag-id',
        description: 'flag-description',
        enviroment: 'DEVELOPMENT',
        isToggled: true,
        name: 'flag-name',
        projectId: 'project-id',
        slug: 'slug',
      },
    ],
  },
];

describe('getAllProjects', () => {
  it('should return null if the user is not logged in', async () => {
    const authMock = vi.mocked(currentUser).mockResolvedValue(null);
    const dbMock = vi.mocked(db.project.findMany);
    const actual = await getAllProjects();

    expect(authMock).toHaveBeenCalledTimes(1);
    expect(dbMock).toHaveBeenCalledTimes(0);
    expect(actual).toBe(null);
  });

  it('should return the users projects', async () => {
    const authMock = vi.mocked(currentUser).mockResolvedValue(user as User);
    const dbMock = vi.mocked(db.project.findMany).mockResolvedValue(projects);
    const actual = await getAllProjects();

    expect(authMock).toHaveBeenCalledTimes(1);
    expect(dbMock).toHaveBeenCalledTimes(1);

    expect(dbMock).toHaveBeenCalledWith({
      where: {
        userId: 'user-id',
      },
      include: {
        flags: true,
      },
    });

    expect(actual).toBe(projects);
  });
});
