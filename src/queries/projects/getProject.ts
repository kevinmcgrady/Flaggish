'use server';

import { currentUser } from '@clerk/nextjs/server';

import { db } from '@/lib/db';

export const getProject = async () => {
  const authUser = await currentUser();

  if (!authUser) return null;

  const projects = await db.project.findFirst({
    where: {
      userId: authUser.id,
    },
  });

  return projects;
};
