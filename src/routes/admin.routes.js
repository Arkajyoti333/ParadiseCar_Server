import express from "express";


const adminRouter=express.Router(); //create router object


adminRouter.post("/",(req,res)=>{
    res.json({
        mesage:"response come Admin Router"
    })
})


export default adminRouter;