'use server';

import { currentUser } from '@clerk/nextjs/server';
import { Enviroment } from '@prisma/client';

import { db } from '@/lib/db';

export const getFlags = async (projectId: string, enviroment: Enviroment) => {
  const authUser = await currentUser();

  if (!authUser) return [];

  const flags = await db.flag.findMany({
    where: {
      projectId,
      enviroment: enviroment,
    },
  });

  return flags;
};
