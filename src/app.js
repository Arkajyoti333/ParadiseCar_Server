import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { data_limits } from "./constant.js";






// configure express app
const app=express();

 

 //Custom Middlewares ....

 app.use((req,res,next)=>{
    console.log(`Request come from : " ${req.method} " - Method`); //this is simple middlewares 
    next();
 })



// register require middlwware

app.use(express.json({
    limit:data_limits,
}))

app.use(cors({
    origin:"*",
    credentials:true,
}))
app.use(express.urlencoded({
    limit:data_limits,
    credentials:true,
}));
app.use(cookieParser()) //cookiemiddleware
app.use(express.static("public"));




 // register Routes

app.get("/",(req,res)=>{
    res.json({
        message:"Wellcome to Home !"
    })
})



export default app;