import JWT from "jsonwebtoken";
import EnvConfig from "../config/Config.js";

const generateVerificationToken= async (res,userId)=>{

    const jwtToken = JWT.sign({ userId }, EnvConfig.ENV_JWT_SECRET, { // sign jwt token
        expiresIn: '30d'
      });
      
      const isProduction = EnvConfig.ENV_APP_MOOD === "production";
      console.log(isProduction);
      

      await res.cookie("AuthToken", jwtToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
        httpOnly: true,
        // secure: isProduction, 
        // sameSite: isProduction ? 'None' : 'Lax', 
        // domain: isProduction ? 'paradisecar-server-deploy.onrender.com' : 'localhost', // Set domain
        path: '/',  // Ensure the cookie is available for all routes
      });
      

} 

export default  generateVerificationToken;