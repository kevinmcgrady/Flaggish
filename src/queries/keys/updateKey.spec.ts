import { currentUser, User } from '@clerk/nextjs/server';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { db } from '@/lib/db';
import { updateKey } from '@/queries/keys/updateKey';
import { ApiKeyType } from '@/types/ApiKeyType';
import { generateKey } from '@/utils/generateApiKey';

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
vi.mock('@/utils/generateApiKey');

const user = { emailAddresses: [{ emailAddress: 'email' }], id: 'user-id' };

describe('updateKey', () => {
  it('should return null if the user is logged out', async () => {
    const authMock = vi.mocked(currentUser).mockResolvedValue(null);
    const dbMock = vi.mocked(db.project.update);
    const actual = await updateKey('project-id', ApiKeyType.client);

    expect(authMock).toBeCalledTimes(1);
    expect(dbMock).toBeCalledTimes(0);
    expect(actual).toBe(null);
  });

  it('should update the client key', async () => {
    vi.mocked(currentUser).mockResolvedValue(user as User);
    const dbMock = vi.mocked(db.project.update);
    vi.mocked(generateKey).mockResolvedValue('client-key');
    await updateKey('project-id', ApiKeyType.client);

    expect(dbMock).toBeCalledTimes(1);
    expect(dbMock).toBeCalledWith({
      where: {
        id: 'project-id',
        userId: 'user-id',
      },
      data: {
        clientApiKey: 'client-key',
      },
    });
  });

  it('should update the secret key', async () => {
    vi.mocked(currentUser).mockResolvedValue(user as User);
    const dbMock = vi.mocked(db.project.update);
    vi.mocked(generateKey).mockResolvedValue('secret-key');
    await updateKey('project-id', ApiKeyType.secret);

    expect(dbMock).toBeCalledTimes(1);
    expect(dbMock).toBeCalledWith({
      where: {
        id: 'project-id',
        userId: 'user-id',
      },
      data: {
        secretApiKey: 'secret-key',
      },
    });
  });
});
