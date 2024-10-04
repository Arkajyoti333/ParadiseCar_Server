import { Router } from "express";
import { contactDataController,BookDataController } from "../controller/userData.controller.js";


const UserDataRouter=Router();

//test routes of userdatea route
UserDataRouter.get("/",(req,res)=>{
    res.json({
        message:"This message come from User data Router"
    })
})


UserDataRouter.post("/contactFrom",contactDataController);
UserDataRouter.post("/bookData",BookDataController);



export default UserDataRouter;