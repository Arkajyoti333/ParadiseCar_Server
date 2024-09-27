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
        TripType:{
            type:String,
            require:true,
        },
        AirportTriptype:{
            type:true,
        }


    },
{
 timestamp:true, 
})

const BookingData=mongoose.model("bookingData",bookingSchema);

export default BookingData;