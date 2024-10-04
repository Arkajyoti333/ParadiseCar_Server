import mongoose from "mongoose";


const bookingSchema=mongoose.Schema(
    {
        Fullname:{
            type:String,
            require:true,
        },
        MobileNumber:{
            type:Number,
            require:[true, 'Mobile Number is required']
        },
        PicUpLocation:{
            type:String,
            require:true,
        },
        DropOffLocation:{
            type:String,
            require:true,
        },
        PickUpDateTime:{
            type:String,
            require:true,
        },
        DropOffDateTime:{
            type:String,
            require:true,
        },
        tripType:{
            type:String,
            require:true,
        },
        AirportTriptype:{
            type:String,
        }


    },
    {
        timestamps: true,
    }
    
)

const bookingData=mongoose.model("bookingData",bookingSchema);

export default bookingData;