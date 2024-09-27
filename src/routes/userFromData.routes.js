import { Router } from "express";
import { contactDataController } from "../controller/userData.controller.js";


const UserDataRouter=Router();

//test routes of userdatea route
UserDataRouter.get("/",(req,res)=>{
    res.json({
        message:"This message come from User data Router"
    })
})


UserDataRouter.post("/contactFrom",contactDataController)



export default UserDataRouter;