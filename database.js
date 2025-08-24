import mongoose from "mongoose";
import { model } from "mongoose";
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const Post = new Schema({
    username: String,
    message: String
});

export const PostModel = model("Post",Post);