import { Hono } from "hono";
import {signUp,signIn } from "../controllers/authController.js";


const authRoute=new Hono();

authRoute.post( "/signup" , signUp );
authRoute.post( "/signin" , signIn );


export default authRoute;