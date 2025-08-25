import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
import { PostModel } from "./database.js";
import express from "express";
import type { Request, Response } from "express";
import { main } from "./ai.js";

const app = express();
app.use(express.json());
app.use(cors());

async function connectDB() {
    try {
        if (!process.env.MONGO_URI) {
            throw new Error("MONGO_URI is not defined in environment variables");
        }
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB Connected successfully!');
    } catch (error: any) {
        console.error('MongoDB connection error:', error.message);
        process.exit(1);
    }
}

connectDB();

app.get("/", (req: Request, res: Response) => {
    res.json({
        message: "okay"
    })
})

app.post("/posts", async (req: Request, res: Response) => {
    let user = req.body.username;
    let err = req.body.error;

    let msg = await main(err);

    await PostModel.create({
        username: user,
        message: msg
    })
    res.json({
        "username": user ,
        "message": msg
    })
})

app.get("/posts", async (req: Request, res: Response) => {
    let result = await PostModel.find()
    res.json({
        "res": result
    })
})

app.listen(3000);