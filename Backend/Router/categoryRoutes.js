import express from "express";
import getCategories from "../Controller/categorycontroller.js";

const Categoryrouter = express.Router();

Categoryrouter.get("/", getCategories);

export default Categoryrouter;