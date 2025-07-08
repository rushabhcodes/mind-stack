import { Schema, Types, model } from "mongoose";

const linkSchema = new Schema({
    hash: { type: String },
    userId: { type: Types.ObjectId, ref: 'user', required: true }
})

const linkModel = model('link', linkSchema);

export default linkModel;