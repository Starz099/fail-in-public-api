import mongoose, { Document, model, Model, Schema } from "mongoose";

interface IPost extends Document {
    username: string;
    message: string;
}

const PostSchema: Schema = new Schema({
    username: { type: String, required: true },
    message: { type: String, required: true }
});

export const PostModel: Model<IPost> = model<IPost>("Post", PostSchema);