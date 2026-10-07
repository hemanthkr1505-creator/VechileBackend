// import mongoose from "mongoose";
// const ServiceSchema = new mongoose.Schema({
    
//     VehicleImage:String,
//     VehicleName:String,
//     VehicleModel:String,
//     Description:String,
//     Type:String,
//     Date:String,
//     userId:{
//       type:mongoose.Schema.Types.ObjectId,
//       ref:"Register"
//     }


// })
// export default mongoose.model("services",ServiceSchema)
import mongoose from "mongoose";

const ServiceSchema = new mongoose.Schema(
  {
    VehicleImage: String,
    VehicleName: String,
    Email:String,
    VehicleModel: String,
    Description: String,
    Type: String,
    Date: String,

    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

const Servicemodel =
  mongoose.models.services ||
  mongoose.model("services", ServiceSchema);

export default Servicemodel;
