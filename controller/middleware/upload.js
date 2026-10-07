import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import {v2 as cloudinary} from "cloudinary"



cloudinary.config({
  cloud_name:"dliwuiyen",
  api_key:"627847135829996",
  api_secret:"6u6M2Vf16YnL0gNjjkOiPAbFwqs",
})//cradential

const storage = new CloudinaryStorage({
  cloudinary,
  params:{
    folder:"project"
  }//folder
})
//export
export const upload = multer({storage})