import createHttpError from "http-errors";
import ContactDb from "../models/contactfrom.model.js";
import bookingData from "../models/BookingData.model.js";





const contactDataController = async (req, res, next) => {
  try {
    const { fullName, email, mobileNum, contactMessage } = req.body;

    if (!fullName || !email || !mobileNum || !contactMessage) {
      const error=createHttpError(403,"All data is required .")
      return next(error);
    } 
    const newContactDetails = await ContactDb.create({
      Name: fullName,
      email,
      Mobile_no: mobileNum,
      Message: contactMessage,
    });

    res.status(201).json({
      id: newContactDetails._id,
    });
  } catch (error) {
    return next(createHttpError(413, " Contact Payload Submission Faild. "));
  }
};



const BookDataController= async (req, res, next)=>{

try {
  
  const { fullName, PickDateTime,PicUpLocation, MobileNum,dropOffDateTime,destinationLocation, tripType,airPortOptation } = req.body;
   
  if(!fullName || !PickDateTime || !PicUpLocation || !MobileNum || !dropOffDateTime || !destinationLocation || !tripType  ){
   
    const err=createHttpError(403,"All data Filled are required !");
    return next(err);

  }

  const newContactDetails= await bookingData.create({
    Fullname:fullName,
    MobileNumber:MobileNum,
    PickUpDateTime:PickDateTime,
    PicUpLocation:PicUpLocation,
    DropOffDateTime:dropOffDateTime,
    DropOffLocation:destinationLocation,
    tripType,
    AirportTriptype: airPortOptation ? airPortOptation : "Empty",

  });

  res.status(201).json({
    Author:fullName,
    message:"Book Data successfully Saved !",
    id: newContactDetails._id,
  });

} catch (error) {
  return next(413,"Book Now  ayload submission faild")
}

}



export { contactDataController,BookDataController };
