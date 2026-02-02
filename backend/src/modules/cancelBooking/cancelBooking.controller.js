import {cancelBooking} from './cancelBooking.service.js';
export async function cancelBookingHandler(req, res, next) {
  try {

    console.log("booking id is : ", req.params.bookingId);

    await cancelBooking({
      bookingId: req.params.bookingId,
      userId: req.user.id
    });
    
    
    res.json({ success: true });

    
  } catch (err) {
    console.log("ERROR:(", err);
    next(err);
  }
}
