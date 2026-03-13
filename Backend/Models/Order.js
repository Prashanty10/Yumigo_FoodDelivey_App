import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema({
  
  user:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"users",
    required:true
  },

  cart:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Carts",
    required:true
  },

  totalPrice:{
    type:Number,
    required:true
  },

  status:{
    type:String,
    enum:["pending","confirmed","preparing","delivered","cancelled"],
    default:"pending"
  }

},{timestamps:true});
const order = mongoose.model("Orders",OrderSchema , "Orders");

export default order