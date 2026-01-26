import { getUserBookings } from "./userBooking.repository.js";
export async function getMyBookings(req, res, next) {
  try {
    const bookings = await getUserBookings(req.user.id);
    res.json(bookings);
  } catch (err) {
    next(err);
  }
}
