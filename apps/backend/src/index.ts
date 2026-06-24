import { Hono } from "hono";
import authRoute from "./routes/authRoute.js";
import adminRoute from "./routes/adminRoute.js";
import userRoute from "./routes/userRoute.js"
import paymentRoute from "./routes/paymentRoute.js";
import { cors } from "hono/cors";

type Bindings = {
  DATABASE_URL: string;
  JWT_SECRET: string;
  STRIPE_SECRET_KEY: string;
  STRIPE_WEBHOOK_SECRET: string;
  API_INITIAL: string;
};

const app = new Hono<{
  Bindings: Bindings;
}>();

app.use("*", cors({
  origin: "https://api-vault.pages.dev",
  allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowHeaders: ["Content-Type", "Authorization", "apikey", "route", "stripe-signature"],
  credentials: true,
}));

app.get("/", (c) => {return c.json("hello !")});
app.route("/api/v1/auth",authRoute);
app.route("/api/v1/admin",adminRoute);
app.route("/api/v1/user",userRoute);
app.route("/api/v1/payment",paymentRoute);


export default app;
