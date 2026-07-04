import express from 'express';
import { createBookingHandler } from './booking.controller.js';
import { authenticate } from '../../middlewares/auth.js';
import { rateLimit } from '../../middlewares/rateLimit.js';

const router = express.Router();

router.post('/', authenticate, rateLimit({ windowMs: 60000, max: 10 }), createBookingHandler);

export default router;
