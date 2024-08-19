'use server';

import { currentUser } from '@clerk/nextjs/server';

import { stripe } from '@/lib/stripe';
import { absoluteUrl } from '@/utils/absoluteUrl';

type createStripeSessionRequest = {
  projectId: string;
};

export const createStripeSession = async ({
  projectId,
}: createStripeSessionRequest) => {
  const authUser = await currentUser();

  if (!authUser) return null;

  const url = absoluteUrl('/projects');

  try {
    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          price: 'price_1PpTCnIa9gtTq6zr9WMkpYzs',
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: url,
      cancel_url: url,
      metadata: {
        projectId,
        userId: authUser.id,
      },
    });

    return session.url;
  } catch (error) {
    throw new Error('There was a problem creating your session');
  }
};
