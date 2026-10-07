import mongoose from "mongoose";
 
export const connectDb =async()=>{
    try {
        await mongoose.connect("mongodb+srv://hemanthkr1505_db_user:eyRsihXIHpsHOF8f@cluster0.3lttruc.mongodb.net/?appName=Cluster0/project")
        console.log("mongoose db connected")
        
    } catch (error) {
        console.log("mongoose error")
        
    }
}


