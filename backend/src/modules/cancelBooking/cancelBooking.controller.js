import {cancelBooking} from './cancelBooking.service.js';
export async function cancelBookingHandler(req, res, next) {
  try {
    await cancelBooking({
      bookingId: req.params.bookingId,
      userId: req.user.id
    });

    res.json({ success: true });
  } catch (err) {
    next(err);
  }
}
