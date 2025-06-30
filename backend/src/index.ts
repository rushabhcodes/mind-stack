import express from "express";
import cookieParser from "cookie-parser";

import "dotenv/config";
const app = express();
import authRoute from "./routes/auth.routes"
import userRoute from "./routes/user.routes"
import initDb from "./db/db";
const PORT = process.env.PORT;

app.use(express.json());
app.use(cookieParser());

app.use("/api/v1/auth", authRoute)

app.use("/api/v1/user", userRoute)

app.get("/", () => {
    console.log("Hello World");
})

initDb()

app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}`)
})