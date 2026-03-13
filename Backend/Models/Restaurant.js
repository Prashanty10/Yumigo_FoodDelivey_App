import mongoose from "mongoose";

const Restaurantschema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    mainImage: {
      type: String,
      required: true,
    },
    images: [String],
    description: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      required: true,
    },
    totalReviews: {
      type: Number,
      required: true,
    },
    deliveryTime: {
      type: String,
      required: true,
    },
    distance: {
      type: String,
      required: true,
    },
    priceRange: {
      type: String,
      required: true,
    },
    cuisines: [String],
    isVegAvailable: {
      type: Boolean,
      required: true,
    },
    isRecommended: {
      type: Boolean,
      required: true,
    },
    isTopPick: {
      type: Boolean,
      required: true,
    },
    isActive: {
      type: Boolean,
      required: true,
    },
  },
  { timestamps: true },
);

const restaurant = mongoose.model("Restaurants",Restaurantschema,"Restaurants")


export default restaurant;