import express from 'express';
import { getProfile, updateProfile } from '../controllers/user.controller.js';
import verifyJWT from '../middleware/verifyjwt.js';

const router = express.Router();

// Public route - Get any user's public profile
router.post("/get-profile", getProfile);

// Protected route - Update own profile
router.post("/update-profile", verifyJWT, updateProfile);

export default router;