import createHttpError from "http-errors";
import UserAdmin from "../models/Useradmin.model.js";
import bcrypt from "bcrypt";
import generateVerificationToken from "../utils/generateVerificationToken.js";
import { sendVerificationMail } from "../MailServices/Email.services.js";





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


const VerifyAuthentication= async(req,res,next)=>{
  
  const {code}=req.body;
  const { email } = req.params;


  try {
        const  UserFind= await UserAdmin.findOne({
         email,
          verificationToken:code,
          verificationTokenExpiresAt: { $gt: Date.now() }  // $gt operator checks if the verificationTokenExpiresAt (expiration date) is greater than the current time (Date.now()). If it is, the token has not expired.
        });

        if(!UserFind){
          const error =createHttpError(401,"Invalid Verification Code !")
          return next(error);
        }
    
        UserFind.isVerified=true;
        UserFind.verificationToken=undefined;
        UserFind.verificationTokenExpiresAt=undefined;
     
      await UserFind.save();

      res.status(203).json({
        message:"user successfuly Verified his account !",
        ...UserFind._doc,
        password:undefined,

     })
    
  } catch (error) {
    console.log("Error Occures Verification Email  code.",error);
    return next(error);

  }
}


const LoggedIn=async(req,res,next)=>{

}

const LoggedOut= async(req,res,next)=>{

}
const ForgotPassword=async(req,res,next)=>{

}



export {RegisterAdmin,VerifyAuthentication,LoggedOut,LoggedIn,ForgotPassword};