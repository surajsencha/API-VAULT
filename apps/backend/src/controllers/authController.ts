import type { Context } from "hono";
import { prisma } from "@apivault/db";
import bcrypt from "bcryptjs";
import {signupSchema,signinSchema,SignupInput,SigninInput} from "@apivault/zod-schemas/dist/index.js";
import jwt from "jsonwebtoken"

export const signUp=async(c:Context)=>{
    
    const body=await c.req.json();
  
    const parsed=signupSchema.safeParse(body);

    if(!parsed.success){
        return c.json({error:parsed.error.flatten()},{status:400});
    }
  
    const isNotUnique= await prisma.user.findFirst({
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
export const signIn=async(c:Context)=>{
    const body=await c.req.json();

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

  const isCorrect = await bcrypt.compare(parsed.data.password,user.password);

    const token = jwt.sign({id:user.id,email:user.email},process.env.JWT_SECRET!,{expiresIn:"1d"});

    if(isCorrect){
        return c.json({
            token
        })
    }
    return c.json({error:"Invalid Credentials"},{status:400});
}