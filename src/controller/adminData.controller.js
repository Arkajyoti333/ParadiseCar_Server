import UserAdmin from "../models/Useradmin.model.js";
import createHttpError from "http-errors";
import  bookingData from "../models/BookingData.model.js";
import { promise } from "bcrypt/promises.js";
import ContactDb from "../models/contactfrom.model.js";



const BookData=async(req,res,next)=>{

   
    const { userID } = req.user; 

    if(!userID){
        const error = createHttpError(401, "Unauthorized: User ID is missing in the request.");
        return next(error);
    }
        try {

                    //sequential execution

            // Run both queries in parallel using Promise.all
        // const [isAdmin, bookingResponse] = await Promise.all([
        //     UserAdmin.findOne({ _id: userID, isVerified: true }).select("-password"),
        //     bookingData.find()
        // ]);
            
            const isAdmin= await UserAdmin.findOne({
                _id:userID,
                isVerified:true,
            }).select("-password");

            if(!isAdmin){
                const err = createHttpError(401, "Unauthorized: Credentials not found or user not verified!");
                return next(err);
            }

         const bookingResponse=await bookingData.find();

         // Send the response as an array instead of spreading
         res.status(200).json(bookingResponse);




        } catch (error) {
            console.error("Error occurred while retrieving booking data in Admin controller:", error);
            const err=createHttpError(500, "Internal Server Error: Unable to retrieve booking data.")
        return next(err);
        }
   

}

const ContactData=async (req,res,next)=>{
    
    const { userID } = req.user; 
    if(!userID){
        const error = createHttpError(401, "Unauthorized: User ID is missing in the request.");
        return next(error);
    }
  try {

    //sequential execution

    const [isAdmin,contactResponse]=await Promise.all([
        UserAdmin.findOne({ _id: userID, isVerified: true }).select("-password"),
        ContactDb.find(),

    ])

     if(!isAdmin){
        const err = createHttpError(401, "Unauthorized: Credentials not found or user not verified!");
        return(next(err));
     }
     res.status(200).json(contactResponse);
    
  } catch (error) {
    console.error("Error occurred while retrieving booking data in Admin controller:", error);
    const err=createHttpError(500, "Internal Server Error: Unable to retrieve contact data.")
    return next(err);
  }

}

const newsletterData=async (req,res,next)=>{
 
 
    try {
        
    } catch (error) {
        console.error("Error occurred while retrieving booking data in Admin controller:", error);
        const err=createHttpError(500, "Internal Server Error: Unable to retrieve NewsLettar  data.");
        return next(err);
    }

}


export {BookData,ContactData,newsletterData};