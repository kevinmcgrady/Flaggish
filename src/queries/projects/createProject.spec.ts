import { currentUser, User } from '@clerk/nextjs/server';
import { Project } from '@prisma/client';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { db } from '@/lib/db';
import { createProject } from '@/queries/projects/createProject';
import { ApiKeyType } from '@/types/ApiKeyType';
import { generateKey } from '@/utils/generateApiKey';

beforeEach(() => {
  vi.resetAllMocks();
});

vi.mock('@clerk/nextjs/server');
vi.mock('@/utils/generateApiKey');

vi.mock('@/lib/db', () => {
  return {
    db: {
      project: {
        create: vi.fn(),
      },
    },
  };
});

const user = { emailAddresses: [{ emailAddress: 'email' }], id: 'user-id' };
const project: Project = {
  id: 'project-id',
  name: 'project-name',
  description: 'project-description',
  isActive: true,
  clientApiKey: 'client-key',
  secretApiKey: 'secret-key',
  slug: 'project-slug',
  userId: 'user-id',
};

describe('createProject', () => {
  it('should return null if the user is not logged in', async () => {
    const authMock = vi.mocked(currentUser).mockResolvedValue(null);
    const dbMock = vi.mocked(db.project.create);

    const expected = await createProject({
      name: 'project-name',
      description: 'project-desc',
      isActive: true,
    });

    expect(authMock).toBeCalledTimes(1);
    expect(dbMock).toBeCalledTimes(0);
    expect(expected).toBe(null);
  });

  it('should create and return the project', async () => {
    const authMock = vi.mocked(currentUser).mockResolvedValue(user as User);
    const dbMock = vi.mocked(db.project.create).mockResolvedValue(project);
    const apiKeyMock = vi.mocked(generateKey).mockReturnValue('api-key');
    const expected = await createProject({
      name: 'project-name',
      description: 'project-description',
      isActive: true,
    });

    expect(authMock).toBeCalledTimes(1);
    expect(dbMock).toBeCalledTimes(1);
    expect(apiKeyMock).toBeCalledTimes(2);

    expect(apiKeyMock).toBeCalledWith(ApiKeyType.client);
    expect(apiKeyMock).toBeCalledWith(ApiKeyType.secret);

    expect(dbMock).toBeCalledWith({
      data: {
        userId: 'user-id',
        clientApiKey: 'api-key',
        secretApiKey: 'api-key',
        name: 'project-name',
        description: 'project-description',
        isActive: true,
        slug: 'project-name',
      },
    });

    expect(expected).toBe(project);
  });
});
