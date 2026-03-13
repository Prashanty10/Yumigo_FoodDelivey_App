
import express from "express"
import { getAllMenu } from "../Controller/menuController.js";

const Menurouter = express.Router();

Menurouter.get("/Menu/:restaurantId",getAllMenu)

export default Menurouter