'use server';

import { currentUser } from '@clerk/nextjs/server';

import { stripe } from '@/lib/stripe';

type createStripeSessionRequest = {
  projectName: string;
  projectDescription: string;
};

export const createStripeSession = async ({
  projectDescription,
  projectName,
}: createStripeSessionRequest) => {
  const authUser = await currentUser();

  if (!authUser) return null;

  try {
    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          price: 'price_1PpTCnIa9gtTq6zr9WMkpYzs',
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: 'http://localhost:3000/projects?success=true',
      cancel_url: 'http://localhost:3000/projects?canceled=true',
      metadata: {
        projectName,
        projectDescription,
        userId: authUser.id,
      },
    });

    return session.url;
  } catch (error) {
    throw new Error('There was a problem creating your session');
  }
};
