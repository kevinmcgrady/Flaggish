'use server';

import { currentUser } from '@clerk/nextjs/server';
import slugify from 'slugify';

import { db } from '@/lib/db';
import { ApiKeyType } from '@/types/ApiKeyType';
import { generateKey } from '@/utils/generateApiKey';

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
      slug: slugify(name, { trim: true, lower: true }),
    },
  });

  return project;
};
