import createHttpError from "http-errors";
import UserAdmin from "../models/Useradmin.model.js";
import bcrypt from "bcrypt";
import generateVerificationToken from "../utils/generateVerificationToken.js";





const RegisterAdmin= async(req,res,next)=>{
    try {
        
const {userName,mobileNumber,email,password}=req.body;

  if(!userName || !mobileNumber || !email || !password){
    const error=createHttpError(403,"All filed are required !");
    return next(error);
  }
  const isEmailAbaible=await UserAdmin.findOne({email});
  const ismobileNumberAbaible=await UserAdmin.findOne({mobileNumber});
  
  
  if(isEmailAbaible || ismobileNumberAbaible){
    const error=createHttpError(400,"User Already Exicted !");
    return next(error);

  }

const hasedPassword = await bcrypt.hash(password, 10);

const verificationToken= Math.floor(100000 + Math.random() * 900000).toString();

const registerAdmin = new UserAdmin({
  userName,
  mobileNumber,
  email,
  password: hasedPassword,
  verificationToken,
 verificationTokenExpiresAt: Date.now() + 24 * 60 * 60 * 1000, // 24 hours
});

await registerAdmin.save(); //saving user documents in data base


// jwt token generation and saved in cookies 
 await generateVerificationToken(res,registerAdmin._id);


res.status(201).json({
    message:"user Successfully created !",
    ...registerAdmin._doc,
    password:undefined,
})

} catch (error) {
    
    console.log("Error occured regiter admin :",error);

    return next(error);
    
}



}





export {RegisterAdmin};