import { Context } from "hono";
import { stripe } from "../lib/stripe.js";
import { prisma } from "@apivault/db";
import { randomUUID } from "crypto";

export const stripeWebhook = async (c: Context) => {
    
  try {
    const body = await c.req.text();

    const signature = c.req.header("stripe-signature");

    if (!signature) {
      return c.json(
        {
          error: "Missing Stripe Signature",
        },
        400
      );
    }
    

    const event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );

    if (event.type === "checkout.session.completed") {
      const session = event.data.object;

      const transaction =
        await prisma.transaction.findUnique({
          where: {
            stripeSessionId: session.id,
          },
        });

      if (!transaction) {
        return c.json(
          {
            error: "Transaction not found",
          },
          404
        );
      }

      await prisma.$transaction(async (tx) => {
        await tx.transaction.update({
          where: {
            id: transaction.id,
          },
          data: {
            status: "SUCCESS",
          },
        });

        await tx.subscription.create({
          data: {
            userId: transaction.userId,
            apiId: transaction.apiId,

            expiresAt: new Date(
              Date.now() +
                30 * 24 * 60 * 60 * 1000
            ),
          },
        });

        await tx.apiKey.create({
          data: {
            key: randomUUID(),

            userId: transaction.userId,

            apiId: transaction.apiId,

            expiresAt: new Date(
              Date.now() +
                30 * 24 * 60 * 60 * 1000
            ),
          },
        });
      });
    }

    return c.json({
      received: true,
    });
  } catch (error) {


    return c.json(
      {
        error: "Webhook Error",
      },
      400
    );
  }
};