import mongoose from "mongoose";

const VehicleCategorySchema = new mongoose.Schema({
    VehicleImage:String,
    VehicleName:String,
    VehicleDescription:String,

});
export default mongoose.model("VehicleCategory",VehicleCategorySchema)