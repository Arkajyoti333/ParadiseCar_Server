import createHttpError from "http-errors";
import JWT from "jsonwebtoken";
import EnvConfig from "../config/Config.js";


const verifyJwtToken= async (req,res,next)=>{
  
    const authCookieToken=req.cookies.AuthToken;

    console.log("authCookieToken: ");
    console.log(authCookieToken);
    

    try {
        

        if(!authCookieToken){
            const error=createHttpError(401,"Unautharized: Authantication token not found !");
            return next(error);
        }
         
        const decode=JWT.verify(authCookieToken,EnvConfig.ENV_JWT_SECRET);

        if(!decode){
            const error=createHttpError(401,"Jwt return false value !");
           return next(error);
        }
      
        // console.log("User id is ",decode.userId);
        
        req.user = { userID: decode.userId };  


        // req.query.userID=decode.userId;

//      passing the next function 

        next();
        
    } catch (error) {
        console.log("Error Occures  Checking AuthariZation token  !",error);
        return next(error);
    }
    

}


export {verifyJwtToken};