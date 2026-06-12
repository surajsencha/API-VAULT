import type { Context, Next } from "hono";
import jwt from "jsonwebtoken";
import { prisma } from "@apivault/db";
import { JwtPayload } from "@apivault/types";
import { x64 } from "crypto-js";


export const authMiddleware = async (c: Context, next: Next) => {

    const token = c.req.header("Authorization");
  
    if(!token){
    return c.json({error:"Unauthorized"},{status:401});
    }

    if(!token.startsWith("Bearer ")){
    return c.json({error:"Invalid Token Format"},{status:401});
    }

    const jwtToken = token.split(" ")[1];

    try {

        const decoded = jwt.verify(jwtToken,process.env.JWT_SECRET!) as JwtPayload;
      

        if(!decoded){
        return c.json({error:"Invalid or Expired Token"},{status:400});
        }
        
       const getUser = await prisma.user.findFirst({
            where:{
                email:decoded.email
            }
        })
     

        c.set("user",getUser);
       
        await next();

    } 
    catch (e) {
    return c.json({error : e},{status:400});
    }

}