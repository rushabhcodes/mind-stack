import { Schema, Types, model } from "mongoose";

const contentSchema = new Schema({
    title: { type: String },
    link: { type: String },
    description: { type: String },
    tags: [{ type: Types.ObjectId, ref: "tag" }],
    userId: { type: Types.ObjectId, ref: 'user', required: true }
})

const contentModel = model('content', contentSchema);

export default contentModel;