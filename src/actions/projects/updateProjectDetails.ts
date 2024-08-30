'use server';

import { currentUser } from '@clerk/nextjs/server';

import { db } from '@/lib/db';

export const updateProjectDetails = async (
  projectId: string,
  name: string,
  description: string,
) => {
  const authUser = await currentUser();

  if (!authUser) return null;

  await db.project.update({
    where: {
      id: projectId,
      userId: authUser.id,
    },
    data: {
      name,
      description,
    },
  });
};
