import { MailtrapClient }  from "mailtrap";
// import {VERIFICATION_EMAIL_TEMPLATE} from "./email.tamplate.services.js" 
import EnvConfig from "../config/Config.js";

const TOKEN = EnvConfig.ENV_MAIL_TRAP_TOKEN;

const mailTrapClient= new MailtrapClient({
  token: TOKEN,
});

const sender = {
  email: "hello@paradisecar.in",
  name: "ParaDise Car",
};


//In case of demo domain we can only send yourself mail

// const recipients = [
//   {
//     email: "whitehat158@gmail.com",
//   }
// ];


// client.send({
//     from: sender,
//     to: recipients,
//     subject: "You are awesome!",
//     html:VERIFICATION_EMAIL_TEMPLATE.replace("{verificationCode}", "478958"),
//     category: "Integration Test",
//   })
//   .then(console.log, console.error);


  export {mailTrapClient,sender};