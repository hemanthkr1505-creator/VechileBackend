import mongoose from "mongoose";
import { PiPassword } from "react-icons/pi";
const userSchema = new mongoose.Schema({
    ShopName:String,
    ShopEmail:String,
    Payment:Number,
    Date:String,
    VehicleNUmber:String,
    Description:String



    

   
    

})
export default mongoose.model("AfterService",userSchema)