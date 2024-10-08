import EnvConfig from "../config/Config.js";

const Globalerrorhandler=(err,req,res,next)=>{
    const statuCode=err.statusCode||500;
    return res.status(statuCode).json({
        succes:false,
        status:statuCode,
        message:err.message,
        errorStack:EnvConfig.ENV_APP_MOOD==="devlopment"? err.stack:" ",
    })
}

export default Globalerrorhandler;