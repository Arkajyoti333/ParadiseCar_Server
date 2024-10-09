import express from "express";
import {  checkAuth, LoggedIn, LoggedOut, RegisterAdmin, VerifyAuthentication } from "../controller/adminAuth.controller.js";
import { verifyJwtToken } from "../middleWares/protected.Admin.js";


const adminRouter=express.Router(); //create router object


adminRouter.get("/",(req,res)=>{
    res.json({
        mesage:"Response come from Admin Router"
    })
})

// Authantication Route . 

adminRouter.post("/auth/signUp",RegisterAdmin);
adminRouter.post("/auth/loggedIn",LoggedIn);
adminRouter.post("/auth/logOut",LoggedOut);
adminRouter.post("/auth/verify-email", VerifyAuthentication);


// Protected Route .
adminRouter.get("/auth/check-auth",verifyJwtToken,checkAuth);

//protected Route FoR Retrive data




export default adminRouter;