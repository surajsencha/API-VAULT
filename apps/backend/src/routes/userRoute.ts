import {Hono} from "hono";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import {getUserDetail,getAllUrls,getUrlsByName,BuyApiAccess,getPurchasedApiKey,fetchData} from "../controllers/userController.js"

const userRoute= new Hono();
userRoute.get("/getUserDetail",authMiddleware,getUserDetail)
userRoute.get("/Url/getAllUrls",authMiddleware,getAllUrls);
userRoute.get("/Url/getUrlByName",authMiddleware,getUrlsByName);
userRoute.post("/Api/buyApiAccess",authMiddleware,BuyApiAccess);
userRoute.get("/Api/getPurchasedApiKey",authMiddleware,getPurchasedApiKey)
userRoute.get("/fetchData",authMiddleware,fetchData);



export default userRoute;