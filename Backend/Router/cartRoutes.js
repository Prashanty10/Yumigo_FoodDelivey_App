import express from "express";
import carthandel from "../Controller/Cartcontroller.js";
import middelwareauth from "../Middleware/authMiddleware.js";

const cartrouter = express.Router();

cartrouter.post("/cart", middelwareauth, carthandel);

export default cartrouter;