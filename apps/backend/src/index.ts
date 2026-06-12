import { Hono } from "hono";
import { serve } from "@hono/node-server";
import { prisma } from "@apivault/db";
import authRoute from "./routes/authRoute.js";
import adminRoute from "./routes/adminRoute.js";
import userRoute from "./routes/userRoute.js"
import paymentRoute from "./routes/paymentRoute.js";
import { cors } from "hono/cors";
const app = new Hono();
app.use("*", cors());
app.get("/", (c) => {return c.json("hello !")});
app.route("/api/v1/auth",authRoute);
app.route("/api/v1/admin",adminRoute);
app.route("/api/v1/user",userRoute);
app.route("/api/v1/payment",paymentRoute);


export default app;
