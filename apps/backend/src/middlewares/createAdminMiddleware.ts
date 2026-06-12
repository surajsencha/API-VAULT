import { Context, Next } from "hono";
import { prisma } from "@apivault/db";
export const createAdminMiddleware = async (c: Context,next:Next) => {
  try {
    const user = c.get("user");

    const findUser = await prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        role: "ADMIN",
      },
    });
   await next();
  } catch (error) {
    return c.json({error:"something went wrong!"})
  }
};
