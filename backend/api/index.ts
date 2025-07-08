import express from "express";
import cookieParser from "cookie-parser";
import { Request, Response } from "express";
import "dotenv/config";
const app = express();
import authRoute from "./routes/auth.routes"
import userRoute from "./routes/user.routes"
import initDb from "./db/db";
import cors from "cors"
const PORT = process.env.PORT;

app.use(express.json());
app.use(cookieParser());
app.use(cors({ credentials: true }))

app.use("/api/v1/auth", authRoute)

app.use("/api/v1/user", userRoute)

app.get("/", (req, res) => {
    console.log("Hello World");
    res.json({ message: "Express on Vercel" })
})

initDb()

app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}`)
})

// Export the handler for Vercel

export default (req: Request, res: Response) => {
    return app(req, res);
};