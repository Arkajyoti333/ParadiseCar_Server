import express from "express";
import {  LoggedIn, LoggedOut, RegisterAdmin, VerifyAuthentication } from "../controller/admin.controller.js";


const adminRouter=express.Router(); //create router object


adminRouter.get("/",(req,res)=>{
    res.json({
        mesage:"response come from Admin Router"
    })
})

adminRouter.post("/signUp",RegisterAdmin);
adminRouter.post("/loggedIn",LoggedIn);
adminRouter.post("/logOut",LoggedOut);
adminRouter.post("/verify-email/:email", VerifyAuthentication);






export default adminRouter;