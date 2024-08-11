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
    include: {
      flags: true,
    },
  });

  const productionFlagsCount = projects?.flags.filter(
    (flag) => flag.enviroment === 'PRODUCTION',
  ).length;
  const developmentFlagsCount = projects?.flags.filter(
    (flag) => flag.enviroment === 'DEVELOPMENT',
  ).length;

  return {
    ...projects,
    productionFlags: productionFlagsCount,
    developmentFlags: developmentFlagsCount,
  };
};
