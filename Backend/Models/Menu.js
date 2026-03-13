import mongoose from "mongoose";

const Menuschema = new mongoose.Schema({

  name: {
    type: String,
    required: true
  },

  description: {
    type: String,
    required: true
  },

  price: {
    type: Number,
    required: true
  },

  image: {
    type: String,
    required: true
  },

  restaurant: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Restaurants",
    required: true
  },

  isVeg: {
    type: Boolean,
    default: false
  },

  rating: {
    type: Number,
    default: 0
  },

  ingredients: [
    {
      type: String
    }
  ],

  recipe: {
    type: String
  },

  isAvailable: {
    type: Boolean,
    default: true
  }

});

const menudata = mongoose.model("Menus", Menuschema, "Menus");

export default menudata;