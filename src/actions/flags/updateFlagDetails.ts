'use server';

import { currentUser } from '@clerk/nextjs/server';

import { db } from '@/lib/db';

export const updateFlagDetails = async (
  projectId: string,
  flagId: string,
  name: string,
  description: string,
) => {
  const authUser = await currentUser();

  if (!authUser) return null;

  await db.flag.update({
    where: {
      id: flagId,
      projectId: projectId,
    },
    data: {
      name,
      description,
    },
  });
};
