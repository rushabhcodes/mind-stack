import express from 'express';

import { signup , login , logout, verifyAuth } from '../controllers/auth.controllers';
import auth from '../middleware/authMiddleware';

const router = express.Router();

console.log('Setting up auth routes...');

router.post("/signup", (req, res, next) => {
    console.log('Signup route hit');
    next();
}, signup);
 
router.post("/login", (req, res, next) => {
    console.log('Login route hit');
    next();
}, login);

router.post("/logout" , logout);

router.get("/verify", auth, verifyAuth);

console.log('Auth routes configured');

export default router 