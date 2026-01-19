import express from 'express';
import { cancelBookingHandler } from './cancelBooking.controller.js';
import { authenticate } from '../../middlewares/auth.js';
const router = express.Router({ mergeParams: true });

router.delete('/:bookingId', authenticate, cancelBookingHandler);

export default router;
