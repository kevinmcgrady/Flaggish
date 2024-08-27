'use server';

import { currentUser } from '@clerk/nextjs/server';

import { db } from '@/lib/db';

export const getFlags = async (projectId: string) => {
  const authUser = await currentUser();

  if (!authUser) return [];

  const flags = await db.flag.findMany({
    where: {
      projectId,
    },
  });

  return flags;
};
