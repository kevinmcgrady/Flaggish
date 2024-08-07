'use server';

import { currentUser } from '@clerk/nextjs/server';
import { Enviroment } from '@prisma/client';
import slugify from 'slugify';

import { db } from '@/lib/db';

export const createFlag = async (
  name: string,
  description: string,
  env: Enviroment,
  projectId: string,
) => {
  const authUser = await currentUser();

  if (!authUser) return null;

  const project = await db.project.findFirst({ where: { id: projectId } });

  if (!project) return null;

  await db.flag.create({
    data: {
      name,
      description,
      projectId,
      enviroment: env,
      isToggled: true,
      slug: slugify(name, { lower: true }),
    },
  });
};
