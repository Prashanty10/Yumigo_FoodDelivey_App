import mongoose from "mongoose";

const dbconnection =async()=>{
  try{
    mongoose.connect(process.env.MONGO_URL)
    console.log("Database connected successfully")
  }catch(error){
    console.log("Database connection error", error)
  }
}

export default dbconnection