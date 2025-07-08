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

// Debug middleware to log all requests
app.use((req, res, next) => {
    console.log(`${req.method} ${req.path} - Origin: ${req.get('origin')}`);
    console.log('Request body:', req.body);
    next();
});

// CORS configuration
const corsOptions = {
  credentials: true,
  optionsSuccessStatus: 200, // Some legacy browsers choke on 204
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  origin: function (origin: string | undefined, callback: (err: Error | null, allow?: boolean) => void) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    
    const allowedOrigins = [
      'http://localhost:3000',
      'http://localhost:5173',
      'https://mindstack.rushabh.dev',
      'https://www.mindstack.rushabh.dev',
      'https://mind-stack-pi.vercel.app',
      process.env.FRONTEND_URL
    ].filter(Boolean); // Remove undefined values
    
    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      console.log('CORS rejected origin:', origin);
      callback(new Error('Not allowed by CORS'));
    }
  }
};

app.use(cors(corsOptions))

console.log('Registering auth routes...');
app.use("/api/v1/auth", authRoute)

console.log('Registering user routes...');
app.use("/api/v1/user", userRoute)

app.get("/", (req, res) => {
    console.log("Hello World");
    res.json({ message: "Express on Vercel" })
})

initDb()

// Only listen on port when not in Vercel environment
if (process.env.NODE_ENV !== 'production') {
    app.listen(PORT, () => {
        console.log(`Example app listening on port ${PORT}`)
    })
}

// Export the Express app for Vercel
export default app;