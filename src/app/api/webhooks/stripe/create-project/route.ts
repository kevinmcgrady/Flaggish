import { headers } from 'next/headers';
import type Stripe from 'stripe';

import { db } from '@/lib/db';
import { stripe } from '@/lib/stripe';

export async function POST(request: Request) {
  const body = await request.text();
  const signature = headers().get('Stripe-Signature') ?? '';

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET || '',
    );
  } catch (err) {
    return new Response(
      `Webhook Error: ${err instanceof Error ? err.message : 'Unknown Error'}`,
      { status: 400 },
    );
  }

  const session = event.data.object as Stripe.Checkout.Session;

  if (!session?.metadata?.userId || !session?.metadata?.projectId) {
    return new Response(null, {
      status: 200,
    });
  }

  if (event.type === 'checkout.session.completed') {
    await db.project.update({
      where: {
        id: session.metadata.projectId,
        userId: session.metadata.userId,
      },
      data: {
        isActive: true,
      },
    });
  }

  return new Response(null, { status: 200 });
}
