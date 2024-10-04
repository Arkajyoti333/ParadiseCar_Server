import {model, Schema} from "mongoose";

const NewsLetterSchema=Schema({
    Email:{
        type:String,
        require:true,
        uniqueunique: true,
    }
})

const NewsLetter=model("newsLetter",NewsLetterSchema);

export default NewsLetter;