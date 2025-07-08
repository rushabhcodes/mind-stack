import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import "dotenv/config"

interface JwtPayload {
    id: string;
}

export default function auth(req: Request, res: Response, next: NextFunction) {

    const token = req.cookies.token;
    console.log("Auth middleware - token:", token);
    console.log("Auth middleware - all cookies:", req.cookies);
    console.log("Auth middleware - headers:", req.headers.cookie);
    
    if (!token) {
        console.log("No token found in cookies");
        res.status(401).json({
            message: 'Not logged in'
        });
        return;
    }

    try {
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;

        req.userId = decodedToken.id

        next();

    } catch (err) {
        res.status(401).json({
            message: 'Unauthorized',
            err
        })
    }

}