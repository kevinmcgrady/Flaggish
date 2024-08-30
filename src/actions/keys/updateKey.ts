'use server';

import { currentUser } from '@clerk/nextjs/server';

import { db } from '@/lib/db';
import { ApiKeyType } from '@/types/ApiKeyType';
import { generateKey } from '@/utils/generateApiKey';

export const updateKey = async (projectId: string, keyType: ApiKeyType) => {
  const authUser = await currentUser();

  if (!authUser) return null;

  const key = await generateKey(keyType);

  const data =
    keyType === ApiKeyType.client
      ? { clientApiKey: key }
      : { secretApiKey: key };

  await db.project.update({
    where: {
      id: projectId,
      userId: authUser.id,
    },
    data: {
      ...data,
    },
  });
};
