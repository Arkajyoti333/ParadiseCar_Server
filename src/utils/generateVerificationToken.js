import JWT from "jsonwebtoken";
import EnvConfig from "../config/Config.js";

const generateVerificationToken= async (res,userId)=>{

    const jwtToken = JWT.sign({ userId }, EnvConfig.ENV_JWT_SECRET, { // sign jwt token
        expiresIn: '30d'
      });
      
      const isProduction=EnvConfig.ENV_APP_MOOD==="production";

    await res.cookie("AuthToken",jwtToken,{  // save cookie in 
        maxAge:30*24*60*60*1000,
        httpOnly:true,
        secure:isProduction,
        sameSite:"strict",

    })

} 

export default  generateVerificationToken;