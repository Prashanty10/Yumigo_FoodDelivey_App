import mongoose from "mongoose";

const BannerSchema = new mongoose.Schema({
  image: {
    type: String,
    required: true
  }
}, { timestamps: true });

const Banner = mongoose.model("Banners", BannerSchema , "Banners");

export default Banner