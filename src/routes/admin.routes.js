import express from "express";
import {  checkAuth, LoggedIn, LoggedOut, RegisterAdmin, VerifyAuthentication } from "../controller/adminAuth.controller.js";
import { verifyJwtToken } from "../middleWares/protected.Admin.js";
import { BookData } from "../controller/adminData.controller.js";


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
adminRouter.get("/auth/data/booking",verifyJwtToken,BookData);



export default adminRouter;