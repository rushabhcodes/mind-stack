import mongoose from "mongoose";

export default async function initDb () {
   const res = await mongoose.connect(process.env.MONGO_URI!)
}