import type { Context } from "hono";
import { prisma } from "@apivault/db";
import bcrypt from "bcryptjs";
import { signupSchema, signinSchema } from "@apivault/zod-schemas";
import { sign } from "hono/jwt";

export const signUp = async (c: Context) => {
    
    const body = await c.req.json();
  
    const parsed = signupSchema.safeParse(body);

    if(!parsed.success){
        return c.json({error:parsed.error.flatten()},{status:400});
    }
  
    const isNotUnique = await prisma.user.findFirst({
        where:{
            email:parsed.data.email,
        }
    })
    if(isNotUnique){
        return c.json({error:"User Already Exist"},{status:400});
    }
    
    await prisma.user.create({
        data:{
            email:parsed.data.email,
            name:parsed.data.name,
            password:bcrypt.hashSync(parsed.data.password,10)
        }
    });
    
    return c.json({message:"User created successfully"});
}

export const signIn = async (c: Context) => {
    const body = await c.req.json();

    const parsed = signinSchema.safeParse(body);

    if(!parsed.success){
        return c.json({error:parsed.error.flatten()},{status:400})
    }

    const user = await prisma.user.findFirst({
        where:{
            email:parsed.data.email,
        }
    })

    if(!user){
        return c.json({error:"Email not Registered"},{status:400})
    }

    const isCorrect = await bcrypt.compare(parsed.data.password, user.password);

    if(!isCorrect){
        return c.json({error:"Invalid Credentials"},{status:400});
    }

    const jwtSecret = c.env.JWT_SECRET;
    const token = await sign(
        { id: user.id, email: user.email, exp: Math.floor(Date.now() / 1000) + 86400 },
        jwtSecret
    );

    return c.json({ token });
}