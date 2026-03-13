import express from "express";
import {
  getRestaurants,
  toppicks,
  recommended,
} from "../Controller/restaurantController.js";

const restaurantrouter = express.Router();

restaurantrouter.get("/restaurant", getRestaurants);

restaurantrouter.get("/toppicks", toppicks);

restaurantrouter.get("/recommended", recommended);

export default restaurantrouter;
