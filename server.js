import express from "express";
import {config} from "dotenv";
import connectdb from "./config/db.js";
import morgan from "morgan";
import authRoutes from "./routes/authRoute.js"
import categoryRoutes from "./routes/categoryRoutes.js"
import productRoute from "./routes/productRoutes.js"
import cors from "cors"

const app = express();

config({
    path:"./data/config.env"
})

//databse
connectdb();

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

//routes
app.use("/api/v1/auth",authRoutes)
app.use("/api/v1/category",categoryRoutes)
app.use("/api/v1/product",productRoute)

app.get("/",(req,res)=>{
    res.send("<h1>Hello</h1>");
});

app.listen(process.env.PORT,()=>{
    console.log(`Server is running on ${process.env.PORT}`)
})