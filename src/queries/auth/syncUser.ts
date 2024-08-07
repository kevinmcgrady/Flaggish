'use server';

import { currentUser } from '@clerk/nextjs/server';

import { db } from '@/lib/db';

export const syncUser = async () => {
  const authUser = await currentUser();

  if (!authUser) return;

  const doesUserExist = await db.user.findUnique({
    where: {
      emailAddress: authUser.emailAddresses[0].emailAddress,
    },
  });

  if (!doesUserExist) {
    await db.user.create({
      data: {
        id: authUser.id,
        imageUrl: authUser.imageUrl,
        emailAddress: authUser.emailAddresses[0].emailAddress,
        firstName: authUser.firstName!,
        lastName: authUser.lastName!,
      },
    });
  }
};
