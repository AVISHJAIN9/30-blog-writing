import express from 'express';
import { signup, signin } from '../controllers/auth.controller.js';

const router = express.Router();

// Logic: Public routes for user onboarding
router.post('/signup', signup);
router.post('/signin', signin);

export default router;