import { createBooking } from './booking.service.js';
import { validateCreateBooking } from './booking.dto.js';

export async function createBookingHandler(req, res, next) {
  try {
    const { resourceId, startTime, endTime } =
      validateCreateBooking(req.body);

    const bookingId = await createBooking({
      resourceId,
      userId: req.user.id,
      startTime,
      endTime
    });

    res.status(201).json({
      success: true,
      bookingId
    });
  } catch (err) {
    next(err);
  }
}
