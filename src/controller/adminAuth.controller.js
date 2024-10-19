import createHttpError from "http-errors";
import bcrypt from "bcrypt";

import UserAdmin from "../models/Useradmin.model.js";
import generateVerificationToken from "../utils/generateVerificationToken.js";
import { sendVerificationMail } from "../MailServices/Email.services.js";
import EnvConfig from "../config/Config.js";





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

const registerAdmin = new UserAdmin({ // create new UserAdmin Instance
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

const mailRes=await sendVerificationMail(registerAdmin.email,verificationToken,next); //sending verifaction mail

res.status(201).json({
    message:"user Successfully created !",
    ...registerAdmin._doc,
    password:undefined,
   mailresponse: mailRes.success?mailRes:{success:false},
})

} catch (error) {
    
    console.log("Error occured regiter admin :",error);

    return next(error);
    
}



}


const VerifyAuthentication = async (req, res, next) => {
  const { code } = req.body; // Get the code from request body

  try {
   
    const UserFind = await UserAdmin.findOne({
      verificationToken: code,
      verificationTokenExpiresAt: { $gt: Date.now() }, // Token expiration validation
    });

    
    if (!UserFind) {
      const error = createHttpError(401, "Invalid or Expired Verification Code!");
      return next(error);
    }

    
    UserFind.isVerified = true;
    UserFind.verificationToken = undefined; // Clear verification token
    UserFind.verificationTokenExpiresAt = undefined; // Clear expiration time

    
    await UserFind.save();

    
    res.status(200).json({
      message: "User successfully verified their account!",
      user: {
        ...UserFind._doc,
        password: undefined, 
      },
    });
  } catch (error) {
    console.log("Error occurred during email verification:", error);
    return next(error);
  }
};

const LoggedIn=async(req,res,next)=>{
   
  const {email,mobileNumber,password}=req.body;

  console.log("Email :",email);
  console.log("mobileNumber :",mobileNumber);
  console.log("password :",password);
  

  try {

    if(!email || !mobileNumber || !password){
      const error= createHttpError(401,"Unauthorized ! all field are required !");
      return next(error);
    }

    const LoggedUser= await UserAdmin.findOne({
      email,
      mobileNumber,
    });

    if(!LoggedUser){
      const error=createHttpError(401,"Invalid creadential ,User not found !");
      return next(error);
    }

    const isMatched= await bcrypt.compare(password,LoggedUser.password); //always used await in bcrypt 
 
  //  console.log("password matched :", isMatched);
  
    if(!isMatched){
      const error =createHttpError(401,"Invalid creadntial , password not matched !");
      return next(error);
    }
    const verificationToken= Math.floor(100000 + Math.random() * 900000).toString();
    
    LoggedUser.verificationToken=verificationToken;
    LoggedUser.verificationTokenExpiresAt= Date.now() + 24 * 60 * 60 * 1000, //24 hours
    // LoggedUser.isVerified=false;
    LoggedUser.lastLogin=Date.now();
    
    // generateVerificationToken(res,LoggedUser._id);
     if(isMatched){
      await generateVerificationToken(res,LoggedUser._id);
     }

    await LoggedUser.save();

    const mailRes=await sendVerificationMail(LoggedUser.email,verificationToken,next); //sending verifaction mail
    res.status(203).json({
      success:true,
      ...LoggedUser._doc,
      password:undefined,
      mailresponse: mailRes.success?mailRes:{success:false},
    })

    
  } catch (error) {
    console.log("Errors occures during Logged in !",error);
    return next(error);
    
  }

}


const LoggedOut= async(req,res,next)=>{
 
  const isProduction=EnvConfig.ENV_APP_MOOD==="production";

  res.clearCookie('AuthToken', {
    httpOnly: true,
    secure: isProduction, // secure flag for production
    sameSite: 'strict',
  });
 res.status(201).json({
  success:true,
  message:"user successfuly Logged out !",
  statuCode:201,
 })

}
const ForgotPassword=async(req,res,next)=>{

}




const checkAuth=async(req,res,next)=>{

  const { userID } = req.user; 
  
 console.log("User id  in CheckAuth : ", userID);
 
  if(!userID){
    const error=createHttpError(404,"User id Not found");
    return next(error);
  }

  try { 
    // console.log(userID);
    // const authUser= await UserAdmin.findOne({userId}).select("-password");
    const authUser= await UserAdmin.findOne({_id:userID});
     
    if(!authUser){
      const error =createHttpError(403,"Unautarized : User  not found !");
      return next(error);
    }
    
    // const isAdminVerified=authUser.isVerified;

    res.status(200).json({
      success:true,
      message:"User successfuly Retrive From DataBase !",
      ...authUser._doc,
      password:undefined,
    })

  } catch (error) {
    
    console.log("Error  Occures check Authantication !",error);
    return next(error)
  }

   
}



export {RegisterAdmin,VerifyAuthentication,LoggedOut,LoggedIn,ForgotPassword,checkAuth};