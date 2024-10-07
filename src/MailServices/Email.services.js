//  import app from "../app.js";
 import {mailTrapClient,sender} from "./mail.config.services.js";
 import {VERIFICATION_EMAIL_TEMPLATE} from "./email.tamplate.services.js"


 const sendVerificationMail=async(email,verificationCode,next)=>{

    try {
        
        const recipients =[{email}]
         const mailResponse=    await mailTrapClient.send({
            from: sender,
            to: recipients,
            subject: "Please Verify your Account",
            html:VERIFICATION_EMAIL_TEMPLATE.replace("{verificationCode}", verificationCode),
            category: "Verification mail ....",
        })
        console.log("Email sent successfully", mailResponse);
        return mailResponse;

    } catch (error) {
        console.log("Error occures Sending mail: "+error);

        return next(error);
    }


 }


 export {sendVerificationMail};