import JWT from "jsonwebtoken";
import EnvConfig from "../config/Config.js";

const generateVerificationToken= async (res,id)=>{

    const jwtToken = JWT.sign({ id }, EnvConfig.ENV_JWT_SECRET, { 
        expiresIn: '30d'
      });
      
      const isProduction=EnvConfig.ENV_APP_MOOD==="production";

    res.cookie("AuthToken",jwtToken,{
        maxAge:30*24*60*60*1000,
        httpOnly:true,
        secure:isProduction,
        sameSite:"strict",

    })


 

} 

export default  generateVerificationToken;