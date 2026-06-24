import type { Context, Next } from "hono";
import { verify } from "hono/jwt";
import { prisma } from "@apivault/db";
import type { JwtPayload } from "@apivault/types";


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
        const jwtSecret = c.env.JWT_SECRET;
        const decoded = await verify(jwtToken, jwtSecret) as unknown as JwtPayload;
      

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
    return c.json({error : "Invalid or Expired Token"},{status:400});
    }

}