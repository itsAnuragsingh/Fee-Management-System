import mongoose from "mongoose";

 export async function dbConnect(){
   try{
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connected to Database");
   }catch(err){
    console.log("error",err)
   }
}