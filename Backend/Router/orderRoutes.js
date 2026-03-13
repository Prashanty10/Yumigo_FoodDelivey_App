import express from "express";
import orderhandler from "../Controller/ordercontroller.js";

const orderrouter = express.Router();

orderrouter.get("/order", orderhandler);

export default orderrouter;