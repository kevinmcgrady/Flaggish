'use server';

import { currentUser } from '@clerk/nextjs/server';

import { db } from '@/lib/db';
import { generateKey } from '@/lib/generateApiKey';
import { ApiKeyType } from '@/types/ApiKeyType';

export const createProject = async (name: string, description: string) => {
  const authUser = await currentUser();

  if (!authUser) return null;

  const clientApiKey = await generateKey(ApiKeyType.client);
  const secretApiKey = await generateKey(ApiKeyType.secret);

  const project = await db.project.create({
    data: {
      userId: authUser.id,
      clientApiKey,
      secretApiKey,
      name,
      description,
    },
  });

  return project;
};
