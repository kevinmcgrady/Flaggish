'use server';

import { currentUser } from '@clerk/nextjs/server';

import { db } from '@/lib/db';

export const getAllProjects = async () => {
  const authUser = await currentUser();

  if (!authUser) return null;

  const projects = await db.project.findMany({
    where: {
      userId: authUser.id,
    },
  });

  return projects;
};
