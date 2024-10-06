import express from "express";
import {  RegisterAdmin } from "../controller/admin.controller.js";


const adminRouter=express.Router(); //create router object


adminRouter.get("/",(req,res)=>{
    res.json({
        mesage:"response come from Admin Router"
    })
})

adminRouter.post("/signUp",RegisterAdmin)




export default adminRouter;