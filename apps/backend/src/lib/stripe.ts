// src/lib/stripe.ts

import Stripe from "stripe";

export const getStripe = (secretKey: string) => {
  return new Stripe(secretKey);
};