import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
import { PostModel } from "./database.js";
import express from "express";
const app = express();
app.use(express.json());
app.use(cors());

async function connectDB() {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB Connected successfully!');
    } catch (error) {
        console.error('MongoDB connection error:', error.message);
        process.exit(1);
    }
}

connectDB();

app.get("/", (req, res) => {
    res.json({
        message: "okay"
    })
})

app.post("/posts", async (req, res) => {
    let user = req.body.username;
    let msg = req.body.message;
    await PostModel.create({
        username: user,
        message: msg
    })
    res.json({
        "username": user ,
        "message": msg
    })
})

app.get("/posts", async (req, res) => {
    let result = await PostModel.find()
    res.json({
        "res": result
    })
})

app.listen(3000);