import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { data_limits } from "./constant.js";
import Globalerrorhandler from "./utils/GlobalErrorhandler.js";
import UserDataRouter from "./routes/userFromData.routes.js";
import adminRouter from "./routes/admin.routes.js";
import EnvConfig from "./config/Config.js";






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

// origin:EnvConfig.ENV_CORS_ORIGIN,
app.use(cors({
    origin: 'https://paradisecar-admin.netlify.app',  
    credentials: true,                
  }));
app.use(express.urlencoded({ // For parsing application/x-www-form-urlencoded
    limit:data_limits,
    extended: true
}));
app.use(cookieParser()) //cookiemiddleware
app.use(express.static("public"));


 // register home Routes

 
app.get("/",(req,res)=>{
    res.json({
        message:"Wellcome to Home !"
    })
})

// register custom middlewares 

app.use("/api/v1/userAdmin",adminRouter);

app.use("/api/v1/userData",UserDataRouter);


//global error handler middlewaes
app.use(Globalerrorhandler);


export default app;