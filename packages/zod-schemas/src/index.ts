import { z } from "zod";

export const signupSchema = z.object({
  email: z.string().email(),
  name: z.string().min(2),
  password: z.string().min(6),
});

export const signinSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export const createApiSchema = z.object({
  name: z.string().min(3),
  description: z.string().min(10),
  endpoint: z.string().url(),
  price :z.number(),

});
export type SignupInput = z.infer<typeof signupSchema>;

export type SigninInput = z.infer<typeof signinSchema>;

export type CreateApiInput = z.infer<typeof createApiSchema>;
