import mongoose from "mongoose";


const contactschema=mongoose.Schema(
    {
        Name:{
            type:String,
            require:true,
        },
        Mobile_no:{
            type:String,
            require:true,
        },
        email:{
            type:String,
            require:true,
            
        },
        Message:{
            type:String,
            require:true,
        }
    },
    {
        timestamps: true,
    }
    
)


const ContactDb=mongoose.model("contactDb",contactschema);

export default ContactDb;