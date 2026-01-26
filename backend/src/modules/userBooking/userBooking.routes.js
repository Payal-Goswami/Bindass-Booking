import express from 'express';
import { cancelBookingHandler } from '../cancelBooking/cancelBooking.controller.js';
import { getMyBookings } from './userBooking.controller.js';
import { authenticate } from '../../middlewares/auth.js';
const router = express.Router();
router.get('/my', authenticate, getMyBookings);
router.patch('/:id/cancel', authenticate, cancelBookingHandler);

export default router;