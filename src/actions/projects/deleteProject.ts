'use server';

import { currentUser } from '@clerk/nextjs/server';

import { db } from '@/lib/db';

export const deleteProject = async (projectId: string) => {
  const authUser = await currentUser();

  if (!authUser) return null;

  await db.project.delete({
    where: {
      id: projectId,
      userId: authUser.id,
    },
  });
};
