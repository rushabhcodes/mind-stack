import express from 'express';

import { signup , login , logout, verifyAuth } from '../controllers/auth.controllers';
import auth from '../middleware/authMiddleware';

const router = express.Router();

router.post("/signup", signup);
 
router.post("/login",login);

router.post("/logout" , logout);

router.get("/verify", auth, verifyAuth);

export default router 