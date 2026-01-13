import express from 'express';
import { createBookingHandler } from './booking.controller.js';
import { authenticate } from '../../middlewares/auth.js';

const router = express.Router();

router.post('/', authenticate, createBookingHandler);

export default router;
