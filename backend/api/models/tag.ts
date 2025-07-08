import { model, Schema } from "mongoose";

const tagSchema = new Schema({
    tag: String
})

const tagModel = model('tag' , tagSchema);

export default tagModel;