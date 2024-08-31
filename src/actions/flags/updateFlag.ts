'use server';

import { currentUser } from '@clerk/nextjs/server';

import { db } from '@/lib/db';

export const updateFlag = async (
  projectId: string,
  flagId: string,
  isToggled: boolean,
) => {
  const authUser = await currentUser();

  if (!authUser) return null;

  await db.flag.update({
    where: {
      id: flagId,
      projectId: projectId,
    },
    data: {
      isToggled: isToggled,
    },
  });
};