import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import dbconnection from "./Database/db.js"
import router from "./Router/authRoutes.js"
import restaurantrouter from "./Router/restaurantRoutes.js"
import Categoryrouter from "./Router/categoryRoutes.js"
import Menurouter from "./Router/menuRoutes.js"
import bannerrouter from "./Router/bannerRouter.js"
import cartrouter from "./Router/cartRoutes.js"
import orderrouter from "./Router/orderRoutes.js"
dotenv.config()
dbconnection()
const app = express()

app.use(cors())
app.use(express.json())
app.use("/api",router)
app.use("/api",restaurantrouter)
app.use("/api",Categoryrouter)
app.use("/api",Menurouter)
app.use("/api",bannerrouter)
app.use("/api",cartrouter)
app.use("/api",orderrouter)



const port = process.env.PORT;

app.listen(port, "0.0.0.0", () => {
  console.log(`server running on http://localhost:${port}`)
})