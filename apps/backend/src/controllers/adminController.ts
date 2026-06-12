import type { Context } from "hono";
import { CreateApiInput, createApiSchema } from "@apivault/zod-schemas";
import { z } from "zod";
import { prisma } from "@apivault/db";


export const createUrl = async (c: Context) => {
  const body = await c.req.json();
  const user = c.get("user");
  const parsed = createApiSchema.safeParse(body);

  if (!parsed.success) {
  
    return c.json({ error: parsed.error.flatten() });
  }
  const existingApi = await prisma.api.findFirst({
    where: {
      OR: [{ name: parsed.data.name }, { baseUrl: parsed.data.endpoint }],
    },
  });
  
  if (existingApi) {
    return c.json(
      { error: "API name or endpoint already exists" },
      { status: 409 },
    );
  }
  const slug = parsed.data.name.trim().toLowerCase().replace(/\s+/g, "-");
  const takenSlug = await prisma.api.findFirst({
    where:{
      name:slug,
    }
  })

  if(takenSlug){
    return c.json({error:"Provided API name is already taken!"});
  }

  const apiUrl = `${process.env.API_INITIAL}/${slug}/`;

  await prisma.api.create({
    data: {
      name: slug,
      description: parsed.data.description,
      baseUrl: parsed.data.endpoint,
      price: parsed.data.price,
      ownerId: user.id,
      providedUrl: apiUrl,
    },
  });
 
  return c.json({ message: "Url generated successfully!", apiUrl });
};

export const getMyUrls = async (c: Context) => {
  const user = c.get("user");
  const getUserUrls = await prisma.api.findMany({
    where: {
      ownerId: user.id,
    },
  });
  if (getUserUrls.length === 0) {
    return c.json(
      { message: "No Api is published by the User " + user.name },
      { status: 404 },
    );
  }
  
  return c.json(getUserUrls);
};

export const getApiCalls = async (c: Context) => {
  const user = c.get("user");
  const apiId = c.req.query("apiId");
  const api = await prisma.api.findFirst({
    where: {
      id: apiId,
      ownerId: user.id,
    },
  });
  if (!api) {
    return c.json({ error: "API not found" }, { status: 404 });
  }
  const apiCalls = await prisma.usageLog.findMany({
    where: {
      apiId: apiId,
      statusCode: 200,
    },
  });
 
  return c.json({ apiCalls });
};
  