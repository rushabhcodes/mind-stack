import express from 'express';
import { createContent, getContent, deleteContent, createShareLink, getSharedContent } from '../controllers/user.controllers';
import auth from '../middleware/authMiddleware';

const router = express.Router();

router.post("/content", auth, createContent);

router.get("/content", auth, getContent);

router.delete("/content/:contentId", auth, deleteContent);

router.post("/brain/share",auth, createShareLink);

router.get("/brain/shared/:shareLink", getSharedContent);

export default router 