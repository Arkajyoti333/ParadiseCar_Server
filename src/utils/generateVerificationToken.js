import JWT from "jsonwebtoken";
import EnvConfig from "../config/Config.js";

const generateVerificationToken= async (res,userId)=>{

    const jwtToken = JWT.sign({ userId }, EnvConfig.ENV_JWT_SECRET, { // sign jwt token
        expiresIn: '30d'
      });
      
      const isProduction = EnvConfig.ENV_APP_MOOD === "production";
      console.log(isProduction);
      

// ("AuthToken", jwtToken, { maxAge:25 * 24 * 60 * 60 * 1000, httpsOnly: true, sameSite: 'strict' }).

      await res.cookie("AuthToken", jwtToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000, 
        httpsOnly: true,                  
        secure: isProduction,  
        sameSite:'strict',           
        // sameSite: isProduction ? 'None' : 'Lax', // Cross-origin in production, restricted in development
        // domain: isProduction ? 'paradisecar-server-deploy.onrender.com' : 'localhost', 
        // path: '/',                        // Cookie is valid across the entire site
     });
     

} 

export default  generateVerificationToken;