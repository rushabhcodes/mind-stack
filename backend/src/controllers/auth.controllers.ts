import { Request, Response } from 'express';
import userModel from './../models/user'
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import z from "zod";

const signupSchema = z.object({
    username: z.string().min(3).max(50),
    email: z.string().email().max(50),
    password: z
        .string()
        .min(6, "Password must be om minimum 6 char")
        .refine((val) => /[-._!"`'#%&,:;<>=@{}~\$\(\)\*\+\/\\\?\[\]\^\|]+/.test(val), "Password must contain atleast one special character")
        .refine((val) => /[a-z]/.test(val), "Password must contain at least one lowercase letter")
        .refine((val) => /[A-Z]/.test(val), "Password must contain at least one uppercase letter")
        .refine((val) => /.*[0-9].*/.test(val), "Password must contain at least one number"),
})

const loginSchema = z.object({
    username: z.string().min(3).max(50),
    password: z
        .string()
        .min(6, "Password must be om minimum 6 char")
        .refine((val) => /[-._!"`'#%&,:;<>=@{}~\$\(\)\*\+\/\\\?\[\]\^\|]+/.test(val), "Password must contain atleast one special character")
        .refine((val) => /[a-z]/.test(val), "Password must contain at least one lowercase letter")
        .refine((val) => /[A-Z]/.test(val), "Password must contain at least one uppercase letter")
        .refine((val) => /.*[0-9].*/.test(val), "Password must contain at least one number"),
})




export async function signup(req: Request, res: Response) {
    const result = signupSchema.safeParse(req.body)

    if (!result.success) {
        res.status(411).json({
            message: "Error in inputs"
        })
        return
    }

    const { username, email, password } = result.data;


    try {
        const hashPassword = await bcrypt.hash(password, 10)


        const existingUser = await userModel.findOne({
            username: username
        })

        if (!existingUser) {
            const newUser = await userModel.create({
                username: username,
                email: email,
                password: hashPassword
            })

            res.status(201).json({
                newUser,
                message: "User created successfully"
            });
            return
        }

        res.status(403).json({
            message: "User already exists with this username"
        })

    } catch (error) {
        res.status(500).json({
            error,
            message: "Server Error"
        })
    }
}

export async function login(req: Request, res: Response) {
    const result = loginSchema.safeParse(req.body)
    console.log(JSON.stringify(result));

    if (!result.success) {
        res.status(411).json({
            message: "Error in inputs"
        })
        return
    }

    const { username, password } = result.data;

    if (!username || !password) {
        res.status(411).json({
            message: "Error in inputs"
        })
        return
    }

    try {

        const existingUser = await userModel.findOne({ username })

        if (!existingUser) {
            res.status(404).json({
                message: 'Username not found'
            })
            return
        }

        const isMatch = await bcrypt.compare(password, existingUser.password!)
        if (!isMatch) {
            res.status(403).json({
                message: "Error password not matching"
            })
            return
        }

        const token = jwt.sign({
            id: existingUser._id
        }, process.env.JWT_SECRET!)

        res.cookie('token', token, { 
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 24 * 60 * 60 * 1000 // 24 hours
        }).status(200).json({
            message: "Login Succesfull"
        })

    } catch (error) {
        res.status(500).json({
            error,
            message: "Server Error"
        })
    }
}

export function logout(req: Request, res: Response) {
    try {
        // Clear the token cookie
        res.clearCookie('token', {
            httpOnly: true,
            sameSite: 'strict',
            secure: process.env.NODE_ENV === 'production'
        });
        
        res.status(200).json({
            message: "Logged out successfully"
        });
    } catch (error) {
        res.status(500).json({
            error,
            message: "Server Error during logout"
        });
    }
}

export function verifyAuth(req: Request, res: Response) {
    // If this function is reached, it means the auth middleware has validated the token
    res.status(200).json({
        message: "User is authenticated",
        userId: req.userId
    });
}