import type { Context, Next } from "hono";

export const adminMiddleware = async (
  c: Context,
  next: Next
) => {
  const user = c.get("user");
  
  if (user.role !== "ADMIN") {
    return c.json(
      { error: "Admin access required" },
      403
    );
  }
 
  await next();
};