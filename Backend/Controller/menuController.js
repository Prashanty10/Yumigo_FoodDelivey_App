import menudata from "../Models/Menu.js";
import mongoose from "mongoose";

export const getAllMenu = async (req, res) => {
  try {
    const menu = await menudata
      .find({
        restaurant: new mongoose.Types.ObjectId(req.params.restaurantId),
      })
      .populate("restaurant");

    res.status(200).json(menu);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
