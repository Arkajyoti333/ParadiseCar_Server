import { Router } from "express";


const UserDataRouter=Router();


UserDataRouter.get("/",(req,res)=>{
    res.json({
        message:"This message come from User data Router"
    })
})




export default UserDataRouter;