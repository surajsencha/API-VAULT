import { Hono } from "hono";

import { adminMiddleware } from "../middlewares/adminMiddleware.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

import {createUrl,getMyUrls, getApiCalls} from "../controllers/adminController.js"
import { createAdminMiddleware } from "../middlewares/createAdminMiddleware.js";

const adminRoute = new Hono();


adminRoute.post("/Url/createUrl",authMiddleware,createAdminMiddleware,adminMiddleware,createUrl);
adminRoute.get("/Url/getMyUrls",authMiddleware,adminMiddleware,getMyUrls);
adminRoute.get("/Url/getApiCalls",authMiddleware,adminMiddleware,getApiCalls)

export default adminRoute;