import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { dbConnect } from "./db.js";
import { router } from "./routes/user.js";

dotenv.config();

const app=express();
const PORT= 8800;

dbConnect();

app.use(cors());
app.use(express.json());

app.use("/api/",router)

app.listen(PORT,()=>{
    console.log("Server connected ✨")
})