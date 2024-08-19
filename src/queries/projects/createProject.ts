'use server';

import { currentUser } from '@clerk/nextjs/server';

import { db } from '@/lib/db';
import { generateKey } from '@/lib/generateApiKey';
import { ApiKeyType } from '@/types/ApiKeyType';

type CreateProjectRequest = {
  name: string;
  description: string;
  isActive: boolean;
};

export const createProject = async ({
  name,
  description,
  isActive,
}: CreateProjectRequest) => {
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
      isActive,
    },
  });

  return project;
};
