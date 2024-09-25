import EnvConfig from "../config/Config";

const Globalerrorhandler=(err,req,res,next)=>{
    const statuCode=err.statuCode||500;
    return res.status(statuCode).json({
        message:err.message,
        errorStack:EnvConfig.ENV_APP_MOOD==="devlopment"? err.stack:err.message,
    })
}

export default Globalerrorhandler;