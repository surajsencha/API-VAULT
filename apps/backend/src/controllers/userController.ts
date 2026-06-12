import { Context } from "hono";
import { prisma } from "@apivault/db";
import { stripe } from "../lib/stripe.js";
import CryptoJS from "crypto-js";
import axios from "axios";

export const getUserDetail = async (c: Context) => {
const user = c.get("user");
  
  return c.json(user);
};


export const getAllUrls = async (c: Context) => {
  const Urls = await prisma.api.findMany();
  return c.json(Urls);
};

export const getUrlsByName = async (c: Context) => {
  const name = c.req.query("name");

  const urls = await prisma.api.findMany({
    where: {
      name: {
        contains: name,
        mode: "insensitive",
      },
      
    },
  });
  if (urls.length === 0) {
    return c.json({ error: "No Api Matched" });
  }
  return c.json(urls);
};

export const BuyApiAccess = async (c: Context) => {
  const user = c.get("user");
  const apiId = c.req.query("apiId");

  const api = await prisma.api.findFirst({
    where: {
      id: apiId,
    },
  });

  if (!api) {
    return c.json({ error: "Given API is not Published" }, { status: 400 });
  }
  if (api.ownerId === user.id) {
    return c.json(
      { error: "You cannot buy access to your own API!" },
      { status: 400 },
    );
  }
  const existingSubscription = await prisma.subscription.findFirst({
    where: {
      userId: user.id,
      apiId: api.id,
      status: "ACTIVE",
    },
  });

  if (existingSubscription) {
    return c.json(
      {
        error: "You already own this API",
         existingSubscription,
      },
      400,
    );
  }
  const session = await stripe.checkout.sessions.create({
    mode: "payment",

    payment_method_types: ["card"],
    metadata: {
      userId: user.id,
      apiId: api.id,
      receiverId: api.ownerId,
    },

    line_items: [
      {
        price_data: {
          currency: "inr",

          product_data: {
            name: api.name,
          },

          unit_amount: Math.round(api.price * 100),
        },

        quantity: 1,
      },
    ],

    success_url: `http://localhost:5173/success`,

    cancel_url: "http://localhost:5173/marketplace",
  });
  await prisma.transaction.create({
    data: {
      userId: user.id,

      apiId: api.id,

      receiverId: api.ownerId,

      amount: api.price,

      stripeSessionId: session.id,

      status: "PENDING",
    },
  });

  return c.json({
    checkoutUrl: session.url,
  });
};

export const getPurchasedApiKey = async (c: Context) => {
  const user = c.get("user");
  const ApiId = c.req.query("apiId");
  const Api = await prisma.api.findFirst({
    where: {
      id: ApiId,
    },
  });

  const isSubscribed = await prisma.subscription.findFirst({
    where: {
      userId: user.id,
      apiId: ApiId,
    },
  });

  if (!isSubscribed) {
    return c.json(
      { error: "You are not subscribed to current published Api!" },
      { status: 404 },
    );
  }
  if (isSubscribed.status === "CANCELLED") {
    return c.json(
      { error: "Api Subscription is Already Cancelled" },
      { status: 400 },
    );
  }
  if (isSubscribed.status === "EXPIRED") {
    return c.json(
      { error: "Your Subscription is Expired. Get a New Subscription" },
      { status: 400 },
    );
  }
  const myApiKey = await prisma.apiKey.findFirst({
    where: {
      userId: user.id,
      apiId: ApiId,
    },
  });

  const apiKeyString = Api?.providedUrl + `${myApiKey?.key}`;

  return c.json({ ApiKey: apiKeyString });
};

export const fetchData = async (c: Context) => {
  try {
    const user = c.get("user");

    const url = c.req.header("apikey");
    let route = c.req.header("route");
     
    route  ="/";
    if (!url) {
      return c.json({ error: "API Key header missing" }, 400);
    }

    if (!route) {
      return c.json({ error: "Route header missing" }, 400);
    }

    if (!user) {
      return c.json({ error: "Unauthorized" }, 401);
    }

    const array = url.split("/");

    const key = array[array.length - 1];

    if (!key) {
      return c.json({ error: "Invalid API Key Format" }, 400);
    }

    const apikey = await prisma.apiKey.findFirst({
      where: {
        key,
      },
    });

    if (!apikey) {
      return c.json({ error: "Invalid API Key" }, 400);
    }

    if (apikey.expiresAt < new Date()) {
      return c.json({ error: "API Key Expired" }, 400);
    }

    if (apikey.userId !== user.id) {
      return c.json({ error: "Unauthorized Access" }, 401);
    }

    const api = await prisma.api.findFirst({
      where: {
        id: apikey.apiId,
      },
    });

    if (!api) {
      return c.json({ error: "Associated API not found" }, 400);
    }
    let fetchdata;
    try{
        fetchdata = await axios.get(`${api.baseUrl}${route}`);
    }catch(error){
  
      return c.json({ error: "Error Fetching Data from the API" }, 400);
    }



    await prisma.usageLog.create({
      data: {
        apiId: api.id,
        endpoint: route,
        apiKeyId: apikey.id,
        statusCode: fetchdata.status,
      },
    });

    return c.json({
      data: fetchdata.data,
    });
  } catch (error) {
   
    return c.json(
      {
        error: "Internal Server Error",
      },
      500,
    );
  }
};
