import express from "express";
import getBanners from "../Controller/bannercontroller.js";

const bannerrouter = express.Router();

bannerrouter.get("/banner", getBanners);

export default bannerrouter;
