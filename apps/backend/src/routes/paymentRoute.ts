import { Hono } from "hono";
import { stripeWebhook } from "../controllers/paymentController.js";

const paymentRoute = new Hono();

paymentRoute.post("/webhook", stripeWebhook);

export default paymentRoute;