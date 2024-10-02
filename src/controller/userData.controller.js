import createHttpError from "http-errors";
import ContactDb from "../models/contactfrom.model.js";





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




export { contactDataController };
