// import mongoose from "mongoose";

// const AdminSchema = new mongoose.Schema({
//     name:String,
//     email:String,
//     password:String
    

   
    

// })
// export default mongoose.model("Admin",AdminSchema)
import mongoose from "mongoose";

const AdminSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
    },

    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Admin", AdminSchema);