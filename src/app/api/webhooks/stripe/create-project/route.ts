import { headers } from 'next/headers';
import type Stripe from 'stripe';

import { db } from '@/lib/db';
import { generateKey } from '@/lib/generateApiKey';
import { stripe } from '@/lib/stripe';
import { ApiKeyType } from '@/types/ApiKeyType';

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

  if (
    !session?.metadata?.userId ||
    !session?.metadata?.projectName ||
    !session?.metadata?.projectDescription
  ) {
    return new Response(null, {
      status: 200,
    });
  }

  if (event.type === 'checkout.session.completed') {
    const clientApiKey = await generateKey(ApiKeyType.client);
    const secretApiKey = await generateKey(ApiKeyType.secret);

    await db.project.create({
      data: {
        name: session.metadata.projectName,
        description: session.metadata.projectDescription,
        userId: session.metadata.userId,
        clientApiKey,
        secretApiKey,
      },
    });
  }

  return new Response(null, { status: 200 });
}
