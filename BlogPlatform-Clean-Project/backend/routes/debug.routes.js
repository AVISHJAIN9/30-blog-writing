import express from 'express';
import { status } from '../controllers/debug.controller.js';

const router = express.Router();

router.get('/status', status);

export default router;
