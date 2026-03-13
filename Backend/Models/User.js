import mongoose from "mongoose";

const Userschema = new mongoose.Schema({

  Name:{
    type:String,
    require : true
  },
  Email:{
    type:String,
    require : true,
    unique:true
  },
  Password:{
    type:String,
    require : true
  },
})

const User = mongoose.model("users" , Userschema , "users")

export default User;