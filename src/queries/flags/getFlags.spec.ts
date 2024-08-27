import { currentUser, User } from '@clerk/nextjs/server';
import { Flag } from '@prisma/client';
import { describe, expect, it, vi } from 'vitest';

import { db } from '@/lib/db';
import { getFlags } from '@/queries/flags/getFlags';

vi.mock('@clerk/nextjs/server');
vi.mock('@/lib/db', () => {
  return {
    db: {
      flag: {
        findMany: vi.fn(),
      },
    },
  };
});

const user = { emailAddresses: [{ emailAddress: 'email' }] };
const flags: Flag[] = [
  {
    id: 'id',
    name: 'name',
    description: 'description',
    enviroment: 'DEVELOPMENT',
    isToggled: true,
    projectId: 'project-id',
    slug: 'slug',
  },
];

describe('getFlags', () => {
  it('should return null if the user is logged out', async () => {
    const authMock = vi.mocked(currentUser).mockResolvedValue(null);
    const dbMock = vi.mocked(db.flag.findMany);
    const expected = await getFlags('project-id');

    expect(authMock).toBeCalledTimes(1);
    expect(dbMock).toBeCalledTimes(0);
    expect(expected).toBe(null);
  });

  it('should return the flags', async () => {
    vi.mocked(currentUser).mockResolvedValue(user as User);
    const dbMock = vi.mocked(db.flag.findMany).mockResolvedValue(flags);
    const expected = await getFlags('project-id');

    expect(dbMock).toBeCalledTimes(1);
    expect(expected).toBe(flags);
  });
});
