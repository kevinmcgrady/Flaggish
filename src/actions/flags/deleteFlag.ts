'use server';

import { currentUser } from '@clerk/nextjs/server';

import { db } from '@/lib/db';

export const deleteFlag = async (projectId: string, flagId: string) => {
  const authUser = await currentUser();

  if (!authUser) return null;

  await db.flag.delete({
    where: {
      projectId: projectId,
      id: flagId,
    },
  });
};
